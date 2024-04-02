const { Storage } = require('@google-cloud/storage');
const cloud_storage = new Storage({
  projectId: 'booming-crowbar-414715',
  keyFilename: 'booming-crowbar-414715-f6f479be8328.json',
});


const uploadToFirebaseStorage = async (filepath, fileName) => {
    try {
      const gcs = cloud_storage.bucket('medicaldiagnosis');
      const storagepath = `images/${fileName}.jpeg`; 
      const result = await gcs.upload(filepath, {
        destination: storagepath,
        predefinedAcl: 'publicRead',
        metadata: {
          contentType: 'image/jpeg',
        },
      });
      return result[0].metadata.mediaLink;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
module.exports={uploadToFirebaseStorage};