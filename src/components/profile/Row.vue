<template>
    <span class="profile__grid-first">{{ name }}:</span>
    <span class="profile__grid-second">
        <span class="profile-value">
            {{ value }}
        </span>
        <span class="profile-comment" v-if="comment">
            // {{ comment }}
        </span>
        <div class="profile-editing" v-if="is_edit">
            <button class="profile-btn profile-edit"  ref="edit" @click="edit()">
                Редактировать
            </button>
        </div>
        <div class="profile-edits" ref="edits" v-if="is_edit">
            <input class="profile-input" type="text" ref="input" :value="value">
            <button class="profile-btn profile-save" @click="save()">
                Сохранить
            </button>
            <button class="profile-btn profile-cancel" @click="cancel()">
                Отмена
            </button>
        </div>
    </span>
</template>
<script>
import api from '@/assets/js/api';

export default {
    props: {
        field_key: '',
        name: '',
        value: '',
        comment: '',
        is_edit: false,
    },
    emits: ['input-changed'],
    methods: {
        edit() {
            this.$refs.edits.classList.add("active");
            this.$refs.edit.classList.add("hidden");
        },
        save() {
            const old_value = this.value,
                  new_value = this.$refs.input.value.trim();
            this.$refs.edits.classList.remove("active");
            this.$refs.edit.classList.remove("hidden");

            if (old_value != new_value) {
                this.$emit('input-changed', {
                    key: this.field_key,
                    new_value,
                    old_value,
                });
            } 
        },
        cancel() {
            this.$refs.edits.classList.remove("active");
            this.$refs.edit.classList.remove("hidden");
        }
    },
} 
</script>
<style>
.profile__grid-first {
    width: max-content;
    font-size: 24px;
    line-height: 34px;
    margin-top: 10px;
    grid-column-start: 1;
}

.profile__grid-second {
    position: relative;
    display: inline-flex;
    gap: 10px;
    width: max-content;
    font-size: 24px;
    line-height: 34px;
    margin-top: 10px;
    grid-column-start: 2;
    margin-left: 20px;
    transition: .7s;
}

.profile__grid input.profile-input {
    padding: 0px;
    width: max-content;
    max-width: 150px;
}

.profile__grid .profile__grid-second {
    width: 100%;
    justify-content: space-between;
}

.profile-comment {
    color: #51804E;
}

.profile-editing {
    display: flex;
    gap: 10px;
    /* opacity: 0; */
    pointer-events: none;
    transition: .7s;
    background-color: #fff;
}

.profile-edits {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: 10px;
    opacity: 0;
    pointer-events: none;
    transition: .7s;
    background-color: #fff;
}

.profile-edits.active {
    opacity: 1;
    pointer-events: all;
}

.profile-input {
    font-size: 24px;
    outline: none;
    border: none;
    border-bottom: 1px solid #000;
    padding: 0;
}

.profile-btn {
    padding: 1px 20px;
    font-size: 18px;
    background-color: #fff;
    border: 1px solid #000000;
    cursor: pointer;
    height: 34px;
}

.profile__grid-second:hover .profile-editing {
    opacity: 1;
    pointer-events: all;
}

.profile-edit.hidden {
    display: none;
}

.profile-input.active,
.profile-save.active,
.profile-cancel.active {
    display: block;
}

/* .profile__grid-second:hover .profile-input,
.profile-save,
.profile-cancel {
	display: none;
} */

.profile__grid.profile-value {
    width: 100%;
    max-width: 150px;
    overflow-x: auto;
}
</style>