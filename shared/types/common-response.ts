type LoginResponse = {
  token: string;
  userState: {
    name: string;
    email: string;
    uuid: string;
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
};

type DeleteEntryResponse = {
  acknowledged: boolean;
  deletedCount: number;
};

export {
  LoginResponse,
  RefreshResponse,
  GetAllEntriesResponse,
  DeleteEntryResponse,
};
