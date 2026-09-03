import { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    id: "b1",
    slug: "el-nino-early-warning-ai-tana-river",
    title: "How AI & River Sensors Saved 45,000 Households During the 2024 El Niño Floods",
    excerpt:
      "A deep dive into Hazina—the Kenya Red Cross anticipatory action platform that combined IoT streamflow telemetry, satellite soil moisture, and M-PESA cash alerts to give communities a 72-hour head start.",
    content: [
      "In April 2024, torrential El Niño rainfall battered the Kenya Highlands, sending massive volumes of water rushing down the Tana and Nzoia river basins toward vulnerable low-lying communities in Tana River, Garissa, and Kilifi counties.",
      "Historically, disaster response was reactive: emergency teams moved in days after floodwaters submerged homes, destroyed crops, and displaced families. But during the 2024 El Niño rains, the Kenya Red Cross Digital Transformation Department deployed Hazina—an AI-powered early warning and anticipatory action platform.",
      "Hazina continuously monitors real-time telemetry from 45 solar-powered ultrasonic river level sensors installed along key river channels. These IoT nodes transmit water level readings via cellular and LoRaWAN networks every 15 minutes to Google Cloud BigQuery data pipelines.",
      "When river gauge levels at Garissa and Hola breached the 2.4-meter critical threshold, Hazina automatically triggered anticipatory cash releases. Over KES 1.8M in mobile cash aid was disbursed via M-PESA directly to 45,000 pre-registered heads of households 72 hours before floodwaters arrived.",
      "The result was transformative: families purchased emergency supplies, secured livestock, and evacuated to higher ground without losing their assets or standing in crowded relief queues. Anticipatory action proved that data and technology save lives when deployed before disaster strikes.",
    ],
    category: "Early Warning",
    publishedDate: "August 18, 2024",
    readTime: "6 min read",
    author: {
      name: "Dr. Ahmed Idris",
      role: "Head of Digital Transformation & Innovation",
      avatar: "/assets/images/people/p1.jpeg",
    },
    // Online Flickr image URL
    coverImage: "https://plus.unsplash.com/premium_photo-1733342648363-81cd437f9e43?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    flickrAlbumUrl: "https://www.flickr.com/photos/154940827@N06/55504073680/in/album-72177720335418161",
    galleryImages: [
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1200",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200",
    ],
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Video demonstration embed
    tags: ["Early Warning", "AI for Good", "IoT Sensors", "Anticipatory Action", "M-PESA"],
    featured: true,
  },
  {
    id: "b2",
    slug: "digitizing-humanitarian-cash-assistance-bomacare",
    title: "Replacing Paper Aid Registers with Encrypted Mobile Wallets: The BomaCare Story",
    excerpt:
      "How Kenya Red Cross software engineers built an offline-first mobile app that reduced emergency aid verification from 14 days to 6 hours across refugee settlements and displacement camps.",
    content: [
      "For decades, humanitarian cash and food distribution in remote displacement camps relied on paper ledgers, ink thumbprints, and physical aid trucks. The manual process was plagued by long queues, fraud vulnerabilities, lost registers, and high administrative friction.",
      "To restore dignity and speed to aid delivery, the Kenya Red Cross software engineering team developed BomaCare—an offline-capable mobile registration and disbursement application.",
      "BomaCare operates in extreme field environments without cellular internet. Field officers capture household demographics, GPS coordinates, and encrypted digital signatures on ruggedized tablets. When connectivity resumes, local SQLite records sync seamlessly with cloud PostgreSQL databases.",
      "Integrated directly with Safaricom's M-PESA B2C API, BomaCare executes bulk micro-transfers to verified mobile numbers in seconds. To date, BomaCare has disbursed over KES 15M in cash aid to 180,000 displaced families with a 99.8% audit accuracy rate.",
    ],
    category: "Cash Aid",
    publishedDate: "July 02, 2024",
    readTime: "5 min read",
    author: {
      name: "Grace Wambui",
      role: "Lead Software Architect",
      avatar: "/assets/images/people/p2.jpeg",
    },
    coverImage: "https://plus.unsplash.com/premium_photo-1739995619648-e463f3ecdbc4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    flickrAlbumUrl: "https://www.flickr.com/photos/154940827@N06/55504073680/in/album-72177720335418161",
    galleryImages: [
      "https://images.unsplash.com/photo-1642403711604-3908e90960ce?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Mobile Cash", "M-PESA", "Offline First", "React Native", "Humanitarian Aid"],
    featured: true,
  },
  {
    id: "b3",
    slug: "mapping-47-counties-youthmappers-gis-resilience",
    title: "Mapping 2.5 Million Buildings: YouthMappers & Spatial Intelligence Across Kenya",
    excerpt:
      "Unmapped communities leave millions invisible during flash floods and health crises. See how our GIS lab engaged youth volunteers to map 47 Kenyan counties into an open spatial database.",
    content: [
      "In many rural villages and informal urban settlements across Kenya, detailed street maps and building footprints simply did not exist. During emergency evacuations or disease outbreak tracing, first responders operated in spatial blind spots.",
      "The GIS & Spatial Intelligence unit launched the ResilienceMap initiative to change that reality. Combining European Space Agency Sentinel satellite imagery, high-resolution drone elevation surveys, and OpenStreetMap (OSM) tools, we empowered over 1,500 YouthMappers from Kenyan universities.",
      "Youth volunteers digitized 2.5 million building footprints, healthcare facilities, clean water points, and evacuation routes across all 47 Kenyan counties.",
      "Today, ResilienceMap is used by 14 county governments to model flood inundation zones, position emergency rescue boats, and target community health interventions where risk is highest.",
    ],
    category: "GIS & Mapping",
    publishedDate: "May 24, 2024",
    readTime: "7 min read",
    author: {
      name: "Amina Hassan",
      role: "Senior GIS & Spatial Analytics Lead",
      avatar: "/assets/images/people/p3.jpeg",
    },
    coverImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",
    flickrAlbumUrl: "https://www.flickr.com/photos/154940827@N06/55504073680/in/album-72177720335418161",
    galleryImages: [
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1200",
    ],
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["GIS", "OpenStreetMap", "Spatial Intelligence", "YouthMappers", "Climate Risk"],
    featured: false,
  },
  {
    id: "b4",
    slug: "multilingual-ai-whatsapp-assistant-rafiki-ai",
    title: "Rafiki AI: Delivering Emergency First-Aid Advice in Swahili & Somali via WhatsApp",
    excerpt:
      "When call centers overflow during emergencies, AI step in. Discover how fine-tuned LLMs provide 24/7 evacuation guidance and first-aid answers in local dialects.",
    content: [
      "During sudden disaster events like flash floods or urban building collapses, Kenya Red Cross's 1199 emergency hotline experiences sudden spikes of over 50,000 calls per hour. Emergency call agents are pushed past capacity, leaving stranded citizens waiting for urgent evacuation advice.",
      "To solve hotline bottlenecking, our AI team developed Rafiki AI—a generative AI assistant available directly via WhatsApp and SMS.",
      "Fine-tuned on verified Red Cross first-aid manuals and disaster evacuation protocols, Rafiki AI converses naturally in Swahili, Somali, Turkana, and English. Users can send text questions or pin their GPS location to receive nearest emergency shelter directions.",
      "During the April 2024 floods, Rafiki AI handled over 320,000 automated conversations, reducing emergency hotline queue wait times by 65% while escalating life-threatening cases to human dispatchers.",
    ],
    category: "AI & Innovation",
    publishedDate: "April 12, 2024",
    readTime: "5 min read",
    author: {
      name: "Samuel Otieno",
      role: "Principal Data Scientist & AI Lead",
      avatar: "/assets/images/people/p5.jpeg",
    },
    coverImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200",
    flickrAlbumUrl: "https://www.flickr.com/photos/154940827@N06/55504073680/in/album-72177720335418161",
    galleryImages: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["AI", "Gemini API", "WhatsApp", "Multilingual NLP", "Disaster Response"],
    featured: false,
  },
];
