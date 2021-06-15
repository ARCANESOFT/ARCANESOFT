import MEDIA_TYPES from './enums/MEDIA_TYPES'
import DISPLAY_MODES from './enums/DISPLAY_MODES'

export type MediaItem = {
    type:          MEDIA_TYPES,
    name:          string,
    path:          string,
    url?:          string,
    mimetype?:     string,
    lastModified?: string,
    visibility?:   string,
    size?:         number,
}

export type MediaItems = MediaItem[]

export type DisplayMode = {
    key:     DISPLAY_MODES,
    enabled: boolean,
    title:   string,
    icon:    string,
}
