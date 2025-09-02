// Application Data
let appData = {
  "profile": {
    "name": "Anikesh Kumar",
    "title": "Web Developer & Creative Thinker",
    "bio": "Passionate about creating amazing digital experiences and building meaningful connections across platforms.",
    "profileImage": "https://images.wallpapersden.com/image/download/happiest-anime-girl-hd-ai-art_bmVsZmyUmZqaraWkpJRmbmpnrWZmZ2U.jpg"
  },
  "socialLinks": [
    {
      "id": 1,
      "platform": "LinkedIn",
      "url": "https://www.linkedin.com/in/anikesh-kumar-25926b360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      "icon": "fab fa-linkedin",
      "color": "#0077b5",
      "clicks": 245
    },
    {
      "id": 2,
      "platform": "Instagram", 
      "url": "https://www.instagram.com/anikesh_01/?utm_source=ig_web_button_share_sheet&igsh=MWdqcmpmNmI5NTRleQ%3D%3D#",
      "icon": "fab fa-instagram",
      "color": "#e4405f",
      "clicks": 189
    },
    {
      "id": 3,
      "platform": "YouTube",
      "url": "https://youtube.com/@yourchannel",
      "icon": "fab fa-youtube",
      "color": "#ff0000",
      "clicks": 167
    },
    {
      "id": 4,
      "platform": "Fiverr",
      "url": "https://www.fiverr.com/s/AyqRDmq",
      "icon": "fas fa-handshake",
      "color": "#1dbf73",
      "clicks": 98
    },
    {
      "id": 5,
      "platform": "Facebook",
      "url": "https://hi-in.facebook.com/anikesh.kumar.3939503",
      "icon": "fab fa-facebook",
      "color": "#1877f2",
      "clicks": 76
    },
    {
      "id": 6,
      "platform": "Upwork",
      "url": "https://upwork.com/freelancers/yourprofile",
      "icon": "fas fa-briefcase",
      "color": "#14a800",
      "clicks": 54
    }
  ],
  "blogPosts": [
    {
      "id": 1,
      "title": "Starting My Digital Journey",
      "content": "Today marks the beginning of an exciting new chapter in my digital journey. I'm thrilled to share my experiences, insights, and creative process with all of you. This platform will be my space to document the ups and downs, the lessons learned, and the victories achieved along the way. Join me as I navigate the ever-evolving digital landscape and build meaningful connections.",
      "category": "Personal",
      "date": "2025-09-01",
      "readTime": "3 min",
      "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=300&fit=crop"
    },
    {
      "id": 2,
      "title": "Latest Project Showcase",
      "content": "I'm excited to showcase my latest creative project that combines innovative design with functional user experience. This project challenged me to think outside the box and push the boundaries of what's possible. From concept to execution, every detail was carefully crafted to deliver an exceptional user experience. The project taught me valuable lessons about problem-solving, creativity, and the importance of user-centered design.",
      "category": "Work",
      "date": "2025-08-28",
      "readTime": "5 min",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop"
    },
    {
      "id": 3,
      "title": "Thoughts on Creative Process",
      "content": "Creativity isn't just about having great ideas—it's about the systematic process of bringing those ideas to life. Here's how I approach my creative workflow: starting with inspiration, moving through ideation, prototyping, testing, and finally implementation. Each phase requires different skills and mindsets, but they all contribute to the final outcome. Understanding this process has helped me become more productive and produce better results.",
      "category": "Thoughts",
      "date": "2025-08-25",
      "readTime": "4 min",
      "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=300&fit=crop"
    }
  ],
  "analytics": {
    "totalClicks": 829,
    "monthlyVisitors": 1247,
    "topPlatform": "LinkedIn",
    "engagementRate": "73%"
  }
};

// Application State
let isAdminMode = false;
let editingLink = null;
let editingPost = null;
let currentTheme = 'superman';
let scrollProgress = 0;

// Theme Configuration
const themes = {
  superman: {
    primary: '#0052cc',
    secondary: '#dc143c', 
    accent: '#ffd700',
    bgPrimary: '#fef7cd',
    bgSecondary: '#ffffff',
    text: '#1e40af',
    textSecondary: '#3b82f6',
    name: 'Superman Mode'
  },
  batman: {
    primary: '#1f2937',
    secondary: '#000000',
    accent: '#ffd700', 
    bgPrimary: '#0f172a',
    bgSecondary: '#020617',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    name: 'Batman Mode'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    initializeApp();
  }, 100);
});

function initializeApp() {
  loadProfile();
  renderSocialLinks();
  renderBlogPosts();
  updateAnalytics();
  setupEventListeners();
  setupScrollAnimations();
  setupModalHandlers();
  setupCustomCursor();
  setupRippleEffects();
  setupThemeTransition();
  setupTypewriterEffect();
  
  // Initialize theme
  updateTheme();
  
  // Make sure admin mode is properly initialized
  updateAdminVisibility();
}

// Dynamic Theme System
function setupThemeTransition() {
  let ticking = false;
  
  function updateOnScroll() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / documentHeight;
    
    scrollProgress = scrollPercent;
    
    // Theme transition starts at 20% and completes at 60%
    let themeProgress = 0;
    if (scrollPercent >= 0.2) {
      themeProgress = Math.min((scrollPercent - 0.2) / 0.4, 1);
    }
    
    // Update theme based on progress
    updateDynamicTheme(themeProgress);
    
    // Update scroll progress for other animations
    document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Initial call
  updateOnScroll();
}

function updateDynamicTheme(progress) {
  const superman = themes.superman;
  const batman = themes.batman;
  
  // Interpolate colors
  const interpolatedTheme = {
    primary: interpolateColor(superman.primary, batman.primary, progress),
    secondary: interpolateColor(superman.secondary, batman.secondary, progress),
    accent: interpolateColor(superman.accent, batman.accent, progress),
    bgPrimary: interpolateColor(superman.bgPrimary, batman.bgPrimary, progress),
    bgSecondary: interpolateColor(superman.bgSecondary, batman.bgSecondary, progress),
    text: interpolateColor(superman.text, batman.text, progress),
    textSecondary: interpolateColor(superman.textSecondary, batman.textSecondary, progress)
  };
  
  // Update CSS variables
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', interpolatedTheme.primary);
  root.style.setProperty('--theme-secondary', interpolatedTheme.secondary);
  root.style.setProperty('--theme-accent', interpolatedTheme.accent);
  root.style.setProperty('--theme-bg-primary', interpolatedTheme.bgPrimary);
  root.style.setProperty('--theme-bg-secondary', interpolatedTheme.bgSecondary);
  root.style.setProperty('--theme-text', interpolatedTheme.text);
  root.style.setProperty('--theme-text-secondary', interpolatedTheme.textSecondary);
  
  // Update theme indicator and body data attribute
  const newTheme = progress > 0.5 ? 'batman' : 'superman';
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    document.body.setAttribute('data-theme', currentTheme);
    
    const themeNameEl = document.querySelector('.theme-name');
    if (themeNameEl) {
      themeNameEl.textContent = themes[currentTheme].name;
    }
  }
}

function interpolateColor(color1, color2, factor) {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Custom Cursor
function setupCustomCursor() {
  if (window.innerWidth <= 768) return; // Skip on mobile
  
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (!cursor || !cursorDot || !cursorOutline) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursorOutline.style.left = cursorX + 'px';
    cursorOutline.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .ripple-btn, .social-link');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('active');
      cursorOutline.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
      cursorOutline.classList.remove('active');
    });
  });
}

// Ripple Effects
function setupRippleEffects() {
  function createRipple(event) {
    const button = event.currentTarget;
    const existingRipple = button.querySelector('.btn-ripple');
    
    if (existingRipple) {
      existingRipple.remove();
    }
    
    const ripple = document.createElement('span');
    ripple.classList.add('btn-ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Add ripple effect to all ripple buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.ripple-btn')) {
      createRipple(e);
    }
  });
}

// Typewriter Effect
function setupTypewriterEffect() {
  const nameElement = document.getElementById('profileName');
  if (!nameElement) return;
  
  const text = nameElement.textContent;
  nameElement.textContent = '';
  nameElement.style.borderRight = '3px solid var(--theme-accent)';
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    } else {
      // Start blinking cursor
      setTimeout(() => {
        nameElement.classList.add('typewriter');
      }, 500);
    }
  }
  
  // Start typing after a delay
  setTimeout(typeWriter, 1500);
}

// Enhanced Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('section-animate')) {
          entry.target.classList.add('visible');
          
          // Animate child elements with stagger
          const children = entry.target.querySelectorAll('.fade-in-up, .reveal-text');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 200);
          });
        } else {
          entry.target.classList.add('visible');
        }
      }
    });
  }, observerOptions);
  
  // Observe elements
  setTimeout(() => {
    const elementsToAnimate = document.querySelectorAll(
      '.section-animate, .fade-in-up, .reveal-text, .social-link, .post-card, .analytics-card'
    );
    elementsToAnimate.forEach(el => observer.observe(el));
  }, 500);
  
  // Parallax effect for floating shapes
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });
}

// Profile Management
function loadProfile() {
  const profileName = document.getElementById('profileName');
  const profileTitle = document.getElementById('profileTitle');
  const profileBio = document.getElementById('profileBio');
  const profileImg = document.getElementById('profileImg');
  
  if (profileName) profileName.textContent = appData.profile.name;
  if (profileTitle) profileTitle.textContent = appData.profile.title;
  if (profileBio) profileBio.textContent = appData.profile.bio;
  if (profileImg) profileImg.src = appData.profile.profileImage;
}

// Update Theme (for manual switching)
function updateTheme() {
  const theme = themes[currentTheme];
  const root = document.documentElement;
  
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-bg-primary', theme.bgPrimary);
  root.style.setProperty('--theme-bg-secondary', theme.bgSecondary);
  root.style.setProperty('--theme-text', theme.text);
  root.style.setProperty('--theme-text-secondary', theme.textSecondary);
  
  document.body.setAttribute('data-theme', currentTheme);
  
  const themeNameEl = document.querySelector('.theme-name');
  if (themeNameEl) {
    themeNameEl.textContent = theme.name;
  }
}

// Admin Mode Toggle - FIXED VERSION
function toggleAdminMode() {
  isAdminMode = !isAdminMode;
  console.log('Admin mode toggled:', isAdminMode); // Debug log
  
  const adminToggle = document.getElementById('adminToggle');
  if (adminToggle) {
    adminToggle.classList.toggle('active', isAdminMode);
  }
  
  updateAdminVisibility();
}

// Update Admin Visibility - FIXED FUNCTION
function updateAdminVisibility() {
  // Handle admin-only sections (like analytics)
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(el => {
    if (isAdminMode) {
      el.classList.remove('hidden');
      el.style.display = ''; // Reset display style
    } else {
      el.classList.add('hidden');
    }
  });
  
  // Handle admin control buttons on cards
  const linkActions = document.querySelectorAll('.link-actions');
  const postActions = document.querySelectorAll('.post-actions');
  
  linkActions.forEach(el => {
    el.classList.toggle('always-visible', isAdminMode);
  });
  
  postActions.forEach(el => {
    el.classList.toggle('always-visible', isAdminMode);
  });
  
  // Re-render elements to ensure admin controls are properly displayed
  renderSocialLinks();
  renderBlogPosts();
}

// Social Links Management
function renderSocialLinks() {
  const linksGrid = document.getElementById('linksGrid');
  if (!linksGrid) return;
  
  linksGrid.innerHTML = '';
  
  appData.socialLinks.forEach((link, index) => {
    const linkElement = createSocialLinkElement(link, index);
    linksGrid.appendChild(linkElement);
  });
  
  // Trigger scroll animations for new elements
  setTimeout(() => {
    const newElements = linksGrid.querySelectorAll('.social-link');
    newElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, 200);
}

function createSocialLinkElement(link, index) {
  const linkEl = document.createElement('a');
  linkEl.className = 'social-link';
  linkEl.href = link.url;
  linkEl.target = '_blank';
  linkEl.rel = 'noopener noreferrer';
  linkEl.style.animationDelay = `${index * 0.1}s`;
  
  // Add click tracking
  linkEl.addEventListener('click', (e) => {
    trackClick(link.id);
  });
  
  linkEl.innerHTML = `
    <div class="social-link-card">
      <div class="link-actions ${isAdminMode ? 'always-visible' : ''}">
        <button class="link-action-btn ripple-btn" onclick="event.preventDefault(); event.stopPropagation(); editLink(${link.id});">
          <i class="fas fa-edit"></i>
        </button>
        <button class="link-action-btn ripple-btn" onclick="event.preventDefault(); event.stopPropagation(); deleteLink(${link.id});">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div class="social-icon" style="color: ${link.color}">
        <i class="${link.icon}"></i>
      </div>
      <div class="social-platform">${link.platform}</div>
      <div class="social-clicks">${link.clicks.toLocaleString()} clicks</div>
    </div>
  `;
  
  return linkEl;
}

function trackClick(linkId) {
  const link = appData.socialLinks.find(l => l.id === linkId);
  if (link) {
    link.clicks++;
    updateAnalytics();
    setTimeout(() => {
      renderSocialLinks();
    }, 100);
  }
}

function addLink() {
  editingLink = null;
  const modal = document.getElementById('linkModal');
  const title = document.getElementById('linkModalTitle');
  
  if (title) title.textContent = 'Add New Link';
  
  document.getElementById('platformName').value = '';
  document.getElementById('platformUrl').value = '';
  document.getElementById('platformIcon').value = '';
  document.getElementById('platformColor').value = '#0077b5';
  
  if (modal) modal.classList.remove('hidden');
}

function editLink(linkId) {
  const link = appData.socialLinks.find(l => l.id === linkId);
  if (link) {
    editingLink = link;
    const modal = document.getElementById('linkModal');
    const title = document.getElementById('linkModalTitle');
    
    if (title) title.textContent = 'Edit Link';
    
    document.getElementById('platformName').value = link.platform;
    document.getElementById('platformUrl').value = link.url;
    document.getElementById('platformIcon').value = link.icon;
    document.getElementById('platformColor').value = link.color;
    
    if (modal) modal.classList.remove('hidden');
  }
}

function deleteLink(linkId) {
  if (confirm('Are you sure you want to delete this link?')) {
    appData.socialLinks = appData.socialLinks.filter(l => l.id !== linkId);
    renderSocialLinks();
    updateAnalytics();
  }
}

function saveLinkForm(event) {
  event.preventDefault();
  
  const formData = {
    platform: document.getElementById('platformName').value,
    url: document.getElementById('platformUrl').value,
    icon: document.getElementById('platformIcon').value,
    color: document.getElementById('platformColor').value
  };
  
  if (editingLink) {
    Object.assign(editingLink, formData);
  } else {
    const newLink = {
      id: Date.now(),
      clicks: 0,
      ...formData
    };
    appData.socialLinks.push(newLink);
  }
  
  renderSocialLinks();
  updateAnalytics();
  closeLinkModal();
}

// Blog Posts Management
function renderBlogPosts(posts = null) {
  const postsContainer = document.getElementById('postsContainer');
  if (!postsContainer) return;
  
  const postsToRender = posts || appData.blogPosts;
  postsContainer.innerHTML = '';
  
  if (postsToRender.length === 0) {
    postsContainer.innerHTML = `
      <div class="no-posts glass-card" style="padding: 2rem; text-align: center; color: var(--theme-text-secondary); grid-column: 1 / -1;">
        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>No posts found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  postsToRender.forEach((post, index) => {
    const postElement = createBlogPostElement(post, index);
    postsContainer.appendChild(postElement);
  });
  
  // Trigger scroll animations for new elements
  setTimeout(() => {
    const newElements = postsContainer.querySelectorAll('.post-card');
    newElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 150);
    });
  }, 200);
}

function createBlogPostElement(post, index) {
  const postEl = document.createElement('div');
  postEl.className = 'post-card';
  postEl.style.animationDelay = `${index * 0.1}s`;
  
  postEl.innerHTML = `
    <div class="post-actions ${isAdminMode ? 'always-visible' : ''}">
      <button class="link-action-btn ripple-btn" onclick="editPost(${post.id});">
        <i class="fas fa-edit"></i>
      </button>
      <button class="link-action-btn ripple-btn" onclick="deletePost(${post.id});">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
    <div class="post-content">
      <div class="post-meta">
        <span class="post-category">${post.category}</span>
        <span class="post-date">${formatDate(post.date)} • ${post.readTime}</span>
      </div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-excerpt">${truncateText(post.content, 150)}</p>
    </div>
  `;
  
  return postEl;
}

function createPost() {
  editingPost = null;
  const modal = document.getElementById('postModal');
  const title = document.getElementById('postModalTitle');
  
  if (title) title.textContent = 'Create New Post';
  
  document.getElementById('postTitle').value = '';
  document.getElementById('postCategory').value = '';
  document.getElementById('postContent').value = '';
  document.getElementById('postImage').value = '';
  
  if (modal) modal.classList.remove('hidden');
}

function editPost(postId) {
  const post = appData.blogPosts.find(p => p.id === postId);
  if (post) {
    editingPost = post;
    const modal = document.getElementById('postModal');
    const title = document.getElementById('postModalTitle');
    
    if (title) title.textContent = 'Edit Post';
    
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postContent').value = post.content;
    document.getElementById('postImage').value = post.image || '';
    
    if (modal) modal.classList.remove('hidden');
  }
}

function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    appData.blogPosts = appData.blogPosts.filter(p => p.id !== postId);
    renderBlogPosts();
  }
}

function savePostForm(event) {
  event.preventDefault();
  
  const formData = {
    title: document.getElementById('postTitle').value,
    category: document.getElementById('postCategory').value,
    content: document.getElementById('postContent').value,
    image: document.getElementById('postImage').value || null
  };
  
  if (editingPost) {
    Object.assign(editingPost, formData);
  } else {
    const newPost = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(formData.content),
      ...formData
    };
    appData.blogPosts.unshift(newPost);
  }
  
  renderBlogPosts();
  closePostModal();
  filterPosts();
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

// Search and Filter
function filterPosts() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (!searchInput || !categoryFilter) return;
  
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  
  let filteredPosts = appData.blogPosts;
  
  if (searchTerm) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  }
  
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
  }
  
  renderBlogPosts(filteredPosts);
}

// Analytics
function updateAnalytics() {
  const totalClicks = appData.socialLinks.reduce((sum, link) => sum + link.clicks, 0);
  const topPlatform = appData.socialLinks.reduce((top, link) => 
    link.clicks > (appData.socialLinks.find(l => l.platform === top)?.clicks || 0) ? link.platform : top, 
    appData.socialLinks[0]?.platform || 'N/A'
  );
  
  appData.analytics.totalClicks = totalClicks;
  appData.analytics.topPlatform = topPlatform;
  
  const totalClicksEl = document.getElementById('totalClicks');
  const monthlyVisitorsEl = document.getElementById('monthlyVisitors');
  const topPlatformEl = document.getElementById('topPlatform');
  const engagementRateEl = document.getElementById('engagementRate');
  
  if (totalClicksEl) totalClicksEl.textContent = totalClicks.toLocaleString();
  if (monthlyVisitorsEl) monthlyVisitorsEl.textContent = appData.analytics.monthlyVisitors.toLocaleString();
  if (topPlatformEl) topPlatformEl.textContent = appData.analytics.topPlatform;
  if (engagementRateEl) engagementRateEl.textContent = appData.analytics.engagementRate;
}

// Event Listeners Setup
function setupEventListeners() {
  // Admin toggle
  const adminToggle = document.getElementById('adminToggle');
  if (adminToggle) {
    adminToggle.addEventListener('click', toggleAdminMode);
  }
  
  // Search and filter
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterPosts, 300));
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterPosts);
  }
  
  // Add buttons
  const addLinkBtn = document.getElementById('addLinkBtn');
  const createPostBtn = document.getElementById('createPostBtn');
  
  if (addLinkBtn) {
    addLinkBtn.addEventListener('click', addLink);
  }
  
  if (createPostBtn) {
    createPostBtn.addEventListener('click', createPost);
  }
  
  // Form submissions
  const linkForm = document.getElementById('linkForm');
  const postForm = document.getElementById('postForm');
  
  if (linkForm) {
    linkForm.addEventListener('submit', saveLinkForm);
  }
  
  if (postForm) {
    postForm.addEventListener('submit', savePostForm);
  }
}

// Modal Handlers
function setupModalHandlers() {
  // Link Modal
  const linkModal = document.getElementById('linkModal');
  const closeLinkModalBtn = document.getElementById('closeLinkModal');
  const cancelLinkFormBtn = document.getElementById('cancelLinkForm');
  
  function closeLinkModal() {
    if (linkModal) linkModal.classList.add('hidden');
    editingLink = null;
  }
  
  if (closeLinkModalBtn) {
    closeLinkModalBtn.addEventListener('click', closeLinkModal);
  }
  
  if (cancelLinkFormBtn) {
    cancelLinkFormBtn.addEventListener('click', closeLinkModal);
  }
  
  if (linkModal) {
    const backdrop = linkModal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeLinkModal);
    }
  }
  
  // Post Modal
  const postModal = document.getElementById('postModal');
  const closePostModalBtn = document.getElementById('closePostModal');
  const cancelPostFormBtn = document.getElementById('cancelPostForm');
  
  function closePostModal() {
    if (postModal) postModal.classList.add('hidden');
    editingPost = null;
  }
  
  if (closePostModalBtn) {
    closePostModalBtn.addEventListener('click', closePostModal);
  }
  
  if (cancelPostFormBtn) {
    cancelPostFormBtn.addEventListener('click', closePostModal);
  }
  
  if (postModal) {
    const backdrop = postModal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closePostModal);
    }
  }
  
  // Escape key to close modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLinkModal();
      closePostModal();
    }
  });
  
  // Make close functions globally accessible
  window.closeLinkModal = closeLinkModal;
  window.closePostModal = closePostModal;
}

// Utility Functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Global functions for HTML onclick handlers
window.editLink = editLink;
window.deleteLink = deleteLink;
window.editPost = editPost;
window.deletePost = deletePost;
window.trackClick = trackClick;

//for right click turned off 
// document.addEventListener('contextmenu', function(event) {
//   event.preventDefault();
// });
