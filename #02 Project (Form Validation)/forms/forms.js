function myFunction(){

var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var pass = document.getElementById("pass").value;
var confirmPass = document.getElementById("confirm-pass").value;
var message = document.getElementById("message");

try{
  if(name == "") throw "fill in your name";
  if(name.length < 5) throw "please enter a full name";
  if(email == "") throw "fill in your email";
  // if (email !== "") throw "incorrect email";
  if(pass == "") throw "fill in your password";
  if(pass.length < 8) throw "password is too short";
  if(confirmPass == "") throw "confirm your password";
  if(pass !== confirmPass) throw "password does not match";
  
 else{
     message.innerHTML = "";
     return false;
 }

}
catch(err){
    message.innerHTML = err;
}
}

/*  function myForm(){

    var name = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
    var message = document.getElementById("message");
    
    try{
    if(name == "") throw "fill in your name";
    if(name.length < 4) throw "name is too short";
    if(pass == "") throw "fill in your password";
    if(pass.length < 8) throw "password is to short";
    
    
    }
    catch(err){
        message.innerHTML =  err;
    }
    } */
    
    

