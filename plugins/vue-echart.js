import Vue from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  PieChart,
  ParallelChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  ParallelComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  ParallelChart,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  ParallelComponent
])

// register globally (or you can do it locally)
Vue.component('VueEchart', ECharts)
