import TuiEditor from './forms/tui-editor/editor'
import TuiViewer from './forms/tui-editor/viewer'
import RatingInput from './forms/rating/input'
import SidebarToggler from './navbar/togglers/sidebar'
import SkinModeToggler from './navbar/togglers/skin-mode'
import NavbarNotifications from './navbar/notifications'
import Datatable from './datatable'
import ToastsManager from './toasts/manager'
import Metric from './metrics'

export default [
    // Navbar
    NavbarNotifications,
    SidebarToggler,
    SkinModeToggler,

    // Inputs
    RatingInput,
    TuiEditor,
    TuiViewer,

    // Misc
    Metric,
    Datatable,
    ToastsManager,
]
