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



var uId=document.getElementById("userid");
var pass=document.getElementById("password");
var addBtn=document.getElementById("btn");

var email;
var m ;
var m1;




addBtn.addEventListener('click', (e)=>{
	
	 email=uId.value;
 m=email.split("@");
console.log(m[0])

 m1=m[0];
window.localStorage.setItem('shopid',m1);
var dbRef = firebase.database().ref(m1);
console.log(dbRef);
 dbRef.on('value', function(snapshot) {
	 
  if (snapshot.exists()) {
    console.log(snapshot.val());
	window.location.href="admindashboard.html";
  } else {
    console.log("No data available");
  }
});


})





