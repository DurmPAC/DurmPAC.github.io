var esPieces = [
  {
    imgURL: 'assets/img/uproot/es-art/bevelyn-ukah-heirloom.webp',
    captions: [{
      artist: 'Bevelyn Ukah',
      title: 'Heirloom',
      year: 2024,
      medium: 'Acrylic, markers, ink',
    }]
  },
  {
    imgURL:
        'assets/img/uproot/es-art/bevelyn-ukah-ternawtheri-family-farm.webp',
    captions: [{
      artist: 'Bevelyn Ukah',
      title: 'Ternawtheri Family Farm',
      year: 2024,
      medium: 'Marker, acrylic, ink',
    }]
  },
  {
    imgURL:
        'assets/img/uproot/es-art/ciara-stewart-food-is-you-human-right.webp',
    captions: [{
      artist: 'Ciara Anais Stewart',
      title: 'Food Is Your Human Right',
      year: 2024,
      medium: 'mixed media on wood',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/malcolm-goff-tomato-punks.webp',
    captions: [{
      artist: 'Malcolm Goff (feat. Assata Goff)',
      title: 'Tomato Punks in B Major',
      year: 2024,
      medium: 'Mixed Media Sculpture',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/myles-brown-elephant-garden.webp',
    captions: [{
      artist: 'Myles Brown',
      title: 'Elephant Garden',
      year: 2022,
      medium: 'Acrylic Paint On Canvas',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/patrizia-ferrerira-corrosive-beauty.webp',
    captions: [{
      artist: 'Patrizia Ferreira',
      title: 'Corrosive Beauty',
      year: 2024,
      medium: 'Fiber Art',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/paul-evans-anatomy-of-gumbo.webp',
    captions: [{
      artist: 'Paul (Bilal) Evans',
      title: 'Anatomy of Gumbo',
      year: 2024,
      medium: 'Mixed Media Collage',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/paul-evans-field-of-dreams.webp',
    captions: [{
      artist: 'Paul (Bilal) Evans and Malcolm Goff',
      title: 'Field of Dreams',
      year: 2023,
      medium: 'Mixed Media Collage',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/rae-cozart-sweet-roots-hold-fast.webp',
    captions: [{
      artist: 'Rae Cozart & Priya Dames',
      title: 'Sweet Roots, Hold Fast',
      year: 2024,
      medium: 'Textile, Story quilt',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/shayla-thornton-innately-sown.webp',
    captions: [{
      artist: 'Shayla Thornton',
      title: 'Innately Sown',
      year: 2024,
      medium: 'Mixed media collage',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/shin-yiing-frozen-death.webp',
    captions: [{
      artist: 'Shin-Yiing Yeung',
      title: 'Frozen death',
      year: 2022,
      medium: 'photography on metal',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/shin-yiing-yeung-2.webp',
    captions: [{
      artist: 'Shin-Yiing Yeung',
      title: 'eye gazing from sacred grounds of sacred geometry',
      year: 2023,
      medium: 'photography on metal',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/shin-yiing-yeung-3.webp',
    captions: [{
      artist: 'Shin-Yiing Yeung',
      title: 'Pollen storage, colorful palette from different plants',
      year: 2022,
      medium: 'photography on metal',
    }]
  },
  {
    imgURL: 'assets/img/uproot/es-art/tamekia-brandon-perfectly-imperfect.webp',
    captions: [{
      artist: 'Tamekia L. Brandon',
      title: 'Perfectly Imperfect',
      year: 2024,
      medium: 'paper, watercolor, glass beads',
    }]
  },
];

var esImageIndex = 0;
var esBackgroundIndex = 0;
var esInstructions = document.getElementById('es-instructions');
var esDomGalleryImage = document.getElementById('es-gallery-image');
var esDomBackgroundImage = document.getElementById('es-gallery-bg-img');
var esDomCaptionHolder = document.getElementById('es-gallery-caption-holder');

function populateImageES() {
  // fetch current image object data
  let imgData = esPieces[esImageIndex];

  // remove currently displayed art and captions
  esDomGalleryImage.classList.add('faded');
  esDomCaptionHolder.classList.add('faded');

  // wait for fadeout then replace src, then fade in
  setTimeout(() => {
    esDomGalleryImage.src = imgData.imgURL;
  }, 200);
  setTimeout(() => {
    esDomGalleryImage.classList.remove('faded');
  }, 250);

  // populate captions after new image is faded in
  setTimeout(() => {
    esDomCaptionHolder.innerHTML = '';
    for (let captionData of imgData.captions) {
      let p = formatCaption(captionData);
      esDomCaptionHolder.append(p);
    }
    esDomCaptionHolder.classList.remove('faded')

    // piece counter
    esInstructions.innerHTML =
        'Use the side buttons or arrow keys to view pieces displayed at Earthseed Land Collective.' +
        '<br>' +
        'Viewing image ' + (esImageIndex + 1) + ' / ' + esPieces.length;
  }, 500);

  // randomize background on loop
  if (esImageIndex == 0) {
    esDomBackgroundImage.classList.add('faded');
    let nextBg = Math.floor(Math.random() * 5)
    if (nextBg == esBackgroundIndex) {
      nextBg = (esBackgroundIndex + 1) % 5;
    }
    esBackgroundIndex = nextBg;
    setTimeout(() => {
      esDomBackgroundImage.src = 'assets/img/uproot/noise-bgs/green-noise-' +
          esBackgroundIndex + '.webp';
      esDomBackgroundImage.classList.remove('faded');
    }, 250);
  }
}

function formatCaption(caption) {
  let paragraph = document.createElement('p');
  paragraph.classList.add('gallery-caption')

  paragraph.innerHTML = `
  ${caption.artist}<br>
  <i>${caption.title}</i>, (${caption.year})<br>
  ${caption.medium}
  `;

  return paragraph;
}

function decrementImageES() {
  esImageIndex--;
  if (esImageIndex < 0) {
    esImageIndex = esPieces.length - 1
  };
  populateImageES();
}

function incrementImageES() {
  esImageIndex = (esImageIndex + 1) % esPieces.length;
  populateImageES();
}

document.getElementById('es-left-arrow').addEventListener('click', () => {
  decrementImageES();
});

document.getElementById('es-right-arrow').addEventListener('click', () => {
  incrementImageES();
});

populateImageES();