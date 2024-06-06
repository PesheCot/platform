<template>
    <section id="profile">
        <div class="container">
            <Title lvl="1">
                Профиль 🡒 {{ title }}
            </Title>
            <div class="profile__wrapper">
                <Menu />
                <div class="profile-right">
                    <div class="profile-title">
                        <Title lvl="2">Информация</Title>
                    </div>
                    <div class="profile-content">
                        <div class="tip top-outside">&lt;div class="profile__info"&gt;</div>
                        <div class="profile__info">
                            <div class="tip top-outside big">info: &#123;</div>
                            <div class="profile__grid">
                                <Row v-for="row in user_fields" :name="row.name" :value="row.value" :comment="row.comment"/>
                            </div>
                            <div class="tip bottom-outside big">&#125;</div>
                        </div>
                        <div class="tip bottom-outside">&lt;/div&gt;</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Title from '@/components/ui/Title.vue';
import Row from '@/components/profile/Row.vue';
import Menu from '@/components/profile/Menu.vue';
import fieldsRules from '@/assets/js/fields-rules.js';
import api from '@/assets/js/api';

export default {
    components: {
        Title,
        Row,
        Menu,
    },
    data() {
        return {
            user_fields: [],
            title: ''
        }
    },
    async created() {
        let user = await api.getUser();

        if (user) {
            this.title = user.name + ' ' + user.last_name;

            const user_fields = [
                'id',
                'name',
                'last_name',
                'patronymic',
                'email',
                'phone'
            ];

            user_fields.forEach(key => {
                this.user_fields.push({
                    key,
                    name:    fieldsRules.getName(key),
                    value:   user[key],
					type:    fieldsRules.getType(key),
                    comment: fieldsRules.getComment(key),
                });
            });

            this.user_fields.push({
                key:     'status',
                name:    fieldsRules.getName('status'),
                value:   user.role.description,
                type:    fieldsRules.getType('status'),
                comment: fieldsRules.getComment('status'),
            });
        }
    }
}
</script>
<style>
.profile__wrapper {
    display: flex;
    gap: 180px;
    /* justify-content: space-between; */
}

.profile__grid {
    display: grid;
    padding: 20px 0;
}

.profile__info {
    position: relative;
    margin-left: 40px;
}

.profile-content {
    position: relative;
    padding: 14px 0;
}

.tip.top-outside.big,
.tip.bottom-outside.big {
    font-size: 20px;
    line-height: 20px;
}
</style>