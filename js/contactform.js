// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "",
    authDomain: "iture-contactform.firebaseapp.com",
    databaseURL: "https://iture-contactform.firebaseio.com",
    projectId: "iture-contactform",
    storageBucket: "iture-contactform.appspot.com",
    messagingSenderId: "121902951344",
    appId: "1:121902951344:web:8fca603d826a88fe278475"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 // Reference messages collections

 var messagesRef = firebase.database().ref('client_messages');

// Contact-form validation
const form=getInputId('contact_form');
const fname=getInputId('fname');
const lname=getInputId('lname');
const companyname=getInputId('companyname');
const email=getInputId('email');
const telephone=getInputId('telephone');
const mobile=getInputId('mobile');
const message=getInputId('message');


form.addEventListener('submit',(e)=>{

	e.preventDefault();

	if (checkInputs()==true){

		storeValueFirebase();
	}
	

});



function checkInputs(){

	//get the values from the inputs field
	const fnameValue=fname.value.trim();
	const lnameValue=lname.value.trim();
	const companynameValue=companyname.value.trim();
	const emailValue=email.value.trim();
	const telephoneValue=telephone.value.trim();
	const mobileValue=mobile.value.trim();
	const messageValue=message.value;
	var count=0;


	// Verification for First name
		if(fnameValue ===''){
			//show error
			//show error class
			setErrorFor(fname,'First Name cannot be blank');

		}else if (/^[a-zA-Z0-9- ]*$/.test(fnameValue)== false){
			
			setErrorFor(fname,'First Name contain invalid characters');

		}else if (fnameValue.length > 25){
			
			setErrorFor(fname,'First Name is too long');
		}else{

			setSuccessFor(fname);
			count++;

		}

	// Verification for Last name
		if(lnameValue ===''){
			//show error
			//show error class
			setErrorFor(lname,'Last Name cannot be blank');

		}else if (/^[a-zA-Z0-9- ]*$/.test(lnameValue)== false){
			
			setErrorFor(lname,'Last Name contain invalid characters');

		}else if (lnameValue.length > 25){
			
			setErrorFor(fname,'Last Name is too long');
		}else{

			setSuccessFor(lname);
			count++;
		}


	// Verification for Company name
		if(companynameValue ===''){
			//show error
			//show error class
			setErrorFor(companyname,'Company Name cannot be blank');

		}else if (/^[a-zA-Z0-9- ]*$/.test(companynameValue)== false){
			
			setErrorFor(companyname,'Company name contain invalid characters');

		}else if (companynameValue.length > 25){
			
			setErrorFor(companyname,'Company Name is too long');
		}else{

			setSuccessFor(companyname);
			count++;
			
		}

	// Verification for Email
		if(emailValue ===''){
			//show error
			//show error class
			setErrorFor(email,'Email cannot be blank');

		}else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)== false){
		
		setErrorFor(email,'Invalid Email address');

		}else if (emailValue.length > 50){
			
			setErrorFor(email,'Email is too long');

		}else{

			setSuccessFor(email);
			count++;
			
		}


	// Verification for telephone
		if(telephoneValue ===''){
			//show error
			//show error class
			setErrorFor(telephone,'Telephone cannot be blank');

		}else if ((/^\+(?:[0-9] ?){6,14}[0-9]$/.test(telephoneValue)== false)&&(/^(?:[0-9] ?){6,14}[0-9]$/.test(telephoneValue)== false)){
			
			setErrorFor(telephone,'Telephone not valid');
		}else{

			setSuccessFor(telephone);
			count++;
		}

	// Verification for Mobile
		if(mobileValue ===''){
			//show error
			//show error class
			setErrorFor(mobile,'Mobile cannot be blank');

		}else if  ((/^\+(?:[0-9] ?){6,14}[0-9]$/.test(mobileValue)== false)&&(/^(?:[0-9] ?){6,14}[0-9]$/.test(mobileValue)== false)){
			
			setErrorFor(mobile,'Mobile not invalid');
		}else{

			setSuccessFor(mobile);
			count++;
			
		}
		// Verification for Message box
		if(messageValue ===''){
			//show error
			//show error class
			setErrorFor(message,'Message area cannot be blank');

		}else{

			setSuccessFor(message);
			count++;
			
		}

		//A counter to check if all field has been validated
		if (count==7){
			return true;
		}else{
			return false;
		}

}//End checkInputs function

//Function to display error message on form
function setErrorFor(input,message){

	const formControl=input.parentElement;
	const small=formControl.querySelector('small');

	//add error message inside small
	small.innerText=message;

	//add error class
	formControl.className='forms error';
}

//Function to display Success Icon on form
function setSuccessFor(input,message){

	const formControl=input.parentElement;
	const small=formControl.querySelector('small');

	//add error message inside small
	small.innerText=message;

	//add error class
	formControl.className='forms success';
}

// Word count for message area
function count_down(obj) {

	var element=document.getElementById('countdown');

	element.innerHTML= 500 - obj.value.length;

	if (500 - obj.value.length < 0){

		element.style.color='red';
	}else{

		element.style.color='grey';
	}

}

//Function to get form field id
function getInputId(id){
	return document.getElementById(id);
}

//Save messages to firebase
function saveMessage(firstname,lastname,companyname,email,telephone,mobile,messages,timestampes){
	var newMessageRef=messagesRef.push();
	newMessageRef.set({
		Firstname:firstname,
		Lastname:lastname,
		Companyname:companyname,
		Email:email,
		Telephone:telephone,
		Mobile:mobile,
		Messages:messages,
		Timestampe:timestampes
	});

}

//Function store value in firebase
function storeValueFirebase(){

	//get the values from the inputs field
	const val_fname=fname.value.trim();
	const val_lname=lname.value.trim();
	const val_companyname=companyname.value.trim();
	const val_email=email.value.trim();
	const val_telephone=telephone.value.trim();
	const val_mobile=mobile.value.trim();
	const val_message=message.value;
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;

	// Save Message
	saveMessage(val_fname,val_lname,val_companyname,val_email,val_telephone,val_mobile,val_message,dateTime);

	// Show alert

	document.querySelector('.alert').style.display='block';

	//Hide alert after 3 sec & clear all values icon the form after submission

	setTimeout(function(){
		document.querySelector('.alert').style.display='none';
		
		initiateclass();
	},3000);

	
	form.reset();// reset all value in the form.
	
}

//hide icon after values are submitted
function initiateclass(){
	fname.parentElement.className='forms';
	lname.parentElement.className='forms';
	companyname.parentElement.className='forms';
	email.parentElement.className='forms';
	telephone.parentElement.className='forms';
	mobile.parentElement.className='forms';
}
