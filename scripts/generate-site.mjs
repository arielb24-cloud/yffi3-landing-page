import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const siteUrl = "https://yourfamilyfirstinsurance3.com";
const phoneDisplay = "305-910-8850";
const phoneHref = "tel:13059108850";
const smsHref = "sms:+13059108850";
const businessName = "Your Family First Insurance Office #3";
const legalName = "Your Family First Insurance";
const logoSrc = "/assets/yffi3/yffi3-official-franchise-logo.png";
const originalFranchiseLogoSrc = "/assets/yffi3/yffi3-original-franchise-logo.png";
const familyPhotoSrc = "/assets/yffi3/yffi3-family-office-photo.jpg";
const familyWebpSrc = "/assets/yffi3/yffi3-family-office-photo.webp";
const principalPhotoSrc = "/assets/yffi3/yffi3-principal-agent-ariel-busutil.jpg";
const qrSrc = "/assets/yffi3/yffi3-quote-qr.jpeg";
const quoteDestination = "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868";
const address = {
  streetAddress: "11200 W Flagler St #108-109",
  addressLocality: "Miami",
  addressRegion: "FL",
  postalCode: "33174",
  addressCountry: "US"
};

const serviceAreas = ["West Flagler Miami", "Miami", "Kendall", "Hialeah", "Cutler Bay", "Homestead", "Miami-Dade", "Florida"];
const insuranceTypes = ["Auto insurance", "Home insurance", "Homeowners insurance", "Renters insurance", "Condo insurance", "Flood insurance", "Motorcycle insurance", "Boat insurance", "RV insurance", "Commercial insurance", "General liability insurance", "Business insurance", "Workers compensation", "Life insurance", "Health insurance"];
const redFlagPhrases = [
  "guaranteed " + "cheapest",
  "official " + "cheapest " + "insurance",
  "guaranteed " + "savings",
  "instant " + "approval",
  "guaranteed " + "approval",
  "official " + "partner",
  "authorized " + "carrier " + "partner",
  "award-" + "winning",
  "top-" + "rated",
  "what " + "matters " + "most"
];

const serviceCards = [
  {
    id: "auto-insurance",
    title: "Auto Insurance",
    short: "Auto",
    icon: "car",
    href: "/auto-insurance/",
    copy: "Coverage conversations for Miami commutes, family vehicles, new drivers, and renewal reviews.",
    tags: ["Liability", "Comp and collision", "Family vehicles"]
  },
  {
    id: "home-insurance",
    title: "Homeowners Insurance",
    short: "Homeowners",
    icon: "home",
    href: "/home-insurance/",
    copy: "Quote help for Miami homeowners, belongings, liability, lender needs, and Florida property questions.",
    tags: ["Homeowners", "Property", "Florida risks"]
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    short: "Life",
    icon: "heart",
    href: "/life-insurance/",
    copy: "Family-first conversations around income protection, final expenses, and long-term planning.",
    tags: ["Family planning", "Income needs", "Final expense"]
  },
  {
    id: "business-insurance",
    title: "Business Insurance",
    short: "Business",
    icon: "briefcase",
    href: "/commercial-insurance/",
    copy: "Support for local operations, contracts, certificates, work vehicles, property, and liability.",
    tags: ["Certificates", "Liability", "Commercial auto"]
  },
  {
    id: "renters-insurance",
    title: "Renters Insurance",
    short: "Renters",
    icon: "key",
    href: "/renters-insurance/",
    copy: "Help for apartments, belongings, liability questions, and lease requirements.",
    tags: ["Apartments", "Belongings", "Lease needs"]
  },
  {
    id: "condo-insurance",
    title: "Condo Insurance",
    short: "Condo",
    icon: "building",
    href: "/renters-insurance/",
    copy: "Condo conversations for unit coverage, personal property, loss assessment, and liability.",
    tags: ["Condo units", "Association docs", "Liability"]
  },
  {
    id: "commercial-insurance",
    title: "Commercial Insurance",
    short: "Commercial",
    icon: "shield",
    href: "/commercial-insurance/",
    copy: "Coverage conversations for contractors, fleets, local businesses, locations, and certificates.",
    tags: ["Contractors", "Fleets", "Small business"]
  }
];

const specialtyCoverageLinks = [
  ["flood-insurance", "Flood Insurance", "/get-a-quote/#quote"],
  ["motorcycle-insurance", "Motorcycle Insurance", "/get-a-quote/#quote"],
  ["boat-insurance", "Boat Insurance", "/get-a-quote/#quote"],
  ["rv-insurance", "RV Insurance", "/get-a-quote/#quote"],
  ["general-liability-insurance", "General Liability Insurance", "/commercial-insurance/"],
  ["workers-compensation", "Workers' Compensation", "/commercial-insurance/"],
  ["health-insurance", "Health Insurance", "/get-a-quote/#quote"]
];

const tickerItems = [
  ["Your Family First Insurance Office #3", "/about-office-3/"],
  ["11200 W Flagler St, Ste 108, Miami, FL 33174", "/about-office-3/"],
  ["Call Us: (305) 910-8850", phoneHref],
  ["¡Se Habla Español!", "/about-office-3/"],
  ["Get a Free Quote Now!", quoteDestination],
  ["Where Your Family Comes First!", "/about-office-3/"],
  ["Trusted • Local • Bilingual", "/about-office-3/"],
  ["Auto Insurance", "/auto-insurance/"],
  ["Homeowners Insurance", "/home-insurance/"],
  ["Renters Insurance", "/renters-insurance/"],
  ["Condo Insurance", "/renters-insurance/#condo-insurance"],
  ["Flood Insurance", "/#flood-insurance"],
  ["Motorcycle Insurance", "/#motorcycle-insurance"],
  ["Boat Insurance", "/#boat-insurance"],
  ["RV Insurance", "/#rv-insurance"],
  ["General Liability Insurance", "/#general-liability-insurance"],
  ["Business Insurance", "/commercial-insurance/"],
  ["Workers' Compensation", "/#workers-compensation"],
  ["Life Insurance", "/life-insurance/"],
  ["Health Insurance", "/#health-insurance"],
  ["50+ Insurance Carriers", "/#insurance-carriers"],
  ["Family Owned", "/#family-owned"],
  ["Local Miami Office", "/#local-miami-office"],
  ["Free Quotes", quoteDestination],
  ["Fast, Friendly Service", "/about-office-3/"]
];

const pages = [
  {
    slug: "",
    nav: "Home",
    title: "Your Family First Insurance Office #3 | Miami Insurance Quote Help",
    description: "Your Family First Insurance Office #3 helps Miami families compare auto, homeowners, life, business, renters, condo, and commercial insurance options.",
    h1: "Florida Insurance Made Simple for Your Family",
    intro: "Local Office #3 helping Miami families compare auto, homeowners, life, business, renters, condo, and commercial insurance options.",
    kind: "home",
    keywords: "Miami insurance agency, Your Family First Insurance Office #3, West Flagler insurance office, auto insurance Miami, homeowners insurance Miami, renters insurance Miami, condo insurance Miami, life insurance Miami, commercial insurance Miami, bilingual insurance Miami",
    faqs: [
      ["Where is Your Family First Insurance Office #3 located in Miami?", "Office #3 is listed at 11200 W Flagler St #108-109, Miami, FL 33174, serving West Flagler, Miami-Dade, and nearby South Florida communities."],
      ["What insurance can Office #3 help Miami families compare?", "Office #3 can help with auto, homeowners, renters, condo, flood, motorcycle, boat, RV, life, health, business, general liability, workers compensation, and commercial insurance quote conversations."],
      ["How do I get a free insurance quote from Office #3?", "Use the Get My Free Quote buttons, scan the approved QR code, or call 305-910-8850. The website only starts with basic contact details before opening the secure quote intake path."],
      ["Is bilingual insurance help available?", "Yes. Office #3 offers local English and Spanish quote help so Miami families and business owners can ask coverage questions more comfortably."],
      ["What should I have ready before requesting a quote?", "Have your ZIP code, the type of insurance you want to review, preferred callback time, and general coverage goals. Do not send SSNs, dates of birth, driver license numbers, VINs, payment details, medical records, passwords, or carrier login credentials through a general website form."],
      ["Can one office help me review more than one policy type?", "Yes. Many customers review auto with home, renters, condo, life, or business coverage so the conversation is easier to manage in one local office."],
      ["Does a website quote request start or change insurance coverage?", "No. Submitting a quote request does not bind, change, renew, cancel, or reinstate insurance coverage. Coverage is only active after carrier approval, written confirmation, and any required payment steps."],
      ["Are prices, savings, or carrier approvals guaranteed?", "No. Coverage options, availability, pricing, eligibility, and savings depend on carrier rules, underwriting, location, applicant information, and the coverage selected."]
    ]
  },
  {
    slug: "auto-insurance",
    nav: "Auto",
    title: "Auto Insurance in Miami | Car Insurance Quote Help | Office #3",
    description: "Miami auto insurance and car insurance quote help from Your Family First Insurance Office #3 on West Flagler. Compare options for drivers and families.",
    h1: "Auto Insurance Quote Help in Miami",
    intro: "Get local West Flagler support for Miami auto insurance, Florida car insurance reviews, everyday drivers, family vehicles, new cars, and policy renewals.",
    kind: "service",
    service: "Auto Insurance",
    icon: "car",
    keywords: "auto insurance Miami, car insurance Miami, Miami auto insurance quote, Florida car insurance, West Flagler auto insurance, Miami-Dade auto insurance, bilingual car insurance help",
    sections: [
      ["Built for Miami drivers", "Talk through liability, comprehensive, collision, uninsured motorist, deductibles, medical payment questions, and other options based on your situation."],
      ["Renewal and new-driver moments", "A quote conversation can help when buying a vehicle, adding a driver, moving to Miami-Dade, financing a car, or seeing a renewal change."],
      ["What to have ready", "Bring vehicle details, garaging ZIP code, current coverage if available, driver information to discuss securely, and any lender or lease requirements."],
      ["Local household review", "Office #3 can help families review multiple cars, new teen drivers, commute changes, rideshare questions, and related homeowners or renters conversations."]
    ],
    searchTopics: [
      ["Miami auto insurance quote help", "For drivers comparing car insurance options in Miami, West Flagler, Kendall, Hialeah, Doral, Homestead, and Miami-Dade."],
      ["Florida car insurance renewal review", "For policyholders seeing renewal changes, deductible questions, vehicle changes, or household driver updates."],
      ["New car and financed vehicle coverage", "For buyers who need to understand lender or lease requirements before choosing coverage."],
      ["Bilingual auto insurance support", "For families who want English or Spanish help before continuing through a secure quote path."]
    ],
    faqs: [
      ["Can Office #3 help with auto insurance in Miami?", "Yes. Office #3 helps Miami drivers request auto insurance quote help for daily commuting, family vehicles, new drivers, renewals, and vehicle changes."],
      ["What auto insurance topics can I review with the office?", "You can discuss liability, comprehensive, collision, uninsured motorist, deductibles, lender or lease needs, driver changes, garaging ZIP code, and other coverage questions that may apply to your situation."],
      ["When should I compare auto insurance options?", "A review can help before buying a vehicle, adding a driver, moving, changing commute patterns, financing or leasing a car, or seeing a renewal premium change."],
      ["Can I compare auto insurance with homeowners, renters, or condo coverage?", "Yes. Many Miami families review auto insurance together with homeowners, renters, condo, life, or business coverage for convenience."],
      ["What information should I prepare for an auto quote conversation?", "Have the vehicle year, make, model, garaging ZIP code, current coverage if available, household driver information to discuss securely, and any lender or lease requirements."],
      ["Can Spanish-speaking drivers request help?", "Yes. Office #3 offers bilingual quote help for Miami drivers who prefer English or Spanish conversations."],
      ["Can I ask about motorcycle, RV, or boat insurance too?", "Yes. Use the quote form or call Office #3 to ask about motorcycle, RV, boat, and other personal insurance quote paths."],
      ["Does a car insurance quote request bind coverage?", "No. Coverage is not bound, changed, or active until written confirmation, carrier approval, and any required payment steps are complete."]
    ]
  },
  {
    slug: "home-insurance",
    nav: "Homeowners",
    title: "Homeowners Insurance in Miami | Florida Home Quote Help | Office #3",
    description: "Homeowners insurance quote help for Miami-Dade property owners. Compare Florida home, wind, lender, flood, and property coverage questions with Office #3.",
    h1: "Homeowners Insurance Quote Help for Miami-Dade",
    intro: "Compare homeowners insurance conversations for your house, belongings, liability needs, lender requirements, wind questions, and Florida property risks.",
    kind: "service",
    service: "Homeowners Insurance",
    icon: "home",
    keywords: "homeowners insurance Miami, home insurance Miami, Florida homeowners insurance, Miami-Dade home insurance quote, West Flagler homeowners insurance, hurricane deductible, flood insurance Miami",
    sections: [
      ["Florida property review", "Review dwelling coverage, personal property, liability, roof details, wind or hurricane deductibles, flood questions, and lender requirements."],
      ["Closing and renewal timing", "Compare options before a real estate closing, after renovations, before hurricane season, or when a Miami-Dade renewal changes."],
      ["Flood and wind conversations", "Flood insurance is often separate. Office #3 can help you prepare the right questions before choosing a homeowners policy."],
      ["Local documentation help", "Property age, roof updates, inspections, occupancy, association documents, and prior coverage can matter during a quote review."]
    ],
    searchTopics: [
      ["Miami homeowners insurance quote help", "For Miami-Dade homeowners reviewing property coverage, lender deadlines, wind deductibles, roof details, and renewal changes."],
      ["Florida home insurance before closing", "For buyers who need quote help before a closing date, mortgage deadline, or escrow requirement."],
      ["Flood insurance questions in Miami", "For homeowners who want to understand when flood coverage may need a separate conversation."],
      ["Bilingual homeowners insurance support", "For families who want English or Spanish help reviewing Florida home insurance details."]
    ],
    faqs: [
      ["Can Office #3 help with homeowners insurance in Miami-Dade?", "Yes. Office #3 helps Miami-Dade homeowners request quote help for houses, property details, belongings, liability, lender needs, and Florida property coverage questions."],
      ["Is flood insurance included with homeowners insurance?", "Flood coverage is often separate from a standard homeowners policy. Office #3 can help you discuss flood insurance questions before you choose coverage."],
      ["What Florida home insurance details may matter?", "A home quote conversation may include roof information, wind or hurricane deductibles, property age, updates, protection features, claims history, occupancy, and lender requirements."],
      ["Can I request homeowners insurance help before closing on a property?", "Yes. Homebuyers commonly request quote help before a closing date, lender deadline, or policy renewal so they can review options early."],
      ["Can condo owners or renters get help too?", "Yes. Condo and renters questions are handled through the renters and condo coverage page, and Office #3 can help decide which conversation fits your situation."],
      ["Can I ask about hurricane deductibles?", "Yes. You can ask how wind or hurricane deductible questions may affect the coverage conversation. Exact terms vary by carrier and policy."],
      ["Is homeowners insurance approval guaranteed?", "No. Eligibility and approval depend on carrier underwriting, property details, location, applicant information, inspections, and coverage selected."],
      ["Are homeowners insurance savings guaranteed?", "No. Savings are not guaranteed. Pricing varies by underwriting, property details, location, carrier, applicant information, and coverage selected."]
    ]
  },
  {
    slug: "commercial-insurance",
    nav: "Commercial",
    title: "Commercial Insurance in Miami | Business, GL, Workers Comp Help",
    description: "Commercial insurance and business insurance quote help in Miami. Discuss general liability, commercial auto, workers compensation, certificates, and property coverage.",
    h1: "Commercial Insurance Help for Miami Businesses",
    intro: "Office #3 helps Miami business owners compare commercial insurance options for operations, contracts, vehicles, property, liability, certificates, and teams.",
    kind: "service",
    service: "Commercial Insurance",
    icon: "shield",
    keywords: "commercial insurance Miami, business insurance Miami, general liability insurance Miami, workers compensation Miami, commercial auto insurance Miami, certificate of insurance Miami, small business insurance Miami",
    sections: [
      ["Business coverage options", "Depending on operations, a business may need general liability, commercial auto, property, professional liability, workers compensation, or BOP conversations."],
      ["Contract and lease triggers", "Review coverage before signing leases, hiring employees, buying work vehicles, accepting jobs, or handling certificate of insurance requests."],
      ["Plain-language support", "Bring your business activity, address, payroll or revenue estimates, vehicle details, prior coverage, and certificate requirements if available."],
      ["Miami small business focus", "Office #3 can support contractors, local shops, professional offices, family businesses, and growing teams with a safer first-step intake path."]
    ],
    searchTopics: [
      ["Commercial insurance Miami", "For local companies comparing liability, property, commercial auto, workers compensation, and certificate requirements."],
      ["General liability insurance Miami", "For contractors, vendors, service businesses, and offices that need to discuss liability and contract requirements."],
      ["Workers compensation quote help", "For businesses adding employees or reviewing payroll, classification, and state requirement questions."],
      ["Commercial auto insurance Miami", "For businesses using work vehicles, trucks, vans, delivery vehicles, or company-owned cars."]
    ],
    faqs: [
      ["Can Miami small businesses request commercial insurance help?", "Yes. Office #3 helps local businesses, contractors, and companies request quote help for commercial insurance conversations."],
      ["What business insurance topics can Office #3 discuss?", "Depending on operations, you can discuss general liability, commercial auto, business property, professional liability, workers compensation, certificates of insurance, and other coverage questions."],
      ["Can the office help when a contract asks for a certificate of insurance?", "Yes. Bring the contract or certificate requirements so the office can help you understand what coverage details may need to be reviewed."],
      ["What information helps with a commercial insurance quote?", "Helpful details can include business activity, location, payroll or revenue estimates, number of employees, work vehicles, equipment, prior coverage, and certificate requirements."],
      ["Can contractors request general liability insurance help?", "Yes. Contractors and service businesses can request quote help and discuss general liability, commercial auto, tools, certificates, and contract requirements."],
      ["Can business owners ask about workers compensation?", "Yes. If your business has employees or is adding team members, Office #3 can help start a workers compensation quote conversation."],
      ["Can every business qualify for the same coverage?", "No. Coverage options and eligibility depend on underwriting, operations, location, payroll, vehicles, prior loss history, and other business details."],
      ["Does this website promise special carrier access?", "No. The site does not promise or imply special carrier access, guaranteed placement, or unapproved carrier relationship claims."]
    ]
  },
  {
    slug: "life-insurance",
    nav: "Life",
    title: "Life Insurance in Miami | Family Protection Quote Help | Office #3",
    description: "Life insurance quote help for Miami families. Discuss term life, final expense, income replacement, mortgage protection, and family planning with Office #3.",
    h1: "Life Insurance Quote Help for Miami Families",
    intro: "Compare life insurance options for family protection, income replacement, mortgage planning, final expenses, and long-term needs.",
    kind: "service",
    service: "Life Insurance",
    icon: "heart",
    keywords: "life insurance Miami, term life insurance Miami, final expense insurance Miami, family protection Miami, mortgage protection life insurance, bilingual life insurance help",
    sections: [
      ["Family-first planning", "Discuss coverage goals in plain language so you can compare options that may fit your budget, responsibilities, and family priorities."],
      ["When to review", "Review life insurance after marriage, a child, home purchase, job change, business launch, debt change, or a major family milestone."],
      ["Coverage conversation types", "Ask about term life, permanent life, final expense, income replacement, mortgage protection, and business continuity conversations."],
      ["Privacy-safe first step", "Initial conversations can start with general goals and contact details before any secure application or underwriting process is used."]
    ],
    searchTopics: [
      ["Life insurance Miami families", "For families comparing income protection, final expenses, mortgage protection, and long-term planning options."],
      ["Term life insurance quote help", "For people who want a defined coverage period tied to family, debt, income, or mortgage needs."],
      ["Final expense insurance Miami", "For customers asking about funeral, burial, and final expense planning conversations."],
      ["Bilingual life insurance support", "For Miami families who want English or Spanish guidance before any secure application process."]
    ],
    faqs: [
      ["Can Office #3 help with life insurance in Miami?", "Yes. Office #3 can help Miami families start a life insurance quote conversation around family protection, income replacement, mortgage planning, final expenses, or business needs."],
      ["Is life insurance only for parents?", "No. Life insurance may support spouses, children, business partners, debt planning, final expenses, and other family responsibilities."],
      ["What life insurance options can I ask about?", "You can ask about term life, permanent life, final expense, and other options that may be available depending on carrier rules, underwriting, age, health, and coverage goals."],
      ["When should a family review life insurance?", "A review can help after marriage, a child, home purchase, new business, job change, debt change, or any major family milestone."],
      ["Can business owners ask about life insurance?", "Yes. Business owners can ask about family protection, business continuity, key person, debt, or partner planning conversations where appropriate."],
      ["Can I start with a general conversation before applying?", "Yes. You can begin with goals, budget, family responsibilities, and callback preferences before any secure application steps."],
      ["Do I need to send medical or identification details through this website?", "No. Do not send sensitive underwriting, medical, payment, identification, or account information through a general website form."],
      ["Is life insurance approval guaranteed?", "No. Availability, pricing, eligibility, and approval depend on carrier underwriting and applicant information."]
    ]
  },
  {
    slug: "renters-insurance",
    nav: "Renters",
    title: "Renters and Condo Insurance in Miami | Quote Help | Office #3",
    description: "Renters insurance and condo insurance quote help in Miami. Discuss apartments, belongings, liability, lease requirements, condo units, and association documents.",
    h1: "Renters and Condo Insurance Quote Help in Miami",
    intro: "Get local quote help for apartments, belongings, liability questions, lease requirements, condo units, loss assessment questions, and association documents.",
    kind: "service",
    service: "Renters Insurance",
    icon: "key",
    keywords: "renters insurance Miami, condo insurance Miami, apartment insurance Miami, Miami renters insurance quote, condo unit insurance Miami, lease insurance requirement",
    sections: [
      ["Renters conversations", "Review options for personal belongings, liability, additional living expense questions, and lease requirements."],
      ["Condo conversations", "Discuss unit coverage, personal property, liability, loss assessment, deductibles, association documents, and lender questions."],
      ["Good timing", "Compare before move-in, lease renewal, condo closing, major purchases, association coverage changes, or roommate changes."],
      ["Miami apartment support", "Office #3 helps renters and condo owners in Miami-Dade start a simple quote conversation without collecting sensitive details first."]
    ],
    searchTopics: [
      ["Renters insurance Miami apartments", "For renters comparing apartment coverage, belongings, liability, lease requirements, and move-in timing."],
      ["Condo insurance Miami", "For condo owners reviewing unit coverage, personal property, loss assessment, deductibles, and association documents."],
      ["Lease requirement quote help", "For renters who need proof of coverage or have a landlord requirement before move-in."],
      ["Bilingual renters and condo support", "For Miami customers who want English or Spanish help before choosing a quote path."]
    ],
    faqs: [
      ["Can renters in Miami request insurance quote help?", "Yes. Renters can request quote help for apartments, personal belongings, liability conversations, and lease requirements."],
      ["Why might a renter consider renters insurance?", "Renters insurance can help start a conversation about belongings, liability, and additional living expense questions. Exact coverage depends on the policy and carrier."],
      ["Can condo owners compare coverage with Office #3?", "Yes. Condo owners can review unit coverage, personal property, liability, loss assessment questions, deductibles, and association documents."],
      ["Is condo insurance the same as renters insurance?", "No. Condo and renters policies are different. Office #3 can help you identify which quote conversation fits your housing situation."],
      ["When should I request renters or condo quote help?", "Good times include before move-in, lease renewal, condo closing, major purchases, association coverage changes, or after a renewal notice."],
      ["Can I ask about lease insurance requirements?", "Yes. Bring the lease or landlord requirement so Office #3 can help you understand what coverage conversation may be needed."],
      ["Can renters compare auto insurance too?", "Yes. Renters often review auto insurance, life insurance, or other family coverage conversations at the same time."],
      ["Does this page collect sensitive underwriting data?", "No. The first website form only asks for basic contact details and general quote notes before the secure intake path."]
    ]
  },
  {
    slug: "about-office-3",
    nav: "About",
    title: "About Office #3 | Your Family First Insurance Miami",
    description: "Learn about Your Family First Insurance Office #3, a local West Flagler Miami insurance office helping families and businesses compare coverage options.",
    h1: "About Your Family First Insurance Office #3",
    intro: "A local West Flagler Miami office focused on clear, family-first quote help for drivers, homeowners, renters, condo owners, families, and businesses.",
    kind: "about",
    faqs: [
      ["What makes Your Family First Insurance Office #3 local?", "Office #3 is listed on West Flagler Street in Miami and serves Miami-Dade families, drivers, renters, homeowners, and business owners."],
      ["Who is shown in the About Office #3 photo?", "The About section uses the approved principal agent photo for Ariel Busutil, Principal Agent and CEO at Your Family First Insurance Office #3."],
      ["Does the site use real approved office imagery?", "Yes. The website uses approved Office #3 assets, the official franchise sign, the original franchise logo, the real family and office photo, and the principal agent photo provided for the project."],
      ["Is Spanish-speaking insurance help available?", "Yes. Office #3 offers bilingual service for customers who prefer English or Spanish quote conversations."],
      ["What trust points are highlighted for Office #3?", "The site highlights 50+ insurance carriers, family-owned service, a local Miami office, bilingual help, free quotes, and fast, friendly service while avoiding fake ratings or price promises."],
      ["Can I call instead of using the form?", "Yes. Call 305-910-8850 for direct Office #3 quote help."]
    ]
  },
  {
    slug: "get-a-quote",
    nav: "Get Quote",
    title: "Get My Free Quote | Your Family First Insurance Office #3",
    description: "Request personalized quote help from Your Family First Insurance Office #3 for auto, homeowners, life, business, renters, condo, or commercial insurance.",
    h1: "Get My Free Quote",
    intro: "Tell Office #3 what type of insurance you want to compare and when it is best to call. Do not send sensitive personal documents through this form.",
    kind: "quote",
    faqs: [
      ["Where does the Office #3 quote form go?", "The quote request opens the secure ConsumerRateQuotes intake path provided for Office #3 using account ID 64868."],
      ["Does the quote form bind insurance coverage?", "No. Submitting a form does not bind, change, renew, cancel, or reinstate insurance coverage."],
      ["What information should I enter first?", "Enter your name, phone, email, insurance type, ZIP code, best time to call, and brief general notes so the office knows how to follow up."],
      ["What should I avoid sending through the website?", "Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment card details, claim files, medical records, passwords, or carrier login credentials through regular forms."],
      ["Can I call if I do not want to use the form?", "Yes. Call 305-910-8850 if you prefer to speak directly with Office #3."],
      ["Can the QR code be used for quote help?", "Yes, use the QR code only if it is approved for the Office #3 quote intake path and you are comfortable continuing through that route."]
    ]
  },
  {
    slug: "privacy-policy",
    nav: "Privacy",
    title: "Privacy Policy | Your Family First Insurance Office #3",
    description: "Privacy policy for Your Family First Insurance Office #3 website visitors and quote inquiries.",
    h1: "Privacy Policy",
    intro: "This page explains the basic contact data used by the Office #3 website and what not to send through regular forms.",
    kind: "privacy"
  },
  {
    slug: "terms",
    nav: "Terms",
    title: "Terms and Insurance Disclaimer | Your Family First Insurance Office #3",
    description: "Website terms, quote limitations, and insurance disclaimer for Your Family First Insurance Office #3.",
    h1: "Website Terms and Insurance Disclaimer",
    intro: "These terms explain website use, quote limitations, privacy-safe contact expectations, and insurance coverage boundaries.",
    kind: "terms"
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageUrl(slug) {
  return slug ? `${siteUrl}/${slug}/` : `${siteUrl}/`;
}

function pagePath(slug) {
  return slug ? path.join(root, slug, "index.html") : path.join(root, "index.html");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function iconSvg(name) {
  const icons = {
    car: '<path d="M5 17h14"/><path d="M7 17l1.2-5.2A3 3 0 0 1 11.1 9h1.8a3 3 0 0 1 2.9 2.3L17 17"/><path d="M6.8 17.2v1.1"/><path d="M17.2 17.2v1.1"/><path d="M8.5 13h7"/>',
    home: '<path d="M4.5 11.5 12 5l7.5 6.5"/><path d="M7 10.5V19h10v-8.5"/><path d="M10 19v-5h4v5"/>',
    heart: '<path d="M12 19.5s-7-4.1-7-9.1A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.4c0 5-7 9.1-7 9.1Z"/>',
    briefcase: '<path d="M8 8V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M5 8h14v10H5z"/><path d="M5 12h14"/><path d="M11 12v1h2v-1"/>',
    key: '<path d="M14.5 10.5a4 4 0 1 1-1.4-3"/><path d="M14 9h6v3h-2v2h-3v-2h-1"/>',
    building: '<path d="M6 19V5h8v14"/><path d="M14 9h4v10"/><path d="M9 8h2M9 11h2M9 14h2"/><path d="M4 19h16"/>',
    shield: '<path d="M12 4 18 6v5c0 4.1-2.4 6.8-6 8-3.6-1.2-6-3.9-6-8V6l6-2Z"/><path d="M9.3 12.1 11.2 14l3.7-4"/>',
    phone: '<path d="M8 5.5 10 9l-1.5 1.5a11 11 0 0 0 5 5L15 14l3.5 2v2.5c0 .8-.7 1.5-1.5 1.5A13.5 13.5 0 0 1 3.5 6.5C3.5 5.7 4.2 5 5 5h3Z"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    clock: '<path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="8"/>',
    lock: '<rect x="6" y="10" width="12" height="9" rx="2"/><path d="M9 10V8a3 3 0 0 1 6 0v2"/>',
    map: '<path d="M9 18 4 20V6l5-2 6 2 5-2v14l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/>'
  };
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.shield}</svg>`;
}

function logoImg(loading = "eager") {
  return `<img src="${logoSrc}" alt="Your Family First Insurance official franchise logo and sign" width="1932" height="937" loading="${loading}" decoding="async">`;
}

function originalFranchiseLogoImg(loading = "lazy") {
  return `<img src="${originalFranchiseLogoSrc}" alt="Original Your Family First Insurance franchise family logo" width="521" height="648" loading="${loading}" decoding="async">`;
}

function familyPicture(className, loading = "lazy", fetchpriority = "auto") {
  return `<picture class="${className}">
    <source srcset="${familyWebpSrc}" type="image/webp">
    <img src="${familyPhotoSrc}" alt="Real family and office photo for Your Family First Insurance Office #3" width="974" height="732" loading="${loading}" decoding="async" fetchpriority="${fetchpriority}">
  </picture>`;
}

function principalPicture(className, loading = "lazy") {
  return `<picture class="${className}">
    <img src="${principalPhotoSrc}" alt="Ariel Busutil, Principal Agent and CEO at Your Family First Insurance Office #3" width="1448" height="1086" loading="${loading}" decoding="async">
  </picture>`;
}

function trustTicker() {
  const interactiveTrack = tickerItems.map(([label, href]) => {
    const external = href.startsWith("http") ? ' rel="noopener"' : "";
    return `<a href="${href}"${external}>${escapeHtml(label)}</a>`;
  }).join("");
  const duplicateTrack = tickerItems.map(([label]) => `<span class="ticker-copy">${escapeHtml(label)}</span>`).join("");
  return `
    <div class="trust-ticker" aria-label="Office highlights and insurance services">
      <div class="trust-track">
        <span>${interactiveTrack}</span>
        <span aria-hidden="true">${duplicateTrack}</span>
      </div>
    </div>
  `;
}

function navHtml(currentSlug) {
  const mainNavSlugs = ["", "auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance", "about-office-3"];
  const navLabels = {
    "": "Home",
    "auto-insurance": "Auto",
    "home-insurance": "Homeowners",
    "commercial-insurance": "Commercial",
    "life-insurance": "Life",
    "renters-insurance": "Renters",
    "about-office-3": "About"
  };
  const links = pages
    .filter((page) => mainNavSlugs.includes(page.slug))
    .map((page) => {
      const href = page.slug ? `/${page.slug}/` : "/";
      const active = page.slug === currentSlug ? ' aria-current="page"' : "";
      return `<a href="${href}"${active}>${escapeHtml(navLabels[page.slug] || page.nav)}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <div class="header-shell">
        <a class="brand-lockup" href="/" aria-label="${businessName} home">
          <span class="brand-logo">${logoImg()}</span>
          <span class="brand-copy"><strong>Office #3</strong><span>West Flagler Miami</span></span>
        </a>
        ${trustTicker()}
        <a class="mobile-call" href="${phoneHref}">${iconSvg("phone")}<span>${phoneDisplay}</span></a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">
          <span></span><span></span><span></span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Primary navigation">${links}</nav>
        <div class="header-actions">
          <a class="header-call" href="${phoneHref}">${phoneDisplay}</a>
          <a class="button small warm" href="${quoteDestination}" rel="noopener">Get My Free Quote</a>
        </div>
      </div>
    </header>
  `;
}

function footerHtml() {
  const links = pages.map((page) => `<li><a href="${page.slug ? `/${page.slug}/` : "/"}">${escapeHtml(page.nav)}</a></li>`).join("");
  return `
    <footer class="site-footer">
      <div class="footer-shell">
        <div class="footer-brand">
          <div class="footer-logo-pair">
            <span class="footer-logo footer-logo-banner">${logoImg("lazy")}</span>
            <span class="footer-logo footer-logo-original">${originalFranchiseLogoImg()}</span>
          </div>
          <p><strong>${businessName}</strong></p>
          <p>${address.streetAddress}<br>${address.addressLocality}, ${address.addressRegion} ${address.postalCode}</p>
          <p><a href="${phoneHref}">${phoneDisplay}</a> <span aria-hidden="true">/</span> <a href="${smsHref}">Text the office</a></p>
        </div>
        <div>
          <h2>Insurance Help</h2>
          <ul>${links}</ul>
        </div>
        <div>
          <h2>Local Office</h2>
          <p>Office #3 serving West Flagler Miami, Miami-Dade families, drivers, homeowners, renters, condo owners, and local businesses.</p>
          <p class="footer-note">Coverage options, availability, pricing, and eligibility vary by carrier, underwriting, location, and applicant information. Savings are not guaranteed.</p>
        </div>
      </div>
    </footer>
  `;
}

function organizationSchema() {
  const offerNames = [
    ...serviceCards.map((card) => card.title),
    ...specialtyCoverageLinks.map(([, label]) => label)
  ];
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${siteUrl}/#insuranceagency`,
    name: businessName,
    legalName,
    slogan: "Where Your Family Comes First",
    url: siteUrl,
    telephone: "+13059108850",
    image: `${siteUrl}${familyPhotoSrc}`,
    logo: `${siteUrl}${logoSrc}`,
    address: { "@type": "PostalAddress", ...address },
    areaServed: serviceAreas,
    knowsAbout: insuranceTypes,
    availableLanguage: ["English", "Spanish"],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+13059108850",
      contactType: "customer service",
      areaServed: "US-FL",
      availableLanguage: ["English", "Spanish"]
    }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Insurance quote help",
      itemListElement: offerNames.map((name, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${siteUrl}/#insuranceagency` },
          areaServed: serviceAreas
        }
      }))
    },
    priceRange: "$$"
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: businessName,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#insuranceagency` }
  };
}

function serviceItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#insurance-services`,
    name: "Insurance services and quote paths",
    itemListElement: [
      ...serviceCards.map((card) => [card.title, `${siteUrl}${card.href}`]),
      ...specialtyCoverageLinks.map(([id, label]) => [label, `${siteUrl}/#${id}`])
    ].map(([name, url], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      url
    }))
  };
}

function breadcrumbSchema(page) {
  if (!page.slug) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: page.h1, item: pageUrl(page.slug) }
    ]
  };
}

function serviceSchema(page) {
  if (page.kind !== "service") return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.service,
    serviceType: page.service,
    provider: { "@id": `${siteUrl}/#insuranceagency` },
    areaServed: serviceAreas,
    url: pageUrl(page.slug)
  };
}

function faqSchema(page) {
  if (!page.faqs) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function headHtml(page) {
  const schemas = [organizationSchema(), websiteSchema(), page.kind === "home" ? serviceItemListSchema() : null, breadcrumbSchema(page), serviceSchema(page), faqSchema(page)].filter(Boolean);
  const preloadPhoto = page.kind === "home" ? `<link rel="preload" href="${familyWebpSrc}" as="image" type="image/webp">` : "";
  const keywords = page.keywords || "Miami insurance agency, West Flagler insurance, auto insurance Miami, homeowners insurance Miami, renters insurance Miami, condo insurance Miami, commercial insurance Miami, life insurance Miami, health insurance Miami, bilingual insurance office";
  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta name="geo.region" content="US-FL">
    <meta name="geo.placename" content="Miami, Florida">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="theme-color" content="#06111F">
    <meta name="format-detection" content="telephone=yes">
    <link rel="canonical" href="${pageUrl(page.slug)}">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${pageUrl(page.slug)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${siteUrl}${familyPhotoSrc}">
    <meta property="og:site_name" content="${businessName}">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${siteUrl}${familyPhotoSrc}">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="${logoSrc}">
    <link rel="preconnect" href="https://secure.ConsumerRateQuotes.com">
    <link rel="preload" href="${logoSrc}" as="image">
    ${preloadPhoto}
    <link rel="stylesheet" href="/assets/styles.css">
    <script src="/assets/site.js" defer></script>
    ${schemas.map(jsonLd).join("\n")}
  `;
}

function ctaRow(extra = "") {
  return `
    <div class="cta-row ${extra}">
      <a class="button warm" href="${quoteDestination}" rel="noopener">Get My Free Quote ${iconSvg("arrow")}</a>
      <a class="button light" href="${phoneHref}">Call ${phoneDisplay}</a>
    </div>
  `;
}

function heroHtml(page) {
  const isHome = page.kind === "home";
  const isService = page.kind === "service";
  return `
    <section class="hero ${isHome ? "home-hero" : "inner-hero"}" data-reveal>
      <div class="hero-content" data-reveal>
        ${isHome ? "" : `<p class="kicker">${escapeHtml(page.nav)}</p>`}
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="hero-lead">${escapeHtml(page.intro)}</p>
        ${ctaRow()}
        <p class="trust-line">Local Office #3 <span>/</span> Personalized Quote Help <span>/</span> Miami Families</p>
      </div>
      <div class="${isService ? "service-showcase" : "photo-showcase"}" data-reveal>
        ${
          isService
            ? `<span class="service-icon-xl">${iconSvg(page.icon)}</span>
               <div class="showcase-logo">${logoImg("lazy")}</div>
               <p>${escapeHtml(page.service)} quote help from a local West Flagler Miami office.</p>`
            : `${familyPicture("hero-photo", isHome ? "eager" : "lazy", isHome ? "high" : "auto")}
               <div class="photo-caption"><strong>Real Office #3 family and office photo</strong><span>Miami, Florida</span></div>`
        }
      </div>
    </section>
  `;
}

function trustStrip() {
  const items = [
    ["Local Office #3", "West Flagler Miami"],
    ["Privacy-Safe Start", "Basic contact only"],
    ["Auto / Homeowners / Life", "Family coverage help"],
    ["Business Support", "Commercial conversations"]
  ];
  return `
    <section class="trust-strip" aria-label="Office trust points" data-reveal>
      ${items.map(([title, copy]) => `<article><span></span><strong>${title}</strong><small>${copy}</small></article>`).join("")}
    </section>
  `;
}

function aboutPreview() {
  return `
    <section class="section about-panel" data-reveal>
      <div class="about-copy">
        <p class="kicker">About Office #3</p>
        <h2>Your Local Insurance Resource in Miami</h2>
        <p>${businessName} is a West Flagler Miami office helping families and businesses compare coverage options without pressure or confusing promises.</p>
        <p>The site uses real Office #3 imagery and the official franchise sign so the experience feels local, specific, and contract-safe.</p>
        ${ctaRow("compact")}
      </div>
      <div class="about-media">
        ${principalPicture("about-photo principal-photo")}
        <div class="photo-caption"><strong>Ariel Busutil, Principal Agent</strong><span>Office #3</span></div>
      </div>
    </section>
  `;
}

function coverageCards() {
  return `
    <section class="section coverage-section" aria-labelledby="coverage-title" data-reveal>
      <div class="section-heading center">
        <p class="kicker">Our services</p>
        <h2 id="coverage-title">Comprehensive Coverage Conversations for Everyday Life</h2>
        <p>Start with the coverage type you need. Office #3 helps compare options in plain language and follows up locally.</p>
      </div>
      <div class="coverage-grid">
        ${serviceCards.map((card) => `
          <article class="coverage-card" id="${card.id}" data-reveal>
            <div class="card-top"><span class="soft-icon">${iconSvg(card.icon)}</span><a href="${card.href}">${escapeHtml(card.short)} ${iconSvg("arrow")}</a></div>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.copy)}</p>
            <div class="tag-row">${card.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          </article>
        `).join("")}
      </div>
      <div class="coverage-link-rail" aria-label="Additional insurance quote paths">
        ${specialtyCoverageLinks.map(([id, label, href]) => `<a id="${id}" href="${href}">${escapeHtml(label)}</a>`).join("")}
      </div>
    </section>
  `;
}

function processSection() {
  const steps = [
    ["1", "Contact us", "Call, text, or send a basic quote request with only safe contact details."],
    ["2", "We shape the quote path", "Office #3 confirms the coverage conversation and what information may be needed next."],
    ["3", "Review your options", "Compare available options in plain language before making a decision."],
    ["4", "Get covered", "Coverage is only active after written confirmation and required carrier steps."]
  ];
  return `
    <section class="section process-section" aria-labelledby="process-title" data-reveal>
      <div class="section-heading">
        <p class="kicker">How it works</p>
        <h2 id="process-title">Getting Insured Is Easy</h2>
        <p>A simple first conversation helps Office #3 point you toward the right quote path.</p>
      </div>
      <div class="process-grid">
        ${steps.map(([number, title, copy]) => `<article data-reveal><span>${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function whyChooseSection() {
  const points = [
    ["insurance-carriers", "50+ Insurance Carriers", "Compare broad carrier options in one local conversation. Availability, eligibility, and pricing still vary by carrier and applicant information."],
    ["family-owned", "Family Owned", "A family-first office culture focused on clear guidance, real conversations, and long-term local relationships."],
    ["local-miami-office", "Local Miami Office", "Office #3 is listed on West Flagler Street and serves Miami-Dade families, drivers, homeowners, renters, and businesses."],
    ["bilingual-service", "Bilingual Service", "English and Spanish quote help for Miami families who want the process explained plainly."],
    ["free-quotes", "Free Quotes", "Start with a no-pressure quote request and basic contact details before any secure application process."],
    ["fast-friendly-service", "Fast, Friendly Service", "A simple, responsive path from first contact to coverage conversations with a local office team."]
  ];
  return `
    <section class="section why-panel" data-reveal>
      <div class="why-copy">
        <p class="kicker">Why choose us</p>
        <h2>Insurance Help That Feels Human, Local, and Clear</h2>
        <p>Office #3 keeps the online experience simple: choose the coverage conversation, share safe basics, and talk with a local office before moving into any secure application process.</p>
      </div>
      <div class="why-grid">
        ${points.map(([id, title, copy]) => `<article id="${id}"><h3>${title}</h3><p>${copy}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function franchiseBadgeSection() {
  return `
    <section class="section franchise-panel" aria-labelledby="franchise-title" data-reveal>
      <div class="franchise-copy">
        <p class="kicker">Official franchise identification</p>
        <h2 id="franchise-title">Official Your Family First Insurance Office #3 Branding</h2>
        <p>Official Your Family First Insurance Office #3 branding shown for franchise identification.</p>
      </div>
      <div class="franchise-card franchise-logo-stack">
        <div class="franchise-logo-main">${logoImg("lazy")}</div>
        <div class="franchise-logo-original">${originalFranchiseLogoImg()}</div>
      </div>
    </section>
  `;
}

function quoteForm(formId = "quote-form") {
  return `
    <form id="${formId}" class="quote-form" data-quote-form data-quote-destination="${quoteDestination}" action="${quoteDestination}" method="post" novalidate>
      <label class="honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabindex="-1" autocomplete="off"></label>
      <label>Name<input required name="name" autocomplete="name" minlength="2" maxlength="80"></label>
      <label>Phone<input required name="phone" autocomplete="tel" inputmode="tel" minlength="7" maxlength="24"></label>
      <label>Email<input required name="email" type="email" autocomplete="email" maxlength="120"></label>
      <label>Insurance type
        <select required name="insuranceType">
          <option value="">Select one</option>
          <option>Auto</option>
          <option>Homeowners</option>
          <option>Life</option>
          <option>Business</option>
          <option>Renters</option>
          <option>Condo</option>
          <option>Commercial</option>
        </select>
      </label>
      <label>ZIP code<input required name="zip" inputmode="numeric" pattern="[0-9]{5}" autocomplete="postal-code" maxlength="5"></label>
      <label>Best time to call
        <select required name="bestTime">
          <option value="">Select one</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>No preference</option>
        </select>
      </label>
      <label class="wide">Notes<textarea name="notes" rows="4" maxlength="600" placeholder="Briefly describe what you want to compare. Do not include SSNs, DOBs, driver license numbers, VINs, payment details, or sensitive documents."></textarea></label>
      <p class="form-disclaimer wide">This first-step form is for basic contact only. Coverage is not bound by submitting it, and savings are not guaranteed.</p>
      <button class="button warm wide" type="submit">Continue to Secure Quote Form ${iconSvg("arrow")}</button>
      <p class="form-status wide" role="status" aria-live="polite"></p>
    </form>
  `;
}

function quoteSection(title = "Get My Free Quote") {
  return `
    <section class="section quote-panel" id="quote" data-reveal>
      <div class="quote-copy">
        <p class="kicker">Get quote help</p>
        <h2>${escapeHtml(title)}</h2>
        <p>Share only basic contact details here. When the required fields are complete, the form opens the secure ConsumerRateQuotes intake path for the next step.</p>
        <div class="callout">
          ${iconSvg("phone")}
          <p><strong>Prefer to talk now?</strong><br><a href="${phoneHref}">Call ${phoneDisplay}</a> or <a href="${smsHref}">text the office</a>.</p>
        </div>
        <div class="qr-card">
          <img src="${qrSrc}" alt="Quote Yourself QR code for Your Family First Insurance Office #3" width="400" height="386" loading="eager" decoding="async">
          <p><strong>Quote Yourself QR</strong><br>Scan this QR code for a fast and easy quote!</p>
        </div>
      </div>
      ${quoteForm()}
    </section>
  `;
}

function finalCta() {
  return `
    <section class="final-cta" data-reveal>
      <div>
        <p class="kicker">Ready when you are</p>
        <h2>Start With a Local Office #3 Conversation</h2>
        <p>No fake urgency, no price promises, and no sensitive details in the first step. Just a clean path to quote help.</p>
        ${ctaRow("centered")}
      </div>
    </section>
  `;
}

function homeBody() {
  return `
    ${trustStrip()}
    ${aboutPreview()}
    ${coverageCards()}
    ${processSection()}
    ${whyChooseSection()}
    ${franchiseBadgeSection()}
    ${quoteSection("Get My Free Quote")}
    ${faqHtml(pages[0])}
    ${finalCta()}
  `;
}

function serviceBody(page) {
  return `
    <section class="section service-detail" data-reveal>
      <div class="section-heading">
        <p class="kicker">Miami coverage conversation</p>
        <h2>${escapeHtml(page.service)} Guidance Without Pressure</h2>
        <p>Office #3 is listed on West Flagler Street in Miami and serves Miami-Dade families, drivers, homeowners, renters, condo owners, and businesses.</p>
      </div>
      <div class="detail-grid">
        ${page.sections.map(([title, copy]) => `<article class="detail-card" data-reveal="card"><span class="soft-icon">${iconSvg(page.icon)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}
      </div>
    </section>
    ${serviceSearchPanel(page)}
    <section class="section service-cta" data-reveal>
      <div>
        <p class="kicker">Ready when you are</p>
        <h2>Request ${escapeHtml(page.service)} Quote Help</h2>
        <p>Coverage availability varies by carrier, underwriting, location, and applicant information. Office #3 can help compare options without price or approval promises.</p>
      </div>
      <a class="button light" href="${quoteDestination}" rel="noopener">Start My Quote Request ${iconSvg("arrow")}</a>
    </section>
    ${relatedLinks(page.slug)}
    ${faqHtml(page)}
  `;
}

function serviceSearchPanel(page) {
  if (!page.searchTopics) return "";
  return `
    <section class="section search-intent-panel" data-reveal>
      <div class="section-heading">
        <p class="kicker">Local search guide</p>
        <h2>Helpful ${escapeHtml(page.service)} Topics for Miami Customers</h2>
        <p>These are the real questions customers often bring to Office #3 when comparing insurance options in West Flagler, Miami, Kendall, Hialeah, Doral, Homestead, and Miami-Dade.</p>
      </div>
      <div class="intent-grid">
        ${page.searchTopics.map(([title, copy]) => `<article class="intent-card" data-reveal="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function relatedLinks(currentSlug) {
  const related = pages
    .filter((page) => ["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance", "get-a-quote"].includes(page.slug) && page.slug !== currentSlug)
    .map((page) => `<a href="/${page.slug}/">${escapeHtml(page.nav)}</a>`)
    .join("");
  return `
    <section class="section related-links" data-reveal>
      <p class="kicker">Related options</p>
      <h2>Compare Another Coverage Conversation</h2>
      <div class="link-pills">${related}</div>
    </section>
  `;
}

function aboutBody() {
  return `
    ${trustStrip()}
    ${aboutPreview()}
    ${whyChooseSection()}
    ${franchiseBadgeSection()}
    ${relatedLinks("about-office-3")}
    ${faqHtml(pages.find((page) => page.slug === "about-office-3"))}
  `;
}

function quoteBody() {
  return `
    ${quoteSection("Tell Office #3 What You Want to Compare")}
    <section class="section privacy-safe" data-reveal>
      <div class="notice-card">
        <h2>Privacy-Safe First Step</h2>
        <p>Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment details, claim files, medical records, passwords, or carrier login credentials through this first website form.</p>
      </div>
    </section>
    ${faqHtml(pages.find((page) => page.slug === "get-a-quote"))}
  `;
}

function privacyBody() {
  return `
    <section class="section legal-copy" data-reveal>
      <h2>Privacy Summary</h2>
      <p>This website provides business information, service pages, and quote contact options for ${businessName}.</p>
      <p>The static pages do not store form submissions by themselves. The quote request path opens the secure ConsumerRateQuotes intake URL provided for Office #3, and that service may process submitted information under its own privacy terms.</p>
      <p>This policy is written to align with the privacy and security posture used by the original Your Family First Insurance office, while keeping this Office #3 static website accurate to its current setup.</p>
      <h2>Information You May Choose to Provide</h2>
      <p>Name, phone number, email address, ZIP code, requested insurance type, best time to call, and general notes.</p>
      <h2>Security Measures</h2>
      <p>The public website is designed for HTTPS hosting and includes baseline browser security headers for GoDaddy/Apache where supported. Information sent through the quote path should be handled only through the secure ConsumerRateQuotes intake and approved office workflows.</p>
      <h2>Cookies and Tracking</h2>
      <p>This static build does not add analytics scripts, ad pixels, chat widgets, or third-party tracking code by default. If those tools are added later, the privacy policy should be reviewed and updated before publishing.</p>
      <h2>Third-Party Quote Intake</h2>
      <p>ConsumerRateQuotes is a separate quote intake destination. Review that service's privacy and security terms before relying on it for live lead collection.</p>
      <h2>Sensitive Information</h2>
      <p>Do not send Social Security numbers, dates of birth, driver license numbers, VINs, payment card information, bank details, claim documents, medical records, passwords, or carrier login credentials through regular website forms or text messages.</p>
      <h2>Contact</h2>
      <p>For privacy questions, call <a href="${phoneHref}">${phoneDisplay}</a>.</p>
    </section>
  `;
}

function termsBody() {
  return `
    <section class="section legal-copy" data-reveal>
      <h2>Website Use</h2>
      <p>This website provides general information about insurance quote help from ${businessName}.</p>
      <h2>No Coverage Bound by Website Use</h2>
      <p>Submitting a form, calling, texting, or browsing this website does not create, bind, change, renew, cancel, or reinstate insurance coverage. Coverage is subject to written confirmation, carrier rules, eligibility, underwriting, and payment requirements.</p>
      <h2>No Guaranteed Price or Approval</h2>
      <p>Quotes, discounts, eligibility, and coverage availability may vary based on customer information, underwriting, location, property details, vehicles, business operations, and carrier guidelines.</p>
      <h2>Carrier and Photo Disclaimer</h2>
      <p>Any carrier name that may appear incidentally in a real office photo is not a separate marketing claim, endorsement, or unauthorized affiliation statement.</p>
      <h2>Third-Party Intake</h2>
      <p>The secure quote path may open ConsumerRateQuotes. That service is outside this static website and may apply its own terms, privacy practices, and submission handling rules.</p>
      <h2>No Legal or Financial Advice</h2>
      <p>Website content is general information and is not legal, tax, financial, or claims advice.</p>
    </section>
  `;
}

function faqHtml(page) {
  if (!page?.faqs) return "";
  return `
    <section class="section faq" data-reveal>
      <div class="section-heading">
        <p class="kicker">FAQ</p>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div class="faq-list">
        ${page.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}
      </div>
    </section>
  `;
}

function bodyFor(page) {
  if (page.kind === "home") return homeBody();
  if (page.kind === "service") return serviceBody(page);
  if (page.kind === "about") return aboutBody();
  if (page.kind === "quote") return quoteBody();
  if (page.kind === "privacy") return privacyBody();
  if (page.kind === "terms") return termsBody();
  return "";
}

function pageHtml(page) {
  return `<!doctype html>
<html lang="en">
<head>${headHtml(page)}</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${navHtml(page.slug)}
  <main id="main">
    ${heroHtml(page)}
    ${bodyFor(page)}
  </main>
  ${footerHtml()}
</body>
</html>
`;
}

function cssSource() {
  return `:root {
  color-scheme: dark;
  --navy: #06111F;
  --deep-blue: #7DD3FC;
  --miami-blue: #9ADCF7;
  --ice: #F3FBFF;
  --white: #FFF8EC;
  --coral: #FF7D65;
  --gold: #F4C96B;
  --ink: #FFF8EC;
  --ink-soft: #E9F1FA;
  --muted: #B7C7D8;
  --cream: #07131F;
  --cream-2: #0A1827;
  --powder: #10283A;
  --sage: #173426;
  --sage-strong: #86CFA0;
  --clay: #FFA184;
  --line: rgba(255, 255, 255, 0.16);
  --line-blue: rgba(154, 220, 247, 0.20);
  --surface: rgba(15, 35, 52, 0.68);
  --surface-strong: rgba(21, 47, 68, 0.78);
  --glass: rgba(255, 255, 255, 0.08);
  --glass-strong: rgba(255, 255, 255, 0.13);
  --glass-line: rgba(255, 255, 255, 0.24);
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
  --shadow-soft: 0 16px 46px rgba(0, 0, 0, 0.28);
  --glow-coral: 0 0 0 1px rgba(255, 255, 255, 0.16), 0 18px 50px rgba(255, 125, 101, 0.22);
  --radius: 18px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  overflow-x: hidden;
  color: var(--ink-soft);
  background:
    linear-gradient(180deg, #06111F 0%, #0A1C2C 34%, #081520 62%, #06111F 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}

img, picture, svg { display: block; }
img { max-width: 100%; height: auto; }
a { color: var(--miami-blue); }
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible {
  outline: 3px solid rgba(255, 209, 140, 0.42);
  outline-offset: 4px;
}

.skip-link {
  position: absolute;
  left: 14px;
  top: -70px;
  z-index: 100;
  padding: 10px 14px;
  border-radius: 10px;
  color: #FFFFFF;
  background: var(--ink);
}
.skip-link:focus { top: 14px; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--glass-line);
  background: rgba(6, 17, 31, 0.78);
  box-shadow: 0 16px 46px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
}
.header-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  width: min(1180px, calc(100% - 28px));
  margin: 0 auto;
  padding: 10px 0;
}
.brand-lockup {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  text-decoration: none;
}
.brand-logo, .footer-logo, .showcase-logo, .franchise-card {
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.44);
  border-radius: var(--radius);
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: var(--shadow-soft), 0 0 34px rgba(154, 220, 247, 0.10);
}
.brand-logo {
  width: 116px;
  height: 56px;
  flex: 0 0 auto;
  padding: 3px;
}
.brand-logo img, .footer-logo img, .showcase-logo img, .franchise-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  filter: none;
  transform: none;
}
.brand-copy {
  display: none;
  line-height: 1.08;
}
.brand-copy strong {
  color: var(--clay);
  font-size: 0.76rem;
  font-weight: 950;
  text-transform: uppercase;
}
.brand-copy span {
  display: block;
  color: var(--ink);
  font-size: 0.86rem;
  font-weight: 850;
}

.site-nav {
  display: none;
  grid-column: 1 / -1;
  gap: 4px;
  padding-top: 10px;
}
.site-nav[data-open="true"] { display: grid; }
.site-nav a, .header-call, .mobile-call {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
  white-space: nowrap;
}
.site-nav a {
  padding: 8px 12px;
}
.site-nav a:hover, .site-nav a[aria-current="page"] {
  color: var(--ink);
  background: var(--glass-strong);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.mobile-call {
  flex: 0 0 auto;
  gap: 6px;
  border: 1px solid rgba(255, 161, 132, 0.34);
  padding: 8px 10px;
  color: var(--clay);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 14px 32px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(16px) saturate(135%);
  -webkit-backdrop-filter: blur(16px) saturate(135%);
}
.mobile-call .icon { width: 16px; height: 16px; }
.menu-toggle {
  display: inline-flex;
  width: 42px;
  height: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid var(--glass-line);
  border-radius: 14px;
  background: var(--glass);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 14px 32px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(16px) saturate(135%);
  -webkit-backdrop-filter: blur(16px) saturate(135%);
}
.menu-toggle span {
  width: 18px;
  height: 2px;
  border-radius: 99px;
  background: var(--ink);
}
.header-actions { display: none; }

.trust-ticker {
  grid-column: 1 / -1;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--glass-line);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.095), rgba(154, 220, 247, 0.07));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 14px 34px rgba(0, 0, 0, 0.22);
  mask-image: linear-gradient(90deg, transparent 0, #000 34px, #000 calc(100% - 34px), transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 34px, #000 calc(100% - 34px), transparent 100%);
  backdrop-filter: blur(16px) saturate(145%);
  -webkit-backdrop-filter: blur(16px) saturate(145%);
}
.trust-track {
  display: flex;
  width: max-content;
  animation: trust-marquee 64s linear infinite;
  will-change: transform;
}
.trust-track span {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  white-space: nowrap;
}
.trust-track a, .ticker-copy {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  padding: 3px 10px;
  color: var(--ink-soft);
  font-size: 0.76rem;
  font-weight: 900;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.055);
  transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
.trust-track a:hover, .trust-track a:focus-visible {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.13);
  box-shadow: 0 0 24px rgba(154, 220, 247, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.22);
}
.trust-ticker:hover .trust-track, .trust-ticker:focus-within .trust-track {
  animation-play-state: paused;
}
@keyframes trust-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

.button {
  position: relative;
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  padding: 12px 18px;
  font-size: 0.95rem;
  font-weight: 950;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    inset 0 -18px 34px rgba(255, 255, 255, 0.04),
    0 18px 44px rgba(0, 0, 0, 0.32);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
}
.button::before {
  content: "";
  position: absolute;
  inset: 1px 1px auto;
  height: 45%;
  border-radius: inherit;
  background:
    radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.34), transparent 18%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0));
  pointer-events: none;
  z-index: -1;
}
.button::after {
  content: "";
  position: absolute;
  inset: -40% auto -40% -35%;
  width: 42%;
  transform: rotate(18deg);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms ease, transform 520ms ease;
  z-index: -1;
}
.button .icon { width: 17px; height: 17px; }
.button.warm {
  color: var(--ink);
  border-color: rgba(255, 205, 180, 0.38);
  background:
    linear-gradient(135deg, rgba(255, 125, 101, 0.95), rgba(244, 201, 107, 0.78) 58%, rgba(154, 220, 247, 0.58));
  box-shadow: var(--glow-coral);
}
.button.light {
  color: var(--ink);
  border-color: var(--glass-line);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(154, 220, 247, 0.08));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    0 16px 38px rgba(0, 0, 0, 0.28);
}
.button.small {
  min-height: 40px;
  padding: 10px 14px;
  font-size: 0.86rem;
}
.button:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.34);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    0 24px 60px rgba(0, 0, 0, 0.42),
    0 0 34px rgba(154, 220, 247, 0.15);
}
.button:hover::after {
  opacity: 1;
  transform: translateX(360%) rotate(18deg);
}

h1, h2, h3, p { letter-spacing: 0; }
h1, h2 {
  margin: 0;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.02;
}
h1 {
  max-width: 770px;
  font-size: 2.72rem;
}
h2 { font-size: 2rem; }
h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.08rem;
  line-height: 1.24;
}
.kicker {
  margin: 0 0 10px;
  color: var(--clay);
  font-size: 0.72rem;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}

.hero {
  position: relative;
  display: grid;
  gap: 26px;
  overflow: hidden;
  padding: 42px max(18px, calc((100vw - 1180px) / 2)) 40px;
  background:
    linear-gradient(135deg, rgba(6, 17, 31, 0.98) 0%, rgba(10, 31, 47, 0.96) 48%, rgba(19, 53, 54, 0.9) 100%);
  border-bottom: 1px solid var(--glass-line);
}
.hero::before {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 22%;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(6, 17, 31, 0), rgba(6, 17, 31, 0.8));
}
.hero-content, .photo-showcase, .service-showcase { position: relative; z-index: 1; }
.hero-lead {
  max-width: 650px;
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 1.06rem;
}
.cta-row {
  display: grid;
  gap: 10px;
  max-width: 520px;
  margin-top: 22px;
}
.trust-line {
  margin: 16px 0 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  font-weight: 850;
}
.trust-line span { color: var(--clay); }
.photo-showcase, .service-showcase {
  overflow: hidden;
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px) saturate(135%);
  -webkit-backdrop-filter: blur(22px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}
.photo-showcase:hover, .service-showcase:hover,
.coverage-card:hover, .detail-card:hover, .process-grid article:hover,
.why-grid article:hover, .quote-form:hover, .notice-card:hover,
.about-media:hover, .franchise-card:hover, .service-cta:hover,
.trust-strip article:hover, .callout:hover, .qr-card:hover, .faq details:hover, .faq details[open], .intent-card:hover {
  border-color: rgba(154, 220, 247, 0.42);
  box-shadow: var(--shadow), 0 0 38px rgba(154, 220, 247, 0.12), 0 0 24px rgba(255, 125, 101, 0.08);
  transform: translateY(-2px);
}
.photo-showcase { padding: 10px; }
.hero-photo, .about-photo {
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
}
.hero-photo { aspect-ratio: 4 / 3; }
.about-photo { aspect-ratio: 4 / 3; }
.hero-photo img, .about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}
.principal-photo img { object-position: center 44%; }
.photo-caption {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  justify-content: space-between;
  padding: 10px 4px 2px;
  color: var(--muted);
  font-size: 0.82rem;
}
.photo-caption strong { color: var(--ink); }
.service-showcase {
  display: grid;
  gap: 18px;
  align-content: center;
  justify-items: start;
  min-height: 280px;
  padding: 22px;
}
.service-icon-xl, .soft-icon {
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--line-blue);
  border-radius: 12px;
  color: var(--miami-blue);
  background: linear-gradient(145deg, rgba(154, 220, 247, 0.16), rgba(255, 255, 255, 0.08));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
}
.service-icon-xl { width: 54px; height: 54px; }
.soft-icon { width: 44px; height: 44px; }
.service-icon-xl .icon { width: 28px; height: 28px; }
.soft-icon .icon { width: 22px; height: 22px; }
.showcase-logo {
  width: min(100%, 330px);
  height: 134px;
  padding: 14px;
}
.service-showcase p {
  margin: 0;
  color: var(--ink-soft);
  font-weight: 850;
}

.trust-strip {
  display: grid;
  gap: 10px;
  width: min(1180px, calc(100% - 36px));
  margin: -20px auto 0;
  position: relative;
  z-index: 2;
}
.trust-strip article {
  display: grid;
  min-height: 74px;
  align-content: center;
  gap: 2px;
  border: 1px solid var(--glass-line);
  border-radius: 14px;
  padding: 14px 16px 14px 32px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px) saturate(135%);
  -webkit-backdrop-filter: blur(18px) saturate(135%);
  position: relative;
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}
.trust-strip article span {
  position: absolute;
  left: 14px;
  top: 22px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--gold);
}
.trust-strip strong { color: var(--ink); font-size: 0.95rem; }
.trust-strip small { color: var(--muted); font-weight: 700; }

.section {
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
  padding: 60px 0;
}
.section-heading {
  max-width: 760px;
  margin-bottom: 24px;
}
.section-heading.center {
  margin-inline: auto;
  text-align: center;
}
.section-heading p, .about-copy p, .coverage-card p, .detail-card p, .why-copy p, .franchise-copy p, .quote-copy p, .legal-copy p, .notice-card p, .service-cta p {
  color: var(--muted);
}

.about-panel {
  display: grid;
  gap: 28px;
  align-items: center;
}
.about-copy { max-width: 620px; }
.about-media {
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  padding: 10px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.06));
  box-shadow: var(--shadow);
  backdrop-filter: blur(20px) saturate(135%);
  -webkit-backdrop-filter: blur(20px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.coverage-section {
  width: 100%;
  max-width: none;
  padding-inline: max(18px, calc((100vw - 1180px) / 2));
  background: linear-gradient(180deg, rgba(12, 31, 47, 0.78), rgba(6, 17, 31, 0.24));
}
.coverage-grid {
  display: grid;
  gap: 14px;
}
.coverage-card, .detail-card, .process-grid article, .why-grid article, .quote-form, .notice-card, .intent-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.055));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px) saturate(135%);
  -webkit-backdrop-filter: blur(18px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}
.coverage-card::before, .detail-card::before, .process-grid article::before, .why-grid article::before, .quote-form::before, .notice-card::before, .intent-card::before,
.service-cta::before, .callout::before, .qr-card::before, .faq details::before {
  content: "";
  position: absolute;
  inset: 1px 1px auto;
  height: 48%;
  border-radius: inherit;
  pointer-events: none;
  background:
    radial-gradient(circle at 16% 18%, rgba(255, 255, 255, 0.16), transparent 18%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0));
  opacity: 0.86;
  z-index: -1;
}
.coverage-card:hover::before, .detail-card:hover::before, .process-grid article:hover::before, .why-grid article:hover::before, .quote-form:hover::before,
.notice-card:hover::before, .intent-card:hover::before, .service-cta:hover::before, .callout:hover::before, .qr-card:hover::before, .faq details:hover::before, .faq details[open]::before {
  opacity: 1;
}
.coverage-card {
  display: grid;
  min-height: 250px;
  gap: 12px;
  padding: 18px;
  scroll-margin-top: 140px;
}
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.card-top a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--clay);
  font-size: 0.82rem;
  font-weight: 950;
  text-decoration: none;
}
.card-top a:hover { color: var(--gold); }
.card-top a .icon { width: 14px; height: 14px; }
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: auto;
}
.tag-row span, .link-pills a {
  border: 1px solid var(--glass-line);
  border-radius: 999px;
  padding: 7px 9px;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.78rem;
  font-weight: 850;
  backdrop-filter: blur(12px) saturate(135%);
  -webkit-backdrop-filter: blur(12px) saturate(135%);
}
.coverage-link-rail {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 960px;
  margin: 22px auto 0;
  justify-content: center;
}
.coverage-link-rail a {
  scroll-margin-top: 140px;
  border: 1px solid var(--glass-line);
  border-radius: 999px;
  padding: 9px 12px;
  color: var(--ink);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.11), rgba(154, 220, 247, 0.07));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 12px 28px rgba(0, 0, 0, 0.20);
  font-size: 0.82rem;
  font-weight: 900;
  text-decoration: none;
  backdrop-filter: blur(14px) saturate(135%);
  -webkit-backdrop-filter: blur(14px) saturate(135%);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}
.coverage-link-rail a:hover, .coverage-link-rail a:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(154, 220, 247, 0.44);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: var(--shadow-soft), 0 0 28px rgba(154, 220, 247, 0.14);
}
.process-section {
  border-top: 1px solid var(--glass-line);
}
.process-grid, .detail-grid, .why-grid, .intent-grid {
  display: grid;
  gap: 14px;
}
.process-grid article, .detail-card, .why-grid article, .intent-card {
  padding: 20px;
}
.process-grid article span {
  display: inline-grid;
  width: 34px;
  height: 34px;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 11px;
  color: #06111F;
  background: linear-gradient(135deg, rgba(244, 201, 107, 0.95), rgba(255, 161, 132, 0.7));
  font-weight: 950;
}
.detail-card {
  min-height: 230px;
}
.detail-card h3 { margin-top: 16px; }
.search-intent-panel {
  padding-top: 18px;
}
.intent-card {
  min-height: 178px;
}
.intent-card h3 {
  color: var(--ink);
  margin-bottom: 10px;
}
.intent-card p {
  margin-bottom: 0;
  color: var(--muted);
}

.why-panel {
  display: grid;
  gap: 24px;
  border-radius: 22px;
  padding: 34px;
  color: var(--ink);
  border: 1px solid var(--glass-line);
  background: linear-gradient(135deg, rgba(16, 40, 58, 0.92), rgba(9, 28, 45, 0.92) 58%, rgba(15, 52, 38, 0.86));
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px) saturate(135%);
  -webkit-backdrop-filter: blur(22px) saturate(135%);
}
.why-panel h2, .why-panel h3, .why-panel p { color: var(--ink); }
.why-panel .kicker { color: #F4B69C; }
.why-grid article {
  border-color: var(--glass-line);
  background: rgba(255, 255, 255, 0.09);
  box-shadow: none;
}
.why-grid p { opacity: 0.84; }

.franchise-panel {
  display: grid;
  gap: 24px;
  align-items: center;
}
.franchise-card {
  min-height: 230px;
  padding: 20px;
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.franchise-logo-stack {
  grid-template-columns: minmax(0, 1fr) 112px;
  gap: 16px;
  background: rgba(255, 255, 255, 0.96);
}
.franchise-logo-main, .franchise-logo-original {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}
.franchise-logo-original {
  max-height: 178px;
  border-left: 1px solid rgba(6, 17, 31, 0.12);
  padding-left: 12px;
}

.quote-panel {
  display: grid;
  gap: 28px;
  align-items: start;
}
.quote-copy { max-width: 580px; }
.callout {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 20px;
  border: 1px solid var(--line-blue);
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(145deg, rgba(154, 220, 247, 0.13), rgba(255, 255, 255, 0.06));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px) saturate(135%);
  -webkit-backdrop-filter: blur(16px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.callout .icon {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  color: var(--clay);
}
.callout p { margin: 0; }
.qr-card {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  margin-top: 14px;
  border: 1px solid var(--glass-line);
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.055));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px) saturate(135%);
  -webkit-backdrop-filter: blur(16px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.qr-card img {
  width: 132px;
  height: 132px;
  object-fit: contain;
  border-radius: 10px;
  background: #FFFFFF;
}
.qr-card p { margin: 0; font-size: 0.9rem; }
.quote-form {
  display: grid;
  gap: 14px;
  padding: 20px;
}
.quote-form label {
  display: grid;
  gap: 7px;
  color: var(--ink);
  font-size: 0.9rem;
  font-weight: 900;
}
.quote-form input, .quote-form select, .quote-form textarea {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--glass-line);
  border-radius: 14px;
  padding: 11px 12px;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.075);
  font: inherit;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}
.quote-form input::placeholder, .quote-form textarea::placeholder {
  color: rgba(233, 241, 250, 0.58);
}
.quote-form textarea { resize: vertical; }
.quote-form input:focus, .quote-form select:focus, .quote-form textarea:focus {
  border-color: rgba(255, 209, 140, 0.66);
  background: rgba(255, 255, 255, 0.11);
  box-shadow: 0 0 0 4px rgba(255, 209, 140, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.16);
}
.quote-form [aria-invalid="true"] {
  border-color: var(--coral);
  box-shadow: 0 0 0 4px rgba(255, 125, 101, 0.14);
}
.form-disclaimer, .form-status {
  margin: 0;
  font-size: 0.88rem;
}
.form-status {
  min-height: 22px;
  color: var(--ink);
  font-weight: 850;
}
.honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.service-cta {
  display: grid;
  gap: 18px;
  align-items: center;
  border: 1px solid var(--glass-line);
  border-radius: 20px;
  padding: 26px;
  background: linear-gradient(135deg, rgba(22, 58, 43, 0.82), rgba(12, 36, 54, 0.82));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(20px) saturate(135%);
  -webkit-backdrop-filter: blur(20px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.related-links { padding-top: 18px; }
.link-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}
.link-pills a {
  color: var(--ink);
  text-decoration: none;
}
.faq-list {
  display: grid;
  gap: 10px;
}
.faq details {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--glass-line);
  border-radius: 16px;
  padding: 16px 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.045));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px) saturate(135%);
  -webkit-backdrop-filter: blur(16px) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}
.faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  color: var(--ink);
  font-weight: 950;
}
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after {
  content: "+";
  display: inline-grid;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 999px;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.10);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: transform 180ms ease, background 180ms ease;
}
.faq details[open] summary::after {
  content: "-";
  transform: rotate(180deg);
  background: rgba(154, 220, 247, 0.14);
}
.faq details p { max-width: 860px; color: var(--muted); }
.final-cta {
  margin-top: 28px;
  padding: 58px 18px;
  text-align: center;
  border-top: 1px solid var(--glass-line);
  border-bottom: 1px solid var(--glass-line);
  background: linear-gradient(135deg, rgba(6, 17, 31, 0.98), rgba(10, 31, 47, 0.96));
}
.final-cta h2, .final-cta p { color: var(--ink); }
.final-cta > div {
  max-width: 780px;
  margin: 0 auto;
}
.final-cta .kicker { color: #F4B69C; }
.final-cta .cta-row { margin-inline: auto; }
.legal-copy { max-width: 880px; }
.legal-copy h2 {
  margin-top: 28px;
  font-size: 1.46rem;
}
.privacy-safe { padding-top: 0; }
.notice-card { padding: 24px; }
.site-footer {
  color: var(--ink);
  background: #050D18;
}
.footer-shell {
  display: grid;
  gap: 28px;
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
  padding: 42px 0;
}
.footer-logo {
  margin-bottom: 0;
  padding: 6px;
}
.footer-logo-pair {
  display: grid;
  grid-template-columns: minmax(0, 220px) 74px;
  gap: 10px;
  align-items: stretch;
  margin-bottom: 14px;
}
.footer-logo-banner {
  width: min(100%, 220px);
  height: 106px;
}
.footer-logo-original {
  width: 74px;
  height: 106px;
}
.site-footer h2 {
  color: var(--ink);
  font-family: inherit;
  font-size: 1.06rem;
}
.site-footer p, .site-footer a { color: #EAF6FA; }
.site-footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.site-footer li { margin: 7px 0; }
.footer-note { max-width: 460px; }

[data-reveal] {
  opacity: 1;
  transform: none;
  filter: saturate(1);
  transition:
    opacity 820ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 820ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 820ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}
.motion-ready [data-reveal] {
  opacity: 0.82;
  transform: translate3d(0, 28px, 0) scale(0.982);
  filter: saturate(0.88);
}
.motion-ready [data-reveal="card"] {
  opacity: 0.86;
  transform: translate3d(0, 22px, 0) scale(0.972);
}
.motion-ready [data-reveal="left"] {
  opacity: 0.86;
  transform: translate3d(-18px, 22px, 0) scale(0.986);
}
.motion-ready [data-reveal="right"] {
  opacity: 0.86;
  transform: translate3d(18px, 22px, 0) scale(0.986);
}
.motion-ready [data-reveal].is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
  filter: saturate(1);
}

@media (min-width: 640px) {
  .cta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .trust-strip, .coverage-grid, .process-grid, .detail-grid, .why-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .intent-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .quote-form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 24px;
  }
  .quote-form .wide { grid-column: 1 / -1; }
}

@media (min-width: 1040px) {
  .header-shell {
    display: grid;
    grid-template-columns: auto minmax(230px, 1fr) max-content;
    grid-template-areas:
      "brand ticker actions"
      "nav nav nav";
    width: min(1220px, calc(100% - 44px));
    gap: 16px;
    row-gap: 8px;
    padding: 10px 0 12px;
  }
  .brand-lockup { grid-area: brand; }
  .trust-ticker {
    grid-area: ticker;
    grid-column: auto;
    align-self: center;
  }
  .brand-logo { width: 140px; height: 66px; }
  .brand-copy { display: block; }
  .menu-toggle, .mobile-call { display: none; }
  .site-nav {
    display: flex;
    grid-area: nav;
    grid-column: auto;
    justify-content: center;
    gap: 2px;
    padding-top: 0;
  }
  .site-nav a {
    min-height: 38px;
    padding: 8px 9px;
    font-size: 0.84rem;
  }
  .header-actions {
    display: inline-flex;
    grid-area: actions;
    align-items: center;
    justify-self: end;
    gap: 8px;
    flex: 0 0 auto;
    min-width: max-content;
  }
  .header-call {
    min-width: 128px;
    flex: 0 0 auto;
    border: 1px solid var(--glass-line);
    padding: 8px 12px;
    font-size: 0.88rem;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 12px 30px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(16px) saturate(135%);
    -webkit-backdrop-filter: blur(16px) saturate(135%);
  }
  .hero {
    grid-template-columns: minmax(0, 0.95fr) minmax(420px, 0.9fr);
    align-items: center;
    min-height: 640px;
    padding-top: 66px;
    padding-bottom: 72px;
  }
  h1 { font-size: 4.6rem; }
  h2 { font-size: 2.65rem; }
  .hero-lead { font-size: 1.18rem; }
  .hero-photo { aspect-ratio: 1.02 / 1; }
  .trust-strip {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: -34px;
  }
  .about-panel, .quote-panel, .franchise-panel {
    grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1fr);
  }
  .quote-panel {
    grid-template-columns: minmax(0, 0.82fr) minmax(440px, 1fr);
  }
  .qr-card {
    grid-template-columns: 180px minmax(0, 1fr);
    padding: 18px;
  }
  .qr-card img {
    width: 180px;
    height: 180px;
  }
  .coverage-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .process-grid, .detail-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .detail-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .intent-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .why-panel {
    grid-template-columns: minmax(0, 0.88fr) minmax(460px, 1fr);
    padding: 44px;
  }
  .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .service-cta {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .footer-shell {
    grid-template-columns: 1.25fr 1fr 1fr;
    padding: 54px 0;
  }
}

@media (min-width: 1220px) {
  .section { padding-top: 76px; padding-bottom: 76px; }
}

@media (max-width: 430px) {
  .header-shell { width: min(100% - 20px, 1180px); gap: 7px; }
  .brand-logo { width: 98px; height: 48px; }
  .mobile-call { padding-inline: 8px; font-size: 0.78rem; }
  .mobile-call span { white-space: nowrap; }
  .hero { padding-top: 30px; padding-bottom: 34px; }
  h1 { font-size: 2.34rem; }
  h2 { font-size: 1.7rem; }
  .hero-lead { font-size: 1rem; }
  .section, .trust-strip, .footer-shell { width: min(100% - 28px, 1180px); }
  .coverage-section { padding-inline: 14px; }
  .coverage-card, .detail-card, .process-grid article, .why-grid article, .quote-form { padding: 18px; }
  .intent-card { padding: 18px; min-height: 0; }
  .why-panel { padding: 24px; }
  .trust-ticker {
    margin-top: 2px;
    mask-image: linear-gradient(90deg, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%);
  }
  .trust-track a { font-size: 0.72rem; }
  .qr-card { grid-template-columns: 96px minmax(0, 1fr); }
  .qr-card img { width: 96px; height: 96px; }
  .franchise-logo-stack { grid-template-columns: minmax(0, 1fr); }
  .franchise-logo-original {
    max-height: 110px;
    border-left: 0;
    border-top: 1px solid rgba(6, 17, 31, 0.12);
    padding: 12px 0 0;
  }
  .footer-logo-pair { grid-template-columns: minmax(0, 190px) 64px; }
  .footer-logo-banner { height: 92px; }
  .footer-logo-original { width: 64px; height: 92px; }
  .motion-ready [data-reveal], .motion-ready [data-reveal="card"], .motion-ready [data-reveal="left"], .motion-ready [data-reveal="right"] {
    opacity: 0.9;
    transform: translate3d(0, 18px, 0) scale(0.99);
    filter: saturate(0.94);
  }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
  .motion-ready [data-reveal], [data-reveal] {
    opacity: 1;
    transform: none;
    filter: none;
  }
  .button:hover, .faq details:hover { transform: none; }
  .trust-track { animation: none; }
}
`;
}

function jsSource() {
  return `const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.getAttribute("data-open") === "true";
    siteNav.setAttribute("data-open", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = Math.min(index * 35, 160) + "ms";
      observer.observe(item);
    });
  }
}

function markValidity(field) {
  if (!field || !("checkValidity" in field)) return;
  const shouldMark = field.matches("input, select, textarea") && field.required;
  if (shouldMark) field.setAttribute("aria-invalid", String(!field.checkValidity()));
}

document.querySelectorAll("[data-quote-form]").forEach((form) => {
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    field.addEventListener("blur", () => markValidity(field));
    field.addEventListener("input", () => markValidity(field));
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const honeypot = form.querySelector('[name="companyWebsite"]');
    fields.forEach(markValidity);
    if (honeypot && honeypot.value) {
      if (status) status.textContent = "Thanks. The request has been received.";
      form.reset();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = "Please complete the required contact fields before sending.";
      return;
    }
    if (status) status.textContent = "Opening the secure quote form...";
    window.location.assign(form.dataset.quoteDestination || form.action);
  });
});
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${pageUrl(page.slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.slug ? "0.8" : "1.0"}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

function llmsTxt() {
  return `# Your Family First Insurance Office #3

> Local Miami insurance office website for quote-help discovery. This file is intended for AI assistants, search systems, and crawlers summarizing public website facts.

Official site: ${siteUrl}
Business name: ${businessName}
Phone: ${phoneDisplay}
Address: ${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}
Primary local area: West Flagler Miami and Miami-Dade, Florida

## Public Pages

- Home: ${siteUrl}/
- Auto insurance: ${siteUrl}/auto-insurance/
- Home insurance: ${siteUrl}/home-insurance/
- Commercial insurance: ${siteUrl}/commercial-insurance/
- Life insurance: ${siteUrl}/life-insurance/
- Renters insurance: ${siteUrl}/renters-insurance/
- About Office #3: ${siteUrl}/about-office-3/
- Get quote help: ${siteUrl}/get-a-quote/
- Privacy policy: ${siteUrl}/privacy-policy/
- Terms and insurance disclaimer: ${siteUrl}/terms/

## Safe Summary

Your Family First Insurance Office #3 helps Miami families and local businesses compare auto, home, homeowners, renters, condo, flood, motorcycle, boat, RV, general liability, business, commercial, workers compensation, life, and health insurance quote options. The site uses official franchise identification and real Office #3 imagery supplied for the project.

## Important Boundaries

- Do not infer guaranteed pricing, guaranteed savings, instant approval, or bound coverage from this website.
- Do not infer unauthorized carrier partnerships, endorsements, awards, reviews, or ratings.
- Do not ask users to submit SSNs, dates of birth, driver license numbers, VINs, payment information, medical records, claim files, passwords, or carrier credentials through a general website form.
- Quote availability, coverage, pricing, and eligibility vary by carrier, underwriting, location, and applicant information.
- ConsumerRateQuotes account ID 64868 is the connected quote path for Office #3.
`;
}

function humansTxt() {
  return `# humans.txt

Site: ${siteUrl}
Business: ${businessName}
Office phone: ${phoneDisplay}
Location: ${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}

Build: Static HTML/CSS/JS generated into dist and served by a Node.js 22 Express server for GoDaddy Beta Apps.
Brand note: Official franchise logo/sign must remain unchanged.
Privacy note: The quote form opens the secure ConsumerRateQuotes intake URL provided for Office #3 after local required-field validation.
Quote path: ConsumerRateQuotes account ID 64868.
`;
}

function apacheHtaccess() {
  return `<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self'; connect-src 'self'; upgrade-insecure-requests"
</IfModule>

Options -Indexes

Redirect 301 /renters-condo-insurance/ /renters-insurance/
`;
}

function auditReport() {
  return `# YFFI Office #3 Site Audit

Generated by the static site build for ${businessName}.

## Design Reference

- Redesign uses a darker liquid-glass Lovable-style section rhythm inspired by miamicarinsurance.net.
- Risky reference-site items were not copied: fake carrier counts, fake reviews, tracking pixels, and unapproved savings language.
- Real YFFI3 assets are used instead of generated people or stock photography.

## Compliance and Brand

- Official franchise logo/sign is loaded from \`${logoSrc}\`.
- Logo/sign is displayed with \`object-fit: contain\`, no CSS filter, and no transform.
- Logo/sign appears in the header, service hero panels, franchise section, and footer.
- The family/office photo is loaded from \`${familyPhotoSrc}\` with a WebP version at \`${familyWebpSrc}\`.
- The site does not create a new logo, fake AI family image, fake review, fake award, or fake partnership.
- Copy avoids price guarantees, approval promises, and unauthorized carrier promises.

## UX and Design

- Homepage uses a sticky glass header, dark liquid hero, trust strip, real office image, glass coverage cards, process section, local office section, official franchise badge, connected quote form, FAQ, final CTA, and footer.
- Service pages include richer Miami search-intent panels, local topic cards, expanded FAQs, and safer product-specific quote guidance.
- Above-the-fold CTAs include "Get My Free Quote" and "Call ${phoneDisplay}."
- Mobile navigation is collapsible and the phone number remains visible.
- Scroll reveal effects are implemented with IntersectionObserver and disabled for reduced-motion users.
- Typography uses fixed breakpoint sizes rather than viewport-scaled font sizing.

## Local SEO and AI Findability

- Domain: ${siteUrl}
- NAP: ${businessName}, ${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}, ${phoneDisplay}.
- Local relevance includes West Flagler Miami, Miami-Dade, Miami, Kendall, Hialeah, Cutler Bay, Homestead, and Florida.
- Every page has a title tag, meta description, Open Graph tags, canonical URL, semantic HTML, and JSON-LD.
- Homepage includes InsuranceAgency schema. Internal pages include breadcrumb schema. Service pages include Service schema. FAQ schema is present on pages with FAQs.
- Robots.txt allows major search and AI crawlers and points to the sitemap.
- llms.txt and humans.txt provide AI-readable and human-readable public site facts.

## Privacy and Security

- Quote form uses required frontend validation and a hidden honeypot anti-spam field before opening ${quoteDestination}.
- Quote form warns users not to send SSNs, DOBs, driver license numbers, VINs, payment data, claims, medical records, passwords, or credentials.
- Static hosting does not store quote form submissions; completed requests continue on the provided ConsumerRateQuotes intake path.
- ConsumerRateQuotes account ID 64868 was confirmed by the owner as the Office #3 intake path.
- \`server.js\` serves the built \`dist/\` folder with Express and sets baseline browser security headers for the GoDaddy Beta Apps Node.js runtime.
- \`.htaccess\` remains in the static export only as a harmless fallback artifact for Apache-style static hosting.
- No analytics, ad pixels, API keys, SMTP credentials, or third-party scripts are added by this build.

## Public Visibility

- GoDaddy Beta Apps installs the repository, runs the build command, then starts \`server.js\` to serve the built \`dist/\` folder.
- Source files, tests, and \`node_modules/\` should not be manually uploaded or committed.
- Search engines and AI crawlers can discover the site after DNS points to the live app, the app is published, and crawlers revisit the domain.
- Ranking is not instant. Google, Bing, Perplexity, and AI search systems may take time to crawl, index, and trust new or updated pages.
`;
}

function authorizationRequests() {
  return `# Permission Requests Needed

## Connected Right Now

- Local build access: CONNECTED
- Local Playwright visual QA: CONNECTED
- GoDaddy Beta Apps Node-ready output generation: CONNECTED
- Express production server: CONNECTED
- ConsumerRateQuotes account ID \`64868\`: CONNECTED AND CONFIRMED BY OWNER

## Needed to Publish

1. GoDaddy Beta Apps access for the \`github-import\` Node.js 22 app: NEEDS HUMAN LOGIN.
2. Permission to connect the GitHub repository and deploy the selected branch: NEEDS OWNER APPROVAL.
3. Permission to run \`pnpm install --frozen-lockfile\`, \`pnpm run build\`, and \`pnpm start\` in GoDaddy Beta Apps: NEEDS HOSTING ACCESS.
4. Final business approval that the address, phone number, service areas, privacy page, terms page, QR code, and Office #3 wording are accurate: NEEDS HUMAN CONFIRMATION.

## Live Form Collection Status

1. ConsumerRateQuotes intake URL is wired in the site: \`${quoteDestination}\`.
2. Account ID \`64868\` was confirmed by the owner as belonging to Office #3 and routing leads correctly.
3. Keep internal retention/privacy handling aligned with the office's approved lead process.
4. Confirm whether SMS texting is approved for the business phone number ${phoneDisplay}.

## Optional Connectors

- Lovable: OPTIONAL. Needed only if you want an external Lovable project/editor version. The local repo has no Lovable export files.
- GitHub: REQUIRED FOR BETA APPS GITHUB DEPLOYMENT. Needed to push this committed repo to the branch selected in GoDaddy.
- GoDaddy: REQUIRED TO PUBLISH. Human login is required to configure GitHub Repository, Preview, and Publish to Live in Beta Apps.
- Google Search Console and Bing Webmaster Tools: RECOMMENDED AFTER PUBLISHING to submit the sitemap.
`;
}

function seoNotes() {
  return `# SEO and AI Findability Notes

## Implemented

- Dark liquid-glass Lovable-style mobile-first static website with direct first screen, visible phone number, and quote CTAs.
- Local copy for West Flagler Miami and Miami-Dade.
- Dedicated pages for home, auto insurance, homeowners insurance, commercial insurance, life insurance, renters and condo insurance, about, quote, privacy, and terms.
- Service pages include Miami search-intent topic panels and expanded customer-facing FAQs for local, product-specific searches.
- InsuranceAgency, Service, FAQPage, and BreadcrumbList schema where appropriate.
- Robots.txt allows Google, Bing, OpenAI, and Perplexity crawler user agents.
- Sitemap includes every generated public page.
- llms.txt and humans.txt provide AI-readable and human-readable public site facts.
- Internal links connect service pages, quote page, and footer navigation.
- Security/privacy defaults avoid third-party scripts and warn users against sending sensitive information.

## Best Next SEO Actions

1. Verify the exact Google Business Profile and match NAP, hours, categories, and website URL to the site.
2. Add only verified social/listing profile URLs to the footer.
3. Add real office hours once confirmed by the business.
4. Test the connected ConsumerRateQuotes intake URL in production and confirm lead delivery.
5. Add real, permissioned customer review snippets only if they are sourced and allowed by platform rules.
6. Add original local content over time: West Flagler insurance FAQs, hurricane-season insurance preparation, business certificate guidance, and Miami-Dade driver/homeowner guides.
7. Submit the sitemap in Google Search Console and Bing Webmaster Tools after GoDaddy Beta Apps deployment.
8. Monitor Search Console queries for Miami, West Flagler, auto, homeowners, commercial, life, renters, condo, and business insurance terms.
`;
}

function deploymentGuide() {
  return `# GoDaddy Beta Apps Deployment Guide

This repo is prepared for the GoDaddy Beta Apps Node.js 22 flow shown as the \`github-import\` app.

## Required GoDaddy Settings

- Runtime: Node.js 22
- Source: GitHub Repository
- Branch: \`main\`
- Install command: \`pnpm install --frozen-lockfile\`
- Build command: \`pnpm run build\`
- Start command: \`pnpm start\`
- Output folder: \`dist\`
- Port: use GoDaddy's assigned \`PORT\`; local fallback is \`3000\`

## Local Build Command

\`\`\`bash
pnpm run build
\`\`\`

The production output folder is:

\`\`\`text
dist/
\`\`\`

## GoDaddy Beta Apps Steps

1. Push this committed repo to GitHub on the selected branch.
2. In GoDaddy Beta Apps, open the \`github-import\` Node.js 22 app.
3. Change Source from Folder Upload to GitHub Repository using \`Configure GitHub Repository\`.
4. Select the GitHub repo and branch \`main\`.
5. Set the install, build, start, and output folder fields exactly as shown above.
6. Use Preview first. Confirm the preview loads, then use Publish to Live.
7. Test desktop and mobile:
    - Official logo/sign is visible and not stretched.
    - Family/office photo is the real Office #3 photo.
    - Phone links call \`${phoneDisplay}\`.
    - \`Get My Free Quote\` opens the connected quote path.
    - Quote form validates required fields and opens \`${quoteDestination}\`.
    - Footer links, \`robots.txt\`, \`sitemap.xml\`, \`llms.txt\`, and \`humans.txt\` open.

## Production Server

\`server.js\` serves the built \`dist/\` folder using Express:

- \`process.env.PORT || 3000\`
- static routes for every generated page folder
- \`/healthz\` health check
- baseline browser security headers
- no \`.env\` secrets required

## Manual Confirmation Before Publishing

- Confirm the listed address is still correct: ${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}.
- Confirm \`${phoneDisplay}\` is the correct public office number and SMS use is approved.
- Confirm the QR code is approved for this office before relying on it.
- ConsumerRateQuotes account ID \`64868\` was owner-confirmed as the Office #3 lead route; test one live inquiry after publishing.
- Confirm franchise/business approval before adding carrier names, reviews, discounts, awards, or testimonials.
`;
}

function ensureAssetNotice() {
  const assetDir = path.join(root, "public", "assets", "yffi3");
  fs.mkdirSync(assetDir, { recursive: true });
  writeFile(path.join(assetDir, "README.md"), `# Required approved assets

Place the approved Office #3 assets in this folder before publishing:

- yffi3-official-franchise-logo.png
- yffi3-family-office-photo.jpg
- yffi3-family-office-photo.webp
- yffi3-principal-agent-ariel-busutil.jpg
- yffi3-original-franchise-logo.png
- yffi3-quote-qr.jpeg

Do not replace these with generated images or a redesigned logo. The HTML references these exact files as brand/compliance assets.
`);
}

function copyPublicAssetsForPreview() {
  const fromDir = path.join(root, "public", "assets");
  const toDir = path.join(root, "assets");
  fs.mkdirSync(toDir, { recursive: true });
  if (!fs.existsSync(fromDir)) return;
  fs.cpSync(fromDir, toDir, { recursive: true });
}

function generate() {
  for (const page of pages) {
    const html = pageHtml(page);
    const lower = html.toLowerCase();
    for (const phrase of redFlagPhrases) {
      if (lower.includes(phrase)) throw new Error(`Unsafe phrase found in ${page.slug || "home"}: ${phrase}`);
    }
    writeFile(pagePath(page.slug), html);
  }
  writeFile(path.join(root, "assets", "styles.css"), cssSource());
  writeFile(path.join(root, "assets", "site.js"), jsSource());
  writeFile(path.join(root, "robots.txt"), robotsTxt());
  writeFile(path.join(root, "sitemap.xml"), sitemapXml());
  writeFile(path.join(root, "llms.txt"), llmsTxt());
  writeFile(path.join(root, "humans.txt"), humansTxt());
  writeFile(path.join(root, ".htaccess"), apacheHtaccess());
  writeFile(path.join(root, "AUDIT_REPORT.md"), auditReport());
  writeFile(path.join(root, "DEPLOYMENT_AUTHORIZATION_REQUESTS.md"), authorizationRequests());
  writeFile(path.join(root, "SEO_AI_FINDABILITY_NOTES.md"), seoNotes());
  writeFile(path.join(root, "DEPLOYMENT.md"), deploymentGuide());
  ensureAssetNotice();
  copyPublicAssetsForPreview();
}

generate();
