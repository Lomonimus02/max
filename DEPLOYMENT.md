# Deployment Guide - Bar & Event Consulting Website

Руководство по развертыванию одностраничного веб-сайта на различных платформах.

## 📋 Предварительная подготовка

Перед деплоем убедитесь, что выполнены следующие шаги:

### 1. Добавлены все изображения
- [ ] `images/hero-bg.jpg` - фоновое изображение для hero секции
- [ ] `images/portfolio/dubai-opera-project.jpg`
- [ ] `images/portfolio/belcanto-project.jpg`
- [ ] `images/portfolio/more-than-home-project.jpg`

### 2. Обновлена контактная информация
- [ ] Номер телефона в секции Contact
- [ ] Email адрес
- [ ] WhatsApp номер
- [ ] Ссылки на социальные сети (Instagram, LinkedIn)
- [ ] Контакты в Footer

### 3. Оптимизированы изображения
```bash
# Используйте онлайн сервисы или CLI инструменты:
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)
# - ImageOptim (Mac)
```

### 4. Настроена форма обратной связи
Выберите один из вариантов:
- Formspree
- EmailJS
- Собственный backend
- CMS интеграция

---

## 🚀 Варианты деплоя

### Вариант 1: Netlify (Рекомендуется)

**Преимущества:**
- Бесплатный SSL сертификат
- Автоматический деплой из Git
- CDN по умолчанию
- Простая настройка форм

**Шаги:**

1. **Создайте аккаунт на Netlify**
   - Перейдите на https://www.netlify.com/
   - Зарегистрируйтесь через GitHub/GitLab/Bitbucket

2. **Подготовьте проект**
   ```bash
   # Создайте Git репозиторий (если еще не создан)
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Загрузите на GitHub**
   ```bash
   # Создайте репозиторий на GitHub
   git remote add origin https://github.com/username/consulting-website.git
   git push -u origin main
   ```

4. **Подключите к Netlify**
   - В Netlify: New site from Git
   - Выберите ваш репозиторий
   - Build settings оставьте пустыми (статический сайт)
   - Deploy site

5. **Настройте форму (Netlify Forms)**
   
   Обновите форму в `index.html`:
   ```html
   <form id="contactForm" name="contact" method="POST" data-netlify="true">
       <input type="hidden" name="form-name" value="contact">
       <!-- остальные поля -->
   </form>
   ```

6. **Настройте домен**
   - Site settings → Domain management
   - Add custom domain
   - Настройте DNS записи у вашего регистратора

---

### Вариант 2: Vercel

**Преимущества:**
- Очень быстрый CDN
- Автоматический деплой
- Бесплатный SSL
- Отличная производительность

**Шаги:**

1. **Установите Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Деплой**
   ```bash
   cd "Consulting Website"
   vercel
   ```

3. **Следуйте инструкциям CLI**
   - Войдите в аккаунт
   - Подтвердите настройки проекта
   - Получите URL

4. **Настройте домен**
   ```bash
   vercel domains add yourdomain.com
   ```

---

### Вариант 3: GitHub Pages

**Преимущества:**
- Бесплатный хостинг
- Интеграция с GitHub
- Простая настройка

**Шаги:**

1. **Создайте репозиторий**
   - Название: `username.github.io` (для основного сайта)
   - Или любое другое название (будет доступен по `username.github.io/repo-name`)

2. **Загрузите файлы**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. **Активируйте GitHub Pages**
   - Settings → Pages
   - Source: main branch
   - Save

4. **Сайт будет доступен через несколько минут**
   - URL: `https://username.github.io/repo-name/`

---

### Вариант 4: Традиционный хостинг (cPanel/FTP)

**Для хостингов типа:**
- Bluehost
- HostGator
- GoDaddy
- Любой shared hosting

**Шаги:**

1. **Подключитесь через FTP**
   - Используйте FileZilla или другой FTP клиент
   - Хост: ftp.yourdomain.com
   - Логин и пароль от хостинга

2. **Загрузите файлы**
   - Подключитесь к папке `public_html` или `www`
   - Загрузите все файлы проекта
   - Сохраните структуру папок

3. **Проверьте права доступа**
   - Папки: 755
   - Файлы: 644

4. **Настройте SSL**
   - В cPanel: SSL/TLS → Install SSL
   - Или используйте Let's Encrypt (бесплатно)

---

### Вариант 5: AWS S3 + CloudFront

**Для масштабируемых проектов**

**Шаги:**

1. **Создайте S3 bucket**
   ```bash
   aws s3 mb s3://your-website-bucket
   ```

2. **Настройте bucket для веб-хостинга**
   - Properties → Static website hosting
   - Index document: index.html

3. **Загрузите файлы**
   ```bash
   aws s3 sync . s3://your-website-bucket --acl public-read
   ```

4. **Настройте CloudFront (CDN)**
   - Создайте CloudFront distribution
   - Origin: ваш S3 bucket
   - Настройте SSL сертификат

---

## 📧 Настройка формы обратной связи

### Вариант 1: Formspree

1. **Зарегистрируйтесь на Formspree**
   - https://formspree.io/

2. **Создайте новую форму**
   - Получите endpoint URL

3. **Обновите JavaScript**
   
   В `js/main.js` замените обработчик формы:
   ```javascript
   contactForm.addEventListener('submit', async function(e) {
       e.preventDefault();
       
       const formData = new FormData(this);
       
       try {
           const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
               method: 'POST',
               body: formData,
               headers: {
                   'Accept': 'application/json'
               }
           });
           
           if (response.ok) {
               showNotification('Thank you! Your message has been sent.', 'success');
               contactForm.reset();
           } else {
               showNotification('Oops! There was a problem.', 'error');
           }
       } catch (error) {
           showNotification('Oops! There was a problem.', 'error');
       }
   });
   ```

### Вариант 2: EmailJS

1. **Зарегистрируйтесь на EmailJS**
   - https://www.emailjs.com/

2. **Настройте email service**
   - Подключите Gmail/Outlook

3. **Создайте email template**

4. **Добавьте SDK**
   
   В `index.html` перед закрывающим `</body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
       emailjs.init('YOUR_PUBLIC_KEY');
   </script>
   ```

5. **Обновите обработчик формы**
   ```javascript
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
       .then(() => {
           showNotification('Message sent successfully!', 'success');
           contactForm.reset();
       }, (error) => {
           showNotification('Failed to send message.', 'error');
       });
   ```

---

## 🔍 SEO настройки после деплоя

### 1. Google Search Console
- Добавьте сайт в Search Console
- Отправьте sitemap (создайте sitemap.xml)
- Проверьте индексацию

### 2. Google Analytics
Добавьте перед закрывающим `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Meta теги для социальных сетей
Добавьте в `<head>`:
```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="Bar & Event Consulting Dubai">
<meta property="og:description" content="Full-cycle consulting for bar and event industry">
<meta property="og:image" content="https://yourdomain.com/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="Bar & Event Consulting Dubai">
<meta property="twitter:description" content="Full-cycle consulting for bar and event industry">
<meta property="twitter:image" content="https://yourdomain.com/images/og-image.jpg">
```

---

## ✅ Чеклист перед запуском

- [ ] Все изображения добавлены и оптимизированы
- [ ] Контактная информация обновлена
- [ ] Форма обратной связи настроена и протестирована
- [ ] SSL сертификат установлен (HTTPS)
- [ ] Сайт протестирован на всех устройствах
- [ ] Проверена скорость загрузки (Google PageSpeed Insights)
- [ ] Настроен Google Analytics
- [ ] Добавлены Open Graph meta теги
- [ ] Создан и отправлен sitemap.xml
- [ ] Проверены все ссылки
- [ ] Протестированы все формы
- [ ] Проверена кроссбраузерность

---

## 🛠 Полезные инструменты

### Тестирование
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Оптимизация изображений
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

### SEO
- **Google Search Console**: https://search.google.com/search-console
- **Ahrefs**: https://ahrefs.com/
- **SEMrush**: https://www.semrush.com/

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все пути к файлам корректны
3. Проверьте, что все файлы загружены на сервер
4. Очистите кэш браузера

---

**Удачного деплоя! 🚀**
