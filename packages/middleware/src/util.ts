import {EMOJI_FLAG_UNICODE_STARTING_POSITION} from "./extractor/vercel.ts";

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

export function tryDecodeURIText(text: string | undefined): string | undefined {
  if (text) {
    return decodeURIComponent(text);
  }
  return undefined;
}

// see https://github.com/vercel/vercel/blob/main/packages/functions/src/headers.ts
export function getFlagFromCountryCode(countryCode: string | undefined): string | undefined {
  const regex = new RegExp('^[A-Z]{2}$').test(countryCode!);
  if (!countryCode || !regex) return undefined;
  return String.fromCodePoint(
    ...countryCode
      .split('')
      .map(char => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
  );
}