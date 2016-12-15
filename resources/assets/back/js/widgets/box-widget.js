export default {
    selectors: {},
    icons: {},
    animationSpeed: 0,

    activate(_box) {
        let me            = this;
        me.selectors      = App.options.boxWidget.options.selectors;
        me.icons          = App.options.boxWidget.options.icons;
        me.animationSpeed = App.options.animationSpeed;

        if ( ! _box) {
            _box = document; // activate all boxes per default
        }

        //Listen for collapse event triggers
        $(_box).on('click', me.selectors.collapse, (e) => {
            e.preventDefault();
            me.collapse($(e.target));
        });

        //Listen for remove event triggers
        $(_box).on('click', me.selectors.remove, (e) => {
            e.preventDefault();
            me.remove($(e.target));
        });
    },

    collapse(element) {
        // Find the box parent
        let box         = element.parents('.box').first();
        // Find the body and the footer
        let box_content = box.find('> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer');

        if (box.hasClass('collapsed-box')) {
            // Convert plus into minus
            element.children(':first').removeClass(this.icons.open).addClass(this.icons.collapse);

            // Show the content
            box_content.slideDown(this.animationSpeed, () => box.removeClass('collapsed-box'));
        }
        else {
            // Convert minus into plus
            element.children(':first').removeClass(this.icons.collapse).addClass(this.icons.open);

            // Hide the content
            box_content.slideUp(this.animationSpeed, () => box.addClass('collapsed-box'));
        }
    },

    remove(element) {
        // Find the box parent
        let box = element.parents('.box').first();

        box.slideUp(this.animationSpeed, () => $(this).remove());
    }
};
