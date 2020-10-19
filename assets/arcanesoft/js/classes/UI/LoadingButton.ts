type LoadingButtonOptions = {
    loadingText?: string
}

class LoadingButton {
    elt
    initialInnerHTML
    options: LoadingButtonOptions
    status: string

    constructor(elt, options: LoadingButtonOptions = {}) {
        this.elt = elt
        this.status = 'initial'
        this.options = {
            ...{
                loadingText: elt.getAttribute('data-loading-text') || 'Loading...'
            },
            ...options
        }
    }

    setLoadingText(text: string): this {
        this.options.loadingText = text

        return this
    }

    setDisabled(status: boolean): void {
        if (status === true) {
            if (this.elt.tagName === 'A' && ! this.elt.classList.contains('disabled'))
                this.elt.classList.add('disabled')
            else if (this.elt.tagName === 'BUTTON' && ! this.elt.hasAttribute('disabled'))
                this.elt.setAttribute('disabled', 'disabled')
        }
        else {
            if (this.elt.tagName === 'A' && this.elt.classList.contains('disabled'))
                this.elt.classList.remove('disabled')
            else if (this.elt.tagName === 'BUTTON' && this.elt.hasAttribute('disabled'))
                this.elt.removeAttribute('disabled')
        }
    }

    loading(): this {
        if (this.isLoading())
            return this

        this.initialInnerHTML = this.elt.innerHTML
        this.elt.innerHTML = `<i class="fas fa-fw fa-circle-notch fa-spin" role="status" aria-hidden="true"></i> ${this.options.loadingText}`
        this.setDisabled(true)
        this.status = 'loading'

        return this
    }

    reset(): this {
        if ( ! this.isLoading()) {
            return this
        }

        this.elt.innerHTML = this.initialInnerHTML
        this.setDisabled(false)
        this.status = 'initial'

        return this
    }

    isLoading(): boolean {
        return this.status === 'loading'
    }
}

export default LoadingButton;
