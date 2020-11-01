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
    dashboard: {
        inline: true,
        width: '100%',
        height: 300,
        replaceTargetContent: true,
        showProgressDetails: true,
        browserBackButtonClose: true,
        proudlyDisplayPoweredByUppy: false,
    },
    xhr: {
        formData: true,
        bundle: false,
    }
}

export default uppy
