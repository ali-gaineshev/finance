/**
 * Class representing standard HTTP status codes.
 * These constants are used to indicate the result of an HTTP request.
 */
class HttpStatusCode {
    static readonly OK: number = 200;
    static readonly CREATED: number = 201;
    static readonly BAD_REQUEST: number = 400;
    static readonly UNAUTHORIZED: number = 401;
    static readonly FORBIDDEN: number = 403;
    static readonly NOT_FOUND: number = 404;
    static readonly METHOD_NOT_ALLOWED: number = 405;
    static readonly INTERNAL_SERVER_ERROR: number = 500;
}

export default HttpStatusCode;