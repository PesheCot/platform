<template>
        <div class="container lesson-container">
            <div class="lesson-text-content" :class="is_notes_open ? 'notes-open' : ''">
                <transition name="lesson">
                    <div class="text-content">
                        <Task :key="this.task.index" v-bind="this.task" :index="this.task.index" :js="this.task.js" :css="this.task.css" :html="this.task.html"/>
                        <div class="put-grade" v-if="mark == {}">
                            <button @click="drop">Поставить оценку</button>
                            <div ref="drop" class="drop-item">
                                <div class="grade-list">
                                    <div class="grade-item" @click="putMark(2)">2 Неудовлетвориительно </div>
                                    <div class="grade-item" @click="putMark(3)">3 Удовлетворительно </div>
                                    <div class="grade-item" @click="putMark(4)">4 Хорошо </div>
                                    <div class="grade-item" @click="putMark(5)">5 Отлично </div>
                                </div>
                            </div>
                        </div>
                        <div class="put-grade" v-if="mark != {}">
                            <div class = "curent-mark">Оценка: {{ this.mark }}</div>
                            <button @click="drop">Изменить оценку</button>
                            <div ref="drop" class="drop-item">
                                <div class="grade-list">
                                    <div class="grade-item" @click="putMark(2)">2 Неудовлетвориительно </div>
                                    <div class="grade-item" @click="putMark(3)">3 Удовлетворительно </div>
                                    <div class="grade-item" @click="putMark(4)">4 Хорошо </div>
                                    <div class="grade-item" @click="putMark(5)">5 Отлично </div>
                                </div>
                            </div>
                        </div>
                        <form ref="form" @submit="createComment" class="teacher-comment">
                            <div class = "curent-mark">Оставить комментарий</div>
                            <div class="comment-body">
                                <textarea name="text" id="" cols="30" rows="10"></textarea>
                                <Button>Отправить</Button>
                            </div>
                        </form>
                        <div v-if="this.teacher_comments?.length > 0" class = "drop-list-btn" @click="dropList">
                            <span>Ваши комментарии</span> 
                            <img class="drop-list-arrow" :class="is_drop ? 'drop' : ''" src="@/assets/img/Arrow.png" alt="">
                        </div>
                        <div class="drop-list" :class="is_drop ? 'drop' : ''">
                            <div class="coments-list">
                                <div class="coments-list-item" v-for="item in this.teacher_comments">
                                    <div class="coments-list-id">
                                            {{ item.name }}:
                                    </div>
                                    <div class="coments-list-text">
                                            {{ item.text }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1>{{ name }}</h1>
                        <div class="lesson-content" v-html="htmlContent"></div>
                        <hr v-if="task" noshade/>                       
                    </div>
                </transition>
            </div>
            <transition name="lesson">
                <div class="notes-wrapper" :class="is_notes_open ? 'open' : ''">
                    <div class="notes" :class="is_notes_full ? 'full' : ''">
                        <div class="notes-title">// Ваши заметки</div>
                        <div class="notes-btns" :class="$store.state.show_buttons ? 'active' : ''">
                            <Button theme="note" @click="notesSave">Сохранить</Button>
                            <Button theme="note" @click="notesBack">Отмена</Button>    
                        </div>
                        <textarea ref="note_text" class="notes-text" @input="showButtons" v-model="notes"></textarea>
                        <div class="open-btn" @click="openNotes">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="8.63469" y1="15.6808" x2="21.3626" y2="2.95291" stroke="black" stroke-width="2"/>
                                <line x1="8.63679" y1="14.2797" x2="21.3647" y2="27.0076" stroke="black" stroke-width="2"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
</template>

<script>
import api from '@/assets/js/api'
import helper from '@/assets/js/helper.js'
import Button from '@/components/ui/Button.vue';

import Task from '@/components/lessons/Task.vue'

export default {
    data() {
        return {
            id: null,
            name: '',
            content: '',
            task: {},
            all_notes: {},
            text_notes: {},
            notes: '',
            old_notes: '',
            is_notes_full: false,
            is_notes_open: false,
            is_admin: false,
            date: new Date().getTime(),
            mark: {},
            teacher_comments: [],
            is_drop: false
        }
    },
    components: {
        Task,
        Button
    },
    methods: {
        showButtons() {
            this.$store.commit('showButtons', true);
            if ( this.notes == this.old_notes) {
                this.$store.commit('showButtons', false);
            } 
        },
        openNotes() {
            this.is_notes_open = !this.is_notes_open;
        },
        
        notesSave() {
            api.notesSave(this.text_notes, this.id);
            this.old_notes = this.notes;
            this.$store.commit('showButtons', false);
        },
        notesBack() {
            this.notes = this.old_notes;
            this.$store.commit('showButtons', false);
        },
        drop() {
            let drop = this.$refs.drop;
            let dropHeight = drop.scrollHeight;
            if (drop.style.height == 0) {
                drop.style.height = dropHeight + 'px'
            } else {
                drop.style.height = ''
            }
        },
        putMark(mark) {
            this.data = {
                mark: mark
            }
            this.mark = mark
            api.putMark(this.$route.params.task_id, this.$route.params.lesson_id, this.$route.params.stud_id, this.data);
            this.$refs.drop.style.height = ''
        },

        async createComment (e) {
            e.preventDefault()
            const data = {
                text: this.$refs.form.text.value
            }
            api.createComentsTeacher(this.$route.params.task_id, this.$route.params.lesson_id, this.$route.params.stud_id, data)
            const task_result = await api.getTask(this.$route.params.task_id, this.$route.params.lesson_id, this.$route.params.stud_id);
            this.teacher_comments = task_result.data.attributes.comments
            this.$refs.form.reset();
        },

        dropList() {
            this.is_drop = !this.is_drop
        }
    },
    async created() {
        
        
        const task_result = await api.getTask(this.$route.params.task_id, this.$route.params.lesson_id, this.$route.params.stud_id);
        if (!task_result){
            return;
        }

        this.teacher_comments = task_result.data.attributes.comments

        this.mark = task_result.data.attributes.mark
        
        this.name = task_result.data.attributes.lesson_to_front[0].name;
        this.content = task_result.data.attributes.lesson_to_front[0].content;
        this.task = task_result.data.attributes;
        
        const result = await api.getLesson(task_result.data.attributes.lesson_to_front[0].slug);
        if (!result) {
            return;
        }

        this.id = result.id;
        this.old_notes = result.attributes.note[0].content;
        const local_node = JSON.parse(localStorage.getItem('notes')); 
        if (result.attributes.note[0].data_parse > local_node[this.id].new_date) {
            this.notes = result.attributes.note[0].content;
        }
        
        if (result.attributes.note[0].data_parse < local_node[this.id].new_date) {
            this.$store.commit('showButtons', true);
            this.notes = local_node[this.id].content;
        }
        
    },
    computed: {
        htmlContent() {
            return helper.toHtml(this.content);
        }
    },
    watch: {
        notes(new_text) {
            let all_notes = localStorage.getItem('notes');
            if (all_notes) {
                this.all_notes = JSON.parse(all_notes);
            }
            this.all_notes[this.id] = {
                content: new_text,
                new_date: this.date,
            }
            this.text_notes = {
                content: new_text
            }
            localStorage.setItem('notes', JSON.stringify(this.all_notes)); 
        },
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.is_notes_full = (window.pageYOffset > 100);
        })
    }
}
</script>

<style>

.put-grade {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;

}

.curent-mark {
    font-size: 24px;
}

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
    background-color: #FFF;
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
    background-color: #FFF;
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

.put-grade {
    position: relative;
}

.drop-item {
    position: absolute;
    transition: 0.8s;
    top: 0px;
    left: 230px;
    width: 100%;
    height: 0px;
    z-index: 10;
    overflow: hidden;
    width: 100%;
    max-width: max-content;
}

.grade-item {
    padding: 10px 10px;
    background-color: #FFF;
    border-bottom: 1px solid var(--tip-gray);
    cursor: pointer;
}

.grade-item:first-of-type {
    border-top: 1px solid var(--tip-gray);
}

.teacher-comment {
    margin: 50px 0px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
}

.teacher-comment textarea {
    width: 100%;
    height: 100px;
    padding: 15px 35px;
    border-radius: 0;
    resize: none;
    border: 1px solid var(--black);
    font-size: 18px;
    line-height: 24px;
}

.comment-body {
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: 100%;
}

.coments-list {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 30px;
    min-height: 0px;
}

.coments-list-item:last-of-type {
    border-top: 1px solid var(--black);
    margin-top: 30px;
}

.coments-list-item {
    display: flex;
    flex-direction: row;
    gap: 20px;
    font-size: 22px;
    padding: 20px 0px;
    border-bottom: 1px solid var(--black);
}

.drop-list {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.8s;
    overflow: hidden;
}

.drop-list.drop {
    grid-template-rows: 1fr;
}

.drop-list-arrow {
    transition: 0.8s;
    cursor: pointer;
}

.drop-list-arrow.drop {
    transform: rotate(90deg);
}

.drop-list-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.drop-list-btn span {
    font-size: 22px;
    padding: 0px;
    margin: 0px;
}

</style>