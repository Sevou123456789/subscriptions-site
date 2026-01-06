let currentLang = 'ar'; // اللغة الافتراضية

// تحميل البيانات من JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    window.siteData = data;
    loadServices();
    updateTexts();
  });

// تحديث النصوص بناءً على اللغة
function updateTexts() {
  const lang = currentLang;
  document.querySelectorAll('[id]').forEach(el => {
    const key = el.id;
    if (window.siteData.texts[key]) {
      el.textContent = window.siteData.texts[key][lang];
    }
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = document.querySelector('title').getAttribute(`data-${lang}`);
}

// تحميل الخدمات
function loadServices() {
  const container = document.getElementById('servicesContainer');
  container.innerHTML = '';
  window.siteData.services.forEach(service => {
    const card = `
      <div class="col-md-3">
        <div class="card">
          <img src="${service.image}" class="card-img-top" alt="${service.name[currentLang]}">
          <div class="card-body">
            <h5 class="card-title">${service.name[currentLang]}</h5>
            <p class="card-text">${service.duration[currentLang]} - ${service.price[currentLang]}</p>
            <button class="btn btn-primary">اشترِ الآن</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// تبديل اللغة
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  document.getElementById('langToggle').textContent = currentLang === 'ar' ? 'EN' : 'AR';
  loadServices();
  updateTexts();
});