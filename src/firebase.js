// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPkkSfN2OO-fiPnKnJtlVb1OZ8E1RGSlE",
  authDomain: "security-project-fe360.firebaseapp.com",
  databaseURL: "https://security-project-fe360-default-rtdb.firebaseio.com/",
  projectId: "security-project-fe360",
  storageBucket: "security-project-fe360.appspot.com",
  messagingSenderId: "52782998901",
  appId: "1:52782998901:web:90dd7133f81d63a1a41f3c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if(msg.command == 'checkAuth'){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      response({type: "auth", status: "success", message: user});
    } else {
      // No user is signed in.
      response({type: "auth", status: "no-auth", message: false});
    }
  }
  if(msg.command == 'logoutAuth'){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      response({type: "un-auth", status: "success", message: true});
    }, function(error) {
      // An error happened.
      response({type: "un-auth", status: "false", message: error});
    });
  }
  if(msg.command == 'loginUser'){
    console.log(msg.data);
    var email = msg.data.e;
    var pass = msg.data.p;
    //Add seperate values for auth info here instead of fixed variables...
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      response({type: "auth", status: "error", message: error});
      // ...
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        response({type: "auth", status: "success", message: user});
      } else {
        // No user is signed in.
      }
    });
  }
  if(msg.command == 'search_db'){
    console.log(msg.data);
    var key = msg.data.key;
    firebase.database().ref("data/"+key).on('value',function(snapshot){
      
      if(snapshot.val()!=null){
        var encryptedData = snapshot.val().encrypted_data
        console.log(encryptedData);
        var decrypted=CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
        console.log(decrypted);
        response({type:"search",status:"success",message: decrypted});
      }
      else{
        response({type:"search",status:"failure"});
      }
      
    });
  }
  return true;
});