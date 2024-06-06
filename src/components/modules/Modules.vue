<template>
    <transition name="modules" v-if="modules">
        <div class="modules" v-if="modules.length > 0">
            <div class="tip top-outside">&lt;div class="modules"&gt;</div>
            <Module v-for="item in modules" 
                :key="item.id"    
                :id="item.id"
                :title="item.attributes.name" 
                :description="item.attributes.description" 
                :slug="item.attributes.slug"
            />
            <AddModule v-if="is_admin" @add="update"/>
            <div class="tip bottom-outside">&lt;div&gt;</div>
        </div>
        <div class="modules-loading" v-else>
            <div class="tip top-outside">&lt;div class="modules-loading"&gt;</div>
            Загрузка модулей...
            <div class="tip bottom-outside">&lt;div&gt;</div>
        </div>
    </transition>
    <transition name="modules" v-else>
        <div class="modules-loading" >
            <div class="tip top-outside">&lt;div class="modules-loading"&gt;</div>
                Нет доступных модулей.
            <div class="tip bottom-outside">&lt;div&gt;</div>
        </div>
    </transition>
</template>
<script>
import Module from '@/components/modules/Module.vue';
import AddModule from './AddModule.vue';
import api from '@/assets/js/api';

export default {
    components: {
        Module,
        AddModule
    },
    data() {
        return {
            modules: [],
            is_admin: false
        }
    },
    methods: {
        update(new_module) {
            new_module.is_closed = false;
            this.modules.push(new_module);
        }
    },
    async created() {
        const result = (await api.getModules());
        if (result.error) {
            this.modules = result.error
        } else {
            this.modules = result.data
        }
    },
}
</script>
<style>
.modules {
    margin: 36px 0;
    padding: 14px 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.modules-loading {
    position: absolute;
    padding: 14px 0;
    font-size: 18px;
    line-height: 24px;
    margin-top: 15px;
}

.modules-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.modules-enter-active {
    transition: 0.8s;
}

.modules-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}

.modules-leave-active {
    transition: 0.8s;
}
</style>