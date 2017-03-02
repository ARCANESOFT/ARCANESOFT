import config from './../Config';

class Media {
    /**
     * Constructor.
     *
     * @param  {object}  item
     */
    constructor(item) {
        this.setType(item);
        this.setName(item);
        this.setPath(item);

        ['url', 'mimetype', 'size', 'lastModified', 'visibility'].forEach(function (field) {
            this[field] = item.hasOwnProperty(field) !== undefined ? item[field] : null;
        }.bind(this));
    }

    // Getters & Setters
    setType(item) {
        this.type = item.type;
    }

    setName(item) {
        this.name = item.name;
    }

    setPath(item) {
        this.path = item.path;
    }

    /**
     * Get file icon.
     *
     * @return {string}
     */
    icon() {
        return _.has(config.icons.supported, this.mimetype)
            ? config.icons.supported[this.mimetype]
            : config.icons.default;
    }

    /**
     * Get a readable file size.
     *
     * @return {string}
     */
    humanFileSize() {
        if ( ! this.isFile())
            return null;

        let i = Math.floor(Math.log(this.size) / Math.log(1024));

        return (this.size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }

    // Check Methods
    isFile() {
        return this.type == 'file';
    }

    isImage() {
        if ( ! this.isFile()) return false;

        return _.indexOf(config.supportedImages, this.mimetype) >= 0
    }

    isNotImage() {
        return ! (this.isDirectory() || this.isImage()); // = Not a directory and not an image.
    }

    /**
     * Check if the media is a directory.
     *
     * @return {boolean}
     */
    isDirectory() {
        return this.type == 'directory';
    }

    isPublic() {
        return this.visibility === 'public';
    }

    isPrivate() {
        return this.visibility === 'private';
    }
}

export default Media;
