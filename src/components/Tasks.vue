<template>
  <div class="point">
    <div class="seach">
      <b-field ref="inputSearch" :label="$ml.get('search')">
        <b-input v-model="filterValue" @input.native="filter"></b-input>
      </b-field>
      <b-button @click="novo">+</b-button>
      <!-- <label for="filter">Pesquisar</label>
            <br/>
      <input type="text" class="filter" v-model="filterValue">-->
    </div>
    <b-table :data="data">
      <template slot-scope="props">
        <b-table-column
          v-for="(u, i) in columns"
          :key="i"
          :field="u.field"
          :label="u.field != 'excluir' ? u.label : ''"
          :width="u.width"
          :class="u.field != 'excluir' ? 'td-cell' : 'excluir-field'"
        >
          <div v-if="u.field == 'excluir'" @click="excluir(props.row)">
            <b-button type="is-danger">
              {{ $ml.get("remove") }}
            </b-button>
          </div>
          <div v-else-if="u.field == 'titulo'">
            <router-link
              :to="{ name: 'Edit-Task', params: { id: props.row.id } }"
              >{{ props.row[u.field] }}</router-link
            >
          </div>
          <div v-else-if="u.field == 'dataprevista'">
            {{ props.row[u.field] | moment("L") }}
          </div>
          <div v-else>{{ props.row[u.field] }}</div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import * as Util from "../services/util";

export default {
  data() {
    return {
      filterValue: "",
      data: [],
      columns: [
        {
          field: "titulo",
          label: this.$ml.get("title"),
        },
        {
          field: "dataprevista",
          label: this.$ml.get("dataprevista"),
        },
        {
          field: "excluir",
          label: "",
        },
      ],
      filter: null,
    };
  },
  created() {
    this.data = this.$store.getters.tasks;
    this.filter = Util.debounce(() => {
      if (this.filterValue)
        this.data = this.$store.getters.tasks.filter(
          (t) =>
            t.titulo.toUpperCase().indexOf(this.filterValue.toUpperCase()) >
              -1 ||
            t.descricao.toUpperCase().indexOf(this.filterValue.toUpperCase()) >
              -1
        );
      else this.data = this.$store.getters.tasks;
    }, 500);
  },
  mounted() {
    this.$refs.inputSearch.$el.oninput = this.filter;
  },
  methods: {
    novo() {
      this.$router.push({ name: "Create-Task" });
    },
    excluir(value) {
      this.$dialog.confirm({
        message: this.$ml.get("want-delete"),
        cancelText: this.$ml.get("no"),
        confirmText: this.$ml.get("yes"),
        onConfirm: () => {
          this.$store
            .dispatch("removeTask", value)
            .then((_) => (this.data = this.$store.getters.tasks));
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seach {
  text-align: left;
  padding: 8px;
}
</style>