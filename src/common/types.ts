import React from 'react';
import type { ComponentContextValue } from './ComponentContext';

export interface ComponentPathMeta<P = any, S = any>
  extends React.Component<P, S> {
  componentContext?: ComponentContextValue;
  componentChildIndex: number;
  componentChildIndexMap: Map<ComponentPathMeta, number>;
  componentIndex: number;
  componentPath: string;
}

export interface WorkerRenderComponent<P = any, S = any>
  extends ComponentPathMeta<P, S> {
  id: string;
  componentName: string;
  getInstanceState(): any;
  getInstanceProps(): any;
  componentSpec: WorkerRenderComponentSpec;
  callMethod(method: string, args: any[]): void;
}
export type ComponentPath = string;
export type ComponentId = string;

export interface AppComponent<P = any, S = any>
  extends ComponentPathMeta<P, S> {
  postMessage(msg: any): void;
  componentNameDefaultPropsMap: Record<string, string>;
  newComponentsPathIdMap: Record<ComponentPath, ComponentId>;
  newComponentsIdStateMap: Record<ComponentId, any>;
  addComponent(component: WorkerRenderComponent): void;
  setStateState(component: WorkerRenderComponent, state: any): void;
  removeComponent(component: WorkerRenderComponent): void;
}

export interface WorkerRenderComponentSpec
  extends React.ComponentLifecycle<any, any>,
    React.StaticLifecycle<any, any> {
  getInitialState?: () => any;
  defaultProps?: any;
  render: (this: {
    native: Record<string, React.ComponentClass>;
    props: any;
    state: any;
    getComponent: (name: string) => React.ComponentClass;
    getNativeEventHandle: (name: string) => any;
    getComponentEventHandle: (name: string) => any;
  }) => React.ReactNode;
  [k: string]: any;
}

export interface MessageChannel {
  postMessage(msg: string): void;
  onMessage(msg: string): void;
}

export interface FromWorkerMsg {
  newComponentNameDefaultPropsMap: Record<string, string>;
  pendingIdStateMap: Record<string, string>;
  newComponentsPathIdMap: Record<string, string>;
  newComponentsIdStateMap: Record<string, string>;
}

export interface FromRenderMsg {
  componentId: string;
  method: string;
  args: any[];
}
