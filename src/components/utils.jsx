export function toPackageRoute(name, fromQuery) {
  const base = `/package/${encodeURIComponent(name)}`;
  return fromQuery ? `${base}?from=${encodeURIComponent(fromQuery)}` : base;
}
 
export function fromPackageParam(param) {
  return decodeURIComponent(param);
}
 
export function toSearchRoute(query) {
  return query ? `/search?q=${encodeURIComponent(query)}` : '/search';
}