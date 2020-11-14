import { defineComponent, PropType } from 'vue'
import { DatatablePageLink } from '../../types'
import useActions from '../../store/actions'
import useGetters from '../../store/getters'

export default defineComponent({
    name: 'v-datatable-pagination-link',

    props: {
        link: {
            type: Object as PropType<DatatablePageLink>,
            required: true,
        },
    },

    setup() {
        const { paginationLinks } = useGetters()
        const { goToPage } = useActions()

        const isDisabled = (link: DatatablePageLink) => link.url === null
        const isNavLink = (link: DatatablePageLink, url: string | null): boolean => {
            if (typeof link.label !== 'string')
                return false

            if (link.label === '...')
                return false

            return link.url === url
        }

        const isPreviousLink = ((link: DatatablePageLink) => isNavLink(link, paginationLinks.value.prev))
        const isNextLink = ((link: DatatablePageLink) => isNavLink(link, paginationLinks.value.next))

        const ariaLabel = (link: DatatablePageLink) => {
            if (isPreviousLink(link))
                return 'Previous'

            if (isNextLink(link))
                return 'Next'

            return null
        }

        const linkRel = (link: DatatablePageLink): string | null => {
            if (isDisabled(link))
                return null

            if (isPreviousLink(link))
                return 'prev'

            if (isNextLink(link))
                return 'next'

            return null
        }

        const onClick = async (link: DatatablePageLink): Promise<void> => {
            if ( ! isDisabled(link))
                await goToPage(link)
        }

        return {
            onClick,
            isDisabled,
            isPreviousLink,
            isNextLink,
            ariaLabel,
            linkRel,
        }
    },

    template: `
        <li class="v-datatable-page-item"
            :class="{'active': link.active, 'disabled': isDisabled(link)}"
            :ariaCurrent="link.active ? 'page' : null">
            <span v-if="link.active" class="v-datatable-page-link page-link">
                {{ link.label }} <span class="visually-hidden">(current)</span>
            </span>
            <button
                v-else
                @click.prevent="onClick(link)"
                class="v-datatable-page-link page-link"
                :class="{'d-none d-md-block': ! (isPreviousLink(link) || isNextLink(link))}"
                :ariaDisabled="isDisabled(link) ? 'true' : null"
                :ariaLabel="ariaLabel(link)"
                :rel="linkRel(link)"
                v-html="link.label"></button>
        </li>
    `,
})
