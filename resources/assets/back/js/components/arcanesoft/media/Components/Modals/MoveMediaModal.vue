<script>
    import config from './../../Config';
    import events from './../../Events';

    export default {
        props: ['media', 'location'],

        data() {
            return {
                loading: false,
                destinations: [],
                selected: null,
                modal: null,
                submitBtn: null
            }
        },

        created() {
            eventHub.$on(events.MEDIA_MODAL_MOVE_OPEN, data => {
                this.modal     = $('div#moveMediaModal');
                this.submitBtn = this.modal.find('button[type="submit"]');

                this.modal.modal({
                    backdrop: 'static',
                    keyboard: false
                });

                this.getDestinations();
            });
        },

        mounted() {
            //
        },

        computed: {
            hasMovements() {
                return this.destinations.length > 0;
            },

            isParentFolder() {
                return this.selected == '..';
            },

            newLocation() {
                let folder = this.isParentFolder
                    ? this.location.split('/').slice(0, -1).join('/')
                    : this.selected;

                return folder + '/' + this.media.name;
            }
        },

        methods: {
            moveMedia() {
                this.disableSubmitButton();

                axios.put(config.endpoint+'/move', {'old-path': this.media.path, 'new-path': this.newLocation})
                     .then(response => {
                         if (response.data.status == 'success') {
                            this.modal.modal('hide');
                            this.resetSubmitButton();
                            eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);
                        }
                        else {
                            // Throw an error
                        }
                    })
                    .catch(error => {
                        this.resetSubmitButton();
                    });
            },

            getDestinations() {
                this.loading = true;
                this.disableSubmitButton();

                axios.get(config.endpoint+'/move-locations', {
                    params: {
                        location: this.location,
                        name: this.media.name
                    }
                })
                    .then(response => {
                        if (response.data.status == 'success') {
                            this.destinations = response.data.data;
                            this.loading = false;
                            this.resetSubmitButton();
                        }
                        else {
                            // Throw an error
                        }
                    })
                    .catch(error => {
                        this.resetSubmitButton();
                    });
            },

            disableSubmitButton() {
                this.submitBtn.button('loading');
            },

            resetSubmitButton() {
                this.submitBtn.button('reset');
            }
        }
    }
</script>

<template>
    <div id="moveMediaModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="moveMedia">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Move</h4>
                    </div>
                    <div class="modal-body" v-if=" ! loading">
                        <select class="form-control" v-model="selected" v-if="hasMovements">
                            <option v-for="destination in destinations">{{ destination }}</option>
                        </select>
                        <span class="label label-default" v-else>You can not move this item !</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-info" data-loading-text="Loading&hellip;" v-if="hasMovements">
                            <i class="fa fa-fw fa-arrow-circle-right"></i> Move
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
