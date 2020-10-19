import { defineComponent, computed } from 'vue'
import getCurrentLocation from '../../store/getters/location/current-location'
import changeCurrentLocation from '../../store/actions/location/change-location'
import { trans } from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-breadcrumbs',

    setup() {
        const currentLocation = computed((): string => getCurrentLocation()) // TODO: Convert it into computed file

        const locationLinks = computed((): Array<Object> => {
            const locations = [
                {
                    path: '/',
                    name: trans('Home'),
                    isRoot: true,
                },
            ]

            if (currentLocation.value == '/')
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

        return {
            changeLocation: (location: string): void => {
                changeCurrentLocation(location).then()
            },
            isLastLinkIndex: (index): boolean => {
                return (locationLinks.value.length - 1) === index;
            },
            currentLocation,
            locationLinks,
        }
    },

    template: `
        <nav class="media-manager-breadcrumb" aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 border-0">
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
    `
})
