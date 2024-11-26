import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export default function CountryCapitalGame() {
  const [shuffledData, setShuffledData] = useState<string[]>([]);
  const data: Data = {
    Germany: "Berlin",
    Azerbaijan: "Baku",
    Poland: "Warszawa",
    "Papua New Guinea": "Port Moresby",
    Italia: "Roma",
    "United States": "Washington D.C.",
    "United Kingdom": "London",
    "South Korea": "Seoul",
    Japan: "Tokyo",
    Turkey: "Ankara",
    "New Zealand": "Wellington",
    Australia: "Canberra",
    Canada: "Ottawa",
    Russia: "Moscow",
  };

  type Data = { [key: string]: string };

  const [clickedButton, setClickedButton] = useState("");
  const [previousClicked, setPreviousClicked] = useState("");
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [unmatchedPairs, setUnmatchedPairs] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [guessCount, setGuessCount] = useState(0);

  console.log({ data });

  // voglio che il parametro b abbia il tipo corrispondente al valore di a

  /**
   * Checks if the given capital matches the capital of the specified country.
   *
   * @param a - The country name as a key from the data object.
   * @param b - The capital name to be matched.
   * @returns True if the capital matches the country's capital, otherwise false.
   */
  const getMatch = (a: keyof Data, b: (typeof data)[keyof Data]): boolean => {
    return data[a] === b;
  };

  useEffect(() => {
    const parsedData = Object.entries(data)
      .flat()
      .sort(() => Math.random() - 0.5);
    setShuffledData(parsedData);
  }, []);

  const handleButtonClick = (clickedItem: string) => {
    setClickedButton(clickedItem);

    if (previousClicked) {
      const isMatch =
        getMatch(previousClicked, clickedItem) ||
        getMatch(clickedItem, previousClicked);

      if (isMatch) {
        setMatchedPairs([previousClicked, clickedItem]);
        setGuessCount((prevCount) => prevCount + 1);
      } else {
        setUnmatchedPairs([previousClicked, clickedItem]);
      }

      if (matchedPairs.length > 0 || unmatchedPairs.length > 0) {
        setMatchedPairs([]);
        setUnmatchedPairs([]);
      }
    }
    setPreviousClicked(clickedItem);
  };

  useEffect(() => {
    if (unmatchedPairs.length > 0) {
      setErrorCount((prevCount) => prevCount + 1);
    }
  }, [unmatchedPairs]);

  useEffect(() => {
    setTimeout(() => {
      setShuffledData((prevData) =>
        prevData.filter((el) => !matchedPairs.includes(el))
      );
    }, 1000);
  }, [matchedPairs]);

  return (
    <div>
      <h2>Game component</h2>
      <div
        style={{ display: "flex", justifyContent: "center", columnGap: "20px" }}
      >
        <p>Errors: {errorCount}</p>
        <p>Correct Answers: {guessCount}</p>
      </div>

      {shuffledData.length === 0 && <p>You win!</p>}
      {shuffledData.map((el) => (
        <Button
          style={{
            backgroundColor: matchedPairs.includes(el)
              ? "green"
              : unmatchedPairs.includes(el)
              ? "red"
              : clickedButton === el
              ? "#0000ff"
              : "initial",
            color:
              matchedPairs.includes(el) ||
              unmatchedPairs.includes(el) ||
              clickedButton === el
                ? "white"
                : "initial",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "5px",
            margin: "5px",
            cursor: "pointer",
            textTransform: "initial",
          }}
          key={el}
          onClick={() => handleButtonClick(el)}
        >
          {el}
        </Button>
      ))}
    </div>
  );
}
