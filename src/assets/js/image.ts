
export const getImgBase64 = (path: any) => {
  const img = new Image();
  img.src = require(path);
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return false;
    }
    const imgWidth = img.width;
    const imgHeight = img.height;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
    const dataUrl = canvas.toDataURL('image/jpeg');
    return dataUrl
  };
}