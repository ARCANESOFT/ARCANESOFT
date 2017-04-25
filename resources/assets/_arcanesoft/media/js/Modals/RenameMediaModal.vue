<script>
    import config from './../config';
    import events from './../events';
    import { translator } from './../mixins';

    export default {
        name: 'rename-media-modal',

        mixins: [translator],

        props: ['location', 'media'],

        data () {
            return {
                newName: ''
            };
        },

        created() {
            window.eventHub.$on(events.MEDIA_MODAL_RENAME_OPEN, (data) => {
                this.modal = $('div#rename-folder-modal');
                this.newName = this.getMediaName();
                this.modal.modal('show');
            })
        },

        mounted() {
            this.newName = this.getMediaName();
        },

        methods: {
            getMediaName() {
                return this.media !== null ? this.media.name : '';
            },

            renameFolder() {
                if ( ! this.isDirty) return false;

                let submitBtn = this.modal.find('button[type="submit"]');
                    submitBtn.button('loading');

                let formData = {
                    location: this.location,
                    media:    this.media,
                    newName:  this.newName
                };

                window.axios.post(`${config.endpoint}/rename`, formData)
                    .then((response) => {
                        if (response.data.status === 'success') {
                            this.modal.modal('hide');
                            window.eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        submitBtn.button('reset');
                    });
            }
        },

        computed: {
            isDirty() {
                return this.media !== null && this.media.name !== this.newName;
            },

            isEmpty() {
                return this.newName.trim().length === 0;
            }
        }
    }
</script>

<template>
    <div id="rename-folder-modal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="renameFolder">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">{{ lang.get('modals.rename.title') }}</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="newName" class="form-control" :placeholder="lang.get('placeholders.folder_name')">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            {{ lang.get('actions.cancel') }}
                        </button>
                        <transition name="fade">
                            <button type="submit" class="btn btn-sm btn-warning"
                                    :data-loading-text="lang.get('messages.loading')" :disabled="isEmpty"
                                    v-if="isDirty">
                                <i class="fa fa-fw fa-pencil"></i> {{ lang.get('actions.rename') }}
                            </button>
                        </transition>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
