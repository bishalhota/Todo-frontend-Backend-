
//signup button functionality
const signupbtn = document.getElementById("button1");

signupbtn.addEventListener("click", function () {
    const maindiv = document.getElementById("x"); // Access the first element
    maindiv.style.display = "flex";
});

const signinbtn = document.getElementById("button2");
signinbtn.addEventListener("click",function (){
    const maindiv = document.getElementById("y");
    maindiv.style.display = "flex";
})

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

/* connecting backend and frontend from here */
document.getElementById("closesignup").addEventListener("click",async () =>{
    const firstname = document.querySelector("input[placeholder='Firstname']").value;
    const Lastname = document.querySelector("input[placeholder='Lastname']").value;
    const email = document.querySelector("input[placeholder='Email']").value;
    const password = document.querySelector("input[placeholder='Password']").value;

    try{
        const response = await fetch("http://localhost:3000/user/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({firstname:firstname,Lastname:Lastname,email,password}),
        });

        if(response.ok){
            alert("User registered successfully!");
            document.getElementById("x").style.display="none";
        }else{
            const result = await response.json();
            alert(result.msg || "Error registering user");
        }
    }catch(error){
        console.log("Error during Signup:",error);
    }

})


//signin endpoint 
document.getElementById("closesignin").addEventListener("click",async() =>{
    const email = document.getElementById("Email2").value;
    const password = document.getElementById("Password2").value;

    try{

        const response = await fetch("http://localhost:3000/user/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password}),
        });

        if(response.ok){
            const result = await response.json();
            localStorage.setItem("token",result.token);
            document.getElementById("y").style.display="none";
            alert("Signed in Successfully!");
        }else{
            const result = await response.json();
            alert(result.msg || "Error signing user");
        }

    }catch(error){
        console.log("Error during signin:",error);
    }
})