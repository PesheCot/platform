import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '@/views/TestView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import EditProfileView from '@/views/profile/EditProfileView.vue'
import ProfileDoc from '@/views/profile/ProfileDoc.vue'
import ModulesView from '@/views/ModulesView.vue'
import LessonsView from '@/views/lessons/LessonsView.vue'
import LessonView from '@/views/lessons/LessonView.vue'
import MainView from '@/views/MainView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import TasksListView from '@/views/tasks/TasksListView.vue'
import TaskView from '@/views/tasks/TaskView.vue'
import AskQuestionView from '@/views/help/AskQuestionView.vue'
import ChatQuestionView from '@/views/help/ChatQuestionView.vue'
import Error from '@/views/Error.vue'

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainView
    },
    {
        path: '/test',
        name: 'test',
        component: TestView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/profile/edit',
        name: 'profileEdit',
        component: EditProfileView
    },
    {
        path: '/profile/doc',
        name: 'profileDoc',
        component: ProfileDoc
    },
    {
        path: '/modules',
        name: 'modules',
        component: ModulesView
    },
    {
        path: '/schedule',
        name: 'schedule',
        component: ScheduleView
    },
    {
        path: '/modules/:slug/',
        name: 'lessons',
        component: LessonsView
    },
    {
        path: '/lessons/:slug/',
        name: 'lesson',
        component: LessonView
    },
    {
        path: '/review',
        name: 'tasksList',
        component: TasksListView
    },
    {
        path: '/review/:task_id/:lesson_id/:stud_id',
        name: 'tasks',
        component: TaskView
    },
    {
        path: '/help',
        name: 'help',
        component: AskQuestionView
    },
    {
        path: '/help/:id',
        name: 'chat',
        component: ChatQuestionView
    },
    {
        path: '/404',
        name: 'Error',
        component: Error
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404'
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
