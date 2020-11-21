<template>
  <div class="header">
    <div class="header-container">
      <div class="header-wrapper">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </div>
    </div>
    <div class="header-container">
      <b-button class="logout" type="is-danger" @click="logout" outlined>
        {{ $ml.get("logout") }}
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout").then((r) => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: 50px;
  display: flex;
  background-color: white;
  justify-content: space-between;
  .header-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 0.5em;
    .header-wrapper {
      display: flex;
      .logo img {
        height: 36px;
      }
    }
    .logout {
        margin-right: 8px;
    }
  }
}
</style>