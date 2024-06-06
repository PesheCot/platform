<template>
    <div class="lesson closed" v-if="is_closed || !slug">
        <div class="lesson-card closed">
            <div class="lessons-info">
                <template v-if="date_formatted">
                    <div class="lesson-date" v-if="type == 'Урок'">дата: до {{ date_formatted }}</div>
                    <div class="lesson-date" v-else>дата: {{ date_formatted }}</div>
                </template>
                <div class="lesson-date" v-else></div>
                <div class="lesson-type"> {{ type }}</div>
            </div>
            <h3> {{ name }}</h3>
            <div v-html="htmlDeck"></div>
            <p>Не открыт</p>
        </div>
    </div>
    <RouterLink refs="lesson" class="lesson" :to="'/lessons/' + slug " v-else>
        <div class="lesson-card" :style="{borderColor: border_color}">
            <div class="lessons-info">
                <template v-if="date_formatted">
                    <div class="lesson-date" v-if="type == 'Урок'">
                        <div>дата: до <span :style="{color: data_color}">{{ date_formatted }}</span></div>
                    </div>
                    <div class="lesson-date" v-else>дата: <span :style="{color: data_color}">{{ date_formatted }}</span></div>
                </template>
                <div class="lesson-date" v-else></div>
                <div class="lesson-type"> {{ type }}</div>
            </div>
            <h3> {{ name }} </h3>
            <div v-html="htmlDeck"></div>
            <p v-html="generateStatus"></p>
        </div>
    </RouterLink>
</template>
<script>
import helper from '@/assets/js/helper.js'
import { all } from 'axios';

export default {
    props: {
        id: "",
        date: "",
        current_date: "",
        type: "",
        name: "",
        slug: "",
        grade: 0,
        description: "",
        condition: "",
        is_closed: false,
        is_curent: false,
        all_tasks: null,
        completed_tasks: null,
        journal: {},
        all_lessons: []
    },

    data() {
        return {
            border_color: '',
            data_color: '',
            progress_color: '',
            grade_color: '',
            date_formatted: null,
        }
    },
    methods: 
    {
        checkData() {
            if (this.date) {
                this.date_formatted = helper.date_format(new Date(this.date));
                let current_date = helper.date_format(new Date(this.current_date));
                if (Date.parse(this.date_formatted) < Date.parse(current_date)){
                    let error_color = 'var(--red)'
                    this.setColor(error_color);
                    
                } else if (Date.parse(this.date_formatted) == Date.parse(current_date)) {
                    let error_color = 'var(--orange)'
                    this.setColor(error_color);
                }
            }
        },
        setColor(error_color){ 
            if (this.date != "" ) {
                let is_grade = (this.journal?.grade >= 3) 

                if (!is_grade) {
                    this.grade_color = error_color
                    this.border_color = error_color
                    this.data_color = error_color
                }
            }
        },    
    },
    computed: {
        generateStatus() {
            let status = ""

            if (this.journal?.grade) {
                status += 'Оценка: <span style="color: ' + this.grade_color + '">' + helper.floatToString(this.journal?.grade) + '</span>'                                                
            } 

            return status;
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
    created() {
        this.checkData();
    },
};
</script>
<style>
.lesson {
    width: 100%;
}

.lessons-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.lesson p {
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

.lesson:not(.closed):hover .lesson-card {
    background-color: var(--black);
    border-color: var(--black);
    color: var(--tip-gray)!important;
}

.lesson-card.closed {
    color: var(--tip-gray);
    cursor: default;
    border: 2px solid var(--tip-gray);
}

.lesson-card {
    transition: 0.8s;
    border: 2px solid var(--black);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 40px;
    color: var(--black);
    width: 100%;
    height: 100%;
}

.lesson-card span {
    transition-delay: none;
}

.today {
    border: 2px solid var(--orange);
}

.today .lesson-date span {
    color: var(--orange);
}

.time_up {
    border: 2px solid var(--red);
}

.time_up .lesson-date span {
    color: var(--red);
}
</style>