const config = {
    endpoint: '/dashboard/api/media',

    supportedImages: [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml'
    ],

    icons: {
        default: "fa-file-o",

        supported: {
            "audio/midi":                   "fa-file-audio-o",
            "audio/mpeg":                   "fa-file-audio-o",
            "audio/webm":                   "fa-file-audio-o",
            "audio/ogg":                    "fa-file-audio-o",
            "audio/wav":                    "fa-file-audio-o",

            "application/pdf":              "fa-file-pdf-o",
            "application/vnd.ms-excel":     "fa-file-excel-o",
            "application/msword":           "fa-file-word-o",
            "application/vnd.mspowerpoint": "fa-file-powerpoint-o",
            "application/powerpoint":       "fa-file-powerpoint-o",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":         "fa-file-excel-o",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":   "fa-file-word-o",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": "fa-file-powerpoint-o",

            "application/zip":              "fa-file-archive-o",
            "application/x-zip":            "fa-file-archive-o",
            "application/gzip":             "fa-file-archive-o",

            "application/json":             "fa-file-code-o",
            "application/javascript":       "fa-file-code-o",
            "text/html":                    "fa-file-code-o",
            "text/css":                     "fa-file-code-o",
            "text/plain":                   "fa-file-text-o",
            "text/javascript":              "fa-file-text-o",
            "text/csv":                     "fa-file-text-o",
            "text/markdown":                "fa-file-text-o",
            "text/xml":                     "fa-file-text-o",

            "video/mp4":                    "fa-file-video-o",
            "video/quicktime":              "fa-file-video-o",
            "video/ogg":                    "fa-file-video-o",
        }
    }
};

export default config;
