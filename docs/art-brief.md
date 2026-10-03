# מסמך איורים — כוכבות קוראות, עולם הלבוש

המטרה: **כוכבת אחת, סגנון אחד, ובגדים שיושבים עליה בדיוק.**
המנוע כבר בנוי כך שכל איור מתחלף בקובץ אחד, בלי לגעת בקוד. כרגע יש במשחק איורים זמניים: הכוכבת גזורה מהאיור הקיים, וחלק מהפריטים מצוירים גרפית. כל איור שתביאי לפי המסמך הזה יחליף איור זמני.

---

## 1. שלושה כללי זהב

1. **קודם הכוכבת, אחר כך כל השאר.** מייצרים פעם אחת את דמות הבסיס, מאשרים אותה, ומאותו רגע מצרפים אותה כתמונת ייחוס לכל בקשה.
2. **רקע שקוף (PNG) לכל פריט ולכוכבת.** הרקעים עצמם (החדר) הם בלי הכוכבת.
3. **לא משנים תנוחה.** הכוכבת עומדת באותה תנוחה בדיוק בכל המשחק. הבגדים מונחים עליה כשכבות.

---

## 2. משפט סגנון קבוע (להדביק בתחילת כל בקשה)

> Soft, clean children's picture-book illustration, gentle pastel palette (blush pink, lilac, cream, soft gold), smooth shading, thin warm-brown outlines, subtle sparkles, friendly and cute, no text, no logos.

---

## 3. רשימת האיורים

### א. הכוכבת: הקובץ החשוב ביותר

| | |
|---|---|
| שם קובץ | `assets/scene/star.png` |
| גודל | 1000×2560 פיקסלים, לאורך, רקע שקוף |
| תוכן | ילדה כבת 7–8, כוכבת קיי־פופ, **שיער שחור** בקוקו גבוה, פנים מחייכות, מבט קדימה |
| תנוחה | עמידה ישרה מול המצלמה, **ידיים מעט רחוקות מהגוף** (כדי שיהיה מקום לשעון ולצמיד), **רגליים מעט פסוקות**, כפות רגליים יחפות |
| בגדים | בגד גוף פשוט בצבע שמנת (בלי שרוולים, עד הירכיים), בלי אביזרים |
| מסגור | הדמות ממלאת את כל הגובה, עם שוליים קטנים מלמעלה ומלמטה |

**בקשה לכלי:**
> [משפט הסגנון] Full-body character sheet of one girl, about 7 years old, K-pop star, long **black** hair in a high ponytail, big friendly smile, facing the viewer, standing straight, arms slightly away from the body, feet slightly apart, barefoot, wearing a plain cream sleeveless bodysuit, no accessories. Transparent background, the figure fills the full height, portrait 1000×2560.

### ב. שבעת הפריטים: שני קבצים לכל פריט

**קובץ 1, "על הגוף" (`item-X-on.png`):** אותו גודל בדיוק כמו star.png (‏1000×2560), שקוף, ורק הפריט מצויר בו, במקום המדויק על הגוף.
איך מייצרים: מבקשים מהכלי לצייר את **אותה כוכבת** (מצרפים את star.png) לובשת את הפריט, ואז מוחקים הכול חוץ מהפריט. זו הדרך היחידה שבה הבגד יתאים לגוף בדיוק.

**קובץ 2, "כרטיס" (`item-X-card.png`):** הפריט לבד, מוצג יפה, 1024×1024, רקע שקוף. משמש בכרטיסי הבחירה ובארון.

| פריט | אות | שמות קבצים | הערות לבקשה |
|---|---|---|---|
| מעיל | מ | `item-coat-on.png`, `item-coat-card.png` | Cropped pink jacket, open at the front |
| שעון | ש | `item-watch-on.png`, `item-watch-card.png` | Pink strap, gold face with a star; on the **left** wrist (הצמדה גם לימין נעשית במשחק) |
| לב | ל | `item-heart-card.png` בלבד | לב ורוד מבריק עם כוכב קטן. ממוקם בחופשיות, ולכן אין צורך בקובץ "על הגוף" |
| נעליים | נ | `item-boots-on.png`, `item-boots-card.png` | Pink lace-up ankle boots, on both feet |
| סיכה | ס | `item-pin-card.png` בלבד | Hair clip with a pink bow and a gold star. ממוקמת בחופשיות |
| צמיד | צ | `item-bracelet-on.png`, `item-bracelet-card.png` | Thin gold bangle with pink beads; on the **right** wrist |
| חצאית | ח | `item-skirt-on.png`, `item-skirt-card.png` | Layered pink tulle skirt at the waist, above the knees |

**בקשה לכלי (דוגמה לחצאית):**
> [משפט הסגנון] The exact same girl as in the reference image, same pose, same proportions, same framing, now wearing a layered pink tulle skirt at the waist. Do not change anything else.
אחר כך מוחקים את הכוכבת ומשאירים רק את החצאית.

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

סדר מומלץ: **הכוכבת**, ואז **החצאית והמעיל** (הם בודקים את שיטת השכבות), ואז שאר הפריטים, הרקעים ותמונות המילים.
