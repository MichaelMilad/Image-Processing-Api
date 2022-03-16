import path from 'path';
import fs from 'fs';
import imageResize from '../utilities/imageResize';

describe('Testing Our Sharp Resize Function', async () => {
  it('Should create a resized image for "palmtunnel" after execution', async () => {
    //defining our Paths
    const imgPath = path.join(__dirname, '../../images/palmtunnel');
    const resizedPath = path.join(
      __dirname,
      '../../images/thumbnails/palmtunnel_777_777.jpg'
    );
    //deleting the resized image first if exists to ensure a fresh test
    if (fs.existsSync(resizedPath)) {
      fs.unlinkSync(resizedPath);
    }
    await imageResize('palmtunnel', 777, 777, imgPath, 'jpg');
    expect(fs.existsSync(resizedPath)).toBeTruthy();
  });

  it('Should NOT create a resized image for "randomImgName" after execution', async () => {
    //defining our Paths
    const imgPath = path.join(__dirname, '../../images/randomImgName');
    const resizedPath = path.join(
      __dirname,
      '../../images/thumbnails/randomImageName_777_777.jpg'
    );
    await imageResize('randomImageName', 777, 777, imgPath, 'jpg').catch(() => {
      return;
    });
    expect(fs.existsSync(resizedPath)).toBeFalsy();
  });
});
