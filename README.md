# react-worker-render

[![NPM version](https://badge.fury.io/js/react-worker-render.png)](http://badge.fury.io/js/react-worker-render)
[![NPM downloads](http://img.shields.io/npm/dm/react-worker-render.svg)](https://npmjs.org/package/react-worker-render)
[![Build Status](https://app.travis-ci.com/yiminghe/react-worker-render.svg?branch=main)](https://app.travis-ci.com/github/yiminghe/react-worker-render)

move react component lifecycle to worker and render to dom

## example

https://yiminghe.github.io/react-worker-render

## API

### types

```ts
interface WorkerRenderComponentSpec extends React.ComponentLifecycle<any, any>, React.StaticLifecycle<any, any> {
    getInitialState?: () => any;
    defaultProps?: any;
    render: (this: {
        nativeComponents: Record<string, React.ComponentClass>;
        props: any;
        state: any;
        getComponent: (name: string) => React.ComponentClass;
        getEventHandle: (name: string) => any;
    }) => React.ReactNode;
    [k: string]: any;
}
declare function registerComponent(name: string, desc: WorkerRenderComponentSpec): void;
export interface WorkerLike {
    postMessage(msg: string): void;
    onmessage: ((e: any) => void) | null;
}
```

### ReactWorker

```ts
import { ReactWorker } from 'react-worker-render';
```

```ts
export declare function registerNativeComponent(cls: string, Cls: React.ComponentClass): void;
export declare function registerComponent(name: string, desc: WorkerRenderComponentSpec): void;
export declare function bootstrap(params: {
    worker: WorkerLike;
    entry: string;
}): void;
```

### ReactRender

```ts
import { ReactRender } from 'react-worker-render';
```

```ts
export declare function registerComponent(name: string, desc: {render:WorkerRenderComponentSpec['render']}): void;
export declare function registerNativeComponent(cls: string, Cls: React.ComponentClass): void;
export declare function bootstrap(params: {
    worker: WorkerLike;
    entry: string;
    render: (element: React.ReactChild) => void;
}): void;
```

## development

```
yarn
yarn start
```

open: http://localhost:3000/

## supported react versions

16-18

App can override react/react-dom/react-reconciler version using yarn resolutions.
