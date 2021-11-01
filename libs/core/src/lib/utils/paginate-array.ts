export function paginateArray<T>(
  array: T[],
  pagination: { page: number; pageSize: number }
) {
  const { page, pageSize } = pagination;
  return array.slice((page - 1) * pageSize, page * pageSize);
}
