"use strict";

function addScript(src) {
    const script = document.createElement("script");
    script.type = "module";
    script.src = chrome.runtime.getURL(src);
    (document.body || document.head || document.documentElement).appendChild(script);
}
function addScript1(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(src);
    (document.body || document.head || document.documentElement).appendChild(script);
}

addScript("/src/gmailJsLoader.js");
addScript1("/src/aes.js");
addScript("/src/extension.js");
addScript("/src/firebase-app.js");
addScript("/src/firebase-auth.js");
addScript("/src/firebase-database.js");

