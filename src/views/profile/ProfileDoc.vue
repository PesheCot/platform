<template>
	<section id="profileData">
		<div class="container">
			<Title lvl="1">
				Профиль 🡒 {{ title }}
			</Title>
			<div class="profile__wrapper">
				<Menu />
				<div class="profile-right">
					<div class="profile-title">
						<Title lvl="2">Документы</Title>
					</div>
					<div class="profile-content">
						<div class="tip top-outside">&lt;div class="profile__info"&gt;</div>
						<div class="profile__info">
							<div class="tip top-outside big">Info: &#123;</div>
							<div class="profile__flex">
                                <Document v-for="doc in info" :name="doc.name"/>
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
import Menu from '@/components/profile/Menu.vue';
import Document from '@/components/profile/Document.vue'
import { useRoute } from 'vue-router';
import api from '@/assets/js/api';

export default {
    components: {
        Title, 
        Menu,
        Document,
    },
    data() {
        return {
			title: '',
            info: [
                {
                    name: 'Скан паспорта*',
                    src: '@/src/assets/img/example_of_pasport.jpg',
                },
                {
                    name: 'Скан справки об инвалидности*',
                }
            ]
        }
    }, 
	async created() {
		const user = await api.getUser();

        if (user) {
            this.title = user.name + ' ' + user.last_name;
        }
	}
}
</script>
<style>
.profile__flex {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px 0;
}
</style>