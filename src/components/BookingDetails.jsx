import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/Elements";
import { apiUrl } from "../config";

export const BookingDetails = ({ getDetails }) => {
  const [details, setDetails] = useState(null); // Set initial state to null to handle loading state

  // Function to fetch booking details
  const getBookingDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        console.log("Failed to get details..");
        return;
      }

      // Parse the JSON data
      const data = await response.json();
      console.log(data);
      setDetails(data); // Store the fetched details in state
    } catch (error) {
      console.log("Error fetching booking details:", error);
    }
  };
  // Fetch booking details on component mount
  useEffect(() => {
    getBookingDetails();
  }, [getDetails]);

  // Render the component
  return (
    <Card>
      <CardHeader>Last Booking Details:</CardHeader>
      <CardContent>
        {details ? (
          <>
            <p>Seats:</p>
            {/* Loop through the seats object and display each seat and its count */}
            {details.seats &&
              Object.entries(details?.seats).map(([seat, count]) => (
                <p key={seat}>{`${seat}: ${count}`}</p>
              ))}
            {/* Display the slot and movie details */}
            <p>{`Slot: ${details.slot || "N/A"}`}</p>
            <p>{`Movie: ${details.movie || "N/A"}`}</p>
            <p>{`  ${details.message ? details.message + "...." : " "}`}</p>
          </>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
};
