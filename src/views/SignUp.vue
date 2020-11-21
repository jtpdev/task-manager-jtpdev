<template>
    <div class="signup">
        <h3>{{ $ml.get('signup') }}</h3>
        <input type="text" :placeholder="$ml.get('name') " v-model="user"/>
        <input type="text" :placeholder="$ml.get('user') " v-model="user"/>
        <input type="password" :placeholder="$ml.get('password') " v-model="pass"/>
        <router-link to="login" tag="button" v-text="$ml.get('done')"/>
    </div>
</template>

<script>
export default {
    name: 'signup',
    data() {
        return {
            name: '',
            user: '',
            pass: '',
            error: false,
            message: '',
            loading: false
        }
    },
}
</script>
<style lang="scss" scoped>
.signup {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
  display: block;
  margin: auto;
  height: 30px;
  border-radius: 4px;
  margin-top: 8px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
  a {
    text-decoration: underline;
    cursor: pointer;
  }
}

.error {
    color: red;
    padding: 16px;
}

@media screen and (max-width: 768px){
  input {
    width: 98%;
  }
  button {
    width: 98%;
  }
}
</style>