<template>
    <div class="login">
        <h3>{{ $ml.get('login') }}</h3>
        <input type="text" :placeholder="$ml.get('user') " v-model="user" @keyup="loginWithEnter"/>
        <input type="password" :placeholder="$ml.get('password') " v-model="pass"  @keyup="loginWithEnter"/>
        <button @click="login()" :disabled="loading" class="is-success">{{ $ml.get('enter') }}</button>
        <router-link to="signup" v-text="$ml.get('signup')" class="signup"/>
        <div v-text="message" v-if="error" class="error"/>
    </div>
</template>

<script>
import LoginService from '../services/LoginService';

export default {
    name: 'Login',
    data() {
        return {
            service: new LoginService(this.$http),
            showRecover: false,
            user: '',
            pass: '',
            error: false,
            message: '',
            loading: false
        }
    },
    methods: {
        loginWithEnter(e) {
            if (e.key == "Enter") {
                this.login();
            }
        },
        login() {
            let credentials = {
                user: this.user,
                password: this.pass
            };

            this.loading = true;

            this.$store.dispatch('login', credentials)
                .then(r => {
                    console.log(r)
                    if (r.statusCode == 200) {
                        this.$router.push({name: 'Home'});
                    } else {
                        this.message = this.$ml.get(e.body.message);
                    }
                })
                .catch(e => {
                    this.message = this.$ml.get(e.body.message);

                    this.error = true;
                })
                .finally(_ => {
                    this.loading = false;
                });
        },
    },
}
</script>
<style lang="scss" scoped>
.login {
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

.signup {
    margin-left: 4px;
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