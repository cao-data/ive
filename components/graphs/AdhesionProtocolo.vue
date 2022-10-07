<template>
  <div class="my-6">
    <div v-if="onlyNacional">
      <div class="tags is-centered">
        <h1 class="title is-4 tag is-rounded is-dark">
          Elija una jurisdicción para ver en detalle
        </h1>
      </div>
      <div class="box">
        <b-table :data="tableData">
          <b-table-column field="jurisdiccion">
            <template #header>
              <b-tooltip :label="'holis'" append-to-body dashed>
                Jurisdiccion
              </b-tooltip>
            </template>
            <template #default="props">
              <a @click="handleChange(props.row)">{{ props.row.jurisdiccion }}</a>
            </template>
          </b-table-column>
          <b-table-column field="adhesion_ile" :label="'Adhesión protocolo nacional ILE'">
            <template #header>
              <b-tooltip :label="'Adhesión protocolo nacional ILE'" append-to-body dashed>
                Adhesión protocolo nacional ILE
              </b-tooltip>
            </template>
            <template #default="props">
              <div v-if="isUrl(props.row.adhesion_ile)">
                <i class="fas fa-check has-text-primary fa-lg" />&nbsp;&nbsp;<a :href="props.row.adhesion_ile" target="_blank" class="is-size-7">Link <i class="fas fa-external-link fa-fw" /></a>
              </div>
              <div v-else-if="props.row.adhesion_ile === 'NO'">
                <i class="fas fa-times has-text-danger fa-lg" /> <span class="is-size-7">NO</span>
              </div>
              <div v-else>
                <i class="fas fa-question has-text-grey-light fa-lg" /> <span class="is-size-7 has-text-grey-light">-Sin datos-</span>
              </div>
            </template>
          </b-table-column>
          <b-table-column field="adhesion_ive" :label="'Adhesión protocolos nacional IVE'">
            <template #header>
              <b-tooltip :label="'Adhesión protocolos nacional IVE'" append-to-body dashed>
                Adhesión protocolos nacional IVE
              </b-tooltip>
            </template>
            <template #default="props">
              <div v-if="isUrl(props.row.adhesion_ive)">
                <i class="fas fa-check has-text-primary fa-lg" />&nbsp;&nbsp;<a :href="props.row.adhesion_ile" target="_blank" class="is-size-7">Link <i class="fas fa-external-link fa-fw" /></a>
              </div>
              <div v-else-if="props.row.adhesion_ive === 'NO'">
                <i class="fas fa-times has-text-danger fa-lg" /> <span class="is-size-7">NO</span>
              </div>
              <div v-else>
                <i class="fas fa-question has-text-grey-light fa-lg" /> <span class="is-size-7 has-text-grey-light">-Sin datos-</span>
              </div>
            </template>
          </b-table-column>
          <b-table-column field="propio_ile" :label="'Protocolo propio ILE'">
            <template #header>
              <b-tooltip :label="'Protocolo propio ILE'" append-to-body dashed>
                Protocolo propio ILE
              </b-tooltip>
            </template>
            <template #default="props">
              <div v-if="isUrl(props.row.propio_ile)">
                <i class="fas fa-check has-text-primary fa-lg" />&nbsp;&nbsp;<a :href="props.row.adhesion_ile" target="_blank" class="is-size-7">Link <i class="fas fa-external-link fa-fw" /></a>
              </div>
              <div v-else-if="props.row.propio_ile === 'NO'">
                <i class="fas fa-times has-text-danger fa-lg" /> <span class="is-size-7">NO</span>
              </div>
              <div v-else>
                <i class="fas fa-question has-text-grey-light fa-lg" /> <span class="is-size-7 has-text-grey-light">-Sin datos-</span>
              </div>
            </template>
          </b-table-column>
          <b-table-column field="propio_ive" :label="'Protocolo propio IVE'">
            <template #header>
              <b-tooltip :label="'Protocolo propio IVE'" append-to-body dashed>
                Protocolo propio IVE
              </b-tooltip>
            </template>
            <template #default="props">
              <div v-if="isUrl(props.row.propio_ive)">
                <i class="fas fa-check has-text-primary fa-lg" />&nbsp;&nbsp;<a :href="props.row.adhesion_ile" target="_blank" class="is-size-7">Link <i class="fas fa-external-link fa-fw" /></a>
              </div>
              <div v-else-if="props.row.propio_ive === 'NO'">
                <i class="fas fa-times has-text-danger fa-lg" /> <span class="is-size-7">NO</span>
              </div>
              <div v-else>
                <i class="fas fa-question has-text-grey-light fa-lg" /> <span class="is-size-7 has-text-grey-light">-Sin datos-</span>
              </div>
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>
    <div v-else>
      <div v-for="jurisdiccionData in selectedData" :key="`adhesion_${jurisdiccionData.id_jurisdiccion}`">
        <div class="tags is-centered">
          <h1 class="title is-4 tag is-rounded is-dark">
            {{ jurisdiccionData.jurisdiccion }}
          </h1>
        </div>
        <div class="columns">
          <div class="column is-6">
            <div class="box is-primary px-4">
              <h1 class="title is-3 has-text-centered">
                IVL
              </h1>
            </div>
            <div class="columns">
              <div class="column is-6">
                <div class="message" :class="getContainerClass(jurisdiccionData.adhesion_ile)">
                  <div class="message-body content has-text-centered">
                    <p class="mb-5">
                      <i class="fas fa-5x" :class="getIconClass(jurisdiccionData.adhesion_ile)" />
                    </p>
                    <p class="title is-700 is-3" v-html="getLabelTextNacional(jurisdiccionData.adhesion_ile)" />
                    <a v-if="isUrl(jurisdiccionData.adhesion_ile)" class="button is-fullwidth" :class="getContainerClass(jurisdiccionData.adhesion_ile)" :href="jurisdiccionData.adhesion_ile" target="_blank">Link al enlace&nbsp;<i class="fas fa-fw fa-external-link" /></a>
                    <button v-else-if="jurisdiccionData.adhesion_ile === null" class="button is-dark" disabled>
                      Sin datos
                    </button>
                    <div v-else>
&nbsp;
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="message" :class="getContainerClass(jurisdiccionData.propio_ile)">
                  <div class="message-body content has-text-centered">
                    <p class="mb-5">
                      <i class="fas fa-5x" :class="getIconClass(jurisdiccionData.propio_ile)" />
                    </p>
                    <p class="title is-700 is-3" v-html="getLabelTextPropio(jurisdiccionData.propio_ile)" />
                    <a v-if="isUrl(jurisdiccionData.propio_ile)" class="button is-fullwidth" :class="getContainerClass(jurisdiccionData.propio_ile)" :href="jurisdiccionData.propio_ile" target="_blank">Link al enlace&nbsp;<i class="fas fa-fw fa-external-link" /></a>
                    <button v-else-if="jurisdiccionData.propio_ile === null" class="button is-dark" disabled>
                      Sin datos
                    </button>
                    <div v-else>
&nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="box is-primary px-4">
              <h1 class="title is-3 has-text-centered">
                IVE
              </h1>
            </div>
            <div class="columns">
              <div class="column is-6">
                <div class="message" :class="getContainerClass(jurisdiccionData.adhesion_ive)">
                  <div class="message-body content has-text-centered">
                    <p class="mb-5">
                      <i class="fas fa-5x" :class="getIconClass(jurisdiccionData.adhesion_ive)" />
                    </p>
                    <p class="title is-700 is-3" v-html="getLabelTextNacional(jurisdiccionData.adhesion_ive)" />
                    <a v-if="isUrl(jurisdiccionData.adhesion_ive)" class="button is-fullwidth" :class="getContainerClass(jurisdiccionData.adhesion_ive)" :href="jurisdiccionData.adhesion_ive" target="_blank">Link al enlace&nbsp;<i class="fas fa-fw fa-external-link" /></a>
                    <button v-else-if="jurisdiccionData.adhesion_ive === null" class="button is-dark" disabled>
                      Sin datos
                    </button>
                    <div v-else>
&nbsp;
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="message" :class="getContainerClass(jurisdiccionData.propio_ive)">
                  <div class="message-body content has-text-centered">
                    <p class="mb-5">
                      <i class="fas fa-5x" :class="getIconClass(jurisdiccionData.propio_ive)" />
                    </p>
                    <p class="title is-700 is-3" v-html="getLabelTextPropio(jurisdiccionData.propio_ive)" />
                    <a v-if="isUrl(jurisdiccionData.propio_ive)" class="button is-fullwidth" :class="getContainerClass(jurisdiccionData.propio_ive)" :href="jurisdiccionData.propio_ive" target="_blank">Link al enlace&nbsp;<i class="fas fa-fw fa-external-link" /></a>
                    <button v-else-if="jurisdiccionData.propio_ive === null" class="button is-dark" disabled>
                      Sin datos
                    </button>
                    <div v-else>
&nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

    }
  },
  computed: {
    selected () {
      return this.$store.state.map.selected
    },
    onlyNacional () {
      return this.selected.includes('nacional')
    },
    mapStates () {
      return this.$store.state.map.list
    },
    selectedData () {
      return this.data.values.filter(d => this.selected.includes(d.id_jurisdiccion))
    },
    tableData () {
      return this.data.values
    }
  },
  methods: {
    handleChange (jurisdiccion) {
      this.$gtag.event('change_juridiccion', {
        event_category: 'graph',
        event_label: jurisdiccion.id_jurisdiccion
      })
      this.$gtag.event('interact', {
        event_category: 'graph',
        event_label: 'table_adhesion_protocolo'
      })
      this.$store.dispatch('map/setSelected', jurisdiccion.id_jurisdiccion)
    },
    getContainerClass (data) {
      if (data === 'NO') {
        return 'is-danger'
      } else if (this.isUrl(data)) {
        return 'is-primary'
      } else {
        return 'is-light-dark'
      }
    },
    getIconClass (data) {
      if (data === 'NO') {
        return 'fa-times-circle has-text-danger'
      } else if (this.isUrl(data)) {
        return 'fa-check-circle has-text-primary'
      } else {
        return 'fa-question-circle has-text-light-dark'
      }
    },
    getLabelTextNacional (data) {
      if (data === 'NO') {
        return '<u>NO</u> adherido al protocolo nacional'
      } else if (this.isUrl(data)) {
        return 'Adherido al protocolo nacional'
      } else {
        return 'Adherido al protocolo nacional'
      }
    },
    getLabelTextPropio (data) {
      if (data === 'NO') {
        return '<u>SIN</u> protocolo propio'
      } else if (this.isUrl(data)) {
        return 'Con protocolo propio'
      } else {
        return 'Con protocolo propio'
      }
    },
    // return true if string is an url
    isUrl (string) {
      console.log(string)
      try {
        // eslint-disable-next-line no-new
        new URL(string)
        return true
      } catch (_) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid #d4d4d4;
}
.message, .message-body {
  height: 100%;
  min-height: 290px;
  border-left-width: 6px;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
}
.message-body{
  display:flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
