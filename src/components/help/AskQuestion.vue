<template>
  <section id="ask-question">
    <div class="error-ask-question" :class=" is_error ? 'active' : ''">
      {{ this.error }}
    </div>
    <div class="sucsess-ask-question" :class=" is_sucsess ? 'active' : ''">
      Успешно отправлено
    </div>
    <div class="container ask-question-container">
      <h1>Форма обратной связи</h1>
      <form @submit.prevent="createQuestion" action="" class="ask-question-form" ref="form">
        <!-- @submit.prevent="submit" -->
        <div class="ask-question-form__content">
          <div class="ask-question-form-item">
            <p>Тема</p>
            <input @input="chengeInput" name="tema" type="text" placeholder="Тема" />
          </div>
          <div class="ask-question-form-item">
            <p>Вопрос</p>
            <textarea @input="chengeInput"  name="text" placeholder="Вопрос" rows="5"></textarea>
          </div>
          <Button theme="dark">Отправить</Button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import Button from "@/components/ui/Button.vue";
import api from '@/assets/js/api';

export default {
  name: "AskQuestion",
  components: {
    Button,
  },
  data() {
    return {
      historiQuestion: [],
      error: "",
      is_error: false,
      is_sucsess: false,
      is_validate: false
    }
  },
  methods: {
    async createQuestion(e) {
        const form = this.$refs.form
        const data = {
          title: form.tema.value,
          question: form.text.value
        }
        this.is_validate = true;
        if (form.tema.value && form.text.value) {
          this.validate();
          const result = api.createQuestion(data);
          if (result) {
            this.is_sucsess = true
            this.is_error = false
          }
          this.$emit("update");
          form.reset();
        } else {
          if (!form.tema.value) {
            this.error = "Заполните тему"
            this.is_error = true
            return
          }  
  
          if (!form.text.value) {
            this.error = "Заполните вопрос"
            this.is_error = true
            return
          }
        }
      },
      validate() {
        const form = this.$refs.form

        if (form.tema.value != '' && form.text.value != '') {
          this.is_error = false
        }

        if (!form.tema.value) {
          this.error = "Заполните тему"
          this.is_error = true
          this.is_sucsess = false
          return
        }  

        if (!form.text.value) {
          this.is_error = true
          this.error = "Заполните вопрос"
          this.is_sucsess = false
          return
        }
      },
      chengeInput () {
        const form = this.$refs.form
        if (this.is_validate == true) {
            this.validate();
        }
      },
    },
  emit: ['update'],
  async created() {
      this.historiQuestion = (await api.getHistoriQuestion());
  }
};
</script>
<style>
#ask-question {
  margin-top: 66px;
  margin-bottom: 80px;
  position: relative;
}
.container.ask-question-container {
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  gap: 120px;
  align-items: center;
}
.container.ask-question-container h1 {
  margin-bottom: 0;
}
.ask-question-form {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.ask-question-form-item {
  width: 100%;
}
.ask-question-form-item p {
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  font-size: 24px;
}

.ask-question-form__content {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
}

.ask-question-form__content input,
.ask-question-form__content textarea {
  width: 100%;
  padding: 15px 35px;
  border-radius: 0;
  resize: none;
  border: 1px solid var(--black);
  font-size: 18px;
  line-height: 24px;
}

.ask-question-item:last-of-type input {
  margin-bottom: 40px;
}

.ask-question-form__content input,
select,
textarea {
  color: var(--tip-gray);
}

textarea:focus,
.ask-question-form__content input:focus {
  color: var(--black);
}

.ask-question-checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 40px;
  width: 54%;
  gap: 10px;
}

.ask-question-checkbox p {
  margin: 0;
  padding: 0;
  color: var(--tip-gray);
}

.ask-question-checkbox input {
  width: 20px;
  height: 20px;
}

.error-ask-question,
.sucsess-ask-question {
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  font-size: 40px;
  opacity: 1px;
  transition: 0.8s;
  color: red;
  opacity: 0;
}

.sucsess-ask-question {
  color: green;
}

.error-ask-question.active,
.sucsess-ask-question.active {
  top: 80px;
  opacity: 1;
}
</style>
