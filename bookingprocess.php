<?php
	//nqj7644 Casey Glover
	//booking process connects to the sql database creates a query to insert a new row into the booking table.
	//response is reported back to the client side
	
	//Unique booking reference
	$bookingRef = uniqid();
	//intial customer status
	$custStatus = "unassigned";
	// sql info
     require_once('../../conf/settings.php');

	// mysqli_connect returns false if connection failed, otherwise a connection value
	$conn = @mysqli_connect(
		$host,
		$user,
		$pswd,
		$dbnm
	);
	$tble = "Booking";
	// Checks if connection is successful

	if (!$conn) {
		// Displays an error message
			echo "Database connection failure";		
	} else {
		//set variables
		$name = $_POST['name'];
		$phone = $_POST['phone'];
		$unit = $_POST['unit'];
		$streetnumber = $_POST['streetnumber'];
		$street = $_POST['street'];
		$suburb = $_POST['suburb'];
		$destination = $_POST['destination'];
		$date = $_POST['date'];
		$time = $_POST['time'];
		$passenger = $_POST['passenger'];
		//Insert customer into booking table
		$query = "INSERT INTO $tble"
		."(BookingNumber, CustomerName, CustomerPhone, UnitNumber, StreetNumber, Street, Suburb, Destination, PickupDate, PickupTime, Passengers, CustomerStatus)"
		."values"
		."('$bookingRef','$name','$phone','$unit','$streetnumber','$street','$suburb','$destination','$date','$time','$passenger','$custStatus')";
		//execute query	
		$result = mysqli_query($conn, $query);
		if(!$result){
			//booking was uncessfull
			echo "Somehting is wrong with the query";
		}else{
			//booking was successful
			echo 'Thank you '.$_POST['name'].', your booking reference number is ' .$bookingRef.'. You will be picked up in front of your provided address at ' .$time. ' on '.$date.'.';
		}			
	}
	//close mysql connection
	mysqli_close($conn);
?>
