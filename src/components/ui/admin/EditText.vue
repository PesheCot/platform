<template>
    <p :class="type">
        <div class="text-border"></div>
        <span v-html="edited_text"></span>

        <button v-if="!is_edit" class="edit-icon" @click="edit">
            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="13.2871" y1="15.1399" x2="28.2871" y2="15.1399" stroke="#1E1E1E"/>
                <line x1="23.5586" y1="25.6513" x2="41.2362" y2="7.97366" stroke="#1E1E1E"/>
                <line x1="40.5537" y1="7.9736" x2="44.0893" y2="11.5091" stroke="#1E1E1E"/>
                <line x1="26.4238" y1="28.4895" x2="44.1015" y2="10.8118" stroke="#1E1E1E"/>
                <line x1="13.2871" y1="39.1729" x2="38.2871" y2="39.1729" stroke="#1E1E1E"/>
                <line x1="37.7871" y1="39.6729" x2="37.7871" y2="24.6729" stroke="#1E1E1E"/>
                <line x1="12.7871" y1="39.6729" x2="12.7871" y2="14.6729" stroke="#1E1E1E"/>
                <path d="M21.497 29.9945C21.4025 30.254 21.5363 30.5409 21.7958 30.6354C22.0553 30.7298 22.3422 30.596 22.4366 30.3365L21.497 29.9945ZM23.9749 26.1101L24.1459 25.6403L23.2062 25.2983L23.0352 25.7681L23.9749 26.1101ZM22.4366 30.3365L23.9749 26.1101L23.0352 25.7681L21.497 29.9945L22.4366 30.3365Z" fill="#1E1E1E"/>
                <path d="M21.7868 29.699C21.5292 29.7984 21.4009 30.0878 21.5003 30.3455C21.5997 30.6031 21.8891 30.7314 22.1468 30.632L21.7868 29.699ZM26.3098 29.0261L26.7763 28.8461L26.4164 27.9131L25.9499 28.0931L26.3098 29.0261ZM22.1468 30.632L26.3098 29.0261L25.9499 28.0931L21.7868 29.699L22.1468 30.632Z" fill="#1E1E1E"/>
                <line x1="23.6046" y1="24.9527" x2="27.1271" y2="28.4" stroke="#1E1E1E"/>
            </svg>
        </button>

        <div v-if="is_edit" class="edit-text">
            <div class="edit-btns">
                <button @click="save" >
                   <img src="@/assets/img/yes.png" alt="">
                </button>
                <button @click.stop="cancel">
                   <img src="@/assets/img/no.png" alt="">
                </button>
            </div>
            <textarea  class="edit-textarea" rows="1" v-model="edited_text"></textarea>
        </div>

        <div v-if="is_edit" class="order-btns">
            <button v-if="is_up">
                🡡
            </button>
            <button v-if="is_down">
                🡣
            </button>
        </div>
    </p>
</template>

<script>
export default {
    props: {
        order: 0,
        text: '',
        id: '',
        is_up: true,
        is_down: true,
    },
    data() {
        return {
            edited_text: '',
            is_edit: false,
            is_saved: false,
        }
    },
    methods: {
        edit() {
            this.is_edit = true;
        },
        cancel() {
            this.edited_text = this.text;
            this.is_edit = false;
        },
        save() {
            this.is_edit = false;

            const block = {
                order: this.order,
                type: 'text',
                content: this.edited_text
            }

            this.is_saved = true;
            this.$emit('save', block);
        }
    },
    created() {
        this.edited_text = this.text;
    },
    emits: ['save']
}
</script>

<style>
p {
    position: relative;
    font-size: 18px;
    line-height: 24px;
    margin: 0 0 15px;
    padding: 14px 0;
}

.text-border {
    position: absolute;
    width: 0;
    top: 14px;
    left: 0;
    height: calc(100% - 14px - 14px);
}

p.warning,
p.danger,
p.good-solution {
    padding-left: 40px;
}

p.warning .text-border,
p.danger .text-border,
p.good-solution .text-border {
    width: 20px;
}

p.warning .text-border {
    background-color: var(--yellow);
}

p.danger .text-border {
    background-color: var(--red);
}

p.good-solution .text-border {
    background-color: var(--green);
}

code {
    background: var(--black);
    border-radius: 5px;
    padding: 5px 10px;
    color: #FFFFFF;
}

.edit-text {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
}

.edit-icon {
    height: 25px;
    width: 25px;
    min-width: 25px;
    padding: 0;
    position: absolute;
    left: -35px;
    top: 11px;
}

.edit-icon svg {
    width: 100%;
    height: 100%;
}

.edit-textarea {
    resize: none;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    color: var(--black);
    padding: 14px 5px;
    margin: 0 -5px;
}

.edit-btns {
    position: absolute;
    left: -40px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.edit-btns button {
    height: 25px;
    width: 25px;
    min-width: 25px;
    padding: 0;
}

.edit-btns button img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.order-btns {
    position: absolute;
    height: 100%;
    right: -35px;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.order-btns button {
    height: 25px;
    width: 25px;
    min-width: 25px;
    padding: 0;
}
</style>