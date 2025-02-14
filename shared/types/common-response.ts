interface LoginResponse {
  token: string;
  userState: {
    name: string;
    email: string;
    uuid: string;
  };
}

interface RefreshResponse {
  token: string;
  // userState: {
  //     name: string;
  //     email: string;
  //     uuid: string;
  // }
}

type EmailPasswordType = {
  email: string;
  password: string;
};

export { LoginResponse, RefreshResponse, EmailPasswordType };
