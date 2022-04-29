import Reconciler from 'react-reconciler';

function noop() {
  return;
}

const HostConfig: any = {
  supportsMutation: true,
  appendInitialChild: noop,
  createInstance: noop,
  createTextInstance: noop,
  finalizeInitialChildren: noop,
  getRootHostContext: noop,
  getChildHostContext: noop,
  now: () => Date.now(),
  getPublicInstance: noop,
  prepareForCommit: noop,
  prepareUpdate: noop,
  resetAfterCommit: noop,
  shouldSetTextContent: () => true,
  appendChild: noop,
  appendChildToContainer: noop,
  commitTextUpdate: noop,
  commitMount: noop,
  commitUpdate: noop,
  insertBefore: noop,
  insertInContainerBefore: noop,
  removeChild: noop,
  removeChildFromContainer: noop,
  resetTextContent: noop,
  clearContainer: noop,
};

let Render: any;
let id = 0;

function getRender() {
  if (!Render) {
    Render = Reconciler(HostConfig);
  }
  return Render;
}

export default {
  create(element: React.ReactNode) {
    const container = getRender().createContainer(++id, false, false);
    const entry = {
      update(newElement: React.ReactNode) {
        getRender().updateContainer(newElement, container, null, null);
      },
      unmount() {
        getRender().updateContainer(null, container, null);
      },
    };
    entry.update(element);
    return entry;
  },
  batchedUpdates(...args: any) {
    return getRender().batchedUpdates(...args);
  },
};
