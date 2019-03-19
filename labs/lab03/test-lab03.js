import {lab03} from './lab03';

let testInstance = new lab03();

console.log('\x1b[33m%s\x1b[0m', '01 - Should print contents of sample.txt to screen');
console.log(testInstance.syncFileRead('./sample.txt'));

console.log('\x1b[33m%s\x1b[0m', '02 - Should compress file sample.txt into sample.txt.gz');
testInstance.compressFileStream('./sample.txt', './sample.txt.gz').on('finish', () => {
  console.log("OK");
  console.log('\x1b[33m%s\x1b[0m', '03 - Should decompress file sample.txt.gz into sample1.txt');
  testInstance.decompressFileStream('./sample.txt.gz', 'sample1.txt').on('finish', () => {
    console.log("OK");
    console.log('\x1b[33m%s\x1b[0m', '04 - Should print contents of decompressed file to screen');
    testInstance.asyncFileRead('./sample1.txt', data => {
      console.log(data);
      console.log('\x1b[33m%s\x1b[0m', '05 - Should list contents of lab4 directory ******');
      testInstance.listDirectoryContents('./', files => {
        files.forEach(file => console.log(file));
      });
    });
  });
});


