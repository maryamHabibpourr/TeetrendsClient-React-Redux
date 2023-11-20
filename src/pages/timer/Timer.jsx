import React, { useState, useEffect } from "react";
import styles from "./Timer.module.scss";

function Timer({ onTimerEnd }) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const intervalDuration = 100;
    const decrementValue = 1;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > decrementValue) {
          return prevSeconds - decrementValue;
        } else {
          clearInterval(interval);
          onTimerEnd();
          return 0;
        }
      });
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [onTimerEnd]);

  return (
    <div className={styles.timerPage}>
      <h1>به تی ترندز خوش آمدید!</h1>
      <p>ما در اینجا مجموعه ای از تی شرت های زنانه و مردانه را ارائه می دهیم.</p>
      <div className={styles.laodingSecond}>
        <span>لودینگ</span>
        {seconds}
      </div>
    </div>
  );
}

export default Timer;
