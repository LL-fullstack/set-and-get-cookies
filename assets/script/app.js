'use strict';

// Function to accept all cookies
function acceptAllCookies() {
    setAllCookies(true, 20); // Create all cookies with a lifespan of 20 seconds
    closeDialog('cookieModal');
}

// Function to accept selected cookies
function acceptSelectedCookies() {
    const browserCookieChecked = document.getElementById('browserCheckbox').checked;
    const osCookieChecked = document.getElementById('osCheckbox').checked;
    const screenWidthCookieChecked = document.getElementById('screenWidthCheckbox').checked;
    const screenHeightCookieChecked = document.getElementById('screenHeightCheckbox').checked;
    saveCookieSettings(browserCookieChecked, osCookieChecked, screenWidthCookieChecked, screenHeightCookieChecked);
    closeDialog('settingsModal');
}

// Function to show cookie settings
function showCookieSettings() {
    closeDialog('cookieModal');
    document.getElementById('settingsModal').style.display = 'block';
}

// Function to save cookie settings
function saveCookieSettings(browserAllowed, osAllowed, widthAllowed, heightAllowed) {
    setCookie('cookiesAccepted', true, 20);
    if(browserAllowed === true) {
        const browser = getBrowserName();
        setCookie('browser', browser, 20);
    }

    if(osAllowed === true) {
        const os = getOSName();
        setCookie('os', os, 20);
    }
    
    if(widthAllowed === true) {
        const screenWidth = screen.width;
        setCookie('screenWidth', screenWidth, 20);
    }

    if(heightAllowed === true) {
        const screenHeight = screen.height;
        setCookie('screenHeight', screenHeight, 20);
    }

    printCookiesWithDelay();
}

// Function to set all cookies
function setAllCookies(value, seconds) {
    setCookie('cookiesAccepted', value, seconds);
    const browser = getBrowserName();
    console.log(browser);
    const os = getOSName();
    console.log(os);
    const screenWidth = screen.width;
    console.log(screenWidth);
    const screenHeight = screen.height;
    console.log(screenHeight);
    setCookie('browser', browser, seconds);
    setCookie('os', os, seconds);
    setCookie('screenWidth', screenWidth, seconds);
    setCookie('screenHeight', screenHeight, seconds);
   
    printCookiesWithDelay();
    console.log("Saved All Cookies");
}

// Function to get browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    else if (userAgent.includes('Firefox')) return 'Firefox';
    else if (userAgent.includes('Safari')) return 'Safari';
    else if (userAgent.includes('Edge')) return 'Edge';
    else if (userAgent.includes('IE')) return 'Internet Explorer';
    else return 'Unknown';
    
}

// Function to get OS name
function getOSName() {
    const platform = navigator.userAgent;
    if (platform.includes('Win')) return 'Windows';
    else if (platform.includes('Mac')) return 'Mac OS';
    else if (platform.includes('Linux')) return 'Linux';
    else return 'Unknown';
}

// Function to set a cookie
function setCookie(name, value, seconds) {
    let expires = '';
    if (seconds) {
        const expiryDate = new Date(Date.now() + seconds * 1000);
        expires = `; expires=${expiryDate.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}

// Function to get a cookie
function getCookie(name) {
    console.log(document.cookie);
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Function to close a dialog by ID
function closeDialog(id) {
    document.getElementById(id).style.display = 'none';
}

const cookieStored = getCookie('cookiesAccepted');
console.log(cookieStored);
setTimeout(function() {
    if (cookieStored != 'true') {
        document.getElementById('cookieModal').style.display = 'block';
    }
}, 1000);

document.getElementById('acceptAllCookies').addEventListener('click', function() {
    acceptAllCookies();
})

document.getElementById('settingsButton').addEventListener('click', function() {
    showCookieSettings();
})

document.getElementById('savePreferences').addEventListener('click', function() {
    acceptSelectedCookies();
})

function printCookiesWithDelay() {
    setTimeout(function() {
        console.log(document.cookie);
    }, 2000);
}
