import express from 'express';
import path from 'path';
import fs from 'fs';
import imageResize from './utilities/imageResize';

const PORT = 3000;
const app = express();

// add routing for / path
app.get('/images', async (req, res) => {
  //Extracting the parameters from Query String:
  const name: string = req.query.name as string;
  const width: number = parseInt(req.query.width as string) || 1000;
  const height: number = parseInt(req.query.height as string) || 1000;
  if (name) {
    //Getting image path based upon the image name
    const imgPath = path.join(__dirname, `../images/${name}`);

    //image extenstions array to allow for more extensions
    const imgExtensions = ['png', 'gif', 'bmp', 'jpg'];

    //Assuming image doesnt exist untill it is found
    let imageExistance = false;

    //finding the image and matching it with one of the extensions (consider imgExtensions array to be an enum)
    for (const extension of imgExtensions) {
      if (fs.existsSync(`${imgPath}.${extension}`)) {
        imageExistance = true;
        await imageResize(name, width, height, imgPath, extension);
        const resizedImgPath = path.join(
          __dirname,
          `../images/thumbnails/${name}_${width}_${height}.${extension}`
        );
        //finally sending the processed image
        res.sendFile(resizedImgPath);
      }
    }
    //in case image was not found
    if (!imageExistance) {
      res.send('Image Not Found, Please check the Image name');
    }
    //in case that name was left unwritten in Query String:
  } else {
    res
      .status(400)
      .send(
        'Image Name Was Not Entered , Please Specify The Image Name in Query String'
      );
  }
});

// start express server
app.listen(PORT, () => {
  console.log(`Server has Started at Port:${PORT}`);
});

export default app;
