/* TODO;
 * Function that replaces submit form by element that indicates succes or failure of post request
 */

const content = document.getElementById("content");
const submitButton = document.getElementById("submitButton");
const url = "https://typical-web-app.herokuapp.com/";

getLinks(url);
submitButton.addEventListener("click", makeSubmit, { once: true });

// All necessary functions
function makeSubmit() {
  const submitForm = makeSubmitForm();
  content.insertAdjacentElement("beforebegin", submitForm);
}

function makeSubmitForm() {
  const form = document.createElement("form");
  form.classList.add("linkForm");
  form.classList.add("form-inline");

  // Create input fields
  const authorField = createInputElement("author", "Enter author", 20);
  const titleField = createInputElement("title", "Enter link title", 40);
  const urlField = createInputElement("url", "Enter link URL", 40);
  const submissionButton = createSubmitButton();

  form.append(authorField, titleField, urlField, submissionButton);
  form.addEventListener("submit", performPostRequest);
  return form;
}

function createInputElement(name, placeholder, size) {
  const input = document.createElement("input");
  input.type = "text";
  input.setAttribute("name", name);
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("size", size);
  input.setAttribute("required", "true");
  input.classList.add("form-control");
  return input;
}

function performPostRequest(event) {
  // event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target).entries());
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
}

function createSubmitButton() {
  const button = document.createElement("input");
  button.type = "submit";
  button.value = "Add link";
  button.classList.add("btn");
  button.classList.add("btn-primary");
  return button;
}

function getLinks(url) {
  fetch(url)
    .then((response) => response.json())
    .then((links) => {
      console.log(links);
      content.append(...links.map((link) => fillContent(link)));
    });
}

function fillContent(element) {
  const container = document.createElement("div");
  const author = makeAuthorElement(element);
  const url = makeURLElement(element);
  const title = makeTitleElement(element);
  const headline = makeHeadlineElement(element, url, title);
  container.classList.add("link");
  container.append(headline, author);
  return container;
}

function makeHeadlineElement(element, url, title) {
  const headline = document.createElement("h4");
  headline.classList.add("linkHeadline");
  headline.appendChild(title);
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
  url.classList.add("linkUrl");
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

function showPostMessage() {
  const message = document.createElement("div");
  message.textContent = "A request was sent!";
  message.classList.add()
}