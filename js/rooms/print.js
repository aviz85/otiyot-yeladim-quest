/* print.js — בית הדפוס ״האות והמופת״ (room logic)
   Layout contract per DESIGN.md ### print. Shimon shouts over the machine.
   Final puzzle: green→yellow→red buttons (the instructions are upside-down).
*/
'use strict';

/* ---- the press-button sequence (green → yellow → red) ---- */
const PRINT_pressButton = async (color)=>{
  const f=G.f;
  if(f.won){
    await G.say('noam','המכונה כבר עשתה את שלה היום. עכשיו היא נחה. מגיע לה.');
    return;
  }
  if(!G.has('article')){
    G.sfx('no');
    await G.say('shimon','אל תיגע!! זה לא צעצוע!! טוב, זה קצת צעצוע. אבל אל תיגע!');
    await G.say('noam','כפתורים גדולים וצבעוניים ואסור ללחוץ. זה המבחן הכי קשה בחיים שלי.');
    return;
  }
  if(f.press_step===undefined){
    await G.say('shimon','רגע רגע!! קודם הוראות!! לוחצים ירוק, צהוב, אדום! או שזה אדום, צהוב, ירוק? השלט הפוך!');
    await G.say('noam','נלך על ירוק, צהוב, אדום. כמו רמזור, רק במצב רוח טוב.');
    f.press_step=0;
  }
  const order=['green','yellow','red'];
  if(color===order[f.press_step]){
    f.press_step++;
    if(f.press_step===1){
      G.sfx('ok');
      await G.say('shimon','ירוק!! יפה מאוד!! המכונה מתחממת!!');
    } else if(f.press_step===2){
      G.sfx('ok');
      await G.say('shimon','צהוב!! הגלגלים מסתובבים!! אל תעצור עכשיו!!');
      await G.say('noam','הרצפה רועדת! או שזה אני. לא, זו הרצפה.');
    } else {
      /* red — the machine starts! */
      G.sfx('ok');
      await G.say('shimon','אדום!!! זהו!!! תתרחק, היא יוצאת לדרך!!!');
      await G.say('noam','המכונה שואגת! הנייר טס! השפם של שמעון מתנופף ברוח!');
      G.del('article');
      await G.say('shimon','הכתבה נכנסת!! הדיו עף!! ריח של עיתון טרי — אין ריח יפה מזה בעולם!!');
      await G.say('noam','הגיליון החגיגי מודפס!! הספקנו לפני שש!!');
      await G.say('shimon','רוץ להגיד לרבקה!! בעצם אין צורך!! היא שומעת את המכונה עד הלובי!! כולם שומעים!! גם בירושלים שומעים!!');
      await G.say('noam','ריאיון עם ש. גיבורי, שלושה עמודים, אפס חתולים על הנייר. יום ״קורא צעיר במערכת״ הכי טוב אי פעם.');
      G.win(); /* sets f.won, plays win sfx, shows finale */
    }
  } else {
    G.sfx('buzz');
    f.press_step=0;
    await G.say('shimon','לאאא!! לא בסדר הזה!! המכונה נעלבת!!');
    await G.say('noam','המכונה עשתה ״אפצ׳י!״ וירקה עליי דף ריק. מתחילים מההתחלה: ירוק, צהוב, אדום.');
  }
};

registerRoom({
  id:'print',
  name:'בית הדפוס ״האות והמופת״',
  music:'print',
  bg:(ctx,t)=>BG.print(ctx,t),
  walkY:158, minX:24, maxX:300,

  npcs:()=>[{s:'shimon', x:240, y:154, flip:false}],

  hotspots:[

    /* ---- the huge press machine (buttons come AFTER so they win the overlap) ---- */
    {name:'מכונת הדפוס', x:40,y:40,w:160,h:106, wx:120,
      look:'מכונת הדפוס ״האות והמופת״. גדולה כמו פיל, רועשת כמו שני פילים, ומדפיסה יפה יותר משלושתם.',
      use: async()=>{
        if(G.f.won){ await G.say('noam','היא סיימה את העבודה של היום. אני כמעט בטוח ששמעתי אותה נוחרת.'); return; }
        if(G.has('article')){
          await G.say('noam','הכתבה מוכנה — עכשיו רק צריך ללחוץ על הכפתורים בסדר הנכון.');
        } else {
          await G.say('noam','גלגלים, ידיות, נייר שרץ מפה לשם... מכונה שמייצרת עיתונים. כמו קוסם, רק עם דיו.');
          await G.say('shimon','אל תיגע!! זה לא צעצוע!! טוב, זה קצת צעצוע. אבל אל תיגע!');
        }
      },
      items:{
        article: async()=>{
          await G.say('shimon','את הכתבה לא דוחפים ביד!! ככה איבדנו את גיליון פורים של 2003!!');
          await G.say('shimon','לוחצים על הכפתורים!! ירוק, צהוב, אדום!! או הפוך!! השלט הפוך!!');
          if(G.f.press_step===undefined) G.f.press_step=0;
          await G.say('noam','ירוק, צהוב, אדום. הבנתי. אני מקווה.');
        },
        page1: async()=>{ await G.say('shimon','עמוד בודד?! קודם יוסי מהגרפיקה מסדר!! מכונה בלי סדר זה בלגן עם רעש!!'); },
        page2: async()=>{ await G.say('shimon','עמוד בודד?! קודם יוסי מהגרפיקה מסדר!! מכונה בלי סדר זה בלגן עם רעש!!'); },
        page3: async()=>{ await G.say('shimon','עמוד בודד?! קודם יוסי מהגרפיקה מסדר!! מכונה בלי סדר זה בלגן עם רעש!!'); },
        flashlight: async()=>{ await G.say('noam','להאיר על המכונה? היא מספיק כוכבת גם בלי זרקור.'); },
      }},

    /* ---- three big buttons ---- */
    {name:'כפתור ירוק', x:84,y:100,w:16,h:16, wx:92,
      look:'כפתור ירוק גדול ומזמין. כפתורים ירוקים תמיד נראים כאילו מותר ללחוץ עליהם. זו בדיוק המלכודת.',
      use: async()=>{ await PRINT_pressButton('green'); }},

    {name:'כפתור צהוב', x:120,y:100,w:16,h:16, wx:128,
      look:'כפתור צהוב. לא ״כן״, לא ״לא״ — כפתור של ״אולי״.',
      use: async()=>{ await PRINT_pressButton('yellow'); }},

    {name:'כפתור אדום', x:156,y:100,w:16,h:16, wx:164,
      look:'כפתור אדום ענק. בסרטים תמיד אומרים לא ללחוץ עליו. אנחנו לא בסרט. אני חושב.',
      use: async()=>{ await PRINT_pressButton('red'); }},

    /* ---- upside-down instructions sign ---- */
    {name:'שלט הוראות', x:208,y:40,w:28,h:40, wx:222,
      look:'ההוראות הפוכות. כתוב: ׳קורא יקר, אם אתה מצליח לקרוא את זה — אתה תלוי מהתקרה׳.',
      use: async()=>{
        await G.say('noam','ניסיתי לעמוד על הידיים כדי לקרוא. עכשיו גם אני הפוך וגם ההוראות הפוכות. מתמטיקה: עדיין הפוך.');
        await G.say('shimon','תעזוב את השלט!! ככה קיבלתי אותו וככה הוא יישאר!! זו מסורת!!');
      }},

    /* ---- ink barrels ---- */
    {name:'חביות דיו', x:202,y:112,w:22,h:34, wx:212,
      look:'חביות של דיו שחור. שמעון טוען שזה הריח הכי טוב בעולם, מיד אחרי חלה טרייה.',
      use: async()=>{
        await G.say('noam','אני לא נוגע. כתם דיו לא יורד גם אחרי שלוש מקלחות ושתי סבתות עם מגבת.');
      }},

    /* ---- pigeon poster gag ---- */
    {name:'פוסטר יונה', x:244,y:36,w:40,h:28, wx:258,
      look:'פוסטר עתיק: יונת דואר עם הכיתוב ״המשלוח הכי מהיר בעיר!״. מישהו הוסיף בעט: ״נחום, תחזיר את העמוד.״',
      use: async()=>{
        await G.say('noam','יונת דואר. פעם היונים עבדו בתקשורת. היום הן רק גונבות כתבות.');
      }},

    /* ---- paper rolls ---- */
    {name:'גלילי נייר', x:250,y:100,w:40,h:46, wx:264,
      look:'גלילי נייר ענקיים. מספיק נייר לכל המילים בעולם, ועוד יישאר מקום לציורים של דינוזאורים.',
      use: async()=>{
        await G.say('noam','ניסיתי לגלגל אחד. הוא ניצח אחת-אפס. יש לו ניסיון.');
      }},

    /* ---- shimon (after paper rolls so he wins the overlap) ---- */
    {name:'שמעון הדפָּס', x:228,y:110,w:24,h:46, wx:216,
      look:'שמעון. שפם שאפשר לתלות עליו כביסה, וכתמי דיו שמספרים את כל ההיסטוריה של העיתון.',
      use: async()=>{
        const f=G.f;
        if(f.won){
          await G.say('shimon','הגיליון בחוץ!! אתה גיבור, ילד!! כמעט כמו המכונה!!');
          return;
        }
        if(G.has('article')){
          if(f.press_step!==undefined){
            await G.say('shimon','ירוק!! צהוב!! אדום!! או הפוך!! אני מאמין בך!! בערך!!');
            return;
          }
          await G.say('shimon','מה?? דבר חזק!! המכונה!!');
          await G.say('noam','הכתבה!! מצאתי את הכתבה!! יוסי סידר אותה!! אפשר להדפיס!!');
          await G.say('shimon','הכתבה?!! ברוך השם!! מהר, לפני שהיא נעלמת שוב!!');
          await G.say('shimon','מפעילים ככה: לוחצים ירוק, צהוב, אדום! או שזה אדום, צהוב, ירוק? השלט הפוך!');
          const c=await G.choice(['אז למה אתה לא הופך את השלט?','ירוק, צהוב, אדום. סומך עליך!']);
          if(c===0){
            await G.say('shimon','הפכתי פעם!! ואז ההוראות של המקרר התהפכו!! זה שלט עם אופי!!');
            await G.say('noam','...אני פשוט אלחץ ירוק, צהוב, אדום ונקווה לטוב.');
          } else {
            await G.say('shimon','גם אני סומך עליי!! בערך!! שבעים אחוז!!');
          }
          f.press_step=0;
          await G.say('shimon','קדימה!! הכפתורים על המכונה!! והדדליין בשש!!');
          return;
        }
        if(!G.has('flashlight') && !f.flash_ok && !f.got3){
          await G.say('shimon','מה?? דבר חזק!! המכונה!!');
          await G.say('noam','שלום!! אני נעם!! מחפש עמודים מהכתבה שנעלמה מהמערכת!!');
          await G.say('shimon','נעלמה?! אצלי לא נעלם כלום מאז 1987!! וגם אז זה היה רק כריך!! אני עדיין חושד בגלגלת!!');
          const c=await G.choice(['אולי עמוד הגיע אליך לדפוס?','למה אתה צועק?']);
          if(c===0){
            await G.say('shimon','לא הגיע כלום!! רק שמעתי שרבקה שלחה ערימת ניירות לארכיון!! במרתף!! חושך שם כמו בתוך בקבוק דיו!!');
          } else {
            await G.say('shimon','אני לא צועק!! המכונה רועשת!!');
            await G.say('noam','המכונה... כבויה עכשיו.');
            await G.say('shimon','(בשקט) באמת? וואו. שקט. מוזר לי. (חוזר לצעוק) בכל מקרה!! ניירות של רבקה ירדו לארכיון!! במרתף!! חושך מצרים שם!!');
          }
          await G.say('noam','חושך? אז אני צריך פנס...');
          await G.say('shimon','קח את הפנס שלי!! מתנה!! רק אזהרה קטנה — הסוללות נגמרו ב-2019. זמנים טובים.');
          G.add('flashlight');
          await G.say('noam','פנס בלי סוללות. זה כמו עיתון בלי אותיות.');
          await G.say('shimon','בדיוק!! ואם תמצא סוללות — הן תמיד מתחבאות בשלטים שאף אחד לא באמת צריך!!');
          return;
        }
        if(G.has('flashlight') && !f.flash_ok){
          if(G.has('batteries')){
            await G.say('shimon','רגע!! יש לך סוללות ביד!! תן לי, יש לי אצבעות של מכונאי!!');
            await G.say('noam','...אלה אצבעות מלאות דיו.');
            await G.say('shimon','אצבעות מקצועיות!! הופ!! פנימה!! ו... יש אור!!');
            G.del('batteries');
            G.f.flash_ok=true;
            G.sfx('ding');
            await G.say('noam','הפנס עובד! עכשיו לארכיון — לחושך של המרתף!');
            return;
          }
          await G.say('shimon','מה?? מצאת סוללות?? עוד לא?? תחפש בשלטים!! סוללות אוהבות שלטים של מקרנים שתקועים על תמונה אחת של חתול!!');
          await G.say('noam','...זה רמז מוזר ומדויק להפליא. תודה, שמעון!');
          return;
        }
        /* default: mid-quest encouragement, state-aware */
        const n=(f.got1?1:0)+(f.got2?1:0)+(f.got3?1:0);
        if(n===3){
          await G.say('shimon','שלושה עמודים אצלך?! אז מה אתה עומד?! ליוסי!! גרפיקה!! שיסדר אותם ותחזור אליי בריצה!!');
          await G.say('noam','רץ!! (בקצב של הליכה מהירה. אבל בלב — ריצה.)');
        } else if(n>0){
          await G.say('shimon', (n===1?'עמוד אחד':'שניים') + ' מתוך שלושה?! יופי!! המכונה מחכה!! היא לא סבלנית אבל היא מחכה!!');
          await G.say('noam','גם אני לא סבלני. אנחנו מסתדרים מצוין.');
        } else {
          await G.say('shimon','נו?? העמודים?? השעון מתקתק!! בעצם זו המכונה מתקתקת!! אבל גם השעון!!');
          await G.say('noam','אני על זה!! חתול, יונה וארכיון — ברשימה שלי!!');
        }
      },
      items:{
        batteries: async()=>{
          if(G.f.flash_ok){ await G.say('shimon','כבר יש סוללות בפנס!! מה אתה רוצה, פנס עם ארבע סוללות?! זה כבר פרוז׳קטור!!'); return; }
          if(!G.has('flashlight')){ await G.say('shimon','סוללות בלי פנס זה כמו דיו בלי נייר!! יפה, אבל חסר טעם!!'); return; }
          await G.say('shimon','סוללות!! תן לי, יש לי אצבעות של מכונאי!! הופ!! פנימה!! ו... יש אור!!');
          G.del('batteries');
          G.f.flash_ok=true;
          G.sfx('ding');
          await G.say('noam','הפנס עובד! שמעון, אתה גדול!');
          await G.say('shimon','אני יודע!! עכשיו למרתף!! ותגיד שלום לחנה!!');
        },
        flashlight: async()=>{
          if(!G.f.flash_ok) await G.say('shimon','להחזיר?? בלי סוללות הוא ממילא רק מקל כבד!! לך תמצא סוללות!!');
          else await G.say('shimon','עובד?? יופי!! תשאיר אצלך למזכרת מהדפוס!! רק אל תאיר לי בעיניים!!');
        },
        cookie: async()=>{
          await G.say('shimon','עוגייה?! תודה, ילד!! אבל הידיים שלי מלאות דיו!! עוגייה בטעם דיו זה לא מאכל, זו טעות!!');
          await G.say('noam','אשמור אותה. אולי מישהו בדרך יעריך אותה יותר.');
        },
        tuna: async()=>{
          await G.say('shimon','טונה?! זו הטונה של מרדכי!! כתוב עליה בטוש!! אני לא מתעסק עם החתול הזה, יש לו עורך דין!!');
        },
        article: async()=>{
          await G.say('shimon','הכתבה!! אל תיתן לי אותה ביד — הדיו שלי יהפוך אותה לכתבה בשחור על שחור!! לכפתורים!!');
          if(G.f.press_step===undefined) G.f.press_step=0;
        },
        page1: async()=>{ await G.say('shimon','עמוד בודד?! קודם יוסי מהגרפיקה מסדר!! מכונה בלי סדר זה בלגן עם רעש!!'); },
        page2: async()=>{ await G.say('shimon','עמוד בודד?! קודם יוסי מהגרפיקה מסדר!! מכונה בלי סדר זה בלגן עם רעש!!'); },
        page3: async()=>{ await G.say('shimon','עמוד בודד?! קודם יוסי מהגרפיקה מסדר!! מכונה בלי סדר זה בלגן עם רעש!!'); },
      }},

    /* ---- door back to street ---- */
    {name:'דלת לרחוב', x:288,y:72,w:28,h:70, wx:292,
      look:'הדלת חזרה לרחוב. מבעד לזכוכית רואים את בני מנופף. או מגרש זבוב. קשה לדעת.',
      use: async()=>{ G.go('street',40); }},
  ],
});
