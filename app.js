/**
 * app.js — Portfolio Sergio Anaya Sánchez
 * Handles: i18n (ES/EN), dark/light theme, hamburger menu,
 *          modals + Mermaid, scroll reveal, floating CTA, toast/clipboard.
 */

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

// ─── MERMAID INIT ────────────────────────────────────────────────────────────
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
        primaryColor: '#1e293b',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#38bdf8',
        lineColor: '#38bdf8',
        secondaryColor: '#0f172a',
        tertiaryColor: '#1e293b',
        clusterBkg: '#1e293b',
        clusterBorder: '#38bdf8',
        titleColor: '#f8fafc',
        edgeLabelBackground: '#1e293b',
        fontFamily: 'Inter, sans-serif',
    }
});

// ─── DIAGRAM STRINGS ─────────────────────────────────────────────────────────

const DIAGRAMS = {
    audit: {
        es: `graph TD
  subgraph "👥 Actores Humanos"
    COMERCIAL[👤 Comercial]
    ADMIN[👨‍💼 Admin]
    OPERADOR[🚚 Operador]
    CLIENTE[🏢 Cliente]
    AUDITOR[🔍 Auditor]
  end

  subgraph "🤖 Actores del Sistema"
    LAMBDA[⚡ Lambda]
    SCHEDULER[⏰ Scheduler]
    TRIGGER[🔔 Trigger BD]
  end

  subgraph "🔌 Sistemas Externos"
    PEMEX[🏭 API Proveedores]
    DRIVE[☁️ Google Drive]
    SHEETS[📊 Google Sheets]
    TEXTRACT[🔍 AWS Textract]
  end

  COMERCIAL -->|Opera| LAMBDA
  ADMIN -->|Configura| LAMBDA
  OPERADOR -->|Consulta| SHEETS
  CLIENTE -->|Responde| COMERCIAL
  AUDITOR -->|Revisa logs| ADMIN

  LAMBDA -->|Consume| PEMEX
  LAMBDA -->|Escribe| DRIVE
  LAMBDA -->|Sincroniza| SHEETS
  LAMBDA -->|Extrae datos| TEXTRACT
  LAMBDA -->|Ejecuta| TRIGGER

  SCHEDULER -->|Programa| LAMBDA
  TRIGGER -->|Valida reglas| LAMBDA`,

        en: `graph TD
  subgraph "👥 Human Actors"
    COMERCIAL[👤 Sales Rep]
    ADMIN[👨‍💼 Admin]
    OPERADOR[🚚 Operator]
    CLIENTE[🏢 Client]
    AUDITOR[🔍 Auditor]
  end

  subgraph "🤖 System Actors"
    LAMBDA[⚡ Lambda]
    SCHEDULER[⏰ Scheduler]
    TRIGGER[🔔 DB Trigger]
  end

  subgraph "🔌 External Systems"
    PEMEX[🏭 Vendor API]
    DRIVE[☁️ Google Drive]
    SHEETS[📊 Google Sheets]
    TEXTRACT[🔍 AWS Textract]
  end

  COMERCIAL -->|Operates| LAMBDA
  ADMIN -->|Configures| LAMBDA
  OPERADOR -->|Queries| SHEETS
  CLIENTE -->|Responds to| COMERCIAL
  AUDITOR -->|Reviews logs| ADMIN

  LAMBDA -->|Consumes| PEMEX
  LAMBDA -->|Writes to| DRIVE
  LAMBDA -->|Syncs| SHEETS
  LAMBDA -->|Extracts data| TEXTRACT
  LAMBDA -->|Executes| TRIGGER

  SCHEDULER -->|Schedules| LAMBDA
  TRIGGER -->|Validates rules| LAMBDA`
    },

    arch: {
        es: `graph TD
  subgraph "📥 Fuentes de Datos"
    IOT[🌐 APIs / IoT]
    DBEXT[🗄️ Bases de Datos]
    FILES[📁 Archivos / Logs]
  end

  subgraph "⚙️ Ingesta"
    KAFKA[📨 Message Broker]
    ETL[🔄 Pipeline ETL / ELT]
    BATCH[📦 Batch Jobs]
  end

  subgraph "🔬 Procesamiento"
    STREAM[⚡ Stream Processing]
    TRANSFORM[🔀 Transformaciones]
    FEATURES[🧠 Feature Engineering]
  end

  subgraph "💾 Almacenamiento"
    DW[🏗️ Data Warehouse]
    DL[🌊 Data Lake]
    CACHE[⚡ Cache]
  end

  subgraph "📡 Serving"
    API[🔌 REST API]
    MLAPI[🤖 ML Inference]
    DASH[📊 Dashboards]
  end

  subgraph "🔭 Monitoreo"
    METRICS[📈 Métricas]
    ALERTS[🚨 Alertas]
    LOGS[📝 Logs]
  end

  IOT   --> KAFKA
  DBEXT --> ETL
  FILES --> BATCH

  KAFKA --> STREAM
  ETL   --> TRANSFORM
  BATCH --> TRANSFORM

  STREAM    --> FEATURES
  TRANSFORM --> FEATURES
  FEATURES  --> DW
  FEATURES  --> DL

  DW --> API
  DL --> MLAPI
  CACHE --> API

  API   --> DASH
  MLAPI --> DASH

  DW     --> METRICS
  STREAM --> ALERTS
  API    --> LOGS`,

        en: `graph TD
  subgraph "📥 Data Sources"
    IOT[🌐 APIs / IoT]
    DBEXT[🗄️ Databases]
    FILES[📁 Files / Logs]
  end

  subgraph "⚙️ Ingestion"
    KAFKA[📨 Message Broker]
    ETL[🔄 ETL / ELT Pipeline]
    BATCH[📦 Batch Jobs]
  end

  subgraph "🔬 Processing"
    STREAM[⚡ Stream Processing]
    TRANSFORM[🔀 Transformations]
    FEATURES[🧠 Feature Engineering]
  end

  subgraph "💾 Storage"
    DW[🏗️ Data Warehouse]
    DL[🌊 Data Lake]
    CACHE[⚡ Cache]
  end

  subgraph "📡 Serving"
    API[🔌 REST API]
    MLAPI[🤖 ML Inference]
    DASH[📊 Dashboards]
  end

  subgraph "🔭 Monitoring"
    METRICS[📈 Metrics]
    ALERTS[🚨 Alerts]
    LOGS[📝 Logs]
  end

  IOT   --> KAFKA
  DBEXT --> ETL
  FILES --> BATCH

  KAFKA --> STREAM
  ETL   --> TRANSFORM
  BATCH --> TRANSFORM

  STREAM    --> FEATURES
  TRANSFORM --> FEATURES
  FEATURES  --> DW
  FEATURES  --> DL

  DW --> API
  DL --> MLAPI
  CACHE --> API

  API   --> DASH
  MLAPI --> DASH

  DW     --> METRICS
  STREAM --> ALERTS
  API    --> LOGS`
    },

    causal: {
        es: `graph TB
    subgraph CAPA_USUARIO["👤 Capa de Usuario"]
        APP["App Monitorista (PWA)"]
    end

    subgraph ORQUESTACION["⚙️ Orquestación"]
        N8N["n8n Workflows"]
        WEBHOOK["Webhook Trigger"]
        GMAIL["Gmail API"]
        LAMBDA_MAP["AWS Lambda Maps"]
    end

    subgraph DATA_SOURCES["📡 Fuentes de Datos"]
        SAMSARA["Samsara GPS API"]
        INTRALIX["Varilla Intralix 99.5%"]
        DISPENSADOR["Dispensador Estación"]
    end

    subgraph PERSISTENCIA["💾 Persistencia"]
        AURORA["Aurora PostgreSQL (AWS)"]
        SHEETS["Google Sheets"]
    end

    subgraph ML_ENGINE["🧠 Motor ML"]
        LOGIT["Logit P(falta|features)"]
        KMEANS["K-Means Operadores"]
        HAVERSINE["Motor Haversine"]
    end

    subgraph CAUSAL_ENGINE["🔬 Motor Causal"]
        ATE["ATE — Efecto Global"]
        CATE["CATE — Efectos Heterogéneos"]
        RANKING["Ranking Causal"]
    end

    subgraph DECISION["🎯 Decisión"]
        BANDIT["Thompson Sampling / 90-10"]
    end

    APP --> WEBHOOK
    WEBHOOK --> N8N
    N8N --> SAMSARA
    N8N --> AURORA
    SAMSARA --> HAVERSINE
    AURORA --> HAVERSINE
    HAVERSINE --> LOGIT
    LOGIT --> APP
    LOGIT --> AURORA
    N8N --> GMAIL
    N8N --> LAMBDA_MAP
    INTRALIX --> AURORA
    DISPENSADOR --> AURORA
    AURORA --> KMEANS
    AURORA --> ATE
    ATE --> CATE
    CATE --> RANKING
    RANKING --> BANDIT
    BANDIT --> HAVERSINE
    KMEANS --> APP

    style CAPA_USUARIO fill:#F59E0B,color:#000
    style ORQUESTACION fill:#1E293B,color:#fff
    style DATA_SOURCES fill:#374151,color:#fff
    style PERSISTENCIA fill:#0D9488,color:#fff
    style ML_ENGINE fill:#7C3AED,color:#fff
    style CAUSAL_ENGINE fill:#DC2626,color:#fff
    style DECISION fill:#16A34A,color:#fff`,

        en: `graph TB
    subgraph CAPA_USUARIO["👤 User Layer"]
        APP["Monitor App (PWA)"]
    end

    subgraph ORQUESTACION["⚙️ Orchestration"]
        N8N["n8n Workflows"]
        WEBHOOK["Webhook Trigger"]
        GMAIL["Gmail API"]
        LAMBDA_MAP["AWS Lambda Maps"]
    end

    subgraph DATA_SOURCES["📡 Data Sources"]
        SAMSARA["Samsara GPS API"]
        INTRALIX["Intralix Probe 99.5%"]
        DISPENSADOR["Station Dispenser"]
    end

    subgraph PERSISTENCIA["💾 Persistence"]
        AURORA["Aurora PostgreSQL (AWS)"]
        SHEETS["Google Sheets"]
    end

    subgraph ML_ENGINE["🧠 ML Engine"]
        LOGIT["Logit P(theft|features)"]
        KMEANS["K-Means Operators"]
        HAVERSINE["Haversine Engine"]
    end

    subgraph CAUSAL_ENGINE["🔬 Causal Engine"]
        ATE["ATE — Global Effect"]
        CATE["CATE — Heterogeneous Effects"]
        RANKING["Causal Ranking"]
    end

    subgraph DECISION["🎯 Decision"]
        BANDIT["Thompson Sampling / 90-10"]
    end

    APP --> WEBHOOK
    WEBHOOK --> N8N
    N8N --> SAMSARA
    N8N --> AURORA
    SAMSARA --> HAVERSINE
    AURORA --> HAVERSINE
    HAVERSINE --> LOGIT
    LOGIT --> APP
    LOGIT --> AURORA
    N8N --> GMAIL
    N8N --> LAMBDA_MAP
    INTRALIX --> AURORA
    DISPENSADOR --> AURORA
    AURORA --> KMEANS
    AURORA --> ATE
    ATE --> CATE
    CATE --> RANKING
    RANKING --> BANDIT
    BANDIT --> HAVERSINE
    KMEANS --> APP

    style CAPA_USUARIO fill:#F59E0B,color:#000
    style ORQUESTACION fill:#1E293B,color:#fff
    style DATA_SOURCES fill:#374151,color:#fff
    style PERSISTENCIA fill:#0D9488,color:#fff
    style ML_ENGINE fill:#7C3AED,color:#fff
    style CAUSAL_ENGINE fill:#DC2626,color:#fff
    style DECISION fill:#16A34A,color:#fff`
    }
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
    es: {
        // Nav
        'nav.projects':      'Proyectos',
        'nav.architecture':  'Arquitectura',
        'nav.contact':       'Contacto',
        // Hero
        'hero.badge':        'Abierto a oportunidades',
        'hero.subtitle':     'Científico de Datos | Arquitectura Cloud & Optimización',
        'hero.text':         'Transformando datos complejos en soluciones escalables y valor de negocio tangible.',
        'hero.cta.projects': 'Ver Proyectos',
        'hero.cta.cv':       'Descargar CV',
        'hero.cv.hint':      'PDF — Actualizado 2025',
        // Architecture section
        'arch.title':        'Diseño de Sistemas Complejos',
        'arch.subtitle':     'Arquitecturas de datos y microservicios. Haz clic para ver el diagrama.',
        'arch.btn':          'Ver Diagrama de Sistema',
        // Projects section
        'projects.title':    'Proyectos Destacados',
        'p1.title':          'YSGA-PyRust',
        'p1.tag':            'R&D y Optimización',
        'p1.desc':           'Librería híbrida de metaheurísticas para VRP. Aceleración 50x vs Python puro usando bindings de Rust y paralelismo CUDA.',
        'p1.btn':            'Ver en GitHub',
        'p2.title':          'API Fleet 2.0',
        'p2.tag':            'Logística Analytics & AWS Serverless',
        'p2.desc.html':      '<strong>Visión de Negocio:</strong> Transformación de telemetría vehicular en un producto de valor agregado con trazabilidad total, reduciendo la carga operativa del equipo de monitoreo.<br><br><strong>Implementación:</strong> Arquitectura orientada a eventos para procesar flujos de datos en tiempo real y proporcionar información crítica de las unidades.',
        'p3.title':          'Auditoría Inteligente',
        'p3.tag':            'Automation',
        'p3.desc':           'Ecosistema de automatización documental. Extracción OCR/NLP para auditoría comercial y compliance normativo.',
        'p3.btn':            'Ver Arquitectura',
        'p4.title':          'Causal Fillups',
        'p4.tag':            'Inferencia Causal & ML',
        'p4.desc':           'Sistema que combina RCT, modelo Logit, inferencia causal (ATE/CATE) y Thompson Sampling para reducir robo de diesel en operaciones de flota. Ciclo virtuoso: experimentación → predicción → causalidad → optimización.',
        'p4.btn':            'Ver Arquitectura',
        // Dashboards section
        'dash.title':        'Dashboards & Analytics',
        'dash.subtitle':     'Visualización de KPIs operativos en tiempo real. Stack: SQL, Polars, Looker/Streamlit.',
        'dash.overlay':      'Explorar Dashboards →',
        // Contact section
        'contact.title':     'Conectemos',
        'contact.subtitle':  '¿Interesado en colaborar o discutir sobre datos y arquitectura? Encuéntrame en mis redes.',
        'contact.li':        'Conecta profesionalmente',
        'contact.gh':        'Explora mi código',
        'contact.mail':      'Contáctame directamente',
        // Footer
        'footer.copy':       '© {year} Sergio Anaya Sánchez. Todos los derechos reservados.',
        // Modals
        'modal.audit.title': 'Arquitectura: Auditoría Inteligente',
        'modal.arch.title':  'Pipeline de Datos — Diseño General',
        'modal.causal.title':'Arquitectura: Causal Fillups',
        // Toast
        'toast.email':       'Email copiado al portapapeles',
        // Floating CTA
        'fcta.label':        'Contáctame',
    },
    en: {
        'nav.projects':      'Projects',
        'nav.architecture':  'Architecture',
        'nav.contact':       'Contact',
        'hero.badge':        'Open to opportunities',
        'hero.subtitle':     'Data Scientist | Cloud Architecture & Optimization',
        'hero.text':         'Turning complex data into scalable solutions and tangible business value.',
        'hero.cta.projects': 'View Projects',
        'hero.cta.cv':       'Download CV',
        'hero.cv.hint':      'PDF — Updated 2025',
        'arch.title':        'Complex Systems Design',
        'arch.subtitle':     'Data pipelines and microservices architectures. Click to view the diagram.',
        'arch.btn':          'View System Diagram',
        'projects.title':    'Featured Projects',
        'p1.title':          'YSGA-PyRust',
        'p1.tag':            'R&D & Optimization',
        'p1.desc':           'Hybrid metaheuristics library for VRP. 50x speedup over pure Python using Rust bindings and CUDA parallelism.',
        'p1.btn':            'View on GitHub',
        'p2.title':          'API Fleet 2.0',
        'p2.tag':            'Logistics Analytics & AWS Serverless',
        'p2.desc.html':      '<strong>Business Vision:</strong> Turning vehicle telemetry into a value-added product with full traceability, significantly reducing the operational load of the monitoring team.<br><br><strong>Implementation:</strong> Event-driven architecture to process real-time data streams and provide critical fleet unit information.',
        'p3.title':          'Intelligent Auditing',
        'p3.tag':            'Automation',
        'p3.desc':           'Document automation ecosystem. OCR/NLP extraction for commercial auditing and regulatory compliance.',
        'p3.btn':            'View Architecture',
        'p4.title':          'Causal Fillups',
        'p4.tag':            'Causal Inference & ML',
        'p4.desc':           'System combining RCT, Logit model, causal inference (ATE/CATE), and Thompson Sampling to reduce diesel theft in fleet operations. Virtuous cycle: experimentation → prediction → causality → optimization.',
        'p4.btn':            'View Architecture',
        'dash.title':        'Dashboards & Analytics',
        'dash.subtitle':     'Real-time operational KPI visualization. Stack: SQL, Polars, Looker/Streamlit.',
        'dash.overlay':      'Explore Dashboards →',
        'contact.title':     "Let's Connect",
        'contact.subtitle':  'Interested in collaborating or discussing data and architecture? Find me on my networks.',
        'contact.li':        'Connect professionally',
        'contact.gh':        'Explore my code',
        'contact.mail':      'Contact me directly',
        'footer.copy':       '© {year} Sergio Anaya Sánchez. All rights reserved.',
        'modal.audit.title': 'Architecture: Intelligent Auditing',
        'modal.arch.title':  'Data Pipeline — General Design',
        'modal.causal.title':'Architecture: Causal Fillups',
        'toast.email':       'Email copied to clipboard',
        'fcta.label':        'Contact me',
    }
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let currentLang  = localStorage.getItem('lang')  || 'es';
let currentTheme = localStorage.getItem('theme') || 'dark';

// Map: modalId → diagram key
const MODAL_DIAGRAM_MAP = {
    auditModal:  'audit',
    archModal:   'arch',
    causalModal: 'causal',
};

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    const t = T[lang];

    // Plain text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) {
            const val = t[key].replace('{year}', new Date().getFullYear());
            el.textContent = val;
        }
    });

    // HTML content nodes (bold, br, etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.dataset.i18nHtml;
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        if (t[key] !== undefined) el.title = t[key];
    });

    // Lang toggle button label (show opposite language)
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = lang === 'es' ? 'EN' : 'ES';
    });

    // Update modal titles if they're currently showing
    document.querySelectorAll('.modal[data-modal-key]').forEach(modal => {
        const titleKey = modal.dataset.modalKey;
        const titleEl  = modal.querySelector('h2');
        if (titleEl && t[titleKey]) titleEl.textContent = t[titleKey];
    });
}

// ─── THEME ────────────────────────────────────────────────────────────────────
function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const icon = theme === 'dark' ? 'fa-moon' : 'fa-sun';
    document.querySelectorAll('.theme-toggle i').forEach(i => {
        i.className = `fa-solid ${icon}`;
    });

    // Update mermaid theme and re-render any open modal diagrams
    mermaid.initialize({
        startOnLoad: false,
        theme: theme === 'light' ? 'default' : 'dark',
        securityLevel: 'loose',
        themeVariables: theme === 'light'
            ? { primaryColor: '#e2e8f0', primaryTextColor: '#0f172a', primaryBorderColor: '#0284c7', lineColor: '#0284c7', fontFamily: 'Inter, sans-serif' }
            : { primaryColor: '#1e293b', primaryTextColor: '#f8fafc', primaryBorderColor: '#38bdf8', lineColor: '#38bdf8', clusterBkg: '#1e293b', clusterBorder: '#38bdf8', titleColor: '#f8fafc', edgeLabelBackground: '#1e293b', fontFamily: 'Inter, sans-serif' }
    });
}

// ─── MODAL + MERMAID ──────────────────────────────────────────────────────────
async function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'block';

    const diagramKey  = MODAL_DIAGRAM_MAP[modalId];
    if (!diagramKey) return;

    const mermaidDiv = modal.querySelector('.mermaid');
    if (!mermaidDiv) return;

    const diagramStr = DIAGRAMS[diagramKey][currentLang] || DIAGRAMS[diagramKey]['es'];

    // Reset for re-render
    delete mermaidDiv.dataset.processed;
    mermaidDiv.removeAttribute('data-processed');
    mermaidDiv.innerHTML = diagramStr;

    try {
        await mermaid.run({ nodes: [mermaidDiv] });
    } catch (e) {
        console.error('Mermaid render error:', e);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function initModals() {
    // Open buttons
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal(btn.dataset.openModal);
        });
    });

    // Close × buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            if (modalId) closeModal(modalId);
        });
    });

    // Click outside
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Escape key
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => {
                m.style.display = 'none';
            });
        }
    });
}

// ─── HAMBURGER ────────────────────────────────────────────────────────────────
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navbar    = document.querySelector('.navbar');
    if (!hamburger || !navbar) return;

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.className = navbar.classList.contains('nav-open')
                ? 'fa-solid fa-xmark'
                : 'fa-solid fa-bars';
        }
    });

    // Close on nav link click
    document.querySelectorAll('.nav-links-text a').forEach(a => {
        a.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!navbar.contains(e.target)) {
            navbar.classList.remove('nav-open');
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── FLOATING CTA ─────────────────────────────────────────────────────────────
function initFloatingCTA() {
    const hero = document.querySelector('.hero');
    const cta  = document.getElementById('floatingCta');
    if (!hero || !cta) return;

    const observer = new IntersectionObserver(entries => {
        cta.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0 });

    observer.observe(hero);
}

// ─── TOAST + CLIPBOARD ───────────────────────────────────────────────────────
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.className = 'toast show';
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}

function initMailCopy() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email)
                    .then(showToast)
                    .catch(() => { window.location.href = link.getAttribute('href'); });
            }
        });
    });
}

// ─── COPYRIGHT ────────────────────────────────────────────────────────────────
function initCopyright() {
    document.querySelectorAll('.copyright-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

// ─── BOOTSTRAP ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme (anti-flash is in <head> inline script)
    setTheme(currentTheme);

    // Apply saved language
    setLanguage(currentLang);

    // Wire theme toggles
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    });

    // Wire lang toggles
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    });

    initHamburger();
    initModals();
    initReveal();
    initFloatingCTA();
    initMailCopy();
    initCopyright();
});
