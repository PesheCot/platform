<template>
    <div class="container">
        <Titles lvl="1">
            Модули
        </Titles>
        <!-- <Text>
            Кстати, представители современных социальных резервов являются только методом политического участия и превращены в посмешище, 
            хотя само их существование приносит несомненную пользу обществу. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: 
            внедрение современных методик прекрасно подходит для реализации прогресса профессионального сообщества.
        </Text> -->
        <Modules/>
    </div>
</template>

<script>
import Titles from '@/components/ui/Title.vue';
import Text from '@/components/ui/Text.vue';
import Modules from '@/components/modules/Modules.vue';

export default {
    components: {
        Titles,
        Text,
        Modules
    }
}
</script>

<style>

</style>