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

// add click listener to check box

// Create blank list item
function createBlankListItem(itemText) {
	// increment created counter
	numberCreated++;
	// create parent div
	const listItemDiv = document.createElement('div');
	listItemDiv.setAttribute('class', 'list-item');

	// create checkbox
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'cb#' + numberCreated); // for tracking
	checkbox.setAttribute('onchange', 'toggleLineThrough(this)');
	listItemDiv.appendChild(checkbox);

	// create input text
	const listItemTextBox = document.createElement('input');
	listItemTextBox.setAttribute('class', 'list-item-text');
	listItemTextBox.setAttribute('value', itemText);
	listItemTextBox.setAttribute('id', 'tb#' + numberCreated); // for tracking
	listItemDiv.appendChild(listItemTextBox);

	// create remove button
	const removeButton = document.createElement('button');
	removeButton.setAttribute('class', 'btn remove-list-item-button');
	removeButton.innerHTML = 'X';
	removeButton.addEventListener('click', removeListItem);
	listItemDiv.appendChild(removeButton);

	return listItemDiv;
}

function removeListItem(e) {
	listItems.removeChild(e.target.parentElement);
}

function toggleLineThrough(checkBox) {
	const checkboxNumber = checkBox.getAttribute('id').substring(3);
	console.log(checkboxNumber);
	const textBoxToChange = document.getElementById('tb#' + checkboxNumber);
	console.log(textBoxToChange);

	// toggle
	if (checkBox.checked) {
		textBoxToChange.setAttribute('class', 'list-item-text line-through');
	} else {
		textBoxToChange.setAttribute('class', 'list-item-text');
	}
}

// Add Default List Items

listItems.appendChild(createBlankListItem('List Item 1'));
listItems.appendChild(createBlankListItem('List Item 2'));
listItems.appendChild(createBlankListItem('List Item 3'));
