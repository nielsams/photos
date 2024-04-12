<template>
  <div>
    <h1 class="pageTitle">Photography Portfolio</h1>
    <div class="pageDescription"></div>

    <div v-show="loading" class="loaderIcon"></div>

    <div v-show="albums.length > 0">
      <div class="album-grid-container">
          <div v-for="album in albums" v-bind:key="album.id" 
              v-on:click="openAlbum(album.id, album.name)" 
              class="album-grid-album hover-shadow"
              :style="{ backgroundImage: `url(${album.thumbnails[0].large.url})`}">

            <div class="album-grid-title">{{ album.name }}</div>
          </div>
      </div>

    </div>

    <div v-show="!loading && albums.length <= 0">
    <p>Nothing to show.</p>
    </div>

  </div>
</template>

<script>
import { Constants } from '../utils';
import { EventBus } from "../main"

export default {
  data: function() {
       return {
          albums: [],
          loading: false
       }
    },
  async created() { 
    this.loading = true;
    
    try {
        var albumData = await this.$OnedriveService.listAlbumsAsync();
        this.albums = albumData.value;
    }
    catch (e) {
        EventBus.$emit(Constants.EVENT_ERROR, "There was a problem fetching albums. " + e.message);
    }
    this.loading = false;
  },
  methods: { 
    openAlbum(albumId, albumName) {
      this.$router.push({ name: 'albumById', params: { albumId: albumId }});
      }
   },
  computed: {  },
  components: {  }
};
</script>

<style>

</style>
