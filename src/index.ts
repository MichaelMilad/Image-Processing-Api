import express from 'express';
import path from 'path';
import fs from 'fs';
import imageResize from './utilities/imageResize';
import { Response, Request } from 'express';

const PORT = 3000;
const app = express();

// add routing for / path
app.get('/images', async (req: Request, res: Response): Promise<void> => {
  //Extracting the parameters from Query String:
  const name: string = req.query.name as string;
  const width: number = parseInt(req.query.width as string) || 0;
  const height: number = parseInt(req.query.height as string) || 0;

  if (name) {
    if (!width || !height || width <= 0 || height <= 0) {
      res.status(400).send('Please Enter a valid width and/or height');
    } else {
      //Getting image path based upon the image name
      const imgPath: string = path.join(__dirname, `../images/${name}`);

      //image extenstions array to allow for more extensions
      const imgExtensions: Array<string> = ['png', 'gif', 'bmp', 'jpg'];

      //Assuming image doesnt exist untill it is found
      let imageExistance = false;

      //finding the image and matching it with one of the extensions (consider imgExtensions array to be an enum)
      for (const extension of imgExtensions) {
        if (fs.existsSync(`${imgPath}.${extension}`)) {
          imageExistance = true;
          await imageResize(name, width, height, imgPath, extension);
          const resizedImgPath: string = path.join(
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
    }
  } else {
    res
      .status(400)
      .send(
        'Image Name Was Not Entered , Please Specify The Image Name in Query String'
      );
  }
});

// start express server
app.listen(PORT, (): void => {
  console.log(`Server has Started at Port:${PORT}`);
});

export default app;
