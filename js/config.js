export const CONFIG = {
  herName: "Her Name",
  yourName: "Your Name",
  intro: {
    eyebrow: "A private little universe",
    title: "Hey, {herName}...",
    copy: "I made something just for you. This isn't just another website. It's a small journey.",
    beginLabel: "Begin",
  },
  birthdayWish: "May this year bring you the kind of joy you bring into every room.",
  timeline: [
    { date: "Chapter 01", title: "The day we met", body: "A completely ordinary day that quietly became one of my favourites." },
    { date: "Chapter 02", title: "The first conversation", body: "Somehow, even the smallest things became easy to talk about." },
    { date: "Chapter 03", title: "The laughs", body: "The kind that make your cheeks hurt and make a day impossible to forget." },
    { date: "Today", title: "Still writing our story", body: "And I hope there are so many beautiful pages still ahead of us." },
  ],
  memories: [
    { src: "assets/photos/memory-01.jpg", alt: "A cherished memory together", caption: "Some places become special simply because you were there." },
    { src: "assets/photos/memory-02.jpg", alt: "A happy moment together", caption: "Proof that the best moments never need a perfect plan." },
    { src: "assets/photos/memory-03.jpg", alt: "A favourite group photo", caption: "A frame full of people, and somehow my eyes still found you first." },
  ],
  letter: `I wanted to give you something you could come back to — a small reminder of how much you mean to me.\n\nYou make ordinary moments feel softer, louder, brighter, and more worth remembering. Thank you for every laugh, every conversation, and every little piece of joy you bring into my life.\n\nToday, I hope you feel as loved as you deserve to feel.`,
  proposal: {
    question: "Will you be my girlfriend?",
    yesLabel: "Yes",
    noLabel: "No",
  },
  finale: {
    message: "Thank you for making me the happiest person alive.",
    signature: "With all my heart, {yourName}",
  },
  music: "assets/music/background.mp3",
};

export const interpolate = (text) => text
  .replaceAll("{herName}", CONFIG.herName)
  .replaceAll("{yourName}", CONFIG.yourName);
