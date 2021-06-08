const paragraphs: any = {
  1: [
    `this now time set there see was none left right well I we their time sun soon once rock food dark light jump ride car sea dog box bed game table fridge calender class books shoes dress fan chair mother father brother sister sea life  good hog day far wind fish run hope thanks window outdoors tree house school pants shirt brush hat boots pictures phone facebook ring block beach water horse eyes text new fast door add for I'm out of random words to think of this is a simple paragraph made by alexis danyel martin hope you enjoy typing this I guess that's all cause I'm out of ideas I hope you have a very good day or night goodbye`,
  ],
  2: [
    `Days are not of equal value in one's life. Some bring happiness while others bring sadness. Sadness and happiness both are equally important to man's life, since they are the two sides of a coin. As we cannot forget the happiest day, we are unable to forget the saddest day of our life too. The saddest day of my life was the Diwali Day. Diwali is considered to be a happy festival and till last Diwali, it was my favorite festival. On last Diwali, my sister, my brother and I were busy lighting the fireworks. I was holding a ‘fuljhari' in my hand and unfortunately my younger brother, who was standing just beside me, had a cracker in his hand. This cracker caught fire and a very loud explosion was heard which shook my sister and me. After that, we all could think of nothing else than blood stained cotton, bandage, dettol etc. My cousin took my brother to the doctor where he got 14 stitches in his forefinger and thumb. But at home, everybody kept cursing and blaming me for the mishap. That night, I could not sleep and I cried a lot. For next few days, I bore the burden of this blame for being responsible for this unfortunate incident. I felt deeply guilty conscious which I was able to overcome after a long time.`,
  ],
  3: [
    `Recently, an exhibition ‘Building A New India' was held in the capital. It was organized by the Ministry of Information and Broadcasting, Government of India. The exhibition was set up in the Triveni Kala Sangam. The chief exhibits were photographs, novels, some sculptures by Indian modern artists presenting Indian cultural inheritance. First of all, I visited the general section of the exhibition where different charts and photographs depicting India's development in various fields were set. Most impressive photographs among these were those showing India's nuclear development. The second section dealt with India's magnificent historical background. I was fascinated by the pictures of Mohanjodaro excavation. Then I saw the most beautiful and colorful section of the exhibition i.e. the cultural section. It consisted of paintings, sculptures, photographs etc. The Rajasthani and Gujarati paintings were very colourful and attractive. This exhibition, inaugurated by the Prime Minister, lasted for a week. It proved to be of great educational value. It brushed up my knowledge about India as my motherland. It enhanced my respect for my great country, India. I would very much appreciate if the Indian government organized some more such exhibitions.`,
  ],
  getParagraph: function (mode: number): string {
    const modeProp = mode.toString();
    const index = Math.floor(Math.random() * this[modeProp].length);
    return this[modeProp][index].replace(/(\r\n|\r|\n){2,}/g, "$1\n");
  },

  getWords: function (mode: number) {
    return this.getParagraph(mode).trim().split(/\s+/);
  },
};

export { paragraphs };
