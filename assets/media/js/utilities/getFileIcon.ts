export default (mimetype: string) => {
    switch (mimetype) {
        // Image types
        case 'image/gif':
        case 'image/jpeg':
        case 'image/png':
        case 'image/webp':
        case 'image/svg+xml':
        case 'image/svg':
        case 'image/x-icon':
            return 'fas fa-fw fa-file-image'

        // Audio Types
        case 'audio/wave':
        case 'audio/wav':
        case 'audio/x-wav':
        case 'audio/x-pn-wav':
        case 'audio/webm':
        case 'audio/ogg':
        case 'application/ogg':
            return 'fas fa-fw fa-file-audio'

        // Video types
        case 'video/avi':
        case 'video/ogg':
        case 'video/mp4':
        case 'video/mpeg':
        case 'video/webm':
        case 'video/quicktime':
            return 'fas fa-fw fa-file-video'

        // PDF
        case 'application/pdf':
            return 'fas fa-fw fa-file-pdf'

        // MS PowerPoint
        case 'application/mspowerpoint':
        case 'application/powerpoint':
        case 'application/vnd.ms-powerpoint':
        case 'application/x-mspowerpoint':
            return 'fas fa-fw fa-file-powerpoint'

        // MS Word
        case 'application/msword':
            return 'fas fa-fw fa-file-word'

        case 'application/excel':
        case 'application/x-excel':
        case 'application/x-msexcel':
        case 'application/vnd.ms-excel':
            return 'fas fa-fw fa-file-excel'

        // Zip Files
        case 'application/x-compressed':
        case 'application/x-zip-compressed':
        case 'application/zip':
        case 'multipart/x-zip':
            return 'fas fa-fw fa-file-archive'

        default:
            return 'fas fa-fw fa-file'
    }
}
