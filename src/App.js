import React, { useEffect, useState } from "react";
import Dice from "./components/Dice";
import "./style.css";
import { nanoid } from "nanoid";
import { Wave } from "react-animated-text";
import Confetti from "react-confetti";
import swal from "sweetalert2";

function App() {
  const [allDice, setAllDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = allDice.every((dice) => dice.isHeld);
    const firstValue = allDice[0].value;
    const allValues = allDice.every((dice) => dice.value === firstValue);

    if (allHeld && allValues) {
      setTenzies(true);
      return new swal("You won! 🥳");
    }
  }, [allDice]);

  function generateNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const diceArray = [];
    for (let index = 0; index < 10; index++) {
      diceArray.push(generateNewDice());
    }
    return diceArray;
  }

  function rollDice() {
    setAllDice((prevState) =>
      prevState.map((dice) => {
        return dice.isHeld ? dice : generateNewDice();
      })
    );

    if (tenzies) {
      setAllDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setAllDice((prevState) =>
      prevState.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const diceElements = allDice.map((dice) => (
    <Dice
      isHeld={dice.isHeld}
      key={dice.id}
      value={dice.value}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <div className="App">
      <main>
        {tenzies && (
          <Confetti
            colors={[
              "#B667F1",
              "#FF9F45",
              "#54BAB9",
              "#219F94",
              "#FFE162",
              "#FAEEE7",
              "#D77FA1",
              "#95CD41",
              "#009688",
            ]}
          />
        )}
        <div className="title">
          <Wave text="TENZIES" iterations={1} />
        </div>
        <p className="instructions">
          Roll until all dice are the same. <br />
          Click each dice to freeze it at its current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="btn-roll" onClick={rollDice}>
          {tenzies ? "New game" : "Roll!"}
        </button>
      </main>
    </div>
  );
}

export default App;
