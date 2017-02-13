<template>
    <ol class="media-toolbar-breadcrumbs breadcrumb">
        <li>
            <a @click.prevent="goHome">
                <i class="fa fa-fw fa-home"></i>
            </a>
        </li>
        <li v-for="(breadcrumb, index) in breadcrumbs.all()">
            <a @click.prevent="goBack(index)">{{ breadcrumb }}</a>
        </li>
    </ol>
</template>

<script>
    import Breadcrumbs from './../Breadcrumbs';

    export default {
        data() {
            return {
                breadcrumbs: new Breadcrumbs
            }
        },

        mounted() {
            eventHub.$on('media_directory_opened', name => {
                this.breadcrumbs.push(name);
                eventHub.$emit('breadcrumbs_changed_location',
                    this.breadcrumbs.location(),
                    this.breadcrumbs.uri()
                );
            });

            eventHub.$on('media_location_cleared', () => {
                this.breadcrumbs.clear();
            });
        },

        methods: {
            // Navigation
            goHome() {
                this.breadcrumbs.clear();

                eventHub.$emit('breadcrumbs_changed_location',
                    this.breadcrumbs.location(),
                    this.breadcrumbs.uri()
                );
            },

            goBack(index) {
                this.breadcrumbs.goBack(index);

                eventHub.$emit('breadcrumbs_changed_location', this.breadcrumbs.location());
            },

            isRoot() {
                return this.breadcrumbs.isRoot();
            }
        }
    }
</script>
