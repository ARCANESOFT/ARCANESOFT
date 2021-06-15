import DISPLAY_MODES from '../enums/DISPLAY_MODES'

export default [
    {
        key:     DISPLAY_MODES.GRID,
        enabled: true,
        title:   'Grid',
        icon:    'fas fa-fw fa-th-list',
    },
    {
        key:     DISPLAY_MODES.LIST,
        enabled: true,
        title:   'List',
        icon:    'fas fa-fw fa-list',
    },
    {
        key:     DISPLAY_MODES.ICONS,
        enabled: true,
        title:   'Icons',
        icon:    'fas fa-fw fa-th',
    },
    {
        key:     DISPLAY_MODES.THUMBNAILS,
        enabled: true,
        title:   'Thumbnails',
        icon:    'fas fa-fw fa-th-large',
    },
]
