<template>
    <li :class="[todo.level, todo.checked ? 'done' : '']">
        <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
        </span>
        <input type="checkbox" v-model="todo.checked" @click="toggleTodo">
        <span class="text">{{ todo.content }}</span>
        <small class="label" :class="'label-'+todo.level">
            <i class="fa fa-clock-o"></i> {{ todo.elapsed }}
        </small>
        <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o" @click="deleteTodo"></i>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['todo'],
        methods: {
            toggleTodo() {
                this.$emit('toggleTodo', {todo: this.todo});
            },
            deleteTodo() {
                this.$emit('deleteTodo', {todo: this.todo});
            }
        }
    }
</script>
