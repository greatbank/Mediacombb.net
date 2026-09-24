// Variable to trace the hide/show visibility state of account numbers
let isNumHidden = true;
let alertTimeoutId = null;

// DOM Elements Selection Matrix
const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const displayUsername = document.getElementById('displayUsername');
const pillUserName = document.getElementById('pillUserName');
const displayFullName = document.getElementById('displayFullName');
const tableRowName = document.getElementById('tableRowName');

const topLogoutBtn = document.getElementById('topLogoutBtn');
const sideLogoutBtn = document.getElementById('sideLogoutBtn');
const toggleNumBtn = document.getElementById('toggleNumBtn');
const accountNumText = document.getElementById('accountNumText');
const demoAlertBanner = document.getElementById('demoAlertBanner');

// ==========================================================================
// FORM SUBMISSION & ROUTING CONTROLS
// ==========================================================================

// Intercept login requests and swap display modules
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Hold execution for presentation flow
    
    // The display fields are now completely hardlocked to "Demo User"
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'flex';
});

// Logout triggers to revert backend state settings
function processLogout() {
    usernameInput.value = '';
    passwordInput.value = '';
    dashboardScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
    
    // Reset warning banner states if open
    demoAlertBanner.style.display = 'none';
    if(alertTimeoutId) clearTimeout(alertTimeoutId);
}

topLogoutBtn.addEventListener('click', processLogout);
sideLogoutBtn.addEventListener('click', processLogout);

// ==========================================================================
// SECURITY MOCK TOGGLE CONTROLS
// ==========================================================================
toggleNumBtn.addEventListener('click', function() {
    if (isNumHidden) {
        accountNumText.innerText = "123456785894";
        toggleNumBtn.innerText = "Hide";
        isNumHidden = false;
    } else {
        accountNumText.innerText = "*********5894";
        toggleNumBtn.innerText = "Show";
        isNumHidden = true;
    }
});

// ==========================================================================
// SIDEBAR TRACKING & HIGH-VISIBILITY ALERT NOTIFICATIONS
// ==========================================================================

// Intercept interactions on all sidebar tabs to flash the red warning container
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(event) {
        // Prevent action links from forcing default asset requests or resetting views
        event.preventDefault();
        
        // Skip warning deployment logic if clicking the designated Log Out link
        if (this.id === 'sideLogoutBtn' || this.classList.contains('logout-link')) {
            return;
        }

        // Visually update structural highlight focus paths across active element arrays
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Update banner text dynamically to use your new custom message string
        demoAlertBanner.innerText = "⚠️ This feature can't be used right now.";

        // Reveal the red warning banner immediately
        demoAlertBanner.style.display = 'block';

        // Clear any running countdowns so timers don't conflict on rapid menu clicks
        if (alertTimeoutId) {
            clearTimeout(alertTimeoutId);
        }

        // Set an automated countdown to smoothly hide the alert banner after 4 seconds
        alertTimeoutId = setTimeout(() => {
            demoAlertBanner.style.display = 'none';
        }, 4000);
    });
});
