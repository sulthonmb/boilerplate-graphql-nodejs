const path = require("path");
const { v4: uuid } = require("uuid");

function uuidFilenameTransform(filename = "") {
  // (A)
  const fileExtension = path.extname(filename);

  return `${uuid()}${fileExtension}`;
}

class S3Uploader {
  constructor(s3, config) {
    const {
      baseKey = "",
      uploadParams = {},
      concurrencyOptions = {},
      filenameTransform = uuidFilenameTransform, // (A)
    } = config;

    this._s3 = s3;
    this._baseKey = baseKey.replace("/$", ""); // (B)
    this._filenameTransform = filenameTransform;
    this._uploadParams = uploadParams;
    this._concurrencyOptions = concurrencyOptions;
  }

  async upload(stream, { filename, mimetype }) {
    const transformedFilename = this._filenameTransform(filename); // (A)

    const { Location } = await this._s3
      .upload(
        {
          ...this._uploadParams, // (C)
          Body: stream,
          Key: `${this._baseKey}/${transformedFilename}`,
          ContentType: mimetype,
        },
        this._concurrencyOptions
      )
      .promise();

    return Location; // (D)
  }

  async delete({filename}) {
    const transformedFilename = this._filenameTransform(filename); 
    const deleteFile = await this._s3.deleteObject({
      Key: `${this._baseKey}/${transformedFilename}`
    }).promise();

    return deleteFile;
  }
}

class FilesystemUploader {
  constructor(config = {}) {
    const { dir = "", filenameTransform = uuidFilenameTransform } = config;

    this._dir = path.normalize(dir);
    this._filenameTransform = filenameTransform;
  }

  upload(stream, { filename }) {
    const transformedFilename = this._filenameTransform(filename);

    const fileLocation = path.resolve(this._dir, transformedFilename);
    const writeStream = stream.pipe(fs.createWriteStream(fileLocation));

    return new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    }).then(() => `file://${fileLocation}`);
  }
}

module.exports = {
  S3Uploader,
  FilesystemUploader,
  uuidFilenameTransform,
};
