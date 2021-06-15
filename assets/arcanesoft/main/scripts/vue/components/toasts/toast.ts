import Types from './types'

export default class Toast {
    // Properties

    public id: string
    public type: Types
    public title: string
    public body: string
    public time: number
    public delay: number

    // Constructor

    constructor(id: string, type: Types, title: string, body?: string, time?: number, delay?: number) {
        this.id    = id;
        this.setType(type);
        this.title = title;
        this.body  = body;
        this.time  = time;
        this.delay = delay;
    }

    // Setters

    setType(type: Types) {
        this.type = type in Types ? type : Types.SUCCESS;

        return this
    }

    // Methods

    static make(type: Types, title: string, body?: string, time?: number, delay?: number) {
        const id = Math.random().toString(36).substr(2, 9);

        return new Toast(id, type, title, body, time, delay)
    }
}
