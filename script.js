let recipes = [];


function renderRecipeList() {
  const recipeListContainer = document.querySelector('.recipeList');
  recipeListContainer.innerHTML = ''; // Clear the list before rendering

  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipeItem');
    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <button class="recipeButton">Edit</button>
      <button class="recipeButton">Delete</button>
      <p>${recipe.content.replace(/\n/g, '<br>')}</p>
    `;
    recipeListContainer.appendChild(recipeDiv);
  });
}


function addRecipe() {
  const title = document.getElementById('recipeTitle').value;
  const content = document.getElementById('recipeText').value;

  if (title && content) {
    const newRecipe = { title, content };
    recipes.push(newRecipe);
    renderRecipeList(); // Update the list after adding
    clearInputFields(); // Optionally clear the text areas after adding
  } else {
    alert('Please fill out both the title and recipe fields.');
  }
}

function clearInputFields() {
  document.getElementById('recipeTitle').value = '';
  document.getElementById('recipeText').value = '';
}

document.getElementById("addButton").addEventListener("click", addRecipe);