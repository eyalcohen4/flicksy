import PhotosManager from './common/photosManager';

async function App() {
  await PhotosManager.init();
}

App();
