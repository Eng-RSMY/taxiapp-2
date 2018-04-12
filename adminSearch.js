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

function searchBooking()
{
	var booking = document.getElementById("bookingref").value;
	if(validate(booking))
	{	
		sendToServer(booking);
	}
}

//send request to the server from the client 
function sendToServer(req)
{
	  xHRObject.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == req){
				createSuccess(this.responseText);
			}else{
			document.getElementById("status").className = "";
			document.getElementById("status").innerHTML = this.responseText;
			}
		}
	  };
	  xHRObject.open("GET", "getCustomer.php?q="+req, true);
	  xHRObject.send();
}

//check the booking value is not null or greater than 13 char
function validate(booking)
{
	
	if(booking  == "" || booking.length > 13){
		createWarning("Invalid Booking Reference");
		return false;
	}else{
		return true;
	}
}

//display warning message to the client 
function createWarning(message)
{
	document.getElementById("status").innerHTML = "";
	var panel =  document.getElementById("status");
	panel.className = "alert alert-warning";
	var wp = document.createElement('p');
	var mes = document.createTextNode(message);
	panel.appendChild(wp);
	wp.appendChild(mes);
}

//display a warning message to the client 
function createSuccess(message)
{	
	document.getElementById("status").innerHTML = "";
	var panel =  document.getElementById("status");
	panel.className = "alert alert-success";
	var wp = document.createElement('p');
	var mes = document.createTextNode("The booking request " + message  + " has been properly asssigned.");
	panel.appendChild(wp);
	wp.appendChild(mes);
}



