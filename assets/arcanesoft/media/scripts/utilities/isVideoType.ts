const types = [
    'video/avi',
    'video/ogg',
    'video/mp4',
    'video/mpeg',
    'video/webm',
    'video/quicktime',
]

export default (mimetype: string): boolean => types.includes(mimetype)
