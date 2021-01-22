const fs = require('fs');

const renameFiles = (path) => {
  fs.readdir(path, function (error, filenames) {
    if (error) console.log(error);
    filenames.forEach(function (filename, i) {
      const fileParts = filename.split('.');
      const extension = fileParts[fileParts.length - 1];
      fs.rename(`${path}/${filename}`, `${path}/${i}.${extension}`, function (error) {
        if (error) console.log(error);
      });
    });
  });
};

renameFiles('/Users/procore/Downloads/wework-images');
