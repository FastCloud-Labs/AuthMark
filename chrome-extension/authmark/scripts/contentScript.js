'use strict';

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

let topShotMoments = [];
let allDayMoments = [];
let laLigaMoments = [];
let loggedInUser = '';
let playerID = '';
let allPlayers = [];
let allTeams = [];
let selectedPlayerName = 'JAMES Harden';
let selectedPlayerId = '';
let selectedTeam = '';
let enabled = false;
// let endpoint = 'http://localhost:3000'; // dev
let endpoint = 'https://daptab.web.app'; // prod
chrome.storage.sync.get(["enabled"]).then((result) => {
  console.log('check enabled', result.enabled)
  enabled = result.enabled;
  //todo mitigate issue when extensions loads before wesbite if defering scripts
  setTimeout(() => {
    init();
  }, 2000);
});


function init() {
  let dapperTabBottomIOpen = false;
  console.log('AuthMark:', enabled)
  if (enabled) {
    //todo move to serverless function for performance and to add additional analytics
    const pageText = document.body;
    let keyword = selectedPlayerName;
    let momentCount = 3;
    let trend = 'up';
    let team = 'Brooklyn Nets';
    let next = "TBC"
    if (pageText.textContent.indexOf(keyword)) {
      console.log('has keyword', keyword)
      document.body.innerHTML = document.body.innerHTML.replaceAll(keyword, '' + '<span class="dapper-tab-text">' + keyword + '</span> ' + '<details data-dtpopover="right" class="dapper-tab-po"> ' + '<summary class="dapper-tab-hl-open"><span class="dapper-tab-hl-open-text">DT</span></summary> ' + '<div class="dapper-tab-popup">' + '<p>Moments: ' + momentCount + '</p> ' + '<p>Trend: ' + trend + '<br>' + ' </p> ' + '<p>Team: ' + team + '<br>' + ' </p> ' + '<p>Next Game: ' + next + ' </p> ' + '<button class="dapper-tab-popup-btn">View</button> ' + '</div></details>');
      document.body.innerHTML += '<div class="dapper-tab-footer">' + '<div class="dapper-tab-footer-inner">' + '<p id="open-dapper-tab-bottom" class="d-inline-flex link-body-emphasis text-decoration-none m-1 p-1 mt-2" style="margin: -15px 0 0 0 ">' + '<img src="https://daptab.web.app/logo.png" alt="DapTab" width="75"/>' + '</p>' + '</div>' + '<div id="dapper-tab-content"></div>' + '</div>';

      const allViewBtns = document.getElementsByClassName('dapper-tab-popup-btn');
      const popUps = document.getElementsByClassName('dapper-tab-po');

      for (const viewBtn of allViewBtns) {
        viewBtn.addEventListener("click", async e => {
          openDTbottom()
        })
      }

      document.getElementById('open-dapper-tab-bottom').addEventListener("click", async e => {
        openDTbottom()
      })

      function openDTbottom() {
        console.log('show dapper tab')
        dapperTabBottomIOpen = !dapperTabBottomIOpen
        for (const popUp of popUps) {
          popUp.removeAttribute('open')
        }
        if (dapperTabBottomIOpen) {
          document.getElementById('dapper-tab-content').style.display = 'block'
          document.getElementById('dapper-tab-content').style.width = '600px'
          document.getElementById('dapper-tab-content').style.height = '500px'
          document.getElementById('dapper-tab-content').innerHTML = `<iframe src="${endpoint}/topshot?player=${keyword}" width="100%" height="460" border="0" style="border-radius: 4px"></iframe>`
          document.getElementById('dapper-tab-content').style.padding = '0px'
        } else {
          document.getElementById('dapper-tab-content').style.height = '0px'
          document.getElementById('dapper-tab-content').style.display = 'none'
          document.getElementById('dapper-tab-content').style.padding = '0px'
          document.getElementById('dapper-tab-content').innerHTML = ' '
        }
      }
    } else {
      console.log('no match:', keyword)
    }

  }
}

/*
// Communicate with background file by sending a message
  chrome.runtime.sendMessage({
    type: 'MESSAGE', payload: {
      message: 'Test message from DapperTab ContentScript.',
    },
  }, (response) => {
    console.log(response.message);
  });

// Listen for message
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'COUNT') {
      console.log(`Current count is ${request.payload.count}`);
    }

    // Send an empty response
    // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
    sendResponse({});
    return true;
  });
 */
