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
            eventHub.$on(events.OPEN_DELETE_MEDIA_MODAL, data => {
                this.modal     = $('div#deleteFolderModal');
                this.submitBtn = this.modal.find('button[type="submit"]');

                this.modal.modal({backdrop: 'static', keyboard: false});
            });
        },

        mounted() {
            //
        },

        methods: {
            deleteFolder(e) {
                this.disableSubmitButton();

                axios.post(config.endpoint+'/delete', {media: this.media})
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
                         this.errors = error.response.data.errors;
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
