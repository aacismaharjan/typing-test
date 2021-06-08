const getTimer = (time: number) => {
  let m, rem, s, formatS;

  m = Math.floor(time / (1000 * 60 * 60));
  rem = Math.floor(time % (1000 * 60 * 60));
  s = Math.floor(rem / (1000 * 60));
  formatS = s < 10 ? "0" + s : s;

  return `${m}:${formatS}`;
};

export { getTimer };
