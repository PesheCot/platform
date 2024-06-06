<template>
    <header>
       <div class="tip top-inner">
            &lt;header&gt;
       </div>
       <div class="container header-container">
           <nav>
                <div class="tip center-outside">
                    menu:
                </div>
                <ul class="menu">
                    <!--li class="menu-item" :class="getLinkClass('/test')" v-if="user?.role != 'unactivated'">
                        <router-link to="/test">Текущий урок</router-link>
                    </li -->
                    <li class="menu-item" :class="getLinkClass('/modules')" v-if="user?.role != 'unactivated'">
                        <router-link to="/modules">Модули</router-link>
                    </li>
                    <li class="menu-item" :class="getLinkClass('/schedule')" v-if="user?.role != 'unactivated'">
                        <router-link to="/schedule">Расписание</router-link>
                    </li>
                    <li class="menu-item" :class="getLinkClass('/review')" v-if="role == 'teacher'">
                        <router-link to="/review">Задания</router-link>
                    </li>
                    <li class="menu-item" :class="getLinkClass('/profile')">
                        <router-link to="/profile">Профиль</router-link>
                    </li>
                    <li class="menu-item" :class="getLinkClass('/help')">
                        <router-link to="/help">Помощь</router-link>
                    </li>
                </ul>
            </nav>
            <div class="profile">
                <table>
                    <tr v-if="user">
                        <td align="right" class="profile-tip">user:</td>
                        <td align="left" class="profile-name"><router-link to="/profile">{{ user_name }}</router-link></td>
                    </tr>
                    <tr>
                        <td align="right" class="profile-tip">notifications:</td>
                        <td align="left" class="profile-notifications"><span @click="notificationDrop">Уведомления [{{ notlength }}]</span><span class="circle" :class="notlength > 0 ? 'active' : ''"></span>
                            <div class="drop-notifications" :class="is_drop ? 'active' : ''">
                                <div class="notifications-list" v-if="notifications.length > 0">
                                    <div class="notification" v-for="item in notifications">
                                        <a :href ="item.link">
                                            {{ item.message }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
       </div>
       <div class="tip bottom-inner">
            &lt;/header&gt;
       </div> 
    </header>    
</template>

<script>
    import api from '@/assets/js/api';
    import state from "@/store/index.js"

    export default {
        data() {
            return {
                user: {},
                user_name: '',
                is_drop: false,
                notlength: 0,
                role: null,
            }
        },
        emits: ['length-changed'],
        props: {
            notifications: [],
            notifications_length: 0,
        },
        methods: {
            getLinkClass(path) {
                return this.$router.currentRoute.value.path.indexOf(path) != -1 ? 'active' : '';
            },
            notificationDrop() {
                if (this.notifications.length > 0) {
                    this.is_drop = !this.is_drop;
                    this.notifications.forEach(elem => {
                        if (elem.checked != true) {
                            const checked = {
                                checked: true,
                                token: localStorage.getItem('accessToken')
                            }
                            this.$store.state.notifications.send(JSON.stringify(checked));
                            this.notlength = 0
                        }
                    });
                    this.$emit('length-changed');
                    this.notifications.reverse()
                }
            }
        },
        computed: {
            name () {
                return this.$store.state.user_name
            },
        },
        async created() {
            this.user = await api.getUser(true);
            this.user_name = this.user.name
        },
        watch: {
            async name(newName, oldName) {
                const result = this.$store.state.user_name;
                if (result.name) {
                    this.user_name = result.name
                }
            },
            notifications_length (newLength) {
                this.notlength = newLength
            },
            user(new_value) {   
                this.role = new_value?.role?.type;
            }
        },
    }
</script>

<style>
    header {
        position: relative;
        height: 100px;
        border-bottom: 1px solid var(--tip-gray);
        display: flex;
        align-items: center;
    }

    .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    nav {
        position: relative; 
        display: flex;
        align-items: center;
        padding: 0 30px;
    }

    nav::after,
    nav::before {
        position: absolute;
        font-size: 48px;
        line-height: 48px;
        height: 54px;
    }

    nav::after {
        left: -6px;
        content: '[';
    }

    nav::before {
        right: -6px;
        content: ']';
    }

    nav .tip.center-outside {
        left: -56px;
    }

    .menu {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }

    .menu-item {
        border-bottom: 2px solid transparent;
        padding-bottom: 5px;
        transition: 0.8s;
    }

    .menu-item.active {
        border-bottom: 2px solid var(--black);
    }
        
    .menu-item a {
        font-size: 24px;
        line-height: 24px;
    }

    .profile-tip {
        font-size: 20px;
        line-height: 20px;
        color: var(--tip-gray);
    }

    .profile-name {
        font-size: 32px;
        line-height: 32px;
    }

    .profile-notifications {
        cursor: pointer;
        position: relative;
        font-size: 20px;
        line-height: 20px;
    }
    
    .drop-notifications {
        position: absolute;
        display: grid;
        right: 0px;
        top: calc(100% + 20px);
        width: max-content;
        max-width: 300px;
        z-index: 100;
        grid-template-rows: 0fr;
        overflow: hidden;
        border: 0px solid var(--black);
        background-color: #fff;
        transition: 0.8s;
    }
    
    .notifications-list {
        min-height: 0px;
        max-height: 400px;
        overflow-y: scroll;
    }
    
    .drop-notifications.active {
        border: 1px solid var(--black);
        grid-template-rows: 1fr;
    }

    .notification {
        border: none;
        padding: 10px 20px;
        border-bottom: 1px solid var(--black);
        cursor: pointer;
    }

    .notification:hover {
        background-color: var(--tip-gray);
    }

    .notification:last-of-type {
        border: none;
        margin-bottom: 0px;
    }

    .profile-notifications .circle {
        position: absolute;
        top: 0px;
        right: 0px;
        display: block;
        background-color: red;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        opacity: 0;
        transition: 0.5s;
    } 

    .profile-notifications .circle.active {
        opacity: 1;
    }
</style>

