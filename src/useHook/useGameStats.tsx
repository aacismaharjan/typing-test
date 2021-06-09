import { useState, useEffect } from "react";

function useGameStats(
  startTime: Date | null,
  paras: string,
  counter: number,
  words: string[],
  timerInterval: React.MutableRefObject<any>,
  isGameOver: boolean
) {
  const [accuracy, setAccuracy] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [wpmNet, setWpmNet] = useState(0);
  const [wpmGross, setWpmGross] = useState(0);

  useEffect(() => {
    if (startTime && isGameOver) {
      const miliSeconds = new Date().getTime() - startTime.getTime();
      const seconds = Math.floor(miliSeconds / 1000);
      const totalWords = paras.split(" ").slice(0, counter);
      const correctWords = totalWords.filter((w, i) => w === words[i]);
      const total = totalWords.length;
      const score = correctWords.length;

      const wpmNet = Math.floor((score / seconds) * 60);
      const wpmGross = Math.floor((total / seconds) * 60);
      const accuracy = Math.floor((score / total) * 100);

      setScore(score);
      setTotal(total);
      setWpmNet(wpmNet);
      setWpmGross(wpmGross);
      setAccuracy(accuracy);

      const record = {
        id: new Date().getTime(),
        startTime,
        accuracy,
        score,
        wpmNet,
        wpmGross,
        total,
        seconds,
      };

      updateGameLocalStorage(record);
      clearInterval(timerInterval.current);
    }
  }, [startTime, isGameOver, paras, counter, timerInterval, words]);

  return {
    score,
    total,
    wpmNet,
    wpmGross,
    accuracy,
  };
}

export default useGameStats;

function updateGameLocalStorage(record: {
  id: number;
  startTime: Date;
  accuracy: number;
  score: number;
  wpmNet: number;
  wpmGross: number;
  total: number;
  seconds: number;
}) {
  let localRecords = localStorage.getItem("records");

  if (localRecords) {
    const items = [...JSON.parse(localRecords), record];
    localStorage.setItem("records", JSON.stringify(items));
  } else {
    localStorage.setItem("records", JSON.stringify([record]));
  }
}
