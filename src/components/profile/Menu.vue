<template>
    <div class="profile-menu">
        <div class="tip top-outside">&lt;div class="profile__menu"&gt;</div>
        <div class="profile__menu">
            <div class="tip top-outside big">menu: &#123;</div>
            <ul class="profile__list" ref="menu">
                <li class="profile__menu-item">
                    <router-link to="/profile" :class="getLinkClass('/profile')" class="profile__menu-link">Общая информация</router-link>
                </li>
                <li class="profile__menu-item">
                    <router-link to="/profile/edit" :class="getLinkClass('/profile/edit')" class="profile__menu-link">Редактировать профиль</router-link>
                </li>
                <li class="profile__menu-item">
                    <span class="profile__menu-link logout" @click="logout">Выход</span>
                </li>
            </ul>
            <div class="tip bottom-outside big">&#125;</div>
        </div>
        <div class="tip bottom-outside">&lt;/div&gt;</div>
    </div>
</template>
<script>
import api from '@/assets/js/api';

export default {
    methods: {
        getLinkClass(path) {
            return this.$router.currentRoute.value.path == path ? 'active' : '';
        },
        logout() {
            api.logout();
        }
    },
}
</script>
<style>
.profile-menu {
    position: relative;
    height: max-content;
}

.profile__menu {
    position: relative;
    margin: 14px 0px 14px 40px;
}

.profile__list {
    width: max-content;
    list-style: none;
    padding: 14px 0;
    margin-block-end: 0;
}

.profile__menu-item {
    margin-bottom: 20px;
}

.profile__menu-item:first-of-type {
    margin-top: 20px;
}

.profile__menu-link {
    font-size: 24px;
    line-height: 24px;
}

.profile__menu-link.active {
    border-bottom: 2px solid #1E1E1E;
}

.profile__menu-link.logout {
    cursor: pointer;
}

.tip.top-outside.big,
.tip.bottom-outside.big {
    font-size: 20px;
    line-height: 20px;
}
</style>