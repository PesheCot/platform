<template>
	<section id="profileData">
		<div class="container">
			<Title lvl="1">
				Профиль 🡒 {{ name }} {{ last_name }}
			</Title>
			<div class="profile__wrapper">
				<Menu />
				<div class="profile-right">
					<div class="profile-title">
						<Title lvl="2">Редактирование профиля</Title>
					</div>
					<transition name="info" mode="out-in">
						<div class="profile-content" v-if="user_fields.length > 0">
							<div class="tip top-outside">&lt;div class="profile__info"&gt;</div>
								<div class="profile__info">
									<div class="tip top-outside big">info: &#123;</div>
									<div class="profile__grid">
										<Row v-for="row in user_fields" 
											:field_key="row.key"
											:name="row.name" 
											:value="row.value" 
											:comment="row.comment"
											:is_edit="true" 
											@input-changed="userChanged"
										/>
									</div>
									<div class="tip bottom-outside big">&#125;</div>
								</div>
								<div class="profile__info">
									<div class="tip top-outside big">password: &#123;</div>
									<div class="profile__grid">
										<div class="error-message-profile-all" :class="$store.state.error_profile_password == 'Не все поля заполнены' ? '' : 'hidden'">{{ $store.state.error_profile_password }}</div>
										<span class="profile__grid-first">Старый пароль:</span>
										<div class="error-input">
											<div class="error-message-profile" :class="$store.state.error_profile_password == 'Неправильный старый пароль' ? '' : 'hidden'">{{ $store.state.error_profile_password }}</div>
											<input @input="removeError" ref="old_password" type="password" v-bind="password">
										</div>
										<span class="profile__grid-first">Новый пароль:</span>
										<div class="error-input">
											<div class="error-message-profile" :class="($store.state.error_profile_password == 'Новые пароли не совпадают' || $store.state.error_profile_password == 'Новый пароль должен отличаться от старого') ? '' : 'hidden'">{{ $store.state.error_profile_password }}</div>
											<input @input="removeError" ref="new_password" type="password" v-bind="password">
										</div>
										<span class="profile__grid-first">Подтверждение пароля:</span>
										<input @input="removeError" ref="referens_password" type="password" v-bind="confirmed_password">
									</div>
									<div class="profile__btns">
										<button @click="getNewPassword()">Сохранить</button>
										<button @click="resetPassword()">Отмена</button>
									</div>
									<div class="tip bottom-outside big">&#125;</div>
								</div>
							<div class="tip bottom-outside">&lt;/div&gt;</div>
						</div>
						<div class="profile-content" v-else>
							<div class="tip top-outside">&lt;div class="profile__info"&gt;</div>
								<div class="profile__info" >
									<div class="tip top-outside big">info: &#123;</div>
										<div class="profile__grid">
											<span class="profile__grid-first">Получение данных...</span>
										</div>
									<div class="tip bottom-outside big">&#125;</div>
								</div>
							<div class="tip bottom-outside">&lt;/div&gt;</div>
						</div>				
					</transition>
				</div>
			</div>
		</div>
		<div class="save-container" :class="is_changed ? 'visible' : ''">
			Данные были изменены сохраните изменения.
			<button @click="save()">Сохранить</button>
			<button @click="cancel()">Отмена</button>
		</div>
	</section>
</template>
<script>
import Title from '@/components/ui/Title.vue';
import Row from '@/components/profile/Row.vue';
import Menu from '@/components/profile/Menu.vue';
import fieldsRules from '@/assets/js/fields-rules.js';
import api from '@/assets/js/api';
import store from '@/store';

export default {
	components: {
		Title,
		Row,
		Menu,
	},
	data() {
		return {
			name: '',
			last_name: '',
			user_fields: [],
			passport_fields: [],
			password: '',
			confirmed_password: '',
			is_changed: false,
			changed_user_fields: [],
			changed_passport_fields: [],
			user: {}
		}
	},
	methods: {
		userChanged(e) {
			this.is_changed = true;
			this.changed_user_fields.push(e);

			const index = this.user_fields.findIndex(item => item.key == e.key);
			this.user_fields[index].value = e.new_value;
		},
		passportChanged(e) {
			this.is_changed = true;
			this.changed_passport_fields.push(e);

			const index = this.passport_fields.findIndex(item => item.key == e.key);
			this.passport_fields[index].value = e.new_value;
		},
		save() {
			this.is_changed = false;
			const user = {};
			this.changed_user_fields.forEach(field => {
				user[field.key] = field.new_value;
				if (field.key == "last_name" && this.user_fields.last_name != field.new_value) {
					this.last_name = field.new_value
				}

				if (field.key == "name") {
					this.name = field.new_value
				}
			})
			api.updateUserProfile(user);	
		},
		cancel() {
			this.is_changed = false;
			this.changed_user_fields.forEach((field) => {
				const index = this.user_fields.findIndex(item => item.key == field.key);
				this.user_fields[index].value = field.old_value;
			});

			this.changed_passport_fields.forEach((field) => {
				const index = this.passport_fields.findIndex(item => item.key == field.key);
				this.passport_fields[index].value = field.old_value;
			});
		},
		getNewPassword() {
			const password = {
				currentPassword: this.$refs.old_password.value,
				password: this.$refs.new_password.value,
				passwordConfirmation: this.$refs.referens_password.value
			}
			api.updateUser(password);
			setTimeout(() => {
				if (this.$store.state.error_profile_password == null) {
					this.resetPassword();
				}
			}, 500);

		},
		resetPassword() {
			this.$refs.old_password.value = '';
			this.$refs.new_password.value = '';
			this.$refs.referens_password.value = '';
			this.removeError();
		},
		removeError() {
			this.$store.commit('openErrorProfilePassword', null);
		}
	},
	async created() {
		const userData = await api.getUser();
		this.user ={
			name:  userData.name,
			last_name: userData.last_name,
			patronymic: userData.patronymic,
			phone: userData.phone,
		}

        if (userData) {
            this.name = userData.name;
			this.last_name = userData.last_name
            delete userData.role;

			// INFO 
			for (let key in this.user) {
				if (fieldsRules.getType(key) == 'date') {
					userData.info[key] = new Date(userData.info[key]).toLocaleDateString();
				}

                this.user_fields.push({
					key,
                    name:    fieldsRules.getName(key),
                    value:   this.user[key],
					type:    fieldsRules.getType(key),
                    comment: fieldsRules.getComment(key),
                });
            }
        }
	},
}
</script>
<style>
	.profile__grid {
		position: relative;
		grid-template-columns: 270px 60%;
		row-gap: 25px;
	}

	.profile__grid input {
        padding: 10px;
        border-radius: 0;
		border: 2px solid var(--black);
		font-size: 24px;
		width: 100%;
	}
	
	.save-container {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translate(-50%, 100px);
		background-color: var(--orange);
		color: #FFFFFF;
		padding: 10px 20px;
		opacity: 0;
		pointer-events: none;
		transition: 0.8s;
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.save-container.visible {
		transform: translate(-50%, 0);
		opacity: 1;
		pointer-events: all;
	}

	.save-container button {
		padding: 0 10px;
		height: 30px;
		min-width: max-content;
	}

	.info-enter-from {
		opacity: 0;
		transform: translateX(50px);
	}

	.info-enter-active {
		transition: 0.8s;
	}

	.info-leave-to {
		opacity: 0;
		transform: translateX(-50px);
	}

	.info-leave-active {
		transition: 0.8s;
	}

	.profile__btns {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.error-input {
		width: 100%;
		position: relative;
	}

	.error-message-profile,
	.error-message-profile-all {
		position: absolute;
		left: 0px;
		bottom: -20px;
		color: red;	
		transition: 0.5s;
	}

	.error-message-profile.hidden {
		transform: translateY(-100%);
		opacity: 0;
		pointer-events: none;
	}

	.error-message-profile-all {
		bottom: auto;
		top: 20px;
	}

	.error-message-profile-all.hidden {
		transform: translateY(-100%);
		opacity: 0;
		pointer-events: none;
	}
</style>