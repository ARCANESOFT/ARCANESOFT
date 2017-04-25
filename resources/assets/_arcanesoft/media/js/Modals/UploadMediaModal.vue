<script>
    import config from './../config';
    import events from './../events';
    import Dropzone from 'dropzone';
    import FormErrors from 'laravel-form-errors';
    import { translator } from './../mixins';

    Dropzone.autoDiscover = false;

    export default {
        name: 'upload-media-modal',

        mixins: [translator],

        props: ['location'],

        data () {
            return {
                formData: null,
                dropzone: null,
                modal: null,
                submitBtn: null
            }
        },

        mounted() {
            let that = this;

            window.eventHub.$on(events.MEDIA_MODAL_UPLOAD_OPEN, (data) => {
                that.modal     = $('div#upload-media-modal');
                that.submitBtn = that.modal.find('button[type="submit"]');

                if ( ! that.dropzone)
                    that.initDropzone();

                that.modal.modal('show');

                that.modal.on('hidden.bs.modal', (e) => {
                    if (that.dropzone) {
                        that.dropzone.removeAllFiles();
                    }
                });
            });
        },

        methods: {
            initDropzone() {
                let that = this;

                this.dropzone = new Dropzone('div#dropzone-area', {
                    url: config.endpoint+'/upload',
                    autoProcessQueue: false,
                    uploadMultiple: true,
                    parallelUploads: 100,
                    maxFiles: 100,
                    paramName: 'medias',
                    headers: {
                        'X-CSRF-TOKEN': App.csrfToken
                    },
                    dictDefaultMessage: this.lang.get('dropzone.default_message'),
                    sendingmultiple(file, xhr, formData) {
                        formData.append('location', that.location);
                    },
                    successmultiple(files, response) {
                        if (response.status === 'success') {
                            window.eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);

                            that.modal.modal('hide');
                        }

                        that.submitBtn.button('reset');
                    },
                    errormultiple(files, response) {
                        window.console.debug(files, response);
                    }
                });
            },

            upload(e) {
                e.preventDefault();
                e.stopPropagation();

                this.submitBtn.button('loading');
                this.dropzone.processQueue();
            }
        },

        computed: {
            hasSelectedFiles() {
                return this.dropzone && this.dropzone.files.length > 0;
            }
        }
    }
</script>

<template>
    <div id="upload-media-modal" class="modal fade">
        <div class="modal-dialog modal-lg">
            <form @submit.prevent="upload">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">{{ lang.get('modals.upload.title') }}</h4>
                    </div>
                    <div class="modal-body">
                        <div id="dropzone-area" class="dropzone dropzone-area"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            {{ lang.get('actions.cancel') }}
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary"
                                :data-loading-text="lang.get('messages.loading')" :disabled=" ! hasSelectedFiles">
                            <i class="fa fa-fw fa-cloud-upload"></i> {{ lang.get('actions.upload') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
