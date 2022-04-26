import componentPath from '../common/componentPath';
import React from 'react';
import { getComponentDesc } from '../common/register';
import { AppComponent, WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponentClass';
import { getComponentClass } from './getComponentClass';
class App
  extends React.Component<{ channel: MessageChannel }>
  implements AppComponent
{
  id: string;
  componentIndex = 0;
  componentPath = '1';
  componentChildIndex = 0;
  componentChildIndexMap = new Map();
  newComponentsPathIdMap = {};
  newComponentsIdStateMap = {};
  pendingIdStateMap: Record<string, any> = {};
  newComponentIds: Set<string> = new Set();
  components: Map<string, WorkerRenderComponent> = new Map();
  eventHandles: Record<string, () => void>;
  componentSpec = null!;
  constructor(props: any) {
    super(props);
    this.eventHandles = {};
    this.id = '1';
    this.addComponent(this);
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
  render(): JSX.Element {
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
