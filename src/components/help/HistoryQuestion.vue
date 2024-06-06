<template>
  <section id="history-question">
    <div class="container history-question-container">
      <h2>История вопросов</h2>
      <div class="history-question-table">
        <div class="question-table-head">
          <span>ID</span>
          <span>Тема</span>
          <span>Дата</span>
        </div>
        <div class="question-table-body">
          <div class="table-body-column">
            <a
              :href="'/help/' + item.id"
              class="column-content"
              v-for="item in dataQuestion"
              :class="message ? 'unread' : ''"
              @click="setTitle(item)"
            >
              {{ item.id }}
            </a>
          </div>
          <div class="table-body-column">
            <a
              :href="'/help/' + item.id"
              class="column-content"
              v-for="item in dataQuestion"
              @click="setTitle(item)"
            >
              {{ item.attributes?.title }}
            </a>
          </div>
          <div class="table-body-column">
            <div class="column-content" v-for="item in dataQuestion">
              {{formatMyDate(item.attributes?.publishedAt || item.attributes?.updatedAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "HistoryQuestion",
  data() {
    return {};
  },
  props: {
    dataQuestion: [],
    date: [],
  },
  methods: {
    setTitle(item) {
      console.log(item.attributes);
      sessionStorage.setItem("question_title", item.attributes.title);
      sessionStorage.setItem("question_text", item.attributes.question);
      sessionStorage.setItem("question_id", item.id);
    },
    formatMyDate(value, locale = 'en-GB') {
        return new Date(value).toLocaleDateString(locale);
    }
  },
};
</script>
<style>
.container.history-question-container {
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}
.container.history-question-container h2 {
  margin-bottom: 0;
}

.history-question-table {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.question-table-head {
  display: grid;
  grid-template-columns: 150px 1fr 200px;
}
.question-table-head span {
  font-size: 24px;
  line-height: normal;
  letter-spacing: 0.84px;
  padding: 20px;
}

.question-table-head span:nth-child(2) {
  padding: 20px 60px;
}

.question-table-head span:last-of-type {
  text-align: right;
}
.question-table-body {
  display: grid;
  grid-template-columns: 150px 1fr 200px;
  border: 1px solid var(--black);
}
.table-body-column:not(:first-of-type) {
  border-left: 1px solid var(--black);
}
.table-body-column {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
/* .table-body-column:not(:nth-child(2)) .column-content {
  position: relative;
  width: max-content;
  cursor: default;
} */

.table-body-column:nth-child(2) {
  padding: 20px 60px;
}
.table-body-column:last-of-type {
  align-items: flex-end;
}

.table-body-column:nth-child(3) .column-content {
  text-align: right;
}
.column-content {
  font-size: 24px;
  line-height: normal;
  letter-spacing: 0.84px;
  cursor: pointer;
  width: 100%;
  word-wrap: break-word;
}

.column-content.unread::after {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: var(--red);
  border: 1px solid var(--black);
  border-radius: 50%;
  top: -5px;
  left: 100%;
}
</style>
