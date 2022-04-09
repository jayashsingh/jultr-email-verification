chrome.runtime.sendMessage({command: "checkAuth"}, (response) => {
    console.log(response);
    if(response.status == 'success'){
      document.querySelector('.authenticated').style.display='block';
      document.querySelector('.authenticated span').innerHTML = response.message.uid;
    }else{
      document.querySelector('.login').style.display='block';
    }
  });

  document.querySelector('.login_btn').addEventListener('click', function(){
    loginFunc();
  });
  document.querySelector('.logout_btn').addEventListener('click', function(){
    logoutFunc();
  });
  document.querySelector('.search_db').addEventListener('click', function(){
    search_db();
  });
  var loginFunc = function(){
    //Get login details from form...
    var e = document.querySelector('.login input[type="email"]').value;
    var p = document.querySelector('.login input[type="password"]').value;
    chrome.runtime.sendMessage({command: "loginUser", data:{e: e, p: p}}, (response) => {
      console.log(response);
      document.querySelector('.login').style.display='none';
      document.querySelector('.authenticated').style.display='none';
      if(response.status == 'success'){
        document.querySelector('.authenticated').style.display='block';
        document.querySelector('.authenticated span').innerHTML = response.message.uid;
      }else{
        //add Errors
        document.querySelector('.login').style.display='block';
      }
    });
  }
  var logoutFunc = function(){
    console.log("POO")
    document.querySelector('.authenticated').style.display='none';
    document.querySelector('.login').style.display='block';
    chrome.runtime.sendMessage({command: "logoutAuth"}, (response) => {
      //logout..
      console.log(response);
    });
  }

  var search_db = function(){
    console.log("POO")
    var x = document.querySelector('.login input[type="text"]').value;
    chrome.runtime.sendMessage({command: "search_db", data:{key: x}}, (response) => {
      //logout..
      if (response.status=='success'){
        document.querySelector('.login span').innerHTML = response.message;
        console.log(response);
      }
      else{
        document.querySelector('.login span').innerHTML = "This key was not found! Be careful, this email may be dangerous!"
      }
      
    });
  }