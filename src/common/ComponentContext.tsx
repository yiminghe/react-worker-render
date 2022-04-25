import React from 'react';
import type { AppComponent, WorkerRenderComponent } from './types';

export type ComponentContextValue = {
  parent: WorkerRenderComponent;
  app: AppComponent;
};

const ComponentContext = React.createContext<ComponentContextValue>({
  parent: null!,
  app: null!,
});

export default ComponentContext;
