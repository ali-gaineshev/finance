const enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

type EmailPasswordType = {
  email: string;
  password: string;
};

const enum JWT_TOKEN_CREDENTIALS_TYPE {
  LOGIN = "login_credentials",
  REFRESH = "refresh_credentials",
}

export { HTTP_CODE, JWT_TOKEN_CREDENTIALS_TYPE, EmailPasswordType };
