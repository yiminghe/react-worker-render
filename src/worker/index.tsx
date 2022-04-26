import { registerComponent } from '../common/register';
import noopRender from './noopRender';
import React from 'react';
import App from './App';
import { MessageChannel } from '../common/types';

export { registerComponent };

export function bootstrap({ channel }: { channel: MessageChannel }) {
  noopRender.create(<App channel={channel} />);
}
