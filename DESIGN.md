# אותיות וילדים: תעלומת הכתבה שנעלמה — FULL GAME SPEC

A 90's LucasArts-style point&click adventure in Hebrew, for kids (religious-national audience in Israel).
**Fully fictional plot, AI-generated, gentle witty humor, nothing offensive, no violence.**

## Golden rules for ALL content
1. All player-facing text is HEBREW. Warm, funny, witty — like Day of the Tentacle but soft, for kids ~7-13.
2. Kid-appropriate + respectful of a religious (dati-leumi) audience. No rudeness, no romance, no scary stuff. Light Jewish flavor is welcome (מיץ פטל, ערב שבת energy) but NO halachic jokes at anyone's expense.
3. In Hebrew text arrows are `←` (never `→`).
4. Every hotspot MUST have a funny/interesting `look` line. LucasArts law: looking at anything is rewarded.
5. NEVER invent new items/flags — use only the contract below.
6. Files are plain browser JS (no modules/imports). Start file with `'use strict';`. Must pass `node --check`.

## STORY
נעם, ילד שזכה ב״יום קורא צעיר במערכת״, מגיע בדיוק כשמתגלה שהכתבה הראשית — ריאיון בלעדי עם סופרת הילדים המסתורית ״ש. גיבורי״ — נעלמה מחדר העורכת רבקה. חלון פתוח + חתול אשם + עמדת ניירות = 3 עמודים שהתפזרו. הדדליין: 18:00.

- **עמוד 1 (page1):** מרדכי החתול גרר מתחת לארון בחדר הכתבים ושומר עליו. פתרון: דובי מגלה שמרדכי זז רק בשביל טונה ← טונה במקרר במטבחון ← נותנים למרדכי ← לוקחים את העמוד.
- **עמוד 2 (page2):** עף מהחלון אל קן היונה נחום על הגג. פתרון: מטבע מתחת לכריות הספה בלובי ← קונים גרעינים בקיוסק של בני ← נותנים לנחום ← לוקחים את העמוד.
- **עמוד 3 (page3):** נלקח בטעות עם ערימת ניירות לארכיון במרתף. הארכיון חשוך (נורה שרופה). פתרון: פנס משמעון בבית הדפוס (בלי סוללות) ← סוללות מהשלט של המקרן בחדר הישיבות ← משתמשים בסוללות על הפנס (flag flash_ok) ← משתמשים בפנס בארכיון (archive_lit) ← חנה נותנת חידה: ״הקלסר שמספרו כמספר האותיות באלף-בית״ ← לוחצים על קלסר 22 ← page3.
- **סיום:** 3 עמודים ← יוסי בחדר הגרפיקה מסדר (מיני-פאזל: לחיצה על העמודים בסדר א,ב,ג) ← item article ← שמעון בבית הדפוס: לוחצים על 3 כפתורי המכונה בסדר ירוק,צהוב,אדום (השלט הפוך — בדיחה) ← `G.win()`.

## ENGINE API (exact — see js/engine.js)
```js
registerRoom({ id, name, music, bg:(ctx,t)=>BG.xxx(ctx,t), walkY, minX, maxX,
  enter: async(from)=>{},          // optional, runs on room entry
  npcs: ()=>[{s:'cat',x:250,y:150,flip:false}],  // re-evaluated every frame — use flags for visibility
  front: (ctx,t)=>{},              // optional, drawn OVER player (foreground)
  hotspots:[{ name:'שם בעברית', x,y,w,h, wx:walkToX,
      look:'string OR async fn',   // string = player says it
      use: async()=>{...},         // omit use → click acts like look
      items:{ tuna: async()=>{...} },   // item used on hotspot
      visible: ()=>G.f.someFlag,   // optional
  }]
});
await G.say('rivka','טקסט');        // character ids: noam rivka gila dovi yossi hana shimon benny cat pigeon dog
const i = await G.choice(['אופציה א','אופציה ב']);  // returns index
await G.walk(x); G.go('lobby', spawnX);
G.add('tuna'); G.del('tuna'); G.has('tuna'); G.f.myFlag=true;
G.sfx('pickup|door|ok|no|talk|ding|meow|coo|buzz|win'); G.win();
```
Canvas 320x180. Player walks on y=walkY (150-160 typical). Cat/pigeon/dog say-lines: use G.say('cat','מיאו-או.') etc — animals "talk" in animal + subtitles humor.

## ITEMS (only these): coin, seeds, tuna, page1, page2, page3, flashlight, batteries, article, cookie
## FLAGS (only these): intro, knows_tuna, knows_pigeon, coin, got1, got2, got3, cat_fed, pigeon_gone, flash_ok, archive_lit, hana_quiz, article(item), press_step(0-3), won
Convention: when taking a page do BOTH `G.add('page1')` AND `G.f.got1=true` (flag survives after page is handed to yossi).

## ROOM GRAPH (door directions in each room's spec)
street ↔ lobby ↔ {office, newsroom, kitchen, archive(מדרגות למרתף)}
newsroom ↔ {design, meeting} · kitchen ↔ roof(סולם) · street ↔ print

## ART STYLE (backgrounds — see js/rooms/office_bg.js EXEMPLAR)
- File defines `BG.<id> = function(ctx,t){...}` — starts with `'use strict'; if(typeof BG==='undefined') var BG={};`
- Use ONLY helpers from js/art.js: A.px, A.dither, A.disc, A.bands, A.box, A.floorWood, A.floorTile, A.wall, A.window, A.door, A.shelf, A.table, A.plant, A.poster, A.lamp, A.text, A.skyline + raw ctx.fillRect. Colors from PAL only.
- Rich detail! 15+ distinct elements per room, animation via t (steam, blinking, curtains…), signs in Hebrew via A.text.
- Draw doors/objects at the EXACT rects given in the room spec below (hotspots depend on them).
- Floor/walk baseline is at the room's walkY. Wall meets floor ~y=140.

## SPRITES (see js/sprites_core.js EXEMPLAR = SPR.noam)
- File: `'use strict';` then `SPR.<id> = function(ctx,t,o){...}` — feet at (0,0), centered on x=0, face LEFT, height 34-42px (animals smaller: cat ~14px, pigeon ~10px, dog ~16px).
- Use SB.legs/SB.mouth/SB.bob helpers + A.px/A.disc + PAL.
- o.talk → animate mouth (SB.mouth). o.walk → legs walk. Idle bob.
- Modest dress: women (rivka: elegant + מטפחת purple; hana: elderly cardigan + hat; gila: young, ponytail, headset) ; men with kippah (dovi: press hat + notepad; yossi: beret + paint-stained apron; shimon: overalls + mustache + ink smudges; benny: cap + apron).

## MUSIC (see js/music/title.js EXEMPLAR; format docs in js/audio.js)
- File: `'use strict';` then `MUSIC.tracks.<id> = {bpm, ch:[...]}`.
- 3-4 channels: square lead, square/sawtooth harmony (quiet v≤0.08), triangle bass, noise drums.
- ALL channels must total the SAME number of beats (16/32/64). Keys: minor/freygish for warmth; each room distinct mood. v (volume): lead ≤0.14, bass ≤0.25, noise ≤0.07.

---

## ROOM SPECS (exact rects = contract between bg & logic files)

### lobby — הלובי (music:'lobby') walkY:158 minX:24 maxX:300
Hub. **Layout (use exactly):** street glass double-door x8-38 y70-142 (sign ״אותיות וילדים — כניסה״) · stairs DOWN to archive x44-74 y100-142 (dark opening, sign ״לארכיון ⬇״) · orange sofa x80-130 y118-148 (coin under cushions: use → if !f.coin: f.coin=true + G.add('coin') + funny line; else ״אין יותר מטבעות. רק פירורים היסטוריים.״) · reception desk x136-196 y104-146 with noticeboard x136-196 y30-70 above it (funny pinned notes) · gila npc STANDS at x=166 y=154 in front of desk (warm, chatty; hints: dovi shouts headlines all day, the sofa "swallows things") · kitchen arch x200-226 y70-142 (sign ״מטבחון״) · newsroom door x232-262 y72-142 (sign ״חדר כתבים״) · broken elevator x266-284 y60-142 (narrow, sign ״תיכף חוזר (מאז 1997)״ — use → escalating gags, never opens) · office door x288-316 y70-142 (sign ״עורכת ראשית״) · plant.
Exits: street door→G.go('street',270) · stairs→G.go('archive',60) · kitchen→G.go('kitchen',50) · newsroom→G.go('newsroom',50) · office→G.go('office',250).

### newsroom — חדר הכתבים (music:'newsroom') walkY:158 minX:24 maxX:300
**Layout (use exactly):** door to lobby x8-36 y72-142 · reporter desk #1 with old computer x44-114 y100-146 (green screen flickers with t) · meeting door x120-148 y72-142 (sign ״חדר ישיבות״) · reporter desk #2 x154-204 y100-146 · wall map above desk1 x50-100 y30-64 (״מפת הסקופים״) · window x162-202 y30-68 · typewriter on small table x206-234 y110-146 (״המוזיאון של דובי״) · big cabinet x240-290 y60-146 · cat npc x=262 y=152 visible while !f.cat_fed (sits guarding); page1 white corner peeking under cabinet x252-268 y146-152 visible while !f.got1 · dovi npc stands at x=180 y=154 · paper stacks near door · design door x292-316 y72-142 (sign ״גרפיקה״).
Logic: dovi talks ONLY in newspaper headlines (״ילד נכנס לחדר — ההמשך יסופר!״); conversation reveals cat loves tuna → f.knows_tuna=true · use page corner before cat_fed → cat blocks it (funny standoff) · items.tuna on cat → f.cat_fed=true, meow sfx, cat leaves (visible false) · use page corner after cat_fed → G.add('page1'), f.got1=true.
Exits: lobby(x8-36)→G.go('lobby',240) · meeting(x120-148)→G.go('meeting',50) · design(x292-316)→G.go('design',270).

### kitchen — המטבחון (music:'kitchen') walkY:158 minX:24 maxX:296
Elements: arch to lobby x8-36 y70-142 · fridge x50-84 y60-146 (magnet letters spelling ״חלב״+scattered — look gag; open → tuna: if !G.has('tuna')&&!G.f.cat_fed → G.add('tuna') + line about ״טונה של מרדכי — כתוב עליה בטוש״; else funny leftovers lines) · counter+sink x92-160 y104-146 (dripping tap animated; use → turn off, it starts again) · kettle x120-136 y96-104 steam · cookie jar x164-188 y96-110 on shelf unit x160-210 y88-146 (use → G.add('cookie') once, then ״אמא של מי אפתה את אלה? חידה.״) · corkboard ״תורנות שטיפת כלים״ x96-140 y36-72 (look: כולם מחקו את השם שלהם) · ladder to roof x260-300 y40-150 (wooden ladder + hatch, sign ״לגג — בזהירות!״) · small table+chairs x214-252 y110-150.
Exits: lobby arch→G.go('lobby',212) · ladder→G.go('roof',60).

### design — חדר הגרפיקה (music:'design') walkY:158 minX:24 maxX:300
Elements: door to newsroom x284-314 y72-142 · yossi npc x=120 y=154 (artist, dramatic about fonts: ״קומיק סאנס?! בעיתון שלי?!״) · giant screen/light-table x60-150 y50-120 showing the issue layout with hole (״כאן אמורה להיות הכתבה!!״) · pen tablet, color swatches wall x160-220 y30-80 (rainbow squares) · plotter/printer x230-274 y90-146 spitting a page (animated with t) · posters of old covers · coffee cups tower gag x60-80 y? small.
Logic: talk to yossi: if has page1+page2+page3 (all three in inventory) → assembly minipuzzle: G.choice on which page first — present shuffled options ['עמוד ב','עמוד א','עמוד ג'] style; must pick א,ב,ג order (3 questions; wrong → funny retry, kids-easy: each page has letter). On success: G.del pages, G.add('article'), yossi celebrates. If some pages missing → counts them, funny encouragement + hint. After article → ״מה אתה עוד עושה פה? לדפוס! רוץ!״
Exits: newsroom→G.go('newsroom',270).

### meeting — חדר הישיבות (music:'meeting') walkY:158 minX:24 maxX:300
Elements: door to newsroom x8-36 y72-142 · long table x70-230 y110-150 with chairs · whiteboard x90-170 y30-80 (doodles: cat drawing, ״רעיונות לגיליון: 1.דינוזאורים 2.עוד דינוזאורים״) · projector on table x180-206 y100-110 · REMOTE with batteries x210-226 y104-112 on table (use → G.add('batteries') + line ״המקרן ממילא מקרן רק שקופית אחת של חתול״; after: ״השלט כבר בכיס. המקרן מקרין חתול לנצח.״) · projected slide on wall x240-300 y40-100 (a pixel cat!) visible while… always, gag · water pitcher x100-116 y100-110 · cactus.
Exits: newsroom→G.go('newsroom',134).

### archive — הארכיון (music:'archive') walkY:158 minX:30 maxX:300
TWO STATES by G.f.archive_lit:
- Dark (!archive_lit): bg draws near-black + faint shapes + glowing eyes gag + stairs light from x8-40. hotspots: stairs up (→G.go('lobby',60)) · ״חושך״ hotspot covering room: look/use → ״חושך מצרים! אני צריך פנס.״ · items.flashlight on the dark: if !f.flash_ok → ״הפנס לא נדלק... צריך סוללות.״ else f.archive_lit=true + G.sfx('ding') + חנה מופיעה: ״אה! אור! סוף סוף רואים משהו!״
- Lit: warm basement, shelves x100-300 y40-146 with numbered binders (draw numbers with A.text: scatter 14,18,22,31…; binder 22 at x196-216 y88-110 blue) · hana npc x=70 y=154 (elderly, sweet, remembers EVERYTHING: ״גיליון 3, עמ׳ 7, כתם קפה בצורת ברווז״) · talk: she saw a page in the ניירות שהגיעו; will tell where but loves quizzes → asks ״כמה אותיות יש באלף-בית העברי?״ choices ['22','26','אלף'] → 22 → f.hana_quiz=true, says its in binder ״כמו התשובה״; wrong → gentle funny retry · binder 22 hotspot (x196-216 y88-110): before hana_quiz → too many binders gag; after → G.add('page3'), f.got3=true, dust cloud line · other binders hotspot → funny old-issues lines · dusty box, old lightbulb.
Exits: stairs x8-40 y90-146 →G.go('lobby',60).

### roof — הגג (music:'roof') walkY:150 minX:30 maxX:290
Open sky! bands sunset-warm, A.skyline at y=120 behind parapet y=120-180 front. Elements: hatch/ladder down x40-70 y120-150 · pigeon coop x200-260 y80-120 on legs, nest with white page visible x216-244 y96-108 (!f.got2) · pigeon npc x=228 y=96 while !f.pigeon_gone · antennas, solar water heater (דוד שמש) x100-150 y90-120 gag ״גם הוא לא מבין איך הוא עובד״ · clothesline with socks x150-200 y60-80 animated wave · potted herbs.
Logic: use nest before pigeon_gone → pigeon defends (coo! funny standoff, ״נחום מסתכל עליי כמו על עוגת שבת״) · items.seeds on pigeon/nest → f.pigeon_gone=true (pigeon flies off — visible false), then use nest → G.add('page2'), f.got2=true (page has a small feather attached, line) · items.cookie on pigeon → he's insulted, ״יונים לא אוכלות עוגיות, זה מזון של סבתות וילדים״.
Exits: hatch →G.go('kitchen',270).

### street — הרחוב (music:'street') walkY:160 minX:20 maxX:306
Daytime street. Elements: building entrance RIGHT x260-310 y60-150 (glass doors + big sign ״אותיות וילדים״ + step) · kiosk CENTER x120-200 y70-150 (colorful awning stripes, candy jars, newspapers rack showing ״אותיות וילדים״!) · benny npc x=150 y=156 behind/at kiosk (jolly, tells jokes, sells seeds: use kiosk/talk → if f.coin&&!G.has('seeds')&&!f.pigeon_gone → buy: G.del('coin'), G.add('seeds') + joke; no coin → ״בהקפה אני רושם רק לראש הממשלה, ורק כי הוא לא בא אף פעם״) · dog npc x=90 y=160 (look/use → wags, ״הכלב הזה מחכה לעיתון של מחר. אופטימי.״ bark gag) · print house door LEFT x14-48 y70-150 (industrial door, sign ״דפוס ׳האות והמופת׳״) · tree x60-80 · fire hydrant · bus stop sign x220-240 (look: לוח זמנים מ-1994) · sky + clouds animated + sun.
Exits: entrance→G.go('lobby',30) · print door→G.go('print',270).

### print — בית הדפוס (music:'print') walkY:158 minX:24 maxX:300
Elements: door to street x288-316 y72-142 · HUGE press machine x40-200 y40-146 (rollers, gears animated with t, paper path) · 3 big buttons ON machine: green x84-100 y100-116, yellow x120-136 y100-116, red x156-172 y100-116 · instructions sign UPSIDE-DOWN x208-236 y40-80 (look: ״ההוראות הפוכות. כתוב: ׳קורא יקר, אם אתה מצליח לקרוא את זה — אתה תלוי מהתקרה׳.״) · shimon npc x=240 y=154 (mustache, shouts over machine noise: ״מה?? דבר חזק!! המכונה!!״) · paper rolls x250-290 y100-146 · ink barrels · pigeon poster gag.
Logic: talk shimon: if !G.has('flashlight')&&!f.flash_ok&&!f.got3 → he lends flashlight (G.add('flashlight'), warns no batteries, ״הסוללות נגמרו ב-2019, זמנים טובים״) · if G.has('article') → START THE PRESS sequence: shimon: ״לוחצים ירוק, צהוב, אדום! או שזה אדום, צהוב, ירוק? השלט הפוך!״ → buttons clickable: correct order green→yellow→red tracked with G.f.press_step (wrong press → funny buzz + reset, machine sneezes) → on red completing: big celebration, machine runs, G.del('article'), await lines, G.win() · buttons before article → shimon panics ״אל תיגע!! זה לא צעצוע!! טוב, זה קצת צעצוע. אבל אל תיגע!״
Exits: street→G.go('street',40).

---

## MUSIC TRACK BRIEFS
title(done) · office: bustling-worried klezmer 120bpm Am · lobby: friendly bossa-ish 104 C · newsroom: typewriter-rhythm busy 132 Dm (noise as typing!) · kitchen: cozy waltz-feel 96 F (3/4: totals multiple of 3) · design: cool synthy 116 Em · meeting: sneaky-quiet 100 Gm · archive: mysterious low 84 Cm (sparse, echoey feel via long notes) · roof: airy open 112 D freygish · street: sunny happy 126 G · print: mechanical driving 140 Cm (machine rhythm) · finale: triumphant march 132 C→ big.

## SPRITE BRIEFS (all face LEFT, feet at 0,0)
rivka: purple blazer, teal מטפחת, glasses, papers in hand, height ~40 · gila: pink top, headset w/ mic, ponytail, ~38 · dovi: brown vest, white press-hat w/ card, notepad+pencil, kippah, ~40 · yossi: black beret, blue apron w/ paint dots, kippah, ~38 · hana: long gray cardigan, round glasses, sun hat, small ~34, maybe cane · shimon: blue overalls, red shirt, big mustache, ink smudges, kippah, burly ~42 · benny: green cap, striped apron, round belly, ~40 · cat (מרדכי): orange tabby, smug, tail sways with t, sitting pose, ~14 tall · pigeon (נחום): gray, head bobs with t, ~10 · dog: small brown-white, tail wag, tongue, ~16.
