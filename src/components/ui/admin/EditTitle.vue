<template>
    <h1 v-if="lvl == 1">
        <div class="tip top-outside">&lt;h1&gt;</div>
        <slot></slot>
        <div class="tip bottom-outside">&lt;/h1&gt;</div>
    </h1>
    <h2 v-if="lvl == 2">
        <div class="tip top-outside">&lt;h2&gt;</div>
        <slot></slot>
        <div class="tip bottom-outside">&lt;/h2&gt;</div>
    </h2>
    <h3 v-if="lvl == 3">
        <div class="tip top-outside">&lt;h3&gt;</div>
        <slot></slot>
        <div class="tip bottom-outside">&lt;/h3&gt;</div>
    </h3>
    <h4 v-if="lvl == 4">
        <div class="tip top-outside">&lt;h4&gt;</div>
        <slot></slot>
        <div class="tip bottom-outside">&lt;/h4&gt;</div>
    </h4>
    <h5 v-if="lvl == 5">
        <div class="tip top-outside">&lt;h5&gt;</div>
        <slot></slot>
        <div class="tip bottom-outside">&lt;/h5&gt;</div>
    </h5>
    <h6 v-if="lvl == 6">
        <div class="tip top-outside">&lt;h6&gt;</div>
        <slot></slot>
        <div class="tip bottom-outside">&lt;/h6&gt;</div>
    </h6>
</template>

<script>
    export default {
        props: {
            lvl: 1
        }
    }
</script>

<style>
    h1, h2, h3, h4, h5, h6 {
        position: relative;
        text-align: left;
        padding: 14px 0;
        margin-top: 0;
        letter-spacing: 0.84px;
    }

    h1 {
        font-size: 64px;
        line-height: 64px;
        margin-bottom: 50px;
    }

    h2 {
        font-size: 48px;
        line-height: 48px;
        margin-bottom: 30px;
    }

    h3 {
        font-size: 36px;
        line-height: 36px;
        margin-bottom: 15px;
    }

    h4, h5, h6 {
        font-size: 24px;
        line-height: 24px;
        margin-bottom: 15px;
    }
    
</style>