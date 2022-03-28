import { DateTime } from 'luxon';

export function serializeToQueryParams(data: any): {
  [key: string]: string | boolean | number | (string | boolean | number)[];
} {
  if (!data) {
    return {};
  }

  return Object.keys(data)
    .map((key) => ({
      [key]:
        data[key] instanceof Array
          ? data[key].map((e: any) => getQueryValue(e))
          : getQueryValue(data[key]),
    }))
    .reduce((a, b) => ({ ...a, ...b }), {});
}

function getQueryValue(data: any): number | string | boolean | undefined {
  if (data instanceof Date) {
    return DateTime.fromJSDate(data).toISODate();
  }

  if (
    ['string', 'number', 'bigint', 'boolean', 'symbol'].includes(typeof data)
  ) {
    return data;
  }

  return undefined;
}
