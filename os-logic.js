/**
 * FR-OS PORTFOLIO — os-logic.js
 * Window manager, terminal, drag, matrix transition,
 * particles, clock, form submission, data rendering.
 * No email address lives here — all config is in config.js.
 */
(function () {
  'use strict';

  /* ── Wait for DOM ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  /* ── State ──────────────────────────────────────────────── */
  var zTop   = 20;
  var opened = {};          // name → bool
  var DRAG   = { el:null, ox:0, oy:0 };
  var TD     = { el:null, ox:0, oy:0 };
  var mxRAF  = null;

  /* Default window positions (% of desktop, resolved on first open) */
  var POS = {
    terminal: { x:22,  y:12 }, about:   { x:50,  y:20 },
    skills:   { x:78,  y:30 }, projects:{ x:36,  y:16 },
    tools:    { x:58,  y:22 }, research:{ x:44,  y:14 },
    certs:    { x:66,  y:24 }, soft:    { x:82,  y:18 },
    contact:  { x:52,  y:28 }, hire:    { x:90,  y:30 },
    updates:  { x:64,  y:18 },
  };

  /* ── Boot ────────────────────────────────────────────────── */
  var BOOT_MSGS = [
    '[ OK ] Loading kernel modules...',
    '[ OK ] Mounting encrypted filesystem...',
    '[ OK ] Initialising network interfaces...',
    '[ OK ] Starting security daemons...',
    '[ OK ] Loading AI / ML modules...',
    '[ OK ] Spawning desktop environment...',
    '[ OK ] Welcome, ' + (window.CFG ? window.CFG.name : 'Fatima Rehman') + ' \u2713',
  ];
  var _bi = 0;
  var _bIv = setInterval(function () {
    if (_bi >= BOOT_MSGS.length) { clearInterval(_bIv); setTimeout(finishBoot, 350); return; }
    var ln = document.createElement('div');
    ln.className = 'boot-line';
    ln.style.color = _bi === BOOT_MSGS.length - 1 ? 'var(--cyan)' : 'var(--green)';
    ln.textContent = BOOT_MSGS[_bi];
    var logEl = document.getElementById('boot-log');
    if (logEl) logEl.appendChild(ln);
    var fill = document.getElementById('boot-fill');
    if (fill) fill.style.width = ((_bi + 1) / BOOT_MSGS.length * 100) + '%';
    _bi++;
  }, 220);

  function finishBoot() {
    var boot = document.getElementById('boot');
    if (boot) boot.classList.add('gone');
    startParticles();
    renderAll();
    initTerminal();
    checkPaperLink();
    setTimeout(function () { openWin('terminal'); }, 200);
    setTimeout(function () { openWin('about');    }, 450);
  }

  /* ── Render data from config.js ─────────────────────────── */
  function renderAll() {
    if (!window.CFG) return;
    renderProjects();
    renderTools();
    renderCerts();
    renderSoftSkills();
    renderUpdates();
  }

  function renderProjects() {
    var el = document.getElementById('projects-list');
    if (!el || !CFG.projects) return;
    el.innerHTML = CFG.projects.map(function (p) {
      var badgeClass = 'pb-' + p.color;
      var links = '';
      if (p.github) links += '<a href="' + p.github + '" target="_blank" rel="noopener" class="plink">GitHub &nearr;</a>';
      if (p.live)   links += '<a href="' + p.live   + '" target="_blank" rel="noopener" class="plink">Live &nearr;</a>';
      return '<article class="proj-card">' +
        '<span class="proj-badge ' + badgeClass + '">' + esc(p.badge) + '</span>' +
        '<div class="proj-title">' + esc(p.title) + '</div>' +
        '<div class="proj-desc">'  + esc(p.desc)  + '</div>' +
        '<div class="proj-tags">'  + p.tech.map(function(t){ return '<span class="tag tc">' + esc(t) + '</span>'; }).join('') + '</div>' +
        (p.award ? '<div class="proj-award">' + esc(p.award) + '</div>' : '') +
        (links ? '<div class="proj-links">' + links + '</div>' : '') +
        '</article>';
    }).join('');
  }

  function renderTools() {
    var el = document.getElementById('tools-grid');
    if (!el || !CFG.tools) return;
    el.innerHTML = CFG.tools.map(function (t) {
      return '<div class="tool">' +
        '<div class="tool-abbr">' + esc(t.abbr) + '</div>' +
        '<div class="tool-name">' + esc(t.name) + '</div>' +
        '</div>';
    }).join('');
  }

  function renderCerts() {
    var el = document.getElementById('certs-list');
    if (!el || !CFG.certs) return;
    var sections = [];
    CFG.certs.forEach(function (c) { if (sections.indexOf(c.section) < 0) sections.push(c.section); });
    el.innerHTML = sections.map(function (sec) {
      var rows = CFG.certs.filter(function (c) { return c.section === sec; });
      return '<div class="cert-sec">' + esc(sec) + '</div>' +
        rows.map(function (c) {
          var icoClass = c.status === 'done' ? 'ci-done' : c.status === 'progress' ? 'ci-prog' : 'ci-plan';
          var icoText  = c.status === 'done' ? '&#10003;' : c.status === 'progress' ? '&#10227;' : '&#9675;';
          var bdgClass = c.status === 'done' ? 'cb-done' : c.status === 'progress' ? 'cb-prog' : 'cb-plan';
          var bdgText  = c.status === 'done' ? esc(c.date) : c.status === 'progress' ? 'IN PROGRESS' : 'PLANNED';
          var orgStr   = esc(c.org) + (c.credId ? ' &middot; ID: ' + esc(c.credId) : '');
          var linkHtml = c.link ? '<a href="' + c.link + '" target="_blank" rel="noopener" class="cert-link" aria-label="View credential">&nearr;</a>' : '';
          return '<div class="cert-row">' +
            '<div class="cert-ico ' + icoClass + '">' + icoText + '</div>' +
            '<div class="cert-info"><div class="cert-name">' + esc(c.name) + '</div><div class="cert-org">' + orgStr + '</div></div>' +
            '<div class="cert-right"><span class="cbadge ' + bdgClass + '">' + bdgText + '</span>' + linkHtml + '</div>' +
            '</div>';
        }).join('');
    }).join('');
  }

  function renderSoftSkills() {
    var el = document.getElementById('soft-grid');
    if (!el || !CFG.softSkills) return;
    el.innerHTML = CFG.softSkills.map(function (s) {
      return '<div class="ss-card ss-' + s.color + '">' +
        '<div class="ss-title">' + esc(s.title) + '</div>' +
        '<div class="ss-desc">'  + esc(s.desc)  + '</div>' +
        '<div class="ss-proof">&#8627; ' + esc(s.proof) + '</div>' +
        '</div>';
    }).join('');
  }

  function renderUpdates() {
    var el = document.getElementById('updates-list');
    if (!el || !CFG.updates) return;
    var tagMap = { PORTFOLIO:'ut-port', RESEARCH:'ut-res', CERT:'ut-cert', INTERNSHIP:'ut-int', AWARD:'ut-aw' };
    el.innerHTML = CFG.updates.map(function (u) {
      var cls = tagMap[u.tag] || 'ut-port';
      return '<div class="upd-item">' +
        '<div class="upd-meta"><span class="upd-date">' + esc(u.date) + '</span><span class="upd-tag ' + cls + '">' + esc(u.tag) + '</span></div>' +
        '<div class="upd-title">' + esc(u.title) + '</div>' +
        '<div class="upd-desc">'  + esc(u.desc)  + '</div>' +
        '</div>';
    }).join('');
  }

  /* ── Paper link ─────────────────────────────────────────── */
  function checkPaperLink() {
    if (!CFG || !CFG.PAPER_LINK) return;
    var wrap = document.getElementById('paper-link-wrap');
    var link = document.getElementById('paper-link');
    if (wrap && link) { link.href = CFG.PAPER_LINK; wrap.style.display = 'block'; }
  }

  /* ── Window management ──────────────────────────────────── */
  function openWin(name) {
    var w = document.getElementById('win-' + name);
    if (!w) return;
    if (!opened[name]) {
      var desk = document.getElementById('desktop');
      var mw = desk ? desk.offsetWidth  : 600;
      var mh = desk ? desk.offsetHeight : 400;
      var p  = POS[name] || { x:50, y:20 };
      w.style.left = Math.min(p.x, mw - 60) + 'px';
      w.style.top  = Math.min(p.y, mh - 60) + 'px';
    }
    bringFront(w);
    opened[name] = true;
    dotOn(name);
    popIn(w);
    if (name === 'skills') animBars();
  }

  function closeWin(name) {
    var w = document.getElementById('win-' + name);
    if (!w) return;
    popOut(w, function () { opened[name] = false; });
    dotOff(name);
  }

  function toggleWin(name) {
    opened[name] ? closeWin(name) : openWin(name);
  }

  function bringFront(w) {
    document.querySelectorAll('.win').forEach(function (x) { x.classList.remove('active'); });
    w.classList.add('active');
    w.style.zIndex = ++zTop;
  }

  /* ── Pop animations ─────────────────────────────────────── */
  function popIn(w) {
    w.style.display = 'flex';
    w.style.transition = 'opacity .2s cubic-bezier(.34,1.56,.64,1), transform .2s cubic-bezier(.34,1.56,.64,1)';
    w.style.opacity = '0';
    w.style.transform = 'scale(0.92) translateY(8px)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        w.style.opacity = '1';
        w.style.transform = 'scale(1) translateY(0)';
      });
    });
  }
  function popOut(w, cb) {
    w.style.transition = 'opacity .15s ease, transform .15s ease';
    w.style.opacity = '0';
    w.style.transform = 'scale(0.95) translateY(4px)';
    setTimeout(function() {
      w.style.display = 'none';
      cb();
    }, 160);
  }

  /* ── Skill bar animation ────────────────────────────────── */
  function animBars() {
    document.querySelectorAll('.sk-fill[data-w]').forEach(function (b) {
      b.style.width = '0';
      setTimeout(function () { b.style.width = b.dataset.w + '%'; }, 40);
    });
  }

  /* ── Dock dots ──────────────────────────────────────────── */
  function dotOn(name) {
    var btn = document.querySelector('.dk[data-win="' + name + '"]');
    if (btn && !btn.querySelector('.dk-dot')) {
      var d = document.createElement('span'); d.className = 'dk-dot'; d.setAttribute('aria-hidden','true');
      btn.appendChild(d);
    }
  }
  function dotOff(name) {
    var btn = document.querySelector('.dk[data-win="' + name + '"]');
    if (btn) { var d = btn.querySelector('.dk-dot'); if (d) d.remove(); }
  }

  /* ── Drag (mouse) ───────────────────────────────────────── */
  function startDrag(e, w) {
    if (e.target.classList.contains('wb')) return;
    DRAG.el = w; DRAG.ox = e.clientX - w.offsetLeft; DRAG.oy = e.clientY - w.offsetTop;
    bringFront(w); e.preventDefault();
  }
  document.addEventListener('mousemove', function (e) {
    if (!DRAG.el) return;
    var d  = document.getElementById('desktop');
    var r  = d ? d.getBoundingClientRect() : { left:0, top:0, width:window.innerWidth, height:window.innerHeight };
    var nx = Math.max(0, Math.min(e.clientX - DRAG.ox, r.width  - DRAG.el.offsetWidth));
    var ny = Math.max(0, Math.min(e.clientY - DRAG.oy, r.height - DRAG.el.offsetHeight));
    DRAG.el.style.left = nx + 'px'; DRAG.el.style.top = ny + 'px';
    var nm = DRAG.el.id.replace('win-',''); if (POS[nm]) POS[nm] = { x:nx, y:ny };
  });
  document.addEventListener('mouseup', function () { DRAG.el = null; });

  /* ── Drag (touch) ───────────────────────────────────────── */
  document.addEventListener('touchstart', function (e) {
    var bar = e.target.closest && e.target.closest('.wbar'); if (!bar) return;
    var w = bar.closest('.win'); if (!w) return;
    var t = e.touches[0]; TD.el = w; TD.ox = t.clientX - w.offsetLeft; TD.oy = t.clientY - w.offsetTop;
    bringFront(w);
  }, { passive:true });
  document.addEventListener('touchmove', function (e) {
    if (!TD.el) return;
    var t = e.touches[0];
    var d = document.getElementById('desktop');
    var r = d ? d.getBoundingClientRect() : { left:0, top:0, width:window.innerWidth, height:window.innerHeight };
    TD.el.style.left = Math.max(0, Math.min(t.clientX - TD.ox, r.width  - TD.el.offsetWidth))  + 'px';
    TD.el.style.top  = Math.max(0, Math.min(t.clientY - TD.oy, r.height - TD.el.offsetHeight)) + 'px';
    e.preventDefault();
  }, { passive:false });
  document.addEventListener('touchend', function () { TD.el = null; });

  /* ── Matrix flash — one reused canvas, no DOM injection loop */
  function matrixFlash() {
    var c = document.getElementById('mx-canvas');
    if (!c) return;
    c.style.opacity = '1'; c.width = window.innerWidth; c.height = window.innerHeight;
    var ctx  = c.getContext('2d');
    var cols = Math.floor(c.width / 14);
    var drops = new Array(cols).fill(0);
    var CH = '01\u30A2\u30A4\u30A6\u30AB\u30AD\u30AF\u30B5\u30B7\u30B9\u30BF\u30C1\u30C6\u30C8\u30CA';
    var frame = 0; if (mxRAF) cancelAnimationFrame(mxRAF);
    (function draw() {
      ctx.fillStyle = 'rgba(2,5,14,.26)'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#00C8FF'; ctx.font = '11px JetBrains Mono, monospace';
      drops.forEach(function (y, i) {
        ctx.fillText(CH[Math.floor(Math.random() * CH.length)], i * 14, y * 14);
        if (y * 14 > c.height && Math.random() > .97) drops[i] = 0; drops[i]++;
      });
      if (++frame < 14) mxRAF = requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, c.width, c.height); c.style.opacity = '0'; }
    })();
  }

  /* ── Terminal ────────────────────────────────────────────── */
  function initTerminal() {
    tLine('sys', 'FR-OS Terminal v3.0');
    tLine('sys', 'Type  help  for available commands.\n');
  }

  function tLine(type, txt) {
    var out = document.getElementById('term-out'); if (!out) return;
    var div = document.createElement('div'); div.style.marginBottom = '2px';
    if (type === 'cmd') {
      div.innerHTML = '<span class="t-ps">fr@kali:~$</span> <span class="t-cmd">' + esc(txt) + '</span>';
    } else if (type === 'err') {
      div.innerHTML = '<span class="t-err">' + esc(txt) + '</span>';
    } else if (type === 'sys') {
      div.innerHTML = '<span class="t-sys">' + esc(txt) + '</span>';
    } else {
      /* 'out' — preserve whitespace, linkify github */
      var pre = document.createElement('pre'); pre.className = 't-out'; pre.textContent = txt;
      if (txt.indexOf('github.com/fatima-rehman') > -1) {
        pre.innerHTML = txt.replace('github.com/fatima-rehman',
          '<a href="https://github.com/fatima-rehman" target="_blank" rel="noopener">github.com/fatima-rehman</a>');
      }
      div.appendChild(pre);
    }
    out.appendChild(div); out.scrollTop = out.scrollHeight;
  }

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function runCmd(raw) {
    var cmd = raw.trim().toLowerCase();
    tLine('cmd', raw.trim());
    if (cmd === 'clear') { var o = document.getElementById('term-out'); if (o) o.innerHTML = ''; return; }
    if (cmd === 'github')   { tLine('out','Opening GitHub...');   setTimeout(function(){ window.open(CFG.github,   '_blank'); }, 300); return; }
    if (cmd === 'linkedin') { tLine('out','Opening LinkedIn...'); setTimeout(function(){ window.open(CFG.linkedin, '_blank'); }, 300); return; }
    if (cmd === 'hire')     { tLine('out','Opening hire form...');setTimeout(function(){ openWin('hire');            }, 300); return; }
    var cmds = CFG && CFG.termCommands ? CFG.termCommands : {};
    if (cmds[cmd]) { tLine('out', cmds[cmd]); }
    else { tLine('err', 'command not found: ' + raw.trim() + '. Type  help'); }
  }

  /* ── Form submission via Web3Forms ──────────────────────── */
  /* Your email never appears in source code.
     Web3Forms maps your access key → your inbox server-side. */
  function submitForm(fields, statusId, btnId, extraSubject) {
    var st  = document.getElementById(statusId);
    var btn = document.getElementById(btnId);
    if (st)  { st.textContent = ''; st.className = 'f-status'; }
    if (!fields.name || !fields.email) {
      if (st) { st.className = 'f-status f-err'; st.textContent = 'Name and email are required.'; }
      return;
    }
    if (!fields.email.includes('@')) {
      if (st) { st.className = 'f-status f-err'; st.textContent = 'Invalid email address.'; }
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = 'SENDING...'; }

    var key = CFG && CFG.FORM_KEY ? CFG.FORM_KEY : '';
    if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      /* Graceful fallback if key not yet configured */
      if (st)  { st.className = 'f-status f-err'; st.textContent = 'Form not yet configured — email via LinkedIn.'; }
      if (btn) { btn.disabled = false; btn.textContent = extraSubject ? 'SUBMIT OPPORTUNITY' : 'SEND MESSAGE'; }
      return;
    }

    var payload = Object.assign({ access_key: key }, fields);
    if (extraSubject) payload.subject = extraSubject;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.success) {
        if (st) { st.className = 'f-status f-ok'; st.textContent = '\u2713 Sent! I will reply to ' + fields.email; }
        /* clear inputs */
        ['cName','cEmail','cMsg','cComp','hCo','hRole','hEmail','hDet'].forEach(function (id) {
          var el = document.getElementById(id); if (el) el.value = '';
        });
      } else { throw new Error(d.message || 'Submission failed'); }
    })
    .catch(function (err) {
      if (st) { st.className = 'f-status f-err'; st.textContent = 'Error: ' + err.message + '. Reach me via LinkedIn.'; }
    })
    .finally(function () {
      if (btn) { btn.disabled = false; btn.textContent = extraSubject ? 'SUBMIT OPPORTUNITY' : 'SEND MESSAGE'; }
    });
  }

  /* Public submit handlers called from HTML onclick */
  window.sendContact = function () {
    submitForm({
      name:    (document.getElementById('cName')  || {}).value || '',
      email:   (document.getElementById('cEmail') || {}).value || '',
      message: (document.getElementById('cMsg')   || {}).value || '',
    }, 'cf-status', 'cf-btn', '');
  };

  window.sendHire = function () {
    var co   = ((document.getElementById('hCo')    || {}).value || '').trim();
    var role = ((document.getElementById('hRole')  || {}).value || '').trim();
    submitForm({
      name:    co,
      email:   (document.getElementById('hEmail') || {}).value || '',
      message: (document.getElementById('hDet')   || {}).value || '',
      company: co,
      role:    role,
    }, 'h-status', 'h-btn', 'HIRE REQUEST: ' + role + ' @ ' + co);
  };

  /* ── Particles ───────────────────────────────────────────── */
  function startParticles() {
    var c = document.getElementById('particles'); if (!c) return;
    var ctx = c.getContext('2d');
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    var PAL = ['0,200,255','139,92,246','16,240,128','255,140,0'];
    var pts = Array.from({ length:80 }, function () {
      return { x:Math.random()*c.width, y:Math.random()*c.height, r:Math.random()*1.1+.2,
               vx:(Math.random()-.5)*.2, vy:(Math.random()-.5)*.2,
               a:Math.random()*.28+.04, col:PAL[Math.floor(Math.random()*PAL.length)] };
    });
    (function loop() {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width || p.y < 0 || p.y > c.height) { p.x = Math.random()*c.width; p.y = Math.random()*c.height; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(' + p.col + ',' + p.a + ')'; ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ── Clock ───────────────────────────────────────────────── */
  function tick() {
    var d = new Date(); var el = document.getElementById('clock');
    if (el) el.textContent =
      String(d.getHours()).padStart(2,'0') + ':' +
      String(d.getMinutes()).padStart(2,'0') + ':' +
      String(d.getSeconds()).padStart(2,'0');
  }
  tick(); setInterval(tick, 1000);

  /* ── Bind events ─────────────────────────────────────────── */
  function init() {

    /* Set wallpaper from uploaded image or fallback CSS */
    var wp = document.querySelector('.wallpaper');
    if (wp && window.CFG && CFG.wallpaperB64) {
      wp.style.backgroundImage = 'url(' + CFG.wallpaperB64 + ')';
    }

    /* All data-win buttons trigger matrix flash + toggleWin */
    document.querySelectorAll('[data-win]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        matrixFlash();
        setTimeout(function () { toggleWin(btn.getAttribute('data-win')); }, 90);
      });
    });

    /* Window control buttons */
    document.querySelectorAll('[data-close]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation(); closeWin(btn.getAttribute('data-close'));
      });
    });
    document.querySelectorAll('[data-min]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation(); closeWin(btn.getAttribute('data-min'));
      });
    });
    document.querySelectorAll('[data-max]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var w = btn.closest('.win'); if (w) w.classList.toggle('maxed');
      });
    });

    /* Drag via titlebar */
    document.querySelectorAll('.wbar').forEach(function (bar) {
      bar.addEventListener('mousedown', function (e) {
        var w = bar.closest('.win'); if (w) startDrag(e, w);
      });
    });

    /* Focus on click */
    document.querySelectorAll('.win').forEach(function (w) {
      w.addEventListener('mousedown', function () { bringFront(w); });
    });

    /* Terminal input */
    var tIn = document.getElementById('term-in');
    if (tIn) {
      tIn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && tIn.value.trim()) { runCmd(tIn.value); tIn.value = ''; }
      });
    }

    /* Topbar nav */
    document.querySelectorAll('.tb-nav button[data-win]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        matrixFlash();
        setTimeout(function () { toggleWin(btn.getAttribute('data-win')); }, 90);
      });
    });

    /* Keyboard shortcuts */
    document.addEventListener('keydown', function (e) {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'Escape') { document.querySelectorAll('.win').forEach(function(w){ w.classList.remove('maxed'); }); return; }
      var map = { t:'terminal', a:'about', p:'projects', s:'skills', r:'research', c:'contact' };
      if (map[e.key]) { e.preventDefault(); toggleWin(map[e.key]); }
    });

    /* Reposition on resize */
    window.addEventListener('resize', function () {
      document.querySelectorAll('.win').forEach(function (w) {
        var desk = document.getElementById('desktop'); if (!desk) return;
        var nx = Math.min(parseInt(w.style.left)||0, desk.offsetWidth  - w.offsetWidth);
        var ny = Math.min(parseInt(w.style.top )||0, desk.offsetHeight - w.offsetHeight);
        w.style.left = Math.max(0, nx) + 'px';
        w.style.top  = Math.max(0, ny) + 'px';
      });
    });
  }

})();
