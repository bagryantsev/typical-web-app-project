const content = document.getElementById("content");


fetch("http://localhost:5000/links")
.then(response => response.json())
.then(links => {
    console.log(links)
    content.append(...links.map(link => fillContent(link)))
});

function fillContent(element) {
    const container = document.createElement("div");
    const author = makeAuthorElement(element);
    const url = makeURLElement(element);
    const title = makeTitleElement(element);
    const headline = makeHeadlineElement(element, url, title);
    container.classList.add("link")
    container.append(headline, author)
    return container;
}

function makeHeadlineElement(element, url, title) {
    const headline = document.createElement("h4");
    headline.classList.add("linkHeadline");
    headline.appendChild(title) 
    headline.appendChild(url);
    return headline;
}

function makeAuthorElement(element) {
    const span = document.createElement("span");
    span.classList.add("linkAuthor");
    span.textContent = `Submitted by ${element.author}`;
    return span;
}

function makeURLElement(element) {
    const url = document.createElement("span");
    url.classList.add("linkUrl")
    url.textContent = element.url;
    return url;
}

function makeTitleElement(element) {
    const title = document.createElement("a");
    title.classList.add("linkTitle");
    title.href = element.url;
    title.appendChild(document.createTextNode(element.title));
    return title;
}
