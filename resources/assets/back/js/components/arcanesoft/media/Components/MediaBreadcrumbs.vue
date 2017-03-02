<script>
    import Breadcrumbs from './../Entities/Breadcrumbs';
    import events from './../Events';

    export default {
        data() {
            return {
                breadcrumbs: new Breadcrumbs
            }
        },

        mounted() {
            eventHub.$on(events.MEDIA_DIRECTORY_OPENED, name => {
                this.breadcrumbs.push(name);
                this.fireLocationChangedEvent();
            });

            eventHub.$on(events.MEDIA_LOCATION_CLEARED, () => {
                this.breadcrumbs.clear();
            });
        },

        methods: {
            // Navigation
            goHome() {
                this.breadcrumbs.clear();
                this.fireLocationChangedEvent();
            },

            goBack(index) {
                this.breadcrumbs.goBack(index);
                this.fireLocationChangedEvent();
            },

            // Check Methods
            isRoot() {
                return this.breadcrumbs.isRoot();
            },

            // Other Methods
            fireLocationChangedEvent() {
                eventHub.$emit(events.MEDIA_LOCATION_CHANGED,
                    this.breadcrumbs.location(),
                    this.breadcrumbs.uri()
                );
            }
        }
    }
</script>

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
