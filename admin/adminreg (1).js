
  







const shopname=document.getElementById('Sname');
const shopno=document.getElementById('shopno');
const shopowner=document.getElementById('Shopowner');
var mail=document.getElementById('email');
const cno=document.getElementById('contact');
const add=document.getElementById('address');
const state=document.getElementById('state');
const city=document.getElementById('city');
const pin=document.getElementById('pincode');
const addBtn=document.getElementById('addBtn');









const database=firebase.database();



addBtn.addEventListener('click', (e)=>{
	
	
	
	
	
	var valueofmail=mail.value;
    var sEmail=valueofmail.split("@");
	Sid=sEmail[0];
    console.log(sEmail[0]);
	console.log(shopname.value);
	e.preventDefault();
	database.ref(sEmail[0]).set({
		aname:shopname.value,
		Shopno:shopno.value,
		Shopowner:shopowner.value,
		Email:mail.value,
		Contact_number:cno.value,
		Address:add.value,
		State:state.value,
		City:city.value,
		Pincode:pin.value,
		sname:Sid
		
		
	});
	
	
});





function sendEmail(){
		   
		      Email.send({
			      
			      Host:"smtp.gmail.com",
				  Username:'grocerynln@gmail.com',
				  Password:"localtovocal",
				  To:mail.value,
				  From:"grocerynln@gmail.com",
				  Subject:"Your credentials for user account",
				  Body:`UserId: ${mail.value} <br/> Password: ${cno.value} <br/> <br/> Please use these credentials every time you will login. <br/> <br/> Thank you,`,
				  
				  })
				  .then(function(message){
				  alert(" UserId and Password has been sent succesfully to your mail");
				  console.log(mail.value);
				  window.location.href="adminlogin.html"
				  
				  });
	        }



