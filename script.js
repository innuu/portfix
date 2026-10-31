document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       PENGATURAN: ISI BAGIAN INI DENGAN DATA ASLIMU
       Kontak yang dikosongkan ('') tidak akan ditampilkan.
       Kalau semua kosong, bagian Kontak disembunyikan.
    ========================================================= */
    const CONFIG = {
        defaultTheme: 'light',                    // 'light' atau 'dark' (gelap lembut)
        email: '',                                // contoh: 'nama@email.com'
        github: 'https://github.com/innuu',       // dari alamat situsmu, cek apakah benar
        linkedin: '',       
        instagram:'wisnu,077',                      // contoh: 'https://linkedin.com/in/username'
        cv: ''                                    // contoh: 'assets/cv.pdf'
    };

    // Ganti dengan proyek aslimu. demo/code/img boleh dikosongkan.
    const projects = [
        {
            title: 'E-Commerce Website',
            tech: 'HTML • CSS • JavaScript',
            desc: { id: 'Platform belanja online dengan tampilan responsif.', en: 'Online store with a responsive interface.' },
            demo: '', code: '', img: ''
        },
        {
            title: 'Company Profile',
            tech: 'Frontend',
            desc: { id: 'Website profil perusahaan dengan animasi halus.', en: 'Company profile website with subtle animations.' },
            demo: '', code: '', img: ''
        },
        {
            title: 'Portfolio Website',
            tech: 'UI • JavaScript',
            desc: { id: 'Website portofolio pribadi dengan efek mengetik.', en: 'Personal portfolio with a typing effect.' },
            demo: '', code: '', img: ''
        }
    ];

    const I18N = {
        id: {
            nav_home: 'Beranda', nav_skills: 'Keahlian', nav_projects: 'Proyek', nav_about: 'Tentang', nav_contact: 'Kontak',
            subtitle: 'Mahasiswa Universitas Dipa Makassar', greet: 'Halo, saya',
            tagline: 'Mahasiswa yang suka membangun aplikasi web dengan JavaScript, dari tampilan sampai server.',
            cta_projects: 'Lihat Proyek', cta_about: 'Tentang Saya',
            skills_title: 'Keahlian', g_front: 'Frontend', g_back: 'Backend dan database', g_tools: 'Alat',
            projects_title: 'Proyek Pilihan', demo: 'Demo', code: 'Kode',
            about_title: 'Tentang Saya',
            about_p1: 'Saya mahasiswa Universitas Dipa Makassar dengan minat besar pada Full-Stack Web Development, terutama dengan JavaScript.',
            about_p2: 'Saya aktif membangun aplikasi web sebagai sarana belajar dan melatih kemampuan problem solving lewat proyek nyata dan kolaborasi. Saya selalu terbuka untuk belajar hal baru dan menjalin kerja sama.',
            contact_title: 'Hubungi Saya', contact_text: 'Tertarik berkolaborasi atau ingin ngobrol? Silakan hubungi saya lewat salah satu kanal berikut.',
            c_email: 'Kirim email', c_github: 'GitHub', c_linkedin: 'LinkedIn', c_cv: 'Unduh CV',
            theme_to_dark: 'Ganti ke tema gelap', theme_to_light: 'Ganti ke tema terang', menu: 'Buka menu'
        },
        en: {
            nav_home: 'Home', nav_skills: 'Skills', nav_projects: 'Projects', nav_about: 'About', nav_contact: 'Contact',
            subtitle: 'Student at Universitas Dipa Makassar', greet: 'Hi, I’m',
            tagline: 'A student who enjoys building web apps with JavaScript, from the interface to the server.',
            cta_projects: 'View Projects', cta_about: 'About Me',
            skills_title: 'Skills', g_front: 'Frontend', g_back: 'Backend and database', g_tools: 'Tools',
            projects_title: 'Selected Projects', demo: 'Demo', code: 'Code',
            about_title: 'About Me',
            about_p1: 'I’m a student at Universitas Dipa Makassar with a strong interest in Full-Stack Web Development, especially with JavaScript.',
            about_p2: 'I actively build web apps to learn and to sharpen my problem-solving through real projects and collaboration. I’m always open to learning new things and working together.',
            contact_title: 'Get in Touch', contact_text: 'Interested in collaborating or just want to chat? Reach me through any of the channels below.',
            c_email: 'Send email', c_github: 'GitHub', c_linkedin: 'LinkedIn', c_cv: 'Download CV',
            theme_to_dark: 'Switch to dark theme', theme_to_light: 'Switch to light theme', menu: 'Open menu'
        }
    };

    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lang = 'id';
    const t = k => I18N[lang][k];
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    };

    /* 1. REVEAL ON SCROLL */
    const reveal = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('visible'); reveal.unobserve(en.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => reveal.observe(el));

    /* 2. PROYEK (satu sumber data) */
    function renderProjects() {
        const list = document.getElementById('project-list');
        list.innerHTML = '';
        projects.forEach(p => {
            const card = document.createElement('article');
            card.className = 'card';
            const media = p.img ? '<img src="' + p.img + '" alt="" loading="lazy">' : p.title.charAt(0);
            const links = (p.demo ? '<a href="' + p.demo + '" target="_blank" rel="noopener">' + t('demo') + '</a>' : '')
                        + (p.code ? '<a href="' + p.code + '" target="_blank" rel="noopener">' + t('code') + '</a>' : '');
            card.innerHTML = '<div class="card-img" aria-hidden="true">' + media + '</div>'
                + '<span class="tag">' + p.tech + '</span><h3>' + p.title + '</h3><p>' + p.desc[lang] + '</p>'
                + (links ? '<div class="card-links">' + links + '</div>' : '');
            list.appendChild(card);
        });
    }

    /* 3. KONTAK (hanya yang terisi) */
    function renderContact() {
        const items = [];
        if (CONFIG.email) items.push(['mailto:' + CONFIG.email, t('c_email'), 'btn-primary', '']);
        if (CONFIG.github) items.push([CONFIG.github, t('c_github'), 'btn-secondary', ' target="_blank" rel="noopener"']);
        if (CONFIG.linkedin) items.push([CONFIG.linkedin, t('c_linkedin'), 'btn-secondary', ' target="_blank" rel="noopener"']);
        if (CONFIG.instagram) items.push(['https://instagram.com/' + CONFIG.instagram.replace('@', ''), 'Instagram', 'btn-secondary', ' target="_blank" rel="noopener"']);
        if (CONFIG.cv) items.push([CONFIG.cv, t('c_cv'), 'btn-secondary', ' download']);
        document.getElementById('contact').hidden = items.length === 0;
        document.getElementById('navContact').hidden = items.length === 0;
        document.getElementById('contact-links').innerHTML =
            items.map(i => '<a class="' + i[2] + '" href="' + i[0] + '"' + i[3] + '>' + i[1] + '</a>').join('');
    }

    /* 4. BAHASA */
    function setLang(l) {
        lang = l;
        root.lang = l;
        document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
        document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
        document.getElementById('menuBtn').setAttribute('aria-label', t('menu'));
        renderProjects(); renderContact(); updateThemeBtn();
        store.set('lang', l);
    }
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

    /* 5. TEMA (terang / gelap lembut) */
    const themeBtn = document.getElementById('themeBtn');
    function updateThemeBtn() {
        const dark = root.dataset.theme === 'dark';
        themeBtn.textContent = dark ? '☀' : '☾';
        themeBtn.setAttribute('aria-label', dark ? t('theme_to_light') : t('theme_to_dark'));
    }
    function setTheme(th) { root.dataset.theme = th; store.set('theme', th); updateThemeBtn(); }
    themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

    /* 6. MENU MOBILE + SMOOTH SCROLL (ditangani CSS) */
    const menu = document.getElementById('menu'), menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', e => {
        if (e.target.closest('a')) { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });

    /* 7. MENU AKTIF SAAT SCROLL */
    const links = [].slice.call(document.querySelectorAll('.nav-links a'));
    const spy = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            links.forEach(a => {
                const on = a.getAttribute('href') === '#' + en.target.id;
                a.classList.toggle('active', on);
                if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('header[id], section[id]').forEach(s => spy.observe(s));

    /* 8. EFEK MENGETIK (statis jika reduced motion) */
    const roles = ['Fullstack Developer', 'Software Engineer', 'UI/UX Designer'];
    const typing = document.querySelector('.typing-text');
    if (typing && !reduce) {
        let r = 0, c = roles[0].length, del = true;
        function tick() {
            const w = roles[r];
            c += del ? -1 : 1;
            typing.textContent = w.slice(0, c);
            let s = del ? 70 : 130;
            if (!del && c === w.length) { del = true; s = 1600; }
            else if (del && c === 0) { del = false; r = (r + 1) % roles.length; s = 350; }
            setTimeout(tick, s);
        }
        setTimeout(tick, 1600); // jeda awal supaya tulisan pertama sempat terbaca
    }

    /* INIT */
    const savedTheme = store.get('theme');
    root.dataset.theme = (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : CONFIG.defaultTheme;
    const savedLang = store.get('lang');
    setLang(savedLang === 'en' ? 'en' : 'id');
});
