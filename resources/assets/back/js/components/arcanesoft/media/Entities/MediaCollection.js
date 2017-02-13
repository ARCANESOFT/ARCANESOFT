import Media from './Media';

class MediaCollection {
    /**
     * Create a new MediaCollection instance.
     *
     * @param  {array}  medias
     */
    constructor(medias = []) {
        this.load(medias);
    }

    /**
     * Set the media items.
     *
     * @param  {array}  medias
     */
    load(medias) {
        this.items = [];

        medias.forEach(function (item, index) {
            this.items[index] = new Media(item);
        }, this)
    }

    /**
     * Get all the medias.
     *
     * @return {object}
     */
    all() {
        return this.items;
    }

    /**
     * Push a media to collection.
     *
     * @param  {object}  media
     */
    push(media) {
        console.debug(media, this.items);
    }

    /**
     * Get the item index.
     *
     * @param  {object}  item
     *
     * @return {number}
     */
    getIndex(item) {
        return _.indexOf(this.items, item);
    }

    /**
     * Get an item by index.
     *
     * @param  {integer}  index
     *
     * @return {object}
     */
    get(index) {
        return this.items[index];
    }

    /**
     * Get the first item.
     *
     * @return {object}
     */
    first() {
        return _.first(this.items);
    }

    /**
     * Get the last item.
     *
     * @return {object}
     */
    last() {
        return _.last(this.items);
    }

    /**
     * Get the items count.
     *
     * @return {integer}
     */
    count() {
        return this.items.length;
    }

    /**
     * Check if the collection is empty.
     *
     * @return {boolean}
     */
    isEmpty() {
        return this.count() == 0;
    }
}

export default MediaCollection;
