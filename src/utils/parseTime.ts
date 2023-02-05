export default (secs: number) => {
  const minutes: number = Math.floor(secs / 60);
  const seconds: number = secs % 60;

  return `${minutes}m ${seconds}s`;
};
