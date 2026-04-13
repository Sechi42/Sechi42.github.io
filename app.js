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
    flowchart: { nodeSpacing: 35, rankSpacing: 55, curve: 'basis' },
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
        fontSize: '14px',
    }
});

// ─── DIAGRAM STRINGS ─────────────────────────────────────────────────────────

const DIAGRAMS = {
    audit: {
        es: `graph TD
  subgraph HUMANS["👥 Actores Humanos"]
    COMERCIAL([👤 Comercial])
    ADMIN([👨‍💼 Admin])
    OPERADOR([🚚 Operador])
    CLIENTE([🏢 Cliente])
    AUDITOR([🔍 Auditor])
  end

  subgraph SYSTEM["🤖 Orquestación AWS"]
    SCHEDULER([⏰ EventBridge])
    LAMBDA[⚡ AWS Lambda<br/>— Hub Central —]
    TRIGGER[(🔔 DB Trigger)]
  end

  subgraph EXTERNAL["🔌 Servicios Externos"]
    PEMEX[🏭 API Proveedores]
    TEXTRACT[🔎 AWS Textract<br/>OCR de Facturas]
    DRIVE[☁️ Google Drive]
    SHEETS[📊 Google Sheets]
  end

  CLIENTE     -->|"retroalimenta"| COMERCIAL
  COMERCIAL   -->|"1 · solicita auditoría"| LAMBDA
  ADMIN       -->|"2 · configura reglas"| LAMBDA
  SCHEDULER   -->|"3 · dispara cada hora"| LAMBDA

  LAMBDA      -->|"4 · consulta precios"| PEMEX
  LAMBDA      -->|"5 · extrae texto (OCR)"| TEXTRACT
  LAMBDA      -->|"6 · guarda evidencia"| DRIVE
  LAMBDA      -->|"7 · actualiza reporte"| SHEETS
  LAMBDA      -->|"8 · valida reglas"| TRIGGER
  TRIGGER     -->|"alerta si hay anomalía"| LAMBDA

  OPERADOR    -->|"consulta diario"| SHEETS
  AUDITOR     -->|"revisa logs"| ADMIN

  style HUMANS fill:#F59E0B,color:#000
  style SYSTEM fill:#1E3A5F,color:#fff
  style EXTERNAL fill:#0D9488,color:#fff`,

        en: `graph TD
  subgraph HUMANS["👥 Human Actors"]
    COMERCIAL([👤 Sales Rep])
    ADMIN([👨‍💼 Admin])
    OPERADOR([🚚 Operator])
    CLIENTE([🏢 Client])
    AUDITOR([🔍 Auditor])
  end

  subgraph SYSTEM["🤖 AWS Orchestration"]
    SCHEDULER([⏰ EventBridge])
    LAMBDA[⚡ AWS Lambda<br/>— Central Hub —]
    TRIGGER[(🔔 DB Trigger)]
  end

  subgraph EXTERNAL["🔌 External Services"]
    PEMEX[🏭 Vendor API]
    TEXTRACT[🔎 AWS Textract<br/>Invoice OCR]
    DRIVE[☁️ Google Drive]
    SHEETS[📊 Google Sheets]
  end

  CLIENTE     -->|"feedback"| COMERCIAL
  COMERCIAL   -->|"1 · request audit"| LAMBDA
  ADMIN       -->|"2 · configure rules"| LAMBDA
  SCHEDULER   -->|"3 · trigger hourly"| LAMBDA

  LAMBDA      -->|"4 · fetch prices"| PEMEX
  LAMBDA      -->|"5 · extract text (OCR)"| TEXTRACT
  LAMBDA      -->|"6 · save evidence"| DRIVE
  LAMBDA      -->|"7 · update report"| SHEETS
  LAMBDA      -->|"8 · validate rules"| TRIGGER
  TRIGGER     -->|"alert if anomaly"| LAMBDA

  OPERADOR    -->|"daily review"| SHEETS
  AUDITOR     -->|"check logs"| ADMIN

  style HUMANS fill:#F59E0B,color:#000
  style SYSTEM fill:#1E3A5F,color:#fff
  style EXTERNAL fill:#0D9488,color:#fff`
    },

    arch: {
        es: `graph LR
  subgraph SOURCES["📥 Fuentes"]
    IOT([🌐 APIs / IoT])
    DBEXT([🗄️ Bases de Datos])
    FILES([📁 Archivos / Logs])
  end

  subgraph INGEST["⚙️ Ingesta"]
    KAFKA[📨 Kafka<br/>Message Broker]
    ETL[🔄 Pipeline<br/>ETL / ELT]
    BATCH[📦 Batch Jobs]
  end

  subgraph PROCESS["🔬 Procesamiento"]
    STREAM[⚡ Stream<br/>Processing]
    TRANSFORM[🔀 Transformaciones]
    FEATURES[🧠 Feature<br/>Engineering]
  end

  subgraph STORAGE["💾 Almacenamiento"]
    DW[(🏗️ Redshift<br/>Data Warehouse)]
    DL[(🌊 S3<br/>Data Lake)]
    CACHE[(⚡ Redis<br/>Cache)]
  end

  subgraph SERVING["📡 Consumo"]
    API[🔌 REST API]
    MLAPI[🤖 SageMaker<br/>ML Inference]
    DASH[📊 Dashboards]
  end

  subgraph MONITOR["🔭 Monitoreo"]
    METRICS[📈 CloudWatch<br/>Métricas]
    ALERTS[🚨 Alertas]
    LOGS[📝 Logs]
  end

  IOT   -->|"eventos"| KAFKA
  DBEXT -->|"registros"| ETL
  FILES -->|"lotes"| BATCH

  KAFKA -->|"stream"| STREAM
  ETL   -->|"tablas"| TRANSFORM
  BATCH -->|"tablas"| TRANSFORM

  STREAM    -->|"features"| FEATURES
  TRANSFORM -->|"features"| FEATURES
  FEATURES  -->|"datos limpios"| DW
  FEATURES  -->|"datos raw"| DL

  DW    -->|"consultas"| API
  DL    -->|"modelos"| MLAPI
  CACHE -->|"respuestas rápidas"| API

  API   -->|"visualización"| DASH
  MLAPI -->|"predicciones"| DASH

  DW     -->|"métricas"| METRICS
  STREAM -->|"anomalías"| ALERTS
  API    -->|"trazas"| LOGS

  style SOURCES fill:#374151,color:#fff
  style INGEST  fill:#1E293B,color:#fff
  style PROCESS fill:#7C3AED,color:#fff
  style STORAGE fill:#0D9488,color:#fff
  style SERVING fill:#2563EB,color:#fff
  style MONITOR fill:#DC2626,color:#fff`,

        en: `graph LR
  subgraph SOURCES["📥 Sources"]
    IOT([🌐 APIs / IoT])
    DBEXT([🗄️ Databases])
    FILES([📁 Files / Logs])
  end

  subgraph INGEST["⚙️ Ingestion"]
    KAFKA[📨 Kafka<br/>Message Broker]
    ETL[🔄 ETL / ELT<br/>Pipeline]
    BATCH[📦 Batch Jobs]
  end

  subgraph PROCESS["🔬 Processing"]
    STREAM[⚡ Stream<br/>Processing]
    TRANSFORM[🔀 Transformations]
    FEATURES[🧠 Feature<br/>Engineering]
  end

  subgraph STORAGE["💾 Storage"]
    DW[(🏗️ Redshift<br/>Data Warehouse)]
    DL[(🌊 S3<br/>Data Lake)]
    CACHE[(⚡ Redis<br/>Cache)]
  end

  subgraph SERVING["📡 Serving"]
    API[🔌 REST API]
    MLAPI[🤖 SageMaker<br/>ML Inference]
    DASH[📊 Dashboards]
  end

  subgraph MONITOR["🔭 Monitoring"]
    METRICS[📈 CloudWatch<br/>Metrics]
    ALERTS[🚨 Alerts]
    LOGS[📝 Logs]
  end

  IOT   -->|"events"| KAFKA
  DBEXT -->|"records"| ETL
  FILES -->|"batches"| BATCH

  KAFKA -->|"stream"| STREAM
  ETL   -->|"tables"| TRANSFORM
  BATCH -->|"tables"| TRANSFORM

  STREAM    -->|"features"| FEATURES
  TRANSFORM -->|"features"| FEATURES
  FEATURES  -->|"clean data"| DW
  FEATURES  -->|"raw data"| DL

  DW    -->|"queries"| API
  DL    -->|"models"| MLAPI
  CACHE -->|"fast responses"| API

  API   -->|"visualization"| DASH
  MLAPI -->|"predictions"| DASH

  DW     -->|"metrics"| METRICS
  STREAM -->|"anomalies"| ALERTS
  API    -->|"traces"| LOGS

  style SOURCES fill:#374151,color:#fff
  style INGEST  fill:#1E293B,color:#fff
  style PROCESS fill:#7C3AED,color:#fff
  style STORAGE fill:#0D9488,color:#fff
  style SERVING fill:#2563EB,color:#fff
  style MONITOR fill:#DC2626,color:#fff`
    },

    causal: {
        es: `graph TB
    subgraph USER[CapaUsuario]
        APP[AppMonitoristaPWA]
    end

    subgraph ORCH[Orquestacion]
        WEBHOOK[WebhookTrigger]
        N8N[n8nWorkflow]
        GMAIL[GmailAPI]
        LAMBDA_MAP[AWSLambdaMapaRuta]
    end

    subgraph SOURCES[FuentesDatos]
        SAMSARA[SamsaraGPS]
        INTRALIX[VarillaIntralix]
        DISPENSER[Dispensador]
    end

    subgraph STORE[Persistencia]
        AURORA[(AuroraPostgreSQL)]
        SHEETS[GoogleSheets]
    end

    subgraph ML[MotorML]
        HAVERSINE[MotorHaversine]
        LOGIT[Logit]
        KMEANS[KMeans]
    end

    subgraph CAUSAL[MotorCausal]
        ATE[ATE]
        CATE[CATE]
        RANKING[RankingCausal]
    end

    subgraph DECISION[Decision]
        BANDIT[ThompsonSampling]
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
    DISPENSER --> AURORA
    AURORA --> KMEANS
    KMEANS --> APP
    AURORA --> ATE
    ATE --> CATE
    CATE --> RANKING
    RANKING --> BANDIT
    BANDIT --> HAVERSINE
    AURORA --> SHEETS

    style USER fill:#F59E0B,color:#000
    style ORCH fill:#1E293B,color:#fff
    style SOURCES fill:#374151,color:#fff
    style STORE fill:#0D9488,color:#fff
    style ML fill:#7C3AED,color:#fff
    style CAUSAL fill:#DC2626,color:#fff
    style DECISION fill:#16A34A,color:#fff`,

        en: `graph TB
    subgraph USER[UserLayer]
        APP[MonitorAppPWA]
    end

    subgraph ORCH[Orchestration]
        WEBHOOK[WebhookTrigger]
        N8N[n8nWorkflow]
        GMAIL[GmailAPI]
        LAMBDA_MAP[AWSLambdaRouteMap]
    end

    subgraph SOURCES[DataSources]
        SAMSARA[SamsaraGPS]
        INTRALIX[IntralixProbe]
        DISPENSER[Dispenser]
    end

    subgraph STORE[Storage]
        AURORA[(AuroraPostgreSQL)]
        SHEETS[GoogleSheets]
    end

    subgraph ML[MLEngine]
        HAVERSINE[HaversineEngine]
        LOGIT[Logit]
        KMEANS[KMeans]
    end

    subgraph CAUSAL[CausalEngine]
        ATE[ATE]
        CATE[CATE]
        RANKING[CausalRanking]
    end

    subgraph DECISION[Decision]
        BANDIT[ThompsonSampling]
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
    DISPENSER --> AURORA
    AURORA --> KMEANS
    KMEANS --> APP
    AURORA --> ATE
    ATE --> CATE
    CATE --> RANKING
    RANKING --> BANDIT
    BANDIT --> HAVERSINE
    AURORA --> SHEETS

    style USER fill:#F59E0B,color:#000
    style ORCH fill:#1E293B,color:#fff
    style SOURCES fill:#374151,color:#fff
    style STORE fill:#0D9488,color:#fff
    style ML fill:#7C3AED,color:#fff
    style CAUSAL fill:#DC2626,color:#fff
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
        'modal.causal.title':      'Arquitectura: Causal Fillups',
        'modal.causal.tab.diagram':'Diagrama',
        'modal.causal.tab.image':  'Imagen Detallada',
        // Project featured badge
        'p4.featured':       'Proyecto Destacado',
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
        'modal.causal.title':      'Architecture: Causal Fillups',
        'modal.causal.tab.diagram':'Diagram',
        'modal.causal.tab.image':  'Detailed Image',
        'p4.featured':       'Featured Project',
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
        flowchart: { nodeSpacing: 35, rankSpacing: 55, curve: 'basis' },
        themeVariables: theme === 'light'
            ? { primaryColor: '#e2e8f0', primaryTextColor: '#0f172a', primaryBorderColor: '#0284c7', lineColor: '#0284c7', fontFamily: 'Inter, sans-serif', fontSize: '14px' }
            : { primaryColor: '#1e293b', primaryTextColor: '#f8fafc', primaryBorderColor: '#38bdf8', lineColor: '#38bdf8', clusterBkg: '#1e293b', clusterBorder: '#38bdf8', titleColor: '#f8fafc', edgeLabelBackground: '#1e293b', fontFamily: 'Inter, sans-serif', fontSize: '14px' }
    });
}

// ─── MODAL + MERMAID ──────────────────────────────────────────────────────────
async function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'block';

    // Reset tabs to "diagram" if modal has tabs
    const tabs = modal.querySelectorAll('.modal-tab');
    if (tabs.length) {
        tabs.forEach(t => t.classList.remove('active'));
        const firstTab = modal.querySelector('[data-tab="diagram"]');
        if (firstTab) firstTab.classList.add('active');
        modal.querySelectorAll('.modal-tab-content').forEach(c => {
            c.style.display = c.dataset.content === 'diagram' ? '' : 'none';
        });
    }

    const diagramKey  = MODAL_DIAGRAM_MAP[modalId];
    if (!diagramKey) return;

    // Find the mermaid div (may be inside a tab-content wrapper)
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

    // Modal tabs (e.g. causalModal diagram/image switch)
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const modal   = tab.closest('.modal-content').parentElement;
            const tabName = tab.dataset.tab;

            // Toggle active class
            modal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide content panels
            modal.querySelectorAll('.modal-tab-content').forEach(panel => {
                panel.style.display = panel.dataset.content === tabName ? '' : 'none';
            });
        });
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
