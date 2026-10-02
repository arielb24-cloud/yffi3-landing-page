import fs from "node:fs";
import path from "node:path";
import carouselMediaModule from "../src/data/carouselMedia.js";
import googleReviewsModule from "../src/data/googleReviews.js";
import retentionPagesModule from "../src/data/retentionPages.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const { carouselMediaByPage } = carouselMediaModule;
const { googleReviews: recordedGoogleReviews, googleReviewSnapshot } = googleReviewsModule;
// The office owner rating should not be presented as customer feedback.
const googleReviews = recordedGoogleReviews.filter((review) => review.authorName !== "Ariel Busutil");
const { retentionPages } = retentionPagesModule;
const siteUrl = "https://yourfamilyfirstinsurance3.com";
const phoneDisplay = "305-910-8850";
const phoneHref = "tel:13059108850";
const smsHref = "sms:+13059108850";
const businessName = "Your Family First Insurance Office #3";
const brandName = "Your Family First Insurance";
const googleTagManagerId = "GTM-5FZCMM3V";
const logoSrc = "/assets/yffi3/yffi3-official-franchise-logo.png";
const logoPreloadSrc = "/assets/yffi3/yffi3-official-franchise-logo-240.webp";
const originalFranchiseLogoSrc = "/assets/yffi3/yffi3-original-franchise-logo.png";
const familyPhotoSrc = "/assets/yffi3/yffi3-family-office-photo.jpg";
const familyWebpSrc = "/assets/yffi3/yffi3-family-office-photo.webp";
const principalPhotoSrc = "/assets/yffi3/yffi3-principal-agent-ariel-busutil.jpg";
const principalWebpSrc = "/assets/yffi3/yffi3-principal-agent-ariel-busutil-720.webp";
const qrSrc = "/assets/yffi3/yffi3-quote-qr.jpeg";
const qrWebpSrc = "/assets/yffi3/yffi3-quote-qr-240.webp";
const googleReviewQrSrc = "/assets/yffi3/google-review-qr.png";
const quoteDestination = "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868";
const googleReviewUrl = "https://g.page/r/CfCEW-Ye4vpMEAE/review";
const brandUrl = "https://yourfamilyfirstinsurance.com/";
const facebookUrl = "https://www.facebook.com/YourFamilyFirstInsurance";
const googleMapsUrl = "https://www.google.com/maps/place/Your+Family+First+Insurance/data=!4m2!3m1!1s0x0:0x4cfae21ee65b84f0";
const contentReviewedDate = "2026-10-02";
const serviceVisuals = {
  "auto-insurance": {
    slides: [
      { webp: "service-auto-slide-1.webp", fallback: "service-auto-slide-1.jpg", alt: "Miami auto insurance visual with a premium car on a palm-lined city street" },
      { webp: "service-auto-slide-4.jpg", fallback: "service-auto-slide-4.jpg", alt: "Auto insurance visual showing a warm palm-lined street with cars at sunset" },
      { webp: "service-auto-slide-3.webp", fallback: "service-auto-slide-3.jpg", alt: "Auto insurance visual showing a family vehicle at a Florida-style home" }
    ],
    motionVideo: "service-auto-motion.webm",
    motionGif: "service-auto-motion.gif",
    motionAlt: "Animated auto insurance motion loop showing premium Miami vehicle coverage visuals",
    label: "Auto Insurance",
    shortLabel: "Auto",
    scene: "Miami commute visual",
    alt: "Photographic Miami auto insurance gallery showing a modern car, coastal roadway details, and refined dashboard lighting",
    icon: "car",
    accent: "#9ADCF7",
    accent2: "#FFA184",
    accent3: "#F4C96B"
  },
  "home-insurance": {
    slides: [
      { webp: "service-homeowners-slide-1.webp", fallback: "service-homeowners-slide-1.jpg", alt: "Homeowners insurance visual showing a Florida home with palm trees and warm exterior lighting" },
      { webp: "service-homeowners-slide-2.webp", fallback: "service-homeowners-slide-2.jpg", alt: "Homeowners insurance visual showing roofline and exterior details on a modern Florida home" },
      { webp: "service-homeowners-slide-3.webp", fallback: "service-homeowners-slide-3.jpg", alt: "Homeowners insurance visual showing a calm living room with Miami natural light" }
    ],
    motionVideo: "service-homeowners-motion.webm",
    motionGif: "service-homeowners-motion.gif",
    motionAlt: "Animated homeowners insurance motion loop showing premium Florida home coverage visuals",
    label: "Homeowners Insurance",
    shortLabel: "Homeowners",
    scene: "Florida home visual",
    alt: "Photographic homeowners insurance gallery showing a Florida-style home exterior, roofline details, and warm entry lighting",
    icon: "home",
    accent: "#86CFA0",
    accent2: "#F4C96B",
    accent3: "#9ADCF7"
  },
  "commercial-insurance": {
    slides: [
      { webp: "service-commercial-slide-1.webp", fallback: "service-commercial-slide-1.jpg", alt: "Commercial insurance visual showing a polished Miami business storefront" },
      { webp: "service-commercial-slide-2.webp", fallback: "service-commercial-slide-2.jpg", alt: "Commercial insurance visual showing a professional office conference room" },
      { webp: "service-commercial-slide-3.webp", fallback: "service-commercial-slide-3.jpg", alt: "Commercial auto insurance visual showing business vehicles at a modern workspace" }
    ],
    motionVideo: "service-commercial-motion.webm",
    motionGif: "service-commercial-motion.gif",
    motionAlt: "Animated commercial insurance motion loop showing premium Miami business coverage visuals",
    label: "Commercial Insurance",
    shortLabel: "Commercial",
    scene: "Business coverage visual",
    alt: "Photographic commercial insurance gallery showing a Miami office storefront, business desk details, and polished workspace protection",
    icon: "building",
    accent: "#F4C96B",
    accent2: "#9ADCF7",
    accent3: "#FFA184"
  },
  "life-insurance": {
    slides: [
      { webp: "service-life-slide-1.webp", fallback: "service-life-slide-1.jpg", alt: "Life insurance visual showing planning notes and a calm home workspace" },
      { webp: "service-life-slide-2.webp", fallback: "service-life-slide-2.jpg", alt: "Life insurance visual showing keys and personal planning details on a warm table" },
      { webp: "service-life-slide-3.webp", fallback: "service-life-slide-3.jpg", alt: "Life insurance visual showing a peaceful home hallway and long-term planning mood" }
    ],
    motionVideo: "service-life-motion.webm",
    motionGif: "service-life-motion.gif",
    motionAlt: "Animated life insurance motion loop showing premium family planning coverage visuals",
    label: "Life Insurance",
    shortLabel: "Life",
    scene: "Family planning visual",
    alt: "Photographic life insurance gallery showing financial planning documents, a warm home interior, and calm legacy-planning details without people",
    icon: "heart",
    accent: "#FFA184",
    accent2: "#F4C96B",
    accent3: "#86CFA0"
  },
  "renters-insurance": {
    slides: [
      { webp: "service-renters-slide-1.webp", fallback: "service-renters-slide-1.jpg", alt: "Renters insurance visual showing a modern Miami apartment living room" },
      { webp: "service-renters-slide-2.webp", fallback: "service-renters-slide-2.jpg", alt: "Renters insurance visual showing apartment keys and personal property details" },
      { webp: "service-renters-slide-3.webp", fallback: "service-renters-slide-3.jpg", alt: "Renters insurance visual showing a luxury apartment corridor and entry area" }
    ],
    motionVideo: "service-renters-motion.webm",
    motionGif: "service-renters-motion.gif",
    motionAlt: "Animated renters insurance motion loop showing premium apartment coverage visuals",
    label: "Renters Insurance",
    shortLabel: "Renters",
    scene: "Apartment coverage visual",
    alt: "Photographic renters insurance gallery showing apartment keys, a modern rental living room, and personal property details",
    icon: "key",
    accent: "#9ADCF7",
    accent2: "#86CFA0",
    accent3: "#F4C96B"
  }
};


const address = {
  streetAddress: "11200 W Flagler St, Suite 108-109",
  addressLocality: "Miami",
  addressRegion: "FL",
  postalCode: "33174",
  addressCountry: "US"
};

const serviceAreas = ["Miami", "Sweetwater", "Doral", "Hialeah", "Kendall", "Florida"];
const insuranceTypes = ["Auto insurance", "Home insurance", "Homeowners insurance", "Renters insurance", "Flood insurance", "Motorcycle insurance", "Boat insurance", "RV insurance", "Commercial insurance", "General liability insurance", "Business insurance", "Workers compensation", "Life insurance", "Health insurance"];
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
    copy: "Compare limits and deductibles for your vehicle, drivers and daily use.",
    tags: ["Car insurance Miami", "Family vehicles", "Renewal review"],
    accent: "rgba(154, 220, 247, 0.30)"
  },
  {
    id: "home-insurance",
    title: "Homeowners Insurance",
    short: "Homeowners",
    icon: "home",
    href: "/home-insurance/",
    copy: "Review protection for your home and belongings, plus wind, flood and lender requirements.",
    tags: ["Miami-Dade homes", "Roof details", "Lender needs"],
    accent: "rgba(134, 207, 160, 0.30)"
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    short: "Life",
    icon: "heart",
    href: "/life-insurance/",
    copy: "Plan for income, debts and expenses your family may face without you.",
    tags: ["Term life", "Income needs", "Final expense"],
    accent: "rgba(255, 161, 132, 0.30)"
  },
  {
    id: "business-insurance",
    title: "Business Insurance",
    short: "Business",
    icon: "briefcase",
    href: "/commercial-insurance/",
    copy: "Review your premises, equipment and daily business risks.",
    tags: ["BOP questions", "Certificates", "Operations"],
    accent: "rgba(244, 201, 107, 0.30)"
  },
  {
    id: "renters-insurance",
    title: "Renters Insurance",
    short: "Renters",
    icon: "key",
    href: "/renters-insurance/",
    copy: "Cover eligible losses to belongings and review personal liability and lease requirements.",
    tags: ["Miami apartments", "Belongings", "Lease proof"],
    accent: "rgba(119, 231, 220, 0.26)"
  },
  {
    id: "general-liability-insurance",
    title: "General Liability Insurance",
    short: "Liability",
    icon: "shield",
    href: "/commercial-insurance/#general-liability-insurance",
    copy: "Review protection against certain injury and property damage claims from others.",
    tags: ["Contractors", "Certificates", "Client needs"],
    accent: "rgba(154, 220, 247, 0.28)"
  },
  {
    id: "commercial-insurance",
    title: "Commercial Insurance",
    short: "Commercial",
    icon: "shield",
    href: "/commercial-insurance/",
    copy: "Review liability, property, work vehicles, employees and contract requirements.",
    tags: ["Contractors", "Fleets", "Small business"],
    accent: "rgba(244, 201, 107, 0.28)"
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    short: "Health",
    icon: "health",
    href: phoneHref,
    copy: "Call to ask about available plans, enrollment timing and information needed to apply.",
    tags: ["Families", "Self-employed", "Benefit questions"],
    accent: "rgba(134, 207, 160, 0.30)"
  }
];

const specialtyCoverageLinks = [
  ["flood-insurance", "Flood Insurance", phoneHref],
  ["motorcycle-insurance", "Motorcycle Insurance", phoneHref],
  ["boat-insurance", "Boat Insurance", phoneHref],
  ["rv-insurance", "RV Insurance", phoneHref],
  ["workers-compensation", "Workers' Compensation", "/commercial-insurance/"]
];

const tickerItems = [
  ["Your Family First Insurance Office #3", "/about-office-3/"],
  ["11200 W Flagler St, Suite 108-109, Miami, FL 33174", "/about-office-3/"],
  ["Call Us: (305) 910-8850", phoneHref],
  ["¡Se Habla Español!", "/about-office-3/"],
  ["Get My Free Quote", quoteDestination],
  ["Existing Customer Help", "/policyholder-help/"]
];

const pages = [
  {
    "slug": "",
    "nav": "Home",
    "title": "Miami Insurance & Free Quotes | Your Family First Office #3",
    "description": "Get a free insurance quote in Miami. Visit Office #3 on West Flagler for auto, home, renters, business and life insurance, with English and Spanish service.",
    "h1": "Insurance in Miami",
    "intro": "Auto, home, renters, business and life insurance from our West Flagler office. Compare your options and get a free quote in English or Spanish.",
    "kind": "home",
    "keywords": "Miami insurance agency, Your Family First Insurance Office #3, West Flagler insurance office, auto insurance Miami, homeowners insurance Miami, renters insurance Miami, general liability insurance Miami, life insurance Miami, health insurance Miami, commercial insurance Miami, bilingual insurance Miami",
    "faqTitle": "Insurance questions in Miami",
    "faqs": [
      [
        "How do I get a free insurance quote in Miami?",
        "Start your quote online or call Your Family First Insurance Office #3 at 305-910-8850. Tell us what you want to insure and when you need coverage. For business, life, health or a type of insurance missing from the online form, call the office.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ],
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Is the insurance quote free, and do I have to buy a policy?",
        "The quote is free, and requesting one does not commit you to buying a policy. Review the price, coverage, deductibles and payment terms before deciding. A quote does not start insurance coverage."
      ],
      [
        "What should I have ready before asking for a quote?",
        "Have your current policy summary, renewal date and the coverage you want to compare ready. If you are buying insurance for the first time, start with what you need to insure and any lender, landlord or contract requirements. Enter personal application details only in the secure quote form.",
        [
          [
            "See the quote steps",
            "/get-a-quote/"
          ]
        ]
      ],
      [
        "What types of insurance can I ask about?",
        "Ask about auto, home, renters, business, general liability, life or health insurance. The right policy depends on what you own, who depends on you and any coverage your contracts require. Tell us your needs so we can check available options.",
        [
          [
            "Compare insurance types",
            "/#coverage-title"
          ]
        ]
      ],
      [
        "Can I get help in Spanish?",
        "Yes. Office #3 offers help in English and Spanish, from reviewing a quote to explaining deductibles and renewal questions. Call 305-910-8850 and tell us which language you prefer.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Where is Your Family First Insurance Office #3 in Miami?",
        "Office #3 is at 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Call before visiting to confirm availability. You can also request a quote online or speak with us by phone.",
        [
          [
            "Get directions to Office #3",
            "https://www.google.com/maps/place/Your+Family+First+Insurance/data=!4m2!3m1!1s0x0:0x4cfae21ee65b84f0"
          ]
        ]
      ],
      [
        "Can I compare a new quote before my current policy renews?",
        "Yes. Start when your renewal notice arrives so there is time to compare limits, deductibles and total cost. Before cancelling your current policy, confirm the replacement policy and its start date in writing, including any required payment.",
        [
          [
            "Review your renewal",
            "/customer-resources/renewal-review/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "auto-insurance",
    "nav": "Auto",
    "title": "Auto Insurance in Miami | Free Quote | Office #3",
    "description": "Compare auto insurance in Miami for your car, drivers and daily use. Free quotes and English or Spanish service at Your Family First Office #3.",
    "h1": "Auto Insurance in Miami",
    "intro": "Compare coverage for your car, your drivers and the way you use your vehicle. We can review a new purchase, a move or an upcoming renewal.",
    "kind": "service",
    "service": "Auto Insurance",
    "icon": "car",
    "keywords": "auto insurance Miami, car insurance Miami, Miami auto insurance quote, Florida car insurance, West Flagler auto insurance, Miami-Dade auto insurance, bilingual car insurance help",
    "sections": [
      [
        "Coverage for your car",
        "Ask about liability, personal injury protection, collision, comprehensive and uninsured motorist coverage. Compare limits and deductibles as well as the price."
      ],
      [
        "Buying or financing a vehicle",
        "Bring the lender or lease requirements and the date you need coverage. Confirm your policy is active before driving the vehicle."
      ],
      [
        "What to have ready",
        "Have your vehicle year, make and model, garaging ZIP code, current policy and household driver information ready. Provide identification details through the quote service when requested."
      ],
      [
        "Changes to how you drive",
        "Tell us about a new driver, a move, delivery work or rideshare driving. A change in use can affect the coverage you need."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Auto insurance questions",
    "faqs": [
      [
        "How much does car insurance cost in Miami?",
        "There is no single price for Miami drivers. Your vehicles, drivers, driving history, address, vehicle use and coverage choices affect the quote. Compare the total cost for the same policy term, along with limits, deductibles, the initial payment and installment charges.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ]
        ]
      ],
      [
        "What car insurance does Florida require?",
        "For most private passenger vehicles registered in Florida, the basic requirements are $10,000 in Personal Injury Protection (PIP) and $10,000 in Property Damage Liability (PDL). These minimums do not cover every risk. Different requirements can apply to certain drivers and vehicles, and a lender may require additional coverage.",
        [
          [
            "Florida vehicle insurance requirements",
            "https://www.flhsmv.gov/insurance/"
          ]
        ]
      ],
      [
        "What does “full coverage” car insurance actually mean?",
        "“Full coverage” is not a standard package that covers everything. People often use it to mean liability plus collision and comprehensive coverage. Ask for the exact coverages, limits, deductibles and exclusions in your quote, especially if your car is financed or leased."
      ],
      [
        "Does car insurance cover flood or hurricane damage to my car?",
        "Comprehensive coverage generally addresses damage from flooding, theft, fire and wind, subject to your policy and deductible. PIP and property damage liability alone do not pay to repair your own car after a flood. Check whether comprehensive is included before a storm threatens."
      ],
      [
        "What information is needed for an auto insurance quote?",
        "Expect questions about your vehicles, household drivers, driving history, address, vehicle use and current insurance. Have your current coverage summary ready for a fair comparison. Complete personal details in the secure application; this website does not collect driver licenses or vehicle identification numbers.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ]
        ]
      ],
      [
        "Do I need to disclose delivery driving or rideshare work?",
        "Yes. Tell us if you deliver goods, carry paying passengers or use the car for business. A personal auto policy may exclude that use or leave gaps. Review the actual work you do before choosing a policy or starting a new driving job.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Can I switch car insurance without a gap in coverage?",
        "You can compare options before your current policy ends. Confirm the new policy’s effective date and time, required payment and written proof of coverage before cancelling the old policy. Keep the insurance required for your Florida registration in force.",
        [
          [
            "Plan a renewal review",
            "/customer-resources/renewal-review/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "home-insurance",
    "nav": "Homeowners",
    "title": "Homeowners Insurance in Miami | Free Quote | Office #3",
    "description": "Compare homeowners insurance in Miami. Review hurricane deductibles, flood coverage, inspections and closing deadlines with bilingual Office #3.",
    "h1": "Homeowners Insurance in Miami",
    "intro": "Review coverage for your home and belongings, along with hurricane deductibles, flood insurance and lender requirements. Start early if you have a closing or renewal deadline.",
    "kind": "service",
    "service": "Homeowners Insurance",
    "icon": "home",
    "keywords": "homeowners insurance Miami, home insurance Miami, Florida homeowners insurance, Miami-Dade home insurance quote, West Flagler homeowners insurance, hurricane deductible, flood insurance Miami",
    "sections": [
      [
        "Your home and belongings",
        "Review the cost to rebuild your home, replace belongings and cover eligible temporary living expenses after a covered loss. The purchase price is not the same as rebuilding cost."
      ],
      [
        "Wind and flood",
        "Check how your policy treats wind damage and hurricane deductibles. Standard homeowners insurance generally excludes flood; ask about separate flood coverage."
      ],
      [
        "Inspections and roof details",
        "Have the roof age, updates, prior insurance and any inspection reports ready. The insurer may request additional documentation before offering coverage."
      ],
      [
        "Closing or renewing",
        "Share your closing date or renewal deadline and lender requirements. Review the effective date before replacing an existing policy."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Home insurance questions",
    "faqs": [
      [
        "How much does homeowners insurance cost in Miami?",
        "The quote depends on the home’s location, rebuilding cost, roof, construction, occupancy, claims history and coverage choices. Two homes on the same street can have different prices. Compare dwelling limits, hurricane and other deductibles, exclusions and total premium together.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ]
        ]
      ],
      [
        "Does homeowners insurance include flood coverage?",
        "Standard homeowners insurance generally excludes flooding from rising water. Flood insurance is separate from wind or hurricane coverage. Ask about flood protection for both the building and your belongings, even if your lender has not required it.",
        [
          [
            "Ask about flood coverage",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "How does a hurricane deductible work in Florida?",
        "A hurricane deductible may be a dollar amount or a percentage of the insured dwelling limit. For example, a 2% deductible on a $300,000 dwelling limit is $6,000. It is not 2% of your claim. Check your declarations page for the amount and policy rules.",
        [
          [
            "Florida hurricane deductible guide",
            "https://www.myfloridacfo.com/division/consumers/consumerprotections/floridashurricanedeductible"
          ]
        ]
      ],
      [
        "What documents should I prepare for a home insurance quote?",
        "Have the property address, roof age, occupancy details and current declarations page ready. If available, include your wind mitigation and four-point inspection reports. Tell us about renovations, rental use or a home business; those details can affect the options offered.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ]
        ]
      ],
      [
        "Can a new roof or wind mitigation inspection lower my premium?",
        "Certain roof features and documented wind protection may qualify for discounts. A newer roof does not guarantee a lower price or approval. Ask which inspection reports and features the insurer accepts, and compare the final quote rather than assuming a credit applies."
      ],
      [
        "Should my home be insured for its sale price or rebuilding cost?",
        "The dwelling limit should reflect the cost to rebuild the covered structure, rather than simply its sale price or mortgage balance. Land value is not a rebuilding expense. Review the insurer’s replacement-cost estimate, construction details and any coverage limits or conditions."
      ],
      [
        "Can I buy or change home insurance when a hurricane is approaching?",
        "Insurers may restrict new policies or changes when a storm threatens. Review your home, wind and flood coverage early; do not wait for a warning. Any new coverage must have a confirmed effective date, and some flood policies have waiting periods.",
        [
          [
            "Prepare before hurricane season",
            "/customer-resources/hurricane-preparation/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "commercial-insurance",
    "nav": "Commercial",
    "title": "Business Insurance in Miami | Free Quote | Office #3",
    "description": "Review business insurance in Miami: general liability, property, work vehicles, employees and certificates. Call Office #3 for a free quote.",
    "h1": "Business Insurance in Miami",
    "intro": "Tell us what your business does and what your contracts require. We can review liability, property, work vehicles and employee-related insurance needs.",
    "kind": "service",
    "service": "Commercial Insurance",
    "icon": "shield",
    "keywords": "commercial insurance Miami, business insurance Miami, general liability insurance Miami, workers compensation Miami, commercial auto insurance Miami, certificate of insurance Miami, small business insurance Miami",
    "sections": [
      [
        "General liability",
        "Review coverage for certain claims involving injuries to others or damage to their property. Check exclusions and contract requirements, including any additional insured request."
      ],
      [
        "Property and work vehicles",
        "Tell us about your premises, equipment and vehicle use. Personal policies may not cover business activities, and one business policy may not address every exposure."
      ],
      [
        "Employees and operations",
        "Employee duties, payroll and the work your business performs can affect insurance requirements. Ask about workers compensation and any coverage specific to your industry."
      ],
      [
        "Contracts and certificates",
        "Bring the full insurance requirements and deadline. A certificate shows existing coverage; it does not add coverage or change policy terms."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Business insurance questions",
    "faqs": [
      [
        "What insurance does a small business in Miami need?",
        "Start with what the business does, where it operates, its employees, vehicles and contract requirements. General liability, property, commercial auto and workers’ compensation address different risks. Call Office #3 with your business details so we can review what to ask for and what is available.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "How much does business insurance cost?",
        "Cost depends on your operations, revenue, payroll, location, claims history and requested coverage. A contractor and an office-based business may need very different policies. Prepare your business description and contract requirements so the quote reflects the work you actually do.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Is general liability enough to insure my business?",
        "Not necessarily. General liability typically addresses certain third-party injury or property-damage claims. It does not replace coverage for your own equipment, business vehicles, employee injuries or professional mistakes. Review each exposure and the policy’s exclusions before relying on one policy for everything."
      ],
      [
        "What is a business owner’s policy, or BOP?",
        "A BOP combines several business coverages, commonly general liability, property and business interruption, in one policy. Eligibility and included protection vary. It may suit some small businesses, but it does not automatically include every coverage your operations or contracts require."
      ],
      [
        "Can I get a certificate of insurance for a job or lease?",
        "Call with the requester’s written requirements, certificate holder details and deadline. We need to check that the requested limits and endorsements match the policy. A certificate shows evidence of insurance; it cannot add coverage or make someone an additional insured by itself.",
        [
          [
            "Prepare a certificate request",
            "/customer-resources/certificate-of-insurance/"
          ]
        ]
      ],
      [
        "Does my personal car insurance cover business driving?",
        "Do not assume it does. Tell us about deliveries, transporting customers, employee drivers and other business use. A personal auto policy may exclude some activities, and business driving may need commercial auto or other coverage.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "life-insurance",
    "nav": "Life",
    "title": "Life Insurance in Miami | Free Quote | Office #3",
    "description": "Discuss life insurance in Miami for income, debts and family expenses. Compare term and permanent options with English or Spanish service at Office #3.",
    "h1": "Life Insurance in Miami",
    "intro": "Plan for the people who depend on you. Talk with us about your budget, income, mortgage and family responsibilities before choosing a coverage amount.",
    "kind": "service",
    "service": "Life Insurance",
    "icon": "heart",
    "keywords": "life insurance Miami, term life insurance Miami, final expense insurance Miami, family protection Miami, mortgage protection life insurance, bilingual life insurance help",
    "sections": [
      [
        "Decide what you want to cover",
        "Consider income your family would need, outstanding debts, education costs and final expenses. Include existing coverage in your review."
      ],
      [
        "Term or permanent insurance",
        "Term insurance covers a defined period. Permanent policies can provide longer-lasting coverage when their requirements are met. Ask about costs, guarantees and conditions."
      ],
      [
        "Choose and review beneficiaries",
        "Review who should receive the benefit and update your instructions after major family changes. Ask how your insurer handles beneficiary changes."
      ],
      [
        "Applying for coverage",
        "The insurer may ask about health and other personal details. Share those only through the application process provided by the office or insurer."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Life insurance questions",
    "faqs": [
      [
        "What is the difference between term and permanent life insurance?",
        "Term life covers a set period and generally has no cash value. Permanent life is designed for longer-term coverage and may build cash value, depending on the policy. Compare premiums, guarantees and conditions for keeping coverage active, rather than choosing by the label alone."
      ],
      [
        "How much life insurance do I need?",
        "Start with the income your family would need to replace, debts, housing costs, childcare and future expenses. Subtract savings and existing coverage that would be available to them. Review both the amount and how long the need may last; one income multiple does not fit every family.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "What affects the cost of life insurance?",
        "Age, health, tobacco use, coverage amount, policy type and term length can affect the premium. The insurer reviews the application before making an offer. A preliminary quote is an estimate, not a promise of approval or the final rate."
      ],
      [
        "Do I need a medical exam to apply for life insurance?",
        "It depends on the insurer, product and your application. Some options may use health questions or records without an exam, but no-exam does not mean automatic approval. Call to discuss the application process; do not send medical records through this public website.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Is life insurance through my employer enough?",
        "Check the benefit amount, who receives it and what happens if you change jobs or stop working. Employer coverage may help, but it may not meet every household expense or remain available after employment ends. Include it when reviewing your family’s overall needs."
      ],
      [
        "How do I request a life insurance quote in Miami?",
        "Call Office #3 at 305-910-8850. We can discuss your budget, who depends on you, the amount you want to consider and the application steps in English or Spanish. Keep an existing policy active while any replacement is being reviewed.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ],
          [
            "Review family and beneficiary changes",
            "/customer-resources/life-event-review/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "renters-insurance",
    "nav": "Renters",
    "title": "Renters Insurance in Miami | Free Quote | Office #3",
    "description": "Get a renters insurance quote in Miami. Review belongings, liability, lease requirements and proof of insurance with bilingual Office #3.",
    "h1": "Renters Insurance in Miami",
    "intro": "Moving into an apartment or renewing your lease? Compare coverage for your belongings and personal liability, and check what your landlord requires.",
    "kind": "service",
    "service": "Renters Insurance",
    "icon": "key",
    "keywords": "renters insurance Miami, apartment insurance Miami, Miami renters insurance quote, renters insurance West Flagler, lease insurance requirement, proof of renters coverage Miami",
    "sections": [
      [
        "Your belongings",
        "Estimate what it would cost to replace furniture, clothing and electronics. Ask about special limits for jewelry and other valuables."
      ],
      [
        "Liability and living expenses",
        "Review personal liability and additional living expenses after a covered loss. Check limits, exclusions and the deductible before choosing a policy."
      ],
      [
        "Lease requirements",
        "Bring the insurance requirements from your lease or property manager, including the requested liability limit and move-in date."
      ],
      [
        "Proof of insurance",
        "After coverage is issued, ask how to obtain the proof your landlord needs. A quote alone is not evidence of active insurance."
      ]
    ],
    "searchTopics": [],
    "faqTitle": "Renters insurance questions",
    "faqs": [
      [
        "What does renters insurance cover?",
        "Renters insurance can cover your belongings, personal liability and additional living expenses after a covered loss. It does not insure the landlord’s building. Review the covered causes of loss, deductible and limits, especially for jewelry, electronics or other valuable items."
      ],
      [
        "Does my landlord’s insurance cover my belongings?",
        "Usually no. The landlord’s policy protects the building and the landlord’s interests. Your furniture, clothes and electronics generally need your own coverage. Check your lease for any renters insurance requirement and required liability limit.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ]
        ]
      ],
      [
        "How much renters insurance do I need for an apartment in Miami?",
        "Add up what it would cost to replace your belongings, then review liability limits and the requirements in your lease. A low premium alone does not tell you whether the policy fits. Compare deductibles, loss-of-use coverage and limits for valuables too."
      ],
      [
        "What is the difference between replacement cost and actual cash value?",
        "Replacement cost coverage generally pays toward replacing covered belongings with comparable new items, subject to policy conditions and limits. Actual cash value accounts for depreciation. Ask which settlement method your quote includes and what proof or replacement steps are required."
      ],
      [
        "Does renters insurance cover flood damage?",
        "Standard renters insurance generally excludes flooding from rising water. Renters can ask about separate flood coverage for belongings. Do not assume your landlord’s flood policy protects your personal property.",
        [
          [
            "Ask about flood insurance for belongings",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "What do I need to get a renters insurance quote?",
        "Have your rental address, move-in date, estimated value of belongings and lease insurance requirements ready. Tell us who needs to be insured; do not assume a roommate is included. Confirm the coverage start date and any proof your landlord needs before move-in.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "about-office-3",
    "nav": "About",
    "title": "About Office #3 | Your Family First Insurance Miami",
    "description": "Meet Your Family First Insurance Office #3, a local West Flagler Miami agency offering bilingual insurance quote help for families and businesses.",
    "h1": "Meet Your Miami Insurance Office",
    "intro": "Ariel Busutil owns Your Family First Insurance Office #3 on West Flagler. Our office helps with insurance quotes and policy questions in English and Spanish.",
    "kind": "about",
    "faqTitle": "Visiting and contacting Office #3",
    "faqs": [
      [
        "Where is Office #3, and how do I get directions?",
        "Your Family First Insurance Office #3 is at 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Use the office’s Google Maps listing for directions. Call 305-910-8850 before visiting to confirm availability.",
        [
          [
            "Directions to our West Flagler office",
            "https://www.google.com/maps/place/Your+Family+First+Insurance/data=!4m2!3m1!1s0x0:0x4cfae21ee65b84f0"
          ]
        ]
      ],
      [
        "Can I get a quote without visiting the office?",
        "Yes. You can start online or call the office. For business, life, health or coverage not listed in the online form, call so we can discuss what you need. You do not need to visit just to ask for a quote.",
        [
          [
            "Get a free quote",
            "/get-a-quote/"
          ],
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Can someone explain my insurance quote in Spanish?",
        "Yes. Ask for English or Spanish service when you call. We can go over the quoted coverage, deductibles, payment terms and questions you want answered before you decide.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "What should I bring when comparing insurance?",
        "Bring your current declarations page, renewal notice and any lender, landlord or business-contract requirements. A declarations page summarizes your coverage and deductibles. If you do not have insurance yet, bring your questions and the details of what you want to insure."
      ],
      [
        "Can Office #3 help after I buy a policy?",
        "Call us about renewals, proof of insurance, billing questions or requested policy changes. For a new claim, report the loss through your insurer’s official claims channel and keep the claim number. The insurer makes the coverage decision.",
        [
          [
            "Existing customer help",
            "/policyholder-help/"
          ]
        ]
      ]
    ]
  },
  {
    "slug": "get-a-quote",
    "nav": "Get Quote",
    "title": "Get My Free Quote | Your Family First Insurance Office #3",
    "description": "Get a free insurance quote from Your Family First Office #3 in Miami. Start online or call 305-910-8850 for help in English or Spanish.",
    "h1": "Get My Free Quote",
    "intro": "Start your quote online with Office #3, or call us for help in English or Spanish.",
    "kind": "quote",
    "faqTitle": "Getting your insurance quote",
    "faqs": [
      [
        "How do I start my free insurance quote?",
        "Select the online quote button to open ConsumerRateQuotes, the quote service used by Office #3. Complete the application there. If your insurance type is not listed or you would rather speak with someone, call 305-910-8850.",
        [
          [
            "Start the online quote",
            "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868"
          ],
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "Why does the quote open on another website?",
        "ConsumerRateQuotes handles the online application for Office #3. Our website links directly to that application rather than asking you to enter the same information twice. Before sharing information there, review that service’s privacy terms."
      ],
      [
        "What information should I prepare?",
        "Have your current coverage summary, the details of what you want to insure and your preferred start date ready. Include any insurance requirements from a lender, landlord or contract. Application questions vary by insurance type; provide personal details only in the secure quote application."
      ],
      [
        "Can I request business, life or health insurance here?",
        "Call Office #3 for business, life, health or an insurance type not shown in the online form. We can discuss your needs and explain the next application steps in English or Spanish.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "What happens after I request a quote?",
        "The information you provide is used to review available options. Additional details may be needed before an insurer offers coverage. If you have a deadline or a question about your request, call the office. Timing depends on the application and the insurer’s review.",
        [
          [
            "Call 305-910-8850",
            "tel:13059108850"
          ]
        ]
      ],
      [
        "When does my insurance coverage start?",
        "Submitting a quote request does not start coverage. Confirm the policy’s effective date and time in writing, and complete any required approval and payment steps. Keep your current insurance until replacement coverage is confirmed."
      ]
    ]
  },
  {
    "slug": "privacy-policy",
    "nav": "Privacy",
    "title": "Privacy Policy | Your Family First Insurance Office #3",
    "description": "Read how Your Family First Insurance Office #3 routes quote requests to the separate ConsumerRateQuotes service, limits public-site data collection, and handles analytics and data safety.",
    "h1": "Privacy Policy",
    "intro": "Learn how this website uses information and what happens when you follow a quote link.",
    "kind": "privacy"
  },
  {
    "slug": "terms",
    "nav": "Terms",
    "title": "Terms and Insurance Disclaimer | Your Family First Insurance Office #3",
    "description": "Read the website terms and insurance disclaimer for Office #3, including quote limitations, coverage boundaries, and secure communication guidance.",
    "h1": "Website Terms and Insurance Disclaimer",
    "intro": "Please review these terms before using the website or requesting insurance.",
    "kind": "terms"
  }
,
  ...retentionPages
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
  fs.writeFileSync(filePath, content.replace(/[ \t]+$/gm, ""), "utf8");
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
    health: '<path d="M12 21s7-4.5 7-10.2A4.8 4.8 0 0 0 12 6.6a4.8 4.8 0 0 0-7 4.2C5 16.5 12 21 12 21Z"/><path d="M12 9v6M9 12h6"/>',
    phone: '<path d="M8 5.5 10 9l-1.5 1.5a11 11 0 0 0 5 5L15 14l3.5 2v2.5c0 .8-.7 1.5-1.5 1.5A13.5 13.5 0 0 1 3.5 6.5C3.5 5.7 4.2 5 5 5h3Z"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    clock: '<path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="8"/>',
    lock: '<rect x="6" y="10" width="12" height="9" rx="2"/><path d="M9 10V8a3 3 0 0 1 6 0v2"/>',
    map: '<path d="M9 18 4 20V6l5-2 6 2 5-2v14l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
    star: '<path d="m12 4 2.2 4.7 5.1.6-3.8 3.5 1 5-4.5-2.6-4.5 2.6 1-5-3.8-3.5 5.1-.6L12 4Z"/>',
    message: '<path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v4A3.5 3.5 0 0 1 15.5 14H11l-4.5 4v-4.2A3.5 3.5 0 0 1 5 10.5v-4Z"/><path d="M8.5 7.5h7M8.5 10.5h4.5"/>'
  };
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.shield}</svg>`;
}

function reviewDisplayText(review) {
  if (review.ratingOnly) {
    return `${review.authorName} left a ${review.rating}-star Google rating for ${businessName}.`;
  }
  return review.text
    .replace(/\s+/g, " ")
    .replace(/\(Original\).*/u, "")
    .replace("(Translated by Google)", "")
    .trim();
}

function reviewExcerpt(review, length = 218) {
  const text = reviewDisplayText(review);
  if (text.length <= length) return text;
  const shortened = text.slice(0, length).replace(/\s+\S*$/u, "");
  return `${shortened}...`;
}

function reviewStars(review) {
  return `<span class="real-review-stars" role="img" aria-label="${review.rating} out of 5 Google star rating">${Array.from({ length: review.rating }, () => iconSvg("star")).join("")}</span>`;
}

function reviewCard(review, index) {
  const isActive = index === 0;
  const safeAuthor = escapeHtml(review.authorName);
  const excerpt = escapeHtml(reviewExcerpt(review));
  const fullText = review.ratingOnly ? "" : escapeHtml(review.text);
  const responseText = review.ownerResponse?.text ? escapeHtml(review.ownerResponse.text) : "";
  const responseTime = `Recorded ${escapeHtml(googleReviewSnapshot.asOf)}`;
  return `
    <article class="real-review-card${isActive ? " is-active" : ""}" data-review-card="${index}" aria-hidden="${isActive ? "false" : "true"}" ${isActive ? "" : "inert"}>
      <div class="real-review-head">
        <span class="review-avatar" aria-hidden="true">${escapeHtml(review.authorName.slice(0, 1).toUpperCase())}</span>
        <div>
          <p class="review-eyebrow">Google review</p>
          <h3>${safeAuthor}</h3>
          <p class="real-review-meta">Recorded ${escapeHtml(googleReviewSnapshot.asOf)}</p>
        </div>
        ${reviewStars(review)}
      </div>
      <p class="real-review-excerpt">${review.ratingOnly ? excerpt : `“${excerpt}”`}</p>
      ${fullText ? `
        <details class="review-details">
          <summary>Read full review</summary>
          <p>${fullText}</p>
        </details>
      ` : `<p class="review-rating-only">Rating only; no written comment.</p>`}
      ${responseText ? `
        <details class="review-details office-response">
          <summary>Office response on Google <span>${responseTime}</span></summary>
          <p>${responseText}</p>
        </details>
      ` : ""}
      <a class="review-source-link" href="${googleReviewUrl}" target="_blank" rel="noopener" tabindex="${isActive ? "0" : "-1"}">Open Google review page ${iconSvg("arrow")}</a>
    </article>
  `;
}

function reviewMiniCard(review, index) {
  return `
    <button type="button" class="real-review-mini${index === 0 ? " is-active" : ""}" data-review-dot="${index}" role="tab" aria-selected="${index === 0 ? "true" : "false"}">
      <span>${reviewStars(review)}</span>
      <strong>${escapeHtml(review.authorName)}</strong>
      <em>${escapeHtml(reviewExcerpt(review, 94))}</em>
    </button>
  `;
}

function logoImg(loading = "eager") {
  return `<picture class="logo-picture">
    <source type="image/webp" srcset="/assets/yffi3/yffi3-official-franchise-logo-240.webp 240w, /assets/yffi3/yffi3-official-franchise-logo-480.webp 480w, /assets/yffi3/yffi3-official-franchise-logo-800.webp 800w" sizes="(min-width: 1040px) 220px, 140px">
    <img src="${logoSrc}" alt="Your Family First Insurance official franchise logo and sign" width="1932" height="937" loading="${loading}" decoding="async">
  </picture>`;
}

function originalFranchiseLogoImg(loading = "lazy") {
  return `<picture class="logo-picture">
    <source type="image/webp" srcset="/assets/yffi3/yffi3-original-franchise-logo-160.webp 160w, /assets/yffi3/yffi3-original-franchise-logo-320.webp 320w" sizes="(min-width: 1040px) 112px, 74px">
    <img src="${originalFranchiseLogoSrc}" alt="Original Your Family First Insurance franchise family logo" width="521" height="648" loading="${loading}" decoding="async">
  </picture>`;
}

function familyPicture(className, loading = "lazy", fetchpriority = "auto") {
  return `<picture class="${className}">
    <source srcset="${familyWebpSrc}" type="image/webp">
    <img src="${familyPhotoSrc}" alt="Real family and office photo for Your Family First Insurance Office #3" width="974" height="732" loading="${loading}" decoding="async" fetchpriority="${fetchpriority}">
  </picture>`;
}

function principalPicture(className, loading = "lazy") {
  return `<picture class="${className}"><source srcset="${principalWebpSrc}" type="image/webp"><img src="${principalPhotoSrc}" alt="Ariel Busutil, owner of Your Family First Insurance Office #3" width="1448" height="1086" loading="${loading}" decoding="async"></picture>`;
}

function svgIconPaths(name) {
  const paths = {
    car: '<path d="M268 432h424l-34-112c-12-38-46-64-86-64H388c-40 0-74 26-86 64l-34 112Z"/><path d="M330 432v42M630 432v42"/><path d="M356 344h248"/><path d="M330 506h300"/><circle cx="342" cy="498" r="27"/><circle cx="618" cy="498" r="27"/>',
    home: '<path d="M256 402 480 218l224 184"/><path d="M316 378v194h328V378"/><path d="M430 572V442h100v130"/><path d="M370 336h220"/><path d="M612 328v-68h64v122"/>',
    building: '<path d="M306 574V238h214v336"/><path d="M520 356h146v218"/><path d="M354 304h42M432 304h42M354 374h42M432 374h42M354 444h42M432 444h42M566 410h44M566 478h44"/><path d="M258 574h444"/>',
    heart: '<path d="M480 560s-198-116-198-258c0-74 56-126 122-126 38 0 65 17 76 38 11-21 38-38 76-38 66 0 122 52 122 126 0 142-198 258-198 258Z"/><path d="M396 370h68l28-58 42 116 28-58h76"/>',
    key: '<circle cx="378" cy="352" r="94"/><circle cx="378" cy="352" r="34"/><path d="M458 404h210v62h-54v54h-66v-54h-90"/><path d="M276 574h408"/><path d="M322 248h312"/>'
  };
  return paths[name] || paths.building;
}

function serviceVisualSvg(asset) {
  const text = escapeHtml(asset.shortLabel);
  const label = escapeHtml(asset.label);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720" role="img" aria-label="${escapeHtml(asset.alt)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07131F"/>
      <stop offset=".48" stop-color="#10283A"/>
      <stop offset="1" stop-color="#173426"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity=".28"/>
      <stop offset=".52" stop-color="${asset.accent}" stop-opacity=".12"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity=".06"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${asset.accent}"/>
      <stop offset=".55" stop-color="${asset.accent2}"/>
      <stop offset="1" stop-color="${asset.accent3}"/>
    </linearGradient>
    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .42 0"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="26" stdDeviation="26" flood-color="#000000" flood-opacity=".38"/>
    </filter>
    <style>
      .line{fill:none;stroke:#fff;stroke-opacity:.18;stroke-width:2}
      .fine{fill:none;stroke:#fff;stroke-opacity:.16;stroke-width:1.4}
      .glyph{fill:none;stroke:url(#accent);stroke-width:18;stroke-linecap:round;stroke-linejoin:round;filter:url(#softGlow)}
      .chip{fill:rgba(255,255,255,.10);stroke:rgba(255,255,255,.24);stroke-width:2}
      .copy{font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-weight:800;letter-spacing:0;fill:#FFF8EC}
      .caption{font-size:26px;fill:#E9F1FA;opacity:.82}
      @keyframes drift{from{transform:translate3d(-10px,0,0)}to{transform:translate3d(10px,-12px,0)}}
      .float{animation:drift 5.8s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
    </style>
  </defs>
  <rect width="960" height="720" rx="54" fill="url(#bg)"/>
  <path d="M0 520C180 440 254 580 430 498s284-246 530-154v376H0Z" fill="${asset.accent}" opacity=".08"/>
  <path d="M58 126C192 42 326 84 448 146c126 64 246 98 454 0" class="line"/>
  <path d="M82 592C242 524 370 538 518 590c118 42 228 44 360-40" class="fine"/>
  <g opacity=".54">
    <path d="M100 186h760M100 250h760M100 314h760M100 378h760M100 442h760M100 506h760" class="fine"/>
    <path d="M176 112v496M300 112v496M424 112v496M548 112v496M672 112v496M796 112v496" class="fine"/>
  </g>
  <g filter="url(#shadow)">
    <rect x="92" y="84" width="776" height="552" rx="42" fill="url(#glass)" stroke="rgba(255,255,255,.24)" stroke-width="2"/>
    <path d="M130 116h700" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
  </g>
  <g class="float">
    <rect x="148" y="146" width="664" height="386" rx="38" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.20)" stroke-width="2"/>
    <path d="M190 496C322 408 404 438 508 372c86-55 150-138 258-118" fill="none" stroke="${asset.accent2}" stroke-opacity=".38" stroke-width="6" stroke-linecap="round"/>
    <g class="glyph">${svgIconPaths(asset.icon)}</g>
  </g>
  <g>
    <rect x="150" y="560" width="260" height="58" rx="22" class="chip"/>
    <text x="180" y="598" class="copy" font-size="28">${text}</text>
    <rect x="442" y="560" width="368" height="58" rx="22" class="chip"/>
    <text x="472" y="597" class="copy caption">${label}</text>
  </g>
  <path d="M122 108C210 146 252 120 318 108" stroke="#fff" stroke-opacity=".48" stroke-width="3" stroke-linecap="round"/>
  <circle cx="812" cy="132" r="7" fill="${asset.accent3}" opacity=".9"/>
  <circle cx="790" cy="132" r="7" fill="${asset.accent2}" opacity=".75"/>
</svg>
`;
}

function writeServiceVisualAssets() {
  const assetDir = path.join(root, "public", "assets", "yffi3");
  fs.mkdirSync(assetDir, { recursive: true });
  for (const asset of Object.values(serviceVisuals)) {
    writeFile(path.join(assetDir, asset.file), serviceVisualSvg(asset));
  }
}

function trustTicker() {
  const interactiveTrack = tickerItems.map(([label, href]) => {
    const external = href.startsWith("http") ? ' rel="noopener"' : "";
    return `<a href="${href}"${external}>${escapeHtml(label)}</a>`;
  }).join("");
  const duplicateTrack = tickerItems.map(([label]) => `<span class="ticker-copy">${escapeHtml(label)}</span>`).join("");
  return `
    <div class="trust-ticker" aria-label="Office highlights and insurance services" data-animate data-in-view="true">
      <div class="trust-track">
        <span>${interactiveTrack}</span>
        <span aria-hidden="true">${duplicateTrack}</span>
      </div>
    </div>
  `;
}

function navHtml(currentSlug) {
  const mainNavSlugs = ["", "auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance", "policyholder-help", "about-office-3"];
  const navLabels = {
    "": "Home",
    "auto-insurance": "Auto",
    "home-insurance": "Homeowners",
    "commercial-insurance": "Commercial",
    "life-insurance": "Life",
    "renters-insurance": "Renters",
    "policyholder-help": "Customers",
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
        <a class="brand-lockup" href="/">
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
  const links = pages
    .filter((page) => page.kind !== "resource")
    .map((page) => `<li><a href="${page.slug ? `/${page.slug}/` : "/"}">${escapeHtml(page.nav)}</a></li>`)
    .join("");
  return `
    <footer class="site-footer">
      <div class="footer-shell">
        <div class="footer-brand">
          <div class="footer-logo-pair">
            <span class="footer-logo footer-logo-banner">${logoImg("eager")}</span>
            <span class="footer-logo footer-logo-original">${originalFranchiseLogoImg("eager")}</span>
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
          <p>Visit our West Flagler office for insurance help in Miami, Sweetwater, Doral, Hialeah and Kendall. We speak English and Spanish.</p>
          <p><a href="${googleMapsUrl}" target="_blank" rel="noopener external">View the verified office listing on Google Maps</a></p>
          <p><a href="https://licenseesearch.fldfs.com/" target="_blank" rel="noopener external">Verify insurance licenses with Florida DFS</a></p>
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
    alternateName: "Your Family First Insurance Office 3",
    identifier: "Office #3",
    slogan: "Where Your Family Comes First",
    url: siteUrl,
    telephone: "+13059108850",
    image: `${siteUrl}${familyPhotoSrc}`,
    logo: `${siteUrl}${logoSrc}`,
    sameAs: [googleMapsUrl],
    hasMap: googleMapsUrl,
    brand: {
      "@type": "Organization",
      name: brandName,
      url: brandUrl,
      sameAs: [facebookUrl]
    },
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
    }
  };
}

function webPageSchema(page) {
  const pageName = page.title.replace(/\s*\|\s*/g, " - ");
  return {
    "@context": "https://schema.org",
    "@type": page.kind === "about" ? "AboutPage" : page.kind === "quote" ? "ContactPage" : "WebPage",
    "@id": `${pageUrl(page.slug)}#webpage`,
    url: pageUrl(page.slug),
    name: pageName,
    description: page.description,
    inLanguage: "en-US",
    dateModified: contentReviewedDate,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#insuranceagency` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}${familyPhotoSrc}`
    },
    ...(page.slug ? { breadcrumb: { "@id": `${pageUrl(page.slug)}#breadcrumb` } } : {})
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
      ...homeServiceCards().map((card) => [card.title, card.href.startsWith("tel:") ? `${siteUrl}/#${card.id}` : `${siteUrl}${card.href}`]),
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
    "@id": `${pageUrl(page.slug)}#breadcrumb`,
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
    "@id": `${pageUrl(page.slug)}#faqs`,
    inLanguage: page.locale || "en-US",
    mainEntity: page.faqs.map((entry, index) => ({
      "@type": "Question",
      "@id": `${pageUrl(page.slug)}#faq-${index + 1}`,
      name: entry[0],
      acceptedAnswer: { "@type": "Answer", text: faqAnswerHtml(entry) }
    }))
  };
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function googleTagManagerHead() {
  return `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var loaded=false;
function load(){if(loaded)return;loaded=true;var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}
function afterPaint(){if(w.requestAnimationFrame){w.requestAnimationFrame(function(){w.requestAnimationFrame(load);});}else{load();}}
if(d.readyState==='loading'){d.addEventListener('DOMContentLoaded',afterPaint,{once:true});}else{afterPaint();}
w.addEventListener('pointerdown',load,{once:true,passive:true});w.addEventListener('keydown',load,{once:true});
})(window,document,'script','dataLayer','${googleTagManagerId}');</script>
<!-- End Google Tag Manager -->`;
}

function googleTagManagerBody() {
  return `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
}

function headHtml(page) {
  const schemas = [organizationSchema(), websiteSchema(), webPageSchema(page), page.kind === "home" ? serviceItemListSchema() : null, breadcrumbSchema(page), serviceSchema(page), faqSchema(page)].filter(Boolean);
  const firstMotionSlide = ["home", "service"].includes(page.kind) ? orderedInsuranceSlides(page)[0] : null;
  const preloadPhoto = firstMotionSlide
    ? `<link rel="preload" href="${carouselImageSrc(firstMotionSlide)}" as="image" fetchpriority="high">`
    : page.kind === "home"
      ? `<link rel="preload" href="${familyWebpSrc}" as="image" type="image/webp">`
      : "";
  const keywords = page.keywords || "Miami insurance agency, West Flagler insurance, auto insurance Miami, homeowners insurance Miami, renters insurance Miami, general liability insurance Miami, commercial insurance Miami, life insurance Miami, health insurance Miami, bilingual insurance office";
  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta name="geo.region" content="US-FL">
    <meta name="geo.placename" content="Miami, Florida">
    <meta name="last-modified" content="${contentReviewedDate}">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="theme-color" content="#06111F">
    <meta name="format-detection" content="telephone=yes">
    <link rel="canonical" href="${pageUrl(page.slug)}">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${pageUrl(page.slug)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${siteUrl}${familyPhotoSrc}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="974">
    <meta property="og:image:height" content="732">
    <meta property="og:image:alt" content="Your Family First Insurance Office #3 family and office team in Miami">
    <meta property="og:site_name" content="${businessName}">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${siteUrl}${familyPhotoSrc}">
    <meta name="twitter:image:alt" content="Your Family First Insurance Office #3 family and office team in Miami">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="${logoSrc}">
    <link rel="preconnect" href="https://secure.ConsumerRateQuotes.com">
    <link rel="preload" href="${logoPreloadSrc}" as="image" type="image/webp" fetchpriority="high">
    ${preloadPhoto}
    <link rel="stylesheet" href="/assets/styles.css">
    <script src="/assets/site.js" defer></script>
    ${schemas.map(jsonLd).join("\n")}
  `;
}

function ctaRow(extra = "", page = null) {
  if (["commercial-insurance", "life-insurance"].includes(page?.slug)) return `<div class="cta-row ${extra}"><a class="button warm" href="${phoneHref}">Call for a Free Quote ${iconSvg("arrow")}</a><a class="button light" href="#coverage-details">Compare Coverage</a></div>`;
  return `
    <div class="cta-row ${extra}">
      <a class="button warm" href="${quoteDestination}" rel="noopener">Get My Free Quote ${iconSvg("arrow")}</a>
      <a class="button light" href="${phoneHref}">Call ${phoneDisplay}</a>
    </div>
  `;
}

function slidesForPage(page) {
  const key = page.kind === "service" ? page.slug : "home";
  return carouselMediaByPage[key] || carouselMediaByPage.home || [];
}

function orderedInsuranceSlides(page) {
  return slidesForPage(page);
}

function carouselImageSrc(slide) {
  const source = slide.type === "image" ? slide.src : slide.poster;
  const optimized = source.replace(/\.(png|jpe?g)$/i, ".webp");
  return fs.existsSync(path.join(root, "public", optimized)) ? optimized : source;
}

function carouselVideoMarkup(slide) {
  if (slide.type !== "video") return "";
  const primaryWebm = slide.src?.endsWith(".webm") ? slide.src : "";
  const primaryMp4 = slide.src?.endsWith(".mp4") ? slide.src : "";
  const mp4 = slide.fallbackMp4 || primaryMp4;
  return `<video class="motion-video" aria-hidden="true" muted loop playsinline preload="none"${primaryWebm ? ` data-src="${primaryWebm}"` : ""}${mp4 ? ` data-mp4="${mp4}"` : ""} style="object-position: ${escapeHtml(slide.objectPosition)}"></video>`;
}

function carouselMotionAssetMarkup(slide) {
  if (!["lottie", "rive"].includes(slide.type)) return "";
  return `<span class="motion-asset-fallback" aria-hidden="true" data-motion-type="${escapeHtml(slide.type)}" data-motion-src="${escapeHtml(slide.src)}"></span>`;
}

function insuranceMotionCarousel(page) {
  const slides = orderedInsuranceSlides(page);
  const firstSlide = slides[0];
  const isFocused = page.kind === "service";
  const chipButtons = slides.map((slide, index) => `
    <button class="carousel-chip" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-controls="motion-slide-${page.slug || "home"}-${slide.id}" data-slide-id="${slide.id}" data-carousel-chip>
      <span class="chip-icon">${iconSvg(slide.icon)}</span>
      <span>${escapeHtml(slide.chip)}</span>
    </button>
  `).join("");
  const dots = slides.map((slide, index) => `
    <button class="carousel-dot" type="button" aria-label="Show ${escapeHtml(slide.category)} slide" aria-current="${index === 0 ? "true" : "false"}" data-slide-id="${slide.id}" data-carousel-dot><span></span></button>
  `).join("");
  const slideMarkup = slides.map((slide, index) => {
    const href = isFocused ? (["commercial-insurance", "life-insurance"].includes(page.slug) ? phoneHref : quoteDestination) : slide.href;
    const cta = isFocused ? (href === phoneHref ? "Call for a Free Quote" : "Get My Free Quote") : (slide.id === "home-bilingual" ? "Visit Our Office" : "View Coverage");
    return `
    <article class="motion-slide" id="motion-slide-${page.slug || "home"}-${slide.id}" data-slide-id="${slide.id}" data-media-type="${escapeHtml(slide.type)}" data-media-priority="${escapeHtml(slide.priority)}" data-active="${index === 0 ? "true" : "false"}"${index === 0 ? "" : " inert"} aria-label="${index + 1} of ${slides.length}: ${escapeHtml(slide.category)}">
      <a class="motion-media-link" href="${href}" aria-label="${escapeHtml(cta)}">
        <img class="motion-poster" ${index === 0 ? `src="${carouselImageSrc(slide)}"` : `src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-poster-src="${carouselImageSrc(slide)}"`} alt="${escapeHtml(slide.alt)}" width="1200" height="750" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" fetchpriority="${index === 0 ? "high" : "low"}" style="object-position: ${escapeHtml(slide.objectPosition)}">
        ${carouselVideoMarkup(slide)}
        ${carouselMotionAssetMarkup(slide)}
        <span class="motion-scrim" aria-hidden="true"></span>
        <span class="motion-sheen" aria-hidden="true"></span>
      </a>
      <div class="motion-slide-copy">
        <h2>${escapeHtml(slide.headline)}</h2>
        <p>${escapeHtml(slide.subheadline)}</p>
        <div class="motion-actions">
          <a class="button warm magnetic-button" href="${href}">${escapeHtml(cta)} ${iconSvg("arrow")}</a>
        </div>
      </div>
    </article>
  `; }).join("");

  return `
    <div class="motion-carousel ${isFocused ? "focused-carousel" : "story-carousel"} liquid-tilt" data-insurance-carousel data-mode="${isFocused ? "focused" : "broad"}" data-start-slide="${firstSlide.id}" data-animate data-in-view="true" aria-label="${isFocused ? `${escapeHtml(page.service)} media carousel` : "Interactive insurance coverage carousel"}">
      <div class="carousel-chips" role="tablist" aria-label="${isFocused ? `${escapeHtml(page.service)} topics` : "Insurance categories"}">${chipButtons}</div>
      <div class="carousel-stage">
        <button class="carousel-arrow carousel-prev" type="button" aria-label="Previous insurance slide" data-carousel-prev>${iconSvg("arrow")}</button>
        <div class="carousel-track" tabindex="0" aria-live="off">${slideMarkup}</div>
        <button class="carousel-arrow carousel-next" type="button" aria-label="Next insurance slide" data-carousel-next>${iconSvg("arrow")}</button>
      </div>
      <div class="carousel-controls">
        <div class="carousel-dots" aria-label="Carousel slides">${dots}</div>
        <div class="carousel-progress" aria-hidden="true"><span></span></div>
        <button type="button" class="carousel-motion-toggle" data-carousel-motion aria-pressed="false">Pause motion</button>
      </div>
    </div>
  `;
}

function heroHtml(page) {
  const isHome = page.kind === "home";
  const isService = page.kind === "service";
  const hasMotionCarousel = isHome || isService;
  const hasVisual = hasMotionCarousel;
  return `
    <section class="hero ${isHome ? "home-hero" : "inner-hero"} ${hasVisual ? "" : "text-hero"}">
      <div class="hero-content">
        ${isHome ? "" : `<p class="kicker">${escapeHtml(page.nav)}</p>`}
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="hero-lead">${escapeHtml(page.intro)}</p>
        ${["home", "service"].includes(page.kind) ? ctaRow("", page) : ""}
        ${hasVisual ? `<p class="trust-line">11200 W Flagler St <span>·</span> Suite 108–109 <span>·</span> Miami</p>` : ""}
      </div>
      ${hasVisual ? `<div class="${hasMotionCarousel ? "motion-showcase" : "photo-showcase liquid-tilt"}">
        ${
          hasMotionCarousel
            ? insuranceMotionCarousel(page)
            : `${familyPicture("hero-photo", isHome ? "eager" : "lazy", isHome ? "high" : "auto")}
               <div class="photo-caption"><strong>Our family at Office #3</strong><span>Miami, Florida</span></div>`
        }
      </div>` : ""}
    </section>
  `;
}

function aboutPreview() {
  return `
    <section class="section about-panel" data-reveal>
      <div class="about-copy">
        <p class="kicker">About Office #3</p>
        <h2>Visit Our West Flagler Office</h2>
        <p>${businessName} helps you compare insurance and understand what each option covers. Bring your questions, current policy or renewal notice.</p>
        <p>Find us at 11200 W Flagler St, Suite 108-109, Miami, FL 33174. Call before visiting to confirm availability.</p>
        <p id="seguros-en-espanol" lang="es">Hablamos español. <a href="/es/">Ver seguros y cotizaciones en español</a>.</p>
        <div class="cta-row compact"><a class="button warm" href="${googleMapsUrl}" target="_blank" rel="noopener">Get Directions ${iconSvg("arrow")}</a><a class="button light" href="${phoneHref}">Call ${phoneDisplay}</a></div>
      </div>
      <div class="about-media">
        ${principalPicture("about-photo principal-photo")}
        <div class="photo-caption"><strong>Ariel Busutil, Office #3 Owner</strong><span>Miami, Florida</span></div>
        <div class="office-proof-strip">
          ${familyPicture("office-proof-photo")}
          <p><strong>Our family at Office #3</strong><span>Miami, Florida</span></p>
        </div>
      </div>
    </section>
  `;
}

function homeServiceCards() {
  const order = ["auto-insurance", "home-insurance", "renters-insurance", "commercial-insurance", "life-insurance", "general-liability-insurance", "health-insurance"];
  return serviceCards.filter((card) => order.includes(card.id)).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

function coverageCards() {
  return `
    <section class="section coverage-section" aria-labelledby="coverage-title" data-reveal>
      <div class="section-heading center">
        <p class="kicker">Our services</p>
        <h2 id="coverage-title">What Would You Like to Insure?</h2>
        <p>Choose a type of insurance to see what to consider and what to have ready for a quote.</p>
      </div>
      <div class="coverage-grid">
        ${homeServiceCards().map((card) => `
          <a class="coverage-card" id="${card.id}" href="${card.href}" style="--card-accent: ${card.accent || "rgba(154, 220, 247, 0.26)"}" data-reveal>
            <span class="soft-icon">${iconSvg(card.icon)}</span>
            <div>${card.id === "commercial-insurance" ? '<span id="business-insurance"></span>' : ""}<h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.copy)}</p></div>
            ${iconSvg("arrow")}
          </a>
        `).join("")}
      </div>
      <p class="specialty-intro">Other insurance: call us to discuss these options.</p>
      <div class="coverage-link-rail" aria-label="Additional insurance quote paths">
        ${specialtyCoverageLinks.map(([id, label, href]) => `<a id="${id}" href="${href}">${escapeHtml(label)}</a>`).join("")}
      </div>
    </section>
  `;
}

function reviewTrustSection() {
  return `
    <section class="section review-panel" id="google-reviews" data-reveal>
      <div class="review-copy">
        <p class="kicker">Google reviews for Office #3</p>
        <h2>Reviews of Our Miami Office</h2>
        <p>Read what people have shared about Office #3. Visit Google for the latest reviews.</p>
        <div class="review-actions">
          <a class="button warm magnetic-button" href="${googleReviewUrl}" target="_blank" rel="noopener">Read or Leave a Google Review ${iconSvg("arrow")}</a>
          <a class="button light magnetic-button" href="${phoneHref}">Call ${phoneDisplay}</a>
        </div>
        <p class="review-disclaimer">Reviews describe individual experiences.</p>
      </div>
      <div class="google-review-studio" data-google-review-carousel aria-label="Google reviews of Office #3">
        <a class="review-qr-card magnetic-button" href="${googleReviewUrl}" target="_blank" rel="noopener">
          <img src="${googleReviewQrSrc}" alt="QR code linking to the Your Family First Insurance Office #3 Google review page" width="132" height="132" loading="lazy" decoding="async">
          <span>
            <strong>Scan to review Office #3</strong>
            <em>Opens the live Google review page.</em>
          </span>
        </a>
        <div class="google-review-carousel real-review-carousel" aria-live="polite">
          <div class="google-review-track real-review-track">
            ${googleReviews.map((review, index) => reviewCard(review, index)).join("")}
          </div>
          <div class="review-carousel-controls" aria-label="Google review carousel controls">
            <button type="button" data-review-prev aria-label="Previous Google review">${iconSvg("arrow")}</button>
            <div class="review-dots real-review-dots" role="tablist" aria-label="Google reviews">
              ${googleReviews.map((review, index) => `<button type="button" data-review-dot="${index}" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-label="Show Google review from ${escapeHtml(review.authorName)}"></button>`).join("")}
            </div>
            <button type="button" data-review-next aria-label="Next Google review">${iconSvg("arrow")}</button>
          </div>
        </div>
        <div class="real-review-rail" role="tablist" aria-label="All Google review entries">
          ${googleReviews.map((review, index) => reviewMiniCard(review, index)).join("")}
        </div>
      </div>
    </section>
  `;
}

function quoteForm(formId = "quote-handoff") {
  return `
    <section id="${formId}" class="quote-form quote-handoff-card" data-quote-handoff aria-labelledby="quote-handoff-title">
      <h3 id="quote-handoff-title" class="wide">Online Quote</h3>
      <p class="wide">Choose auto, homeowners, renters or condo insurance in the secure form. You can also request an auto and property bundle. Have your current policy handy if available.</p>
      <a class="button warm wide" href="${quoteDestination}" rel="noopener" data-secure-quote-handoff>Get My Free Quote ${iconSvg("arrow")}</a>
      <p class="form-disclaimer wide">Requesting a quote does not start coverage. <a href="/privacy-policy/">Privacy policy</a>.</p>
    </section>
  `;
}

function quoteSection(title = "Get My Free Quote") {
  return `
    <section class="section quote-panel" id="quote" data-reveal>
      <div class="quote-copy">
        <p class="kicker">Free insurance quotes</p>
        <h2>${escapeHtml(title)}</h2>
        <p>Request auto, home, renters or condo insurance online. For business, life, health or another insurance type, call or text us.</p>
        <div class="callout">
          ${iconSvg("phone")}
          <p><strong>Prefer to talk now?</strong><br><a href="${phoneHref}">Call ${phoneDisplay}</a> or <a href="${smsHref}">text the office</a>.</p>
        </div>
        <div class="qr-card">
          <img src="${qrWebpSrc}" alt="QR code to request a quote from Office #3" width="400" height="386" loading="lazy" decoding="async">
          <p><strong>Quote from your phone</strong><br>Scan to open the online quote form.</p>
        </div>
      </div>
      ${quoteForm()}
    </section>
  `;
}

const officialResourcesBySlug = {
  "": [
    ["Your Family First Insurance company website", "https://yourfamilyfirstinsurance.com/home/"],
    ["Florida DFS insurance consumer resources", "https://www.myfloridacfo.com/division/consumers/understanding-insurance"],
    ["Florida DFS licensee search", "https://licenseesearch.fldfs.com/"]
  ],
  "auto-insurance": [
    ["Florida DFS personal auto insurance overview", "https://www.myfloridacfo.com/division/consumers/understanding-insurance/personal-automobile-insurance-overview"],
    ["Florida DFS licensee search", "https://licenseesearch.fldfs.com/"]
  ],
  "home-insurance": [
    ["Florida DFS homeowners insurance overview", "https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview"],
    ["Florida DFS flood insurance guide", "https://myfloridacfo.com/division/ica/fullcoverage/flood"],
    ["Florida Statute 627.7011 roof-age provisions", "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0627/Sections/0627.7011.html"]
  ],
  "renters-insurance": [
    ["Florida DFS homeowners and renters overview", "https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview"],
    ["Florida DFS flood insurance guide", "https://myfloridacfo.com/division/ica/fullcoverage/flood"]
  ],
  "commercial-insurance": [
    ["Florida DFS insurance consumer library", "https://www.myfloridacfo.com/division/consumers/understanding-insurance"],
    ["Florida DFS licensee search", "https://licenseesearch.fldfs.com/"]
  ],
  "life-insurance": [
    ["Florida DFS life insurance guide", "https://www.myfloridacfo.com/division/consumers/understanding-insurance/lifeinsuranceoverview"],
    ["Florida DFS licensee search", "https://licenseesearch.fldfs.com/"]
  ],
  "about-office-3": [
    ["Your Family First Insurance company website", "https://yourfamilyfirstinsurance.com/home/"],
    ["Office #3 on Google Maps", googleMapsUrl],
    ["Florida DFS licensee search", "https://licenseesearch.fldfs.com/"]
  ]
};

function officialResourcesPanel(page) {
  const resources = officialResourcesBySlug[page.slug] || [];
  if (!resources.length) return "";
  return `
    <section class="section source-panel" aria-labelledby="source-title-${page.slug || "home"}" data-reveal>
      <div class="notice-card">
        <p class="kicker">Insurance resources</p>
        <h2 id="source-title-${page.slug || "home"}">Florida Insurance Resources</h2>
        <p>Read Florida consumer guides or look up an insurance license. For questions about your own coverage, check your policy or call us.</p>
        <div class="link-pills">
          ${resources.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener external">${escapeHtml(label)}</a>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function homeBody() {
  return `
    ${coverageCards()}
    ${aboutPreview()}
    ${reviewTrustSection()}
    ${quoteSection("Get My Free Quote")}
    ${faqHtml(pages[0])}
  `;
}

function serviceBody(page) {
  const quoteInstructions = {
    "auto-insurance": "Select Auto in the secure form. Have your current policy, driver and vehicle information ready so you can compare the same limits and deductibles.",
    "home-insurance": "Select Homeowners or Condo Owners in the secure form. Have the property address, current policy and any roof information available.",
    "renters-insurance": "Select Renters in the secure form. Have your rental address and any insurance requirements from your lease available.",
    "commercial-insurance": "Call or text us about your business, employees, vehicles and any insurance requirements from a client or landlord.",
    "life-insurance": "Call or text us to discuss who depends on your income, the amount of coverage you need and how long you need it."
  };
  return `
    <section class="section service-detail" id="coverage-details" data-reveal>
      <div class="section-heading">
        <p class="kicker">Coverage details</p>
        <h2>What to Review Before You Choose</h2>
      </div>
      <div class="detail-grid">
        ${page.sections.map(([title, copy]) => `<article class="detail-card"${page.slug === "commercial-insurance" && title === "General liability" ? ' id="general-liability-insurance"' : ""} data-reveal="card"><span class="soft-icon">${iconSvg(page.icon)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}
      </div>
    </section>
    <section class="section service-cta" data-reveal>
      <div>
        <p class="kicker">Free quotes</p>
        <h2>Request a Free Quote</h2>
        <p>${escapeHtml(quoteInstructions[page.slug])}</p>
      </div>
      <a class="button light" href="${["commercial-insurance", "life-insurance"].includes(page.slug) ? phoneHref : quoteDestination}" rel="noopener">${["commercial-insurance", "life-insurance"].includes(page.slug) ? `Call ${phoneDisplay}` : "Start My Quote Request"} ${iconSvg("arrow")}</a>
    </section>
    ${faqHtml(page)}
    ${officialResourcesPanel(page)}
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
      <h2>Explore Other Insurance Options</h2>
      <div class="link-pills">${related}</div>
    </section>
  `;
}

function aboutBody() {
  return `
    ${aboutPreview()}
    ${reviewTrustSection()}
    ${faqHtml(pages.find((page) => page.slug === "about-office-3"))}
  `;
}

function quoteBody() {
  return `
    <section class="section quote-panel quote-page-panel" data-reveal>
      ${quoteForm()}
      <div class="quote-copy">
        <h2>Prefer to Talk?</h2>
        <p>Call for help with business, life or any insurance type not listed in the online form. We can answer your questions in English or Spanish.</p>
        <div class="cta-row"><a class="button light" href="${phoneHref}">Call ${phoneDisplay}</a><a class="button light" href="${smsHref}">Text the Office</a></div>
      </div>
    </section>
    ${faqHtml(pages.find((page) => page.slug === "get-a-quote"))}
  `;
}

function policyholderContactPanel() {
  return `
    <section class="section service-cta policyholder-contact" data-reveal>
      <div>
        <p class="kicker">Existing customer service</p>
        <h2>Contact Office #3 About Your Policy</h2>
        <p>Do not place policy numbers, identification, payment details, medical information, claim files, or policy documents on this public site or in an ordinary text message.</p>
      </div>
      <a class="button light" href="${phoneHref}">Call ${phoneDisplay} ${iconSvg("phone")}</a>
    </section>
  `;
}

function policyholderResourceCards(page) {
  if (!page.resources?.length) return "";
  return `
    <section class="section search-intent-panel policyholder-resources" data-reveal>
      <div class="section-heading">
        <p class="kicker">Customer resource center</p>
        <h2>Prepare Before the Deadline or Emergency</h2>
        <p>Use these checklists to prepare for a renewal, claim or policy review. Call us with questions about your policy.</p>
      </div>
      <div class="intent-grid">
        ${page.resources.map(([title, href, copy]) => `
          <article class="intent-card" data-reveal="card">
            <h3><a href="${escapeHtml(href)}">${escapeHtml(title)}</a></h3>
            <p>${escapeHtml(copy)}</p>
            <a class="text-link" href="${escapeHtml(href)}">Open the guide ${iconSvg("arrow")}</a>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function policyholderSourcePanel(page) {
  if (!page.sourceLinks?.length) return "";
  const sourceId = `source-title-${page.slug.replaceAll("/", "-")}`;
  return `
    <section class="section source-panel policyholder-sources" aria-labelledby="${sourceId}" data-reveal>
      <div class="notice-card">
        <p class="kicker">Insurance resources</p>
        <h2 id="${sourceId}">Consumer Guides</h2>
        <p>Find more detail in these consumer guides. Follow your insurer’s instructions for your policy or claim.</p>
        <div class="link-pills">
          ${page.sourceLinks.map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener external">${escapeHtml(label)}</a>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function policyholderBody(page) {
  return `
    <section class="section service-detail policyholder-detail" data-reveal>
      <div class="section-heading">
        <p class="kicker">Policyholder service guide</p>
        <h2>What Do You Need Help With?</h2>
        <p>Call us for help with the items below. Report new claims directly to your insurer.</p>
      </div>
      <div class="detail-grid">
        ${page.sections.map(([title, copy]) => `<article class="detail-card"${page.slug === "commercial-insurance" && title === "General liability" ? ' id="general-liability-insurance"' : ""} data-reveal="card"><span class="soft-icon">${iconSvg("shield")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}
      </div>
    </section>
    ${policyholderResourceCards(page)}
    ${policyholderContactPanel()}
    ${faqHtml(page)}
  `;
}

function customerResourceBody(page) {
  return `
    <section class="section service-detail policyholder-detail" data-reveal>
      <div class="section-heading">
        <p class="kicker">Customer checklist</p>
        <h2>Your Checklist</h2>
        <p>Use these steps to prepare your questions and documents. Your policy and insurer determine what is covered.</p>
      </div>
      <div class="detail-grid">
        ${page.sections.map(([title, copy]) => `<article class="detail-card"${page.slug === "commercial-insurance" && title === "General liability" ? ' id="general-liability-insurance"' : ""} data-reveal="card"><span class="soft-icon">${iconSvg("shield")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}
      </div>
    </section>
    ${policyholderSourcePanel(page)}
    ${policyholderContactPanel()}
    <section class="section related-links" data-reveal>
      <p class="kicker">More customer help</p>
      <h2>Return to the Policyholder Resource Center</h2>
      <div class="link-pills"><a href="/policyholder-help/">View all customer service guides</a></div>
    </section>
    ${faqHtml(page)}
  `;
}

function privacyBody() {
  return `
    <section class="section legal-copy" data-reveal>
      <h2>Privacy Summary</h2>
      <p>This website provides business information, service pages, and quote contact options for ${businessName}.</p>
      <p>This website does not collect quote form submissions. Our quote links open ConsumerRateQuotes, which handles the information you enter under its own privacy terms.</p>
      <p>This policy covers this Office #3 website. Other services you visit through our links have their own privacy policies.</p>
      <h2>Information Entered on This Public Site</h2>
      <p>No contact or underwriting fields are submitted to this public site. Information entered after following the quote link is handled by the separate ConsumerRateQuotes service.</p>
      <h2>Security Measures</h2>
      <p>This site uses HTTPS to encrypt the connection. Before sending personal documents, call the office for the appropriate submission method.</p>
      <h2>Cookies and Tracking</h2>
      <p>This website uses Google Analytics 4 and Google Ads measurement tools to understand visits and interactions. Google Tag Manager loads these tools.</p>
      <p>GA4 may use first-party cookies, including <code>_ga</code>, and collect page and interaction data, device and browser information, approximate location derived from an Internet Protocol address, and a randomly assigned browser identifier. Google states that GA4 does not log or store individual Internet Protocol addresses. GTM itself manages tags; the tags loaded through it determine what data is collected.</p>
      <p>Google Ads may use cookies or similar identifiers to measure advertising interactions and conversions. You can manage cookies through your browser settings.</p>
      <p>The website records page visits and interactions such as quote-link and phone-link clicks, along with general campaign information. Its analytics event code does not send names, phone numbers, email addresses, ZIP codes, notes, insurance details, raw referrer URLs, or full query strings.</p>
      <p>General campaign information is kept in browser session storage for the current tab session. It is not sent with the quote link to ConsumerRateQuotes. A quote-link click does not tell us whether you completed an application.</p>
      <p>This website does not currently provide a cookie-preference panel. You can restrict cookies in your browser settings.</p>
      <h2>Retention and Your Choices</h2>
      <p>Contact us with questions about data retention or privacy requests. You can restrict cookies in your browser or install the Google Analytics Opt-out Browser Add-on. The public insurance information remains available if you block cookies.</p>
      <p>Google's privacy information is available at <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>, and the opt-out add-on is available at <a href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</a>.</p>
      <h2>Third-Party Quote Intake</h2>
      <p>ConsumerRateQuotes is a separate service. Review its privacy terms before entering personal information.</p>
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
      <p>Quote links open ConsumerRateQuotes. That service has its own terms and privacy practices.</p>
      <h2>No Legal or Financial Advice</h2>
      <p>Website content is general information and is not legal, tax, financial, or claims advice.</p>
    </section>
  `;
}

function faqAnswerHtml([, answer, links = []]) {
  const actions = links.length
    ? `<p class="faq-links">${links.map(([label, href]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`).join(" ")}</p>`
    : "";
  return `<p>${escapeHtml(answer)}</p>${actions}`;
}

function faqHtml(page) {
  if (!page?.faqs) return "";
  const spanish = page.locale?.startsWith("es");
  return `
    <section class="section faq" id="faqs" aria-labelledby="faq-title" data-reveal>
      <div class="section-heading">
        <p class="kicker">FAQ</p>
        <h2 id="faq-title">${escapeHtml(page.faqTitle || (spanish ? "Preguntas frecuentes" : "Frequently Asked Questions"))}</h2>
      </div>
      <div class="faq-list">
        ${page.faqs.map((entry, index) => `<details><summary id="faq-${index + 1}">${escapeHtml(entry[0])}</summary><div class="faq-answer">${faqAnswerHtml(entry)}</div></details>`).join("")}
      </div>
    </section>
  `;
}

function bodyFor(page) {
  if (page.kind === "home") return homeBody();
  if (page.kind === "service") return serviceBody(page);
  if (page.kind === "about") return aboutBody();
  if (page.kind === "quote") return quoteBody();
  if (page.kind === "retention") return policyholderBody(page);
  if (page.kind === "resource") return customerResourceBody(page);
  if (page.kind === "privacy") return privacyBody();
  if (page.kind === "terms") return termsBody();
  return "";
}

function pageHtml(page) {
  return `<!doctype html>
<html lang="en">
<head>${googleTagManagerHead()}${headHtml(page)}</head>
<body>${googleTagManagerBody()}
  <a class="skip-link" href="#main">Skip to content</a>
  ${navHtml(page.slug)}
  <main id="main">
    ${heroHtml(page)}
    ${bodyFor(page)}
  </main>
  ${footerHtml()}
  <nav class="mobile-contact-bar" aria-label="Quick contact"><a href="${["commercial-insurance", "life-insurance"].includes(page.slug) ? "#coverage-details" : phoneHref}">${iconSvg(["commercial-insurance", "life-insurance"].includes(page.slug) ? "shield" : "phone")} ${["commercial-insurance", "life-insurance"].includes(page.slug) ? "View Coverage" : "Call Office #3"}</a><a href="${["commercial-insurance", "life-insurance"].includes(page.slug) ? phoneHref : quoteDestination}">${["commercial-insurance", "life-insurance"].includes(page.slug) ? "Call for a Free Quote" : "Get My Free Quote"} ${iconSvg("arrow")}</a></nav>
</body>
</html>
`;
}

function notFoundHtml() {
  const description = "The requested Your Family First Insurance Office #3 page was not found. Use the main navigation or request local Miami insurance quote help.";
  return `<!doctype html>
<html lang="en">
<head>${googleTagManagerHead()}
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page Not Found | Your Family First Insurance Office #3</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="noindex, nofollow, noarchive">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="theme-color" content="#06111F">
    <link rel="canonical" href="${siteUrl}/404.html">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="stylesheet" href="/assets/styles.css">
    <script src="/assets/site.js" defer></script>
</head>
<body>${googleTagManagerBody()}
  <a class="skip-link" href="#main">Skip to content</a>
  ${navHtml("")}
  <main id="main">
    <section class="hero inner-hero not-found-hero" data-reveal>
      <div class="hero-content" data-reveal="left">
        <h1>Page Not Found</h1>
        <p class="hero-lead">That page is not available. Your Family First Insurance Office #3 can still help with local Miami auto, homeowners, renters, life, and business insurance quote conversations.</p>
        ${ctaRow()}
      </div>
      <div class="photo-showcase liquid-tilt" data-reveal="right">
        ${familyPicture("hero-photo", "lazy", "auto")}
        <div class="photo-caption"><strong>Office #3</strong><span>Miami, Florida</span></div>
      </div>
    </section>
  </main>
  ${footerHtml()}
</body>
</html>
`;
}

function cssSource() {
  return `:root {
  color-scheme: dark;
  --navy: #050B12;
  --deep-blue: #7DD3FC;
  --miami-blue: #9ADCF7;
  --aqua: #77E7DC;
  --ice: #F3FBFF;
  --white: #FFF8EC;
  --coral: #FF7D65;
  --gold: #F4C96B;
  --champagne: #FFE0A1;
  --ink: #FFF8EC;
  --ink-soft: #E9F1FA;
  --muted: #B7C7D8;
  --cream: #050B12;
  --cream-2: #08131D;
  --powder: #10283A;
  --sage: #173426;
  --sage-strong: #86CFA0;
  --clay: #FFA184;
  --line: rgba(255, 255, 255, 0.16);
  --line-blue: rgba(154, 220, 247, 0.20);
  --surface: rgba(14, 31, 43, 0.70);
  --surface-strong: rgba(20, 45, 58, 0.82);
  --glass: rgba(255, 255, 255, 0.075);
  --glass-strong: rgba(255, 255, 255, 0.145);
  --glass-line: rgba(255, 255, 255, 0.24);
  --glass-blur: 10px;
  --glass-blur-soft: 7px;
  --glass-rim: rgba(154, 220, 247, 0.42);
  --glass-rim-hot: rgba(255, 224, 161, 0.58);
  --liquid-glow: rgba(119, 231, 220, 0.22);
  --liquid-cyan: rgba(154, 220, 247, 0.72);
  --liquid-gold: rgba(255, 224, 161, 0.66);
  --liquid-coral: rgba(255, 125, 101, 0.58);
  --shadow: 0 22px 64px rgba(0, 0, 0, 0.46);
  --shadow-soft: 0 14px 42px rgba(0, 0, 0, 0.30);
  --glow-coral: 0 0 0 1px rgba(255, 255, 255, 0.16), 0 14px 38px rgba(255, 125, 101, 0.20), 0 0 30px rgba(119, 231, 220, 0.11);
  --radius: 18px;
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --glare-x: 50%;
  --glare-y: 0%;
}

* { box-sizing: border-box; }
html {
  max-width: 100%;
  overflow-x: clip;
  scroll-behavior: smooth;
}
body {
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--ink-soft);
  background:
    linear-gradient(180deg, #050B12 0%, #07131F 28%, #061A20 52%, #050B12 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}
body::before {
  content: "";
  position: fixed;
  inset: -8%;
  pointer-events: none;
  z-index: -2;
  background:
    linear-gradient(115deg, rgba(119, 231, 220, 0.11), transparent 28%, rgba(255, 161, 132, 0.08) 54%, transparent 74%),
    linear-gradient(245deg, rgba(244, 201, 107, 0.10), transparent 26%, rgba(134, 207, 160, 0.08) 62%, transparent 82%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.026) 0 1px, transparent 1px 96px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.018) 0 1px, transparent 1px 96px);
  background-size: 180% 180%, 220% 220%, auto, auto;
  transform: translate3d(-1%, -1%, 0) scale(1.04);
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: 0.33;
  background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, transparent 0, #000 16%, #000 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 16%, #000 82%, transparent 100%);
}
.cursor-orb {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 22px;
  height: 22px;
  pointer-events: none;
  border: 1px solid rgba(255, 224, 161, 0.34);
  border-radius: 999px;
  opacity: 0;
  background:
    radial-gradient(circle at 40% 35%, rgba(255, 255, 255, 0.72), transparent 18%),
    radial-gradient(circle, rgba(154, 220, 247, 0.25), rgba(255, 125, 101, 0.08) 54%, transparent 70%);
  box-shadow: 0 0 26px rgba(154, 220, 247, 0.18), 0 0 18px rgba(255, 224, 161, 0.12);
  mix-blend-mode: screen;
  transform: translate3d(var(--cursor-x, -80px), var(--cursor-y, -80px), 0) scale(1);
  transition: opacity 180ms ease, width 180ms ease, height 180ms ease, border-color 180ms ease;
  will-change: transform;
  contain: layout style paint;
}
.cursor-orb.is-visible { opacity: 0.48; }
.cursor-orb.is-active {
  width: 44px;
  height: 44px;
  border-color: rgba(255, 224, 161, 0.58);
  opacity: 0.68;
  animation: cursor-orb-breathe 1800ms ease-in-out infinite;
}
.liquid-particle {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: var(--particle-size, 5px);
  height: var(--particle-size, 5px);
  pointer-events: none;
  border-radius: 999px;
  opacity: 0;
  background:
    radial-gradient(circle at 35% 32%, rgba(255, 255, 255, 0.95), transparent 24%),
    radial-gradient(circle, var(--particle-color, rgba(154, 220, 247, 0.88)), transparent 72%);
  box-shadow:
    0 0 14px var(--particle-color, rgba(154, 220, 247, 0.58)),
    0 0 28px rgba(255, 224, 161, 0.12);
  transform: translate3d(var(--particle-x), var(--particle-y), 0) rotate(var(--particle-angle, 0deg)) scale(0.48);
  animation: liquid-particle-pop var(--particle-duration, 920ms) cubic-bezier(0.16, 1, 0.3, 1) forwards;
  contain: layout style paint;
}
.liquid-particle::before,
.liquid-particle::after {
  content: "";
  position: absolute;
  pointer-events: none;
  border-radius: 999px;
}
.liquid-particle::before {
  inset: -7px;
  opacity: 0.58;
  background: radial-gradient(circle, var(--particle-color, rgba(154, 220, 247, 0.7)), transparent 68%);
}
.liquid-particle::after {
  left: 50%;
  top: 50%;
  width: var(--particle-tail, 18px);
  height: 1px;
  opacity: 0.72;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.62), var(--particle-color, rgba(154, 220, 247, 0.7)), transparent);
  transform: translate3d(-50%, -50%, 0) translateX(calc(var(--particle-tail, 18px) * -0.22));
  transform-origin: center;
}
::selection {
  color: #050B12;
  background: var(--champagne);
}

@keyframes page-flow {
  from { opacity: 0.9; transform: translate3d(-1.2%, -1%, 0) scale(1.04); }
  to { opacity: 1; transform: translate3d(1.2%, 1%, 0) scale(1.04); }
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
  backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(140%);
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
.logo-picture {
  display: block;
  width: 100%;
  height: 100%;
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
.site-nav[data-open="true"] a {
  animation: nav-rise 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--nav-delay, 0ms);
}
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
  position: relative;
  padding: 8px 12px;
  overflow: hidden;
  transition: transform 180ms ease, color 180ms ease, background 180ms ease, border-color 180ms ease;
}
.site-nav a::after {
  content: "";
  position: absolute;
  inset: auto 14px 5px;
  height: 1px;
  opacity: 0;
  transform: scaleX(0.45);
  transform-origin: center;
  background: linear-gradient(90deg, transparent, rgba(255, 224, 161, 0.78), transparent);
  transition: opacity 180ms ease, transform 220ms ease;
}
.site-nav a:hover, .site-nav a[aria-current="page"] {
  color: var(--ink);
  background: var(--glass-strong);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.site-nav a:hover {
  transform: translate3d(0, -1px, 0);
}
.site-nav a:hover::after, .site-nav a[aria-current="page"]::after {
  opacity: 1;
  transform: scaleX(1);
}
.mobile-call {
  flex: 0 0 auto;
  gap: 6px;
  border: 1px solid rgba(255, 161, 132, 0.34);
  padding: 8px 10px;
  color: var(--clay);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 14px 32px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
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
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}
.menu-toggle span {
  width: 18px;
  height: 2px;
  border-radius: 99px;
  background: var(--ink);
  transform-origin: center;
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 160ms ease;
}
.menu-toggle:hover,
.menu-toggle:focus-visible {
  transform: translate3d(0, -1px, 0);
  border-color: rgba(255, 224, 161, 0.44);
  background: rgba(255, 255, 255, 0.13);
}
.menu-toggle[aria-expanded="true"] span:nth-child(1) { transform: translate3d(0, 6px, 0) rotate(45deg); }
.menu-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; transform: scaleX(0.35); }
.menu-toggle[aria-expanded="true"] span:nth-child(3) { transform: translate3d(0, -6px, 0) rotate(-45deg); }
.header-actions { display: none; }

.trust-ticker {
  grid-column: 1 / -1;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  contain: paint;
  border: 1px solid var(--glass-line);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.095), rgba(154, 220, 247, 0.07));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 14px 34px rgba(0, 0, 0, 0.22);
  mask-image: linear-gradient(90deg, transparent 0, #000 34px, #000 calc(100% - 34px), transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 34px, #000 calc(100% - 34px), transparent 100%);
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(145%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(145%);
}
.trust-track {
  display: flex;
  width: max-content;
  transform: translate3d(0, 0, 0);
  animation: none;
  will-change: transform;
}
.trust-ticker[data-in-view="true"] .trust-track {
  animation: trust-marquee 64s linear infinite;
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
  transition: color 180ms ease, background 180ms ease;
}
.trust-track a:hover, .trust-track a:focus-visible {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.13);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
}
.trust-ticker:hover .trust-track, .trust-ticker:focus-within .trust-track {
  animation-play-state: paused;
}
@keyframes trust-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
@keyframes nav-rise {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes cursor-orb-breathe {
  0%, 100% { transform: translate3d(var(--cursor-x, -80px), var(--cursor-y, -80px), 0) scale(1); }
  50% { transform: translate3d(var(--cursor-x, -80px), var(--cursor-y, -80px), 0) scale(1.12); }
}
@keyframes liquid-particle-pop {
  0% {
    opacity: 0;
    transform: translate3d(var(--particle-x), var(--particle-y), 0) rotate(var(--particle-angle, 0deg)) scale(0.38);
  }
  13% { opacity: 0.96; }
  58% { opacity: 0.74; }
  100% {
    opacity: 0;
    transform: translate3d(calc(var(--particle-x) + var(--particle-dx)), calc(var(--particle-y) + var(--particle-dy)), 0) rotate(calc(var(--particle-angle, 0deg) + var(--particle-spin, 72deg))) scale(1.12);
  }
}
@keyframes liquid-rim-flow {
  0%, 100% { opacity: 0.38; transform: translate3d(-18%, 0, 0) scaleX(0.66); }
  44% { opacity: 0.92; transform: translate3d(14%, 0, 0) scaleX(1.08); }
  68% { opacity: 0.62; transform: translate3d(22%, 0, 0) scaleX(0.86); }
}
@keyframes liquid-border-sweep {
  0% { opacity: 0.34; transform: translate3d(-18%, -2%, 0) rotate(0deg) scale(1); }
  50% { opacity: 0.78; transform: translate3d(10%, 2%, 0) rotate(4deg) scale(1.03); }
  100% { opacity: 0.34; transform: translate3d(-18%, -2%, 0) rotate(0deg) scale(1); }
}

.button {
  --shine-x: -46%;
  --magnet-x: 0px;
  --magnet-y: 0px;
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
  backdrop-filter: blur(var(--glass-blur)) saturate(150%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(150%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    inset 0 -18px 34px rgba(255, 255, 255, 0.04),
    0 18px 44px rgba(0, 0, 0, 0.32);
  transform: translate3d(var(--magnet-x), var(--magnet-y), 0) scale(1);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
.button::before {
  content: "";
  position: absolute;
  inset: 1px;
  height: auto;
  border-radius: inherit;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 255, 255, 0.46), transparent 18%),
    radial-gradient(circle at calc(var(--glare-x) + 12%) calc(var(--glare-y) + 18%), rgba(154, 220, 247, 0.24), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.24), transparent 46%),
    linear-gradient(135deg, rgba(154, 220, 247, 0.08), rgba(255, 224, 161, 0.05));
  opacity: 0.72;
  pointer-events: none;
  z-index: -1;
  transition: opacity 200ms ease, transform 260ms ease;
}
.button::after {
  content: "";
  position: absolute;
  inset: -52% auto -52% -42%;
  width: 48%;
  transform: translate3d(var(--shine-x), 0, 0) rotate(18deg);
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.20), rgba(154, 220, 247, 0.18), rgba(255, 224, 161, 0.14), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms ease, transform 520ms ease;
  z-index: -1;
}
.button > span {
  position: relative;
  z-index: 1;
}
.button .icon {
  width: 17px;
  height: 17px;
  transition: transform 180ms ease;
}
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
.button.light:hover,
.button.light:focus-visible,
.carousel-phone:hover,
.carousel-phone:focus-visible,
.header-call:hover,
.header-call:focus-visible,
.mobile-call:hover,
.mobile-call:focus-visible,
.coverage-link-rail a:hover,
.coverage-link-rail a:focus-visible,
.link-pills a:hover,
.link-pills a:focus-visible {
  color: #06111F;
  border-color: rgba(255, 224, 161, 0.56);
  background:
    linear-gradient(135deg, rgba(255, 125, 101, 0.95), rgba(244, 201, 107, 0.82) 58%, rgba(154, 220, 247, 0.68));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    0 20px 52px rgba(255, 125, 101, 0.18),
    0 0 34px rgba(154, 220, 247, 0.14);
}
.button.small {
  min-height: 40px;
  padding: 10px 14px;
  font-size: 0.86rem;
}
.button:hover {
  transform: translate3d(var(--magnet-x), calc(var(--magnet-y) - 2px), 0) scale(1.012);
  border-color: rgba(255, 224, 161, 0.66);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    inset 0 -18px 42px rgba(154, 220, 247, 0.07),
    0 24px 60px rgba(0, 0, 0, 0.42),
    0 0 0 1px rgba(154, 220, 247, 0.16),
    0 0 38px rgba(154, 220, 247, 0.24),
    0 0 82px rgba(255, 224, 161, 0.14);
}
.button:hover::before {
  opacity: 0.96;
  transform: translate3d(0, -1px, 0) scale(1.012);
}
.button:hover::after {
  opacity: 1;
  transform: translate3d(360%, 0, 0) rotate(18deg);
}
.button:hover .icon {
  transform: translate3d(2px, 0, 0);
}
.button:active {
  transform: translate3d(var(--magnet-x), var(--magnet-y), 0) scale(0.992);
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
.hero-content, .photo-showcase, .service-showcase, .motion-showcase { position: relative; z-index: 1; min-width: 0; }
.liquid-tilt { touch-action: pan-y; }
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
  --lift: 0px;
  overflow: hidden;
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(154, 220, 247, 0.13), transparent 28%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.055)),
    linear-gradient(135deg, rgba(119, 231, 220, 0.10), rgba(255, 161, 132, 0.07));
  box-shadow: var(--shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  transform: perspective(1100px) rotateX(var(--tilt-y)) rotateY(var(--tilt-x)) translateY(var(--lift));
  transform-style: preserve-3d;
  transition: transform 260ms ease, border-color 220ms ease, background 220ms ease;
}
.photo-showcase::before, .service-showcase::before,
.coverage-card::after, .detail-card::after, .intent-card::after, .quote-form::after, .service-cta::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.76;
  background:
    linear-gradient(115deg, rgba(255,255,255,.20), transparent 24%, rgba(154,220,247,.10) 48%, transparent 72%),
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,.28), transparent 20%),
    radial-gradient(circle at calc(var(--glare-x) + 18%) calc(var(--glare-y) + 22%), rgba(255,224,161,.10), transparent 30%);
  transform: translate3d(-1.5%, -1.5%, 0) scale(1.03);
  transition: opacity 240ms ease, transform 340ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}
.coverage-card::after, .detail-card::after, .intent-card::after, .quote-form::after, .service-cta::after {
  mix-blend-mode: screen;
}
.photo-showcase::after, .service-showcase::after,
.coverage-card .card-top::after,
.why-grid article::after,
.process-grid article::after,
.review-source-card::after,
.review-qr-card::after,
.real-review-mini::after {
  content: "";
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  background:
    linear-gradient(90deg, transparent, rgba(154, 220, 247, 0.34), rgba(255, 224, 161, 0.24), rgba(255, 125, 101, 0.18), transparent);
  transform-origin: center;
  transition: opacity 220ms ease, transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}
.photo-showcase::after, .service-showcase::after,
.why-grid article::after,
.process-grid article::after,
.review-source-card::after,
.review-qr-card::after,
.real-review-mini::after {
  inset: auto 12% 0;
  height: 1px;
  transform: translate3d(-10%, 0, 0) scaleX(0.62);
  box-shadow: 0 0 26px rgba(154, 220, 247, 0.30);
}
.coverage-card .card-top::after {
  inset: -14px auto auto -14px;
  width: 52px;
  height: 52px;
  background:
    radial-gradient(circle, rgba(154, 220, 247, 0.22), transparent 66%);
  transform: scale(0.76);
}
.photo-showcase:hover, .service-showcase:hover,
.coverage-card:hover, .detail-card:hover, .process-grid article:hover,
.why-grid article:hover, .quote-form:hover, .notice-card:hover,
.about-media:hover, .franchise-card:hover, .service-cta:hover,
.trust-strip article:hover, .callout:hover, .qr-card:hover, .faq details:hover, .faq details[open], .intent-card:hover {
  border-color: rgba(154, 220, 247, 0.42);
  --lift: -2px;
  --surface-scale: 1.006;
}
.photo-showcase:hover, .service-showcase:hover {
  box-shadow:
    0 28px 76px rgba(0, 0, 0, 0.48),
    0 0 0 1px rgba(154, 220, 247, 0.12),
    0 0 54px rgba(154, 220, 247, 0.18),
    0 0 96px rgba(255, 224, 161, 0.08);
}
.photo-showcase:hover::before, .service-showcase:hover::before,
.coverage-card:hover::after, .detail-card:hover::after, .intent-card:hover::after, .quote-form:hover::after, .service-cta:hover::after {
  opacity: 0.96;
  transform: translate3d(0, 0, 0) scale(1);
}
.photo-showcase:hover::after, .service-showcase:hover::after,
.why-grid article:hover::after,
.process-grid article:hover::after,
.review-source-card:hover::after,
.review-qr-card:hover::after,
.real-review-mini:hover::after,
.real-review-mini:focus-visible::after,
.real-review-mini.is-active::after {
  opacity: 1;
  transform: translate3d(0, 0, 0) scaleX(1);
  animation: liquid-rim-flow 2400ms ease-in-out infinite;
}
.coverage-card:hover .card-top::after {
  opacity: 1;
  transform: scale(1);
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
  gap: 12px;
  align-content: stretch;
  min-height: 360px;
  padding: 10px;
}
.service-picture {
  position: relative;
  overflow: hidden;
  min-height: 0;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  isolation: isolate;
  contain: paint;
  background:
    linear-gradient(135deg, rgba(154, 220, 247, 0.10), rgba(255, 161, 132, 0.07)),
    rgba(255, 255, 255, 0.08);
}
.service-gallery::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(5, 11, 18, 0.02), rgba(5, 11, 18, 0.28)),
    radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.18), transparent 26%);
  z-index: 2;
}
.service-media-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  overflow: hidden;
  transform: translate3d(0, 0, 0) scale(1.012);
  will-change: opacity, transform;
}
.service-motion-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 1;
}
.service-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: translate3d(0, 0, 0) scale(1.006);
}
.service-gallery[data-in-view="true"] .service-motion-video {
  animation: service-layer-video 24s linear infinite;
}
.service-gallery[data-in-view="true"] .service-slide-1 {
  animation: service-layer-one 24s linear infinite;
}
.service-gallery[data-in-view="true"] .service-slide-2 {
  animation: service-layer-two 24s linear infinite;
}
.service-gallery[data-in-view="true"] .service-slide-3 {
  animation: service-layer-three 24s linear infinite;
}
.service-gallery:hover .service-media-layer, .service-gallery:focus-within .service-media-layer,
.service-gallery:hover .service-gallery-dots span, .service-gallery:focus-within .service-gallery-dots span {
  animation-play-state: paused;
}
.service-gallery-dots {
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 4;
  display: inline-flex;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 6px 7px;
  background: rgba(5, 11, 18, 0.42);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.service-gallery-dots span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  opacity: 0.45;
  transform: scale(0.72);
  background: var(--ink);
}
.service-gallery[data-in-view="true"] .service-gallery-dots span:nth-child(1) { animation: service-dot-video 24s linear infinite; }
.service-gallery[data-in-view="true"] .service-gallery-dots span:nth-child(2) { animation: service-dot-one 24s linear infinite; }
.service-gallery[data-in-view="true"] .service-gallery-dots span:nth-child(3) { animation: service-dot-two 24s linear infinite; }
.service-gallery[data-in-view="true"] .service-gallery-dots span:nth-child(4) { animation: service-dot-three 24s linear infinite; }
@keyframes service-layer-video {
  0%, 19% { opacity: 1; transform: translate3d(0, 0, 0) scale(1.012); }
  25%, 94% { opacity: 0; transform: translate3d(-0.7%, 0, 0) scale(1.035); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1.012); }
}
@keyframes service-layer-one {
  0%, 19% { opacity: 0; transform: translate3d(0.8%, 0, 0) scale(1.035); }
  25%, 44% { opacity: 1; transform: translate3d(0, 0, 0) scale(1.012); }
  50%, 100% { opacity: 0; transform: translate3d(-0.8%, 0, 0) scale(1.035); }
}
@keyframes service-layer-two {
  0%, 44% { opacity: 0; transform: translate3d(0.8%, 0, 0) scale(1.035); }
  50%, 69% { opacity: 1; transform: translate3d(0, 0, 0) scale(1.012); }
  75%, 100% { opacity: 0; transform: translate3d(-0.8%, 0, 0) scale(1.035); }
}
@keyframes service-layer-three {
  0%, 69% { opacity: 0; transform: translate3d(0.8%, 0, 0) scale(1.035); }
  75%, 94% { opacity: 1; transform: translate3d(0, 0, 0) scale(1.012); }
  100% { opacity: 0; transform: translate3d(-0.8%, 0, 0) scale(1.035); }
}
@keyframes service-dot-video {
  0%, 19% { opacity: 1; transform: scale(1); background: var(--champagne); }
  25%, 94% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
  100% { opacity: 1; transform: scale(1); background: var(--champagne); }
}
@keyframes service-dot-one {
  0%, 19% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
  25%, 44% { opacity: 1; transform: scale(1); background: var(--champagne); }
  50%, 100% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
}
@keyframes service-dot-two {
  0%, 44% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
  50%, 69% { opacity: 1; transform: scale(1); background: var(--champagne); }
  75%, 100% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
}
@keyframes service-dot-three {
  0%, 69% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
  75%, 94% { opacity: 1; transform: scale(1); background: var(--champagne); }
  100% { opacity: 0.45; transform: scale(0.72); background: var(--ink); }
}
.service-visual-caption {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 86px;
  gap: 12px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 12px;
  background: rgba(5, 11, 18, 0.46);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(140%);
}
.service-motion-gif {
  width: 86px;
  aspect-ratio: 16 / 10;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.24);
}
.service-icon-xl, .soft-icon {
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--line-blue);
  border-radius: 12px;
  color: var(--miami-blue);
  background: linear-gradient(145deg, rgba(154, 220, 247, 0.16), rgba(255, 255, 255, 0.08));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transform: translate3d(0, 0, 0) scale(1);
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), color 180ms ease, border-color 180ms ease, background 180ms ease;
}
.service-icon-xl { width: 54px; height: 54px; }
.soft-icon { width: 44px; height: 44px; }
.service-icon-xl .icon { width: 28px; height: 28px; }
.soft-icon .icon { width: 22px; height: 22px; }
.coverage-card:hover .soft-icon, .detail-card:hover .soft-icon, .intent-card:hover .soft-icon,
.service-showcase:hover .service-icon-xl, .process-grid article:hover span {
  transform: translate3d(0, -2px, 0) scale(1.055);
  color: var(--champagne);
  border-color: rgba(255, 224, 161, 0.42);
  background: linear-gradient(145deg, rgba(255, 224, 161, 0.16), rgba(154, 220, 247, 0.10));
}
.showcase-logo {
  width: min(100%, 330px);
  height: 134px;
  padding: 14px;
}
.service-visual-caption p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  font-weight: 780;
}
.service-visual-caption strong {
  display: block;
  margin-bottom: 2px;
  color: var(--ink);
  line-height: 1.2;
}

.motion-showcase {
  width: 100%;
}
.motion-carousel {
  --lift: 0px;
  --surface-scale: 1;
  --parallax-x: 0px;
  --parallax-y: 0px;
  --depth-x: 0px;
  --depth-y: 0px;
  --media-rotate-x: 0deg;
  --media-rotate-y: 0deg;
  --scroll-depth: 0px;
  --media-scroll-y: 0px;
  --carousel-duration: 6800ms;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 12px;
  color: var(--ink);
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(154, 220, 247, 0.18), transparent 22%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.055)),
    linear-gradient(135deg, rgba(119, 231, 220, 0.10), rgba(255, 161, 132, 0.06));
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(var(--glass-blur)) saturate(138%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(138%);
  transform: perspective(1200px) rotateX(var(--tilt-y)) rotateY(var(--tilt-x)) translate3d(0, calc(var(--lift) + var(--scroll-depth)), 0) scale(var(--surface-scale));
  transform-style: preserve-3d;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease, background 260ms ease;
}
.motion-carousel.focused-carousel {
  --carousel-duration: 7200ms;
}
.motion-carousel::before,
.motion-carousel::after {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: 0;
}
.motion-carousel::before {
  inset: -35% -18% auto;
  height: 58%;
  background:
    radial-gradient(circle at 18% 45%, rgba(255, 224, 161, 0.14), transparent 28%),
    radial-gradient(circle at 82% 8%, rgba(119, 231, 220, 0.16), transparent 26%);
  transform: translate3d(0, 0, 0);
}
.motion-carousel::after {
  inset: 0;
  opacity: 0.72;
  background:
    linear-gradient(116deg, rgba(255, 255, 255, 0.18), transparent 24%, rgba(255, 255, 255, 0.05) 50%, transparent 76%),
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,.18), transparent 20%);
  transform: translate3d(-1.2%, -1.2%, 0) scale(1.025);
  transition: opacity 240ms ease, transform 340ms cubic-bezier(0.16, 1, 0.3, 1);
}
.motion-carousel[data-in-view="true"]::before {
  animation: carousel-aurora 12000ms ease-in-out infinite alternate;
}
.motion-carousel:hover,
.motion-carousel:focus-within {
  --lift: -2px;
  --surface-scale: 1.003;
  border-color: rgba(154, 220, 247, 0.46);
  box-shadow:
    0 34px 88px rgba(0, 0, 0, 0.48),
    0 0 0 1px rgba(154, 220, 247, 0.13),
    0 0 70px rgba(154, 220, 247, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}
.motion-carousel:hover::after,
.motion-carousel:focus-within::after {
  opacity: 0.92;
  transform: translate3d(0, 0, 0) scale(1);
}
.carousel-topline,
.carousel-chips,
.carousel-stage,
.carousel-controls,
.carousel-footnote {
  position: relative;
  z-index: 3;
}
.carousel-topline {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 4px 4px 10px;
}
.carousel-topline strong {
  display: block;
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 950;
}
.carousel-topline span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 760;
}
.carousel-phone {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--glass-line);
  border-radius: 999px;
  padding: 8px 12px;
  color: var(--champagne);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-size: 0.82rem;
  font-weight: 950;
  text-decoration: none;
  white-space: nowrap;
}
.carousel-phone .icon { width: 16px; height: 16px; color: var(--coral); }
.carousel-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  padding: 0 3px 11px;
  scrollbar-width: none;
}
.carousel-chips::-webkit-scrollbar,
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-chip {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  scroll-snap-align: start;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  padding: 7px 11px;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  overflow: hidden;
  isolation: isolate;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 180ms ease, color 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
.carousel-chip::before,
.carousel-chip::after {
  content: "";
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 180ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}
.carousel-chip::before {
  inset: 1px;
  z-index: -1;
  background:
    radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 0%), rgba(255, 255, 255, 0.34), transparent 28%),
    linear-gradient(135deg, rgba(154, 220, 247, 0.12), rgba(255, 224, 161, 0.08));
}
.carousel-chip::after {
  inset: auto 14% 2px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(154, 220, 247, 0.72), rgba(255, 224, 161, 0.52), transparent);
  transform: translate3d(-16%, 0, 0) scaleX(0.68);
  box-shadow: 0 0 18px rgba(154, 220, 247, 0.34);
}
.carousel-chip .icon { width: 15px; height: 15px; }
.carousel-chip[aria-selected="true"] {
  color: #06111F;
  border-color: rgba(255, 224, 161, 0.68);
  background: linear-gradient(135deg, rgba(255, 224, 161, 0.96), rgba(154, 220, 247, 0.78));
  box-shadow:
    0 0 0 4px rgba(255, 224, 161, 0.10),
    0 12px 30px rgba(154, 220, 247, 0.18),
    0 0 24px rgba(255, 224, 161, 0.14);
}
.carousel-chip[aria-selected="true"]::before,
.carousel-chip:hover::before,
.carousel-chip:focus-visible::before,
.carousel-chip[aria-selected="true"]::after,
.carousel-chip:hover::after,
.carousel-chip:focus-visible::after {
  opacity: 1;
}
.carousel-chip[aria-selected="true"]::after,
.carousel-chip:hover::after,
.carousel-chip:focus-visible::after {
  transform: translate3d(0, 0, 0) scaleX(1);
}
.carousel-chip:hover,
.carousel-chip:focus-visible {
  transform: translate3d(0, -2px, 0);
  border-color: rgba(154, 220, 247, 0.54);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 12px 28px rgba(0, 0, 0, 0.22),
    0 0 26px rgba(154, 220, 247, 0.14);
}
.carousel-stage {
  position: relative;
}
.carousel-track {
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  background: rgba(5, 11, 18, 0.42);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  cursor: grab;
  touch-action: pan-y pinch-zoom;
}
.carousel-track:active { cursor: grabbing; }
.motion-slide {
  position: relative;
  display: grid;
  flex: 0 0 100%;
  min-height: 520px;
  overflow: hidden;
  isolation: isolate;
  align-content: end;
  scroll-snap-align: center;
  padding: clamp(18px, 3vw, 30px);
  color: var(--ink);
  background: #07131F;
  transform-style: preserve-3d;
  contain: layout paint;
}
.motion-media-link {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transform: perspective(900px) rotateX(var(--media-rotate-x)) rotateY(var(--media-rotate-y)) translateZ(0);
  transform-style: preserve-3d;
  transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
}
.motion-poster,
.motion-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #07131F;
  transform: translate3d(calc(var(--parallax-x) + var(--depth-x)), calc(var(--parallax-y) + var(--depth-y)), 0) scale(1.04);
  transform-origin: center;
  transition: opacity 420ms ease, transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.motion-video {
  opacity: 0;
}
.motion-video.is-ready {
  opacity: 1;
}
.motion-slide[data-active="true"] .motion-video.is-ready {
  animation: cinematic-breathe var(--carousel-duration) ease-in-out infinite alternate;
}
.motion-asset-fallback {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.motion-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(5, 11, 18, 0.58) 0%, rgba(5, 11, 18, 0.24) 38%, rgba(5, 11, 18, 0.03) 100%),
    linear-gradient(180deg, rgba(5, 11, 18, 0.02) 0%, rgba(5, 11, 18, 0.66) 100%);
}
.motion-sheen {
  position: absolute;
  inset: -1px;
  z-index: 2;
  opacity: 0;
  background: linear-gradient(112deg, transparent 0%, rgba(255, 255, 255, 0.18) 28%, transparent 46%);
  transform: translate3d(-34%, 0, 0);
}
.motion-slide[data-active="true"] .motion-sheen {
  animation: soft-sweep 6800ms ease-in-out infinite;
}
.motion-trust-badge {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 3;
  max-width: calc(100% - 36px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  padding: 8px 11px;
  color: var(--ink);
  background: rgba(5, 11, 18, 0.44);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 12px 30px rgba(0, 0, 0, 0.24);
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1.2;
  backdrop-filter: blur(10px) saturate(135%);
  -webkit-backdrop-filter: blur(10px) saturate(135%);
}
.motion-slide-copy {
  position: relative;
  z-index: 4;
  width: min(100%, 470px);
  max-width: 470px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: clamp(16px, 2.4vw, 22px);
  background:
    linear-gradient(135deg, rgba(5, 11, 18, 0.66), rgba(5, 11, 18, 0.36)),
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(154, 220, 247, 0.16), transparent 28%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 24px 54px rgba(0, 0, 0, 0.30);
  backdrop-filter: blur(10px) saturate(132%);
  -webkit-backdrop-filter: blur(10px) saturate(132%);
  transform: translate3d(0, 12px, 28px);
  opacity: 0.78;
  transition: opacity 420ms ease, transform 520ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease, background 220ms ease;
}
.motion-slide[data-active="true"] .motion-slide-copy {
  opacity: 1;
  transform: translate3d(0, 0, 32px);
}
.motion-slide:hover .motion-slide-copy,
.motion-slide:focus-within .motion-slide-copy {
  border-color: rgba(255, 224, 161, 0.34);
  transform: translate3d(0, -3px, 38px);
}
.motion-category {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--champagne);
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}
.motion-category .icon { width: 17px; height: 17px; }
.motion-slide h2 {
  max-width: 440px;
  margin-bottom: 8px;
  color: #FFF8EC;
  font-size: 2.35rem;
  line-height: 0.98;
}
.motion-slide p {
  color: rgba(243, 251, 255, 0.86);
  font-size: 0.96rem;
  line-height: 1.5;
}
.motion-microcopy {
  margin-top: 12px;
  color: var(--champagne) !important;
  font-weight: 900;
}
.motion-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
.motion-actions .button {
  min-height: 44px;
}
.motion-detail {
  max-height: 0;
  margin: 0;
  overflow: hidden;
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  transition: max-height 260ms ease, opacity 220ms ease, transform 260ms ease, margin 220ms ease;
}
.motion-slide:hover .motion-detail,
.motion-slide:focus-within .motion-detail,
.motion-slide[data-active="true"] .motion-detail {
  max-height: 120px;
  margin-top: 12px;
  opacity: 0.9;
  transform: translate3d(0, 0, 0);
}
.story-carousel .motion-slide,
.focused-carousel .motion-slide {
  min-height: 0;
  grid-template-rows: minmax(320px, 1fr) auto;
  align-content: stretch;
  gap: 14px;
  padding: clamp(12px, 1.8vw, 18px);
  background:
    radial-gradient(circle at 18% 8%, rgba(154, 220, 247, 0.12), transparent 30%),
    linear-gradient(145deg, rgba(9, 24, 36, 0.98), rgba(5, 11, 18, 0.98));
}
.story-carousel .motion-media-link,
.focused-carousel .motion-media-link {
  position: relative;
  inset: auto;
  z-index: 1;
  display: block;
  min-height: clamp(300px, 35vw, 430px);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 16px;
  overflow: hidden;
  background: #07131F;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 22px 48px rgba(0, 0, 0, 0.28);
  transform: perspective(960px) rotateX(var(--media-rotate-x)) rotateY(var(--media-rotate-y)) translate3d(0, var(--media-scroll-y), 0);
}
.story-carousel .motion-media-link::before,
.focused-carousel .motion-media-link::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  height: 48px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(7, 19, 31, 0), rgba(7, 19, 31, 0.94));
}
.story-carousel .motion-media-link::after,
.focused-carousel .motion-media-link::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.11), transparent 22%, rgba(154, 220, 247, 0.06) 58%, transparent 82%),
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.13), transparent 24%);
  opacity: 0.72;
  transform: translate3d(-1%, -1%, 0) scale(1.02);
  transition: opacity 220ms ease, transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}
.story-carousel .motion-slide:hover .motion-media-link::after,
.story-carousel .motion-slide:focus-within .motion-media-link::after,
.focused-carousel .motion-slide:hover .motion-media-link::after,
.focused-carousel .motion-slide:focus-within .motion-media-link::after {
  opacity: 0.96;
  transform: translate3d(0, 0, 0) scale(1);
}
.story-carousel .motion-scrim,
.focused-carousel .motion-scrim {
  background:
    linear-gradient(90deg, rgba(5, 11, 18, 0.26), rgba(5, 11, 18, 0.02) 44%, rgba(5, 11, 18, 0.24)),
    linear-gradient(180deg, rgba(5, 11, 18, 0.02), rgba(5, 11, 18, 0.20));
}
.story-carousel .motion-video,
.focused-carousel .motion-video {
  inset: -32% -2% auto;
  width: 104%;
  height: 164%;
}
.story-carousel .motion-slide-copy,
.focused-carousel .motion-slide-copy {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: none;
  padding: 16px;
  border-radius: 16px;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.10), transparent 30%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.052));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 16px 38px rgba(0, 0, 0, 0.22);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  opacity: 1;
  transform: translate3d(0, 0, 18px);
}
.story-carousel .motion-slide-copy {
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(154, 220, 247, 0.10), transparent 30%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.118), rgba(255, 255, 255, 0.050));
}
.story-carousel .motion-slide:hover .motion-slide-copy,
.story-carousel .motion-slide:focus-within .motion-slide-copy,
.focused-carousel .motion-slide:hover .motion-slide-copy,
.focused-carousel .motion-slide:focus-within .motion-slide-copy {
  transform: translate3d(0, -2px, 24px);
}
.story-carousel .motion-slide h2,
.focused-carousel .motion-slide h2 {
  max-width: 100%;
  font-size: 1.72rem;
  line-height: 1.04;
}
.story-carousel .motion-slide p,
.focused-carousel .motion-slide p {
  max-width: 680px;
}
.story-carousel .motion-actions,
.focused-carousel .motion-actions {
  margin-top: 13px;
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  z-index: 5;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: var(--ink);
  background: rgba(5, 11, 18, 0.46);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transform: translateY(-50%);
  cursor: pointer;
  backdrop-filter: blur(10px) saturate(135%);
  -webkit-backdrop-filter: blur(10px) saturate(135%);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}
.carousel-arrow .icon { width: 18px; height: 18px; }
.carousel-prev { left: 12px; }
.carousel-prev .icon { transform: rotate(180deg); }
.carousel-next { right: 12px; }
.carousel-arrow:hover,
.carousel-arrow:focus-visible {
  border-color: rgba(255, 224, 161, 0.46);
  background: rgba(255, 255, 255, 0.12);
}
.carousel-prev:hover,
.carousel-prev:focus-visible { transform: translate3d(-2px, -50%, 0); }
.carousel-next:hover,
.carousel-next:focus-visible { transform: translate3d(2px, -50%, 0); }
.carousel-controls {
  display: grid;
  grid-template-columns: auto minmax(80px, 1fr);
  gap: 12px;
  align-items: center;
  padding: 12px 4px 4px;
}
.carousel-dots {
  display: inline-flex;
  gap: 7px;
  align-items: center;
}
.carousel-dot {
  display: inline-grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}
.carousel-dot span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(243, 251, 255, 0.56);
  transform: scale(0.82);
  transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
.carousel-dot[aria-current="true"] span {
  background: var(--champagne);
  box-shadow: 0 0 0 5px rgba(255, 224, 161, 0.12);
  transform: scale(1);
}
.carousel-progress {
  height: 3px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}
.carousel-progress span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--champagne), var(--miami-blue), var(--aqua));
  transform: scaleX(0);
  transform-origin: left;
}
.motion-carousel[data-in-view="true"]:not([data-paused="true"]) .carousel-progress span {
  animation: carousel-progress var(--carousel-duration) linear infinite;
}
.carousel-footnote {
  margin: 8px 4px 0;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 850;
}
@keyframes cinematic-breathe {
  from { transform: translate3d(calc(var(--parallax-x) + var(--depth-x)), calc(var(--parallax-y) + var(--depth-y)), 0) scale(1.04); }
  to { transform: translate3d(calc(var(--parallax-x) + var(--depth-x)), calc(var(--parallax-y) + var(--depth-y)), 0) scale(1.09); }
}
@keyframes soft-sweep {
  0%, 64% { opacity: 0; transform: translate3d(-34%, 0, 0); }
  76% { opacity: 0.58; }
  100% { opacity: 0; transform: translate3d(42%, 0, 0); }
}
@keyframes carousel-aurora {
  from { transform: translate3d(-1.8%, -1.2%, 0) scale(1.03); opacity: 0.82; }
  to { transform: translate3d(1.4%, 1.1%, 0) scale(1.04); opacity: 1; }
}
@keyframes carousel-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes review-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -5px, 0); }
}
@keyframes review-star-sheen {
  0%, 42% { transform: translate3d(-120%, 0, 0); opacity: 0; }
  55% { opacity: 0.7; }
  72%, 100% { transform: translate3d(120%, 0, 0); opacity: 0; }
}
@keyframes review-card-pulse {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.65; }
  50% { transform: translate3d(0, -3px, 0) scale(1.01); opacity: 1; }
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
  --lift: 0px;
  display: grid;
  min-height: 74px;
  align-content: center;
  gap: 2px;
  border: 1px solid var(--glass-line);
  border-radius: 14px;
  padding: 14px 16px 14px 32px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  position: relative;
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  transform: translateY(var(--lift));
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
  --lift: 0px;
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  padding: 10px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.06));
  box-shadow: var(--shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease;
  transform: translateY(var(--lift));
}
.office-proof-strip {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  margin-top: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  padding: 10px;
  background: rgba(5, 11, 18, 0.36);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.office-proof-photo {
  width: 86px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
}
.office-proof-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 44%;
}
.office-proof-strip p {
  margin: 0;
  color: var(--muted);
  font-size: 0.84rem;
  font-weight: 780;
}
.office-proof-strip strong {
  display: block;
  color: var(--ink);
  line-height: 1.2;
}
.office-proof-strip span {
  display: block;
  margin-top: 2px;
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
  --lift: 0px;
  --surface-scale: 1;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--glass-line);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.055));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  transform: translate3d(0, var(--lift), 0) scale(var(--surface-scale));
}
.coverage-card, .detail-card, .process-grid article, .why-grid article, .notice-card, .intent-card {
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
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
  background:
    radial-gradient(circle at 12% 10%, var(--card-accent, rgba(154, 220, 247, 0.18)), transparent 30%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.055));
}
.coverage-card:hover {
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), var(--card-accent, rgba(154, 220, 247, 0.28)), transparent 32%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.145), rgba(255, 255, 255, 0.065));
  box-shadow:
    0 20px 46px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(154, 220, 247, 0.08),
    0 0 38px rgba(154, 220, 247, 0.14);
}
.detail-card:hover,
.intent-card:hover,
.why-grid article:hover,
.process-grid article:hover,
.review-source-card:hover,
.review-qr-card:hover,
.real-review-mini:hover,
.real-review-mini:focus-visible {
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(154, 220, 247, 0.08),
    0 0 36px rgba(154, 220, 247, 0.14);
}
.coverage-card h3, .detail-card h3, .intent-card h3, .faq summary, .link-pills a, .coverage-link-rail a {
  transition: color 180ms ease, transform 180ms ease;
}
.coverage-card:hover h3, .detail-card:hover h3, .intent-card:hover h3 {
  color: var(--champagne);
}
.card-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.card-top a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--clay);
  background: rgba(255, 255, 255, 0.055);
  font-size: 0.82rem;
  font-weight: 950;
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease, box-shadow 180ms ease;
}
.card-top a:hover,
.card-top a:focus-visible {
  color: #06111F;
  border-color: rgba(255, 224, 161, 0.52);
  background: linear-gradient(135deg, rgba(255, 125, 101, 0.95), rgba(244, 201, 107, 0.82) 58%, rgba(154, 220, 247, 0.68));
  box-shadow: 0 14px 34px rgba(255, 125, 101, 0.16);
  transform: translate3d(0, -1px, 0);
}
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
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
}
.tag-row span:hover, .link-pills a:hover, .coverage-link-rail a:hover {
  transform: translate3d(0, -1px, 0);
  border-color: rgba(255, 224, 161, 0.34);
  color: #06111F;
  background: linear-gradient(135deg, rgba(255, 125, 101, 0.95), rgba(244, 201, 107, 0.82) 58%, rgba(154, 220, 247, 0.68));
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
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}
.coverage-link-rail a:hover, .coverage-link-rail a:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(255, 224, 161, 0.52);
  color: #06111F;
  background: linear-gradient(135deg, rgba(255, 125, 101, 0.95), rgba(244, 201, 107, 0.82) 58%, rgba(154, 220, 247, 0.68));
  box-shadow: 0 16px 38px rgba(255, 125, 101, 0.16);
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
  backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(135%);
}
.why-panel h2, .why-panel h3, .why-panel p { color: var(--ink); }
.why-panel .kicker { color: #F4B69C; }
.why-grid article {
  border-color: var(--glass-line);
  background: rgba(255, 255, 255, 0.09);
  box-shadow: none;
}
.why-grid p { opacity: 0.84; }

.spanish-panel,
.review-panel {
  display: grid;
  gap: 24px;
  align-items: center;
  border: 1px solid var(--glass-line);
  border-radius: 22px;
  padding: 32px;
  color: var(--ink);
  background:
    radial-gradient(circle at 12% 12%, rgba(255, 224, 161, 0.12), transparent 34%),
    radial-gradient(circle at 88% 18%, rgba(119, 231, 220, 0.10), transparent 32%),
    linear-gradient(135deg, rgba(14, 37, 55, 0.92), rgba(7, 20, 32, 0.92));
  box-shadow: var(--shadow);
  overflow: hidden;
}
.spanish-panel h2,
.review-panel h2,
.spanish-panel h3,
.review-panel h3 { color: var(--ink); }
.spanish-copy,
.review-copy {
  max-width: 670px;
}
.spanish-copy p,
.review-copy p {
  color: var(--ink-soft);
}
.language-grid,
.review-signal-grid {
  display: grid;
  gap: 12px;
}
.language-grid article,
.review-signal-grid article {
  --lift: 0px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 18px;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.10), transparent 28%),
    rgba(255, 255, 255, 0.075);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transform: translateY(var(--lift));
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}
.language-grid article:hover,
.review-signal-grid article:hover {
  --lift: -3px;
  border-color: rgba(255, 224, 161, 0.38);
}
.language-grid span,
.review-signal-grid span {
  display: inline-grid;
  width: 38px;
  height: 38px;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 13px;
  color: #06111F;
  background: linear-gradient(135deg, rgba(255, 224, 161, 0.95), rgba(154, 220, 247, 0.72));
}
.language-grid .icon,
.review-signal-grid .icon {
  width: 18px;
  height: 18px;
}
.review-signal-grid article {
  animation: review-float 6200ms ease-in-out infinite;
  animation-delay: var(--review-delay);
}
.review-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}
.review-proof-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 2px;
}
.review-proof-row span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 11px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10);
}
.review-proof-row strong {
  color: var(--champagne);
}
.review-disclaimer {
  max-width: 58ch;
  margin: 16px 0 0;
  color: rgba(226, 236, 245, 0.72);
  font-size: 0.88rem;
}
.google-review-studio {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.review-qr-card {
  --magnet-x: 0px;
  --magnet-y: 0px;
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  min-width: 0;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  color: var(--ink);
  text-decoration: none;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.16), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.06));
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transform: translate3d(var(--magnet-x), var(--magnet-y), 0);
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}
.review-qr-card:hover {
  border-color: rgba(255, 224, 161, 0.42);
}
.review-qr-card img {
  width: 118px;
  height: 118px;
  border-radius: 14px;
  padding: 8px;
  background: #FFFFFF;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}
.review-qr-card strong,
.review-qr-card em {
  display: block;
}
.review-qr-card strong {
  font-size: 1.04rem;
  color: var(--ink);
}
.review-qr-card em {
  margin-top: 5px;
  color: var(--ink-soft);
  font-style: normal;
}
.review-source-card {
  --lift: 0px;
  --magnet-x: 0px;
  --magnet-y: 0px;
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  min-width: 0;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(154, 220, 247, 0.13), transparent 30%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.052));
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.13);
  transform: translate3d(var(--magnet-x), var(--magnet-y), 0) translateY(var(--lift));
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}
.review-source-card:hover {
  --lift: -3px;
  border-color: rgba(154, 220, 247, 0.34);
}
.review-source-card .review-icon {
  display: inline-grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 15px;
  color: #06111F;
  background: linear-gradient(135deg, rgba(255, 224, 161, 0.96), rgba(154, 220, 247, 0.74));
  animation: review-card-pulse 5200ms ease-in-out infinite;
}
.review-source-card .icon {
  width: 20px;
  height: 20px;
}
.review-source-card strong {
  display: block;
  color: var(--ink);
  font-size: 1.02rem;
}
.review-source-card p {
  margin: 5px 0 0;
  color: var(--ink-soft);
}
.google-review-carousel {
  position: relative;
  min-height: 304px;
}
.google-review-track {
  position: relative;
  min-height: 238px;
}
.review-card {
  --review-alpha: 0;
  --review-shift: 18px;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-height: 238px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(154, 220, 247, 0.12), transparent 32%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.055));
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.14);
  opacity: var(--review-alpha);
  pointer-events: none;
  transform: translate3d(0, var(--review-shift), 0) scale(0.98);
  transition: opacity 420ms ease, transform 420ms ease, border-color 220ms ease;
}
.review-card.is-active {
  --review-alpha: 1;
  --review-shift: 0;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
}
.review-card:hover {
  border-color: rgba(255, 224, 161, 0.38);
}
.review-card .review-icon {
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 15px;
  color: #06111F;
  background: linear-gradient(135deg, rgba(255, 224, 161, 0.96), rgba(154, 220, 247, 0.74));
}
.review-card .review-icon .icon { width: 19px; height: 19px; }
.review-eyebrow {
  margin: 4px 0 0;
  color: var(--champagne);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.review-card h3 {
  margin: 0;
  font-size: clamp(1.25rem, 1.55rem, 1.78rem);
}
.review-card p:not(.review-eyebrow) {
  margin: 0;
  color: var(--ink-soft);
}
.review-card a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-top: auto;
  color: var(--champagne);
  font-weight: 900;
  text-decoration: none;
}
.review-card a .icon {
  width: 16px;
  height: 16px;
}
.review-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
}
.review-carousel-controls > button {
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}
.review-carousel-controls > button:first-child .icon {
  transform: rotate(180deg);
}
.review-carousel-controls > button:hover,
.review-carousel-controls > button:focus-visible {
  border-color: rgba(255, 224, 161, 0.42);
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-2px);
}
.review-dots {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 6px;
}
.review-dots button {
  width: 28px;
  min-height: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.20);
  cursor: pointer;
}
.review-dots button[aria-selected="true"] {
  background: linear-gradient(90deg, var(--coral), var(--champagne), var(--miami-blue));
  box-shadow: 0 0 20px rgba(255, 224, 161, 0.24);
}
.real-review-carousel {
  min-height: 494px;
}
.real-review-track {
  min-height: 410px;
}
.real-review-card {
  --review-alpha: 0;
  --review-shift: 18px;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 410px;
  max-height: 526px;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 22px;
  background:
    linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.08) 26%, transparent 44%) -140% 0 / 220% 100% no-repeat,
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.12), transparent 30%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.055));
  box-shadow: 0 26px 58px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  opacity: var(--review-alpha);
  pointer-events: none;
  transform: translate3d(0, var(--review-shift), 0) scale(0.982);
  transition: opacity 440ms ease, transform 440ms ease, border-color 220ms ease, background-position 720ms ease;
  scrollbar-width: thin;
}
.real-review-card.is-active {
  --review-alpha: 1;
  --review-shift: 0;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
}
.real-review-card.is-active:hover,
.real-review-card.is-active:focus-within {
  border-color: rgba(255, 224, 161, 0.40);
  background-position: 140% 0, center, center;
}
.real-review-head {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  gap: 13px;
  align-items: center;
}
.review-avatar {
  display: inline-grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 16px;
  color: #06111F;
  font-weight: 950;
  background: linear-gradient(135deg, var(--champagne), var(--miami-blue));
  box-shadow: 0 0 26px rgba(255, 224, 161, 0.18);
}
.real-review-card h3 {
  margin: 0;
  font-size: clamp(1.18rem, 1.42rem, 1.62rem);
}
.real-review-meta,
.review-rating-only {
  margin: 2px 0 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
}
.real-review-stars {
  position: relative;
  display: inline-flex;
  gap: 3px;
  color: var(--champagne);
  overflow: hidden;
}
.real-review-stars::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.78), transparent);
  transform: translate3d(-120%, 0, 0);
  animation: review-star-sheen 5200ms ease-in-out infinite;
}
.real-review-stars .icon {
  width: 16px;
  height: 16px;
  fill: rgba(255, 224, 161, 0.20);
}
.real-review-excerpt {
  margin: 2px 0 0;
  color: var(--ink);
  font-family: var(--display-font);
  font-size: clamp(1.35rem, 1.78rem, 2.1rem);
  line-height: 1.08;
  letter-spacing: 0;
}
.review-details {
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 15px;
  background: rgba(2, 13, 22, 0.34);
}
.review-details summary {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 13px;
  color: var(--champagne);
  font-weight: 900;
  cursor: pointer;
}
.review-details summary span {
  color: var(--ink-soft);
  font-size: 0.82rem;
}
.review-details p {
  margin: 0;
  padding: 0 13px 13px;
  color: var(--ink-soft);
  font-size: 0.93rem;
}
.office-response {
  border-color: rgba(154, 220, 247, 0.18);
}
.review-source-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-top: auto;
  color: var(--champagne);
  font-weight: 900;
  text-decoration: none;
}
.review-source-link .icon {
  width: 16px;
  height: 16px;
}
.real-review-rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(186px, 0.42fr);
  gap: 10px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: x proximity;
  padding: 2px 2px 8px;
  scrollbar-width: thin;
}
.real-review-mini {
  --lift: 0px;
  display: grid;
  gap: 6px;
  min-width: 0;
  min-height: 132px;
  padding: 13px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 17px;
  color: var(--ink);
  text-align: left;
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.10), transparent 28%),
    rgba(255, 255, 255, 0.066);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.10);
  cursor: pointer;
  scroll-snap-align: start;
  transform: translate3d(0, var(--lift), 0);
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
}
.real-review-mini:hover,
.real-review-mini:focus-visible,
.real-review-mini.is-active {
  --lift: -3px;
  border-color: rgba(255, 224, 161, 0.40);
  background:
    radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 224, 161, 0.15), transparent 30%),
    rgba(255, 255, 255, 0.10);
}
.real-review-mini strong,
.real-review-mini em {
  display: block;
}
.real-review-mini strong {
  color: var(--ink);
}
.real-review-mini em {
  color: var(--ink-soft);
  font-style: normal;
  font-size: 0.86rem;
  line-height: 1.35;
}

.franchise-panel {
  display: grid;
  gap: 24px;
  align-items: center;
}
.franchise-card {
  --lift: 0px;
  min-height: 230px;
  padding: 20px;
  transition: transform 220ms ease, border-color 220ms ease;
  transform: translateY(var(--lift));
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
  --lift: 0px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 20px;
  border: 1px solid var(--line-blue);
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(145deg, rgba(154, 220, 247, 0.13), rgba(255, 255, 255, 0.06));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease;
  transform: translateY(var(--lift));
}
.callout .icon {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  color: var(--clay);
}
.callout p { margin: 0; }
.qr-card {
  --lift: 0px;
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
  backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease;
  transform: translateY(var(--lift));
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
.quote-handoff-card h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.85rem;
}
.quote-preflight-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 1.25rem;
  color: var(--ink-soft);
}
.quote-preflight-list li::marker { color: var(--champagne); }
.policyholder-resources .intent-card h3 a {
  color: var(--ink);
  text-decoration: none;
}
.policyholder-resources .intent-card h3 a:hover,
.policyholder-resources .intent-card h3 a:focus-visible {
  color: var(--champagne);
}
.policyholder-resources .text-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 8px;
  color: var(--miami-blue);
  font-weight: 900;
  text-decoration: none;
}
.policyholder-resources .text-link svg {
  width: 16px;
  height: 16px;
}
.policyholder-contact {
  align-items: center;
}
.policyholder-sources .link-pills a {
  overflow-wrap: anywhere;
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
  transition: border-color 180ms ease, background 180ms ease;
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
  --lift: 0px;
  display: grid;
  gap: 18px;
  align-items: center;
  border: 1px solid var(--glass-line);
  border-radius: 20px;
  padding: 26px;
  background: linear-gradient(135deg, rgba(22, 58, 43, 0.82), rgba(12, 36, 54, 0.82));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  transition: transform 220ms ease, border-color 220ms ease;
  transform: translateY(var(--lift));
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
.faq .section-heading { max-width: none; margin-inline: 0; }
.faq details {
  --lift: 0px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--glass-line);
  border-radius: 16px;
  padding: 16px 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.045));
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  transform: translateY(var(--lift));
}
.faq details:hover, .faq details[open] {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(154, 220, 247, 0.055));
}
.faq details:hover summary, .faq details[open] summary {
  color: var(--champagne);
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
.faq summary { min-height: 44px; line-height: 1.5; scroll-margin-top: 180px; }
.faq summary:focus-visible { outline: 2px solid var(--champagne); outline-offset: 5px; border-radius: 4px; }
.faq-answer { padding-top: 4px; line-height: 1.7; overflow-wrap: anywhere; }
.faq-links { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-bottom: 0; }
.faq-links a { display: inline-flex; align-items: center; min-height: 44px; color: var(--champagne); text-decoration: underline; text-underline-offset: 4px; }
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
  transition:
    opacity 820ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 820ms cubic-bezier(0.16, 1, 0.3, 1);
}
.motion-ready [data-reveal] {
  opacity: 0.82;
  transform: translate3d(0, 28px, 0) scale(0.982);
  will-change: transform, opacity;
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
  will-change: auto;
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
    backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
    -webkit-backdrop-filter: blur(var(--glass-blur-soft)) saturate(135%);
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
  .carousel-arrow { display: grid; }
  .motion-slide { min-height: 560px; }
  .motion-carousel.focused-carousel .motion-slide,
  .motion-carousel.story-carousel .motion-slide { min-height: 0; }
  .focused-carousel .motion-media-link,
  .story-carousel .motion-media-link { min-height: 360px; }
  .trust-strip {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: -34px;
  }
  .about-panel, .quote-panel, .franchise-panel {
    grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1fr);
  }
  .spanish-panel,
  .review-panel {
    grid-template-columns: minmax(0, 0.9fr) minmax(430px, 1fr);
    padding: 42px;
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
  :root {
    --glass-blur: 9px;
    --glass-blur-soft: 7px;
  }
  .header-shell { width: min(100% - 20px, 1180px); gap: 6px; padding: 8px 0; }
  .brand-logo { width: 92px; height: 44px; }
  .mobile-call { min-height: 36px; padding-inline: 8px; font-size: 0.76rem; }
  .mobile-call span { white-space: nowrap; }
  .menu-toggle { width: 40px; height: 38px; }
  .hero { padding-top: 30px; padding-bottom: 34px; }
  h1 { font-size: 2.34rem; }
  h2 { font-size: 1.7rem; }
  .hero-lead { font-size: 1rem; }
  .motion-carousel { border-radius: 18px; padding: 9px; }
  .carousel-topline {
    grid-template-columns: minmax(0, 1fr);
    padding-bottom: 9px;
  }
  .carousel-topline span { display: none; }
  .carousel-phone {
    width: 100%;
    justify-content: center;
    min-height: 36px;
    font-size: 0.78rem;
  }
  .carousel-chips {
    gap: 6px;
    padding-bottom: 9px;
  }
  .carousel-chip {
    min-height: 32px;
    padding: 6px 9px;
    font-size: 0.72rem;
  }
  .carousel-chip .icon { width: 13px; height: 13px; }
  .carousel-track { border-radius: 14px; }
  .carousel-arrow {
    width: 36px;
    height: 36px;
    top: -21px;
    transform: none;
  }
  .carousel-arrow .icon { width: 15px; height: 15px; }
  .carousel-prev { left: auto; right: 52px; }
  .carousel-next { right: 8px; }
  .carousel-prev:hover,
  .carousel-prev:focus-visible,
  .carousel-next:hover,
  .carousel-next:focus-visible {
    transform: translate3d(0, -1px, 0);
  }
  .motion-slide {
    min-height: 500px;
    padding: 14px;
  }
  .story-carousel .motion-slide,
  .focused-carousel .motion-slide {
    min-height: 0;
    grid-template-rows: minmax(245px, 1fr) auto;
    gap: 10px;
    padding: 10px;
  }
  .story-carousel .motion-media-link,
  .focused-carousel .motion-media-link {
    min-height: 245px;
    border-radius: 13px;
  }
  .motion-trust-badge {
    top: 13px;
    left: 13px;
    max-width: calc(100% - 26px);
    padding: 7px 9px;
    font-size: 0.66rem;
    display: none;
  }
  .motion-scrim {
    background:
      linear-gradient(180deg, rgba(5, 11, 18, 0.02) 0%, rgba(5, 11, 18, 0.12) 36%, rgba(5, 11, 18, 0.82) 100%),
      linear-gradient(90deg, rgba(5, 11, 18, 0.18), rgba(5, 11, 18, 0.02));
  }
  .motion-slide-copy {
    width: 100%;
    max-width: none;
    border-radius: 15px;
    padding: 15px;
    backdrop-filter: blur(7px) saturate(125%);
    -webkit-backdrop-filter: blur(7px) saturate(125%);
  }
  .motion-slide h2 {
    font-size: 1.7rem;
    line-height: 1.02;
  }
  .story-carousel .motion-slide h2,
  .focused-carousel .motion-slide h2 {
    font-size: 1.28rem;
    line-height: 1.08;
  }
  .motion-slide p { font-size: 0.88rem; line-height: 1.42; }
  .motion-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin-top: 12px;
  }
  .motion-actions .button {
    width: 100%;
    justify-content: center;
    min-height: 42px;
    padding: 10px 13px;
    font-size: 0.84rem;
  }
  .motion-detail {
    display: none;
  }
  .carousel-controls {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .carousel-dots { justify-content: center; }
  .carousel-footnote {
    text-align: center;
    font-size: 0.7rem;
  }
  .section, .trust-strip, .footer-shell { width: min(100% - 28px, 1180px); }
  .coverage-section { padding-inline: 14px; }
  .coverage-card, .detail-card, .process-grid article, .why-grid article, .quote-form { padding: 18px; }
  .intent-card { padding: 18px; min-height: 0; }
  .why-panel { padding: 24px; }
  .spanish-panel, .review-panel { padding: 22px; }
  .review-actions { display: grid; }
  .review-actions .button { width: 100%; justify-content: center; }
  .review-qr-card {
    grid-template-columns: 88px minmax(0, 1fr);
    gap: 12px;
    padding: 12px;
  }
  .review-qr-card img {
    width: 88px;
    height: 88px;
    border-radius: 12px;
  }
  .google-review-carousel,
  .google-review-track {
    min-height: 318px;
  }
  .review-card {
    min-height: 292px;
    padding: 18px;
  }
  .review-card h3 {
    font-size: 1.2rem;
  }
  .review-proof-row span {
    width: 100%;
    justify-content: center;
  }
  .review-source-card {
    grid-template-columns: 40px minmax(0, 1fr);
    padding: 13px;
  }
  .review-source-card .review-icon {
    width: 40px;
    height: 40px;
  }
  .real-review-carousel,
  .real-review-track {
    min-height: 506px;
  }
  .real-review-card {
    min-height: 506px;
    max-height: 560px;
    padding: 17px;
    border-radius: 18px;
  }
  .real-review-head {
    grid-template-columns: 42px minmax(0, 1fr);
  }
  .review-avatar {
    width: 42px;
    height: 42px;
    border-radius: 14px;
  }
  .real-review-stars {
    grid-column: 1 / -1;
  }
  .real-review-excerpt {
    font-size: 1.32rem;
  }
  .review-details summary {
    padding: 10px 11px;
    font-size: 0.84rem;
  }
  .review-details p {
    padding: 0 11px 11px;
    font-size: 0.86rem;
  }
  .real-review-rail {
    grid-auto-columns: minmax(210px, 78%);
  }
  .real-review-mini {
    min-height: 122px;
  }
  .review-dots button {
    width: 24px;
  }
  .trust-ticker {
    margin-top: 2px;
    mask-image: linear-gradient(90deg, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%);
  }
  .trust-track span { padding: 4px 8px; }
  .trust-track a, .ticker-copy { min-height: 23px; padding: 2px 9px; font-size: 0.7rem; }
  .qr-card { grid-template-columns: 96px minmax(0, 1fr); }
  .qr-card img { width: 96px; height: 96px; }
  .service-visual-caption {
    grid-template-columns: auto minmax(0, 1fr) 62px;
    gap: 9px;
  }
  .service-motion-gif { width: 62px; border-radius: 10px; }
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
  }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .cursor-orb { display: none; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
  .motion-ready [data-reveal], [data-reveal] {
    opacity: 1;
    transform: none;
  }
  .button:hover, .faq details:hover { transform: none; }
  .trust-track { animation: none; }
  .motion-carousel[data-in-view="true"]:not([data-paused="true"]) .carousel-progress span { animation: none; transform: scaleX(1); }
  .motion-slide[data-active="true"] .motion-poster,
  .motion-slide[data-active="true"] .motion-video.is-ready,
  .motion-slide[data-active="true"] .motion-sheen {
    animation: none;
  }
  .carousel-track { scroll-behavior: auto; }
  .service-gallery[data-in-view="true"] .service-media-layer { animation: none; }
  .service-gallery[data-in-view="true"] .service-gallery-dots span { animation: none; }
  .service-media-layer { transform: none; }
  .service-motion-video { opacity: 1; }
}

/* Reviews must fit narrow screens and expand with the document. */
.review-panel > *, .google-review-studio, .real-review-carousel,
.real-review-track, .real-review-head > * { min-width: 0; max-width: 100%; }
.review-panel { overflow-wrap: anywhere; }
.review-dots { flex-wrap: wrap; min-width: 0; }
@media (max-width: 767px) {
  .review-panel { grid-template-columns: minmax(0, 1fr); }
  .real-review-carousel, .real-review-track { min-height: 0; }
  .real-review-card { min-height: 0; max-height: none; overflow: visible; }
  .real-review-card.is-active { position: relative; inset: auto; }
  .real-review-card:not(.is-active) { visibility: hidden; }
  .review-carousel-controls { position: relative; margin-top: 16px; }
  .review-actions .button { white-space: normal; text-align: center; }
}
/* Shared gutters, centered media, and consistent responsive spacing. */
:root { --content-width: 1180px; --page-gutter: 24px; --section-space: 56px; }
.header-shell, .footer-shell { width: min(var(--content-width), calc(100% - 2 * var(--page-gutter))); }
.language-switcher-mobile { width: max-content; justify-self: start; }
.hero { gap: 40px; padding: 48px max(var(--page-gutter), calc((100% - var(--content-width)) / 2)); min-height: 0; }
h1 { font-size: 4.2rem; line-height: 1.05; letter-spacing: -0.035em; }
h2 { font-size: 2.6rem; line-height: 1.12; }
.hero-lead { font-size: 1.1rem; line-height: 1.6; max-width: 540px; }
.hero.text-hero { display: block; padding-block: 40px 24px; }
.text-hero .hero-content { max-width: 850px; margin-inline: auto; }
.text-hero .hero-lead { max-width: 760px; }
.text-hero .kicker { display: none; }
.section { width: min(var(--content-width), calc(100% - 2 * var(--page-gutter))); margin-inline: auto; padding-block: var(--section-space); }
.section-heading { margin-inline: auto; margin-bottom: 28px; }
.section-heading.center { text-align: center; }
.motion-showcase { width: 100%; max-width: 680px; margin-inline: auto; }
.motion-carousel { width: 100%; padding: 12px; border-radius: 20px; background-color: #0c1d29; }
.carousel-track { border: 0; background: none; box-shadow: none; border-radius: 12px; }
.story-carousel .motion-slide, .focused-carousel .motion-slide { grid-template-rows: auto 1fr; padding: 0; gap: 0; background: transparent; min-width: 0; }
.story-carousel .motion-media-link, .focused-carousel .motion-media-link { width: 100%; min-width: 0; min-height: 0; max-height: none; aspect-ratio: 16 / 9; border-radius: 12px; box-shadow: none; justify-self: stretch; }
.story-carousel .motion-slide-copy, .focused-carousel .motion-slide-copy { padding: 20px 12px 12px; border-radius: 0; background: none; box-shadow: none; transform: none; text-align: center; }
.story-carousel .motion-slide h2, .focused-carousel .motion-slide h2 { margin: 0; font-size: 1.5rem; line-height: 1.2; }
.motion-slide-copy p { font-size: 0.94rem; line-height: 1.5; margin: 12px auto 0; }
.motion-slide-copy .motion-actions { display: flex; justify-content: center; margin-top: 16px; }
.motion-actions .button { width: auto; min-height: 44px; padding: 10px 16px; font-size: 0.9rem; }
.carousel-chips { margin-bottom: 12px; padding: 4px 2px 8px; justify-content: safe center; }
.motion-carousel[data-motion-stopped="true"] .motion-poster, .motion-carousel[data-motion-stopped="true"] .motion-video, .motion-carousel[data-motion-stopped="true"] .motion-sheen { animation-play-state: paused !important; }
.carousel-motion-toggle { color: var(--ink, #fff8e8); background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.22); border-radius: 999px; padding: 10px 18px; min-height: 44px; cursor: pointer; font: inherit; font-size: .875rem; }
.carousel-motion-toggle:hover, .carousel-motion-toggle:focus-visible { background: rgba(255,255,255,.18); outline: 2px solid #ffe0a1; outline-offset: 3px; }
.carousel-controls { grid-template-columns: minmax(0, 1fr); justify-items: center; gap: 10px; margin-top: 10px; padding: 10px 4px 4px; }
.carousel-dots { justify-content: center; max-width: 100%; flex-wrap: wrap; }
.carousel-progress { width: min(100%, 240px); }
.carousel-arrow { top: 0; margin-top: calc(100cqw * 9 / 32); }
.carousel-stage { container-type: inline-size; }
.coverage-section { width: 100%; max-width: none; padding-inline: max(var(--page-gutter), calc((100% - var(--content-width)) / 2)); }
.coverage-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
a.coverage-card { grid-template-columns: 48px minmax(0, 1fr) 20px; align-items: center; gap: 16px; min-height: 140px; padding: 22px; color: var(--ink); text-decoration: none; border-radius: 14px; }
.coverage-card h3 { margin: 0; font-size: 1.3rem; line-height: 1.2; }
.coverage-card p { margin: 8px 0 0; font-size: 0.95rem; line-height: 1.5; }
.coverage-card > .icon { width: 20px; height: 20px; }
.coverage-card .soft-icon { width: 48px; height: 48px; }
.coverage-card:last-child { grid-column: 1 / -1; }
.about-panel, .quote-panel { gap: 40px; }
.about-panel > *, .quote-panel > *, .review-panel > *, .detail-grid > *, .intent-grid > * { min-width: 0; max-width: 100%; }
.about-copy, .quote-copy { width: 100%; }
.about-media { max-width: 520px; justify-self: center; width: 100%; margin-inline: auto; }
.about-photo { aspect-ratio: 4 / 3; }
.review-panel { padding: 32px; margin-block: 24px; align-items: center; gap: 32px; }
.google-review-studio { width: 100%; }
.real-review-carousel, .real-review-track { min-height: 0; }
.real-review-card { min-height: 0; max-height: none; overflow: visible; }
.real-review-card.is-active { position: relative; inset: auto; }
.real-review-card:not(.is-active) { visibility: hidden; }
.review-carousel-controls { position: relative; margin-top: 16px; }
.real-review-card:has(> .review-details:not(.office-response)[open]) > .real-review-excerpt { display: none; }
.real-review-excerpt { font-family: Inter, ui-sans-serif, system-ui, sans-serif; font-size: 1.1rem; line-height: 1.6; }
.real-review-mini { min-height: 100px; padding: 12px; gap: 6px; }
.review-qr-card { grid-template-columns: 72px minmax(0, 1fr); padding: 12px; }
.review-qr-card img { width: 72px; height: 72px; padding: 4px; border-radius: 8px; }
.qr-card { grid-template-columns: 104px minmax(0, 1fr); }
.qr-card img { width: 104px; height: 104px; }
.quote-form { width: 100%; min-width: 0; }
.quote-page-panel { align-items: center; }
.quote-page-panel .quote-form { order: -1; }
.specialty-intro { color: var(--muted); text-align: center; margin: 24px 0 0; }
.source-panel { padding-block: 24px; }
.source-panel .notice-card { padding: 22px; }
.source-panel h2 { font-size: 1.4rem; }
.source-panel .kicker { display: none; }
.source-panel .link-pills { margin-top: 12px; }
.mobile-contact-bar { display: none; }
@media (min-width: 1024px) {
  .hero { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; }
  .about-panel, .quote-panel, .review-panel { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1040px) {
  .header-shell { width: min(var(--content-width), calc(100% - 2 * var(--page-gutter))); grid-template-columns: auto minmax(0, 1fr) max-content; }
  .site-nav { grid-column: 1 / -1; min-width: 0; justify-content: center; }
  .footer-shell { width: min(var(--content-width), calc(100% - 2 * var(--page-gutter))); }
}
@media (min-width: 768px) and (max-width: 1199px) {
  h1 { font-size: 3.4rem; }
  h2 { font-size: 2.3rem; }
}
@media (max-width: 1023px) {
  :root { --section-space: 44px; }
  .hero { gap: 32px; padding-block: 36px; }
  .hero-content { max-width: 680px; width: 100%; margin-inline: auto; text-align: center; }
  .hero-lead { margin-inline: auto; }
  .hero .cta-row { margin-inline: auto; justify-content: center; }
  .section { max-width: 680px; }
  .coverage-section { max-width: none; }
  .coverage-grid, .coverage-section .section-heading, .coverage-link-rail, .specialty-intro { max-width: 680px; margin-inline: auto; }
  .about-panel, .quote-panel, .review-panel { grid-template-columns: minmax(0, 1fr); }
  .about-copy, .quote-copy, .review-copy { max-width: none; }
  .about-panel, .quote-panel { gap: 28px; }
  .review-panel { padding: 28px; gap: 24px; }
}
@media (max-width: 767px) {
  :root { --page-gutter: 16px; --section-space: 36px; }
  body { padding-bottom: calc(68px + env(safe-area-inset-bottom)); }
  html { scroll-padding-bottom: 100px; }
  main a, main button, main summary { scroll-margin-bottom: 100px; }
  .hero { gap: 28px; padding-block: 28px; }
  h1 { font-size: 2.65rem; }
  h2 { font-size: 1.9rem; }
  .hero-lead { font-size: 1rem; margin-top: 14px; }
  .hero .cta-row { display: grid; margin-top: 18px; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .hero .cta-row .button { min-height: 46px; padding: 10px 8px; font-size: 0.84rem; white-space: normal; text-align: center; }
  .trust-line { font-size: 0.8rem; line-height: 1.5; font-weight: 650; }
  .motion-carousel { padding: 10px; }
  .story-carousel .motion-slide-copy, .focused-carousel .motion-slide-copy { padding: 18px 8px 12px; }
  .carousel-arrow { margin-top: calc(100cqw * 9 / 32); top: 0; transform: translateY(-50%); }
  .carousel-prev { left: 8px; right: auto; }
  .carousel-next { right: 8px; }
  .carousel-prev:hover, .carousel-prev:focus-visible { transform: translate(-2px, -50%); }
  .carousel-next:hover, .carousel-next:focus-visible { transform: translate(2px, -50%); }
  .coverage-grid { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  a.coverage-card { min-height: 116px; padding: 16px; grid-template-columns: 38px minmax(0, 1fr) 18px; gap: 12px; }
  .coverage-card h3 { font-size: 1.14rem; }
  .coverage-card p { font-size: 0.9rem; line-height: 1.45; margin-top: 5px; }
  .coverage-card .soft-icon { width: 38px; height: 38px; }
  .qr-card, .review-qr-card { display: none; }
  .review-panel { padding: 20px; gap: 24px; margin-block: 16px; }
  .real-review-excerpt { font-size: 1.05rem; line-height: 1.6; }
  .about-panel { gap: 24px; }
  .trust-ticker { padding-block: 3px; }
  .mobile-contact-bar { position: fixed; z-index: 40; inset: auto 0 0; display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 8px; padding: 10px 12px calc(10px + env(safe-area-inset-bottom)); background: rgba(5, 11, 18, 0.96); border-top: 1px solid var(--glass-line); backdrop-filter: blur(12px); }
  .mobile-contact-bar a { display: flex; align-items: center; justify-content: center; gap: 6px; min-height: 46px; border: 1px solid var(--glass-line); border-radius: 9px; color: var(--ink); text-decoration: none; font-size: 0.83rem; font-weight: 800; text-align: center; }
  .mobile-contact-bar a:last-child { color: #18212c; background: var(--champagne); border-color: var(--champagne); }
  .mobile-contact-bar .icon { width: 16px; height: 16px; flex-shrink: 0; }
}

`;
}

function jsSource() {
  // The committed runtime is the canonical browser source. Reading it here keeps
  // production builds from replacing later performance and accessibility fixes
  // with this historical fallback template.
  const committedRuntime = path.join(root, "assets", "site.js");
  if (fs.existsSync(committedRuntime)) return fs.readFileSync(committedRuntime, "utf8");

  return `const analyticsEventNames = new Set(["phone_click", "sms_click", "email_click", "quote_start"]);

const attributionStorageKey = "yffi_first_touch_v1";
const attributionParameterMap = {
  utm_source: "traffic_source",
  utm_medium: "traffic_medium",
  utm_campaign: "campaign_name",
  utm_content: "campaign_content"
};

function safeCampaignValue(value, fallback = "(not_set)") {
  const normalized = String(value || "")
    .normalize("NFKC")
    .replace(/[^a-zA-Z0-9._~:/ -]/g, " ")
    .replace(/\\s+/g, " ")
    .trim()
    .slice(0, 100);
  return normalized || fallback;
}

function referrerCategory() {
  if (!document.referrer) return "direct";
  try {
    const host = new URL(document.referrer).hostname.toLowerCase();
    if (host === window.location.hostname.toLowerCase()) return "internal";
    if (/(^|\\.)google\\./.test(host)) return "google";
    if (/(^|\\.)bing\\.com$/.test(host)) return "bing";
    if (/(^|\\.)(facebook|instagram)\\.com$/.test(host)) return "meta";
    if (/(^|\\.)linkedin\\.com$/.test(host)) return "linkedin";
    return "other";
  } catch {
    return "other";
  }
}

function readFirstTouchAttribution() {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(attributionStorageKey) || "null");
    if (stored && typeof stored === "object") return stored;
  } catch {}

  const params = new URLSearchParams(window.location.search);
  const attribution = {
    landing_page: window.location.pathname,
    referrer_category: referrerCategory()
  };
  for (const [queryKey, eventKey] of Object.entries(attributionParameterMap)) {
    attribution[eventKey] = safeCampaignValue(params.get(queryKey));
  }
  try {
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
  } catch {}
  return attribution;
}

const firstTouchAttribution = readFirstTouchAttribution();

function analyticsProductCategory() {
  const categoryByPath = {
    "/auto-insurance/": "auto",
    "/home-insurance/": "homeowners",
    "/renters-insurance/": "renters",
    "/commercial-insurance/": "commercial",
    "/life-insurance/": "life",
    "/es/seguro-de-auto/": "auto",
    "/es/seguro-de-vivienda/": "homeowners",
    "/es/seguro-de-inquilinos/": "renters",
    "/es/seguro-comercial/": "commercial",
    "/es/seguro-de-vida/": "life"
  };
  return categoryByPath[window.location.pathname] || "general";
}

function analyticsCtaLocation(target) {
  if (target?.closest(".site-header")) return "header";
  if (target?.closest(".hero")) return "hero";
  if (target?.closest("[data-insurance-carousel]")) return "carousel";
  if (target?.closest("[data-quote-handoff]")) return "quote_handoff";
  if (target?.closest(".quote-section, #quote")) return "quote_section";
  if (target?.closest("footer")) return "footer";
  return "content";
}

function pushAnalyticsEvent(eventName, target) {
  if (!analyticsEventNames.has(eventName)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_language: document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en",
    product_category: analyticsProductCategory(),
    cta_location: analyticsCtaLocation(target),
    landing_page: firstTouchAttribution.landing_page,
    referrer_category: firstTouchAttribution.referrer_category,
    traffic_source: firstTouchAttribution.traffic_source,
    traffic_medium: firstTouchAttribution.traffic_medium,
    campaign_name: firstTouchAttribution.campaign_name,
    campaign_content: firstTouchAttribution.campaign_content
  });
}

document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (!anchor) return;
  const href = anchor.getAttribute("href") || "";
  if (href.startsWith("tel:")) pushAnalyticsEvent("phone_click", anchor);
  else if (href.startsWith("sms:")) pushAnalyticsEvent("sms_click", anchor);
  else if (href.startsWith("mailto:")) pushAnalyticsEvent("email_click", anchor);
  else {
    try {
      const destination = new URL(href, window.location.href);
      if (destination.hostname.toLowerCase() === "secure.consumerratequotes.com" && destination.pathname === "/ConsumerV2") {
        pushAnalyticsEvent("quote_start", anchor);
      }
    } catch {}
  }
}, true);

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  siteNav.querySelectorAll("a").forEach((link, index) => {
    link.style.setProperty("--nav-delay", Math.min(index * 24, 160) + "ms");
  });
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.getAttribute("data-open") === "true";
    siteNav.setAttribute("data-open", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = Array.from(document.querySelectorAll("[data-reveal]")).filter((item) => !item.closest(".hero"));

if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches) {
  const cursorOrb = document.createElement("span");
  cursorOrb.className = "cursor-orb";
  cursorOrb.setAttribute("aria-hidden", "true");
  document.body.append(cursorOrb);

  let cursorFrame = 0;
  let cursorX = -80;
  let cursorY = -80;
  const syncCursor = () => {
    cursorFrame = 0;
    cursorOrb.style.setProperty("--cursor-x", (cursorX - 11) + "px");
    cursorOrb.style.setProperty("--cursor-y", (cursorY - 11) + "px");
  };

  window.addEventListener("pointermove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursorOrb.classList.add("is-visible");
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(syncCursor);
  }, { passive: true });
  window.addEventListener("pointerleave", () => cursorOrb.classList.remove("is-visible", "is-active"));

  document.querySelectorAll("a, button, input, select, textarea, summary, .motion-media-link, .coverage-card, .detail-card, .intent-card").forEach((target) => {
    target.addEventListener("pointerenter", () => cursorOrb.classList.add("is-active"));
    target.addEventListener("pointerleave", () => cursorOrb.classList.remove("is-active"));
  });
}

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

const animatedItems = document.querySelectorAll("[data-animate]");
if (animatedItems.length) {
  const syncMotionMedia = (item, shouldPlay) => {
    if (item.matches("[data-insurance-carousel]")) return;
    item.querySelectorAll("video").forEach((video) => {
      if (shouldPlay && !reducedMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };
  if (reducedMotion || !("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => {
      item.setAttribute("data-in-view", "true");
      syncMotionMedia(item, false);
    });
  } else {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.setAttribute("data-in-view", String(entry.isIntersecting));
        syncMotionMedia(entry.target, entry.isIntersecting);
      });
    }, { rootMargin: "96px 0px", threshold: 0.01 });
    animatedItems.forEach((item) => {
      syncMotionMedia(item, item.getAttribute("data-in-view") === "true");
      animationObserver.observe(item);
    });
  }
}

if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches && "IntersectionObserver" in window) {
  const depthSurfaces = Array.from(document.querySelectorAll("[data-insurance-carousel]"));
  const visibleDepthSurfaces = new Set();
  let depthFrame = 0;

  const syncDepth = () => {
    depthFrame = 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    visibleDepthSurfaces.forEach((surface) => {
      const rect = surface.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const normalized = Math.max(-1, Math.min(1, (center - viewportHeight / 2) / viewportHeight));
      const scrollDepth = normalized * -18;
      surface.style.setProperty("--scroll-depth", scrollDepth.toFixed(2) + "px");
      surface.style.setProperty("--media-scroll-y", (scrollDepth * -0.26).toFixed(2) + "px");
      surface.style.setProperty("--depth-y", (scrollDepth * -0.18).toFixed(2) + "px");
      surface.style.setProperty("--media-rotate-x", (normalized * -1.35).toFixed(2) + "deg");
    });
  };

  const requestDepthSync = () => {
    if (!depthFrame) depthFrame = window.requestAnimationFrame(syncDepth);
  };

  const depthObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleDepthSurfaces.add(entry.target);
      else {
        visibleDepthSurfaces.delete(entry.target);
        entry.target.style.setProperty("--scroll-depth", "0px");
        entry.target.style.setProperty("--media-scroll-y", "0px");
        entry.target.style.setProperty("--depth-y", "0px");
        entry.target.style.setProperty("--media-rotate-x", "0deg");
      }
    });
    requestDepthSync();
  }, { rootMargin: "180px 0px", threshold: 0.01 });

  depthSurfaces.forEach((surface) => depthObserver.observe(surface));
  window.addEventListener("scroll", requestDepthSync, { passive: true });
  window.addEventListener("resize", requestDepthSync, { passive: true });
}

document.querySelectorAll("[data-insurance-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".motion-slide"));
  const track = carousel.querySelector(".carousel-track");
  const chips = Array.from(carousel.querySelectorAll("[data-carousel-chip]"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const motionToggle = carousel.querySelector("[data-carousel-motion]");
  let userPaused = false;
  const delay = 6800;
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.dataset.active === "true"));
  let inView = !("IntersectionObserver" in window);
  let paused = reducedMotion;
  let interactionHoldUntil = 0;
  let dragging = false;
  let didDrag = false;
  let startX = 0;
  let startScrollLeft = 0;
  let scrollFrame = 0;
  let programmaticScroll = false;
  let programmaticScrollTimer = 0;

  const isTemporarilyPaused = () => userPaused || paused || Date.now() < interactionHoldUntil;

  const hydrateVideo = (slide) => {
    const video = slide?.querySelector(".motion-video");
    if (!video || video.dataset.loaded === "true" || !inView || reducedMotion || userPaused) return video;
    const webm = video.dataset.src;
    const mp4 = video.dataset.mp4;
    if (webm) {
      const source = document.createElement("source");
      source.src = webm;
      source.type = "video/webm";
      video.append(source);
    }
    if (mp4) {
      const source = document.createElement("source");
      source.src = mp4;
      source.type = "video/mp4";
      video.append(source);
    }
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.dataset.loaded = "true";
    video.addEventListener("playing", () => video.classList.add("is-ready"), { once: true });
    video.addEventListener("canplay", syncVideos);
    video.addEventListener("error", () => video.classList.remove("is-ready"));
    video.load();
    return video;
  };

  const syncVideos = () => {
    slides.forEach((slide, index) => {
      const video = slide.querySelector(".motion-video");
      if (index === activeIndex) hydrateVideo(slide);
      if (!video) return;
      const shouldPlay = index === activeIndex && inView && !reducedMotion && !userPaused && !document.hidden;
      if (shouldPlay && video.dataset.loaded === "true") {
        if (video.paused) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  const setPaused = (value) => {
    paused = value || reducedMotion;
    carousel.setAttribute("data-paused", String(paused || userPaused));
    syncVideos();
  };

  const setActive = (index, options = {}) => {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    const activeSlide = slides[activeIndex];
    const poster = activeSlide.querySelector(".motion-poster");
    if (poster?.dataset.posterSrc) {
      poster.src = poster.dataset.posterSrc;
      delete poster.dataset.posterSrc;
    }
    carousel.setAttribute("data-active-slide", activeSlide.dataset.slideId || "");
    slides.forEach((slide, slideIndex) => {
      slide.dataset.active = String(slideIndex === activeIndex);
      if (slideIndex === activeIndex) {
        slide.removeAttribute("inert");
      } else {
        slide.setAttribute("inert", "");
      }
    });
    chips.forEach((chip) => {
      chip.setAttribute("aria-selected", String(chip.dataset.slideId === activeSlide.dataset.slideId));
    });
    dots.forEach((dot) => {
      dot.setAttribute("aria-current", String(dot.dataset.slideId === activeSlide.dataset.slideId));
    });
    hydrateVideo(activeSlide);
    syncVideos();
    if (options.scroll !== false) {
      programmaticScroll = true;
      window.clearTimeout(programmaticScrollTimer);
      track?.scrollTo({ left: activeSlide.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
      programmaticScrollTimer = window.setTimeout(() => {
        programmaticScroll = false;
      }, reducedMotion ? 0 : 700);
    }
  };

  const holdAfterInteraction = () => {
    interactionHoldUntil = Date.now() + 9000;
    carousel.setAttribute("data-paused", "true");
    syncVideos();
  };

  // Keep the selected slide in view when its responsive width changes.
  let trackWidth = track?.clientWidth || 0;
  const realignTrack = () => {
    if (!track || !slides.length) return false;
    const width = track.clientWidth;
    if (!width || width === trackWidth) return false;
    trackWidth = width;
    programmaticScroll = true;
    window.clearTimeout(programmaticScrollTimer);
    track.scrollTo({ left: slides[activeIndex].offsetLeft, behavior: "instant" });
    programmaticScrollTimer = window.setTimeout(() => { programmaticScroll = false; }, 200);
    return true;
  };
  window.addEventListener("resize", realignTrack, { passive: true });
  if (track && "ResizeObserver" in window) new ResizeObserver(realignTrack).observe(track);

  const goToSlideId = (slideId) => {
    const index = slides.findIndex((slide) => slide.dataset.slideId === slideId);
    if (index >= 0) {
      holdAfterInteraction();
      setActive(index);
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => goToSlideId(chip.dataset.slideId));
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => goToSlideId(dot.dataset.slideId));
  });
  prev?.addEventListener("click", () => {
    holdAfterInteraction();
    setActive(activeIndex - 1);
  });
  next?.addEventListener("click", () => {
    holdAfterInteraction();
    setActive(activeIndex + 1);
  });

  track?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      holdAfterInteraction();
      setActive(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      holdAfterInteraction();
      setActive(activeIndex - 1);
    }
  });

  track?.addEventListener("scroll", () => {
    if (realignTrack() || programmaticScroll) return;
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      if (realignTrack() || programmaticScroll) return;
      const trackBox = track.getBoundingClientRect();
      const trackCenter = trackBox.left + trackBox.width / 2;
      let closestIndex = activeIndex;
      let closestDistance = Infinity;
      slides.forEach((slide, index) => {
        const box = slide.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== activeIndex) {
        holdAfterInteraction();
        setActive(closestIndex, { scroll: false });
      }
    });
  }, { passive: true });

  track?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    dragging = true;
    didDrag = false;
    startX = event.clientX;
    startScrollLeft = track.scrollLeft;
    track.setPointerCapture?.(event.pointerId);
  });
  track?.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 4) didDrag = true;
    track.scrollLeft = startScrollLeft - delta;
  });
  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    track.releasePointerCapture?.(event.pointerId);
    if (didDrag) holdAfterInteraction();
  };
  track?.addEventListener("pointerup", endDrag);
  track?.addEventListener("pointercancel", endDrag);
  track?.addEventListener("click", (event) => {
    if (didDrag) {
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
    }
  }, true);

  const updateMotionToggle = () => {
    if (!motionToggle) return;
    const stopped = userPaused || reducedMotion;
    motionToggle.setAttribute("aria-pressed", String(stopped));
    carousel.setAttribute("data-motion-stopped", String(stopped));
    motionToggle.disabled = reducedMotion;
    motionToggle.textContent = stopped
      ? (document.documentElement.lang.startsWith("es") ? "Reanudar animación" : "Resume motion")
      : (document.documentElement.lang.startsWith("es") ? "Pausar animación" : "Pause motion");
    if (reducedMotion) motionToggle.textContent = document.documentElement.lang.startsWith("es") ? "Animación desactivada" : "Motion disabled";
    carousel.setAttribute("data-paused", String(stopped || paused));
    syncVideos();
  };
  motionToggle?.addEventListener("click", () => {
    userPaused = !userPaused;
    updateMotionToggle();
  });
  updateMotionToggle();
  document.addEventListener("visibilitychange", syncVideos);

  carousel.addEventListener("mouseenter", () => setPaused(true));
  carousel.addEventListener("mouseleave", () => setPaused(false));
  carousel.addEventListener("focusin", () => setPaused(true));
  carousel.addEventListener("focusout", () => setPaused(false));

  if ("IntersectionObserver" in window) {
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        carousel.setAttribute("data-in-view", String(inView));
        syncVideos();
      });
    }, { threshold: 0.01 });
    carouselObserver.observe(carousel.querySelector(".carousel-stage") || carousel);
  } else {
    inView = true;
    carousel.setAttribute("data-in-view", "true");
  }

  // Muted inline videos start as soon as their media enters the viewport.
  // Retry after a gesture if the browser's autoplay policy rejected playback.
  document.addEventListener("pointerdown", syncVideos);
  document.addEventListener("keydown", syncVideos);

  if (!reducedMotion) {
    window.setInterval(() => {
      const shouldHold = isTemporarilyPaused() || !inView || document.hidden;
      carousel.setAttribute("data-paused", String(shouldHold));
      if (!shouldHold) setActive(activeIndex + 1);
      syncVideos();
    }, delay);
  }

  setActive(activeIndex, { scroll: false });
  setPaused(reducedMotion);
});

document.querySelectorAll("[data-google-review-carousel]").forEach((carousel) => {
  const cards = Array.from(carousel.querySelectorAll("[data-review-card]"));
  const dots = Array.from(carousel.querySelectorAll("[data-review-dot]"));
  const prev = carousel.querySelector("[data-review-prev]");
  const next = carousel.querySelector("[data-review-next]");
  if (!cards.length) return;
  let activeIndex = 0;

  const setActive = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-hidden", String(!isActive));
      card.toggleAttribute("inert", !isActive);
      card.querySelectorAll("a, button, summary").forEach((control) => {
        control.tabIndex = isActive ? 0 : -1;
      });
    });
    dots.forEach((dot, dotIndex) => {
      const isActiveDot = Number(dot.dataset.reviewDot || 0) === activeIndex;
      dot.setAttribute("aria-selected", String(isActiveDot));
      dot.classList.toggle("is-active", isActiveDot);
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setActive(Number(dot.dataset.reviewDot || 0));
    });
  });
  prev?.addEventListener("click", () => {
    setActive(activeIndex - 1);
  });
  next?.addEventListener("click", () => {
    setActive(activeIndex + 1);
  });
  carousel.querySelectorAll('[role="tablist"]').forEach((tablist) => {
    tablist.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === "Home" ? 0 : event.key === "End" ? cards.length - 1 : activeIndex + (event.key === "ArrowRight" ? 1 : -1);
      setActive(index);
      const selected = tablist.querySelector('[aria-selected="true"]');
      selected?.focus();
    });
  });
  setActive(0);
});

if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches) {
  const particleColors = [
    "rgba(154, 220, 247, 0.88)",
    "rgba(255, 224, 161, 0.82)",
    "rgba(255, 125, 101, 0.76)",
    "rgba(119, 231, 220, 0.78)"
  ];
  let liveParticles = 0;
  const spawnLiquidParticles = (event, count = 5, mode = "burst") => {
    if (!event?.currentTarget || document.hidden || liveParticles > 64) return;
    const surface = event.currentTarget;
    const now = Date.now();
    const stampKey = mode === "trail" ? "particleTrailAt" : "particleAt";
    const last = Number(surface.dataset[stampKey] || 0);
    const cooldown = mode === "trail" ? 160 : 175;
    if (now - last < cooldown) return;
    surface.dataset[stampKey] = String(now);
    const rect = surface.getBoundingClientRect();
    const baseX = Math.max(rect.left, Math.min(event.clientX || rect.left + rect.width / 2, rect.right));
    const baseY = Math.max(rect.top, Math.min(event.clientY || rect.top + rect.height / 2, rect.bottom));
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      const angle = (Math.PI * 2 * index) / Math.max(1, count) + Math.random() * 0.74;
      const distance = (mode === "trail" ? 12 : 20) + Math.random() * (mode === "trail" ? 18 : 42);
      const size = (mode === "trail" ? 2.4 : 3.4) + Math.random() * (mode === "trail" ? 3.1 : 5.8);
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.className = "liquid-particle";
      particle.style.setProperty("--particle-x", (baseX + (Math.random() - 0.5) * 20).toFixed(1) + "px");
      particle.style.setProperty("--particle-y", (baseY + (Math.random() - 0.5) * 16).toFixed(1) + "px");
      particle.style.setProperty("--particle-dx", (Math.cos(angle) * distance).toFixed(1) + "px");
      particle.style.setProperty("--particle-dy", (Math.sin(angle) * distance - 22 - Math.random() * 16).toFixed(1) + "px");
      particle.style.setProperty("--particle-size", size.toFixed(1) + "px");
      particle.style.setProperty("--particle-color", color);
      particle.style.setProperty("--particle-angle", ((angle * 180) / Math.PI).toFixed(1) + "deg");
      particle.style.setProperty("--particle-spin", (40 + Math.random() * 120).toFixed(1) + "deg");
      particle.style.setProperty("--particle-tail", (12 + distance * 0.38).toFixed(1) + "px");
      particle.style.setProperty("--particle-duration", (mode === "trail" ? 660 + Math.random() * 220 : 820 + Math.random() * 300).toFixed(0) + "ms");
      liveParticles += 1;
      document.body.append(particle);
      particle.addEventListener("animationend", () => {
        liveParticles = Math.max(0, liveParticles - 1);
        particle.remove();
      }, { once: true });
    }
  };

  const hoverSurfaceSelector = [
    ".liquid-tilt",
    ".motion-carousel",
    ".button",
    ".coverage-card",
    ".detail-card",
    ".intent-card",
    ".quote-form",
    ".service-cta",
    ".trust-strip article",
    ".why-grid article",
    ".language-grid article",
    ".review-signal-grid article",
    ".review-card",
    ".real-review-card",
    ".real-review-mini",
    ".review-source-card",
    ".review-qr-card",
    ".notice-card",
    ".callout",
    ".qr-card",
    ".faq details",
    ".about-media",
    ".franchise-card"
  ].join(",");

  document.querySelectorAll(hoverSurfaceSelector).forEach((surface) => {
    let frame = 0;
    let lastEvent = null;

    surface.addEventListener("pointerenter", (event) => {
      const stronger = surface.matches(".button, .motion-carousel, .real-review-card, .coverage-card, .review-qr-card");
      spawnLiquidParticles(event, stronger ? 10 : 5);
    }, { passive: true });

    surface.addEventListener("click", (event) => {
      if (surface.matches("a, button, .button, .carousel-chip, .real-review-mini")) {
        spawnLiquidParticles(event, 13);
      }
    });

    surface.addEventListener("pointermove", (event) => {
      lastEvent = event;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!lastEvent) return;
        const rect = surface.getBoundingClientRect();
        const x = (lastEvent.clientX - rect.left) / rect.width;
        const y = (lastEvent.clientY - rect.top) / rect.height;
        surface.style.setProperty("--glare-x", Math.round(x * 100) + "%");
        surface.style.setProperty("--glare-y", Math.round(y * 100) + "%");
        if (surface.matches(".button, .motion-carousel, .coverage-card, .review-source-card, .review-qr-card") && liveParticles < 38) {
          spawnLiquidParticles(lastEvent, 1, "trail");
        }
        if (surface.classList.contains("liquid-tilt")) {
          surface.style.setProperty("--tilt-x", ((x - 0.5) * 7).toFixed(2) + "deg");
          surface.style.setProperty("--tilt-y", ((0.5 - y) * 6).toFixed(2) + "deg");
        }
        if (surface.classList.contains("motion-carousel")) {
          surface.style.setProperty("--parallax-x", ((x - 0.5) * 16).toFixed(2) + "px");
          surface.style.setProperty("--parallax-y", ((y - 0.5) * 12).toFixed(2) + "px");
          surface.style.setProperty("--depth-x", ((x - 0.5) * -5).toFixed(2) + "px");
          surface.style.setProperty("--media-rotate-y", ((x - 0.5) * 1.6).toFixed(2) + "deg");
        }
        if (surface.classList.contains("magnetic-button")) {
          surface.style.setProperty("--magnet-x", ((x - 0.5) * 5).toFixed(2) + "px");
          surface.style.setProperty("--magnet-y", ((y - 0.5) * 4).toFixed(2) + "px");
        }
      });
    });

    surface.addEventListener("pointerleave", () => {
      lastEvent = null;
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
      surface.style.setProperty("--glare-x", "50%");
      surface.style.setProperty("--glare-y", "0%");
      surface.style.setProperty("--parallax-x", "0px");
      surface.style.setProperty("--parallax-y", "0px");
      surface.style.setProperty("--depth-x", "0px");
      surface.style.setProperty("--media-rotate-y", "0deg");
      surface.style.setProperty("--magnet-x", "0px");
      surface.style.setProperty("--magnet-y", "0px");
    });
  });
}

const publicServiceTools = [
  {
    name: "find_insurance_service",
    title: "Find an insurance service",
    description: "Return the relevant public YFFI3 service page for one insurance category. This read-only tool does not quote, bind, or guarantee coverage.",
    inputSchema: {
      type: "object",
      properties: {
        service: {
          type: "string",
          enum: ["auto", "homeowners", "renters", "commercial", "life"],
          description: "Insurance category to locate."
        },
        language: {
          type: "string",
          enum: ["en", "es"],
          description: "Preferred page language."
        }
      },
      required: ["service"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: async ({ service, language = "en" }) => {
      const paths = {
        auto: ["/auto-insurance/", "/es/seguro-de-auto/"],
        homeowners: ["/home-insurance/", "/es/seguro-de-vivienda/"],
        renters: ["/renters-insurance/", "/es/seguro-de-inquilinos/"],
        commercial: ["/commercial-insurance/", "/es/seguro-comercial/"],
        life: ["/life-insurance/", "/es/seguro-de-vida/"]
      };
      const pair = paths[service];
      if (!pair) return { error: "Unsupported insurance category." };
      return {
        service,
        url: new URL(pair[language === "es" ? 1 : 0], window.location.origin).href,
        disclaimer: "Coverage, pricing, eligibility, discounts, and availability vary by carrier, underwriting, location, and applicant information."
      };
    }
  },
  {
    name: "get_office_contact",
    title: "Get Office #3 contact information",
    description: "Return verified public contact and bilingual-service information for Your Family First Insurance Office #3.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: async () => ({
      name: "Your Family First Insurance Office #3",
      address: "11200 W Flagler St, Suite 108-109, Miami, FL 33174",
      phone: "305-910-8850",
      telephone_uri: "tel:13059108850",
      languages: ["English", "Spanish"]
    })
  },
  {
    name: "get_quote_handoff",
    title: "Get the safe quote handoff",
    description: "Return the human-facing YFFI3 quote page and approved secure external intake URL. This read-only tool never submits data or navigates without user action.",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", enum: ["en", "es"], description: "Preferred quote-help page language." }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: async ({ language = "en" } = {}) => ({
      quote_help_url: new URL(language === "es" ? "/es/solicitar-cotizacion/" : "/get-a-quote/", window.location.origin).href,
      secure_external_intake_url: "${quoteDestination}",
      requires_user_confirmation: true,
      sensitive_data_warning: "Do not provide SSNs, dates of birth, driver license numbers, VINs, payment data, medical records, claim files, passwords, or carrier credentials through a general website interaction."
    })
  }
];

const modelContext = document.modelContext || navigator.modelContext;
if (modelContext && typeof modelContext.registerTool === "function") {
  publicServiceTools.forEach((tool) => {
    Promise.resolve(modelContext.registerTool(tool)).catch(() => {});
  });
} else if (navigator.modelContext && typeof navigator.modelContext.provideContext === "function") {
  Promise.resolve(navigator.modelContext.provideContext({ tools: publicServiceTools })).catch(() => {});
}
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /*.zip$
Disallow: /package.json
Disallow: /pnpm-lock.yaml
Disallow: /server.js
Disallow: /playwright.config.mjs
Disallow: /AGENTS.md
Disallow: /AUDIT_REPORT.md
Disallow: /DEPLOYMENT.md
Disallow: /DEPLOYMENT_AUTHORIZATION_REQUESTS.md
Disallow: /MEDIA_TODO.md
Disallow: /README.md
Disallow: /SECURITY.md
Disallow: /SEO_AI_FINDABILITY_NOTES.md
Disallow: /node_modules/
Disallow: /test-results/
Disallow: /playwright-report/
Disallow: /playwright-screenshots/
Disallow: /audit-screenshots/

User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

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
Google review path: ${googleReviewUrl}

## Public Pages

- Home: ${siteUrl}/
- Auto insurance: ${siteUrl}/auto-insurance/
- Home insurance: ${siteUrl}/home-insurance/
- Commercial insurance: ${siteUrl}/commercial-insurance/
- Life insurance: ${siteUrl}/life-insurance/
- Renters insurance: ${siteUrl}/renters-insurance/
- About Office #3: ${siteUrl}/about-office-3/
- Free insurance quotes: ${siteUrl}/get-a-quote/
- Existing customer and policyholder help: ${siteUrl}/policyholder-help/
- Hurricane preparation: ${siteUrl}/customer-resources/hurricane-preparation/
- Renewal review: ${siteUrl}/customer-resources/renewal-review/
- Certificate guidance: ${siteUrl}/customer-resources/certificate-of-insurance/
- Annual and life-event review: ${siteUrl}/customer-resources/life-event-review/
- Privacy policy: ${siteUrl}/privacy-policy/
- Terms and insurance disclaimer: ${siteUrl}/terms/

## Safe Summary

Your Family First Insurance Office #3 helps Miami families and local businesses compare auto, home, homeowners, renters, flood, motorcycle, boat, RV, general liability, business, commercial, workers compensation, life, and health insurance quote options. It also publishes bilingual educational guidance for existing customers about renewals, hurricane preparation, certificates, and annual reviews. The site uses official franchise identification and real Office #3 imagery supplied for the project.

## Important Boundaries

- Do not infer price promises, savings promises, instant approval, or bound coverage from this website.
- Do not infer unauthorized carrier partnerships, endorsements, awards, reviews, or ratings.
- Do not ask users to submit SSNs, dates of birth, driver license numbers, VINs, payment information, medical records, claim files, passwords, or carrier credentials through a general website form.
- Quote availability, coverage, pricing, and eligibility vary by carrier, underwriting, location, and applicant information.
- ConsumerRateQuotes account ID 64868 is the connected quote path for Office #3.
- Google reviews should be read or left through the live Google review path; do not fabricate review text, ratings, counts, awards, or testimonials.
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
Privacy note: The public page opens the verified ConsumerRateQuotes intake URL directly and does not collect duplicate contact or underwriting fields.
Customer service note: Public policyholder guides do not accept policy numbers, documents, claim files, or service requests.
Quote path: ConsumerRateQuotes account ID 64868.
Google review path: ${googleReviewUrl}
`;
}

function apacheHtaccess() {
  return `<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Cross-Origin-Resource-Policy "same-origin"
  Header always set Origin-Agent-Cluster "?1"
  Header always set X-Permitted-Cross-Domain-Policies "none"
  Header always set Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; media-src 'self'; font-src 'self' data: https://fonts.gstatic.com; script-src 'self' 'sha256-2JyBHXxlFw5e479qJ2HK7wNieUZO+hE/as4Bu1zw4As=' https://www.googletagmanager.com https://tagmanager.google.com; script-src-attr 'none'; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; frame-src https://www.googletagmanager.com https://tagmanager.google.com; connect-src 'self' https://google.com https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://ad.doubleclick.net; upgrade-insecure-requests"
</IfModule>

Options -Indexes

ErrorDocument 404 /404.html

<FilesMatch "^(AGENTS|AUDIT_REPORT|DEPLOYMENT|DEPLOYMENT_AUTHORIZATION_REQUESTS|README|SECURITY|SEO_AI_FINDABILITY_NOTES)\\.md$|^(package|pnpm-lock)\\.json$|^(server|playwright\\.config)\\.(js|mjs|ts)$|\\.zip$">
  Require all denied
</FilesMatch>

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

- Homepage uses a sticky glass header, dark liquid hero, trust strip, real office image, glass coverage cards, process section, local office section, official franchise badge, direct secure quote handoff, FAQ, final CTA, and footer.
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
- Robots.txt allows search and user-requested retrieval crawlers, blocks model-training crawlers, and points to the sitemap.
- llms.txt and humans.txt provide AI-readable and human-readable public site facts.

## Privacy and Security

- The public quote page contains no duplicate contact or underwriting fields before opening ${quoteDestination}.
- The page warns users to share sensitive data only through a secure process that specifically requires it.
- A redirect is measured as \`quote_start\`; it is not reported as a submitted or generated lead without downstream acknowledgement.
- ConsumerRateQuotes account ID 64868 was confirmed by the owner as the Office #3 intake path.
- \`server.js\` serves the built \`dist/\` folder with Express and sets baseline browser security headers for the GoDaddy Beta Apps Node.js runtime.
- \`.htaccess\` remains in the static export only as a harmless fallback artifact for Apache-style static hosting.
- The standard GTM container is installed once. It currently provides GA4 measurement and a Google Ads destination; the Apollo tracker is paused and requires separate owner and privacy approval before any future use.
- The site analytics data layer excludes names, phone numbers, email addresses, ZIP codes, notes, and insurance details.
- No API keys or SMTP credentials are shipped in the public build.

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
- Dedicated pages for home, auto insurance, homeowners insurance, commercial insurance, life insurance, renters insurance, about, quote, privacy, and terms.
- Service pages include Miami search-intent topic panels and expanded customer-facing FAQs for local, product-specific searches.
- InsuranceAgency, Service, FAQPage, and BreadcrumbList schema where appropriate.
- Robots.txt allows search and user-requested retrieval crawlers while blocking model-training crawlers.
- Sitemap includes every generated public page.
- llms.txt and humans.txt provide AI-readable and human-readable public site facts.
- Internal links connect service pages, quote page, and footer navigation.
- Security/privacy controls disclose GTM, GA4, Google Ads, and the pending Apollo review, and warn users against sending sensitive information.

## Best Next SEO Actions

1. Verify the exact Google Business Profile and match NAP, hours, categories, and website URL to the site.
2. Add only verified social/listing profile URLs to the footer.
3. Add real office hours once confirmed by the business.
4. Test the connected ConsumerRateQuotes intake URL in production and confirm lead delivery.
5. Add real, permissioned customer review snippets only if they are sourced and allowed by platform rules.
6. Add original local content over time: West Flagler insurance FAQs, hurricane-season insurance preparation, business certificate guidance, and Miami-Dade driver/homeowner guides.
7. Submit the sitemap in Google Search Console and Bing Webmaster Tools after GoDaddy Beta Apps deployment.
8. Monitor Search Console queries for Miami, West Flagler, auto, homeowners, commercial, general liability, health, life, renters, and business insurance terms.
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
    - Quote handoff card contains no duplicate contact fields and opens \`${quoteDestination}\`.
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

Do not replace the official franchise assets with generated images or a redesigned logo.

The carousel inventory lives in \`/src/data/carouselMedia.js\`. Update that manifest first whenever replacing media, then run \`pnpm run build\` so \`scripts/validate-carousel-assets.mjs\` can catch duplicate paths, missing alt text, missing license notes, page-off-topic slides, or any static carousel slide.

Most carousel videos now live under \`/public/media/premium-carousel/\`; the approved family beach life clip remains under \`/public/media/carousel/life/\`. Keep carousel media local, muted, loopable, optimized, page-specific, and unique. Do not hotlink external media in production, and do not reintroduce static image slides.
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
  writeFile(path.join(root, "404.html"), notFoundHtml());
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

export {
  pages,
  faqHtml,
  faqSchema,
  serviceCards,
  specialtyCoverageLinks,
  tickerItems,
  siteUrl,
  phoneDisplay,
  phoneHref,
  smsHref,
  businessName,
  address,
  quoteDestination,
  googleReviewUrl,
  contentReviewedDate
};
