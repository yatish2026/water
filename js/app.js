/* ========================================
   WATERCARE PORTAL - JAVASCRIPT
   ======================================== */

// Modal Data
const weekActivities = {
    week1: {
        title: 'Week 1 - Survey of Water Points',
        icon: '🔍',
        content: `
            <div class="modal-header">
                <h2>📊 Survey of Water Points</h2>
            </div>
            <div class="modal-body">
                <h3>Objective</h3>
                <p>Conduct a comprehensive assessment of all water facilities and distribution points across the campus.</p>
                
                <h3>Activities</h3>
                <ul>
                    <li>Identify all water sources (main supply, tankers, boreholes)</li>
                    <li>Document water collection points and distribution lines</li>
                    <li>Record facility conditions and maintenance status</li>
                    <li>Conduct physical inspection of all water points</li>
                    <li>Create a comprehensive map of water infrastructure</li>
                </ul>
                
                <h3>Outcomes</h3>
                <p>A detailed report on water facility status, including identified issues, maintenance needs, and recommendations for improvement.</p>
                
                <h3>Team Members Involved</h3>
                <p>Vikram Singh, Aditya Kumar, Rajesh Patel</p>
            </div>
        `
    },
    week2: {
        title: 'Week 2 - Awareness & Cleanliness Drive',
        icon: '🧹',
        content: `
            <div class="modal-header">
                <h2>🧹 Awareness & Cleanliness Drive</h2>
            </div>
            <div class="modal-body">
                <h3>Objective</h3>
                <p>Raise community awareness about water facility maintenance and organize cleanliness activities.</p>
                
                <h3>Activities</h3>
                <ul>
                    <li>Awareness posters and pamphlets distribution</li>
                    <li>Cleanliness drive at all water points</li>
                    <li>Interactive awareness sessions with students</li>
                    <li>Identification and marking of unsafe water points</li>
                    <li>Community engagement and participation</li>
                </ul>
                
                <h3>Outcomes</h3>
                <p>Increased community awareness, clean water facilities, and active student participation in maintenance activities.</p>
                
                <h3>Team Members Involved</h3>
                <p>Neha Gupta, Priya Sharma, Aditya Kumar</p>
            </div>
        `
    },
    week3: {
        title: 'Week 3 - Safe Drinking Water Training',
        icon: '📚',
        content: `
            <div class="modal-header">
                <h2>📚 Safe Drinking Water Training</h2>
            </div>
            <div class="modal-body">
                <h3>Objective</h3>
                <p>Educate campus community about water safety, purification methods, and health implications.</p>
                
                <h3>Activities</h3>
                <ul>
                    <li>Expert-led training sessions on water safety</li>
                    <li>Demonstrations of purification methods</li>
                    <li>Distribution of water safety guidelines</li>
                    <li>Q&A sessions with medical professionals</li>
                    <li>Certification programs for interested participants</li>
                </ul>
                
                <h3>Outcomes</h3>
                <p>Educated community members capable of identifying unsafe water and implementing basic purification techniques.</p>
                
                <h3>Team Members Involved</h3>
                <p>Neha Gupta, Priya Sharma, Dr. Rajesh Verma</p>
            </div>
        `
    },
    week4: {
        title: 'Week 4 - Practical Water Conservation',
        icon: '💚',
        content: `
            <div class="modal-header">
                <h2>💚 Practical Water Conservation</h2>
            </div>
            <div class="modal-body">
                <h3>Objective</h3>
                <p>Implement practical water conservation techniques and promote sustainable water usage.</p>
                
                <h3>Activities</h3>
                <ul>
                    <li>Installation of water-saving devices (aerators, timers)</li>
                    <li>Leak detection and repair demonstrations</li>
                    <li>Rainwater harvesting awareness and setup</li>
                    <li>Water usage audit across campus</li>
                    <li>Competition among hostels for water conservation</li>
                </ul>
                
                <h3>Outcomes</h3>
                <p>Reduced water wastage, installed conservation devices, and community commitment to sustainable practices.</p>
                
                <h3>Team Members Involved</h3>
                <p>Rajesh Patel, Vikram Singh, Aditya Kumar</p>
            </div>
        `
    },
    week5: {
        title: 'Week 5 - Outreach & Evaluation',
        icon: '🤝',
        content: `
            <div class="modal-header">
                <h2>🤝 Outreach & Evaluation</h2>
            </div>
            <div class="modal-body">
                <h3>Objective</h3>
                <p>Conduct community outreach and evaluate the impact of all activities.</p>
                
                <h3>Activities</h3>
                <ul>
                    <li>Feedback collection from community members</li>
                    <li>Impact assessment surveys</li>
                    <li>Outreach to local communities</li>
                    <li>Documentation of lessons learned</li>
                    <li>Planning for sustainability and continuation</li>
                </ul>
                
                <h3>Outcomes</h3>
                <p>Comprehensive evaluation report, community feedback, and sustainable continuation plan for the project.</p>
                
                <h3>Team Members Involved</h3>
                <p>Priya Sharma, Neha Gupta, Aditya Kumar</p>
            </div>
        `
    },
    week6: {
        title: 'Week 6 - Exhibition & Conclusion',
        icon: '🎉',
        content: `
            <div class="modal-header">
                <h2>🎉 Exhibition & Conclusion</h2>
            </div>
            <div class="modal-body">
                <h3>Objective</h3>
                <p>Showcase project achievements and present findings to stakeholders and college administration.</p>
                
                <h3>Activities</h3>
                <ul>
                    <li>Final project exhibition and presentation</li>
                    <li>Display of survey maps and statistics</li>
                    <li>Demonstration of conservation techniques</li>
                    <li>Recognition and awards ceremony</li>
                    <li>Concluding remarks and future recommendations</li>
                </ul>
                
                <h3>Outcomes</h3>
                <p>Successful project presentation, recognition of team efforts, and established foundation for future water safety initiatives.</p>
                
                <h3>Team Members Involved</h3>
                <p>All team members, Faculty Guide Dr. Rajesh Verma</p>
            </div>
        `
    }
};

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const leakForm = document.getElementById('leak-form');
const suggestionForm = document.getElementById('suggestion-form');
const fileUpload = document.getElementById('file-upload');

// ========================================
// NAVBAR & MOBILE MENU
// ========================================

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// Navbar color change on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// ========================================
// MODAL FUNCTIONS
// ========================================

function openModal(weekId) {
    if (modal && weekActivities[weekId]) {
        modalBody.innerHTML = weekActivities[weekId].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// FORM HANDLING
// ========================================

// Leak Report Form
if (leakForm) {
    leakForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            issueType: document.getElementById('issue-type').value,
            description: document.getElementById('description').value
        };
        
        console.log('Report Submitted:', formData);
        
        // Award points if rewards system is available
        if (window.WaterCareRewards) {
            window.WaterCareRewards.addReport();
        }
        
        // Show success message
        alert('✅ Your report has been submitted successfully!\n\n🏆 You earned 25 points!\n\nThank you for helping us maintain safe water facilities on campus.\n\nReference ID: ' + generateReferenceId());
        
        // Reset form
        leakForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Suggestion Form
if (suggestionForm) {
    suggestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('sender-name').value,
            email: document.getElementById('sender-email').value,
            category: document.getElementById('category').value,
            message: document.getElementById('message').value,
            followUp: document.getElementById('follow-up').checked
        };
        
        console.log('Suggestion Submitted:', formData);
        
        // Award points if rewards system is available
        if (window.WaterCareRewards) {
            window.WaterCareRewards.addSuggestion();
        }
        
        // Show success message
        alert('💬 Thank you! Your suggestion has been recorded.\n\n🏆 You earned 10 points!\n\nWe appreciate your valuable feedback and will review it shortly.\n\nReference ID: ' + generateReferenceId());
        
        // Reset form
        suggestionForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// File Upload Handler
if (fileUpload) {
    fileUpload.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name;
        const fileNameDisplay = document.getElementById('file-name');
        if (fileName && fileNameDisplay) {
            fileNameDisplay.textContent = '✓ ' + fileName + ' selected';
            fileNameDisplay.style.color = '#36D399';
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function generateReferenceId() {
    return 'WCP-' + Date.now().toString().slice(-8).toUpperCase();
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Fade in elements on load
    const elements = document.querySelectorAll('.quick-card, .activity-card, .stat-card, .team-member');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.awareness-card, .gallery-item, .poster, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ACTIVE LINK HIGHLIGHTING
// ========================================

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
setActiveLink();

// ========================================
// SCROLL TO TOP BUTTON (Optional)
// ========================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3ABEF9 0%, #36D399 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ========================================
// COUNTER ANIMATION FOR STATISTICS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stat numbers when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                animateCounter(num, target);
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// FORM VALIDATION
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// Add validation to form inputs
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#FF6B6B';
            input.title = 'Please enter a valid email address';
        } else {
            input.style.borderColor = '#ddd';
            input.title = '';
        }
    });
});

// ========================================
// DROPDOWN ENHANCEMENTS
// ========================================

const selects = document.querySelectorAll('select');
selects.forEach(select => {
    select.addEventListener('change', function() {
        if (this.value !== '') {
            this.style.color = 'var(--dark-text)';
        } else {
            this.style.color = 'var(--light-text)';
        }
    });
});

// ========================================
// PERFORMANCE: LAZY LOADING (if needed)
// ========================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imgObserver.observe(img));
}

// ========================================
// LOG APP INITIALIZATION
// ========================================

console.log('%cWaterCare Portal Initialized Successfully! 💧', 'color: #3ABEF9; font-size: 14px; font-weight: bold;');
console.log('%cThis is a frontend-only demonstration with dummy data', 'color: #36D399; font-size: 12px;');
