import React from 'react';

export const nativeComponents: Record<string, React.ComponentClass> = {};

export function getNativeComponentClass(name: string): React.ComponentClass {
  if (nativeComponents[name]) {
    return nativeComponents[name];
  }

  class CC extends React.Component<any> {
    render() {
      return this.props.children;
    }
  }

  const C: any = CC;
  C.displayName = name;
  nativeComponents[name] = C;
  return C;
}

export function registerNativeComponent(
  cls: string,
  Cls: React.ComponentClass,
) {
  nativeComponents[cls] = Cls;
}

Object.assign(nativeComponents, {
  Div: getNativeComponentClass('div'),
  Link: getNativeComponentClass('link'),
  A: getNativeComponentClass('a'),
});
