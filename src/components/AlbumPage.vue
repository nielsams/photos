<template>
    <section>
       
      <router-link :to="{ path: '/' }" class="routerLink">⟵</router-link>

      <div v-show="pageLoading" class="loaderIcon"></div>
        <h1 class="pageTitle">{{ albumData.name }}</h1>
        <div class="pageDescription">{{ albumData.description }}</div>

        <div v-show="images.length > 0">
            <div class="photo-grid-container">
                <div v-for="image in images" 
                    v-bind:key="image.id" 
                    class="photo-grid-photo hover-shadow">
                    <img v-on:click="openZoombox(image)" 
                        :src="image.thumbnails[0].large.url"
                        />
                </div>
            </div>
        </div>

        <div class="photoZoombox" v-if="null != zoomImage" v-on:click="closeZoombox()">
                <div class="photoZoomboxContent">
                    <div v-show="zoomImageLoading" class="loaderIcon"></div>
                    <img class="photoZoomboxPhoto" 
                        :src="zoomImage['@content.downloadUrl']" 
                        @load="zoomImageLoaded" 
                        v-show="!zoomImageLoading" />

                    <div class="photoZoomboxInfo" v-show="!zoomImageLoading">
                        <span class="photoZoomboxInfoItem" v-if="null != zoomImage.description" style="width: 100%;">
                            <b>{{ zoomImage.description }}</b>
                        </span>                    

                        <span class="photoZoomboxInfoItem" v-if="null != zoomImage.location">
                            <i>Location: {{ zoomImage.location.displayName }} {{ zoomImage.location.address.state }} {{ zoomImage.location.address.countryOrRegion }}</i>&nbsp;
                        </span> 

                        <span class="photoZoomboxInfoItem" v-if="null != zoomImage.image">
                            <i>Size: {{ zoomImage.image.width }} x {{ zoomImage.image.height }}</i>&nbsp; &nbsp;
                        </span> 

                        <span class="photoZoomboxInfoItem" v-if="null != zoomImage.photo">
                            <i>Camera: {{ zoomImage.photo.cameraModel }} &nbsp;
                            Exposure: {{ zoomImage.photo.exposureNumerator }} / {{ zoomImage.photo.exposureDenominator }} &nbsp;
                            Focal Length: {{ zoomImage.photo.focalLength }} &nbsp;
                            Aperture: f{{ zoomImage.photo.fNumber }} &nbsp;
                            ISO: {{ zoomImage.photo.iso }}</i>
                        </span> 

                    </div>
                </div>
            </div>
 
        <div v-show="!pageLoading && images.length <= 0">
            <p>Nothing to show.</p>
        </div>
    </section>
</template>
 
<script>
    import { Constants } from "../utils"
    import { EventBus } from "../main"

    export default {
        data: function() {
            return {
                images: [],
                albumData: [],
                pageLoading: false,
                zoomImage: null,
                zoomImageLoading: false
            }
        },
        async created() {
            this.pageLoading = true;
            try {
                const albumId = this.$route.params.albumId;
                const imageId = this.$route.params.imageId;

                if (albumId == null) {
                    EventBus.$emit(Constants.EVENT_ERROR, "Page cannot be loaded without an albumId.");
                }
                else {
                    var [albumData, imageData] = await Promise.all([
                        this.$OnedriveService.getAlbumDetailsAsync(albumId),
                        this.$OnedriveService.listAlbumPhotosAsync(albumId)
                    ]);

                    this.albumData = albumData; 
                    this.images = imageData.value;
                }

                // If there is an image specified in the URL, let's open that one
                if(imageId != null) {
                    const showimage = this.getImageById(imageId)
                    if(showimage == null) {
                        EventBus.$emit(Constants.EVENT_ERROR, "Invalid image id specified. Showing album page instead.");
                    } else {
                        this.openZoombox(showimage);
                    }
                }
            }
            catch (e) {
                EventBus.$emit(Constants.EVENT_ERROR, "There was a problem loading the album.");
            }

            this.pageLoading = false;
        },
        methods: { 
            zoomImageLoaded() {
                this.zoomImageLoading = false;
            },
            
            openZoombox(image) {
                this.zoomImageLoading = true;
                this.zoomImage = image;
                document.body.classList.add('modal-open');
                history.replaceState({}, null, window.location.href + '/image/' + image.id);
            },

            closeZoombox() {
                this.zoomImage = null;
                document.body.classList.remove('modal-open');
                const currentUrl = window.location.href; 
                history.replaceState({}, null, currentUrl.substring(0, currentUrl.indexOf('/image/')));
            },

            getImageById(id) {
                return this.images.find(item => item.id === id);
            }
        }
    }
</script>