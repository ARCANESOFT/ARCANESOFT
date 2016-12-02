<template>
    <div id="newFolderModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="createFolder()">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Add new folder</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="Folder name" v-model="newDirectory" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary">
                            <i class="fa fa-fw fa-plus"></i> Add
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
                newDirectory: ''
            }
        },
        mounted() {
            eventHub.$on('open-new-folder-modal', function(data) {
                $('div#newFolderModal').modal('show');
            })
        },
        methods: {
            createFolder() {
                this.$http
                    .post(config.endpoint + '/create', {
                        name: this.newDirectory,
                        location: this.location
                    })
                    .then((response) => {
                        this.$parent.refreshDirectory();

                        $('div#newFolderModal').modal('hide');

                        this.$parent.mediaModalClosed();

                        this.newDirectory = '';
                    });
            }
        }
    }
</script>
