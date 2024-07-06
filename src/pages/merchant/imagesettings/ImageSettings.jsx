import { useState, useEffect, useRef } from "react";
//import getCroppedImg from "./cropImage";
import Layout from "../../../components/MerchantLayout";
import { UploadImageIcon } from "../../../assests/icons/Icons";
//import html2canvas from "html2canvas";
import storage from "../../../utils/storage";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
//import { image } from "html2canvas/dist/types/css/types/image";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageSettingsPage = () => {
  const uploadId = useRef();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [idName, setIdName] = useState("");
  const [isImageUploadingId, setIsImageUploadingId] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();

  const uploadImageFile = () => {
    if (!isImageUploadingId) {
      uploadId.current.click();
    }
  };


  const onSelectFile = (e) => {
   const file = e.target.files?.[0];
   if (!file) return;

   const reader = new FileReader();
   reader.addEventListener("load", () => {
    const imageUrl = reader.result?.toString() || "";
    console.log(imageUrl);
    setImgSrc(imageUrl);

        
  });
  reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const {width, height} = e.currentTarget
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,  
      },
       ASPECT_RATIO,
       width,
       height
    );
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop);

    console.log("save", centeredCrop);

    // storage.add(
    //   "userAvatar",
    //   JSON.stringify({
    //     avatar: centeredCrop
    //   })
    // );

  }
  

  return (
    <>
      <Layout>
        <main className="sm:ml-[370px] ml-0 sm:px-10 px-6 bg-[#F6F7F9] ">
          <h2 className="text_18 pb-4 pt-10">Upload Logo</h2>
          <div class="text-[#6b6968] rounded-[15px]  bg-[#ffffff] sm:max-w-[579px] max-w-[386px]">



            <div className="p-10">
            <div className="col-span-full">
              <div className="mt-2 flex justify-center bg-[#F6F7F9] rounded-lg border border-dashed border-gray-900/25 px-6 py-7">
                <div onClick={() => {uploadImageFile()}}  className="text-center ">
                  <span className=" flex items-center justify-center ">
                  <UploadImageIcon />
                  </span>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md "
                    >
                      <span className="text_16 font-normal">Click or drag file to Upload</span>
                      <input 
                       id="file-upload" 
                       ref={uploadId} 
                       name="file-upload" 
                       type="file" 
                       className="sr-only" />
                    </label>
                  </div>
                 
                  <p className="font-normal text-[#9d9d9d]  text-sm">
                  {idName === "" ? (
                        <>JPG, JPEG, PNG, SVG, 1MB max</>
                      ) : (
                        <>{idName}</>
                      )}
                  </p>
                </div>
              </div>
            </div>
            </div>

            <div class=" border-[0.5px] border-[#D9D9D9]"></div>
            <div className="py-10 px-10 flex justify-center ">
              <button onClick={() => {uploadImageFile()}} className="short_btn">
                Upload
              </button>

             <button className="short_btn_white ml-6">
                Cancel
              </button>
            </div>
          </div>



          <div>
            <input
             type="file"
             accept="image/*"
             onChange={onSelectFile}
             className="block w-full text-sm file:mr-4 file:py-1 file:rounded-full file:border-0"
            />
          </div>

          {imgSrc && 
            <div className="flex flex-col items-center">
              <ReactCrop
               crop={crop} 
               onChange={
                (pixelCrop, percentCrop)=>setCrop(percentCrop)
               }
               circularCrop
               keepSelection
               aspect={ASPECT_RATIO}
               minWidth={MIN_DIMENSION}
              >
                <img 
                ref={imgRef}
                src={imgSrc} alt="upload"
                 style={{maxHeight: "70vh"}}
                 onLoad={onImageLoad}
                />
              </ReactCrop>
              <button 
              onClick={() => {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    imgRef.current.width,
                    imgRef.current.height
                  )
                )
              }}
              className="submit_btn ">
                Crop Image
              </button>
            </div>
          }
          {crop && 
          <canvas
          ref={previewCanvasRef}
           className="mt4" 
           style={{
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
           }}
          />
          }
        </main>
      </Layout>
    </>
  );
};

export default ImageSettingsPage;
