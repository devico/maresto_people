<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <input
            id="name"
            v-model="register.name"
            type="text"
            class="form-control mb-5"
            placeholder="Name"
            required
          />
          <input
            id="email"
            v-model="register.email"
            type="email"
            class="form-control mb-5"
            placeholder="Email"
            required
          />
          <!-- Password -->
          <input
            id="password"
            v-model="register.password"
            type="password"
            class="form-control mb-5"
            placeholder="Password"
          />
          <p>
            Already have an account??
            <router-link to="/">
              click here
            </router-link>
            <!-- Sign in button -->
            <center>
              <button
                class="btn btn-primary btn-block w-75 my-4"
                type="submit"
              >
                Sign in
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post(
          '/user/register',
          this.register
        );
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem('jwt', token);
          this.$router.push('/');
          // swal("Success", "Registration Was successful", "success");
        } else {
          // swal("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        console.log(err.response)
      }
    }
  }
};
</script>
