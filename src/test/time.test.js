import { render, screen, fireEvent } from "@testing-library/react";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import "@testing-library/jest-dom";

describe("TimeSlotSelector Component", () => {
  const mockSlots = ["10:00 AM", "12:00 PM", "2:00 PM"];
  const mockOnSelect = jest.fn();
  const mockSelection = false;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the time slot selection header", () => {
    render(
      <TimeSlotSelector
        slots={mockSlots}
        onSelect={mockOnSelect}
        selection={mockSelection}
      />
    );
    const cardHeader = screen.getByText("Select a Time slot");
    expect(cardHeader).toBeInTheDocument();
  });

  test("displays all the available time slots", () => {
    render(
      <TimeSlotSelector
        slots={mockSlots}
        onSelect={mockOnSelect}
        selection={mockSelection}
      />
    );
    mockSlots.forEach((slot) => {
      const slotButton = screen.getByText(slot);
      expect(slotButton).toBeInTheDocument();
    });
  });

  test("calls onSelect when a time slot is clicked", () => {
    render(
      <TimeSlotSelector
        slots={mockSlots}
        onSelect={mockOnSelect}
        selection={mockSelection}
      />
    );
    const slotButton = screen.getByText("10:00 AM");

    fireEvent.click(slotButton);

    expect(mockOnSelect).toHaveBeenCalledWith("10:00 AM", "slot");
  });
});
