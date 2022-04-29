import { ReactRender } from '../../src/index';
import render from './app/render';
import { createRoot } from 'react-dom/client';
import React from 'react';

ReactRender.registerComponent('app', {
  render,
});

const worker = new Worker(new URL('./worker.ts', import.meta.url));

const container = document.getElementById('root')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript

ReactRender.bootstrap({
  worker,
  render(element: React.ReactChild) {
    root.render(element);
  },
});
