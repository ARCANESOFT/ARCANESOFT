const config = {
    endpoint: '/dashboard/media/api',

    supportedImages: [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml'
    ],

    "default-icon": "fa-file-pdf-o",

    icons: {
        "application/pdf": "fa-file-pdf-o",
        "application/vnd.ms-excel": "fa-file-excel-o",
        "text/plain": "fa-file-text-o"
    },

    events: {
        OPEN_NEW_FOLDER_MODAL: 'open_new_folder_modal'
    }
};

export default config;
