export async function imgUrlToBitmap (
  maskUrl: string,
) {
  const img = new Image()
  img.src = maskUrl
  await img.decode()
  return createImageBitmap(img)
}
