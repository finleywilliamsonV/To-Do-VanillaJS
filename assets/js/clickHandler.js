const addListItemInput = document.getElementById('new-item-text-input');
const addListItemButton = document.getElementById('add-new-list-item-button');
const listItems = document.getElementById('list-items');
let numberCreated = 0;

// add click listener to add item button
addListItemButton.addEventListener('click', function(e) {
	const listItemText = addListItemInput.value;
	// return if no text
	if (!listItemText) return;
	listItems.appendChild(createBlankListItem(listItemText));
	addListItemInput.value = '';
});

// Create and return new blank list item
function createBlankListItem(itemText) {
	// increment number created
	numberCreated++;

	// create parent div
	const listItemDiv = document.createElement('div');
	listItemDiv.setAttribute('class', 'input-group list-item my-1');

	// create prepend div
	const prependDiv = document.createElement('div');
	prependDiv.setAttribute('class', 'input-group-prepend');
	listItemDiv.appendChild(prependDiv);

	// create input group text div
	const inputGroupTextDiv = document.createElement('div');
	inputGroupTextDiv.setAttribute('class', 'input-group-text');
	prependDiv.appendChild(inputGroupTextDiv);

	// create checkbox
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'cb#' + numberCreated); // for tracking
	checkbox.setAttribute('onchange', 'toggleLineThrough(this)');
	checkbox.setAttribute('aria-label', 'Checkbox for to-do list item');
	inputGroupTextDiv.appendChild(checkbox);

	// create input text
	const listItemTextBox = document.createElement('input');
	listItemTextBox.setAttribute('type', 'text');
	listItemTextBox.setAttribute('class', 'form-control list-item-text mx-1');
	listItemTextBox.setAttribute('value', itemText);
	listItemTextBox.setAttribute('id', 'tb#' + numberCreated); // for tracking
	listItemTextBox.setAttribute('aria-label', 'Edit existing to-do list item');
	listItemDiv.appendChild(listItemTextBox);

	// create remove button
	const removeButton = document.createElement('button');
	removeButton.setAttribute('class', 'btn btn-danger remove-list-item-button');
	removeButton.innerHTML = 'X';
	removeButton.addEventListener('click', removeListItem);
	listItemDiv.appendChild(removeButton);

	return listItemDiv;
}

// remove list item
function removeListItem(e) {
	listItems.removeChild(e.target.parentElement);
}

// apply/remove line-through to list item text
function toggleLineThrough(checkBox) {
	const checkboxNumber = checkBox.getAttribute('id').substring(3);
	console.log(checkboxNumber);
	const textBoxToChange = document.getElementById('tb#' + checkboxNumber);
	console.log(textBoxToChange);

	// toggle
	if (checkBox.checked) {
		textBoxToChange.setAttribute('class', 'form-control list-item-text line-through mx-1');
	} else {
		textBoxToChange.setAttribute('class', 'form-control list-item-text mx-1');
	}
}

// Add Default List Items
listItems.appendChild(createBlankListItem('Walk the dog'));
listItems.appendChild(createBlankListItem('Clean room'));
listItems.appendChild(createBlankListItem('Learn Angular.js'));
