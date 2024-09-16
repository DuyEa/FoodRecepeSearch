let loaderDiv = document.querySelector(".loader");
let recipeBtn = document.getElementById("recipeBtn");
let keyword = document.getElementById("keyword-input");

let result = document.getElementById("result");
let searchSelect = document.querySelector("select.search-list");
let searchSelectPick ="search.php?s="
let url = "https://themealdb.com/api/json/v1/1/";





searchSelect.addEventListener("change", ()=>{
  searchSelectPick= searchSelect.value;

})


window.addEventListener("scroll", () => {
  let scrollable = document.documentElement.scrollHeight - window.innerHeight;
  let scroll = window.scrollY;
  let footer = document.querySelector("footer");

  if (Math.ceil(scroll) < scrollable) {
    footer.classList.add("hide");
  }
  else {
    footer.classList.remove("hide");
  }
})



keyword.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    recipeBtn.click();
  }
});

keyword.addEventListener("focusout", () => {
  loaderDiv.classList.add("show");
})

recipeBtn.addEventListener("click", () => {
  document.querySelector("body").classList.remove("height100percent");

  let KeyInp = document.getElementById("keyword-input").value.toLowerCase();
  console.log(KeyInp);
  if (KeyInp.length == 0) {
    document.querySelector("#alertBtn").click();
  }
   else {
    let result = "";
    document.querySelector(".result").innerHTML = result;
    
    console.log(url + searchSelectPick + KeyInp)
    fetch(url + searchSelectPick + KeyInp)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals == null) {
          document.querySelector("#notFoundBtn").click();
        } else {
          fetchRecipe(data.meals);
        }
      });
  }

});


async function searchByName(name) {
  console.log(url + "search.php?s=" + name)
  let info = await fetch(url + "search.php?s=" + name)
                        .then((response) => response.json())
                        .then((data) => data);
  info = info.meals[0];
  return info;
}



async function fetchRecipe(dataMeals) {
  let myMeals = dataMeals;
  
  for (let j = 0; j < myMeals.length; j++) {
    let meal = myMeals[j];
    
    if (searchSelectPick == 'filter.php?a=') {
      meal = await searchByName(meal.strMeal);
    }

      console.log(myMeals);
      console.log(meal);
      console.log(meal.strYoutube);
      console.log(meal.strMealThumb);
      console.log(meal.strMeal);
      console.log(meal.strArea);
      console.log(meal.strInstructions);
      
      let count = 1;
      let ingredients = [];
      for (let i in meal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && meal[i]) {
          ingredient = meal[i];
          measure = meal[`strMeasure` + count];
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      console.log(ingredients);
      let ingredientsStr = '';
      for (let j = 0; j < ingredients.length; j++){
        ingredientsStr += `<li>${ingredients[j]}</li>`;
      }
      
      result = `<div class="meals col-lg-4 col-md-6 col-sm-12">      
      <div class="card1">
          <div class="meal-img">
           <img src="${meal.strMealThumb}" alt="food">        
          </div> 
          <div class="meal-ingri">
            <ol>
              ${ingredientsStr}
            </ol>
          </div>
      </div>

      <div class = "meal-detail font-block" data-id = "${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strInstructions}</p>
        <a href="${meal.strYoutube}">Watch Video</a>
      </div>

    </div> <!--end meals-->`;

      document.querySelector(".result").innerHTML += result;
    }
  

  document.querySelector("body").classList.add("height100percent");
}

{/* <button class="btn btn-lg btn-outline-primary IngreBtn"> Show Ingredients</button> */}