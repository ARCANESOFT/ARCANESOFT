<template>
    <transition name="fade">
        <ul class="list-unstyled" v-if="hasErrors">
            <li v-for="error in errors">
                <span class="label label-danger">{{ displayFirstError(error) }}</span>
            </li>
        </ul>
    </transition>
</template>

<script>
    export default {
        props: ['errors'],

        methods: {
            hasErrors() {
                return this.errors.length > 0
            },

            displayFirstError(error) {
                return _.first(error)
            },
        }
    }
</script>
