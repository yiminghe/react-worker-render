import React from 'react';
export const nativeComponents: Record<string, React.ComponentClass> = {};

nativeComponents.div = getNativeComponentClass('div');

export function getNativeComponentClass(name: string): React.ComponentClass {
  if (nativeComponents[name]) {
    return nativeComponents[name];
  }

  class Div extends React.Component<any> {
    render() {
      return this.props.children;
    }
  }

  const C: any = Div;
  C.displayName = name;
  nativeComponents[name] = C;
  return C;
}

export function registerNativeComponentClass(
  cls: string,
  Cls: React.ComponentClass,
) {
  nativeComponents[cls] = Cls;
}
