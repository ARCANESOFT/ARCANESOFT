<script>
    export default {
        name: 'media-errors',

        props: ['errors']
    }
</script>

<template>
    <transition name="fade">
        <ul class="list-unstyled" v-if="errors.any()">
            <li v-for="key in errors.keys()">
                <span class="label label-danger" v-if="errors.has(key)">{{ errors.first(key) }}</span>
            </li>
        </ul>
    </transition>
</template>
