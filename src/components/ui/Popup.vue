<template>
     <div class="popup" :class="$store.state.open_popup && $store.state.popup_type == type ? 'open' : ''" >
        <div class="popup-bg"></div>
        <div class="popup-container" :class="type">
            <div class="popup-close" @click="closePopup">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.05078 21L20.9982 1" stroke="#BEBEBE" stroke-width="1.5" stroke-miterlimit="10"/>
                    <path d="M1 1L21 21" stroke="#BEBEBE" stroke-width="1.5" stroke-miterlimit="10"/>
                </svg>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            type: ''
        },
        methods: {
            closePopup() {
                this.$store.commit('openPopup', false);
                this.$store.commit('setPopupType', "");
            }
        }
    } 
</script>
<style>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        pointer-events: none;
        transition: 0.8s;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 20px;
        z-index: 100;
    }

    .popup.open {
        opacity: 1;
        pointer-events: all;
    }

    .popup-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #FFF;
    }

    .popup-container {
        min-width: 710px;
        height: 100%;
        position: relative;
    }

    .popup-close {
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
        z-index: 10;
        transition: 0.8s;
    }

    .popup-close:hover {
        transform: rotate(180deg);
    }

    .popup-close path {
        transition: 0.8s;
    }

    .popup-close:hover path {
        stroke: var(--black)
    }
    
    .reg {
        height: 100%;
    }
    
    .login {
        height: max-content;
    }
</style>