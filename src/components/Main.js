
import PhotosManager from '../core/photosManager';
import render from '../common/render';

import Gallery from './Gallery/Gallery';
import AppError from './AppError';

const main = document.getElementById('main');

function renderer() {
  try {
    render(Gallery({ photos: PhotosManager.state.photos }), main);
  } catch (error) {
    console.log(error);
    render(AppError(), main);
  }
}

async function Main() {
  await PhotosManager.init();
  if (PhotosManager.error) {
    render(AppError(), main);
    return;
  }

  PhotosManager.subscribe((state, prevState) => {
    if (state.photos !== prevState.photos) {
      renderer();
    }
  }, 'main');

  renderer();
}


export default Main;
