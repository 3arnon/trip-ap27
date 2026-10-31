// Trip content. Edit here; the page renders from this file.
// Keep it free of booking numbers, phone numbers and prices (the site is public).
const M = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const IMG = q => 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(q);

window.TRIP = {
  departure: '2027-04-07T08:00:00+07:00',
  end: '2027-04-22T23:59:00+07:00',

  stops: [
    {
      id: 'samui', name: 'קוסמוי', en: 'Koh Samui', dates: '7–12 באפריל', nights: 5, theme: 'samui',
      line: 'פילים, שייט פרטי ואומגות. השווקים לפי ימי הפתיחה.',
      hotel: {
        name: 'Melati Beach Resort & Spa', area: 'מפרץ Thongson, צפון האי', map: M('Melati Beach Resort Koh Samui'), photo: 'melati', unitEn: 'pool villa',
        unit: 'וילות בריכה פרטיות', points: ['חוף פרטי ושקט', 'בריכה פרטית בכל וילה', 'כ־15 דקות לצ׳אוונג', 'כ־10 דקות לשדה התעופה']
      },
      days: [
        { date: '2027-04-07', day: 'רביעי', title: 'נחיתה והתמקמות', am: [['נחיתה והתמקמות ב־', 'Melati', M('Melati Beach Resort Koh Samui')]], pm: 'ארוחה קלה במלון', g: '' },
        { date: '2027-04-08', day: 'חמישי', title: 'ביג בודהה וצ׳אוונג', am: ['בוקר חופשי בבריכה ובים. ב־16:00 יוצאים ל', ['', 'ביג בודהה', M('Big Buddha Temple Koh Samui')], ' ול־', ['', 'Wat Plai Laem', M('Wat Plai Laem Koh Samui')], ', שם מאכילים דגים'], pm: ['צ׳אוונג: ', ['', 'Central Samui', M('Central Samui Chaweng')], ' והרחוב הראשי'], g: 'מסלול קצר ושטוח' },
        { date: '2027-04-09', day: 'שישי', title: 'יום הפילים', am: [['', 'Samui Elephant Sanctuary', M('Samui Elephant Sanctuary')], ', תוכנית בוקר: מאכילים את הפילים וצופים ברחצה'], pm: [['', 'Walking Street בכפר הדייגים', M("Fisherman's Village Walking Street Bophut Koh Samui")], ' (17:00–23:00) ומופע האש ב־', ['', "Coco Tam's", M("Coco Tam's Koh Samui")], '. ☕ אופציה לפני: שקיעה ב־', ['', 'The Roof Samui', M('The Roof Samui Bophut')], ', על גבעה מעל בופוט עם נוף 360 לים'], g: 'שולחן במסעדה, ולא פופים על החול' },
        { date: '2027-04-10', day: 'שבת', title: 'אי החזירים', am: ['שייט פרטי בסירה מהירה ל', ['', 'אי החזירים', M('Koh Madsum Pig Island Koh Samui')], ' ושנורקל ב־', ['', 'Koh Tan', M('Koh Tan Koh Samui')]], pm: 'ערב רגוע וארוחה טובה', g: 'אפשר לוותר על השנורקל ולהישאר על החוף' },
        { date: '2027-04-11', day: 'ראשון', title: 'מפלים ואומגות', am: [['', 'מפלי נא מואנג', M('Na Muang Waterfall Koh Samui')], ' ו־', ['', 'Tree Bridge Zipline', M('Tree Bridge Cafe and Zipline Koh Samui')], ': 9 אומגות, כשעתיים. יש אומגות גם ב־18.4 בפוקט, אז אם רוצים משהו אחר: ', ['', 'Paradise Park Farm', M('Paradise Park Farm Koh Samui')], ' (מאכילים חיות ורואים נוף מההר, כשעתיים) או ', ['', 'Magic Garden', M('Tarnim Magic Garden Koh Samui')], ' הסמוך'], pm: [['', 'Lamai Sunday Night Market', M('Lamai Sunday Night Market Koh Samui')], ' (17:00–22:00). ☕ אופציה לפני: ', ['', 'Vikasa Life Cafe', M('Vikasa Life Cafe Koh Samui')], ', מרפסת על הצוק בלאמאי עם נוף לים'], g: 'מחכים בבית הקפה שבין העצים' }
      ]
    },
    {
      id: 'khaolak', name: 'קאו לאק', en: 'Khao Lak', dates: '12–16 באפריל', nights: 4, theme: 'khaolak',
      line: 'סונגקראן, אגם צ׳או לאן, וזמן לווילה.',
      hotel: {
        name: 'Kalima Resort & Villas', area: 'קאו לאק', map: M('Kalima Resort and Villas Khao Lak'), photo: 'kalima', unitEn: 'two bedroom pool villa',
        unit: 'וילה עם 2 חדרי שינה ובריכה פרטית', points: ['וילה לכל משפחה', 'בריכה פרטית', 'כ־10 דקות לבאנג ניאנג', 'מסעדה עם נוף לים']
      },
      days: [
        { date: '2027-04-12', day: 'שני', title: 'מעבר לקאו לאק', am: ['טיסה מקוסמוי לפוקט ב־12:10 (כבר הוזמנה ✅), וכשעה נסיעה צפונה ל־', ['', 'Kalima', M('Kalima Resort and Villas Khao Lak')]], pm: 'ארוחת ערב במלון', g: 'יום נסיעה, בלי תוכנית נוספת' },
        { date: '2027-04-13', day: 'שלישי', title: 'סונגקראן!', badge: 'סונגקראן', am: [['', 'מרכז שימור צבי הים', M('Sea Turtle Conservation Center Thap Lamu Khao Lak')], ' ליד מזח טאב לאמו (8:30–16:30). בכניסה מציגים דרכון'], pm: ['קרבות מים ב', ['', 'באנג ניאנג', M('Bang Niang Khao Lak')], ', ובערב ארוחת דגים על החוף'], g: 'בזמן הקרבות נשארים בבריכה במלון' },
        { date: '2027-04-14', day: 'רביעי', title: 'אגם צ׳או לאן', am: ['יום שלם ב', ['', 'אגם צ׳או לאן', M('Cheow Lan Lake Khao Sok')], ' בקאו סוק: סירת זנב ארוך פרטית, צהריים בבית רפסודה, קיאקים ושחייה'], pm: 'חוזרים עייפים, ערב במלון', g: 'המסלול קל. בהליכה למערה אפשר לחכות ברפסודה' },
        { date: '2027-04-15', day: 'חמישי', title: 'וילה, שוק ושקיעה', am: ['בוקר חופשי בווילה ובבריכה הפרטית. אופציה: מתקני המים של ', ['', 'The Sands', M('The Sands Khao Lak by Katathani')], ' (מגלשות ונהר עצלן). לבדוק מראש שאפשר להיכנס כאורחים חיצוניים בתשלום'], pm: [['', 'שוק באנג ניאנג', M('Bang Niang Market Khao Lak')], ', ', ['', 'סירת המשטרה 813', M('Police Boat 813 Tsunami Memorial Khao Lak')], ', ושקיעה ב־', ['', 'Memories Beach Bar', M('Memories Beach Bar Khao Lak')], '. ☕ אופציות: ', ['', 'Valhalla Teahouse', M('Valhalla Teahouse Khao Lak')], ' על צוק מעל הים, או שקיעה ב־', ['', 'Ocean Man Cafe', M('Ocean Man Cafe Khao Lak')], ' (לנסות את ה־Black Cocoa)'], g: 'שוק שטוח, ובבר יש כיסאות מול הים' }
      ]
    },
    {
      id: 'phuket', name: 'פוקט', en: 'Phuket', dates: '16–22 באפריל', nights: 6, theme: 'phuket',
      line: 'האטרקציות הגדולות: מופעים, אומגות, ג׳יימס בונד ופארק מים.',
      hotel: {
        name: 'Angsana Laguna Phuket', area: 'באנג טאו', map: M('Angsana Laguna Phuket'), photo: 'angsana', unitEn: 'two bedroom suite pool',
        unit: 'סוויטות עם 2 חדרי שינה', points: ['בריכה של 323 מטר', 'שאטל וסירה למתחם Laguna', 'מועדון החוף XANA', 'כ־25 דקות לשדה התעופה']
      },
      days: [
        { date: '2027-04-16', day: 'שישי', title: 'הגעה לאנגסנה', am: ['נסיעה מקאו לאק ל־', ['', 'Angsana', M('Angsana Laguna Phuket')], '. אחר הצהריים בבריכה של 323 מטר'], pm: 'ארוחת פרידה מיעקב וטלי ב־Black Ginger, על רפסודה בנאי יאנג', g: 'מזמינים כיסאות נוחים מראש' },
        { date: '2027-04-17', day: 'שבת', title: 'מנוחה וקרנבל', am: ['נפרדים מיעקב וטלי, שטסים הביתה. יום מנוחה: בריכה, ים, ספורט ימי ו־', ['', 'XANA', M('XANA Beach Club Phuket')], '. ☕ אופציה: ', ['', 'Laguna Café', M('Laguna Cafe Dusit Thani Laguna Phuket')], ' ליד המלון, יושבים בחוץ מול חוף בנג טאו'], pm: [['', 'Carnival Magic', M('Carnival Magic Phuket')], ' בקמלה. המצעד ב־20:30, הבופה הכי רגוע 18:00–20:00'], g: 'טסים הביתה. יציאה מאוחרת מהחדר ביקשנו מהמלון, בכפוף לזמינות' },
        { date: '2027-04-18', day: 'ראשון', title: 'Hanuman World', am: [['', 'Hanuman World', M('Hanuman World Phuket')], ' בחלונג: אומגות ו־Roller Zipline. כניסה אחרונה ב־15:00'], pm: ['שוק ', ['', 'Lard Yai', M('Lard Yai Sunday Walking Street Phuket Old Town')], ' בעיר העתיקה. כדאי להגיע ב־16:30–17:00. ☕ אופציה לפני השוק: ', ['', 'The Old Phuket Coffee', M('The Old Phuket Coffee Old Town')], ', בית סינו־פורטוגזי מלא עתיקות (נסגר בערך ב־18:00)'], g: '' },
        { date: '2027-04-19', day: 'שני', title: 'מפרץ פאנג נגה', am: ['יום שלם בספינה: ', ['', 'האי של ג׳יימס בונד', M('James Bond Island Phang Nga')], ', קאנו בלגונות וצהריים על הסיפון'], pm: ['ערב חופשי. למי שיש כוח: ', ['', 'Siam Niramit', M('Siam Niramit Phuket')]], g: '' },
        { date: '2027-04-20', day: 'שלישי', title: 'פארק מים', am: ['פארק המים ', ['', 'Andamanda', M('Andamanda Phuket')], ': מגלשות, נהר עצלן ואזור לקטנים'], pm: 'ערב רגוע ליד המלון', g: '' },
        { date: '2027-04-21', day: 'רביעי', title: 'יום אחרון', am: [['', 'Central Phuket', M('Central Phuket Floresta')], ' ואקווריום ', ['', 'Aquaria', M('Aquaria Phuket')], ', ממוזג. ☕ אופציה: ', ['', 'View Cafe', M('View Cafe Kathu Phuket')], ' בקאתו, על גבעה עם נוף לעיר ולמפרץ שאלונג'], pm: 'ליל הסדר בבית חב״ד בפטונג, או ארוחת פרידה על החוף במלון', g: '' },
        { date: '2027-04-22', day: 'חמישי', title: 'הביתה', am: 'צ׳ק־אאוט ונסיעה לשדה התעופה, כ־25 דקות', pm: '', g: '' }
      ]
    }
  ],

  checklist: [
    '✅ הוזמנה: טיסה מקוסמוי לפוקט, 12.4 ב־12:10',
    'שני מיניוואנים עם נהגים, לכל הימים ולכל המעברים',
    'שייט פרטי בסירה מהירה לאי החזירים, 10.4',
    'Samui Elephant Sanctuary, תוכנית בוקר, 9.4',
    'Tree Bridge Zipline, 11.4. לבדוק שיעקב וטלי יכולים לחכות בבית הקפה',
    'סירת זנב ארוך פרטית באגם צ׳או לאן, כולל הסעה, 14.4',
    'כרטיסים ל־Carnival Magic, 17.4',
    'Hanuman World, 18.4. לבדוק הסעה ומגבלת גיל באומגות',
    'שייט לפאנג נגה בספינה גדולה, 19.4. לבדוק איסוף מבאנג טאו',
    'כרטיסים ל־Andamanda וקבנה, 20.4',
    'מסעדה: Kapi Sator, חמישי 8.4 בערב',
    'מסעדה: Krua Chao Baan, שבת 10.4 בערב',
    'מסעדה: Krua Luang Ten, שלישי 13.4 ב־17:30',
    'מסעדה: Black Ginger, שישי 16.4 בערב, ל־12 סועדים',
    'מסעדה: Tu Kab Khao, ראשון 18.4 ב־16:30',
    'ליל הסדר (jewishthailand.com) או ארוחת פרידה, רביעי 21.4',
    'The Sands בקאו לאק: לבדוק אם אפשר להיכנס למתקני המים כאורחים חיצוניים, ובכמה. 15.4'
  ],

  // AROI, the food plan: lunch and dinner for each day, next to that day's attraction.
  // when: 'צהריים' / 'ערב' / a time. An entry with `text` only is a short note; one with `name` is a restaurant.
  food: {
    '2027-04-07': [
      { when: 'ערב', name: 'Kan Sak Thong', where: 'במלון Melati', note: 'המסעדה התאילנדית של המלון. אחרי טיסה ארוכה לא יוצאים: ארוחה ראשונה רגועה מול הים', fav: 'טום יאם גונג · קארי ירוק · דג מטוגן ברוטב שלושה טעמים', kids: 'אורז מטוגן עם עוף · חביתה תאילנדית · ספרינג רולס', q: 'Kan Sak Thong Melati Koh Samui' }
    ],
    '2027-04-08': [
      { when: 'צהריים', text: 'ליד הבריכה במלון. בשעות החמות לא יוצאים', kids: 'שייק פירות, אורז מטוגן או קלאב סנדוויץ׳' },
      { when: 'ערב', name: 'Kapi Sator', michelin: true, where: 'צ׳אוונג · 10 דקות מביג בודהה', note: 'מסעדה מקומית במדריך מישלן, בזכות מטבח דרומי אמיתי. קרובה ל־Central Samui ולרחוב הראשי', fav: 'דיונון מקומי ברוטב קוקוס מתקתק · דג פומפרט שלם עם קארי דרומי', kids: 'אורז מטוגן · עוף מוקפץ עם קשיו (בלי צ׳ילי) · ביצת עין על אורז', alt: 'Glong Khaw בצ׳אוונג, מטבח תאילנדי ביתי', q: 'Kapi Sator Chaweng Koh Samui' }
    ],
    '2027-04-09': [
      { when: 'צהריים', text: 'בסוף הסיור ב־Samui Elephant Sanctuary: ארוחה צמחונית של אורז מטוגן, פאד תאי, ספרינג רולס ופירות', kids: 'הכל לא חריף' },
      { when: 'ערב', name: 'Krua Bophut', where: 'כפר הדייגים · שולחנות על החוף', note: 'אוכלים בדוכני ה־Walking Street, ומי שרוצה לשבת, וגם יעקב וטלי, הולך ל־Krua Bophut. מגיעים לפני 19:00 כדי לקבל שולחן על החוף', fav: 'דג מאודה בליים וצ׳ילי · עוף מוקפץ עם קשיו · ברווז בשלושה תבלינים', kids: 'עוף עם קשיו (בלי צ׳ילי) · אורז מטוגן עם סרטן · בדוכנים: מו פינג ורוטי עם בננה', q: 'Krua Bophut Fisherman Village Koh Samui' }
    ],
    '2027-04-10': [
      { when: 'צהריים', text: 'על הסירה או באי. לוודא בהזמנת השייט שהארוחה כלולה', kids: 'לבקש מראש מנות לא חריפות' },
      { when: 'ערב', name: 'Krua Chao Baan', michelin: true, where: 'מארט, ליד למאי · נוף לים', note: 'מסעדת פירות ים מקומית ופשוטה עם נוף, בדרך חזרה מהשייט. במישלן בזכות אוכל טוב במחיר הוגן', fav: 'חביתה פריכה עם פירות ים · דיונון מוקפץ עם אננס, מתכון שיש רק בסמוי', kids: 'החביתה עם פירות ים, לא חריפה · דג פריך מטוגן · אורז מטוגן', q: 'Krua Chao Baan Maret Koh Samui' }
    ],
    '2027-04-11': [
      { when: 'צהריים', name: 'Sweet Sisters Café', where: 'נא מואנג · דקות מהמפלים והאומגות', note: 'אוכל תאילנדי אורגני עם טוויסט ומיצים טריים. יש משחקים לילדים', fav: 'סלט תאילנדי · מיץ קוקוס או שייק טרי', kids: 'פאד תאי בלי צ׳ילי · אורז מטוגן · שייק מנגו', q: 'Sweet Sisters Cafe Koh Samui' },
      { when: 'ערב', name: 'Sabienglae', where: 'למאי · על החוף, ליד שוק יום ראשון', note: 'אוכלים בדוכני השוק, ומי שרוצה לשבת הולך ל־Sabienglae. פירות ים לפי משקל: לשאול מחיר לקילו לפני שמזמינים', fav: 'שרימפס גדולים ברוטב תמרינדי · דג שלם לפי משקל', kids: 'השרימפס בתמרינדי, מתקתקים · אורז מטוגן · בשוק: שיפודי עוף וקנום קרוק', q: 'Sabienglae Lamai Koh Samui' }
    ],
    '2027-04-12': [
      { when: 'ערב', text: 'ערב במלון: Maluka או ארוחה בווילה', kids: 'פסטה, פיצה או אורז מטוגן' }
    ],
    '2027-04-13': [
      { when: 'צהריים', text: 'במלון. חוזרים לאכול ולנוח לפני הסונגקראן', kids: 'כריכים, צ׳יפס ושייקים ב־Beach Bar' },
      { when: '17:30', name: 'Krua Luang Ten', michelin: true, where: 'קוק קאק · דקות מבאנג ניאנג', note: 'ביב גורמן במישלן 2026. מנות היום כתובות על לוח, ויש ירקות טריים ללא הגבלה. פתוח 11:00–13:00 ו־17:00–20:00, וסגור ב־10, 20 ו־30 לחודש', fav: 'מנות היום מהלוח · ירקות טריים עם רוטב טאי פלא', kids: 'דג מטוגן · אורז מטוגן · חביתה תאילנדית. לבקש "מאי פט"', q: 'Krua Luang Ten Khao Lak' }
    ],
    '2027-04-14': [
      { when: 'צהריים', text: 'בבית הרפסודה באגם צ׳או לאן, כלול בסיור', kids: 'לבקש מהמדריך אורז, עוף מטוגן ופירות' },
      { when: 'ערב', text: 'ה־Beach Bar Restaurant של Kalima, או אוכל לווילה', kids: 'המבורגר, פיצה או אורז מטוגן' }
    ],
    '2027-04-15': [
      { when: 'צהריים', text: 'בווילה, ליד הבריכה הפרטית', kids: 'פירות, שייקים וכריכים מה־Cafe-T' },
      { when: '15:00', name: 'Beach Grill @ Devasom', where: 'חוף קוק קאק · כ־25 דקות צפונה', note: 'נשנוש מאוחר ושעה על החוף. מטבח תאילנדי־דרומי על החול, מוזכר במישלן', fav: 'דג שלם על הגריל · קארי דרומי · סלט מנגו ירוק', kids: 'שרימפס או עוף על הגריל · אורז מטוגן · צ׳יפס', q: 'Beach Grill Devasom Khao Lak' },
      { when: '17:45', name: 'Memories Beach Bar', where: 'חוף פאקאראנג', note: 'שקיעה מול הים, ג׳אז ומופע אש. מזמינים שתייה וקינוח', fav: 'קוקטייל מול השקיעה · מנגו סטיקי רייס', kids: 'שייק פירות · גלידה · צ׳יפס', q: 'Memories Beach Bar Khao Lak' },
      { when: '19:00', name: 'שוק באנג ניאנג', where: 'בדרך חזרה למלון', note: 'ארוחת ערב מהדוכנים, ומשם ישר הביתה', fav: 'מו פינג · סום טאם · קארי מהדוכנים', kids: 'שיפודי עוף · רוטי עם בננה · מנגו סטיקי רייס', q: 'Bang Niang Market Khao Lak food' }
    ],
    '2027-04-16': [
      { when: 'ערב', name: 'Black Ginger', where: 'The Slate, נאי יאנג · כ־20 דקות · 17:30–23:00', note: 'ביתנים שחורים על רפסודה שמושכים בחבל. הארוחה הכי מיוחדת בטיול, ארוחת הפרידה מיעקב וטלי. מזמינים מראש ל־12 ומבקשים כיסאות נוחים ליעקב ולטלי', fav: 'תפריט שף של מטבח תאילנדי ופוקטי. לשאול על המנות של הבית', kids: 'לבקש מראש מנות לא חריפות, כמו סאטה עוף או אורז מטוגן', q: 'Black Ginger The Slate Phuket' }
    ],
    '2027-04-17': [
      { when: 'צהריים', name: 'Sanook', where: 'לאיאן · 10 דקות מהמלון', note: 'מטבח דרומי בסגנון שוק, מתאים למשפחות', fav: 'קארי דרומי · מוקפצים · סלטים תאילנדיים', kids: 'אורז מטוגן · עוף מטוגן · אטריות מוקפצות', q: 'Sanook La Green Hotel Phuket' },
      { when: 'ערב', text: 'הבופה של Carnival Magic, הכי רגוע בין 18:00 ל־20:00, לפני המצעד', kids: 'יש גם אוכל מערבי ופינת קינוחים' }
    ],
    '2027-04-18': [
      { when: 'צהריים', text: 'קל, בתוך Hanuman World', kids: 'משהו קל ושתייה קרה לפני האומגות' },
      { when: '16:30', name: 'Tu Kab Khao', michelin: true, where: 'העיר העתיקה · Phang Nga Rd · 11:00–21:00', note: 'בית קולוניאלי משוחזר, וכאן אוכלים את המטבח של פוקט. אחר כך הולכים ברגל לקינוחים בשוק Lard Yai', fav: 'מו הונג · קארי צהוב עם סרטן · חזיר מוקפץ עם משחת שרימפס', kids: 'קארי ירוק עדין עם רוטי · אורז מטוגן באננס · מו הונג, מתוק ולא חריף', alt: 'Chun One, סרטן בלימון ומטבח דרומי', q: 'Tu Kab Khao Phuket Old Town' }
    ],
    '2027-04-19': [
      { when: 'צהריים', text: 'על הסיפון, כלול בשייט', kids: 'לבקש מראש מנות לא חריפות' },
      { when: 'ערב', text: 'ערב קל באזור Laguna, או הבופה של Siam Niramit למי שהולך למופע', kids: 'פיצה, פסטה או אורז מטוגן' }
    ],
    '2027-04-20': [
      { when: 'צהריים', text: 'בתוך Andamanda', kids: 'יש בפארק דוכני אוכל מהיר' },
      { when: 'ערב', name: 'The Farmer and The Fisherman', where: 'באנג טאו, ליד Boat Avenue · 5 דקות מהמלון', note: 'הסניף של Ginger Farm Kitchen: תאילנדי ומערבי מחומרים טריים. אחרי יום בפארק לא נוסעים רחוק', fav: 'מנות תאילנדיות מהחווה · דגים טריים', kids: 'פסטה, המבורגר ושניצל עוף', q: 'The Farmer and The Fisherman Phuket' }
    ],
    '2027-04-21': [
      { when: 'צהריים', name: 'Kaithong', where: 'Central Phuket Floresta · ליד האקווריום', note: 'ארוחה תאילנדית בקניון, בין הקניות לאקווריום', fav: 'מסמאן · פאד תאי · קארי', kids: 'פאד סי איו · אורז מטוגן · ספרינג רולס', q: 'Kaithong Central Phuket' },
      { when: 'ערב', text: 'ליל הסדר בבית חב״ד בפטונג, כ־30 דקות מהמלון, או ארוחת פרידה על החוף במלון' }
    ]
  },

  dishes: [
    { he: 'מו הונג', en: 'Moo Hong', d: 'חזיר מבושל לאט ברוטב כהה, פלפל ושום. המנה של פוקט' },
    { he: 'מי הוקיין', en: 'Mee Hokkien', d: 'אטריות צהובות עבות עם פירות ים, בסגנון פוקט' },
    { he: 'קארי צהוב עם סרטן', en: 'Gaeng Pu Bai Chaplu', d: 'עם אטריות אורז דקות. קלאסיקה דרומית' },
    { he: 'דיונון עם אננס', en: 'Pla Muek Pad Sapparot', d: 'מתוק, חמוץ ופלפלי. מנה שיש רק בסמוי' },
    { he: 'פאד קרפאו', en: 'Pad Kra Pao', d: 'מוקפץ בזיליקום קדוש עם ביצת עין על אורז' },
    { he: 'מו פינג', en: 'Moo Ping', d: 'שיפודי חזיר מתוקים על גחלים. הילדים יאהבו' },
    { he: 'מסמאן', en: 'Gaeng Massaman', d: 'קארי עדין ומתקתק עם בוטנים. לא חריף' },
    { he: 'סום טאם', en: 'Som Tam', d: 'סלט פפאיה ירוקה. חריף מאוד, לבקש "מאי פט"' },
    { he: 'קנום ג׳ין', en: 'Khanom Jeen', d: 'אטריות אורז טריות עם קארי וירקות. ארוחת בוקר מקומית' },
    { he: 'מנגו סטיקי רייס', en: 'Khao Niao Mamuang', d: 'אורז דביק, מנגו וקרם קוקוס. אפריל הוא עונת המנגו' }
  ],

  foodTips: [
    ['"מאי פט"', 'פירושו "לא חריף". אומרים את זה בכל הזמנה לילדים וליעקב ולטלי. המטבח הדרומי חריף במיוחד'],
    ['12 סועדים', 'מבקשים מהנהג או מהקבלה במלון להתקשר ולהזמין שולחן'],
    ['שווקים', 'משלמים במזומן, בבאט. בוחרים דוכנים שבהם עומדים בתור מקומיים'],
    ['מים', 'שותים רק מבקבוקים סגורים. הקרח במסעדות בטוח'],
    ['סונגקראן', 'ב־13–15.4 מסעדות קטנות סוגרות לפעמים. מתקשרים לפני שיוצאים, והנהג יכול לעזור']
  ],

  // A sticker for every day: tap it and it bursts.
  icons: {
    '2027-04-07': '🛬', '2027-04-08': '🛕', '2027-04-09': '🐘', '2027-04-10': '🐷', '2027-04-11': '🌊',
    '2027-04-12': '✈️', '2027-04-13': '💦', '2027-04-14': '🛶', '2027-04-15': '🌅', '2027-04-16': '🌴',
    '2027-04-17': '🎪', '2027-04-18': '🐒', '2027-04-19': '🏝️', '2027-04-20': '🛝', '2027-04-21': '🐠', '2027-04-22': '🏠'
  },

  // Free Unsplash photos (ids after "photo-"), or a path to a file in img/. Hotels and restaurants are illustrations, not the actual place.
  photos: {
    samui: '1537956965359-7573183d1f57', khaolak: 'img/khaolak.jpg', phuket: '1605045544284-d13c6d6a60a6',
    melati: '1596178067639-5c6e68aea6dc', kalima: '1728048756938-de1ccee0ab15', angsana: '1623718649591-311775a30c43',
    foodHero: '1582801205465-c0d029e85a1c'
  },
  foodPhotos: {
    'Kan Sak Thong': '1548943487-a2e4e43b4853', 'Kapi Sator': '1455619452474-d2be8b1e70cd',
    'Krua Bophut': '1628428798909-75a2d42a557e', 'Krua Chao Baan': '1636797600090-146b191714cb',
    'Sweet Sisters Café': '1575828668319-768718f23925', 'Sabienglae': '1586058584812-2f18611121bf',
    'Krua Luang Ten': '1675150277436-9c7348972c11', 'Beach Grill @ Devasom': '1785396628191-557da4ecabb9',
    'Memories Beach Bar': '1710975003023-25fdf143226a', 'שוק באנג ניאנג': '1590221237024-9e3eade918e0',
    'Black Ginger': '1553852046-01e6514f22d4', 'Sanook': '1562565652-a0d8f0c59eb4',
    'Tu Kab Khao': '1572867865682-9c68692fc724', 'The Farmer and The Fisherman': '1514944288352-fffac99f0bdf',
    'Kaithong': '1559314809-0d155014e29e'
  },
  photoCredits: 'Sumit Chinchane, Max Böttinger, Stephen Cook, Michael Schofield, The Anam, Antonio Araujo, Cory Bjork, Nick Karvounis, emy, Streets of Food, Sherwin Ker, Dian Schuurkamp, Chantal Lim, Alexandra Tran, BONNNI C, Mayra Coz, Egor Myznik, David Emrich, Jerome Jome, Thae Jirapon, Andres Medina, Alyssa Kowalski, Markus Winkler',

  aiQuickQuestions: [
    'מה עושים היום?',
    'איזה שווקים פתוחים בקוסמוי?',
    'מה לארוז לסונגקראן?',
    'מסעדה טובה ליד Angsana?'
  ],

  // The Cloudflare Worker that talks to Claude (ai-worker folder).
  aiEndpoint: 'https://trip-ap27-assistant.trip-ap27-assistant.workers.dev'
};
