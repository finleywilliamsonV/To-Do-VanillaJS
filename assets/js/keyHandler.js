var input = document.getElementById('new-item-text-input');

input.addEventListener('keyup', function(e) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById('add-new-list-item-button').click();
	}
});
