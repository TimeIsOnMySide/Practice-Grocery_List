// Select items in the DOM
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear btn');

// Edit option
let editElement;
let editFlag = false;
let editID = '';

// Event Listeners
// Submit form
form.addEventListener("submit", addItem);
// Clear items
clearBtn.addEventListener('click', clearItems);

//Functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
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
        // append child
        list.appendChild(element);
        // display alert
        displayAlert('Item added to the list', 'success');
        // show container
        container.classList.add('show-container');
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value && editFlag) {

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
    }, 1500)
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
    // localStorage.removeItem('list');
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
    console.log('add to local storage');
}