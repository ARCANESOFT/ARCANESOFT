export type LoadingButtonOptions = {
    loadingText?: string
}

enum ButtonStatus {
    INITIAL = 'initial',
    LOADING = 'loading',
}

class SubmitButton {
    protected _elt: HTMLButtonElement
    protected status: string
    protected options: LoadingButtonOptions
    protected initialInnerHTML

    constructor(elt: Element | string, options?: LoadingButtonOptions) {
        if (typeof elt === 'string')
            elt = document.querySelector(elt)

        this._elt = <HTMLButtonElement> elt
        this.status = 'initial'
        this.options = Object.assign({}, {
            loadingText: elt.getAttribute('data-loading-text') || 'Loading...'
        }, options)
    }

    setLoadingText(text: string): this {
        this.options.loadingText = text

        return this
    }

    setDisabled(disabled: boolean): void {
        let hasDisabledAttr = this._elt.hasAttribute('disabled')

        if (disabled === true) {
            if ( ! hasDisabledAttr)
                this._elt.setAttribute('disabled', 'disabled')
        }
        else if (hasDisabledAttr)
            this._elt.removeAttribute('disabled')
    }

    loading(): this {
        if (this.isLoading())
            return this

        this.initialInnerHTML = this._elt.innerHTML
        this._elt.innerHTML = `<i class="fas fa-fw fa-circle-notch fa-spin" role="status" aria-hidden="true"></i> ${this.options.loadingText}`
        this.setDisabled(true)
        this.status = ButtonStatus.LOADING

        return this
    }

    reset(): this {
        if ( ! this.isLoading()) {
            return this
        }

        this._elt.innerHTML = this.initialInnerHTML
        this.setDisabled(false)
        this.status = ButtonStatus.INITIAL

        return this
    }

    isLoading(): boolean {
        return this.status === ButtonStatus.LOADING
    }
}

export default SubmitButton
