var files = [ "cheetah", "monkey", "bear", "ohmyyy" ];
var sounds = [];

function loadSounds() {
    for (var i = 0; i < files.length; i++)
        loadSound(files[i] + ".wav");
}

function loadSound(file) {
    var sound = new Audio();
    sound.src = "https://s3.amazonaws.com/PewPew/v1.0/" + file;
    sound.load();

    sounds.push(sound);
}

chrome.tabs.onRemoved.addListener(function(tabId, removeObject) {
    var random = (Math.random() * 100 - 75) * 4;

    if (random >= 0)
        sounds[parseInt(random / 33)].play();
});

function tabCounter () {
  chrome.tabs.getAllInWindow(null, function (tabs) {
    if (tabs.length > 10) sounds[3].play();
  });
}

chrome.tabs.onCreated.addListener(function (tab) { tabCounter(); });

loadSounds();
