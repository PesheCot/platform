<template>
    <div class="notification" :class="getClass" :style="getColor">
        <div class="notification-close">
            <svg width="12" height="12" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.05078 21L20.9982 1" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"/>
                <path d="M1 1L21 21" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"/>
            </svg>
        </div>
        <div class="notification-contet">
            <div class="notification-title">{{ title }}</div>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            id: Number,
            title: '',
            message: '',
            status: '',
            is_hidden: false
        },
        computed: {
            getColor() {
                if (this.status == 'error'){
                    return {borderColor: '#FF6868'}
                }
                if (this.status == 'good'){
                    return {borderColor: '#51804E'}
                }
                if (this.status == 'bad'){
                    return {borderColor: '#C87223'}
                }
            },
            getClass() {
                if (this.is_hidden){
                    return 'hidden'
                }
            }
        },
    } 
</script>
<style>

    .notification {
        border: 2px solid var(--black);
        background-color: #fff;
        transition: 0.8s;
        opacity: 1;
        position: relative;
    }

    .notification.hidden {
        opacity: 0;
    }

    .notification-contet {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        cursor: default;
        padding: 10px;
    }

    .notification-title {
        font-size: 18px;
        line-height: 20px;
    }

    .notification-contet p{
        padding: 0;
        margin: 0;
        font-size: 14px;
    }

    .notification-close {
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
    }
    
</style>