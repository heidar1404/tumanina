(function(){
var L2={
uz:{dark:"Tungi",light:"Kunduzgi",lock:"Qulf",zikr:"Zikr",goal:"Aylanish maqsadi",custom:"Boshqa",of:"/",hint:"Bosing",done:"Aylanish tugadi",rounds:"Aylanishlar",today:"Bugun",best:"Eng yaxshi kun",streak:"Ketma-ket kunlar",week:"So‘nggi 7 kun",undo:"Bekor qilish",reset:"Qayta boshlash",sure:"Ishonchingiz komilmi? Yana bosing",vib:"Tebranish",snd:"Ovoz",one:"Bir qo‘l",on:"Yoqilgan",off:"O‘chiq",settings:"Sozlamalar",color:"Rang",lang:"Til",remind:"Eslatma",morning:"Ertalab",night:"Kechqurun",remnote:"Faqat sahifa ochiq bo‘lganda ishlaydi",rm:"Ertalabki zikr vaqti",rn:"Kechki zikr vaqti",backup:"Zaxira nusxa",copy:"Zaxirani nusxalash",restore:"Tiklash (yuqoridagi matn)",copied:"Nusxalandi",restored:"Tiklandi",bad:"Zaxira matni noto‘g‘ri",locked:"Qulflangan",unlock:"Ochish uchun 2 soniya bosib turing",dgoal:"Kunlik maqsad (0 = o‘chiq)",dgdone:"Kunlik maqsadga erishdingiz",zs:"Har bir zikr bo‘yicha jami",share:"Statistikani ulashish"},
tk:{dark:"Gijeki",light:"Gündizki",lock:"Gulp",zikr:"Zikr",goal:"Tegelek maksady",custom:"Başga",of:"/",hint:"Basyň",done:"Tegelek tamamlandy",rounds:"Tegelekler",today:"Şu gün",best:"Iň gowy gün",streak:"Yzly-yzyna günler",week:"Soňky 7 gün",undo:"Yzyna al",reset:"Täzeden başla",sure:"Ynamyňyz barmy? Ýene basyň",vib:"Titreme",snd:"Ses",one:"Bir el",on:"Açyk",off:"Ýapyk",settings:"Sazlamalar",color:"Reňk",lang:"Dil",remind:"Ýatlatma",morning:"Irden",night:"Agşam",remnote:"Diňe sahypa açykka işleýär",rm:"Irdenki zikr wagty",rn:"Agşamky zikr wagty",backup:"Ätiýaçlyk nusga",copy:"Ätiýaçlygy göçür",restore:"Dikelt (ýokardaky tekst)",copied:"Göçürildi",restored:"Dikeldildi",bad:"Ätiýaçlyk teksti nädogry",locked:"Gulplanan",unlock:"Açmak üçin 2 sekunt basyp duruň",dgoal:"Gündelik maksat (0 = ýapyk)",dgdone:"Gündelik maksada ýetdiňiz",zs:"Her zikr boýunça jemi",share:"Statistikany paýlaş"},
ps:{dark:"شپنی",light:"ورځنی",lock:"قفل",zikr:"ذکر",goal:"د دورې موخه",custom:"خپل",of:"له",hint:"کېکاږئ",done:"یوه دوره بشپړه شوه",rounds:"بشپړې دورې",today:"نن ورځ",best:"غوره ورځ",streak:"پرله‌پسې ورځې",week:"وروستۍ ۷ ورځې",undo:"یو کم کړه",reset:"بیا پیل",sure:"ډاډه یاست؟ بیا کېکاږئ",vib:"لړزېدنه",snd:"غږ",one:"یو لاس",on:"فعال",off:"بند",settings:"تنظیمات",color:"رنګ",lang:"ژبه",remind:"یادونه",morning:"سهار",night:"ماښام",remnote:"یوازې هغه وخت کار کوي چې پاڼه خلاصه وي",rm:"د سهار د ذکر وخت دی",rn:"د ماښام د ذکر وخت دی",backup:"بیک‌اپ",copy:"بیک‌اپ کاپي کړه",restore:"بیا راوستل (پورتنی متن)",copied:"کاپي شو",restored:"بیرته راغی",bad:"د بیک‌اپ متن سم نه دی",locked:"قفل شوی",unlock:"د خلاصولو لپاره ۲ ثانیې ونیسئ",dgoal:"ورځنۍ موخه (۰ = بند)",dgdone:"ورځنۍ موخې ته ورسېدئ",zs:"د هر ذکر مجموعه",share:"احصایه شریکه کړه"}
};
for(var l in L2){for(var k in L2[l]){if(T[k])T[k][l]=L2[l][k];}if(T.title)T.title[l]=T.title.fa;}
WD.uz=["Y","D","S","C","P","J","S"];WD.tk=["Ý","D","S","Ç","P","A","Ş"];WD.ps=WD.fa;DIG.ps=DIG.fa;

var NM={uz:"Oʻzbekcha",tk:"Türkmençe",ps:"پښتو"};
var H=document.documentElement,lg=document.getElementById("lg"),lgs=document.getElementById("langs");
function chips(){
  if(!lgs||lgs.querySelector("[data-nl]"))return;
  Object.keys(NM).forEach(function(c){
    var b=document.createElement("button");b.className="chip";b.dataset.nl=c;b.textContent=NM[c];b.setAttribute("aria-pressed",H.lang===c);
    b.onclick=function(){try{var o=JSON.parse(localStorage.getItem("zekr-counter-v1"))||{};o.lang=c;localStorage.setItem("zekr-counter-v1",JSON.stringify(o));}catch(e){}location.reload();};
    lgs.appendChild(b);
  });
}
if(lgs)new MutationObserver(chips).observe(lgs,{childList:true});
if(lg)new MutationObserver(function(){if(NM[H.lang]&&lg.textContent.indexOf("undefined")>-1)lg.textContent="🌐 "+NM[H.lang];}).observe(lg,{childList:true,characterData:true,subtree:true});
new MutationObserver(function(){if(H.lang==="ps"&&H.dir!=="rtl")H.dir="rtl";}).observe(H,{attributes:true,attributeFilter:["lang","dir"]});
})();
