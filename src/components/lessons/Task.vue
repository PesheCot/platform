<template>
    <h2>{{ name }}</h2>
    <div v-html="htmlText"></div>
    <Editor v-if="is_editor"
        :id="'task-' + (index + 1)"
        :content_html="this.new_html"
        :content_css="this.new_css"
        :content_js="this.new_js"
        :task_id="this.id"
        :is_editor="this.is_editor"
        :lesson_id="this.lesson_id"
    />
</template>

<script>
import helper from '@/assets/js/helper';
import Editor from '../ui/Editor.vue';

export default {
    components: {
        Editor
    },
    props: {
        index: 0,
        name: '',
        text: '',
        is_editor: false,
        html: '',
        css: '',
        js: '',
        id:'',
        lesson_id: '',
    },
    data() {
        return {
            new_js: '',
            new_css: '',
            new_html: '',
            is_drop: false
        }
    },
    computed: {
        htmlText() {
            return helper.toHtml(this.text);
        }
    },
    watch: {
        js() {
            this.new_js = this.js
        },

        html() {
            this.new_html = this.html
        },

        css() {
            this.new_css = this.css
        }
    },
}
</script>

<style>

</style>