<template>
  <b-container id="game-container" fluid>
    <Header />
    <b-container id="sub-container">
      <b-row id="game-info-widget" class="text-center py-3">
        <b-col cols="12">
          <h3 class="sub-section">White vs Black</h3>
        </b-col>
        <b-col cols="12">
          <h5 class="sub-section">White to move</h5>
        </b-col>
      </b-row>
      <hr class="rule" />
      <b-row id="active-game-widget" class="text-center" no-gutters>
        <b-col
          id="active-game-board"
          md="7"
          class="d-flex justify-content-center my-3"
        >
          <Game />
        </b-col>
        <b-col
          id="active-game-info"
          md="5"
          class="d-flex justify-content-center my-3"
        >
          <div class="table">
            <table id="active-game-info-header" class="table">
              <thead>
                <tr>
                  <th><h5 style="font-weight: bold">X:</h5></th>
                  <th>
                    <button class="btn btn-sm btn-outline-dark">Concede</button>
                  </th>
                  <th>
                    <button class="btn btn-sm btn-outline-dark">
                      Offer Draw
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
body {
  background-color: var(--light);
}
#sub-container {
  background-color: var(--main-bg);
}
#active-game-container {
  background-color: var(--main-bg);
}
.active-game-table {
  border: none;
}
.active-game-table > thead > tr {
  border: none;
}
.active-game-table > tbody > tr {
  border: none;
}
.active-game-table > * > tr > th,
.active-game-table > * > tr > td {
  border: none;
}
.active-game-table > thead {
  background-color: var(--accent-dark);
}
.active-game-table > tbody {
  background-color: var(--accent-light);
}
#active-game-info-header * {
  background-color: var(--accent-dark);
}
#active-game-table-container {
  height: auto;
  overflow: hidden;
}
</style>
