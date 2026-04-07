// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    let currentTheme = htmlEl.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun'; // Sun means "Click to switch to light"
    } else {
        icon.className = 'fas fa-moon'; // Moon means "Click to switch to dark"
    }
}

// Fetch Data and Render
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        renderHero(data.hero);
        renderEducation(data.education);
        renderTraining(data.training);
        renderExperience(data.experience);
        renderSkills(data.skills);
        renderAwards(data.awards);
        if (data.conferences) renderConferences(data.conferences);
        renderPublications(data.publications);
        renderContact(data.contact);
        
        // Footer Name
        document.getElementById('footer-name').textContent = data.hero.name;

        // Initialize animations after rendering
        initAnimations();
    })
    .catch(err => console.error("Error loading data:", err));

function renderHero(hero) {
    document.getElementById('hero-greeting').textContent = hero.greeting;
    document.getElementById('hero-name').textContent = hero.name;
    document.getElementById('hero-title').textContent = hero.title;
    document.getElementById('hero-summary').textContent = hero.summary;
    
    let socialsHtml = '';
    if(hero.socials.linkedin && hero.socials.linkedin !== "#") {
        socialsHtml += `<a href="${hero.socials.linkedin}" aria-label="LinkedIn" target="_blank"><i class="fab fa-linkedin"></i></a>`;
    }
    if(hero.socials.twitter) {
        socialsHtml += `<a href="${hero.socials.twitter}" aria-label="Twitter" target="_blank"><i class="fab fa-x-twitter"></i></a>`;
    }
    if(hero.socials.orcid) {
        socialsHtml += `<a href="${hero.socials.orcid}" aria-label="ORCID" target="_blank"><i class="fab fa-orcid"></i></a>`;
    }
    if(hero.socials.email) {
        socialsHtml += `<a href="${hero.socials.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>`;
    }
    
    document.getElementById('hero-socials').innerHTML = socialsHtml;

    let footerSocials = '';
    if(hero.socials.linkedin && hero.socials.linkedin !== "#") footerSocials += `<a href="${hero.socials.linkedin}" aria-label="LinkedIn" target="_blank"><i class="fab fa-linkedin"></i></a>`;
    if(hero.socials.twitter) footerSocials += `<a href="${hero.socials.twitter}" aria-label="Twitter" target="_blank"><i class="fab fa-x-twitter"></i></a>`;
    if(hero.socials.orcid) footerSocials += `<a href="${hero.socials.orcid}" aria-label="ORCID" target="_blank"><i class="fab fa-orcid"></i></a>`;
    
    document.getElementById('footer-socials').innerHTML = footerSocials;
}

function renderEducation(eduData) {
    const container = document.getElementById('education-container');
    container.innerHTML = eduData.map(edu => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${edu.date}</div>
            <div class="timeline-content">
                <h3>${edu.institution}</h3>
                <h4>${edu.degree}</h4>
                <p>Coursework: ${edu.coursework}</p>
                <p><strong>Thesis:</strong> ${edu.thesis}</p>
            </div>
        </div>
    `).join('');
}

function renderTraining(trainingData) {
    const container = document.getElementById('training-container');
    container.innerHTML = trainingData.map(train => `
        <div class="card">
            <h3>${train.title}</h3>
            <h4>${train.institution}</h4>
            <p>${train.description}</p>
        </div>
    `).join('');
}

function renderExperience(expData) {
    const container = document.getElementById('experience-container');
    container.innerHTML = expData.map(exp => `
        <div class="experience-card fade-in">
            <div class="exp-header">
                <div>
                    <h3>${exp.institution}</h3>
                    <h4>${exp.role}</h4>
                    ${exp.supervisor ? `<div class="exp-supervisor">Supervisor: ${exp.supervisor}</div>` : ''}
                </div>
                <span class="exp-date">${exp.date}</span>
            </div>
            <ul class="exp-details">
                ${exp.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderSkills(skillsData) {
    const container = document.getElementById('skills-container');
    
    let html = '';
    skillsData.forEach(skillBlock => {
        html += `
            <div class="skill-category fade-in">
                <h3 class="skill-title"><i class="${skillBlock.icon}"></i> ${skillBlock.category}</h3>
                <div class="skill-tags">
                    ${skillBlock.items.map(s => `<span>${s}</span>`).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderAwards(awards) {
    const container = document.getElementById('awards-container');
    container.innerHTML = awards.map(aw => `
        <div class="card award-card">
            <i class="${aw.icon} award-icon"></i>
            <h3>${aw.title}</h3>
            <p>${aw.year}</p>
            <p class="small-text">${aw.description}</p>
        </div>
    `).join('');
}

function renderPublications(pubs) {
    const container = document.getElementById('publications-container');
    container.innerHTML = pubs.map(pub => `
        <div class="pub-card fade-in">
            <div class="pub-year">${pub.year}</div>
            <div class="pub-content">
                <h3>${pub.title}</h3>
                <p class="authors">${pub.authors}</p>
                <p class="journal">${pub.journal}</p>
                <a href="${pub.link}" target="_blank" class="pub-link">${pub.link_text} <i class="fas fa-external-link-alt"></i></a>
            </div>
        </div>
    `).join('');
}

function renderConferences(confs) {
    const container = document.getElementById('conferences-container');
    if (!container) return;
    container.innerHTML = confs.map(conf => `
        <div class="pub-card fade-in">
            <div class="pub-year">${conf.year}</div>
            <div class="pub-content">
                <h3>${conf.title}</h3>
                <p class="authors">${conf.authors}</p>
                <p class="journal">${conf.conference}</p>
                <p class="small-text">${conf.details}</p>
            </div>
        </div>
    `).join('');
}

function renderContact(contact) {
    const container = document.getElementById('contact-container');
    container.innerHTML = `
        <h3>Contact Information</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${contact.address}</p>
        <p><i class="fas fa-phone"></i> ${contact.phone}</p>
        <p><i class="fas fa-envelope"></i> <a href="mailto:${contact.email}">${contact.email}</a></p>
    `;
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            let offset = 80;
            let elementPosition = targetElement.getBoundingClientRect().top;
            let offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Intersection Observer for Animations
function initAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// Form logic
const form = document.querySelector('.contact-form');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sent Successfully!';
        btn.style.background = '#10b981'; 
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ''; 
            form.reset();
        }, 3000);
    });
}
