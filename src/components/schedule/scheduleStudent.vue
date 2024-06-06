<template>
    <div class="schedules">
        <schedule v-for="item in schedule" 
            :date="item.date" 
            :title="item?.lesson?.name" 
            :desc="item?.lesson?.description" 
            :type="item?.lesson?.type" 
            :slug="item?.lesson?.slug"
            :now="item.now"
            :is_weekend="item.is_weekend"/>
    </div>
</template>
<script>
import Titles from '@/components/ui/Title.vue';
import Text from '@/components/ui/Text.vue';
import schedule from '@/components/schedule/Schedules.vue';
export default {
    components: {
        Titles,
        Text,
        schedule
    },
    props: {
        group: '',
        schedule: []
    },
    data() {
        return {
            /*schedules: [
                {day_number: '06', day: 'понедельник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '10.04'},
                {day_number: '07', day: 'вторник', title: 'Семинар', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'семинар',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '08', day: 'среда', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '09', day: 'четверг', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '10', day: 'пятница', title: 'Экзамен', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'экзамен',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '11', day: 'суббота', title: '', desc: '', type: 'выходной'},
                {day_number: '12', day: 'воскресенье', title: '', desc: '', type: 'выходной'},
                {day_number: '13', day: 'понедельник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '14', day: 'вторник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '15', day: 'среда', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '16', day: 'четверг', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '17', day: 'пятница', title: 'Экзамен', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'экзамен',is_closed: false, data: '10.04', curent_data: '11.04'},
                {day_number: '18', day: 'суббота', title: '', desc: '', type: 'выходной'},
                {day_number: '19', day: 'воскресенье', title: '', desc: '', type: 'выходной'},
                {day_number: '20', day: 'понедельник', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '21', day: 'вторник', title: 'Семинар', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'семинар',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '22', day: 'среда', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '23', day: 'четверг', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '24', day: 'пятница', title: 'Урок: "Знакомство с платформой"', desc: 'Поговорим об функционале платформы и попробуем написать свою первую программу', type: 'урок',is_closed: true, data: '10.04', curent_data: '11.04'},
                {day_number: '25', day: 'суббота', title: '', desc: '', type: 'выходной'},
                {day_number: '26', day: 'воскресенье', title: '', desc: '', type: 'выходной'},
            ],*/
        }
    },
    created() {

    }
}
</script>
<style>
.schedules {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>