<template>
  <section class="cad">
    <form
      class="columns is-1 is-variable columns is-multiline"
      @submit.prevent="validateBeforeSubmit"
    >
      <h1 class="column is-full">{{ $ml.get("task") }}</h1>

      <b-field
        :label="$ml.get('title')"
        class="column is-half"
        :type="{ 'is-danger': errors.has('titulo') }"
        :message="errors.first('titulo') ? $ml.get('required-field') : ''"
      >
        <b-input v-model="task.titulo" name="titulo" v-validate="'required'" />
      </b-field>
      <b-field
        :label="$ml.get('dataprevista')"
        class="column is-half"
        :type="{ 'is-danger': errors.has('dataprevista') }"
        :message="errors.first('dataprevista') ? $ml.get('required-field') : ''"
      >
        <b-datepicker
          v-model="task.dataprevista"
          name="dataprevista"
          :min-date="minDate"
          v-validate="'required'"
        >
        </b-datepicker>
      </b-field>
      <b-field
        :label="$ml.get('description')"
        class="column is-full"
      >
        <b-input v-model="task.descricao" 
            name="titulo"
            maxlength="200"
            type="textarea" />
      </b-field>
      <button type="submit" class="button is-success save-btn">Salvar</button>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      task: {},
      minDate: new Date(),
    };
  },
  created() {
    if (this.id) {
      let loadedTask = this.$store.getters.tasks.filter(
        (t) => t.id == this.id
      )[0];
      if (loadedTask) {
        loadedTask.dataprevista = new Date(loadedTask.dataprevista);
        this.task = loadedTask;
      }
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch("saveTask", this.task).then((v) => {
            this.$snackbar.open({
              message: this.$ml.get("successfully-saved"),
              type: "is-success",
              position: "is-bottom",
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 300);
          });
          return;
        }
        this.$snackbar.open({
          message: this.$ml.get("fields-requireds"),
          type: "is-danger",
          position: "is-bottom",
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.cad {
  margin: 0 4px;
}
h1 {
  display: inline;
  margin-right: 8px !important;
}
.save-btn {
    margin-left: 8px;
}
</style>
