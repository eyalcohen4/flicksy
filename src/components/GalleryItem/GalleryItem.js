import './GalleryItem.css';

function GalleryItem({ img, author, author_id, title, link, date }) {
  const humanDate = new Intl.DateTimeFormat('he-IL').format(new Date(date));

  return `
    <article class="gallery__item">
      <div class="gallery__item__overlay"></div>
      <header class="gallery__item__details gallery__item__details--header">
        <a href=${link} class="gallery__item__details__detail">${title}</a>
      </header>
      <img src=${img} class="gallery__item__image" />

      <footer class="gallery__item__details gallery__item__details--footer">
        <a
          id="author"
          data-author-id="${author_id}"
          data-author-name="${author}"
          class="gallery__item__details__detail gallery__item__details__detail--underline"
        >
          <span class="gallery__item__details__detail__key">By </span>
          ${author}
        </a>
        <span class="gallery__item__details__detail">
          <span class="gallery__item__details__detail__key">From </span>
          ${humanDate}
        </span>
      </footer>
    </article>
  `;
}

export default GalleryItem;
