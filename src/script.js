const numberInput = document.querySelector('#number-input');
const searchInput = document.querySelector('#search-input');
const getImageButton = document.querySelector('[data-get-images]');
const getRandomAmountOfImage = document.querySelector(
  '[data-get-random-images]'
);
const searchImagesButton = document.querySelector('[data-search-images]');
const picturesContainer = document.querySelector('[data-pictures-container]');
function displayImages(images) {
  picturesContainer.innerHTML = '';
  images.forEach((image) => {
    const img = document.createElement('img');
    img.setAttribute('src', image.src.medium);
    picturesContainer.appendChild(img);
  });
}
function chooseImages(data, numberOfImages) {
  //we should choose random amount of pictures from this array
  //run loop untill number choosen by user
  const photosArray = data.photos;
  const generetedIndexes = new Set();
  const choosenImages = [];
  let i = 0;
  while (i < numberOfImages) {
    let randomIdx = Math.floor(Math.random() * photosArray.length - 1);
    if (generetedIndexes.has(randomIdx)) {
      randomIdx = Math.floor(Math.random() * photosArray.length - 1);
    } else {
      generetedIndexes.add(randomIdx);
      i++;
      choosenImages.push(photosArray[randomIdx]);
    }
  }
  displayImages(choosenImages);
}
async function getImages(e) {
  e.preventDefault();
  if (numberInput.value === null || Number(numberInput.value) <= 0) {
    alert('Enter valid number');
    return;
  }
  const res = await fetch('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: 'uJ7wfW86udCYLqHY1cmNI5OfZD8V8UroDvM7ERHWXvXOkI5YL2V5z2WF',
    },
  });
  const data = await res.json();
  chooseImages(data, numberInput.value);
  numberInput.value = null;
}
async function searchImage(e) {
  e.preventDefault();
  if (searchInput.value === '') {
    alert('Enter valid query');
    return;
  }
  if (numberInput.value === null || Number(numberInput.value) <= 0) {
    alert('Enter valid number');
    return;
  }
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${searchInput.value}`,
    {
      headers: {
        Authorization:
          'uJ7wfW86udCYLqHY1cmNI5OfZD8V8UroDvM7ERHWXvXOkI5YL2V5z2WF',
      },
    }
  );
  const data = await res.json();
  chooseImages(data, numberInput.value);
  searchInput.value = '';
  numberInput.value = null;
}
async function getRandomAmountOfImages(e) {
  e.preventDefault();
  const res = await fetch('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: 'uJ7wfW86udCYLqHY1cmNI5OfZD8V8UroDvM7ERHWXvXOkI5YL2V5z2WF',
    },
  });
  const data = await res.json();
  chooseImages(data, data.photos.length - 1);
  searchInput.value = '';
  numberInput.value = null;
}
getImageButton.addEventListener('click', getImages);
searchImagesButton.addEventListener('click', searchImage);
getRandomAmountOfImage.addEventListener('click',getRandomAmountOfImages)
