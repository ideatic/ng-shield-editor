export function randomString(length: number, allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = '';
  const charactersLength = allowedChars.length;
  for (let i = 0; i < length; i++) {
    result += allowedChars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
