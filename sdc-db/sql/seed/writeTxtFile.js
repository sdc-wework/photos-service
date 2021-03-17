const { v4: uuidv4 } = require('uuid');

const writeRecordsToTxt = async (data, amountOfRecords, writer, encoding, callback) => {
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
      const record = `${uuidv4()}|${data[j].trim()}\n`;
      j++;
      if (i === 0) {
        ok = writer.write(record, encoding, callback);
        return;
      } else {
        ok = writer.write(record, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
  // return;
  });
};

// writeRecordsToCsv(amountOfRecords, writeStream, 'utf-8', () => {
//   writeStream.end();
// });

module.exports = writeRecordsToTxt;

