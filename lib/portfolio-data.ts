// ─── HOW TO ADD A NEW PROJECT ─────────────────────────────────
// 1. Copy any existing entry in the relevant array
// 2. Change the id to the next number (e.g. "cp-05", "bl-25", etc.)
// 3. Fill in the fields and save — it appears on the site automatically
// ─────────────────────────────────────────────────────────────────

export interface BaselineProject {
  id: string;
  title: string;
  client: string;
  location: string;
  keyActivities: string[];
  tags: string[];
}

export interface TrainingProject {
  id: string;
  client: string;
  duration: string;
  location: string;
  description: string;
  tags: string[];
}

export interface EvaluationProject {
  id: string;
  client: string;
  duration: string;
  title: string;
  location: string;
  tags: string[];
}

export interface CurrentProject {
  id: string;
  title: string;
  client: string;
  location: string;
  period: string;
  description: string;
  tags: string[];
}

export interface PortfolioData {
  currentProjects: CurrentProject[];
  baselineAssessments: BaselineProject[];
  trainingCapacity: TrainingProject[];
  evaluationResearch: EvaluationProject[];
}

export const portfolioData: PortfolioData = {
  currentProjects: [
    {
      id: "cp-01",
      title: "Socio-Economic Empowerment Evaluation",
      client: "NCA",
      location: "Mirpurkhas, Rawalpindi, Islamabad",
      period: "Sep-Oct 2025",
      description: "Assessing equal opportunity creation for marginalized communities",
      tags: ["Evaluation", "Gender", "Livelihoods"],
    },
    {
      id: "cp-02",
      title: "Gender-Responsive SBCC Strategy",
      client: "AKRSP",
      location: "Gilgit-Baltistan & Sindh",
      period: "Jun-Sep 2025",
      description: "Developing behavior change communication strategies for gender programming",
      tags: ["Gender", "SBCC", "Capacity Building"],
    },
    {
      id: "cp-03",
      title: "Immunization & Nutrition Capacity Building",
      client: "AKRSP",
      location: "Gilgit-Baltistan & Thatta",
      period: "Jun-Sep 2025",
      description: "Training manual development and CRP training for immunization outreach",
      tags: ["Health", "Nutrition", "Capacity Building"],
    },
    {
      id: "cp-04",
      title: "Disaster Risk Financing Advocacy",
      client: "FRDP/WHH",
      location: "Islamabad & Sindh",
      period: "Jul 2024-Oct 2025",
      description: "Engaging parliamentarians and government departments on DRR financing",
      tags: ["DRR", "Advocacy", "Governance"],
    },
  ],
  baselineAssessments: [
    {
      id: "bl-01",
      title: "Disaster Risk Financing (DRF) – Sindh Province",
      client: "Sindh and ICT",
      location: "Sindh and ICT",
      keyActivities: [
        "Implemented 10 DRF initiatives reaching 200+ stakeholders",
        "Developed gender-responsive DRF manual in English and Urdu",
        "Built capacity of parliamentarians, NGOs, and CSOs",
      ],
      tags: ["DRR", "Gender", "Advocacy"],
    },
    {
      id: "bl-02",
      title: "Policy and Legislative Gap Analysis – WASH and Climate Change",
      client: "Punjab and Sindh",
      location: "Punjab and Sindh",
      keyActivities: [
        "Comprehensive review of WASH and climate change policies",
        "Analyzed alignment with SDG 6 and climate resilience",
        "Recommended framework enhancements for inclusive development",
      ],
      tags: ["WASH", "Climate", "Policy"],
    },
    {
      id: "bl-03",
      title: "Climate-Resilient WASH Indicators Integration",
      client: "Sindh Province",
      location: "Sindh Province",
      keyActivities: [
        "Conducted province-wide situation and gap analysis",
        "Supported integration of climate-resilient WASH indicators into Sindh HIS",
      ],
      tags: ["WASH", "Climate", "Research"],
    },
    {
      id: "bl-04",
      title: "Assessment – Climate Change and Women with Disabilities",
      client: "Sindh and Balochistan",
      location: "Sindh and Balochistan",
      keyActivities: [
        "Assessed vulnerabilities of girls and women with disabilities post-floods",
        "Developed inclusive response strategies for marginalized groups",
      ],
      tags: ["Gender", "Climate", "Disability Inclusion"],
    },
    {
      id: "bl-05",
      title: "Research-Based Concept Notes Development",
      client: "Sindh Coastal Belt",
      location: "Sindh Coastal Belt",
      keyActivities: [
        "Conceptualized research notes on WASH, DRR, and Shelters",
        "Developed frameworks for Climate Change, Food Security, and Livelihoods",
      ],
      tags: ["WASH", "DRR", "Research"],
    },
    {
      id: "bl-06",
      title: "Organizational Capacity Assessment – DRR and CCA",
      client: "Muzaffarabad, AJK",
      location: "Muzaffarabad, AJK",
      keyActivities: [
        "Conducted OCA of CSOs and AJK government departments",
        "Developed DRR and CCA training manual",
      ],
      tags: ["DRR", "Capacity Building", "Climate"],
    },
    {
      id: "bl-07",
      title: "Community Risk Assessment and LAPA Development",
      client: "Peshawar, KP",
      location: "Peshawar, KP",
      keyActivities: [
        "Conducted in-depth Community Risk Assessment",
        "Prepared Local Adaptation Plans of Action (LAPA)",
      ],
      tags: ["DRR", "Climate", "Community Development"],
    },
    {
      id: "bl-08",
      title: "Gender-Inclusive Disaster Management Plans",
      client: "20 UCs of District Peshawar, KP",
      location: "20 UCs of District Peshawar, KP",
      keyActivities: [
        "Developed gender-inclusive DM plans for 20 Union Councils",
        "Integrated needs of marginalized groups into participatory planning",
      ],
      tags: ["Gender", "DRR", "Governance"],
    },
    {
      id: "bl-09",
      title: "DRR and CCA Capacity Building",
      client: "Peshawar, KP",
      location: "Peshawar, KP",
      keyActivities: [
        "Conducted comprehensive capacity assessment",
        "Developed community-based DRR and CCA training manual",
      ],
      tags: ["DRR", "Climate", "Capacity Building"],
    },
    {
      id: "bl-10",
      title: "Baseline Study – DRR and CSLM Project",
      client: "District Karachi (Malir) and Thatta, Sindh",
      location: "District Karachi (Malir) and Thatta, Sindh",
      keyActivities: [
        "Assessed community vulnerabilities and livelihood practices",
        "Identified climate-resilient livelihood opportunities",
      ],
      tags: ["DRR", "Livelihoods", "Baseline"],
    },
    {
      id: "bl-11",
      title: "Seasonal Food Insecurity Analysis",
      client: "Peshawar, KP",
      location: "Peshawar, KP",
      keyActivities: [
        "Conducted seasonal mapping of food insecurity and income patterns",
        "Informed PRIWAR project food security programming",
      ],
      tags: ["Food Security", "Livelihoods", "Research"],
    },
    {
      id: "bl-12",
      title: "Market Livelihood Restoration Mapping",
      client: "Flood Affected Districts of Sindh",
      location: "Flood Affected Districts of Sindh",
      keyActivities: [
        "Categorized context-based market opportunities",
        "Mapped livelihood restoration pathways for RABL project",
      ],
      tags: ["Livelihoods", "Market Assessment", "Recovery"],
    },
    {
      id: "bl-13",
      title: "Baseline Study – Technical Training Center",
      client: "Hub and Lasbela, Balochistan",
      location: "Hub and Lasbela, Balochistan",
      keyActivities: [
        "Conducted baseline for technical training center adoption",
        "Assessed vocational training needs and opportunities",
      ],
      tags: ["Capacity Building", "Livelihoods", "Baseline"],
    },
    {
      id: "bl-14",
      title: "Seasonal Food Insecurity and Livelihood Analysis",
      client: "District Muzaffarabad, AJK",
      location: "District Muzaffarabad, AJK",
      keyActivities: [
        "Analyzed seasonal food insecurity patterns",
        "Conducted comprehensive livelihood assessment",
      ],
      tags: ["Food Security", "Livelihoods", "Climate"],
    },
    {
      id: "bl-15",
      title: "Household Livelihood Preferences Analysis",
      client: "District Muzaffarabad, AJK",
      location: "District Muzaffarabad, AJK",
      keyActivities: [
        "Assessed household livelihood preferences and adaptive options",
        "Identified community-preferred resilience strategies",
      ],
      tags: ["Livelihoods", "Research", "Community Development"],
    },
    {
      id: "bl-16",
      title: "Baseline Assessment – Women's Economic Empowerment",
      client: "Afghan Refugees, Haripur, Mansehra, KP",
      location: "Afghan Refugees, Haripur, Mansehra, KP",
      keyActivities: [
        "Detailed baseline for women's economic empowerment",
        "Assessed needs of Afghan refugee women in multiple camps",
      ],
      tags: ["Gender", "Livelihoods", "Baseline"],
    },
    {
      id: "bl-17",
      title: "Job Market Assessment for Youth Employment",
      client: "Peshawar, Mardan, Nowshera, Charsadda, KP",
      location: "Peshawar, Mardan, Nowshera, Charsadda, KP",
      keyActivities: [
        "Analyzed job market for skilled youth placement",
        "Assessed self-employment and enterprise development opportunities",
      ],
      tags: ["Livelihoods", "Youth", "Market Assessment"],
    },
    {
      id: "bl-18",
      title: "Market Assessments for Vocational Training",
      client: "Multan, Bahawalpur, Hyderabad",
      location: "Multan, Bahawalpur, Hyderabad",
      keyActivities: [
        "Conducted value chain assessments and trade finalization",
        "Supported vocational skills training program development",
      ],
      tags: ["Market Assessment", "Livelihoods", "Capacity Building"],
    },
    {
      id: "bl-19",
      title: "Rapid Solid Waste Assessment",
      client: "Nine Villages of District Layyah, Punjab",
      location: "Nine Villages of District Layyah, Punjab",
      keyActivities: [
        "Conducted rapid solid waste situation assessment",
        "Built capacity of project staff and CBO members on waste management",
      ],
      tags: ["WASH", "Environment", "Community Development"],
    },
    {
      id: "bl-20",
      title: "Rapid Market Assessment with Stakeholders",
      client: "Thatta, Khairpur, Karachi, Sindh",
      location: "Thatta, Khairpur, Karachi, Sindh",
      keyActivities: [
        "Engaged Market Committees, Associations, Chambers of Commerce",
        "Conducted comprehensive market assessment for GRASP-ITC project",
      ],
      tags: ["Market Assessment", "Livelihoods", "Research"],
    },
    {
      id: "bl-21",
      title: "Situational Analysis of Farmers",
      client: "Tehsil Dalbandin, District Chagai, Balochistan",
      location: "Tehsil Dalbandin, District Chagai, Balochistan",
      keyActivities: [
        "Conducted situational analysis in drought-affected area",
        "Assessed agricultural challenges and opportunities",
      ],
      tags: ["Agriculture", "Food Security", "Research"],
    },
    {
      id: "bl-22",
      title: "Situational Analysis of Vegetable Growers",
      client: "D.I. Khan, Tehsil Kulachi, Tank, KP",
      location: "D.I. Khan, Tehsil Kulachi, Tank, KP",
      keyActivities: [
        "Analyzed vegetable value chains in Gomal Zam command area",
        "Assessed high-value and off-season vegetable production",
      ],
      tags: ["Agriculture", "Livelihoods", "Market Assessment"],
    },
    {
      id: "bl-23",
      title: "Rapid Market Assessment",
      client: "District Chagai and Quetta, Balochistan",
      location: "District Chagai and Quetta, Balochistan",
      keyActivities: [
        "Conducted rapid market assessment in drought-affected regions",
        "Identified market opportunities and constraints",
      ],
      tags: ["Market Assessment", "DRR", "Recovery"],
    },
    {
      id: "bl-24",
      title: "Livestock Market Assessment",
      client: "Muzaffargarh District, Punjab",
      location: "Muzaffargarh District, Punjab",
      keyActivities: [
        "Assessed livestock and livestock products trading",
        "Analyzed market chains and value addition opportunities",
      ],
      tags: ["Agriculture", "Livelihoods", "Market Assessment"],
    },
  ],
  trainingCapacity: [
    {
      id: "tr-01",
      client: "AKRSP",
      duration: "Jun-Oct 2025",
      location: "Diamer, Gilgit, Astore (GB); Thatta, Sujawal (Sindh)",
      description: "BCC training manual on immunization and nutrition. 5 training sessions for CRPs.",
      tags: ["Health", "Nutrition", "Capacity Building"],
    },
    {
      id: "tr-02",
      client: "Civil Society Support Program",
      duration: "Jul-Sep 2025",
      location: "Mirpurkhas, Sindh",
      description: "PFA and MHPSS training for counselors. 4 online sessions + in-person refresher.",
      tags: ["MHPSS", "Protection", "Capacity Building"],
    },
    {
      id: "tr-03",
      client: "Participatory Village Development Program",
      duration: "Aug-Sep 2025",
      location: "District Mirpurkhas, Sindh",
      description: "3-day First Aid ToT with demonstrations and simulations. Training manual developed.",
      tags: ["Health", "DRR", "Capacity Building"],
    },
    {
      id: "tr-04",
      client: "PRIWAR/AJK",
      duration: "Jan-Apr 2025",
      location: "Muzaffarabad, AJK",
      description: "OCA of CSOs and government departments on DRR and CCA. 4-day ToTs delivered.",
      tags: ["DRR", "Climate", "Capacity Building"],
    },
    {
      id: "tr-05",
      client: "Islamic Relief Pakistan",
      duration: "May-Dec 2024",
      location: "KP, Sindh, Punjab, Balochistan",
      description: "GALS Trainer's Manual developed. 4 ToTs for project teams across all provinces.",
      tags: ["Gender", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-06",
      client: "RSPN",
      duration: "Jul-Dec 2023",
      location: "Sukkur, Peshawar, Naseerabad, Lasbela",
      description: "6 ToTs training 150 staff on DRR, Climate Change, GBV, MHM, and Psychosocial Support.",
      tags: ["DRR", "Gender", "Capacity Building"],
    },
    {
      id: "tr-07",
      client: "USAID/CRA-N",
      duration: "May-Jun 2023",
      location: "District Orakzai",
      description: "4 ToTs and 4 agriculture workshops on potato farming for community resilience.",
      tags: ["Agriculture", "Community Development", "Resilience"],
    },
    {
      id: "tr-08",
      client: "Muslim Aid Pakistan",
      duration: "Jun-Jul 2023",
      location: "Qilla Saifullah, Balochistan",
      description: "4 training events on Dry Fodder, Livestock, Poultry, and Kitchen Gardening.",
      tags: ["Agriculture", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-09",
      client: "PVDP",
      duration: "May-Jun 2023",
      location: "District Mirpurkhas, Sindh",
      description: "Two 5-day ToTs on Advanced Kitchen Gardening and Crop-Pest Management.",
      tags: ["Agriculture", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-10",
      client: "Islamic Relief Pakistan",
      duration: "May 2023",
      location: "Peshawar, KP",
      description: "4 Staff Capacity Building Workshops on DRR, Climate, Protection, and Inclusion.",
      tags: ["DRR", "Climate", "Capacity Building"],
    },
    {
      id: "tr-11",
      client: "Islamic Relief Pakistan",
      duration: "Oct-Dec 2022",
      location: "Peshawar and Swat, KP",
      description: "Backyard Poultry Production training for L&DD Staff and IRP staff.",
      tags: ["Agriculture", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-12",
      client: "UNFAO/PINS",
      duration: "Oct-Nov 2021",
      location: "10 Districts of Sindh",
      description: "Trained 70 agriculture officials on Nutrition Sensitive Agriculture.",
      tags: ["Nutrition", "Agriculture", "Capacity Building"],
    },
    {
      id: "tr-13",
      client: "Islamic Relief Pakistan",
      duration: "Oct-Dec 2022",
      location: "Peshawar and Swat, KP",
      description: "Training Service Providers on Walnut Production Technology and Management.",
      tags: ["Agriculture", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-14",
      client: "WWF-Pakistan",
      duration: "Sep-Nov 2022",
      location: "Punjab and Sindh",
      description: "ToTs on poultry and egg incubation for 150 rural women entrepreneurs.",
      tags: ["Gender", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-15",
      client: "Muslim Aid",
      duration: "March 2022",
      location: "District Jhang, Punjab",
      description: "Capacity building of 50 Government School Teachers on Alternate Disciplines.",
      tags: ["Education", "Capacity Building"],
    },
    {
      id: "tr-16",
      client: "USAID CVE",
      duration: "Mar 2022",
      location: "Bara, Landi Kotal, Jamrud tehsils, Khyber District",
      description: "10 events on Peace building, CVE, Social Cohesion for 350 participants.",
      tags: ["Peace Building", "Community Development", "Resilience"],
    },
    {
      id: "tr-17",
      client: "Farmers Development Program",
      duration: "Jan-Dec 2022",
      location: "Multan, Punjab",
      description: "4 major trainings on COVID-19 SOPs, RCCE, SBCC, Mental Health, and GRM.",
      tags: ["Health", "SBCC", "Capacity Building"],
    },
    {
      id: "tr-18",
      client: "NPGP",
      duration: "Sep-Dec 2021",
      location: "D.I. Khan and Tank, KP",
      description: "Gender and Institutional Manual. 2 ToTs on gender and enterprise development.",
      tags: ["Gender", "Livelihoods", "Capacity Building"],
    },
    {
      id: "tr-19",
      client: "Community Uplift Program (CUP)",
      duration: "Nov 2021-Jan 2022",
      location: "District Battagram, KP",
      description: "10 Capacity Building Programs on Education, Governance, Gender, and DRR.",
      tags: ["Education", "Gender", "Governance"],
    },
    {
      id: "tr-20",
      client: "Government Punjab",
      duration: "Jul-Aug 2018",
      location: "District Rajanpur, Punjab",
      description: "Capacity building of Primary School Teachers on early childhood education.",
      tags: ["Education", "Capacity Building"],
    },
  ],
  evaluationResearch: [
    {
      id: "ev-01",
      client: "NCA",
      duration: "Sep-Nov 2025",
      title: "End-of-Project Evaluation: Socio-Economic Empowerment of Marginalized Communities – Phase II",
      location: "Mirpurkhas, Islamabad, Rawalpindi",
      tags: ["Evaluation", "Gender", "Livelihoods"],
    },
    {
      id: "ev-02",
      client: "Islamic Relief",
      duration: "Feb-Dec 2023",
      title: "Final Evaluation: Climate Sensitive Livelihood Modeling for Coastal Communities",
      location: "Coastal Belt of Thatta, Karachi",
      tags: ["Evaluation", "Climate", "Livelihoods"],
    },
    {
      id: "ev-03",
      client: "Pak Mission Society,",
      duration: "Nov 2024-Mar 2025",
      title: "End-line Assessment: Disaster Resilience and Livelihood Restoration in Flood-Affected Areas",
      location: "District Rajanpur, Punjab",
      tags: ["Evaluation", "DRR", "Livelihoods"],
    },
    {
      id: "ev-04",
      client: "PPAF",
      duration: "Dec 2024-Jun 2025",
      title: "Livelihood Options Analysis: Extreme Poverty Graduation Program in Mountain Regions",
      location: "District Muzaffarabad, AJK",
      tags: ["Evaluation", "Livelihoods", "Poverty"],
    },
    {
      id: "ev-05",
      client: "WWF-Pakistan",
      duration: "Jan-Mar 2024",
      title: "External Midterm Review: Water Resource Accountability Programme",
      location: "Hazara Region, Gilgit-Baltistan",
      tags: ["Evaluation", "WASH", "Environment"],
    },
    {
      id: "ev-06",
      client: "WWF-Pakistan",
      duration: "Jan-Mar 2024",
      title: "Farmers' Perspective Study: Upscaling Green Pakistan Programme – Agroforestry Component",
      location: "National Coverage (all provinces)",
      tags: ["Research", "Agriculture", "Environment"],
    },
    {
      id: "ev-07",
      client: "European Union (EU)",
      duration: "May-Aug 2022",
      title: "Impact Assessment: Income Generation Grants under SUCCESS Programme",
      location: "Hyderabad, Dadu, Umerkot, Jamshoro, Sindh",
      tags: ["Evaluation", "Livelihoods", "Gender"],
    },
    {
      id: "ev-08",
      client: "USAID",
      duration: "Mar-Dec 2017",
      title: "Final Evaluation: Agriculture Innovation Program for Smallholder Farmers",
      location: "National Coverage (all provinces)",
      tags: ["Evaluation", "Agriculture", "Food Security"],
    },
    {
      id: "ev-09",
      client: "UNFAO",
      duration: "Jan-Jun 2017",
      title: "Socio-economic Impact Assessment: PPR Vaccination on Livestock Herders",
      location: "National Coverage (all livestock regions)",
      tags: ["Research", "Agriculture", "Livelihoods"],
    },
    {
      id: "ev-10",
      client: "International Rescue Committee (IRC)",
      duration: "Sep 2021-Mar 2022",
      title: "Final Evaluation: Addressing Women's Health and Safety Needs During COVID-19",
      location: "Peshawar and Swat, KP",
      tags: ["Evaluation", "Gender", "Health"],
    },
    {
      id: "ev-11",
      client: "Penny Appeal",
      duration: "Dec 2016-Mar 2017",
      title: "Annual Program Evaluation: Multi-Sector Humanitarian Response",
      location: "Punjab, Balochistan, Sindh, KP",
      tags: ["Evaluation", "Humanitarian", "Multi-sector"],
    },
    {
      id: "ev-12",
      client: "Government Punjab",
      duration: "Feb-Jul 2017",
      title: "Economic Research: Effects of Price Capping on Small Livestock Farmers",
      location: "South Punjab (Multan, Muzaffargarh, Bahawalpur, Lodhran)",
      tags: ["Research", "Agriculture", "Livelihoods"],
    },
  ],
};  