import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieBookingApp from "../BookMyShowApp";
import { apiUrl } from "../config";
import { movies, seats, slots } from "../data";
// Mock fetch API and localStorage
global.fetch = jest.fn();
global.localStorage = {
  getItem: jest.fn(() => "fakeAuthToken"),
};
describe("MovieBookingApp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("authToken", "test-token");
  });

  it("renders all components", () => {
    render(<MovieBookingApp />);
    expect(screen.getByText("Book that show!!")).toBeInTheDocument();
    expect(screen.getByText("Select A Movie")).toBeInTheDocument();
    expect(screen.getByText("Select a Time slot")).toBeInTheDocument();
    expect(screen.getByText("Select the seats")).toBeInTheDocument();
    expect(screen.getByText("Last Booking Details:")).toBeInTheDocument();
    expect(screen.getByText("Book Now")).toBeInTheDocument();
  });

  // test("makes a successful booking and updates the booking status", async () => {
  //   // Mocking successful API response
  //   global.fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ message: "Booking Successful...!" }),
  //   });

  //   // Render the component
  //   render(<MovieBookingApp />);

  //   // Simulate selecting movie, slot, and seats
  //   fireEvent.click(screen.getByText("Tenet")); // Ensure this matches the movie in your mock data
  //   fireEvent.click(screen.getByText("10:00 AM")); // Ensure this matches the time slot in your mock data
  //   fireEvent.change(screen.getByTestId("A1"), {
  //     target: { value: "2" },
  //   }); // Make sure the seat input is properly labeled as "Seat A1"

  //   // Simulate clicking the "Book Now" button
  //   fireEvent.click(screen.getByText("Book Now"));

  //   // Wait for the fetch call to be made and check if the booking status is updated
  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/booking`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: "Bearer test-token",
  //       },
  //       body: JSON.stringify({
  //         movie: "Tenet", // Make sure the movie selected is correct
  //         slot: "10:00 AM", // Make sure the slot selected is correct
  //         seats: { A1: "2", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0" }, // Match this with actual seat selection
  //       }),
  //     });

  //     // Check if success message is shown
  //     waitFor(() => {
  //       expect(screen.getByText("Booking Successful...!")).toBeInTheDocument();
  //     });
  //   });
  // });
});

// describe("MovieBookingApp - Booking API call", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

// });
