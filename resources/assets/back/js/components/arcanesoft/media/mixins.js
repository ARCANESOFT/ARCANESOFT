import Lang from 'laravel-lang-js';
import translations from './translations';

const translator = {
    data () {
        return {
            lang: null,
        }
    },

    created() {
        this.lang = new Lang({
            fallback: 'fr',
            messages: translations
        })
    }
};

export { translator };
