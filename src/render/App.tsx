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
  pendingIdStateMap = {};
  components: Map<string, WorkerRenderComponent> = new Map();
  nativeEventHandles: Record<string, () => void>;
  componentSpec = null!;

  constructor(props: any) {
    super(props);
    this.nativeEventHandles = {};
    this.id = '1';
    this.addComponent(this);
  }
  addComponent(component: WorkerRenderComponent) {
    this.components.set(component.id, component);
  }
  removeComponent(component: WorkerRenderComponent) {
    this.components.delete(component.id);
  }
  getNativeEventHandle = (name: string) => {
    const { nativeEventHandles } = this;
    if (nativeEventHandles[name]) {
      return nativeEventHandles[name];
    }
  };
  getComponentEventHandle = (name: string) => {
    return name;
  };
  setStateState() {
    return;
  }
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
