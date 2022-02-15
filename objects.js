class Link {
    constructor(author, title, url) {
        this.author = author;
        this.title = title;
        this.url = url.startsWith(`${"https://" || "http://"}`) ? url : `https://${url}`;
    }

    toString() {
        return `${this.title} is provided by ${this.author} and its url is ${this.url}`
    }
}


module.exports = Link;