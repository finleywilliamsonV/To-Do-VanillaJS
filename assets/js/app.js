(function(domHelper) {
  const $addListItemInput = document.getElementById('new-item-text');
  const $addListItemButton = document.getElementById('add-new-item-button');
  const $listItemsDiv = document.getElementById('list-items');
  const $clearCheckedItemsButton = document.getElementById('clear-checked-items');
  const $tasksCompletedText = document.getElementById('tasks-completed-text');
  const $tasksCompleted = document.getElementsByClassName('line-through');

  const app = {
    constructor() {
      this.state = {
        todos: [],
      }

      this.setup();
    },
    setup() {
      $addListItemButton.addEventListener('click', this.handleAddTodo.bind(this));

      return this;
    },
    handleAddTodo(e) {
      const text = $addListItemInput.value;

      if (text.length >= 1) {
        this.state.todos.push({
          index: this.state.todos.length,
          checked: false,
          text: text,
        });

        return this.buildListItems();
      }

      return;
    },
    buildListItems() {
      $listItemsDiv.innerHTML = '';

      /**
       * Builds a new list item
       * @param {Object} item - todo list item from state
       */
      function build(item) {
        const li = domHelper.buildListItem(item.index);
        const input = domHelper.buildItemInput(item.text);
        const deleteButton = domHelper.buildButton('delete');
        const checkButton = domHelper.buildButton();

        li.appendChild(checkButton);
        li.appendChild(input);
        li.appendChild(deleteButton);

        $listItemsDiv.appendChild(li);
        $addListItemInput.value = '';

        li.addEventListener('click', this.handleTodoClick.bind(this));
      }

      return this.state.todos.forEach(build.bind(this));
    },
    handleTodoClick(e) {
      const target = e.target;
      const index = parseInt(target.parentElement.getAttribute('data-index'));

      if (target.classList.contains('remove-list-item-button')) {
        const modState = this.state.todos.slice(0, index).concat(this.state.todos.slice(index + 1));

        modState.forEach(function(item, index) {
          return item.index = index;
        });

        this.state.todos = modState;
        this.buildListItems();
      } else if (target.classList.contains()){
        
      } else if (target.classList.contains()){
      
      }
    }
  }

}(domHelper || {}));
