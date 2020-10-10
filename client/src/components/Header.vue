<template>
  <div class="container-fluid" id="header">
    <nav class="navbar navbar-expand-md navbar-dark" id="header-nav">
      <router-link to="/" class="navbar-brand font-weight-bold px-2" id="brand-text" >Volcaus Chess Club</router-link>
      <!-- Links -->

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <div v-if="getUser.id.length > 0">
          <ul class="navbar-nav" id="header-items">
            <li class="nav-item">
              <router-link to="/game" class="nav-link">Match History</router-link>
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
        <div v-if="(getUser.id).length > 0" class="ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a @click.prevent="doSignOut()" class="nav-link" id="sign-out-text">
                Sign Out
              </a>
            </li>
            <li>
              <a id="nav-user-name" class="nav-link btn px-5">{{getUser.username}}</a>
            </li>
          </ul>
        </div>
        <div v-else class="ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a @click="clear()" data-toggle="modal" data-target="#sign-in-modal" class="nav-link">Sign In</a>
            </li>
            <li class="nav-item">
              <a @click="clear()" data-toggle="modal" data-target="#register-modal" class="nav-link">Register</a>
            </li>
          </ul>
        </div>

        
      </div>
    </nav>
    <!-- Modals -->
    <div id="sign-in-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="sign-in-modal-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="sub-section modal-title" id="sign-in-modal-title">Sign In</h5>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group px-3">
                <input v-model="username" name="username" type="text" class="form-control" placeholder="Username">
              </div>
              <div class="form-group px-3">
                <input v-model="password" name="password" type="password" class="form-control" placeholder="Password">
              </div>
              <button @click="signIn({username, password})" type="submit" data-dismiss="modal" id="sign-in-button" class="btn">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div id="register-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="sign-in-modal-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="sub-section modal-title" id="register-modal-title">Register</h5>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group px-3">
                <input v-model="username" name="username" type="text" class="form-control" placeholder="Username">
              </div>
              <div class="form-group px-3">
                <input v-model="passwordInitial" name="passwordInitial" type="password" class="form-control" placeholder="Password">
              </div>
              <div class="form-group px-3">
                <input v-model="passwordConfirmation" name="passwordConfirmation" type="password" class="form-control" placeholder="Confirm Password">
              </div>
              <button @click="register({username,pass1: passwordInitial,pass2: passwordConfirmation})"
              type="submit" data-dismiss="modal" id="register-button" class="btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      username: "",
      passwordConfirmation: "",
      passwordInitial: "",
      password: ""
    }
  },
  methods: {
    ...mapActions(['signIn','signOut','register']),
    clear() {
      this.username = "";
      this.passwordInitial = "";
      this.passwordConfirmation = "";
      this.password = "";
    },
    doSignOut() {
      sessionStorage.clear();
      this.signOut();
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
}
</script>

<style scoped>
  #header {
    background-color: var(--dark);
    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.75);
  }

  #brand-text {
    border-radius: 10px;
    background-color: var(--accent-dark);
  }

  #brand-text:hover {
    transition: 0.5s ease;
    background-color: var(--accent-light);
  }

  .modal-header, .modal-body, .modal-footer {
    background-color: var(--main-bg);
  }

  #sign-in-button {
    background-color: var(--accent-dark);
  }

  #sign-in-button:hover {
    background-color: var(--accent-light);
  }

  #register-button {
    background-color: var(--accent-dark);
  }

  #register-button:hover {
    background-color: var(--accent-light);
  }

  #nav-user-name {
    color: var(--main-bg);
    background-color: var(--light);
    border-radius: 10px;
  }

  .nav-link:not(#nav-user-name){
    border-radius: 10px;
    color: var(--main-bg);
  }
  
  .nav-link:hover {
    transition: 0.25s ease;
    background-color: var(--light);
  }
</style>