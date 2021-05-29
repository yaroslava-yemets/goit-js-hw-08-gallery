import galleryItems from './gallery-items.js';

const galletyBackgroundEl = document.querySelector('.js-gallery');

const ref = {
  lightboxEl: document.querySelector('.js-lightbox'),
  closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImageEl: document.querySelector('.lightbox__image'),
};
const arrayLinks = [];
galleryItems.forEach(item => arrayLinks.push(item.original));

function createGalleryEl (items) {
return items.map(({ preview, original, description}) => 
`<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
).join('');
};

galletyBackgroundEl.innerHTML = createGalleryEl(galleryItems);

galletyBackgroundEl.addEventListener('click', clickOnImage);

function clickOnImage (evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  } else {
    evt.preventDefault();
    ref.lightboxEl.classList.add('is-open');
    ref.lightboxImageEl.src = evt.target.dataset.source;
    ref.lightboxImageEl.alt = evt.target.alt;

    eventListenerAdds();
  };
};

const eventListenerAdds = function () {
  document.addEventListener('keydown', closeLightboxByEsc);
  document.addEventListener('keydown', switchImages);
  ref.closeLightboxBtn.addEventListener('click', closeLightboxByBtn);
  ref.lightboxOverlay.addEventListener('click', closeLightboxByOvelayClick);
};

const eventListenerRemoves = function () {
  ref.closeLightboxBtn.removeEventListener('click', closeLightboxByBtn);
  ref.lightboxOverlay.removeEventListener('click', closeLightboxByOvelayClick);  
  document.removeEventListener('keydown', closeLightboxByEsc);
  document.removeEventListener('keydown', switchImages);
};

function closeLightboxByBtn () {
  ref.lightboxEl.classList.remove('is-open');
  ref.lightboxImageEl.src = '';
  ref.lightboxImageEl.alt = '';

  eventListenerRemoves();
};

function closeLightboxByOvelayClick () {
  ref.lightboxEl.classList.remove('is-open');
  ref.lightboxImageEl.src = '';
  ref.lightboxImageEl.alt = '';
  
  eventListenerRemoves();
};

function closeLightboxByEsc (evt) {
  if (ref.lightboxEl.classList.contains('is-open')) {
    if(evt.code === 'Escape') {
      ref.lightboxEl.classList.remove('is-open');
      ref.lightboxImageEl.src = '';
      ref.lightboxImageEl.alt = '';
      
      eventListenerRemoves();
    };
  };
};

function switchImages (evt) {
  let newId;
  const currentId = arrayLinks.indexOf(ref.lightboxImageEl.src);
  if (evt.key === 'ArrowLeft') {
    newId = currentId - 1;
    if (newId === -1) {
      newId = arrayLinks.length - 1;
    };
  } else if (evt.key === 'ArrowRight') {
    newId = currentId + 1;
    if (newId === arrayLinks.length) {
      newId = 0;
    } 
  } else {
    return;
  };
  ref.lightboxImageEl.src = arrayLinks[newId];
};



