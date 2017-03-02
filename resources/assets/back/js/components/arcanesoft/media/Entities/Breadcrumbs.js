class Breadcrumbs {
    constructor() {
        this.clear();
    }

    push(name) {
        this.items.push(name);
    }

    goBack(index) {
        this.items = this.dropRight(index);
    }

    dropRight(index) {
        let back = this.count() - (index + 1);

        return back > 0 ? _.dropRight(this.items, back) : this.items;
    }

    isRoot() {
        return this.count() == 0;
    }

    count() {
        return this.items.length;
    }

    location() {
        return this.items.join('/');
    }

    clear() {
        this.items = [];
    }

    all() {
        return this.items;
    }

    uri() {
        return this.isRoot() ? '/' : this.location();
    }
}

export default Breadcrumbs;
