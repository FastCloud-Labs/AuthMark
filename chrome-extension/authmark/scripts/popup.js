class Popup{
  constructor(){
    this.btnSettings = document.querySelector("#reactions-settings");
    this.btnSettingsBack = document.querySelector("#reactions-settings-back");
    this.uiCommon = new CommonUI();
    this.mainCard = document.querySelector("#main-card");
    this.settingsCard = document.querySelector("#settings-card");
    this.pluginEnabled = document.querySelector('#sidebarIsOn');

    this.init();

  }
  init(){
    chrome.runtime.sendMessage({ popupOpen: true });
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("home").href=homepage();
      document.getElementById("home-page").href=homepage();
      document.getElementById("drive").href = `${homepage()}uploader`;
      document.getElementById('rate').href = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`;
      
      document.getElementById("new-meet").title=chrome.i18n.getMessage("StartMeet");
      this.uiCommon.restore_options();
      this.uiCommon.attachCheckboxHandlers();
      
    });
    this.btnSettings.addEventListener("click", (e)=>{
      e.preventDefault();
      this.mainCard.classList.add("d-none");
      this.settingsCard.classList.remove("d-none");
      this.btnSettings.classList.add("d-none");
      this.btnSettingsBack.classList.remove("d-none");
    });
    this.btnSettingsBack.addEventListener("click", (e)=>{
      e.preventDefault();
      this.settingsCard.classList.add("d-none");
      this.mainCard.classList.remove("d-none");
      this.btnSettings.classList.remove("d-none");
      this.btnSettingsBack.classList.add("d-none");
    });
    let that = this;
    this.pluginEnabled.addEventListener("change", function(){
        
        let h3= this.nextSibling.nextSibling.nextSibling.nextSibling;
        if(this.checked){
            h3.innerText = chrome.i18n.getMessage("InMeetingPlugin");
            chrome.storage.local.set({"sidebarIsOn":true});
            that.isPluginEnabled = true;
        }
        else{
            h3.innerText = chrome.i18n.getMessage("InMeetingPluginDisabled");
            chrome.storage.local.set({"sidebarIsOn":false});
            that.isPluginEnabled = false;
        }
    });  
    
    config.get(["sidebarIsOn"]).then((val)=>{
      this.restorePopup(val)   
    });    

  }
  restorePopup (settings) {
    this.isPluginEnabled = settings["sidebarIsOn"] !== undefined? settings["sidebarIsOn"] : true;
    this.pluginEnabled.checked = this.isPluginEnabled;
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    this.pluginEnabled.dispatchEvent(evt);    
  }    
}

var popup = new Popup();