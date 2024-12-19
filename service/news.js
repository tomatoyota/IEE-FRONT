import { api } from '../utils/axios.js';
import userHelper from '../utils/helpers/user.js';
import axios from 'axios';

export default {
    // 取得筆記本列表
    async getAnnouncementList (obj) {
        try {
            const res = await api.post(`/announcements/search`, obj);

            if (res === null || res.data === null) {
                return null
            }

            return {
                isSuccess: true,
                data: res.data
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    async getAnnouncement (id) {
        // console.log(id)
        try {
            const res = await api.get(`/announcements/${id}`);

            if (res === null || res.data === null) {
                return null
            }
            const announcementData = res.data.data;
            
            return {
                isSuccess: true,
                data: announcementData,
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    

    // 使用 Flickr API 取得相簿的封面圖片
    async getFlickrAlbumCover(albumId) {
        try {
            const response = await axios.get('https://www.flickr.com/services/rest/', {
                // params: {
                //     method: 'flickr.photosets.getPhotos',
                //     api_key: '531622b742ef5e9aa5f940637a740155',
                //     photoset_id: albumId,
                //     user_id: '201758056@N03',
                //     per_page: 1,
                //     format: 'json',
                //     nojsoncallback: 1,
                // },
                params: {
                    method: 'flickr.photosets.getPhotos',
                    api_key: '80b1b8a68249408a81e6f38214471cf1',
                    photoset_id: albumId,
                    user_id: '186295862@N03',
                    per_page: 1,
                    format: 'json',
                    nojsoncallback: 1,
                },
            });
            // 確認回應是否包含第一張照片
            if (response.data && response.data.photoset && response.data.photoset.photo.length > 0) {
                const firstPhoto = response.data.photoset.photo[0];
                // 組合成圖片 URL
                return `https://live.staticflickr.com/${firstPhoto.server}/${firstPhoto.id}_${firstPhoto.secret}_m.jpg`;
            } else {
                console.error('No photos found in album');
                return null;
            }
        } catch (error) {
            
            console.error('Error fetching album cover:', error);
            return null;
        }
    },
}