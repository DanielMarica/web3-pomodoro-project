export const calculateProgress = (timeLeft: number, totalTime: number): number => {
  return ((totalTime - timeLeft) / totalTime) * 100;
};
