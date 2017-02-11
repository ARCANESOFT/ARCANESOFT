<template>
    <div id="renameFolderModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="renameFolder">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Rename media</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="Folder name" v-model="newName" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-sm btn-warning" v-if="isDirty">
                            <i class="fa fa-fw fa-pencil"></i> Rename
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
        props: ['location', 'media'],

        data () {
            return { newName: ''};
        },

        created() {
            this.newName = this.media !== null ? this.media.name : '';

            eventHub.$on('open-rename-media-modal', data => {
                $('div#renameFolderModal').modal('show');
            })
        },

        methods: {
            renameFolder() {
                if (this.isDirty) {
                    axios.post(config.endpoint + '/rename', {
                            location: this.location,
                            media:    this.media,
                            newName:  this.newName
                        })
                        .then(response => {
                            this.$parent.refreshDirectory();

                            $('div#renameFolderModal').modal('hide');

                            this.$parent.mediaModalClosed();
                        });
                }
            }
        },

        computed: {
            isDirty() {
                return this.media != null && this.media.name != this.newName;
            }
        }
    }
</script>
