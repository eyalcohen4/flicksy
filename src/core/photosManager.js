import api from '../common/api';
import Store from './store';

class PhotosManager extends Store {
  constructor() {
    super();
    this.initialState = {
      photos: [],
      error: false,
      currentAuthorId: null,
      currentAuthorName: '',
      photosLink: ''
    };
  }

  async init() {
    super.createStore(this.initialState);
    super.subscribe((state, prevState) => this.subscriber(state, prevState), 'photosManager');

    this.getMainFeed();
  }

  subscriber(state, prevState) {
    if (state.currentAuthorId !== prevState.currentAuthorId && state.currentAuthorId) {
      this.getAuthorPhotos(state.currentAuthorId);
    }
  }

  processPhotos(items) {
    return items.map((item) => {
      const { media: { m }, date_taken, isLocal, date } = item;

      const author = this.parseAuthor(item.author);
      return { ...item, img: m, date: isLocal ? date : date_taken, author };
    });
  }

  parseAuthor(author) {
    // Regex which convert ("Author Name") to Author Name.
    const regex = /\("([^)]+)"\)/;
    const matches = regex.exec(author);

    // If we couldnt find the author name, return the original string
    if (!matches) {
      return author;
    }

    return matches[1] ? matches[1] : matches[0];
  }

  setCurrentAuthor(id, name) {
    this.setState({
      currentAuthorId: id,
      currentAuthorName: name
    });
  }

  async getAuthorPhotos(authorId) {
    const { items, link } = await api.getAuthorPhotos(authorId);
    const processedItems = this.processPhotos(items);

    this.setState({
      photos: processedItems,
      photosLink: link
    });
  }

  async getMainFeed() {
    const { items, link } = await api.getFeed();

    if (!items) {
      this.error = true;
      throw new Error('[PhotosManager.init] No photos returned / photos are empty');
    }

    const processedItems = this.processPhotos(items);

    this.setState({
      photos: processedItems,
      photosLink: link,
      currentAuthorId: '',
      currentAuthorName: ''
    });
  }

  addLocalPhoto({ base64 }) {
    const newPhoto = {
      author: 'Me',
      author_id: null,
      link: null,
      media: { m: base64 },
      img: base64,
      title: '',
      date: new Date().toISOString(),
      isLocal: true
    };

    const photos = [newPhoto, ...this.state.photos];

    this.setState({
      photos
    });
  }
}

export default new PhotosManager();
