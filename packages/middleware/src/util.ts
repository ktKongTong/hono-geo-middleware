export function createInsensitiveHeaderProxy(header: Record<string, string>) {
  return new Proxy(header, {
    get(target, prop: string) {
      for (const key in target) {
        if (key.toLowerCase() === prop.toLowerCase()) {
          return target[key];
        }
      }
      return undefined;
    },
  });
}