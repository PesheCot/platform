<template>
    <div class="profile__flex-block">
        <span class="profile__flex-first">{{ name }}:</span>
        <img class="doc-img" src="" alt="" ref="img">
        <form method="post" class="files" ref="form">
            <label class="input-file">
                <input ref="file_inp" type="file" name="file" id="file1" @change="change">
                <span class="doc-btn">Добавить</span>
            </label>
        </form>
        <div class="profile-btns" ref="btns">
            <button class="doc-btn" @click="saveChanges()">Сохранить</button>
            <button class="doc-btn" @click="cancelChanges()">Отмена</button>
        </div>
    </div>
</template>
<script>
export default {

    props: {
        name: '',
        src: ''
    },
    data() {
        return {
            data_src: '',
        }
    },
    methods: {
        change(e) {
            const img = this.$refs.img;

            let file = e.target.files.item(0);
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                img.setAttribute('src', reader.result);
            }
            this.$refs.form.classList.add("hidden");
            this.$refs.btns.classList.add("active");
        },
        saveChanges() {
            this.$refs.btns.classList.remove("active");
        },
        cancelChanges() {
            this.$refs.btns.classList.remove("active");
        }
    },

} 
</script>
<style>
.profile__flex-block {
    display: flex;
    flex-direction: column;
}

.profile__flex-first {
    width: max-content;
    font-size: 24px;
    line-height: 24px;
    margin-top: 10px;
    grid-column-start: 1;
}

.doc-img {
    min-width: 136px;
    max-width: 136px;
    max-height: 188px;
}

.input-file {
    position: relative;
    display: inline-block;
}

.doc-btn {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    font-size: 18px;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #000;
    line-height: 24px;
    padding: 15px 36px;
    margin-top: 20px;
}

.input-file input[type=file] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
}

/* Hover/active */
.input-file:hover span {
    background-color: #fff;
}

/* Disabled */
.input-file input[type=file]:disabled+span {
    background-color: #eee;
}

.profile-btns {
    display: none;
    gap: 26px;
    transition: 1s;
}

.profile-btns.active {
    display: flex;
}

form.files {
    position: relative;
}

form.files.hidden {
    display: none;
}
</style>