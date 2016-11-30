<template>
    <ul class="todo-list">
        <todo-item v-for="todo in todos" :todo="todo"></todo-item>
    </ul>
</template>

<script>
    import TodoItem from './TodoItem.vue';

    export default {
        data () {
            return {
                todos: [
                    {
                        content: 'Design a nice theme',
                        elapsed: '2 mins',
                        level:   'label label-danger',
                        checked: false
                    },
                    {
                        content: 'Make the theme responsive',
                        elapsed: '10 mins',
                        level:   'label label-warning',
                        checked: false
                    },
                    {
                        content: 'Let theme shine like a star',
                        elapsed: '1 day',
                        level:   'label label-info',
                        checked: false
                    },
                    {
                        content: 'Let theme shine like a sun',
                        elapsed: '3 day',
                        level:   'label label-success',
                        checked: false
                    },
                    {
                        content: 'Check your messages and notifications',
                        elapsed: '14 hours',
                        level:   'label label-primary',
                        checked: false
                    },
                    {
                        content: 'Let theme shine like a pikachu',
                        elapsed: '1 year',
                        level:   'label label-info',
                        checked: false
                    }
                ]
            }
        },
        components: {
            'todo-item': TodoItem
        },
        mounted() {
            var todoList = $('.todo-list');

            todoList.sortable({
                placeholder: 'sort-highlight',
                handle: '.handle',
                forcePlaceholderSize: true,
                zIndex: 999999
            });
        }
    }
</script>
