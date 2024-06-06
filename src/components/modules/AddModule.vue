<template>
    <div class="module add-module" ref="module">
        <div class="open" @click="open">
            +
        </div>
        <div class="module-form">
            <div class="close" @click="close">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.05078 21L20.9982 1" stroke="#BEBEBE" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M1 1L21 21" stroke="#BEBEBE" stroke-width="1.5" stroke-miterlimit="10" />
                </svg>
            </div>
            <label for="module_name">
                Название
            </label>
            <input type="text" v-model="name" id="module_name">
            <label for="module_slug">
                Ссылка
            </label>
            <input type="text" v-model="slug" id="module_slug">
            <label for="module_description">
                Описание
            </label>
            <textarea id="module_description" cols="30" rows="3" v-model="description"></textarea>
            <div class="btns">
                <Button @click="add" theme="dark">Добавить</Button>
                <Button @click="cancel" theme="dark">Отмена</Button>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/assets/js/api';
import Button from '../ui/Button.vue';

export default {
    components: {
        Button
    },
    data() {
        return {
            name: "",
            slug: "",
            description: "",
        }
    },
    methods: {
        open() {
            this.$refs.module.classList.add('active');
        },
        close() {
            this.$refs.module.classList.remove('active');
        },
        cancel() {
            this.name = "";
            this.slug = "";
            this.description = "";
            this.close();
        },
        async add() {
            const new_module = this.validation({
                name:       this.name,
                slug:        this.slug,
                description: this.description,
            });

            if (new_module?.is_error) {
                // TODO Вывод ошибки.
                console.error(new_module.message);
                return;
            }

            const result = await api.addModules(new_module);

            if (!result) {
                // TODO Вывод ошибки.
                console.error("Не удалось добавить модуль.");
                return;
            }
            
            this.$emit('add', result);
            this.cancel();
        },
        validation(data) {
            if (data.name == '') {
                const valid_error = {
                    is_error: true,
                    field:    'name',
                    message:  'Введите название.'
                }

                return valid_error;
            } 

            if (data.slug == '') {
                const valid_error = {
                    is_error: true,
                    field:    'slug',
                    message:  'Введите ссылку.'
                }

                return valid_error;
            } 

            return data;
        }
    },
    emits: {
        add: (payload) => {
            return payload
        }
    }
}
</script>

<style scoped>
.add-module {
    position: relative;
}

.add-module.active {
    background-color: var(--black);
    color: var(--tip-gray);
}

.open {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    font-size: 50px;
    cursor: pointer;
    z-index: 10;
    transition: 0.8s;
}

.add-module.active .open {
    opacity: 0;
    pointer-events: none;
}

.module-form {
    opacity: 0;
    width: 100%;
    position: relative;
    transition: 0.8s;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.add-module.active .module-form {
    opacity: 1;
}

.close {
    position: absolute;
    z-index: 10;
    right: -25px;
    top: -25px;
    cursor: pointer;
}

.module-form input,
.module-form textarea {
    outline: none;
    border: 1px solid transparent;
    font-size: 16px;
    padding: 5px;
    resize: none;
}

.btns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 16px;
}

.btns button {
    height: 35px;
    width: max-content;
    padding: 5px 10px;
    min-width: 120px;
}
</style>