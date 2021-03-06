import componentPath from '../common/componentPath';
import React from 'react';
import { getComponentDesc } from '../common/register';
import {
  AppComponent,
  WorkerRenderComponent,
  WorkerLike,
  FromWorkerMsg,
  FromRenderMsg,
  MSG_TYPE,
} from '../common/types';
import { getComponentClass } from './getComponentClass';
import noopRender from './noopRender';
import { cleanFuncJson, safeJsonParse } from '../common/utils';
import { log } from '../common/log';

class App
  extends React.Component<{ worker: WorkerLike; entry: string }>
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
    this.props.worker.addEventListener('message', this.onmessage);
  }
  onmessage = (e: { data: string }) => {
    const msg: FromRenderMsg = safeJsonParse(e.data);
    if (msg.type !== MSG_TYPE) {
      return;
    }
    log('from render', msg);
    const { componentId, method, args } = msg;
    const component = this.components.get(componentId)!;
    noopRender.batchedUpdates(() => {
      component.callMethod(method, args);
    });
  };
  postMessage(msg: FromWorkerMsg) {
    log('send to render', msg);
    this.props.worker.postMessage(JSON.stringify(msg));
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

  componentDidMount() {
    this.scheduleSendToRender();
  }

  componentWillUnmount() {
    this.props.worker.removeEventListener('message', this.onmessage);
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

      newComponentsIdStateMap[id] = component.getInstanceState();
      newComponentsPathIdMap[componentPath.getComponentPath(component)] = id;

      if (!componentNameDefaultPropsMap[componentName]) {
        componentNameDefaultPropsMap[componentName] =
          getComponentDesc(componentName).defaultProps || {};
        newComponentNameDefaultPropsMap[componentName] =
          componentNameDefaultPropsMap[componentName];
      }
    }

    this.postMessage({
      type: MSG_TYPE,
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
    this.scheduleSendToRender();
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
    const Entry = getComponentClass(this.props.entry);
    return componentPath.renderWithComponentContext(this, <Entry />);
  }
}

componentPath.classWithContext(App);

export default App;
