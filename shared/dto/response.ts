export default class ResponseDTO<T> {
  private readonly success: boolean;
  private readonly data?: T;
  private readonly message?: string;
  private readonly error?: any;

  constructor({
    success,
    data,
    message,
    error,
  }: {
    success: boolean;
    data?: T;
    message?: string;
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
