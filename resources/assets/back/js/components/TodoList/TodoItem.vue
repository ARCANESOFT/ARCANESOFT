<template>
    <li>
        <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
        </span>
        <input type="checkbox" v-model="todo.checked" @change="toggle(todo)">
        <span class="text">{{ todo.content }}</span>
        <small :class="todo.level"><i class="fa fa-clock-o"></i> {{ todo.elapsed }}</small>
        <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            todo: {
                type: Object,
                default() {
                    return {
                        content: 'hello',
                        elapsed: '',
                        level: '',
                        checked: false
                    }
                }
            }
        },
        methods: {
            toggle(todo) {
                console.debug(todo.checked);
            }
        }
    }
</script>
