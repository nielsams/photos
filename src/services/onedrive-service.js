import { processErrorResponseAsync,getShareId } from "../utils"
import { Constants } from "../utils";

const API_ENDPOINT = window.API_URL;
const SHARE_ID = getShareId(process.env.VUE_APP_SHARE_URL);

export default class OnedriveService {

    async listAlbumsAsync() {
        var res = await fetch(`${API_ENDPOINT}/shares/${SHARE_ID}/root/children?expand=thumbnails&select=id,name,folder,file,thumbnails,@content.downloadUrl`);
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error(await processErrorResponseAsync(res));
        }
    }

    async listAlbumPhotosAsync(albumId) {
        var res = await fetch(`${API_ENDPOINT}/shares/${SHARE_ID}/items/${albumId}/children?expand=thumbnails&select=id,name,description,location,photo,thumbnails,size,image,@content.downloadUrl`);
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error(await processErrorResponseAsync(res));
        }
    }

    async getAlbumDetailsAsync(albumId) {
        var res = await fetch(`${API_ENDPOINT}/shares/${SHARE_ID}/items/${albumId}?select=id,name,description`);
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error(await processErrorResponseAsync(res));
        }
    }

}
