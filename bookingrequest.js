//nqj7644 Casey Glover
// Create the XMLHttpRequest object
var xHRObject = false;
	if (window.XMLHttpRequest)
	{
	xHRObject = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
	}

function createBooking()
{
	//retrieve values from form via DOM
	var custName = document.getElementById("name").value;
	var custPhone = document.getElementById("phone").value;
	var custUnitNum = document.getElementById("unit").value;
	var custSteetNum = document.getElementById("streetnumber").value;
	var custStreet = document.getElementById("street").value;
	var custSuburb = document.getElementById("suburb").value;
	var custDestination = document.getElementById("destination").value;
	var custDate = document.getElementById("date").value;
	var custTime = document.getElementById("time").value;
	var passengers = document.getElementById("passengers").value;
	//create a customer object 
	var	customer = {
		name: custName,
		phone: custPhone,
		unit: custUnitNum,
		streetNumber: custSteetNum,
		street: custStreet,
		suburb: custSuburb,
		destination: custDestination,
		date: custDate,
		time: custTime,
		passenger: passengers
	};
	//valiadate fields 
	if(validate(customer)) {
		if(checkDateTime(customer)){
			sendToServer(customer);
		}
	}
}

//valiadate each value in the customer object 
function validate(customer)
{
	//check each value for error except for unit value
	for(var key in customer) {
		if (customer.hasOwnProperty(key)) {
			if(key != "unit"){
				if(!customer[key]){
					createWarning(key);
					return false;
				}
			}
		}
	}
	return true;
	
}

//checks if the date and time are valid 
function checkDateTime(customer)
{
	//compare the input date with the current date 
	var split = customer.date.split('/');
	var today = new Date();
	var todaysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var todaysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var msec = Date.parse(split[0] + " "+customer.time+":00 UTC+1200");
	var bookingDate = new Date(msec);
	if(bookingDate < today){
		createWarning(customer.date +" "+customer.time+" is before the current day and time");
		return false;
	}else{
		return true;
	}
	
}

//display a warning message
function createWarning(message)
{
	document.getElementById("status").innerHTML = "";
	var panel =  document.getElementById("status");
	panel.className = "alert alert-warning";
	var wp = document.createElement('p');
	var mes = document.createTextNode("Invalid input at " + message);
	panel.appendChild(wp);
	wp.appendChild(mes);
}

//display a success message
function createSuccess(message)
{
	document.getElementById("status").innerHTML = "";
	var panel =  document.getElementById("status");
	panel.className = "alert alert-success";
	var wp = document.createElement('p');
	var mes = document.createTextNode(message);
	panel.appendChild(wp);
	wp.appendChild(mes);
}

//send the booking request to the server
function sendToServer(customer)
{
	//key value pair string
	var postCustomer = "name=" + encodeURIComponent(customer.name)+
					"&phone="+encodeURIComponent(customer.phone)+
					"&unit="+encodeURIComponent(customer.unit)+
					"&streetNumber="+encodeURIComponent(customer.streetNumber)+
					"&street="+encodeURIComponent(customer.street)+
					"&suburb="+encodeURIComponent(customer.suburb)+
					"&destination="+encodeURIComponent(customer.destination)+
					"&date="+encodeURIComponent(customer.date)+
					"&time="+encodeURIComponent(customer.time)+
					"&passenger="+encodeURIComponent(customer.passenger);
				
	var url = "bookingprocess.php";
	xHRObject.open("POST",url,true);
	//Set content type header information for sending url encoded variables in the request
	xHRObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// Access the onreadystatechange event for for the XMLHttpRequest object
	xHRObject.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			createSuccess(this.responseText);
		}
	};
	//send data to PHP and wait for a response
	xHRObject.send(postCustomer);
	document.getElementById("status").innerHTML = "processing...";
}