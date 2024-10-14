import { render, screen, waitFor } from "@testing-library/react";
import { BookingDetails } from "../components/BookingDetails";
import "@testing-library/jest-dom";

// Mock the fetch API and localStorage
global.fetch = jest.fn();
global.localStorage = {
  getItem: jest.fn(),
};

describe("BookingDetails Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading message when there are no details", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ seats: {}, slot: "", movie: "" }),
    });

    render(<BookingDetails getDetails={jest.fn()} />);
    expect(
      screen.getByText("there is no any previous booking...")
    ).toBeInTheDocument();
  });

  test("fetches and displays booking details", async () => {
    const mockDetails = {
      seats: { A1: 2, A2: 3 },
      slot: "2:00 PM",
      movie: "Inception",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockDetails),
    });

    render(<BookingDetails getDetails={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Seats:")).toBeInTheDocument();
      expect(screen.getByText("A1: 2")).toBeInTheDocument();
      expect(screen.getByText("A2: 3")).toBeInTheDocument();
      expect(screen.getByText("Slot: 2:00 PM")).toBeInTheDocument();
      expect(screen.getByText("Movie: Inception")).toBeInTheDocument();
    });
  });

  test("displays error message when fetching fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<BookingDetails getDetails={jest.fn()} />);

    await waitFor(() => {
      expect(
        screen.getByText("there is no any previous booking...")
      ).toBeInTheDocument();
    });
  });
});
