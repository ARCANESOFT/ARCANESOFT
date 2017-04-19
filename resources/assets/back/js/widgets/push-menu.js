/* PushMenu()
 * ==========
 * Adds the push menu functionality to the sidebar.
 */

import Cookies from 'js-cookie'

export default {
    activate(toggleBtn) {
        // Get the screen sizes
        let _this       = this,
            body        = $('body'),
            screenSizes = App.options.screenSizes;

        if (Cookies.get('sidebar') === 'collapsed' && ! body.hasClass('sidebar-collapse')) {
            body.addClass('sidebar-collapse').trigger('collapsed.pushMenu');
        }

        //Enable sidebar toggle
        $(document).on('click', toggleBtn, (e) => {
            e.preventDefault();

            if ($(window).width() > (screenSizes.sm - 1)) {
                // Enable sidebar push menu
                _this.handleSidebarPushMenu(body);
            }
            else {
                // Handle sidebar push menu for small screens
                _this.handleSidebarPushMenuForSmallScreen(body);
            }
        });

        $('.content-wrapper').click(() => {
            // Enable hide menu when clicking on the content-wrapper on small screens
            if ($(window).width() <= (screenSizes.sm - 1) && body.hasClass('sidebar-open')) {
                body.removeClass('sidebar-open');
            }
        });

        // Enable expand on hover for sidebar mini
        if (App.options.sidebar.expandOnHover || (body.hasClass('fixed') && body.hasClass('sidebar-mini'))) {
            this.expandOnHover();
        }
    },

    handleSidebarPushMenu(body) {
        if (body.hasClass('sidebar-collapse')) {
            Cookies.remove('sidebar');
            body.removeClass('sidebar-collapse').trigger('expanded.pushMenu');
        }
        else {
            Cookies.set('sidebar', 'collapsed', { expires: 7, path: '/' });
            body.addClass('sidebar-collapse').trigger('collapsed.pushMenu');
        }
    },

    handleSidebarPushMenuForSmallScreen(body) {
        if (body.hasClass('sidebar-open')) {
            body.removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
        }
        else {
            body.addClass('sidebar-open').trigger('expanded.pushMenu');
        }
    },

    expandOnHover() {
        let _this       = this,
            body        = $('body'),
            screenWidth = App.options.screenSizes.sm - 1;

        // Expand sidebar on hover
        $('.main-sidebar').hover(() => {
            if (
                body.hasClass('sidebar-mini') &&
                body.hasClass('sidebar-collapse') &&
                $(window).width() > screenWidth
            ) {
                _this.expand();
            }
        }, () => {
            if (
                body.hasClass('sidebar-mini') &&
                body.hasClass('sidebar-expanded-on-hover') &&
                $(window).width() > screenWidth
            ) {
                _this.collapse();
            }
        });
    },

    expand() {
        $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },

    collapse () {
        let body = $('body');

        if (body.hasClass('sidebar-expanded-on-hover')) {
            body.removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
        }
    }
};
