import React from 'react';
import { getComponentDesc } from '../common/register';
import { WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponentClass';
import componentPath from '../common/componentPath';
import ComponentContext, {
  ComponentContextValue,
} from '../common/ComponentContext';
import { WorkerComponent } from './types';

const componentClassCache: Record<string, React.ComponentClass> = {};

let gid = 1;

export function getComponentClass(name: string): React.ComponentClass {
  if (componentClassCache[name]) {
    return componentClassCache[name];
  }

  const componentSpec = getComponentDesc(name);

  class Component
    extends React.Component<any, { state: any; __self: Component }>
    implements WorkerRenderComponent
  {
    id: string;
    componentIndex = 0;
    componentPath = '';
    componentChildIndex = 0;
    componentChildIndexMap = new Map();
    eventHandles: Record<string, () => void>;
    componentSpec = componentSpec;
    publicInstance: WorkerComponent;

    static contextType = ComponentContext;

    constructor(props: any) {
      super(props);
      this.id = '';
      this.publicInstance = {
        props,
        state: {},
        setState: this.setStateState,
      };
      this.eventHandles = {};
      if (componentSpec.getInitialState) {
        componentSpec.getInitialState.call(this.publicInstance);
      }
      this.state = {
        __self: this,
        state: this.publicInstance.state,
      };
    }

    setStateState = (newState: any) => {
      this.setState(({ state }) => {
        let ret: any = {};
        if (typeof newState === 'function') {
          ret = { state: newState(state) };
        } else {
          ret = {
            state: newState,
          };
        }
        this.getContext().app.setStateState(this, ret.state);
        return ret;
      });
    };

    static getDerivedStateFromProps(nextProps: any, { __self }: any) {
      const instance: Component = __self;
      componentPath.updateComponentPath(instance);
      const { app } = instance.context as ComponentContextValue;
      if (!instance.id) {
        instance.id = ++gid + '';
        app.addComponent(instance);
      }
      if (instance.componentSpec.getDerivedStateFromProps) {
        const state = { ...instance.state.state };
        const newState = instance.componentSpec.getDerivedStateFromProps(
          nextProps,
          state,
        );
        Object.assign(state, newState);
        instance.publicInstance.state = state;
        return { state };
      }
    }

    getContext() {
      return this.context as ComponentContextValue;
    }

    componentWillUnmount() {
      this.getContext().app.removeComponent(this);
    }

    getNativeEventHandle = (name: string) => {
      return name;
    };

    getComponentEventHandle = (name: string) => {
      const { eventHandles } = this;
      if (eventHandles[name]) {
        return eventHandles[name];
      }
      const publicInstance = this.publicInstance as any;
      const handle = (...args: any) => {
        publicInstance[name](...args);
      };
      eventHandles[name] = handle;
      return handle;
    };

    render(): JSX.Element {
      const element = componentSpec.render({
        native: nativeComponents,
        props: this.props,
        state: this.state.state,
        getNativeEventHandle: this.getNativeEventHandle,
        getComponentEventHandle: this.getComponentEventHandle,
        getComponentClass,
      });
      return componentPath.renderWithComponentContext(this, element);
    }
  }

  const C = Component as any;

  C.displayName = name;
  componentClassCache[name] = C;
  return C;
}
