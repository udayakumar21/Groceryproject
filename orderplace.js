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
var shopNameQueryString = decodeURIComponent(window.location.search);
shopNameQueryString = shopNameQueryString.substring(1);
var shopNameValue = shopNameQueryString.split("=")[1];
console.log("abcd");
console.log(shopNameQueryString);
 var userName=sessionStorage.getItem("name");
var date;
  var itemname1;
  var itemquantity1;
  var itemprice1;
  var key;
  var data;
  var k=0;
  var dat={};
    var leadsRef = firebase.database().ref('order').child(userName);
leadsRef.limitToLast(1).once('value', function(snapshot) {
    console.log("Hello");
    console.log(snapshot.val());
    
    
    snapshot.forEach(function(childSnapshot) {
        //console.log("Hello2");
      var childData = childSnapshot.val();
    
      console.log(childData.user);
      console.log(childData.TableId);
      console.log(childData.TotalAmount);
      //$("#user").append(childData.user);
    
     // $("#totalamount").append(childData.TotalAmount);
     // $("#OrderDate").append(childData.OrderDate);
      for(i=0;i<childData.Items.length;i++){
          $("#productname").append(childData.Items[i].name);
          $("#price").append(childData.Items[i].subtotal);
          $("#qunt").append(childData.Items[i].qunt);
		   $("#img").append(childData.Items[i].img);
		    $("#img").append(childData.Items[i].units);
	   console.log(childData.Items[i].units);
	    console.log(childData.Items[i].subtotal);
		
		 $("#orderid").append("<div class='checkout-cart__item'><div class='checkout-cart__item-count display--table-cell'>"+childData.Items[i].units+"</div><div class='checkout-cart__img-box display--table-cell'><div class='img-loader__wrapper__wrapper'><div class='img-loader__wrapper'><img class='img-loader__img img-loader__img--shown' src="+childData.Items[i].img+"><span class='img-loader__placeholder img-loader__placeholder--circle img-loader__img img-loader__img--hidden'></span></div></div><div class='checkout-cart__item-name-box vertical-align--top display--table-cell'><div class='checkout-cart__item-name'>"+childData.Items[i].name+"</div><div class='checkout-cart__item-unit'>"+childData.Items[i].qunt+"</div> <span class='checkout-cart__item-price weight--semibold' ><span>"+childData.Items[i].subtotal+"</span></span></div></div>");

     
      }
      
      
    });
    
});
    

var orderValues = [];
function placeOrder()
{
	/*Getting Cart Details*/
	firebase.database().ref("order/"+userName)
	.limitToLast(1).get().then((snapshot) => {
	
		orderValues.push(snapshot.val());
		console.log("orderValues1");
		console.log(orderValues);
	});
	var phoneNumber = document.getElementById("phone_id").value ==null ? "" : document.getElementById("phone_id").value;
	var name = document.getElementById("name_id").value ==null ? "" : document.getElementById("name_id").value;
	var area_locality = document.getElementById("area_id").value ==null ? "" : document.getElementById("area_id").value;
	var flat = document.getElementById("flat_id").value ==null ? "" : document.getElementById("flat_id").value ;
	var street = document.getElementById("street_id").value ==null ? "" : document.getElementById("street_id").value;
	var city = document.getElementById("city_id").value ==null ? "" : document.getElementById("city_id").value;
	var pincode = document.getElementById("pincode_id").value ==null ? "" : document.getElementById("pincode_id").value;
	var email = document.getElementById("email_id").value ==null ? "" : document.getElementById("email_id").value;
	
	var shippingDetails = {
		"Name": name,
		"Phone": phoneNumber,
		"Area_Locality":area_locality,
		"Flat_HouseNo":flat,
		"Street_Society":street,
		"City":city,
		"Pincode":pincode,
		"Email Address":email
	};
	console.log(phoneNumber);
	console.log(name);
	console.log(area_locality);
	console.log(flat);
	console.log(street);
	console.log(email);
	var millisecondsToWait = 500;
	setTimeout(function() {
		console.log("orderValues2");
		var innervalues = Object.values(orderValues[0]);
		console.log(innervalues[0]);
		var orderItems = innervalues[0];
		orderItems["shippingDetails"] = shippingDetails;
		console.log("shopNameValue");
		console.log(shopNameValue);
		console.log("userName");
		console.log(userName);
		let db1 = firebase.database().ref(shopNameValue+"/order/");
		db1.push(orderItems);
		if(db1)
     {
		var userRefOld = firebase.database().ref("cart/"+userName);
		console.log("userRefOld");
		userRefOld.set(null);
		console.log("order placed sucessfully.");
		alert("Order Placed Sucessfully!!!");
        location.href="newhome.html";
     }
	}, millisecondsToWait);
	
}

var orderKey = ""; 
function CancelOrder()
{
	var orderReference = firebase.database().ref("order/").child(userName)
	.limitToLast(1)
	.get().then((snapshot) => {
		orderKey = Object.keys(snapshot.val())[0];
		console.log("orderKey");
		console.log(orderKey);
	});
	var millisecondsToWait = 500;
	setTimeout(function() {
	console.log("orderKey1");
		console.log(orderKey);
	var id = firebase.database().ref("order/"+userName+"/").child(orderKey);
	id.set(null);
	console.log(orderReference);
	
	if(id)
	{
		alert("Your order has been cancelled!!");
        window.location.href="newhome.html";
	}
	}, millisecondsToWait);
}