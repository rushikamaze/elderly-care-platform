const caregivers = [
  {
    id: 1,
    name: "Justin Gao",
    service: "Physiotherapy",
    rating: 4.8,
    experience: "4 years",
    location: "Itanagar",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    verified: true,
    languages: ["Nepali", "Hindi", "English"],
    certifications: ["Physiotherapy Support", "Mobility Recovery Training"],
    bio: "Compassionate and skilled physiotherapy caregiver experienced in mobility rehabilitation, pain management, and guided recovery exercises.",
    price: "₹700/day",
    reviews: [
      "Helped improve mobility significantly with guided exercises.",
      "Very patient and knowledgeable during recovery sessions."
    ]
  },
  {
    id: 2,
    name: "Anindita Sarkar",
    service: "Physiotherapy",
    rating: 4.5,
    experience: "5 years",
    location: "Guwahati",
    availability: "Mon-Sat",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
    languages: ["Assamese", "Hindi", "English"],
    certifications: ["Licensed Physiotherapy Assistant", "Rehabilitation Support"],
    bio: "Focused physiotherapy caregiver who helps seniors improve mobility, strength, and recovery through guided routines.",
    price: "₹850/day",
    reviews: [
      "Helped improve my father's movement steadily.",
      "Very patient during every exercise session."
    ]
  },
  {
    id: 3,
    name: "Riya Singh",
    service: "Nursing Care",
    rating: 4.7,
    experience: "4 years",
    location: "Lucknow",
    availability: "Tue-Sun",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    verified: true,
    languages: ["Hindi", "English"],
    certifications: ["Home Care Support", "First Aid Certified"],
    bio: "Reliable caregiver offering companionship, meal support, errands, and help with everyday routines for seniors.",
    price: "₹650/day",
    reviews: [
      "Supportive and respectful throughout the service.",
      "Great with daily assistance and conversation."
    ]
  },
  {
    id: 4,
    name: "Priya Sharma",
    service: "Home Nursing",
    rating: 4.9,
    experience: "6 years",
    location: "Delhi",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    verified: true,
    languages: ["Hindi", "Punjabi", "English"],
    certifications: ["Registered Nursing Support", "Geriatric Care Certificate"],
    bio: "Experienced home nursing professional skilled in post-hospital support, hygiene care, and patient monitoring.",
    price: "₹950/day",
    reviews: [
      "Extremely professional and caring.",
      "Gave us confidence during home recovery."
    ]
  },
  {
    id: 5,
    name: "Rahul Mehta",
    service: "Physiotherapy",
    rating: 4.6,
    experience: "5 years",
    location: "Bangalore",
    availability: "Mon-Sat",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    verified: true,
    languages: ["Hindi", "Kannada", "English"],
    certifications: ["Physiotherapy Support", "Mobility Recovery Training"],
    bio: "Dedicated physiotherapy caregiver helping elderly clients with balance, flexibility, and home exercise support.",
    price: "₹800/day",
    reviews: [
      "Very structured and punctual.",
      "Explains recovery exercises clearly."
    ]
  },
  {
    id: 6,
    name: "Neha Kapoor",
    service: "Post-Surgery Care",
    rating: 4.8,
    experience: "7 years",
    location: "Chennai",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    verified: true,
    languages: ["Hindi", "Tamil", "English"],
    certifications: ["Post-Operative Care Specialist", "Patient Safety Training"],
    bio: "Skilled in post-surgery support including wound-care assistance, medication reminders, and comfort-focused care.",
    price: "₹1000/day",
    reviews: [
      "Very attentive during recovery.",
      "Made post-surgery care much less stressful."
    ]
  },
  {
    id: 7,
    name: "Amit Das",
    service: "Elderly Companion",
    rating: 4.4,
    experience: "3 years",
    location: "Hyderabad",
    availability: "Tue-Sun",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    verified: false,
    languages: ["Hindi", "Telugu", "English"],
    certifications: ["Companion Care Basics", "Elder Support Workshop"],
    bio: "Friendly companion caregiver who supports seniors with conversation, routine assistance, and daily engagement.",
    price: "₹550/day",
    reviews: [
      "Good companionship and very polite.",
      "Helped my grandfather stay active and engaged."
    ]
  },
  {
    id: 8,
    name: "Sneha Iyer",
    service: "Nursing Care",
    rating: 4.9,
    experience: "8 years",
    location: "Pune",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/80.jpg",
    verified: true,
    languages: ["Marathi", "Hindi", "English"],
    certifications: ["Advanced Nursing Assistant", "Medication Management Training"],
    bio: "Highly experienced nursing caregiver known for careful monitoring, compassionate bedside support, and elder wellness care.",
    price: "₹1050/day",
    reviews: [
      "Excellent caregiver with strong experience.",
      "Very observant and deeply compassionate."
    ]
  },
  {
    id: 9,
    name: "Pooja Nair",
    service: "Nursing Care",
    rating: 4.7,
    experience: "6 years",
    location: "Kochi",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    verified: true,
    languages: ["Malayalam", "Hindi", "English"],
    certifications: ["Certified Nursing Support", "Elder Hygiene Care"],
    bio: "Dependable nursing caregiver who provides safe daily support, hygiene care, and close attention to patient comfort.",
    price: "₹780/day",
    reviews: [
      "Very gentle and understanding.",
      "Brought consistency and peace of mind to our home."
    ]
  },
  {
    id: 10,
    name: "Shagarika Rao",
    service: "Physiotherapy",
    rating: 4.6,
    experience: "7 years",
    location: "Visakhapatnam",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    verified: true,
    languages: ["Telugu", "Hindi", "English"],
    certifications: ["Rehabilitation Therapy Support", "Senior Mobility Coach"],
    bio: "Experienced physiotherapy caregiver helping elderly patients regain confidence in movement and daily mobility.",
    price: "₹880/day",
    reviews: [
      "Very focused and encouraging.",
      "My mother's mobility improved noticeably."
    ]
  },
  {
    id: 11,
    name: "Shreya Majumder",
    service: "Nursing Care",
    rating: 4.8,
    experience: "3 years",
    location: "Agartala",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/81.jpg",
    verified: true,
    languages: ["Bengali", "Hindi", "English"],
    certifications: ["Nursing Care Training", "Basic Life Support"],
    bio: "Compassionate nursing caregiver with a calm approach to daily senior care, monitoring, and comfort support.",
    price: "₹720/day",
    reviews: [
      "Very respectful and caring.",
      "Handled daily care tasks with confidence."
    ]
  },
  {
    id: 12,
    name: "Vanesha Lawrence",
    service: "Post-Surgery Care",
    rating: 4.2,
    experience: "7 years",
    location: "Aizawl",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/82.jpg",
    verified: false,
    languages: ["Mizo", "Hindi", "English"],
    certifications: ["Recovery Care Support", "Home Patient Assistance"],
    bio: "Supportive caregiver for post-surgery routines, medication reminders, and light recovery assistance at home.",
    price: "₹760/day",
    reviews: [
      "Helpful during the initial recovery period.",
      "Supportive and polite throughout."
    ]
  },
  {
    id: 13,
    name: "Alice Debbarma",
    service: "Nursing Care",
    rating: 4.4,
    experience: "8 years",
    location: "Agartala",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/83.jpg",
    verified: true,
    languages: ["Kokborok", "Bengali", "English"],
    certifications: ["Senior Nursing Support", "Patient Care Management"],
    bio: "Seasoned caregiver with strong nursing support experience and a patient-first approach to daily elder care.",
    price: "₹820/day",
    reviews: [
      "Very experienced and steady.",
      "Good communication with the family."
    ]
  },
  {
    id: 14,
    name: "Jay Singh",
    service: "Nursing Care",
    rating: 4.9,
    experience: "9 years",
    location: "Kohima",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    verified: true,
    languages: ["Hindi", "English", "Naga"],
    certifications: ["Advanced Elder Nursing", "Emergency Response Training"],
    bio: "Senior nursing caregiver with extensive experience in elder monitoring, comfort care, and long-term support.",
    price: "₹1100/day",
    reviews: [
      "Outstanding professionalism and empathy.",
      "One of the best caregivers we have worked with."
    ]
  },
  {
    id: 15,
    name: "Dali Sangma",
    service: "Elderly Assistance",
    rating: 4.2,
    experience: "5 years",
    location: "Shillong",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/84.jpg",
    verified: false,
    languages: ["Garo", "Hindi", "English"],
    certifications: ["Companion Care", "Daily Living Assistance"],
    bio: "Helpful elderly assistance caregiver supporting routines, meal help, companionship, and light home tasks.",
    price: "₹600/day",
    reviews: [
      "Very warm and helpful.",
      "Provided steady assistance every day."
    ]
  },
  {
    id: 16,
    name: "Nathan Darlong",
    service: "Elderly Assistance",
    rating: 4.5,
    experience: "3 years",
    location: "Gangtok",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    verified: true,
    languages: ["Hindi", "English", "Nepali"],
    certifications: ["Home Assistance Training", "Senior Companion Support"],
    bio: "Dependable assistant for seniors needing help with errands, routine tasks, and regular companionship.",
    price: "₹620/day",
    reviews: [
      "Reliable and very courteous.",
      "Great support for day-to-day elder needs."
    ]
  },
  {
    id: 17,
    name: "Rohini Marak",
    service: "Post-Surgery Care",
    rating: 4.4,
    experience: "5 years",
    location: "Tinsukia",
    availability: "Mon-Fri",
    image: "https://randomuser.me/api/portraits/women/85.jpg",
    verified: true,
    languages: ["Hindi", "English", "Bengali"],
    certifications: ["Post-Surgical Assistance", "Home Recovery Monitoring"],
    bio: "Recovery-focused caregiver offering careful post-surgery support, monitoring, and comfort-based home care.",
    price: "₹790/day",
    reviews: [
      "Made the recovery process smoother.",
      "Very attentive and respectful."
    ]
  }
];

export default caregivers;
