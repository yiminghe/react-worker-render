import React from 'react';
import { Div } from './native/Div';

export const nativeComponents: Record<string, React.ComponentClass> = {
  div: Div,
};

export function getNativeComponentClass(cls: string) {
  if (nativeComponents[cls]) {
    return nativeComponents[cls];
  }
}

export function registerNativeComponentClass(
  cls: string,
  Cls: React.ComponentClass,
) {
  nativeComponents[cls] = Cls;
}
