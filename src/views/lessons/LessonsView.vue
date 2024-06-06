<template>
    <div class="container">
        <div class="text-content">
            <h1 v-html="module?.attributes?.name +  ' -> Уроки'"></h1>
            <div v-if="module?.attributes?.content" v-html="htmlContent"></div>
        </div>
        <Lessons 
            :lessons="lessons"
            :current_date="current_date"
        />
    </div>    
</template>
<script>
import Lessons from '@/components/lessons/Lessons.vue'
import api from '@/assets/js/api';
import helper from '@/assets/js/helper';

export default {
    components: {
        Lessons
    },
    data() {
        return {
            module:  '',
            lessons: '',
            current_date: '',
        }
    },
    async created() {
        this.module  = await api.getModule(this.$route.params.slug);

        const lessons_result = await api.getLessons(this.$route.params.slug); 
        this.lessons = lessons_result.attributes.lessons;
        this.current_date = lessons_result.attributes.current_date;
    },
    computed: {
        htmlContent() {
            return helper.toHtml(this.module.attributes.content);
        }
    }
}
</script>