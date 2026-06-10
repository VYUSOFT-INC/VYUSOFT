// Per-service detail-page content (hero headline + intro + the six services
// shown on each /services/[slug] page). Sourced from the client's content,
// with obvious copy-paste errors corrected in context. Keyed by service slug.

export type ServicePageContent = {
    headline: string;
    intro: string;
    services: { title: string; description: string }[];
};

export const servicePageContent: Record<string, ServicePageContent> = {
    "artificial-intelligence": {
        headline: "Leading the Future of AI Innovation",
        intro: "Vyusoft leads the future of AI innovation, delivering intelligent automation, predictive insights, and personalized experiences. We empower businesses across industries with cutting-edge AI technologies to drive growth and transformation.",
        services: [
            { title: "AI-Powered Automation", description: "Streamline and optimize operations with intelligent automation." },
            { title: "Predictive Analytics", description: "Leverage AI to predict trends, customer behavior, and market movements." },
            { title: "Natural Language Processing", description: "Build chatbots, virtual assistants, and sentiment analysis tools." },
            { title: "Computer Vision Applications", description: "Implement AI for image recognition, quality control, and surveillance." },
            { title: "AI-Driven Customer Experience", description: "Personalize user interactions and enhance engagement with smart systems." },
            { title: "AI Consulting & Strategy", description: "End-to-end advisory on AI adoption, integration, and scaling for businesses." },
        ],
    },

    "cyber-security": {
        headline: "Your Trusted Partner in Cybersecurity",
        intro: "In today's digital world, cyber threats are constantly evolving, making cybersecurity a top priority for businesses. Vyusoft provides cutting-edge cybersecurity solutions to protect your data, networks, and systems from cyberattacks. Our expertise helps businesses prevent threats, detect attacks, and ensure compliance with global security standards like GDPR, HIPAA, and PCI DSS.",
        services: [
            { title: "Managed Security Services", description: "24/7 monitoring to detect security threats early, with quick response to attacks that prevents system damage." },
            { title: "Network Security", description: "Firewalls and intrusion prevention to stop cyber intrusions, plus DDoS protection to ensure business continuity." },
            { title: "Endpoint Protection", description: "Defense against malware, ransomware, and phishing, with continuous monitoring of all connected devices." },
            { title: "Data Security & Encryption", description: "Protect sensitive data with strong encryption, and secure storage and backup solutions for data recovery." },
            { title: "Identity & Access Management", description: "Multi-factor authentication (MFA) for strong login security, and access controls to prevent unauthorized entry." },
            { title: "Threat Intelligence & Response", description: "Real-time insights into emerging cyber threats, with rapid response to security breaches and attacks." },
        ],
    },

    "network-solutions": {
        headline: "Reliable, Secure & Scalable Network Solutions",
        intro: "In today's fast-paced digital world, businesses need a strong, secure, and scalable network to stay connected and efficient. Vyusoft specializes in end-to-end network solutions that enhance performance, security, and scalability for businesses of all sizes. Our team designs, implements, and manages network infrastructure that supports seamless communication, collaboration, and data transfer.",
        services: [
            { title: "Network Design", description: "Custom-built, scalable network architecture with high availability to minimize downtime." },
            { title: "Wireless Networking", description: "High-performance, secure Wi-Fi for all environments." },
            { title: "Network Security Services", description: "Comprehensive protection against cyber threats." },
            { title: "Network Monitoring", description: "Real-time performance monitoring and troubleshooting." },
            { title: "Cloud Networking", description: "Fast and secure cloud-based networking across platforms." },
            { title: "Virtual Private Networks", description: "Secure, encrypted connectivity for remote access." },
        ],
    },

    cloud: {
        headline: "Leading the Future of Cloud Innovation",
        intro: "In today's digital era, cloud technology drives business growth, agility, and innovation. Vyusoft empowers businesses with end-to-end cloud services — ensuring seamless migration, management, and security, scalably and cost-effectively.",
        services: [
            { title: "Cloud Consulting & Strategy", description: "Design the ideal cloud roadmap tailored to your business goals." },
            { title: "Cloud Migration Services", description: "Seamless migration of applications, data, and infrastructure with minimal downtime." },
            { title: "Cloud Infrastructure", description: "24/7 monitoring, optimization, and automated scaling of cloud environments." },
            { title: "Hybrid & Multi-Cloud Solutions", description: "Integration of on-premises and multiple cloud providers for maximum flexibility." },
            { title: "Cloud Security & Services", description: "Advanced protection, encryption, identity management, and regulatory compliance." },
            { title: "Cloud Backup & Recovery", description: "Ensure business continuity while reducing operational costs." },
        ],
    },

    data: {
        headline: "Empowering the Future of Data Innovation",
        intro: "Unlock the true power of your data with Vyusoft's end-to-end data solutions, designed to drive smarter decisions, growth, and competitive advantage. We help businesses collect, manage, secure, and analyze data seamlessly in today's digital world.",
        services: [
            { title: "Data Management & Integration", description: "Centralize, organize, and ensure high-quality, accessible data across platforms." },
            { title: "Data & Business Analytics", description: "Deliver predictive analytics, reporting, and interactive dashboards." },
            { title: "Data Governance & Compliance", description: "Implement strong governance and auditing, and ensure regulatory compliance." },
            { title: "Cloud Data Solutions", description: "Scalable, secure cloud storage, backup, and data-processing integration with AWS, Azure, and more." },
            { title: "Data Migration Services", description: "Secure, seamless data migration with minimal downtime and zero data loss." },
            { title: "Big Data & Data Quality", description: "Handle large datasets and real-time insights, and ensure clean, consistent, reliable data." },
        ],
    },

    devops: {
        headline: "Leading the Future of DevOps Innovation",
        intro: "In an era where speed, agility, and reliability are everything, Vyusoft's DevOps solutions empower enterprises with next-gen development and deployment practices. We help businesses accelerate innovation, break down silos, and deliver top-quality software faster and more securely.",
        services: [
            { title: "CI/CD Pipeline Automation", description: "Implement automated build, test, and deployment pipelines for speed and precision." },
            { title: "Containerization Solutions", description: "Deploy applications with Kubernetes, Docker, and cloud-native tools for flexibility and scale." },
            { title: "Infrastructure as Code (IaC)", description: "Manage your entire infrastructure with code using Terraform, Ansible, and automation scripts." },
            { title: "Performance Optimization", description: "Proactively monitor performance using Prometheus, Grafana, and the ELK Stack." },
            { title: "DevSecOps & Security Automation", description: "Shift security left in the pipeline — automated checks, vulnerability scans, and compliance." },
            { title: "Microservices Architecture", description: "Break monoliths into scalable microservices, with serverless for speed and cost." },
        ],
    },

    "digital-solutions-web-app": {
        headline: "Leading the Future of Digital Solutions Innovation",
        intro: "Vyusoft empowers businesses with innovative web and mobile app development, delivering scalable, secure, and user-friendly digital solutions tailored for success. We turn ideas into high-performance digital experiences that fuel business growth and innovation.",
        services: [
            { title: "Web Development", description: "SEO-friendly, responsive, and custom websites." },
            { title: "Mobile App Development", description: "Native and cross-platform mobile solutions for Android and iOS." },
            { title: "UI/UX Design", description: "Engaging, intuitive designs that offer seamless user journeys." },
            { title: "Cloud & API Integration", description: "Scalable cloud solutions and third-party integrations for greater functionality." },
            { title: "Enterprise Solutions", description: "Customized enterprise software for automation, productivity, and growth." },
            { title: "E-commerce Solutions", description: "End-to-end e-commerce development for secure, scalable online stores." },
        ],
    },

    "ui-ux-development": {
        headline: "Leading the Future of UI/UX Innovation",
        intro: "At Vyusoft, we believe exceptional design is more than just visuals — it's about delivering meaningful digital experiences. Our UI/UX Development services empower businesses to build intuitive, elegant, and conversion-optimized interfaces that users love. From mobile apps to enterprise platforms, we transform complex ideas into beautiful, usable designs.",
        services: [
            { title: "User Research & Strategy", description: "Research, personas, and journey mapping to uncover user needs and define strategic design goals." },
            { title: "User Interface (UI) Design", description: "Visually compelling interfaces that bring your brand to life across apps and platforms." },
            { title: "User Experience (UX) Design", description: "Wireframes, prototypes, and interaction flows crafted to maximize engagement and ease of use." },
            { title: "Web & Mobile App Design", description: "Seamless experiences tailored for iOS, Android, and web — designed to delight on every device." },
            { title: "Design Systems & Branding", description: "Scalable design systems and consistent UI components that grow with your product." },
            { title: "Usability Testing", description: "Real-time testing, analytics, and A/B experimentation to fine-tune performance post-launch." },
        ],
    },

    "cross-platform-apps": {
        headline: "Leading the Future of Cross-Platform Apps Innovation",
        intro: "At Vyusoft, we create high-performance cross-platform applications that run flawlessly across iOS, Android, web, and desktop. Our solutions let businesses reach more users with one unified codebase — accelerating development, reducing costs, and maximizing impact. Whether you're building a startup MVP or scaling an enterprise platform, we ensure smooth performance and a consistent experience across all devices.",
        services: [
            { title: "Flutter App Development", description: "Beautiful and fast apps for mobile, web, and desktop from a single codebase." },
            { title: "React Native Development", description: "Feature-rich, high-performing apps with native-like experiences." },
            { title: "Progressive Web Apps (PWA)", description: "Browser-based apps that function like native ones." },
            { title: "Hybrid App Development", description: "Combine web and mobile technologies for agile delivery." },
            { title: "Cross-Platform UI/UX Design", description: "Adaptive designs that maintain consistency across devices." },
            { title: "Custom Plugin & API Integration", description: "Tailor-made integrations to enhance app functionality." },
        ],
    },

    "blockchain-app-development": {
        headline: "Empowering the Future with Secure & Scalable Blockchain Solutions",
        intro: "At Vyusoft, we help businesses unlock the full potential of blockchain technology. From startups launching crypto wallets to enterprises integrating smart contracts or decentralized apps, our blockchain development services are designed to make your digital journey secure, transparent, and efficient.",
        services: [
            { title: "Blockchain Development", description: "Build secure public, private, or hybrid blockchain systems." },
            { title: "Smart Contracts & Audits", description: "Write and verify automated, tamper-proof smart contracts." },
            { title: "DApps (Decentralized Apps)", description: "Launch scalable apps in DeFi, gaming, healthcare, and more." },
            { title: "Crypto Wallet Development", description: "Multi-currency wallets with high-level encryption and a user-friendly UI." },
            { title: "NFT Platforms & Marketplaces", description: "Create, trade, and manage NFTs with ownership transparency." },
            { title: "DeFi Solutions", description: "Build DEXs, yield farms, lending protocols, staking platforms, and AMMs." },
        ],
    },

    "iot-digital-engineering": {
        headline: "Leading the Future of IoT & Digital Engineering Innovation",
        intro: "Vyusoft specializes in IoT and digital engineering services, helping businesses leverage smart technologies to enhance operations, improve customer experiences, and drive innovation. Our solutions integrate the physical and digital worlds, enabling businesses to stay ahead in a rapidly evolving landscape.",
        services: [
            { title: "IoT Consulting & Strategy", description: "Develop IoT strategies aligned with business goals and efficiency." },
            { title: "IoT Solution Integration", description: "Custom IoT solutions with sensors, connectivity, and data analytics." },
            { title: "IoT Device Management", description: "Secure, scalable device connectivity and lifecycle management." },
            { title: "Data Analytics Integration", description: "Real-time insights for decision-making and operational efficiency." },
            { title: "Digital Twin Technology", description: "Create digital replicas of assets for monitoring and predictive maintenance." },
            { title: "AI-Driven Smart Automation", description: "Enhance efficiency and decision-making using AI and automation." },
        ],
    },

    wearables: {
        headline: "Leading the Future of Wearable Innovation",
        intro: "At Vyusoft, we're shaping tomorrow with next-generation wearable technology that blends innovation, intelligence, and connectivity. From health and fitness to enterprise productivity and immersive AR/VR experiences, we empower businesses to harness the full power of wearables through cutting-edge software and smart integrations.",
        services: [
            { title: "Wearable App Development", description: "Custom-built apps for Apple Watch, Fitbit, Wear OS, Garmin, and more." },
            { title: "Health & Fitness Solutions", description: "Real-time monitoring, biometric tracking, and smart health alerts." },
            { title: "IoT-Enabled Wearables", description: "Sync with cloud and devices to track data, monitor users, and deliver alerts." },
            { title: "AR/VR Wearables", description: "Develop immersive apps for Oculus, smart glasses, and virtual training experiences." },
            { title: "NFC & Contactless Payments", description: "Build secure, wearable payment solutions with advanced encryption." },
            { title: "AI & Predictive Analytics", description: "Analyze data to deliver personalized insights and smarter user experiences." },
        ],
    },

    "enterprise-solutions": {
        headline: "Leading the Future of Enterprise Innovation",
        intro: "Vyusoft transforms enterprises with smart, scalable, and integrated software solutions — helping businesses streamline operations, enhance productivity, and drive digital innovation. We empower you with ERP, CRM, HR, supply chain, and analytics tools built for success.",
        services: [
            { title: "Enterprise Resource Planning", description: "Integrated platforms to automate finance, inventory, procurement, and manufacturing for better collaboration and efficiency." },
            { title: "Customer Relationship Management", description: "Centralized customer data, sales automation, and marketing tools to boost engagement and retention." },
            { title: "Supply Chain Management", description: "Real-time inventory, order, and logistics tracking with enhanced forecasting and vendor management." },
            { title: "Human Resource Management", description: "Streamlined HR processes including recruitment, payroll, performance management, and compliance." },
            { title: "Business Intelligence", description: "Actionable insights, predictive analytics, and customizable dashboards for data-driven decisions." },
            { title: "Cloud-Based Enterprise", description: "Secure, scalable cloud hosting for enterprise applications — enabling remote access, collaboration, and cost savings." },
        ],
    },

    erps: {
        headline: "Leading the Future of ERP Innovation",
        intro: "In a world where agility and efficiency define success, Vyusoft is redefining how businesses operate through powerful ERP solutions. Our next-gen ERP platforms integrate and automate your core business processes — giving you control, visibility, and scalability like never before.",
        services: [
            { title: "ERP Implementation", description: "Fully tailored systems to meet your operational needs, deployed with minimal disruption." },
            { title: "Business Process Automation", description: "Streamline repetitive tasks and enhance workflow efficiency from finance to HR administration." },
            { title: "Data & Business Intelligence", description: "Generate live reports, dashboards, and KPIs for instant performance tracking and monitoring." },
            { title: "ERP Support & Maintenance", description: "Continuous system health monitoring, updates, and troubleshooting support." },
            { title: "Cloud-Based ERP Solutions", description: "Access your ERP platform securely from anywhere, at any time — scalable and low-cost." },
            { title: "Multi-Department Integration", description: "Connect finance, inventory, HR, CRM, and more under one centralized system." },
        ],
    },

    "cognitive-business-operation": {
        headline: "Power Your Business with AI, Automation, and Intelligence",
        intro: "At Vyusoft, we help businesses evolve with Cognitive Business Operations (CBO) — an intelligent blend of AI, machine learning, and advanced analytics. Our solutions automate workflows, optimize decision-making, and make your business smarter, faster, and future-ready. Whether you're scaling a startup or enhancing a global enterprise, we're your partner in AI-powered transformation.",
        services: [
            { title: "Intelligent Process Automation", description: "Automate everyday tasks like data entry, invoicing, and customer support to boost efficiency and cut costs." },
            { title: "AI-Driven Analytics", description: "Predict customer behavior, operational trends, and market changes to make proactive, profitable decisions." },
            { title: "Natural Language Processing", description: "Enhance customer service with AI chatbots, sentiment analysis, and intelligent virtual assistants." },
            { title: "Real-Time Dashboards", description: "Monitor KPIs, operational performance, and business metrics instantly with intuitive dashboards." },
            { title: "End-to-End System Integration", description: "Unify HR, finance, sales, and marketing for seamless collaboration and real-time data sharing." },
            { title: "Scalability & Security", description: "Flexible cloud-based solutions that adapt to your growth, with built-in security and compliance." },
        ],
    },

    "digital-architect": {
        headline: "Leading the Future of Digital Architecture Innovation",
        intro: "In the age of rapid digital transformation, the right architecture isn't just infrastructure — it's your innovation engine. At Vyusoft, we craft intelligent, scalable, and secure digital ecosystems that empower businesses to innovate fearlessly and scale confidently, with growth, agility, and sustainability built in.",
        services: [
            { title: "Enterprise Architecture", description: "Design enterprise-level frameworks that enhance operational efficiency and agility." },
            { title: "Cloud Architecture & Migration", description: "Build and migrate to secure cloud environments on AWS, Azure, and Google Cloud." },
            { title: "Microservices & API Design", description: "Create modular, scalable systems with streamlined APIs for seamless integration." },
            { title: "Security Architecture", description: "Implement comprehensive security controls to protect your digital assets." },
            { title: "Data Architecture & Management", description: "Structure your data pipelines for real-time access, analytics, and intelligence." },
            { title: "DevOps Automation", description: "Accelerate deployment with CI/CD pipelines and automated infrastructure provisioning." },
        ],
    },

    "vyu-migrations": {
        headline: "Leading the Future of VYU Migration Innovation",
        intro: "Digital transformation begins with confident migration. At Vyusoft, we power your transition with VYU Migration Services — a secure, seamless approach to moving your systems, data, and applications into the future. Whether you're migrating to the cloud, modernizing legacy environments, or optimizing infrastructure, we ensure zero disruption and full efficiency.",
        services: [
            { title: "Cloud Migration", description: "Shift to AWS, Azure, or GCP with hybrid and multi-cloud options — fast, secure, and scalable." },
            { title: "Data Migration", description: "Move structured and unstructured data with full validation and integrity checks." },
            { title: "Application Migration", description: "Modernize outdated apps or re-architect them for modern cloud-native ecosystems." },
            { title: "Infrastructure Migration", description: "Upgrade or consolidate servers, storage, and databases for optimized performance." },
            { title: "Database Migration", description: "Cross-platform migration with schema optimization and performance tuning." },
            { title: "Post-Migration Optimization", description: "Continuous performance monitoring, updates, and real-time issue resolution." },
        ],
    },

    "end-user-computing": {
        headline: "Empowering the Future of End User Computing Innovation",
        intro: "Empower your workforce and embrace the future of digital workspaces with Vyusoft's End User Computing (EUC) solutions. In a world where agility, mobility, and security are essential, we transform how businesses support their teams — anytime, anywhere, on any device. It's not just IT; it's innovation for productivity.",
        services: [
            { title: "VDI & DaaS", description: "Virtual Desktop Infrastructure delivers secure, virtualized desktops that are always accessible and centrally managed." },
            { title: "Device & Endpoint Management", description: "Streamline management across desktops, laptops, tablets, and mobile devices with complete control." },
            { title: "App Virtualization & Delivery", description: "Deliver apps securely and seamlessly across all user devices — without performance compromise." },
            { title: "Data Security & Compliance", description: "End-to-end encryption, multi-layer access controls, and compliance with GDPR, HIPAA, and more." },
            { title: "Cloud-Based EUC Solutions", description: "Cost-effective, cloud-first architectures for scalable, remote-friendly IT environments." },
            { title: "End User Support & Services", description: "Round-the-clock tech support, issue resolution, and system optimization for uninterrupted work." },
        ],
    },

    consulting: {
        headline: "Leading the Future of Consulting Innovation",
        intro: "Vyusoft Consulting delivers expert strategies and tailored solutions to help businesses optimize operations, embrace innovation, and drive digital transformation. Our experienced consultants empower companies to overcome challenges and achieve sustainable growth.",
        services: [
            { title: "Technology Strategy Consulting", description: "Build future-ready tech roadmaps aligned to your goals." },
            { title: "Process Optimization", description: "Streamline operations for maximum efficiency and cost savings." },
            { title: "IT Infrastructure Consulting", description: "Enhance system performance, security, and scalability." },
            { title: "Data Analytics & BI Consulting", description: "Unlock powerful insights to fuel better decisions." },
            { title: "Cybersecurity Consulting", description: "Strengthen defenses and ensure regulatory compliance." },
            { title: "Cloud Transformation Services", description: "Seamless cloud migration and optimization for success." },
        ],
    },

    "business-development": {
        headline: "Grow Your Business Smarter with Vyusoft",
        intro: "At Vyusoft, we are passionate about helping businesses grow, expand, and achieve lasting success. Whether you're a startup ready to scale, an SMB exploring new markets, or an enterprise aiming for global reach, we design tailored business-development strategies fueled by data, technology, and market expertise — unlocking new opportunities and building strong relationships with your customers and partners.",
        services: [
            { title: "Market Research & Analysis", description: "Understand market trends, customer behavior, and competition to reduce risk and find new opportunities." },
            { title: "Sales Strategy & Lead Generation", description: "Create winning sales plans, capture high-value leads, and convert them with ease — integrating CRM tools for smarter pipelines." },
            { title: "Strategic Partnerships", description: "Find and build lasting partnerships that strengthen your market position and drive new revenue streams." },
            { title: "Customer Retention", description: "Develop loyalty programs, enhance customer experiences, and keep your customers coming back." },
            { title: "Process Optimization", description: "Identify and eliminate operational bottlenecks, implement automation tools, and boost productivity." },
            { title: "Digital Transformation Support", description: "Modernize your digital presence, enhance your online strategies, and reach more customers globally." },
        ],
    },

    "digital-marketing-monitoring": {
        headline: "Leading the Future of Digital Marketing Monitoring Innovation",
        intro: "In the ever-evolving digital landscape, real-time marketing intelligence is key to sustainable growth. At Vyusoft, our Digital Marketing Monitoring services empower your business with data-driven insights, campaign optimization, and competitive benchmarking — so you always stay ahead of the curve. We don't just monitor; we optimize your digital future.",
        services: [
            { title: "Performance Monitoring", description: "Monitor KPIs like clicks, impressions, CTRs, and conversions across all channels in real-time." },
            { title: "Social Media Listening & Tracking", description: "Analyze audience sentiment, brand mentions, and competitor activity on Instagram, LinkedIn, and X." },
            { title: "SEO & Website Analytics", description: "Track keyword rankings, site traffic, and bounce rates, and resolve technical SEO issues proactively." },
            { title: "Email Campaign Analysis", description: "Measure open and click-through rates, optimize subject lines, and tailor content with behavior-driven insights." },
            { title: "Competitor Benchmarking", description: "Evaluate how your strategy stacks up against competitors — identify gaps and opportunities fast." },
            { title: "Automated Reporting", description: "Receive tailored, visually rich reports and real-time alerts for quicker, iterative decision-making." },
        ],
    },

    "vyu-startup-solutions": {
        headline: "Leading the Future of VYU Startup Innovation",
        intro: "Launching a startup is more than just building a product — it's about shaping the future. At VYU Startup Solutions by Vyusoft, we help founders lead with innovation, scale with confidence, and grow with clarity. From ideation to expansion, we deliver tailored, scalable, high-impact solutions that help you thrive in a fast-paced, competitive world.",
        services: [
            { title: "MVP Development & Prototyping", description: "Validate your idea fast with functional, market-ready prototypes and MVPs." },
            { title: "Software Development", description: "Build scalable mobile, web, and enterprise applications using modern technologies." },
            { title: "UX/UI Design", description: "Create seamless, engaging user experiences that boost retention and growth." },
            { title: "Branding & Digital Presence", description: "Define your brand identity and grow your online footprint through SEO, content, and social media." },
            { title: "Business Strategy & Monetization", description: "Structure your startup with the right business model, go-to-market strategy, and revenue plan." },
            { title: "Cloud & Infrastructure Solutions", description: "Set up scalable cloud environments on AWS, Azure, or Google Cloud." },
        ],
    },

    prototyping: {
        headline: "Leading the Future of Prototyping Innovation",
        intro: "At Vyusoft, we transform innovative ideas into fully interactive, high-impact experiences through our advanced Prototyping services. Whether you're refining an app concept, testing a web platform, or validating a startup idea, our solutions help you visualize, iterate, and perfect your product before development begins — saving time, money, and effort.",
        services: [
            { title: "UI/UX Prototyping", description: "Create immersive, user-friendly designs that enhance experience and usability." },
            { title: "Web & Mobile App Prototyping", description: "Build adaptive prototypes for seamless cross-platform navigation." },
            { title: "Wireframing & Mockups", description: "Plan layouts and user flows with clear visual representations." },
            { title: "Interactive, Clickable Prototypes", description: "Simulate real product behavior to test user journeys early." },
            { title: "Rapid Prototyping & MVPs", description: "Develop Minimum Viable Products to validate concepts in real-time environments." },
            { title: "Usability Testing Prototypes", description: "Get actionable feedback by letting real users interact with functional mockups." },
        ],
    },

    "hr-services": {
        headline: "Leading the Future of HR Services Innovation",
        intro: "At Vyusoft, we believe people are the foundation of every great business. Our HR Services are designed to empower your workforce, streamline HR operations, and build a strong culture of performance and engagement. Whether you're scaling a team or optimizing internal processes, we're your trusted partner in future-ready human capital management.",
        services: [
            { title: "Talent Acquisition", description: "Identify, attract, and onboard high-quality candidates who match your culture and mission." },
            { title: "Talent Development", description: "Upskill your workforce with leadership development, technical training, and career growth programs." },
            { title: "Performance Management", description: "Align goals, track progress, and foster a results-oriented culture through continuous feedback." },
            { title: "Pay & Payroll Services", description: "Manage payroll processing, tax compliance, and employee benefits with accuracy and ease." },
            { title: "Employee Engagement", description: "Strengthen morale and satisfaction through surveys, insights, and real-time feedback." },
            { title: "Succession Planning", description: "Prepare for the future with strategies to identify and groom your next generation of leaders." },
        ],
    },

    "backup-data-protection": {
        headline: "The Future of Backup & Data Protection Innovation",
        intro: "In the digital age, your data is your most valuable asset. Vyusoft's Backup and Data Protection solutions safeguard business-critical information, ensure uninterrupted operations, and prepare your organization for anything — from cyberattacks to system failures. Engineered for resilience, speed, and scalability.",
        services: [
            { title: "Cloud & On-Premise Backup", description: "Automated, secure backups tailored to your infrastructure — local or cloud-based." },
            { title: "Cloud-Based Data Protection", description: "Scalable, multi-cloud integration (AWS, Azure, GCP) for modern enterprises." },
            { title: "Disaster Recovery Solutions", description: "Business continuity made simple — rapid recovery with minimal downtime." },
            { title: "Data Encryption & Security", description: "Advanced protection through encryption, access controls, and regulatory compliance." },
            { title: "Continuous Data Protection", description: "Real-time backups to prevent even the smallest data loss." },
            { title: "Ransomware Protection", description: "Proactive defense plus fast rollback to clean data in the event of an attack." },
        ],
    },

    "aws-microsoft-google": {
        headline: "Leading the Future of AWS, Microsoft & Google Innovation",
        intro: "At Vyusoft, we empower businesses to thrive in the digital era by harnessing the full potential of the world's top cloud platforms — Amazon Web Services (AWS), Microsoft Azure, and Google Cloud. From strategic planning to real-time innovation, we deliver secure, scalable, performance-driven solutions that drive long-term success.",
        services: [
            { title: "Cloud Consulting & Strategy", description: "Navigate cloud adoption with clarity and confidence through tailored consulting." },
            { title: "Cloud Migration Services", description: "Seamless, secure transitions to AWS, Azure, or GCP with minimal disruption." },
            { title: "Cloud Infrastructure", description: "Optimize infrastructure performance, scalability, and costs across all platforms." },
            { title: "Cloud Security & Compliance", description: "Advanced cybersecurity frameworks and regulatory adherence." },
            { title: "DevOps Automation & CI/CD", description: "Accelerate and streamline development with integrated DevOps pipelines." },
            { title: "Big Data & AI/ML Services", description: "Unlock insights and enable intelligent automation using scalable cloud analytics." },
        ],
    },

    "payment-solutions": {
        headline: "Empowering the Future of Payment Innovation",
        intro: "At Vyusoft, we're revolutionizing the way businesses handle payments. Whether you're running a retail outlet, managing an e-commerce store, or delivering services remotely, our smart, secure, and scalable payment solutions help you accept and manage transactions effortlessly — anytime, anywhere. From point-of-sale systems to online payment gateways and instant payment links, we equip you to lead the future of digital commerce.",
        services: [
            { title: "Point of Sale (POS) Systems", description: "Manage in-store payments with fast, secure checkout, inventory sync, and integrated analytics." },
            { title: "Online Payment Gateways", description: "Enable smooth, secure online transactions via cards, wallets, UPI, and international payments." },
            { title: "Payment Links", description: "Share payment requests via email, SMS, or WhatsApp — perfect for small businesses and freelancers." },
            { title: "Mobile & Contactless Payments", description: "Use QR codes, NFC, and digital wallets to offer fast, safe, and modern checkout experiences." },
            { title: "Recurring Billing", description: "Automate billing cycles for membership and service businesses, with full subscription management." },
            { title: "Unified Dashboard & Reporting", description: "Track transactions from all channels in one place with powerful reporting tools." },
        ],
    },

    "operational-tools": {
        headline: "Leading the Future of Operational Tools Innovation",
        intro: "Welcome to Vyusoft — where intelligent operations meet innovation. Our Operational Tools streamline workflows, automate manual processes, and empower your teams to achieve peak productivity. Whether you're managing projects, tracking performance, or improving collaboration, we provide the smart infrastructure your business needs to thrive.",
        services: [
            { title: "Project Management Systems", description: "Assign tasks, track milestones, and meet deadlines with precision." },
            { title: "Workflow Automation", description: "Cut down manual tasks and streamline routine operations." },
            { title: "Performance Monitoring", description: "Visualize team and business KPIs in real-time." },
            { title: "Collaborative Communication", description: "Unified messaging, file sharing, and virtual meetings." },
            { title: "Resource Allocation Systems", description: "Optimize how you manage time, people, and assets." },
            { title: "Document Management", description: "Organize, store, and retrieve files effortlessly and securely." },
        ],
    },

    "software-quality-testing": {
        headline: "Empowering the Future with Software Quality Testing Innovation",
        intro: "At Vyusoft, we're shaping the future of digital innovation with comprehensive Software Quality Testing services. From startups to enterprise-grade systems, we help businesses ensure their software is secure, reliable, and high-performing. With expert methodologies and cutting-edge tools, we help you launch with confidence and deliver a seamless user experience every time.",
        services: [
            { title: "Manual Testing", description: "In-depth, human-driven testing for UI, UX, and functional validation." },
            { title: "Automated Testing", description: "High-speed, accurate test execution using tools like Selenium and Appium." },
            { title: "Performance Testing", description: "Assess load, stress, and scalability to ensure consistent application performance." },
            { title: "Security Testing", description: "Identify vulnerabilities and ensure data protection through ethical hacking and audits." },
            { title: "Compatibility Testing", description: "Validate seamless operation across devices, browsers, and platforms." },
            { title: "Regression Testing", description: "Confirm new updates don't break existing features or workflows." },
        ],
    },

    "info-xchange": {
        headline: "Leading the Future of Info Xchange Innovation",
        intro: "In today's hyper-connected world, efficient data exchange and real-time communication are the cornerstones of digital success. Vyusoft's Info Xchange solutions empower businesses with seamless integration, secure connectivity, and intelligent workflows — driving the future of digital collaboration and decision-making.",
        services: [
            { title: "Enterprise Data Integration", description: "Connect databases, applications, and cloud systems to enable smooth, unified workflows." },
            { title: "Real-Time Messaging & Collaboration", description: "Empower teams with secure, instant data sharing and advanced communication platforms." },
            { title: "Business Intelligence & Reporting", description: "Convert raw data into powerful insights with automated reports and interactive dashboards." },
            { title: "API & System Interoperability", description: "Develop and manage APIs to ensure seamless communication between platforms." },
            { title: "Security Management", description: "Protect critical information with robust encryption, access control, and policy enforcement." },
            { title: "Cloud-Based Info Exchange", description: "Leverage the cloud for scalable, remote-enabled data collaboration and integration." },
        ],
    },
};

export function getServicePageContent(slug: string): ServicePageContent | undefined {
    return servicePageContent[slug];
}
