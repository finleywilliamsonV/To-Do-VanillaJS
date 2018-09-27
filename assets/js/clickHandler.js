const addListItemInput = document.getElementById('new-item-text');
const addListItemButton = document.getElementById('add-new-item-button');
const listItemsDiv = document.getElementById('list-items');
const clearCheckedItemsButton = document.getElementById('clear-checked-items');
const tasksCompletedText = document.getElementById('tasks-completed-text');
const tasksCompleted = document.getElementsByClassName('line-through');

let numberCreated = 0;

// setup code ___________________________________________________
addListeners();
// Add Default List Items
listItemsDiv.appendChild(createBlankListItem('Walk the dog'));
listItemsDiv.appendChild(createBlankListItem('Clean room'));
listItemsDiv.appendChild(createBlankListItem('Learn Angular.js'));
// Check "clear checked items" button display
checkButtonDisplay();
// ______________________________________________________________

/**
 * Adds click listeners to "add item" button & "clear checked items" button
 */
function addListeners() {
	// add click listener to add item button [+]
	addListItemButton.addEventListener('click', function(e) {
		const listItemText = addListItemInput.value;
		// return if no text
		if (!listItemText) return;
		// create the new list item
		listItemsDiv.appendChild(createBlankListItem(listItemText));
		addListItemInput.value = '';

		checkButtonDisplay();
	});

	// add click listener to clear checked items button
	clearCheckedItemsButton.addEventListener('click', function(e) {
		const checkedItems = document.getElementsByClassName('line-through');
		for (let i = checkedItems.length - 1; i >= 0; i--) {
			listItemsDiv.removeChild(checkedItems[i].parentElement);
		}
		updateTasksCompleted();
		checkButtonDisplay();
	});
}

/**
 * Create and return new blank list item
 * @param {itemText} String text of new item
 */
function createBlankListItem(itemText) {
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
	checkbox.setAttribute('onchange', 'toggleLineThrough(this)');
	checkbox.setAttribute('aria-label', 'Checkbox for to-do list item');
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
	listItemTextBox.setAttribute('value', itemText);
	listItemTextBox.setAttribute('id', 'tb-' + numberCreated); // for tracking
	listItemTextBox.setAttribute('aria-label', 'Edit existing to-do list item');
	listItemDiv.appendChild(listItemTextBox);

	// create remove button
	const removeButton = document.createElement('button');
	removeButton.setAttribute('class', 'btn btn-danger btn-rounded remove-list-item-button');
	removeButton.innerHTML = 'X';
	removeButton.addEventListener('click', removeListItem);
	listItemDiv.appendChild(removeButton);

	return listItemDiv;
}

/**
 * Removes a specified list item
 * @param {Event} e - Click event from remove item button
 */
function removeListItem(e) {
	listItemsDiv.removeChild(e.target.parentElement);
}

/**
 * Applies/removes line-through to list item text
 * @param {div} checkBox - Which checkbox was clicked
 */
function toggleLineThrough(checkBox) {
	const checkboxNumber = checkBox.getAttribute('id').substring(3);
	const textBoxToChange = document.getElementById('tb-' + checkboxNumber);

	// add/remove line-through class to textbox
	if (checkBox.checked) {
		textBoxToChange.setAttribute('class', 'form-control list-item-text line-through');
	} else {
		textBoxToChange.setAttribute('class', 'form-control list-item-text');
	}

	updateTasksCompleted();
	checkButtonDisplay();
}

/**
 * Updates tasks completed text
 */
function updateTasksCompleted() {
	tasksCompletedText.innerText = tasksCompleted.length + ' TASK';
	if (tasksCompleted.length != 1) tasksCompletedText.innerText += 'S';
	tasksCompletedText.innerText += ' COMPLETED';
}

/**
 * Toggles display of "clear checked items" button
 */
function checkButtonDisplay() {
	const checkedItems = document.getElementsByClassName('line-through');
	if (checkedItems.length === 0) {
		clearCheckedItemsButton.setAttribute('style', 'display: none');
	} else {
		clearCheckedItemsButton.setAttribute('style', 'display: block');
	}
}
