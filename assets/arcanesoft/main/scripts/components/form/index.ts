import Component from '../component'
import SubmitButton, { LoadingButtonOptions } from './buttons/submit'
import request from '../../helpers/request'

type FormOptions = {
    submitBtnSelector?: string
}

class Form extends Component {
    public action(action?: string): this | string | null {
        return action
            ? this.setAction(action)
            : this.getAction();
    }

    /**
     * Get the form's action attribute.
     */
    public getAction(): string | null {
        return this.elt().getAttribute('action')
    }

    /**
     * Set the form's action attribute.
     */
    public setAction(action: string): this {
        this.elt().setAttribute('action', action)

        return this
    }

    /**
     * Submit the form.
     */
    public submit(): void {
        (<HTMLFormElement> this.elt()).submit()
    }

    public submitButton(selector?: string, options?: LoadingButtonOptions): SubmitButton {

        return new SubmitButton(
            this.elt().querySelector(selector || this.options['submitBtnSelector'] || 'button[type="submit"]'),
            options
        )
    }

    /**
     * Register an event listener.
     */
    public on(event: string, callback: EventListenerOrEventListenerObject): this {
        this.elt().addEventListener(event, callback)

        return this
    }

    public onSubmit(method, onSuccess: Function) {
        return this.on('submit', (event) => {
            event.preventDefault()

            const submitBtn = this.submitButton()

            submitBtn.loading()

            request()
                .request({
                    url: this.getAction(),
                    method,
                })
                .then((response) => {
                    if (response.data.code !== 'success')
                        throw Error(`The returned code is: ${response.data.code}`)

                    return onSuccess(response)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    submitBtn.reset()
                })
        })
    }
}

export default (elt: HTMLElement | string, options?: FormOptions): Form => new Form(elt, options)
