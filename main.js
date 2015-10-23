window.onload = function() {
  
  var textArea = document.querySelector('#textContent');
  
  document.querySelector('#btnOpenFile').onclick = function() {
    chrome.fileSystem.chooseEntry({}, function(entry){
      
      chrome.fileSystem.getDisplayPath(entry, function(path){
        $('#textContent').val(path);
      });
    });
  };
  
};
