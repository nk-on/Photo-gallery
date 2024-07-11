const numberInput = document.querySelector("#number-input");
const searchInput = document.querySelector("#search-input");
const getImageButton = document.querySelector("[data-get-images]");
const getRandomAmountOfImage = document.querySelector(
  "[data-get-random-images]"
);
const searchImagesButton = document.querySelector("[data-search-images]");
const picturesContainer = document.querySelector("[data-pictures-container]");
function displayImages(data) {
  //we should choose random amount of pictures from this array
  //run loop untill number choosen by user
  const photosArray = data.photos;
  const numberOfImages = Number(numberInput.value);
  const generetedIndexes = new Set();
  const choosenImages = [];
  let i = 0;
  while (i < numberOfImages) {
    let randomIdx = Math.floor(Math.random() * numberOfImages);
    if (generetedIndexes.has(randomIdx)) {
      Math.floor(Math.random() * numberOfImages);
    } else {
      generetedIndexes.add(randomIdx);
      i++;
      choosenImages.push(photosArray[i]);
    }
  };
  console.log(choosenImages)
}
async function getImages(e) {
  e.preventDefault();
  if (numberInput.value === null || Number(numberInput.value) <= 0) {
    alert("Enter valid number");
    return;
  }
  const res = await fetch("https://api.pexels.com/v1/curated", {
    headers: {
      Authorization: "uJ7wfW86udCYLqHY1cmNI5OfZD8V8UroDvM7ERHWXvXOkI5YL2V5z2WF",
    },
  });
  const data = await res.json();
  displayImages(data);
}
getImageButton.addEventListener("click", getImages);
