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
                        <input @change="prepare" type="file" name="media" id="media">
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
                medias: null
            }
        },
        mounted() {
            eventHub.$on('open-upload-media-modal', function(data) {
                $('div#uploadMediaModal').modal('show');
            })
        },
        methods: {
            prepare(e) {
                let medias  = e.target.files || e.dataTransfer.files;
                this.medias = new FormData;

                // for single file
                this.medias.append('media', medias[0]);
                // Or for multiple files you can also do
                //  _.each(files, function(v, k){
                //    data.append('avatars['+k+']', v);
                // });
            },
            upload() {
                this.$http
                    .post(config.endpoint + '/upload', {
                        medias: this.medias
                    })
                    .then((response) => {
                        this.$parent.refreshDirectory();

                        $('div#uploadMediaModal').modal('hide');

                        this.medias = null;
                    });
            }
        }
    }
</script>
