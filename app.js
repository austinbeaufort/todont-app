listContainer = document.querySelector('.list');
todoInput = document.querySelector('.enter-item');

const inputHandler = e => {
    if(e.keyCode == 13) {
        let input = e.target.value;
        if (input === '') return;
        displayHandlers.clearDisplay();
        displayHandlers.createItem(input);
    }
}


const displayHandlers = {
    createItem(item) {
        let newItem = document.createElement('LI');
        newItem.innerHTML = `<p class="item" >${item}</p> <i class="fas fa-bomb"></i>`;
        newItem.classList.add('list-item');
        listContainer.appendChild(newItem);
    },

    clearDisplay() {
        todoInput.value = '';
    },

    handleClick(e) {
        let todo = e.target;
        // deleting elements
        if (todo.classList.contains('fas')) {
            let li = todo.parentElement;
            setTimeout(() => {
                li.classList.add('heartbeat');
                setTimeout(() => {
                    li.classList.add('flicker-out-2');
                    setTimeout(() => {
                        li.classList.add('hide');
                    }, 1000);
                }, 500);
            }, 0);
        }

        // toggling crossout on click
        if (todo.classList.contains('item')) {
            if (!todo.classList.contains('crossout')) {
                todo.classList.add('crossout');
                return;
            }
            todo.classList.remove('crossout');
        }
    },


}


todoInput.addEventListener('keydown', inputHandler);
listContainer.addEventListener('click', displayHandlers.handleClick);


console.log(todoInput, listContainer);