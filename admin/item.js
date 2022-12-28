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






var owner=localStorage.getItem("shopid");
var dropdown=document.getElementById("items");
var url=document.getElementById("image");
var uploader=document.getElementById('uploader');
var fileBtn=document.getElementById("fileBtn")
var itemname=document.getElementById("itemname");
var quant=document.getElementById("quantity");
var p=document.getElementById("price");



var addBtn=document.getElementById("btn");


fileBtn.addEventListener('change', function(e){

                
               
               
                console.log(owner);
                var file=e.target.files[0];
                
                var storageRef=firebase.storage().ref(file.name);
                var task =storageRef.put(file);
                

                task.on('state_changed',

                function progress(snapshot){
                 var percentange=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                 uploader.value=percentange;
                },
                function error(err){

                },

                function(){
                  task.snapshot.ref.getDownloadURL().then(function(url)
                  {
                    
                    ImgUrl=url;
                  });

                  
                }
                );

               
                
               
});


addBtn.addEventListener('click', (e)=>{
  



  
               console.log(p.value);
			   var price=p.value+"-Rs";
  itemname=itemname.value
  dropdown=dropdown.value;
  console.log(dropdown);
  id=itemname.toString().replace(/\s/g,'_').toLowerCase();
  console.log(ImgUrl);
  databaseRef=firebase.database().ref(owner).child(dropdown);
  unique=id+'_'+quant.value;
   databaseRef.child(unique).set({
    
    imgurl : ImgUrl,
    itemid:id+'_'+quant.value,
    name:itemname,
    price:price,
    qunt:quant.value
  });

  alert("Item added Successfully");




  }) ;
                
               
          
    
   




                
