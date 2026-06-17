// Per-industry detail-page content — VyuSoft's real positioning per
// sector. Industries with an entry here render the detail template;
// the rest fall through to the legacy layout.

export type IndustrySolution = {
    title: string;
    /** Short label group for the column — e.g. "Digital Platforms". */
    group: string;
    description: string;
    /** Short bullet items — capabilities under the group. */
    items: string[];
};

export type IndustryChallenge = {
    title: string;
    description: string;
};

export type IndustryPageContent = {
    headline: string;
    vision: string;
    /** Short label that precedes the hero headline (e.g. "INDUSTRY"). */
    eyebrow?: string;
    /** The challenge — section copy + 6 cards on the diagram. */
    challenge: {
        title: string;
        lede: string;
        cards: IndustryChallenge[];
    };
    /** The solutions, grouped — full descriptions retained. */
    solutionsTitle: string;
    solutionsLede: string;
    solutions: IndustrySolution[];
    /** Final CTA copy. */
    cta: { title: string; lede: string };
};

export const industryPageContent: Record<string, IndustryPageContent> = {
    banking: {
        headline: "Transforming Banking Through Innovation",
        vision:
            "Vyusoft envisions a smarter, more secure, and efficient banking industry. We are committed to driving digital transformation by delivering reliable, future-ready software solutions that foster growth, enhance customer satisfaction, and ensure long-term sustainability.",
        eyebrow: "INDUSTRY · BANKING",
        challenge: {
            title: "Banking is complex. We make it operable.",
            lede: "Modern banks run on a layered stack of core systems, channels, networks, and oversight. We help banking organisations move forward without losing the discipline the sector demands.",
            cards: [
                { title: "Legacy Core Constraints", description: "Decades-old core systems hold the ledger but slow every new product to market." },
                { title: "Channel Fragmentation", description: "Mobile, web, and branch evolve apart, leaving customers with inconsistent experiences." },
                { title: "Regulatory Pressure", description: "Basel, FFIEC, GDPR, AML — overlapping obligations the architecture must answer to." },
                { title: "Real-Time Expectations", description: "Customers expect instant payments and decisions while controls remain non-negotiable." },
                { title: "Fraud at Velocity", description: "Threats adapt continuously; detection and response have to move at the same pace." },
                { title: "Data Without Decisions", description: "Banks hold abundant data, but turning it into trustworthy action remains the harder problem." },
            ],
        },
        solutionsTitle: "Our Core Solutions",
        solutionsLede: "Five domain-led platforms VyuSoft delivers for banking organisations — built for security, compliance, and seamless operations across every channel.",
        solutions: [
            { title: "Core Banking Systems", group: "Core Platform", description: "A comprehensive platform managing essential banking functions, including account management, transactions, and lending. Designed for security, compliance, and seamless operations across all channels.", items: ["Account & customer management", "Transactions & lending", "Multi-channel operations", "Security & audit posture"] },
            { title: "Digital Banking Solutions", group: "Channels", description: "Omnichannel platforms that provide smooth banking experiences on mobile, web, and in-branch, offering features like online account opening and loan applications.", items: ["Mobile & web banking", "In-branch experience", "Online account opening", "Loan & onboarding journeys"] },
            { title: "Real-Time Payment Processing", group: "Payments", description: "Fast, secure, and compliant payment solutions supporting wire transfers, ACH, and cross-border payments with fraud prevention measures.", items: ["Wire & ACH processing", "Cross-border payments", "ISO 20022 messaging", "Inline fraud prevention"] },
            { title: "Risk & Compliance Management", group: "Risk", description: "Tools to assess, monitor, and mitigate financial risks while ensuring adherence to global regulations such as GDPR, Basel III, and AML.", items: ["Risk modelling & monitoring", "Basel III · CCAR · FFIEC reporting", "AML & sanctions screening", "GDPR-aligned data handling"] },
            { title: "Advanced Data Analytics & AI", group: "Analytics & AI", description: "AI-powered analytics to derive actionable insights, detect fraud, and personalize banking services for improved decision-making.", items: ["Customer 360 & propensity", "Fraud detection AI", "Personalisation engines", "Decision support"] },
        ],
        cta: { title: "Ready to transform your banking platform?", lede: "Bring us the brief — a principal responds within one business day with a phased plan and named owners." },
    },

    "capital-markets": {
        headline: "Powering Capital Markets with Advanced Technology",
        vision:
            "Vyusoft provides cutting-edge software solutions tailored for the capital markets industry. Our advanced tools help financial institutions navigate global markets with speed, accuracy, and security. From trading platforms to risk management and compliance solutions, we empower clients to make informed decisions and optimize their market performance.",
        eyebrow: "INDUSTRY · CAPITAL MARKETS",
        challenge: {
            title: "Microseconds matter. So does the audit trail.",
            lede: "Capital markets demand both speed and provability. We help buy-side and sell-side firms compete on latency without compromising on the controls regulators expect.",
            cards: [
                { title: "Latency Pressure", description: "Execution venues compete in microseconds; the architecture has to keep up." },
                { title: "Fragmented Liquidity", description: "Orders flow across venues, dark pools, and asset classes — each with its own protocol." },
                { title: "Regulatory Scrutiny", description: "MiFID II, Dodd-Frank, and SEC record-keeping leave no room for missing trails." },
                { title: "Data Velocity", description: "Tick-by-tick feeds outpace traditional data platforms and analytic tooling." },
                { title: "Risk in Real Time", description: "Market, credit, and counterparty risk all need to move from end-of-day to live." },
                { title: "Post-Trade Drag", description: "T+1 settlement and CSDR push reconciliation breaks out of the back office and into the front." },
            ],
        },
        solutionsTitle: "Our Key Solutions",
        solutionsLede: "Five platforms VyuSoft builds for capital markets — engineered for speed, transparency, and compliance from the order book to the regulator.",
        solutions: [
            { title: "Trading Platforms", group: "Execution", description: "High-speed, low-latency trade execution for equities, derivatives, forex, and more. Robust order management and risk controls. Customizable interfaces designed for all trading levels.", items: ["Low-latency execution", "Order & risk controls", "Multi-asset coverage", "Configurable trader UIs"] },
            { title: "Market Analytics", group: "Insight", description: "Real-time market insights to support smart decision-making. Predictive analytics to identify market trends. Seamless integration with third-party data providers.", items: ["Real-time market insights", "Predictive trend models", "Third-party data feeds", "Quant research support"] },
            { title: "Risk Management", group: "Risk", description: "Live monitoring of market risks and portfolio exposure. Advanced analytics for portfolio assessment and stress testing. Automated alerts to mitigate financial risks.", items: ["Live exposure monitoring", "Portfolio stress testing", "Automated alerting", "Counterparty analytics"] },
            { title: "Regulatory Compliance", group: "Compliance", description: "Automated compliance checks and reporting. Adherence to global regulations (MiFID II, Dodd-Frank, etc.). Secure audit trails for transparency and accountability.", items: ["Automated compliance checks", "MiFID II · Dodd-Frank reporting", "Immutable audit trails", "Regulator-ready disclosures"] },
            { title: "Data Management & Integration", group: "Data", description: "Secure data storage and governance. Real-time data integration across platforms. API-driven architecture for seamless external system connectivity.", items: ["Secure storage & governance", "Real-time data integration", "API-driven architecture", "Cross-system connectivity"] },
        ],
        cta: { title: "Compete on speed without sacrificing the audit trail.", lede: "Tell us where the latency or the reporting hurts — we'll come back with a phased plan and named owners." },
    },

    "consumer-packed-goods": {
        headline: "Transforming Consumer Packaged Goods & Distribution",
        vision:
            "Vyusoft specializes in cutting-edge software solutions tailored for the Consumer Packaged Goods (CPG) and distribution industries. We help businesses streamline operations, optimize supply chains, and enhance customer experiences with advanced, scalable, and secure technology.",
        eyebrow: "INDUSTRY · CPG & DISTRIBUTION",
        challenge: {
            title: "Move faster across a longer supply chain.",
            lede: "CPG and distribution companies juggle demand signals, supplier reliability, and channel complexity. We help them close the gap between the warehouse and the shelf.",
            cards: [
                { title: "Inventory Imbalance", description: "Stockouts and overstock both eat margin — and the data to prevent them is scattered." },
                { title: "Demand Volatility", description: "Promotions, weather, and channel shifts make forecasting harder every quarter." },
                { title: "Channel Complexity", description: "Retail, wholesale, DTC, and marketplace each ask for a different pricing and fulfilment posture." },
                { title: "Logistics Cost Drift", description: "Fuel, labour, and last-mile costs climb faster than service levels can absorb." },
                { title: "Supplier Reliability", description: "Disruption upstream cascades into stockouts downstream before anyone reacts." },
                { title: "Compliance Pressure", description: "Procurement, food-safety, and traceability rules touch every link of the chain." },
            ],
        },
        solutionsTitle: "Solutions: Enhancing Every Step of Your Supply Chain",
        solutionsLede: "Five platforms VyuSoft delivers for CPG and distribution businesses — connecting inventory, demand, logistics, and supplier operations on one data layer.",
        solutions: [
            { title: "Inventory & Warehouse Management", group: "Inventory", description: "Monitor inventory levels across multiple warehouses. Maintain optimal stock levels with AI-driven reordering. Improve accuracy and speed of inventory management.", items: ["Multi-warehouse visibility", "AI-driven reordering", "Cycle-count accuracy", "Real-time stock movement"] },
            { title: "Sales & Order Management", group: "Orders", description: "Automate and track orders from placement to delivery. Adjust pricing based on demand, promotions, and customer segmentation. Access real-time data on order history and buying behavior.", items: ["Order lifecycle automation", "Dynamic pricing & promos", "Customer segmentation", "Buying-behaviour insight"] },
            { title: "Demand Forecasting & Analytics", group: "Forecast", description: "Predict demand using historical data and market trends. Identify top-selling products and optimize stock. Prevent stockouts and reduce overstocking with data-driven strategies.", items: ["Demand sensing models", "Top-seller identification", "Stockout prevention", "Overstock reduction"] },
            { title: "Logistics & Distribution Optimization", group: "Logistics", description: "Minimize transportation costs and delivery times. Monitor deliveries in real time for improved efficiency. Seamless connectivity with logistics providers.", items: ["Route & cost optimisation", "Real-time tracking", "Carrier integration", "Service-level analytics"] },
            { title: "Supplier & Procurement Management", group: "Procurement", description: "Reduce manual effort with AI-powered purchase order management. Evaluate supplier reliability and quality. Ensure adherence to procurement policies and industry regulations.", items: ["AI-powered PO management", "Supplier scoring", "Policy compliance", "Procurement analytics"] },
        ],
        cta: { title: "Tighten the chain from supplier to shelf.", lede: "Tell us where the breakage is — we'll come back with a phased plan and named owners within one business day." },
    },

    "communication-media": {
        headline: "Powering Innovation in Communication & Media",
        vision:
            "Vyusoft delivers advanced software solutions designed to help media companies, broadcasters, telecom operators, and digital content creators streamline operations, engage audiences, and drive growth. Our solutions ensure seamless content management, efficient advertising, optimized billing, and superior customer experiences in today's fast-paced digital world.",
        eyebrow: "INDUSTRY · COMMUNICATION & MEDIA",
        challenge: {
            title: "Reach more audiences without losing the margin.",
            lede: "Broadcasters, telcos, and digital publishers all face the same squeeze: more channels, more devices, and audiences that switch faster than the back-office can keep up.",
            cards: [
                { title: "Content Sprawl", description: "Files live across MAMs, DAMs, and edit suites — discovery costs add up every release." },
                { title: "Distribution Complexity", description: "TV, digital, OTT, mobile, and social each have their own packaging and rights model." },
                { title: "Monetisation Pressure", description: "Subscription, ad-supported, and hybrid models compete inside the same product." },
                { title: "Audience Fragmentation", description: "Attention scatters across platforms; personalisation has to follow the viewer, not the channel." },
                { title: "Billing Complexity", description: "Subscription, pay-per-view, and usage-based plans collide in one customer record." },
                { title: "Network Performance", description: "Telecoms need real-time visibility into performance, fraud, and service quality at once." },
            ],
        },
        solutionsTitle: "Solutions: Elevating Your Media & Communication Business",
        solutionsLede: "Five platforms VyuSoft builds for communication and media organisations — covering content, audience, advertising, billing, and network operations.",
        solutions: [
            { title: "Content Management & Distribution", group: "Content", description: "Organize, store, and retrieve media files effortlessly. Deliver content seamlessly across TV, digital, mobile, OTT, and social media. Use AI-driven insights to recommend content and enhance viewer engagement.", items: ["Asset management & MAM/DAM", "Multi-channel delivery", "AI-driven recommendations", "Rights & metadata workflows"] },
            { title: "Customer Engagement & Experience", group: "Audience", description: "Connect with customers via email, mobile, social media, and live chat. Enhance user experience with live streaming, notifications, and voting. Track customer behavior to personalize interactions and offers.", items: ["Multi-channel engagement", "Live streaming & notifications", "Behavioural personalisation", "Interactive features"] },
            { title: "Advertising & Monetization", group: "Revenue", description: "Automate ad placements for better audience targeting and efficiency. Support subscription-based, ad-supported, or hybrid monetization strategies. Track campaign success and optimize in real time.", items: ["Programmatic ad placement", "Subscription / AVOD / hybrid", "Real-time optimisation", "Campaign measurement"] },
            { title: "Billing & Subscription Management", group: "Billing", description: "Handle subscription, pay-per-view, and usage-based billing models. Streamline invoicing and integrate with multiple payment gateways. Manage acquisitions, renewals, and customer retention seamlessly.", items: ["Subscription & PPV billing", "Usage-based metering", "Multi-gateway payments", "Renewal & retention"] },
            { title: "Telecom & Network Solutions", group: "Networks", description: "Optimize telecom performance for better connectivity and service. Allow customers to manage their accounts, payments, and support requests. Gain insights into network performance, fraud detection, and service optimization.", items: ["Network performance tuning", "Self-service portals", "Fraud detection", "Service-quality analytics"] },
        ],
        cta: { title: "Build the next chapter of your media platform.", lede: "Tell us what's slowing the next release — we'll come back with a phased plan and named owners within one business day." },
    },

    "it-services": {
        headline: "Transforming Businesses with Cutting-Edge IT Services",
        vision:
            "Vyusoft is a leading IT solutions provider, helping businesses leverage technology for growth, efficiency, and innovation. From IT consulting and cloud computing to cybersecurity and data analytics, our end-to-end services ensure that your business stays ahead in today's digital world.",
        eyebrow: "INDUSTRY · IT SERVICES",
        challenge: {
            title: "Quiet IT lets the rest of the business move loudly.",
            lede: "IT-led businesses carry the weight of platform decisions every other team takes for granted. We help them deliver reliable, secure, scalable infrastructure without becoming the bottleneck.",
            cards: [
                { title: "Legacy Drag", description: "Outdated systems siphon time away from the projects that move the business forward." },
                { title: "Strategy Gaps", description: "Roadmaps written without ground-truth from the engineers running the estate." },
                { title: "Delivery Speed", description: "Custom platforms still take quarters to ship when they should take weeks." },
                { title: "Cloud Sprawl", description: "Multi-cloud estates accumulate cost, security debt, and undocumented coupling." },
                { title: "Security Surface", description: "GDPR, HIPAA, PCI-DSS — controls have to hold across every layer of the stack." },
                { title: "Operational Toil", description: "Manual incident response and patching crowd out the work that improves the system." },
            ],
        },
        solutionsTitle: "IT Services: Powering Your Digital Success",
        solutionsLede: "Five practices VyuSoft brings to IT-led organisations — from advisory through delivery, cloud, security, and run.",
        solutions: [
            { title: "IT Consulting & Digital Strategy", group: "Advisory", description: "Assess your IT landscape and create a strategic plan for digital transformation. Streamline workflows with cutting-edge technology. Upgrade outdated systems for enhanced performance and efficiency.", items: ["Landscape assessment", "Transformation roadmap", "Workflow modernisation", "Legacy upgrade planning"] },
            { title: "Custom Software Development", group: "Build", description: "Build custom applications, enterprise platforms, and mobile apps. Fast, flexible, and user-focused software delivery. Develop applications that run seamlessly on multiple devices.", items: ["Enterprise platforms", "Mobile & cross-device apps", "User-focused delivery", "Continuous release cadence"] },
            { title: "Cloud Computing Services", group: "Cloud", description: "Move infrastructure and data to AWS, Azure, or Google Cloud. Monitor and optimize cloud environments for performance and security. Ensure data protection and industry-standard compliance.", items: ["AWS · Azure · GCP migration", "Performance optimisation", "Compliance posture", "Cost engineering"] },
            { title: "Cybersecurity Solutions", group: "Security", description: "Identify vulnerabilities and prevent cyber threats. Proactive security management to safeguard operations. Ensure adherence to GDPR, HIPAA, and PCI-DSS standards.", items: ["Vulnerability assessment", "Proactive threat defence", "Regulatory adherence", "Incident response"] },
            { title: "Managed IT Services", group: "Run", description: "Ensure smooth operations with round-the-clock support. Optimize hardware, software, and network performance. Fast and efficient issue resolution to keep your team productive.", items: ["24×7 NOC / SOC", "Performance optimisation", "SLA-backed support", "Fast resolution playbooks"] },
        ],
        cta: { title: "Make IT quietly excellent.", lede: "Tell us where the platform is in the way — we'll come back with a phased plan and named owners within one business day." },
    },

    education: {
        headline: "Empowering Education with Smart Technology",
        vision:
            "Vyusoft is a leading provider of innovative and scalable education technology solutions. We help schools, universities, online learning platforms, and corporate training programs enhance learning experiences, streamline administration, and drive digital transformation.",
        eyebrow: "INDUSTRY · EDUCATION",
        challenge: {
            title: "Bridge classroom and screen — for everyone.",
            lede: "Schools and universities are running two systems at once: the in-person classroom and a digital learning estate. We help them work as one without losing the warmth of either.",
            cards: [
                { title: "Fragmented Tooling", description: "LMS, SIS, video, and assessment tools rarely speak to each other out of the box." },
                { title: "Engagement Decline", description: "Static content struggles to hold attention against the rest of the screen economy." },
                { title: "Data Silos", description: "Academic, behavioural, and operational data live in separate systems and rarely cross." },
                { title: "Faculty Workload", description: "Administrative load on educators crowds out the time spent actually teaching." },
                { title: "Privacy Pressure", description: "FERPA, GDPR-K, and safeguarding rules touch every interaction with a learner." },
                { title: "Equity of Access", description: "Devices, bandwidth, and accessibility set the ceiling on what each learner can reach." },
            ],
        },
        solutionsTitle: "Smart Education Solutions",
        solutionsLede: "Five platforms VyuSoft builds for the education sector — from LMS through analytics, all instrumented for learning outcomes.",
        solutions: [
            { title: "Learning Management System (LMS)", group: "Learning Platform", description: "Create, organize, and distribute learning materials effortlessly. Video conferencing, discussion forums, and group projects enhance collaboration. AI-powered recommendations for customized learning experiences.", items: ["Course authoring & delivery", "Conferencing & forums", "Group project workflows", "AI-driven recommendations"] },
            { title: "Student Information System (SIS)", group: "Records", description: "Manage student data and academic history with ease. Real-time insights into student progress. Students and faculty can check schedules, grades, and reports on the go.", items: ["Student records & history", "Progress dashboards", "Schedules & grades", "Self-service portals"] },
            { title: "E-Learning & Virtual Classrooms", group: "Virtual Learning", description: "Support for videos, quizzes, simulations, and gamified learning. Screen sharing, whiteboarding, and real-time chat for interactive sessions. AI-powered monitoring to prevent cheating and ensure fairness.", items: ["Video · quizzes · simulations", "Interactive whiteboarding", "Real-time chat", "Proctoring & integrity AI"] },
            { title: "Campus & Administration Management", group: "Operations", description: "Organize classes, exams, and events efficiently. Simplify fee collection, billing, and payments. Connect students with job opportunities and mentorship programs.", items: ["Class & exam scheduling", "Fee collection & billing", "Career & mentorship", "Event management"] },
            { title: "Data Analytics & Reporting", group: "Analytics", description: "Identify at-risk students and implement early intervention strategies. Monitor enrollment, performance, and engagement in real time.", items: ["At-risk learner detection", "Engagement analytics", "Enrolment & performance", "Real-time reporting"] },
        ],
        cta: { title: "Make every learner reachable.", lede: "Tell us where the learning estate is leaking time or attention — we'll come back with a phased plan within one business day." },
    },

    "energy-utilities": {
        headline: "Smart Technology for Energy, Resources & Utilities",
        vision:
            "Vyusoft is a leading technology provider that helps businesses in the Energy, Resources, and Utilities (ERU) sectors optimize operations, improve sustainability, and embrace digital transformation. We offer innovative, scalable, and data-driven solutions to enhance efficiency, reduce costs, and support compliance in a rapidly evolving industry.",
        eyebrow: "INDUSTRY · ENERGY, RESOURCES & UTILITIES",
        challenge: {
            title: "Run a cleaner, more reliable grid.",
            lede: "Utilities and energy operators are modernising the grid, integrating renewables, and answering harder sustainability questions — all at once. We make those programmes operable.",
            cards: [
                { title: "Aging Infrastructure", description: "Decades-old assets carry today's load while every kilowatt of new demand stacks on top." },
                { title: "Renewable Integration", description: "Solar, wind, and battery storage all need to land on a grid never designed for them." },
                { title: "Sustainability Pressure", description: "ESG, emissions, and net-zero commitments demand auditable evidence, not just intent." },
                { title: "Outage Risk", description: "Storm, vegetation, and equipment failures threaten reliability and customer trust." },
                { title: "Regulatory Load", description: "NERC CIP, FERC, and regional energy mandates leave no slack for surprises." },
                { title: "Customer Expectation", description: "Self-service, prepay, and real-time visibility are now table stakes for utility customers." },
            ],
        },
        solutionsTitle: "ERU Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for energy, resources, and utilities — built to optimise assets, ensure compliance, and meet sustainability commitments.",
        solutions: [
            { title: "Asset & Energy Management", group: "Assets", description: "Gain real-time insights to reduce consumption and costs. AI-driven alerts help prevent equipment failures and reduce downtime. Seamlessly manage solar, wind, and battery storage for a greener future.", items: ["Real-time consumption insight", "Predictive equipment alerts", "Renewable integration", "Storage orchestration"] },
            { title: "Smart Grid & Infrastructure", group: "Grid", description: "Improve energy reliability with real-time monitoring and automated controls. Ensure accurate billing and better demand management. Balance supply and demand with intelligent automation.", items: ["Real-time grid monitoring", "Automated control", "Accurate metering & billing", "Demand-response automation"] },
            { title: "Sustainability & Compliance", group: "ESG", description: "Monitor and reduce emissions to meet sustainability targets. Stay compliant with environmental laws and energy efficiency mandates. Collect and analyze data to support corporate sustainability strategies.", items: ["Emissions tracking", "Regulatory compliance", "ESG data & reporting", "Energy-efficiency analytics"] },
            { title: "Digital Twin & Data Analytics", group: "Insight", description: "Create digital replicas of systems for predictive analysis and performance optimization. Use AI to identify trends, optimize operations, and improve decision-making. Track key performance indicators (KPIs) and generate reports for informed decision-making.", items: ["Digital-twin modelling", "AI-driven optimisation", "KPI dashboards", "Predictive analytics"] },
            { title: "Customer Engagement & Billing", group: "Customers", description: "Enable customers to track usage, manage accounts, and access billing details. Ensure accurate, timely invoicing and seamless transactions. Improve service delivery with personalized interactions and faster issue resolution.", items: ["Usage tracking & accounts", "Accurate billing", "Self-service portals", "Personalised service"] },
        ],
        cta: { title: "Modernise the grid without losing reliability.", lede: "Tell us where the network or the reporting strains hardest — we'll come back with a phased plan within one business day." },
    },

    healthcare: {
        headline: "Smart Technology for Modern Healthcare",
        vision:
            "Vyusoft is a leading provider of healthcare software solutions, designed to improve patient care, streamline operations, and ensure regulatory compliance. Our advanced technologies — AI, cloud computing, and data analytics — help hospitals, clinics, and healthcare providers deliver efficient, data-driven, and patient-centered care.",
        eyebrow: "INDUSTRY · HEALTHCARE",
        challenge: {
            title: "Patient-first systems that hold under audit.",
            lede: "Healthcare providers carry life-critical decisions on top of legacy IT, payer pressure, and shifting compliance. We build systems that make the clinical workflow easier, not heavier.",
            cards: [
                { title: "Fragmented Records", description: "Patient data lives across EHRs, labs, and devices — each integration costs a clinician's time." },
                { title: "Administrative Burden", description: "Documentation and billing crowd out the minutes that should belong to care." },
                { title: "Compliance Weight", description: "HIPAA, HITRUST, and value-based-care reporting leave no room for shortcuts." },
                { title: "Care Access Gaps", description: "Patients in remote and underserved areas still struggle to reach specialists." },
                { title: "Cyber Threats", description: "Healthcare is the most-targeted sector; ransomware and breach risk are existential." },
                { title: "Outcome Visibility", description: "Real outcomes — readmission, adherence, satisfaction — remain hard to see clearly." },
            ],
        },
        solutionsTitle: "Vyusoft's Healthcare Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for healthcare providers — designed to improve outcomes, lower cost, and stand up to HIPAA, HITRUST, and FDA review.",
        solutions: [
            { title: "Electronic Health Records (EHR)", group: "Clinical", description: "Securely store and access real-time medical records. AI-powered recommendations to improve diagnosis and treatment. Seamless data exchange between hospitals, clinics, and labs.", items: ["Secure record management", "AI-assisted diagnosis", "Cross-facility data exchange", "FHIR-native APIs"] },
            { title: "Practice & Revenue Cycle Management", group: "Operations", description: "Reduce administrative burden and streamline payments. Minimize errors and ensure faster reimbursements. Reduce wait times and enhance efficiency.", items: ["Reduced admin load", "Streamlined payments", "Faster reimbursement", "Workflow efficiency"] },
            { title: "Telemedicine & Virtual Care", group: "Access", description: "Offer HIPAA-compliant virtual care. Track patient vitals with wearable devices. Connect with patients via secure chat and file sharing.", items: ["HIPAA-compliant video", "Wearable & vitals integration", "Secure messaging", "Asynchronous care"] },
            { title: "Patient Engagement & Self-Service Portals", group: "Engagement", description: "Patients can view lab results, prescriptions, and treatment plans. Reduce missed appointments and improve adherence to care plans. Empower patients with health insights and self-care tools.", items: ["Lab & prescription access", "Appointment adherence", "Care-plan tooling", "Self-care insights"] },
            { title: "Healthcare Data Analytics & Compliance", group: "Insight & Compliance", description: "Identify risks, prevent readmissions, and improve treatment outcomes. Automate reporting for HIPAA, GDPR, and value-based care metrics. Gain actionable insights for better decision-making.", items: ["Risk & readmission models", "HIPAA · GDPR reporting", "Value-based-care metrics", "Decision support"] },
        ],
        cta: { title: "Give the clinical workflow back to clinicians.", lede: "Tell us where the system is in the way of care — we'll come back with a phased plan and named owners within one business day." },
    },

    insurance: {
        headline: "Transforming the Insurance Industry with Smart Technology",
        vision:
            "Vyusoft is a leading provider of innovative software solutions designed specifically for the insurance industry. Our advanced, AI-powered, cloud-based platforms help insurance companies streamline operations, improve customer service, and ensure regulatory compliance. Whether you're managing policies, claims, underwriting, or customer relationships, Vyusoft empowers you to work more efficiently and stay ahead in a competitive market.",
        eyebrow: "INDUSTRY · INSURANCE",
        challenge: {
            title: "Automate the policy, protect the customer.",
            lede: "Insurance carriers carry decades of process tied to legacy systems and brittle data. We help underwriters, claims teams, and brokers operate at the speed customers now expect.",
            cards: [
                { title: "Manual Underwriting", description: "Risk assessment still moves through forms and queues when it should move through models." },
                { title: "Claims Latency", description: "Processing time stretches across teams, vendors, and paperwork — customers feel every day of it." },
                { title: "Fraud Exposure", description: "Sophisticated fraud rings outpace traditional rules; AI has to enter the loop." },
                { title: "Channel Fragmentation", description: "Brokers, direct, and embedded all evolve apart, leaving customers with inconsistent journeys." },
                { title: "Regulatory Complexity", description: "Solvency, privacy, and reporting rules differ by line of business and by jurisdiction." },
                { title: "Data Without Action", description: "Carriers hold rich actuarial and claims data, but translation into pricing and service lags behind." },
            ],
        },
        solutionsTitle: "Our Core Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for insurance carriers — covering policy, claims, customer relationships, underwriting, and regulatory reporting.",
        solutions: [
            { title: "Policy Management", group: "Policy", description: "Automates policy creation, underwriting, renewals, and adjustments. Generates documents and ensures compliance with regulations.", items: ["Policy issuance & renewal", "Document generation", "Regulatory compliance", "Adjustments & endorsements"] },
            { title: "Claims Processing & Fraud Detection", group: "Claims", description: "Manages end-to-end claims workflows, reducing processing time and errors. AI-driven fraud detection flags suspicious claims before approval.", items: ["End-to-end claims workflow", "Reduced processing time", "AI fraud detection", "Pre-approval screening"] },
            { title: "Customer Relationship Management (CRM)", group: "CRM", description: "Provides a 360-degree view of customer policies, claims, and interactions. Automates lead tracking, renewals, and personalized offers to improve customer retention.", items: ["360° customer view", "Lead & renewal tracking", "Personalised offers", "Retention analytics"] },
            { title: "Underwriting & Risk Assessment", group: "Underwriting", description: "Uses AI-powered risk profiling to speed up underwriting and reduce manual errors. Customizable underwriting rules adapt to different policy types and risk levels.", items: ["AI risk profiling", "Reduced manual error", "Configurable rules engine", "Multi-line support"] },
            { title: "Regulatory Compliance & Reporting", group: "Compliance", description: "Ensures real-time compliance with insurance laws and industry regulations. Offers powerful auditing and reporting tools for financial and operational analysis.", items: ["Real-time compliance", "Audit-ready trails", "Financial reporting", "Operational analysis"] },
        ],
        cta: { title: "Underwrite faster, settle cleaner.", lede: "Tell us where policy, claims, or compliance is slowing the business — we'll come back with a phased plan within one business day." },
    },

    government: {
        headline: "Empowering Governments with Digital Innovation",
        vision:
            "Vyusoft is a trusted provider of innovative software solutions designed to help governments operate efficiently, improve citizen engagement, and ensure transparency. With deep expertise in public sector challenges, we deliver advanced digital tools that modernize governance, enhance decision-making, and streamline public services.",
        eyebrow: "INDUSTRY · GOVERNMENT",
        challenge: {
            title: "Modernise governance without losing trust.",
            lede: "Government agencies modernise inside a tighter envelope than most: legacy systems, accessibility mandates, procurement constraints, and a public that expects the experience of a consumer app.",
            cards: [
                { title: "Legacy Systems", description: "Mainframes and outdated platforms still carry mission-critical workloads at most agencies." },
                { title: "Citizen Expectation Gap", description: "Citizens expect consumer-grade service from government interfaces designed in a different era." },
                { title: "Compliance Complexity", description: "FedRAMP, FISMA, accessibility, and data-residency rules touch every architectural decision." },
                { title: "Transparency Pressure", description: "Public scrutiny and FOIA mean every workflow must be auditable and explainable." },
                { title: "Resource Allocation", description: "Budgets are constrained while demand for digital services grows year over year." },
                { title: "Fragmented Data", description: "Agency data sits in silos, slowing coordination across departments and emergencies." },
            ],
        },
        solutionsTitle: "Government Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for federal, state, and local agencies — accessibility-first, audit-ready, and cleared for the public sector.",
        solutions: [
            { title: "E-Government Platforms", group: "Citizen Services", description: "Enable online access to permits, licenses, tax payments, and other public services, ensuring seamless interactions between citizens and government agencies.", items: ["Permits & licensing", "Tax payments", "Public-service portals", "Identity & access"] },
            { title: "Public Administration Management", group: "Administration", description: "Support resource allocation, budget tracking, project management, and compliance automation to enhance transparency and efficiency.", items: ["Resource allocation", "Budget tracking", "Project oversight", "Compliance automation"] },
            { title: "Citizen Engagement Tools", group: "Engagement", description: "Facilitate real-time communication, surveys, and feedback systems, helping governments understand and respond to public needs.", items: ["Real-time communication", "Surveys & feedback", "Multilingual channels", "Issue triage"] },
            { title: "Data Analytics & Reporting", group: "Insight", description: "Leverage business intelligence and predictive analytics for informed decision-making and efficient resource planning.", items: ["Predictive analytics", "Public-facing dashboards", "Resource planning", "Cross-agency reporting"] },
            { title: "Regulatory Compliance & Risk Management", group: "Compliance", description: "Automate compliance tracking, risk assessment, and audit trails to ensure accountability and fraud prevention.", items: ["Compliance tracking", "Risk assessment", "Audit trails", "Fraud prevention"] },
        ],
        cta: { title: "Deliver government that feels like a service.", lede: "Tell us where the public is waiting — we'll come back with a phased plan and named owners within one business day." },
    },

    manufacturing: {
        headline: "Revolutionizing Manufacturing with Smart Software Solutions",
        vision:
            "Vyusoft delivers cutting-edge software solutions tailored for the manufacturing industry. Our scalable technology enhances efficiency, optimizes production, reduces costs, and integrates seamlessly with existing systems.",
        eyebrow: "INDUSTRY · MANUFACTURING",
        challenge: {
            title: "Move from reactive firefighting to instrumented operations.",
            lede: "Manufacturers face equipment downtime, supply volatility, and quality risk that all compound at scale. We help them connect the plant floor to the boardroom on a single data layer.",
            cards: [
                { title: "Unplanned Downtime", description: "A single line stoppage cascades through the schedule and the customer commitment." },
                { title: "Supply Chain Disruption", description: "Component availability swings unpredictably; production planning has to absorb the shock." },
                { title: "Quality Variability", description: "Defects discovered late are expensive; the data to catch them earlier already exists." },
                { title: "Legacy Equipment", description: "Decades-old machines lack the telemetry needed to participate in modern operations." },
                { title: "Cost Pressure", description: "Energy, labour, and materials climb together; margins absorb every inefficiency." },
                { title: "Skills Gap", description: "Experienced operators retire faster than knowledge transfer can keep up." },
            ],
        },
        solutionsTitle: "Smart Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for manufacturers — connecting ERP, MES, supply chain, lifecycle, and analytics on one integrated stack.",
        solutions: [
            { title: "Enterprise Resource Planning (ERP)", group: "ERP", description: "Automates production planning, inventory, procurement, and orders. Live tracking of production, stock, and order status. Streamlines procurement to delivery.", items: ["Production planning", "Inventory & procurement", "Order lifecycle", "End-to-end visibility"] },
            { title: "Manufacturing Execution System (MES)", group: "MES", description: "Maximizes machine & labor efficiency. Ensures high production standards & reduces defects. Monitors output & identifies bottlenecks.", items: ["Machine & labour efficiency", "Quality enforcement", "Defect reduction", "Bottleneck detection"] },
            { title: "Supply Chain Management (SCM)", group: "Supply Chain", description: "Improves inventory planning & minimizes delays. Enhances procurement efficiency. Uses AI to optimize stock levels.", items: ["Inventory planning", "Delay minimisation", "Procurement efficiency", "AI-optimised stock"] },
            { title: "Product Lifecycle Management (PLM)", group: "Lifecycle", description: "Manages entire product lifecycle from design to production. Maintains accurate product records. Ensures eco-friendly production.", items: ["Design-to-production flow", "Accurate product records", "Sustainability tracking", "Engineering change control"] },
            { title: "Advanced Analytics & Reporting", group: "Analytics", description: "Helps optimize operations & reduce costs. Visualizes KPIs like production efficiency & order fulfillment. AI-driven monitoring prevents machine failures.", items: ["Operations optimisation", "KPI dashboards", "AI predictive maintenance", "Cost analytics"] },
        ],
        cta: { title: "Move the plant from reactive to instrumented.", lede: "Tell us where downtime, quality, or supply is hurting most — we'll come back with a phased plan within one business day." },
    },

    "public-services": {
        headline: "Transforming Public Services with Smart Technology",
        vision:
            "Vyusoft is a leading provider of innovative software solutions designed to help governments, municipalities, and public service organizations operate efficiently, improve citizen services, and ensure transparency. Our cutting-edge technology empowers public agencies to embrace digital transformation, reduce administrative burdens, and enhance service delivery.",
        eyebrow: "INDUSTRY · PUBLIC SERVICES",
        challenge: {
            title: "Service delivery that respects both the citizen and the agency.",
            lede: "Public services teams are asked to do more with less, faster, and more transparently. We help them modernise workflows without disrupting the mission underneath.",
            cards: [
                { title: "Administrative Overhead", description: "Routine paperwork consumes time that should belong to service delivery." },
                { title: "Citizen Access", description: "Channels for permits, payments, and feedback are still uneven across populations." },
                { title: "Resource Constraints", description: "Budgets and headcount are flat while service demand grows year over year." },
                { title: "Cross-Agency Coordination", description: "Public health, infrastructure, and emergency response too often live in separate systems." },
                { title: "Compliance Pressure", description: "Tax laws, building codes, and environmental policies all require traceable enforcement." },
                { title: "Trust & Transparency", description: "Citizens expect visibility into how decisions and funds move through the system." },
            ],
        },
        solutionsTitle: "Our Core Solutions",
        solutionsLede: "Five platforms VyuSoft builds for public services — from citizen engagement through project oversight, compliance, public health, and intelligence.",
        solutions: [
            { title: "Citizen Engagement & E-Services", group: "Citizen Services", description: "For tax payments, permit applications, and government services. Citizen feedback tools to gather public opinions and improve services.", items: ["Tax & payment portals", "Permit applications", "Citizen feedback", "Service-quality tracking"] },
            { title: "Public Resource & Project Management", group: "Operations", description: "Smart budgeting & planning tools for better financial management. Real-time tracking of infrastructure projects to ensure on-time and within-budget delivery.", items: ["Budgeting & planning", "Project tracking", "Vendor management", "On-time delivery"] },
            { title: "Compliance & Risk Management", group: "Compliance", description: "Automated compliance tracking for tax laws, building codes, and environmental policies. Audit trails for better transparency and fraud prevention.", items: ["Compliance automation", "Audit trails", "Fraud prevention", "Policy enforcement"] },
            { title: "Public Health & Emergency Services", group: "Public Health", description: "Healthcare solutions for tracking vaccinations, disease outbreaks, and medical services. Emergency response systems for real-time disaster and crisis management.", items: ["Vaccination tracking", "Outbreak monitoring", "Emergency response", "Real-time crisis ops"] },
            { title: "Data Analytics & Business Intelligence", group: "Intelligence", description: "AI-powered insights for traffic control, crime prevention, and resource planning. Custom dashboards to monitor government projects and performance metrics.", items: ["Traffic & safety AI", "Resource planning", "Custom dashboards", "Performance metrics"] },
        ],
        cta: { title: "Make public service feel like service.", lede: "Tell us where the work is stalling — we'll come back with a phased plan and named owners within one business day." },
    },

    retail: {
        headline: "Revolutionizing Retail with Smart Software Solutions",
        vision:
            "Vyusoft is a trusted technology partner for retailers, providing innovative software solutions that help businesses streamline operations, enhance customer experiences, and boost sales. Whether you're a small boutique or a large retail chain, our solutions scale with your business to improve efficiency and keep you ahead in the fast-changing retail world.",
        eyebrow: "INDUSTRY · RETAIL",
        challenge: {
            title: "Make every channel feel like one store.",
            lede: "Retailers run physical, digital, and marketplace channels that customers see as a single brand. We help them deliver that unified experience without doubling their operations.",
            cards: [
                { title: "Channel Fragmentation", description: "Pricing, inventory, and loyalty diverge across store, web, and marketplace — and customers notice." },
                { title: "Inventory Inaccuracy", description: "Stockouts and shrinkage cost the basket; live visibility is still the exception, not the rule." },
                { title: "Customer Expectation", description: "Personalisation, fast fulfilment, and frictionless return are now baseline expectations." },
                { title: "Margin Pressure", description: "Cost-of-goods and acquisition both climb; promotions have to earn their place." },
                { title: "Operational Visibility", description: "Real-time visibility into sales, staff, and supply remains scattered across systems." },
                { title: "Competitive Velocity", description: "Marketplaces, DTC brands, and discounters react in days — traditional retail has to match the cadence." },
            ],
        },
        solutionsTitle: "Our Retail Solutions",
        solutionsLede: "Five platforms VyuSoft builds for retailers — covering POS, inventory, omnichannel commerce, CRM, and intelligence.",
        solutions: [
            { title: "Point of Sale (POS) Systems", group: "POS", description: "Fast & Secure Transactions with real-time inventory updates. Flexible Payment Methods including cards, wallets, and contactless options. Sales Reports & Insights to track daily sales and employee performance.", items: ["Fast & secure transactions", "Flexible payments", "Real-time inventory", "Sales & staff insights"] },
            { title: "Inventory & Supply Chain Management", group: "Supply", description: "Live Stock Tracking to prevent shortages and overstocking. Automated Replenishment to reorder stock when levels are low. Supply Chain Optimization to ensure timely product deliveries.", items: ["Live stock tracking", "Automated replenishment", "Supply-chain optimisation", "Multi-banner visibility"] },
            { title: "E-Commerce & Omnichannel Retailing", group: "Omnichannel", description: "Seamless Online & Offline Shopping with unified pricing, promotions, and inventory. Personalized Customer Experience with AI-powered product recommendations. Fast & Efficient Order Fulfillment for timely deliveries and easy tracking.", items: ["Unified online + offline", "AI recommendations", "Fast fulfilment", "Order tracking"] },
            { title: "Customer Relationship Management (CRM)", group: "CRM", description: "Customer Insights & Segmentation for personalized marketing. Loyalty & Rewards Programs to increase repeat purchases. Integrated Customer Support for efficient query resolution.", items: ["Insight & segmentation", "Loyalty & rewards", "Integrated support", "Repeat-purchase analytics"] },
            { title: "Business Intelligence & Analytics", group: "Analytics", description: "Real-Time Sales & Market Trends to optimize pricing and promotions. Custom Dashboards to monitor key performance indicators (KPIs). Competitor & Industry Analysis to stay ahead in the market.", items: ["Real-time sales trends", "Custom KPI dashboards", "Competitor analysis", "Pricing & promo optimisation"] },
        ],
        cta: { title: "Run every channel like one store.", lede: "Tell us where the experience is splitting — we'll come back with a phased plan and named owners within one business day." },
    },

    "travel-logistics": {
        headline: "Smart Software Solutions for Travel & Logistics",
        vision:
            "Vyusoft provides cutting-edge software solutions designed to optimize travel and logistics operations. Whether you're managing travel bookings, fleet operations, or supply chains, our solutions help streamline processes, reduce costs, and enhance customer experiences.",
        eyebrow: "INDUSTRY · TRAVEL & LOGISTICS",
        challenge: {
            title: "Move people and goods reliably — at margin.",
            lede: "Travel and logistics operators run on thin margins, real-time decisions, and customer trust that breaks the moment a shipment or a flight slips. We help them stay ahead of the disruption.",
            cards: [
                { title: "Booking Complexity", description: "Multi-vendor inventory, dynamic pricing, and last-minute changes all live in one customer journey." },
                { title: "Fleet Visibility", description: "Drivers, vehicles, and assets move faster than the systems tracking them." },
                { title: "Disruption Recovery", description: "Weather, fuel, and demand shifts force replanning faster than humans alone can keep up." },
                { title: "Last-Mile Costs", description: "Delivery economics get harder with every kilometre and every customer expectation." },
                { title: "Customer Experience", description: "Booking, tracking, and support all sit in front of brand perception — a single failure echoes." },
                { title: "Data Fragmentation", description: "TMS, WMS, OMS, and CRM rarely share a single live picture of operations." },
            ],
        },
        solutionsTitle: "Our Key Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for travel and logistics operators — covering booking, fleet, supply chain, customer experience, and intelligence.",
        solutions: [
            { title: "Travel Management Systems", group: "Travel", description: "Book flights, hotels, and rentals seamlessly. Tailored plans for individuals and corporate travelers. Simplify large bookings and event travel management.", items: ["Multi-vendor booking", "Corporate travel plans", "Group & event bookings", "Itinerary management"] },
            { title: "Fleet & Logistics Management", group: "Fleet", description: "Monitor vehicles, optimize usage, and reduce downtime. Minimize delivery times and fuel costs. Track performance and ensure regulatory adherence.", items: ["Vehicle monitoring", "Delivery & fuel optimisation", "Performance tracking", "Regulatory adherence"] },
            { title: "Supply Chain & Warehouse Management", group: "Supply Chain", description: "Prevent shortages and overstocking. Faster and error-free processing. Track shipments and manage suppliers efficiently.", items: ["Stock balance control", "Error-free processing", "Shipment tracking", "Supplier management"] },
            { title: "Customer Experience & CRM", group: "CX", description: "Manage inquiries and enhance engagement. Encourage repeat business in travel and logistics. Let customers track bookings and shipments on the go.", items: ["Inquiry management", "Engagement automation", "Loyalty & retention", "Real-time tracking"] },
            { title: "Business Intelligence & Analytics", group: "Analytics", description: "Gain insights into sales, demand, and performance. Predict customer demand and optimize resources. Monitor KPIs like delivery times, customer trends, and costs.", items: ["Sales & demand insight", "Predictive resourcing", "Performance KPIs", "Cost analytics"] },
        ],
        cta: { title: "Move on time, even when the world doesn't.", lede: "Tell us where the schedule or the network strains hardest — we'll come back with a phased plan within one business day." },
    },

    ecommerce: {
        headline: "Powering Your E-Commerce Success",
        vision:
            "Vyusoft is a leading provider of custom e-commerce solutions designed to help businesses sell more, streamline operations, and enhance customer experiences. Whether you're launching a new online store or scaling an existing one, our secure, scalable, and high-performance software gives you the tools to succeed in today's competitive digital marketplace.",
        eyebrow: "INDUSTRY · E-COMMERCE",
        challenge: {
            title: "Survive Black Friday and Tuesday afternoon.",
            lede: "E-commerce teams are measured on conversion, speed, and reliability — all at once. We build storefronts and operations that hold under spikes without losing the brand under the load.",
            cards: [
                { title: "Conversion Friction", description: "Every extra step in checkout costs revenue per visitor; the gap rarely shows up until the funnel is measured." },
                { title: "Performance at Scale", description: "Page speed and reliability decide whether a campaign earns or evaporates on the day." },
                { title: "Inventory Mismatch", description: "Overselling and stockouts both erode trust — the supply layer has to stay live with the storefront." },
                { title: "Personalisation Pressure", description: "Static catalogues can't compete with feeds tuned to the individual shopper." },
                { title: "Payment Complexity", description: "Cards, wallets, BNPL, and crypto all need to feel native and stay secure." },
                { title: "Channel Sprawl", description: "Web, app, marketplace, and social commerce each ask for a different orchestration." },
            ],
        },
        solutionsTitle: "Our Key Solutions",
        solutionsLede: "Five platforms VyuSoft builds for e-commerce operators — covering platform, payments, inventory, customers, and catalog.",
        solutions: [
            { title: "E-Commerce Platform Development", group: "Storefront", description: "Create a unique store that fits your brand and business needs. Ensure a smooth experience across all devices. Easy navigation to maximize conversions.", items: ["Brand-fit storefront", "Cross-device experience", "Conversion-led navigation", "Composable architecture"] },
            { title: "Payments & Security", group: "Payments", description: "Credit/debit cards, PayPal, e-wallets, and cryptocurrencies. PCI-DSS compliance and advanced security measures.", items: ["Cards · wallets · crypto", "PCI-DSS compliance", "Fraud prevention", "Tokenisation"] },
            { title: "Inventory & Order Management", group: "Operations", description: "Prevent overselling and manage supply chains efficiently. From checkout to delivery, streamline operations. Track and manage inventory across multiple locations.", items: ["Live stock control", "Streamlined fulfilment", "Multi-location inventory", "Returns & exchanges"] },
            { title: "Customer Relationship Management (CRM)", group: "CRM", description: "Recommend products and offer targeted discounts. Enhance customer service with instant assistance. Increase customer retention with incentives.", items: ["Personalised recommendations", "Targeted discounts", "Instant support", "Retention incentives"] },
            { title: "Product & Catalog Management", group: "Catalog", description: "Easily manage product details, pricing, and images. Save time with bulk imports of product data. Help customers find what they need quickly.", items: ["Product details & pricing", "Bulk data import", "Faceted discovery", "Catalog governance"] },
        ],
        cta: { title: "Build a storefront that performs.", lede: "Tell us where conversion or reliability is leaking — we'll come back with a phased plan and named owners within one business day." },
    },

    fintech: {
        headline: "Innovating the Future of Fintech",
        vision:
            "Vyusoft is a leading provider of cutting-edge fintech solutions, helping banks, startups, and financial institutions streamline operations, enhance security, and drive innovation. From digital banking and payment processing to blockchain and wealth management, our solutions empower businesses to navigate the fast-evolving financial landscape with confidence.",
        eyebrow: "INDUSTRY · FINTECH",
        challenge: {
            title: "Scale a financial product without breaking trust.",
            lede: "Fintech teams ship fast in a regulated industry — payments, lending, wealth, and crypto products all live or die by the controls around them. We make those controls part of the platform from day one.",
            cards: [
                { title: "Regulatory Pressure", description: "PCI, PSD2, KYC, and AML rules touch every product before it touches a customer." },
                { title: "Fraud Velocity", description: "Threat actors adapt faster than rule-based defences; AI has to enter the loop." },
                { title: "Scale Spikes", description: "A viral launch or partner integration can multiply traffic overnight — the ledger has to hold." },
                { title: "Trust & UX Tradeoff", description: "Every additional control costs conversion; striking the balance is a daily discipline." },
                { title: "Cross-Border Complexity", description: "FX, settlement, and compliance differ per country — and most fintechs cross borders early." },
                { title: "Data Integrity", description: "A financial ledger that drifts even slightly is a much bigger problem than a slow API." },
            ],
        },
        solutionsTitle: "Fintech Solutions",
        solutionsLede: "Five platforms VyuSoft builds for fintech teams — covering payments, blockchain, wealth, compliance, and lending.",
        solutions: [
            { title: "Digital Banking & Payments", group: "Payments", description: "Manage accounts, transactions, and reporting effortlessly. Secure banking anytime, anywhere. Accept multiple payment methods with fraud protection.", items: ["Accounts & transactions", "Anywhere secure access", "Multi-method payments", "Inline fraud protection"] },
            { title: "Blockchain & Cryptocurrency", group: "Web3", description: "Secure, transparent, and decentralized financial transactions. Store, send, and receive cryptocurrencies safely. Automate and enforce financial agreements securely.", items: ["Decentralised transactions", "Custody & transfer", "Smart-contract automation", "Tokenisation"] },
            { title: "Wealth & Investment Management", group: "Wealth", description: "Optimize investments and track client portfolios. AI-powered financial planning tailored to customer goals. Real-time insights for smarter financial decisions.", items: ["Portfolio tracking", "AI-driven planning", "Goal-based investing", "Real-time insights"] },
            { title: "Regulatory Compliance & Security", group: "Compliance", description: "Secure customer verification and fraud prevention. Identify and mitigate financial risks effectively. Real-time monitoring to prevent suspicious transactions.", items: ["KYC & onboarding", "Fraud & risk mitigation", "Transaction monitoring", "Regulatory reporting"] },
            { title: "Lending & Credit Solutions", group: "Lending", description: "Automate loan approvals and disbursements. AI-driven creditworthiness assessments. Connect borrowers and lenders directly.", items: ["Automated approvals", "AI credit scoring", "P2P lending rails", "Disbursement & servicing"] },
        ],
        cta: { title: "Ship fast — without breaking the controls.", lede: "Tell us what you're launching — we'll come back with a phased plan and named owners within one business day." },
    },

    "food-grocery": {
        headline: "Transforming the Food & Grocery Industry",
        vision:
            "Vyusoft is dedicated to revolutionizing the food and grocery sector with smart, integrated software solutions that enhance efficiency, improve customer experiences, and drive business growth. Whether you run a grocery store, restaurant, food distribution network, or manufacturing unit, our solutions help you streamline operations, manage inventory, and optimize supply chains with ease.",
        eyebrow: "INDUSTRY · FOOD & GROCERY",
        challenge: {
            title: "Keep the shelf fresh, the chain tight, the customer close.",
            lede: "Food and grocery operators run on freshness, margin, and trust. We help them connect inventory, ordering, payments, and compliance on a single operational backbone.",
            cards: [
                { title: "Perishability", description: "Shelf life and expiration windows make every overstock or stockout decision more costly than other retail." },
                { title: "Demand Volatility", description: "Promotions, weather, and local events all swing daily demand — forecasts have to keep pace." },
                { title: "Last-Mile Complexity", description: "Grocery delivery has the tightest service-level expectations in retail and the thinnest margins." },
                { title: "Food Safety Pressure", description: "HACCP, traceability, and recall management leave no room for missing data trails." },
                { title: "Loyalty Pressure", description: "Customers expect personalised rewards across in-store, online, and delivery." },
                { title: "Supplier Reliability", description: "Disruption upstream cascades into empty shelves faster than other categories." },
            ],
        },
        solutionsTitle: "Key Solutions",
        solutionsLede: "Five platforms VyuSoft delivers for food and grocery operators — inventory, ordering, POS, safety, and analytics on one connected stack.",
        solutions: [
            { title: "Smart Inventory Management", group: "Inventory", description: "Track stock levels, shelf life, and expiration dates automatically. Get alerts for low inventory and prevent food waste. Manage stock across multiple stores or warehouses in real time.", items: ["Stock & shelf-life tracking", "Low-inventory alerts", "Waste reduction", "Multi-site visibility"] },
            { title: "Online Ordering & Delivery System", group: "Ordering", description: "Customers can easily browse, order, and schedule deliveries online. Automated route optimization for faster deliveries. Real-time order tracking for both customers and drivers.", items: ["Browse, order & schedule", "Route optimisation", "Real-time tracking", "Driver tooling"] },
            { title: "Integrated POS System", group: "POS", description: "Supports in-store, online, and mobile transactions. Secure payment processing with fraud protection. Loyalty programs and customer rewards integration.", items: ["Omnichannel transactions", "Secure payments", "Fraud protection", "Loyalty & rewards"] },
            { title: "Food Safety & Compliance", group: "Safety", description: "Ensure compliance with HACCP and other food safety regulations. Track products from supplier to customer with real-time traceability. Automate recall alerts and expiration date tracking.", items: ["HACCP compliance", "End-to-end traceability", "Recall management", "Expiry monitoring"] },
            { title: "Predictive Analytics & Business Insights", group: "Analytics", description: "Identify sales trends and customer preferences. Forecast demand to optimize stock levels. Custom reports and dashboards for informed decision-making.", items: ["Sales-trend analytics", "Demand forecasting", "Stock optimisation", "Custom dashboards"] },
        ],
        cta: { title: "Run a fresher chain, end to end.", lede: "Tell us where the freshness or the chain is leaking — we'll come back with a phased plan and named owners within one business day." },
    },
};

export function getIndustryPageContent(
    slug: string,
): IndustryPageContent | undefined {
    return industryPageContent[slug];
}
