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
class App
  extends React.Component<{ channel: MessageChannel }>
  implements AppComponent
{
  id: string;
  componentIndex = 0;
  componentPath = '1';
  componentChildIndex = 0;
  componentChildIndexMap = new Map();
  newComponentsPathIdMap: Record<string, string> = {};
  newComponentsIdStateMap: Record<string, any> = {};
  pendingIdStateMap: Record<string, any> = {};
  newComponentIds: Set<string> = new Set();
  components: Map<string, WorkerRenderComponent> = new Map();
  eventHandles: Record<string, () => void>;
  componentSpec = null!;
  scheduled = false;
  componentNameDefaultPropsMap: Record<string, string> = {};

  componentName = '';

  constructor(props: any) {
    super(props);
    this.eventHandles = {};
    this.id = '1';
    this.addComponent(this);
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
  callMethod() {
    return;
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
    for (const id of Object.keys(newComponentsIdStateMap)) {
      if (!components.has(id)) {
        delete newComponentsIdStateMap[id];
      }
    }

    for (const path of Object.keys(newComponentsPathIdMap)) {
      const id: string = newComponentsPathIdMap[path];
      if (!components.has(id)) {
        delete newComponentsIdStateMap[path];
      }
    }

    for (const id of Array.from(this.newComponentIds)) {
      const component = components.get(id)!;
      const { componentName } = component;
      if (!componentNameDefaultPropsMap[componentName]) {
        componentNameDefaultPropsMap[componentName] =
          getComponentDesc(componentName).defaultProps || {};
        newComponentNameDefaultPropsMap[componentName] =
          componentNameDefaultPropsMap[componentName];
      }
    }

    this.postMessage({
      newComponentsIdStateMap,
      newComponentsPathIdMap,
      pendingIdStateMap,
      newComponentNameDefaultPropsMap,
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
  getNativeEventHandle = (name: string) => {
    return name;
  };
  getComponentEventHandle = (name: string) => {
    return name;
  };
  render(): React.ReactNode {
    const componentDesc = getComponentDesc('main');
    const element = componentDesc.render({
      native: nativeComponents,
      props: {},
      state: {},
      getNativeEventHandle: this.getNativeEventHandle,
      getComponentEventHandle: this.getComponentEventHandle,
      getComponentClass: getComponentClass,
    });
    return componentPath.renderWithComponentContext(this, element);
  }
}

componentPath.classWithContext(App);

export default App;
