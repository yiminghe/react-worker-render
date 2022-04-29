import { ReactRender } from '../../src/index';
import render from './app/render';

ReactRender.registerComponent('app', {
  render,
});

const worker = new Worker(new URL('./worker.ts', import.meta.url));

ReactRender.bootstrap({
  worker,
  container: document.getElementById('root')!,
});
