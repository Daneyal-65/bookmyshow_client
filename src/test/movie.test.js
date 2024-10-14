import { render, screen, fireEvent } from "@testing-library/react";
import { MovieSelector } from "../components/MovieSelector";
import "@testing-library/jest-dom";

describe("MovieSelector Component", () => {
  const mockMovies = ["Inception", "Avatar", "Titanic"];
  const mockOnSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <MovieSelector
        movies={mockMovies}
        onSelect={mockOnSelect}
        selection={false}
      />
    );
    const cardHeader = screen.getByText("Select A Movie");
    expect(cardHeader).toBeInTheDocument();
  });

  test("displays all the movies", () => {
    render(
      <MovieSelector
        movies={mockMovies}
        onSelect={mockOnSelect}
        selection={false}
      />
    );
    mockMovies.forEach((movie) => {
      const movieButton = screen.getByText(movie);
      expect(movieButton).toBeInTheDocument();
    });
  });

  test("calls onSelect when a movie is selected", () => {
    render(
      <MovieSelector
        movies={mockMovies}
        onSelect={mockOnSelect}
        selection={false}
      />
    );
    const movieButton = screen.getByText("Inception");

    fireEvent.click(movieButton);

    expect(mockOnSelect).toHaveBeenCalledWith("Inception", "movie");
  });
});
