<template>
  <b-container id="profile" fluid>
    <b-row>
      <Header />
    </b-row>
    <b-container id="content">
      <b-row id="content-header">
        <h3 class="sub-section">{{ this.$auth.user.username }}</h3>
      </b-row>
      <b-row id="tabs">
        <b-tabs id="tabs-content" content-class="mt-3" fill>
          <b-tab title="Overview">
            <b-card-group deck>
              <b-card header="Playing Since" align="center">
                <b-card-text>
                  {{ $moment(getUserById(id).createdAt).format("MMM Do YYYY") }}
                </b-card-text>
              </b-card>
              <b-card header="Current Elo" align="center">
                <b-card-text> > 9000 </b-card-text>
              </b-card>
            </b-card-group>
          </b-tab>
          <b-tab title="Match History"></b-tab>
          <b-tab title="Elo" disabled></b-tab>
        </b-tabs>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  methods: {
    getUserById(id) {
      return this.getUsers.find((user) => user.id === id);
    },
  },
};
</script>

<style>
#profile {
  background-color: var(--light);
}

#content {
  background-color: var(--main-bg);
}

#content-header,
#tabs {
  padding: 1em;
}

#tabs-content {
  width: 100%;
}

#tabs-content .nav-link {
  color: var(--dark);
  background-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: var(--accent-light);
}

#tabs-content .active {
  border-bottom-color: var(--main-bg);
  border-top-color: var(--accent-light);
  border-right-color: var(--accent-light);
  border-left-color: var(--accent-light);
}

.card {
  background-color: transparent;
}

.card-header {
  background-color: rgba(0, 0, 0, 0.095);
}
</style>
