<template>
    <div id="uploadMediaModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="upload()">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Upload</h4>
                    </div>
                    <div class="modal-body">
                        <input @change="prepare" type="file" multiple>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary">
                            <i class="fa fa-fw fa-cloud-upload"></i> Upload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    const config = require('./../Config').default;

    import eventHub from './../../../../shared/EventHub'

    export default {
        props: ['location'],
        data () {
            return {
                formData: null
            }
        },
        mounted() {
            eventHub.$on('open-upload-media-modal', function(data) {
                $('div#uploadMediaModal').modal('show');
            })
        },
        methods: {
            prepare(e) {
                let medias = e.target.files || e.dataTransfer.files;
                this.formData = new FormData;

                this.formData.append('location', this.location);

                _.forEach(medias, (media, index) => {
                    this.formData.append('medias['+index+']', media);
                });
            },
            upload() {
                this.$http
                    .post(config.endpoint + '/upload', this.formData)
                    .then((response) => {
                        if (response.data.status == 'success') {
                            this.$parent.refreshDirectory();

                            $('div#uploadMediaModal').modal('hide');

                            this.$parent.mediaModalClosed();

                            this.formData = null;
                        }
                    });
            }
        }
    }
</script>
