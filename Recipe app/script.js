const SearchButton = document.querySelector('.searchBtn')
const Search = document.querySelector('.search')
const RecipeContainer = document.querySelector(".recipeContainer")
const RecipeDetailsContent = document.querySelector(".recipe-details-content")
const PopupCloseBtn = document.querySelector(".recipe-details button")
const ErrorImage = document.querySelector(".errorImg")
const BackgroundImage = document.querySelector('.back-ground-img')

// fetch recipe
async function fetchRecipes(query){
    RecipeContainer.innerHTML = "<h2>Fetching Recipes.......</h2>"
    try {
        

const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
const response =await data.json()

RecipeContainer.innerHTML = ""
response.meals.forEach((meal) => {
    // console.log(meal)
    const RecipeDiv = document.createElement('div')
    RecipeDiv.classList.add("recipe")
    RecipeDiv.innerHTML= `
         <img src="${meal.strMealThumb}">
         <h3> ${meal.strMeal}</h3>
         <p> <span>${meal.strArea}</span> Dish</p>
         <p> Belongs to <span>${meal.strCategory}</span> Category</p>
    
    `
    const Button =document.createElement('button')
    Button.textContent = "View Recipe"

    //add eventlistner
    Button.addEventListener('click', () => {
        openRecipePopup(meal)
    })
    RecipeDiv.appendChild(Button)
    RecipeContainer.append(RecipeDiv)
})
ErrorImage.classList.remove('showErrImg')
BackgroundImage.classList.add('hideBCGImg')
} catch (error) {
    // RecipeContainer.innerHTML = `<img src="./6339704.jpg" alt=""> `
    ErrorImage.classList.add('showErrImg')
    BackgroundImage.classList.add('hideBCGImg')
}
}

//fetch ingredents
const fetchIngredents = (meal) => {
    let ingredientsList =''
    for(let i=1;i<=20;i++ ){
      const ingredient = meal[`strIngredient${i}`]
      if(ingredient){
          const measure = meal[`strMeasure${i}`]
          ingredientsList += ` <li> ${measure} ${ingredient}</li>`
      }
      else{
          break
      }
    }
    return ingredientsList
  }

const openRecipePopup  = (meal) => {
         RecipeDetailsContent.innerHTML = `
          <h2  class="recipeName"> ${meal.strMeal}</h2>
          <h3>Ingredents</h3>
          <ul class="ingredientList"> ${fetchIngredents(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p >${meal.strInstructions}</p>
         </div>
         `
      
         RecipeDetailsContent.parentElement.style.display = 'block'
}

//popup close btn
PopupCloseBtn.addEventListener('click',()=>{
    RecipeDetailsContent.parentElement.style.display = 'none'
})

SearchButton.addEventListener('click',(e)=>{
    e.preventDefault()
    const searchInput = Search.value.trim()
    if(!searchInput){
        RecipeContainer.innerHTML = `<h2>Please enter recipe name...</h2>`
        return
    }
    else{
        fetchRecipes(searchInput)
    }
    
    
})