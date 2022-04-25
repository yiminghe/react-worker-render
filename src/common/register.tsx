import type { WorkerRenderComponentSpec } from './types';

const componentMaps: Record<string, WorkerRenderComponentSpec> = {};

export function registerComponent(
  name: string,
  desc: WorkerRenderComponentSpec,
) {
  componentMaps[name] = desc;
}

export function getComponentDesc(name: string) {
  return componentMaps[name];
}
