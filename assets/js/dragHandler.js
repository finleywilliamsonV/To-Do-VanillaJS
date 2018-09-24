const Sortable = window.Sortable.default;

const sortable = new Sortable(document.getElementById('list-items'), {
	draggable: '.list-item',
});

// let listItems = document.getElementsByClassName('list-item');

// console.log(listItems);

// for (let i = 0; i < listItems.length; i++) {
// 	listItems[i].addEventListener('sortable:start', function(e) {
// 		console.log('IT WORKED!');
// 	});
// }
