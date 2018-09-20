const addListItemInput = document.getElementById('new-item-text-input');
const addListItemButton = document.getElementById('add-new-list-item-button');
const listItems = document.getElementById('list-items');

addListItemButton.addEventListener('click', function(e) {
	const listItemText = addListItemInput.value;

	// return if no text
	if (!listItemText) return;

	listItems.appendChild(createBlankListItem(listItemText));
	addListItemInput.value = '';
});

// Create blank list item
function createBlankListItem(itemText) {
	// create parent div
	const listItemDiv = document.createElement('div');
	listItemDiv.setAttribute('class', 'list-item');
	// create checkbox
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	listItemDiv.appendChild(checkbox);

	// create input text
	const listItemTextBox = document.createElement('input');
	listItemTextBox.setAttribute('class', 'list-item-text');
	listItemTextBox.setAttribute('value', itemText);
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
