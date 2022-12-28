// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAN_hZwjs6nprEfL7dN5vN0xTTJGyN-eYo",
    authDomain: "grocery-5a4ef.firebaseapp.com",
    databaseURL: "https://grocery-5a4ef-default-rtdb.firebaseio.com",
    projectId: "grocery-5a4ef",
    storageBucket: "grocery-5a4ef.appspot.com",
    messagingSenderId: "107231341618",
    appId: "1:107231341618:web:6ae138fed374929d4f602b",
    measurementId: "G-7QCPF69ZHJ"
  };
  // Initialize Firebase
   
  
  firebase.initializeApp(firebaseConfig);


  firebase.analytics();
  
  

function singup(){

    var username=document.getElementById('name');
    var email=document.getElementById('email');
    var pass=document.getElementById('pass');
   
    var contact=document.getElementById('contact');
    

    firebase.auth().createUserWithEmailAndPassword(email.value,pass.value).then(function(response){

        firebase.database().ref('users').push({
            username:username.value,
            email:firebase.auth().currentUser.email,
            userId:firebase.auth().currentUser.uid,
           password:pass.value,
            contact:contact.value,
            
           });

          window.location.href="login.html"; 
    })
    .catch(function(error){

        var errorCode=error.code;
        var errorMessage=error.message;
        console.log(errorCode);
        console.log(errorMessage);
    })
}