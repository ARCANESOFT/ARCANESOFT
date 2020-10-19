import LoadingButton from './UI/LoadingButton';
import toastEvents from '../vue/components/toasts/events';

export default class {
    toast(toast) {
        window['Foundation'].$emit(toastEvents.UI_TOASTS_NOTIFY, toast)
    }

    initToasts(dom: Document|Element): any[] {
        return Array
            .from(dom.querySelectorAll('.toast'))
            .map((elt) => new window['twbs'].Toast(elt))
    }

    initTooltips(dom: Document|Element): any[] {
        return Array
            .from(dom.querySelectorAll('[data-toggle="tooltip"]'))
            .map((elt) => new window['twbs'].Tooltip(elt, {boundary: 'window'}))
    }

    loadingButton(elt: Element|string): LoadingButton {
        if (typeof elt === 'string')
            elt = document.querySelector(elt)

        return new LoadingButton(elt)
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

    initTextAutosize() {
        return window['plugins'].autosize('textarea')
    }
}
