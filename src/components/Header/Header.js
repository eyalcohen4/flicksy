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
    <button class="header__back" id="back-to-feed">${authorName ? 'Back To Feed' : 'Reload Feed'}</button>
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
