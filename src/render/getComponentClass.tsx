import React from 'react';
import { getComponentDesc } from '../common/register';
import { FromRenderMsg, WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponentClass';
import componentPath from '../common/componentPath';
import ComponentContext, {
  ComponentContextValue,
} from '../common/ComponentContext';
import Input from './native/Input';
import { noop } from '../common/utils';

const componentClassCache: Record<string, React.ComponentClass> = {};

export function getComponentClass(name: string): React.ComponentClass {
  if (componentClassCache[name]) {
    return componentClassCache[name];
  }

  const componentSpec = getComponentDesc(name);

  class Component
    extends React.Component<any, { state: any; __self: Component }>
    implements WorkerRenderComponent
  {
    componentIndex = 0;
    componentPath = '';
    componentChildIndex = 0;
    componentChildIndexMap = new Map();
    nativeEventHandles: Record<string, () => void> = {};
    componentSpec = componentSpec;
    componentName = name;
    static contextType = ComponentContext;
    publicInstance: any = {};
    id = '';
    constructor(props: any) {
      super(props);
      this.state = {
        __self: this,
        state: {},
      };
      this.publicInstance = Object.create(componentSpec);
      Object.defineProperty(this.publicInstance, 'props', {
        get: this.getInstanceProps,
      });
      Object.defineProperty(this.publicInstance, 'state', {
        get: this.getInstanceState,
      });
    }
    static getDerivedStateFromProps(_: any, { __self }: any) {
      const instance: Component = __self;
      componentPath.updateComponentPath(instance);
      let state;
      const { app } = instance.context as ComponentContextValue;
      if (!instance.id) {
        const path = componentPath.getComponentPath(instance);
        instance.id = app.newComponentsPathIdMap[path];
        if (!instance.id) {
          throw new Error(`Can not find id from path: ${path}`);
        }
        app.addComponent(instance);
        state = app.newComponentsIdStateMap[instance.id] || {};
        return { state };
      }
      return {};
    }

    setStateState(newState: any) {
      this.setState(({ state }) => {
        return {
          state: {
            ...state,
            ...newState,
          },
        };
      });
    }

    getInstanceProps = () => {
      return this.props;
    };
    getInstanceState() {
      return this.state.state;
    }
    getContext() {
      return this.context as ComponentContextValue;
    }

    componentDidMount() {
      componentSpec.componentDidMount?.call(this.publicInstance);
    }

    callMethod = noop;

    componentDidUpdate(prevProps: any, prevState: any) {
      const { publicInstance } = this;
      componentSpec.componentDidUpdate?.call(
        publicInstance,
        prevProps,
        prevState.state,
      );
    }

    componentWillUnmount() {
      componentSpec.componentWillUnmount?.call(this.publicInstance);
      this.getContext().app.removeComponent(this);
    }

    getNativeEventHandle = (name: string) => {
      const { nativeEventHandles } = this;
      const { app } = this.context as ComponentContextValue;
      if (nativeEventHandles[name]) {
        return nativeEventHandles[name];
      }
      nativeEventHandles[name] = (...args: any) => {
        const msg: FromRenderMsg = {
          componentId: this.id,
          method: name,
          args,
        };
        app.postMessage(msg);
      };
      (nativeEventHandles as any).handleName = name;
      return nativeEventHandles[name];
    };

    getComponentEventHandle = (name: string) => {
      return name;
    };

    render(): React.ReactNode {
      const element = componentSpec.render.call({
        native: nativeComponents,
        props: this.props,
        state: this.state.state,
        getNativeEventHandle: this.getNativeEventHandle,
        getComponentEventHandle: this.getComponentEventHandle,
        getComponent: getComponentClass,
      });
      return componentPath.renderWithComponentContext(this, element);
    }
  }

  const C = Component as any;

  C.displayName = name;
  componentClassCache[name] = C;
  return C;
}

Object.assign(nativeComponents, {
  Input: (Input as any) || getComponentClass('input'),
});
