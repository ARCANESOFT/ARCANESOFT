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

                        <ul class="list-unstyled">
                            <li v-for="error in errors">
                                <span class="label label-danger">{{ errors.length }} {{ displayFirstError(error) }}</span>
                            </li>
                        </ul>
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
    import config from './../Config'
    import eventHub from './../../../../shared/EventHub'

    export default {
        props: ['location'],

        data () {
            return {
                newDirectory: '',
                errors: {}
            }
        },

        created() {
            let that = this;

            eventHub.$on('open-new-folder-modal', data => {
                let modal = $('div#newFolderModal');

                modal.modal('show');

                modal.on('shown.bs.modal', () => {
                    $(this).find('[autofocus]').focus();
                });

                modal.on('hidden.bs.modal', () => {
                    that.resetErrors();
                })
            });
        },

        methods: {
            createFolder(e) {
                this.resetErrors();

                let $submitBtn = $(e.target.querySelector('button[type="submit"]'));
                    $submitBtn.button('loading');

                axios.post(config.endpoint + '/create', {
                        name: this.newDirectory,
                        location: this.location
                    })
                    .then(response => {
                        this.$parent.refreshDirectory();

                        $('div#newFolderModal').modal('hide');

                        this.$parent.mediaModalClosed();

                        this.newDirectory = '';
                    })
                    .catch(error => {
                        $submitBtn.button('reset');

                        this.errors = error.response.data.errors;
                    });
            },

            displayFirstError(error) {
                return _.first(error)
            },

            resetErrors() {
                this.errors = {};
            }
        }
    }
</script>
