import Datatable from './wire/datatable'
import ToastsManager from './toasts/manager'
import Metric from './metrics'
// import Metric, { ValueMetric, TrendMetric, RangedValueMetric, PartitionMetric } from './metrics'
import TuiEditor from './forms/tui-editor/editor'
import TuiViewer from './forms/tui-editor/viewer'
import RatingInput from './forms/rating/input'
import SidebarToggler from './navbar/togglers/sidebar'
import SkinModeToggler from './navbar/togglers/skin-mode'
import FullscreenToggler from './navbar/togglers/fullscreen'
import NavbarNotifications from './navbar/notifications/notifications'

export default {
    'v-datatable':              Datatable,
    'v-toasts-manager':         ToastsManager,

    // Navbar
    'v-navbar-notifications':   NavbarNotifications,
    'v-fullscreen-toggler':     FullscreenToggler,
    'v-sidebar-toggler':        SidebarToggler,
    'v-skin-mode-toggler':      SkinModeToggler,

    // Inputs
    'v-rating-input':           RatingInput,
    'v-markdown-editor':        TuiEditor,
    'v-markdown-viewer':        TuiViewer,

    'v-metric':                 Metric,
    // 'v-ranged-value-metric':    RangedValueMetric,
    // 'v-trend-metric':           TrendMetric,
    // 'v-partition-metric':       PartitionMetric,
    // 'v-value-metric':           ValueMetric,
}
