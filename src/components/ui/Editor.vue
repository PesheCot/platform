<template>
    <div class="editors-container">
        <div class="tip top-outside">
            &lt;div {{ id != "" ? 'id="' + id + '" ' : "" }}class="editor"&gt;
        </div>
        <div :class="'editors' + (full_sreen ? ' full_screen' : '')">
            <div class="editors-content">
                <div class="tabs" ref="tabs">
                    <div class="tabs-header">
                        <div
                            class="tab-title active"
                            @click="changeTab"
                            data-index="0"
                        >
                            HTML
                        </div>
                        <div
                            class="tab-title"
                            @click="changeTab"
                            data-index="1"
                        >
                            CSS
                        </div>
                        <div
                            class="tab-title"
                            @click="changeTab"
                            data-index="2"
                        >
                            JS
                        </div>
                    </div>
                    <div class="tabs-body">
                        <!--  -->
                        <div class="tab active editor">
                            <codemirror
                                ref="html"
                                :modelValue="html_code"
                                placeholder=""
                                :autofocus="false"
                                :indent-with-tab="true"
                                :tab-size="4"
                                :extensions="extensionsHTML"
                                :disabled="is_sent"
                                @change="changeHTML"
                                @ready="readyHTML"
                            />
                        </div>
                        <div class="tab editor">
                            <codemirror
                                ref="css"
                                :modelValue="css_code"
                                placeholder=""
                                :autofocus="false"
                                :indent-with-tab="true"
                                :tab-size="4"
                                :extensions="extensionsCSS"
                                :disabled="is_sent"
                                @change="changeCSS"
                                @ready="readyCSS"
                            />
                        </div>
                        <div class="tab editor">
                            <codemirror
                                ref="code"
                                :modelValue="js_code"
                                placeholder=""
                                :autofocus="false"
                                :indent-with-tab="true"
                                :tab-size="4"
                                :extensions="extensionsJS"
                                :disabled="is_sent"
                                @change="changeJS"
                                @ready="readyJS"
                            />
                        </div>
                        <!--  -->
                    </div>
                </div>
                <iframe ref="frame"></iframe>
                <div class="full-screen__btn" @click="full_sreen = !full_sreen">
                    <img
                        src="@/assets/img/full_screen.svg"
                        v-if="!full_sreen"
                        alt=""
                    />
                    <img
                        src="@/assets/img/full_screen_close.svg"
                        v-if="full_sreen"
                        alt=""
                    />
                </div>
            </div>
            <div class="editor-bottom">
                <div class="mark-student" v-if="this.mark != ''">
                    Ваша оценка: {{ this.mark }}
                </div>
                <Button
                    @click="draftTask"
                    v-if="
                        (is_sent == null && this.role == 'students') ||
                        (is_sent == false && this.role == 'students')
                    "
                >
                    Сохранить
                </Button>
                <div
                    class="editor-status"
                    v-if="this.role == 'students' && is_sent == false"
                >
                    Задание сохранено как черновик
                </div>

                <div
                    class="editor-status"
                    v-if="this.role == 'students' && is_sent == true"
                >
                    Задание отправленно
                </div>
                <div
                    class="try-block"
                    v-if="
                        this.role == 'students' &&
                        this.try != null &&
                        this.try > 0
                    "
                >
                    У вас осталось {{ this.try }} попыток
                </div>
                <div
                    class="try-block"
                    v-if="
                        this.role == 'students' &&
                        this.try <= 0 &&
                        this.try != null
                    "
                >
                    У вас не осталось попыток
                </div>
                <Button
                    @click="saveTask"
                    v-if="this.role == 'students' && this.try > 0"
                >
                    Отправить
                </Button>
            </div>
        </div>
        <div v-if="this.role == 'students' && this.comments?.length > 0" class = "drop-list-btn" @click="dropList">
            <span>Комментарии для вас</span> 
            <img class="drop-list-arrow" :class="is_drop ? 'drop' : ''" src="@/assets/img/Arrow.png" alt="">
        </div>
        <div v-if="this.role == 'students' && this.comments != null" class="drop-list" :class="is_drop ? 'drop' : ''">
            <div class="coments-list">
                <div class="coments-list-item" v-for="item in this.comments">
                    <div class="coments-list-id">
                            {{ item.name }}:
                    </div>
                    <div class="coments-list-text">
                            {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tip bottom-outside">&lt;/div&gt;</div>
    </div>
</template>

<script>
import api from "@/assets/js/api";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import Button from "@/components/ui/Button.vue";

export default {
    props: {
        id: "",
        content_js: "",
        content_html: "",
        content_css: "",
        data: {},
        task_id: Number,
        lesson_id: Number,
    },
    data() {
        return {
            role: "",
            js_code: "",
            html_code: "",
            css_code: "",
            js_ready: false,
            html_ready: false,
            css_ready: false,
            full_sreen: false,
            publishedAt: false,
            dataTask: {},
            old_codes: {},
            all_tasks: {},
            is_sent: null,
            mark: "",
            try: null,
            date: new Date().getTime(),
            is_drop: false,
            comments: null
        };
    },
    components: {
        Codemirror,
        Button,
    },
    methods: {
        preventLinks () {
            const frame_document = this.$refs.frame.contentWindow.document
            const links = frame_document.body.querySelectorAll('a');
            const forms = frame_document.body.querySelectorAll('form');
            frame_document.addEventListener('click', (e)=> {
                links.forEach(link => {
                    if (e.target == link) {
                        e.preventDefault();
                        alert('Переход по ссылке: ' + link.href.replace(/^.*\/\/[^\/]+/, ''))
                    }
                });
            })

            forms.forEach(form => {
                form.addEventListener('submit', (e)=> {
                    e.preventDefault();
                    let form_data = new FormData(form);
                    let message = ''
                    for (var pair of form_data.entries()) {
                        message += '    ' + pair[0]+ ': ' + pair[1] + '\n'; 
                    }
                    alert('Форма отправлена со следующими данными:\n{\n' + message + '}');
                })
            });
            
        },
        dropList() {
            this.is_drop = !this.is_drop;
        },
        changeHTML(e) {
            this.publishedAt = false;
            this.html_code = e;
            this.change();
        },
        changeCSS(e) {
            this.publishedAt = false;
            this.css_code = e;
            this.change();
        },
        changeJS(e) {
            this.publishedAt = false;
            this.js_code = e;
            this.change();
        },
        readyHTML(e) {
            this.html_code = e.state.doc.text.join("\n");
            this.html_ready = true;
        },
        readyCSS(e) {
            this.css_code = e.state.doc.text.join("\n");
            this.css_ready = true;
        },
        readyJS(e) {
            this.js_code = e.state.doc.text.join("\n");
            this.js_ready = true;
        },
        change() {
            this.$refs.frame.contentDocument.head.innerHTML =
                "<style>" + this.css_code + "</style>";
            this.$refs.frame.contentDocument.body.innerHTML = this.html_code;
            try {
                this.$refs.frame.contentWindow.eval(this.js_code);
            } catch {}
            this.preventLinks();
        },
        changeTab(e) {
            const titles = this.$refs.tabs.querySelectorAll(".tab-title"),
                tabs = this.$refs.tabs.querySelectorAll(".tab");

            titles.forEach((title, index) => {
                if (e.target.dataset.index == index) {
                    title.classList.add("active");
                } else {
                    title.classList.remove("active");
                }
            });

            tabs.forEach((tab, index) => {
                if (e.target.dataset.index == index) {
                    tab.classList.add("active");
                } else {
                    tab.classList.remove("active");
                }
            });
        },
        async saveTask() {
            let dataTask = {
                task_id: this.task_id,
                js: this.js_code,
                css: this.css_code,
                html: this.html_code,
                publishedAt: this.publishedAt,
                is_sent: true,
            };
            this.is_sent = true;
            const result = await api.postTask(dataTask, this.lesson_id);
            if (result.data.attributes.error) {
                return;
            }
            this.is_sent = result.data.attributes.is_sent;
        },

        async draftTask() {
            let dataTask = {
                task_id: this.task_id,
                js: this.js_code,
                css: this.css_code,
                html: this.html_code,
                publishedAt: this.publishedAt,
                is_sent: false,
            };
            this.is_sent = false;
            this.publishedAt = true;
            const result = await api.postTask(dataTask, this.lesson_id);
            this.try = result?.data?.attributes?.try;
            console.log(result);

        },

        backTask() {
            (this.js_code = result.data.attributes.js),
                (this.html_code = result.data.attributes.html),
                (this.css_code = result.data.attributes.css);
        },
    },
    setup() {
        return {
            extensionsJS: [javascript(), oneDark],
            extensionsHTML: [html(), oneDark],
            extensionsCSS: [css(), oneDark],
        };
    },
    watch: {
        js_ready() {
            if (this.js_ready && this.css_ready && this.html_ready) {
                this.js_ready = false;
                this.html_ready = false;
                this.css_ready = false;

                this.change();
            }
        },
        html_ready() {
            if (this.js_ready && this.css_ready && this.html_ready) {
                this.js_ready = false;
                this.html_ready = false;
                this.css_ready = false;

                this.change();
            }
        },
        css_ready() {
            if (this.js_ready && this.css_ready && this.html_ready) {
                this.js_ready = false;
                this.html_ready = false;
                this.css_ready = false;

                this.change();
            }
        },
        html_code(new_html_code) {
            let all_tasks = localStorage.getItem("codes");
            if (all_tasks) {
                this.all_tasks = JSON.parse(all_tasks);
            }
            this.all_tasks[this.task_id] = {
                html: new_html_code,
                js: this.js_code,
                css: this.css_code,
                new_date: this.date,
            };
            localStorage.setItem("codes", JSON.stringify(this.all_tasks));
        },

        js_code(new_js_code) {
            let all_tasks = localStorage.getItem("codes");
            if (all_tasks) {
                this.all_tasks = JSON.parse(all_tasks);
            }
            this.all_tasks[this.task_id] = {
                html: this.html_code,
                js: new_js_code,
                css: this.css_code,
                new_date: this.date,
            };
            localStorage.setItem("codes", JSON.stringify(this.all_tasks));
        },

        css_code(new_css_code) {
            let all_tasks = localStorage.getItem("codes");
            if (all_tasks) {
                this.all_tasks = JSON.parse(all_tasks);
            }
            this.all_tasks[this.task_id] = {
                html: this.html_code,
                js: this.js_code,
                css: new_css_code,
                new_date: this.date,
            };
            localStorage.setItem("codes", JSON.stringify(this.all_tasks));
        },
    },
    async created() {
        const user = await api.getUser(true);
        this.role = user.role.type;
        if (this.role == "students") {
            const result = await api.getTaskForStudent(
                this.task_id,
                this.lesson_id
            );
            if (result.data.attributes.error) {
                return;
            }
            if (result.data.attributes.comments) {
                this.comments = result.data.attributes.comments
            }
            if (result.data.attributes.is_sent != null) {
                this.is_sent = result.data.attributes.is_sent;
            }

            if (result.data.attributes.try) {
                this.try = result.data.attributes.try;
            }

            if (result.data.attributes.mark) {
                this.mark = result.data.attributes.mark;
            }

            if (result.data.attributes.publishedAt) {
                this.publishedAt = true;
            }

            const local_code = JSON.parse(localStorage.getItem("codes"));
            if (!local_code) {
                local_code = {};
            }

            if (local_code) {
                (this.js_code = local_code[this.task_id].js),
                    (this.html_code = local_code[this.task_id].html),
                    (this.css_code = local_code[this.task_id].css);
            }
        }
        this.change();
    },
    mounted() {
        this.html_code = this.content_html;
        this.css_code = this.content_css;
        this.js_code = this.content_js;
        this.change();
    },
};
</script>
<style>
.tab.disabled .cm-editor {
    pointer-events: none;
}

.editor-status {
    width: 100%;
    padding: 20px 0px;
    font-size: 16px;
    grid-area: 2 /3;
}

.editor-bottom {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 40px;
}

.editor-bottom button {
    width: 100%;
}

.mark-student {
    font-size: 24px;
    min-width: max-content;
    max-width: max-content;
}

.editors-container {
    position: relative;
    padding: 14px 0;
    min-height: 616px;
}

.editors {
    display: flex;
    flex-direction: column;
}

.editors-content {
    display: flex;
    height: 100%;
}

.editors.full_screen {
    background-color: var(--black);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 50;
}

.tabs {
    min-width: 50%;
}

.tabs-header {
    display: flex;
    align-items: center;
    gap: 5px;
}

.tab-title {
    background-color: #282c34;
    color: #fff;
    padding: 14px 20px;
    font-size: 18px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    opacity: 0.8;
    cursor: pointer;
    transition: 0.8s;
}

.tab-title.active {
    opacity: 1;
}

.tabs-body {
    background-color: #282c34;
    padding: 5px;
    padding-top: 10px;
    position: relative;
    height: 400px;
}

.editors.full_screen .tabs-body {
    height: calc(100% - 46px);
}

.tab {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    transition: 0.8s;
}

.tab.active {
    opacity: 1;
    pointer-events: all;
    z-index: 10;
}

iframe {
    margin-top: 46px;
    width: 100%;
    border: 1px solid var(--tip-gray);
    border-left: none;
    grid-area: frame;
    background-color: #fff;
}

.full-screen__btn {
    position: absolute;
    right: 0;
    top: 14px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.full-screen__btn img {
    width: 100%;
    height: 100%;
}

.editors.full_screen .full-screen__btn {
    top: 7px;
    right: 7px;
}

.cm-editor {
    height: 400px;
}

.editors.full_screen .cm-editor {
    height: 100%;
}

.cm-editor.cm-focused {
    outline: none;
}

.ͼo {
    background-color: var(--black);
}

.editor-btns {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    /* width: 100%;  */
}

.editors.full_screen .editor-btns {
    justify-content: flex-start;
    margin-top: 0;
    gap: 10px;
}

.try-block {
    width: 100%;
    font-size: 16px;
}
</style>
