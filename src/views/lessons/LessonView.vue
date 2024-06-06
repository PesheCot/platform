<template>
  <main>
    <div class="container lesson-container">
      <div
        class="lesson-text-content"
        :class="is_notes_open ? 'notes-open' : ''"
      >
        <transition name="lesson">
          <div class="text-content">
            <h1>{{ name }}</h1>
            <div class="lesson-content" v-html="htmlContent"></div>

            <hr v-if="tasks.length > 0" noshade />

            <Task
              v-for="(task, index) in tasks"
              :key="index"
              v-bind="task"
              :index="index"
              :id="task.id"
              :is_editor="task.is_editor"
              :lesson_id="this.id"
            />
            <div class="lessons-btn">
                <a :href="prev_lesson" class="prev_lesson" v-if="prev_lesson">
                   <span>←</span> Предыдущий урок
                </a>
                <a :href="next_lesson" class="next_lesson" v-if="next_lesson">
                  Следующий урок <span>→</span>
                </a>
            </div>
          </div>
        </transition>
      </div>
      <transition name="lesson">
        <div class="notes-wrapper" :class="is_notes_open ? 'open' : ''">
          <div class="notes" :class="is_notes_full ? 'full' : ''">
            <div class="notes-title">// Ваши заметки</div>
            <div
              class="notes-btns"
              :class="$store.state.show_buttons ? 'active' : ''"
            >
              <Button theme="note" @click="notesSave">Сохранить</Button>
              <Button theme="note" @click="notesBack">Отмена</Button>
            </div>
            <textarea
              ref="note_text"
              class="notes-text"
              @input="showButtons"
              v-model="notes"
            ></textarea>
            <div class="open-btn" @click="openNotes">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="8.63469"
                  y1="15.6808"
                  x2="21.3626"
                  y2="2.95291"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="8.63679"
                  y1="14.2797"
                  x2="21.3647"
                  y2="27.0076"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="anchor" @click="toTop" :class="anchor ? 'active' : ''">
      ↑
    </div>
  </main>
</template>

<script>
import api from "@/assets/js/api";
import helper from "@/assets/js/helper.js";
import Button from "@/components/ui/Button.vue";

import Task from "@/components/lessons/Task.vue";

export default {
  data() {
    return {
      id: null,
      name: "",
      content: "",
      tasks: [],
      all_notes: {},
      text_notes: {},
      notes: "",
      old_notes: "",
      is_notes_full: false,
      is_notes_open: false,
      is_admin: false,
      date: new Date().getTime(),
      next_lesson: '',
      prev_lesson: '',
      anchor: false
    };
  },
  components: {
    Task,
    Button,
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    showButtons() {
      this.$store.commit("showButtons", true);
      if (this.notes == this.old_notes) {
        this.$store.commit("showButtons", false);
      }
    },
    openNotes() {
      this.is_notes_open = !this.is_notes_open;
    },

    notesSave() {
      api.notesSave(this.text_notes, this.id);
      this.old_notes = this.notes;
      this.$store.commit("showButtons", false);
    },
    notesBack() {
      this.notes = this.old_notes;
    },
  },
  async created() {
    const result = await api.getLesson(this.$route.params.slug);
    if (!result) {
      return;
    }

    this.id = result.id;
    this.name = result.attributes.name;
    this.content = result.attributes.content;
    this.tasks = result.attributes.tasks;
    this.next_lesson = result.attributes.next_lesson.slug;
    this.prev_lesson = result.attributes.prev_lesson.slug;
    if (result.attributes.note) {
      this.old_notes = result.attributes.note[0].content;
    }
    const local_node = JSON.parse(localStorage.getItem("notes"));
    if (local_node) {
      if (result.attributes.note) {
        if (
          result.attributes.note[0].data_parse > local_node[this.id].new_date
        ) {
          this.notes = result.attributes.note[0].content;
        }

        if (
          result.attributes.note[0].data_parse < local_node[this.id].new_date
        ) {
          this.$store.commit("showButtons", true);
          this.notes = local_node[this.id].content;
        }
      } else if (local_node[this.id]) {
        this.notes = local_node[this.id].content;
      }
    }
  },
  computed: {
    htmlContent() {
      return helper.toHtml(this.content);
    },
  },
  watch: {
    notes(new_text) {
      let all_notes = localStorage.getItem("notes");
      if (all_notes) {
        this.all_notes = JSON.parse(all_notes);
      }
      this.all_notes[this.id] = {
        content: new_text,
        new_date: this.date,
      };
      this.text_notes = {
        content: new_text,
      };
      localStorage.setItem("notes", JSON.stringify(this.all_notes));
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.is_notes_full = window.pageYOffset > 100;
      this.anchor = window.pageYOffset > 300;
    });
  },
};
</script>

<style>
.lesson-container {
  display: flex;
}

.ace_editor {
  height: 400px;
  font-size: 18px;
  line-height: 26px;
}

.ace_dark * {
  color: #dddddd;
}

.lesson-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.lesson-enter-active {
  transition: 0.8s;
}

.lesson-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.lesson-leave-active {
  transition: 0.8s;
}

.lesson-text-content {
  width: calc(100% - 275px);
  transition: 0.8s;
}

.lesson-text-content.notes-open {
  width: calc(100% - 500px);
}

.open-btn {
  width: 30px;
  height: 30px;
  border: 1px solid var(--dark-green);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: -15px;
  transform: translateY(-50%);
}

.notes-wrapper {
  position: relative;
  padding-left: 20px;
}

.notes-wrapper.open .notes {
  width: 480px;
}

.open-btn svg {
  transition: 0.8s;
}

.notes-wrapper.open .open-btn svg {
  transform: rotateY(180deg);
}

.notes {
  padding-left: 20px;
  position: fixed;
  top: 114px;
  width: 255px;
  height: calc(100vh - 128px);
  border-left: 4px solid var(--tip-gray);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
}

.notes.full {
  top: 14px;
  height: calc(100vh - 28px);
  transition: 0.8s;
}

.notes-title {
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.84px;
  color: var(--dark-green);
  margin-bottom: 30px;
}

.notes-text {
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
  border: none;
  color: var(--dark-green);
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.84px;
}

.notes-text:focus {
  color: var(--dark-green);
}

.notes-btns {
  position: fixed;
  bottom: -45px;
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: row;
  gap: 30px;
  transition: 0.8s;
}

.notes-btns.active {
  opacity: 1;
  pointer-events: all;
  bottom: 20px;
}

.lessons-btn:has(> :last-child:nth-child(2)) {
    display: flex;
    justify-content: space-between;
}

.lessons-btn {
    display: flex;
    justify-content: flex-end;
}

.text-content a.next_lesson,
.text-content a.prev_lesson {
  width: max-content;
  min-width: 220px;
  height: 54px;
  padding: 15px;
  font-family: "Ubuntu Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 133%;
  text-align: center;
  letter-spacing: 0.84px;
  border: 1px solid var(--black);
  border-bottom: 1px solid var(--black);
  background-color: #fff;
  outline: none;
  cursor: pointer;
  color: var(--black);
  transition: 0.5s;
}
.text-content a.next_lesson:hover,
.text-content a.prev_lesson:hover {
  background-color: var(--black);
  color: #fff;
}

.text-content a.next_lesson span {
  color: var(--black);
  transition: 0.3s;
}

.text-content a.prev_lesson span {
  color: var(--black);
  transition: 0.3s;
}

.text-content a.next_lesson:hover span {
  color: var(--white);
  margin-left: 15px;
}

.text-content a.prev_lesson:hover span {
  color: var(--white);
  margin-right: 15px;
}
.anchor {
  position: fixed;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  aspect-ratio: 1 / 1;
  font-size: 30px;
  border: 1px solid var(--black);
  left: 50px;
  bottom: 50px;
  opacity: 0;
  pointer-events: none;
  transition: .8s;
}
.anchor.active {
  opacity: 1;
  pointer-events: all;
}
</style>
