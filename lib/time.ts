export function getQuarter(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0: January, 1: February, ..., 11: December

  // 분기 계산
  const quarter = Math.floor(month / 3) + 1;

  return `${year}Q${quarter}`;
}

export function sumArray(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0);
}

export function ave(arr: number[]) {
  return sumArray(arr) / arr.length;
}
