// Declare global variables
var checkCallOnInterval = null
var checkCallOffInterval = null
var reactionsInterval = null
var meetingId = null
var isRunning = false
var preferences = null
var isPaused = false
const extensionImg = chrome.runtime.getURL("/images/");
const extensionCss = chrome.runtime.getURL("/styles/");
var uiCommon = null;
var marked = 0;


config.get(['sidebarIsOn']).then(result => {
    // Load saved settings
    preferences = result // Load settings as global variable
    if (preferences["sidebarIsOn"] !== false) {
        startPlugin()
    }
});

// listen changes in popup
chrome.storage.onChanged.addListener((changes) => storageChange(changes));

function storageChange(changes) {
    for (let pref in changes) {
        const storageChange = changes[pref];
        if (pref === "sidebarIsOn") {
            if (storageChange.newValue && !isRunning) {
                startPlugin()
            } else if (!storageChange.newValue && isRunning) {
                let reactions = document.getElementById("reactions-plugin");
                if (reactions)
                    reactions.remove();
                let style = document.getElementById("reactions-style");
                if (style)
                    style.remove()

                clearInterval(reactionsInterval)
                reactionsInterval = null
                clearInterval(checkCallOffInterval)
                checkCallOffInterval = null
                clearInterval(checkCallOnInterval)
                checkCallOnInterval = null
                isRunning = false
            }
        } else if (pref === "virtualBg") {
            let el = document.getElementById(pref);
            if (el) {
                el.checked = storageChange.newValue;
            }

        }

    }
}

// -- Main functions -- //
const startPlugin = () => {
    isRunning = true
    console.log("AuthMark Extension started")
    checkCallOnInterval = setInterval(checkCallOn, 250) // Start a loop until a call is entered


}

const main = async () => {
    document.body.insertAdjacentHTML('beforeend', style); // Inject css
    document.body.insertAdjacentHTML('beforeend', reactionsHtml); // Inject html 
    // localization
    [...document.querySelectorAll('[data-i18n]')].forEach(e => {
        e.textContent = chrome.i18n.getMessage(e.dataset.i18n);
    });
    // common ui logic
    uiCommon = new CommonUI();
    uiCommon.restore_options();
    uiCommon.attachCheckboxHandlers();
    // ----- LISTENERS ----- //
    document.getElementById('google-reactions').addEventListener('mouseover', () => {
        reactionsInterval === null && displaySettings(true) // If reactions is not set open settings 
    })
    document.getElementById('google-reactions').addEventListener('mouseleave', () => {
        displaySettings(false)
    })

}


toast = msg => {
    let toastSpan = document.getElementById("reactions-toast");
    toastSpan.innerHTML = msg;
    setTimeout(() => {
        toastSpan.innerHTML = "";
    }, 2000);
}

// -- Interval functions -- //
const checkCallOn = () => {
    let menu = document.getElementsByClassName('Jrb8ue')
    let vids = document.getElementsByTagName("video")
    let authTagged = document.getElementById('auth-mark-tag')
    window.addEventListener('load', function () {
        vids = document.getElementsByTagName("video")
    })
    vids = document.getElementsByTagName("video")
    authTagged = document.getElementsByClassName('auth-mark-tag')


    if (vids.length > 0 && vids.length != authTagged.length) {
        let elem = document.createElement("img");
        elem.setAttribute("src", "https://authmark.org/gen-qr.png");
        elem.setAttribute("height", "80");
        elem.setAttribute("class", "auth-mark-tag");
        elem.style.position = "absolute";
        elem.style.zIndex = "99999";
        elem.style.bottom = "0";
        elem.style.right = "0";
        document.getElementsByTagName("video")[0].insertAdjacentElement('afterend', elem);
        marked = marked + 1
        let elem = document.createElement("img");
        elem.setAttribute("src", "https://authmark.org/status-1.png");
        elem.setAttribute("height", "80");
        elem.setAttribute("class", "auth-mark-tag");
        elem.style.position = "absolute";
        elem.style.zIndex = "99999";
        elem.style.bottom = "0";
        document.getElementsByTagName("video")[0].insertAdjacentElement('afterend', elem);
        marked = marked + 1
    }
    console.log("auth Tags", authTagged.length)
    if (menu.length > 0) { // If the menu exists we are in a call
        alert("menu loaded!")
        clearInterval(checkCallOnInterval) // Stop the loop
        checkCallOffInterval = setInterval(checkCallOff, 1000)
        let meetingIdNode = document.getElementsByClassName('SSPGKf p2ZbV')
        if (meetingIdNode.length) {
            meetingId = meetingIdNode[0].getAttribute('data-unresolved-meeting-id')

            if (meetingId) {
                main()

            } else {
                console.log('[google-reactions] Error: Unable to get meeting id')

            }
        } else {
            console.log('[google-reactions] Error: Unable to get meeting id')

        }
    }
}

const checkCallOff = () => {
    let menu = document.getElementsByClassName('Jrb8ue')
    if (!menu.length) {
        console.log('[google-reactions] Call off')
        clearInterval(checkCallOffInterval)
        checkCallOffInterval = null
        clearInterval(reactionsInterval)
        reactionsInterval = null
        displayReactions(false)
    }
}

// -- Switches -- //
const displayReactions = (bool) => {
    if (bool) {
        document.getElementById('reactions-plugin').style.display = 'flex'
    } else {
        document.getElementById('reactions-plugin').style.display = 'none'
    }
}

const displaySettings = (bool) => {
    if (bool) {
        document.querySelector('.reactions-body').classList.add('settings-open');


    } else {

        let btnClose = document.querySelectorAll("[aria-label='Close']")[0];
        if (btnClose) {
            btnClose.click();
        }
        //document.getElementById("reactions-back-wrapper").style.display = 'none';
        //document.getElementById('reactions-settings-container').style.display = 'none'
        document.getElementById('google-reactions').classList.remove('settings-open')

    }
}

// MIT Licensed - author: jwilson8767
function elementReady(selector) {
    return new Promise((resolve, reject) => {
        let el = document.querySelector(selector);
        if (el) {
            resolve(el);
        }
        new MutationObserver((mutationRecords, observer) => {
            // Query for elements matching the specified selector
            Array.from(document.querySelectorAll(selector)).forEach((element) => {
                resolve(element);
                //Once we have resolved we don't need the observer anymore.
                observer.disconnect();
            });
        }).observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    });
}


// -- HTML and CSS elements -- //
const reactionsHtml = `
<div class="reactions-app-container" id="reactions-plugin">
    <div class="reactions-body" id="google-reactions">
        
            <div class="reactions-container" id="reactions-container">
                <a id="reactions-home" href="${homepage()}" class="reactions-button reactions-simple" target="blank" title="${chrome.i18n.getMessage("Homepage")}">
                    <img src="${extensionImg}icon48.png" height="27" title="${chrome.i18n.getMessage("AppName")}">
                </a>
                <div class="qO3Z3c divider" id="reactions-main-divider"></div>
                <a id="reactions-help" class="reactions-button" href="${homepage()}uploader" target="_blank" title="${chrome.i18n.getMessage("Drive")}">
                    <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" enable-background="new 0 0 515.91 728.5" height="24" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="24" xml:space="preserve" sodipodi:docname="google-drive-icon.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)"><metadata id="metadata11"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1099" inkscape:window-height="480" id="namedview9" showgrid="false" inkscape:pagecheckerboard="true" inkscape:zoom="10.429825" inkscape:cx="17.61861" inkscape:cy="13.156876" inkscape:window-x="1807" inkscape:window-y="419" inkscape:window-maximized="0" inkscape:current-layer="Layer_1" /><defs id="defs7" /><g id="g3-1" style="fill:#ffffff;fill-opacity:1" transform="matrix(0.36066362,0,0,0.36066362,1.8271219,1.1491946)"><polygon id="polygon5-7" points="13.221,52.267 14.043,52.267 45.574,52.267 45.852,52.267 45.988,52.026 52.748,40.206 53.158,39.493 52.334,39.493 20.803,39.493 20.525,39.493 20.389,39.733 13.629,51.554" style="fill:#ffffff;fill-opacity:1" /><polygon id="polygon7" points="53.16,36.683 52.748,35.972 36.982,8.665 36.846,8.426 36.568,8.427 22.951,8.482 22.129,8.486 22.541,9.198 38.307,36.507 38.445,36.745 38.723,36.745 52.336,36.687 " style="fill:#ffffff;fill-opacity:1" /><polygon id="polygon9-4" points="19.157,10.622 3.391,37.929 3.252,38.167 3.392,38.407 10.25,50.171 10.663,50.882 11.074,50.169 26.84,22.861 26.979,22.623 26.84,22.382 19.982,10.62 19.568,9.91 " style="fill:#ffffff;fill-opacity:1" /></g></svg>
                </a>
                <a id="reactions-rate" class="reactions-button" href="https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews" target="_blank" title="${chrome.i18n.getMessage("RateUs")}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 27" fill="#fff" width="22px" height="22px"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
                </a>
                
            </div>
            
            <div class="reactions-container-settings" id="reactions-settings-container">
                <div id="reaction-box" class="text-center">
                    <div class="card-body">
                        <div id="in-meeting">
                            <div class="spacer50"></div>
                            <div id="featureList">
                                <div id="basicFeatures">
                        
                                    <!-- Virtual Background -->
                                    <div class="container">
                                      <div class="item">
                                        <img src="${extensionImg}virtualBgIcon.svg" />
                                      </div>
                                      <div class="item">
                                        <label data-i18n="ftr_31">Virtual Backgrounds</label>
                                        <small data-i18n="ftr_31_1">Adds set of predefined backgrounds to the set background window</small>
                                      </div>
                                      <div class="item">
                                        <input type="checkbox" id="virtualBg" />
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <span class="mt-3" id="reactions-toast"></span>
                        </div>
                    </div>
                </div>
            </div>
        
    </div>
</div>
<div id="reactions-back-wrapper" class="reactions-back-wrapper" style="display:none;"></div>
`
const style = `
<style id="reactions-style">
    @import "${extensionCss}webfonts.css";
    @import "${extensionCss}reset.css";
    @import "${extensionCss}popup.css";

    .reactions-divider {
        margin-right: 10px;
        margin-left: 10px;
        height: 20px;
    }
    .divider {
        margin-right: 10px;
        margin-left: 10px;
        height: 20px;
        display:inline-block;
    }
    .reactions-body {
        font-family: "Monda", sans-serif;
        display: flex;
        background-color: white; 
        width: fit-content;
        border-radius: 0 0 8px 0;
        padding: 0 10px;
        
        top: 0;
        /*left: 0;*/
        position: absolute;
        z-index: 99999;
        height: 48px;
        width: 140px;
        transition: height .5s ease-in-out, width .5s ease-in-out;
        overflow: hidden;
        flex-direction: column;
        box-sizing: content-box;
    }
    .reactions-back-wrapper{
        position:absolute;
        z-index:9998;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        background:#000000;
    }

    .reactions-body.settings-open {
        width: 410px;
        height:140px;        
        overflow: auto;
    }
    .reactions-body .container{
        width:384px;
        border-top:#999 1px solid;
        border-bottom:#999 1px solid;
        margin-bottom:0;
    }

    .text {
        color: white;
    }
    .reactions-title {
        font-size: 15px;
        margin: 0;
        opacity: 80%;
    }
    .reactions-app-container {
        display: flex;
    }
    .reactions-container {
        display: inline-block;
        align-items: center;
        height: 48px;
        position:fixed;
        top:0;
        left:0;
        width:140px;
        background-color:#fff;
        transition: width .5s ease-in-out;
        z-index:1;
        padding-left: 10px;
    }
    .reactions-body.settings-open .reactions-container{
        width:404px;
    }

    .reactions-container-settings {
        display: flex;
        align-items: center;
    }
    .reactions-input {
        color: #5f6368;
        font-weight: 600;
        text-align: center;
        width: 38px;
        border: none;
        height: 40px;
        border-radius: 5px;
        font-size: 30px;
        padding: 0;
        background-color: transparent;
        font-feature-settings: "tnum";
        font-variant-numeric: tabular-nums;
        margin-right: 5px;
    }
    .reactions-label {
        font-weight: 300;
        font-size: 20px;
        margin: 0;
    }
    .reactions-input::placeholder {
        color: #5f6368;
        opacity: .5;
    }
    .reactions-input:focus::placeholder { 
        color: transparent;
    }
    .form-switch {
        display: inline-block;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        margin-bottom: 10px;
        display: flex;
        margin-bottom: 0;
        align-items: center;
    }

    .form-switch i {
        position: relative;
        display: inline-block;
        margin-right: .5rem;
        width: 46px;
        height: 26px;
        background-color: #e6e6e6;
        border-radius: 23px;
        vertical-align: text-bottom;
        transition: all 0.3s linear;
    }

    .form-switch i::before {
        content: "";
        position: absolute;
        left: 0;
        width: 42px;
        height: 22px;
        background-color: #fff;
        border-radius: 11px;
        transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
        transition: all 0.25s linear;
    }

    .form-switch i::after {
        content: "";
        position: absolute;
        left: 0;
        width: 22px;
        height: 22px;
        background-color: #fff;
        border-radius: 11px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
        transform: translate3d(2px, 2px, 0);
        transition: all 0.2s ease-in-out;
    }

    .form-switch:active i::after {
        width: 28px;
        transform: translate3d(2px, 2px, 0);
    }

    .form-switch:active input:checked + i::after { transform: translate3d(16px, 2px, 0); }

    .form-switch input { display: none; }

    .form-switch input:checked + i { background: rgb(204,43,94);
    background: linear-gradient(90deg, rgba(204,43,94,1) 35%, rgba(117,58,136,1) 100%); }

    .form-switch input:checked + i::before { transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }

    .form-switch input:checked + i::after { transform: translate3d(22px, 2px, 0); }

    .reaction img {
        width: 50px;
        background-color: rgba(0,188,212, 0.7);
        transition: transform .2s;
        margin-bottom: 5px;
        border-radius: 10%;
    }
    
    .reaction img:hover {
        transform: scale(1.2);
    }

    hr {
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .spacer5, .spacer10, .spacer15, .spacer50 {
      width: 100%;
      font-size: 0;
      margin: 0;
      padding: 0;
      border: 0;
      display: block;
    }
    
    .spacer5 {
      height: 5px;
    }
    
    .spacer10 {
      height: 10px;
    }
    
    .spacer15 {
      height: 15px;
    }

    .spacer50 {
        height: 50px;
      }
      
    .reactions-button{
        border-radius: 50%;
        font-size: 22px;
        height: 27px;
        /* margin: auto; */
        /* min-width: 27px; */
        width: 27px;
        /* padding-left: 2px; */
        overflow: hidden;
        background: rgba(158,158,158,.2);
        box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
        position: relative;
        line-height: normal;
        background-color: rgb(255,110,64);
        top: -5px;
        margin-right: 10px;
        display: inline-block;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .reactions-button.reactions-warn{
        background-color:#d93025;
    }
    .reactions-button.reactions-simple{
        margin-right:0;
        background-color:transparent;
        border-radius:0;
        box-shadow: unset;
    }
    #reactions-close{
        float:right;
    }

    mt-3, .my-3 {
        margin-top: 1rem!important;
    }
    .btn {
        display: inline-block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }    
    a.btn i{
        padding:0;
        border:none;
        line-height: 28px;
        margin: 0;     
        color:#fff;   
    }
    a.btn:hover{
        text-decoration:none;
    }
    a.btn span{
        margin-top:-5px;
    }
    .btn-primary {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn3d {
        position: relative;
        top: -6px;
        border: 0;
        transition: all 40ms linear;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 2px;
        margin-right: 2px;
    }
    
    .btn3d:active:focus,
    .btn3d:focus:hover,
    .btn3d:focus {
        outline: medium none;
    }
    
    .btn3d:active,
    .btn3d.active {
        top: 2px;
    }
    
    .btn3d.btn-primary {
        background-color: #ff6e40;
    }
    
    .btn3d.btn-primary:active,
    .btn3d.btn-primary.active {
        box-shadow: 0 0 0 1px #417fbd inset, 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 1px 3px 1px rgba(0, 0, 0, 0.3);
        background-color: #4274D7;
    }
    .hotkeyButton {
        padding: 2px 0;
    }
    #featureList{
        background:var(--color-bg);
    }
    .reactions-body .container{
        padding:10px;
    }

</style>`
