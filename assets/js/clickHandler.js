const addListItemInput = document.getElementById('new-item-text');
const addListItemButton = document.getElementById('add-new-item-button');
const listItemsDiv = document.getElementById('list-items');
const clearCheckedItemsButton = document.getElementById('clear-checked-items');
const tasksCompletedText = document.getElementById('tasks-completed-text');
const tasksCompleted = document.getElementsByClassName('line-through');

let numberCreated = 0;

// add click listener to add item button
addListItemButton.addEventListener('click', function(e) {
	const listItemText = addListItemInput.value;
	// return if no text
	if (!listItemText) return;
	listItemsDiv.appendChild(createBlankListItem(listItemText));
	addListItemInput.value = '';

	checkButtonDisplay();
});

// Create and return new blank list item
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

// remove list item
function removeListItem(e) {
	listItemsDiv.removeChild(e.target.parentElement);
}

// apply/remove line-through to list item text
function toggleLineThrough(checkBox) {
	const checkboxNumber = checkBox.getAttribute('id').substring(3);
	// console.log(checkboxNumber);
	const textBoxToChange = document.getElementById('tb-' + checkboxNumber);
	// console.log(textBoxToChange);

	// toggle
	if (checkBox.checked) {
		textBoxToChange.setAttribute('class', 'form-control list-item-text line-through');
	} else {
		textBoxToChange.setAttribute('class', 'form-control list-item-text');
	}

	updateTasksCompleted();
	checkButtonDisplay();
}

function updateTasksCompleted() {
	// update tasks completed
	tasksCompletedText.innerText = tasksCompleted.length + ' TASK';
	if (tasksCompleted.length != 1) tasksCompletedText.innerText += 'S';
	tasksCompletedText.innerText += ' COMPLETED';
}

// add click handler to clear checked items button
clearCheckedItemsButton.addEventListener('click', function(e) {
	const checkedItems = document.getElementsByClassName('line-through');
	for (let i = checkedItems.length - 1; i >= 0; i--) {
		listItemsDiv.removeChild(checkedItems[i].parentElement);
	}
	updateTasksCompleted();
	checkButtonDisplay();
});

// toggle display of clear checked items button
function checkButtonDisplay() {
	const checkedItems = document.getElementsByClassName('line-through');
	if (checkedItems.length === 0) {
		clearCheckedItemsButton.setAttribute('style', 'display: none');
	} else {
		clearCheckedItemsButton.setAttribute('style', 'display: block');
	}
}

// Add Default List Items
listItemsDiv.appendChild(createBlankListItem('Walk the dog'));
listItemsDiv.appendChild(createBlankListItem('Clean room'));
listItemsDiv.appendChild(createBlankListItem('Learn Angular.js'));

checkButtonDisplay();
