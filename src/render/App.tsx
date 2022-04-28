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
import ReactDOM from 'react-dom';
import { noop } from '../common/utils';

class App
  extends React.Component<{ channel: MessageChannel }, { inited: boolean }>
  implements AppComponent
{
  componentIndex = 0;
  componentPath = '1';
  componentChildIndex = 0;
  componentChildIndexMap = new Map();
  newComponentsPathIdMap = {};
  componentNameDefaultPropsMap = {};
  newComponentsIdStateMap = {};
  pendingIdStateMap = {};
  components: Map<string, WorkerRenderComponent> = new Map();
  componentSpec = null!;

  constructor(props: any) {
    super(props);
    this.props.channel.onMessage = this.onMessage;
    this.state = {
      inited: false,
    };
  }
  onMessage = (e: any) => {
    const msg: FromWorkerMsg = JSON.parse(e.data);
    const {
      newComponentsIdStateMap,
      newComponentsPathIdMap,
      pendingIdStateMap,
      newComponentNameDefaultPropsMap,
    } = msg;
    const { components, componentNameDefaultPropsMap } = this;
    Object.assign(
      componentNameDefaultPropsMap,
      newComponentNameDefaultPropsMap,
    );
    for (const name of Object.keys(newComponentNameDefaultPropsMap)) {
      getComponentClass(name).defaultProps =
        newComponentNameDefaultPropsMap[name];
    }
    this.newComponentsIdStateMap = newComponentsIdStateMap;
    this.newComponentsPathIdMap = newComponentsPathIdMap;

    ReactDOM.unstable_batchedUpdates(() => {
      if (!this.state.inited) {
        this.setState({
          inited: true,
        });
      }
      for (const id of Object.keys(pendingIdStateMap)) {
        const state = pendingIdStateMap[id];
        const component = components.get(id)!;
        component.setState(state);
      }
    });
  };
  postMessage(msg: FromRenderMsg) {
    this.props.channel.postMessage(JSON.stringify(msg));
  }

  addComponent(component: WorkerRenderComponent) {
    this.components.set(component.id, component);
  }
  removeComponent(component: WorkerRenderComponent) {
    this.components.delete(component.id);
  }

  setStateState = noop;

  render(): React.ReactNode {
    if (this.state.inited) {
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
    } else {
      return null;
    }
  }
}

componentPath.classWithContext(App);

export default App;
