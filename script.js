const getMeal = document.getElementById("getmeal");
let display = document.getElementById("display");

//"url('https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg')");

getMeal.addEventListener("click", () => {
  getMealData().then((res) => {
    showMealData(res);
  });
});

let getMealData = () => {
  const Url = "https://www.themealdb.com/api/json/v1/1/random.php";

  let mealPromise = fetch(Url);

  return mealPromise.then((response) => {
    return response.json();
  });
};

let showMealData = (mealData) => {
  const ingredients = [];
  let meal = mealData.meals[0];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  let fullIngredient = "";
  for (let i = 0; i < ingredients.length; i++) {
    fullIngredient += `<li>${ingredients[i]}</li>`;
  }

  display.innerHTML = `  <div class="mealinfo">
    <div id="card-container">
      <div id="card-title">${mealData.meals[0].strMeal}</div>
      <div id="recipe-image"></div>
      <div id="card-items">
        <p> <strong> Category </strong>: <span  >${
          mealData.meals[0].strCategory
        }</span></p>
        <p> <strong> Area :  </strong> <span  >${
          mealData.meals[0].strArea
        }</span></p>
        
       ${
         mealData.meals[0].strTags
           ? `<p> <strong> Tags </strong>: <span  >${mealData.meals[0].strTags}</span></p>`
           : ""
       }

      </div>

      <div id="card-items" class="strInstructions">
      ${mealData.meals[0].strInstructions}
      </div>

      <div id="card-items">
        <span class="card-item-title">Ingredients</span>
        <ul class="checkmark">
        <br>
          ${fullIngredient}          
        </ul>
      </div> 
      <div class="videoWrapper"> 
      <iframe width="875" height="600"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
		 </iframe>
         </div>         
    </div>
  </div>`;

  let image = document.getElementById("recipe-image");
  image.style.backgroundImage = `url(${mealData.meals[0].strMealThumb})`;
};
