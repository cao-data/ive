<template>
  <div>
    <div class="layout-mapper">
      <mapbox
        ref="theMap"
        :access-token="mapboxApiKey"
        :map-options="mapboxOptions"
        @map-load="loaded"
      />
    </div>
    <h1 class="title is-4 mt-6 mb-5">Jurisdicción seleccionada: <span class="is-700 has-text-primary">{{ mapStates[selected[0]] }}</span></h1>
    <div class="box mb-6">
      <b-table
        :data="tableData"
      >
        <b-table-column field="jurisdiccion">
          <template #header>
            Ubicación
          </template>
          <template #default="props">
            {{ props.row.localidad }}, {{ props.row.jurisdiccion }}, {{ props.row.departamento }}
          </template>
        </b-table-column>
        <b-table-column field="Ubicación">
          <template #header>
            Institución
          </template>
          <template #default="props">
            <a @click="flyTo(props.row.lat_long)"><b>{{ props.row.institucion }}</b></a><br>
            {{ props.row.direccion || '- Sin Dato -' }}
          </template>
        </b-table-column>
        <b-table-column field="Teléfono">
          <template #header>
            Teléfono
          </template>
          <template #default="props">
            {{ props.row.telefono || '- Sin Datos -' }}
          </template>
        </b-table-column>
        <b-table-column field="Horario">
          <template #header>
            Horario
          </template>
          <template #default="props">
            {{ props.row.horario || '- Sin Datos -' }}
          </template>
        </b-table-column>
        <b-table-column field="Horario">
          <template #header>
            Contacto
          </template>
          <template #default="props">
            <u>Email</u>: {{ props.row.email || '- Sin Datos -' }}<br>
            <u>Whatsapp</u>: {{ props.row.whatsapp || '- Sin Datos -' }}
          </template>
        </b-table-column>
        <!-- when empty, show a warning -->
        <template #empty>
          <div class="has-text-centered">
            <p>
              No hay datos para mostrar
            </p>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Mapbox from 'mapbox-gl-vue'

export default {
  components: { Mapbox },
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
      currentMarkers: [],
      tableData: []
    }
  },
  computed: {
    selected () {
      return this.$store.state.map.selected
    },
    mapStates () {
      return this.$store.state.map.list
    },
    selectedData () {
      return this.data.values.filter(d => this.selected.includes(d.id_jurisdiccion))
    },
    mapboxApiKey () {
      return process.env.mapboxApiKey
    },
    mapboxOptions () {
      return {
        style: process.env.mapboxMapStyle,
        center: [process.env.mapCenterLongitude, process.env.mapCenterLatitude],
        zoom: process.env.mapZoomDefault
      }
    },
    extraHeaders () {
      if (!this.data) { return [] }
      const noExtra = ['nro_orden', 'codigo', 'id_jurisdiccion', 'jurisdiccion_grafico', 'lat_long']
      const extraHeaders = this.data.keys.filter((x) => {
        return !noExtra.includes(x)
      })
      return extraHeaders
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.reloadMap()
      }
    }
  },
  methods: {
    loaded (map) {
      this.prepareChart(map)
    },
    flyTo (latLong) {
      const coordinates = latLong.split(', ')
      this.$refs.theMap.map.flyTo({
        center: [coordinates[1], coordinates[0]],
        zoom: 15
      })
    },
    reloadMap () {
      // clear markers
      this.currentMarkers.forEach((marker) => {
        marker.remove()
      })
      this.currentMarkers = []
      // add markers
      this.prepareChart(this.$refs.theMap.map)
    },
    prepareChart (map) {
      // clear map
      let _copyData
      // No matter the mode, if it is just nacional, show every jurisdiccion
      if ((this.selected.length === 1 && this.selected[0] !== 'nacional') || this.selected.length > 1) {
        // If the graph needs to include nacional, just put everything.
        _copyData = JSON.parse(JSON.stringify(this.data.values.filter(jurisdiccionData => this.selected.includes(jurisdiccionData.id_jurisdiccion))))
      } else {
        _copyData = JSON.parse(JSON.stringify(this.data.values))
      }
      this.tableData = _copyData
      // iterate through your table to set the marker to lat/long values for each row
      _copyData.forEach((row) => {
        if (row.lat_long === '' || row.lat_long === '-') {
          return
        }
        // Create the Title
        let str = `<h3>${row.institucion}</h3>`
        str += '<div class="the-marker-content">'
        this.extraHeaders.forEach((header) => {
          if (header === 'Latitud y Longitud') {
            return
          }
          str += `<p class="data-title">${this.data.labels[header]}</p><p class="data-text">${row[header] || '<i>- No Data -</i>'}</p>`
        })
        str += '</div>'
        // create a variable for your popup for the current event
        const popup = new mapboxgl.Popup().setHTML(str) // use the table to populate your popup with text
        const coordinates = row.lat_long.split(', ')
        // create the dot
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.style.background = '#000'
        el.style['border-radius'] = '40px'
        el.style.border = '2px solid #FFFFFF'
        el.style.width = '16px'
        el.style.height = '16px'
        // create a variable for your markup and add it to the map
        const marker = new mapboxgl.Marker(el)
          .setLngLat([coordinates[1], coordinates[0]])
          .setPopup(popup)
          .addTo(map) // add the marker to the map
        this.currentMarkers.push(marker)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-mapper {
  // background-color: #2a2b33;
  height: 70vh
}
.mapboxgl-map {
  height: 100%;
}
</style>
