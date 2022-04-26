import React from 'react';
import { getComponentDesc } from '../common/register';
import { WorkerRenderComponent } from '../common/types';
import { nativeComponents } from './nativeComponentClass';
import componentPath from '../common/componentPath';
import ComponentContext, {
  ComponentContextValue,
} from '../common/ComponentContext';

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
    nativeEventHandles: Record<string, () => void>;
    componentSpec = componentSpec;

    static contextType = ComponentContext;

    constructor(props: any) {
      super(props);
      this.id = ++gid + '';
      this.nativeEventHandles = {};
      this.state = {
        __self: this,
        state: {},
      };
    }

    static getDerivedStateFromProps(_: any, { __self }: any) {
      const instance: Component = __self;
      componentPath.updateComponentPath(instance);
      let state;
      const { app } = instance.context as ComponentContextValue;
      if (instance.id) {
        state = instance.state.state;
      } else {
        const path = componentPath.getComponentPath(instance);
        instance.id = app.newComponentsPathIdMap[path];
        if (!instance.id) {
          throw new Error(`Can not find id from path: ${path}`);
        }
        app.addComponent(instance);
        state = app.newComponentsIdStateMap[instance.id];
      }
      return { state };
    }

    getContext() {
      return this.context as ComponentContextValue;
    }

    componentWillUnmount() {
      this.getContext().app.removeComponent(this);
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
