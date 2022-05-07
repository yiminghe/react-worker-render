import { ReactRender } from '../../src/index';
import render from './app/render';
import titleRender from './title/render';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';

const entry = 'app';

ReactRender.registerComponent(entry, {
  render,
});

ReactRender.registerComponent('title', {
  render: titleRender,
});

const worker = new Worker(new URL('./worker.ts', import.meta.url));

const container = document.getElementById('root')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript

ReactRender.bootstrap({
  worker,
  entry,
  batchedUpdates: ReactDOM.unstable_batchedUpdates,
  render(element: React.ReactChild) {
    root.render(element);
  },
});
