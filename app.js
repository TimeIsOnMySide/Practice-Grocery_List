// Select items in the DOM
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// Edit option
let editElement;
let editFlag = false;
let editID = '';

// Event Listeners
// Submit form
form.addEventListener("submit", addItem);
// Clear items
clearBtn.addEventListener('click', clearItems);
// Load items
window.addEventListener('DOMContentLoaded', setupItems);



//Functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value);
        // display alert
        displayAlert('Item added to the list', 'success');
        // show container
        container.classList.add('show-container');
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        // editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('please enter value', 'danger');
    }
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert after timeout
    setTimeout(function() {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}

// Clear items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete item function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('Item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    // removeFromLocalStorage(id);
}

// edit item function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

// set back to default
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// Local storage
function addToLocalStorage(id, value) {
    const grocery = {id:id, value:value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items))
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function(item) {
        if(item.id != id) {
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage (id, value) {
     let items = getLocalStorage();
     items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
     })
     localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem('list') 
    ?JSON.parse(localStorage.getItem('list'))
    : [];
}

// Setup items
function setupItems() {
    let items = getLocalStorage();
    if(items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        })
        container.classList.add('show-container');
    }
}

function createListItem(id, value) {
    const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');
        // add ID
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = 
            `<p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn"><i class="fas fa-edit"></i>
                <button type="button" class="delete-btn"><i class="fas fa-trash"></i>
                </fa-edit></button>
            </div>`;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        // append child
        list.appendChild(element);
}