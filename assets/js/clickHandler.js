const addListItemInput = document.getElementById('new-item-text');
const addListItemButton = document.getElementById('add-new-item-button');
const listItemsDiv = document.getElementById('list-items');
const clearCheckedItemsButton = document.getElementById('clear-checked-items');
const tasksCompletedText = document.getElementById('tasks-completed-text');
const tasksCompleted = document.getElementsByClassName('line-through');

let numberCreated = 0;

// setup code ___________________________________________________
addListeners();
restoreLocalStorage();

// Check "clear checked items" button display
checkButtonDisplay();
// ______________________________________________________________

/**
 * Adds click listeners to "add item" button & "clear checked items" button.
 */
function addListeners() {
  // add click listener to add item button [+]
  addListItemButton.addEventListener('click', function(e) {
    const listItemText = addListItemInput.value;
    // return if no text
    if (!listItemText) return;
    // create the new list item
    listItemsDiv.appendChild(createNewListItem(listItemText));
    addListItemInput.value = '';

    checkButtonDisplay();
    updateLocalStorage();
  });

  // add click listener to clear checked items button
  clearCheckedItemsButton.addEventListener('click', function(e) {
    const checkedItems = document.getElementsByClassName('line-through');
    for (let i = checkedItems.length - 1; i >= 0; i--) {
      listItemsDiv.removeChild(checkedItems[i].parentElement);
    }
    updateLocalStorage();
    updateTasksCompleted();
    checkButtonDisplay();
  });
}

/**
 * Create and return new blank list item.
 * @param {String} itemText text of new item
 * @param {boolean} isCompleted whether item is already marked completed
 * @return {Object} listItemDiv the newly created list item.
 */
function createNewListItem(itemText, isCompleted = false) {
  // increment number created
  numberCreated++;

  // create parent div
  const listItemDiv = document.createElement('div');
  listItemDiv.setAttribute('class', 'input-group list-item');

  // create prepend div
  const prependDiv = document.createElement('div');
  prependDiv.setAttribute('class', 'input-group-prepend');
  listItemDiv.appendChild(prependDiv);

  // create input group text div
  const inputGroupTextDiv = document.createElement('div');
  inputGroupTextDiv.setAttribute('class', 'input-group-text');
  prependDiv.appendChild(inputGroupTextDiv);

  // create custom checkbox label
  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('class', 'checkbox-container');
  // create checkbox
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'cb#' + numberCreated); // for tracking
  checkbox.setAttribute('aria-label', 'Checkbox for to-do list item');
  checkbox.addEventListener('click', function(e) {
    // get checkbox, its id number, and corresponding text box
    const checkbox = e.target;
    const checkboxNumber = checkbox.getAttribute('id').substring(3);
    const textBoxToChange = document.getElementById('tb-' + checkboxNumber);

    // add/remove line-through class to textbox.
    if (checkbox.checked) {
      textBoxToChange.setAttribute(
          'class',
          'form-control list-item-text line-through'
      );
    } else {
      textBoxToChange.setAttribute('class', 'form-control list-item-text');
    }

    updateTasksCompleted();
    checkButtonDisplay();
    updateLocalStorage();
  });
  // if is completed, check checkbox
  checkbox.checked = isCompleted;
  checkboxLabel.appendChild(checkbox);
  // create checkbox span
  const checkboxSpan = document.createElement('span');
  checkboxSpan.setAttribute('class', 'checkboxSpan');
  // append span to label
  checkboxLabel.appendChild(checkboxSpan);
  // create checkbox image
  const checkmark = document.createElement('img');
  checkmark.setAttribute('alt', 'checkmark');
  checkmark.setAttribute('class', 'checkmark');
  checkmark.setAttribute('src', './check-3.png');
  // append check to label
  checkboxLabel.appendChild(checkmark);
  // append final checkbox element
  inputGroupTextDiv.appendChild(checkboxLabel);

  // create input text
  const listItemTextBox = document.createElement('input');
  listItemTextBox.setAttribute('type', 'text');
  listItemTextBox.setAttribute('class', 'form-control list-item-text');
  // if is completed, apply linethrough
  if (isCompleted) {
    listItemTextBox
        .setAttribute('class', 'form-control list-item-text line-through');
  }
  listItemTextBox.setAttribute('value', itemText);
  listItemTextBox.setAttribute('id', 'tb-' + numberCreated); // for tracking
  listItemTextBox.setAttribute('aria-label', 'Edit existing to-do list item');
  // add listener to store changes to localstorage
  listItemTextBox.addEventListener('keyup', function(e) {
    updateLocalStorage();
  });
  listItemDiv.appendChild(listItemTextBox);

  // create remove button
  const removeButton = document.createElement('button');
  removeButton
      .setAttribute(
          'class',
          'btn btn-danger btn-rounded remove-list-item-button'
      );
  removeButton.innerHTML = 'X';
  removeButton.addEventListener('click', removeListItem);
  listItemDiv.appendChild(removeButton);

  return listItemDiv;
}

/**
 * Removes a specified list item.
 * @param {Event} e - Click event from remove item button
 */
function removeListItem(e) {
  listItemsDiv.removeChild(e.target.parentElement);
  updateLocalStorage();
  updateTasksCompleted();
  checkButtonDisplay();
}

/**
 * Updates tasks completed text.
 */
function updateTasksCompleted() {
  tasksCompletedText.innerText = tasksCompleted.length + ' TASK';
  if (tasksCompleted.length != 1) tasksCompletedText.innerText += 'S';
  tasksCompletedText.innerText += ' COMPLETED';
}

/**
 * Toggles display of "clear checked items" button.
 */
function checkButtonDisplay() {
  const checkedItems = document.getElementsByClassName('line-through');
  if (checkedItems.length === 0) {
    clearCheckedItemsButton.setAttribute('style', 'display: none');
  } else {
    clearCheckedItemsButton.setAttribute('style', 'display: block');
  }
}

/**
 * Updates local storage, reflecting list items and their completed status.
 */
function updateLocalStorage() {
  const listItems = document.getElementsByClassName('list-item');

  let currentListItem; let currentListItemText;
  let listItemsJSON = {};

  // iterate through all list items
  for (let i = 0; i < listItems.length; i++) {
    currentListItem = listItems[i];
    currentListItemText = currentListItem.children[1].value;

    const keyName = 'item-' + i;

    // check if item is marked completed
    let isCompleted = currentListItem.children[1].classList
        .contains('line-through');

    // append information onto js object
    listItemsJSON[keyName] = {
      text: currentListItemText,
      isCompleted: isCompleted,
    };
  }

  localStorage.setItem('todo-list-items', JSON.stringify(listItemsJSON));
}

/**
 * Restores list from local storage.
 */
function restoreLocalStorage() {
  const storedItems = JSON.parse(localStorage.getItem('todo-list-items'));

  if (storedItems) {
    const keys = Object.keys(storedItems);
    for (let i = 0; i < keys.length; i++) {
      listItemsDiv.appendChild(
          createNewListItem(
              storedItems[keys[i]].text, storedItems[keys[i]].isCompleted
          )
      );
    }
  } else {
    // Add Default List Items
    listItemsDiv.appendChild(createNewListItem('Ponder existance'));
    listItemsDiv.appendChild(createNewListItem('Practice napping in reverse'));
    listItemsDiv.appendChild(createNewListItem('Learn Angular.js'));
  }
}
