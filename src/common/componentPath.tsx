import ComponentContext, { ComponentContextValue } from './ComponentContext';
import React from 'react';
import { ComponentPathMeta } from './types';

function getComponentContext(instance: ComponentPathMeta) {
  if (!instance.componentContext) {
    instance.componentContext = {
      parent: instance,
      app:
        (instance.context as ComponentContextValue)?.app || (instance as any),
    };
  }
  return instance.componentContext;
}

const componentPath = {
  classWithContext(ComponentClass: React.ComponentClass) {
    ComponentClass.contextType = ComponentContext;
  },

  updateComponentPath(instance: ComponentPathMeta) {
    const { parent } = instance.context as ComponentContextValue;
    const { componentChildIndexMap } = parent;
    if (componentChildIndexMap.has(instance)) {
      instance.componentIndex = componentChildIndexMap.get(instance)!;
    } else {
      instance.componentIndex = ++parent.componentChildIndex;
      componentChildIndexMap.set(instance, instance.componentIndex);
      instance.componentPath = '';
    }
  },

  getComponentPath(instance: ComponentPathMeta) {
    if (!instance.componentPath) {
      const { parent } = instance.context as ComponentContextValue;
      instance.componentPath = `${componentPath.getComponentPath(parent)}-${
        instance.componentIndex
      }`;
    }
    return instance.componentPath;
  },

  renderWithComponentContext(
    instance: ComponentPathMeta,
    element: React.ReactNode,
  ) {
    instance.componentChildIndex = 0;
    instance.componentChildIndexMap.clear();
    return (
      <ComponentContext.Provider value={getComponentContext(instance)}>
        {element}
      </ComponentContext.Provider>
    );
  },
};

export default componentPath;
