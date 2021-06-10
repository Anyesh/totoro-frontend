const isEmpty = (value: undefined | unknown | string | Record<string, unknown>): boolean =>
  value === undefined ||
  value == null ||
  (typeof value === 'object' && Object.keys(value as Array<unknown>).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

export default isEmpty
