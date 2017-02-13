<template>
    <div id="newFolderModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="createFolder">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Add new folder</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="Folder name" v-model="newDirectory" class="form-control" autofocus>

                        <media-errors :errors="errors"></media-errors>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary" data-loading-text="Loading&hellip;">
                            <i class="fa fa-fw fa-plus"></i> Add
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
        props: ['location'],

        data () {
            return {
                newDirectory: '',
                modal: null,
                submitBtn: null,
                errors: []
            }
        },

        components: {
            'media-errors': require('./../Helpers/Errors.vue')
        },

        created() {
            eventHub.$on(events.OPEN_NEW_FOLDER_MODAL, data => {
                this.modal     = $('div#newFolderModal');
                this.submitBtn = this.modal.find('button[type="submit"]');

                this.modal.modal('show');

                this.modal.on('shown.bs.modal', () => {
                    this.modal.find('[autofocus]').focus();
                });

                this.modal.on('hidden.bs.modal', () => {
                    this.resetErrors();
                })
            });
        },

        methods: {
            createFolder(e) {
                this.disableSubmitBtn();
                this.resetErrors();

                axios.post(config.endpoint+'/create', {
                        name: this.newDirectory,
                        location: this.location
                    })
                    .then(response => {
                        this.modal.modal('hide');
                        this.newDirectory = '';
                        this.resetSubmitBtn();

                        eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);
                    })
                    .catch(error => {
                        this.resetSubmitBtn();

                        this.errors = error.response.data.errors;
                    });
            },

            resetErrors() {
                this.errors = [];
            },

            disableSubmitBtn() {
                this.submitBtn.button('loading');
            },

            resetSubmitBtn() {
                this.submitBtn.button('reset');
            }
        }
    }
</script>
