import photosManager from './photosManager';

function initFileEventListener() {
  const el = document.getElementById('new-image');

  el.addEventListener('change', () => {
    if (el.files) {
      const reader = new FileReader();

      reader.onload = (onLoadEvent) => {
        photosManager.addLocalPhoto({
          base64: onLoadEvent.target.result
        });
      };

      reader.readAsDataURL(el.files[0]);
    }
  });
}

function initClickEventListener() {
  document.addEventListener('click', (event) => {
    if (event.target.dataset) {
      handleEventByDataset(event);
    }
    switch (event.target.id) {
      case 'back-to-feed':
        photosManager.getMainFeed();
    }
  });
}

function handleEventByDataset(event) {
  if (event.target.dataset.authorId) {
    const { authorId, authorName } = event.target.dataset;

    photosManager.setCurrentAuthor(authorId, authorName);
    document.body.scrollTo(0, 0);
  }
}

function initEventListeners() {
  initClickEventListener();
  initFileEventListener();
}

export default initEventListeners;
