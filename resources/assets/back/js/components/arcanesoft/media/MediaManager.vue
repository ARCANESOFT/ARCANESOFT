<template>
    <div>
        <div id="media-manager" class="media-manager">
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
                            <button type="button" class="btn btn-warning" @click="openMediaFolderModal">
                                <i class="fa fa-fw fa-pencil"></i> Rename
                            </button>
                            <button type="button" class="btn btn-danger" @click="openDeleteMediaModal">
                                <i class="fa fa-fw fa-trash-o"></i> Delete
                            </button>
                        </div>
                    </transition>
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
            <div class="media-status-bar">

            </div>
            <transition name="fade">
                <div class="media-loader" v-show="loading">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    <p>{{ loadingText }}</p>
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
    import config from './Config'
    import eventHub from './../../../shared/EventHub'

    export default {
        props: {
            loadingText: {
                type: String,
                default: "LOADING..."
            },
        },

        data () {
            return {
                breadcrumbs: [],
                medias: [],
                loading: true,
                newDirectory: '',
                selected: null,
                modalOpened: false
            }
        },

        components: {
            'create-folder-modal': require('./Modals/CreateFolderModal.vue'),
            'upload-media-modal':  require('./Modals/UploadMediaModal.vue'),
            'rename-media-modal':  require('./Modals/RenameMediaModal.vue'),
            'delete-media-modal':  require('./Modals/DeleteMediaModal.vue')
        },

        mounted() {
            this.getHomeDirectory();
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
            }, false)
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

                axios.get(config.endpoint + '/all').then((response) => {
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
                    //
                }
            },

            refreshDirectory() {
                this.getDirectories(this.currentUri);
            },

            getDirectories(location) {
                this.resetSelected();
                this.loading = true;

                axios.get(config.endpoint + '/all?location=' + location).then(response => {
                    this.medias  = response.data.data;
                    this.loading = false;
                });
            },


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

            openNewFolderModal() {
                eventHub.$emit('open-new-folder-modal', {});
                this.modalOpened = true;
            },

            openMediaFolderModal() {
                eventHub.$emit('open-rename-media-modal', {});
                this.modalOpened = true;
            },

            openUploadMediaModal() {
                eventHub.$emit('open-upload-media-modal', {});
                this.modalOpened = true;
            },

            openDeleteMediaModal() {
                eventHub.$emit('open-delete-media-modal', {});
                this.modalOpened = true;
            },

            mediaModalClosed() {
                this.modalOpened = false;
            }
        }
    }
</script>

<style lang="sass-loader" rel="stylesheet/scss" scoped>
    $container-height: 400px;
    $base-color: #4da7e8;

    .media-manager {
        position: relative;

        .media-toolbar {
            .media-toolbar-buttons {
                margin: 0;
                padding: 10px;
                background-color: #E0E0E0;
            }

            .media-toolbar-breadcrumbs {
                margin-bottom: 0;
                border-radius: 0;

                & > li > a {
                    cursor: pointer;
                }
            }
        }

        .media-container {
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            padding: 10px;
            max-height: $container-height;
            height: $container-height;
            overflow-x: hidden;

            .media-item {
                margin: 10px;
                flex: 0 1 calc(25% - 20px);
                max-height: 70px;
                width: 100%;
                max-width: 100%;

                &.media-directory,
                &.media-file {
                    display: flex;
                    overflow: hidden;
                    padding: 10px;
                    cursor: pointer;
                    border-radius: 3px;
                    border: 1px solid #ecf0f1;
                    background: #f6f8f9;

                    &.selected {
                        background-color: $base-color;
                        border-color: darken($base-color, 5%);
                        color: #fff;
                        transition-property: background-color, border-color, color;
                        transition-duration: 0.2s;
                        transition-timing-function: ease-in-out;
                    }

                    .media-icon {
                        flex: 1;
                        font-size: 2.5em;
                    }

                    .media-details {
                        flex: 3;
                        overflow: hidden;
                        width: 100%;

                        & > .media-name {
                            margin-top: 15px;
                            margin-bottom: 2px;
                            max-height: 20px;
                            height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 14px;
                            font-weight: 600;
                            line-height: 1.4em;

                            -webkit-touch-callout: none;
                            -webkit-user-select: none;
                            -moz-user-select: none;
                            -ms-user-select: none;
                            user-select: none;
                        }
                    }
                }

                &.media-directory {

                }

                &.media-file {
                    .media-icon {
                        .media-image {
                            height: 48px;
                            width: 48px;
                            background-size: auto 100%;
                            background-repeat: no-repeat;
                            background-position: center;
                        }
                    }
                }
            }
        }

        .media-status-bar {

        }

        .media-loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            z-index: 9;

            i.fa {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -30px;
                margin-top: -30px;
            }

            p {
                margin-top: 20px;
                position: absolute;
                text-align: center;
                width: 100%;
                top: 50%;
                font-weight: 400;
                font-size: 12px;
            }
        }
    }

    /* Small devices (tablets, 768px and up) */
    @media (min-width: 768px) {
        .media-manager .media-container .media-item {
            flex: 0 1 calc(50% - 20px);
        }
    }

    /* Medium devices (desktops, 992px and up) */
    @media (min-width: 992px) {
        .media-manager .media-container .media-item {
            flex: 0 1 calc(33.3333% - 20px);
        }
    }

    /* Large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        .media-manager .media-container .media-item {
            flex: 0 1 calc(25% - 20px);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
