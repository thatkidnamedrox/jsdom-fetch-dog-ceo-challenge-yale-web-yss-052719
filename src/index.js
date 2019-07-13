// console.log('%c HI', 'color: firebrick')

function getDogBreeds(dogBreedUrl) 
{
    // const dogBreedUrl = "https://dog.ceo/api/breeds/list/all";
    return fetch(dogBreedUrl).then(res => res.json());
}

function createDogLi(breed)
{
    const dogLi = document.createElement('li');
    dogLi.innerText = breed;
    return dogLi;
}

function addDogBreeds(breeds)
{
    const dogBreedUl = document.querySelector('#dog-breeds');
    for ( let breed of breeds ) {
        dogBreedsUl.appendChild(createDogLi(breed));
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    fetch(imgUrl)
    .then(res => res.json())
    .then(data => {

        for (let url of data.message ) {
            const imgTag = document.createElement('img');
            imgTag.setAttribute("src", url);
            const dogImageContainer = document.getElementById('dog-image-container');
            dogImageContainer.appendChild(imgTag);
        }

    })
})


const dogBreedUrl = "https://dog.ceo/api/breeds/list/all";
const dogBreedsUl = document.querySelector('#dog-breeds');

getDogBreeds(dogBreedUrl)
.then(data => {
    addDogBreeds(Object.keys(data.message));

})

dogBreedsUl.addEventListener('click', function(e){
    if (e.target.tagName === "LI") {
        e.target.style.color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
})

document.querySelector('select').addEventListener('change', function(e) {
    let letter = e.target.value;
    getDogBreeds()
    .then(data => {
        let filteredBreeds = Object.keys(data.message).filter(breed => breed.startsWith(letter));
        dogBreedsUl.innerHTML = ""
        addDogBreeds(filteredBreeds);
    })
})