import { ReactWorker } from '../../src/index';
import lifecycle from './app/lifecycle';
import render from './app/render';

ReactWorker.registerComponent('app', {
  ...lifecycle,
  render,
});

ReactWorker.bootstrap({
  worker: self,
});
