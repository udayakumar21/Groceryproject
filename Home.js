/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
  
  



var id1;
var idd;
let i=0;
var leadsRef = firebase.database().ref();
leadsRef.on('value', function(snapshot) {
	
    snapshot.forEach(function(childSnapshot) {
		var name =childSnapshot.child("aname").val();
		
		 if(name!=null)
		 {
           var childData = childSnapshot.val();
		   console.log("hgfth=="+childData);
	   
		   id1 =childSnapshot.child("sname").val();
            
	       console.log("shop name==="+name);
            
             i++;
		 $("#tid").append("<div  class='btn-group'><button style='padding-top:25px; padding-bottom:25px;' class='button' onClick='list(this.id)' id='"+id1+"'>"+name+"</button></div>");
		 }
    });
});


    
function list(id)
{
	console.log("shop id==="+id);
    var queryString = "?para1=" + id;
    window.location.href = "List.html" + queryString;


}
  
    

