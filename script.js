let books = "https://books-backend.p.goit.global/books/top-books";
let Categorybooks = "https://books-backend.p.goit.global/books/category?category=";
let category = "https://books-backend.p.goit.global/books/category-list";
let action = false;
let mode = document.querySelector("#mode");
let circle = document.querySelector("#round-button");
let body = document.querySelector("body");
let navbar = document.querySelector("#navbar");
let heading = document.querySelector("h1");
let categoryList = document.querySelector(".category-list");


window.addEventListener("load", () => {
    getBook("All Categories");
});

getCategory();

async function getCategory(){
    const result = await fetchApi(category);
    // console.log(result);
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
        li.id = obj.list_name;
        fregment.append(li);
    });
    categoryList.append(fregment);
    const dataId = document.querySelectorAll("li");
    dataId.forEach((data) => {
        data.addEventListener("click", (e) => {
            checkIsActive(dataId);
            e.target.classList.add("active");
            getBook(data.id);
        });
    });
}

function checkIsActive(dataId){
    dataId.forEach((data) => {
        if(data.classList.contains("active")){
            data.classList.remove("active");
        }
    })
}

// Get Books 
async function getBook(id) {
    if(id === "All Categories"){
        const result = await fetchApi(books);
        console.log(result);
        diplayBooks(result, id);
    }else{
        const result = await fetchApi(Categorybooks + `${id}`);
        diplayBooks(result, id);
    }
}

const rightData = document.querySelector("#right");
function diplayBooks(result, id){
    rightData.innerHTML = "";
    if(id === "All Categories"){
        const heading = document.createElement("h1");
        const span = document.createElement("span");
        heading.innerHTML = "Best Sellers";
        span.innerText = " Books";
        span.style.color = "#4f2ee8";
        heading.append(span);

        heading.classList.add("heading");
        const fregment = document.createDocumentFragment();
        result.forEach((obj) => {
            const parent = document.createElement("div");
            const category = document.createElement("h3");
            const cardContainer = document.createElement("div");

            parent.classList.add("parent");
            cardContainer.classList.add("card-Container");
            obj.books.forEach((data) => {
                const cards = document.createElement("div");
                const img = document.createElement("img");
                const title = document.createElement("h5");
                const author = document.createElement("p");

                category.innerText = `${data.list_name}`;
                
                img.src = `${data.book_image}`;
                title.innerText = `${data.title}`;
                author.innerText = `${data.author}`;

                cards.classList.add("card");
                category.classList.add("category");
                img.classList.add("image");
                title.classList.add("title");
                author.classList.add("author");

                cards.append(img, title, author);
                cardContainer.append(cards);
            })
            parent.append(category, cardContainer);
            fregment.append(parent);
        });
        rightData.append(heading, fregment);
    }else{
        const heading = document.createElement("h1");
        const span = document.createElement("span");
        let arr = id.split(" ");
        let changeStyleWord = arr.pop();
        let remaningWord = arr.join(" ");
        span.innerText = " " + changeStyleWord;
        heading.innerText = remaningWord;
        heading.classList.add("heading");
        span.style.color = "#4f2ee8";
        heading.append(span);
        const fregment = document.createDocumentFragment();
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-Container");
        result.forEach((obj) => {
            const cards = document.createElement("div");
            const img = document.createElement("img");
            const title = document.createElement("h5");
            const author = document.createElement("p");

            img.src = `${obj.book_image}`;
            title.innerText = `${obj.title}`;
            author.innerText = `${obj.author}`;

            cards.classList.add("card");
            img.classList.add("image");
            title.classList.add("title");
            author.classList.add("author");

            cards.append(img, title, author);
            fregment.append(cards);
        });
        cardContainer.append(fregment);
        rightData.append(heading, cardContainer);
        console.log(result);
    }
}

mode.addEventListener("click", () => {
        const allHeadingAndPragraphs = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p")
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
        allHeadingAndPragraphs.forEach((element) => {
            element.style.color = "white";
        })
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
        allHeadingAndPragraphs.forEach((element) => {
            element.style.color = "black";
        })
        action = false;
    }
});