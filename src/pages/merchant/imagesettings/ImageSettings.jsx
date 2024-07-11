import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/MerchantLayout";
import { UploadImageIcon } from "../../../assests/icons/Icons";
import storage from "../../../utils/storage";
import secrets from "../../../config/secrets";
import axios from "axios";
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { SpinnerWhite } from "../../../components/spinner/Spinner";
import Notify from "../../../components/Notification";

const ImageSettingsPage = () => {
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const baseURL = secrets.baseURL;
  const imgRef = useRef();
  const [idName, setIdName] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [file, setFile] = useState();

    //CALL QUERY MERCHANT DETAILS API
    const queryMerchantUpdate = () => {
      axios
        .get(`${baseURL}/api/v1/user/merchant/query/${merchId}`)
        .then(function (res) {
          if (res.data.code === "000000") {
            storage.add(
              "merchantDetails",
              JSON.stringify({
                merchStatus: res.data.data?.merchStatus,
                merchName: res.data.data?.merchName,
                merchPhone: res.data.data?.merchPhone,
                contactName: res.data.data?.contactName,
                linkUrl: res.data.data?.linkUrl,
                linkUrlStatus: res.data.data?.linkUrlStatus,
                logoUrl: res.data.data?.logoUrl,
                preOrderUrl: res.data.data?.preOrderUrl,
              })
            );
          }
        })
        .catch(function (error) {
          console.log("merchant-error", error);
        });
    };

////////////////////////////////////////////
const formData = new FormData();
formData.append("image", file);

 //CALL API TO UPLOAD IMAGE
useEffect(() => {
 if(file) {
  axios
  .post(`${baseURL}/api/v1/user/uploadImage/${merchId}`, 
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )
.then(function (res) {
      queryMerchantUpdate ();
      setIsImageUploading(false)
      Notify(
        "success",
        "Succes",
        "Image Uploaded Successfully!",
        6
      );
      window.location.reload();
  })
  .catch(function (error) {
    console.log("queryWaitType-error", error);
  });
 }
}, [file])

const handleImageUpload = ({file }) => {
  setFile(file);
  setIsImageUploading(true)
  setIdName(file.name)
};

const uploadImg = () => {
   imgRef.current.click();
}; 

  return (
    <>
      <Layout>
        <main className="xl:ml-[370px] ml-[320px] sm:px-10 px-6 bg-[#F6F7F9] h-screen">
          <h2 className="text_18 pb-4 pt-10">Upload Logo</h2>
          <div class="text-[#6b6968] rounded-[15px]  bg-[#ffffff] sm:max-w-[579px] max-w-[386px]">
          <ImgCrop>
      <Upload 
      showUploadList={false}
        customRequest={handleImageUpload}
      >
       <span ref={imgRef}></span>
      </Upload>
    </ImgCrop>
    <div className="p-10 w-full" onClick={uploadImg}>
            <div className="col-span-full">
              <div className="mt-2 flex justify-center bg-[#F6F7F9] rounded-lg border border-dashed border-gray-900/25 px-6 py-7">
                <div  className="text-center ">
                  <span className=" flex items-center justify-center ">
                  <UploadImageIcon />
                  </span>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md "
                    >
                      <span className="text_16 font-normal">Click or drag file to Upload</span>
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
              <button className="short_btn">
                {isImageUploading ? <SpinnerWhite /> : "Upload"}
              </button>
             <button className="short_btn_white ml-6">
                Cancel
              </button>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default ImageSettingsPage;
