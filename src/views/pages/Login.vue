<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Bienvenue à COD app! 👋🏻
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Mot de passe oublié?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="submit"
            >
              Connexion
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline

export default {
  name: 'Login',

  data() {
    return {
      validation_errors: {
        login: null,
        password: null,
      },
      email: 'admin@gmail.com',
      password: '123456',
    }
  },
  mounted() {
  },
  methods: {
    submit() {
      console.log('tsett')
      // eslint-disable-next-line prefer-destructuring
      const email = this.email
      // eslint-disable-next-line prefer-destructuring
      const password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          console.log(err)
          this.validation_errors = err.response.data.errors
        })
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
