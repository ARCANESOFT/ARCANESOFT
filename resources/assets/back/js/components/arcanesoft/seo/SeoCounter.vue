<!--<seo-counter name="title" value="Title content" :min="50" :max="60"></seo-counter>-->

<template>
    <div>
        <input :name="name" type="text" v-model="content" class="form-control"/>
        <span :class="contentClass">{{ contentLength }} chars</span>
    </div>
</template>

<script>
    export default {
        name: 'seo-counter',

        props: {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: false,
                default: ''
            },
            min: {
                type: Number,
                required: false,
                default: 50
            },
            max: {
                type: Number,
                required: false,
                default: 60
            }
        },
        data() {
            return {
                content: this.value,
            }
        },
        computed: {
            contentClass() {
                let length = this.contentLength;
                let middle = Math.round((this.min + this.max) / 2);

                if (length < this.min)
                    return 'label label-warning';

                if (length == middle)
                    return 'label label-success';

                if (length >= this.min && length <= this.max)
                    return 'label label-info';

                return 'label label-danger';
            },
            contentLength() {
                return this.content.length;
            }
        }
    }
</script>
