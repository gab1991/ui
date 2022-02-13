const palette = ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#FF9671', '#FFC75F', '#CE7BB0'];

export function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * palette.length);

  return palette[randomIndex];
}
