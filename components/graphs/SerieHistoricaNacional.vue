<template>
  <VueEchart v-if="graphReady" class="chart" :option="chartOptions" :autoresize="true" />
</template>

<script>
export default {
  name: 'SerieHistoricaNacional',
  props: {
    data: {
      type: Object,
      required: true
    },
    graph: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // colors: [
      //   '#b4acd1',
      //   '#aaa1cb',
      //   '#a196c5',
      //   '#978bbf',
      //   '#8d80b9',
      //   '#8375b3',
      //   '#796aad',
      //   '#705fa7',
      //   '#67579e',
      //   '#605193',
      //   '#594b88',
      //   '#52457d',
      //   '#4b3f72',
      //   '#433967',
      //   '#3c335c',
      //   '#352d51',
      //   '#2e2746',
      //   '#27213b',
      //   '#201b31',
      //   '#191526'
      // ],
      chartOptions: {
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 0,
        //   inRange: {
        //     colorAlpha: [0.1, 1]
        //   }
        // },
        // tooltip: {
        //   padding: [4, 10],
        //   borderWidth: 0,
        //   textStyle: {
        //     fontFamily: 'Encode Sans',
        //     fontSize: 12,
        //     color: '#FFF'
        //   },
        //   backgroundColor: '#9283BE',
        //   extraCssText: 'box-shadow: none;',
        //   formatter: (a) => {
        //     // console.log()
        //     return `<p class="has-text-centered has-text-weight-bold">${a.data.name}</p><p class="has-text-centered">${a.percent} %</p>`
        //   }
        // },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        // color: [
        //   '#b4acd1',
        //   '#aaa1cb',
        //   '#a196c5',
        //   '#978bbf',
        //   '#8d80b9',
        //   '#8375b3',
        //   '#796aad',
        //   '#705fa7',
        //   '#67579e',
        //   '#605193',
        //   '#594b88',
        //   '#52457d',
        //   '#4b3f72',
        //   '#433967',
        //   '#3c335c',
        //   '#352d51',
        //   '#2e2746',
        //   '#27213b',
        //   '#201b31',
        //   '#191526'
        // ],
        animation: true,
        animationDuration: 7000,
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontFamily: 'Encode Sans',
            fontSize: 14
            // color: '#FFF'
          },
          backgroundColor: '#f5f5f5',
          borderWidth: 0,
          extraCssText: 'box-shadow: none;'
        },
        // tooltip: {
        //   trigger: 'axis',
        //   padding: [4, 10],
        //   textStyle: {
        //     fontFamily: 'Encode Sans',
        //     fontSize: 14,
        //     color: '#FFF'
        //   },
        //   backgroundColor: '#9283BE',
        //   borderWidth: 0,
        //   extraCssText: 'box-shadow: none;',
        //   formatter: (a) => {
        //     if (this.selected.length === 1 && this.selected.includes('nacional')) {
        //       return `<p class="has-text-centered has-text-weight-bold my-0">${a[0].name}</p><p class="has-text-centered my-0">${a[0].value} %</p>`
        //     } else if (this.proMode) {
        //       return `<p class="has-text-centered has-text-weight-bold">${a[0].name}</p><p class="has-text-centered">${a[0].value} %</p>`
        //     } else if (this.selected.includes(a[0].data.id_jurisdiccion)) {
        //       return `<p class="has-text-centered has-text-weight-bold">${a[0].name}</p><p class="has-text-centered">${a[0].value} %</p>`
        //     } else {
        //       return null
        //     }
        //   }
        // },
        // color: '#8D80B9',
        // aria: {
        //   enabled: true,
        //   decal: {
        //     show: true
        //   }
        // },
        // grid: {
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          axisLabel: {
            fontFamily: 'Encode Sans'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontFamily: 'Encode Sans'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              title: 'Guardar'
            }
          }
        },
        series: []
      },
      graphReady: false
    }
  },
  computed: {
    selected () {
      return this.$store.state.map.selected
    },
    selectedData () {
      return this.data.values.filter(d => this.selected.includes(d.jurisdiccion))
    },
    proMode () {
      return this.$store.state.system.proMode
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.prepareChart()
      }
    }
  },
  mounted () {
    this.prepareChart()
  },
  methods: {
    handleChartClickEvent (event) {
      if (!this.proMode) {
        if (event.data && event.data && event.data.id_jurisdiccion) {
          this.$gtag.event('change_juridiccion', {
            event_category: 'graph',
            event_label: event.data.id_jurisdiccion
          })
          this.$gtag.event('interact', {
            event_category: 'graph',
            event_label: 'serie_historica_nacional'
          })
          this.$store.dispatch('map/setSelected', event.data.id_jurisdiccion)
        }
      }
    },
    prepareChart () {
      this.createSerie()
    },
    prepareData () {
      const _theData = {
        series: [],
        xValues: []
      }
      _theData.xValues = this.data.values.map(d => d.ano)
      const seriesNames = this.graph.grafico_valor.split(',')
      // const seriesLabels = seriesNames.map(column => this.theData.labels[column])
      const series = seriesNames.map((name) => {
        return {
          name: this.data.labels[name],
          type: 'line',
          data: this.data.values.map(d => d[name])
        }
      })
      _theData.series = series
      return _theData
    },
    createSerie () {
      // const serie = {
      //   // name: this.data.labels[this.graph.grafico_valor],
      //   type: 'bar',
      //   data: [],
      //   label: {
      //     show: true,
      //     position: 'right',
      //     textStyle: {
      //       fontFamily: 'Encode Sans',
      //       fontSize: 10
      //     }
      //   },
      //   showBackground: true,
      //   backgroundStyle: {
      //     color: 'rgba(180, 180, 180, 0.2)'
      //   }
      // }
      const theData = this.prepareData()
      this.chartOptions.color = this.graph.serie_color.split(',')
      this.chartOptions.xAxis.data = theData.xValues
      this.chartOptions.series = theData.series
      this.chartOptions.legend = {
        show: true,
        top: 'bottom',
        left: 'center',
        textStyle: {
          fontFamily: 'Encode Sans',
          fontSize: 10
        }
      }
      this.graphReady = true
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  min-height: 800px;
}
</style>
