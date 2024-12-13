
//signup button functionality
const signupbtn = document.getElementById("button1");

signupbtn.addEventListener("click", function () {
    const maindiv = document.getElementById("x"); // Access the first element
    maindiv.style.display = "flex";
});

document.getElementById("closesignup").addEventListener("click", () => {
    document.getElementById("x").style.display = "none";
})
// signup ends here



//add todo 
document.getElementById("addTodoBtn").addEventListener("click", function () {
    document.getElementById("maintodos").style.display = "flex";
})

// add cancel button functionality
document.getElementById("submitTodo").addEventListener("click", function () {
    document.getElementById("maintodos").style.display = "none";
})

document.getElementById("cancelTodo").addEventListener("click", function () {
    document.getElementById("maintodos").style.display = "none";
})
// ends here add cancel





/*inside todo */
const addTodoBtn = document.getElementById("addTodoBtn");
const mainTodo = document.getElementById("maintodos");
const submitTodo = document.getElementById("submitTodo");
const cancelTodo = document.getElementById("cancelTodo");
const todoList = document.getElementById("todoList");
const todoTitle = document.getElementById("todoTitle");
const todoDescription = document.getElementById("todoDescription");
const todomain = document.getElementsByClassName("todomain")[0];

submitTodo.addEventListener("click", () => {
    const title = todoTitle.value.trim();
    const description = todoDescription.value.trim();

    if (title && description) {
        const newTodo = document.createElement("div");
        newTodo.classList.add("todo-list");
        newTodo.innerHTML = `
        
            <div class="headtodo" id="todoList">
                <div id="titlepara">
                    <h3>${title}</h3>
                </div>
                <div id="deletetodo">
                    <button class="delete-btn">delete</button>
                </div>
            </div>
            <div id="descriptionpara">
                <p>${description}</p>
            </div>
        
            `;

        todomain.appendChild(newTodo);

        mainTodo.style.display = "none";
        clearForm();
    } else {
        alert("please fill the required fields");
    }
});

function clearForm() {
    todoTitle.value = "";
    todoDescription.value = "";
}


//on delete button inside todo list
// Event listener to handle delete button clicks
todomain.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const todoItem = event.target.closest(".todo-list"); // Find the closest parent with the 'todo-list' class
        if (todoItem) {
            todoItem.remove(); // Remove the todo item from the DOM
        }
    }
});

