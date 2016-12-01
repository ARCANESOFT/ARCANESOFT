/* Layout
 * ======
 * Fixes the layout height in case min-height fails.
 */

export default {
    activate() {
        let me = this;

        me.fix();
        me.fixSidebar();

        $(window, '.wrapper').resize(() => {
            me.fix();
            me.fixSidebar();
        });
    },

    fix() {
        // Get window height and the wrapper height
        let neg            = $('.main-header').outerHeight() + $('.main-footer').outerHeight(),
            window_height  = $(window).height(),
            sidebar_height = $('.sidebar').height(),
            postSetWidth;

        // Set the min-height of the content and sidebar based on the the height of the document.
        if ($('body').hasClass('fixed')) {
            postSetWidth = window_height - $('.main-footer').outerHeight();
        }
        else {
            postSetWidth = window_height >= sidebar_height ? (window_height - neg) : sidebar_height;

            // Fix for the control sidebar height
            let controlSidebar = $($.App.options.sidebar.controlOptions.selector);

            if (
                typeof controlSidebar !== 'undefined' &&
                controlSidebar.height() > postSetWidth
            ) {
                postSetWidth = controlSidebar.height();
            }
        }

        $('.content-wrapper, .right-side').css('min-height', postSetWidth);
    },

    fixSidebar() {
        let sidebar = $('.sidebar');

        // Make sure the body tag has the .fixed class
        if ( ! $('body').hasClass('fixed')) {
            if (typeof $.fn.slimScroll != 'undefined') {
                sidebar.slimScroll({destroy: true}).height('auto');
            }

            return;
        }
        else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
            window.console.error('Error: the fixed layout requires the slimscroll plugin!');
        }

        // Enable slimscroll for fixed layout
        if ($.App.options.sidebar.slimScroll) {
            if (typeof $.fn.slimScroll != 'undefined') {
                // Destroy if it exists
                sidebar.slimScroll({destroy: true}).height('auto');

                // Add slimscroll
                sidebar.slimscroll({
                    height: ($(window).height() - $('.main-header').height()) + 'px',
                    color:  'rgba(0,0,0,0.2)',
                    size:   '3px'
                });
            }
        }
    }
};
