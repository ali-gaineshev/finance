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

type GetAllEntriesResponse = {
  entries: Array<object>;
  metadata: {
    totalEntries: number;
    currentPage: number;
    totalPages: number;
  };
  // userState: {
  //     name: string;
  //     email: string;
  //     uuid: string;
  // }
};

export { LoginResponse, RefreshResponse, GetAllEntriesResponse };
