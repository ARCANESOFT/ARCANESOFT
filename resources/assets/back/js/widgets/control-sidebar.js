export default {
    // instantiate the object
    activate(options) {
        let _this   = this,                          // Get the object
            sidebar = $(options.selector),           // Get the sidebar
            btn     = $(options.toggleBtnSelector);  // The toggle button

        // Listen to the click event
        btn.on('click', (e) => {
            e.preventDefault();
            // If the sidebar is not open
            if (
                ! sidebar.hasClass('control-sidebar-open') && ! $('body').hasClass('control-sidebar-open')
            )
                _this.open(sidebar, options.slide);  // Open the sidebar
            else
                _this.close(sidebar, options.slide); // Close the sidebar
        });

        // If the body has a boxed layout, fix the sidebar bg position
        let bg = $('.control-sidebar-bg');

        _this._fix(bg);

        // If the body has a fixed layout, make the control sidebar fixed
        if ($('body').hasClass('fixed')) {
            _this._fixForFixed(sidebar);
        }
        else if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
            // If the content height is less than the sidebar's height, force max height
            _this._fixForContent(sidebar);
        }
    },

    // Open the control sidebar
    open(sidebar, slide) {
        let control = (slide) ? sidebar : $('body');

        control.addClass('control-sidebar-open');
    },

    // Close the control sidebar
    close(sidebar, slide) {
        let control = (slide) ? sidebar : $('body');

        control.removeClass('control-sidebar-open');
    },

    _fix(sidebar) {
        let _this = this;

        if ($('body').hasClass('layout-boxed')) {
            sidebar.css('position', 'absolute').height($('.wrapper').height());
            $(window).resize(() => {
                _this._fix(sidebar);
            });
        }
        else {
            sidebar.css({'position': 'fixed', 'height': 'auto'});
        }
    },

    _fixForFixed(sidebar) {
        sidebar.css({
            'position':       'fixed',
            'max-height':     '100%',
            'overflow':       'auto',
            'padding-bottom': '50px'
        });
    },

    _fixForContent(sidebar) {
        $('.content-wrapper, .right-side').css('min-height', sidebar.height());
    }
};
