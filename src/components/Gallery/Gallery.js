import './Gallery.css';
import GalleryItem from '../GalleryItem/GalleryItem';

function Gallery({ photos }) {
  const renderPhotos = () => photos.map(photo => (
    GalleryItem(photo)
  )).join('');

  return `
    <div class="gallery">
      ${renderPhotos()}
    </div>
    `;
}

export default Gallery;
