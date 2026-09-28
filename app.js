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
        'nav.profile':       'Trayectoria',
        'nav.menu.open':     'Abrir menú',
        'nav.menu.close':    'Cerrar menú',
        // Hero
        'hero.badge':        'Abierto a oportunidades',
        'hero.subtitle':     'Científico de Datos | Arquitectura Cloud & Optimización',
        'hero.text':         'Transformando datos complejos en soluciones escalables y valor de negocio tangible.',
        'hero.cta.projects': 'Ver Proyectos',
        'hero.cta.cv':       'Descargar CV',
        'hero.cv.hint':      'PDF — Actualizado 2025',
        // Career story section (index.html)
        'profile.title':          'Trayectoria profesional',
        'profile.lead':           'Formación en nanotecnología y método científico, hoy aplicada a decisiones de negocio: convertir datos dispersos en decisiones verificables.',
        'profile.timeline.label': 'Experiencia profesional, del rol más reciente al más antiguo',
        'profile.domains.label':  'Áreas de práctica del rol actual',
        'profile.current':        'Rol actual',
        'profile.date.jul2026':   'Jul 2026',
        'profile.date.present':   'Presente',
        'profile.date.dec2024':   'Dic 2024',
        'profile.date.nov2024':   'Nov 2024',
        'profile.date.dec2025':   'Dic 2025',
        'profile.date.aug2023':   'Ago 2023',
        'profile.date.jan2024':   'Ene 2024',
        'profile.role.finvivir':  'Científico de Datos',
        'profile.role.topete':    'Científico de Datos Jr.',
        'profile.role.outlier':   'AI Trainer',
        'profile.role.cutonala':  'Asistente de Investigación',
        'profile.org.finvivir':   'Finvivir',
        'profile.org.topete':     'Grupo Topete',
        'profile.org.outlier':    'Outlier',
        'profile.org.cutonala':   'CUTonalá',
        'profile.desc.topete':    'Arquitectura de datos, segmentación con modelos de scoring e inferencia causal aplicada a decisiones operativas.',
        'profile.desc.cutonala':  'Protocolos de investigación y análisis estadístico de datos.',
        'profile.finvivir.d1':    'Clustering geográfico',
        'profile.finvivir.d2':    'Modelos de scoring',
        'profile.finvivir.d3':    'Evaluación de harness de agentes de IA',
        'profile.aside.title':    'Formación y credenciales',
        'profile.edu.label':      'Formación académica, de la más reciente a la más antigua',
        'profile.edu.inprogress': 'En curso',
        'profile.date.jan2025':   'Ene 2025',
        'profile.date.jan2027':   'Ene 2027',
        'profile.date.feb2024':   'Feb 2024',
        'profile.date.sep2024':   'Sep 2024',
        'profile.date.may2019':   'May 2019',
        'profile.date.dec2023':   'Dic 2023',
        'profile.edu.master':     'Maestría en Ingeniería y Ciencia de Datos',
        'profile.edu.bootcamp':   'Bootcamp Data Scientist',
        'profile.edu.nano':       'Ingeniería en Nanotecnología',
        'profile.edu.org.udeg':   'Universidad de Guadalajara',
        'profile.edu.org.tripleten': 'TripleTen',
        'profile.credential.kind':   'Certificación oficial',
        'profile.credential.name':   'AWS Certified Cloud Practitioner',
        'profile.credential.issuer': 'Amazon Web Services Training and Certification',
        'profile.credential.cta':    'Verificar en Credly',
        'profile.credential.link.aria': 'Verificar en Credly la credencial AWS Certified Cloud Practitioner de Sergio Anaya Sánchez (se abre en una pestaña nueva)',
        'profile.credential.alt':    'Insignia oficial de AWS Certified Cloud Practitioner emitida por Amazon Web Services Training and Certification a Sergio Anaya Sánchez',
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
        // Image alternative text
        'p1.alt':            'Mapa de calles de una ciudad con dos rutas vehiculares optimizadas que se encuentran en un nodo central.',
        'p2.alt':            'Tres vehículos de flota conectados mediante un nodo de red a un panel de gráfico de barras.',
        'p3.alt':            'Documentos escaneados que avanzan entre filas de datos extraídos hacia una marca de verificación.',
        'p4.alt':            'Depósito de combustible alimentando dos rutas que terminan en camiones cisterna junto a indicadores de nivel de combustible.',
        'dash.alt':          'Tres paneles analíticos: un gráfico de líneas, una región resaltada en el mapa y un diagrama de dispersión.',
        // Dashboards section
        'dash.title':        'Dashboards & Analytics',
        'dash.subtitle':     'Visualización de KPIs operativos en tiempo real. Stack: SQL, Polars, Looker/Streamlit.',
        'dash.overlay':      'Explorar Dashboards →',
        // Dashboards page (dashboards.html)
        'dashpage.badge':         'Galería interactiva',
        'dashpage.title':         'Dashboards Profesionales',
        'dashpage.subtitle':      'Análisis visuales interactivos en Tableau',
        'dashpage.text':          'Tableros desarrollados en Tableau para la toma de decisiones estratégicas. Explóralos aquí mismo, sin salir del sitio.',
        'dashpage.cta.explore':   'Ver Dashboards',
        'dashpage.cta.home':      'Volver al Inicio',
        'dashpage.section.title': 'Tableros Interactivos',
        'dashpage.lead':          'Cada tablero se carga directamente desde Tableau Public. Usa su barra de herramientas para filtrar, resaltar y comparar.',
        'dashpage.hint':          'En pantallas angostas los tableros anchos se desplazan horizontalmente dentro de su marco; el resto de la página no se mueve.',
        'dashpage.nav.label':     'Ir a un tablero',
        'dashpage.source':        'Tableau Public',
        'dashpage.viz1':          'Segmentación de Clientes - Banco',
        'dashpage.viz2':          'Mapa de Ventas por Vendedor - E-commerce Brasil',
        'dashpage.viz3':          'Scatterplot de Profit por Estado',
        'dashpage.back':          'Volver a la página principal',
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
        'modal.close':             'Cerrar',
        // Accessible names
        'a11y.diagram':            'Diagrama de arquitectura. Usa las flechas para desplazarte.',
        'a11y.dashboard.viz':      'Tablero interactivo de Tableau. Usa las flechas o desliza horizontalmente para recorrerlo completo.',
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
        'nav.profile':       'Career',
        'nav.menu.open':     'Open menu',
        'nav.menu.close':    'Close menu',
        'hero.badge':        'Open to opportunities',
        'hero.subtitle':     'Data Scientist | Cloud Architecture & Optimization',
        'hero.text':         'Turning complex data into scalable solutions and tangible business value.',
        'hero.cta.projects': 'View Projects',
        'hero.cta.cv':       'Download CV',
        'hero.cv.hint':      'PDF — Updated 2025',
        // Career story section (index.html)
        'profile.title':          'Professional journey',
        'profile.lead':           'A nanotechnology and scientific-method background, now applied to business decisions: turning scattered data into verifiable decisions.',
        'profile.timeline.label': 'Professional experience, from most recent to earliest',
        'profile.domains.label':  'Practice areas in the current role',
        'profile.current':        'Current role',
        'profile.date.jul2026':   'Jul 2026',
        'profile.date.present':   'Present',
        'profile.date.dec2024':   'Dec 2024',
        'profile.date.nov2024':   'Nov 2024',
        'profile.date.dec2025':   'Dec 2025',
        'profile.date.aug2023':   'Aug 2023',
        'profile.date.jan2024':   'Jan 2024',
        'profile.role.finvivir':  'Data Scientist',
        'profile.role.topete':    'Junior Data Scientist',
        'profile.role.outlier':   'AI Trainer',
        'profile.role.cutonala':  'Research Assistant',
        'profile.org.finvivir':   'Finvivir',
        'profile.org.topete':     'Grupo Topete',
        'profile.org.outlier':    'Outlier',
        'profile.org.cutonala':   'CUTonalá',
        'profile.desc.topete':    'Data architecture, segmentation with scoring models, and causal inference applied to operational decisions.',
        'profile.desc.cutonala':  'Research protocols and statistical data analysis.',
        'profile.finvivir.d1':    'Geographic clustering',
        'profile.finvivir.d2':    'Scoring models',
        'profile.finvivir.d3':    'Evaluation of AI-agent harnesses',
        'profile.aside.title':    'Education & credentials',
        'profile.edu.label':      'Academic background, most recent first',
        'profile.edu.inprogress': 'In progress',
        'profile.date.jan2025':   'Jan 2025',
        'profile.date.jan2027':   'Jan 2027',
        'profile.date.feb2024':   'Feb 2024',
        'profile.date.sep2024':   'Sep 2024',
        'profile.date.may2019':   'May 2019',
        'profile.date.dec2023':   'Dec 2023',
        'profile.edu.master':     "Master's in Engineering and Data Science",
        'profile.edu.bootcamp':   'Data Scientist Bootcamp',
        'profile.edu.nano':       'Nanotechnology Engineering',
        'profile.edu.org.udeg':   'University of Guadalajara',
        'profile.edu.org.tripleten': 'TripleTen',
        'profile.credential.kind':   'Official certification',
        'profile.credential.name':   'AWS Certified Cloud Practitioner',
        'profile.credential.issuer': 'Amazon Web Services Training and Certification',
        'profile.credential.cta':    'Verify on Credly',
        'profile.credential.link.aria': 'Verify the AWS Certified Cloud Practitioner credential on Credly: Sergio Anaya Sánchez (opens in a new tab)',
        'profile.credential.alt':    'Official AWS Certified Cloud Practitioner badge issued by Amazon Web Services Training and Certification to Sergio Anaya Sánchez',
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
        // Image alternative text
        'p1.alt':            'City street map with two optimized vehicle routes meeting at a central hub node.',
        'p2.alt':            'Three fleet vehicles connected through a network node to a bar chart panel.',
        'p3.alt':            'Scanned documents moving through extracted data rows toward a verified check mark.',
        'p4.alt':            'Fuel depot feeding two routes that end at tanker trucks beside fuel-level indicators.',
        'dash.alt':          'Three analytics panels: a line chart, a highlighted map region and a scatter plot.',
        'dash.title':        'Dashboards & Analytics',
        'dash.subtitle':     'Real-time operational KPI visualization. Stack: SQL, Polars, Looker/Streamlit.',
        'dash.overlay':      'Explore Dashboards →',
        'dashpage.badge':         'Interactive gallery',
        'dashpage.title':         'Professional Dashboards',
        'dashpage.subtitle':      'Interactive visual analytics in Tableau',
        'dashpage.text':          'Dashboards built in Tableau for strategic decision making. Explore them right here, without leaving the site.',
        'dashpage.cta.explore':   'View Dashboards',
        'dashpage.cta.home':      'Back to Home',
        'dashpage.section.title': 'Interactive Dashboards',
        'dashpage.lead':          'Every dashboard loads straight from Tableau Public. Use its toolbar to filter, highlight and compare.',
        'dashpage.hint':          'On narrow screens wide dashboards pan horizontally inside their own frame; the rest of the page stays put.',
        'dashpage.nav.label':     'Jump to a dashboard',
        'dashpage.source':        'Tableau Public',
        'dashpage.viz1':          'Customer Segmentation - Banking',
        'dashpage.viz2':          'Sales Map by Representative - Brazil E-commerce',
        'dashpage.viz3':          'Profit Scatter Plot by State',
        'dashpage.back':          'Back to the main page',
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
        'modal.close':             'Close',
        'a11y.diagram':            'Architecture diagram. Use the arrow keys to scroll through the full diagram.',
        'a11y.dashboard.viz':      'Interactive Tableau dashboard. Use the arrow keys or swipe horizontally to pan through the full view.',
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

// ─── MOTION / POINTER CAPABILITY QUERIES ─────────────────────────────────────
const REDUCED_MOTION_QUERY = window.matchMedia('(prefers-reduced-motion: reduce)');
const FINE_POINTER_QUERY   = window.matchMedia('(hover: hover) and (pointer: fine)');

const motionAllowed       = () => !REDUCED_MOTION_QUERY.matches;
const pointerDepthAllowed = () => motionAllowed() && FINE_POINTER_QUERY.matches;

// Static CSS delays that JS sequencing must not override
const STATIC_REVEAL_DELAY_CLASSES = ['reveal-d1', 'reveal-d2', 'reveal-d3'];
const REVEAL_STAGGER_MS     = 90;
const REVEAL_STAGGER_MAX_MS = 360;

// Pointer-depth amplitudes, deliberately small so copy stays legible and
// links/buttons inside cards remain easy to hit.
const CARD_MAX_TILT_DEG   = 3;
const HERO_MAX_TILT_DEG   = 4.5;
const CARD_GLOW_SHIFT_PX  = 14;
const HERO_SHIFT_PX       = 16;

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

    // Image alternative text
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.dataset.i18nAlt;
        if (t[key] !== undefined) el.alt = t[key];
    });

    // Lang toggle button label (show opposite language)
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = lang === 'es' ? 'EN' : 'ES';
    });

    // Accessible names driven by translation keys
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.dataset.i18nAria;
        if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    // Hamburger label depends on the current open state
    updateNavToggleLabel();

    // Update modal titles if they're currently showing
    document.querySelectorAll('.modal[data-modal-key]').forEach(modal => {
        const titleKey = modal.dataset.modalKey;
        const titleEl  = modal.querySelector('h2');
        if (titleEl && t[titleKey]) titleEl.textContent = t[titleKey];
    });

    // Text swaps change page height, so refresh the cached scroll geometry
    if (scrollState.active) {
        measureScrollMotion();
        scrollState.lastY = -1;
        requestScrollFrame();
    }
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

    const icon = theme === 'dark' ? 'fa-moon' : 'fa-lightbulb';
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
// Modals are dialogs: they own the focus trap, Escape, backdrop close and give
// focus back to the control that opened them.
const modalStack = [];

function getFocusableElements(container) {
    const selector = 'a[href], area[href], button:not([disabled]), input:not([disabled]), ' +
        'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector))
        .filter(el => el.getClientRects().length > 0);
}

function setActiveTab(modal, tabName) {
    const tabs = Array.from(modal.querySelectorAll('.modal-tab'));
    let matched = false;

    tabs.forEach(tab => {
        const isActive = tab.dataset.tab === tabName;
        if (isActive) matched = true;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        // Roving tabindex: only the selected tab stays in the tab order
        tab.tabIndex = isActive ? 0 : -1;
    });

    if (!matched) return;

    modal.querySelectorAll('.modal-tab-content').forEach(panel => {
        panel.hidden = panel.dataset.content !== tabName;
    });
}

function handleTabListKeys(event, tab) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;

    const modal = tab.closest('.modal');
    if (!modal) return;

    const tabs = Array.from(modal.querySelectorAll('.modal-tab'));
    if (!tabs.length) return;

    const current = tabs.indexOf(tab);
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft')  next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home')       next = 0;
    if (event.key === 'End')        next = tabs.length - 1;
    if (next === current) return;

    event.preventDefault();
    setActiveTab(modal, tabs[next].dataset.tab);
    tabs[next].focus();
}

async function openModal(modalId, opener) {
    const modal = document.getElementById(modalId);
    if (!modal || modalStack.includes(modal)) return;

    modalStack.push(modal);
    modal.__opener = opener || document.activeElement;

    modal.removeAttribute('aria-hidden');
    modal.style.display = 'block';
    modal.classList.add('is-open');
    document.documentElement.classList.add('modal-open');

    const content = modal.querySelector('.modal-content');
    if (content && !content.hasAttribute('tabindex')) content.setAttribute('tabindex', '-1');

    // Reset tabbed modals to the diagram view
    if (modal.querySelector('.modal-tab')) setActiveTab(modal, 'diagram');

    // Move focus into the dialog (close control first, container as fallback)
    const focusTarget = modal.querySelector('.close-modal') || content;
    if (focusTarget) {
        requestAnimationFrame(() => {
            if (modal.classList.contains('is-open')) focusTarget.focus({ preventScroll: true });
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

function restoreOpenerFocus(opener) {
    if (!opener || typeof opener.focus !== 'function' || !document.contains(opener)) return;

    // Never send focus to a control that lives inside a still-hidden dialog
    const owningModal = opener.closest ? opener.closest('.modal') : null;
    if (owningModal && !owningModal.classList.contains('is-open')) return;

    opener.focus({ preventScroll: true });
}

function closeModal(target) {
    const modal = typeof target === 'string' ? document.getElementById(target) : target;
    if (!modal || !modal.classList.contains('is-open')) return;

    const opener = modal.__opener;
    modal.__opener = null;

    // Move focus out first: aria-hidden must never cover the focused node, and
    // hiding an ancestor of the focused element would drop focus on <body>.
    if (opener) {
        restoreOpenerFocus(opener);
    } else if (modal.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    modal.style.display = 'none';
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    const index = modalStack.indexOf(modal);
    if (index !== -1) modalStack.splice(index, 1);
    if (!modalStack.length) document.documentElement.classList.remove('modal-open');
}

function onModalKeydown(event) {
    if (!modalStack.length) return;

    const modal   = modalStack[modalStack.length - 1];
    const content = modal.querySelector('.modal-content') || modal;

    if (event.key === 'Escape') {
        event.preventDefault();
        closeModal(modal);
        return;
    }

    if (event.key !== 'Tab') return;

    const focusables = getFocusableElements(content);
    if (!focusables.length) {
        event.preventDefault();
        content.focus({ preventScroll: true });
        return;
    }

    const first  = focusables[0];
    const last   = focusables[focusables.length - 1];
    const active = document.activeElement;
    const inside = content.contains(active);

    if (event.shiftKey && (!inside || active === first)) {
        event.preventDefault();
        last.focus({ preventScroll: true });
    } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
    }
}

function initModals() {
    // Open buttons
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal(btn.dataset.openModal, btn);
        });
    });

    // Close × buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            if (modalId) closeModal(modalId);
        });
    });

    // Click outside the dialog closes the topmost modal
    window.addEventListener('click', e => {
        if (e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
    });

    // Escape + focus trap for the topmost modal
    document.addEventListener('keydown', onModalKeydown);

    // Modal tabs (e.g. causalModal diagram/image switch)
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const modal = tab.closest('.modal');
            if (modal) setActiveTab(modal, tab.dataset.tab);
        });
        tab.addEventListener('keydown', e => handleTabListKeys(e, tab));
    });
}

// ─── HAMBURGER (keyboard/ARIA safe disclosure) ────────────────────────────────
function updateNavToggleLabel() {
    const hamburger = document.getElementById('hamburger');
    const navbar    = document.querySelector('.navbar');
    if (!hamburger || !navbar) return;

    const t = T[currentLang] || T['es'];
    const open = navbar.classList.contains('nav-open');
    hamburger.setAttribute('aria-label', open ? t['nav.menu.close'] : t['nav.menu.open']);
}

function setNavOpen(open, options) {
    const opts      = options || {};
    const hamburger = document.getElementById('hamburger');
    const navbar    = document.querySelector('.navbar');
    if (!hamburger || !navbar) return;

    navbar.classList.toggle('nav-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

    const icon = hamburger.querySelector('i');
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';

    updateNavToggleLabel();

    if (opts.restoreFocus) hamburger.focus({ preventScroll: true });
}

function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navbar    = document.querySelector('.navbar');
    if (!hamburger || !navbar) return;

    const navPanel = navbar.querySelector('.nav-links-text');
    // aria-controls is only valid when the panel it points at exists on this page
    if (navPanel && navPanel.id) hamburger.setAttribute('aria-controls', navPanel.id);
    hamburger.setAttribute('aria-expanded', navbar.classList.contains('nav-open') ? 'true' : 'false');
    updateNavToggleLabel();

    hamburger.addEventListener('click', () => {
        setNavOpen(!navbar.classList.contains('nav-open'));
    });

    // Close on nav link click
    document.querySelectorAll('.nav-links-text a').forEach(a => {
        a.addEventListener('click', () => setNavOpen(false));
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!navbar.classList.contains('nav-open')) return;
        if (navbar.contains(e.target)) return;
        setNavOpen(false);
    });

    // Close on Escape and hand focus back to the toggle
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (modalStack.length) return;   // an open dialog owns Escape
        if (!navbar.classList.contains('nav-open')) return;
        e.preventDefault();
        setNavOpen(false, { restoreFocus: true });
    });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
// The observer contract is unchanged: `.reveal` gains `.visible` on first
// intersection and is then unobserved. Elements that cross the threshold in the
// same batch additionally get a sequenced delay unless CSS already sets one.
function applyRevealDelay(el, index) {
    if (index === 0) return;
    if (STATIC_REVEAL_DELAY_CLASSES.some(cls => el.classList.contains(cls))) return;
    el.style.setProperty('--reveal-delay', Math.min(index * REVEAL_STAGGER_MS, REVEAL_STAGGER_MAX_MS) + 'ms');
}

function initReveal() {
    const observer = new IntersectionObserver(entries => {
        const batch = entries.filter(entry => entry.isIntersecting);

        // Reading order sequencing for everything that entered in the same frame
        batch.sort((a, b) =>
            (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);

        batch.forEach((entry, index) => {
            applyRevealDelay(entry.target, index);
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
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

// ─── SCROLL CHOREOGRAPHY ─────────────────────────────────────────────────────
// A single rAF loop reads the scroll position and writes CSS custom properties.
// Layout is never animated: every consumer is transform/opacity only, and
// section/hero geometry is measured on resize/load instead of per frame.
const scrollState = {
    sections: [],
    hero: null,
    navbar: null,
    viewport: 0,
    scrollable: 1,
    heroAmplitude: 46,
    frame: 0,
    paused: false,
    lastY: -1,
    active: false,
};

const scrollVarCache = new Map();

// Only these sections consume --section-shift in style.css, so they are the
// only ones measured and written to on every scroll frame.
const AMBIENT_SECTION_SELECTOR = '.architecture, .projects, .dashboards, .connect';

function setScrollVar(el, name, value) {
    let cache = scrollVarCache.get(el);
    if (!cache) {
        cache = {};
        scrollVarCache.set(el, cache);
    }
    if (cache[name] === value) return;
    cache[name] = value;
    el.style.setProperty(name, value);
}

function measureScrollMotion() {
    scrollState.viewport    = window.innerHeight || 0;
    scrollState.scrollable  = Math.max(document.documentElement.scrollHeight - scrollState.viewport, 1);
    scrollState.heroAmplitude = window.innerWidth > 900 ? 46 : 20;

    scrollState.sections = Array.from(document.querySelectorAll(AMBIENT_SECTION_SELECTOR)).map(el => ({
        el,
        top: el.offsetTop,
        height: el.offsetHeight,
    }));

    const heroEl = document.querySelector('.hero');
    scrollState.hero = heroEl
        ? { el: heroEl, top: heroEl.offsetTop, height: Math.max(heroEl.offsetHeight, 1) }
        : null;

    // The reading-progress variable is scoped to the navbar, the only consumer,
    // so the rest of the document tree is never invalidated on scroll.
    scrollState.navbar = document.querySelector('.navbar');
}

function paintScrollMotion() {
    scrollState.frame = 0;
    if (scrollState.paused) return;

    const root = document.documentElement;
    const y    = window.scrollY || window.pageYOffset || 0;

    if (y !== scrollState.lastY) {
        scrollState.lastY     = y;
        pointerRectsStale     = true;

        if (scrollState.navbar) {
            setScrollVar(scrollState.navbar, '--page-progress',
                Math.min(Math.max(y / scrollState.scrollable, 0), 1).toFixed(4));
        }
        root.classList.toggle('is-scrolled', y > 24);

        const viewport = scrollState.viewport;

        for (const section of scrollState.sections) {
            if (section.top + section.height < y - 240) continue;  // scrolled past
            if (section.top > y + viewport + 240) continue;        // not reached yet

            const range = section.height + viewport;
            const p     = Math.min(Math.max((y + viewport - section.top) / range, 0), 1);
            setScrollVar(section.el, '--section-shift', ((p - 0.5) * 28).toFixed(2) + 'px');
        }

        const hero = scrollState.hero;
        if (hero && y < hero.top + hero.height) {
            const heroProgress = Math.min(Math.max(y / hero.height, 0), 1);
            setScrollVar(hero.el, '--hero-scroll', (heroProgress * scrollState.heroAmplitude).toFixed(2) + 'px');
            setScrollVar(hero.el, '--hero-fade', (1 - heroProgress * 0.45).toFixed(3));
        }
    }
}

function requestScrollFrame() {
    if (!scrollState.active || scrollState.frame || scrollState.paused) return;
    scrollState.frame = requestAnimationFrame(paintScrollMotion);
}

let motionResizeTimer = 0;

function handleMotionResize() {
    window.clearTimeout(motionResizeTimer);
    motionResizeTimer = window.setTimeout(() => {
        if (!scrollState.active) return;
        measureScrollMotion();
        scrollState.lastY = -1;
        requestScrollFrame();
    }, 120);
}

function handleVisibilityChange() {
    scrollState.paused = document.hidden;
    document.documentElement.classList.toggle('is-tab-hidden', document.hidden);

    if (document.hidden) {
        if (scrollState.frame) {
            cancelAnimationFrame(scrollState.frame);
            scrollState.frame = 0;
        }
        return;
    }

    if (!scrollState.active) return;
    measureScrollMotion();
    scrollState.lastY = -1;
    requestScrollFrame();
}

function clearScrollMotion() {
    if (scrollState.frame) {
        cancelAnimationFrame(scrollState.frame);
        scrollState.frame = 0;
    }

    scrollState.sections.forEach(s => s.el.style.removeProperty('--section-shift'));

    if (scrollState.hero) {
        scrollState.hero.el.style.removeProperty('--hero-scroll');
        scrollState.hero.el.style.removeProperty('--hero-fade');
    }

    if (scrollState.navbar) scrollState.navbar.style.removeProperty('--page-progress');

    document.documentElement.classList.remove('is-scrolled');
    scrollVarCache.clear();
}

function initSectionObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('is-inview', entry.isIntersecting));
    }, { rootMargin: '15% 0px 15% 0px' });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

function initScrollMotion() {
    initSectionObserver();

    // A page loaded in a background tab must not start the loop
    scrollState.paused = document.hidden;
    document.documentElement.classList.toggle('is-tab-hidden', document.hidden);

    // Bound once: the handlers themselves check whether motion is active, so a
    // live preference change can enable the whole layer without rebinding.
    window.addEventListener('scroll', requestScrollFrame, { passive: true });
    window.addEventListener('resize', handleMotionResize, { passive: true });
    window.addEventListener('load', handleMotionResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!motionAllowed()) return;

    scrollState.active = true;
    document.documentElement.classList.add('motion-ok');

    measureScrollMotion();
    requestScrollFrame();
}

// ─── POINTER DEPTH ───────────────────────────────────────────────────────────
// Subtle hero/card depth on fine pointers with motion enabled. Coalesced into
// one rAF, rect-cached, transform-only, and never intercepting clicks.
const TILT_SELECTOR = '.project-card, .social-card, .featured-project';
const DEPTH_VARS = {
    hero: ['--hero-tilt-x', '--hero-tilt-y', '--hero-shift-x', '--hero-shift-y'],
    card: ['--tilt-x', '--tilt-y', '--glow-x', '--glow-y'],
};

let pointerFrame = 0;
let pointerRectsStale = false;
const pointerRects = new Map();
const pendingDepth = new Map();

function clampUnit(value) {
    if (Number.isNaN(value)) return 0;
    return value < -1 ? -1 : value > 1 ? 1 : value;
}

function readPointerRect(el) {
    if (pointerRectsStale) pointerRects.clear();

    let rect = pointerRects.get(el);
    if (!rect) {
        rect = el.getBoundingClientRect();
        pointerRects.set(el, rect);
    }
    return rect;
}

function paintDepth() {
    pointerFrame = 0;

    if (document.hidden) {
        pendingDepth.clear();
        return;
    }

    pendingDepth.forEach(({ event, target }, el) => {
        const rect = readPointerRect(el);
        if (!rect.width || !rect.height) return;

        const nx = clampUnit(((event.clientX - rect.left) / rect.width) * 2 - 1);
        const ny = clampUnit(((event.clientY - rect.top) / rect.height) * 2 - 1);

        if (target === 'hero') {
            el.style.setProperty('--hero-tilt-x', (-ny * HERO_MAX_TILT_DEG).toFixed(2) + 'deg');
            el.style.setProperty('--hero-tilt-y', (nx * HERO_MAX_TILT_DEG).toFixed(2) + 'deg');
            el.style.setProperty('--hero-shift-x', (nx * HERO_SHIFT_PX).toFixed(2) + 'px');
            el.style.setProperty('--hero-shift-y', (ny * HERO_SHIFT_PX).toFixed(2) + 'px');
            return;
        }

        el.style.setProperty('--tilt-x', (-ny * CARD_MAX_TILT_DEG).toFixed(2) + 'deg');
        el.style.setProperty('--tilt-y', (nx * CARD_MAX_TILT_DEG).toFixed(2) + 'deg');
        el.style.setProperty('--glow-x', (nx * CARD_GLOW_SHIFT_PX).toFixed(2) + 'px');
        el.style.setProperty('--glow-y', (ny * CARD_GLOW_SHIFT_PX).toFixed(2) + 'px');
    });

    pendingDepth.clear();
    pointerRectsStale = false;
}

function queueDepth(el, event, target) {
    if (!pointerDepthAllowed()) return;
    pendingDepth.set(el, { event, target });
    if (!pointerFrame) pointerFrame = requestAnimationFrame(paintDepth);
}

function resetDepthTarget(el, target) {
    (DEPTH_VARS[target] || []).forEach(name => el.style.removeProperty(name));
}

function clearPointerDepth() {
    if (pointerFrame) {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
    }

    pendingDepth.clear();
    pointerRects.clear();

    document.querySelectorAll('.is-tilting').forEach(el => el.classList.remove('is-tilting'));
    document.querySelectorAll(TILT_SELECTOR).forEach(el => resetDepthTarget(el, 'card'));

    const hero = document.querySelector('.hero');
    if (hero) resetDepthTarget(hero, 'hero');
}

function initPointerDepth() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('pointermove', e => queueDepth(hero, e, 'hero'), { passive: true });
        hero.addEventListener('pointerleave', () => {
            pendingDepth.delete(hero);
            resetDepthTarget(hero, 'hero');
        }, { passive: true });
    }

    document.querySelectorAll(TILT_SELECTOR).forEach(card => {
        card.addEventListener('pointerenter', () => {
            if (pointerDepthAllowed()) card.classList.add('is-tilting');
        }, { passive: true });

        card.addEventListener('pointermove', e => queueDepth(card, e, 'card'), { passive: true });

        card.addEventListener('pointerleave', () => {
            pendingDepth.delete(card);
            card.classList.remove('is-tilting');
            resetDepthTarget(card, 'card');
        }, { passive: true });
    });
}

// ─── MOTION PREFERENCE CHANGES ───────────────────────────────────────────────
function handleMotionPreferenceChange() {
    if (!motionAllowed()) {
        scrollState.active = false;
        scrollState.paused = true;
        document.documentElement.classList.remove('motion-ok', 'is-scrolled');
        clearScrollMotion();
        clearPointerDepth();
        return;
    }

    if (!scrollState.active) {
        scrollState.active = true;
        scrollState.paused = document.hidden;
        document.documentElement.classList.add('motion-ok');
        measureScrollMotion();
        scrollState.lastY = -1;
        requestScrollFrame();
    }

    if (!pointerDepthAllowed()) clearPointerDepth();
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
    initScrollMotion();
    initPointerDepth();
    initFloatingCTA();
    initMailCopy();
    initCopyright();

    // Honour live preference/capability changes without a reload
    const onPreferenceChange = () => handleMotionPreferenceChange();
    REDUCED_MOTION_QUERY.addEventListener('change', onPreferenceChange);
    FINE_POINTER_QUERY.addEventListener('change', onPreferenceChange);
});
