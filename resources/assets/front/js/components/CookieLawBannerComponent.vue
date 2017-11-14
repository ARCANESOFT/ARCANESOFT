<script>
    import Lang from "laravel-lang-js";
    import messages from "../lang/cookie-law-banner";

    export default {
        name: "cookie-law-banner-component",

        props: {
            locale: {
                type: String,
                "default": "fr"
            }
        },

        data() {
            return {
                isOpen: false,
                lang: new Lang({
                    locale: this.locale,
                    messages: messages
                })
            };
        },

        created() {
            this.isOpen = ! this.getAccepted();
        },

        methods: {
            getAccepted() {
                return JSON.parse(localStorage.getItem('cookie:accepted') || 'false');
            },

            accept() {
                localStorage.setItem('cookie:accepted', true);
                this.isOpen = false;
            }
        }
    }
</script>

<template>
    <transition appear name="cookieLawBannerTransition">
        <div class="cookie-law-banner" v-if="isOpen">
            <div class="cookie-law-content">{{ lang.get('message') }}</div>
            <button class="cookie-law-button" @click="accept">{{ lang.get('button') }}</button>
        </div>
    </transition>
</template>

<style lang="scss">
    .cookie-law-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 9999;
        width: 100%;
        padding: 1.25em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        background: #E5EDF3;
        color: #232323;

        & > .cookie-law-button {
            padding: 0.625em 3.125em;
            cursor: pointer;
            background: #31708F;
            color: #FFF;
            border: none;
            border-radius: 0;
            transition: background .2s ease-in-out;

            &:hover {
                background: darken(#31708F, 10%);
            }
        }
    }

    .cookieLawBannerTransition-enter,
    .cookieLawBannerTransition-leave-to {
        transform: translate(0, 12.5em);
    }

    .cookieLawBannerTransition-enter-to,
    .cookieLawBannerTransition-leave {
        transform: translate(0, 0);
    }

    .cookieLawBannerTransition-enter-active,
    .cookieLawBannerTransition-leave-active {
        transition: transform .4s ease-in;
    }
</style>
