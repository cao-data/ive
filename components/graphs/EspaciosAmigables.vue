<template>
  <div>
    <div class="layout-mapper">
      <div id="map" />
    </div>
    <h1 class="title is-4 mt-6 mb-5">
      Jurisdicción seleccionada: <span class="is-700 has-text-primary">{{ mapStates[selected[0]] }}</span>
    </h1>

    <div class="box mb-6">
      <b-field grouped>
        <b-field label="Filtrar por Jurisdicción" expanded>
          <b-select v-model="jurisdiccionSelected" :placeholder="filterJurisdiccionPlaceholder" expanded :disabled="jurisdiccionOptions.length === 0" @input="selectJurisdiccion">
            <option
              v-for="option in jurisdiccionOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Filtrar por Localidad" expanded>
          <b-select v-model="localidadSelected" :placeholder="filterLocalidadPlaceholder" expanded :disabled="jurisdiccionSelected === null || localidadOptions.length === 0" @input="selectLocalidad">
            <option
              v-for="option in localidadOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Filtrar por Departamento" expanded>
          <b-select v-model="departamentoSelected" :placeholder="filterDepartamentoPlaceholder" expanded :disabled="localidadSelected == null || departamentoOptions.length === 0" @input="selectDepartamento">
            <option
              v-for="option in departamentoOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </b-select>
        </b-field>
      </b-field>
      <hr>
      <b-table
        :data="filteredTableData"
        paginated
        :per-page="10"
        :current-page="1"
      >
        <b-table-column field="jurisdiccion">
          <template #header>
            Ubicación
          </template>
          <template #default="props">
            {{ props.row.jurisdiccion }}, {{ props.row.localidad }}, {{ props.row.departamento }}
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
export default {
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
      map: null,
      currentMarkers: [],
      tableData: [],
      jurisdiccionSelected: null,
      localidadSelected: null,
      departamentoSelected: null
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
    extraHeaders () {
      if (!this.data) { return [] }
      const noExtra = ['nro_orden', 'codigo', 'id_jurisdiccion', 'jurisdiccion_grafico', 'lat_long']
      const extraHeaders = this.data.keys.filter((x) => {
        return !noExtra.includes(x)
      })
      return extraHeaders
    },
    filteredTableData () {
      if (this.jurisdiccionSelected === null) { return this.tableData }
      if (this.localidadSelected === null) { return this.tableData.filter(d => d.jurisdiccion === this.jurisdiccionSelected) }
      if (this.departamentoSelected === null) { return this.tableData.filter(d => d.jurisdiccion === this.jurisdiccionSelected && d.localidad === this.localidadSelected) }
      return this.tableData.filter(d => d.jurisdiccion === this.jurisdiccionSelected && d.localidad === this.localidadSelected && d.departamento === this.departamentoSelected)
    },
    jurisdiccionOptions () {
      if (this.tableData.length === 0) { return [] }
      const jurisdicciones = this.tableData.map(d => d.jurisdiccion)
      return [...new Set(jurisdicciones)]
    },
    localidadOptions () {
      if (this.tableData.length === 0) { return [] }
      if (this.jurisdiccionSelected === null) { return [] }
      const localidades = this.tableData.filter(d => d.jurisdiccion === this.jurisdiccionSelected).map(d => d.localidad)
      return [...new Set(localidades)]
    },
    departamentoOptions () {
      if (this.tableData.length === 0) { return [] }
      if (this.localidadSelected === null) { return [] }
      const departamentos = this.tableData.filter(d => d.localidad === this.localidadSelected && d.jurisdiccion === this.jurisdiccionSelected).map(d => d.departamento)
      return [...new Set(departamentos)]
    },
    filterJurisdiccionPlaceholder () {
      if (this.jurisdiccionOptions.length === 0) {
        return 'No hay datos para elegir'
      }
      return 'Filtrar por jurisdicción'
    },
    filterLocalidadPlaceholder () {
      if (this.jurisdiccionSelected === null) {
        return 'Primero elija una jurisdicción'
      }
      if (this.localidadOptions.length === 0) {
        return 'No hay datos para elegir'
      }
      return 'Filtrar por localidad'
    },
    filterDepartamentoPlaceholder () {
      if (this.localidadSelected === null) {
        return 'Primero elija una localidad'
      }
      if (this.departamentoOptions.length === 0) {
        return 'No hay datos para elegir'
      }
      return 'Filtrar por departamento'
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.reloadMap()
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    mapboxgl.accessToken = this.mapboxApiKey
    // eslint-disable-next-line no-undef
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      projection: 'mercator',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: process.env.mapboxMapStyle, // style URL
      center: [process.env.mapCenterLongitude, process.env.mapCenterLatitude], // starting position [lng, lat]
      zoom: process.env.mapZoomDefault // starting zoom
    })
    this.map.on('load', () => {
      this.prepareChart(this.map)
    })
  },
  methods: {
    selectJurisdiccion () {
      this.localidadSelected = null
      this.departamentoSelected = null
    },
    selectLocalidad () {
      this.departamentoSelected = null
    },
    selectDepartamento () {
      // Do nothing
    },
    flyTo (latLong) {
      const coordinates = latLong.split(', ')
      this.map.flyTo({
        center: [coordinates[1], coordinates[0]],
        zoom: 15
      })
    },
    reloadMap () {
      // clear markers
      this.jurisdiccionSelected = null
      this.localidadSelected = null
      this.departamentoSelected = null
      this.currentMarkers.forEach((marker) => {
        marker.remove()
      })
      this.currentMarkers = []
      // add markers
      this.prepareChart(this.map)
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
        // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
        const marker = new mapboxgl.Marker(el)
          .setLngLat([coordinates[1], coordinates[0]])
          .setPopup(popup)
          .addTo(this.map) // add the marker to the map
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
#map { height: 70vh }
</style>
