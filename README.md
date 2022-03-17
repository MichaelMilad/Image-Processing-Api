Image Processing Api

to Access the API :
localhost:3000/images?name=imgName&width=imgWidth&height=imgHeight

Image must exist in images folder beforehand

Processed images are found in images/thumbnails Folder

project works with .jpg , .png , .gif , .bmp Extensions

Added Jasmine unit tests to endpoint and Sharp function.

Available Script:
    "build": "npx tsc",
    "test": "npx tsc && npx jasmine",
    "jasmine":"npx jasmine",
    "start": "npm run build && nodemon build/index.js",
    "lint": "eslint . --ext .ts",
    "format":"prettier --write src/**/*.ts"
    
   
Images Width defaults to 1000 if not entered , same goes for Height

Server will not break if name was not set , but a message will be sent
