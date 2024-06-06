<template>
    <transition name="lessons">
        <div class="lessons" v-if="is_student && lessons.length > 0">
            <div class="tip top-outside">&lt;div class="lessons"&gt;</div>
            <Lesson v-for="item in lessons" 
                :id="item.id"
                :date="item.date" 
                :type="item.type" 
                :name="item.name" 
                :slug="item.slug"
                :description="item.description" 
                :grade="item.grade" 
                :is_closed="item.is_closed"
                :journal="item.journal"
                :current_date="current_date"
                :all_lessons="lessons"
            />
            <div class="tip bottom-outside">&lt;div&gt;</div>  
        </div> 
        <div class="lessons full" v-else-if="(is_admin || is_teacher) && lessons.length > 0">     
            <div class="tip top-outside">&lt;div class="lessons"&gt;</div>
            <LessonTeacher v-for="item in lessons" 
                :id="item.id"
                :date="item.date" 
                :name="item.name" 
                :slug="item.slug"
                :students="item.students" 
            />
            <div class="tip bottom-outside">&lt;div&gt;</div>   
        </div>
        <div class="lessons-not-found" v-else-if="lessons.length == 0">
            <div class="tip top-outside">&lt;div class="lessons-not-found"&gt;</div>
            В этом модуле нет уроков.
            <div class="tip bottom-outside">&lt;div&gt;</div>
        </div>
        <div class="lessons-not-found" v-else-if="lessons?.status?.number == 404">
            <div class="tip top-outside">&lt;div class="lessons-not-found"&gt;</div>
            Уроков не найдено.
            <div class="tip bottom-outside">&lt;div&gt;</div>
        </div>
        <div class="lessons-loading" v-else>
            <div class="tip top-outside">&lt;div class="lessons-loading"&gt;</div>
            Загрузка уроков...
            <div class="tip bottom-outside">&lt;div&gt;</div>
        </div>
    </transition> 
</template>
<script>
import api from '@/assets/js/api'
import Lesson from '@/components/lessons/Lesson.vue'
import LessonTeacher from '@/components/lessons/LessonTeacher.vue'

export default {
    props: {
        current_date: 0,
        lessons: [],
    },
    components: {
        Lesson,
        LessonTeacher
    },    
    data() {
        return {
            is_student: true,
            is_teacher: false, 
            is_admin: false,
        }
    },
}
</script>
<style>
.lessons {
    margin: 36px 0;
    padding: 14px 0;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}

.lessons.full {
    grid-template-columns: 1fr;
}

.lessons-loading,
.lessons-not-found {
    position: absolute;
    padding: 14px 0;
    font-size: 18px;
    line-height: 24px;
    margin-top: 15px;
}

.lessons-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.lessons-enter-active {
    transition: 0.8s;
}

.lessons-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}

.lessons-leave-active {
    transition: 0.8s;
}
</style>