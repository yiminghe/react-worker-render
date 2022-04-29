import componentPath from '../common/componentPath';
import React from 'react';
import {
  AppComponent,
  WorkerRenderComponent,
  WorkerLike,
  FromWorkerMsg,
  FromRenderMsg,
} from '../common/types';
import { getComponentClass } from './getComponentClass';
import ReactDOM from 'react-dom';
import { noop } from '../common/utils';

class App
  extends React.Component<{ worker: WorkerLike }, { inited: boolean }>
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
    this.props.worker.onmessage = this.onmessage;
    this.state = {
      inited: false,
    };
  }
  onmessage = (e: any) => {
    const msg: FromWorkerMsg = JSON.parse(e.data);
    console.log('from worker', msg);
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
        component.setStateState(state);
      }
    });
  };
  postMessage(msg: FromRenderMsg) {
    console.log('send to worker', msg);
    this.props.worker.postMessage(JSON.stringify(msg));
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
      const Main = getComponentClass('app');
      return componentPath.renderWithComponentContext(this, <Main />);
    } else {
      return null;
    }
  }
}

componentPath.classWithContext(App);

export default App;
