<template>
    <div :style="checkDate" class="day_card">
        <div class="day">
            <span :style="setColor">{{ getDate }}</span>
            <p :style="setColor">{{ getDay }}</p>
        </div>
        <div class="day_card-description notclosed" v-if="title">
            <RouterLink :to="'lessons/' + slug" class="day_card_link">
                <h2 :style="setColor">
                    {{ title }}
                   <span>🠖</span>
                </h2>
            </RouterLink>
            <div v-html="htmlDesc"></div>
        </div>
        <div class="day_card-description" v-else>
            <h2 :style="setColor" v-if="is_weekend">Выходной</h2>
            <h2 :style="setColor" v-else>-</h2>
        </div>
    </div>
</template>
<script>
import helper from '@/assets/js/helper.js';

export default {
    props: {
        date:  '',
        title: '',
        desc:  '',
        type:  '',
        slug:  '',
        now:   false,
        is_weekend: false,
    },
    computed: {
        setColor(){ 
            if (this.type == 'Экзамен') {
                return  {color: '#FF6868'}
            }
            if (this.type == 'Семинар') {
                return {color: '#C87223'}
            }
            if (this.is_weekend) {
                return {color: '#7D827F'}
            }
        },
        checkDate(){ 
            if (this.now) {
                return  {backgroundColor: '#E1E1E1'}
            }
        },
        getDate() {
            const date = new Date(Date.parse(this.date));
            return date.getDate().toString().padStart(2,0);
        },
        getDay() {
            const date = new Date(Date.parse(this.date)),
                  days = [
                      'Воскресенье',
                      'Понедельник',
                      'Вторник',
                      'Среда',
                      'Четверг',
                      'Пятница',
                      'Суббота'
                  ];

            return days[date.getDay()];
        },
        htmlDesc() {
            return helper.toHtml(this.desc);
        }
    },
}    
</script>
<style>
    .day_card {
        position: relative;
        cursor: default;
        width: 100%;
        transition: 0.8s;
        margin-bottom: 12px;
    }

    .day {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        background-color: var(--black);
        border-right: 1px solid var(--tip-gray);
        padding: 10px;
        gap: 5px;
    }
    .day p {
        padding: 0;
        margin: 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 0.84px;
        text-transform: lowercase;
        color: #FFFFFF;
    }
    .day span {
        font-weight: 400;
        font-size: 32px;
        line-height: 32px;
        letter-spacing: 0.84px;
        text-transform: lowercase;
        color: #FFFFFF;
    }

    .day_card-description {
        padding: 10px;
        padding-bottom: 31px;
        display: flex;
        flex-direction: column;
        min-height: fill;
    }

    .day_card-description h2 {
        margin: 0;
        padding: 0;
        margin-top: 15px;
        margin-bottom: 15px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.84px;
    }

    .day_card_link span {
        font-size: 20px;
        line-height: 20px;
        display: inline-block;
        transition: 0.8s;
    }

    .day_card_link:hover span {
        transform: translateX(10px);
    }

    /* тест */

    .day_card-description.notclosed h2{
        text-decoration: none;
        background:  no-repeat 0 100%;
        padding: 4px 0;
        background-image: linear-gradient(currentColor, currentColor);
        background-size: 0% 2px;
        transition: background-size .3s ease;
    }

    .day_card-description.notclosed h2:hover, .day_card-description.notclosed h2:focus{
        background-size: 100% 2px;
    }

    

    .day_card-description p {
        margin: 0;
        padding: 0;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        letter-spacing: 0.84px;
    }

    .day_card-description-img {
        width: 15px;
        height: 15px;
        background-color: blue;
        cursor: pointer;
    }
</style>