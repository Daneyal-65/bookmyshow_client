import React, { useEffect, useState } from "react";
import { Button } from "./ui/Elements";
import {
  BookingDetails,
  MovieSelector,
  SeatSelector,
  TimeSlotSelector,
} from "./components";
import { movies, seats, slots } from "./data";
import { apiUrl } from "./config";

const MovieBookingApp = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedSeats, setSelectedSeats] = useState({
    A1: "0",
    A2: "0",
    A3: "0",
    A4: "0",
    D1: "0",
    D2: "0",
  });
  const [isBooked, setIsbBooked] = useState({
    msg: "Booking Successful...!",
    flag: false,
    status: "success",
  });
  const handleBooking = async () => {
    const bookingData = {
      movie: selectedMovie,
      slot: selectedSlot,
      seats: selectedSeats,
    };

    try {
      const response = await fetch(`${apiUrl}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Booking successful:", data);
      setIsbBooked((pre) => ({
        ...pre,
        msg: "Booking Successful...!",
        status: "success",
      }));
      // Handle success response, e.g., show a success message or navigate
    } catch (error) {
      console.error("Booking failed:", error);
      // Handle error, e.g., show an error
      setIsbBooked((pre) => ({
        ...pre,
        msg: "Booking Failed...!",
        status: "error",
      }));
    }
    setSelectedMovie("");
    setSelectedSlot("");
    setSelectedSeats({
      A1: "0",
      A2: "0",
      A3: "0",
      A4: "0",
      D1: "0",
      D2: "0",
    });
    setIsbBooked((pre) => ({
      ...pre,
      flag: true,
    }));
  };
  useEffect(() => {
    let timer;
    if (isBooked.flag) {
      timer = setTimeout(() => {
        setIsbBooked((pre) => ({
          ...pre,
          flag: false,
        }));
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isBooked]);
  const onSelect = (item, key, value) => {
    switch (key) {
      case "movie":
        setSelectedMovie(item);
        break;
      case "slot":
        setSelectedSlot(item);
        break;
      case "seat":
        setSelectedSeats((prev) => ({ ...prev, [item]: value }));
        break;
      default:
        console.log("key : " + key, "vlaue : " + value, "item : " + item);
    }
  };
  return (
    <div className="p-4  md:px-20  bg-rose-50 max-h-screen">
      {isBooked.flag && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            backgroundColor: isBooked.status === "success" ? "green" : "red",
            borderRadius: "10px",
            padding: "20px",
            zIndex: "1000",
            color: isBooked.status === "success" ? "white" : "black",
          }}
          className="bg-green-600 p-4 rounded-md shadow-md"
        >
          <p className="text-center text-lg">{isBooked.msg}</p>
        </div>
      )}
      <h1 className="text-2xl font-bold">Book that show!!</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 p-4">
          <MovieSelector
            movies={movies}
            onSelect={onSelect}
            selection={isBooked.flag}
          />
          <TimeSlotSelector
            slots={slots}
            onSelect={onSelect}
            selection={isBooked.flag}
          />
          <SeatSelector
            seats={seats}
            onSelect={onSelect}
            selection={selectedSeats}
          />
          <Button onClick={handleBooking} className="w-[30%]">
            Book Now
          </Button>
        </div>
        <div>
          <BookingDetails getDetails={isBooked.flag} />
        </div>
      </div>
    </div>
  );
};

export default MovieBookingApp;
