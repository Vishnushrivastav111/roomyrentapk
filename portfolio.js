// Basic interactivity: modal content, smooth scroll, contact form fallback
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // project details
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.btn-mini').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.proj;
      let html = '';
      if(id === 'roomyrent'){
        html = `<h3>RoomyRent</h3>
                <p><strong>Stack:</strong> Android (XML), Firebase, Google Maps API</p>
                <p>A location-based room finding & rental app with authentication & storage on Firebase.</p>
                <p><strong>Highlights:</strong> Map integration, Firebase auth, push notifications (optional).</p>`;
      } else if(id === 'whatsapp'){
        html = `<h3>WhatsApp Clone</h3>
                <p><strong>Stack:</strong> Android, Firebase Realtime DB / Firestore</p>
                <p>A chat app with live updates, quick messages, and message timers.</p>`;
      } else if(id === 'quizapp'){
        html = `<h3>Quiz App</h3>
                <p><strong>Stack:</strong> Spring Boot, MySQL, Spring Security</p>
                <p>Quiz platform with authentication and admin question management.</p>`;
      }
      modalBody.innerHTML = html;
      modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (evt) => {
    if(evt.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // mobile toggle
  const mobileToggle = document.getElementById('mobileToggle');
  mobileToggle.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });
});

// ====== THEME TOGGLE ======
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'light') {
    document.body.classList.add('light');
    toggleBtn.textContent = '🌞';
  } else {
    document.body.classList.remove('light');
    toggleBtn.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    toggleBtn.textContent = isLight ? '🌞' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});


// simple contact form handler with mailto fallback
function handleForm(e){
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const notice = document.getElementById('formNotice');

  if(!name || !email || !message){
    notice.textContent = 'Please fill all fields.';
    return false;
  }

  // Try to open user's mail client
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);
  const mailto = `mailto:vishnushrivastav26072003@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;

  notice.textContent = 'Opening your mail client...';
  return false;
}
