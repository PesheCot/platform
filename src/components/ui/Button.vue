<template>
    <button :class="theme">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        props: {
            theme: ''
        }
    }
</script>
<style>
    button {
        width: max-content;
        min-width: 220px;
        height: 54px;
        padding: 15px;
        font-family: 'Ubuntu Mono';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 133%;
        text-align: center;
        letter-spacing: 0.84px;
        color: var(--black);
        border: 1px solid var(--black);
        background-color: #FFF;
        outline: none;
        transition: 0.8s;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--blue);
        border-color: #FFF;
        color: #FFF;
    }

    button.note {
        background-color: #FFF;
        border-color: var(--dark-green);
        color: var(--dark-green);
        min-width: 150px;
        height: 45px;
        font-size: 16px;
        padding: 7px;
    }

    button.note:hover {
        background-color: var(--dark-green);
        border-color: var(--dark-green);
        color: #FFF;
    }

    button.dark:hover {
        background-color: var(--black);
        border-color: #FFF;
        color: #FFF;
    }
</style>