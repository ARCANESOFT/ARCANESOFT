<script>
    import config from './config';
    import events from './events';
    import MediaCollection from './Entities/MediaCollection';
    import {translator} from './mixins';

    export default {
        name: 'media-manager',

        mixins: [translator],

        props: {
            locale: {
                type: String,
                'default': 'fr'
            },
            readonly: {
                type: Boolean,
                'default': false
            }
        },

        data () {
            return {
                currentUri: '/',
                medias: new MediaCollection,
                loading: false,
                newDirectory: '',
                selected: null,
                modalOpened: false,
                showDetails: false,
                fullScreen: false
            }
        },

        components: {
            'media-breadcrumbs': require('./Components/MediaBreadcrumbs.vue'),
            'media-item-details': require('./Components/MediaItemDetails.vue'),

            'create-folder-modal': require('./Modals/CreateFolderModal.vue'),
            'upload-media-modal': require('./Modals/UploadMediaModal.vue'),
            'move-media-modal': require('./Modals/MoveMediaModal.vue'),
            'rename-media-modal': require('./Modals/RenameMediaModal.vue'),
            'delete-media-modal': require('./Modals/DeleteMediaModal.vue')
        },

        created() {
            this.listenToKeyboard();

            window.eventHub.$on(events.MEDIA_MODAL_CLOSED, (refresh) => {
                if (refresh) this.refreshDirectory();

                this.closeModal();
            });

            window.eventHub.$on(events.ITEM_DETAILS_CLOSED, () => {
                this.closeMediaDetails();
            });

            window.eventHub.$on(events.MEDIA_LOCATION_HOME, () => {
                this.getHomeDirectory();
            });

            window.eventHub.$on(events.MEDIA_LOCATION_CHANGED, (location, uri) => {
                this.currentUri = uri;

                (location === '') ? this.getHomeDirectory() : this.getDirectories(location);
            });
        },

        mounted() {
            this.getHomeDirectory();
        },

        computed: {
            selectedUri() {
                return this.currentUri + (this.selected === null ? '' : this.selected.name);
            },

            mediasCount() {
                return this.medias.count();
            },

            isNotReadonly() {
                return ! this.readonly;
            }
        },

        methods: {
            getHomeDirectory() {
                this.loading = true;
                this.resetBreadcrumbs();
                this.resetSelected();
                this.closeMediaDetails();

                window.axios.get(`${config.endpoint}/all`)
                    .then((response) => {
                        this.medias.load(response.data.data);
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            getDirectories(location) {
                this.loading = true;
                this.resetSelected();
                this.closeMediaDetails();

                window.axios.get(`${config.endpoint}/all`, {params: {location}})
                    .then(response => {
                        this.medias.load(response.data.data);
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            resetBreadcrumbs() {
                window.eventHub.$emit(events.MEDIA_LOCATION_CLEARED);
            },

            /**
             * Open Media.
             *
             * @param  {Media}  media
             */
            openMedia(media) {
                if (media.isDirectory()) {
                    window.eventHub.$emit(events.MEDIA_DIRECTORY_OPENED, media.name);
                }
                else if (media.isFile()) {
                    this.openMediaDetails(media);
                }
            },

            openMediaDetails(media) {
                if (this.isNotReadonly)
                    this.showDetails = true;
            },

            closeMediaDetails() {
                this.showDetails = false;
            },

            refreshDirectory() {
                this.getDirectories(this.currentUri);
            },

            hasSelectedMedia() {
                return this.selected !== null;
            },

            selectMedia(media) {
                if (media.isDirectory()) this.closeMediaDetails();

                this.setSelected(media);
            },

            resetSelected() {
                this.setSelected(null);
            },

            setSelected(selected) {
                this.selected = selected;

                window.eventHub.$emit(events.MEDIA_ITEM_SELECTED, selected);
            },

            isSelected(media) {
                return media === this.selected;
            },

            selectNextMedia() {
                if (this.hasSelectedMedia()) {
                    let index = this.medias.getIndex(this.selected) + 1;

                    if (index >= this.mediasCount)
                        index = 0;

                    this.selectMedia(this.medias.get(index));
                }
                else if (this.mediasCount > 0) {
                    this.selectMedia(this.medias.first());
                }
            },

            selectPreviousMedia() {
                if (this.hasSelectedMedia()) {
                    let index = this.medias.getIndex(this.selected) - 1;

                    if (index < 0)
                        index = this.mediasCount - 1;

                    this.selectMedia(this.medias.get(index));
                }
                else if (this.mediasCount > 0) {
                    this.selectMedia(this.medias.last());
                }
            },

            // MODALS
            openUploadMediaModal() {
                this.openModal(events.MEDIA_MODAL_UPLOAD_OPEN);
            },

            openNewFolderModal() {
                this.openModal(events.MEDIA_MODAL_NEW_FOLDER_OPEN);
            },

            openMoveMediaModal() {
                this.openModal(events.MEDIA_MODAL_MOVE_OPEN);
            },

            openRenameMediaModal() {
                this.openModal(events.MEDIA_MODAL_RENAME_OPEN);
            },

            openDeleteMediaModal() {
                this.openModal(events.MEDIA_MODAL_DELETE_OPEN);
            },

            openModal(modalEvent, data = {}) {
                window.eventHub.$emit(modalEvent, data);
                this.modalOpened = true;
            },

            closeModal() {
                this.modalOpened = false;
            },

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
            },

            isEditable() {
                return this.selected && this.isNotReadonly;
            }
        }
    }
</script>

<template>
    <div>
        <div id="media-manager" class="media-manager" :class="{'full-screen': fullScreen, 'item-details-opened': showDetails}">
            <div class="media-toolbar">
                <div class="media-toolbar-buttons btn-toolbar" role="toolbar">
                    <div class="btn-group" role="group" v-if="isNotReadonly">
                        <button type="button" class="btn btn-success" @click="openUploadMediaModal">
                            <i class="fa fa-fw fa-cloud-upload"></i> <span class="hidden-xs">{{ lang.get('actions.upload') }}</span>
                        </button>
                        <button type="button" class="btn btn-primary" @click="openNewFolderModal">
                            <i class="fa fa-fw fa-folder"></i> <span class="hidden-xs">{{ lang.get('actions.add_folder') }}</span>
                        </button>
                    </div>
                    <div class="btn-group" role="group">
                        <button @click="getHomeDirectory" type="button" class="btn btn-default"
                                data-toggle="tooltip" :data-original-title="lang.get('actions.home')">
                            <i class="fa fa-fw fa-home"></i>
                        </button>
                        <button @click="refreshDirectory" type="button" class="btn btn-default"
                                data-toggle="tooltip" :data-original-title="lang.get('actions.refresh')">
                            <i class="fa fa-fw fa-refresh"></i>
                        </button>
                    </div>
                    <transition name="fade">
                        <div class="btn-group" role="group" v-if="isEditable()">
                            <button type="button" class="btn btn-info" @click="openMoveMediaModal">
                                <i class="fa fa-fw fa-arrow-circle-right"></i> <span class="hidden-xs">{{ lang.get('actions.move') }}</span>
                            </button>
                            <button type="button" class="btn btn-warning" @click="openRenameMediaModal">
                                <i class="fa fa-fw fa-pencil"></i> <span class="hidden-xs">{{ lang.get('actions.rename') }}</span>
                            </button>
                            <button type="button" class="btn btn-danger" @click="openDeleteMediaModal">
                                <i class="fa fa-fw fa-trash-o"></i> <span class="hidden-xs">{{ lang.get('actions.delete') }}</span>
                            </button>
                        </div>
                    </transition>
                    <div class="btn-group pull-right" role="group" v-if="isNotReadonly">
                        <button @click="toggleFullScreen" type="button" class="btn btn-default"
                                data-toggle="tooltip" data-placement="left"
                                :data-original-title="lang.get(fullScreen ? 'actions.minimize' : 'actions.maximize')">
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
                    <p>{{ lang.get('messages.loading') }}</p>
                </div>
            </transition>
        </div>

        <create-folder-modal :location="currentUri" v-if="isNotReadonly"></create-folder-modal>
        <upload-media-modal :location="currentUri" v-if="isNotReadonly"></upload-media-modal>
        <move-media-modal :location="currentUri" :media="selected" v-if="isEditable()"></move-media-modal>
        <rename-media-modal :location="currentUri" :media="selected" v-if="isEditable()"></rename-media-modal>
        <delete-media-modal :media="selected" v-if="isEditable()"></delete-media-modal>
    </div>
</template>
