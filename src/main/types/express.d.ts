// biome-ignore lint/suspicious/useNamespaceKeyword: typing an module
declare module Express {
  interface Request {
    locals?: any;
  }
}
