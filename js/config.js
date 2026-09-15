/* =========================================================
   WEDDING DETAILS
   Edit this file when the client gives you updated details.
   ========================================================= */
const weddingConfig = {
  bride: {
    name: "Jaisha Shahab",
    parents: "Mr. & Mrs. Shahabuddin Shaikh"
  },
  groom: {
    name: "Zarrar Jarrih",
    parents: "Mr. Mohammad Shoaib & late Mrs. Mohammad Shoaib"
  },
  weddingYear: 2026,

  // Countdown is tied to the first calendar date because the
  // invitation now has confirmed ceremony times in the timeline.
  countdownTarget: "2026-12-21T15:00:00",

  events: [
    {
      date: "21st December 2026",
      shortDate: "21 DEC",
      name: "Nikkah Ceremony",
      venue: "Wildrice Lawn, Serena Hotel",
      timelineVenue: "Wildrice Lawn, Serena Hotel",
      time: "3:00 PM",
      address: "Serena Hotel, Islamabad, Pakistan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Wildrice+Lawn+Serena+Hotel+Islamabad"
    },
    {
      date: "21st December 2026",
      shortDate: "21 DEC",
      name: "Mehndi Ceremony",
      venue: "Kehkishan Hall",
      timelineVenue: "Kehkishan Hall",
      time: "5:00 PM",
      address: "Kehkishan Hall, Islamabad Serena Hotel, Khayaban-e-Suhrwardy Rd, G-5/1, Islamabad, Pakistan",
      mapUrl: "https://www.google.com/maps/search/Serena%20Hotel%2C%20Khayaban-e-Suhrwardy%2C%20G-5%2C%20Diplomatic%20Enclave%2C%20Zone%201%2C%20Islamabad%20Capital%20Territory%2C%2044010%2C%20Pakistan"
    },
    {
      date: "25 December 2026",
      shortDate: "25 DEC",
      name: "Baraat Ceremony",
      venue: "Serena Shamadan",
      timelineVenue: "Shamadan, Serena Hotel",
      time: "7:00 PM",
      address: "Khayaban-e-Suhrwardy, opposite the Convention Centre, Sector G-5/1, Islamabad, Pakistan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Serena+Shamadan+Khayaban-e-Suhrwardy+Islamabad"
    },
    {
      date: "27 December 2026",
      shortDate: "27 DEC",
      name: "Valima",
      venue: "Bani Gala Rawal Marquee",
      timelineVenue: "Bani Gala Rawal Marquee",
      time: "3:00 PM",
      address: "A Q Khan Rd, Bani Gala",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Bani+Gala+Rawal+Marquee+A+Q+Khan+Rd+Bani+Gala"
    }
  ],

  media: {
    heroVideo: "assets/bride-groom-hero.mp4",
    heroVideoMobile: "assets/bride-groom-hero-mobile.mp4",
    heroPoster: "assets/hero-poster.jpg",
    music: "assets/jashn-e-bahaaraa.mp3",
    musicEnabled: true
  }
};
