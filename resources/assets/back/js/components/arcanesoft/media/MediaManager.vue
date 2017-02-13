<template>
    <div>
        <div id="media-manager" class="media-manager" :class="{'full-screen': fullScreen, 'item-details-opened': showDetails}">
            <div class="media-toolbar">
                <div class="media-toolbar-buttons btn-toolbar" role="toolbar">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-success" @click="openUploadMediaModal">
                            <i class="fa fa-fw fa-cloud-upload"></i> <span class="hidden-xs">Upload</span>
                        </button>
                        <button type="button" class="btn btn-primary" @click="openNewFolderModal">
                            <i class="fa fa-fw fa-folder"></i> <span class="hidden-xs">Add Folder</span>
                        </button>
                    </div>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" @click="getHomeDirectory">
                            <i class="fa fa-fw fa-home"></i>
                        </button>
                        <button type="button" class="btn btn-default" @click="refreshDirectory">
                            <i class="fa fa-fw fa-refresh"></i>
                        </button>
                    </div>
                    <transition name="fade">
                        <div class="btn-group" role="group" v-if="selected != null">
                            <button type="button" class="btn btn-info">
                                <i class="fa fa-fw fa-arrow-circle-right"></i> <span class="hidden-xs">Move</span>
                            </button>
                            <button type="button" class="btn btn-warning" @click="openRenameMediaModal">
                                <i class="fa fa-fw fa-pencil"></i> <span class="hidden-xs">Rename</span>
                            </button>
                            <button type="button" class="btn btn-danger" @click="openDeleteMediaModal">
                                <i class="fa fa-fw fa-trash-o"></i> <span class="hidden-xs">Delete</span>
                            </button>
                        </div>
                    </transition>
                    <div class="btn-group pull-right" role="group">
                        <button type="button" class="btn btn-default" @click="toggleFullScreen">
                            <i class="fa fa-fw" :class="[fullScreen ? 'fa-compress' : 'fa-expand']"></i>
                        </button>
                    </div>
                </div>
                <media-breadcrumbs></media-breadcrumbs>
            </div>
            <div class="media-container">
                <div class="media-items-container">
                    <a
                        v-for="media in medias.all()"
                        class="media-item"
                        :class="{'selected': isSelected(media), 'media-file': media.isFile, 'media-directory': media.isDirectory()}"
                        @click="selectMedia(media)"
                        @dblclick="openMedia(media)"
                    >
                        <div class="media-icon">
                            <i v-if="media.isDirectory()" class="fa fa-fw fa-folder-o"></i>
                            <div v-if="media.isImage()"
                                 :style="'background-image: url('+media.url+');'"
                                 class="media-image"
                            ></div>
                            <i v-if="media.isNotImage()" :class="media.icon()" class="fa fa-fw"></i>
                        </div>
                        <div class="media-details">
                            <h4 class="media-name">{{ media.name }}</h4>
                        </div>
                    </a>
                </div>
                <media-item-details :media="selected" v-if="showDetails"></media-item-details>
            </div>
            <transition name="fade">
                <div class="media-loader" v-show="loading">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    <p>LOADING...</p>
                </div>
            </transition>
        </div>

        <create-folder-modal :location="currentUri"></create-folder-modal>
        <upload-media-modal :location="currentUri"></upload-media-modal>
        <rename-media-modal :location="currentUri" :media="selected" v-if="selected"></rename-media-modal>
        <delete-media-modal :media="selected" v-if="selected"></delete-media-modal>
    </div>
</template>

<script>
    import config from './Config';
    import events from './Events';
    import MediaCollection from './Entities/MediaCollection';

    export default {
        data () {
            return {
                currentUri: '/',
                medias: new MediaCollection(),
                loading: false,
                newDirectory: '',
                selected: null,
                modalOpened: false,
                showDetails: false,
                fullScreen: false
            }
        },

        components: {
            'media-breadcrumbs':   require('./Components/MediaBreadcrumbs.vue'),
            'media-item-details':  require('./Components/MediaItemDetails.vue'),

            'create-folder-modal': require('./Modals/CreateFolderModal.vue'),
            'upload-media-modal':  require('./Modals/UploadMediaModal.vue'),
            'rename-media-modal':  require('./Modals/RenameMediaModal.vue'),
            'delete-media-modal':  require('./Modals/DeleteMediaModal.vue')
        },

        created() {
            this.listenToKeyboard();

            eventHub.$on(events.MEDIA_MODAL_CLOSED, (refresh) => {
                if (refresh)
                    this.refreshDirectory();

                this.closeModal();
            });

            eventHub.$on(events.ITEM_DETAILS_CLOSED, () => {
                this.closeMediaDetails();
            });

            eventHub.$on('breadcrumbs_go_home', () => {
                this.getHomeDirectory();
            });

            eventHub.$on('breadcrumbs_changed_location', (location, uri) => {
                this.currentUri = uri;
                (location == '') ? this.getHomeDirectory() : this.getDirectories(location);
            });
        },

        mounted() {
            this.getHomeDirectory();
        },

        computed: {
            selectedUri() {
                return this.currentUri + (this.selected == null ? '' : this.selected.name);
            },

            mediasCount() {
                return this.medias.count();
            }
        },

        methods: {
            getHomeDirectory() {
                this.loading = true;
                this.resetBreadcrumbs();
                this.resetSelected();
                this.closeMediaDetails();

                axios.get(config.endpoint+'/all').then((response) => {
                    this.medias.load(response.data.data);
                    this.loading = false;
                });
            },

            getDirectories(location) {
                this.loading = true;
                this.resetSelected();
                this.closeMediaDetails();

                axios.get(config.endpoint+'/all?location='+location).then(response => {
                    this.medias.load(response.data.data);
                    this.loading = false;
                });
            },

            resetBreadcrumbs() {
                eventHub.$emit('media_location_cleared', {});
            },

            /**
             * Open Media.
             *
             * @param  {Media}  media
             */
            openMedia(media) {
                if (media.isDirectory()) {
                    eventHub.$emit('media_directory_opened', media.name);
                }
                else if (media.isFile()) {
                    this.openMediaDetails(media);
                }
            },

            /**
             * Open media details (only files).
             *
             * @param  {Media}  media
             */
            openMediaDetails(media) {
                this.showDetails = true;
            },

            closeMediaDetails() {
                this.showDetails = false;
            },

            refreshDirectory() {
                this.getDirectories(this.currentUri);
            },

            // SELECTION
            hasSelectedMedia() {
                return this.selected != null;
            },

            selectMedia(media) {
                if (media.isDirectory())
                    this.closeMediaDetails();

                this.selected = media;
            },

            isSelected(media) {
                return media == this.selected;
            },

            resetSelected() {
                this.selected = null;
            },

            selectNextMedia() {
                if (this.hasSelectedMedia()) {
                    let index = this.medias.getIndex(this.selected) + 1;

                    if (index >= this.mediasCount) index = 0;

                    this.selected = this.medias.get(index);
                }
                else if (this.mediasCount > 0) {
                    this.selected = this.medias.first();
                }
            },

            selectPreviousMedia() {
                if (this.hasSelectedMedia()) {
                    let index = this.medias.getIndex(this.selected) - 1;

                    if (index < 0)
                        index = this.mediasCount - 1;

                    this.selected = this.medias.get(index);
                }
                else if (this.mediasCount > 0) {
                    this.selected = this.medias.last();
                }
            },

            // MODALS
            openUploadMediaModal() {
                eventHub.$emit(events.OPEN_UPLOAD_MEDIA_MODAL, {});
                this.openModal();
            },

            openNewFolderModal() {
                eventHub.$emit(events.OPEN_NEW_FOLDER_MODAL, {});
                this.openModal();
            },

            openRenameMediaModal() {
                eventHub.$emit(events.OPEN_RENAME_MEDIA_MODAL, {});
                this.openModal();
            },

            openDeleteMediaModal() {
                eventHub.$emit(events.OPEN_DELETE_MEDIA_MODAL, {});
                this.openModal();
            },

            openModal() {
                this.modalOpened = true;
            },

            closeModal() {
                this.modalOpened = false;
            },

            // FullScreen
            toggleFullScreen() {
                this.fullScreen = ! this.fullScreen;
            },

            listenToKeyboard() {
                let me = this;

                window.addEventListener('keyup', e => {
                    if (me.modalOpened) return;

                    switch (e.keyCode) {
                        case 39: // right
                            me.selectNextMedia();
                            break;

                        case 37: // left
                            me.selectPreviousMedia();
                            break;

                        case 13: // enter
                            if (me.hasSelectedMedia()) {
                                me.openMedia(me.selected);
                            }
                            break;

                        case 46: // delete
                            if (me.hasSelectedMedia()) {
                                me.openDeleteMediaModal()
                            }
                            break;

//                        case 8: // backspace
//                            if (me.breadcrumbs.length) {
//                                me.breadcrumbs = _.dropRight(me.breadcrumbs, 1);
//                            }
//                            break;

//                    case 27: // escape
//                        me.resetSelected();
//                        break;

                        default:
                        // no break
                    }
                }, false);
            }
        },

        filters: {
            humanFileSize(size) {
                let i = Math.floor(Math.log(size) / Math.log(1024));

                return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
            }
        }
    }
</script>
