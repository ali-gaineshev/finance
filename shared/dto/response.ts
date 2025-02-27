export default class ResponseDTO<T> {
  readonly success: boolean;
  readonly message: string;
  readonly data?: T;
  readonly error?: any;

  constructor({
    success,
    data,
    message,
    error,
  }: {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
  }) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  isSuccess(): boolean {
    return this.success;
  }

  getData(): T | undefined {
    return this.data;
  }

  getMessage(): string | undefined {
    return this.message;
  }

  getError(): string | undefined {
    return this.error;
  }

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      error: this.error,
    };
  }
}
