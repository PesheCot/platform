<template>
  <section id="chat-question">
    <div class="container">
      <div class="chat-question-back" @click="this.$router.go(-1)">
        {{ back }}
      </div>
      <div class="chat-container">
        <div class="chat-question-topic">
          <form @submit.prevent="createComents" class="chat-question-form" ref="form">
            <!-- @submit.prevent="submit" -->
            <div class="ask-question-form__content">
              <div class="ask-question-form-item">
                <h1>
                  Тема: {{ question_title }}
                </h1>
                <p>{{ question_text }}</p>
                <textarea name="message" placeholder="Комментарий" rows="5"></textarea>
              </div>
              <Button theme="dark">Отправить</Button>
            </div>
          </form>
        </div>
        <div class="chat-question-answer">
          <h2>Комментарии:</h2>
          <div class="chat-question-list" v-if="this.comments.length > 0">
            <div class="chat-question-list-item" v-for="item in this.comments" :class="item.attributes?.user?.role == role_user ? 'student' : ''">
              <div class="chat-question-answer-title">
                {{
                  item.attributes?.user?.lastName +
                  " " +
                  item.attributes?.user?.name
                }}
                <div class="chat-question-answer-subtitle" v-if="item.attributes?.user?.role">
                  {{ item.attributes?.user?.rus_role }}
                </div>
              </div>
              <div class="chat-question-answer-content">
                {{ item.attributes?.text }}
              </div>
            </div>
          </div>
          <p class="no-comments" v-else>Комментариев нет</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Button from "@/components/ui/Button.vue";
import api from "@/assets/js/api";

export default {
  name: "ChatQuestion",
  components: {
    Button,
  },
  data() {
    return {
      back: "<- Назад",
      question_title: "",
      question_text: "",
      comments: [],
      data: {},
      role_user: ''
    };
  },
  computed: {
    // question_title() {
    //   return sessionStorage.getItem("question_title");
    // },
    // question_text() {
    //   return sessionStorage.getItem("question_text");
    // },
    // id() {
    //   let id = sessionStorage.getItem("question_id");
    //   return id;
    // },
  },
  methods: {
    async updateComments() {
      const result = await api.getComments(); 
      if (Object.hasOwn(result, 'attributes')) {
        
      } else {
        this.comments = result.reverse();
      }
    },
    async createComents() {
      const form = this.$refs.form
        const data = {
          id: this.id,
          text: form.message.value
        }
        api.createComents(data);
        this.updateComments();
        form.reset();
    },
  },
  async mounted() {
    let result = await api.getHistoriQuestionOne();
     this.question_text = result.data.data[0].attributes.question
     this.question_title = result.data.data[0].attributes.title
  },
  created() {
    this.updateComments(this.id);
    this.role_user = JSON.parse(localStorage.getItem('user')).role.name;
  }
};
</script>
<style>
#chat-question {
  margin-top: 66px;
}
.chat-question-back {
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.84px;
  cursor: pointer;
  width: max-content;
}

.chat-container {
  max-width: 1180px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.chat-question-topic {
  width: 100%;
}
.chat-question-form {
  width: 100%;
  margin: 0 auto;
}
#chat-question .ask-question-form-item p {
  margin-bottom: 30px;
}
.chat-question-answer h2 {
  margin-bottom: 0;
}
.chat-question-answer {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.chat-question-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.chat-question-list-item {
  padding: 15px 36px;
  border: 1px solid var(--black);
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 75%;
}
.chat-question-list-item.student {
  align-self: flex-end;
}
.chat-question-answer-title {
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.84px;
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  width: max-content;
}
.chat-question-answer-subtitle {
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.84px;
}
.chat-question-answer-content {
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.84px;
}

.no-comments {
  font-size: 22px;
}
</style>
