<?php
//nqj7644 Casey Glover
//connects to database collects requested information from the booking table and returns the information back to the client

//retrive data from client
$bookingRef = $_GET['q'];

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
		//determines the type of request either with a booking number or not
		if($bookingRef == ""){
			//select all the valid rows within two hours and that have not been assigned 
			$query = "SELECT BookingNumber, CustomerName, CustomerPhone, Suburb, Destination, timestamp(PickUpDate,PickUpTime) as 'dateandtime' FROM Booking WHERE CustomerStatus = 'unassigned' AND PickUpDate = CURDATE() AND PickUpTime >= CURTIME() AND PickUpTime < ADDTIME(CURTIME(),'2:00:00.0')";
			$result = mysqli_query($conn, $query);
			if(!$result){
				//booking was uncessfull
				echo "Somehting is wrong with the query";
			}else{
				//initialise the table
				echo "<table class='table table-striped'>
					<tr>
					<th>Booking Reference</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Pick Up Suburb</th>
					<th>Pick Up Destination</th>
					<th>Pick Up Date and Time</th>
					</tr>";
					//fetch each row and add them to the table
					while($row = mysqli_fetch_array($result)) {
						echo "<tr>";
						echo "<td>" . $row['BookingNumber'] . "</td>";
						echo "<td>" . $row['CustomerName'] . "</td>";
						echo "<td>" . $row['CustomerPhone'] . "</td>";
						echo "<td>" . $row['Suburb'] . "</td>";
						echo "<td>" . $row['Destination'] . "</td>";
						echo "<td>" . date('d/m/Y H:m A',strtotime($row['dateandtime'])) . "</td>";
						echo "</tr>";
					}
					echo "</table>";
				
			}
		}else{
			//select requested bookings 
			$quey = "SELECT * FROM Booking WHERE BookingNumber = '$bookingRef'";
				$res = mysqli_query($conn, $quey);
				if(!$res){
					echo "Somehting is wrong the select query";
				}else{
					//Check if the booking has been assigned
					$customer = mysqli_fetch_array($res);
					if($customer['CustomerStatus'] == 'assigned'){
						//display message to the client the status has been assigned
						echo "<div class='alert alert-danger'>";
						echo "<p>";
						echo "The booking reference $bookingRef has already been assigned";
						echo "</p>";
						echo "</div>";
					}else{
						//check if the booking reference is equal to the booking number id
						if($customer['BookingNumber'] == $bookingRef){
							$quer = "UPDATE Booking SET CustomerStatus = 'assigned' WHERE BookingNumber = '$bookingRef'";
							$rest = mysqli_query($conn, $quer);
							if(!$rest){
								//booking was unsucessfull
								echo "Somehting is wrong with the query";
							}else{
								//success
								echo "$bookingRef";
							}
						}else{
							//display invalid booking reference to client 
							echo "<div class='alert alert-danger'>";
							echo "<p>";
							echo "$bookingRef is not a Booking Reference!";
							echo "</p>";
							echo "</div>";
						}
					}
				}
			
		}
	}
	//close connection
	mysqli_close($conn);
	
?>
