# מסמך איורים — כוכבות קוראות, עולם הלבוש

המטרה: **כוכבת אחת, סגנון אחד, ובגדים שיושבים עליה בדיוק.**
המנוע כבר בנוי כך שכל איור מתחלף בקובץ אחד, בלי לגעת בקוד. כרגע יש במשחק איורים זמניים: הכוכבת גזורה מהאיור הקיים, וחלק מהפריטים מצוירים גרפית. כל איור שתביאי לפי המסמך הזה יחליף איור זמני.

---

## 1. שלושה כללי זהב

1. **הכוכבת כבר קיימת** (`assets/scene/star.png`). מצרפים אותה כתמונת ייחוס לכל בקשה.
2. **רקע שקוף (PNG) לכל פריט ולכוכבת.** הרקעים עצמם (החדר) הם בלי הכוכבת.
3. **לא משנים תנוחה.** הכוכבת עומדת באותה תנוחה בדיוק בכל המשחק. הבגדים מונחים עליה כשכבות.

---

## 2. משפט סגנון קבוע (להדביק בתחילת כל בקשה)

> Soft, clean children's picture-book illustration, gentle pastel palette (blush pink, lilac, cream, soft gold), smooth shading, thin warm-brown outlines, subtle sparkles, friendly and cute, no text, no logos.

---

## 3. רשימת האיורים

### א. הכוכבת: ✅ מוכנה

הכוכבת הסופית נמצאת בקובץ `assets/scene/star.png`: שיער שחור, קוקו לצד, גופייה ומכנסיים קצרים בצבע שמנת. **מצרפים אותה כתמונת ייחוס לכל בקשה**, ולא משנים לה תנוחה.
אביזרי שיער ממקמים בצד ימין של הראש (מצד הצופה), כי הקוקו בצד שמאל.

### ב. שבעת הפריטים: ✅ מוכנים

- כרטיסים (הפריט לבד): `assets/items/<פריט>.png`.
- על הגוף: מעיל, חצאית ונעליים הם שכבות בגודל הכוכבת (`assets/items/<פריט>-on.png`), שנגזרו מהתמונות שלך כשהכוכבת לובשת אותם. שעון, צמיד, לב ופפיון ממוקמים לפי מידות.
- הידיים של הכוכבת מוצגות מעל הבגדים (`assets/scene/star-arms.png`).

**לפריטים בעולמות הבאים עובדים באותה שיטה:** כרטיס של הפריט לבד, ותמונה של הכוכבת לובשת אותו, באותה תנוחה ועל רקע שקוף. אני גוזר את השכבה בעצמי.

### ג. רקעים (בלי הכוכבת)

| קובץ | גודל | תוכן |
|---|---|---|
| `assets/scene/room.jpg` | 1600×1000 | חדר הלבשה ורוד־לילך: וילונות, מראה עם נורות, שולחן איפור. **בצד ימין (בערך 420 פיקסלים) יהיה פנוי ונקי**, כי שם עומדת הכוכבת |
| `assets/scene/wardrobe.jpg` | 1600×1000 | אותו חדר, ובצד שמאל ארון עם **7 תאים מוארים** (3 למעלה, 4 למטה). אחרי שתביאי אותו אמדוד מחדש את מיקום התאים |

> [משפט הסגנון] Wide 16:10 background of a dreamy pink-lilac dressing room for a young pop star: curtains, a tall mirror with light bulbs, a vanity table, soft glowing lights. No people. Keep the right quarter of the image simple and uncluttered.

### ד. תמונות מילים: 1024×1024, רקע שקוף, חפץ אחד במרכז

| אות | מילים (נכונות) | קבצים |
|---|---|---|
| מ | מפתח, מראה, מטרייה | `words/mafteach.png`, `words/mara.png`, `words/mitriya.png` |
| ש | שמש, שעון, שוקולד | `words/shemesh.png`, `words/shaon.png`, `words/shokolad.png` |
| ל | לימון, לחם, לב | `words/limon.png`, `words/lechem.png` (הלב לקוח מהפריט) |
| נ | נר, נוצה, נחש | `words/ner.png`, `words/notza.png`, `words/nachash.png` |
| ס | ספר, סירה, סוכרייה | `words/sefer.png`, `words/sira.png`, `words/sukariya.png` |
| צ | צב, צלחת, ציפור | `words/tzav.png`, `words/tzalachat.png`, `words/tzipor.png` |
| ח | חלון, חתול, חלב | `words/chalon.png`, `words/chatul.png`, `words/chalav.png` |
| מסיחים | תוף, כדור, פרח | `words/tof.png`, `words/kadur.png`, `words/perach.png` |

> [משפט הסגנון] A single cute [OBJECT] centered, simple and instantly recognizable for a 5-year-old, transparent background, square.

**חשוב לזיהוי:** כל חפץ צריך להיות מזוהה מיד ובלי עמימות. למשל חלב בקרטון עם טיפה, צלחת עם מעט אוכל, ונר דולק.

---

## 4. איך מעבירים לי

מספיק להעלות את הקבצים למאגר (או לשלוח אותם לי) עם השמות שבטבלה. אני אחבר כל אחד לקובץ `js/content.js`, אמדוד את התאים בארון ואבדוק שכל בגד יושב על הכוכבת.

סדר מומלץ: **החצאית והמעיל** (הם בודקים את שיטת השכבות), ואז שאר הפריטים, הרקעים ותמונות המילים.
