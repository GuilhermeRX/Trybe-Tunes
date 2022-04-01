export const SERVICE = 'SERVICE';

export function service(artist, isplay, indexMusic) {
  return {
    type: SERVICE,
    artist,
    isplay,
    indexMusic,
  };
}
