import arcanesoft from '../../helpers/arcanesoft'
import toastEvents from '../../vue/components/toasts/events'
import components from '../../components'

class UI {
    toast(toast) {
        arcanesoft().emit(toastEvents.UI_TOASTS_NOTIFY, toast)
    }

    initToasts(dom: Document): any[] {
        return Array
            .from(dom.querySelectorAll('.toast'))
            .map((elt: HTMLElement) => components().toast(elt))
    }

    initTooltips(dom: Document): any[] {
        return Array
            .from(dom.querySelectorAll('[data-toggle="tooltip"]'))
            .map((elt: HTMLElement) => components().tooltip(elt, {boundary: 'window'}))
    }

    initPageScrolled(): void {
        const className = 'page-scrolled'
        const scrolledPosition = 150;

        let previousScrollPosition = window.pageYOffset;

        window.addEventListener('scroll', (e) => {
            let currentScrollPosition = window.pageYOffset;

            const body = document.querySelector('body');

            if (previousScrollPosition > currentScrollPosition) {
                body.classList.remove(className)
            }
            else if (currentScrollPosition >= scrolledPosition) {
                body.classList.add(className)
            }

            previousScrollPosition = currentScrollPosition;
        })
    }

    // initTextAutosize() {
    //     return window['plugins'].autosize('textarea')
    // }
}

export default UI
