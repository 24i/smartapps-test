export function setHttp(url: string): string {
  if (url.search(/^http[s]?\:\/\//) == -1) {
    url = 'https://' + url;
  }
  return url;
}

export const keyGenerator = (id: string): string => '_' + Math.random().toString(36).substr(2, 9) + id;
