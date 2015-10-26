window.onload = function () {

    var textArea = $('#textContent');

    //
    //  new file is basically clearing the textarea
    //
    $('#btnNewFile').click(function(){
        $(textArea).val('');
        $(textArea).focus();
    });

    //
    //  opening text files
    //
    $('#btnOpenFile').click(function () {
        chrome.fileSystem.chooseEntry({
            type: "openFile"
        }, function (fileEntry) {
            chrome.fileSystem.getDisplayPath(fileEntry, function (path) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onerror = function (e) {
                        console.error(e.message);
                    };

                    reader.onloadend = function (e) {
                        $(textArea).val(e.target.result);
                    };

                    reader.readAsText(file);

                });

            });
        });
    });

    //
    //  saving a file
    //
    $('#btnSaveFileAs').click(function () {
        chrome.fileSystem.chooseEntry({
            type: "saveFile",
            suggestedName: "sample.txt",
            acceptsAllTypes: true,
            accepts: [{description: "Text files (*.txt)", extensions: ["txt"]}]
        }, function (fileEntry) {
            var textToSave = $(textArea).val();
            console.log(textToSave);
            chrome.fileSystem.getDisplayPath(fileEntry, function (path) {
                fileEntry.createWriter(function(fileWriter){

                    var wasTruncated = false;
                    var data = new Blob([textToSave]);

                    fileWriter.onwriteend = function(e) {
                        if (!wasTruncated) {
                            wasTruncated = true;
                            // You need to explicitly set the file size to truncate
                            // any content that might have been there before
                            this.truncate(blob.size);
                            return;
                        }

                    };

                    fileWriter.onerror = function(e) {
                        console.error(e.message);
                    };

                    fileWriter.write(data);

                });

            });
        });
    });


};
