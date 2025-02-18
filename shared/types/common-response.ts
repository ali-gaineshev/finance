type LoginResponse = {
  token: string;
  userState: {
    name: string | null;
    email: string | null;
    uuid: string | null;
  };
};

type RefreshResponse = {
  token: string;
  // userState: {
  //     name: string;
  //     email: string;
  //     uuid: string;
  // }
};

export { LoginResponse, RefreshResponse };
