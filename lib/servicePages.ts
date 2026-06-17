// Per-service detail-page content — drives /services/[slug].
// Every service has: hero (headline + hook + intro), six capabilities
// with optional stack tags, an engagement spine (5 phases), and a
// categorised toolchain.

export type ServiceCapability = {
    title: string;
    description: string;
    /** Optional inline "delivered with" pill — language/framework/cloud tag. */
    stackTag?: string;
};

export type ServiceSpinePhase = {
    ord: string;
    title: string;
    body: string;
    deliverables: string[];
};

export type ServicePageContent = {
    headline: string;
    intro: string;
    services: ServiceCapability[];
    /** One-line hook shown above the headline in the new template. */
    hook?: string;
    /** Renders the new template when supplied. */
    spine?: ServiceSpinePhase[];
    /** Categorised toolchain — group name → tools. */
    stack?: Record<string, string[]>;
};

// ── Reusable spine shapes ──────────────────────────────────────────────
// Most engagements follow the same five-phase rhythm, but the BODY is
// tailored per practice. These helper builders keep the per-service
// entries scannable while still reading as written-for-this-service.

const spine = (
    phases: Array<[body: string, deliverables: string[]]>,
): ServiceSpinePhase[] => {
    const titles = ["Discover", "Design", "Engineer", "Deploy", "Operate"];
    return phases.map(([body, deliverables], i) => ({
        ord: String(i + 1).padStart(2, "0"),
        title: titles[i],
        body,
        deliverables,
    }));
};

export const servicePageContent: Record<string, ServicePageContent> = {
    "artificial-intelligence": {
        headline: "AI engineered for production.",
        hook: "Models that land — not demos.",
        intro: "We design and build AI systems that integrate into real operating environments. Predictive models, language interfaces, computer vision, and decision tooling — each tied to your domain data, your risk tolerance, and the metrics you actually report on.",
        services: [
            { title: "Machine Learning Models", description: "Custom ML models trained on your data to automate decisions, predict outcomes, and surface patterns at scale.", stackTag: "Python · scikit-learn · PyTorch" },
            { title: "Natural Language Processing", description: "Assistants, retrieval, summarisation, and classification systems tuned to your domain language and policy.", stackTag: "Transformers · LangChain · spaCy" },
            { title: "Computer Vision", description: "Inspection, detection, and visual-data pipelines — from prototype model to deployed inference service.", stackTag: "OpenCV · YOLO · TensorRT" },
            { title: "Predictive Analytics", description: "Forecasting models that surface risk, demand, and opportunity before they hit the operating layer.", stackTag: "XGBoost · Prophet · Databricks" },
            { title: "Generative AI", description: "LLM-powered copilots and content systems tied into your knowledge base, with guardrails and audit trails.", stackTag: "OpenAI · Anthropic · LangChain" },
            { title: "MLOps & Deployment", description: "Training, evaluation, deployment, and drift monitoring pipelines built for the operating reality of models.", stackTag: "MLflow · Kubeflow · Vertex AI" },
        ],
        spine: spine([
            ["Map the decision the model is meant to support. Audit data availability, label quality, and the risk envelope.", ["Use-case brief", "Data audit", "Guardrails frame"]],
            ["Choose the model family and the evaluation that will tell us it works. Define where the human stays in the loop.", ["Architecture", "Eval harness", "HITL design"]],
            ["Build the pipeline end-to-end — ingestion, training, inference, monitoring, and the feedback loop.", ["Training pipeline", "Inference service", "Monitoring"]],
            ["Ship behind feature flags with rollback, latency budgets, and an on-call runbook for the first ninety days.", ["Canary rollout", "Runbook", "SLO targets"]],
            ["Continuous evaluation, retraining triggers, and drift detection. Models age — the operating posture acknowledges it.", ["Drift monitoring", "Retrain triggers", "Quarterly review"]],
        ]),
        stack: {
            Languages: ["Python", "TypeScript", "Go", "Rust"],
            Frameworks: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex"],
            Cloud: ["AWS Bedrock", "Azure ML", "Vertex AI", "Modal"],
            Data: ["Snowflake", "Databricks", "BigQuery", "Pinecone", "Weaviate"],
            Ops: ["MLflow", "Weights & Biases", "Kubeflow", "Datadog", "Langfuse"],
        },
    },

    "cyber-security": {
        headline: "Security engineered to hold under audit.",
        hook: "Built for regulators, not posters.",
        intro: "We build security postures that survive both the breach attempt and the audit. Zero-trust architecture, continuous detection, and end-to-end compliance — for organisations that can't ship a postmortem to a regulator.",
        services: [
            { title: "Managed Security Services", description: "24/7 monitoring to detect security threats early, with quick response to attacks that prevents system damage.", stackTag: "SIEM · SOAR · MDR" },
            { title: "Network Security", description: "Firewalls and intrusion prevention to stop cyber intrusions, plus DDoS protection to ensure business continuity.", stackTag: "Palo Alto · Cloudflare · Zscaler" },
            { title: "Endpoint Protection", description: "Defense against malware, ransomware, and phishing, with continuous monitoring of all connected devices.", stackTag: "CrowdStrike · SentinelOne" },
            { title: "Data Security & Encryption", description: "Protect sensitive data with strong encryption, and secure storage and backup solutions for data recovery.", stackTag: "Vault · KMS · TLS 1.3" },
            { title: "Identity & Access Management", description: "Multi-factor authentication (MFA) for strong login security, and access controls to prevent unauthorized entry.", stackTag: "Okta · Auth0 · Entra ID" },
            { title: "Threat Intelligence & Response", description: "Real-time insights into emerging cyber threats, with rapid response to security breaches and attacks.", stackTag: "MITRE ATT&CK · Recorded Future" },
        ],
        spine: spine([
            ["Map the threat model and the regulatory surface. Inventory data flows, identity boundaries, and existing controls.", ["Threat model", "Data-flow map", "Control gap analysis"]],
            ["Design the zero-trust target state — segmentation, identity, encryption, logging — sized to the risk envelope.", ["Reference architecture", "Identity model", "Logging schema"]],
            ["Stand up controls, detection rules, and incident playbooks. Wire the SIEM and the response runbook end-to-end.", ["Control rollout", "Detection rules", "IR playbooks"]],
            ["Cut over in phases with measured impact. Tabletop and red-team before declaring steady state.", ["Phased cutover", "Red-team report", "Sign-off"]],
            ["24/7 SOC operations, monthly attack-surface review, and audit-ready evidence collection.", ["SOC runbook", "Quarterly review", "Audit evidence"]],
        ]),
        stack: {
            "Detection & Response": ["Splunk", "Sentinel", "Chronicle", "Elastic"],
            "Endpoint & Network": ["CrowdStrike", "SentinelOne", "Palo Alto", "Cloudflare"],
            Identity: ["Okta", "Auth0", "Entra ID", "Ping"],
            "Cloud Security": ["Wiz", "Lacework", "Prisma", "AWS Security Hub"],
            "Compliance & Governance": ["Vanta", "Drata", "ServiceNow GRC"],
        },
    },

    "network-solutions": {
        headline: "Networks that quietly hold the business up.",
        hook: "Connectivity nobody has to think about.",
        intro: "We design, implement, and operate network infrastructure that keeps the business moving — performant under spikes, secure across boundaries, and scalable across sites. Reliable connectivity is invisible to users and visible only to operators.",
        services: [
            { title: "Network Design", description: "Custom-built, scalable network architecture with high availability to minimize downtime.", stackTag: "Cisco · Arista · Juniper" },
            { title: "Wireless Networking", description: "High-performance, secure Wi-Fi for all environments.", stackTag: "Cisco Meraki · Aruba · Wi-Fi 6E" },
            { title: "Network Security Services", description: "Comprehensive protection against cyber threats.", stackTag: "Firewalls · IPS · ZTNA" },
            { title: "Network Monitoring", description: "Real-time performance monitoring and troubleshooting.", stackTag: "Datadog · ThousandEyes · SolarWinds" },
            { title: "Cloud Networking", description: "Fast and secure cloud-based networking across platforms.", stackTag: "AWS TGW · Azure vWAN · GCP NCC" },
            { title: "Virtual Private Networks", description: "Secure, encrypted connectivity for remote access.", stackTag: "Tailscale · WireGuard · IPsec" },
        ],
        spine: spine([
            ["Survey traffic patterns, sites, and service-level expectations. Identify single points of failure and choke points.", ["Site survey", "Traffic baseline", "SLA target"]],
            ["Design the segmented, multi-site topology — routing, security, observability — with documented decisions.", ["Topology diagram", "Routing plan", "Security zones"]],
            ["Stand up the fabric in phases. Configure routing, firewalls, wireless, and the monitoring overlay.", ["Phased rollout", "Config baselines", "Monitoring dashboards"]],
            ["Cut over during maintenance windows with rollback paths. Validate latency, availability, and security posture.", ["Cutover plan", "Validation tests", "Rollback runbook"]],
            ["NOC operations, change management, and quarterly capacity reviews.", ["NOC runbook", "Change process", "Capacity review"]],
        ]),
        stack: {
            "Switching & Routing": ["Cisco", "Arista", "Juniper"],
            Wireless: ["Cisco Meraki", "Aruba", "Ubiquiti"],
            "Security & Firewalls": ["Palo Alto", "Fortinet", "Check Point"],
            "Cloud Networking": ["AWS TGW", "Azure vWAN", "GCP NCC", "Cloudflare"],
            "Observability": ["Datadog", "ThousandEyes", "SolarWinds", "Kentik"],
        },
    },

    cloud: {
        headline: "Cloud done deliberately.",
        hook: "Not lift-and-shift. Move-and-improve.",
        intro: "We design and operate cloud environments that earn their bill — landing zones, migrations, multi-cloud architectures, and cost engineering tied to the workloads they actually carry. Speed comes from clarity, not from skipping the architecture.",
        services: [
            { title: "Cloud Consulting & Strategy", description: "Design the ideal cloud roadmap tailored to your business goals.", stackTag: "TBM · Well-Architected" },
            { title: "Cloud Migration Services", description: "Seamless migration of applications, data, and infrastructure with minimal downtime.", stackTag: "AWS MGN · Azure Migrate · GCP M4A" },
            { title: "Cloud Infrastructure", description: "24/7 monitoring, optimization, and automated scaling of cloud environments.", stackTag: "Terraform · Kubernetes · ArgoCD" },
            { title: "Hybrid & Multi-Cloud Solutions", description: "Integration of on-premises and multiple cloud providers for maximum flexibility.", stackTag: "Anthos · Azure Arc · EKS Anywhere" },
            { title: "Cloud Security & Services", description: "Advanced protection, encryption, identity management, and regulatory compliance.", stackTag: "Wiz · Prisma · AWS Security Hub" },
            { title: "Cloud Backup & Recovery", description: "Ensure business continuity while reducing operational costs.", stackTag: "Veeam · Druva · AWS Backup" },
        ],
        spine: spine([
            ["Inventory workloads, dependencies, and the cost baseline. Decide what migrates, what refactors, what retires.", ["Workload inventory", "6Rs analysis", "Cost baseline"]],
            ["Design the landing zone, network, identity, and guardrails. Cost ceiling enforced from day one.", ["Landing zone", "IAM model", "Cost guardrails"]],
            ["Build automation — IaC modules, pipelines, monitoring, and the migration runbooks. Wave the workloads in.", ["IaC modules", "Migration waves", "Observability"]],
            ["Cut over by wave with go/no-go gates. Validate performance, cost, and compliance against baseline.", ["Wave cutovers", "Validation gates", "FinOps signoff"]],
            ["Operate with FinOps discipline — monthly cost review, rightsizing, and continuous compliance scanning.", ["FinOps cadence", "Rightsizing", "Compliance scans"]],
        ]),
        stack: {
            Platforms: ["AWS", "Azure", "Google Cloud", "Oracle Cloud"],
            "IaC & Orchestration": ["Terraform", "Pulumi", "Kubernetes", "Helm"],
            "Delivery": ["GitHub Actions", "ArgoCD", "GitLab CI", "Spinnaker"],
            Observability: ["Datadog", "Grafana", "New Relic", "CloudWatch"],
            FinOps: ["Apptio", "CloudHealth", "Vantage", "Kubecost"],
        },
    },

    data: {
        headline: "Data platforms that turn analytics into action.",
        hook: "Insight is the byproduct. Action is the product.",
        intro: "We build the data layer companies actually use — ingestion, governance, modelling, and self-serve analytics — so the business stops debating the numbers and starts moving on them.",
        services: [
            { title: "Data Management & Integration", description: "Centralize, organize, and ensure high-quality, accessible data across platforms.", stackTag: "Fivetran · Airbyte · dbt" },
            { title: "Data & Business Analytics", description: "Deliver predictive analytics, reporting, and interactive dashboards.", stackTag: "Looker · Tableau · Mode" },
            { title: "Data Governance & Compliance", description: "Implement strong governance and auditing, and ensure regulatory compliance.", stackTag: "Collibra · Alation · Atlan" },
            { title: "Cloud Data Solutions", description: "Scalable, secure cloud storage, backup, and data-processing integration with AWS, Azure, and more.", stackTag: "Snowflake · Databricks · BigQuery" },
            { title: "Data Migration Services", description: "Secure, seamless data migration with minimal downtime and zero data loss.", stackTag: "AWS DMS · Striim · Debezium" },
            { title: "Big Data & Data Quality", description: "Handle large datasets and real-time insights, and ensure clean, consistent, reliable data.", stackTag: "Spark · Kafka · Great Expectations" },
        ],
        spine: spine([
            ["Profile sources, contracts, and the decisions data is meant to support. Identify quality and latency requirements.", ["Source profile", "Decision map", "SLA matrix"]],
            ["Model the warehouse, the semantic layer, and the governance posture. Define ownership for every dataset.", ["Dimensional model", "Semantic layer", "Ownership map"]],
            ["Build the pipelines — ingestion, transformation, quality tests, and the BI surface. Documentation as you go.", ["Pipelines", "Quality tests", "BI dashboards"]],
            ["Roll out to first-party consumers with shadow runs and parallel reconciliation. No silent cutovers.", ["Shadow run", "Reconciliation", "Stakeholder signoff"]],
            ["Steady-state observability, lineage tracking, and quarterly cost-and-quality review.", ["Observability", "Lineage", "Quarterly review"]],
        ]),
        stack: {
            Warehouse: ["Snowflake", "BigQuery", "Databricks", "Redshift"],
            "Ingestion & Transform": ["Fivetran", "Airbyte", "dbt", "Apache Spark"],
            Streaming: ["Kafka", "Kinesis", "Confluent", "Flink"],
            BI: ["Looker", "Tableau", "Mode", "Hex"],
            Governance: ["Collibra", "Atlan", "DataHub", "Great Expectations"],
        },
    },

    devops: {
        headline: "DevOps that pays the team back.",
        hook: "Speed without surprises.",
        intro: "We build delivery platforms that compress feedback loops without compromising stability — pipelines, IaC, container fleets, and observability that engineers actually want to use.",
        services: [
            { title: "CI/CD Pipeline Automation", description: "Implement automated build, test, and deployment pipelines for speed and precision.", stackTag: "GitHub Actions · GitLab CI · Buildkite" },
            { title: "Containerization Solutions", description: "Deploy applications with Kubernetes, Docker, and cloud-native tools for flexibility and scale.", stackTag: "Kubernetes · Docker · Helm" },
            { title: "Infrastructure as Code (IaC)", description: "Manage your entire infrastructure with code using Terraform, Ansible, and automation scripts.", stackTag: "Terraform · Pulumi · Ansible" },
            { title: "Performance Optimization", description: "Proactively monitor performance using Prometheus, Grafana, and the ELK Stack.", stackTag: "Prometheus · Grafana · ELK" },
            { title: "DevSecOps & Security Automation", description: "Shift security left in the pipeline — automated checks, vulnerability scans, and compliance.", stackTag: "Snyk · Trivy · OPA" },
            { title: "Microservices Architecture", description: "Break monoliths into scalable microservices, with serverless for speed and cost.", stackTag: "EKS · Lambda · gRPC" },
        ],
        spine: spine([
            ["Audit the current delivery posture — lead time, change-fail rate, recovery time, deployment frequency. DORA in numbers.", ["DORA baseline", "Pain-point inventory", "Target metrics"]],
            ["Design the platform — pipelines, golden paths, IaC modules, security gates — to remove the recurring friction.", ["Golden path", "IaC modules", "Security gates"]],
            ["Stand up the pipeline, container fleet, and observability. Migrate first service end-to-end as the proof.", ["Pipeline rollout", "Pilot service", "Observability"]],
            ["Migrate remaining services in waves with parallel runs. Track DORA metrics before and after each wave.", ["Migration waves", "DORA delta", "Rollback procedure"]],
            ["Platform team posture — on-call rotation, golden-path maintenance, and quarterly developer-experience reviews.", ["On-call rota", "Path upkeep", "DX review"]],
        ]),
        stack: {
            "CI/CD": ["GitHub Actions", "GitLab CI", "Buildkite", "ArgoCD"],
            Containers: ["Kubernetes", "Docker", "Helm", "Kustomize"],
            IaC: ["Terraform", "Pulumi", "Ansible", "Crossplane"],
            Observability: ["Prometheus", "Grafana", "Datadog", "Honeycomb"],
            Security: ["Snyk", "Trivy", "OPA", "Aqua"],
        },
    },

    "digital-solutions-web-app": {
        headline: "Web and mobile experiences engineered to ship.",
        hook: "Real apps. Real users. Real performance.",
        intro: "We design and build web and mobile products that perform on the day they ship and the day a campaign lands. Custom apps, e-commerce, enterprise tools — engineered for the device, the network, and the SEO crawler.",
        services: [
            { title: "Web Development", description: "SEO-friendly, responsive, and custom websites.", stackTag: "Next.js · React · TypeScript" },
            { title: "Mobile App Development", description: "Native and cross-platform mobile solutions for Android and iOS.", stackTag: "Swift · Kotlin · React Native" },
            { title: "UI/UX Design", description: "Engaging, intuitive designs that offer seamless user journeys.", stackTag: "Figma · Framer · Storybook" },
            { title: "Cloud & API Integration", description: "Scalable cloud solutions and third-party integrations for greater functionality.", stackTag: "GraphQL · REST · tRPC" },
            { title: "Enterprise Solutions", description: "Customized enterprise software for automation, productivity, and growth.", stackTag: "Node.js · .NET · Java" },
            { title: "E-commerce Solutions", description: "End-to-end e-commerce development for secure, scalable online stores.", stackTag: "Shopify · commercetools · Stripe" },
        ],
        spine: spine([
            ["Map the product to the actual customer journey, the device mix, and the SEO and accessibility constraints.", ["Journey map", "Tech audit", "Goal metrics"]],
            ["Design the architecture, the design system, and the performance budget. SSR, ISR, or static — chosen on purpose.", ["Architecture", "Design system", "Perf budget"]],
            ["Build feature-by-feature with continuous deploy to staging. SEO, a11y, and analytics wired from day one.", ["Feature releases", "Staging deploys", "Quality gates"]],
            ["Launch with canary or blue-green. Core Web Vitals validated on real devices before go-live.", ["Launch plan", "Vitals report", "Rollback path"]],
            ["Steady-state monitoring of vitals, conversion, errors. Quarterly review on what the data is telling us to fix next.", ["Vitals monitoring", "Error budgets", "Quarterly review"]],
        ]),
        stack: {
            Web: ["Next.js", "React", "Vue", "Svelte"],
            Mobile: ["Swift", "Kotlin", "React Native", "Flutter"],
            Backend: ["Node.js", "Go", ".NET", "Java"],
            "Design & Build": ["Figma", "Storybook", "Framer", "Tailwind"],
            "Commerce & Pay": ["Shopify", "commercetools", "Stripe", "Adyen"],
        },
    },

    "ui-ux-development": {
        headline: "Design that lifts the numbers it's measured on.",
        hook: "Aesthetic, but accountable.",
        intro: "We craft interfaces that respect both the brand and the metric — converting visitors, guiding tasks, and reducing the cost of confusion. Design as engineering, not decoration.",
        services: [
            { title: "User Research & Strategy", description: "Research, personas, and journey mapping to uncover user needs and define strategic design goals.", stackTag: "Dovetail · Maze · UserTesting" },
            { title: "User Interface (UI) Design", description: "Visually compelling interfaces that bring your brand to life across apps and platforms.", stackTag: "Figma · Sketch · Principle" },
            { title: "User Experience (UX) Design", description: "Wireframes, prototypes, and interaction flows crafted to maximize engagement and ease of use.", stackTag: "Figma · ProtoPie · Origami" },
            { title: "Web & Mobile App Design", description: "Seamless experiences tailored for iOS, Android, and web — designed to delight on every device.", stackTag: "Figma · iOS HIG · Material 3" },
            { title: "Design Systems & Branding", description: "Scalable design systems and consistent UI components that grow with your product.", stackTag: "Figma · Storybook · Tokens Studio" },
            { title: "Usability Testing", description: "Real-time testing, analytics, and A/B experimentation to fine-tune performance post-launch.", stackTag: "Maze · Hotjar · Optimizely" },
        ],
        spine: spine([
            ["Research the real users — interviews, analytics, support tickets — and the decisions the product is meant to support.", ["User research", "Journey map", "Design brief"]],
            ["Architect the experience and define the design language. Tokens, components, motion — codified, not improvised.", ["IA & flows", "Design tokens", "Component library"]],
            ["Ship designs as code-ready artefacts. Pair with engineers, document interactions, instrument analytics.", ["Component specs", "Prototypes", "Analytics map"]],
            ["Test with real users before launch. A/B the high-stakes flows. Validate against the metrics that count.", ["Usability report", "A/B results", "Launch package"]],
            ["Observe how the product is actually used. Iterate the design system; close the gap between intent and behaviour.", ["Heatmaps & analytics", "DS updates", "Quarterly review"]],
        ]),
        stack: {
            "Design Tools": ["Figma", "Sketch", "Framer", "Principle"],
            Research: ["Dovetail", "Maze", "UserTesting", "Lookback"],
            Prototyping: ["Figma", "ProtoPie", "Origami", "Rive"],
            "Design Systems": ["Storybook", "Tokens Studio", "Zeroheight"],
            Analytics: ["Amplitude", "Mixpanel", "Hotjar", "Optimizely"],
        },
    },

    "cross-platform-apps": {
        headline: "One codebase. Every surface.",
        hook: "Native-grade across iOS, Android, web, and desktop.",
        intro: "We build cross-platform applications that look and feel native on every device — shared business logic, platform-aware UI, and the performance characteristics users expect from a first-party app.",
        services: [
            { title: "Flutter App Development", description: "Beautiful and fast apps for mobile, web, and desktop from a single codebase.", stackTag: "Flutter · Dart · Riverpod" },
            { title: "React Native Development", description: "Feature-rich, high-performing apps with native-like experiences.", stackTag: "React Native · Expo · Reanimated" },
            { title: "Progressive Web Apps (PWA)", description: "Browser-based apps that function like native ones.", stackTag: "Service Workers · Workbox · Web Push" },
            { title: "Hybrid App Development", description: "Combine web and mobile technologies for agile delivery.", stackTag: "Capacitor · Ionic · Cordova" },
            { title: "Cross-Platform UI/UX Design", description: "Adaptive designs that maintain consistency across devices.", stackTag: "Figma · Material · iOS HIG" },
            { title: "Custom Plugin & API Integration", description: "Tailor-made integrations to enhance app functionality.", stackTag: "Native modules · gRPC · GraphQL" },
        ],
        spine: spine([
            ["Map device targets, performance budgets, and the native features that genuinely need platform code.", ["Target matrix", "Perf budgets", "Native surface"]],
            ["Design the shared architecture and the platform-aware UI layer. Decide where to share, where to fork.", ["Architecture", "UI patterns", "Sharing strategy"]],
            ["Build with CI for both stores, continuous device-farm testing, and OTA update infrastructure.", ["App builds", "Device farm", "OTA channel"]],
            ["Submit, soft-launch by region, and watch the crash and review feeds. Iterate on the first 14 days.", ["Store launch", "Soft-launch metrics", "Hotfix queue"]],
            ["Steady-state release train, store optimisation, and quarterly platform-update absorption.", ["Release train", "ASO review", "Platform updates"]],
        ]),
        stack: {
            "Cross-Platform": ["Flutter", "React Native", "Expo", "Ionic"],
            Native: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose"],
            Backend: ["Node.js", "Firebase", "Supabase", "AWS Amplify"],
            "Testing & Distribution": ["Detox", "Maestro", "Firebase App Distribution", "TestFlight"],
            Observability: ["Sentry", "Bugsnag", "Datadog RUM", "Crashlytics"],
        },
    },

    "blockchain-app-development": {
        headline: "Blockchain that ships, settles, and survives audit.",
        hook: "On-chain when it matters. Off-chain when it doesn't.",
        intro: "We build blockchain systems that earn the complexity — smart contracts, wallets, DApps, and NFT or DeFi platforms — engineered for security, gas economy, and the audit posture institutional users require.",
        services: [
            { title: "Blockchain Development", description: "Build secure public, private, or hybrid blockchain systems.", stackTag: "Ethereum · Polygon · Solana" },
            { title: "Smart Contracts & Audits", description: "Write and verify automated, tamper-proof smart contracts.", stackTag: "Solidity · Foundry · Hardhat" },
            { title: "DApps (Decentralized Apps)", description: "Launch scalable apps in DeFi, gaming, healthcare, and more.", stackTag: "Wagmi · Viem · The Graph" },
            { title: "Crypto Wallet Development", description: "Multi-currency wallets with high-level encryption and a user-friendly UI.", stackTag: "WalletConnect · MetaMask SDK" },
            { title: "NFT Platforms & Marketplaces", description: "Create, trade, and manage NFTs with ownership transparency.", stackTag: "ERC-721 · ERC-1155 · IPFS" },
            { title: "DeFi Solutions", description: "Build DEXs, yield farms, lending protocols, staking platforms, and AMMs.", stackTag: "AMM · Aave · Uniswap V4" },
        ],
        spine: spine([
            ["Validate that the problem actually needs a chain. Map trust assumptions, regulatory posture, and tokenomics.", ["Trust model", "Tokenomics", "Regulatory review"]],
            ["Design the contract architecture, upgrade strategy, and off-chain components. Optimise for gas before writing it.", ["Contract architecture", "Gas budget", "Upgrade plan"]],
            ["Build with deep tests, fuzzing, and formal methods where they pay. The audit starts during engineering, not after.", ["Test suite", "Fuzz coverage", "Internal audit"]],
            ["External audit, testnet rollout, and phased mainnet deployment with circuit breakers and timelocks.", ["Audit report", "Testnet release", "Mainnet phased"]],
            ["Monitoring of contract state, treasury, and on-chain anomalies. Incident response with multisig governance.", ["On-chain monitor", "Treasury ops", "Incident playbook"]],
        ]),
        stack: {
            Chains: ["Ethereum", "Polygon", "Solana", "Arbitrum", "Base"],
            "Smart Contracts": ["Solidity", "Rust", "Foundry", "Hardhat"],
            Frontend: ["Wagmi", "Viem", "RainbowKit", "WalletConnect"],
            Indexing: ["The Graph", "Alchemy", "Covalent"],
            "Audit & Security": ["Slither", "Mythril", "Echidna", "OpenZeppelin"],
        },
    },

    "iot-digital-engineering": {
        headline: "IoT that turns fleet telemetry into operating decisions.",
        hook: "Sensors are easy. Decisions are the work.",
        intro: "We build IoT and digital-engineering systems that move beyond connected dashboards — instrumented assets, edge processing, and the cloud-side intelligence that closes the loop between observation and action.",
        services: [
            { title: "IoT Consulting & Strategy", description: "Develop IoT strategies aligned with business goals and efficiency.", stackTag: "Industry 4.0 · Edge-first" },
            { title: "IoT Solution Integration", description: "Custom IoT solutions with sensors, connectivity, and data analytics.", stackTag: "MQTT · OPC UA · LoRaWAN" },
            { title: "IoT Device Management", description: "Secure, scalable device connectivity and lifecycle management.", stackTag: "AWS IoT · Azure IoT Hub · Mender" },
            { title: "Data Analytics Integration", description: "Real-time insights for decision-making and operational efficiency.", stackTag: "Kinesis · Timestream · Grafana" },
            { title: "Digital Twin Technology", description: "Create digital replicas of assets for monitoring and predictive maintenance.", stackTag: "AWS TwinMaker · Azure Digital Twins" },
            { title: "AI-Driven Smart Automation", description: "Enhance efficiency and decision-making using AI and automation.", stackTag: "Edge ML · TensorFlow Lite · ONNX" },
        ],
        spine: spine([
            ["Inventory assets, telemetry available, and the decision the IoT layer is meant to support. Edge vs cloud.", ["Asset inventory", "Telemetry map", "Decision model"]],
            ["Design the edge stack, connectivity tier, security posture, and the data contract with the cloud layer.", ["Edge architecture", "Connectivity plan", "Data contract"]],
            ["Build firmware, edge agents, ingestion pipelines, and the operating dashboards. Field test before fleet rollout.", ["Firmware", "Edge agents", "Dashboards"]],
            ["Roll the fleet by site or batch. OTA channels, signed updates, rollback paths — assume the device is far away.", ["Fleet rollout", "OTA channel", "Rollback procedure"]],
            ["Steady-state telemetry monitoring, anomaly detection, and quarterly twin reconciliation against ground truth.", ["Telemetry health", "Anomaly alerts", "Twin reconciliation"]],
        ]),
        stack: {
            Edge: ["Raspberry Pi", "NVIDIA Jetson", "Greengrass", "Azure IoT Edge"],
            Connectivity: ["MQTT", "OPC UA", "LoRaWAN", "Cellular IoT"],
            "Cloud IoT": ["AWS IoT Core", "Azure IoT Hub", "GCP IoT Core"],
            "Time-Series": ["InfluxDB", "Timestream", "TimescaleDB"],
            "Digital Twin": ["AWS TwinMaker", "Azure Digital Twins", "Unity"],
        },
    },

    wearables: {
        headline: "Wearable products with intent.",
        hook: "Designed for the wrist, not retrofitted to it.",
        intro: "We design and build wearable software — health, productivity, payment, and immersive AR/VR — engineered for the tight constraints of small screens, small batteries, and constant intimacy with the user.",
        services: [
            { title: "Wearable App Development", description: "Custom-built apps for Apple Watch, Fitbit, Wear OS, Garmin, and more.", stackTag: "watchOS · Wear OS · Tizen" },
            { title: "Health & Fitness Solutions", description: "Real-time monitoring, biometric tracking, and smart health alerts.", stackTag: "HealthKit · Google Fit · HRV" },
            { title: "IoT-Enabled Wearables", description: "Sync with cloud and devices to track data, monitor users, and deliver alerts.", stackTag: "BLE · MQTT · Companion apps" },
            { title: "AR/VR Wearables", description: "Develop immersive apps for Oculus, smart glasses, and virtual training experiences.", stackTag: "Unity · Unreal · OpenXR" },
            { title: "NFC & Contactless Payments", description: "Build secure, wearable payment solutions with advanced encryption.", stackTag: "HCE · Apple Pay · Google Wallet" },
            { title: "AI & Predictive Analytics", description: "Analyze data to deliver personalized insights and smarter user experiences.", stackTag: "Core ML · TensorFlow Lite · Edge AI" },
        ],
        spine: spine([
            ["Define the wearable moment — when the device beats the phone. Validate battery, sensor, and ergonomic constraints.", ["Use-case test", "Sensor map", "Battery budget"]],
            ["Design micro-interactions, glanceable UI, and the companion-app split. Information density per second of attention.", ["Interaction map", "Glance UI", "Companion plan"]],
            ["Build with on-device ML where the latency matters; off-device when the battery doesn't allow it.", ["On-device models", "Companion app", "Test harness"]],
            ["Beta with real users on real wrists. Battery-life observation in production conditions, not lab.", ["Wearable beta", "Battery telemetry", "Crash watch"]],
            ["Steady-state release alongside platform OS updates. Watch hardware launches change the rules every cycle.", ["Release schedule", "Platform updates", "User feedback"]],
        ]),
        stack: {
            Platforms: ["watchOS", "Wear OS", "Tizen", "Garmin Connect IQ"],
            "Health APIs": ["HealthKit", "Google Fit", "Fitbit API"],
            AR_VR: ["Unity", "Unreal", "OpenXR", "ARKit", "ARCore"],
            Connectivity: ["BLE", "NFC", "Wi-Fi", "LTE-M"],
            "On-Device ML": ["Core ML", "TensorFlow Lite", "ONNX Runtime"],
        },
    },

    "enterprise-solutions": {
        headline: "Enterprise software that earns its complexity.",
        hook: "ERP, CRM, SCM — all answering to the same dashboard.",
        intro: "We design and build enterprise platforms that unify finance, customer, supply-chain, and people operations. Built for audit, configured for scale, integrated by intent rather than by accident.",
        services: [
            { title: "Enterprise Resource Planning", description: "Integrated platforms to automate finance, inventory, procurement, and manufacturing for better collaboration and efficiency.", stackTag: "SAP S/4 · Oracle NetSuite · MS Dynamics" },
            { title: "Customer Relationship Management", description: "Centralized customer data, sales automation, and marketing tools to boost engagement and retention.", stackTag: "Salesforce · HubSpot · Dynamics 365" },
            { title: "Supply Chain Management", description: "Real-time inventory, order, and logistics tracking with enhanced forecasting and vendor management.", stackTag: "Blue Yonder · Oracle SCM · SAP IBP" },
            { title: "Human Resource Management", description: "Streamlined HR processes including recruitment, payroll, performance management, and compliance.", stackTag: "Workday · SuccessFactors · BambooHR" },
            { title: "Business Intelligence", description: "Actionable insights, predictive analytics, and customizable dashboards for data-driven decisions.", stackTag: "Power BI · Tableau · Looker" },
            { title: "Cloud-Based Enterprise", description: "Secure, scalable cloud hosting for enterprise applications — enabling remote access, collaboration, and cost savings.", stackTag: "AWS · Azure · OCI" },
        ],
        spine: spine([
            ["Map the enterprise-as-is — processes, data flows, integration points, and the existing platform politics.", ["Process map", "Data lineage", "Stakeholder model"]],
            ["Design the target-state architecture and the integration layer. Define the system of record for every domain.", ["Target architecture", "Integration model", "SoR map"]],
            ["Configure, customise, and integrate. Each module rolled out as a verified release with parallel reconciliation.", ["Module rollouts", "Parallel runs", "Sign-off matrix"]],
            ["Phased go-live by domain or business unit. Audit-ready cutover documentation; no orphaned legacy paths.", ["Domain cutover", "Audit pack", "Decommission plan"]],
            ["Hypercare for 90 days, then steady-state managed service with quarterly business-aligned roadmap reviews.", ["Hypercare", "Managed service", "Quarterly review"]],
        ]),
        stack: {
            ERP: ["SAP S/4HANA", "Oracle NetSuite", "Microsoft Dynamics 365"],
            CRM: ["Salesforce", "HubSpot", "Dynamics 365"],
            HCM: ["Workday", "SuccessFactors", "BambooHR"],
            "Integration": ["MuleSoft", "Boomi", "Workato", "Azure LogicApps"],
            BI: ["Power BI", "Tableau", "Looker"],
        },
    },

    erps: {
        headline: "ERP done as software engineering, not configuration theatre.",
        hook: "Live KPIs, audit trail, and a team that can use it.",
        intro: "We implement, customise, and operate ERP platforms — finance, inventory, procurement, HR, and the analytics over them — so the system shows the truth and the truth drives decisions.",
        services: [
            { title: "ERP Implementation", description: "Fully tailored systems to meet your operational needs, deployed with minimal disruption.", stackTag: "SAP · NetSuite · Dynamics" },
            { title: "Business Process Automation", description: "Streamline repetitive tasks and enhance workflow efficiency from finance to HR administration.", stackTag: "UiPath · Power Automate · Workato" },
            { title: "Data & Business Intelligence", description: "Generate live reports, dashboards, and KPIs for instant performance tracking and monitoring.", stackTag: "Power BI · Tableau · Looker" },
            { title: "ERP Support & Maintenance", description: "Continuous system health monitoring, updates, and troubleshooting support.", stackTag: "ServiceNow · Jira · Splunk" },
            { title: "Cloud-Based ERP Solutions", description: "Access your ERP platform securely from anywhere, at any time — scalable and low-cost.", stackTag: "S/4HANA Cloud · NetSuite · D365" },
            { title: "Multi-Department Integration", description: "Connect finance, inventory, HR, CRM, and more under one centralized system.", stackTag: "MuleSoft · Boomi · Workato" },
        ],
        spine: spine([
            ["Inventory the current ERP estate, the shadow spreadsheets, and the reporting team actually trusts.", ["Estate map", "Process catalog", "Trust audit"]],
            ["Design the chart of accounts, the configuration, and the integration plan. Make customisations rare and deliberate.", ["CoA & config", "Integration plan", "Customisation log"]],
            ["Build, test, and migrate in phases. Reconcile every record. The data is the audit trail.", ["Phased build", "Migration scripts", "Reconciliation"]],
            ["Cut over by ledger with parallel runs. No magic — every variance investigated before sign-off.", ["Parallel runs", "Variance log", "Cutover sign-off"]],
            ["Steady-state managed service, period-close support, and continuous BI improvement.", ["Managed service", "Period-close", "BI roadmap"]],
        ]),
        stack: {
            Platforms: ["SAP S/4HANA", "Oracle NetSuite", "Microsoft Dynamics 365", "Odoo"],
            Automation: ["UiPath", "Power Automate", "Workato"],
            Integration: ["MuleSoft", "Boomi", "Azure LogicApps"],
            BI: ["Power BI", "Tableau", "Looker"],
            "Support & ITSM": ["ServiceNow", "Jira", "Freshservice"],
        },
    },

    "cognitive-business-operation": {
        headline: "Cognitive operations — analytics, automation, action.",
        hook: "AI inside the workflow, not next to it.",
        intro: "We embed AI, automation, and analytics inside the workflows that run the business — invoice processing, customer service, demand sensing, decision support — so the gains compound instead of dissipating.",
        services: [
            { title: "Intelligent Process Automation", description: "Automate everyday tasks like data entry, invoicing, and customer support to boost efficiency and cut costs.", stackTag: "UiPath · Automation Anywhere" },
            { title: "AI-Driven Analytics", description: "Predict customer behavior, operational trends, and market changes to make proactive, profitable decisions.", stackTag: "Databricks · Snowflake · MLflow" },
            { title: "Natural Language Processing", description: "Enhance customer service with AI chatbots, sentiment analysis, and intelligent virtual assistants.", stackTag: "Transformers · Rasa · LangChain" },
            { title: "Real-Time Dashboards", description: "Monitor KPIs, operational performance, and business metrics instantly with intuitive dashboards.", stackTag: "Power BI · Tableau · Grafana" },
            { title: "End-to-End System Integration", description: "Unify HR, finance, sales, and marketing for seamless collaboration and real-time data sharing.", stackTag: "MuleSoft · Boomi · Workato" },
            { title: "Scalability & Security", description: "Flexible cloud-based solutions that adapt to your growth, with built-in security and compliance.", stackTag: "AWS · Azure · ISO 27001" },
        ],
        spine: spine([
            ["Identify the high-volume, low-judgement workflows where automation pays. Map decision points and exceptions.", ["Workflow inventory", "ROI model", "Exception map"]],
            ["Design the automation + analytics layer and how it composes with the existing systems of record.", ["Automation design", "Data model", "Integration plan"]],
            ["Build bots, models, and dashboards as a connected stack. Human handoff is a first-class state, not a fallback.", ["Bot fleet", "Model deployment", "Dashboards"]],
            ["Pilot end-to-end with a real business unit. Track time and cost saved against the baseline, not the demo.", ["Pilot results", "ROI realised", "Scale plan"]],
            ["Scale to additional workflows; observe drift, exceptions, and changing process; quarterly automation council.", ["Drift monitoring", "Exception review", "Automation council"]],
        ]),
        stack: {
            "RPA": ["UiPath", "Automation Anywhere", "Blue Prism", "Power Automate"],
            AI_ML: ["Databricks", "Snowflake", "SageMaker", "Vertex AI"],
            NLP: ["LangChain", "Rasa", "OpenAI", "Anthropic"],
            BI: ["Power BI", "Tableau", "Grafana"],
            Integration: ["MuleSoft", "Boomi", "Workato"],
        },
    },

    "digital-architect": {
        headline: "Architecture as the multiplier — or the bottleneck.",
        hook: "We choose the constraints; the constraints don't choose us.",
        intro: "We design the digital architecture that the rest of the organisation builds on — enterprise patterns, cloud landing zones, microservices, data, and security — with the deliberate trade-offs documented and understood.",
        services: [
            { title: "Enterprise Architecture", description: "Design enterprise-level frameworks that enhance operational efficiency and agility.", stackTag: "TOGAF · ArchiMate · C4" },
            { title: "Cloud Architecture & Migration", description: "Build and migrate to secure cloud environments on AWS, Azure, and Google Cloud.", stackTag: "Well-Architected · CAF · Anthos" },
            { title: "Microservices & API Design", description: "Create modular, scalable systems with streamlined APIs for seamless integration.", stackTag: "gRPC · GraphQL · REST · AsyncAPI" },
            { title: "Security Architecture", description: "Implement comprehensive security controls to protect your digital assets.", stackTag: "Zero Trust · OWASP · NIST CSF" },
            { title: "Data Architecture & Management", description: "Structure your data pipelines for real-time access, analytics, and intelligence.", stackTag: "Data Mesh · Lakehouse · CDP" },
            { title: "DevOps Automation", description: "Accelerate deployment with CI/CD pipelines and automated infrastructure provisioning.", stackTag: "Terraform · Kubernetes · ArgoCD" },
        ],
        spine: spine([
            ["Audit the current architecture, capability map, and the decisions that have hardened into constraints.", ["Capability map", "Decision log", "Pain inventory"]],
            ["Design the target architecture with explicit trade-offs. Every choice has a written 'because'.", ["Target architecture", "Trade-off doc", "Roadmap"]],
            ["Stand up reference implementations of the patterns. Prove them on real workloads, not slideware.", ["Pattern catalog", "Reference impl", "ADRs"]],
            ["Migrate workloads to the new patterns in waves. Track architecture-fit metrics alongside delivery metrics.", ["Wave migrations", "Fit scorecard", "Tech-debt log"]],
            ["Architecture council, pattern stewardship, and quarterly architecture-fit review.", ["Council cadence", "Pattern updates", "Quarterly fit review"]],
        ]),
        stack: {
            Frameworks: ["TOGAF", "ArchiMate", "C4 Model", "DDD"],
            "Cloud Reference": ["AWS Well-Architected", "Azure CAF", "GCP Architecture Center"],
            "API & Integration": ["OpenAPI", "AsyncAPI", "gRPC", "GraphQL"],
            Security: ["NIST CSF", "ISO 27001", "OWASP", "BeyondCorp"],
            "Decision Tooling": ["ADRs", "Structurizr", "Lucidchart"],
        },
    },

    "vyu-migrations": {
        headline: "Migration without the surprises.",
        hook: "Cutover is a paragraph in the runbook, not the headline.",
        intro: "We move systems, data, and applications into modern environments with the discipline migrations demand — inventory, parity testing, parallel runs, and the runbook to roll back if reality disagrees with the plan.",
        services: [
            { title: "Cloud Migration", description: "Shift to AWS, Azure, or GCP with hybrid and multi-cloud options — fast, secure, and scalable.", stackTag: "AWS MGN · Azure Migrate · GCP M4A" },
            { title: "Data Migration", description: "Move structured and unstructured data with full validation and integrity checks.", stackTag: "AWS DMS · Azure DMS · Striim" },
            { title: "Application Migration", description: "Modernize outdated apps or re-architect them for modern cloud-native ecosystems.", stackTag: "Containerize · Refactor · Replatform" },
            { title: "Infrastructure Migration", description: "Upgrade or consolidate servers, storage, and databases for optimized performance.", stackTag: "VMware HCX · Nutanix Move" },
            { title: "Database Migration", description: "Cross-platform migration with schema optimization and performance tuning.", stackTag: "DMS · Schema Conv · Liquibase" },
            { title: "Post-Migration Optimization", description: "Continuous performance monitoring, updates, and real-time issue resolution.", stackTag: "Datadog · CloudWatch · APM" },
        ],
        spine: spine([
            ["Inventory the estate down to the data record. Identify the dependencies that aren't in any diagram yet.", ["Estate inventory", "Dependency map", "Risk register"]],
            ["Pick the right R (rehost, replatform, refactor, retire) per workload. Document the answer per workload.", ["6Rs decision", "Target architecture", "Cutover plan"]],
            ["Build parallel-run plumbing, parity tests, and the rollback path before touching the cutover switch.", ["Parity tests", "Rollback path", "Pilot wave"]],
            ["Cut over by wave with shadow runs and explicit go/no-go gates. Reconcile every counter that matters.", ["Wave cutovers", "Reconciliation", "Go/no-go log"]],
            ["Post-migration optimisation — rightsizing, performance tuning, and the decommissioning of legacy paths.", ["Rightsizing", "Decom plan", "Quarterly review"]],
        ]),
        stack: {
            Tooling: ["AWS MGN", "Azure Migrate", "GCP M4A", "Nutanix Move"],
            "Data Movement": ["AWS DMS", "Striim", "Debezium", "Fivetran"],
            Containerization: ["Kubernetes", "Docker", "ECS Anywhere"],
            "Schema & DB": ["Liquibase", "Flyway", "Schema Conversion Tool"],
            "Observability": ["Datadog", "CloudWatch", "Dynatrace"],
        },
    },

    "end-user-computing": {
        headline: "The digital workplace your team forgets is there.",
        hook: "Devices, apps, identity — invisible to the user, governed by the operator.",
        intro: "We build and operate digital workplaces that work from any device, any network — VDI, DaaS, endpoint management, and the security overlay that makes it auditable without making it slow.",
        services: [
            { title: "VDI & DaaS", description: "Virtual Desktop Infrastructure delivers secure, virtualized desktops that are always accessible and centrally managed.", stackTag: "Citrix · AWS WorkSpaces · AVD" },
            { title: "Device & Endpoint Management", description: "Streamline management across desktops, laptops, tablets, and mobile devices with complete control.", stackTag: "Intune · Jamf · Kandji" },
            { title: "App Virtualization & Delivery", description: "Deliver apps securely and seamlessly across all user devices — without performance compromise.", stackTag: "Citrix · App-V · MSIX" },
            { title: "Data Security & Compliance", description: "End-to-end encryption, multi-layer access controls, and compliance with GDPR, HIPAA, and more.", stackTag: "BitLocker · Purview · ZTNA" },
            { title: "Cloud-Based EUC Solutions", description: "Cost-effective, cloud-first architectures for scalable, remote-friendly IT environments.", stackTag: "AVD · WorkSpaces · Cameyo" },
            { title: "End User Support & Services", description: "Round-the-clock tech support, issue resolution, and system optimization for uninterrupted work.", stackTag: "ServiceNow · Freshservice · Zendesk" },
        ],
        spine: spine([
            ["Inventory devices, personas, app needs, and the security posture each role requires.", ["Persona model", "Device inventory", "Security map"]],
            ["Design the workspace strategy — physical, virtual, hybrid — and the identity, app, and security overlay.", ["Workspace plan", "Identity model", "App catalog"]],
            ["Stand up MDM, VDI, and app delivery. Onboard pilot personas before scaling to the broader org.", ["MDM rollout", "VDI pilot", "App packaging"]],
            ["Scale by persona group. Measure login time, app launch time, and ticket volume as the success metrics.", ["Persona rollout", "UX metrics", "Ticket baseline"]],
            ["L1/L2 support operations, continuous patch and config management, quarterly workplace review.", ["Support tiers", "Patch cadence", "Workplace review"]],
        ]),
        stack: {
            "VDI / DaaS": ["Citrix", "AWS WorkSpaces", "Azure Virtual Desktop", "Omnissa Horizon"],
            "Device Management": ["Microsoft Intune", "Jamf", "Kandji", "Workspace ONE"],
            "Identity & Access": ["Entra ID", "Okta", "Ping"],
            "App Delivery": ["Citrix", "Cameyo", "MSIX App Attach"],
            "Service Desk": ["ServiceNow", "Freshservice", "Zendesk"],
        },
    },

    consulting: {
        headline: "Strategy that ships, not strategy that prints.",
        hook: "Deliverables you can act on this quarter.",
        intro: "We deliver technology consulting that's measured by what gets built — roadmaps tied to delivery teams, optimisation tied to operating costs, and architecture tied to the systems already running.",
        services: [
            { title: "Technology Strategy Consulting", description: "Build future-ready tech roadmaps aligned to your goals.", stackTag: "OKRs · TBM · Wardley" },
            { title: "Process Optimization", description: "Streamline operations for maximum efficiency and cost savings.", stackTag: "Lean · Six Sigma · Value-Stream" },
            { title: "IT Infrastructure Consulting", description: "Enhance system performance, security, and scalability.", stackTag: "Well-Architected · CAF" },
            { title: "Data Analytics & BI Consulting", description: "Unlock powerful insights to fuel better decisions.", stackTag: "Modern Data Stack · Data Mesh" },
            { title: "Cybersecurity Consulting", description: "Strengthen defenses and ensure regulatory compliance.", stackTag: "NIST CSF · ISO 27001 · SOC 2" },
            { title: "Cloud Transformation Services", description: "Seamless cloud migration and optimization for success.", stackTag: "AWS · Azure · GCP · FinOps" },
        ],
        spine: spine([
            ["Interview leadership and operators. Read the systems. Identify the gap between intent and execution.", ["Interview log", "System read-out", "Gap analysis"]],
            ["Frame the strategy with explicit choices. What we will do; what we won't; the trade-off owners take.", ["Strategy doc", "Decision log", "Sequencing"]],
            ["Translate strategy into delivery plans with named owners. Engagement model is part of the deliverable.", ["Delivery plans", "Owner map", "Engagement model"]],
            ["Co-deliver the first wave. Strategy on paper proves nothing — first shipped outcome proves the model.", ["First-wave delivery", "Outcome metrics", "Lessons learned"]],
            ["Quarterly strategy review against outcomes. Recalibrate without losing the through-line.", ["Quarterly review", "Recalibration", "Roadmap update"]],
        ]),
        stack: {
            Strategy: ["OKRs", "Wardley Mapping", "Jobs-to-be-Done"],
            Process: ["Lean", "Six Sigma", "Value-Stream Mapping"],
            "Cloud & Cost": ["AWS Well-Architected", "Azure CAF", "FinOps Framework"],
            "Data Strategy": ["Modern Data Stack", "Data Mesh", "DAMA-DMBOK"],
            "Security Frameworks": ["NIST CSF", "ISO 27001", "SOC 2"],
        },
    },

    "business-development": {
        headline: "Growth engineered, not gambled.",
        hook: "Pipeline, partnerships, retention — measured.",
        intro: "We help founders and operators grow the business with the rigour of an engineering discipline — segmented pipeline, instrumented funnels, partnerships that compound, and customer success tied to retention curves.",
        services: [
            { title: "Market Research & Analysis", description: "Understand market trends, customer behavior, and competition to reduce risk and find new opportunities.", stackTag: "Similarweb · CB Insights · Glassdollar" },
            { title: "Sales Strategy & Lead Generation", description: "Create winning sales plans, capture high-value leads, and convert them with ease — integrating CRM tools for smarter pipelines.", stackTag: "Apollo · Clay · HubSpot" },
            { title: "Strategic Partnerships", description: "Find and build lasting partnerships that strengthen your market position and drive new revenue streams.", stackTag: "Crossbeam · Reveal · Pavilion" },
            { title: "Customer Retention", description: "Develop loyalty programs, enhance customer experiences, and keep your customers coming back.", stackTag: "Gainsight · Catalyst · Intercom" },
            { title: "Process Optimization", description: "Identify and eliminate operational bottlenecks, implement automation tools, and boost productivity.", stackTag: "Zapier · Make · Workato" },
            { title: "Digital Transformation Support", description: "Modernize your digital presence, enhance your online strategies, and reach more customers globally.", stackTag: "Webflow · HubSpot · Segment" },
        ],
        spine: spine([
            ["Segment the market and the existing customer base. Identify the ICP that converts and retains.", ["Segment model", "ICP definition", "Funnel baseline"]],
            ["Design the GTM motion — inbound, outbound, partnership, expansion — sized to the team and the budget.", ["GTM plan", "Channel mix", "Capacity plan"]],
            ["Stand up the tooling, the playbooks, and the dashboards. Pipeline becomes legible.", ["Tooling rollout", "Playbooks", "Dashboards"]],
            ["Run the motion in pilots before scaling. Measure win rate and CAC by segment, not in aggregate.", ["Pilot motions", "Segment metrics", "Iteration log"]],
            ["Quarterly GTM review — what's compounding, what's leaking, what to invest in next.", ["Quarterly review", "Investment plan", "Retro"]],
        ]),
        stack: {
            "Market Research": ["Similarweb", "CB Insights", "Crunchbase"],
            "Sales & Outreach": ["Apollo", "Clay", "HubSpot", "Salesloft"],
            "Partnerships": ["Crossbeam", "Reveal", "PartnerStack"],
            "Customer Success": ["Gainsight", "Catalyst", "Intercom"],
            Automation: ["Zapier", "Make", "Workato"],
        },
    },

    "digital-marketing-monitoring": {
        headline: "Marketing instrumented like a product.",
        hook: "What works, what doesn't, what changed — in real time.",
        intro: "We build the marketing observability layer — funnel analytics, SEO health, social listening, and competitor benchmarking — so the marketing team optimises on signal, not on lore.",
        services: [
            { title: "Performance Monitoring", description: "Monitor KPIs like clicks, impressions, CTRs, and conversions across all channels in real-time.", stackTag: "GA4 · Looker · Segment" },
            { title: "Social Media Listening & Tracking", description: "Analyze audience sentiment, brand mentions, and competitor activity on Instagram, LinkedIn, and X.", stackTag: "Brandwatch · Sprout · Talkwalker" },
            { title: "SEO & Website Analytics", description: "Track keyword rankings, site traffic, and bounce rates, and resolve technical SEO issues proactively.", stackTag: "Ahrefs · Semrush · Search Console" },
            { title: "Email Campaign Analysis", description: "Measure open and click-through rates, optimize subject lines, and tailor content with behavior-driven insights.", stackTag: "Customer.io · Iterable · HubSpot" },
            { title: "Competitor Benchmarking", description: "Evaluate how your strategy stacks up against competitors — identify gaps and opportunities fast.", stackTag: "Similarweb · Semrush · Crayon" },
            { title: "Automated Reporting", description: "Receive tailored, visually rich reports and real-time alerts for quicker, iterative decision-making.", stackTag: "Looker · Tableau · Whatagraph" },
        ],
        spine: spine([
            ["Audit current measurement — channels, attribution, gaps. Identify what we're flying blind on.", ["Measurement audit", "Channel map", "Gap list"]],
            ["Design the unified analytics layer, the attribution model, and the alerting baseline.", ["Analytics architecture", "Attribution model", "Alert thresholds"]],
            ["Instrument channels and stand up dashboards. Server-side tagging, consent mode, and reliable counters.", ["Instrumentation", "Dashboards", "Consent posture"]],
            ["Run optimisation cycles by channel. Each test has a hypothesis, a metric, and a stop date.", ["Test cadence", "Results log", "Winners deployed"]],
            ["Steady-state monitoring, monthly attribution review, quarterly mix review.", ["Monitoring", "Monthly attribution", "Quarterly mix"]],
        ]),
        stack: {
            Analytics: ["GA4", "Mixpanel", "Amplitude", "PostHog"],
            "SEO": ["Ahrefs", "Semrush", "Google Search Console"],
            "Social Listening": ["Brandwatch", "Sprout Social", "Talkwalker"],
            "Email & CRM": ["Customer.io", "Iterable", "HubSpot"],
            Reporting: ["Looker", "Tableau", "Whatagraph"],
        },
    },

    "vyu-startup-solutions": {
        headline: "From idea to operating company.",
        hook: "Product, infra, brand — wired together from day zero.",
        intro: "We partner with founders to ship the MVP, build the brand, set up the operating stack, and scale the platform — without rebuilding everything at Series A. Engineering that respects the runway.",
        services: [
            { title: "MVP Development & Prototyping", description: "Validate your idea fast with functional, market-ready prototypes and MVPs.", stackTag: "Next.js · Supabase · Vercel" },
            { title: "Software Development", description: "Build scalable mobile, web, and enterprise applications using modern technologies.", stackTag: "Next.js · React Native · Postgres" },
            { title: "UX/UI Design", description: "Create seamless, engaging user experiences that boost retention and growth.", stackTag: "Figma · Framer · Storybook" },
            { title: "Branding & Digital Presence", description: "Define your brand identity and grow your online footprint through SEO, content, and social media.", stackTag: "Webflow · Framer · HubSpot" },
            { title: "Business Strategy & Monetization", description: "Structure your startup with the right business model, go-to-market strategy, and revenue plan.", stackTag: "Stripe · Lago · Metronome" },
            { title: "Cloud & Infrastructure Solutions", description: "Set up scalable cloud environments on AWS, Azure, or Google Cloud.", stackTag: "AWS · Vercel · Fly.io" },
        ],
        spine: spine([
            ["Sharpen the problem, the customer, and the smallest-thing-that-proves-it. Ruthless about scope.", ["Problem statement", "Wedge definition", "Scope contract"]],
            ["Design the MVP, the brand, and the minimum infra. Pick stacks that don't trap the next 12 months.", ["MVP design", "Brand kit", "Infra plan"]],
            ["Ship in weekly increments. Production-by-default. Telemetry on every flow before launch.", ["Weekly ships", "Telemetry", "Beta cohort"]],
            ["Launch to real users. Pricing live, payments live, support live — not after the fundraise.", ["Public launch", "Payments live", "Support runbook"]],
            ["Iterate on the metric that matters most for the stage. Refuse work that doesn't move it.", ["North-star metric", "Sprint rhythm", "Quarterly review"]],
        ]),
        stack: {
            Product: ["Next.js", "React Native", "Supabase", "Postgres"],
            Infra: ["Vercel", "AWS", "Fly.io", "Cloudflare"],
            "Payments & Billing": ["Stripe", "Lago", "Metronome"],
            "Growth & Brand": ["Framer", "Webflow", "HubSpot"],
            "Telemetry": ["PostHog", "Sentry", "Highlight"],
        },
    },

    prototyping: {
        headline: "Prototypes that answer real questions.",
        hook: "Build the smallest thing that proves the idea.",
        intro: "We build prototypes — interactive, clickable, or production-shaped — so teams can validate the idea against real users before the engineering bill arrives. Fast, focused, and disposable when needed.",
        services: [
            { title: "UI/UX Prototyping", description: "Create immersive, user-friendly designs that enhance experience and usability.", stackTag: "Figma · ProtoPie · Principle" },
            { title: "Web & Mobile App Prototyping", description: "Build adaptive prototypes for seamless cross-platform navigation.", stackTag: "Framer · Next.js · Expo" },
            { title: "Wireframing & Mockups", description: "Plan layouts and user flows with clear visual representations.", stackTag: "Figma · Whimsical · Miro" },
            { title: "Interactive, Clickable Prototypes", description: "Simulate real product behavior to test user journeys early.", stackTag: "Figma · ProtoPie · Origami" },
            { title: "Rapid Prototyping & MVPs", description: "Develop Minimum Viable Products to validate concepts in real-time environments.", stackTag: "Next.js · Supabase · Vercel" },
            { title: "Usability Testing Prototypes", description: "Get actionable feedback by letting real users interact with functional mockups.", stackTag: "Maze · UserTesting · Lookback" },
        ],
        spine: spine([
            ["Define the question the prototype is meant to answer. No fidelity higher than necessary.", ["Question brief", "Fidelity decision", "Success criteria"]],
            ["Design the prototype around the riskiest assumption. Strip everything else.", ["Riskiest-assumption test", "Flow design", "Test plan"]],
            ["Build in days, not weeks. Functional where it matters; sketched where it doesn't.", ["Working prototype", "Test scripts", "Recruitment"]],
            ["Test with real users. Capture exactly what the prototype answers — and what it doesn't.", ["Test sessions", "Findings doc", "Decision log"]],
            ["Hand off the answer — keep building, kill the idea, or pivot. The prototype is disposable; the learning is not.", ["Decision memo", "Next step", "Archive"]],
        ]),
        stack: {
            "Design Prototypes": ["Figma", "ProtoPie", "Origami", "Principle"],
            "Code Prototypes": ["Next.js", "Framer", "Expo", "Supabase"],
            Wireframing: ["Figma", "Whimsical", "Miro"],
            "User Testing": ["Maze", "UserTesting", "Lookback"],
            Hosting: ["Vercel", "Netlify", "Replit"],
        },
    },

    "hr-services": {
        headline: "HR engineered around the people.",
        hook: "Attract, develop, retain — measured.",
        intro: "We modernise HR operations end-to-end — talent acquisition, development, performance, payroll, engagement — with the systems and analytics that let HR partner the business instead of policing it.",
        services: [
            { title: "Talent Acquisition", description: "Identify, attract, and onboard high-quality candidates who match your culture and mission.", stackTag: "Greenhouse · Lever · Ashby" },
            { title: "Talent Development", description: "Upskill your workforce with leadership development, technical training, and career growth programs.", stackTag: "Workday Learning · Degreed · Cornerstone" },
            { title: "Performance Management", description: "Align goals, track progress, and foster a results-oriented culture through continuous feedback.", stackTag: "Lattice · 15Five · Culture Amp" },
            { title: "Pay & Payroll Services", description: "Manage payroll processing, tax compliance, and employee benefits with accuracy and ease.", stackTag: "ADP · Gusto · Deel" },
            { title: "Employee Engagement", description: "Strengthen morale and satisfaction through surveys, insights, and real-time feedback.", stackTag: "Culture Amp · Lattice · Glint" },
            { title: "Succession Planning", description: "Prepare for the future with strategies to identify and groom your next generation of leaders.", stackTag: "Workday · SuccessFactors · BambooHR" },
        ],
        spine: spine([
            ["Map the people lifecycle — sourcing through alumni. Identify the friction points each persona feels.", ["Lifecycle map", "Persona pain", "Process audit"]],
            ["Design the HR target operating model. System of record, system of engagement, and the analytics over them.", ["Target model", "System map", "Policy frame"]],
            ["Implement the platforms — HRIS, ATS, LMS, payroll — wired together with the data flowing once, not five times.", ["Platform rollout", "Integrations", "Training"]],
            ["Roll out by population. Measure cycle time, NPS, and the metrics the function is actually accountable to.", ["Population rollout", "Cycle metrics", "Internal NPS"]],
            ["Steady-state HR ops, quarterly people-analytics review, continuous experience improvement.", ["HR ops", "People analytics", "Experience review"]],
        ]),
        stack: {
            HRIS: ["Workday", "SuccessFactors", "BambooHR", "HiBob"],
            ATS: ["Greenhouse", "Lever", "Ashby"],
            Learning: ["Degreed", "Cornerstone", "LinkedIn Learning"],
            Performance: ["Lattice", "15Five", "Culture Amp"],
            "Payroll & Benefits": ["ADP", "Gusto", "Deel"],
        },
    },

    "backup-data-protection": {
        headline: "Backup as a survivability discipline.",
        hook: "Restore-tested, ransomware-resilient, regulator-ready.",
        intro: "We design data-protection programmes that actually restore — tested recovery, immutable storage, and the runbooks teams can execute under pressure. Backup is only as good as the last successful restore.",
        services: [
            { title: "Cloud & On-Premise Backup", description: "Automated, secure backups tailored to your infrastructure — local or cloud-based.", stackTag: "Veeam · Commvault · Druva" },
            { title: "Cloud-Based Data Protection", description: "Scalable, multi-cloud integration (AWS, Azure, GCP) for modern enterprises.", stackTag: "AWS Backup · Azure Backup · GCP Backup" },
            { title: "Disaster Recovery Solutions", description: "Business continuity made simple — rapid recovery with minimal downtime.", stackTag: "Zerto · CloudEndure · Site Recovery" },
            { title: "Data Encryption & Security", description: "Advanced protection through encryption, access controls, and regulatory compliance.", stackTag: "KMS · HSM · TLS 1.3" },
            { title: "Continuous Data Protection", description: "Real-time backups to prevent even the smallest data loss.", stackTag: "Zerto · Rubrik · Cohesity" },
            { title: "Ransomware Protection", description: "Proactive defense plus fast rollback to clean data in the event of an attack.", stackTag: "Immutable storage · Air-gap · Object Lock" },
        ],
        spine: spine([
            ["Identify the critical workloads, RPO/RTO per tier, and the threat scenarios protection must absorb.", ["Workload tiers", "RPO/RTO targets", "Threat scenarios"]],
            ["Design the protection architecture — immutable storage, segmentation, replication, and the recovery runbook.", ["Protection architecture", "Recovery runbook", "Segmentation plan"]],
            ["Stand up backups, encryption, and the DR site. Validate first restore before declaring the system done.", ["Backup rollout", "First restore", "DR site"]],
            ["Run a full tabletop and a full restore drill. Adjust the runbook to what actually happened, not what was planned.", ["Tabletop", "Restore drill", "Runbook updates"]],
            ["Recurring restore tests, immutable retention enforcement, quarterly DR exercise.", ["Restore cadence", "Retention audit", "Quarterly DR drill"]],
        ]),
        stack: {
            "Backup Platforms": ["Veeam", "Commvault", "Druva", "Rubrik"],
            DR: ["Zerto", "CloudEndure", "Azure Site Recovery"],
            "Immutable / Object Lock": ["AWS S3 Object Lock", "Azure Immutable", "Cohesity"],
            "Encryption & KMS": ["AWS KMS", "Azure Key Vault", "HashiCorp Vault"],
            "Compliance & Reporting": ["Vanta", "Drata", "Veeam ONE"],
        },
    },

    "aws-microsoft-google": {
        headline: "Cloud across all three — with intent.",
        hook: "AWS, Azure, and Google Cloud — each playing to its strength.",
        intro: "We design and operate workloads across AWS, Azure, and Google Cloud — picking platforms on architecture fit, not on default. Unified governance, shared identity, shared FinOps posture.",
        services: [
            { title: "Cloud Consulting & Strategy", description: "Navigate cloud adoption with clarity and confidence through tailored consulting.", stackTag: "Well-Architected · CAF · GCP Arch Center" },
            { title: "Cloud Migration Services", description: "Seamless, secure transitions to AWS, Azure, or GCP with minimal disruption.", stackTag: "MGN · Azure Migrate · M4A" },
            { title: "Cloud Infrastructure", description: "Optimize infrastructure performance, scalability, and costs across all platforms.", stackTag: "Terraform · Kubernetes · ArgoCD" },
            { title: "Cloud Security & Compliance", description: "Advanced cybersecurity frameworks and regulatory adherence.", stackTag: "GuardDuty · Defender · SCC" },
            { title: "DevOps Automation & CI/CD", description: "Accelerate and streamline development with integrated DevOps pipelines.", stackTag: "CodePipeline · GH Actions · Cloud Build" },
            { title: "Big Data & AI/ML Services", description: "Unlock insights and enable intelligent automation using scalable cloud analytics.", stackTag: "SageMaker · Azure ML · Vertex AI" },
        ],
        spine: spine([
            ["Map workloads against platform strengths. AWS for scale, Azure for enterprise, GCP for data — chosen, not assumed.", ["Workload-to-platform map", "Architecture decisions"]],
            ["Design the multi-cloud landing zones, identity federation, and the cross-cloud network and security posture.", ["Landing zones", "Identity federation", "Cross-cloud network"]],
            ["Build with IaC modules that abstract cloud-specific quirks; expose platform-native features where they pay.", ["IaC modules", "Native bindings", "Pipelines"]],
            ["Roll workloads to their chosen cloud in waves. Validate against the strength used to justify the choice.", ["Wave rollouts", "Validation gates", "Cost realised"]],
            ["Unified FinOps, unified observability, and a quarterly multi-cloud review against the architecture intent.", ["FinOps cadence", "Unified obs", "Quarterly review"]],
        ]),
        stack: {
            AWS: ["EKS", "Lambda", "SageMaker", "S3", "RDS"],
            Azure: ["AKS", "Functions", "Azure ML", "Cosmos DB", "Synapse"],
            GCP: ["GKE", "Cloud Run", "BigQuery", "Vertex AI", "Spanner"],
            "Cross-Cloud": ["Terraform", "Kubernetes", "Crossplane", "Anthos"],
            "FinOps & Observability": ["Apptio", "Datadog", "Grafana"],
        },
    },

    "payment-solutions": {
        headline: "Payments that move money — and don't lose it.",
        hook: "Cards, wallets, links, recurring — one ledger.",
        intro: "We build payment systems that work across in-store, online, mobile, and recurring contexts — wired to a single reconciliation layer, with the security posture and dispute handling regulated payments demand.",
        services: [
            { title: "Point of Sale (POS) Systems", description: "Manage in-store payments with fast, secure checkout, inventory sync, and integrated analytics.", stackTag: "Stripe Terminal · Square · Adyen POS" },
            { title: "Online Payment Gateways", description: "Enable smooth, secure online transactions via cards, wallets, UPI, and international payments.", stackTag: "Stripe · Adyen · Razorpay" },
            { title: "Payment Links", description: "Share payment requests via email, SMS, or WhatsApp — perfect for small businesses and freelancers.", stackTag: "Stripe Links · Razorpay · Plaid" },
            { title: "Mobile & Contactless Payments", description: "Use QR codes, NFC, and digital wallets to offer fast, safe, and modern checkout experiences.", stackTag: "Apple Pay · Google Pay · UPI" },
            { title: "Recurring Billing", description: "Automate billing cycles for membership and service businesses, with full subscription management.", stackTag: "Stripe Billing · Chargebee · Recurly" },
            { title: "Unified Dashboard & Reporting", description: "Track transactions from all channels in one place with powerful reporting tools.", stackTag: "Looker · Power BI · Custom" },
        ],
        spine: spine([
            ["Map payment flows by channel, region, and regulatory regime. Identify the reconciliation truth and the dispute path.", ["Flow map", "Compliance regimes", "Recon design"]],
            ["Design the payments architecture — provider mix, ledger, idempotency, retry strategy, and dispute handling.", ["Architecture", "Provider mix", "Ledger design"]],
            ["Build with strict idempotency, audit logs, and inline fraud guards. Sandbox-then-canary across each provider.", ["Idempotent APIs", "Audit logs", "Fraud guards"]],
            ["Launch by channel with monitored test transactions. Reconcile every cent in the first 30 days.", ["Channel launches", "Daily recon", "Variance investigation"]],
            ["Steady-state reconciliation, dispute handling, fraud-rule tuning, and quarterly cost-of-payments review.", ["Recon cadence", "Dispute SLA", "Cost review"]],
        ]),
        stack: {
            Gateways: ["Stripe", "Adyen", "Razorpay", "Braintree"],
            "Wallets & Rails": ["Apple Pay", "Google Pay", "UPI", "ACH", "SEPA"],
            Subscriptions: ["Stripe Billing", "Chargebee", "Recurly"],
            "Fraud & Risk": ["Stripe Radar", "Sift", "Forter"],
            "Compliance": ["PCI DSS", "PSD2", "3DS2"],
        },
    },

    "operational-tools": {
        headline: "Operating tools the team chooses to use.",
        hook: "Workflow, comms, docs, dashboards — wired into one operating layer.",
        intro: "We build and integrate the operating stack that runs the business — project management, automation, performance, collaboration, resource planning, and document control — so the team spends time on the work, not the tools.",
        services: [
            { title: "Project Management Systems", description: "Assign tasks, track milestones, and meet deadlines with precision.", stackTag: "Linear · Asana · Jira" },
            { title: "Workflow Automation", description: "Cut down manual tasks and streamline routine operations.", stackTag: "Zapier · Make · Workato" },
            { title: "Performance Monitoring", description: "Visualize team and business KPIs in real-time.", stackTag: "Looker · Grafana · Tableau" },
            { title: "Collaborative Communication", description: "Unified messaging, file sharing, and virtual meetings.", stackTag: "Slack · Notion · Loom" },
            { title: "Resource Allocation Systems", description: "Optimize how you manage time, people, and assets.", stackTag: "Float · Runn · Resource Guru" },
            { title: "Document Management", description: "Organize, store, and retrieve files effortlessly and securely.", stackTag: "SharePoint · Google Drive · Notion" },
        ],
        spine: spine([
            ["Inventory the existing tools and the workflows on top of them. Identify where the duplication actually lives.", ["Tool inventory", "Workflow map", "Duplication audit"]],
            ["Design the operating stack — one tool per job — and the integrations that connect them.", ["Stack design", "Integration model", "Adoption plan"]],
            ["Roll out by department. Migrate data, integrate workflows, and retire the duplicate tools.", ["Department rollouts", "Migrations", "Tool retirements"]],
            ["Adoption check — measured by daily-active and the number of orphan workflows. Adjust the stack to fit.", ["DAU metrics", "Orphan audit", "Stack adjustments"]],
            ["Steady-state operating-tool stewardship, quarterly tool review, and ongoing workflow optimisation.", ["Stewardship", "Tool review", "Optimisation backlog"]],
        ]),
        stack: {
            "Project Management": ["Linear", "Asana", "Jira", "ClickUp"],
            Automation: ["Zapier", "Make", "Workato", "n8n"],
            Communication: ["Slack", "Microsoft Teams", "Loom"],
            "Knowledge & Docs": ["Notion", "Confluence", "Google Workspace"],
            "Resource & Time": ["Float", "Runn", "Harvest"],
        },
    },

    "software-quality-testing": {
        headline: "QA as a shipping function.",
        hook: "Quality is what ships — not what gets caught.",
        intro: "We embed quality engineering into the delivery pipeline — automated coverage, performance, security, and accessibility — so quality is a property of how the team works, not a phase tacked onto the end.",
        services: [
            { title: "Manual Testing", description: "In-depth, human-driven testing for UI, UX, and functional validation.", stackTag: "Exploratory · Session-based" },
            { title: "Automated Testing", description: "High-speed, accurate test execution using tools like Selenium and Appium.", stackTag: "Playwright · Cypress · Appium" },
            { title: "Performance Testing", description: "Assess load, stress, and scalability to ensure consistent application performance.", stackTag: "k6 · JMeter · Locust" },
            { title: "Security Testing", description: "Identify vulnerabilities and ensure data protection through ethical hacking and audits.", stackTag: "Burp · ZAP · Snyk" },
            { title: "Compatibility Testing", description: "Validate seamless operation across devices, browsers, and platforms.", stackTag: "BrowserStack · Sauce Labs · LambdaTest" },
            { title: "Regression Testing", description: "Confirm new updates don't break existing features or workflows.", stackTag: "Playwright · Cypress · Cucumber" },
        ],
        spine: spine([
            ["Audit the current quality posture — defect-escape rate, automation coverage, environment stability, customer signal.", ["Quality baseline", "Coverage map", "Escape analysis"]],
            ["Design the test strategy — pyramid shape, environment plan, performance and security inclusion, accessibility gates.", ["Test strategy", "Pyramid design", "Gate definitions"]],
            ["Implement automation and the supporting harness. Wire the gates into CI. Flaky tests are first-class bugs.", ["Automation suite", "CI gates", "Flake budget"]],
            ["Roll the gates across teams. Track lead time, defect escape, and the test-debt log alongside the burn-down.", ["Team rollouts", "Metrics tracking", "Test-debt log"]],
            ["Steady-state quality engineering — coverage stewardship, performance/security cadence, and quarterly retros.", ["Coverage stewardship", "Perf/sec cadence", "Quarterly retro"]],
        ]),
        stack: {
            "Test Automation": ["Playwright", "Cypress", "Selenium", "Appium"],
            "Performance": ["k6", "JMeter", "Locust", "Gatling"],
            "Security": ["Burp Suite", "OWASP ZAP", "Snyk"],
            "Device Farms": ["BrowserStack", "Sauce Labs", "LambdaTest"],
            "Quality Analytics": ["Allure", "TestRail", "Datadog"],
        },
    },

    "info-xchange": {
        headline: "The integration layer that makes the rest work.",
        hook: "Systems that talk — securely, in real time, on contract.",
        intro: "We build the integration and information-exchange layer that connects the operating systems — APIs, events, real-time messaging, BI — with contracts, security, and the observability to know when something drifts.",
        services: [
            { title: "Enterprise Data Integration", description: "Connect databases, applications, and cloud systems to enable smooth, unified workflows.", stackTag: "MuleSoft · Boomi · Workato" },
            { title: "Real-Time Messaging & Collaboration", description: "Empower teams with secure, instant data sharing and advanced communication platforms.", stackTag: "Kafka · Pulsar · NATS" },
            { title: "Business Intelligence & Reporting", description: "Convert raw data into powerful insights with automated reports and interactive dashboards.", stackTag: "Looker · Power BI · Tableau" },
            { title: "API & System Interoperability", description: "Develop and manage APIs to ensure seamless communication between platforms.", stackTag: "REST · GraphQL · gRPC · AsyncAPI" },
            { title: "Security Management", description: "Protect critical information with robust encryption, access control, and policy enforcement.", stackTag: "OAuth · mTLS · Vault" },
            { title: "Cloud-Based Info Exchange", description: "Leverage the cloud for scalable, remote-enabled data collaboration and integration.", stackTag: "EventBridge · Pub/Sub · Service Bus" },
        ],
        spine: spine([
            ["Map systems, contracts, and the actual flow of records. Identify duplicate sources of truth and silent integrations.", ["System map", "Contract inventory", "Duplicate truth audit"]],
            ["Design the integration architecture — events vs sync, schema registry, contract testing, and the observability layer.", ["Integration architecture", "Schema registry", "Contract tests"]],
            ["Build the integration layer with versioned contracts. Old paths deprecated before new ones go live.", ["Integration layer", "Versioned contracts", "Deprecation plan"]],
            ["Cut over by integration with shadow runs and parallel reconciliation. Schema breaks are caught at the gate.", ["Shadow runs", "Reconciliation", "Schema gates"]],
            ["Steady-state integration ops, schema-registry stewardship, and quarterly contract review.", ["Integration ops", "Registry steward", "Quarterly review"]],
        ]),
        stack: {
            "iPaaS": ["MuleSoft", "Boomi", "Workato", "Azure LogicApps"],
            Messaging: ["Kafka", "Pulsar", "NATS", "RabbitMQ"],
            "API Tooling": ["Apigee", "Kong", "AWS API Gateway", "Postman"],
            "Schema Registry": ["Confluent Schema Registry", "AsyncAPI", "Protobuf"],
            Observability: ["Datadog", "OpenTelemetry", "Grafana"],
        },
    },
};

export function getServicePageContent(slug: string): ServicePageContent | undefined {
    return servicePageContent[slug];
}
