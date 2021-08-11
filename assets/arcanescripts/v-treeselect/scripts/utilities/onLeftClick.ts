export const onLeftClick = (callback: Function) => {
    return (evt, ...args): void => {
        if (evt.type === 'mousedown' && evt.button === 0) {
            callback(evt, ...args)
        }
    }
};
