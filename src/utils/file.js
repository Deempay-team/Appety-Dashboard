// eslint-disable-next-line import/no-anonymous-default-export
export default {
    convertToBase64: (file) => {
      return new Promise((resolve, reject) => {
        let base64URL = "";
        let reader = new FileReader();
        
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          base64URL = reader.result;
          resolve(base64URL.split(",")[1]);
        };
         
        reader.onerror = (error) => {
          reject(error);
        };
      });
    },
  };
  