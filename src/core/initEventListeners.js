import photosManager from './photosManager';

function initEventListeners() {
  document.addEventListener('click', (event) => {
    if (event.target.dataset) {
      byDataset(event);
    }

    switch (event.target.id) {
      case 'back-to-feed':
        photosManager.getMainFeed();
    }
  });
}

function byDataset() {
  if (event.target.dataset.authorId) {
    const { authorId, authorName } = event.target.dataset;
    photosManager.setCurrentAuthor(authorId, authorName);
  }
}

export default initEventListeners;
