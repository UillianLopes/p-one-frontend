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
          ? data[key].map((value: any) => getQueryValue(value))
          : getQueryValue(data[key]),
    }))
    .filter((item) => Object.keys(item).some((key) => item[key] !== undefined))
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
