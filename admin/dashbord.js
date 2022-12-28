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
  
  
   var shopid=window.localStorage.getItem('shopid');
   var dbref1=firebase.database().ref().child(shopid);
   var shopname;
   dbref1.once('value', function(snapshot) {
      
		  shopname=snapshot.child("aname").val();
          console.log(shopname);
		   $("#shopname").append("<div>"+shopname+"</div>"); 
  
  
   });
  var i;
  var j,k;
  var m=0;
     var newlist
	 var currentnew=[];
     dbref=firebase.database().ref(shopid).child('order');
	     dbref.once("child_added",snapshot=> {
		 if(snapshot.exists())
		 {
			 var key =snapshot.key;
			 
			   console.log("key");
			   console.log(key);
			
				   var shippingdetails=snapshot.child("shippingDetails").val();
				   var newlist=snapshot.val();
				   var username= shippingdetails["Name"];
				   console.log("username");
				   console.log(username);
				    $("#user").append("<br><div style='border-top:2px solid #dddddd;'></div>"); 
				   $("#user").append("<br><div class='user'>UserName:"+username+"</div>"); 
				   var itemdetails=snapshot.child("Items").val();
				   console.log(itemdetails);
				   var TotalAmount=snapshot.child("TotalAmount").val();
					console.log(shippingdetails);
				    $("#user").append("<tr><th colspan='1'>Itemname</th><th>Quntity</th><th>Unit</th><th>Price</th><th>Subtotal</th></tr>");
				   for(i=0;i<itemdetails.length;i++)
				   {
					   var name11=itemdetails[i].name;
					   var quntity=itemdetails[i].qunt;
					   var units=itemdetails[i].units;
					    var price=itemdetails[i].price;
					    var subtotal=itemdetails[i].subtotal;
					   console.log(name);
					  $("#user").append("<tr><td>"+name11+"</td><td>"+quntity+"</td><td>"+units+"</td><td>"+price+"</td><td>"+subtotal+"</td></tr>");
					   
				   }
				     $("#user").append("<div class='Amount'><b>Total Amount: "+TotalAmount+"<b></div>");
				   
			         var area= shippingdetails["Area_Locality"];
			         var name1= shippingdetails["Name"];
			         var flatno= shippingdetails["Flat_HouseNo"];
			         var society= shippingdetails["Street_Society"];
			         var city= shippingdetails["City"];
			         var pincode= shippingdetails["Pincode"];
			         var phone= shippingdetails["Phone"];
			         var emailid= shippingdetails["Email Address"];

					 var Address = name1 +", "+ flatno +", "+ society +", "+ area +", "+ city +" - "+ pincode;
				   console.log(area);
				   var OrderDate=snapshot.child("OrderDate").val();
				     var OrderTime=snapshot.child("OrderTime").val();
				   console.log(flatno);
				   console.log(society);
				   console.log(phone);
				   console.log(emailid);
				   console.log(Address);
				 
				   $("#user").append("<div class='shipping' ><h4>Shipping Details:</h4><div>"+Address+"</div><div><h5>"+emailid+"</h5><h5>"+phone+"</h5></div><div>OrderDate:"+OrderDate+"</div><div>OrderTime:"+OrderTime+"</div></div>");
				    $("#user").append("<br><div class='container'><button type='button' class='acceptbutton' onclick='AcceptOrder(this.id)'  id="+key+">Accept</button><button type='button' class='declinebutton' onclick='DeclineOrder(this.id)' id="+key+">Decline</button></div>");
                  m++;
		 }  
		 else{
			               $("#user").append("<h4>No orders  left for delivery</h4>");

		 }
	 });

function DeclineOrder(id)
{
	  
	   var  cancelorderref=firebase.database().ref(shopid).child('order').child(id);
	    cancelorderref.once('value',snapshot=> {
		 var mail=snapshot.child("shippingDetails").val()["Email Address"];
		console.log(mail);
						   
						   						   

	    cancelorderref.set(null);
	    Email.send({
			      
			      Host:"smtp.gmail.com",
				  Username:'grocerynln@gmail.com',
				  Password:"localtovocal",
				  To:mail,
				  From:"grocerynln@gmail.com",
				  Subject:"Your order has been cancelled by the shopkeeper",
				  //Body:`UserId: ${mail.value} <br/> Password: ${cno.value} <br/> <br/> Please use these credentials every time you will login. <br/> <br/> Thank you,`,
				  Body:`your order from ${shopname} has been cancel <br/> Thankyou,`,
				  })
				  .then(function(message){
				 alert("order is cancelled and notified to user");
				 
                location.reload(true);	
				  
				  });
	  
		});
		
	    
}


function AcceptOrder(id1)
{
	    var i,name;
		
	    console.log(id1);
	    var  cancelorderref1=firebase.database().ref(shopid).child('order').child(id1);
		  console.log(cancelorderref1);
	    cancelorderref1.once('value',snapshot=> {
		console.log(snapshot.val());	
		var mail=snapshot.child("shippingDetails").val()["Email Address"];
		var items=snapshot.child("Items").val();
		console.log(mail);
	    console.log(items);	
        
        var Acceptorder=firebase.database().ref(shopid).child('AcceptedOrder');
		  Acceptorder.push(snapshot.val());
		
       cancelorderref1.set(null);
	   
	    Email.send({
			      
			      Host:"smtp.gmail.com",
				  Username:'grocerynln@gmail.com',
				  Password:"localtovocal",
				  To:mail,
				  From:"grocerynln@gmail.com",
				  Subject:"Your order has been accepted by the shopkeeper",
				  //Body:`UserId: ${mail.value} <br/> Password: ${cno.value} <br/> <br/> Please use these credentials every time you will login. <br/> <br/> Thank you,`,
				  Body:`Your order form ${shopname} has been accepted and prcoessed.<br/><br/> Thankyou,`,
				  })
				  .then(function(message){
				 alert("order is accepted and notified to user");
				 location.reload(true);

				  
				  });
	  
		});
	   
	   	
}



var rootRef12 = firebase.database().ref().child(shopid).child("Grocery");
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
  
	
	
	
    
      $("#tid1").append("<div class='responsive'><div class='gallery'><a><img src="+img1+"></img></a><div class='desc'>"+name+"</div><div class='desc'><div>"+price+"</div><div>"+quantity+"</div></div><div class='desc'><button class='default-btn' id="+itemid+" onclick='remove(this.id)'>remove</button></div></div></div>");
	 
		
});
});
      
	  
function remove(id)
{
	
	var rootRef13 = firebase.database().ref().child(shopid).child("Grocery").child(id);
	rootRef13.set(null);
	 location.reload(true);	
	
}

var reforder=firebase.database().ref(shopid).child('AcceptedOrder');
  reforder.once("child_added",snapshot=> {
	   
	   
	   
	   
	     console.log("snapshot");
		 console.log(snapshot.val());
	   
	   
	   
	    if(snapshot.exists())
		 {
			 var key =snapshot.key;
			 
			   console.log("key");
			   console.log(key);
			
				   var shippingdetails=snapshot.child("shippingDetails").val();
				   var newlist=snapshot.val();
				   var username= shippingdetails["Name"];
				   console.log("username");
				   console.log(username);
				    $("#user1").append("<br><div style='border-top:2px solid #dddddd;'></div>"); 
				   $("#user1").append("<br><div class='user'>UserName:"+username+"</div>"); 
				   var itemdetails=snapshot.child("Items").val();
				   console.log(itemdetails);
				   var TotalAmount=snapshot.child("TotalAmount").val();
					console.log(shippingdetails);
				    $("#user1").append("<tr><th colspan='1'>Itemname</th><th>Quntity</th><th>Unit</th><th>Price</th><th>Subtotal</th></tr>");
				   for(i=0;i<itemdetails.length;i++)
				   {
					   var name11=itemdetails[i].name;
					   var quntity=itemdetails[i].qunt;
					   var units=itemdetails[i].units;
					    var price=itemdetails[i].price;
					    var subtotal=itemdetails[i].subtotal;
					   console.log(name);
					  $("#user1").append("<tr><td>"+name11+"</td><td>"+quntity+"</td><td>"+units+"</td><td>"+price+"</td><td>"+subtotal+"</td></tr>");
					   
				   }
				     $("#user1").append("<div class='Amount'><b>Total Amount: "+TotalAmount+"<b></div>");
				   
			         var area= shippingdetails["Area_Locality"];
			         var name1= shippingdetails["Name"];
			         var flatno= shippingdetails["Flat_HouseNo"];
			         var society= shippingdetails["Street_Society"];
			         var city= shippingdetails["City"];
			         var pincode= shippingdetails["Pincode"];
			         var phone= shippingdetails["Phone"];
			         var emailid= shippingdetails["Email Address"];

					 var Address = name1 +", "+ flatno +", "+ society +", "+ area +", "+ city +" - "+ pincode;
				   console.log(area);
				   var OrderDate=snapshot.child("OrderDate").val();
				     var OrderTime=snapshot.child("OrderTime").val();
				   console.log(flatno);
				   console.log(society);
				   console.log(phone);
				   console.log(emailid);
				   console.log(Address);
				 
				   $("#user1").append("<div class='shipping' ><h4>Shipping Details:</h4><div>"+Address+"</div><div><h5>"+emailid+"</h5><h5>"+phone+"</h5></div><div>OrderDate:"+OrderDate+"</div><div>OrderTime:"+OrderTime+"</div></div>");
				    $("#user1").append("<br><div class='container'><button type='button' name='fname"+m+"' class='deliverbutton' onclick='DeliverOrder(this.id,name)' id="+key+">Deliver</button></div>");
                  m++;
		 }  
		 else{
               $("#user1").append("<h4>No orders  left for delivery</h4>");
		 }
	   
	   
	   
	   
	   
	   
	   
	   
	   });
	
 function DeliverOrder(id2,idname)
{
	
	var orderValues=[];
	 console.log(idname);
	    var  cancelorderref1=firebase.database().ref(shopid).child('AcceptedOrder').child(id2);
		  console.log(cancelorderref1);
	    cancelorderref1.once('value',snapshot=> {
		console.log(snapshot.val());	
		var mail=snapshot.child("shippingDetails").val()["Email Address"];
		console.log(mail);
						   
		const button1 = document.getElementById(id2)
        document.getElementById(id2).disabled = true;
		document.getElementsByName(idname)[0].innerHTML = "&#10003";
   		document.getElementsByName(idname)[0].style.backgroundColor="green";				   
   		document.getElementsByName(idname)[0].style. cursor="not-allowed";				   
        orderValues.push(snapshot.val());
	     console.log("orderValues");
	     console.log(orderValues);
		  var deleverorder=firebase.database().ref(shopid).child('Deliver');
		  
		   deleverorder.push(snapshot.val());
		     
			                   location.reload(true);	
	    Email.send({
			      
			      Host:"smtp.gmail.com",
				  Username:'grocerynln@gmail.com',
				  Password:"localtovocal",
				  To:mail,
				  From:"grocerynln@gmail.com",
				  Subject:"Your order has been delivered  Today by the shopkeeper",
				  //Body:`UserId: ${mail.value} <br/> Password: ${cno.value} <br/> <br/> Please use these credentials every time you will login. <br/> <br/> Thank you,`,
				  Body:`your order from ${shopname} has been out delivery <br/> Thankyou,`,
				  })
				  .then(function(message){
				 alert("order is out for deliver and notified to user");
				 

				  
				  });
				   cancelorderref1.set(null);
	  
		});
		
		
		 
		 
		 
		 
}

var deleverorder1=firebase.database().ref(shopid).child('Deliver');
		  deleverorder1.once("child_added",snapshot=> {
	    if(snapshot.exists())
		 {
			 var key =snapshot.key;
			 
			   console.log("key");
			   console.log(key);
			
				   var shippingdetails=snapshot.child("shippingDetails").val();
				   var newlist=snapshot.val();
				   var username= shippingdetails["Name"];
				   console.log("username");
				   console.log(username);
				    $("#user1").append("<br><div style='border-top:2px solid #dddddd;'></div>"); 
				   $("#user1").append("<br><div class='user'>UserName:"+username+"</div>"); 
				   var itemdetails=snapshot.child("Items").val();
				   console.log(itemdetails);
				   var TotalAmount=snapshot.child("TotalAmount").val();
					console.log(shippingdetails);
				    $("#user1").append("<tr><th colspan='1'>Itemname</th><th>Quntity</th><th>Unit</th><th>Price</th><th>Subtotal</th></tr>");
				   for(i=0;i<itemdetails.length;i++)
				   {
					   var name11=itemdetails[i].name;
					   var quntity=itemdetails[i].qunt;
					   var units=itemdetails[i].units;
					    var price=itemdetails[i].price;
					    var subtotal=itemdetails[i].subtotal;
					   console.log(name);
					  $("#user1").append("<tr><td>"+name11+"</td><td>"+quntity+"</td><td>"+units+"</td><td>"+price+"</td><td>"+subtotal+"</td></tr>");
					   
				   }
				     $("#user1").append("<div class='Amount'><b>Total Amount: "+TotalAmount+"<b></div>");
				   
			         var area= shippingdetails["Area_Locality"];
			         var name1= shippingdetails["Name"];
			         var flatno= shippingdetails["Flat_HouseNo"];
			         var society= shippingdetails["Street_Society"];
			         var city= shippingdetails["City"];
			         var pincode= shippingdetails["Pincode"];
			         var phone= shippingdetails["Phone"];
			         var emailid= shippingdetails["Email Address"];

					 var Address = name1 +", "+ flatno +", "+ society +", "+ area +", "+ city +" - "+ pincode;
				   console.log(area);
				   var OrderDate=snapshot.child("OrderDate").val();
				     var OrderTime=snapshot.child("OrderTime").val();
				   console.log(flatno);
				   console.log(society);
				   console.log(phone);
				   console.log(emailid);
				   console.log(Address);
				 
				   $("#user1").append("<div class='shipping' ><h4>Shipping Details:</h4><div>"+Address+"</div><div><h5>"+emailid+"</h5><h5>"+phone+"</h5></div><div>OrderDate:"+OrderDate+"</div><div>OrderTime:"+OrderTime+"</div></div>");
				    $("#user1").append("<br><div class='container'><button type='button' name='fname"+m+"' class='deliverbuttonafter' onclick='DeliverOrder(this.id,name)' id="+key+">&#10003</button></div>");
                  m++;
		 }  
		 else{
               $("#user1").append("<h4>No orders  left for delivery</h4>");
		 }
	   
	   
	   
	   
	   
	   
	   
	   
	   });
		 
		 
		 
		 
		 