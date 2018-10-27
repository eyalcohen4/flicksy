import './Header.css';

import render from '../../common/render';
import photosManager from '../../core/photosManager';

function renderer({ authorName }) {
  const header = document.getElementById('header');

  const template = `
    <header class="header">
    <div class="header__background"></div>
    <div>
      <h1>Flicksy</h1>
      <h2 class="header__author">${authorName}</h2>
      </div>
      <div>
        <div class="header__upload-image">
          <input type="file" accept="image/*" id="new-image" class="header__upload-image__input" />
          <label for="new-image" type="file" accept="image/*" id="new-file" class="header__button header__button--upload">
          🖼️ Upload Image
          </label>
        </div>
        <button class="header__button header__button--back" id="back-to-feed" style="background: ${authorName ? '#000000' : '#0336ff'}">  
          ${authorName ? '👈 Back To Feed' : '♻️ Reload Feed'}
        </button>
      </div>
    </header>
  `;

  render(template, header);
}

function Header() {
  photosManager.subscribe((state, prevState) => {
    if (state.currentAuthorName !== prevState.currentAuthorName) {
      renderer({ authorName: state.currentAuthorName });
    }
  }, 'header');

  return renderer({ authorName: '' });
}

export default Header;
