import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function imageResize(
  name: string,
  width: number,
  height: number,
  imgPath: string,
  extension: string
): Promise<void> {
  const processedPath = path.join(
    __dirname,
    `../../images/thumbnails/${name}_${width}_${height}.${extension}`
  );
  if (!fs.existsSync(processedPath)) {
    await sharp(`${imgPath}.${extension}`)
      .resize({
        width: width,
        height: height
      })
      .toFile(processedPath);
  }
}

export default imageResize;
