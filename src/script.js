const numberInput = document.querySelector('number-input');
const searchInput = document.querySelector('#search-input')
const getImageButton = document.querySelector('[data-get-images]');
const getRandomAmountOfImage = document.querySelector(
  '[data-get-random-images]'
);
const searchImagesButton = document.querySelector('[data-search-images]')
const picturesContainer = document.querySelector('[data-pictures-container]');
async function getImages(e){
  e.preventDefault();
  const res = await fetch("https://api.pexels.com/v1/curated", {
    headers: {
      Authorization: "uJ7wfW86udCYLqHY1cmNI5OfZD8V8UroDvM7ERHWXvXOkI5YL2V5z2WF"
    }
  });
  const data = await res.json();
};
getImageButton.addEventListener('click',getImages);