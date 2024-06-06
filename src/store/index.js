import { createStore } from "vuex";
import { pageModule } from "./pageModule";

export default createStore({
  state: {
    open_popup: false,
    popup_type: "",
    show_buttons: false,
    loginError: false,
    is_login: "",
    user_name: "",
    notifications: null,
    error_profile_password: null
  },
  getters: {},
  mutations: {
    openPopup(state, bool) {
      state.open_popup = bool;
    },
    setPopupType(state, str) {
      state.popup_type = str;
    },
    showButtons(state, bool) {
      state.show_buttons = bool;
    },
    loginError(state, bool) {
      state.loginError = bool;
    },
    isLogin(state, string) {
      state.is_login = string;
    },
    userName(state, string) {
      state.user_name = string;
    },
    setNotifications(state, value) {
      state.notifications = value;
    },
    openErrorProfilePassword (state, string) {
      state.error_profile_password = string
    }
  },
  actions: {},
  modules: {
    page: pageModule,
  },
});
