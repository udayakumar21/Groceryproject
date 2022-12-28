/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
var queries = queryString.split("=")[1];
console.log("query===>"+queries);
 console.log("hwllo");
 var rootRef1 = firebase.database().ref().child(queries);
 

    rootRef1.once('value', function(snapshot) {
      
		  shopname=snapshot.child("aname").val();
		  $("#id1").append("<div>"+shopname+"</div>");   

});



	 
 var rootRef12 = firebase.database().ref().child(queries).child("Grocery");
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
  
	
	
	
    
      $("#tid1").append("<div class='responsive'><div class='gallery'><a><img src="+img1+"></img></a><div class='desc'>"+name+"</div><div class='desc'><div>"+price+"</div><div>"+quantity+"</div></div><div class='desc'><button class='default-btn' id="+itemid+" onclick='addToCart(this.id)'>add</button></div></div></div>");
	 
		
});
});
        
	
	
	
	
 

	

function addToCart(id)
{

	var order={};
	var orders=[];
	console.log("itemid==="+id);
	var name;
    var price;
	var qunt;
	var user = firebase.auth().currentUser;
	var user1=JSON.stringify(user);
	console.log("user"+user1);
	
	
    if (user!=null) {
				
		var rootRef13 = firebase.database().ref().child(queries).child("Grocery").child(id);
        rootRef13.on('value', function(snapshot) {
		 
	        name =snapshot.child("name").val();
            console.log("name=====" +name);
	        price =snapshot.child("price").val();
	        qunt =snapshot.child("qunt").val();
			imgurl=snapshot.child("imgurl").val();
	        console.log("price=====" +price);
	        console.log("qunt=====" +qunt);
	        order={
                    name:name,
                    price:price,
				    qunt:qunt,
					sname:queries,
					img:imgurl
                  };
			var temp=orders.push(order);

			console.log("====+++",+temp)
			console.log("Orders=======================================price"+order.price+", name="+order.name+", qunt="+order.qunt);
            
        });
		 
	}
			else {
                alert("user has not loged in please do login to add item to cart");
				 window.location.href="login.html";
            }
   
      
        var email=user.email;
        createOrder(email,orders);
}


function createOrder(user,order1){
      console.log("User in createOrder=  "+user);
      console.log("Order in createOrder=  "+order1);
	  const propertyValues=Object.values(order1);  
	  console.log("orr===="+propertyValues);
     var username = user.split("@", 1);
	 firebase.database().ref(`cart/${username}`).get().then((snapshot) => {
     if (snapshot.exists())
	 {
			console.log("exists!");
			updateToCart(username,order1);
            
	}
	else
    {
			let db = firebase.database().ref("cart/"+username);
			db.set(order1);
			alert("Sucessfully Entered.");
    }
});
		 
	 
    
      //let db = firebase.database().ref("cart/"+user);
      //db.set(order);
  }
  
 
function updateToCart(user,newItem){
	 console.log(newItem);
	 var rootRef14 = firebase.database().ref("cart/"+user);
	  console.log("sssssss"+rootRef14);
	rootRef14.get().then((snapshot) => {
         
 
		   console.log("sssssss"+snapshot.val());
		  var shopname =snapshot.val()[0]["sname"];
		  console.log("shop==="+queries);
		  console.log(shopname);
	      if(queries==shopname)
		  {
			  updateToCart1(user,newItem);
			  alert("Sucessfully Entered.");
			   location.reload(true);	
		  }
		  else
		  {
			  var r=confirm("the cart item will be removed");
			  if(r==true){
			  
			       let db = firebase.database().ref("cart/"+user);
					db.remove();
			        db.set(newItem);
					alert("Sucessfully Entered.");
					 location.reload(true);	
			  }
			  
			  
		  }
	 });
	 
 
			
 }
 
function updateToCart1(user,newItem){
 
	var currentItems=[];
    let p;
    itemref=firebase.database().ref("cart/"+user);
    p=firebase.database().ref("cart/"+user+"/");
    console.log("value of p=====",p);
    itemref.get().then((snapshot) => {
        console.log("update to cart walaga")
        if(snapshot.exists()){
			currentItems=snapshot.val();
		}
		console.log(currentItems);
        console.log(newItem);
        currentItems=currentItems.concat(newItem);
        console.log("whole list",currentItems);
        
        p.remove();
        itemref.set(currentItems);
    });
}
 
 
 
 var userName=sessionStorage.getItem("name");
 var sum=0;
 var i=0;
 var totalAmountDisplay = 0;
var itemtotal=0;
var eachItemAmount = [];
 var price;
 var amount;
 var amountList = [];
 var unitList = [];
 var unitList2 = [];
 var units=1;
 var valueId ;
 var zzzz=0;
 var  itemprice;
 var itemname;
 var cart = firebase.database().ref("cart/"+userName);
console.log(userName);
 

cart.once("child_added",snap1 => {
    console.log("in cart condition , check_count=");
    
    itemprice=snap1.child("price").val();
    
    itemname =snap1.child("name").val();
    price =  itemprice.split("-", 1);
     amount=Number(price);
	 eachItemAmount.push(amount);
	 totalAmountDisplay = totalAmountDisplay + amount;
	 amountList.push(amount);
    itemquantity =snap1.child("qunt").val();
    console.log("name="+itemname);
     console.log("quantity="+itemquantity);
     console.log("price="+itemprice);
    var img=snap1.child("img").val();
    sum=sum+amount;
   console.log(sum);
   i++;
     let increaseQuantityButton = document.createElement("button");
     increaseQuantityButton.innerHTML = "+";
	 increaseQuantityButton.id = "add" + i;
	 
	 increaseQuantityButton.style.top="100px"
	 increaseQuantityButton.style.float = "right";
	 increaseQuantityButton.style.marginRight = "350px";
	  increaseQuantityButton.style.position= "relative";
     document.getElementById("cartid").appendChild(increaseQuantityButton); 
	 
	 var input = document.createElement('input');
	 input.setAttribute("type", "number");
     input.name = "input-a" + i;
     input.id = "input-a" + i;
	 input.max=10;
	 input.min=1;
	 input.value = 1;
	 console.log(input.id);
     input.style.top="100px";
	 input.style.float = "right";
	  input.style.position= "relative";
	 unitList.push(input.value);
	 
	 document.getElementById("cartid").appendChild(input); 
     let decreaseQuantityButton = document.createElement("button");
     decreaseQuantityButton.innerHTML = "-";
	 decreaseQuantityButton.id="sub"+i;
	  decreaseQuantityButton.style.top="100px";
	decreaseQuantityButton.style.position= "relative";
	 decreaseQuantityButton.style.float = "right";
     document.getElementById("cartid").appendChild(decreaseQuantityButton); 
     
     increaseQuantityButton.addEventListener("click", function(){
		 
		   document.getElementById( input.id ).stepUp();
		    		
		 });	

    decreaseQuantityButton.addEventListener("click", function(){
		   document.getElementById( input.id ).stepDown();
		 });	
		 var tt=0;
		 
    /*Assigning initial cart amount to total      			CODE START*/
	document.getElementById("totalId").innerHTML = totalAmountDisplay;
	/*Assigning initial cart amount to total      			CODE END*/
    increaseQuantityButton.onclick = function () {
			console.log("abc");
            units= document.getElementById(input.id).value;
		   
			console.log(units);
			console.log(eachItemAmount);
			var amountId = input.id
			console.log(amountId);
		    valueId = parseInt(amountId.charAt(amountId.length-1)) - 1;
			itemtotal = eachItemAmount[valueId ] * units;
		    unitList[valueId] =units;
			console.log("unitList");
			console.log(unitList);
			 console.log(valueId);
			 console.log(i);
		
			var ele=document.getElementById("item"+valueId);
			ele.innerHTML=itemtotal;
		/*Adding up subtotal amount to totalAmount and assigning      			CODE START*/
			totalAmountDisplay = totalAmountDisplay + eachItemAmount[valueId ];
			document.getElementById("totalId").innerHTML = totalAmountDisplay;
		/*Adding up subtotal amount to totalAmount and assigning      			CODE END*/
		   amountList[valueId] = itemtotal;
		   console.log(itemtotal);
		   console.log(amountList);
		 
       };
	   
	   
	decreaseQuantityButton.onclick = function () {
			console.log("abc");
            units= document.getElementById(input.id).value;
		   
		    console.log(units);
		    console.log(eachItemAmount);
		    var amountId = input.id
		    console.log(amountId);
		   valueId = parseInt(amountId.charAt(amountId.length-1)) - 1;
		    itemtotal = eachItemAmount[valueId ] * units;
		   console.log(valueId);
		
		   
		     unitList[valueId] =units;
		    var ele=document.getElementById("item"+valueId);
		    ele.innerHTML=itemtotal;
		    
		    amountList[valueId] = itemtotal;
		    console.log(itemtotal);
		    console.log(amountList);
			/*Substracting amount from totalAmount and assigning      			CODE START*/
			totalAmountDisplay = totalAmountDisplay - eachItemAmount[valueId ];
			document.getElementById("totalId").innerHTML = totalAmountDisplay;
		/*Substracting amount from totalAmount and assigning      			CODE END*/
       };
	   
   	 
   //$("#cartid").append("<div class='checkout-cart__item'><div class='checkout-cart__img-box display--table-cell'><div class='img-loader__wrapper__wrapper'><div class='img-loader__wrapper'><img class='img-loader__img img-loader__img--shown' src="+img+"><span class='img-loader__placeholder img-loader__placeholder--circle img-loader__img img-loader__img--hidden'></span></div></div><div><div class='menu-item-name'>" +itemname+ "</div><div class='checkout-cart__item-unit'>"+itemquantity+"</div><div class='menu-item-price'>" +itemprice+ "</div><div  class='menu-item-name1' id='item"+zzzz+"'>"+Number(itemprice.split("-", 1))+" </div><div class='removebutton'><button type='button' onclick='removefromcart(this.id)' id='idremove+"+i+"' value="+i+" style='background-color=#dc3545;'>&#10060;</button></div></div></div>");
   // $("#cartid").append("<div><div><div class='cart-items'><div class='cart-items-product cart-card' data-test-id='cart-product'><div class='display--inline-block cart-card__img'><div class='img-loader__wrapper__wrapper'><div class='img-loader__wrapper'><img class='img-loader__img img-loader__img--shown' src="+img+"><span class='img-loader__placeholder img-loader__placeholder--circle img-loader__img img-loader__img--hidden'></span></div></div></div><div class='cart-items-product__details'> <div class='product-name' data-test-id='product-name'>"+itemname+"</div><div class='product-unit' data-test-id='product-unit'>"+itemquantity+"</div><div  class='product-unit' id='item"+zzzz+"'>"+Number(itemprice.split("-", 1))+" </div><div class='removebutton'><button type='button' onclick='removefromcart(this.id)' id='idremove+"+i+"' value="+i+" style='background-color:#dc3545;'>&#10060;</button></div><div class='total-price float-right'>"+itemprice+"</div></div></div></div></div></div>"); 
   $("#cartid").append("<div><img class='img' src="+img+"></img><div style='border-top: 4px solid #f8f8f8;'><div class='menu-item-name'>" +itemname+ "</div><div class='checkout-cart__item-unit'>"+itemquantity+"</div><div class='menu-item-price'>" +itemprice+ "</div><div  class='menu-item-name1' id='item"+zzzz+"'>"+Number(itemprice.split("-", 1))+" </div><div class='removebutton'><button type='button' onclick='removefromcart(this.id)' id='idremove"+i+"' value="+i+" style='background-color=#dc3545;'>&#10060;</button></div></div></div>");
  
  zzzz++;
 });
   
   
function proceedToOrder(){
	
    var currentItem1=[];
	var itemDetailsList=[];
    var  orderTotal=0;
    var d=new Date();
    var date=d.getDate();
    var month=d.getMonth();
    var year= d.getFullYear();
    var dateStr=date+"/"+month+"/"+year;
    var hour= d.getHours();
    var min= d.getMinutes();
    var sec= d.getSeconds();
    var time=hour+"."+min+"."+sec;
    var J;
	var p=0;
    for(J=0;J<amountList.length;J++)
	{
		orderTotal=orderTotal+amountList[J];
		
	}
	 console.log(orderTotal);
	 console.log("unitList");
	 console.log(unitList2);

     var refid =  firebase.database().ref().child("cart").child(userName);
	console.log(refid);
    refid.on("child_added",snap1 => {
         if(snap1.exists())
		 { currentItem1=snap1.val();
		     currentItem1["units"]=unitList[p];
			 currentItem1["subtotal"]=amountList[p];
		     itemDetailsList.push(currentItem1);
		     //console.log(currentItem1);
			 p++;
		 }
    });
	
	
    var data={
        "user":userName,
        "Items":itemDetailsList,
       
        "TotalAmount":orderTotal,
        "OrderDate":dateStr,
        "OrderTime":time
    }
	 //console.log(data);
	 placeOrder(userName,data);
}
function placeOrder(user,order){
    
      console.log("Order in createOrder=  ");
     console.log(order);
        
    firebase.database().ref(`order/${user}`).get().then((snapshot) => {
      let db1 = firebase.database().ref("order/"+user+"/");
      db1.push(order);
	
    console.log("order placed.");
	if(db1)
     {
		 var queryString = "?shopName=" + queries;
        location.href="orderplace.html"+ queryString;
     }
	
       
});
    
}

var itemref;

function removefromcart(button_id){
    var currentItemsnew=[];
     var user=sessionStorage.getItem("name");
    console.log("In the remove from cart");
    let userRef = firebase.database().ref("cart/"+user+"/"+(button_id[button_id.length-1]-1));
    console.log("userref............"+userRef);
    console.log("i==================="+button_id[button_id.length-1]);
	userRef.remove();
   itemref=firebase.database().ref("cart/"+user);
   itemref.once('value',snap => {
       
        if(snap.exists())
		{
			currentItemsnew=snap.val();
			console.log(" inner values");
			console.log(snap.val());
			console.log(currentItemsnew);
		}
		 
    });
   var millisecondsToWait = 500;
	setTimeout(function() {
  console.log("currentItems===="+currentItemsnew);
  var items=currentItemsnew.filter(function (e1){
        return e1!=null;
   
    });
    
    
    
     
    console.log("Items===="+items);
    let userRefOld = firebase.database().ref("cart/"+user);
    userRefOld.set(null);
    
    alert("Sucessfully deleted.");
    ref1=firebase.database().ref("cart/"+user);
    ref1.set(items);
    location.reload(true);
  
  
  }, millisecondsToWait);
}











