const wheelBlock = document.querySelector('.block-wheel');
const triesTextVal = document.getElementById('tries-value');

const wheel = wheelBlock.querySelector('.wheel');
const wheelBtn = wheel.querySelector('.wheel-btn');
const wheelCircle = wheel.querySelector('.wheel-inner');

let winState = false; //lose first

const popup = wheelBlock.querySelector('.wheel-popup');
const popupClose = popup.querySelector('.popup-close');
const popupOverlay = popup.querySelector('.popup-overlay');
const popupStageOne = popup.querySelector('.popup-stage-one');
const popupStageTwo = popup.querySelector('.popup-stage-two');
const popupSpinBtn = popup.querySelector('.popup-spin-btn');
const popupAppearanceTime = 3500;

const winHandlerFunc = () => {
    winState = true;
    wheelCircle.classList.remove('lose');
    wheelCircle.classList.add('win');

    setTimeout(() => {
        wheelBtn.classList.add('disabled');

        popupStageOne.classList.remove('popup-stage-active');
        popupStageTwo.classList.add('popup-stage-active');
        popup.classList.add('popup-active');
        triesTextVal.textContent = '0';
    }, popupAppearanceTime);

};

wheelBtn.addEventListener('click', () => {
    if (!winState) {
        winState = true;
        wheelCircle.classList.add('lose');

        setTimeout(() => {
            popup.classList.add('popup-active');
            triesTextVal.textContent = '1';
        }, popupAppearanceTime);

    }
    else {
        winHandlerFunc();
    }
});

popupSpinBtn.addEventListener('click', () => {
    popup.classList.remove('popup-active');
    winHandlerFunc();
});

popupClose.addEventListener('click', () => popup.classList.remove('popup-active'));
// popupOverlay.addEventListener('click', () => popup.classList.remove('popup-active'));

const policyBtnMobile = wheelBlock.querySelector('.bottom-policy-btn-mobile');
const policyPopupMobile = wheelBlock.querySelector('.policy-popup-mobile');
const policyPopupMobileClose = policyPopupMobile.querySelector('.popup-close');
const policyPopupMobileOverlay = policyPopupMobile.querySelector('.popup-overlay');

policyBtnMobile.addEventListener('click', () => policyPopupMobile.classList.add('popup-active'));
policyPopupMobileClose.addEventListener('click', () => policyPopupMobile.classList.remove('popup-active'));
policyPopupMobileOverlay.addEventListener('click', () => policyPopupMobile.classList.remove('popup-active'));

// clickable
const localClickTag = "https://1xbet.com/";

function makeClickable(selector) {
    let clickURL = localClickTag;

    if (window.clickTag && typeof window.clickTag === "string" && window.clickTag.length > 5) {
        clickURL = window.clickTag;
    } else {

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.clickTag) {
            clickURL = params.clickTag;
        } else {

            if (window.location.search.startsWith("?url=")) {
                let cTag = window.location.search.replace("?url=", "");
                if (cTag) {
                    clickURL = cTag;
                }
            }
        }
    }

    let globalClickArea = document.querySelector("#global-click-area");

    if (!globalClickArea) {

    globalClickArea = document.createElement("a");
    globalClickArea.id = "global-click-area";
    globalClickArea.setAttribute("target", "_blank");
    globalClickArea.setAttribute("href", clickURL);
    globalClickArea.style.cssText = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;";
    document.querySelector("#animation_container").prepend(globalClickArea);

    } else {
        // Already added
        if (globalClickArea.getAttribute("href").toLocaleLowerCase() != clickURL.toLowerCase()) {
            // clickURL changed? Something strange...
            // NO WAY!
            return;
        }
    }

    document.querySelectorAll(selector).forEach((element) => {
        if (element.tagName.toLowerCase() === "a") {
            element.setAttribute("draggable", false);
            element.setAttribute("target", "_blank");
            element.setAttribute("href", clickURL);
            console.log(element);
        } else {
            element.onclick = (e) => {
            e.stopPropagation();
            globalClickArea.click();
            };
        }
    });
}
makeClickable('.block-wheel a');
