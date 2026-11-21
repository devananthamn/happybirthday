/**
 * 🎀 BIRTHDAY WEBSITE CONFIGURATION
 * ==========================================================
 * Easily customize all text, photos, letter, and cake details
 * in this single configuration file.
 * ==========================================================
 */

export const birthdayConfig = {
  // 🌸 Basic Information
  recipient: {
    name: "Archana",
    birthdayDate: "November 23rd",
  },

  // 🚪 Playful First Gatekeeper Screen (Do you want to read?)
  introGate: {
    greeting: "Hlo Madam! 🎀",
    message:
      "Summa ungaluku kaga pannen ithula enna iruku nu porumaiya parunga , unnaku pudikuma nu therla ana nalla irukum.....",
    question: "Do you want to read? 💌",
    yesButtonText: "Yes 💖",
    noButtonText: "No 🙈",
  },

  // 🎀 Opening Surprise Screen
  openingScreen: {
    greeting: "Happy 20th Birthday, Madam! 🎀",
    subtext: "Edho ennala mudichathu ungalukaga...",
    buttonText: "Open pannunga madam 💌",
    hintText: "Itha open panni parunga",
  },

  // ✨ Hero Section
  hero: {
    headline: "Happy 20th Birthday, Madam! 💗",
    supportingText:
      "Innaiku fulla happy ah irunga ,ethukum feel pannathinga ungaluku pudicha visiyum tha nadakum Eppaiyum sirichiteyyyy irunga madam apo tha nalla irukum ",
    stats: [
      { label: "Turning", value: "20 Years ✨" },
      { label: "Birthday", value: "Nov 23rd 🎂" },
      { label: "Madam Status", value: "100% Child " },
    ],
  },

  // 📸 Our Friendship Story / Scrapbook
  scrapbook: {
    title: "Our Little World ♡",
    subtitle: "",
    polaroids: [
      {
        id: "photo-1",
        caption: "Namba rendu perum first edutha photo, ennaku romba pudicha photo ithu tha .Intha maari  photo la unkuda edupenu nenaichathu kuda ila nga",
       
        rotation: "-3deg",
        tapeColor: "rgba(248, 200, 220, 0.75)",
        tapePosition: "top-left",
        sticker: "🎀",
        image: "/photos/memory-3.jpg",
        alt: "Namba first edutha photo",
      },
      {
        id: "photo-2",
        caption: "Intha photo va na marakave matte ,yen appdi na unna apo kupda oru maari yoschite irunthurupen athuku aprm seri namba frd thaneyy enna solliruvanga nu nenaichitu kupten",
        
        rotation: "2.5deg",
        tapeColor: "rgba(232, 142, 173, 0.75)",
        tapePosition: "top-right",
        sticker: "💖",
        image: "/photos/memory-2.jpg",
        alt: "Wonderla Photo",
      },
      {
        id: "photo-3",
        caption: "Oru maari yoschitu bayathute irunthen nee enna nenaipa nu theriyela seri kekkalam nu unkitta ketturupen kai mela podava nu , neeyum seri nu solliruva athuku ",
        
        rotation: "-2deg",
        tapeColor: "rgba(243, 229, 171, 0.8)",
        tapePosition: "top-left",
        sticker: "✨",
        image: "/photos/memory-1.jpg",
        alt: "Garden photo",
      },
      {
        id: "photo-4",
        caption: "Annaiki nan fulla unga kuda irunthurupen , neenga kuda yarachu edhachu solliruvanga nu sollitey irunthinga ..antha naal ah kandipa marrakave mudiyathu nga  ",
       
        rotation: "3deg",
        tapeColor: "rgba(216, 180, 226, 0.75)",
        tapePosition: "top-right",
        sticker: "🌸",
        image: "/photos/memory-4.jpg",
        alt: "Photo on the rock",
      },
    ],
  },

  // 💌 Heartfelt Birthday Letter
  letter: {
    sectionTitle: "A Letter Just for Madam 💌",
    envelopeLabel: "For Madam ♡",
    letterDate: "November 23rd",
    greeting: "Madam💗",
    paragraphs: [
      "Neenga en life la vanthu ivolo close irupinga nu nenaichathu kuda ila , ana ipo konjo neram summa pesama iruntha kuda edho miss pandra maari iruku eppaiyumeyy pesiteyyy irukanumnu thoonum , yen appdi nu therla ...Unga kuda mattum epo pathalum pesanumnu iruku.....  ",
      "Ungaluku eppdi nu therla apo apo oru maari solluvinga , Seri athula irukattum ipo vanthu madam ku 20 vayasu agiruchu periya ponna ahh vera agitinga Inimel la edhukum feel pannama life ah konjomacha enjoy pannunga ithu vara eppdiyoo irunthutinga ana inimel manasuku pudicha visiyuma pannunga , aprm athigama kovam la padathinga ana neenga kovam la padurathu nalla tha irukum ana eppaiyumeyy iruka vena konjo kammi pannanum kastumnu theriyum but irunthalum try panna mudiyum",
      "Nan unna vittu poiruvenu mattum nenaikatha,Kandipa appdi mattum tha madam nenaipinga nu theriyum inthana naal eppdi unga kuda nan irunthen athu maari eppaiyum irupen ....Nee ya ennaiya poo nu soldra varaikum kandipa Unkuda eppaiyum nan irupen nga ......",
      "Eppadiyum enna letter nu tha yoschitu pathurupinga,perusa la neenga nenaikira maari la edhuvum irunthurukathu.Enna da ivan ithula pannitu irukan aprm mukkiyama nammaku edhuku pannanumnu oru thought vanthurukum unnaku,athuku pathil summa tha pannen!!!!!",
      "Nan unga kitta athigama solliruka matte ungala unmaiyave ennaku romba pudikum...Marupadiyum oru tharava soldren Happy Birthday ngaaaaaa 🎀💗",
      "Aprm neenga kandipa nanintha gift maari edhuvum vangi tharuvenu la expect panniruka mattinga athunala nanum edhuvum vangala , neenga ketta kandipa vangi tharuven . Nan ye ungaluku periya gift la appdi irukum pothu vera enna gift venum ungaluku sollunga nan ye pothum la ungaluku enna vida periya gift edhachu iruka enna ....iruntha sollunga , eppdiyum irukathu nu theriyum enna vida enna periya gift iruka poguthu",
      "Eppaiyum life la enkuda ve iru ,engaiyum poiratha please................."
    ],
    signature: "By your Enemy 🤍",
    author: "",
  },

  // 🎂 Birthday Cake Finale
  cakeFinale: {
    sentence: "Unnaku pudichatha sollu",
    recipientEmail: "devananthamn@gmail.com",
    web3FormsAccessKey: "511c0949-7b10-4ae5-8314-e898cfa21bb5",
    buttonBlown: "Your Birthday Wish Has Been Sent to the Enemy ",
    letterReveal: {
      title: "Happy 20th Birthday, Madam! 💗",
      message: [
        "Thank you for being part of my life, for every laugh, every memory, and every little moment that means so much to me.",
        "Welcome to your 20s, Archana! I hope this milestone year brings you everything your heart has been wishing for.",
        "No matter where life takes us, you'll always have a special place in my heart.",
        "Here's to more memories, more laughter, more adventures, and a bond I'll always treasure.",
        "Wishing you the sweetest 20th birthday, Madam! 🎀",
      ],
      footerNote: "Made with lots of love, just for Archana ♡",
    },
  },

  // 🎵 Background Music
  music: {
    youtubeId: "UzhiBIOP1go",
    songTitle: "Premavathi",
    artist: "Sid Sriram 🎵",
  },
};
