// ============================================================================
// 1. DOM ELEMENTS — Get references to all HTML elements
// ============================================================================
const tamilGrid = document.getElementById('tamilGrid');
const stageSlider = document.getElementById('stageSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderLabel = document.getElementById('sliderLabel');
const explanation = document.getElementById('explanation');
const stageSummary = document.getElementById('stageSummary');
const stageMilestones = document.getElementById('stageMilestones');

// ============================================================================
// 2. STAGES ARRAY — 17 stages total, ordered chronologically from Stage 1 to Stage 17
// Each stage represents one slider position range
// ============================================================================
const stages = [
  {
    label: 'தமிழ் எழுத்துகள் ஒரு பார்வை',
    note: `    தமிழ் இலக்கண நூல்களில் எழுத்து என்னும் சொல், மொழியில் வழங்கும் ஒலிகளைக் குறிக்கவும், அவ்வொலிகளுக்குறிய வரிவடிவத்தைக் குறிக்கவும் பயன்படுத்தப்பட்டுள்ளது. அவ்வகையில் 'அ' என்னும் எழுத்து ஒலிவடிவம், வரிவடிவம் இரண்டையும் குறித்து நிற்கின்றது.\n
    தமிழ் எழுத்துகளை தொல்காப்பியர் நன்கு பகுத்து ஆய்ந்து விளக்கியிருக்கிறார். தமிழ் மொழிக்கு இலக்கணம் எழுதியவர் என்பதைக்காட்டிலும், ஒரு மொழியியலாளர் என்ற பெயர் அவருக்கு பொருத்தமாக இருக்கும். தமிழ் நிலப்பரப்பின் பரந்துபட்ட மொழியியல் சிந்தனையின் நீட்சி இவர் எனலாம், அவ்வழியில் உங்களை தமிழின் எழுத்துக்கள் வழியே யப்பானிய மொழியின் அடிப்படை ஒலிகளுக்கு அழைத்துச்செல்வதே இக்கருவியின் நோக்கம். யப்பானிய வரி வடிவங்களை அடுத்தடுத்து கற்கலாம்.\n
    தமிழின் உயிர் 12, மெய் 18 சேர்ந்த 30 எழுத்துகளை முதல் எழுத்து என்கிறோம், உயிரும் மெய்யும் இணைந்து பிறக்கும் 216 எழுத்துகளை உயிர்மெய் என்கிறோம், 'ஃ' எனும் ஆய்தம்/தனியெழுத்து சேர்த்து மொத்த எழுத்துகள் 247 ஆகிறது (12+18+216+1=247). அவற்றைத்தான் இங்கே பார்க்கிறீர்கள்.`,
    summary: 'படிநிலை-1: தமிழின் மொத்த எழுத்துக்கள்.',
  },

  {
    label: 'நெடில் ஒலிகள்',
    note: `<b>    அ இ உ ஏ ஒ </b>
    மேல் உள்ள 5 உயிர் எழுத்துகளும் குறில் எனப்படும். இவற்றை உச்சரிக்கும் கால அளவு ஒரு மாத்திரையாகும். "மாத்திரை" என்பது கை நொடிப்பொழுது அல்லது கண் இமைப்பொழுது எனக் கூறலாம். யப்பானிய மொழியில் மாத்திரையை "மொரா" என்பர்.\n
    <b>ஆ ஈ ஊ ஏ ஐ ஓ ஔ</b>
    மேல் உள்ள 7  எழுத்துகளும் நெடில் எனப்படும். இவற்றை உச்சரிக்க இரண்டு மாத்திரை அளவு ஆகும்.\n
    இந்த நெடில்களில்  ஐ, ஔ ஆகிய இரண்டும் மொழியியலில் "கூட்டுயிர் (diphthongs) எனப்படும். இவை 'அய்', 'அவ்' என்றும் எழுதப்படும். பழந்தமிழில் 'அஇ', 'அஉ' என்றும் இவை எழுதப்பட்டன.\n
    இந்த 7 நெடில்களுக்கும் யப்பானிய மொழியில் தனி வரிவடிவம் இல்லை, குறில்களின் வரிவடிவங்களைக் கொண்டே நெடில்களை வரவழைக்கும் எளிமையானதொரு நெடுங்கணக்கு முறையை கையாளுகின்றனர்.\n
    அதாவது, 'கா' என்பதை 'கஅ' என்றும், 'கை' என்பதை 'கஇ' என்றும் எழுதிப் படிப்பதைப்போன்றது, காலப்போக்கில் தமிழும் யப்பானியமும் வெவ்வேறு வழியை தேர்வு செய்துவிட்டன.`,
    summary: 'படிநிலை-2: நெடில்கள் தேவையா?',
  },

  {
    label: 'நெடில் ஒலிகள் நீக்கம்',
    note: `    நெடில்களை குறில்களைக் கொண்டே எழுதமுடிவதால், இந்த அட்டவணையிலிருந்து நெடில்களை முற்றிலும் நீக்கியிருக்கிறோம்.\n
    கவனத்தில் கொள்ளுங்கள் நாம் நெடில்களின் வரிவடிவத்தைதான் இங்கிருந்து நீக்கியிருக்கிறோம். தமிழ் மொழி போலவே யப்பானிய மொழியிலும் நெடில்கள் இருக்கின்றன அவற்றை எழுதும் முறை சற்று வித்தியாசமானது. இது குறித்து பின்னர் விரிவாகப் பார்க்கலாம்.\n
    இப்போது, நீங்கள் "அ இ உ எ ஒ" என்பதை மட்டும் ஒரு பாட்டு போல படித்துபாருங்கள், க-வரிசை எல்லாம் தன்னியல்பாக உச்சரிப்பில் வரும். யப்பானிய குழந்தைகள் இப்படிதான் ஆரம்பிக்கின்றனர்.\n
    நிற்க, இவ்விடத்தில் "அ இ உ எ ஒ" எனும் உயிர் குறிலை மட்டும் பாடிப்பாருங்கள், மெய் வரிசைக் குறில்களை அடுத்தடுத்த நிலைகளில் செய்யலாம்.`,
    summary: 'படிநிலை-3: நெடில்கள் நீக்கம்.',
  },

  {
    label: 'இல்லா மெய்கள்',
    note: `    யப்பானிய மொழியில் சில உயிர் மெய் வரிசைகள் கிடையாது அவற்றைப் பறறி சுருக்காமாக கீழே:\n
    <b>ங், ஞ்: </b>
    இந்த 'ங்', 'ஞ்' வரிசையிலுள்ள எழுத்துகளை முதலாகக்கொண்டு எந்தச் சொல்லும் யப்பானிய மொழியில் இல்லை, இவை சொல்லின் இடையில் வரும்போது 'ன்' என்ற எழுத்தைக் கொண்டே யப்பானியர்கள் எழுதுவர். 'தங்கம்' என்பதை 'தன்கம்' என்றும், 'மஞ்சள்' என்பதை 'மன்சள்' என்றும் எழுதுவதைப் போல.\n
    <b>ட், ண்: </b>
    இந்த 'ட்', 'ண்' வரிசையிலுள்ள எந்த எழுத்துகளைக்கொண்டும் யப்பானிய மொழியில் சொற்கள் இல்லை.\n
    <b>ல்: </b>
    யப்பானிய மொழியில் 'ல்' ஒலி இல்லை என்பர், ஆனால் உண்மையில், 'ல்' மற்றும் 'ர்' இணைந்த ஒரு ஒலி உள்ளது, அதை 'ர்' வரிசையில் வைத்துள்ளனர், எனவே 'ல்' எனும் தனி வரிசை கிடையாது.  "ராமென்" என்று யப்பானியர் உச்சரிக்கையில் "லாமென்" என்று கேட்பதன் காரணம் இதுவே.\n
    <b>ழ், ள், ற்: </b>
    'ல்', 'ர்' இணைந்து 'ர்' வரிசையாக இருப்பதால் இந்த 'ழ்', 'ள்', 'ற்' வரிசைகள் யப்பானிய மொழியில் இல்லாமல் இருக்கிறது.\n`,
    summary: 'படிநிலை-4: எல்லா மெய்களும் தேவையா?.',
  },

  {
    label: 'அடிப்படை வரிசைகள்',
    note: `    தேவையற்ற உயிர் நெடில்கள் மற்றும் உயிர்மெய் வரிசை நீக்கியபின் இப்போது நீங்கள் பார்ப்பது யப்பானிய மொழியின் அடிப்படை அட்டவணை.\n
    ஆனால் இவை இறுதியான ஒலி அட்டவணை என்று அர்த்தமாகாது, இன்னும் சில மாற்றங்கள் இருக்கின்றன. தமிழ் மொழி போலவே யப்பானிய மொழியும் சில உச்சரிப்பு மாற்றங்களை அடைந்திருக்கிறது அவற்றை அடுத்துவரும் படிநிலைகளில் சுருக்கமாகக் காணலாம்.\n
    இப்போது, நீங்கள் "க ச த ந ப ம ய ர வ ன" என்ற வரிசையை படித்துப் பாருங்கள், ஆனால் முன்னர் "அ இ உ எ ஒ" என்பதை ஒரு பாட்டு போல படித்துப் பார்க்க வேண்டாம், மெய் வரிசையை மட்டும் பார்த்தால் போதும்.`,
    summary: 'படிநிலை-5: அடிப்படை அட்டவணை தயார்.',
  },

  {
    label: 'ஒற்றுகள் தேவையா?',
    note: `    தமிழில் மெய் ஒலிகளுக்கென்று தனியே வரிவடிவங்கள் இருக்கின்றன ஆனால் எல்லா மொழிகளுக்கும் அப்படி இல்லை, உதாரணத்திற்கு மலையாளம், கன்னடம் மற்றும் தெலுங்கு ஆகிய மொழிகளுக்கு மெய் ஒலிகள் இருந்தாலும் அவற்றை எழுதும் விதம் வேறு. அதேபோல யப்பானிய மொழியும் மெய் ஒலிகளை எழுத வித்தியாசமான முறையை கையாள்கிறது அவற்றை சுருக்கமாக கீழே காணலாம்:\n
    <b>க், ச், த், ப்:</b>
    இம்மெய் ஒலிகள் யப்பானிய மொழியிலும் இருக்கின்றன, ஆனால் இவற்றை எழுத தனித்துவமாக ஒரு முறையை கையாள்கிறது அதை அடுத்து பார்க்கலாம்.\n
    <b>ந், ம்: </b>
    இம்மெய் ஒலிகள் யப்பானிய மொழியில் முன்னர் பார்த்த 'ங்', 'ஞ்' போலவே 'ன்' என்ற எழுத்தையே ஏற்றுக் கொள்கின்றன, 'தந்தம்' என்பதை 'தன்தம்' என்றும், 'அம்மா' என்பதை 'அன்மா' என்று எழுதுவதைப் போல. தமிழில் 'ம்' ஆனது சொல்லின் இறுதியிலும் வரும் ஆனால் யப்பானிய மொழியில் அப்படி இல்லை. ஆக இவ்விரு ஒலிகளுக்கு தனியே வரிவடிவம் இல்லை.\n
    <b>ய், ர், வ்: </b>
    இம்மெய் ஒலிகளைக் கொண்ட யப்பானியச் சொற்களே கிடையாது, ஆகவே இவற்றிற்கு வரிவடிவம் இல்லை`,
    summary: 'படிநிலை-6: மெய்யெழுத்துக்கள் எங்கே?',
  },

  {
    label: 'ன் எனுஞ்சிறப்பு ஒலி',
    note: `    சென்ற படிநிலையில் 'ந்' ஒலியை 'ன்' கொண்டே எழுதுகிறார்கள் என்று பார்த்தோம், மாற்றாக 'ன்' வரிசையிலுள்ள "ன னி னு னெ னொ" விற்கு பதில் யப்பானிய மொழியில் ஏற்கனவே உள்ள "ந நி நு நெ நொ" ஒலிகளை பயன்படுத்துகிறார்கள்.\n
    ஆக கடைசி வரிசையான 'ன' வரிசை முற்றிலுமாக நீக்கப்பட்டு அவ்விடத்தை 'ன்' மட்டும் எடுத்துக்கொள்கிறது. இந்த "ன்" ஒலிக்கு யப்பானிய மொழியில் "ஹட்சுஓன்" என்று பெயர், அப்படியென்றால் "மூக்கொலி", மூக்கிலிருந்து பிறக்கும் ஒலி எனப்பொருள் கொள்ளலாம்.\n
    இன்னும் சொல்லப்போனால் இதனை, "தனிஒலி" அல்லது "சிறப்புஒலி" என்றும் வழங்குவர் ஏனெனில் இது பல ஒலிகளை தன்னகத்தேக் கொண்டது.\n
    தமிழின் மொத்த மெல்லின ஒலிகலாகிய "ங் ஞ் ண் ந் ம் ன்" எல்லாவற்றிக்கும் யப்பானிய மொழியின் இந்த ஒரே எழுத்து பயன்படுகிறது என்றால் இது சிறப்பான எழுத்து தானே?.`,
    summary: 'படிநிலை-7: "ன்" எனும் சிறப்பெழுத்து',
  },

  {
    label: 'சி அது ஷி ஆதல்',
    note: `    'சி' ஆனது 'ஷி' என மாற்றமடைந்து இருப்பதை இங்கே நீங்கள் பார்க்கலாம்.\n
    வரிவடிவம் காலத்தால் மாற்றம் அடைவதை நாம் கண்கூடாக பார்ப்பது உண்டு, அதனைப் போலவே ஒலிவடிவமும் காலத்தால் மாற்றமடைவது உண்டு. ஒருவர் உச்சரிக்கும் ஒலிக்கும் இன்னோருவர் உச்சரிக்கும் ஒளிக்குமே வித்தியாசம் இருக்கும் பொழுது, பலநூறு ஆண்டுகளில் மக்கள் இடப்பெயர்வு, கலாச்சார பரிமாற்றம், மொழிகளினிடையேயான ஊடாட்டம், வட்டார வழக்கு போன்ற காரணிக்களால் ஒலியின் உச்சரிப்பில் பல்வேறு மாற்றங்கள் நிகழ்வது இயல்பு.\n
    தமிழிலே கூட, இந்த 'ச' வரிசையானது 'ச்ச', 'ச்சி'.. என்றே பழந்தமிழில் உச்சரிக்கப்பட்டு இருந்திருக்கிறது, கால மாற்றத்தில் 'ச', 'சி'.. என்று உச்சரிக்கிறோம். "சோழன்" என்பது தவறு "ச்சோழன் " என்பதே சரி.\n
    போலவே யப்பானிய மொழியில் 'சி' ஆனது 'ஷி' என்றாகிருக்கிறது, இதன் காரணகாரணிகளுக்குள் போகவேண்டாம், அதை அதன்படியே எடுத்துக்கொள்வது நன்று.`,
    summary: 'படிநிலை-8: உச்சரிப்பு மாற்றம் (சி -> ஷி)',
  },

  {
    label: 'தி அது ச்சி ஆதல்',
    note: `    விளையாட்டாக ஒன்று நான் நினைப்பது உண்டு, தமிழின் இன்றைய "சி" யானது ஒரு காலத்தில் "ச்சி" என்றே இருந்தது என்று சென்ற படிநிலையில் பார்த்தோமல்லவா, போலவே யப்பானிய மொழியிலும் "ச்சி" அது "சி" ஆகி பின் "ஷி" என்று மாறியிருக்குமேயாயின், பிற்காலத்தில் "ச்சி" என்ற ஒலியின் தேவை அதிகமாகி, "தி" எனும் ஒலியின் தேவை குறைவாக இருந்து 'த' வரிசையின் "தி" யானது "ச்சி" என்று உருமாற்றமடைந்திருக்குமோ என்று.\n
    எப்படியோ யப்பானிய மொழியில் 'தி' ஆனது 'ச்சி' என்றாகிருக்கிறது, மேலே விளையாட்டாக நான் சொன்னதை மறந்துவிடுங்கள் மறுபடியும் சொல்கிறேன் இதன் காரணகாரணிகளுக்குள்ளே போகவேண்டாம், அதை அதன்படியே எடுத்துக்கொள்வது நன்று.`,
    summary: 'படிநிலை-9: உச்சரிப்பு மாற்றம் (தி -> ச்சி)',
  },

  {
    label: 'து அது ட்சு ஆதல்',
    note: `    யப்பானிய மொழியின் பழைய காலத்தில் 'து' என்னும் ஒலி தற்காலத்தில் 'ட்சு' என்ற ஒலியாக மாறிவிட்டது.\n
    நா அடிப்படையில் தொண்டைக்கு மேல் தொடும் ஒலி 'த்' ஆனது  இயல்பான ஒலி மாற்றம் பெற்று ஈரிடஒலியாகி 'ட்சு' (முதலில் 'த்', பின் 'ஸ்' வெளியாகும்) என்று மாற்றமடைந்துள்ளதாக மொழியியலாளர்கள் கருதுகின்றனர். என்றாலும் மறுபடியும் சொல்கிறேன் இதன் காரணகாரணிகளுக்குள்ளே போகவேண்டாம், அதை அதன்படியே எடுத்துக்கொள்வது நன்று`,
    summary: 'படிநிலை-10: உச்சரிப்பு மாற்றம் (து -> ட்சு)',
  },

  {
    label: 'ப-வரிசை அது ஹ-வரிசை ஆதல்',
    note: `    அடுத்து 'ப' எனும் ஒலி காலப்போக்கில் 'ஹ' என்று மாற்றம் அடைவது இயல்பு, யப்பானிய மொழியிலும் அவ்வாறே நிகழ்ந்திருக்கிறது.\n
    இதற்கு உதாரணமாக திராவிட மொழிகளாகிய தமிழையும் கன்னடத்தையும் எடுத்துக்கொள்ளலாம், தமிழில் 'ப' என்று இருக்கும் ஒலி கன்னடத்தில் 'ஹ' என்றும் வழங்கப்படுகிறது. நினைவில் கொள்க 'ப' ஒலி கன்னடத்தில் முழுவதுமாக மறையவில்லை மாறாக வேற்று மொழிகளின் ஆதிக்கத்தாலும், கால மாற்றத்தாலும் ப வரிசையில் துவங்கும் பல சொர்க்களில் 'ப' ஒலியானது 'ஹ' என்று மாறியிருக்கிறது, உதாரணமாக:\n
        தமிழின் "பால்", கன்னடத்தில் "ஹாலு". 
        தமிழின் "பள்ளி", கன்னடத்தில் "ஹள்ளி". 
        தமிழின் "பெயர்", கன்னடத்தில் "ஹெசரு". 
        தமிழின் "போராட்டம்", கன்னடத்தில் "ஹோராட்ட".\n
    இம்மொழியியல் காரணி அடிப்படையில் யப்பானிய மொழியில் "ப, பி, பு, பெ, பொ" ஆனது "ஹ, ஹி, ஹு, ஹெ, ஹொ" என்றாகிருக்கிறது.`,
    summary: 'படிநிலை-11: உச்சரிப்பு மாற்றம் (ப வரிசை -> ஹ வரிசை)',
  },

  {
    label: 'ஃபு அல்லது ஹு',
    note: `    ஒரு வல்லொலி (ப) மெல்லொலியாக (ஹ) மாறுவதற்கு இடையில் இடைநிலை ஒன்றை அடையலாம் அது "உராய்வுஒலி" எனப்படும். இதன்படி யப்பானிய 'ப' வரிசை 'ஹ' வர்சையாக மாறுவதர்கு முன்னர் 'ஃப' எனும் வரிசையாக மாறியிருக்கிறது.\n
    அதாவது "ஃப, ஃபி, ஃபு, ஃபெ, ஃபொ" என்று மாறியிருக்கிறது, இதிலிருந்து ஹ வரிசைக்கு மாறும்பொழுது "ஃபு" மட்டும் அப்படியே நிலைத்து விட்டது என்று கொள்ளலாம். நன்கு கவனித்தீர்கள் என்றால், இந்த "ஃபு" ஆனது "ஹு" என்றும்கூட கேட்கும். யப்பானியர் "ஃபுஜி" என்று உச்சரிக்கையில் அது "ஹுஜி" என்றும் கேட்கலாம், அவ்வளவு மெல்லிய வித்தியாசம்தான் இருக்கிறது இந்த இரண்டு ஒலிக்கும்.\n
    ஒன்றை கவனித்தீர்களா? இந்த 'fu' எனும் ஒலியை நாம் எளிமையாக 'ப' முன் 'ஃ' என்ற ஆய்த எழுத்தைச் சேர்த்து வாசிக்கிறோம் ஆனால் தொல்தமிழ் இலக்கணப்படி இப்படி பயன்படுத்த இயலாது எனினும், பா.வே. மாணிக்கனார் போன்ற தமிழ் அறிஞர்கள் வேற்று மொழி ஒலிகளை நாம் தனிஎழுத்து என்றும் அழைக்கப்படும் 'ஃ' கொண்டு உச்சரிக்க முடியும் என பல்வேறு முறைகளை முன்மொழிந்துள்ளனர், அவற்றை நாம் முழுமையாக கையாளவில்லை என்றாலும் 'f' ஒலிக்கு நாம் உபயோகப்படுத்துவதைப் பார்க்கையில் காரணம் கருதிதான் இதற்கு "தனிஎழுத்து" என்று பெயரிட்டனரோ என்று அகமகிழ்கிறது.`,
    summary: 'படிநிலை-12: உச்சரிப்பு மாற்றம் (ஃபு)',
  },

  {
    label: 'யியும் யெயும், இயும் எயுமாய் இருத்தல்',
    note: `    "ய யி யு யெ யொ" எனும் வரிசையில் 'யி' யை 'இ' கொண்டும் 'யெ' வை 'எ' கொண்டும் உச்சரிக்கலாம் தானே?, இந்த வெளிப்படையான காரணத்திற்காகவே யப்பானியர்கள் இந்த 'யி' மற்றும் 'யெ' வை 'ய' வரிசையிலிருந்து நீக்கியிருக்கின்றனர்.\n
    தமிழிலும் கூட,
        "வாயில்" என்பதை "வாஇல்" என்றும்,
        "கடையெழு" என்பதை "கடைஎழு' என்றும் எழுதி வாசிக்க முடியும்.`,
    summary: 'படிநிலை-13: யியும் யெயும், இயும் எயுமாய் இருத்தல்',
  },

  {
    label: 'ஈரொலி குறைந்த அட்டவணை',
    note: `    இப்பொழுது 'அ' துவங்கி 'ய' வரிசை வரை ஒருமுறை வாசித்துப்பாருங்கள், முடிந்தால் ஒரு பாடல் போல கூட பாடிப்பருங்கள்`,
    summary: 'படிநிலை-14: யி மற்றும் யெ ஒலிகளின் மதிப்புகளை நீக்கு',
  },

  {
    label: 'வியும் வுவும் வெவும், இயும் உவும் எயுமாய் இருத்தல்',
    note: `    "வ வி வு வெ வொ" எனும் வரிசையில் 'வு' வை 'உ' கொண்டும் உச்சரிக்கலாம் தானே?, இந்த வெளிப்படையான காரணத்திற்காகவே யப்பானியர்கள் இந்த 'வு' வை 'வ' வரிசையிலிருந்து நீக்கியிருக்கின்றனர்.\n
    தமிழிலும் கூட,
        "கடவுள்" என்பதை "கடஉள்" என்றும்,
        "பரப்பளவு" என்பதை "பரப்பளஉ' என்றும் எழுதி வாசிக்க முடியும்.\n
    மேலும், 'வி', 'வெ' ஒலிகளைப்பொருத்தமட்டில், பல நூற்றாண்டுகளுக்கு முன்னரே இவற்றிலிருந்து 'வ்' எனும் மெய்ஒலி நீங்கி, 'இ' மற்றும் 'எ' என்றே வழங்கப்படலாயிற்று. பழைய யப்பானிய மொழியிலேயே "விரு" எனுஞ்சொல், "இரு" என மாற்றமடைந்திருக்கிறது, போலவே "வெ" எனுஞ்சொல், "எ" என மாற்றமடைந்திருக்கிறது.\n
    யப்பானிய மொழியில் "இரு" என்றால் "இருத்தல்", "எ" என்றால் "படம்/ஓவியம்".`,
    summary: 'படிநிலை-15: வியும் வுவும் வெவும், இயும் உவும் எயுமாய் இருத்தல்',
  },

  {
    label: 'மூவொலி குறைந்த அட்டவணை',
    note: `    இப்பொழுது 'அ' துவங்கி 'ன்' வரிசை வரை ஒருமுறை வாசித்துப்பாருங்கள், முடிந்தால் ஒரு பாடல் போல கூட பாடிப்பருங்கள்`,
    summary: 'படிநிலை-16: வி, வு மற்றும் வெ ஒலிகளின் மதிப்புகளை நீக்கு',
  },

  {
    label: 'இறுதி நிலை',
    note: `    எழுத்து எனப்படுப
    அகரம் முதல்
    னகர இறுவாய் முப்பஃது என்ப (தொல், எழுத்து-1-3)
    
    தொல்காப்பியர் அகரம் முதல் னகரம் வரை 30 எழுத்துக்கள் என்பார், யப்பானிய மொழியில் அதே அகரம் முதல் னகரம் வரை 46 எழுத்துக்கள் எனலாம். யப்பானிய மொழியில் இந்த 46 எழுத்துகளை "அடிப்படை எழுத்துகள்" என்பர், இன்னும் பல ஒலிகள் யப்பானிய மொழியில் உள்ளன, என்றாலும் வரிவடிவங்கள் இவ்வளவுதான் இவற்றை வைத்துத்தான் மற்ற ஒலிகளை எழுதுகின்றனர். இது குறித்து பின்னர் விரிவாகவும் எளிமையாகவும் பார்க்கலாம்.\n
    நான் கையாண்ட இந்த முறையை வைத்து, தமிழிலிருந்துதான் யப்பானிய மொழி பிறந்தது என்று கருத வேண்டாம். அப்படிக் கருதினால், அது மொட்டைத்தலைக்கும் முழங்காலுக்கும் முடிச்சு போடுவது போன்றதாகிவிடும்.\n
    எனினும், யப்பானிய மொழியைக் கற்கத் தொடங்கியதிலிருந்து, தமிழின் பல கூறுகளை அங்கே தொடர்ச்சியாகக் காண்பது வியப்பளிக்கிறது. அதனால், என்னைப் போல யப்பானிய மொழியைக் கற்பவர்களுடன் நான் கற்றவற்றைப் பகிர்ந்து கொள்கிறேன்.`,
    summary: 'படிநிலை-17: இறுதி நிலை',
  },

  {
    label: 'கிஹொன்-ஒன்',
    note: `    இது இறுதி நிலை. தமிழ்-யப்பானிய ஒலிப் பயணம் முற்றிற்று.\n
    இப்போது நீங்கள் பார்ப்பது, யப்பானிய மொழியில் மூன்று வரிவடிவங்களுள் ஒன்றான "ஹிரகந", இன்னும் "கதகந" மற்றும் "கான்ஜி" என இரு வரிவடிவங்கள் உள்ளன. இவையெல்லாம் கற்க இன்னும் சுவையாக இருக்கும், இதுகுறித்து அடுத்தடுத்து விரிவாகப்பார்க்கலாம்.\n
    "அடிப்படை ஒலிகள்" எனப்படுகிற யப்பானிய "கிஹொன் ஒன்" இவை, இவற்றை இன்னும் எளிமையாக கற்க ஒரு பிரபல பாடலின் சுட்டி உங்களுக்காக:\n

        கிஹொன்ஒன்:
        きほんおん:

    <a href="https://www.youtube.com/watch?v=2qk4gCZuSjk" target="_blank" rel="noopener noreferrer">யப்பானிய அடிப்படை ஒலி பயில ஒரு பாடல்</a>`,
    summary: 'படிநிலை-18: கிஹொன்-ஒன்',
  },
  
];

// ============================================================================
// 3. VOWEL DATA — 12 Tamil vowels with their IPA-like names and Japanese equivalents
// ============================================================================
const tamilVowels = [
  { label: 'அ', name: 'a', japanese: 'あ' },    // Short 'a' — inherent vowel
  { label: 'ஆ', name: 'ā', japanese: 'ああ' },    // Long 'ā' — same Japanese mora
  { label: 'இ', name: 'i', japanese: 'い' },    // Short 'i'
  { label: 'ஈ', name: 'ī', japanese: 'いい' },    // Long 'ī' — same Japanese mora
  { label: 'உ', name: 'u', japanese: 'う' },    // Short 'u'
  { label: 'ஊ', name: 'ū', japanese: 'うう' },   // Long 'ū' — same Japanese mora
  { label: 'எ', name: 'e', japanese: 'え' },    // Short 'e'
  { label: 'ஏ', name: 'ē', japanese: 'ええ' },    // Long 'ē' — same Japanese mora
  { label: 'ஐ', name: 'ai', japanese: 'あい' },  // Diphthong 'ai'
  { label: 'ஒ', name: 'o', japanese: 'お' },    // Short 'o'
  { label: 'ஓ', name: 'ō', japanese: 'おお' },    // Long 'ō' — same Japanese mora
  { label: 'ஔ', name: 'au', japanese: 'あう' },  // Diphthong 'au'
];

// ============================================================================
// 4. CONSONANT DATA — 18 Tamil consonants with virama forms
// ============================================================================
const tamilConsonants = [
  { base: 'க', display: 'க்', name: 'ka', japanese: '' },    // velar stop
  { base: 'ங', display: 'ங்', name: 'ca', japanese: '' },    // velar nasal (never word-initial in Japanese)
  { base: 'ச', display: 'ச்', name: 'ṭa', japanese: '' },    // palatal stop → becomes shi
  { base: 'ஞ', display: 'ஞ்', name: 'ta', japanese: '' },    // palatal nasal (never word-initial in Japanese)
  { base: 'ட', display: 'ட்', name: 'pa', japanese: '' },    // retroflex stop (never in Japanese)
  { base: 'ண', display: 'ண்', name: 'ṅa', japanese: '' },    // retroflex nasal (never in Japanese)
  { base: 'த', display: 'த்', name: 'ña', japanese: '' },    // dental stop → becomes chi/tsu
  { base: 'ந', display: 'ந்', name: 'ṇa', japanese: '' },    // dental nasal
  { base: 'ப', display: 'ப்', name: 'na', japanese: '' },    // bilabial stop → becomes ha-series
  { base: 'ம', display: 'ம்', name: 'ma', japanese: '' },    // bilabial nasal
  { base: 'ய', display: 'ய்', name: 'ya', japanese: '' },    // palatal approximant
  { base: 'ர', display: 'ர்', name: 'ra', japanese: '' },    // alveolar trill
  { base: 'ல', display: 'ல்', name: 'la', japanese: '' },    // alveolar lateral (merges with ra in Japanese)
  { base: 'வ', display: 'வ்', name: 'va', japanese: '' },    // labio-dental approximant
  { base: 'ழ', display: 'ழ்', name: 'ḻa', japanese: '' },    // retroflex lateral (never in Japanese)
  { base: 'ள', display: 'ள்', name: 'ḷa', japanese: '' },    // retroflex lateral (never in Japanese)
  { base: 'ற', display: 'ற்', name: 'ṟa', japanese: '' },    // retroflex trill (never in Japanese)
  { base: 'ன', display: 'ன்', name: 'ṉa', japanese: '' },    // dental nasal → becomes special row
];

// ============================================================================
// 5. VOWEL SIGN DATA — 12 Tamil vowel markers (vowel signs attached to consonants)
// ============================================================================
const vowelSigns = [
  { marker: '', label: 'a', detail: 'inherent' },  // No marker — inherent 'a' sound
  { marker: 'ா', label: 'ā' },                      // Long ā marker
  { marker: 'ி', label: 'i' },                      // Short i marker
  { marker: 'ீ', label: 'ī' },                      // Long ī marker
  { marker: 'ு', label: 'u' },                      // Short u marker
  { marker: 'ூ', label: 'ū' },                      // Long ū marker
  { marker: 'ெ', label: 'e' },                      // Short e marker
  { marker: 'ே', label: 'ē' },                      // Long ē marker
  { marker: 'ை', label: 'ai' },                    // Diphthong ai marker
  { marker: 'ொ', label: 'o' },                      // Short o marker
  { marker: 'ோ', label: 'ō' },                      // Long ō marker
  { marker: 'ௌ', label: 'au' },                     // Diphthong au marker
];

// ============================================================================
// 6. JAPANESE VOWEL MAPPING — Map long Tamil vowels to their Japanese mora base
// ============================================================================
const japaneseVowelMap = {
  a: 'a', ā: 'a',     // Both 'a' and 'ā' → Japanese 'a' mora
  i: 'i', ī: 'i',     // Both 'i' and 'ī' → Japanese 'i' mora
  u: 'u', ū: 'u',     // Both 'u' and 'ū' → Japanese 'u' mora
  e: 'e', ē: 'e',     // Both 'e' and 'ē' → Japanese 'e' mora
  ai: 'ai',           // Diphthong stays as 'ai'
  o: 'o', ō: 'o',     // Both 'o' and 'ō' → Japanese 'o' mora
  au: 'au',           // Diphthong stays as 'au'
};

// ============================================================================
// 7. STAGE-SPECIFIC CONFIGURATION ARRAYS
// ============================================================================
const longVowelLabels = ['ā', 'ī', 'ū', 'ē', 'ai', 'ō', 'au'];  // All long vowels removed at Stage 3

const grayedConsonantsStage3 = ['ங', 'ஞ', 'ட', 'ண', 'ல', 'ழ', 'ள', 'ற'];  // Consonants dimmed at Stage 4, removed at Stage 5

const deprecatedConsonantsStage5 = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'];  // All consonants dimmed at Stage 12

// ============================================================================
// 8. BUILD FORMS FUNCTION — Create all syllable objects with visibility levels
// Visibility: 3 = always show, 2 = show from Stage 3+, 1 = show from Stage 4+
// ============================================================================
function buildForms() {
  const forms = [];

  // Add all 12 vowels to the forms array
  tamilVowels.forEach(vowel => {
    forms.push({
      id: `vowel-${vowel.name}`,
      label: vowel.label,
      type: 'vowel',
      name: vowel.name,
      japanese: vowel.japanese,
      visibility: 3,           // Always visible
      mapping: vowel.japanese,
    });
  });

  // Add all 216 consonant+vowel combinations (18 consonants × 12 vowel signs)
  tamilConsonants.forEach(consonant => {
    vowelSigns.forEach((vowelSign, index) => {
      const label = consonant.base + vowelSign.marker;        // e.g., 'க' + 'ி' = 'கி'
      const soundName = `${consonant.name}${vowelSign.label}`; // e.g., 'ka' + 'i' = 'kai'
      const japanese = `${consonant.japanese} (${japaneseVowelMap[vowelSign.label] || vowelSign.label})`;
      const visibility = index <= 1 ? 3 : index <= 4 ? 2 : 1; // First 5 vowels always visible, others conditional
      forms.push({
        id: `syllable-${soundName}`,
        label,
        type: 'syllable',
        base: consonant.base,
        name: soundName,
        japanese,
        visibility,
        mapping: consonant.japanese,
      });
    });
  });

  // Add special aytham (ஃ) — not a regular syllable
  const aytham = {
    id: 'special-aytham',
    label: 'ஃ',
    type: 'special',
    name: 'aytham',
    japanese: 'no direct kana equivalent',
    visibility: 1,
    mapping: 'none',
  };
  forms.push(aytham);
  return forms;
}

const tamilForms = buildForms();  // Generate all 217 forms (216 syllables + 1 aytham)
// ============================================================================
// 9. GET CURRENT STAGE FUNCTION — Map slider percentage (0–180) to stage index (0–18)
// Each stage covers a 10% range of the slider
// ============================================================================
function getCurrentStage(value) {
  if (value < 10) return 0;    // Stage 1: 0–9% (tamil alphabets)
  if (value < 20) return 1;    // Stage 2: 10–19% (dim all long vowels)
  if (value < 30) return 2;    // Stage 3: 20–29% (remove all long vowels)
  if (value < 40) return 3;    // Stage 4: 30–39% (dim all unavailable constant rows)
  if (value < 50) return 4;    // Stage 5: 40–49% (remove all unavailable constant rows)
  if (value < 60) return 5;    // Stage 6: 50–59% (dim all constants)
  if (value < 70) return 6;    // Stage 7: 60–69% (n)
  if (value < 80) return 7;    // Stage 8: 70–79% (shi)
  if (value < 90) return 8;    // Stage 9: 80–89% (chi)
  if (value < 100) return 9;   // Stage 10: 90–99% (tsu)
  if (value < 110) return 10;   // Stage 11: 100–109% (ha-line)
  if (value < 120) return 11;   // Stage 12: 110–119% (hu to fu)
  if (value < 130) return 12;   // Stage 13: 120–129% (dim ya/ye)
  if (value < 140) return 13;   // Stage 14: 130–139% (blank ya/ye)
  if (value < 150) return 14;   // Stage 15: 140–149% (dim va/vu/ve)
  if (value < 160) return 15;   // Stage 16: 150–159% (blank va/vu/ve)
  if (value < 170) return 16;   // Stage 17: 160–169% (untouched)
  if (value < 180) return 17;   // Stage 18: 170–179% (reserved)
  return 18;                     // Stage 19+: 180%+ (reserved)
}
// ============================================================================
// 10. GET VISIBLE FORMS FUNCTION — Filter forms based on stage index
// Only controls visibility for Stages 1–5; Stages 6+ always show all forms
// ============================================================================
function getVisibleForms(stageIndex) {
  // Stage 1–2: Show all forms (no filtering)
  if (stageIndex === 0 || stageIndex === 1) {
    return tamilForms;
  }
  // Stage 3: Show forms with visibility >= 1 (include all)
  if (stageIndex === 2) {
    return tamilForms.filter(item => item.visibility >= 1);
  }
  // Stage 4: Show forms with visibility >= 2 (exclude most hidden)
  if (stageIndex === 3) {
    return tamilForms.filter(item => item.visibility >= 2);
  }
  // Stage 5+: Show only forms with visibility === 3 (always visible)
  if (stageIndex === 4) {
    return tamilForms.filter(item => item.visibility === 3);
  }
  // Default: Show only always-visible forms
  return tamilForms.filter(item => item.visibility === 3);
}

// ============================================================================
// 11. RENDER TAMIL GRID FUNCTION — Main table rendering function
// Executes in 7 sequential steps for each stage
// ============================================================================
function renderTamilGrid(stageIndex) {
  // Get forms that should be visible at this stage
  const visibleForms = getVisibleForms(stageIndex);
  // Clear existing table content
  tamilGrid.innerHTML = '';

  // Create new table element
  const table = document.createElement('table');
  table.className = 'tamil-table';

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 1: BUILD HEADER ROW (corner + vowel column headers)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  // Create corner cell (top-left) — shows 'ஃ' (aytham symbol)
  const corner = document.createElement('th');
  corner.className = 'corner-cell';
  corner.textContent = 'ஃ';

  if (stageIndex >= 11) {
  corner.classList.add('cell-dim');
}

  headRow.appendChild(corner);

  // Decide which vowel columns to show at this stage
  // Stage 3+ removes long vowel columns (ā, ī, ū, ē, ai, ō, au) completely
  const visibleVowelSigns = stageIndex >= 2
    ? vowelSigns.filter(vs => !longVowelLabels.includes(vs.label))  // Remove long vowels
    : vowelSigns;                                                   // Keep all vowels

  // Create vowel header cells (column titles)
visibleVowelSigns.forEach((vs) => {
  const th = document.createElement('th');
  const match = tamilVowels.find(tv => tv.name === vs.label);
  let vowelGlyph = match ? match.label : vs.label;
  //  Stage 17+ override
  if (stageIndex >= 17 && match) {
    vowelGlyph = match.japanese;
  }
  th.textContent = vowelGlyph;
  th.className = 'vowel-header';
  headRow.appendChild(th);
});

  thead.appendChild(headRow);
  table.appendChild(thead);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 2: BUILD TABLE BODY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const tbody = document.createElement('tbody');

  // Decide which consonant rows to show at this stage
  // Stage 5+ removes unnecessary consonant rows completely (ங், ஞ், ட், ண், ல், ழ், ள், ற்)
  const visibleConsonants = stageIndex >= 4
    ? tamilConsonants.filter(consonant => !grayedConsonantsStage3.includes(consonant.base))
    : tamilConsonants;  // Keep all consonants

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 3: CREATE ROW FOR EACH CONSONANT
  // _________________________________________________________________
  visibleConsonants.forEach(consonant => {
    const tr = document.createElement('tr');

    // Create row label cell (leftmost column) — shows virama form like 'க்', 'ச்'
    const baseCell = document.createElement('td');
    baseCell.className = 'row-label base-cell';
    baseCell.textContent = consonant.display || consonant.base;
    tr.appendChild(baseCell);

    // Check if row should be dimmed at this stage
    const isStage3GrayedRow = stageIndex === 3 && grayedConsonantsStage3.includes(consonant.base);
    const isStage12DimmedRow = stageIndex >= 5 && deprecatedConsonantsStage5.includes(consonant.base);

    // Apply dim class to grayed row
    if (isStage12DimmedRow) {
      baseCell.classList.add('cell-dim');
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // STEP 4: SPECIAL HANDLING FOR ன (n-row) at Stage 6+
    // Merge entire row into single cell showing only 'ன்' (virama form)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      if (stageIndex >= 6 && consonant.base === 'ன') {
      const td = document.createElement('td');
      td.className = 'syllable-cell cell-highlight';
      td.colSpan = visibleVowelSigns.length;  // Span all vowel columns
      const label = stageIndex >=17 ? 'ん' : consonant.display;
      td.innerHTML = `<div class="cell-main">${label}</div>`;
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;  // Skip normal cell creation for this row
    }
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // STEP 5: CREATE CELLS FOR EACH VOWEL-COMBINATION
    // _________________________________________________________________
    visibleVowelSigns.forEach((vs, idx) => {
      const td = document.createElement('td');
      td.className = 'syllable-cell';

      // Build syllable label: consonant + vowel marker
      const label = consonant.base + vs.marker;  // e.g., 'க' + 'ி' = 'கி'
      const soundName = `${consonant.name}${vs.label}`;  // e.g., 'ka' + 'i' = 'kai'
      const formId = `syllable-${soundName}`;

      // Find form object to get visibility and Japanese mapping
      const form = tamilForms.find(f => f.id === formId) || { label, japanese: consonant.japanese, type: 'syllable' };
      let displayLabel = form.label;

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // STEP 6: STAGE-SPECIFIC CELL REPLACEMENTS (sound transformations)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      //STAGE 3: ர highlight
      if (stageIndex >= 3 && consonant.base === 'ர') {
          td.classList.add('cell-highlight');
      }
      // STAGE 7: சி → ஷி (shi transformation)
      if (stageIndex >= 7 && consonant.base === 'ச' && vs.label === 'i') {
        displayLabel = 'ஷி';
        td.classList.add('cell-highlight');  // Highlight changed cell
      }

      // STAGE 8: தி → ச்சி (chi transformation)
      if (stageIndex >= 8 && consonant.base === 'த' && vs.label === 'i') {
        displayLabel = 'ச்சி';
        td.classList.add('cell-highlight');
      }

      // STAGE 9: து → ட்சு (tsu transformation)
      if (stageIndex >= 9 && consonant.base === 'த' && vs.label === 'u') {
        displayLabel = 'ட்சு';
        td.classList.add('cell-highlight');
      }

      // STAGE 10-11: ப-series → ஹ-series (pa→ha, pi→hi, pu→fu, pe→he, po→ho)
      if (stageIndex >= 10 && consonant.base === 'ப') {
        const replacementMap = {
          a: 'ஹ',                              // pa → ha
          i: 'ஹி',                             // pi → hi
          u: stageIndex >= 11 ? 'ஃபு' : 'ஹு',  // pu → hu (Stage 9) → fu (Stage 10)
          e: 'ஹெ',                             // pe → he
          o: 'ஹொ',                             // po → ho
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
          td.classList.add('cell-highlight');
        }
        
      }
	// STAGE 12: Yi and Ye change
    if (stageIndex >= 12 && consonant.base === 'ய' && vs.label === 'i') {
        displayLabel = 'இ';
        td.classList.add('cell-highlight');  // Highlight changed cell
      }
	  
	  if (stageIndex >= 12 && consonant.base === 'ய' && vs.label === 'e') {
        displayLabel = 'எ';
        td.classList.add('cell-highlight');  // Highlight changed cell
      }
	  // STAGE 14: Yi and Ye change
	  if (stageIndex >= 14 && consonant.base === 'வ' && vs.label === 'i') {
        displayLabel = 'இ';
        td.classList.add('cell-highlight');  // Highlight changed cell
      }
	  
	  if (stageIndex >= 14 && consonant.base === 'வ' && vs.label === 'u') {
        displayLabel = 'உ';
        td.classList.add('cell-highlight');  // Highlight changed cell
      }
	  
	  if (stageIndex >= 14 && consonant.base === 'வ' && vs.label === 'e') {
        displayLabel = 'எ';
        td.classList.add('cell-highlight');  // Highlight changed cell
      }
// STAGE 17: Tamil to Japanese change (all cells)
if (stageIndex >= 17 && consonant.base === 'க') {
        const replacementMap = {
          a: 'か',
          i: 'き',
          u: 'く',
          e: 'け',
          o: 'こ',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }
if (stageIndex >= 17 && consonant.base === 'ச') {
        const replacementMap = {
          a: 'さ',
          i: 'し',
          u: 'す',
          e: 'せ',
          o: 'そ',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }
	  
if (stageIndex >= 17 && consonant.base === 'த') {
        const replacementMap = {
          a: 'た',
          i: 'ち',
          u: 'つ',
          e: 'て',
          o: 'と',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }

if (stageIndex >= 17 && consonant.base === 'ந') {
        const replacementMap = {
          a: 'な',
          i: 'に',
          u: 'ぬ',
          e: 'ね',
          o: 'の',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }

if (stageIndex >= 17 && consonant.base === 'ப') {
        const replacementMap = {
          a: 'は',
          i: 'ひ',
          u: 'ふ',
          e: 'へ',
          o: 'ほ',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }

if (stageIndex >= 17 && consonant.base === 'ம') {
        const replacementMap = {
          a: 'ま',
          i: 'み',
          u: 'む',
          e: 'め',
          o: 'も',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }

if (stageIndex >= 17 && consonant.base === 'ய') {
        const replacementMap = {
          a: 'や',
          i: '',
          u: 'ゆ',
          e: '',
          o: 'よ',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }

if (stageIndex >= 17 && consonant.base === 'ர') {
        const replacementMap = {
          a: 'ら',
          i: 'り',
          u: 'る',
          e: 'れ',
          o: 'ろ',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }

if (stageIndex >= 17 && consonant.base === 'வ') {
        const replacementMap = {
          a: 'わ',
          i: '',
          u: '',
          e: '',
          o: 'を',
        };
        if (replacementMap[vs.label]) {
          displayLabel = replacementMap[vs.label];
        }
      }
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // STEP 7: DIM / BLANK RULES FOR LATER STAGES
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // STAGE 12: Dim யி and யெ cells
      const isStage12YDim = stageIndex >= 12 && consonant.base === 'ய' && (vs.label === 'i' || vs.label === 'e');
      // STAGE 13: Blank யி and யெ cells (remove text)
      const isStage13YBlank = stageIndex >= 13 && consonant.base === 'ய' && (vs.label === 'i' || vs.label === 'e');
      // STAGE 14: Dim வி, வு, வெ cells
      const isStage14VDim = stageIndex >= 14 && consonant.base === 'வ' && (vs.label === 'i' || vs.label === 'u' || vs.label === 'e');
      // STAGE 15: Blank வி, வு, வெ cells (remove text)
      const isStage15VBlank = stageIndex >= 15 && consonant.base === 'வ' && (vs.label === 'i' || vs.label === 'u' || vs.label === 'e');

      // Apply dim class to gray cells
      if (isStage12YDim) {
        td.classList.add('cell-dim');
      }
      if (isStage14VDim) {
        td.classList.add('cell-dim');
      }

      // Apply blank (remove text content)
      if (isStage13YBlank) {
        displayLabel = '';
      }
      if (isStage15VBlank) {
        displayLabel = '';
      }

      // Render cell content
      td.innerHTML = `<div class="cell-main">${displayLabel}</div>`;

      // STAGE 2: Hide long-vowel columns (dim, not remove)
      if (stageIndex === 1 && longVowelLabels.includes(vs.label)) {
        td.classList.add('hidden');
      }

      // STAGE 3: Hide grayed rows completely
      if (isStage3GrayedRow) {
        td.classList.add('hidden');
      }

      // STAGE 2: Hide low-visibility cells (conditional filtering)
      if (!visibleForms.includes(form) && stageIndex === 1) td.classList.add('hidden');

      // Add cell to row
      tr.appendChild(td);
    });

    // Add completed row to table body
    tbody.appendChild(tr);
  });

  // Append body to table, table to grid container
  table.appendChild(tbody);
  tamilGrid.appendChild(table);
}

// ============================================================================
// 12. RENDER STAGE MILESTONES FUNCTION — Show stage dots at bottom
// Highlights active stage with different styling
// ============================================================================
function renderStageMilestones(activeIndex) {
  // Exit if milestone container doesn't exist
  if (!stageMilestones) return;
  // Clear existing milestones
  stageMilestones.innerHTML = '';

  // Create milestone dot for each stage
  stages.forEach((stage, index) => {
    const milestone = document.createElement('span');
    milestone.className = 'stage-milestone';

    // Add active class to current stage dot
    if (index === activeIndex) milestone.classList.add('active');

    // Set milestone number (1–17)
    milestone.textContent = index + 1;

    // Tooltip shows stage name on hover
    milestone.title = stage.label;

    // Add milestone to container
    stageMilestones.appendChild(milestone);
  });
}

// ============================================================================
// 13. UPDATE EXPLANATION FUNCTION — Main entry point for stage change
// Called when slider moves — updates all UI elements
// ============================================================================
function updateExplanation(value) {
  // Step 1: Get current stage index from slider value
  const stageIndex = getCurrentStage(value);

  // Step 2: Get stage data object
  const stage = stages[stageIndex];

  // Step 3: Update slider percentage display
  sliderValue.textContent = `${value}%`;

  // Step 4: Update stage label display (e.g., "தமிழ் எழுத்துகள் ஒரு பார்வை")
  sliderLabel.textContent = stage.label;

  // Step 5: Update stage summary text
  stageSummary.textContent = stage.summary;

  // Step 6: Update explanation text (long description with line breaks)
  explanation.innerHTML = stage.note;

  // Step 7: Re-render stage milestone dots
  renderStageMilestones(stageIndex);

  // Step 8: Re-render Tamil grid table
  renderTamilGrid(stageIndex);
}

// ============================================================================
// 14. EVENT LISTENERS AND INITIALIZATION
// ============================================================================

// Add input event listener to slider — triggers on every slider movement
stageSlider.addEventListener('input', event => {
  // Get slider value as number and call updateExplanation
  updateExplanation(Number(event.target.value));
});

// Initialize on page load — call with current slider value
updateExplanation(Number(stageSlider.value));