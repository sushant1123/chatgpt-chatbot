export class ResponseError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.code = code || 401;
  }
}
