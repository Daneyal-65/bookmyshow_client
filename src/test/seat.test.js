import { render, screen, fireEvent } from "@testing-library/react";
import { SeatSelector } from "../components/SeatSelector";
import "@testing-library/jest-dom";

describe("SeatSelector Component", () => {
  const mockSeats = ["A1", "A2", "A3"];
  const mockOnSelect = jest.fn();
  const mockSelection = { A1: "2", A2: "", A3: "5" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the seat selection header", () => {
    render(
      <SeatSelector
        seats={mockSeats}
        onSelect={mockOnSelect}
        selection={mockSelection}
      />
    );
    const cardHeader = screen.getByText("Select the seats");
    expect(cardHeader).toBeInTheDocument();
  });

  test("displays all seat inputs", () => {
    render(
      <SeatSelector
        seats={mockSeats}
        onSelect={mockOnSelect}
        selection={mockSelection}
      />
    );
    mockSeats.forEach((seat) => {
      const seatLabel = screen.getByText(`Seat ${seat}`);
      expect(seatLabel).toBeInTheDocument();
    });
  });

  test("calls onSelect when seat input changes", () => {
    render(
      <SeatSelector
        seats={mockSeats}
        onSelect={mockOnSelect}
        selection={mockSelection}
      />
    );
    const input = screen.getByDisplayValue("2"); // Corresponding to Seat A1's initial value
    fireEvent.change(input, { target: { value: "3" } });

    expect(mockOnSelect).toHaveBeenCalledWith("A1", "seat", "3");
  });
});
