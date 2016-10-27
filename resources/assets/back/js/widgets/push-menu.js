/* PushMenu()
 * ==========
 * Adds the push menu functionality to the sidebar.
 */
export default {
    activate(toggleBtn) {
        // Get the screen sizes
        var body        = $('body'),
            screenSizes = $.App.options.screenSizes;

        //Enable sidebar toggle
        $(document).on('click', toggleBtn, (e) => {
            e.preventDefault();

            // Enable sidebar push menu
            if ($(window).width() > (screenSizes.sm - 1)) {
                if (body.hasClass('sidebar-collapse')) {
                    body.removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                } else {
                    body.addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                }
            }
            // Handle sidebar push menu for small screens
            else {
                if (body.hasClass('sidebar-open')) {
                    body.removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                } else {
                    body.addClass('sidebar-open').trigger('expanded.pushMenu');
                }
            }
        });

        $('.content-wrapper').click(() => {
            // Enable hide menu when clicking on the content-wrapper on small screens
            if (
                $(window).width() <= (screenSizes.sm - 1) &&
                body.hasClass('sidebar-open')
            ) {
                body.removeClass('sidebar-open');
            }
        });

        // Enable expand on hover for sidebar mini
        if (
            $.App.options.sidebar.expandOnHover ||
            (body.hasClass('fixed') && body.hasClass('sidebar-mini'))
        ) {
            this.expandOnHover();
        }
    },

    expandOnHover () {
        var _this       = this,
            body        = $('body'),
            screenWidth = $.App.options.screenSizes.sm - 1;

        // Expand sidebar on hover
        $('.main-sidebar').hover(() => {
            if (
                body.hasClass('sidebar-mini') &&
                body.hasClass('sidebar-collapse') &&
                $(window).width() > screenWidth
            ) {
                _this.expand();
            }
        }, function () {
            if (
                body.hasClass('sidebar-mini') &&
                body.hasClass('sidebar-expanded-on-hover') &&
                $(window).width() > screenWidth
            ) {
                _this.collapse();
            }
        });
    },

    expand () {
        $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },

    collapse () {
        var body = $('body');

        if (body.hasClass('sidebar-expanded-on-hover')) {
            body.removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
        }
    }
};
