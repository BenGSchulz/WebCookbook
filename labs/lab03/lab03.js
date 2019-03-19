import fs from 'fs';
import zlib from 'zlib';

class lab03 {
  syncFileRead(filename) {
    /* Implement function here */
    var data = fs.readFileSync(filename);

    return data.toString();
  }

  asyncFileRead(filename, callback) {
    /* Implement function here */
    fs.readFile(filename, function (err, data) {
      if(err) return console.error(err);
      callback(data.toString());
    });
  }

  compressFileStream(inFile, outFile) {
    /* Implement function here */
    return fs.createReadStream(inFile)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(outFile));
  }

  decompressFileStream(inFile, outFile) {
    /* Implement function here */
    return fs.createReadStream(inFile)
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream(outFile));
  }

  listDirectoryContents(dir, callback) {
    /* Implement function here */
    let dirContents = [];

    fs.readdir(dir, function(err, contents) {
      if(err) return console.error(err);
      callback(contents);
      dirContents = contents;
    });

    return callback(dirContents);
  }
}

export {lab03};
