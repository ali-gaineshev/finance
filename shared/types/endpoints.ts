class BACKEND_ENDPOINT {
  static readonly USER_API = "/user_api";
  static readonly REGISTER = "/register";
  static readonly LOGIN = "/login";
  static readonly LOGOUT = "/logout";
  static readonly REFRESH_TOKEN = "/refresh_token";

  static readonly REGISTER_FULL_PATH = this.USER_API + "/register";
  static readonly LOGIN_FULL_PATH = this.USER_API + "/login";
  static readonly LOGOUT_FULL_PATH = this.USER_API + "/logout";
  static readonly REFRESH_TOKEN_FULL_PATH = this.USER_API + "/refresh_token";
  // ----------------------
  static readonly ENTRY_API = "/entry_api";
  static readonly ADD_ENTRY = "/add_entry";
  static readonly GET_ENTRIES = "/get_entries";
  static readonly DELETE_ENTRY = "/delete_entry";

  static readonly ADD_ENTRY_FULL_PATH = this.ENTRY_API + "/add_entry";
  static readonly GET_ENTRIES_FULL_PATH = this.ENTRY_API + "/get_entries";
  static readonly DELETE_ENTRY_FULL_PATH = this.ENTRY_API + "/delete_entry";
}

export default BACKEND_ENDPOINT;
