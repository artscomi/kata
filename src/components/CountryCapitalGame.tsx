import React, { useEffect } from "react";
import { useState } from "react";

export default function CountryCapitalGame() {
  const [shuffledData, setShuffledData] = useState<string[]>([]);
  const data = {
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

  const [clickedButton, setClickedButton] = useState("");
  const [previousClicked, setPreviousClicked] = useState("");
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [unmatchedPairs, setUnmatchedPairs] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [guessCount, setGuessCount] = useState(0);

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
        data[previousClicked as keyof typeof data] === clickedItem ||
        data[clickedItem as keyof typeof data] === previousClicked;

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

  console.log({ previousClicked, matchedPairs, unmatchedPairs });

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
        <button
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
          }}
          key={el}
          onClick={() => handleButtonClick(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
