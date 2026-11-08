(function(){
var D={
fa:{fm:"⛶ تمام‌صفحه",hwOn:"🔘 دکمه‌ی بیرونی: روشن",hwOff:"🔘 دکمه‌ی بیرونی: خاموش",ex:"برای خروج، ✕ را نگه دار",note:"دکمه‌های ولوم گوشی برای مرورگر قابل خواندن نیستند. دکمه‌ی هدفون یا بلوتوث و کیبورد کار می‌کنند."},
en:{fm:"⛶ Focus",hwOn:"🔘 External keys: On",hwOff:"🔘 External keys: Off",ex:"Hold ✕ to exit",note:"Phone volume keys can’t be read by browsers. Headset/Bluetooth buttons and keyboards work."},
ar:{fm:"⛶ ملء الشاشة",hwOn:"🔘 الأزرار الخارجية: مفعّل",hwOff:"🔘 الأزرار الخارجية: متوقف",ex:"اضغط مطولًا على ✕ للخروج",note:"لا يمكن للمتصفح قراءة أزرار الصوت. تعمل أزرار السماعة والبلوتوث ولوحة المفاتيح."}
};
function $(i){return document.getElementById(i);}
function L(){return D[document.documentElement.lang]||D.en;}
var st=document.createElement("style");
st.textContent="#fso{position:fixed;inset:0;z-index:60;background:var(--bg);color:var(--ink);display:none;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:24px;touch-action:manipulation;user-select:none;-webkit-user-select:none}#fso.on{display:flex}#fsn{font-size:2rem;font-weight:800;line-height:1.7;margin:0}#fsc{font-size:min(38vw,10rem);font-weight:800;line-height:1;font-variant-numeric:tabular-nums}#fsg{font-size:1.1rem;color:var(--muted);margin:0}#fsh{position:absolute;bottom:calc(20px + env(safe-area-inset-bottom,0px));font-size:.8rem;color:var(--muted);opacity:.7;margin:0}#fsx{position:absolute;top:calc(14px + env(safe-area-inset-top,0px));left:14px;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:1.2rem;opacity:.6;touch-action:none}#hw[aria-pressed=\"true\"],#fm[aria-pressed=\"true\"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}";
document.head.appendChild(st);
var fso=document.createElement("div");fso.id="fso";
fso.innerHTML='<button id="fsx" aria-label="exit">✕</button><p id="fsn"></p><div id="fsc">0</div><p id="fsg"></p><p id="fsh"></p>';
document.body.appendChild(fso);
var row=$("undo").parentNode,fm=document.createElement("button"),hw=document.createElement("button");
fm.className="btn";fm.id="fm";hw.className="btn";hw.id="hw";row.appendChild(fm);row.appendChild(hw);
var fsOn=false,hwOn=false,ms=false,au=null,wl=null,ht=null;
function meta(){if(!ms||!navigator.mediaSession)return;try{navigator.mediaSession.metadata=new MediaMetadata({title:$("count").textContent+" "+$("of").textContent,artist:$("zname").textContent||"طُمأنينة الذِّكر",album:"طُمأنينة الذِّكر"});}catch(e){}}
function syn(){$("fsn").textContent=$("zname").textContent;$("fsc").textContent=$("count").textContent;$("fsg").textContent=$("of").textContent;meta();}
function labels(){var l=L();fm.textContent=l.fm;fm.setAttribute("aria-pressed",fsOn);hw.textContent=hwOn?l.hwOn:l.hwOff;hw.setAttribute("aria-pressed",hwOn);$("fsh").textContent=l.ex;}
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
var mo=new MutationObserver(syn),oo={childList:true,characterData:true,subtree:true};
mo.observe($("count"),oo);mo.observe($("of"),oo);mo.observe($("zname"),oo);
function tap(){$("tap").click();}
function wav(){var n=64000,b=new ArrayBuffer(44+n),v=new DataView(b);function w(o,s){for(var i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));}
w(0,"RIFF");v.setUint32(4,36+n,true);w(8,"WAVE");w(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,"data");v.setUint32(40,n,true);
for(var i=0;i<n;i++)v.setUint8(44+i,128+((i%40)<20?3:-3));return URL.createObjectURL(new Blob([b],{type:"audio/wav"}));}
function startMS(){ms=true;try{au=au||new Audio();au.src=wav();au.loop=true;au.volume=1;au.play().catch(function(){});
 if(navigator.mediaSession){meta();navigator.mediaSession.playbackState="playing";
  ["play","pause","nexttrack","previoustrack"].forEach(function(a){try{navigator.mediaSession.setActionHandler(a,function(){tap();if(a==="play"||a==="pause"){setTimeout(function(){au.play().catch(function(){});},60);}});}catch(e){}});}}catch(e){}}
function stopMS(){ms=false;try{au&&au.pause();}catch(e){}try{["play","pause","nexttrack","previoustrack"].forEach(function(a){navigator.mediaSession.setActionHandler(a,null);});}catch(e){}}
function sync(){var need=hwOn||fsOn;if(need&&!ms)startMS();if(!need&&ms)stopMS();}
function wake(){try{if(navigator.wakeLock&&!wl){navigator.wakeLock.request("screen").then(function(l){wl=l;}).catch(function(){});}}catch(e){}}
function unwake(){try{wl&&wl.release();}catch(e){}wl=null;}
function enter(){fsOn=true;fso.classList.add("on");syn();try{if(document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(function(){});}catch(e){}wake();sync();labels();}
function leave(){fsOn=false;fso.classList.remove("on");try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}unwake();sync();labels();}
fm.onclick=function(){if(fsOn)leave();else enter();};
hw.onclick=function(){hwOn=!hwOn;sync();labels();if(hwOn){var v=$("vtxt");if(!v){v=document.createElement("p");v.id="vtxt";v.style.cssText="text-align:center;color:var(--muted);font-size:.85rem;margin:0";$("msg").insertAdjacentElement("afterend",v);}v.textContent=L().note;}};
fso.addEventListener("click",tap);
var fx=$("fsx");
fx.addEventListener("click",function(e){e.stopPropagation();});
fx.addEventListener("pointerdown",function(e){e.stopPropagation();ht=setTimeout(leave,600);});
["pointerup","pointerleave","pointercancel"].forEach(function(ev){fx.addEventListener(ev,function(){clearTimeout(ht);});});
document.addEventListener("keydown",function(e){
 if(!(hwOn||fsOn))return;var t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"))return;
 var k=e.key||"",c=e.code||"";
 if(/^(AudioVolume|Volume)(Up|Down)$/.test(k)||/^(AudioVolume|Volume)(Up|Down)$/.test(c)||k===" "||k==="Enter"||k==="ArrowUp"||k==="ArrowDown"||k==="PageUp"||k==="PageDown"){if(e.repeat)return;e.preventDefault();tap();}
});
document.addEventListener("visibilitychange",function(){if(fsOn&&!document.hidden){wake();}});
labels();syn();
})();
