const sharp = require('sharp');
const path = require('path');

sharp('C:/Users/wcomcs/Desktop/mamma home.image.jpg')
  .resize(1920, null, { withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toFile(path.join(__dirname, 'public', 'images', 'mamma-home-hero.jpg'))
  .then(info => {
    console.log('done');
    console.log(info.width, info.height);
  })
  .catch(err => {
    console.error('err', err.message);
  });
