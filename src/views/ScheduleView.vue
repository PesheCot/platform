<template>
    <div class="container" v-if="group && schedule">
        <Titles lvl="1">
            Расписание [{{ group }}]
        </Titles>
        <!-- <Text>
            Кстати, представители современных социальных резервов являются только методом политического участия и превращены в посмешище, 
            хотя само их существование приносит несомненную пользу обществу. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: 
            внедрение современных методик прекрасно подходит для реализации прогресса профессионального сообщества.
        </Text> -->
        <ScheduleStudent 
            :group="group"
            :schedule="schedule"
        />
    </div>
    <div class="container" v-else>
        <Titles lvl="1">
            Расписание
        </Titles>
        <!-- <Text>
            Кстати, представители современных социальных резервов являются только методом политического участия и превращены в посмешище, 
            хотя само их существование приносит несомненную пользу обществу. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: 
            внедрение современных методик прекрасно подходит для реализации прогресса профессионального сообщества.
        </Text> -->
        <Text>
            У вас пока нет расписания.
        </Text>
    </div>
</template>
<script>
import Titles from '@/components/ui/Title.vue';
import Text from '@/components/ui/Text.vue';
import api from '@/assets/js/api';
import ScheduleStudent from '@/components/schedule/scheduleStudent.vue';

export default {
    components: {
        ScheduleStudent,
        Titles,
        Text
    },
    data() {
        return {
            group: '',
            schedule: []
        }
    },
    async created() {
        const result = await api.getSchedule();
        if (!result.error) {
            this.group = result.attributes.group_name;
            this.schedule = result.attributes.schedules;
        }
    }
}
</script>
<style>
</style>