const palette = ['#DE8971', '#B2B8A3', '#EEBB4D', '#557174', '#999B84', '#E6A157', '#94D0CC'];

export function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * palette.length);

  return palette[randomIndex];
}
