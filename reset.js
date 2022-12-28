function reset(){
     var email=document.getElementById("email").value;
	if(email !="")
	{
		firebase.auth().sendPasswordResetEmail(email).then(
		function()
		{
			window.alert("mail is sent to"+ email);	
		}).catch(function(error)
		{
			var errorCode=error.code;
			var errorMessage=error.message;
			window.alert("message : " + errorMessage);
		});
	}
}