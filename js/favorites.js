
let cardContainer = document.getElementById('container');


window.addEventListener("load", function () {
     
     let favourites = localStorage.getItem("favouriteCharacters");

      
     if (favourites == null) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>"
          return;
     }
     
     else {
          favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
     }

     cardContainer.innerHTML = "";
     
     favourites.forEach(character => {
          
          cardContainer.innerHTML +=
               `
               <div class="flex-col card">
                    <img src="${character.squareImage}" alt="">
                    <span class="name">${character.name}</span>
                    <span class="id">Id : ${character.id}</span>
                    <span class="comics">Comics : ${character.comics}</span>
                    <span class="series">Series : ${character.series}</span>
                    <span class="stories">Stories : ${character.stories}</span>
                    <a class="character-info" href="./more-info.html">
                         <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                    </a>
                    <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
               </div>
          `

     })
     
     addEvent();
})


function addEvent() {
     let removeBtn = document.querySelectorAll(".remove-btn");
     removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}


function removeCharacterFromFavourites() {
     
     
     let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

      
     let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
     
     let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     // deleting the characters id from favouritesCharacterId map
     favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);


     // deleting the character form array whose id is matched 
     favourites.forEach(function (favourite, index) {
          if (favourite.id == idOfCharacterToBeDeleted) {
               // console.log(favourite)
               favourites.splice(index, 1);
          }
     });

     // if all the characters are deleted from favourites and not character left for displaying
     if (favourites.length == 0) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
     }
     // console.log(favourites);

     // Updating the new arrays in localStorage
     localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
     localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

     // Removing the element from DOM
     this.parentElement.remove();

     // displaying the "Removed from favourites" toast in DOM
     document.querySelector(".remove-toast").setAttribute("data-visiblity", "show");
     // Removing the "Removed from favourites" toast form DOM
     setTimeout(function () {
          document.querySelector(".remove-toast").setAttribute("data-visiblity", "hide");
     }, 1000);
}


// Function which stores the info object of character for which user want to see the info 
function addInfoInLocalStorage() {
     // This function basically stores the data of character in localStorage.
     // When user clicks on the info button and when the info page is opened that page fetches the heroInfo and display the data  
     let heroInfo = {
          name: this.parentElement.children[7].children[1].innerHTML,
          description: this.parentElement.children[7].children[5].innerHTML,
          comics: this.parentElement.children[7].children[2].innerHTML,
          series: this.parentElement.children[7].children[3].innerHTML,
          stories: this.parentElement.children[7].children[4].innerHTML,
          portraitImage: this.parentElement.children[7].children[7].innerHTML,
          id: this.parentElement.children[7].children[0].innerHTML,
          landscapeImage: this.parentElement.children[7].children[6].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}


