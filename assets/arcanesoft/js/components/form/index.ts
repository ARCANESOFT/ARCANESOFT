import Component from '../component'
import SubmitButton, { LoadingButtonOptions } from './buttons/submit'

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
     * Register an event listener.
     */
    public on(event: string, callback: EventListenerOrEventListenerObject): this {
        this.elt().addEventListener(event, callback)

        return this
    }

    /**
     * Submit the form.
     */
    public submit(): void {
        (<HTMLFormElement> this.elt()).submit()
    }

    public submitButton(selector: string = 'button[type="submit"]', options?: LoadingButtonOptions) {
        return new SubmitButton(
            this.elt().querySelector(selector),
            options
        )
    }
}

const form = (elt: HTMLElement | string): Form => new Form(elt)

export {
    form,
}

export default Form
