import { registerComponent } from '../common/register';
import App from './App';
import React from 'react';
import { WorkerLike } from '../common/types';

export { registerComponent };

export function bootstrap({
  worker,
  render,
  entry,
  batchedUpdates,
}: {
  entry: string;
  batchedUpdates: (fn: () => void) => void;
  worker: WorkerLike;
  render: (element: React.ReactChild) => void;
}) {
  render(<App batchedUpdates={batchedUpdates} worker={worker} entry={entry} />);
}

export { registerNativeComponent } from './nativeComponent';
