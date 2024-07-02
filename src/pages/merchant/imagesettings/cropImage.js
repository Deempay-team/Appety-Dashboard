export default function ImageCropper(imageSrc, pixelCrop) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const image = new Image();
    image.src = imageSrc;
  
    return new Promise((resolve, reject) => {
      image.onload = () => {
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
  
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
  
        canvas.toBlob((blob) => {
          if (blob) {
            blob.name = 'cropped.jpg';
            resolve(URL.createObjectURL(blob));
          } else {
            reject(new Error('Canvas is empty'));
          }
        }, 'image/jpeg');
      };
  
      image.onerror = () => {
        reject(new Error('Image failed to load'));
      };
    });
  }
  