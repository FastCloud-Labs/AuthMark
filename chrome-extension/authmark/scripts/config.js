'use strict';
var homepage = function () {
  return chrome.runtime.getManifest().homepage_url
};
var config = {
    "sidebarIsOn":true,
    "virtualBg":true
};

const features = [
  "virtualBg"
];

config.get = arr => new Promise(resolve => {
  const ps = arr.reduce((p, c) => {
    p[c] = config[c];
    return p;
  }, {});
  chrome.storage.local.get(ps, resolve);
});


config.getStorage = () => new Promise(resolve =>{
    config.get(features).then(resolve);
})
