/* ========================================
   WATERCARE PORTAL - REWARDS SYSTEM
   ======================================== */

// Mock Users Data (in real app, this would come from backend)
const mockUsers = [
    { name: 'Raj Kumar', points: 580, reports: 8, sessions: 12, level: 'Community Champion' },
    { name: 'Priya Singh', points: 420, reports: 6, sessions: 10, level: 'Water Guardian' },
    { name: 'Aditya Patel', points: 350, reports: 5, sessions: 8, level: 'Eco Warrior' },
    { name: 'Sneha Sharma', points: 280, reports: 4, sessions: 7, level: 'Eco Warrior' },
    { name: 'Rohan Gupta', points: 200, reports: 3, sessions: 5, level: 'Contributor' },
    { name: 'Neha Desai', points: 150, reports: 2, sessions: 3, level: 'Contributor' },
    { name: 'Vikram Singh', points: 120, reports: 2, sessions: 2, level: 'Contributor' },
    { name: 'Anjali Kumar', points: 95, reports: 1, sessions: 2, level: 'Contributor' }
];

// Points Configuration
const POINTS_CONFIG = {
    REPORT: 25,
    SESSION: 15,
    CLEANUP: 20,
    SUGGESTION: 10,
    REFERRAL: 50
};

// Level Thresholds
const LEVEL_CONFIG = {
    'Contributor': 0,
    'Eco Warrior': 101,
    'Water Guardian': 251,
    'Community Champion': 501
};

// Badge Thresholds
const BADGE_CONFIG = {
    'badge-first-report': { type: 'reports', value: 1 },
    'badge-session': { type: 'sessions', value: 3 },
    'badge-cleanup': { type: 'cleanup', value: 1 },
    'badge-warrior': { type: 'points', value: 250 },
    'badge-guardian': { type: 'points', value: 500 },
    'badge-champion': { type: 'points', value: 1000 }
};

// Initialize User Data from localStorage
function initializeUserData() {
    const existingUser = localStorage.getItem('watercare_user');
    if (!existingUser) {
        const userData = {
            name: 'Guest User',
            points: 0,
            reports: 0,
            sessions: 0,
            cleanup: 0,
            suggestions: 0
        };
        localStorage.setItem('watercare_user', JSON.stringify(userData));
    }
}

// Get User Data
function getUserData() {
    const data = localStorage.getItem('watercare_user');
    return data ? JSON.parse(data) : null;
}

// Save User Data
function saveUserData(userData) {
    localStorage.setItem('watercare_user', JSON.stringify(userData));
    updateUI();
}

// Update UI with user data
function updateUI() {
    const user = getUserData();
    if (!user) return;

    // Update profile
    document.getElementById('user-name').textContent = user.name || 'Guest User';
    document.getElementById('total-points').textContent = user.points || 0;
    document.getElementById('report-count').textContent = user.reports || 0;
    document.getElementById('session-count').textContent = user.sessions || 0;
    document.getElementById('achievement-count').textContent = countUnlockedBadges();

    // Update level
    const level = getUserLevel(user.points);
    document.getElementById('user-level').textContent = `Level: ${level}`;

    // Update progress bar
    updateProgressBar(user.points);

    // Check and update badges
    checkBadges(user);

    // Update leaderboard
    updateLeaderboard(user);
}

// Get user level based on points
function getUserLevel(points) {
    if (points >= 501) return 'Community Champion';
    if (points >= 251) return 'Water Guardian';
    if (points >= 101) return 'Eco Warrior';
    return 'Contributor';
}

// Update progress bar
function updateProgressBar(points) {
    const nextLevelThreshold = getNextLevelThreshold(points);
    const currentLevelThreshold = getCurrentLevelThreshold(points);
    const pointsInLevel = points - currentLevelThreshold;
    const pointsNeeded = nextLevelThreshold - currentLevelThreshold;
    const percentage = (pointsInLevel / pointsNeeded) * 100;

    document.getElementById('progress-fill').style.width = Math.min(percentage, 100) + '%';
    document.getElementById('progress-text').textContent = 
        `${pointsInLevel}/${pointsNeeded} points to next level`;
}

// Get next level threshold
function getNextLevelThreshold(points) {
    if (points >= 501) return 1000;
    if (points >= 251) return 500;
    if (points >= 101) return 250;
    return 100;
}

// Get current level threshold
function getCurrentLevelThreshold(points) {
    if (points >= 501) return 500;
    if (points >= 251) return 250;
    if (points >= 101) return 100;
    return 0;
}

// Add report points
function addReport() {
    const user = getUserData();
    user.points += POINTS_CONFIG.REPORT;
    user.reports++;
    saveUserData(user);
    showNotification(`Report submitted! +${POINTS_CONFIG.REPORT} points earned!`, 'success');
}

// Add session points
function addSession() {
    const user = getUserData();
    user.points += POINTS_CONFIG.SESSION;
    user.sessions++;
    saveUserData(user);
    showNotification(`Session attendance marked! +${POINTS_CONFIG.SESSION} points earned!`, 'success');
}

// Add cleanup points
function addCleanup() {
    const user = getUserData();
    user.points += POINTS_CONFIG.CLEANUP;
    user.cleanup++;
    saveUserData(user);
    showNotification(`Cleanup participation recorded! +${POINTS_CONFIG.CLEANUP} points earned!`, 'success');
}

// Add suggestion points
function addSuggestion() {
    const user = getUserData();
    user.points += POINTS_CONFIG.SUGGESTION;
    user.suggestions++;
    saveUserData(user);
    showNotification(`Suggestion recorded! +${POINTS_CONFIG.SUGGESTION} points earned!`, 'success');
}

// Check badge eligibility
function checkBadges(user) {
    Object.keys(BADGE_CONFIG).forEach(badgeId => {
        const badge = BADGE_CONFIG[badgeId];
        const element = document.getElementById(badgeId);
        
        if (!element) return;

        let isUnlocked = false;

        if (badge.type === 'points' && user.points >= badge.value) {
            isUnlocked = true;
        } else if (badge.type === 'reports' && user.reports >= badge.value) {
            isUnlocked = true;
        } else if (badge.type === 'sessions' && user.sessions >= badge.value) {
            isUnlocked = true;
        } else if (badge.type === 'cleanup' && user.cleanup >= badge.value) {
            isUnlocked = true;
        }

        if (isUnlocked) {
            element.classList.add('unlocked');
        } else {
            element.classList.remove('unlocked');
        }
    });
}

// Count unlocked badges
function countUnlockedBadges() {
    const user = getUserData();
    let count = 0;

    Object.values(BADGE_CONFIG).forEach(badge => {
        if (badge.type === 'points' && user.points >= badge.value) {
            count++;
        } else if (badge.type === 'reports' && user.reports >= badge.value) {
            count++;
        } else if (badge.type === 'sessions' && user.sessions >= badge.value) {
            count++;
        } else if (badge.type === 'cleanup' && user.cleanup >= badge.value) {
            count++;
        }
    });

    return count;
}

// Update leaderboard
function updateLeaderboard(currentUser) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';

    const allUsers = [...mockUsers];
    if (currentUser.points > 0) {
        allUsers.push({
            name: currentUser.name || 'You',
            points: currentUser.points,
            reports: currentUser.reports,
            sessions: currentUser.sessions,
            level: getUserLevel(currentUser.points)
        });
    }

    // Sort by points
    allUsers.sort((a, b) => b.points - a.points);

    const medals = ['🥇', '🥈', '🥉'];

    allUsers.slice(0, 10).forEach((user, index) => {
        const row = document.createElement('tr');
        const medal = medals[index] || `${index + 1}.`;
        const badgeEmoji = getBadgeEmoji(user.level);

        row.innerHTML = `
            <td><span class="rank-medal">${medal}</span>${index + 1}</td>
            <td><strong>${user.name}</strong></td>
            <td><strong>${user.points}</strong></td>
            <td>${user.reports}</td>
            <td>${user.sessions}</td>
            <td>${badgeEmoji}</td>
        `;

        leaderboardBody.appendChild(row);
    });
}

// Get badge emoji for level
function getBadgeEmoji(level) {
    const badges = {
        'Contributor': '🌱',
        'Eco Warrior': '♻️',
        'Water Guardian': '💧',
        'Community Champion': '🏆'
    };
    return badges[level] || '⭐';
}

// Modal functions for user input
function showUserInputModal() {
    document.getElementById('user-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeUserModal() {
    document.getElementById('user-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function saveUserProfile(event) {
    event.preventDefault();
    const name = document.getElementById('modal-name').value.trim();
    
    if (!name) {
        alert('Please enter your name');
        return;
    }

    const user = getUserData();
    user.name = name;
    saveUserData(user);
    
    closeUserModal();
    document.getElementById('modal-name').value = '';
    showNotification(`Profile updated! Welcome, ${name}!`, 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#36D399' : '#3ABEF9'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInNotif 0.3s ease-out;
        font-weight: 600;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutNotif 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotif {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutNotif {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('user-modal');
    if (event.target === modal) {
        closeUserModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeUserModal();
    }
});

// Connect report form to rewards system
document.addEventListener('DOMContentLoaded', () => {
    initializeUserData();
    updateUI();

    // If on report page, add points when form is submitted
    const leakForm = document.getElementById('leak-form');
    if (leakForm) {
        const originalSubmit = leakForm.onsubmit;
        leakForm.addEventListener('submit', (e) => {
            addReport();
        });
    }

    // If on suggestion page, add points when form is submitted
    const suggestionForm = document.getElementById('suggestion-form');
    if (suggestionForm) {
        const originalSubmit = suggestionForm.onsubmit;
        suggestionForm.addEventListener('submit', (e) => {
            addSuggestion();
        });
    }

    console.log('%cWaterCare Rewards System Initialized! 🏆', 'color: #36D399; font-size: 14px; font-weight: bold;');
});

// ========================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ========================================

// Allow other scripts to award points
window.WaterCareRewards = {
    addReport: addReport,
    addSession: addSession,
    addCleanup: addCleanup,
    addSuggestion: addSuggestion,
    getUserData: getUserData,
    saveUserData: saveUserData,
    getUserLevel: getUserLevel
};
