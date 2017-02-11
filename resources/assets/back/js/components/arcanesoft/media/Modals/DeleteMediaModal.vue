<template>
    <div id="deleteFolderModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="deleteFolder">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Delete</h4>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to <span class="label label-danger">delete</span> this {{ media.type }}: <code>{{ media.path }}</code> ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-danger" data-loading-text="Loading&hellip;">
                            <i class="fa fa-fw fa-trash-o"></i> Delete
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import config from './../Config'
    import eventHub from './../../../../shared/EventHub'

    export default {
        props: ['media'],

        created() {
            let that = this;

            eventHub.$on('open-delete-media-modal', data => {
                let modal = $('div#deleteFolderModal');

                modal.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            })
        },

        methods: {
            deleteFolder(e) {
                let $submitBtn = $(e.target.querySelector('button[type="submit"]'));
                    $submitBtn.button('loading');

                axios.post(config.endpoint + '/delete', {
                        media: this.media
                    })
                    .then(response => {
                        this.$parent.refreshDirectory();

                        $('div#deleteFolderModal').modal('hide');

                        this.$parent.mediaModalClosed();

                        this.newDirectory = '';

                        $submitBtn.button('reset');
                    });
            }
        }
    }
</script>
