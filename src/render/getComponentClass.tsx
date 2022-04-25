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

export function getComponentClass(name: string) {
  if (componentClassCache[name]) {
    return componentClassCache[name];
  }

  class Component extends React.Component implements WorkerRenderComponent {
    id: string;
    componentIndex = 0;
    componentPath = '';
    componentChildIndex = 0;
    componentChildIndexMap = new Map();
    nativeEventHandles: Record<string, () => void>;

    static contextType = ComponentContext;

    constructor(props: any) {
      super(props);
      this.id = ++gid + '';
      this.nativeEventHandles = {};
      this.getContext().app.addComponent(this);
      this.state = {
        ___self: this,
      };
    }

    static getDerivedStateFromProps(_: any, { ___self }: any) {
      componentPath.updateComponentPath(___self);
      return {};
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
      const componentDesc = getComponentDesc('main');
      const element = componentDesc.render({
        native: nativeComponents,
        props: {},
        state: {},
        getNativeEventHandle: this.getNativeEventHandle,
        getComponentEventHandle: this.getComponentEventHandle,
        getComponentClass,
      });
      return componentPath.renderWithComponentContext(this, element);
    }
  }

  (Component as any).displayName = name;
  componentClassCache[name] = Component;
  return Component;
}
