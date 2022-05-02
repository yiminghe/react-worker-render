import React from 'react';
import { Div } from './nativeComponents/Div';

export function getNativeComponentClass(name: string): React.ComponentClass {
  if (nativeComponents[name]) {
    return nativeComponents[name];
  }

  class CC extends React.Component<any> {
    render() {
      const Tag = name;
      return <Tag {...this.props}></Tag>;
    }
  }

  const C: any = CC;
  C.displayName = name;
  nativeComponents[name] = C;
  return C;
}

export const nativeComponents: Record<string, React.ComponentClass> = {
  Div,
};

Object.assign(nativeComponents, {
  A: getNativeComponentClass('a'),
  Link: getNativeComponentClass('link'),
});

export function registerNativeComponent(
  cls: string,
  Cls: React.ComponentClass,
) {
  nativeComponents[cls] = Cls;
}
