<template>
    <template v-if="$router.currentRoute.value.path == '/'">
        <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </template>
    <template v-else>
        <Header @length-changed="zeroingLength" :notifications ="message" :notifications_length="notifications_length"/>
        <main>
            <div class="tip top-inner">
                &lt;main&gt;
            </div>
            <router-view v-slot="{ Component }">
                <transition name="route" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
            <div class="tip bottom-inner">
                &lt;/main&gt;
            </div>
        </main>
    </template>
</template>


<script>
import { watch } from 'vue';
import api from './assets/js/api';
import state from "@/store/index.js"
import Header from '@/components/ui/Header.vue';

export default {
    data() {
        return{
            is_login: {},
            conection: null,
            message: [],
            is_open: false,
            notifications_length: 0,
            change_notifications: []
        }
    },
    components: {
        Header
    },
    computed: {
        token () {
            return this.$store.state.is_login
        }
    },
    methods: {
        zeroingLength () {
            this.notifications_length = 0;
            this.message.forEach( elem => {
                elem.checked = true
            })
        },
        setMessages(messages) {
            this.message = messages;
        },
        setLength(notifications_length) {
            this.notifications_length = notifications_length
        },
        setChange(change) {
            this.change_notifications = change
        },
        soketToken(login) {
            const conection = new WebSocket('wss://45.80.69.32:8081');
            this.$store.commit('setNotifications', conection)
            let messages = []
            let notifications_length = 0;
            const setMessages = this.setMessages;
            const setLength = this.setLength;
            this.$store.state.notifications.onmessage = function (e) {
                if (typeof JSON.parse(e.data) == 'object' || typeof JSON.parse(e.data) == 'array') {
                    if (JSON.parse(e.data)?.length) {
                        messages = []
                        messages.push(JSON.parse(e.data));
                        if (messages.length > 0) {
                            setMessages(messages[0])
                            notifications_length = 0
                            messages[0].forEach(elem => {
                                if (!elem.checked) {
                                    notifications_length ++
                                }
                            });
                            setLength(notifications_length)
                            return messages;
                        }
                    } else {
                        if (JSON.parse(e.data).length == 0) {
                            return
                        }
                        messages[0].push(JSON.parse(e.data))
                        notifications_length = 0
                        messages[0].forEach(elem => {
                            if (!elem.checked) {
                                notifications_length ++
                            }
                        });
                        setMessages(messages[0]);
                        setLength(notifications_length)
                    }
                }
            }
            
            this.$store.state.notifications.onopen = (e) => {
                if (login && this.is_open == false) {
                    this.$store.state.notifications.send(JSON.stringify(login));
                    this.is_open = true
                } else {
                    this.$store.state.notifications.send(JSON.stringify(this.is_login));
                }
            } 
            
            this.conection = conection;
        }
    },
    watch: {
        token(newToken, oldToken) {
            const user_token = {
                token: newToken
            }
            this.is_login = user_token
            this.soketToken(this.message);
        }
    },
    created() {
        const login ={
            token: localStorage.getItem('accessToken')
        } 
        if (login) {
            this.soketToken(login);
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

:root {
    --tip-gray: #BEBEBE;
    --black: #1E1E1E;
    --dark-grey: #2D2D2D;
    --yellow: #FFF068;
    --red: #FF6868;
    --green: #68FF80;
    --dark-green: #51804E;
    --orange: #C87223;
    --class: #4CC4A6;
    --func: #CBCB93;
    --var: #99D7F6;
    --blue: #407CBF;
    --string: #C98F78;
}

* {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 400;
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}

main {
    position: relative;
    padding: 14px 80px;
    min-height: calc(100vh - 100px);
}

a {
    text-decoration: none;
    color: var(--black);
}

strong {
    font-weight: bold;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--black);
}

.container {
    width: 100%;
    max-width: 1580px;
    padding: 0 80px;
    margin: 0 auto;
}

.tip {
    color: var(--tip-gray);
    position: absolute;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.84px;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    width: max-content;
}

.tip.top-inner {
    left: 5px;
    top: 5px;
}

.tip.bottom-inner {
    left: 5px;
    bottom: 5px;
}

.tip.center-outside {
    left: -40px;
    font-size: 20px;
    line-height: 20px;
}

.tip.top-outside {
    left: -40px;
    top: 0;
}

.tip.bottom-outside {
    left: -40px;
    bottom: 0;
}

/* Firefox */
* {
    scrollbar-width: thin;
    scrollbar-color: var(--dark-grey) #DFE9EB;
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
    width: 12px;
    width: 12px;
}

*::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #DFE9EB;
    border: 4px solid #FFFFFF;
}

*::-webkit-scrollbar-track:hover {
    background-color: #B8C0C2;
}

*::-webkit-scrollbar-track:active {
    background-color: #B8C0C2;
}

*::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: var(--dark-grey);
    border: 3px solid #FFFFFF;
}

*::-webkit-scrollbar-thumb:hover,
*::-webkit-scrollbar-thumb:active {
    background-color: var(--black);
}

.route-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.route-enter-active {
    transition: 0.8s;
}

.route-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}

.route-leave-active {
    transition: 0.8s;
}

@media screen and (max-width: 1300px) {
    main {
        padding: 0;
    }

    .container {
        padding: 0 20px;
    }
}

.text-content h1,
.text-content h2,
.text-content h3,
.text-content h4,
.text-content h5,
.text-content h6,
.text-content p,
.text-content ul,
.text-content ol {
    position: relative;
    margin: 0 0 15px;
    padding: 14px 0;
}

h1, h2, h3, h4, h5, h6 {
    text-align: left;
    margin-top: 0;
    letter-spacing: 0.84px;
}

.text-content h1::before,
.text-content h2::before,
.text-content h3::before,
.text-content h4::before,
.text-content h5::before,
.text-content h6::before,
.text-content p::before,
.text-content ul::before,
.text-content ol::before  {
    position: absolute;
    left: -40px;
    top: 0;
    color: var(--tip-gray);
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.84px;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    width: max-content;
}

.text-content h1::after,
.text-content h2::after,
.text-content h3::after,
.text-content h4::after,
.text-content h5::after,
.text-content h6::after,
.text-content p::after,
.text-content ul::after,
.text-content ol::after  {
    position: absolute;
    left: -40px;
    bottom: 0;
    color: var(--tip-gray);
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.84px;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    width: max-content;
}

.text-content h1::before {
    content: "<h1>"; 
}

.text-content h1::after {
    content: "</h1>"; 
}

.text-content h2::before {
    content: "<h2>"; 
}

.text-content h2::after {
    content: "</h2>"; 
}

.text-content h3::before {
    content: "<h3>"; 
}

.text-content h3::after {
    content: "</h3>"; 
}

.text-content h4::before {
    content: "<h4>"; 
}

.text-content h4::after {
    content: "</h4>"; 
}

.text-content h5::before {
    content: "<h5>"; 
}

.text-content h5::after {
    content: "</h5>"; 
}

.text-content h6::before {
    content: "<h6>"; 
}

.text-content h6::after {
    content: "</h6>"; 
}
.text-content p::before {
    content: "<p>"; 
}

.text-content p::after {
    content: "</p>"; 
}

.text-content ul::before {
    content: "<ul>"; 
}

.text-content ul::after {
    content: "</ul>"; 
}

.text-content ol::before {
    content: "<ol>"; 
}

.text-content ol::after {
    content: "</ol>"; 
}

h1 {
    font-size: 64px;
    line-height: 64px;
    margin-bottom: 50px;
}

h2 {
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 30px;
}

h3 {
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 15px;
}

h4, h5, h6 {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 15px;
}

p, ul, ol {
    font-size: 18px;
    line-height: 24px;
}

.text-content ul,
.text-content ol {
    padding-left: 18px;
}

.text-content a {
   color: #407CBF;
   border-bottom: 1px solid transparent;
   transition: 0.5s;
}

.text-content a:hover {
    border-bottom: 1px solid #407CBF;
}

code {
    background: var(--black);
    border-radius: 5px;
    display: inline-block;
    width: max-content;
    padding: 5px 10px;
    line-height: 24px;
    color: #FFFFFF;
}

hr {
    margin: 70px 0;
    height: 4px;
    width: 100%;
    background-color: var(--tip-gray);
    border: none;
}
</style>
