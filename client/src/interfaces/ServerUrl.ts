class ServerUrl {
    static API_PROXY = '/api';
    static USER_API = '/user_api';
    static ENTRIES_API = '/entry_api';

    static LOGOUT_API = `${ServerUrl.USER_API}/logout`;
    static LOGIN_API = `${ServerUrl.USER_API}/login`;
    static REFRESH_TOKEN_API = `${ServerUrl.USER_API}/refresh_token`;
    static GET_ALL_ENTRIES_API = `${ServerUrl.ENTRIES_API}/get_all_entries`;
}

export default ServerUrl;