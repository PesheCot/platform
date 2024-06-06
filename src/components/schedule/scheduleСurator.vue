<template>
    <div class="schedule_group">
        <div class="group-title"  @click="accordion"><h2>{{ group }}</h2></div>
        <div ref="drop_item" class="drop-item">
            <div  ref="schedules"  class="schedules">
                <schedule v-for="item in schedules" :day_number="item.day_number" :day="item.day" :title="item.title" :desc="item.desc" :type="item.type" :is_closed="item.is_closed" :data="item.data" :curent_data="item.curent_data"/>
            </div>
        </div>
    </div>
</template>
<script>
import schedule from '@/components/schedule/Schedules.vue';
export default {
    components: {
        schedule
    },
    props: {
        group: "",
    },
    data() {
        return {
            schedules: [
                {day_number: '06', day: 'понедельник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '10.04'},
                {day_number: '07', day: 'вторник', title: 'Семинар', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'семинар',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '08', day: 'среда', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '09', day: 'четверг', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '10', day: 'пятница', title: 'Экзамен', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'экзамен',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '11', day: 'суббота', title: '', desc: '', type: 'выходной'},
                {day_number: '12', day: 'воскресенье', title: '', desc: '', type: 'выходной'},
                {day_number: '13', day: 'понедельник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '14', day: 'вторник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '15', day: 'среда', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '16', day: 'четверг', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '17', day: 'пятница', title: 'Экзамен', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'экзамен',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '18', day: 'суббота', title: '', desc: '', type: 'выходной'},
                {day_number: '19', day: 'воскресенье', title: '', desc: '', type: 'выходной'},
                {day_number: '20', day: 'понедельник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '21', day: 'вторник', title: 'Семинар', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'семинар',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '22', day: 'среда', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '23', day: 'четверг', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '24', day: 'пятница', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '25', day: 'суббота', title: '', desc: '', type: 'выходной'},
                {day_number: '26', day: 'воскресенье', title: '', desc: '', type: 'выходной'},
            ]
        }
    },
    methods: {
        accordion() {
            let schedules_height = this.$refs.schedules.clientHeight;
            let schedules = document.querySelectorAll('.drop-item');
            schedules.forEach(schedule => {
                schedule.style.height = 0 + 'px'
            })
            if (this.$refs.drop_item.clientHeight == 0) {
                this.$refs.drop_item.style.height = schedules_height + 'px'
            } else {
                this.$refs.drop_item.style.height = 0 + 'px'
            }
        },
    }        
}    
</script>
<style>
    .group-title {
        position: relative;
        cursor: pointer;
    }
    .drop-item {
        transition: 0.8s;
        height: 0px;
        overflow: hidden;
    }
</style>