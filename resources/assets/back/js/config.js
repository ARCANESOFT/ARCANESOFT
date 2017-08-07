const config = {
    // Add slimscroll to navbar menus
    // This requires you to load the slimscroll plugin in every page before app.js
    navbar: {
        menu: {
            slimScroll: {
                enabled: true,
                width: '3px',    // The width of the scroll bar
                height: '200px', // The height of the inner menu
            },
        },
    },

    // General animation speed for JS animated elements such as box collapse/expand and sidebar treeview slide up/down.
    // This options accepts an integer as milliseconds, 'fast', 'normal', or 'slow'
    animationSpeed: 500,

    sidebar: {
        // Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
        slimScroll: true,

        // Enable sidebar expand on hover effect for sidebar mini
        // This option is forced to true if both the fixed layout and sidebar mini are used together
        expandOnHover: false,

        // Activate sidebar push menu
        pushMenu: true,

        // Sidebar push menu toggle button selector
        toggleSelector: '[data-toggle="offcanvas"]',

        // Control Sidebar Options
        controlOptions: {
            enabled: true,

            // Which button should trigger the open/close event
            toggleBtnSelector: '[data-toggle="control-sidebar"]',

            // The sidebar selector
            selector: '.control-sidebar',

            // Enable slide over content
            slide: true
        },
    },

    // BoxRefresh Plugin
    enableBoxRefresh: true,

    bootstrap: {
        // Bootstrap.js tooltip
        tooltip: {
            enabled: true,
            selector: '[data-toggle="tooltip"]'
        }
    },

    // Enable Fast Click. Fastclick.js creates a more native touch experience with touch devices.
    // If you choose to enable the plugin, make sure you load the script before Foundation's app.js
    fastClick: {
        enabled: true,
    },

    // Box Widget Plugin.
    boxWidget: {
        // Enable this plugin to allow boxes to be collapsed and/or removed
        enabled: true,

        // Box Widget plugin options
        options: {
            icons: {
                //Collapse icon
                collapse: 'fa-minus',
                //Open icon
                open: 'fa-plus',
                //Remove icon
                remove: 'fa-times'
            },

            selectors: {
                //Remove button selector
                remove:   '[data-widget="remove"]',
                //Collapse button selector
                collapse: '[data-widget="collapse"]'
            }
        }
    },

    // Direct Chat plugin options
    directChat: {
        // Enable direct chat by default
        enabled: true,

        // The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },

    // Define the set of colors to use globally around the website
    colors: {
        lightBlue: '#3C8DBC',
        red:       '#F56954',
        green:     '#00A65A',
        aqua:      '#00C0EF',
        yellow:    '#F39C12',
        blue:      '#0073B7',
        navy:      '#001F3F',
        teal:      '#39CCCC',
        olive:     '#3D9970',
        lime:      '#01FF70',
        orange:    '#FF851B',
        fuchsia:   '#F012BE',
        purple:    '#8E24AA',
        maroon:    '#D81B60',
        black:     '#222222',
        gray:      '#D2D6DE'
    },

    // The standard screen sizes that bootstrap uses.
    // If you change these in the variables.less file, change them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

export default config;
