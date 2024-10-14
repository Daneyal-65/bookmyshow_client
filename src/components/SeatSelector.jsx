import { Card, CardContent, CardHeader, Input } from "../ui/Elements";

export const SeatSelector = ({ seats, onSelect, selection }) => {
  const selectedSeat = (e, seat) => {
    const value = e.target.value;
    onSelect(seat, "seat", value);
  };

  return (
    <Card>
      <CardHeader>Select the seats</CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {seats.map((seat) => (
          <div key={seat} className="flex items-center mb-4 space-x-4">
            <span className="font-medium text-gray-700">{`Seat ${seat}`}</span>
            <Input
              type="number"
              data-testid={seat}
              min="0"
              max="20"
              className={`w-20 h-10 px-2 text-center rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          ${
            parseInt(selection[seat], 10) > 0
              ? "bg-gray-300 border-gray-400"
              : "bg-gray-100 border border-gray-300 hover:border-gray-400"
          }`}
              value={selection[seat]}
              onChange={(e) => selectedSeat(e, seat)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
