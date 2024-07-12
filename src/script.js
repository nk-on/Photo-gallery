const numberInput = document.querySelector('#number-input');
const searchInput = document.querySelector('#search-input');
const getImageButton = document.querySelector('[data-get-images]');
const getRandomAmountOfImage = document.querySelector(
  '[data-get-random-images]'
);
const searchImagesButton = document.querySelector('[data-search-images]');
const picturesContainer = document.querySelector('[data-pictures-container]');
//This function displays inside pictures container given array of images
function displayImages(images) {
  picturesContainer.innerHTML = '';
  images.forEach((image) => {
    const img = document.createElement('img');
    img.setAttribute('src', image.src.medium);
    picturesContainer.appendChild(img);
  });
}
//Choosing images arrording to given numberOfimages arguement
function chooseImages(data, numberOfImages) {
  const photosArray = data.photos;
  const generetedIndexes = new Set();
  const choosenImages = [];
  let i = 0;
  while (i < numberOfImages) {
    let randomIdx = Math.floor(Math.random() * photosArray.length - 1);
    //Preventing getting dublicate indexes
    if (generetedIndexes.has(randomIdx)) {
      randomIdx = Math.floor(Math.random() * photosArray.length - 1);
    } else {
      generetedIndexes.add(randomIdx);
      i++;
      choosenImages.push(photosArray[randomIdx]);
    }
  }
  displayImages(choosenImages);
};
//Get random images according to user's specified inputs
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
//search for particular image
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
//Get random amount of images
async function getRandomAmountOfImages(e) {
  e.preventDefault();
  const res = await fetch('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: 'uJ7wfW86udCYLqHY1cmNI5OfZD8V8UroDvM7ERHWXvXOkI5YL2V5z2WF',
    },
  });
  const data = await res.json();
  const amountOfImages = Math.floor(Math.random() * data.photos.length - 1);
  chooseImages(data, amountOfImages);
  searchInput.value = '';
  numberInput.value = null;
}
getImageButton.addEventListener('click', getImages);
searchImagesButton.addEventListener('click', searchImage);
getRandomAmountOfImage.addEventListener('click', getRandomAmountOfImages);
