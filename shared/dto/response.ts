export class ResponseDTO<T> {
    constructor(
        private readonly success: boolean,
        private readonly data?: T,
        private readonly message?: string,
        private readonly error?: string,
    ) {}

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
}

