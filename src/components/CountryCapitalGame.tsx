import React, { useEffect } from "react";
import { useState } from "react";

export default function CountryCapitalGame() {
  const [shuffledData, setShuffledData] = useState<string[]>([]);
  const data = {
    Germany: "Berlin",
    Azerbaijan: "Baku",
    Poland: "Warszawa",
    "Papua New Guinea": "Port Moresby",
  };

  const [clickedButton, setClickedButton] = useState("");
  const [previousClicked, setPreviousClicked] = useState("");
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [unmatchedPairs, setUnmatchedPairs] = useState<string[]>([]);

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
    setTimeout(() => {
      setShuffledData((prevData) =>
        prevData.filter((el) => !matchedPairs.includes(el))
      );
    }, 1000);
  }, [matchedPairs]);

  return (
    <div>
      <p>Your game component</p>
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
            padding: "5px",
            margin: "5px",
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
