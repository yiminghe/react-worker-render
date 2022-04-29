import { registerComponent } from '../common/register';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { WorkerLike } from '../common/types';

export { registerComponent };

export function bootstrap({
  worker,
  container,
}: {
  worker: WorkerLike;
  container: HTMLElement;
}) {
  ReactDOM.render(<App worker={worker} />, container);
}
