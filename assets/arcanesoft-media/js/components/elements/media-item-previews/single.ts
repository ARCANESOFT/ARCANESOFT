import { defineComponent, computed, watch, PropType } from 'vue'
import { MediaItem } from '../../../types'
import mediaItems from '../../../store/modules/media-items'
import { trans } from '../../../helpers/translator'
import { saveAs } from 'file-saver'
import {
    getFileIcon,
    getHumanFileSize,
    isImageType,
    isVideoType
} from '../../../utilities'

export default defineComponent({
    name: 'v-media-item-preview-single',

    props: {
        item: {
            type: Object as PropType<MediaItem>,
            required: true,
        },
    },

    setup(props) {
        const { downloadItem, isMediaFile, isMediaDirectory } = mediaItems()

        const isDirectory = computed<boolean>(() => isMediaDirectory(props.item))
        const isFile = computed<boolean>(() => isMediaFile(props.item))

        watch(() => props.item, () => {
            let video = <HTMLMediaElement> document.querySelector('.item-preview-video video')

            if (video)
                video.load()
        })

        const isImage = computed<boolean>(() => isFile.value && isImageType(props.item.mimetype))
        const isVideo = computed<boolean>(() => isFile.value && isVideoType(props.item.mimetype))

        const humanFileSize = computed<string>(() => getHumanFileSize(props.item.size)) // TODO: Get this from the api ?
        const iconClass = computed<string>(
            () => isDirectory.value ? 'fa fa-fw fa-folder' : getFileIcon(props.item.mimetype)
        )

        const download = async (): Promise<void> => await downloadItem(props.item).then((response) => {
            saveAs(response.data, props.item.name)
        })

        return {
            trans,
            isFile,
            isImage,
            isVideo,
            iconClass,
            humanFileSize,
            download,
        }
    },

    template: `
        <div v-if="isImage" class="item-preview-thumbnail text-center">
            <img :src="item.url" :alt="item.name" class="h-100 w-100">
        </div>
        <div v-else-if="isVideo" class="item-preview-video ratio ratio-16x9">
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
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('Name') }}</th>
                </tr>
                <tr>
                    <td class="small">{{ item.name }}</td>
                </tr>
                <tr>
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('Path') }}</th>
                </tr>
                <tr>
                    <td class="small">/{{ item.path }}</td>
                </tr>
                <tr v-if="isFile">
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('Size') }}</th>
                </tr>
                <tr v-if="isFile">
                    <td class="small">{{ humanFileSize }}</td>
                </tr>
                <tr v-if="isFile">
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('Type') }}</th>
                </tr>
                <tr v-if="isFile">
                    <td class="small">{{ item.mimetype }}</td>
                </tr>
                <tr v-if="isFile">
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('Visibility') }}</th>
                </tr>
                <tr v-if="isFile">
                    <td class="small">{{ item.visibility }}</td>
                </tr>
                <tr>
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('URL') }}</th>
                </tr>
                <tr>
                    <td class="small">
                        <a :href="item.url" target="_blank" rel="noopener">{{ trans('Preview') }}</a>
                    </td>
                </tr>
                <tr v-if="isFile">
                    <th class="font-weight-light text-uppercase text-muted small">{{ trans('Last modified') }}</th>
                </tr>
                <tr v-if="isFile">
                    <td class="small">{{ item.lastModified }}</td>
                </tr>
            </tbody>
            <tfoot v-if="isFile">
                <tr>
                    <td>
                        <button @click.prevent="download" type="button" class="btn btn-block btn-light">
                            <i class="fas fa-fw fa-download"></i> {{ trans('Download') }}
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    `,
})
