<template>
    <ul class="todo-list">
        <todo-item v-for="todo in todos" :todo="todo"
                   @toggleTodo="toggleOne"
                   @deleteTodo="deleteOne"
        ></todo-item>
    </ul>
</template>

<script>
    import Vue from 'vue'
    import Sortable from 'sortablejs'

    Vue.component('todo-item', require('./TodoItem.vue'));

    export default {
        data () {
            return {
                todos: [
                    {
                        id: 1,
                        content: 'Design a nice theme',
                        elapsed: '2 mins',
                        level:   'danger',
                        checked: false
                    },
                    {
                        id: 2,
                        content: 'Make the theme responsive',
                        elapsed: '10 mins',
                        level:   'warning',
                        checked: false
                    },
                    {
                        id: 3,
                        content: 'Let theme shine like a star',
                        elapsed: '1 day',
                        level:   'info',
                        checked: false
                    },
                    {
                        id: 4,
                        content: 'Let theme shine like a sun',
                        elapsed: '3 day',
                        level:   'success',
                        checked: false
                    },
                    {
                        id: 5,
                        content: 'Check your messages and notifications',
                        elapsed: '14 hours',
                        level:   'primary',
                        checked: false
                    },
                    {
                        id: 6,
                        content: 'Let theme shine like a pikachu',
                        elapsed: '1 year',
                        level:   'info',
                        checked: false
                    }
                ]
            }
        },
        mounted() {
            let me = this;

            Sortable.create(this.$el, {
                handle: '.handle',
                ghostClass: 'sort-highlight',
                chosenClass: 'sortable-chosen',
                onEnd(e) {
                    // console.debug(e.oldIndex, e.newIndex);
                    me.orderUpdated(e);
                },
            });
        },
        methods: {
            toggleOne({todo}) {
                //
            },
            deleteOne({todo}) {
                this.todos = _.filter(this.todos, t => t.id != todo.id);
            },
            orderUpdated(e) {
                // console.debug(e.oldIndex, e.newIndex, this.todos);
            }
        }
    }
</script>
