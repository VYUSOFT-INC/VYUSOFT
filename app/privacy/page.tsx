import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
    title: "Privacy Policy",
    description:
        "How VYUSOFT INC collects, uses, and protects your information — and the rights you have over it.",
};

type Block = { p: string } | { ul: string[] };
type Section = { no: string; title: string; blocks: Block[] };

const sections: Section[] = [
    {
        no: "01",
        title: "",
        blocks: [
            { p: `This Privacy Policy describes VYUSOFT INC policies and procedures on the collection, use and disclosure of your information when you use our service and tells you about your privacy rights and how the law protects you.` },
            { p: `We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.` },
            { p: `VYUSOFT INC is committed to safeguarding the privacy of our users. We want to assure you that we do not share your personal information with third parties. This privacy policy outlines how we collect, use, and protect the information you provide to us.` },
        ],
    },
    {
        no: "02",
        title: "Information Collection",
        blocks: [
            { p: `We collect only the information necessary to provide and improve our services. This may include your name, email address and phone number. We do not sell, rent, or share this information with any third parties.` },
        ],
    },
    {
        no: "03",
        title: "How We Use Your Information",
        blocks: [
            { p: `The information collected is used solely for communicating with you as the intended party. We do not share your information with external parties for marketing or any other purposes. Additionally, no mobile or messaging consent information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.` },
            { p: `We may use personal data for the following purposes:` },
            {
                ul: [
                    `To provide and maintain our service, including to monitor the usage of our service.`,
                    `To manage your Account: to manage your registration as a user of the Service. The Personal Data you provide can give you access to different functionalities of the Service that are available to you as a registered user.`,
                    `For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services you have purchased or of any other contract with us through the Service.`,
                    `To contact You: To contact you by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.`,
                    `To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information.`,
                    `To manage your requests: To attend and manage your requests to us.`,
                ],
            },
            { p: `All messages you send through the Service, whether to us or other users, are stored on our servers. VYUSOFT INC employs servers and services owned by third parties to retain these messages.` },
        ],
    },
    {
        no: "04",
        title: "Messaging",
        blocks: [
            { p: `Vyusoft collects personal information such as name, phone number, email, and employment-related details to support communication, onboarding, compliance, and service updates.` },
            { p: `Your information is used solely for operational and business purposes. Vyusoft does not sell or share personal data for marketing purposes. Data may be shared only with trusted service providers for compliance and operational needs.` },
            { p: `By opting into SMS communications, you consent to receive text messages as described. You may opt out at any time by replying STOP. Vyusoft takes reasonable measures to protect your data and retains it only as long as necessary to meet business and legal requirements.` },
            { p: `For privacy-related questions, contact us at support@vyusoft.com or +1 (940) 977-9963.` },
        ],
    },
    {
        no: "05",
        title: "Disclosure of Your Information",
        blocks: [
            { p: `VYUSOFT INC does not share any client data with third parties for marketing, promotional purposes, or any other purposes. Your personal information is kept confidential and is not disclosed to any outside organizations, except as required by law or with your explicit consent. We may disclose your personal Information under the following limited circumstances:` },
            {
                ul: [
                    `We have obtained your consent.`,
                    `We need to enforce our Terms of Service.`,
                    `We share information with partners or affiliates that have signed non-disclosure agreements with us only to provide you with a specific service.`,
                    `We may provide such information to a company controlled by or under common control with VYUSOFT INC for any purpose allowed by this Policy.`,
                    `We respond to subpoenas, court orders, or legal processes, or to establish or exercise our legal rights, or the legal rights of others, or defend against legal claims.`,
                    `When we believe it is necessary to disclose Personal Information to investigate, prevent, or take action regarding illegal activities, suspected fraud, potential threats to anyone's physical safety, violations of VYUSOFT INC Terms of Service, or as otherwise required by law.`,
                    `We transfer Personal Information about you if VYUSOFT INC or its assets are acquired by or merged with another company.`,
                ],
            },
            { p: `We may share aggregated, non-identifiable information with others without further notice to you, such as the total number of people who used the Service in a specific month or the total number of messages sent during a particular period.` },
        ],
    },
    {
        no: "06",
        title: "International Data Transfers",
        blocks: [
            { p: `Your Personal Information may be transferred to and processed in locations outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. We take steps to ensure that your data is handled securely and in line with this Policy, regardless of where it is processed.` },
        ],
    },
    {
        no: "07",
        title: "Data Retention",
        blocks: [
            { p: `We retain your Personal Information only as long as necessary to fulfill the purposes outlined in this Policy unless a longer retention period is required or permitted by law. We will also retain and use your Personal Information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.` },
        ],
    },
    {
        no: "08",
        title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
        blocks: [
            { p: `Under the CCPA, among other rights, California consumers have the right to:` },
            {
                ul: [
                    `Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.`,
                    `Request that a business delete any personal data about the consumer that a business has collected.`,
                    `Request that a business that sells a consumer's personal data, not sell the consumer's personal data.`,
                ],
            },
            { p: `If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.` },
        ],
    },
    {
        no: "09",
        title: "GDPR Data Protection Rights",
        blocks: [
            { p: `We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:` },
            {
                ul: [
                    `The right to access — You have the right to request copies of your personal data. We may charge you a small fee for this service.`,
                    `The right to rectification — You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.`,
                    `The right to erasure — You have the right to request that we erase your personal data, under certain conditions.`,
                    `The right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.`,
                    `The right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.`,
                    `The right to data portability — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.`,
                ],
            },
            { p: `If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.` },
        ],
    },
    {
        no: "10",
        title: "Children's Information",
        blocks: [
            { p: `Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.` },
            { p: `VyuSoft does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.` },
        ],
    },
    {
        no: "11",
        title: "Cookies & Tracking Technologies",
        blocks: [
            { p: `Our Service may use cookies and similar tracking technologies to enhance your experience. Cookies are small text files placed on your device to collect information about your activity on the Service. You can control the use of cookies through your browser settings, but disabling cookies may limit your ability to use certain features of the page or Service.` },
        ],
    },
    {
        no: "12",
        title: "Your Choices",
        blocks: [
            { p: `You have the right to access, correct, or delete your information. If you have any concerns or questions about your data, please contact us at +1 (940) 977-9963, sales@vyusoft.com and 511 E John Carpenter Fwy, STE 500, Irving, Texas, 75062, USA.` },
        ],
    },
    {
        no: "13",
        title: "Policy Changes",
        blocks: [
            { p: `We may update our privacy policy from time to time. Any changes will be communicated to you, and your continued use of our services implies your acceptance of the updated policy. By using our services, you agree to the terms outlined in this privacy policy.` },
            { p: `Last updated: 11/11/2025` },
        ],
    },
];

export default function PrivacyPage() {
    return (
        <>
            <PageBackdrop />

            <section className="legal-doc" aria-label="Privacy policy" data-theme="light">
                <div className="legal-doc-inner">
                    <header className="legal-doc-head">
                        <h1 className="legal-doc-h1">Privacy Policy</h1>
                    </header>
                    {sections.map((s, idx) => (
                        <section key={idx} className="legal-doc-section">
                            {s.title && <h2 className="legal-title">{s.title}</h2>}
                            <div className="legal-body">
                                {s.blocks.map((b, i) =>
                                    "ul" in b ? (
                                        <ul key={i} className="legal-ul">
                                            {b.ul.map((it, j) => (
                                                <li key={j}>{it}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p key={i} className="legal-text">
                                            {b.p}
                                        </p>
                                    ),
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </section>

            <SiteFooter />
        </>
    );
}
