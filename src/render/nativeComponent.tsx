import React from 'react';
import { Div } from './nativeComponents/Div';

export const nativeComponents: Record<string, React.ComponentClass> = {
  Div,
};

export function getNativeComponentClass(cls: string) {
  if (nativeComponents[cls]) {
    return nativeComponents[cls];
  }
}

export function registerNativeComponent(
  cls: string,
  Cls: React.ComponentClass,
) {
  nativeComponents[cls] = Cls;
}
