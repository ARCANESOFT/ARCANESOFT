import Datatable from './wire/datatable'
import ToastsManager from './toasts/manager'
import Metric from './metrics'
import TuiEditor from './forms/tui-editor/editor'
import TuiViewer from './forms/tui-editor/viewer'
import RatingInput from './forms/rating/input'
import SidebarToggler from './navbar/togglers/sidebar'
import SkinModeToggler from './navbar/togglers/skin-mode'
import FullscreenToggler from './navbar/togglers/fullscreen'
import NavbarNotifications from './navbar/notifications'

export default [
    Datatable,
    ToastsManager,

    // Navbar
    NavbarNotifications,
    FullscreenToggler,
    SidebarToggler,
    SkinModeToggler,

    // Inputs
    RatingInput,
    TuiEditor,
    TuiViewer,

    Metric,
]
