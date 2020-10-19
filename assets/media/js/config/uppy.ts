const uppy = {
    core: {
        debug: process.env.NODE_ENV === 'development',
        autoProceed: false,
        restrictions: {
            maxFileSize: 5 * 1000 * 1000, // 5 Mo
            maxNumberOfFiles: 10,
            minNumberOfFiles: 1,
            // allowedFileTypes: ["image/*", "video/*"],
        },
    },
}

export default uppy
