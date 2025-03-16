let books = "https://books-backend.p.goit.global/books/top-books";
let category = "https://books-backend.p.goit.global/books/category-list";
let action = false;
let mode = document.querySelector("#mode");
let circle = document.querySelector("#round-button");
let body = document.querySelector("body");
let navbar = document.querySelector("#navbar");
let heading = document.querySelector("h1");
let categoryList = document.querySelector(".category-list");

mode.addEventListener("click", () => {
    if(action == false){
        circle.classList.add("circle-move");
        body.style.backgroundColor = "#202024";
        navbar.classList.add("bg-black");
        navbar.classList.remove("bg-white");
        navbar.style.border = "1px solid white";
        heading.classList.add("white");
        heading.classList.remove("black");
        circle.style.backgroundColor = "black";
        categoryList.style.color= "rgba(255, 255, 255, .6)";
        action = true;
    }else{
        circle.classList.remove("circle-move");
        body.style.backgroundColor = "#f6f6f6";
        navbar.classList.remove("bg-black");
        navbar.classList.add("bg-white");
        navbar.style.border = "1px solid black";
        heading.classList.add("black");
        heading.classList.remove("white");
        circle.classList.add("bg-white");
        circle.style.backgroundColor = "white";
        categoryList.style.color= "rgba(17, 17, 17, .6)";
        action = false;
    }
});

getCategory();

async function getCategory(){
    const result = await fetchApi(category);
    console.log(result);
    displayCategory(result);
}

async function fetchApi(url){
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

//add category dynamically
function displayCategory(result){
    const fregment = document.createDocumentFragment();
    result.forEach((obj) => {
        const li = document.createElement("li");
        li.innerText = obj.list_name;
        li.classList.add("category-item");
        fregment.append(li);
    });
    categoryList.append(fregment);
}