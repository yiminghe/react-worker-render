export function noop() {
  return;
}

export function cleanFuncJson(json: any) {
  const ret: any = {};
  for (const k of Object.keys(json)) {
    const value = json[k];
    if (typeof value !== 'function') {
      ret[k] = value;
      continue;
    }
    if (k.match(/^on[A-z]/)) {
      ret[k] = value.handleName + '';
    }
  }
  return ret;
}

export function safeJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}
