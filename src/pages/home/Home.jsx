import React, { useState, useEffect } from "react";

//components
import { Threejs } from "../../pages";
import Timer from "../timer/Timer";

function Home() {
  const [showTimer, setShowTimer] = useState(true);

  const handleTimerEnd = () => {
    setShowTimer(false);
  };

  return (
    <div>
      {showTimer && <Timer onTimerEnd={handleTimerEnd} />}
      {!showTimer &&  <Threejs />}
    </div>
  );
}

export default Home;
