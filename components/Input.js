const $template = document.createElement("template");
$template.innerHTML = `
    <div class="input-wrapper">
        <div>Link shortener</div>
        <div>
            <div>
                <div class="input">
                <div>Enter a link:</div>
                <input type="text" placeholder="Example.com">
                </div>
                <div class="short-domain">
                    <div>Short domain:</div>
                    <div class="short-link">shrtco.de</div>
                    <div class="short-link">9qr.de</div>
                    <div class="short-link">shiny.link</div>
                </div>
            </div>
            <button><i class="fas fa-arrow-right"></i></button>
        </div>
    </div>
    <div class="result">
        <div>Result:</div>
        <div class="answer"></div>
    </div>
`;

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$shortLink = this.querySelectorAll(".short-link");
        this.$button = this.querySelector("button");
        this.$input = this.querySelector("input");
        this.$answer = this.querySelector(".answer");
    }
    static get observedAttributes() {
        return [];
    }
    //chay khi gia tri cua thuoc tinh vua khai bao thay doi
    attributeChangedCallback(attrName, oldValue, newValue) {}
    connectedCallback() {
        this.$shortLink[0].classList.add("focus");

        this.$shortLink.forEach((value) => {
            value.onclick = () => {
                this.$shortLink.forEach((i) => {
                    i.classList.remove("focus");
                });
                value.classList.add("focus");
            };
        });
        this.$button.onclick = () => {
            let http = this.$input.value;
            if (http.indexOf("http://") == 0 || http.indexOf("https://") == 0) {
                http = http.split("//")[1];
                this.getShortLink(http);
            } else if (
                http.indexOf("shrtco.de") == 0 ||
                http.indexOf("9qr.de") == 0 ||
                http.indexOf("shiny.link") == 0
            ) {
                http = http.split("/");
                let tmp = "";
                for (let i = 1; i < http.length; i++) {
                    tmp = tmp + http[i];
                    if (i != http.length - 1) {
                        tmp += "/";
                    }
                }
                this.getLongLink(tmp);
            }
        };
    }
    async getShortLink(http) {
        await axios
            .get("https://api.shrtco.de/v2/shorten?url=" + http)
            .then((response) => {
                console.log(response);
                this.$answer.innerHTML = response.data.result["short_link"];
                this.$input.value =""
            });
    }
    async getLongLink(http) {
        await axios
            .get("https://api.shrtco.de/v2/info?code=" + http)
            .then((response) => {
                console.log(response);
                this.$answer.innerHTML = response.data.result["url"];
                this.$input.value=""
            });
    }
}

window.customElements.define("input-wrapper", InputWrapper);
