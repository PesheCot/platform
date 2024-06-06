<template>
  <Header />
  <div class="container">
    <Main
      :desc="page_data.data?.attributes?.registration_title"
      :title="page_data.data?.attributes?.registration_text"
      :src="
        'https://45.80.69.32' +
        page_data.data?.attributes?.registration_picture?.data?.attributes?.url
      "
    />
    <About
      :title="page_data.data?.attributes?.about_title"
      :desc="page_data.data?.attributes?.about_text"
      :src="
        'https://45.80.69.32' +
        page_data.data?.attributes?.about_picture?.data?.attributes?.url
      "
    />
    <AboutProject
      :title="page_data.data?.attributes?.platform_works_title"
      :blocks="page_data.data?.attributes?.blocks"
    />
    <Apparel
      :title="page_data.data?.attributes?.company_title"
      :desc="page_data.data?.attributes?.company_text"
      :link="page_data.data?.attributes?.company_link"
    />
    <Contacts
      :title="contacts_page?.data?.attributes?.title"
      :phone="contacts_page?.data?.attributes?.phone"
      :mail="contacts_page?.data?.attributes?.email"
      :info1="contacts_page?.data?.attributes?.info1"
      :info2="contacts_page?.data?.attributes?.info2"
      :fio="contacts_page?.data?.attributes?.fio"
      :time_worck="contacts_page?.data?.attributes?.work_time"
    />
  </div>
  <Footer :phone="contacts_data?.data?.attributes?.phone" :mail="contacts_data?.data?.attributes?.email" :time="contacts_data?.data?.attributes?.work_time" :year="contacts_data?.data?.attributes?.work_years"/>
  <Regisration />
  <Login />
  <Notification />
</template>
<script>
import api from "@/assets/js/api";
import Header from "@/components/main/Header.vue";
import Main from "@/components/main/Main.vue";
import About from "@/components/main/MainAbout.vue";
import AboutProject from "@/components/main/AboutProject.vue";
import Apparel from "@/components/main/Apparel.vue";
import Contacts from "@/components/main/MainContacts.vue";
import Footer from "@/components/main/Footer.vue";
import Regisration from "@/components/main/Regisration.vue";
import Login from "@/components/main/Login.vue";
import Notification from "@/components/ui/Notifications.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Header,
    Main,
    About,
    AboutProject,
    Apparel,
    Contacts,
    Footer,
    Regisration,
    Login,
    Notification,
  },
    data() {
      return {
        contacts: {}
      };
    },
  methods: {
    ...mapActions({
      getPageData: "page/getPageData",
      getContactsData: "page/getContactsData",
      getContactsDataBlock: "page/getContactsDataBlock",
    }),
  },
  computed: {
    ...mapState({
      page_data: (state) => state.page.page_data,
      contacts_data: (state) => state.page.contacts_data,
      contacts_page: (state) => state.page.contacts_page,
    }),
  },
  async created() {
    if (this.$router.currentRoute.value.path == "/") {
      // const result = await api.getUser();
      // if (result) {
      //   this.$router.push("/profile");
      // }
    }
    await this.getPageData("main");
    const contacts = await this.getContactsData("contacts");
    const result = await this.getContactsDataBlock("contacts_page");
  },
};
</script>
<style scoped>
section {
  width: 100%;
  margin-bottom: 180px;
}

@media screen and (max-width: 1300px) {
  section {
    margin-bottom: 80px;
  }
}
</style>
