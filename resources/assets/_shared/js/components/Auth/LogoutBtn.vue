<template>
    <a href="#" @click.prevent="logout">{{ value }}</a>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: 'Logout'
            },
            url: {
                type: String,
                required: true
            }
        },
        methods: {
            logout () {
                this.$http.post(this.url).then(() => {
                    location.replace('/');
                });
            }
        }
    }
</script>
