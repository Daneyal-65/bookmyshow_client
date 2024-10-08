import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader } from "../ui/Elements";

export const MovieSelector = ({ movies, onSelect, selection }) => {
  const [isSelectedMovie, setSelectedMovie] = useState("");
  const selectedMovie = (index) => {
    const newMovie = movies[index];
    setSelectedMovie(newMovie);
    onSelect(newMovie, "movie");
  };
  useEffect(() => {
    if (selection) setSelectedMovie("");
    // console.log(isSelectedMovie);
  }, [selection]);
  return (
    <Card>
      <CardHeader>Select A Movie</CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {movies.map((movie, index) => (
          <Button
            key={index}
            onClick={() => selectedMovie(index)}
            variant={movie === isSelectedMovie ? "destructive" : "outline"}
          >
            {movie}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
