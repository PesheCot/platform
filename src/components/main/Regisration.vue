<template>
    <Popup type="reg">
        <form action="" class="popup-form" @submit.prevent="submit" ref="form">
            <div class="error-message" :class="error.is_error ? 'active' : ''" v-html="error.message"></div>
            <div class="popup-form__content">
                <h2>Регистрация</h2>
                <div class="popup-item">
                    <p>Имя</p>
                    <input type="text" placeholder="Имя" name="name" >
                </div>
                <div class="popup-item">
                    <p>Фамилия</p>
                    <input type="text" placeholder="Фамилия" name="last_name"  >
                </div>
                <div class="popup-item">
                    <p>Отчество</p>
                    <input type="text" placeholder="Отчество" name="patronymic">
                </div>
                <div class="popup-item">
                    <p>Емайл</p>
                    <input type="email" placeholder="Почта" name="email" >
                </div>
                <div class="popup-item">
                    <p>Телефон</p>
                    <input type="tel" placeholder="Телефон" name="phone"  ref="phone">
                </div>
                <div class="popup-item">
                    <p>Пароль</p>
                    <input type="password" placeholder="Пароль" name="password" >
                </div>
                <div class="popup-item">
                    <p>Подтверждение пароля</p>
                    <input type="password" placeholder="Подтверждение пароля" name="confirmation_password" >
                </div>
                <div class="popup-checkbox">
                    <input type="checkbox" id="policy" name="policy" >
                    <label for="policy">Согласен на обработку персональных данных</label>
                </div>
                <Button theme="dark">Зарегистрироваться</Button> 
            </div>
        </form>
    </Popup>
  
</template>
<script>
import Popup from '../ui/Popup.vue'
import Button from '../ui/Button.vue';
import initMask from '@/assets/js/phone-mask';
import api from '@/assets/js/api';

export default {
        components: {
            Button,
            Popup
        },
        data () {
            return {
                error: {}
            }
        },
        methods: {
            async submit(e) {
                e.preventDefault();
                const form = this.$refs.form;

                const data = this.validation({
                    username:   form.email.value,
                    name:       form.name.value,
                    last_name:  form.last_name.value,
                    patronymic: form.patronymic.value,
                    phone:      form.phone.value,
                    email:      form.email.value,
                    password:   form.password.value,
                    confirmation_password: form.confirmation_password.value,
                });

                this.error = data;
                console.log(this.error);

                if (data.is_error) {
                    // TODO Вывод ошибки
                    console.error(data);
                    return;
                }

                delete data.confirmation_password;

                const result = await api.registration(data);

                if (!result) {
                    // TODO почта
                }

                if (result) {
                    this.$router.push('/profile');
                    this.$store.commit('isLogin', result.jwt);
                }    
            },
            validation(data) {
                if (data.name == '') {
                    const valid_error = {
                        is_error: true,
                        field:    'name',
                        message:  'Введите имя.'
                    }
                    this.error = valid_error;
                    return valid_error;
                } 

                if (data.last_name == '') {
                    const valid_error = {
                        is_error: true,
                        field:    'last_name',
                        message:  'Введите фамилию.'
                    }
                    this.error = valid_error;
                    return valid_error;
                }

                if (data.phone == '') {
                    const valid_error = {
                        is_error: true,
                        field:    'phone',
                        message:  'Введите номер телефона.'
                    }
                    this.error = valid_error;
                    return valid_error;
                }

                if (data.phone.length < 18) {
                    const valid_error = {
                        is_error: true,
                        field:    'phone',
                        message:  'Некорректный номер телефона.'
                    }
                    this.error = valid_error;
                    return valid_error;
                }


                let is_valid = false;

                is_valid = String(data.email).toLowerCase()
                                  .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

                if (!is_valid) {
                    const valid_error = {
                        is_error: true,
                        field:    'email',
                        message:  'Некорректый email.'
                    }
                    this.error = valid_error;
                    return valid_error;
                }

                if (data.password == '') {
                    const valid_error = {
                        is_error: true,
                        field:    'password',
                        message:  'Введите пароль.'
                    }
                    this.error = valid_error;
                    return valid_error;
                } 
                
                if (data.password.length < 6) {
                    const valid_error = {
                        is_error: true,
                        field:    'password',
                        message:  'Пароль должен быть 6 или более символов.'
                    }
                    this.error = valid_error;
                    return valid_error;
                }

                console.log(this.$refs.form.policy.checked);

                if (this.$refs.form.policy.checked == false) {
                    const valid_error = {
                        is_error: true,
                        field:    'policy',
                        message:  'Согласен на обработку персональных данных'
                    }
                    this.error = valid_error;
                    return valid_error;
                }


                if (data.password != data.confirmation_password) {
                    const valid_error = {
                        is_error: true,
                        field:    'confirmation_password',
                        message:  'Пароли не совпадают.'
                    }
                    this.error = valid_error;
                    return valid_error;
                }

                delete data.confirmation_password;
                return data
            }
        },
        mounted() {
            initMask([this.$refs.phone]);
        }
    }
</script>
<style>
    form {
        position: relative;
    }

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
        font-size: 16px;
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

    .error-message {
        position: fixed;
        color: red;
        font-size: 18px;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        pointer-events: none;
        transition: 0.8s;
        background-color: #fff;
        border: 1px solid red;
        padding: 20px 32px;
        z-index: 100;
    }

    .error-message.active {
        top: 15%;
        opacity: 1;
        pointer-events: all;
    }
</style>