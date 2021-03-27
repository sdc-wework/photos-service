const { v4: uuidv4 } = require('uuid');

const writeWorkspaceRecordsToTxt = async (data, amountOfRecords, writer, encoding, idIndex, callback) => {
  return new Promise((resolve, reject) => {
  let j = 0;
  let i = amountOfRecords;
  let dataLimit = data.length;
  const write = async () => {
    let ok = true;
    do {
      if (j === dataLimit) {
        j = 0;
      };
      i -= 1;
      const record = `${uuidv4()}|${idIndex}|${data[j].trim()}\n`;
      idIndex++;
      j++;
      if (i === 0) {
        ok = writer.write(record, encoding);
        if (ok === true) {
          callback(null, ok);
        } else {
          callback('Unable to write file', ok);
        }
      } else {
        ok = writer.write(record, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
  });
};

writeWorkspacesRecordsToTxtPromise = (data, amountOfRecords, writer, encoding, idIndex) => {
  return new Promise ((resolve, reject) => {
    writeWorkspaceRecordsToTxt(data, amountOfRecords, writer, encoding, idIndex, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}


const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const writePhotoRecordsToTxt = async (data, amountOfRecords, writer, encoding, idIndex, workspace_id, callback) => {
  return new Promise((resolve, reject) => {
  let j = 0;
  let i = amountOfRecords;
  let numOfPhotosPerWorkspace = randomIntBetween(4, 7);
  let photoUrlsLimit = data.photoUrls.length;
  let descriptionLimit = data.descriptions.length;
  const write = async () => {
    let ok = true;
    do {
      if (j === photoUrlsLimit) {
        j = 0;
        numOfPhotosPerWorkspace = randomIntBetween(4, 7);
      };
      i -= 1;

      let trimmedDescription = data.descriptions[j].trim();
      let descriptionWord = trimmedDescription.slice(0, trimmedDescription.indexOf(' '));
      const record = `${uuidv4()}|${descriptionWord}|${data.photoUrls[j]}|${workspace_id}\n`;
      j++;
      if (i === 0) {
        ok = writer.write(record, encoding);
        if (ok === true) {
          callback(null, ok);
        } else {
          callback('Unable to write file', ok);
        }
      } else {
        ok = writer.write(record, encoding);
      }
      if (j === numOfPhotosPerWorkspace) {
        workspace_id++;
        numOfPhotosPerWorkspace += randomIntBetween(4, 7);
      }
      if (workspace_id >= idIndex) {
        callback(null, ok);
        break;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
  });
};

writePhotoRecordsToTxtPromise = (data, amountOfRecords, writer, encoding, idIndex, workspace_id) => {
  return new Promise ((resolve, reject) => {
    writePhotoRecordsToTxt(data, amountOfRecords, writer, encoding, idIndex, workspace_id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = {
  workspaces: writeWorkspacesRecordsToTxtPromise,
  photos: writePhotoRecordsToTxtPromise
};

