const {
  encrypt,
  decrypt,
  encryptString,
  decryptString,
  EncryptTransform,
  DecryptTransform,
} = require("..");
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const { after } = require("mocha");

const inputFile = path.join(__dirname, "./test.txt");
const outputFile = path.join(__dirname, "./output.txt");

describe("@gykh/caesar-cipher", function () {
  describe("encrypt and decrypt", function () {
    it("should encrypt and decrypt file contents", function (done) {
      fs.readFile(inputFile, function (err, data) {
        if (err) {
          return done(err);
        }
        const encrypted = encrypt(data, 3);

        const decrypted = decrypt(encrypted, 3);

        assert.deepEqual(data, decrypted);

        done();
      });
    });
    it("should encrypt and decrypt string contents", function (done) {
      fs.readFile(inputFile, function (err, data) {
        if (err) {
          return done(err);
        }
        const dataString = data.toString();

        const encrypted = encryptString(dataString, 3);

        const decrypted = decryptString(encrypted, 3);

        assert.deepEqual(dataString, decrypted);

        done();
      });
    });
    it("should encrypt and decrypt streams", function (done) {
      const readStream = fs.createReadStream(inputFile);
      const writeStream = fs.createWriteStream(outputFile);

      const encryptTransform = new EncryptTransform(3);
      const decryptTransform = new DecryptTransform(3);

      readStream
        .pipe(encryptTransform)
        .pipe(decryptTransform)
        .pipe(writeStream)
        .on("finish", () => {
          assert.deepEqual(
            fs.readFileSync(inputFile),
            fs.readFileSync(outputFile)
          );
          done();
        });
    });

    after(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
    });
  });
});
