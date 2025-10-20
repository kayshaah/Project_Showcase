
export type Technology =
  | 'Android Studio'
  | 'Firebase'
  | 'OneSignal'
  | 'Matlab'
  | 'Springer'
  | 'ChatGPT'
  | 'AWS'
  | 'Databricks'
  | 'GitLab'
  | 'Python'
  | 'Azure'
  | 'JINJA'
  | 'Salesforce'
  | 'PySpark'
  | 'Next.js'
  | 'GenAI'
  | 'React'
  | 'HTML'
  | 'CSS'
  | 'Machine Learning'
  | 'Blender';

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: number;
  title: string;
  year: string;
  type: 'mobile' | 'research' | 'web' | 'data' | 'automation' | 'ml' | 'animation';
  shortDescription: string;
  longDescription: string;
  story: string;
  implementation: string;
  technologies: Technology[];
  imageIds: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'ParkEazy',
    year: '2017',
    type: 'mobile',
    shortDescription: 'An Android app to solve urban parking issues in India by locating spots and notifying users of blocked vehicles.',
    longDescription:
      'ParkEazy is an Android application designed to address the common problem of haphazard street parking in India. Its primary feature allows a user to scan the number plate of a car that is blocking their own, which then sends a notification to the blocking car\'s owner via OneSignal. A secondary feature included a system for booking available parking spots in nearby locations. The entire backend was powered by Firebase for real-time data synchronization and user management.',
    story: `It started with frustration — coming home late, only to find my car trapped behind another. No contact, no clue, just waiting.\n\nIn India, parking space is chaos. Cars are squeezed into every corner, blocking each other without a second thought. That small moment of helplessness turned into a bigger question: <b>what if this could fix itself?</b>\n\nThat question grew into ParkEazy — an app that lets you scan a number plate, identify the owner through a secure backend, and send them a quiet notification to move their car. No calls, no arguments, no hassle — just tech doing the talking.`,
    implementation: `Once the idea felt real, we wanted to make it simple — scan, identify, notify. Everything else had to happen quietly in the background.\n\nWe built ParkEazy in Android Studio, using Firebase as the foundation for authentication, car–owner mapping, and real-time data management. When a user scans a number plate, the app uses Google’s ML Kit for text recognition. The extracted plate number is then matched in Firebase to identify the registered owner.\n\nOnce the owner is found, a OneSignal push notification is sent through Firebase Cloud Functions, alerting them to move their car — securely and without revealing any personal information.\n\nTo help users find open parking spots nearby, we integrated Google Maps and Places APIs, which fetch and display real-time parking availability around the user.\n\nOur goal was to make every interaction feel effortless: open the app, scan, and let automation handle the rest. Behind that simple experience sits an ecosystem of OCR, cloud functions, and real-time updates — all working together to make everyday parking just a little less painful.`,
    technologies: ['Android Studio', 'Firebase', 'OneSignal'],
    imageIds: ['parkeazy-1', 'parkeazy-2'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kayshaah/ParkEazy' },
      { label: 'Siddhesh Save', url: 'https://www.linkedin.com/in/siddhesh-save/' },
      { label: 'Aakash Shetty', url: 'https://www.linkedin.com/in/aakash-shetty-928a29183/' }
    ],
  },
  {
    id: 2,
    title: 'Skin Cancer Detection using Image Processing',
    year: '2018',
    type: 'research',
    shortDescription: 'A Matlab-based project to differentiate between benign and malignant cancer cells, resulting in a published research paper.',
    longDescription:
      'This research project focused on the application of image processing techniques to aid in the early detection of cancer. Using Matlab, we developed algorithms to analyze medical imagery and automatically distinguish between benign and malignant cancer cells based on morphological features. The success of this work led to the publication of a research paper in the prestigious Springer Journal, contributing to the field of computer-aided diagnostics.',
    story: `This was the first project where science felt personal. Cancer isn’t just a statistic — it’s something that touches almost every family, including mine. I wanted to understand how technology could make early detection faster and more accessible, especially for communities with limited access to dermatologists or expensive biopsy tests. The idea was born from curiosity — could an image, something as simple as a skin photo, hold life-saving information?\nWorking on this paper gave me my first real taste of research — comparing algorithms, refining results, and realizing that even small improvements in accuracy could mean detecting a malignancy earlier. It wasn’t just an academic pursuit; it was a glimpse into how data can literally save lives.`,
    implementation: `Developed using MATLAB and Image Processing Toolbox, the system involved:\nPreprocessing: Noise removal using Median and Gaussian filters, and contrast enhancement for clear lesion edges.\nSegmentation: Applied K-Means clustering, Otsu thresholding, and edge detection to separate the affected regions.\nFeature Extraction: Used parameters based on ABCD Rule (Asymmetry, Border, Color, Diameter) and texture metrics.\nClassification: Tested models including SVM, K-NN, Neural Networks, and Random Forest to categorize lesions as benign or malignant.\nThis became my first research publication, achieving strong performance metrics like high accuracy and sensitivity — marking the start of my AI-in-healthcare journey.`,
    technologies: ['Matlab', 'Springer'],
    imageIds: ['cancer-detection-1', 'cancer-detection-2'],
    links: [
        { label: 'Read Paper', url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=weuU1B4AAAAJ&citation_for_view=weuU1B4AAAAJ:u5HHmVD_uO8C' }
    ]
  },
   {
    id: 6,
    title: 'FoodEazy',
    year: '2019',
    type: 'web',
    shortDescription: 'A web app for discovering recipes, nutritional information, and local restaurant recommendations.',
    longDescription:
      'FoodEazy is a comprehensive culinary web platform built with React. It allows users to explore a vast database of recipes, view detailed nutritional information, watch cooking video tutorials, and even find local restaurants serving their desired dish. The interface is designed to be intuitive and engaging, making it easy for users to plan their meals and discover new culinary experiences. The project demonstrates strong front-end development skills with a focus on user experience.',
    story: `It started with something simple — hunger and frustration. Cooking during college was trial and error; recipes were scattered across sites and ads. I wanted a one-stop solution — a digital friend that could tell me what to cook, how to cook it, and where to get it if I didn’t want to.\nFoodEazy was my first step into web development, but emotionally it was about independence — being able to cook for myself, experiment, and make food accessible for anyone living away from home. It wasn’t just a site; it was a small attempt to make daily life easier and tastier.`,
    implementation: `Developed using HTML, CSS, and JavaScript, FoodEazy integrated:\nSearch Interface: Keyword-based recipe lookup.\nRecipe API Integration: Pulled data for ingredients, steps, and nutritional values.\nVideo Embeds: Displayed top YouTube tutorials dynamically.\nMaps Integration: Used location-based suggestions for nearby restaurants offering the dish.\nIt bridged information with action — from craving to cooking (or ordering) within a few clicks.`,
    technologies: ['HTML', 'CSS', 'React'],
    imageIds: ['foodeazy-1', 'foodeazy-2', 'foodeazy-3'],
    links: [],
  },
  {
    id: 8,
    title: 'Vyaakhya - Sign Language Interpreter',
    year: '2020',
    type: 'animation',
    shortDescription: 'A real-time interpreter for Indian Sign Language, converting gestures to spoken English and vice-versa.',
    longDescription:
      'Vyaakhya (meaning "Translation") is a two-way, real-time interpreter designed to bridge communication gaps for the hearing and speech impaired. It converts Indian Sign Language gestures into text and speech, and translates spoken language back into a 3D animated sign language avatar created with Blender. This tool empowers individuals by enabling them to communicate effectively in any environment, fostering inclusivity and creating opportunities where barriers once existed.',
    story: `Growing up, I’d often see the Deaf community being left out — not out of intent, but because communication barriers still persist. Vyaakhya was born from that empathy: what if we could bridge that gap with technology?\nThis was my final year project and review paper, combining my love for language, AI, and design. The idea was to make conversations inclusive — not by teaching sign language to everyone, but by giving technology the ability to translate for them.\nWhen I first saw our animated avatar sign words correctly, it felt like more than code — it felt like connection.`,
    implementation: `Built using Blender for 3D avatar modeling and animation of sign gestures.\nImplemented Natural Language Processing (NLP) pipeline involving lexical, syntactic, and semantic analysis to interpret English sentences.\nProcessed grammar structure and mapped it to equivalent ISL gestures using a gesture-mapping database.\nDesigned bidirectional translation — English ↔ ISL, allowing two-way communication.\nThe system improved translation accuracy over existing models and helped me understand how AI can give a voice — even when there isn’t one.`,
    technologies: ['Blender', 'Python', 'Springer'],
    imageIds: [],
    links: [
        { label: 'Read Paper', url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=weuU1B4AAAAJ&citation_for_view=weuU1B4AAAAJ:u-x6o8ySG0sC' }
    ]
  },
   {
    id: 4,
    title: 'Semantic Layer Creation',
    year: '2021',
    type: 'data',
    shortDescription: 'Developed a unified semantic layer for a Fortune 500 pharma giant to streamline drug discovery data access.',
    longDescription:
      'For a Fortune 500 pharmaceutical giant, I led the creation of a robust semantic layer to unify disparate data sources for drug discovery. This involved building complex ETL scripts to merge terabytes of data from Small Molecule and Experiment (In-Vivo/In-Vitro) domains. Using Databricks, Python, and advanced SQL, we developed parallel-running pipelines with sophisticated orchestration to prevent deadlocks, creating a unified layer of over 200 tables. This solution, managed with Jira & GitLab, significantly streamlined data access for scientists, enabling faster and more powerful insights.',
    story: `At ZS, this project taught me what scale truly means. 1.5 billion records, countless datasets, and dozens of scientists trying to make sense of them. I realized that data without structure is just chaos — and our job was to make that chaos meaningful.\nWorking across time zones, deadlines, and evolving client demands taught me not just tech, but patience and communication. It was more than data engineering — it was about empowering researchers to find cures faster, by removing the friction of disconnected systems.`,
    implementation: `Built a unified semantic layer combining biologics and in-vitro/in-vivo experiment data.\nTechnologies: Databricks (ETL + Delta Lake), AWS S3, Unity Catalog, Databricks Orchestrator, JIRA, GitLab CI/CD.\nDesigned pipelines that ingested, cleaned, and standardized 1.5B+ drug discovery records into ~200 curated tables.\nAutomated workflows with orchestrators; implemented data governance through Unity Catalog.\nDelivered to multiple scientific teams for analysis and visualization.\nThe outcome: a single source of truth that made discovery faster, cleaner, and auditable.`,
    technologies: ['AWS', 'Databricks', 'GitLab', 'Python', 'PySpark'],
    imageIds: ['semantic-layer-1', 'semantic-layer-2'],
    links: [],
  },
  {
    id: 5,
    title: 'Contract Summarization Tool',
    year: '2025',
    type: 'automation',
    shortDescription: 'An automated tool using GenAI and Azure to summarize long contracts, cutting review times from 3 days to 15 minutes.',
    longDescription:
      'For a Fortune 10 healthcare distributor, I developed a tool to automate the summarization of 100+ page contracts, cutting review times from 3 days to 15 minutes. The process uses Databricks and Python to pull contracts from Azure Data Factory, applies Vision and Text AI models for data extraction, and generates templated summaries using JINJA. The final reports are stored in SharePoint, all orchestrated to run automatically across multiple projects, achieving 100% client satisfaction.',
    story: `This was the project that truly made AI “real” for me. The client’s lawyers spent days reading 100+ page contracts filled with redundant clauses. We weren’t just automating — we were freeing people from monotonous work to focus on real decisions.\nIt was challenging: tight timelines, GenAI integration, vision models, templating, and client expectations. But the moment they tested our tool and said, “This saved us hours,” it felt like everything AI promised was finally tangible.`,
    implementation: `Environment: Azure Databricks, Azure Data Factory, Blob Storage, Python, JINJA, SharePoint API.\nFlow:\nExtract contracts from Data Factory → Blob Storage.\nPass each document to AI summarization interface (prompt-engineered by me).\nUse Vision Model to extract tabular data.\nTemplate summary using Python + JINJA2.\nPublish to SharePoint via API.\nAchieved 93% accuracy, 100% client satisfaction, and reduced time per contract from 3 days to 15 minutes.\nIt was my transition from developer to problem-solver — proof that AI can save not just time, but human effort.`,
    technologies: ['Azure', 'GenAI', 'Python', 'JINJA', 'Databricks'],
    imageIds: ['contract-summarization-1', 'contract-summarization-2'],
    links: [],
  },
  {
    id: 3,
    title: 'AI-Inspired Portfolio Website',
    year: '2025',
    type: 'web',
    shortDescription: 'A personal portfolio reimagined as an interactive AI chatbot called K-Bot, trained on my unique professional and academic background.',
    longDescription:
      'This personal project reimagines the portfolio as a Small Language Model (SLM) with a unique twist. It is a ChatGPT-style conversational interface, exclusively trained on my personal, professional, and academic information. It showcases my skills, work experience, and academic journey. A key feature is the "talk to my resume" capability, powered by an AI chatbot named K-Bot, which can answer any question a visitor might have on my behalf.',
    story: `K-Bot was a reflection of me — both literally and metaphorically. I wanted my website to do more than just display my resume; I wanted it to talk.\nThis project came from a mix of pride and curiosity — what if people could “chat” with my story the same way they interact with AI? Building K-Bot was about combining creativity with engineering, making a space where personality met code.`,
    implementation: `Built using TypeScript, HTML, CSS, and Firebase Studio.\nHosted on GoDaddy (custom domain).\nIntegrated Gemini API for AI-powered responses.\nCreated K-Bot — a conversational interface capable of answering questions about my resume, experiences, and projects.\nIt acts as a self-service AI portfolio, merging interactivity with authenticity — turning a static resume into a living, responsive story.`,
    technologies: ['Next.js', 'React', 'GenAI'],
    imageIds: ['ai-portfolio-1', 'ai-portfolio-2'],
    links: [
      { label: 'Direct Link', url: 'https://kashishshah.com' },
      { label: 'GitHub', url: 'https://github.com/kayshaah/K-Bot' }
    ],
  },
  {
    id: 7,
    title: 'ARC: Amazon Review Classifier',
    year: '2025',
    type: 'ml',
    shortDescription: 'An ML-powered browser extension to classify Amazon reviews as real or fake, providing a trust score for each.',
    longDescription:
      'To combat the rise of fake reviews on Amazon, I am developing ARC (Amazon Review Classifier), a browser extension that provides a "trust score" for each review. Using factors like verified purchase status, review detail, and image/video content, our ML model—trained on a UCSD database—calculates a score to indicate authenticity. It also flags reviewers suspected of being bots or paid fakes by analyzing their history. The goal is to give shoppers a more reliable way to evaluate products.',
    story: `ARC started from frustration — fake reviews ruining the online shopping experience. We’ve all been there: buying something that looked perfect on Amazon but wasn’t. I wanted to build something that brought back trust in digital marketplaces.\nAs my first master’s ML project, it connected technical curiosity with social impact — because misinformation, even in reviews, erodes consumer confidence.`,
    implementation: `Developed a Chrome Extension with a Python backend.\nFrontend: Overlay UI on Amazon pages showing trust badges and tooltips.\nBackend: Processes review batches via /score endpoint, classifies each review using ML model (factors: verified purchase, sentiment, past review history, media presence).\nPlanned model: Binary + Probabilistic Classifier assigning a trust score.\nOptional FastAPI integration for backend scalability.\nThe system aims to give users a quick visual cue — a small colored badge that says, “You can trust this,” making online shopping transparent again.`,
    technologies: ['Python', 'Machine Learning'],
    imageIds: ['ml-project-1', 'ml-project-2'],
    links: [
      { label: 'GitHub', url: 'http://github.com/kayshaah/ARC' }
    ],
  },
];
