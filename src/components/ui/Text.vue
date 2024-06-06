<template>
    <p :class="type">
    <div class="tip top-outside">&lt;p&gt;</div>
    <div class="text-border"></div>
    <slot></slot>
    <div class="tip bottom-outside">&lt;/p&gt;</div>
    </p>
</template>

<script>
export default {
    props: {
        type: ''
    }
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
</style>