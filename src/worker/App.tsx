import componentPath from '../common/componentPath';
import React from 'react';
import { getComponentDesc } from '../common/register';
import {
  AppComponent,
  WorkerRenderComponent,
  MessageChannel,
  FromWorkerMsg,
  FromRenderMsg,
} from '../common/types';
import { nativeComponents } from './nativeComponentClass';
import { getComponentClass } from './getComponentClass';
import noopRender from './noopRender';
import { noop, cleanFuncJson } from '../common/utils';

class App
  extends React.Component<{ channel: MessageChannel }>
  implements AppComponent
{
  componentIndex = 0;
  componentPath = '1';
  componentChildIndex = 0;
  componentChildIndexMap = new Map();
  newComponentsPathIdMap: Record<string, string> = {};
  newComponentsIdStateMap: Record<string, any> = {};
  pendingIdStateMap: Record<string, any> = {};
  newComponentIds: Set<string> = new Set();
  components: Map<string, WorkerRenderComponent> = new Map();
  scheduled = false;
  componentNameDefaultPropsMap: Record<string, string> = {};

  constructor(props: any) {
    super(props);
    this.props.channel.onMessage = this.onMessage;
  }
  onMessage = (e: any) => {
    const msg: FromRenderMsg = JSON.parse(e.data);
    const { componentId, method, args } = msg;
    const component = this.components.get(componentId)!;
    noopRender.batchedUpdates(() => {
      component.callMethod(method, args);
    });
  };
  postMessage(msg: FromWorkerMsg) {
    this.props.channel.postMessage(JSON.stringify(msg));
  }

  afterSendToRender() {
    this.pendingIdStateMap = {};
    this.newComponentIds.clear();
    this.newComponentsPathIdMap = {};
    this.newComponentsIdStateMap = {};
  }

  scheduleSendToRender() {
    if (this.scheduled) {
      return;
    }
    this.scheduled = true;
    Promise.resolve().then(() => {
      this.sendToRender();
      this.afterSendToRender();
      this.scheduled = false;
    });
  }

  sendToRender() {
    const {
      components,
      pendingIdStateMap,
      newComponentsIdStateMap,
      newComponentsPathIdMap,
      componentNameDefaultPropsMap,
    } = this;

    const newComponentNameDefaultPropsMap: Record<string, string> = {};

    for (const id of Object.keys(pendingIdStateMap)) {
      if (!components.has(id)) {
        delete pendingIdStateMap[id];
      }
    }

    for (const id of Array.from(this.newComponentIds)) {
      const component = components.get(id)!;
      const { componentName } = component;

      newComponentsIdStateMap[id] = component.state.state;
      newComponentsPathIdMap[componentPath.getComponentPath(component)] = id;

      if (!componentNameDefaultPropsMap[componentName]) {
        componentNameDefaultPropsMap[componentName] =
          getComponentDesc(componentName).defaultProps || {};
        newComponentNameDefaultPropsMap[componentName] =
          componentNameDefaultPropsMap[componentName];
      }
    }

    this.postMessage({
      newComponentsIdStateMap: cleanFuncJson(newComponentsIdStateMap),
      newComponentsPathIdMap,
      pendingIdStateMap: cleanFuncJson(pendingIdStateMap),
      newComponentNameDefaultPropsMap: cleanFuncJson(
        newComponentNameDefaultPropsMap,
      ),
    });
  }
  setStateState(component: WorkerRenderComponent, state: any) {
    if (this.newComponentIds.has(component.id)) {
      return;
    }
    const { pendingIdStateMap } = this;
    const current = pendingIdStateMap[component.id] || {};
    Object.assign(current, state);
    pendingIdStateMap[component.id] = current;
  }
  addComponent(component: WorkerRenderComponent) {
    if (!this.components.has(component.id)) {
      this.newComponentIds.add(component.id);
    }
    this.components.set(component.id, component);
  }
  removeComponent(component: WorkerRenderComponent) {
    this.newComponentIds.delete(component.id);
    this.components.delete(component.id);
  }

  render(): React.ReactNode {
    const componentDesc = getComponentDesc('main');
    const element = componentDesc.render.call({
      native: nativeComponents,
      props: {},
      state: {},
      getNativeEventHandle: noop,
      getComponentEventHandle: noop,
      getComponent: getComponentClass,
    });
    return componentPath.renderWithComponentContext(this, element);
  }
}

componentPath.classWithContext(App);

export default App;
