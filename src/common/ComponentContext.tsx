import React from 'react';
import type {
  AppComponent,
  ComponentPathMeta,
  WorkerRenderComponent,
} from './types';

export type ComponentContextValue = {
  parent: ComponentPathMeta;
  app: AppComponent;
};

const ComponentContext = React.createContext<ComponentContextValue>({
  parent: null!,
  app: null!,
});

export default ComponentContext;
