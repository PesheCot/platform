<template>
    <div class="modules_card">
        <h3>{{ title }}</h3>
        <p>{{ desc }}</p>
        <div class="number">{{ id }}</div>
    </div>
</template>
<script>
    export default {
        props: {
            id: Number,
            desc: "",
            title: "",
        },
    }
</script>
<style>

</style>