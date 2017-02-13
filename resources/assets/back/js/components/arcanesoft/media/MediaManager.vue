<template>
    <div>
        <div id="media-manager" class="media-manager" :class="{'full-screen': fullScreen}">
            <div class="media-toolbar">
                <div class="media-toolbar-buttons btn-toolbar" role="toolbar">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-success" @click="openUploadMediaModal">
                            <i class="fa fa-fw fa-cloud-upload"></i> Upload
                        </button>
                        <button type="button" class="btn btn-primary" @click="openNewFolderModal">
                            <i class="fa fa-fw fa-folder"></i> Add Folder
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
                                <i class="fa fa-fw fa-arrow-circle-right"></i> Move
                            </button>
                            <button type="button" class="btn btn-warning" @click="openRenameMediaModal">
                                <i class="fa fa-fw fa-pencil"></i> Rename
                            </button>
                            <button type="button" class="btn btn-danger" @click="openDeleteMediaModal">
                                <i class="fa fa-fw fa-trash-o"></i> Delete
                            </button>
                        </div>
                    </transition>
                    <div class="btn-group pull-right" role="group">
                        <button type="button" class="btn btn-default" @click="toggleFullScreen">
                            <i class="fa fa-fw" :class="[fullScreen ? 'fa-compress' : 'fa-expand']"></i>
                        </button>
                    </div>
                </div>
                <ol class="media-toolbar-breadcrumbs breadcrumb">
                    <li>
                        <a @click="getHomeDirectory()">
                            <i class="fa fa-fw fa-home"></i>
                        </a>
                    </li>
                    <li v-for="(breadcrumb, index) in breadcrumbs">
                        <a @click="goBack(index)">{{ breadcrumb }}</a>
                    </li>
                </ol>
            </div>
            <div class="media-container">
                <div class="media-items-container">
                    <a
                        v-for="media in medias"
                        class="media-item"
                        :class="{'selected': isSelected(media), 'media-file': isMediaFile(media), 'media-directory': isMediaDirectory(media)}"
                        @click="selectMedia(media)"
                        @dblclick="openMedia(media)"
                    >
                        <div class="media-icon">
                            <i class="fa fa-fw fa-folder-o" v-if="isMediaDirectory(media)"></i>

                            <div v-if="isMediaImage(media)"
                                 :style="'background-image: url(' + media.url + ');'"
                                 class="media-image"
                            ></div>

                            <i v-if="isMediaNotImage(media)" :class="getMediaFileIcon(media)" class="fa fa-fw"></i>
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

    export default {
        data () {
            return {
                breadcrumbs: [],
                medias: [],
                loading: true,
                newDirectory: '',
                selected: null,
                modalOpened: false,
                showDetails: false,
                fullScreen: false
            }
        },

        components: {
            'create-folder-modal': require('./Modals/CreateFolderModal.vue'),
            'upload-media-modal':  require('./Modals/UploadMediaModal.vue'),
            'rename-media-modal':  require('./Modals/RenameMediaModal.vue'),
            'delete-media-modal':  require('./Modals/DeleteMediaModal.vue'),
            'media-item-details':  require('./Components/MediaItemDetails.vue')
        },

        created() {
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

                    case 8: // backspace
                        if (me.breadcrumbs.length) {
                            me.breadcrumbs = _.dropRight(me.breadcrumbs, 1);
                        }
                        break;

//                    case 27: // escape
//                        me.resetSelected();
//                        break;

                    default:
                        // no break
                }
            }, false);

            eventHub.$on(events.MEDIA_MODAL_CLOSED, (refresh) => {
                if (refresh) me.refreshDirectory();

                me.closeModal();
            });

            eventHub.$on('item-details-closed', () => {
                me.closeMediaDetails();
            });
        },

        mounted() {
            this.getHomeDirectory();
        },

        watch: {
            // whenever question changes, this function will run
            breadcrumbs(newBreadcrumbs) {
                this.getDirectories(newBreadcrumbs.join('/'));
            }
        },

        computed: {
            currentUri() {
                return this.breadcrumbs.length == 0 ? '/' : this.breadcrumbs.join('/')
            },

            selectedUri() {
                if (this.selected == null)
                    return this.currentUri;

                return this.currentUri + this.selected.name;
            },

            mediasCount() {
                return this.medias.length;
            }
        },

        methods: {
            getHomeDirectory() {
                this.breadcrumbs = [];
                this.resetSelected();
                this.closeMediaDetails();

                axios.get(config.endpoint+'/all').then((response) => {
                    this.medias = response.data.data;
                    this.loading = false;
                });
            },

            goBack(index) {
                let back = this.breadcrumbs.length - (index + 1);

                if (back > 0) {
                    this.breadcrumbs = _.dropRight(this.breadcrumbs, back);
                }
            },

            isMediaDirectory(media) {
                return media.type == 'directory';
            },

            isMediaFile(media) {
                return media.type == 'file';
            },

            isMediaImage(media) {
                if ( ! this.isMediaFile(media)) return false;

                return _.indexOf(config.supportedImages, media.mimetype) >= 0;
            },

            isMediaNotImage(media) {
                return ! (this.isMediaDirectory(media) || this.isMediaImage(media));
            },

            getMediaFileIcon(media) {
                return _.has(config.icons, media.mimetype)
                    ? config.icons[media.mimetype]
                    : config['default-icon'];
            },

            openMedia(media) {
                if (this.isMediaDirectory(media)) {
                    this.breadcrumbs.push(media.name);
                }
                else if (this.isMediaFile(media)) {
                    this.openMediaDetails(media);
                }
            },

            openMediaDetails(media) {
                this.showDetails = true;
            },

            closeMediaDetails() {
                this.showDetails = false;
            },

            refreshDirectory() {
                this.getDirectories(this.currentUri);
            },

            getDirectories(location) {
                this.resetSelected();
                this.closeMediaDetails();
                this.loading = true;

                axios.get(config.endpoint+'/all?location='+location).then(response => {
                    this.medias  = response.data.data;
                    this.loading = false;
                });
            },

            // SELECTION
            hasSelectedMedia() {
                return this.selected != null;
            },

            selectMedia(media) {
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
                    let index = _.indexOf(this.medias, this.selected) + 1;

                    if (index >= this.mediasCount) index = 0;

                    this.selected = this.medias[index];
                }
                else if (this.mediasCount > 0) {
                    this.selected = _.first(this.medias);
                }
            },

            selectPreviousMedia() {
                if (this.hasSelectedMedia()) {
                    let index = _.indexOf(this.medias, this.selected) - 1;

                    if (index < 0) index = this.mediasCount - 1;

                    this.selected = this.medias[index];
                }
                else if (this.mediasCount > 0) {
                    this.selected = _.last(this.medias);
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
