<template>
  <div>
    Holis
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
    mapStates () {
      return this.$store.state.map.list
    },
    selectedData () {
      return this.data.values.filter(d => this.selected.includes(d.id_jurisdiccion))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
