// Initialize interactivity after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme or system preference
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark.matches) {
    // If user prefers light mode by default
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 3. Share Profile Functionality
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Balkis Anton Nurohman | Bio & Links',
        text: 'Balkis Anton Nurohman - Love to build any automations (UiPath | N8N | Python | NodeJS)',
        url: window.location.href
      };

      if (navigator.share && window.isSecureContext) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // If user cancelled, do nothing; otherwise fallback to clipboard
          if (err.name !== 'AbortError') {
            copyToClipboard(window.location.href);
          }
          return;
        }
      }

      copyToClipboard(window.location.href);
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Tautan profil berhasil disalin!');
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showToast('Tautan profil berhasil disalin!');
    } catch (err) {
      showToast('Gagal menyalin tautan');
    }
    document.body.removeChild(textArea);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const linksList = document.querySelector('.links-list');
  if (!linksList) return;

  const linkCard = document.createElement('a');
  linkCard.href = 'https://share.gemini.google/P7BkNszG2FjN';
  linkCard.target = '_blank';
  linkCard.rel = 'noopener noreferrer';
  linkCard.className = 'link-card';
  linkCard.innerHTML = `
    <div class="link-card-left">
      <div class="link-icon-badge badge-philosophy">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
      </div>
      <div class="link-info">
        <div class="link-category">Refleksi & Makna Hidup</div>
        <h3 class="link-title">Kehidupan Sempurna Sang Arsiparis Semesta</h3>
        <div class="link-meta">
          <span class="meta-tag">share.gemini.google</span>
        </div>
      </div>
    </div>
    <div class="link-action">
      <svg class="arrow-link" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
    </div>
  `;
  linksList.appendChild(linkCard);

  const sectionCount = document.querySelector('.section-count');
  if (sectionCount) sectionCount.textContent = '6 tautan';
});
