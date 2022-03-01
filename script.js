let message = document.querySelector('.message');
let buttonAdd = document.querySelector('.add');
let todo = document.querySelector('.todo');
let buttonClear = document.querySelector('.clear');
let mySpan = document.querySelector('#mySpan')

let toDoList = [];

window.onload = function () {
    if (localStorage.getItem('todo')) {
        toDoList = JSON.parse(localStorage.getItem('todo'));
        displayMessages();
    } else {
        console.log('No data yet...')
    };

    message.addEventListener('focus', function () {
        document.getElementById('colorInput').style.background = 'white';
        mySpan.style.display = 'none';
        message.value = '';
    })

    buttonAdd.addEventListener('click', function () {
        let newToDoObj = {
            todo: message.value,
            checked: false,
            important: false,
        };
        if (message.value.length < 20) {
            if (message.value != '') {
                let exist = false
                for (item of toDoList) {
                    if (item['todo'] === message.value) {
                        exist = true
                        message.value = ""
                        return changeInputColor()
                    }
                }

                if (!exist) {
                    toDoList.push(newToDoObj);
                    displayMessages();
                    localStorage.setItem('todo', JSON.stringify(toDoList));
                    message.value = '';
                }
            }
        } else {

        }
    });

    buttonClear.addEventListener('click', function () {
        location.reload()
        localStorage.removeItem('todo')
    })

    todo.addEventListener('change', function (event) {
        let idInput = event.target.getAttribute('id');
        let forLabel = todo.querySelector('[for=' + idInput + ']');
        let valueLabel = forLabel.innerHTML

        toDoList.forEach(function (item) {
            if (item.todo === valueLabel) {
                item.checked = !item.checked;
                localStorage.setItem('todo', JSON.stringify(toDoList));
            }
        })
    });

    todo.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        toDoList.forEach(function (item, index) {
            if (item.checked === true) {
                if (item.todo === e.target.innerHTML) {
                    toDoList.splice(index, 1);
                }
                displayMessages();
                localStorage.setItem('todo', JSON.stringify(toDoList));
            }
        })

        toDoList.forEach(function (item) {
            if (item.todo === e.target.innerHTML) {
                item.important = !item.important;
                displayMessages();
                localStorage.setItem('todo', JSON.stringify(toDoList));
            }
        })
    });
};

function displayMessages() {
    let displayMessage = '';
    if (toDoList.length === 0) todo.innerHTML = '';
    toDoList.forEach(function (item, index) {
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
        <label for='item_${index}' class=${item.important ? 'important' : ''}>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
};

function changeInputColor() {
    mySpan.style.display = 'inline-block'
};