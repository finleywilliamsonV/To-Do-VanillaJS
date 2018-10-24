// Add key listener to textbox, so enter submits
const input = document.getElementById('new-item-text');

input.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    document.getElementById('add-new-item-button').click();
  }
});
