var nsPieces = [
  {
    imgURL: 'assets/img/uproot/ns-art/ortega.webp',
    captions: [{
      artist: 'Renzo Ortega',
      title: 'The Tragedy of The Corn',
      year: 2019,
      medium: 'Acrylic and soil on canvas',
    }]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/jessica-jackson-wc.webp',
    captions: [{
      artist: 'Jessica K. Jackson',
      title: '[ Untitled ]',
      year: 2024,
      medium: 'Watercolor, collage',
    }]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/goff-sankofa-box.webp',
    captions: [{
      artist: 'Assata Goff, Sekou Goff, & Malcolm Goff',
      title: 'Sankofa Box',
      year: 2024,
      medium: 'Multimedia sculpture'
    }]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/le-fruit-tapestry.webp',
    captions: [{
      artist: 'Trang Le',
      title: 'Fruit Tapestry',
      year: 2024,
      medium: 'digital art'
    }]
  },

  {
    imgURL: 'assets/img/uproot/ns-art/antonia-brown-springtime.webp',
    captions: [{
      artist: 'Antonia Brown',
      title: 'Springtime',
      year: 2023,
      medium: 'Acrylic on Canvas',
    }]
  },

  {
    imgURL: 'assets/img/uproot/ns-art/sunny-pieces.webp',
    captions: [
      {
        artist: 'Xavier Bryant',
        title: 'Beauty Through Pain',
        year: 2023,
        medium: 'Acrylic paint, fabric flowers, and gold foil',
      },
      {
        artist: 'Princess Jackson',
        title: 'Face the Sun',
        year: 2024,
        medium: 'Acrylic, yarn, crepe paper',
      }
    ]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/derrick-davis-pieces.webp',
    captions: [
      {
        artist: 'Derrick Davis Jr.',
        title: 'Goofy Kreme',
        year: 2024,
        medium: 'Photography',
      },
      {
        artist: 'Derrick Davis Jr.',
        title: 'Pass The Collection Plate',
        year: 2024,
        medium: 'Photography',
      }
    ]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/neeta-kepchar-still-alive.webp',
    captions: [{
      artist: 'Neeta Kepchar',
      title: 'Still Alive',
      year: 2024,
      medium: 'Photograph',
    }]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/tirzah-teka-brown.webp',
    captions: [
      {
        artist: 'Tirzah',
        title: 'All that you touch',
        year: 2024,
        medium: 'Oil paint on Linen',
      },
      {
        artist: 'Teka',
        title: 'ላሚቱ//Lamitu//The calf',
        year: 2024,
        medium: 'acrylic on canvas',
      },
      {
        artist: 'Antonia Brown',
        title: 'Moonkissed',
        year: 2023,
        medium: 'Acrylic on Wood',
      }
    ]
  },
  {
    imgURL: 'assets/img/uproot/ns-art/madylin-pieces.webp',
    captions: [
      {
        artist: 'Madylin Nixon-Taplet',
        title: 'Water is Our DNA',
        year: 2023,
        medium: 'Digital Photograph',
      },
      {
        artist: 'Madylin Nixon-Taplet',
        title: 'In Bloom',
        year: 2021,
        medium: 'Digital Photograph',
      },
      {
        artist: 'Madylin Nixon-Taplet',
        title: 'Ayan\'s Dance',
        year: 2022,
        medium: 'Digital Photograph',
      },
      {
        artist: 'Madylin Nixon-Taplet',
        title: 'The Fairy Finally Found Their Wings',
        year: 2023,
        medium: 'Digital Photograph',
      }
    ]
  }


];

var nsImageIndex = 0;
var nsBackgroundIndex = 0;
var nsInstructions = document.getElementById('ns-instructions');
var nsDomGalleryImage = document.getElementById('ns-gallery-image');
var nsDomBackgroundImage = document.getElementById('ns-gallery-bg-img');
var nsDomCaptionHolder = document.getElementById('ns-gallery-caption-holder');


function populateImageNS() {
  // fetch current image object data
  let imgData = nsPieces[nsImageIndex];

  // remove currently displayed art and captions
  nsDomGalleryImage.classList.add('faded');
  nsDomCaptionHolder.classList.add('faded');

  // wait for fadeout then replace src, then fade in
  setTimeout(() => {
    nsDomGalleryImage.src = imgData.imgURL;
  }, 200);
  setTimeout(() => {
    nsDomGalleryImage.classList.remove('faded');
  }, 250);

  // update text after new image is faded in
  setTimeout(() => {
    // captions
    nsDomCaptionHolder.innerHTML = '';

    if (window.innerWidth > 1000) {
      for (let captionData of imgData.captions) {
        let p = formatCaption(captionData);
        nsDomCaptionHolder.append(p);
      }
    }
    nsDomCaptionHolder.classList.remove('faded')

    // piece counter
    nsInstructions.innerHTML =
      'Use the side buttons or arrow keys to view pieces displayed at Northstar Church of the Arts.' +
      '<br>' +
      'Viewing image ' + (nsImageIndex + 1) + ' / ' + nsPieces.length;
  }, 500);

  // randomize background on loop
  if (nsImageIndex == 0) {
    nsDomBackgroundImage.classList.add('faded');
    let nextBg = Math.floor(Math.random() * 5)
    if (nextBg == nsBackgroundIndex) {
      nextBg = (nsBackgroundIndex + 1) % 5;
    }
    nsBackgroundIndex = nextBg;
    setTimeout(() => {
      nsDomBackgroundImage.src = 'assets/img/uproot/noise-bgs/orange-noise-' +
        nsBackgroundIndex + '.webp';
      nsDomBackgroundImage.classList.remove('faded');
    }, 250);
  };
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

function decrementImageNS() {
  nsImageIndex--;
  if (nsImageIndex < 0) {
    nsImageIndex = nsPieces.length - 1
  };
  populateImageNS();
}

function incrementImageNS() {
  nsImageIndex = (nsImageIndex + 1) % nsPieces.length;
  populateImageNS();
}

document.getElementById('ns-left-arrow').addEventListener('click', () => {
  decrementImageNS();
});

document.getElementById('ns-right-arrow').addEventListener('click', () => {
  incrementImageNS();
});


populateImageNS();