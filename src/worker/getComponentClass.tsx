import React from 'react';
import { getComponentDesc } from '../common/register';
import { WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponent';
import componentPath from '../common/componentPath';
import ComponentContext, {
  ComponentContextValue,
} from '../common/ComponentContext';
import { WorkerComponent } from './types';
import NativeInput from './nativeComponents/Input';

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

  interface State {
    __state: any;
    __self: Component;
  }

  class Component
    extends React.Component<any, State>
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
        get: this.getInstanceProps,
      });
      Object.defineProperty(this.publicInstance, 'state', {
        get: this.getInstanceState,
      });
      this.eventHandles = {};
      this.state = {
        __self: this,
        __state: {},
      };
      if (componentSpec.getInitialState) {
        const state = componentSpec.getInitialState.call(this.publicInstance);
        if (state) {
          (this.state as State).__state = state;
        }
      }
    }

    shouldComponentUpdate(nextProps: any, nextState: State) {
      if (componentSpec.shouldComponentUpdate) {
        return componentSpec.shouldComponentUpdate.call(
          this.publicInstance,
          nextProps,
          nextState.__state,
          undefined,
        );
      }
      return true;
    }

    callMethod(method: string, args: any[]): void {
      const publicInstance: any = this.publicInstance;
      publicInstance[method](...args);
    }

    setStateState = (
      newState: any,
      callback?: () => void,
      sendToRender = true,
    ) => {
      if (!native) {
        sendToRender = true;
      }
      this.setState(({ __state }) => {
        let retState: any = {};
        if (typeof newState === 'function') {
          retState = newState(__state);
        } else {
          retState = newState;
        }
        if (sendToRender) {
          this.getContext().app.setStateState(this, retState);
        }
        return {
          __state: {
            ...__state,
            ...retState,
          },
        };
      }, callback);
    };

    static getDerivedStateFromProps(nextProps: any, { __self }: State) {
      const instance: Component = __self;
      componentPath.updateComponentPath(instance);
      const { app } = instance.context as ComponentContextValue;
      if (!instance.id) {
        instance.id = ++gid + '';
        app.addComponent(instance);
      }
      if (instance.componentSpec.getDerivedStateFromProps) {
        const state = instance.getInstanceState();
        const newState = instance.componentSpec.getDerivedStateFromProps(
          nextProps,
          state,
        );
        return {
          __state: {
            ...state,
            ...newState,
          },
        };
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
        prevState.__state,
      );
    }

    componentWillUnmount() {
      componentSpec.componentWillUnmount?.call(this.publicInstance);
      this.getContext().app.removeComponent(this);
    }

    getInstanceProps = () => {
      return this.props;
    };
    getInstanceState = () => {
      return this.state.__state;
    };

    getEventHandle = (name: string) => {
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
        nativeComponents,
        props: this.props,
        state: this.getInstanceState(),
        getEventHandle: this.getEventHandle,
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
