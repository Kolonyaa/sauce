const {
  encrypt,
  decrypt,
  encryptString,
  decryptString,
  EncryptTransform,
  DecryptTransform,
} = require("..");
const fs = require("fs");
const readFile = require('util').promisify(fs.readFile);
const path = require("path");
const assert = require("assert");
const { after } = require("mocha");

const emptyFile = path.join(__dirname, "./empty.txt");
const inputFile = path.join(__dirname, "./test.txt");
const outputFile = path.join(__dirname, "./output1.txt");

describe("@gykh/caesar-cipher", function () {
  describe("Validaton", function () {
    it("should throw error for empty file", async function () {
      const data = await readFile(emptyFile);
      assert.throws(() => encrypt(data, 3));
      assert.throws(() => decrypt(data, 3));
    });
    it("should throw error for invalid data", function () {
      const data = undefined;
      assert.throws(() => encrypt(data, 3));
      assert.throws(() => decrypt(data, 3));
    });
    it("should throw error for empty string", function () {
      const data = "";
      assert.throws(() => encryptString(data, 3));
      assert.throws(() => decryptString(data, 3));
    });
    it("should throw error for long string", function () {
      const data = makeString(1001);
      assert.throws(() => encryptString(data, 3));
      assert.throws(() => decryptString(data, 3));
    });
    it("should throw error for no/invalid key", function () {
      const data = "test";
      assert.throws(() => encryptString(data));
      assert.throws(() => encryptString(data, 'sa'));
      assert.throws(() => decryptString(data));
      assert.throws(() => decryptString(data, 'sa'));
      assert.throws(() => decryptString(data, 26));
      assert.throws(() => decryptString(data, -1));
    });
    it("should throw error for invalid transform key", function () {
      assert.throws(() => new EncryptTransform());
      assert.throws(() => new EncryptTransform("as"));
      assert.throws(() => new DecryptTransform());
      assert.throws(() => new DecryptTransform("as"));
      assert.throws(() => new DecryptTransform(26));
      assert.throws(() => new DecryptTransform(-1));
    });
    it("should throw error for invalid transform", function (done) {      
      const encTransform = new EncryptTransform(3);
      const decTransform = new DecryptTransform(3);

      const stream = fs.createReadStream(emptyFile)
        .pipe(encTransform)
        .pipe(decTransform)
        .pipe(fs.createWriteStream(outputFile));

      stream.on("error", (err) => assert.ok(false, err.message));
      stream.on("finish", done);
    });

    after(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
    });
  });
});

function makeString(/** @type {number} */ minLength) {
  var result           = 'a';
  while (result.length < minLength) {
    result += result;
  }
  return result;
}
