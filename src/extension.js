(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";


// loader-code: wait until gmailjs has finished loading, before triggering actual extensiode-code.
const loaderId = setInterval(() => {
    if (!window._gmailjs) {
        return;
    }

    clearInterval(loaderId);
    startExtension(window._gmailjs);
}, 100);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// actual extension-code
function startExtension(gmail) {
    console.log("Extension loading...");
    window.gmail = gmail;
    var encryption="";
    gmail.observe.on("load", () => {
        var firebaseConfig = {
            apiKey: "AIzaSyDPkkSfN2OO-fiPnKnJtlVb1OZ8E1RGSlE",
            authDomain: "security-project-fe360.firebaseapp.com",
            databaseURL: "https://security-project-fe360-default-rtdb.firebaseio.com/",
            projectId: "security-project-fe360",
            storageBucket: "security-project-fe360.appspot.com",
            messagingSenderId: "52782998901",
            appId: "1:52782998901:web:90dd7133f81d63a1a41f3c"
        };
        firebase.initializeApp(firebaseConfig);
        const userEmail = gmail.get.user_email();
        console.log("Hello, " + userEmail + ". This is your extension talking!");

        gmail.observe.on("view_email", (domEmail) => {
            console.log("Looking at email:", domEmail);
            const emailData = gmail.new.get.email_data(domEmail);
            console.log("Email data:", emailData);
        });

        gmail.observe.on("compose", async (compose) => {
            console.log("New compose window is opened!", compose);
            await sleep(1000);
            console.log("The email id is " + compose.id());

            
            //Generate key
            
            // Initialize Firebase
            

            var userID = 'i8RmAqTQb1NIdVrPqjjbnYyQrIb2'
            //Append key to email body

            encryption = CryptoJS.AES.encrypt("ID", userID);
            encryption = encryption.toString().replace("/","-");
            //U2FsdGVkX1+2X//y84b6qhKzlyW76wAR0hFoMI+Mks4=
            // var mystr = mykey.update('abc', 'utf8', 'hex')
            // mystr += mykey.final('hex');
            console.log("hi");
            console.log(encryption.toString()); //34feb914c099df25794bf9ccb85bea72

            compose.subject(encryption);
        });

        gmail.observe.before('send_message', function(url, body, data, xhr){
            var body_params = xhr.xhrParams.body_params;
            var encryption_data="";
            encryption_data+="from: "+data.from.address+" to: "+data.to[0].address+ " timestamp: "+data.date +" Company: Apple";
            console.log(data);
            console.log(encryption_data);
            var encryption2 = CryptoJS.AES.encrypt(encryption_data, encryption.toString());
            console.log(encryption2.toString());
            firebase.database().ref('data/'+encryption.toString()).set({
                encrypted_data:encryption2.toString()
            });
            console.log("pushhed to db");
          });
    });
}

},{}]},{},[1]);
