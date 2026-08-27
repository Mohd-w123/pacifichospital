import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'qzxbq9n1',
  api_key: process.env.CLOUDINARY_API_KEY || '657165584262464',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'GHSjYMggHOs7K57WViMzt5EBT70',
  secure: true
});

export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'pacific-hms';

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = CLOUDINARY_FOLDER,
  filename?: string
): Promise<{ url: string; public_id: string; secure_url: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        public_id: filename ? filename.replace(/\.[^/.]+$/, '') : undefined
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Upload failed'));
        }
        resolve({
          url: result.url,
          public_id: result.public_id,
          secure_url: result.secure_url
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
}

export default cloudinary;
