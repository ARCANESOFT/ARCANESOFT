export default {
    selectors: {},
    icons: {},
    animationSpeed: 0,

    activate(_box) {
        let _this            = this;
        _this.selectors      = $.App.options.boxWidget.options.selectors;
        _this.icons          = $.App.options.boxWidget.options.icons;
        _this.animationSpeed = $.App.options.animationSpeed;

        if ( ! _box) {
            _box = document; // activate all boxes per default
        }

        //Listen for collapse event triggers
        $(_box).on('click', _this.selectors.collapse, (e) => {
            e.preventDefault();
            _this.collapse($(e.target));
        });

        //Listen for remove event triggers
        $(_box).on('click', _this.selectors.remove, (e) => {
            e.preventDefault();
            _this.remove($(e.target));
        });
    },

    collapse(element) {
        let _this       = this,
            // Find the box parent
            box         = element.parents('.box').first(),
            // Find the body and the footer
            box_content = box.find('> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer');

        if (box.hasClass('collapsed-box')) {
            // Convert plus into minus
            element.children(':first').removeClass(_this.icons.open).addClass(_this.icons.collapse);

            // Show the content
            box_content.slideDown(_this.animationSpeed, () => box.removeClass('collapsed-box'));
        }
        else {
            // Convert minus into plus
            element.children(':first').removeClass(_this.icons.collapse).addClass(_this.icons.open);

            // Hide the content
            box_content.slideUp(_this.animationSpeed, () => box.addClass('collapsed-box'));
        }
    },

    remove(element) {
        // Find the box parent
        var box = element.parents('.box').first();

        box.slideUp(this.animationSpeed, () => $(this).remove());
    }
};
