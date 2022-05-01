import { ReactWorker } from '../../src/index';
import lifecycle from './app/lifecycle';
import render from './app/render';
import titleLifecycle from './title/lifecycle';
import titleRender from './title/render';

ReactWorker.registerComponent('app', {
  ...lifecycle,
  render,
});

ReactWorker.registerComponent('title', {
  ...titleLifecycle,
  render: titleRender,
});

ReactWorker.bootstrap({
  worker: self,
});
