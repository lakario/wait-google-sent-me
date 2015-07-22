var active = false;

function changeRefer(details) {
  if (!active) return;
  
  for (var i = 0; i < details.requestHeaders.length; ++i) {
    if (details.requestHeaders[i].name === 'Referer') {
      details.requestHeaders[i].value = 'http://www.google.com/';
      break;
    }
  }

  active = false;
  return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(changeRefer, {
  urls: ["<all_urls>"],
  types: ["main_frame"],
}, ["requestHeaders", "blocking"]);

chrome.browserAction.onClicked.addListener(function(tab) {
  active = true;
  chrome.tabs.executeScript({
    code: 'window.stop(); window.location.reload();'
  });
});