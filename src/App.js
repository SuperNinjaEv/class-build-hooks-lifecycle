import { useState, useEffect } from "react";
import axios from "axios";
import days from "./data";
const colors = [
  "papayawhip",
  "blanchedalmond",
  "peachpuff",
  "bisque",
  "cornsilk",
  "lightyellow",
];

function App() {
  const [color, setColor] = useState("lemonchiffon");
  const [dog, setDog] = useState({});
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(0);
  const [today, setToday] = useState({});
  const [vibe, setVibe] = useState("");

  /**
   * MULTIPLE useEffects
    DEMO: Incorrect Way
    useEffect(() => {
      getSomeValue();
      getAnotherValue();
    }, [someValue, anotherValue])
   * 
   * CORRECT WAY: separate to prevent infite loop
   * useEffect(() => {
   * getSomeValue()
   * }, [someValue])
   * 
   * useEffect(() => {
   * getAnotherValue()
   * }, [anotherValue])
   */

  // LUCKY NUMBER - On initial RENDER, generate random number
  useEffect(() => {
    setNumber(Math.floor(Math.random() * 100))
  }, [])

  // TODAYS DATE
  useEffect(() => {
    setToday(days[index])
    console.log(today)
  }, [index])

  useEffect(() => {
    // console.log(vibe)
  }, [vibe])

  useEffect(() => {
    setColor(colors[index])
  }, [today.month])

  // function getFeaturedDog() {
  //   fetch(`https://dog.ceo/api/breeds/image/random`)
  //     .then((response) => response.json())
  //     .then((json) => setDog(json))
  //     .catch((err) => console.log("error fetching dogs"))
  // }

  async function getFeaturedDog() {
    try {

      const response = await axios(`https://dog.ceo/api/breeds/image/random`)
      console.log(response);
      setDog(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFeaturedDog()
  }, [])


  function handleOnChange(event) {
    setVibe(event.target.value);
  }

  function updateIndex() {
    setIndex((index + 1) % days.length);
  }

  return (
    <div className="App">
      <header style={{ backgroundColor: color }}>
        <h1>Daily Home Page </h1>
        <button onClick={updateIndex}>Update Day</button>
      </header>
      <main>
        <div className="date">
          <h2>Todays date:</h2>
          <h3>{today.weekday}</h3>
          <h4>{today.month}</h4>
          <h5>{today.day}</h5>
        </div>
        <div className="lucky">
          <h2>Today's lucky number is: {number}</h2>
        </div>
        <div className="vibe">
          <input type="text" onChange={handleOnChange} />
          <h4>Today's vibe is: </h4>
          <h5>{vibe}</h5>
        </div>
        <div className="dog">
          <button onClick={getFeaturedDog}>Change dog</button>
          <h2>Featured dog:</h2>
          <img src={dog.message} alt="Featured Dog" />
        </div>
      </main>
    </div>
  );
}

export default App;
