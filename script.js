let recipes = [];
let current_recipe;

function renderRecipeList() {
  const recipeListContainer = document.querySelector('.recipeList');
  recipeListContainer.innerHTML = ''; // Clear the list before rendering

  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipeItem');
    recipeDiv.id = 'recipeItem'
    recipeDiv.onclick = "showRecipe(${index})"
    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <button class="recipeButton" onclick="editRecipe(${index})">Edit</button>
      <button class="recipeButton" onclick="deleteRecipe(${index})">Delete</button>

      <p>${recipe.content.replace(/\n/g, '<br>')}</p>
    `;
    recipeDiv.addEventListener('click', function(){
      showRecipe(index);
    });

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

function deleteRecipe(index){
  recipes.splice(index, 1);
  renderRecipeList();
}

function editRecipe(index){
  document.getElementById('recipeTitle').value = recipes[index].title;
  document.getElementById('recipeText').value = recipes[index].content;
  current_recipe = index;

}

function saveRecipe(){
  if (current_recipe != null){
    const title = document.getElementById('recipeTitle').value;
    const content = document.getElementById('recipeText').value;
    if (title && content){
      recipes[current_recipe] = {title, content};
      renderRecipeList();
      clearInputFields();
      current_recipe = null;
    }
    else{
      alert('Please fill out both the title and recipe fields.')
    }
  }
  else{
    alert('You are saving a nonexistent recipe.')
  }
}

function showRecipe(index){
  const title = recipes[index].title;
  const content = recipes[index].content;
  const mymodal = document.getElementById('mymodal');

  const modalContent = mymodal.querySelector('.modal-content')
  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <h2>${title}</h2>
    <p>${content.replace(/\n/g, '<br>')}</p>
  `;

  mymodal.style.display = 'block';
  mymodal.style.display = 'flex'
  modalContent.style.display ='block';
  const closeButton = modalContent.querySelector('.close');
  closeButton.addEventListener('click', function () {
    mymodal.style.display = 'none';
  });
}


document.getElementById("addButton").addEventListener("click", addRecipe);
document.getElementById("saveButton").addEventListener("click", saveRecipe);
