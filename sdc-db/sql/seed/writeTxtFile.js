const { v4: uuidv4 } = require('uuid');

const writeRecordsToTxt = async (data, amountOfRecords, writer, encoding, idIndex, callback) => {
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
          console.log(`Total records after batch is inserted: ${idIndex}`);
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

writeRecordsToTxtPromise = (data, amountOfRecords, writer, encoding, idIndex) => {
  return new Promise ((resolve, reject) => {
    writeRecordsToTxt(data, amountOfRecords, writer, encoding, idIndex, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = writeRecordsToTxtPromise;

