<template>
  <b-navbar
    type="is-primary"
    :shadow="true"
  >
    <!-- <template #brand>
      <b-navbar-item>
        <i class="fas fa-chart-pie" />
      </b-navbar-item>
    </template> -->
    <template #brand>
      <b-navbar-item @click="setChapter(null)">
        <img src="@/assets/logo-white.png" alt="IVE">
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-dropdown :label="selectedLabel" :collapsible="true">
        <b-navbar-item v-for="(state,index) in mapStates" :key="`nav-${index}`" :active="selected.includes(index)" @click="changeSelected(index)">
          {{ state }}
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown :label="getChapterLabel" :collapsible="true">
        <b-navbar-item v-for="(chapterx,index) in chapters" :key="`nav-chapters-${index}`" @click="setChapter(chapterx)">
          {{ chapterx }}
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item v-if="isLoading">
        Cargando! <i class="fas fa-spin fa-sync" />
      </b-navbar-item>
      <b-navbar-item v-if="proMode" tag="div">
        Modo Pro&nbsp;<i class="fas fa-hand-spock fa-lg" />
      </b-navbar-item>
      <!-- <b-navbar-dropdown :label="'Modo'" :collapsible="true">
        <b-navbar-item @click="setProMode(false)">
          Modo Simple
        </b-navbar-item>
        <b-navbar-item @click="setProMode(true)">
          Modo Diego&nbsp;<i class="fas fa-hand-spock fa-lg" />
        </b-navbar-item>
      </b-navbar-dropdown> -->
      <b-navbar-dropdown :label="'Columnas'" :collapsible="true">
        <b-navbar-item @click="changeColumns(12)">
          Ancho completo
        </b-navbar-item>
        <b-navbar-item @click="changeColumns(6)">
          Dos Columnas
        </b-navbar-item>
        <b-navbar-item @click="changeColumns(4)">
          Tres columnas
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    selected () {
      return this.$store.state.map.selected
    },
    selectedLabel () {
      if (this.selected.length === 0) {
        return 'Seleccionar'
      } else if (this.selected.length === 1) {
        return this.mapStates[this.selected[0]]
      } else {
        return `${this.selected.length} seleccionados`
      }
    },
    getChapterLabel () {
      if (this.chapter === null) {
        return 'Seleccione un tema'
      } else {
        return this.chapter
      }
    },
    mapStates () {
      return this.$store.state.map.list
    },
    chapters () {
      return this.$store.state.data.chapters
    },
    chapter () {
      return this.$store.state.data.chapter
    },
    isLoading () {
      return this.$store.state.data.isLoading
    },
    proMode () {
      return this.$store.state.system.proMode
    }
  },
  methods: {
    changeSelected (juridiccion) {
      this.$gtag.event('change_juridiccion', {
        event_category: 'navbar',
        event_label: juridiccion
      })
      this.$store.dispatch('map/setSelected', juridiccion)
    },
    changeColumns (columns) {
      this.$store.commit('system/setColumns', columns)
    },
    setChapter (chapter) {
      this.$gtag.event('change_chapter', {
        event_category: 'navbar',
        event_label: chapter
      })
      this.$store.commit('data/setChapter', chapter)
    },
    setProMode (val) {
      this.$store.dispatch('system/setProMode', val)
    }
  }
}
</script>
