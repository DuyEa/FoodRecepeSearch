let loaderDiv = document.querySelector(".loader");
let recipeBtn = document.getElementById("recipeBtn");
let keyword = document.getElementById("keyword-input");

let result = document.getElementById("result");
let searchSelect = document.querySelector("select.search-list");
let searchSelectPick ="filter.php?c=Dessert"
let url = "https://themealdb.com/api/json/v1/1/";

console.log("dess");
recipeShowcase();





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



function recipeShowcase (){
  document.querySelector("body").classList.remove("height100percent");

  let KeyInp = "";
  console.log(KeyInp);
  
    let result = "";
    document.querySelector(".result").innerHTML = result;
    
    console.log(url + searchSelectPick + KeyInp)
    fetch(url + searchSelectPick + KeyInp)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals == null) {
          document.querySelector("#notFoundBtn").click();
        } else {
          fetchName(data.meals);
        }
      });
  
};


async function fetchName(dataMeals) {
  let myMeals = dataMeals;
  
  for (let j = 0; j < myMeals.length; j++) {
    let meal = myMeals[j];
    
      //console.log(meal.idMeal);
      fetch(url+ "lookup.php?i="+ meal.idMeal)
          .then((response) => response.json())
          .then((data) => {
            console.log(url+ "lookup.php?i="+ meal.idMeal);
            fetchRecipe(data);
          });
     // fetchRecipe(meal.idMeal);
      
}

}

async function fetchRecipe(mealFound)
{
  console.log(mealFound);
  let myMeals = mealFound.meals;
  
  for (let j = 0; j < myMeals.length; j++) {
    let meal = myMeals[j];
    
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
           <img src = "${meal.strMealThumb}" alt = "food">        
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