<template>
  <div class="container-fluid" id="header">
    <nav class="navbar navbar-expand-md navbar-dark" id="header-nav">
      <a class="navbar-brand font-weight-bold px-2" id="brand-text" >Volcaus Chess Club</a>
      <!-- Links -->

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <div v-if="Object.values(this.user).length > 0">
          <ul class="navbar-nav" id="header-items">
            <li class="nav-item">
              <a class="nav-link disabled">Match History</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Leaderboards</a>
            </li>
          </ul>
        </div>

        <!-- Sign In/Out divs -->
        <div v-if="Object.values(user).length > 0" class="ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a @click.prevent="signOut()" class="nav-link" id="sign-in-text">
                Sign Out
              </a>
            </li>
          </ul>
        </div>
        <div v-else class="ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a @click.prevent="showSignIn()" class="nav-link">Sign In</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Register</a>
            </li>
          </ul>
        </div>


      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ["user"],
  data() {
    return {
      signingIn: false,
      registering: false
    }
  },
  methods: {
    signOut() {
      this.$emit('sign-out');
    },
    signIn() {
      this.signingIn = true;
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>
  #header {
    background-color: var(--dark);
  }

  #brand-text {
    border-radius: 10px;
    background-color: var(--accent-dark);
  }

  .nav-link {
    border-radius: 10px;
    color: var(--main-bg);
  }
  
  .nav-link:hover {
    transition: 0.25s ease;
    background-color: var(--light);
  }
</style>