<template>
    <Popup type="login">
        <form action="" @submit.prevent="submit" class="popup-form" ref="form">
            <div class="error-message" :class="error.is_error && login_error ? 'active' : ''" v-html="error.message"></div>
            <div class="error-message" :class="this.$store.state.loginError ? 'active' : ''">Неверный логин или пароль</div>
            <div class="error-message" :class="login_error && !error.is_error && !this.$store.state.loginError ? 'active' : ''">Ошибка сервера</div>
            <div class="popup-form__content">
                <h2>Вход</h2>
                <div class="popup-item">
                    <p>Емайл</p>
                    <input @focus="remove_message" type="text" placeholder="Почта" name="identifier">
                </div>
                <div class="popup-item">
                    <p>Пароль</p>
                    <input @focus="remove_message" type="password" placeholder="Пароль" name="password">
                </div>
                <Button theme="dark">Войти</Button> 
            </div>
        </form>
    </Popup>
</template>
<script>
import Popup from '../ui/Popup.vue'
import Button from '../ui/Button.vue';
import api from '@/assets/js/api';

export default {
        components: {
            Button,
            Popup,
        },
        data () {
            return {
                login_error: false,
                error: {},
                conection: null
            }
        },
        methods: {
            async submit() {;
                const form = this.$refs.form;

                const data = this.validation({
                    identifier: form.identifier.value,
                    password: form.password.value
                });

                this.error = data;
                console.log(this.error);

                if (data.is_error) {
                    // TODO Вывод ошибки
                    this.login_error = true
                    console.error(data);
                    return;
                }

                const result = await api.login(data);

                if (result) {
                    this.$router.push('/profile');
                    this.$store.commit('isLogin', result.jwt);
                    this.login_error = false
                } else {
                    this.login_error = true
                }      
            },
            validation(data) {
                let is_valid = false;

                is_valid = String(data.identifier).toLowerCase()
                                  .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

                if (!is_valid) {
                    const valid_error = {
                        is_error: true,
                        field:    'identifier',
                        message:  'Некорректый email.'
                    }

                    return valid_error;
                }

                if (data.password == '') {
                    const valid_error = {
                        is_error: true,
                        field:    'password',
                        message:  'Введите пароль.'
                    }

                    return valid_error;
                } 
                
                if (data.password.length < 6) {
                    const valid_error = {
                        is_error: true,
                        field:    'password',
                        message:  'Пароль должен быть 6 или более символов.'
                    }

                    return valid_error;
                }

                return data;
            },
            remove_message () {
                this.login_error = false;
                this.$store.commit('loginError', false);
            },
            sendToken(message){
                console.log(this.connection);
                this.connection.send(message)
            }
        },
        mounted() {
            this.remove_message();
        },
    }
</script>
<style>
    .popup-form {
        border: 1px solid #1E1E1E;
        padding: 30px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .popup-item p {
        margin: 0;
        padding: 0;
        margin-top: 20px;
        margin-bottom: 15px;
    }

    .popup-form__content {
        display: flex;
        align-items: center;

        flex-direction: column;
    }

    .popup-form__content input {
        width: 330px;
        padding: 15px;
        border-radius: 0;
        border-color: var(--black);
    }

    .popup-item:last-of-type input {
        margin-bottom: 40px;
    }

    .popup-form__content input, select, textarea {
        color: var(--tip-gray);
    }

    
    textarea:focus, .popup-form__content input:focus {
        color: var(--black);
    }

    .popup-checkbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 24px;
        margin-bottom: 40px;
        width: 54%;
        gap: 10px;
    } 

    .popup-checkbox p {
        margin: 0;
        padding: 0;
        color: var(--tip-gray);
    }

    .popup-checkbox input {
        width: 20px;
        height: 20px;
    }

    .erroro_message {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 16px 24px;
        border: 1px solid red;
        z-index: 10;
        background-color: #FFF;
        top: 20px;
        transition: 0.8s;
        opacity: 0;
        pointer-events: none;
    }

    .erroro_message.active {
        top: 60px;
        opacity: 1;
        pointer-events: all;
    }
</style>