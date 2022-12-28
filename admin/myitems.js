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
 
  var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var id = queryString.split("=")[1];
console.log("query===>"+id);
 console.log("hwllo");

   var shopid=window.localStorage.getItem('shopid');
   var dbref1=firebase.database().ref().child(shopid);
   var shopname;
   dbref1.once('value', function(snapshot) {
      
		  shopname=snapshot.child("aname").val();
          console.log(shopname);
		   $("#shopname").append("<div>"+shopname+"</div>"); 
  
  
   });

var rootRef12 = firebase.database().ref().child(shopid).child(id);
var name;
var price;
var itemid

rootRef12.on('value', function(snapshot) {
	
    snapshot.forEach(function(childSnapshot) {
    name =childSnapshot.child("name").val();
    console.log("name=====" +name);
    
	var img1=childSnapshot.child("imgurl").val();
	console.log("----000"+img1);
		
    price=childSnapshot.child("price").val();
	
    var quantity=childSnapshot.child("qunt").val();
    console.log("qunt"+quantity);
	  
      itemid=childSnapshot.child("itemid").val();
    console.log("===="+itemid);
  
	
	
	
    
     $("#tid1").append("<div class='responsive'><div class='gallery'><a><img src="+img1+"></img></a><div class='desc'>"+name+"</div><div class='desc'><div>"+price+"</div><div>"+quantity+"</div></div><div class='desc'><button class='default-btn' id="+itemid+" onclick='remove(this.id)'>Remove</button></div></div></div>");
	 
		
});
});
function remove(id1)
{
	
	var rootRef13 = firebase.database().ref().child(shopid).child(id).child(id1);
	rootRef13.set(null);
	 location.reload(true);	
	
}

