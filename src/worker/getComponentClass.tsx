import React from 'react';
import { getComponentDesc } from '../common/register';
import { WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponentClass';
import componentPath from '../common/componentPath';
import ComponentContext, {
  ComponentContextValue,
} from '../common/ComponentContext';
import { WorkerComponent } from './types';
import NativeInput from './native/Input';
import { noop } from '../common/utils';

const componentClassCache: Record<string, React.ComponentClass> = {};

let gid = 1;

export function getComponentClass(
  name: string,
  native = false,
): React.ComponentClass {
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
    componentName = name;

    static contextType = ComponentContext;

    static defaultProps = componentSpec.defaultProps;

    constructor(props: any) {
      super(props);
      this.id = '';
      this.publicInstance = Object.create(componentSpec);
      this.publicInstance.setState = this.setStateState;
      Object.defineProperty(this.publicInstance, 'props', {
        get: () => {
          return this.props;
        },
      });
      Object.defineProperty(this.publicInstance, 'state', {
        get: () => {
          return this.state.state;
        },
      });
      this.eventHandles = {};
      this.state = {
        __self: this,
        state: {},
      };
      if (componentSpec.getInitialState) {
        const state = componentSpec.getInitialState.call(this.publicInstance);
        if (state) {
          (this.state as any).state = state;
        }
      }
    }

    callMethod(method: string, args: any[]): void {
      const publicInstance: any = this.publicInstance;
      publicInstance[method](...args);
    }

    setStateState = (newState: any, sendToRender = true) => {
      if (!native) {
        sendToRender = true;
      }
      this.setState(({ state }) => {
        let ret: any = {};
        if (typeof newState === 'function') {
          ret = { state: newState(state) };
        } else {
          ret = {
            state: newState,
          };
        }
        if (sendToRender) {
          this.getContext().app.setStateState(this, ret.state);
        }
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
        return { state };
      }
      return {};
    }

    getContext() {
      return this.context as ComponentContextValue;
    }

    componentDidMount() {
      componentSpec.componentDidMount?.call(this.publicInstance);
    }

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
      return this.getComponentEventHandle(name);
    };

    getInstanceProps = () => {
      return this.props;
    };
    getInstanceState = () => {
      return this.state.state;
    };

    getComponentEventHandle = (name: string) => {
      const { eventHandles } = this;
      if (eventHandles[name]) {
        return eventHandles[name];
      }
      const publicInstance = this.publicInstance as any;
      const handle: any = (...args: any) => {
        publicInstance[name](...args);
      };
      handle.handleName = name;
      eventHandles[name] = handle;
      return handle;
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
  Input: (NativeInput as any) || getComponentClass('input', true),
});
