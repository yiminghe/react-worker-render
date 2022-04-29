import { registerComponent } from '../common/register';
import noopRender from './noopRender';
import React from 'react';
import App from './App';
import { WorkerLike } from '../common/types';

export { registerComponent };

export function bootstrap({ worker }: { worker: WorkerLike }) {
  noopRender.create(<App worker={worker} />);
}
