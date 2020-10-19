import { defineComponent, computed, watch, PropType } from 'vue'
import { MediaItem } from '../../../types'
import downloadMediaItem from '../../../store/actions/media/download-media-item'
import translator from '../../../mixins/translator'
import { saveAs } from 'file-saver'
import {
    getFileIcon,
    getHumanFileSize,
    isImageType,
    isMediaDirectoryType,
    isMediaFileType,
    isVideoType
} from '../../../utilities'

export default defineComponent({
    name: 'v-media-preview-single-item',

    mixins: [
        translator,
    ],

    props: {
        item: {
            type: Object as PropType<MediaItem>,
            required: true,
        },
    },

    setup(props) {
        watch(() => props.item, () => {
            let video = <HTMLMediaElement> document.querySelector('.item-preview-video video')

            if (video)
                video.load()
        });

        const isDirectory = computed((): boolean => isMediaDirectoryType(props.item))
        const isFile = computed((): boolean => isMediaFileType(props.item))
        const isImage = computed((): boolean => isFile.value && isImageType(props.item.mimetype))
        const isVideo = computed((): boolean => isFile.value && isVideoType(props.item.mimetype))

        const humanFileSize = computed((): string => getHumanFileSize(props.item.size)) // TODO: Get this from the api ?

        const iconClass = computed((): string => {
            if (isDirectory.value)
                return 'fa fa-fw fa-folder'

            return getFileIcon(props.item.mimetype)
        })

        return {
            isFile,
            isImage,
            isVideo,
            iconClass,
            humanFileSize,

            download: (): void => {
                downloadMediaItem(props.item).then((response) => {
                    saveAs(response.data, props.item.name)
                })
            },
        }
    },

    template: `
        <div v-if="isImage" :style="'background-image: url('+item.url+');'" class="item-preview-thumbnail"></div>
        <div v-else-if="isVideo" class="item-preview-video">
            <video controls>
                <source :src="item.url" :type="item.mimetype">
                {{ trans("Sorry, your browser doesn't support embedded videos.") }}
            </video>
        </div>
        <div v-else class="item-preview-icon d-flex justify-content-center">
            <i class="fa-5x" :class="iconClass"></i>
        </div>

        <table class="item-preview-table table table-md table-borderless mb-0">
            <tbody>
                <tr>
                    <th class="text-muted">{{ trans('Name') }}</th>
                    <td class="text-right">{{ item.name }}</td>
                </tr>
                <tr>
                    <th class="text-muted">{{ trans('Path') }}</th>
                    <td class="text-right small">/{{ item.path }}</td>
                </tr>
                <tr v-if="isFile">
                    <th class="text-muted">{{ trans('Size') }}</th>
                    <td class="text-right">{{ humanFileSize }}</td>
                </tr>
                <tr v-if="isFile">
                    <th class="text-muted">{{ trans('Type') }}</th>
                    <td class="text-right">{{ item.mimetype }}</td>
                </tr>
                <tr v-if="isFile">
                    <th class="text-muted">{{ trans('Visibility') }}</th>
                    <td class="text-right">{{ item.visibility }}</td>
                </tr>
                <tr>
                    <th class="text-muted">{{ trans('URL') }}</th>
                    <td class="text-right">
                        <a :href="item.url" target="_blank" rel="noopener">{{ trans('Preview') }}</a>
                    </td>
                </tr>
                <tr v-if="isFile">
                    <th class="text-muted">{{ trans('Last modified') }}</th>
                    <td class="text-right small">{{ item.lastModified }}</td>
                </tr>
            </tbody>
            <tfoot v-if="isFile">
                <tr>
                    <td colspan="2">
                        <button @click.prevent="download" type="button" class="btn btn-block btn-light">
                            <i class="fa fa-fw fa-download"></i> {{ trans('Download') }}
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    `,
})
