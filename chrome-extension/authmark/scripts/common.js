class CommonUI{
    constructor(){

        this.initListeners();
    }

    initListeners(){
        console.log("authmark loaded")
    }

    save_options() {
        config.getStorage().then(featureState => {
            features.forEach((feature) => {
                if (feature == "backgroundColor") {
                    featureState[feature] = document.getElementById("backgroundColorPicker").value;
                } else if (feature == "borderColor") {
                    featureState[feature] = document.getElementById("borderColor").value;
                } else if (feature == "keyCode") {
                    delete featureState.keyCode;
                } else {
                    featureState[feature] = document.getElementById(feature).checked;
                }
            });
            chrome.storage.local.set(featureState);
        });
    }

    restore_options() {
        config.getStorage().then(items => {
            
            features.forEach((feature) => {
            if (feature === "keyCode") {
                this.currentHotkey = new Hotkey(Hotkey.keysFromEvent(items[feature]));
                this.hotkeyContainer.innerText = this.currentHotkey.display();
            } else if (feature === "backgroundColor") {
                document.getElementById("backgroundColorPicker").value = items[feature];
            } else if (feature === "borderColor") {
                document.getElementById("borderColor").value = items[feature];
            } else {
                document.getElementById(feature).checked = items[feature];
            }
            });
        });
    }

    attachCheckboxHandlers() {
        const featureList = document.getElementById("featureList");

        Object.values(featureList.getElementsByTagName("input")).forEach((element) => {
            if (element.type === "checkbox") {
                if(features.includes(element.id)){
                    element.onchange = this.save_options;
                }
                else{
                    element.closest(".container").style.display = "none";
                }
            }
            }
        );
    }
    

}

var homepage = function () {
    return chrome.runtime.getManifest().homepage_url
};
