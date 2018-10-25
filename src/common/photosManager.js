import api from './api';

class PhotosManager {
  constructor() {
    this.photos = [];
    this.error = false;
  }


  async init() {
    try {
      const photos = await api.getFeed();

      if (!photos || (photos && !photos.length)) {
        this.error = true;
        throw new Error('[PhotosManager.init] No photos returned / photos are empty');
      }

      this.photos = photos;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PhotosManager();
