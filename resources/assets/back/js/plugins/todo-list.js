export default function (options) {
    // Render options
    let settings = $.extend({
        //When the user checks the input
        onCheck(elt) { return elt; },

        //When the user unchecks the input
        onUncheck (elt) { return elt; }
    }, options);

    return this.each(() => {
        $('input', this).on('change', () => {
            let ele = $(this).parents('li').first();
            ele.toggleClass('done');

            if ($('input', ele).is(':checked'))
                settings.onCheck.call(ele);
            else
                settings.onUncheck.call(ele);
        });
    });
};
