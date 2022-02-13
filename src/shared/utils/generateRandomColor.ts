const palette = ['#C8745C', '#798951', '#BB8614', '#557174', '#7F8170', '#B86105', '#3D9791'];

export function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * palette.length);

  return palette[randomIndex];
}
