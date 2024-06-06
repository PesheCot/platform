<template>
    <div class="container error-container">
        <div class="error-block">
            <h1>404</h1>
            <p>Ошибка</p>
        </div>
        <div class="error-content">
            <p>Страница была удалена, либо никогда не существовала</p>
            <router-link to="/">
                <Button>Вернуться на главную</Button>
            </router-link>
        </div>
    </div>
</template>
<script>
    import Button from '@/components/ui/Button.vue';
    export default {
        name: '404',
        components: {
            Button
        }
    }
</script>
<style>
    .container.error-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 50px;
        margin: 0px auto;
        margin-top: 50vh;
        transform: translateY(-100%);
        width: max-content;
    }

    .error-block h1 {
        font-size: 200px;
        font-weight: 500;
    }

    .error-block p {
        font-size: 80px;
        font-weight: 400;
    }

    .error-content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 100%;
    }

    .error-content P {
        font-size: 40px;
        font-weight: 400;
        max-width: 50%;
        line-height: 120%;
    }
</style>