<script>
    import config from './../config';
    import events from './../events';
    import { translator } from './../mixins';

    export default {
        name: 'move-media-modal',

        mixins: [translator],

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
            window.eventHub.$on(events.MEDIA_MODAL_MOVE_OPEN, data => {
                this.modal     = $('div#move-media-modal');
                this.submitBtn = this.modal.find('button[type="submit"]');

                this.modal.modal({
                    backdrop: 'static',
                    keyboard: false
                });

                this.getDestinations();
            });
        },

        computed: {
            hasMovements() {
                return this.destinations.length > 0;
            },

            isRootFolder() {
                return this.selected === '..';
            },

            hasSelected() {
                return this.selected !== null;
            },

            newLocation() {
                let folder = this.isRootFolder
                    ? this.location.split('/').slice(0, -1).join('/')
                    : this.selected;

                return `${folder}/${this.media.name}`;
            }
        },

        methods: {
            moveMedia() {
                this.disableSubmitButton();

                let formData = {
                    'old-path': this.media.path,
                    'new-path': this.newLocation
                };

                window.axios.put(`${config.endpoint}/move`, formData)
                     .then(response => {
                         if (response.data.status === 'success') {
                            this.modal.modal('hide');
                            this.resetSubmitButton();
                            window.eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);
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

                let formData = {
                    params: {
                        location: this.location,
                        name: this.media.name
                    }
                };

                window.axios.get(`${config.endpoint}/move-locations`, formData)
                     .then((response) => {
                            if (response.data.status === 'success') {
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
    <div id="move-media-modal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="moveMedia">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">{{ lang.get('modals.move.title') }}</h4>
                    </div>
                    <div class="modal-body" v-if=" ! loading">
                        <select class="form-control" v-model="selected" v-if="hasMovements">
                            <option v-for="destination in destinations">{{ destination }}</option>
                        </select>
                        <span class="label label-default" v-else>{{ lang.get('messages.can_move_item') }}</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            {{ lang.get('actions.cancel') }}
                        </button>
                        <transition name="fade">
                            <button type="submit" class="btn btn-sm btn-info"
                                    :data-loading-text="lang.get('messages.loading')"
                                    v-if="hasMovements && hasSelected">
                                <i class="fa fa-fw fa-arrow-circle-right"></i> {{ lang.get('actions.move') }}
                            </button>
                        </transition>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
