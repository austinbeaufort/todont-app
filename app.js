let listContainer = document.querySelector('.list');
let todoInput = document.querySelector('.enter-item');
let button = document.querySelector('.button');

const inputHandler = e => {
    if(e.keyCode == 13) {
        let input = e.target.value;
        if (input === '') return;
        displayHandlers.clearDisplay();
        displayHandlers.createItem(input);
        // put item in local storage
        localStorage.setItem(input, input);
        if (localStorage.length >= 2) {
            button.disabled = false;
        }
    }
}

// helps prevent XSS attacks.
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

const displayHandlers = {
    createItem(item) {
        let newItem = document.createElement('LI');
        newItem.innerHTML = `<p class="item" style="font-familly: 'Indie Flower', cursive" >${sanitizeHTML(item)}</p> <i class="fas fa-bomb"></i>`;
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
            // remove item from local storage
            let storageValue = li.firstChild.textContent;
            localStorage.removeItem(storageValue);
            if (localStorage.length < 2) {
                button.disabled = true;
            }
            // animation
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
    
    clearAllHandler() {
        localStorage.clear();
        let lis = document.querySelectorAll('li');
        lis.forEach(li => {
            li.classList.add('hide');
        })
        button.disabled = true;
    }
}


// render local storage to screen 
const storageHandler = () => {
    window.onload = () => {
        keys = Object.keys(localStorage);
        keys.forEach(key => {
            displayHandlers.createItem(key);
        });
        if (localStorage.length >= 2) {
            button.disabled = false;
        }
    }
}
storageHandler();


// clear all items including local storage
button.addEventListener('click', displayHandlers.clearAllHandler);

todoInput.addEventListener('keydown', inputHandler);
listContainer.addEventListener('click', displayHandlers.handleClick);

