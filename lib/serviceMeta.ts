// Content-aware enrichment for the 30 service pages. Drives the
// outcomes / stack / related-practices sections rendered by every
// /services/[slug] page. Pure data — no React imports here.

import { servicesByGroup } from "./nav";

/* ── Outcomes — generic VyuSoft delivery signals that hold for every
   practice. Three numbers per page; NumeralCounter animates each. */
export type Outcome = {
    figure: string;
    suffix?: string;
    label: string;
};

export const defaultOutcomes: Outcome[] = [
    { figure: "12", suffix: "–16 wk", label: "Median engagement length" },
    { figure: "1", suffix: "BD", label: "Principal-to-brief response time" },
    { figure: "92", suffix: "%", label: "Renewal rate beyond initial scope" },
];

/* ── Stack — per-capability-group default toolchain. Most services in a
   group use roughly the same stack; per-slug overrides extend this. */
type GroupName =
    | "Technology"
    | "Engineering"
    | "Enterprise"
    | "Growth"
    | "Operations";

export const stackByGroup: Record<GroupName, string[]> = {
    Technology: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "AWS · Azure · GCP",
        "Kubernetes",
        "Terraform",
        "Snowflake",
        "Kafka",
        "OpenTelemetry",
    ],
    Engineering: [
        "TypeScript",
        "React · Next.js",
        "Node · Go · Rust",
        "Swift · Kotlin",
        "GraphQL · tRPC",
        "PostgreSQL",
        "Redis",
        "Solidity · EVM",
    ],
    Enterprise: [
        "SAP",
        "Oracle",
        "Salesforce",
        "ServiceNow",
        "Microsoft 365",
        "Workday",
        "MuleSoft",
        "Boomi",
        "Power Platform",
    ],
    Growth: [
        "HubSpot",
        "Marketo",
        "Segment",
        "Amplitude",
        "Mixpanel",
        "Looker",
        "Tableau",
        "Greenhouse",
        "Lattice",
    ],
    Operations: [
        "AWS Backup",
        "Veeam",
        "Datadog",
        "PagerDuty",
        "Stripe · Adyen",
        "Cypress · Playwright",
        "Selenium",
        "Confluent",
        "Snowflake Streams",
    ],
};

/* Per-slug stack overrides for the canonical specialisms. Falls back to
   stackByGroup when no override exists. */
export const stackOverrides: Record<string, string[]> = {
    "artificial-intelligence": [
        "OpenAI · Anthropic",
        "LangChain",
        "LlamaIndex",
        "Hugging Face",
        "Weaviate · Pinecone",
        "Modal · Replicate",
        "Triton Inference",
        "Ray",
        "MLflow",
    ],
    "cyber-security": [
        "CrowdStrike",
        "Wiz · Lacework",
        "Okta · Auth0",
        "Splunk · Datadog",
        "Snyk",
        "Hashicorp Vault",
        "Burp Suite",
        "Tenable",
        "PagerDuty",
    ],
    "data": [
        "Snowflake",
        "Databricks",
        "BigQuery",
        "dbt",
        "Fivetran · Airbyte",
        "Airflow · Dagster",
        "Looker · Hex",
        "Kafka · Kinesis",
        "DuckDB",
    ],
    "cloud": [
        "AWS · Azure · GCP",
        "Terraform · Pulumi",
        "Kubernetes · EKS",
        "Helm · ArgoCD",
        "Istio · Linkerd",
        "Crossplane",
        "Karpenter",
        "Cloudflare",
        "FinOps tooling",
    ],
    "devops": [
        "GitHub Actions",
        "GitLab CI",
        "Terraform",
        "ArgoCD · Flux",
        "Prometheus · Grafana",
        "OpenTelemetry",
        "PagerDuty",
        "LaunchDarkly",
        "Backstage",
    ],
};

export function stackForService(slug: string, group: string): string[] {
    return stackOverrides[slug] ?? stackByGroup[group as GroupName] ?? stackByGroup.Technology;
}

/* ── Related practices — surface the 2 other services in the same
   capability group so visitors can navigate sideways without leaving
   the catalogue. */
export type RelatedService = { slug: string; title: string; group: string };

export function relatedServices(currentSlug: string, group: string): RelatedService[] {
    const groupItems = servicesByGroup
        .find((g) => g.title === group)?.items
        .filter((s) => s.slug !== currentSlug)
        .map((s) => ({ slug: s.slug, title: s.title, group }))
        ?? [];
    return groupItems.slice(0, 3);
}
