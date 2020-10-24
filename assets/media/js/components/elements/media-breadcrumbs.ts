import { defineComponent, computed } from 'vue'
import loading from '../../store/modules/loading'
import location from '../../store/modules/location'
import mediaItems from '../../store/modules/media-items'
import { trans } from '../../helpers/translator'

type Location = {
    path: string
    name: string
    isRoot: boolean
}

export default defineComponent({
    name: 'v-media-breadcrumbs',

    setup() {
        const { current: currentLocation, setCurrent: changeCurrentLocation, isRoot } = location()
        const { handleLoading } = loading()
        const { loadItems: loadMediaItems } = mediaItems()

        const locationLinks = computed<Location[]>(() => {
            const locations = [
                {
                    path: '/',
                    name: trans('Home'),
                    isRoot: true,
                },
            ]

            if (isRoot.value)
                return locations

            let lastLocation = ''

            currentLocation.value.split('/').forEach((location) => {
                locations.push({
                    path: `${lastLocation}/${location}`.replace(/^\/|\/$/g, ''),
                    name: location,
                    isRoot: false,
                })

                lastLocation = location
            })

            return locations
        })

        const isLastLinkIndex = (index: number): boolean => (locationLinks.value.length - 1) === index

        const changeLocation = (location: string): Promise<void> => handleLoading(async (): Promise<void> => {
            changeCurrentLocation(location)
            await loadMediaItems(location)
        })

        return {
            changeLocation,
            isLastLinkIndex,
            locationLinks,
        }
    },

    template: `
        <nav class="media-manager-breadcrumb" aria-label="breadcrumb">
            <ol class="breadcrumb border-0 mb-0 p-0">
                <li v-for="(link, index) in locationLinks"
                    class="breadcrumb-item" :class="{'active': isLastLinkIndex(index)}">
                    <span v-if="isLastLinkIndex(index)">
                        <i class="fas fa-fw fa-home" v-if="link.isRoot"></i>
                        <span v-else>{{ link.name }}</span>
                    </span>
                    <a v-else href="#" @click.prevent="changeLocation(link.path)">
                        <i class="fas fa-fw fa-home" v-if="link.isRoot"></i>
                        <span v-else>{{ link.name }}</span>
                    </a>
                </li>
            </ol>
        </nav>
    `,
})
