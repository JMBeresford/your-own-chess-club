<template>
  <div class="container-fluid" id="header">
    <nav class="navbar navbar-expand-md navbar-dark" id="header-nav">
      <a class="navbar-brand font-weight-bold px-2" id="brand-text" href="/">Volcaus Chess Club</a>
      <!-- Links -->

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <div class="mr-auto">
          <ul class="navbar-nav" id="header-items">
            <li class="nav-item">
              <a class="nav-link" href="/match-history">Match History</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/leaderboards">Leaderboards</a>
            </li>
          </ul>
        </div>
        <div v-if="Object.values(user).length > 0">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" id="sign-in-text" href="/signout">Sign Out</a>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/signin">Sign In</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">Register</a>
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
  props: ["user"]
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
    color: var(--main-bg);
  }
</style>