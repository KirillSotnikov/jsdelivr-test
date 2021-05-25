<template>
  <v-app>
    <div class="test">
      <a href="" class="link">111</a>
    </div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="search">
        <input class="search_input" type="text" v-model="searchValue" placeholder="Value... ">
        <button class="search_button">Find</button>
      </div>
    </v-app-bar>

    <v-main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                №
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Type
              </th>
              <th class="text-left">
                Hits
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in packages"
              :key="item.id"
              @click="dialogItemId = item.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.hits }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card v-if="dialogPackage">
          <v-card-title class="headline grey lighten-2">
            {{dialogPackage.name}}
          </v-card-title>

          <v-card-text class="pt-3">
            <pre>{{dialogPackage}}</pre>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
    searchValue: '',
    dialogItemId: null,
  }),
  computed: {
    dialogPackage() {
      return this.dialogItemId
        ? this.$store.getters.getPackageById(this.dialogItemId)
        : null;
    },
    dialog: {
      get() {
        return !!this.dialogItemId;
      },
      set() {
        this.dialogItemId = null;
      }
    },
    packages() {
      return this.$store.getters.getPackages;
    }
  },
  async mounted() {
    this.$store.dispatch('fetchPackages', { limit: 10, page: 1 });
  }
};
</script>

<style lang="scss" scoped>
  .search{
    position: relative;
    border: 1px solid #fff;
    border-radius: 8px;
    max-width: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;

    &_input{
      color: #fff;
      outline: none;
      width: 100%;
      padding: 5px 10px;

      &::placeholder{
        color: rgba(255, 255, 255, 0.6);
      }
    }

    &_button {
      height: 100%;
      display: flex;
      align-items: center;
      color: #1976d2;
      background: #fff;
      padding: 5px 10px;
    }
  }
</style>