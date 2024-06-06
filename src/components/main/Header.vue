<template>
    <header>
        <div class="header-container container">
            <div class="header-left">
                <img class = "header_logo" src="../../assets/img/logo.png" alt="YourStart-up">
                <ul class="header_navigation">
                    <li class="menu-item">
                        <a href="#about">О платформе</a>
                    </li>
                    <li class="menu-item">
                        <a href="#apparel">О компании</a>
                    </li>
                    <li class="menu-item">
                        <a href="#contacts">Контакты</a>
                    </li>
                </ul>
            </div>
            <div class="header-right">
                <Button theme="dark" @click="openPopup('login')">Войти</Button>
                <!-- <Button theme="dark" @click="openPopup('reg')">Зарегистрироваться</Button> -->
            </div>
        </div>
    </header>
</template>
<script>
import Button from '../ui/Button.vue';

export default {
        components: {
            Button
        },
        methods: {
            openPopup(type) {
                this.$store.commit('openPopup', true);
                this.$store.commit('setPopupType', type);
            }
        }
    }
</script>
<style scoped>
    header {
        position: relative;
        height: 100px;
        border-bottom: 1px solid var(--tip-gray);
        display: flex;
        align-items: center;
        margin-bottom: 120px;
    }
    .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header_navigation {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }
    .header-left,
    .header-right {
        display: flex;
        flex-direction: row;
        gap: 60px;
    }  
    .header-right {
        gap: 20px;
    }  
    .header_logo {
        object-fit: cover;
        width: 120px;
        height: 65px;
    }

    @media screen and (max-width: 1300px) {
        header {
            display: none;
        }
    }
</style>