(function(){
var D={
fa:{gs:"\u2699 \u062a\u0646\u0638\u06cc\u0645\u0627\u062a",on:"\ud83c\udfa4 \u0634\u0645\u0627\u0631\u0634 \u0628\u0627 \u0635\u062f\u0627: \u0631\u0648\u0634\u0646",off:"\ud83c\udfa4 \u0634\u0645\u0627\u0631\u0634 \u0628\u0627 \u0635\u062f\u0627: \u062e\u0627\u0645\u0648\u0634",ls:"\u062f\u0631 \u062d\u0627\u0644 \u06af\u0648\u0634 \u062f\u0627\u062f\u0646\u2026 \u0630\u06a9\u0631 \u0631\u0648 \u0628\u06af\u0648",ns:"\u0627\u06cc\u0646 \u0645\u0631\u0648\u0631\u06af\u0631 \u062a\u0634\u062e\u06cc\u0635 \u06af\u0641\u062a\u0627\u0631 \u0646\u062f\u0627\u0631\u062f",dn:"\u0627\u062c\u0627\u0632\u0647\u200c\u06cc \u0645\u06cc\u06a9\u0631\u0648\u0641\u0648\u0646 \u062f\u0627\u062f\u0647 \u0646\u0634\u062f",net:"\u0628\u0631\u0627\u06cc \u062a\u0634\u062e\u06cc\u0635 \u06af\u0641\u062a\u0627\u0631 \u0627\u06cc\u0646\u062a\u0631\u0646\u062a \u0644\u0627\u0632\u0645 \u0627\u0633\u062a",hr:"\u0634\u0646\u06cc\u062f\u0645: "},
en:{gs:"\u2699 Settings",on:"\ud83c\udfa4 Voice count: On",off:"\ud83c\udfa4 Voice count: Off",ls:"Listening\u2026 say your dhikr",ns:"Speech recognition is not supported here",dn:"Microphone permission denied",net:"Speech recognition needs internet",hr:"Heard: "},
ar:{gs:"\u2699 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a",on:"\ud83c\udfa4 \u0627\u0644\u0639\u062f \u0628\u0627\u0644\u0635\u0648\u062a: \u0645\u0641\u0639\u0651\u0644",off:"\ud83c\udfa4 \u0627\u0644\u0639\u062f \u0628\u0627\u0644\u0635\u0648\u062a: \u0645\u062a\u0648\u0642\u0641",ls:"\u0623\u0633\u062a\u0645\u0639\u2026 \u0642\u0644 \u0627\u0644\u0630\u0643\u0631",ns:"\u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0643\u0644\u0627\u0645 \u063a\u064a\u0631 \u0645\u062f\u0639\u0648\u0645",dn:"\u062a\u0645 \u0631\u0641\u0636 \u0625\u0630\u0646 \u0627\u0644\u0645\u064a\u0643\u0631\u0648\u0641\u0648\u0646",net:"\u064a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0625\u0646\u062a\u0631\u0646\u062a",hr:"\u0633\u0645\u0639\u062a: "}
};
function $(i){return document.getElementById(i);}
function L(){return D[document.documentElement.lang]||D.en;}
var css=document.createElement("style");
css.textContent="#vtxt{min-height:1.2rem;text-align:center;color:var(--muted);font-size:.85rem;margin:0}#vc[aria-pressed=\"true\"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}#gs{flex:none!important;padding:8px 14px!important;font-size:.95rem!important}.hl{display:flex;justify-content:space-between;align-items:center;gap:8px}";
document.head.appendChild(css);

/* settings button at the top corner */
var top=document.querySelector(".top"),h1=top.querySelector("h1"),det=document.querySelector("details.set");
var gs=document.createElement("button");gs.className="btn";gs.id="gs";
var line=document.createElement("div");line.className="hl";
top.insertBefore(line,top.firstChild);line.appendChild(h1);line.appendChild(gs);
if(det){top.insertAdjacentElement("afterend",det);det.open=true;det.style.display="none";var sm=det.querySelector("summary");if(sm)sm.style.display="none";}
gs.onclick=function(){if(det)det.style.display=det.style.display==="none"?"block":"none";};

/* voice counting */
var vc=document.createElement("button");vc.className="btn";vc.id="vc";vc.setAttribute("aria-pressed","false");
$("undo").parentNode.appendChild(vc);
var vt=document.createElement("p");vt.id="vtxt";$("msg").insertAdjacentElement("afterend",vt);
var SR=window.SpeechRecognition||window.webkitSpeechRecognition,rec=null,on=false,done={},wl=null,tmr=null;
function labels(){var l=L();gs.textContent=l.gs;vc.textContent=on?l.on:l.off;vc.setAttribute("aria-pressed",on);}
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
function bump(k){for(var i=0;i<k;i++){setTimeout(function(){$("tap").click();},i*140);}}
function say(m){vt.textContent=m||"";}
function onres(e){
  var r=rule(),shown="";
  for(var i=e.resultIndex;i<e.results.length;i++){
    var res=e.results[i],tx=res[0].transcript;shown=tx;
    if(r){var n=cnt(tx,r),p=done[i]||0;if(n>p){bump(n-p);done[i]=n;}}
    else if(res.isFinal&&!done[i]){bump(1);done[i]=1;}
  }
  say(L().hr+shown);
}
function startRec(){
  if(!on)return;
  try{
    rec=new SR();rec.lang="ar-SA";rec.continuous=true;rec.interimResults=true;rec.maxAlternatives=1;
    rec.onstart=function(){done={};if(!vt.textContent)say(L().ls);};
    rec.onresult=onres;
    rec.onerror=function(e){
      if(e.error==="not-allowed"||e.error==="service-not-allowed"){stop();say(L().dn);}
      else if(e.error==="network"){say(L().net);}
    };
    rec.onend=function(){if(on&&!document.hidden){clearTimeout(tmr);tmr=setTimeout(startRec,350);}};
    rec.start();
  }catch(x){}
}
function wake(){try{if(navigator.wakeLock&&on){navigator.wakeLock.request("screen").then(function(l){wl=l;}).catch(function(){});}}catch(x){}}
function start(){if(!SR){say(L().ns);return;}on=true;done={};say(L().ls);labels();startRec();wake();}
function stop(){on=false;clearTimeout(tmr);try{rec&&rec.abort();}catch(x){}try{wl&&wl.release();}catch(x){}wl=null;say("");labels();}
vc.onclick=function(){if(on)stop();else start();};
document.addEventListener("visibilitychange",function(){if(on&&!document.hidden){wake();startRec();}});
labels();
})();
