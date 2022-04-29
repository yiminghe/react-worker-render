import { registerComponent } from '../common/register';
import App from './App';
import React from 'react';
import { WorkerLike } from '../common/types';

export { registerComponent };

export function bootstrap({
  worker,
  render,
}: {
  worker: WorkerLike;
  render: (element: React.ReactChild) => void;
}) {
  render(<App worker={worker} />);
}
