let stepCategory = 0;

function getInputValueCat() {
    return document.getElementById('addtaskCreateCategoryInput').value.trim();
}

/**
 * Renders the categories as options in the add task section.
 */
function renderCategories() {
    let categoryList = document.getElementById('addtaskMenuCategory');
    resetCategoriesList(categoryList);
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category.id;
        option.text = category.name + " (" + category.color + ")";
        categoryList.appendChild(option);
    });
}


function resetCategoriesList(categoryList) {
    categoryList.innerHTML = "";
    categoryList.innerHTML = `
        <option value="">Select task category</option>
        <option value="">Create new category</option>
        `;
}


function checkCategorySelection() {
    let categoryList = document.getElementById('addtaskMenuCategory');
    let selectedCategory = categoryList.options[categoryList.selectedIndex].innerHTML;
    selectedCategory === "Create new category" ? showCreateCategory() : null;
}


function showCreateCategory() {
    let createCategory = document.getElementById('addtaskMenuCategory');
    createCategory.classList.add('d-none');
    let createCategoryInput = document.getElementById('addtaskCreateCategory');
    createCategoryInput.classList.remove('d-none');
    let progress = document.getElementById('categoryStatus');
    progress.innerHTML = "";
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("last");
}


function cancelCreateCategory() {
    stepCategory = 0;
    let createCategory = document.getElementById('addtaskMenuCategory');
    createCategory.classList.remove('d-none');
    let createCategoryInput = document.getElementById('addtaskCreateCategory');
    createCategoryInput.classList.add('d-none');
    document.getElementById('addtaskCreateCategoryInput').value = "";
    document.getElementById('addtaskCreateCategoryInput').setAttribute('placeholder', 'Name');
    // Reset the select field to default.
    createCategory.selectedIndex = 0;
}


function nextStepCategory() {
    stepCategory++;
    stepCategory === 1 ? collectCategoryName() : null;
    stepCategory === 2 ? collectCategoryColor() : null;
    stepCategory === 3 ? createCategoryInAddtask() : null;
}


function collectCategoryName() {
    if (hasNoInputValueCat() || getInputValueCat().length < 3) {
        showAlert("Please enter min 3 characters.");
        stepCategory--;
        return;
    }
    newCategory.name = getInputValueCat();
    newCategory.user = loggedUser;
    document.getElementById('addtaskCreateCategoryInput').value = "";
    document.getElementById('addtaskCreateCategoryInput').placeholder = "Enter a category color";
    let progress = document.getElementById('categoryStatus');
    progress.innerHTML = "";
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawTodo("last");
}


function collectCategoryColor() {
    if (hasNoInputValueCat() || invalidColor(getInputValueCat())) {
        showAlert("Please enter a valid color (e.g. green).");
        stepCategory--;
        return;
    }
    newCategory.color = getInputValueCat();
    createCategoryInAddtask();
}

/**
 * Checks the input value of the category input field.
 * @returns true if the input value is empty.
 */
function hasNoInputValueCat() {
    return getInputValueCat() === "" ? true : false;
}


async function createCategoryInAddtask() {
    await createCategory(newCategory);
    await getCategories();
    showAlert("Category created succesfully.");
    renderCategories();
    cancelCreateCategory();
}