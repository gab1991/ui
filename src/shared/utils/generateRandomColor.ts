const palette = ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'];

export function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * palette.length);

  return palette[randomIndex];
}
