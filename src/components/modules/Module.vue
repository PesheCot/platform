<template>
    <div class="module closed" v-if="is_closed || !slug">
        <div class="module-preloader" :class="loaded_class"></div>
        <h3> {{ title }}</h3>
        <div v-html="htmlDeck"></div>
        <p> {{ stats }} </p>
    </div>
    <RouterLink class="module" :to="'/modules/' + slug" v-else>
        <div class="module-preloader" :class="loaded_class"></div>
        <h3> {{ title }} </h3>
        <div v-html="htmlDeck"></div>
        <p> {{ stats }} </p>
    </RouterLink>
</template>
<script>
import helper from '@/assets/js/helper.js';

export default {
    props: {
        title: "",
        description: "",
        slug: "",
        is_closed: false,
        grade: null,
        completed_tasks: null,
        all_tasks: null
    },
    data() {
        return {
            is_admin: false,
            loaded_class: '',
        }
    },
    computed: {
        stats() {
            let stats = '';

            if (!this.is_admin) {
                if (this.grade) {
                    stats += "Оценка: " + helper.floatToString(this.grade);   
                }

                if (this.all_tasks) {
                    if (stats != '') 
                    {
                        stats += " | "
                    }

                    stats += "Прогресс: " + helper.floatToString(this.progress) + "%"; 
                }
            }

            return stats;
        },
        progress() {
            if (this.completed_tasks == 0) {
                return 0
            }
            return (this.completed_tasks / this.all_tasks * 100).toFixed(2);
        },
        htmlDeck() {
            return helper.toHtml(this.description);
        }
    },
    async created() {
        this.loaded_class = 'loaded';
    }
}
</script>

<style>
.module-preloader {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    top: 0;
    left: 0;
    z-index: 10;
    transition: 0.8s;
}

.module-preloader.loaded {
    opacity: 0;
    pointer-events: none;
}

.module {
    transition: 0.8s;
    border: 2px solid #1E1E1E;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
    gap: 10px;
    color: #1E1E1E;
    min-height: 320px;
    position: relative;
}

.module p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.84px;
}

.progres {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.84px;
}

.module:not(.closed):hover {
    background-color: #1E1E1E;
    color: var(--tip-gray);
}

.closed {
    color: var(--tip-gray);
    border-color: var(--tip-gray);
    cursor: default;
}

.module-enter-from {
    opacity: 0;
}

.module-enter-active {
    transition: 0.8s;
}

.module-leave-to {
    opacity: 0;
}

.module-leave-active {
    transition: 0.8s;
}
</style>