<script>
    import config from './../../Config';
    import events from './../../Events';
    import Dropzone from 'dropzone';

    Dropzone.autoDiscover = false;

    export default {
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

            eventHub.$on(events.MEDIA_MODAL_UPLOAD_OPEN, data => {
                that.modal     = $('div#uploadMediaModal');
                that.submitBtn = that.modal.find('button[type="submit"]');

                if (that.dropzone == undefined) {
                    that.initDropzone();
                }

                that.modal.modal('show');

                that.modal.on('hidden.bs.modal', e => {
                    that.dropzone.removeAllFiles();
                });
            })
        },

        methods: {
            initDropzone() {
                let that = this;

                this.dropzone = new Dropzone('div#dropzoneArea', {
                    url: config.endpoint+'/upload',
                    autoProcessQueue: false,
                    uploadMultiple: true,
                    parallelUploads: 100,
                    maxFiles: 100,
                    paramName: 'medias',
                    headers: {
                        'X-CSRF-TOKEN': App.csrfToken
                    },
                    sendingmultiple(file, xhr, formData) {
                        formData.append('location', that.location);
                    },
                    successmultiple(files, response) {
                        if (response.status == 'success') {
                            eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);

                            that.modal.modal('hide');
                            that.submitBtn.button('reset');
                        }
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
        }
    }
</script>

<template>
    <div id="uploadMediaModal" class="modal fade">
        <div class="modal-dialog modal-lg">
            <form @submit.prevent="upload">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Upload</h4>
                    </div>
                    <div class="modal-body">
                        <div id="dropzoneArea" class="dropzone"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary" data-loading-text="Loading&hellip;">
                            <i class="fa fa-fw fa-cloud-upload"></i> Upload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
