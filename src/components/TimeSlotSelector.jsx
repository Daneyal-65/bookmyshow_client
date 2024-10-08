import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader } from "../ui/Elements";

export const TimeSlotSelector = ({ slots, onSelect, selection }) => {
  const [isSelectedSlot, setSelectedSlot] = useState("");

  const selectedSlot = (index) => {
    const newSlot = slots[index];
    setSelectedSlot(newSlot);
    onSelect(newSlot, "slot");
  };

  useEffect(() => {
    if (selection) setSelectedSlot("");
  }, [selection]); // Add isSelectedSlot as a dependency

  return (
    <Card>
      <CardHeader>Select a Time slot</CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {slots.map((slot, index) => (
          <Button
            key={index}
            onClick={() => selectedSlot(index)}
            variant={slot === isSelectedSlot ? "destructive" : "outline"}
          >
            {slot}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
