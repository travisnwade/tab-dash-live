// Initial Display Setup
document.getElementById('time').textContent = "...";
document.getElementById('date').textContent = "...";

// Time and Date Functions
function updateTimeAndDate() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    document.getElementById('time').textContent = `Time: ${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `Date: ${year}:${month}:${day}`;
}

// Toggle visibility of .container element on pressing "H"
document.addEventListener('keydown', (event) => {
    if (event.key === 'H' || event.key === 'h') {
        const container = document.querySelector('.container');
        if (container) {
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        }
    }
});

// IP Address Fetching and Clipboard Copy
async function fetchIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddressElement = document.getElementById('ip-address');
        ipAddressElement.textContent = `Your Public IP: ${data.ip}`;

        document.getElementById('copy-ip').addEventListener('click', () => {
            navigator.clipboard.writeText(data.ip).catch(err => {
                console.error('Failed to copy IP address: ', err);
            });
        });
    } catch (error) {
        document.getElementById('ip-address').textContent = 'Your Public IP: Error fetching IP';
    }
}

// Modal
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuModal = document.createElement('div');
    const menuContainer = document.createElement('div');

    // Set up modal structure
    menuModal.id = 'menu-modal';
    menuModal.style.display = 'none'; // Ensure the modal is hidden on page load

    // Add the instruction text
    const closeInstruction = document.createElement('p');
    closeInstruction.id = 'close-instruction';
    closeInstruction.textContent = 'Click outside the menu to close. Press "H" to hide the UI.';
    menuModal.appendChild(closeInstruction);

    menuContainer.id = 'menu-container';
    menuModal.appendChild(menuContainer);
    document.body.appendChild(menuModal);

    // Add menu items with links
    const menuItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about/' }
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');

        const menuLink = document.createElement('a');
        menuLink.href = item.link;
        menuLink.textContent = item.name;
        menuLink.style.color = 'inherit'; // Ensure the link color matches the menu style
        menuLink.style.textDecoration = 'none'; // Remove underline from link

        menuItem.appendChild(menuLink);
        menuContainer.appendChild(menuItem);
    });

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        if (menuModal.style.display === 'none' || menuModal.style.display === '') {
            menuModal.style.display = 'flex'; // Show the modal using flexbox
        } else {
            menuModal.style.display = 'none'; // Hide the modal
        }
    });

    // Close menu if clicking outside the menu container
    menuModal.addEventListener('click', (event) => {
        if (!menuContainer.contains(event.target)) {
            menuModal.style.display = 'none';
        }
    });
});


// Browser Information
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const browserNameElement = document.getElementById('browser');
    const userAgentElement = document.getElementById('user-agent');
    const browserDimensionsElement = document.getElementById('browser-dimensions');
    const browserPluginsElement = document.getElementById('browser-plugins');

    let browserName = "Unknown Browser";
    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Apple Safari";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Microsoft Edge";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        browserName = "Microsoft Internet Explorer";
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const plugins = navigator.plugins;
    const pluginList = Array.from(plugins).map(plugin => plugin.name);

    browserNameElement.textContent = `Browser: ${browserName}`;
    userAgentElement.textContent = `User Agent: ${userAgent}`;
    browserDimensionsElement.textContent = `Browser Dimensions: ${width} x ${height}`;
    browserPluginsElement.textContent = `Browser Plugins: ${pluginList.join(", ") || "None"}`;

    addClipboardEvent('copy-browser', '.browser-info div');
}

// OS Information
function getOSInfo() {
    const platform = navigator.platform;
    const osNameElement = document.getElementById('os');
    const osVersionElement = document.getElementById('os-version');
    const osArchitectureElement = document.getElementById('os-architecture');
    const osLanguageElement = document.getElementById('os-language');
    const osOnlineStatusElement = document.getElementById('os-online-status');

    let osName = "Unknown OS";
    if (platform.indexOf("Win") > -1) {
        osName = "Windows";
    } else if (platform.indexOf("Mac") > -1) {
        osName = "macOS";
    } else if (platform.indexOf("Linux") > -1) {
        osName = "Linux";
    } else if (platform.indexOf("Android") > -1) {
        osName = "Android";
    } else if (platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1) {
        osName = "iOS";
    }

    const osArchitecture = navigator.userAgent.indexOf("WOW64") !== -1 || navigator.userAgent.indexOf("Win64") !== -1 || platform.indexOf("x86_64") !== -1 ? "64-bit" : "32-bit";
    const osLanguage = navigator.language || navigator.userLanguage;
    const osOnlineStatus = navigator.onLine ? "Online" : "Offline";

    osNameElement.textContent = `OS: ${osName}`;
    osVersionElement.textContent = `Platform: ${platform}`;
    osArchitectureElement.textContent = `Architecture: ${osArchitecture}`;
    osLanguageElement.textContent = `Language: ${osLanguage}`;
    osOnlineStatusElement.textContent = `Online Status: ${osOnlineStatus}`;

    addClipboardEvent('copy-os', '.os-info div');
}

// Network Information
function getNetworkInfo() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('net-range').textContent = `IP Address: ${data.ip}`;
            document.getElementById('network').textContent = `Network: ${data.network}`;
            document.getElementById('version').textContent = `Version: ${data.version}`;
            document.getElementById('city').textContent = `City: ${data.city}`;
            document.getElementById('region-code').textContent = `Region Code: ${data.region_code}`;
            document.getElementById('country-code').textContent = `Country Code: ${data.country_code}`;
            document.getElementById('latitude').textContent = `Latitude: ${data.latitude}`;
            document.getElementById('longitude').textContent = `Longitude: ${data.longitude}`;
            document.getElementById('timezone').textContent = `Timezone: ${data.timezone}`;
            document.getElementById('utc-offset').textContent = `UTC Offset: ${data.utc_offset}`;

            addClipboardEvent('copy-network', '.network-info div');
        })
        .catch(error => {
            console.error('Error fetching network information:', error);
        });
}

// Clipboard Copy Function
function addClipboardEvent(buttonId, selector) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', () => {
            const infoText = Array.from(document.querySelectorAll(selector))
                .map(div => div.textContent)
                .join('\n');
            navigator.clipboard.writeText(infoText).catch(err => {
                console.error('Failed to copy information: ', err);
            });
        });
    }
}

// Background Video Change
function changeBackgroundVideo(videoFile) {
    const videoElement = document.getElementById('background-video');
    videoElement.innerHTML = `<source src="videos/${videoFile}" type="video/mp4">`;
    videoElement.load(); // Load the new video
    videoElement.play(); // Start playing the video
}

// Video Button Event Listeners
document.querySelectorAll('.video-button').forEach(button => {
    button.addEventListener('click', () => {
        const videoFile = button.getAttribute('data-video');
        changeBackgroundVideo(videoFile);
    });
});

// Audio Playback Handling
const audioElements = {};

document.querySelectorAll('.audio-button').forEach(button => {
    button.addEventListener('click', () => {
        const audioFile = button.getAttribute('data-audio');
        if (!audioElements[audioFile]) {
            audioElements[audioFile] = new Audio(`sounds/${audioFile}`);
            audioElements[audioFile].loop = true;
        }

        if (button.textContent === "../cont/stop.sh") {
            audioElements[audioFile].pause();
            audioElements[audioFile].currentTime = 0;
            button.textContent = button.getAttribute('data-original-text');
        } else {
            stopAllAudio();
            audioElements[audioFile].play();
            button.setAttribute('data-original-text', button.textContent);
            button.textContent = "../cont/stop.sh";
        }
    });
});

function stopAllAudio() {
    Object.values(audioElements).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    document.querySelectorAll('.audio-button').forEach(button => {
        if (button.textContent === "Stop") {
            button.textContent = button.getAttribute('data-original-text');
        }
    });
}

// Typing Effect for Quotes
function typeQuote(text, elementId, delay = 25) {
    const element = document.getElementById(elementId);
    element.textContent = ''; // Clear the element content initially
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(typeCharacter, delay);
        }
    }

    setTimeout(() => {
        typeCharacter();
    }, 1500); // Initial delay before starting to type
}

// Fetch and Display a Random Quote
function fetchQuote() {
    const quotes = [
        `"A system is only as secure as its weakest link." - Unknown`,
        `"There are two ways of constructing software: One way is to make it so simple that there are obviously no deficiencies. The other way is to make it so complicated that there are no obvious deficiencies." — C.A.R. Hoare`,
        `"First, solve the problem. Then, write the code." — John Johnson`,
        `"Debugging is like being the detective in a crime drama where you are also the murderer." — Filipe Fortes`,
        `"99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code." — Unknown`,
        `"It's not a bug; it's an undocumented feature." - Unknown`,
        `"Talk is cheap. Show me the code." - Linus Torvalds`,
        `"Documentation is like sex. When it's good, it's very good. When it's bad, it's better than nothing." — Dick Brandon`,
        `"There is no place like 127.0.0.1." - Unknown`,
        `"In theory, there is no difference between theory and practice. But in practice, there is." - Yogi Berra`,
        `"Software and cathedrals are much the same — first we build them, then we pray." — Unknown`,
        `"One man's crappy software is another man's full-time job." — Jessica Gaston`
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    typeQuote(quotes[randomIndex], 'quote');
}

// Initialization Calls
setInterval(updateTimeAndDate, 1000); // Update time and date every second
fetchIPAddress(); // Fetch IP address on load
fetchQuote(); // Fetch and display a random quote on load
getBrowserInfo(); // Display browser information
getOSInfo(); // Display OS information
getNetworkInfo(); // Display network information