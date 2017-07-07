const UiUploader = function () {
  console.log('ui uploader ready')
}

UiUploader.prototype.showHint = function(message) {
  console.log(message)
};

module.exports = new UiUploader()