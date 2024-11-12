import { useEffect } from "react";
import { useState } from "react";

const getButtonStyle = (
  el: string,
  matchedPairs: string[],
  unmatchedPairs: string[],
  clickedButton: string
) => {
  return {
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
    display: "block",
  };
};

export default function CountryCapitalGameColumn() {
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
  const [shuffledCountries, setShuffledCountries] = useState<string[]>([]);
  const [shuffledCapital, setShuffledCapital] = useState<string[]>([]);

  const countries = Object.keys(data);
  const capitals = Object.values(data);

  useEffect(() => {
    const shuffledCountries = countries.sort(() => Math.random() - 0.5);
    setShuffledCountries(shuffledCountries);
  }, []);

  useEffect(() => {
    const shuffledCapital = capitals.sort(() => Math.random() - 0.5);
    setShuffledCapital(shuffledCapital);
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

  useEffect(() => {
    if (unmatchedPairs.length > 0) {
      setErrorCount((prevCount) => prevCount + 1);
    }
  }, [unmatchedPairs]);

  useEffect(() => {
    setTimeout(() => {
      setShuffledCountries((prevData) =>
        prevData.filter((el) => !matchedPairs.includes(el))
      );
      setShuffledCapital((prevData) =>
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

      {shuffledCountries.length + shuffledCapital.length === 0 && (
        <p>You win!</p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {shuffledCountries.map((el) => (
            <button
              style={getButtonStyle(
                el,
                matchedPairs,
                unmatchedPairs,
                clickedButton
              )}
              key={el}
              onClick={() => handleButtonClick(el)}
            >
              {el}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {shuffledCapital.map((el) => (
            <button
              style={getButtonStyle(
                el,
                matchedPairs,
                unmatchedPairs,
                clickedButton
              )}
              key={el}
              onClick={() => handleButtonClick(el)}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
