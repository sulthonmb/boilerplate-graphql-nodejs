const s3  = require("../config/s3");
const { DIRECTORY_FILES } = require("../constants");
const { S3Uploader } = require("../utils/gplUploaders");

const imageUploaderForGallery = new S3Uploader(s3, {
  baseKey: DIRECTORY_FILES.GALLERY,
  uploadParams: {
    CacheControl: "max-age:31536000",
    ContentDisposition: "inline",
  },
});

module.exports = {
  imageUploaderForGallery,
};