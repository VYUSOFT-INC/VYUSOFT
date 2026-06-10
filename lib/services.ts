// Source-of-truth data for the 30 service pages. Drives /services/[slug] dynamic route.
// Every service carries a hand-written description + 6 specific capabilities — no generic
// templating, every page reads as tailored to its practice.

import { servicesByGroup } from "./nav";

export type Feature = { title: string; description: string };

export type Service = {
    slug: string;
    title: string;
    group: string;
    accent: string;
    description: string;
    features: Feature[];
};

const overrides: Record<string, { description: string; accent: string; features: Feature[] }> = {
    /* ──────────────────────────────  TECHNOLOGY  ────────────────────────────── */

    "artificial-intelligence": {
        accent: "#635BFF",
        description:
            "Production-grade AI engineering — predictive modelling, NLP, computer vision, and generative AI pipelines tied to your domain data and your risk tolerance.",
        features: [
            { title: "Machine Learning Models", description: "Custom ML models trained on your data to automate decisions, predict outcomes, and uncover hidden patterns at scale." },
            { title: "Natural Language Processing", description: "Text analysis, chatbots, and language understanding solutions that enable human-like interaction with your systems." },
            { title: "Computer Vision", description: "Image and video analysis capabilities for quality inspection, object detection, and visual data processing." },
            { title: "Predictive Analytics", description: "Forecasting models that surface risks, opportunities, and trends before they impact the business." },
            { title: "Generative AI", description: "LLM-powered copilots, summarization, and content generation tied into your domain knowledge with guardrails." },
            { title: "MLOps & Deployment", description: "Production-grade pipelines for model training, evaluation, deployment, and monitoring at enterprise scale." },
        ],
    },

    "cyber-security": {
        accent: "#22C55E",
        description:
            "Zero-trust architecture, threat detection, and end-to-end compliance — for organisations that can't ship a postmortem to a regulator.",
        features: [
            { title: "Zero-Trust Architecture", description: "Identity-first access control across every workload, device, and network boundary." },
            { title: "Threat Detection & Response", description: "24/7 SOC, SIEM tuning, and rapid incident response with playbook automation." },
            { title: "Compliance & Audits", description: "SOC 2, HIPAA, GDPR, ISO 27001 — gap assessments through full audit support." },
            { title: "Penetration Testing", description: "Application, network, and cloud penetration tests with prioritized remediation guidance." },
            { title: "Identity & Access Management", description: "SSO, MFA, privileged access, and role-based controls integrated across your stack." },
            { title: "Cloud Security Posture", description: "Continuous CSPM/CWPP scanning, misconfiguration detection, and compliance drift monitoring." },
        ],
    },

    "cloud": {
        accent: "#A18CD1",
        description:
            "Cloud migration, multi-cloud orchestration, and FinOps for organisations that need to move workloads without losing weekends to cutover incidents.",
        features: [
            { title: "Cloud Migration", description: "Lift-and-shift through full re-architecture for AWS, Azure, GCP — with zero-downtime cutover plans." },
            { title: "Multi-Cloud Strategy", description: "Workload placement, cross-cloud networking, and unified governance across providers." },
            { title: "Cost Optimization", description: "FinOps, right-sizing, reserved-instance planning, and continuous cost monitoring." },
            { title: "Kubernetes & Containers", description: "Production-grade Kubernetes with Helm, GitOps, service mesh, and observability." },
            { title: "Serverless Engineering", description: "Lambda, Cloud Functions, event-driven architectures with cold-start and cost tuning." },
            { title: "Disaster Recovery", description: "Multi-region failover, RPO/RTO targets, automated runbooks, and regular DR drills." },
        ],
    },

    "data": {
        accent: "#00D4FF",
        description:
            "Modern data platforms — lakehouses, real-time pipelines, governed BI — so the business trusts every dashboard it acts on.",
        features: [
            { title: "Data Strategy", description: "Roadmaps, governance models, and target architectures aligned to business outcomes." },
            { title: "Modern Data Platforms", description: "Snowflake, Databricks, BigQuery — lakehouse architectures with strong cost controls." },
            { title: "ETL / ELT Pipelines", description: "Reliable ingestion, transformation, and orchestration with dbt, Airflow, Fivetran." },
            { title: "Business Intelligence", description: "Self-service dashboards in Looker, Tableau, Power BI — with embedded analytics options." },
            { title: "Real-Time Streaming", description: "Kafka, Kinesis, and stream-native architectures for sub-second analytics and alerting." },
            { title: "Data Governance & Quality", description: "Catalogs, lineage, and quality monitoring so the business trusts every metric." },
        ],
    },

    "devops": {
        accent: "#635BFF",
        description:
            "CI/CD, infrastructure as code, and SRE practices that make production deploys boring — which is the highest compliment a deploy can earn.",
        features: [
            { title: "CI/CD Pipelines", description: "GitHub Actions, GitLab, Jenkins — pipelines that ship safely from commit to prod." },
            { title: "Infrastructure as Code", description: "Terraform, Pulumi, CDK — versioned, reviewable, reproducible infra." },
            { title: "Kubernetes Operations", description: "Cluster provisioning, GitOps with ArgoCD/Flux, autoscaling, and policy enforcement." },
            { title: "Observability", description: "Prometheus, Grafana, OpenTelemetry, distributed tracing — full SLO-driven visibility." },
            { title: "Site Reliability Engineering", description: "Error budgets, runbooks, chaos engineering, and on-call enablement." },
            { title: "Release Engineering", description: "Feature flags, progressive delivery, and zero-downtime deploy strategies." },
        ],
    },

    "network-solutions": {
        accent: "#0EA5E9",
        description:
            "Enterprise network design, segmentation, and SD-WAN architecture — the layer beneath everything else, engineered to never be a footnote in an incident report.",
        features: [
            { title: "Network Architecture", description: "Greenfield and brownfield enterprise network designs with explicit segmentation and capacity planning baked in." },
            { title: "SD-WAN & SASE", description: "Software-defined WAN with secure access service edge — branch, cloud, and remote workforce on one fabric." },
            { title: "Zero-Trust Network Access", description: "Identity-aware microsegmentation, replacing legacy VPN with policy-driven access at every hop." },
            { title: "Network Observability", description: "Flow telemetry, packet capture, and synthetic monitoring tied to your incident response runbooks." },
            { title: "Data-Centre Networking", description: "Spine-leaf fabrics, EVPN/VXLAN, and hyperscale-grade load balancing for on-prem and colo footprints." },
            { title: "Carrier & ISP Engagement", description: "Procurement, BGP design, and dual-carrier resilience reviewed before contracts are signed." },
        ],
    },

    /* ──────────────────────────────  ENGINEERING  ───────────────────────────── */

    "digital-solutions-web-app": {
        accent: "#06B6D4",
        description:
            "Modern web and mobile applications — React, Next.js, native and cross-platform — built to ship in weeks and operate cleanly for years.",
        features: [
            { title: "Web Application Engineering", description: "Next.js, React, and TypeScript front-ends with SSR/ISR, edge rendering, and Lighthouse 95+ baseline." },
            { title: "Mobile Application Engineering", description: "Native iOS (Swift) and Android (Kotlin) apps with offline-first sync and biometric flows." },
            { title: "Backend Services", description: "Node, Go, Python services with documented APIs, typed contracts, and SLO-tracked deployments." },
            { title: "Real-Time Features", description: "WebSockets, server-sent events, and collaborative editing patterns tested under realistic load." },
            { title: "Authentication & Identity", description: "OIDC, OAuth2, magic links, and passkeys integrated into your existing IdP without rebuilding it." },
            { title: "Production Operations", description: "Observability, error budgets, and on-call playbooks bundled with every launch, never an afterthought." },
        ],
    },

    "ui-ux-development": {
        accent: "#EC4899",
        description:
            "Research-led product design and craft-grade UI development — design systems that engineers actually want to build against.",
        features: [
            { title: "Product Discovery", description: "User research, jobs-to-be-done interviews, and prototyping cycles that validate before code is written." },
            { title: "Design Systems", description: "Token libraries, component primitives, and documentation in Figma + Storybook with engineering parity." },
            { title: "Interaction & Motion Design", description: "Micro-interactions, scroll choreography, and gesture systems — restrained, accessible, performant." },
            { title: "Visual Identity", description: "Brand expression in product surfaces — typography, color systems, illustration directions, photography guidelines." },
            { title: "Accessibility (WCAG 2.2 AA)", description: "Conformance reviews, screen reader testing, and remediation passes with named owner per defect." },
            { title: "Design-to-Code Bridge", description: "Pair-programmed component handoff and Figma-to-React extraction that survives the third sprint." },
        ],
    },

    "cross-platform-apps": {
        accent: "#10B981",
        description:
            "Cross-platform applications that share 80% of code and lose nothing on either platform — React Native, Flutter, and Capacitor where each is the right tool.",
        features: [
            { title: "React Native Engineering", description: "Production React Native apps with native modules where it counts and OTA updates wired in." },
            { title: "Flutter Engineering", description: "Flutter apps with custom render layers, platform channels, and full Material/Cupertino fidelity." },
            { title: "Native Module Bridging", description: "Swift and Kotlin native modules where shared frameworks fall short — without abandoning the codebase." },
            { title: "Offline-First Architecture", description: "Sync engines, conflict resolution, and local-first data layers built for spotty connectivity." },
            { title: "App Store Operations", description: "TestFlight, Play Store rollouts, phased releases, and the privacy review work that always slips." },
            { title: "Performance Tuning", description: "60fps scroll budgets, JS bridge profiling, and binary-size discipline measured per release." },
        ],
    },

    "blockchain-app-development": {
        accent: "#F59E0B",
        description:
            "Production blockchain engineering — smart contracts, wallets, indexers — with the security posture a regulated balance sheet requires.",
        features: [
            { title: "Smart Contract Development", description: "Solidity, Vyper, and Rust (Solana, NEAR) contracts written for auditability and upgrade paths from day one." },
            { title: "Audit-Ready Engineering", description: "Coverage-driven testing, formal verification where it matters, and remediation against external audit findings." },
            { title: "Wallet & Custody Integration", description: "MetaMask, WalletConnect, and institutional custody flows with clear signature provenance." },
            { title: "Indexer & Subgraph Pipelines", description: "The Graph, custom indexers, and ETL into your data warehouse for analytics and compliance reporting." },
            { title: "DeFi Protocol Engineering", description: "AMMs, lending markets, vaults, and yield strategies engineered for capital efficiency and gas economics." },
            { title: "L2 & Rollup Strategy", description: "Optimistic and ZK rollup deployments, bridge architectures, and migration plans off mainnet." },
        ],
    },

    "iot-digital-engineering": {
        accent: "#84CC16",
        description:
            "End-to-end IoT engineering — firmware, edge gateways, telemetry pipelines, and the cloud back-end that turns raw signals into business decisions.",
        features: [
            { title: "Embedded Firmware", description: "C/C++ and Rust firmware for ARM Cortex-M and ESP32 with OTA update channels and signed boot." },
            { title: "Edge Compute & Gateways", description: "On-device inference, protocol translation (MQTT, OPC-UA, Modbus), and store-and-forward buffering." },
            { title: "Telemetry & Time-Series", description: "InfluxDB, TimescaleDB, and AWS IoT pipelines tuned for million-events-per-day fleets." },
            { title: "Device Fleet Management", description: "Provisioning, attestation, configuration drift detection, and remote diagnostics dashboards." },
            { title: "Predictive Maintenance Models", description: "Anomaly detection and failure-mode classifiers trained on your fleet's actual signal history." },
            { title: "Industrial & Smart-Building", description: "BMS integration, building automation, manufacturing line telemetry — proven in regulated facilities." },
        ],
    },

    "wearables": {
        accent: "#F472B6",
        description:
            "Wearable engineering across watchOS, Wear OS, and custom hardware — the small surfaces where every millisecond and milliwatt counts.",
        features: [
            { title: "watchOS Engineering", description: "SwiftUI watch apps, complications, and Health/Workout integrations with battery profiles tested on-device." },
            { title: "Wear OS Engineering", description: "Compose for Wear OS apps with Tiles, complications, and Health Services Tracker integrations." },
            { title: "Companion App Sync", description: "Phone-to-watch state, conflict resolution, and background sync that doesn't drain the device." },
            { title: "Bluetooth LE Engineering", description: "Custom peripheral protocols, GATT profile design, and connection lifecycle handling for proprietary hardware." },
            { title: "Health & Sensor Integration", description: "HealthKit, Google Fit, and raw sensor pipelines for fitness, clinical, and research applications." },
            { title: "Custom Wearable Firmware", description: "Nordic, STM32, and Apple Watch HW integration paths for OEMs building branded wearables." },
        ],
    },

    /* ──────────────────────────────  ENTERPRISE  ────────────────────────────── */

    "enterprise-solutions": {
        accent: "#C9962E",
        description:
            "Enterprise software platforms — workflow systems, internal tools, and integration fabric — engineered for the realities of large-organisation change management.",
        features: [
            { title: "Workflow & Process Automation", description: "BPM platforms (Camunda, Temporal) and durable workflow engines for long-running, audited business processes." },
            { title: "Internal Tooling", description: "Retool, Appsmith, and bespoke React admin surfaces that operations teams adopt without prompting." },
            { title: "Integration Architecture", description: "Event-driven middleware, iPaaS (Mulesoft, Boomi), and API gateways tying legacy and modern systems cleanly." },
            { title: "Identity & Provisioning", description: "Okta, Azure AD, and SCIM-based lifecycle management across hundreds of applications." },
            { title: "Document & Records Systems", description: "Workspace, M365, and ECM integrations with retention and discovery policies that pass audit." },
            { title: "Change Management Partnership", description: "Rollout sequencing, training collateral, and pilot-to-organisation-wide adoption planning." },
        ],
    },

    "erps": {
        accent: "#8B5CF6",
        description:
            "ERP advisory and implementation across SAP, Oracle, NetSuite, and Workday — without the multi-year, multi-million-dollar saga that gives ERP its bad name.",
        features: [
            { title: "ERP Selection & Roadmap", description: "Vendor-agnostic fit analysis, TCO modelling, and phased implementation roadmaps grounded in your operating model." },
            { title: "SAP S/4HANA Implementation", description: "Greenfield and brownfield S/4 migrations, Fiori UX, and BTP extensions delivered by certified consultants." },
            { title: "Oracle & NetSuite", description: "Oracle Cloud ERP and NetSuite implementations including SuiteScript customisation and integration design." },
            { title: "Workday Engineering", description: "HCM and Finance configuration, business process framework, and integrations via Workday Studio." },
            { title: "ERP Integration Layer", description: "Middleware, change-data-capture pipelines, and master-data governance to bridge ERP with surrounding systems." },
            { title: "ERP Modernization", description: "Legacy mainframe-to-cloud migrations, technical-debt remediation, and roll-forward of customisations on supported releases." },
        ],
    },

    "cognitive-business-operation": {
        accent: "#7E3FBF",
        description:
            "AI-driven business operations — process mining, intelligent automation, and decision-support systems that augment teams without replacing judgment.",
        features: [
            { title: "Process Mining", description: "Celonis, UiPath Process Mining, and custom analyzers that surface where work actually flows vs how it's documented." },
            { title: "Intelligent Document Processing", description: "OCR, NLP, and validation pipelines for invoices, contracts, and forms with human-in-the-loop review." },
            { title: "Robotic Process Automation", description: "UiPath, Automation Anywhere, and Power Automate bots with documented exception handling and audit trails." },
            { title: "Decision Intelligence", description: "Optimisation models and decision-support dashboards tied to operational KPIs, not vanity metrics." },
            { title: "Conversational Operations", description: "Internal copilots over your knowledge base, ticketing, and runbooks — with retrieval grounded in your sources." },
            { title: "Operational AI Governance", description: "Model registry, drift monitoring, and approval workflows that satisfy risk, legal, and audit stakeholders." },
        ],
    },

    "digital-architect": {
        accent: "#475569",
        description:
            "Enterprise and solution architecture engagements — the calm second opinion before the architecture decisions get locked into a multi-year contract.",
        features: [
            { title: "Enterprise Architecture", description: "TOGAF-informed enterprise architecture covering business, application, data, and technology layers." },
            { title: "Solution Architecture", description: "Per-initiative solution designs with explicit non-functional requirements and risk registers." },
            { title: "Architecture Decision Records", description: "Documented ADRs covering every consequential decision, with status, context, and consequences captured." },
            { title: "Technology Reference Models", description: "Curated technology selections, internal platforms, and golden-path reference implementations." },
            { title: "Architecture Review Boards", description: "Facilitation of ARB processes, design reviews, and approval workflows across hybrid teams." },
            { title: "Modernisation Strategy", description: "Strangler-fig roadmaps, retirement plans, and dependency-mapped migration sequencing." },
        ],
    },

    "vyu-migrations": {
        accent: "#D946EF",
        description:
            "Specialist migration engagements — database, cloud, ERP, mainframe — executed with zero-downtime cutover plans and rollback triggers tested under load.",
        features: [
            { title: "Database Migrations", description: "Oracle-to-Postgres, MySQL-to-Aurora, mainframe-DB2-to-cloud — schema, data, and stored-procedure conversion included." },
            { title: "Cloud Migrations", description: "On-prem to AWS/Azure/GCP migrations with phased cutover, dual-running validation, and explicit rollback gates." },
            { title: "Mainframe Modernization", description: "COBOL, JCL, and CICS workload assessments with replatform, refactor, or replace strategies tied to risk tolerance." },
            { title: "Data Centre Exits", description: "Co-lo exit strategies, asset disposition, and parallel-running plans that protect operational continuity." },
            { title: "Application Replatforming", description: "Container migrations, runtime upgrades, and dependency modernisation without re-architecting the world." },
            { title: "Migration Operations", description: "Cutover rehearsals, freeze windows, comms tree management, and the boring discipline that makes migrations boring." },
        ],
    },

    "end-user-computing": {
        accent: "#0891B2",
        description:
            "End-user computing — VDI, DaaS, device fleets, and modern workplace deployment — for organisations whose employees aren't all in one office anymore.",
        features: [
            { title: "Virtual Desktop Infrastructure", description: "Citrix, VMware Horizon, and Azure Virtual Desktop with golden-image management and FSLogix profile architecture." },
            { title: "Desktop as a Service", description: "AWS WorkSpaces and Windows 365 deployments with autoscaling profiles and cost-per-user modelling." },
            { title: "Modern Workplace Deployment", description: "Microsoft 365, Google Workspace, and Slack/Zoom integration with security baselines and DLP policies." },
            { title: "Device & Endpoint Management", description: "Intune, Jamf, and Workspace ONE rollouts with zero-touch provisioning and remote-wipe response runbooks." },
            { title: "Identity-Aware Access", description: "Conditional access, device compliance, and zero-trust access policies tied to your IdP and EDR signals." },
            { title: "Employee Experience Engineering", description: "Onboarding flows, internal portals, and search-first knowledge surfaces that reduce time-to-productivity." },
        ],
    },

    /* ──────────────────────────────  GROWTH  ────────────────────────────────── */

    "consulting": {
        accent: "#FF6B35",
        description:
            "Independent technology consulting — strategy, architecture reviews, and executive advisory for the decisions that pay back over years, not quarters.",
        features: [
            { title: "Digital Strategy", description: "Multi-year transformation roadmaps tied to measurable business KPIs." },
            { title: "Technology Assessment", description: "Independent reviews of your stack, vendors, and architecture with prioritized actions." },
            { title: "Process Optimization", description: "Lean / value-stream mapping, automation candidates, and ROI modeling." },
            { title: "Innovation Workshops", description: "Design sprints and proof-of-concept programs that validate ideas in weeks, not quarters." },
            { title: "Vendor Selection", description: "RFPs, demos, scoring matrices, and contract negotiation support." },
            { title: "Executive Advisory", description: "Fractional CTO, board prep, and quarterly strategy reviews." },
        ],
    },

    "business-development": {
        accent: "#FB7185",
        description:
            "Go-to-market engineering for software teams — pricing, packaging, partnership architecture, and the operational discipline that turns interest into revenue.",
        features: [
            { title: "Pricing & Packaging", description: "Pricing model design, value-metric selection, and tiering experiments grounded in actual usage data." },
            { title: "Partnership Architecture", description: "OEM, reseller, and ISV partnerships with contract terms, technical integration, and joint go-to-market plans." },
            { title: "Sales Enablement", description: "Discovery scripts, demo environments, ROI calculators, and battlecards engineered for senior sales teams." },
            { title: "Revenue Operations", description: "Salesforce, HubSpot, and revops tooling integration with documented funnel-stage definitions and ICP alignment." },
            { title: "Account-Based Marketing", description: "Tiered account playbooks, intent-data integration, and target-account orchestration across marketing and sales." },
            { title: "Customer Success Engineering", description: "Health scoring, renewal forecasting, and CS playbooks built for net-revenue retention, not ticket closure." },
        ],
    },

    "digital-marketing-monitoring": {
        accent: "#FB923C",
        description:
            "Digital marketing engineering — analytics, attribution, marketing-stack architecture — for marketing teams who want their dashboards to match their bank statements.",
        features: [
            { title: "Analytics Architecture", description: "GA4, server-side tracking, and event-schema design tied to your business model rather than a vendor template." },
            { title: "Marketing Attribution", description: "Multi-touch attribution models, MMM integration, and incrementality testing frameworks." },
            { title: "Marketing-Ops Stack", description: "HubSpot, Marketo, Iterable, and Segment implementations with documented data contracts and consent governance." },
            { title: "SEO & Content Engineering", description: "Technical SEO audits, Core Web Vitals optimisation, and content-velocity systems that don't compromise quality." },
            { title: "Paid Acquisition Engineering", description: "Pixel architecture, conversion API integration, and bidding-strategy automation across Google, Meta, LinkedIn." },
            { title: "Privacy-First Tracking", description: "Server-side tagging, first-party data strategies, and GDPR/CCPA-compliant consent management." },
        ],
    },

    "vyu-startup-solutions": {
        accent: "#FACC15",
        description:
            "Senior-led delivery for funded founders — strategy, design, engineering, and operations under one accountable principal, from week-one architecture through post-launch ramp.",
        features: [
            { title: "MVP Architecture", description: "Right-sized architecture that gets you to revenue without painting you into a corner before Series A." },
            { title: "Product Discovery Sprint", description: "Two-to-four-week discovery sprints producing validated scope, MVP plan, and design system foundations." },
            { title: "Engineering Squad", description: "Full-stack squads led by a principal — strategy, design, engineering, devops in one accountable team." },
            { title: "Investor-Ready Engineering", description: "Architecture diagrams, security posture, and SOC-readiness documentation that survive due-diligence rooms." },
            { title: "Fractional Engineering Leadership", description: "Fractional CTO, head-of-eng, and architecture authority while you decide who to hire full-time." },
            { title: "Launch & Ramp Operations", description: "Marketing-site engineering, analytics, support tooling, and the operational scaffolding for a public launch week." },
        ],
    },

    "prototyping": {
        accent: "#A78BFA",
        description:
            "Rapid prototyping engagements — clickable Figma to working code in two to four weeks — for validating hard product hypotheses before committing build budget.",
        features: [
            { title: "Concept Sprints", description: "One-week problem-framing sprints producing user-validated direction, scope decisions, and risk inventory." },
            { title: "Clickable Prototypes", description: "High-fidelity Figma prototypes with realistic data, edge cases, and stakeholder usability sessions." },
            { title: "Functional Prototypes", description: "Working code prototypes in React, Next.js, or React Native — real interactions, real data flows, no marketing slides." },
            { title: "User Testing Programs", description: "Moderated and unmoderated usability testing, with severity-ranked findings and prioritised next-step recommendations." },
            { title: "Technology Spikes", description: "Time-boxed engineering spikes on the hardest unknowns — feasibility, performance, integration risk — before scope is locked." },
            { title: "Discovery-to-Delivery Bridge", description: "Output that flows directly into engineering build with documented architecture, design tokens, and acceptance criteria." },
        ],
    },

    "hr-services": {
        accent: "#FB7185",
        description:
            "Engineering hiring, contracting, and people operations engineering — for organisations that need senior engineering talent without the agency markup.",
        features: [
            { title: "Senior Engineering Placement", description: "Vetted senior IC and engineering management placements with technical interview rigour and reference depth." },
            { title: "Engineering Contractor Squads", description: "Pre-formed engineering squads available for fixed-scope engagements — design, engineering, ops in one team." },
            { title: "Technical Interview Engineering", description: "Interview design, calibration, and structured-interview frameworks built for engineering teams that scale." },
            { title: "Engineering Operations", description: "Engineering metrics, sprint mechanics, and team-health instrumentation that surfaces problems before they show in delivery." },
            { title: "Compensation Architecture", description: "Levelling frameworks, market-anchored compensation bands, and equity-grant strategy aligned to your stage." },
            { title: "Engineering Onboarding Systems", description: "Time-to-first-PR programs, runbooks, and onboarding curricula that make week-one productivity normal." },
        ],
    },

    /* ──────────────────────────────  OPERATIONS  ────────────────────────────── */

    "backup-data-protection": {
        accent: "#0EA5E9",
        description:
            "Backup, disaster recovery, and data-protection engineering — for organisations whose RPO and RTO commitments are written into customer contracts.",
        features: [
            { title: "Backup Architecture", description: "Application-aware backups across Veeam, Rubrik, and cloud-native services with retention tied to regulatory requirements." },
            { title: "Disaster Recovery Engineering", description: "Multi-region DR sites, automated failover, and explicit RPO/RTO commitments tested under realistic load." },
            { title: "Immutable & Air-Gapped Backups", description: "Ransomware-resistant backups with WORM storage, isolated vaults, and verified restore drills." },
            { title: "Database Backup & Recovery", description: "PITR, logical replication, and recovery rehearsals for PostgreSQL, MySQL, MongoDB, and SQL Server at scale." },
            { title: "DR Runbook Engineering", description: "Documented failover, failback, and incident-comms runbooks with named owners and quarterly drill schedules." },
            { title: "Compliance Restore Evidence", description: "Restore evidence packages and chain-of-custody documentation for SOC 2, HIPAA, and FedRAMP audits." },
        ],
    },

    "aws-microsoft-google": {
        accent: "#F59E0B",
        description:
            "Hyperscaler engineering across AWS, Azure, and GCP — landing zones, FinOps governance, and platform engineering tuned to each cloud's actual operating model.",
        features: [
            { title: "Landing Zone Architecture", description: "AWS Control Tower, Azure Landing Zone, and GCP foundation architectures with policy guardrails built in." },
            { title: "Identity & Access Federation", description: "SSO federation, role-based access, and least-privilege design across hybrid and multi-cloud estates." },
            { title: "Cost Governance (FinOps)", description: "Tagging strategy, showback/chargeback models, reserved-instance management, and weekly cost-anomaly review." },
            { title: "Cloud Security Baselines", description: "CIS Benchmarks, security hub aggregation, and automated remediation tied to your detection and response stack." },
            { title: "Hybrid Cloud Networking", description: "Direct Connect, ExpressRoute, Cloud Interconnect, and software-defined networking across hyperscaler boundaries." },
            { title: "Platform Engineering", description: "Internal developer platforms layered atop hyperscaler primitives — golden paths, self-service infra, and golden-image management." },
        ],
    },

    "payment-solutions": {
        accent: "#22C55E",
        description:
            "Payment systems engineering — gateway integration, ledger design, fraud and reconciliation tooling — built for the regulatory weight of moving real money.",
        features: [
            { title: "Gateway Integration", description: "Stripe, Adyen, Braintree, and bank-direct integrations with idempotent operations and consistent retry semantics." },
            { title: "Ledger & Wallet Engineering", description: "Double-entry ledgers, multi-currency wallets, and settlement engines built for auditability and reconciliation." },
            { title: "Card Issuance & Acquiring", description: "Issuer-processor integration (Marqeta, Lithic), program management, and BIN sponsorship workflows." },
            { title: "Fraud & Risk Engineering", description: "Real-time fraud scoring, velocity rules, manual review queues, and chargeback workflow automation." },
            { title: "PCI DSS 4.0 Compliance", description: "Scope reduction, network segmentation, tokenization, and quarterly attestation programs." },
            { title: "Reconciliation Operations", description: "Automated reconciliation against processor, bank, and ledger sources with exception queues and audit trails." },
        ],
    },

    "operational-tools": {
        accent: "#3B82F6",
        description:
            "Operational tooling engineering — incident management, observability, on-call orchestration — the unglamorous systems that make engineering organisations sustainable.",
        features: [
            { title: "Incident Management", description: "PagerDuty, Opsgenie, and Incident.io implementations with explicit severity matrices and escalation policies." },
            { title: "Observability Platforms", description: "Datadog, New Relic, Honeycomb, and Grafana Cloud integration with SLO-driven alerting and noise reduction." },
            { title: "Status Page Engineering", description: "Status pages, customer-facing incident comms, and component-dependency graphs tied to your on-call rotation." },
            { title: "On-Call Engineering", description: "Rotation design, runbook templates, blameless-postmortem culture, and on-call sustainability metrics." },
            { title: "Internal Developer Platforms", description: "Backstage and self-service platform tooling that gives engineers golden paths without locking them in." },
            { title: "Operational Reporting", description: "Engineering metrics (DORA, SPACE), reliability reporting, and exec-friendly summaries for board materials." },
        ],
    },

    "software-quality-testing": {
        accent: "#EF4444",
        description:
            "Quality engineering and test automation — unit, integration, performance, accessibility, and security testing — built into your delivery pipeline, not stapled on at the end.",
        features: [
            { title: "Test Strategy Architecture", description: "Test pyramid design, environment strategy, and risk-based testing plans across unit, integration, and end-to-end layers." },
            { title: "Automated Test Suites", description: "Playwright, Cypress, Jest, and Pytest suites with stable selectors, parallel execution, and CI-gated rollouts." },
            { title: "Performance & Load Testing", description: "k6, JMeter, and Locust load tests against realistic production traffic models with SLO-driven pass/fail gates." },
            { title: "Accessibility Testing", description: "WCAG 2.2 AA conformance — automated axe-core checks, manual screen reader testing, and remediation tracking." },
            { title: "Security Testing", description: "OWASP Top 10 testing, dependency scanning, secrets detection, and pen-test coordination with named remediation owners." },
            { title: "QA Operations", description: "Test data management, environment provisioning, defect triage workflows, and release-readiness reporting." },
        ],
    },

    "info-xchange": {
        accent: "#0891B2",
        description:
            "Information-exchange platforms — secure document orchestration, identity verification, and inter-organisational data sharing — engineered for regulated environments.",
        features: [
            { title: "Secure Document Exchange", description: "End-to-end encrypted document workflows with audit trails, access policies, and watermarking for regulated industries." },
            { title: "Identity Verification", description: "KYC/KYB pipelines with document OCR, biometric verification, and sanctions screening integrated cleanly." },
            { title: "API Marketplace Engineering", description: "Federated API marketplaces, sandbox environments, and developer-portal infrastructure for partner integrations." },
            { title: "Consent & Data Sharing", description: "User-consent management, fine-grained data-sharing controls, and revocation flows that meet GDPR Article 7 standards." },
            { title: "Workflow Orchestration", description: "Multi-party approval flows, signature workflows, and stateful business-process orchestration across organisations." },
            { title: "Inter-Org Data Pipelines", description: "Federated identity, OAuth-based authorization, and event-driven data exchange between organisational boundaries." },
        ],
    },
};

export const allServices: Service[] = servicesByGroup.flatMap((g) =>
    g.items.map((item) => {
        const o = overrides[item.slug];
        if (o) {
            return {
                slug: item.slug,
                title: item.title,
                group: g.title,
                accent: o.accent,
                description: o.description,
                features: o.features,
            };
        }
        // Fallback — should never trigger now that every slug has an override,
        // but kept for resilience if nav.ts adds a new slug before overrides
        // are written.
        return {
            slug: item.slug,
            title: item.title,
            group: g.title,
            accent: "#635BFF",
            description: `${item.title} engineering — strategy, architecture, implementation, and managed operations from one senior team.`,
            features: [
                { title: "Strategy & Discovery", description: `Workshops and assessments to define how ${item.title.toLowerCase()} fits your business goals and stack.` },
                { title: "Architecture & Design", description: `Scalable, secure architectures around your performance and compliance requirements.` },
                { title: "Implementation", description: `Hands-on engineering teams build, integrate, and deploy production-ready ${item.title.toLowerCase()} solutions.` },
                { title: "Integration", description: `Plug into existing data sources, APIs, and operational systems with minimal disruption.` },
                { title: "Optimization", description: `Continuous tuning and monitoring to keep performance high as needs evolve.` },
                { title: "Managed Operations", description: `24/7 support, SLA-backed monitoring, and ongoing improvements as a managed service.` },
            ],
        };
    })
);

export const allServiceSlugs = allServices.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | undefined {
    return allServices.find((s) => s.slug === slug);
}
