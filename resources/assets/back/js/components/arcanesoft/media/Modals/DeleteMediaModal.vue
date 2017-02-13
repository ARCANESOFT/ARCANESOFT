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
    import config from './../Config';
    import events from './../Events';

    export default {
        props: ['media'],

        data() {
            return {
                modal: null,
                submitBtn: null
            }
        },

        components: {
            'media-errors': require('./../Helpers/Errors.vue')
        },

        created() {
            let me = this;

            eventHub.$on(events.OPEN_DELETE_MEDIA_MODAL, data => {
                me.modal = $('div#deleteFolderModal');

                me.submitBtn = me.modal.find('button[type="submit"]');

                me.modal.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            });
        },

        methods: {
            deleteFolder(e) {
                this.submitBtn.button('loading');

                axios.post(config.endpoint+'/delete', {
                        media: this.media
                    })
                    .then(response => {
                        eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);

                        this.modal.modal('hide');

                        this.newDirectory = '';

                        this.submitBtn.button('reset');
                    })
                    .catch(error => {
                        this.submitBtn.button('reset');

                        this.errors = error.response.data.errors;
                    });
            }
        }
    }
</script>
