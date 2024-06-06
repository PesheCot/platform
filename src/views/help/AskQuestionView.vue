<template>
  <div class="container">
    <AskQuestion @update="updatelist" v-if="user == 'Student' || 'Teacher'" />
    <HistoryQuestion v-if="historyQuestion.length > 0" :dataQuestion="historyQuestion" :date="date" />
    <div class="container" v-else>
      <h2 class="historyQuestion-title">История вопросов</h2>
      <Text>
          У вас пока нет вопросов.
      </Text>
    </div>
  </div>
</template>
<script>

import Text from '@/components/ui/Text.vue';
import HistoryQuestion from "@/components/help/HistoryQuestion.vue";
import AskQuestion from "@/components/help/AskQuestion.vue";
import api from "@/assets/js/api";
import helper from "@/assets/js/helper.js";

export default {
  name: "AskQuestionView",
  components: {
    HistoryQuestion,
    AskQuestion,
    Text
  },

  data() {
    return {
      historyQuestion: [],
      date: [],
      user: "",
    };
  },
  methods: {
    async updatelist() {
      const result = await api.getHistoriQuestion();
      if (result != false) {
        this.historyQuestion = result.data.data;
        for (let index = 0; index < result.length; index++) {
          this.date.push(
            helper.date_format(new Date(result[index].attributes.createdAt))
          );
        }
      }
    },
  },
  async created() {
    const result = (await api.getHistoriQuestion());
    if (result != false) {
      this.historyQuestion = result.data;
      for (let index = 0; index < result.length; index++) {
        this.date.push(
          helper.date_format(new Date(result[index].attributes.createdAt))
        );
      }
    }
  },
  mounted() {
    this.updatelist();
    let user = JSON.parse(localStorage.getItem('user'))
    const role = user.role.name;
    this.user = role
  }
};
</script>
<style>
  .historyQuestion-title {
    text-align: center;
  }
</style>
