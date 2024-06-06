import axios from "axios";

export const pageModule = {
  state: () => {
    return {
      loading: true,
      page_data: {},
      contacts_data: {},
      contacts_page: {}
    };
  },
  getters: {},
  mutations: {
    setLoading: (state, bool) => {
      state.loading = bool;
    },
    setPageData: (state, page) => {
      state.page_data = page;
    },
    setContactsData: (state, page) => {
      state.contacts_data = page;
    },
    setContactsDataBlock: (state, page) => {
      state.contacts_page = page;
    },
  },
  actions: {
    getPageData: async ({ commit }, page_name) => {
      try {
        //   commit("setLoading", true);
        const response = await axios.get(
          "https://45.80.69.32/api/" + page_name
        );
        if (response.status == 200) {
          commit("setPageData", response.data);
        }
      } catch (error) {
        if (error.response.status == 404) {
          document.location = "/404";
        }
        console.log(error.message);
      } finally {
        setTimeout(() => {
          //  commit("setLoading", false);
        }, 3500);
      }
    },
    getContactsData: async ({ commit }, page_name) => {
      try {
        //   commit("setLoading", true);
        const response = await axios.get(
          "https://45.80.69.32/api/" + page_name
        );
        if (response.status == 200) {
          commit("setContactsData", response.data);
        }
      } catch (error) {
        if (error.response.status == 404) {
          document.location = "/404";
        }
        console.log(error.message);
      } finally {
        setTimeout(() => {
          //  commit("setLoading", false);
        }, 3500);
      }
    },
    getContactsDataBlock: async ({ commit }, page_name) => {
      try {
        //   commit("setLoading", true);
        const response = await axios.get(
          "https://45.80.69.32/api/" + page_name
        );
        if (response.status == 200) {
          commit("setContactsDataBlock", response.data);
        }
      } catch (error) {
        if (error.response.status == 404) {
          document.location = "/404";
        }
        console.log(error.message);
      } finally {
        setTimeout(() => {
          //  commit("setLoading", false);
        }, 3500);
      }
    },
  },
  namespaced: true,
};
