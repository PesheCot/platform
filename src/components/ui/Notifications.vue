<template>
    <div class="notifications" @click="add">
        <div class="notifications-container">
            <Notification v-for="item in notifications" :id="item.id" :title="item.title" :message="item.message" :status="item.status" :is_hidden="item.is_hidden"/>
        </div>
    </div>
</template>
<script>
import Notification from "@/components/main/NotificationMassage.vue";
export default {
        components: {
            Notification
        },
        data () {
            return {
                notifications: [] /**
                [
                    {id: 1, title: 'Заголовок 1', message: 'круто круто круто круто круто круто круто круто', status: 'good', is_hidden: false},
                    {id: 2, title: 'Заголовок 2', message: 'круто круто круто круто круто круто круто круто', status: 'good', is_hidden: false},
                    {id: 3, title: 'Заголовок 3', message: 'не круто', status: 'error', is_hidden: false},
                    {id: 4, title: 'Заголовок 4', message: 'ошибка', status: 'bad', is_hidden: false} 
                ] */
            }
        },
        methods: {
            massageCheck() {
                if (this.notifications.length > 3){
                    this.notifications[this.notifications.length - 1].is_hidden = true;
                    setTimeout(() => {
                        this.notifications.pop()
                    }, 800);                       
                }
            },
            add() {
                this.notifications.unshift({id: 5, title: 'Заголовок 5', message: 'ошибка', status: 'bad', is_hidden: false} );
                this.massageCheck();
            }
        },
    } 
</script>
<style>
    .notifications {
        pointer-events: none;
        position: fixed;
        right: 50px;
        bottom: 50px;
        width: 300px;
        height: max-content;
        background-color: rgba(255, 255, 255, 0);
        padding: 20px;
    }

    .notifications-container {
        display: flex;
        flex-direction: column-reverse;
        gap: 10px;
    }
</style>