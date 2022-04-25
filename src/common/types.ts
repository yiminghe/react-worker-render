import React from 'react';
import type { ComponentContextValue } from './ComponentContext';

export interface WorkerRenderComponent extends React.Component {
  id: string;
  componentContext?: ComponentContextValue;
  componentChildIndex: number;
  componentChildIndexMap: Map<WorkerRenderComponent, number>;
  componentIndex: number;
  componentPath: string;
}

export interface AppComponent extends WorkerRenderComponent {
  componentIdPathMap: Map<string, string>;
  addComponent(component: WorkerRenderComponent): void;
  removeComponent(component: WorkerRenderComponent): void;
}

export interface WorkerRenderComponentSpec
  extends React.ComponentLifecycle<any, any> {
  render: (args: {
    native: Record<string, React.ComponentClass>;
    props: any;
    state: any;
    getComponentClass: (name: string) => React.ComponentClass;
    getNativeEventHandle: (name: string) => any;
    getComponentEventHandle: (name: string) => any;
  }) => React.ReactNode;
}

export interface MessageChannel {
  postMessage(msg: string): void;
  onMessage(msg: string): void;
}
