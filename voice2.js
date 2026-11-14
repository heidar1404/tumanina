(function(){
function $(i){return document.getElementById(i);}
function L(){return document.documentElement.lang;}
var D={
fa:{on:"🎤 شمارش با صدا: روشن",off:"🎤 شمارش با صدا: خاموش",ls:"در حال گوش دادن… ذکر را بگو",ns:"این مرورگر تشخیص گفتار ندارد",dn:"اجازه‌ی میکروفون داده نشد",net:"برای تشخیص گفتار اینترنت لازم است",hr:"شنیدم: "},
en:{on:"🎤 Voice count: On",off:"🎤 Voice count: Off",ls:"Listening… say your dhikr",ns:"Speech recognition is not supported here",dn:"Microphone permission denied",net:"Speech recognition needs internet",hr:"Heard: "},
ar:{on:"🎤 العد بالصوت: مفعّل",off:"🎤 العد بالصوت: متوقف",ls:"أستمع… قل الذكر",ns:"التعرف على الكلام غير مدعوم",dn:"تم رفض إذن الميكروفون",net:"يحتاج إلى إنترنت",hr:"سمعت: "},
uz:{on:"🎤 Ovoz bilan sanash: yoqilgan",off:"🎤 Ovoz bilan sanash: o‘chiq",ls:"Tinglamoqda… zikr ayting",ns:"Nutqni aniqlash qo‘llab-quvvatlanmaydi",dn:"Mikrofonga ruxsat berilmadi",net:"Nutqni aniqlash uchun internet kerak",hr:"Eshitildi: "},
tk:{on:"🎤 Ses bilen sanamak: açyk",off:"🎤 Ses bilen sanamak: ýapyk",ls:"Diňleýär… zikri aýt",ns:"Sözi tanamak goldanylmaýar",dn:"Mikrofon ygtyýary berilmedi",net:"Sözi tanamak üçin internet gerek",hr:"Eşidildi: "},
ps:{on:"🎤 په غږ شمېرل: فعال",off:"🎤 په غږ شمېرل: بند",ls:"اورم… ذکر ووایئ",ns:"دا د خبرو پېژندنه نه ملاتړ کوي",dn:"د مایکروفون اجازه ورنکړل شوه",net:"د خبرو پېژندنې لپاره انټرنیټ ضروري دی",hr:"واورېدل: "}
};
function X(){return D[L()]||D.en;}
var old=$("vc");if(old)old.style.display="none";
var vc=document.createElement("button");vc.className="btn";vc.id="vc2";vc.setAttribute("aria-pressed","false");
(old?old.parentNode:$("undo").parentNode).appendChild(vc);
var vt=$("vtxt");
if(!vt){vt=document.createElement("p");vt.id="vtxt";vt.style.cssText="min-height:1.2rem;text-align:center;color:var(--muted);font-size:.85rem;margin:0";$("msg").insertAdjacentElement("afterend",vt);}
var st=document.createElement("style");st.textContent="#vc2[aria-pressed=\"true\"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}";document.head.appendChild(st);
var SR=window.SpeechRecognition||window.webkitSpeechRecognition,rec=null,on=false,done={},prev="",wl=null,tmr=null;
function labels(){vc.textContent=on?X().on:X().off;vc.setAttribute("aria-pressed",on);}
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
function nz(s){return (s||"").replace(/[\u064B-\u065F\u0670\u0640\u200c\u200f]/g,"").replace(/[\u0623\u0625\u0622\u0671]/g,"\u0627").replace(/\u0649|\u06cc/g,"\u064a").replace(/\u06a9/g,"\u0643").replace(/\u0629/g,"\u0647").replace(/\u0624/g,"\u0648").replace(/\u0626/g,"\u064a").replace(/\s+/g," ").trim();}
function rule(){
  var t=nz($("zname").textContent);if(!t)return null;
  if(t.indexOf("\u0648\u062d\u062f\u0647")>-1)return{p:["\u0648\u062d\u062f\u0647"]};
  if(t.indexOf("\u0648\u0628\u062d\u0645\u062f\u0647")>-1)return{p:["\u0648\u0628\u062d\u0645\u062f\u0647"]};
  if(t.indexOf("\u062d\u0648\u0644")>-1)return{e:["\u062d\u0648\u0644"]};
  if(t.indexOf("\u062d\u0633\u0628\u0646\u0627")>-1)return{p:["\u062d\u0633\u0628\u0646\u0627"]};
  if(t.indexOf("\u0627\u0644\u0644\u0647\u0645")>-1||t.indexOf("\u0635\u0644\u0648\u0627\u062a")>-1)return{p:["\u0627\u0644\u0644\u0647\u0645","\u0635\u0644\u0648\u0627\u062a"]};
  if(t.indexOf("\u0633\u0628\u062d\u0627\u0646")>-1)return{p:["\u0633\u0628\u062d\u0627\u0646"]};
  if(t.indexOf("\u0627\u0644\u062d\u0645\u062f")>-1)return{p:["\u0627\u0644\u062d\u0645\u062f"]};
  if(t.indexOf("\u0627\u0643\u0628\u0631")>-1)return{p:["\u0627\u0643\u0628\u0631"]};
  if(t.indexOf("\u0627\u0633\u062a\u063a\u0641\u0631")>-1)return{p:["\u0627\u0633\u062a\u063a\u0641\u0631"]};
  return{e:["\u0627\u0644\u0627"]};
}
function cnt(tx,r){var w=nz(tx).split(" "),n=0;w.forEach(function(x){var ok=false;(r.p||[]).forEach(function(p){if(x.indexOf(p)===0)ok=true;});(r.e||[]).forEach(function(p){if(x===p)ok=true;});if(ok)n++;});return n;}
function bump(k){for(var i=0;i<k;i++){setTimeout(function(){$("tap").click();},i*160);}}
function say(m){vt.textContent=m||"";}
/* count only finished phrases, and never count the same words twice */
function onres(e){
  var r=rule(),shown="";
  for(var i=e.resultIndex;i<e.results.length;i++){
    var res=e.results[i],tx=res[0].transcript;shown=tx;
    if(!res.isFinal||done[i])continue;
    done[i]=1;
    var cur=nz(tx),nw=cur;
    if(prev&&cur.length>prev.length&&cur.indexOf(prev)===0)nw=cur.slice(prev.length);
    prev=cur;
    if(r){var n=cnt(nw,r);if(n)bump(n);}else if(nw.trim()){bump(1);}
  }
  say(X().hr+shown);
}
function startRec(){
  if(!on)return;
  try{
    rec=new SR();rec.lang="ar-SA";rec.continuous=true;rec.interimResults=true;rec.maxAlternatives=1;
    rec.onstart=function(){done={};prev="";if(!vt.textContent)say(X().ls);};
    rec.onresult=onres;
    rec.onerror=function(e){
      if(e.error==="not-allowed"||e.error==="service-not-allowed"){stop();say(X().dn);}
      else if(e.error==="network"){say(X().net);}
    };
    rec.onend=function(){if(on&&!document.hidden){clearTimeout(tmr);tmr=setTimeout(startRec,350);}};
    rec.start();
  }catch(x){}
}
function wake(){try{if(navigator.wakeLock&&on){navigator.wakeLock.request("screen").then(function(l){wl=l;}).catch(function(){});}}catch(x){}}
function start(){if(!SR){say(X().ns);return;}on=true;done={};prev="";say(X().ls);labels();startRec();wake();}
function stop(){on=false;clearTimeout(tmr);try{rec&&rec.abort();}catch(x){}try{wl&&wl.release();}catch(x){}wl=null;say("");labels();}
vc.onclick=function(){if(on)stop();else start();};
document.addEventListener("visibilitychange",function(){if(on&&!document.hidden){wake();startRec();}});
labels();
})();
