import React from 'react';
import { getComponentDesc } from '../common/register';
import { FromRenderMsg, WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponent';
import componentPath from '../common/componentPath';
import ComponentContext, {
  ComponentContextValue,
} from '../common/ComponentContext';
import Input from './nativeComponents/Input';
import { noop } from '../common/utils';

const componentClassCache: Record<string, React.ComponentClass> = {};

export function getComponentClass(name: string): React.ComponentClass {
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
    componentIndex = 0;
    componentPath = '';
    componentChildIndex = 0;
    componentChildIndexMap = new Map();
    eventHandles: Record<string, () => void> = {};
    componentSpec = componentSpec;
    componentName = name;
    static contextType = ComponentContext;
    publicInstance: any = {};
    id = '';
    constructor(props: any) {
      super(props);
      this.state = {
        __self: this,
        __state: {},
      };
      this.publicInstance = Object.create(componentSpec);
      Object.defineProperty(this.publicInstance, 'props', {
        get: this.getInstanceProps,
      });
      Object.defineProperty(this.publicInstance, 'state', {
        get: this.getInstanceState,
      });
    }
    static getDerivedStateFromProps(_: any, { __self }: State) {
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
        return { __state: state };
      }
      return {};
    }

    setStateState(newState: any) {
      this.setState(({ __state }) => {
        return {
          __state: {
            ...__state,
            ...newState,
          },
        };
      });
    }

    getInstanceProps = () => {
      return this.props;
    };
    getInstanceState() {
      return this.state.__state;
    }
    getContext() {
      return this.context as ComponentContextValue;
    }

    componentDidMount() {
      componentSpec.componentDidMount?.call(this.publicInstance);
    }

    callMethod = noop;

    componentDidUpdate(prevProps: any, prevState: State) {
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

    getEventHandle = (name: string) => {
      const { eventHandles } = this;
      const { app } = this.context as ComponentContextValue;
      if (eventHandles[name]) {
        return eventHandles[name];
      }
      eventHandles[name] = (...args: any) => {
        const msg: FromRenderMsg = {
          componentId: this.id,
          method: name,
          args,
        };
        app.postMessage(msg);
      };
      (eventHandles as any).handleName = name;
      return eventHandles[name];
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
  Input: (Input as any) || getComponentClass('input'),
});
