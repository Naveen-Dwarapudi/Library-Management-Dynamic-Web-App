let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");


let createAndAppendResults = (results) => {
    let bookContainer = document.createElement('div');
    bookContainer.classList.add("col-6");

    let bookImage = document.createElement('img');
    let authorName = document.createElement('p');

    bookImage.src = results.imageLink;
    authorName.textContent = results.author;
    authorName.style.textAlign = "center";
    authorName.style.color = "#323f4b";
    authorName.style.fontSize = "14px";
    authorName.classList.add("mt-2");

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(authorName);
    searchResults.appendChild(bookContainer);
}

let createAndAppendMessage = (message, align) => {
    let messageEl = document.createElement('h2');
    messageEl.textContent = message;
    if (align === "center") {
        // messageEl.style.textAlign = align;
        messageEl.classList.add('text-center');
    }
    messageEl.style.color = "#323f4b";
    searchResults.appendChild(messageEl);
}

let displayResults = (results) => {
    if (results.length !== 0) {
        createAndAppendMessage("Popular Books", "left");
        for (let book of results) {
            createAndAppendResults(book);
        }
    } else {
        createAndAppendMessage("No results found", "center");
    }
}

let getBooks = () => {
    let url = "https://apis.ccbp.in/book-store" +
        "?title=" +
        searchInput.value;

    spinner.classList.toggle('d-none');
    fetch(url).then((res) => {
        return res.json();
    }).then((jsonRes) => {
        spinner.classList.toggle('d-none');
        displayResults(jsonRes.search_results);
    });
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchResults.textContent = "";
        if (searchInput.value !== "") {
            getBooks();
        }
    }
})