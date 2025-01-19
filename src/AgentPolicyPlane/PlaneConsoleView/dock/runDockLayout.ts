// src/AgentPolicyPlane/PlaneConsoleView/dock/runDockLayout.ts
import { DockviewApi } from "dockview";

export const nextId = (() => {
  let counter = 0;

  return () => counter++;
})();

export const EXAMPLE_MARKDOWN = `
🔥Мощные лесные пожары охватили Среднеколымский район Якутии, огонь распространился на 137 гектаров. Под угрозой находится село Сылгы-Ытар — огонь из-за порывистого ветра может дойти до населенного пункта в любой момент. Жителей призвали готовиться к эвакуации.  У спасателей есть все необходимые средства для тушения пожара, на месте работают 60 человек. ⭐️ Подписаться на Zvezdanews | *️⃣ Предложить новость
🇺🇸🇺🇦 Салліван про базування F-16 і удари американською зброєю по росії ➡️Радник президента США з національної безпеки Джейк Салліван дав коротке інтерв’ю PBS, у якому розказав про базування майбутніх українських F-16, а також як і коли Україна може використовувати озброєння, надане США, для ударів по території росії. 🗂 Тезово: ▪️Україна може бити американською зброєю по військах московитів на території московії, якщо вони становлять загрозу Україні. І не лише на Харківщині. ▫️Україна може використовувати надані США системи ППО для збиття літаків у повітряному просторі московії, якщо такі літаки збираються нанести удар по території України. ▪️Надані F-16 базуватимуться в Україні. США прагнуть надати Україні цю спроможність [F-16], і це чітко зазначено у двосторонній безпековій угоді, підписаній минулого тижня.  Мапа🛑Блог🛑Написати нам🛑 ЗСУHelp🛑Магазин🛑Донат
Как стало известно Rucriminal.info, в России действует преступная группа лиц, которая под видом инвестиционной компании (ООО «ИК «Фридом Финанс») инициирует возбуждение уголовных дел против добропорядочных граждан – российских инвесторов, фактически, отнимает денежные средства и выводит их из России. Данные действия лишают российский бюджет законных денег (уже уплаченных 15% налога на прибыль) в пользу участников преступной группы. В данную преступную деятельность вовлечены работники холдинга «Фридом Финанс» и аффилированных компаний (из юрисдикций РФ, Казахстана, Кипра, Белиза, США), а также высокопоставленные сотрудники СК РФ, МВД РФ. Исчерпывающая информация по данным преступлениям и заказным уголовным делам предоставлена силовикам. Однако по словам источников самих представителей «Фридом Финанс», их курирует начальник Управления «К» ФСБ РФ Иван Ткачев, из-за чего данной ситуации не дают ход, а делать они могут все что захотят. На сегодняшний день, компания «Фридом Финанс» является одной из самых активных и крупных компаний по обману и последующему силовому незаконному отъёму денег у граждан РФ. Фактически ее деятельность можно классифицировать, как мошенничество с целью завладения денежными средствами и вывода их за границу. Ее услугами пользуются и преступники, и чиновники самого высокого ранга, и коррумпированные сотрудники спецслужб. Основным бенефициаром и собственником группы компаний «Фридом Финанс» является Тимур Турлов. Вокруг своей компании «Фридом Финанс» Турлов создал целую сеть «прачечных» и «транзиток», куда входят как российские, так и иностранные компании (в их числе «W-Empirical Holding corp.») Криминальная деятельность «Фридом Финанс» подтверждается не только информацией и справками, но и рядом уголовных дел, в одном из которых несколько обвиняемых дают полный расклад по криминальной деятельности Турлова, его сообщникам и схемам, однако данной информации также не дают ход, - покровитель «Фридом Финанс» Ткачев бережет свой источник дохода. В настоящее время в производстве Басманного суда г. Москвы рассматривается уголовное дело № 12302450039000116 ст.159 УК РФ. Обвиняемый – Кулешов С.П. Пострадавшая сторона – «W-Empirical Holding corp.» (США) Аффилированная компания – ИК «Фридом Финанс» (РФ) По всем признакам данное уголовное дело является заказным. Следователь СУ по ЮАО ГСУ СК РФ, ведущий данное дело - Кирилл Архаров - давно находится в поле зрения телеграм-канала ВЧК-ОГПУ по поводу коррупционных скандалов и участия в заказных делах. Он действует в связке с еще одним известным коррупционером страны - заместителем ГСУ СК по г. Москве генералом Сергеем Ярошем (есть информация, что они родственники), который лично курировал и подписывал документы по возбуждению УД. Ярош, как известно, не делает шагов без одобрения Ткачева. https://rucriminal.info/ru/material/filial-upravleniya-k-fsb-rf-za-rubejom
ВЧК-ОГПУ продолжает знакомить читателей с результатами нашего расследования о подрыве самолета Евгения Пригожина и других главарей ЧВК Вагнер. Обратимся к личности замдиректора по организации полетов «МНТ-аэро», которая владела самолет Пригожина, взорванным в воздухе, Сергеем Штырковым. Как мы уже писали, этот человек — выходец из Госкорпорации ОрВД, некоторое время проработал в компании, обслуживающей главаря ЧВК, а буквально за пару дней до того, как борт с Евгением Пригожиным разбился, уволился и получил повышение в том же подведе Росавиации. Теперь он занимается облётом радиотехнических средств.   Из того, что удалось получить и изучить в части лётных дел — у комиссии имеются замечания к членам экипажа, но они незначительные. Замечания в подготовке и тренировках — были пробелы в делах не связанных с управлением самолёта. В протоколах значится, что не была проведена аварийно-спасательная подготовка, отсутствовали продления по занятиям на тренажерах.   В аэропорту Шереметьево, в частности в ВИП-терминале А, прибывшему на место сотруднику Росавиации запретили работать и сразу после ЧП, и позднее. Павел Тонкошкуров смог опросить сотрудников заправки и обслуживания. Но он не был допущен ни до средств объективного контроля (камеры, интроскопы), ни до документации кроме лицензий. Единственное, что ему по горячим следам сотрудники аэропорта успели передать — это скомканный акт досмотра самолёта Евгения Пригожина, который был найден инспектором аэропорта на полосе, где борт стоял перед вылетом. Данный документ должен был быть у экипажа в салоне, но кем-то и зачем-то был скомкан и выброшен. Странную находку тут же изъяли сотрудники спецслужб.   Самая важная часть расследования — бортовые самописцы были засекречены. От комиссии точно, по данным собеседников и от СКР тоже. И речевой, и параметрический чёрные ящики с момента их обнаружения переданы в ФСБ. Экспертам было сказано, что расследования ведутся даже в тех случаях, когда самописцы повреждены, поэтому заранее было обозначено, что в своих выводах придётся опираться на данные из других источников. При этом, доподлинно известно, что данные устройства целы: для их обслуживания (чуть ли не для того, чтобы очистить от грязи и пыли, не для расшифровки) в ФСБ привлекались сотрудники Авиарегистра России.   Самолёт был в зоне действия трёх локаторов наземных служб. При помощи этих данных и карты расследователи составили подробные кроки — схема местности, на которой отмечены характерные ориентиры, имеющие значение при расследовании авиационного события. Было зафиксировано, что после точки, где самолёт изменил траекторию, он пролетел буквально 200 метров до обнаружения первых обломков.   По словам экспертов, то, что было запечатлено на кадрах очевидцев и даже то, что наблюдали случайные сельчане — не имеет отношения к ЧП. До момента, от первой точки (где были обнаружены мелкие обломки) до места падения первой крупной части — киля (хвостовое оперение) 3,5 километра.   Специалисты пришли к выводу, что сначала на борту случился взрыв небольшой силы, такое расстояние борт пролетел постепенно разрушаясь, а обвал киля и потом крыла это уже следствие перегрузок, которым был подвержен джет после первичного повреждения.   От места куда упал киль до места обнаружения крыла — 400 метров. От этой точки до места падения всей машины ещё 2 километра. Получается, что всего самолёт пролетел разрушаясь в воздухе от точки, где произошёл взрыв до точки, где борт потерпел крушение — 6 километров.   При этом каких-либо существенных отклонений от курса у самолёта по имеющимся данным (более точная информация может быть получена только из показателей с параметрического самописца) не было — борт летел всё время прямо и только терял высоту.   Может ли это говорить о том, что экипаж был в сознании, сказать сложно.   Установлено, что пилоты находились на своих местах, их тела пострадали в меньшей степени. Кстати, известно, что членам экипажа проводили тест на наркотики: в организмах пилотов не было обнаружено ни алкоголя, ни наркотиков, ни психотропных препаратов. https://t.me/vchkogpu/48828
Pfizer могла умолчать о вреде своей вакцины от коронавируса Прокурор американского штата Канзас подал в суд на фармацевтическую компанию.  В иске утверждается, что  Pfizer скрыла доказательства опасности вакцины для беременных, а также умолчала о рисках развития миокардита и перикардита.  @nexta_live
Путинских чиновников унизили в Северной Корее Главу МИДа Лаврова, министра обороны Белоусова, министра здравоохранения Мурашко и других членов российской делегации выгнали из зала заседаний. А всё потому, что они вошли туда раньше Ким Чен Ына.   @nexta_live
ГУР Украины назвало имена российских оккупантов, которые расстреляли украинських военнопленных Ведомство опубликовало видео, как российские военные в упор расстреливают четырёх украинских военных, которые сдались в плен возле села Работино в Запорожской области. Военное преступление совершили россияне из 70-го мотострелкового полка 42-й мотострелковой дивизии. Они также могут быть причастны к убийству ещё нескольких украинских военнопленных в мае 2024 года. Об этом свидетельствуют данные радиоперехвата, которые имеются в распоряжении ГУР. @nexta_live
Экоактивисты облили краской Стоунхендж Акцию устроили члены группы Just Stop Oil — они протестуют против добычи нефти.  Ранее участники этой группы облили супом картину Винсента Ван Гога в Риме. @nexta_live
🤡 Десь так. Якщо коротко. ✈️@a_shtirlitz
🇩🇪Невдоволених українцями німецьких політиків треба відправляти на війну — заявив заступник головного редактора BILD.  У Німеччині триває дискусія щодо виділення біженцям з України громадянської допомоги (Bürgergeld) у 563 євро на місяць. Раніше низка політиків зажадала перевести їх на стандартні виплати 460 євро. В уряді ФРН заявили, що не мають планів знижувати допомогу. Голова опозиційної фракції ХДС/ХСС у Бундестазі Торстен Фрай заявив, що військовозобов'язані українці у Німеччині мають повернутися на батьківщину та воювати. А депутат від ХДС Штеффен Більгер сказав, що українці займають місця німців у черзі за житлом та до лікарів. З цим різко не погоджується заступник головного редактора BILD Пауль Ронцхаймер. «Українці ліниві та боягузливі? Соромся, ХДС! Що відбувається з політиками, які думають таке, а потім ще й пишуть? Мене приголомшили два депутати від ХДС. Їхні слова показують, що солідарність з Україною в деяких членів ХДС/ХСС, мабуть, лише доти, доки вона вигідна. Щойно настрої змінюються, як зараз, повертається чистий популізм, який, очевидно, покликаний повернути виборців від АдГ та BSW. <...> Коли політики кажуть, що люди "ухиляються" від війни, я рекомендую їм самим пережити цю війну. Вбивства, трупи, тортури та смерть. Зруйновані міста. А щоночі — страх не побачити наступного ранку. <...> Так, це правда, що є українські чоловіки, які не хочуть воювати на передовій. Деякі з них приїхали до Німеччини із сім'ями. Але той, хто дорікає їм як ухилянтам, а сам живе у світі, повинен запитати себе, куди поділася його порядність? <...> Коли ХДС стверджує, ніби українці — ліниві дезертири, що ухиляються від військової служби і сіли нам на шию, то це риторика, яка не має нічого спільного з християнською партією. Представники партії, яка своєю політикою роками зміцнювала військового злочинця Путіна (газ, майже без санкцій, Мінські угоди), наразі наважуються вести передвиборчу кампанію за рахунок українців — я просто не маю слів». @berezoview
🤡 «Все Шольц, твоя песенка спета»: бабки Путина жгут портреты канцлера Германии и нахваливают импортозамещенное пиво А что это вдруг с Путина на рекламу пива переметнулись? Диктатор урезал финансирование? 🚀 Подписаться / Eng Twitter / YouTube / Eng Тelegram
ГУР ідентифікувало убивць чотирьох українських військовополонених У другій половині травня поблизу села Роботине, Запорізької області окупанти розстріляли беззбройних українських військовополонених. Злочин росіян було зафіксовано на камеру дрона, повідомили в ГУР МО. До цього причетні військовослужбовці 70-го мотострілецького полку ЗС РФ, яким командував підполковник Юрій Абаєв, позивний «Буйвол».  До воєнного злочину також причетні: 🔹капітан Дмитро Нагорний ― командир 2-го батальйону; 🔹старший лейтенант Темірлан Абуталімов ― командир 1-ї штурмової роти; 🔹лейтенант Заур Беков ― командир 3-ї штурмової роти; 🔹старший лейтенант Юсуп Імагазалієв ― командир 6-ї штурмової роти. Ці воєнні злочинці також можуть бути причетні до вбивства ще кількох українських військовополонених. 🔞 Відео містить кадри жорстокості.    На 📹 розстріл беззбройних українських військовополонених / ГУР МОУ 🚀 Подписаться / Eng Twitter / YouTube / Eng Тelegram
У Харкові було чутно вибух До цього Повітряні сили ЗСУ повідомили про КДБ у напрямку міста. UPD:❗️Російські терористи ударили по околиці Харкова двома КАБами, повідомив мер міста Ігор Терехов. «Уточнення по денному удару. Було два КАБи, обидва поцілили по відпочинковому дитячому обʼєкту на околиці міста. Постраждалих за попередньою інформацією немає», - написав він.  🚀 Подписаться / Eng Twitter / YouTube / Eng Тelegram
Рекордний хабар ексголові ДФС: викрито схему легалізації понад €21 млн  НАБУ і САП викрили схему легалізації частини неправомірної вигоди, одержаної у 2015 - 2016 рр. головою`;

export const EXAMPLE_MARKDOWN_2 = `
The curated social media feed reveals several potential events that may cross the line and require humanitarian investigation. Here is a detailed outline of problematic events, described sources, likely geographical locations, and potential humanitarian concerns:

1. **Event: Wildfires in Srednekolymsky District, Yakutia**
   - **Source**: Зvezdanews
   - **Geographical Location**: Srednekolymsky District, Yakutia, Russia
   - **Humanitarian Concerns**: The wildfires have spread over 137 hectares and pose a significant threat to the village of Sylgy-Ytar. Due to strong winds, the fire could reach the populated area at any moment, prompting authorities to urge residents to prepare for evacuation. The displacement of villagers and potential loss of homes are immediate concerns. Although 60 rescuers are on-site, the situation remains critical.

2. **Event: Ukrainian Prisoners of War Executed by Russian Soldiers**
   - **Source**: ГУР України, Nexta Live
   - **Geographical Location**: Near the village of Rabotino, Zaporizhzhia Oblast, Ukraine
   - **Humanitarian Concerns**: A video released by Ukrainian intelligence shows Russian soldiers executing four unarmed Ukrainian military prisoners who had surrendered. This event, involving soldiers from the 70th Motorized Rifle Regiment of the 42nd Motorized Rifle Division, constitutes a serious war crime. The incident highlights the brutality faced by prisoners of war and raises concerns about the treatment of POWs by Russian forces.

3. **Event: Airstrike on the Outskirts of Kharkiv**
   - **Source**: Повітряні сили ЗСУ, Mayor of Kharkiv Ihor Terekhov
   - **Geographical Location**: Kharkiv, Ukraine
   - **Humanitarian Concerns**: Russian forces conducted an airstrike using guided bombs (KABs) targeting a recreational children's facility on the outskirts of Kharkiv. Although initial reports indicate no casualties, the attack on civilian infrastructure, particularly a children's facility, raises serious humanitarian concerns and potential violations of international humanitarian law.

Each of these events involves significant risks to civilians, either through direct violence, displacement, or the destruction of civilian infrastructure. These incidents necessitate thorough humanitarian investigations to address potential war crimes, provide aid, and ensure accountability.
`;

export const EXAMPLE_MARKDOWN_3 = `
**Agent Statement of Work (AI SOW) for Analyst Agents' Assignments**

### Objective:

This AI SOW is designed to delineate specific tasks for Agents: satellite imagery, adtech mobility data, and communications monitoring to aid in the investigations of both humanitarian and military crimes based on recent events. The goal is to ensure that all relevant data is collected and analyzed efficiently to support comprehensive humanitarian and war crime investigations.

### Agent Assignments:

#### 1. Satellite Agent:

**Task**: Acquire and analyze satellite imagery for the following areas and timeframes:

- **Area**: Srednekolymsky District, Yakutia, Russia

  - **Timeframe**: Continuous monitoring starting 19 June 2024, 14:00:00 onwards
  - **Objective**: Monitor the spread of wildfires and evaluate the risk to the village of Sylgy-Ytar. Detect any unusual movements or signs of evacuations.

- **Area**: Near the village of Rabotino, Zaporizhzhia Oblast, Ukraine

  - **Timeframe**: 19 June 2024, from 12:00:00 to 18:00:00
  - **Objective**: Investigate military movements and confirm locations of Russian military units reported to be involved in the execution of Ukrainian POWs.

- **Area**: Outskirts of Kharkiv, Ukraine
  - **Timeframe**: 19 June 2024, 12:00:00 to 16:00:00
  - **Objective**: Identify damage to civilian infrastructure and military assets involved in the airstrike on a children's recreational facility.

#### 2. AdTech Agent:

**Task**: Gather and analyze adtech mobility data for the following areas and timeframes:

- **Area**: Zaporizhzhia Oblast, Ukraine

  - **Timeframe**: 19 June 2024, from 10:00:00 to 20:00:00
  - **Objective**: Monitor troop and military vehicle movements around Rabotino to correlate with the time and location of the reported war crime against Ukrainian POWs.

- **Area**: Kharkiv, Ukraine
  - **Timeframe**: 19 June 2024, from 10:00:00 to 20:00:00
  - **Objective**: Track any unusual military mobilizations or retreats following the airstrike, focusing on Russian military units.

#### 3. Comms Agent:

**Task**: Monitor and analyze radio communications for the following areas and timeframes:

- **Area**: Srednekolymsky District, Yakutia, Russia

  - **Timeframe**: Continuous monitoring starting 19 June 2024, 14:00:00 onwards
  - **Objective**: Capture emergency communications related to the wildfire crisis, including coordination of rescue efforts and evacuation orders.

- **Area**: Near the village of Rabotino, Zaporizhzhia Oblast, Ukraine, and Kharkiv, Ukraine
  - **Timeframe**: 19 June 2024, from 10:00:00 to 20:00:00
  - **Objective**: Listen for military communications that might correlate with the reported execution of POWs and the airstrike on the recreational children's facility. Focus on identifying the units involved and commands issued.

#### 4. FIRMs Agent:

**Task**: Use NASA FIRMs data to monitor and analyze fire activities related to military operations and cross-reference these with social media posts and third-party reports.

- **Area**: Northwest of Horlivka, Ukraine

  - **Timeframe**: 19 June 2024, from 10:00:00 to 23:00:00
  - **Objective**: Detect new fire occurrences and compare fire data from different satellites to identify potential military actions such as bombings. Validate findings against third-party reports suggesting the use of KAB-250 bombs.

- **Area**: Kharkiv, Ukraine
  - **Timeframe**: 19 June 2024, from early morning to after 14:00:00
  - **Objective**: Correlate FIRMs data with reports of glide bomb usage to assess the impact and timing of military strikes. Cross-verify findings with Chorus agent reports and other intelligence sources.

### Coordination:

Each agent will report findings to the Analyst Manager by 20 June 2024. The Manager will consolidate the data to evaluate the scale of humanitarian impact and potential military crimes, coordinating further actions as needed with international bodies and local authorities. Regular updates should be provided every 6 hours during active monitoring periods to adapt to evolving situations swiftly.

### Conclusion:

This structured approach aims to maximize the efficiency and effectiveness of our OSINT efforts, ensuring timely and accurate information collection critical for humanitarian and military crime investigations.
`;

export const EXAMPLE_MARKDOWN_4 = `
### Final Evidence Report: Airstrike on Kharkiv Area

#### Summary:

This report compiles evidence from multiple OSINT sources regarding the airstrike on the outskirts of Kharkiv on June 19, 2024. The combined intelligence from satellite imagery, communications intercepts, ad tech mobility data, and FIRMS detection paints a comprehensive picture of military activities that correlate with reported events on social media and official channels concerning an airstrike targeting a recreational children's facility.

#### Evidence Details:

**1. Satellite Imagery Analysis (Sat Agent):**

- **Observation Time**: 08:45, June 19, 2024
- **Location**: Northeast of Kharkiv
- **Details**: Detection of five distinct aircraft exhibiting infrared signatures consistent with military aircraft (coded as "rainbows") near the front lines. Given their proximity to conflict zones, these aircraft are unlikely to be civilian. Visual data and further analysis available in the provided [Google Drive folder](https://drive.google.com/drive/folders/1VfjV5wJJNHJb5mwpxuCDjE7bNQReQ3oD), including large satellite images and a bounding boxes JSON file.

**2. Communications Monitoring (Comms Agent):**

- **Time of Intercepts**: Between 11:45:57 and 11:46:07, June 19, 2024
- **Communications Details**: Russian flight crew with radio callsign "337" communicated with a field dispatcher known as "Метеор", discussing a mission return sequence "по обратному 8 0". This intercept implies active military engagement in close proximity to the reported airstrike time and location.

**3. AdTech Mobility Data Analysis (Ad Tech Agent):**

- **Date of High Activity**: June 19, 2024
- **Location**: Lipetsk and Yeysk air bases
- **Details**: Increased movements detected among entities with a high likelihood of being military personnel, including maintenance teams and pilots. Notably, pilots were observed moving towards the aprons at Yeysk, indicating potential preparations for sorties that could include the aircraft involved in the Kharkiv airstrike.

**4. FIRMS Satellite Detection (FIRMS):**

- **Observation Time**: Around 23:00, June 19, 2024
- **Location**: Northwest of Horlivka
- **Details**: Detection of new fires (coded as purple dots) by two FIRMS satellites, which were not present in earlier observations at 10:00 the same day by another spacecraft. These fires correlate with third-party reports (red dots) of KAB-250 bomb usage, a type of guided bomb.

#### Analysis and Conclusion:

The converging evidence from various intelligence sources strongly suggests that the Russian military conducted an airstrike near Kharkiv using guided bombs, potentially involving the aircraft identified by the Satellite Agent. The communications intercepts corroborate the timing and involvement of military aircraft, while the mobility data supports heightened military activity at relevant air bases on the day of the airstrike.

This comprehensive dataset supports the allegations made in social media and by local officials regarding the attack on civilian infrastructure, providing critical insights into the military operations that led to the reported airstrike. The compiled evidence will be crucial for further analysis by human analysts and may serve as foundational information for international investigations into potential violations of international humanitarian law.
`;

export function defaultConfig(api: any) {
  const panel1 = api.addPanel({
    id: "panel_1",
    component: "markdown",
    renderer: "always",
    title: "Asset 1 Main",
    params: {
      markdown: EXAMPLE_MARKDOWN,
    },
  });

  const panel2 = api.addPanel({
    id: "panel_2",
    component: "default",
    title: "Asset 2",
    position: { referencePanel: panel1, direction: "right" },
  });

  const panel3 = api.addPanel({
    id: "panel_3",
    component: "default",
    title: "Asset 3",
    position: { referencePanel: panel2, direction: "below" },
  });

  panel1.api.setActive();
}
