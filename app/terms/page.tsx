import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
    title: "Terms & Conditions",
    description:
        "The rules for using vyusoft.com — intellectual property, comments, messaging, linking, content liability, and disclaimer.",
};

type Block = { p: string } | { ul: string[] };
type Section = { no: string; title: string; blocks: Block[] };

const sections: Section[] = [
    {
        no: "01",
        title: "",
        blocks: [
            { p: `Welcome to VyuSoft!` },
            { p: `These terms and conditions outline the rules and regulations for the use of VyuSoft's Website, located at https://vyusoft.com/.` },
            { p: `By accessing this website we assume you accept these terms and conditions. Do not continue to use VyuSoft if you do not agree to take all of the terms and conditions stated on this page.` },
            { p: `The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.` },
        ],
    },
    {
        no: "02",
        title: "Cookies",
        blocks: [
            { p: `We employ the use of cookies. By accessing VyuSoft, you agreed to use cookies in agreement with the VyuSoft's Privacy Policy.` },
            { p: `Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.` },
        ],
    },
    {
        no: "03",
        title: "License",
        blocks: [
            { p: `Unless otherwise stated, VyuSoft and/or its licensors own the intellectual property rights for all material on VyuSoft. All intellectual property rights are reserved. You may access this from VyuSoft for your own personal use subjected to restrictions set in these terms and conditions.` },
            { p: `You must not:` },
            {
                ul: [
                    `Republish material from VyuSoft`,
                    `Sell, rent or sub-license material from VyuSoft`,
                    `Reproduce, duplicate or copy material from VyuSoft`,
                    `Redistribute content from VyuSoft`,
                ],
            },
            { p: `This Agreement shall begin on the date hereof.` },
        ],
    },
    {
        no: "04",
        title: "Comments",
        blocks: [
            { p: `Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. VyuSoft does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of VyuSoft, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, VyuSoft shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.` },
            { p: `VyuSoft reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.` },
            { p: `You warrant and represent that:` },
            {
                ul: [
                    `You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;`,
                    `The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;`,
                    `The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;`,
                    `The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.`,
                ],
            },
            { p: `You hereby grant VyuSoft a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.` },
        ],
    },
    {
        no: "05",
        title: "Messaging",
        blocks: [
            { p: `By using Vyusoft's website, services, or opting in to receive SMS communications, you agree to these Terms and Conditions. Vyusoft may update these terms at any time.` },
            { p: `Vyusoft provides technology and business support services, including employment, onboarding, compliance, and service-related notifications. By opting into our messaging program, you consent to receive SMS messages related to these services. Message frequency may vary (approximately 1–1500 messages).` },
            { p: `Message and data rates may apply based on your mobile carrier. You may opt out at any time by replying STOP, or request assistance by replying HELP.` },
            { p: `Vyusoft does not solicit donations via SMS. All content and materials are protected by intellectual property laws. By submitting information, you grant Vyusoft permission to use it for business and operational purposes. Vyusoft makes no guarantees regarding the accuracy of content.` },
            { p: `For questions, contact us at 940-977-9963 or support@vyusoft.com.` },
        ],
    },
    {
        no: "06",
        title: "Hyperlinking to Our Content",
        blocks: [
            { p: `The following organizations may link to our Website without prior written approval:` },
            {
                ul: [
                    `Government agencies;`,
                    `Search engines;`,
                    `News organizations;`,
                    `Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and`,
                    `System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.`,
                ],
            },
            { p: `These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.` },
            { p: `We may consider and approve other link requests from the following types of organizations:` },
            {
                ul: [
                    `commonly-known consumer and/or business information sources;`,
                    `dot.com community sites;`,
                    `associations or other groups representing charities;`,
                    `online directory distributors;`,
                    `internet portals;`,
                    `accounting, law and consulting firms; and`,
                    `educational institutions and trade associations.`,
                ],
            },
            { p: `We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of VyuSoft; and (d) the link is in the context of general resource information.` },
            { p: `These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.` },
            { p: `If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to VyuSoft. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.` },
            { p: `Approved organizations may hyperlink to our Website as follows:` },
            {
                ul: [
                    `By use of our corporate name; or`,
                    `By use of the uniform resource locator being linked to; or`,
                    `By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.`,
                ],
            },
            { p: `No use of VyuSoft's logo or other artwork will be allowed for linking absent a trademark license agreement.` },
        ],
    },
    {
        no: "07",
        title: "iFrames",
        blocks: [
            { p: `Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.` },
        ],
    },
    {
        no: "08",
        title: "Content Liability",
        blocks: [
            { p: `We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.` },
        ],
    },
    {
        no: "09",
        title: "Your Privacy",
        blocks: [{ p: `Please read our Privacy Policy.` }],
    },
    {
        no: "10",
        title: "Reservation of Rights",
        blocks: [
            { p: `We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.` },
        ],
    },
    {
        no: "11",
        title: "Removal of Links From Our Website",
        blocks: [
            { p: `If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.` },
            { p: `We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.` },
        ],
    },
    {
        no: "12",
        title: "Disclaimer",
        blocks: [
            { p: `To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:` },
            {
                ul: [
                    `limit or exclude our or your liability for death or personal injury;`,
                    `limit or exclude our or your liability for fraud or fraudulent misrepresentation;`,
                    `limit any of our or your liabilities in any way that is not permitted under applicable law; or`,
                    `exclude any of our or your liabilities that may not be excluded under applicable law.`,
                ],
            },
            { p: `The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.` },
            { p: `As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.` },
        ],
    },
];

export default function TermsPage() {
    return (
        <>
            <PageBackdrop />

            <section className="legal-doc" aria-label="Terms and conditions" data-theme="light">
                <div className="legal-doc-inner">
                    <header className="legal-doc-head">
                        <h1 className="legal-doc-h1">Terms and Conditions</h1>
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
