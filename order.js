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
  
  
    var userName=sessionStorage.getItem("name");
  var i;
  var j,k;
     var newlist
	 var currentnew=[];
     dbref=firebase.database().ref().child('order').child(userName);
	     dbref.once("child_added",snapshot=> {
		 if(snapshot.exists())
		 {
			  var shippingdetails=snapshot.child("shippingDetails").val();
				   var newlist=snapshot.val();
				   
				   
				   
				   
				   var itemdetails=snapshot.child("Items").val();
				   console.log(itemdetails);
				   var TotalAmount=snapshot.child("TotalAmount").val();
					 $("#user").append("<br><div style='border-top:2px solid #dddddd;'></div><br>"); 
				   
				    $("#user").append("<tr id='customers'><th>Itemname</th><th >Quntity</th><th>Unit</th><th>Price</th><th>Subtotal</th></tr>");
				   for(i=0;i<itemdetails.length;i++)
				   {
					   var name11=itemdetails[i].name;
					   var quntity=itemdetails[i].qunt;
					   var units=itemdetails[i].units;
					    var price=itemdetails[i].price;
					    var subtotal=itemdetails[i].subtotal;
					   console.log(name);
					  $("#user").append("<tr id='customers'><td>"+name11+"</td><td>"+quntity+"</td><td>"+units+"</td><td>"+price+"</td><td>"+subtotal+"</td></tr>");
					   
				   }
				     $("#user").append("<div class='Amount'><b>Total Amount: "+TotalAmount+"<b></div>");
					
				   
				   //$("#user").append("<div class='shipping' ><h4>Shipping Details:</h4><div>"+Address+"</div><div><h5>"+emailid+"</h5><h5>"+phone+"</h5></div></div>");
				   // $("#user").append("<br><div class='container'><button type='button' class='acceptbutton' onclick='AcceptOrder()'>Accept</button><button type='button' class='declinebutton' onclick='DeclineOrder()'>Decline</button></div>");


		 }  
		 else{
			 console.log("No data available");
		 }
	 });

