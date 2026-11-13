 (function(){
function $(i){return document.getElementById(i);}
function L(){return document.documentElement.lang;}
var TX={
fa:{gs:"⚙ تنظیمات",lang:"زبان",theme:"حالت تاریک",sndv:"صدا و لرزش",tb:"تسبیح",show:"نمایش تسبیح",on:"روشن",off:"خاموش",col:"رنگ دانه‌ها",ph:"ذکر دلخواهت را بنویس…"},
en:{gs:"⚙ Settings",lang:"Language",theme:"Dark mode",sndv:"Sound & vibration",tb:"Tasbih",show:"Show tasbih",on:"On",off:"Off",col:"Bead color",ph:"Write your own dhikr…"},
ar:{gs:"⚙ الإعدادات",lang:"اللغة",theme:"الوضع الليلي",sndv:"الصوت والاهتزاز",tb:"المسبحة",show:"إظهار المسبحة",on:"تشغيل",off:"إيقاف",col:"لون الحبات",ph:"اكتب ذكرك…"},
uz:{gs:"⚙ Sozlamalar",lang:"Til",theme:"Tungi rejim",sndv:"Ovoz va tebranish",tb:"Tasbeh",show:"Tasbehni ko‘rsatish",on:"Yoqilgan",off:"O‘chiq",col:"Donalar rangi",ph:"O‘z zikringizni yozing…"},
tk:{gs:"⚙ Sazlamalar",lang:"Dil",theme:"Gijeki rejim",sndv:"Ses we titreme",tb:"Tesbih",show:"Tesbihi görkez",on:"Açyk",off:"Ýapyk",col:"Dänelerň reňki",ph:"Öz zikriňi ýaz…"},
ps:{gs:"⚙ تنظیمات",lang:"ژبه",theme:"تیاره حالت",sndv:"غږ او لړزېدنه",tb:"تسبیح",show:"تسبیح ښکاره کړه",on:"فعال",off:"بند",col:"د دانو رنګ",ph:"خپل ذکر ولیکئ…"}
};
function X(){return TX[L()]||TX.en;}
var FK="zekr-ui2",U={tb:1,bc:"#d6a848",ct:"",cx:-1};
try{var u0=JSON.parse(localStorage.getItem(FK));if(u0)for(var k0 in u0)U[k0]=u0[k0];}catch(e){}
function sv(){try{localStorage.setItem(FK,JSON.stringify(U));}catch(e){}}
function num(s){return parseInt(String(s).replace(/[\u06F0-\u06F9]/g,function(d){return d.charCodeAt(0)-1776;}).replace(/[\u0660-\u0669]/g,function(d){return d.charCodeAt(0)-1632;}),10);}

/* polite reminder messages */
if(window.T){
  if(T.rm){T.rm.fa="🌿 وقت ذکر صبح است؛ دلت را با یاد خدا آرام کن";T.rm.en="🌿 Time for your morning dhikr. May it bring peace to your heart";}
  if(T.rn){T.rn.fa="🌙 وقت ذکر شب است؛ شبت با یاد خدا آرام باد";T.rn.en="🌙 Time for your evening dhikr. May your night be peaceful";}
}

/* the silent audio never plays */
var _p=HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play=function(){if(this.loop&&this.src&&this.src.indexOf("blob:")===0){return Promise.resolve();}return _p.apply(this,arguments);};

var cs=document.createElement("style");
cs.textContent=".stage svg.ts{transform:none;overflow:visible}svg.ts .track,svg.ts .bar{display:none}body.tb .stage{margin-bottom:64px}body.tb #tap{inset:34px}.stage svg{cursor:pointer}#s-lang .btn,#s-theme .btn,#s-snd .btn,#s-share .btn{display:block;width:100%;margin:8px 0}#cin{width:100%;font:inherit;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:var(--ink)}#cinw{display:none}.dots{flex-wrap:wrap}";
document.head.appendChild(cs);

/* remove one-hand and external-keys buttons */
if(document.body.classList.contains("one"))$("one").click();
if($("hw")&&$("hw").getAttribute("aria-pressed")==="true")$("hw").click();
$("one").style.display="none";if($("hw"))$("hw").style.display="none";

/* undo + reset in the top row */
var row=document.querySelector(".top .row");
if(row){row.insertBefore($("undo"),row.firstChild);row.insertBefore($("reset"),$("undo").nextSibling);}
var rb=$("reset");
rb.onclick=function(){
  if(rb.dataset.sure){
    try{var o=JSON.parse(localStorage.getItem("zekr-counter-v1"));o.count=0;localStorage.setItem("zekr-counter-v1",JSON.stringify(o));}catch(e){}
    location.reload();
  }else{
    rb.dataset.sure="1";var s=window.T&&T.sure;rb.textContent=s?(s[L()]||s.en):"?";
    setTimeout(function(){rb.dataset.sure="";var r=window.T&&T.reset;if(r)rb.textContent=r[L()]||r.en;},3000);
  }
};

/* settings sections */
var det=document.querySelector("details.set"),first=det?det.querySelector(".sec"):null;
function mk(id,atEnd){var d=document.createElement("div");d.className="sec";d.id=id;if(det){if(atEnd)det.appendChild(d);else det.insertBefore(d,first||null);}return d;}
var sLang=mk("s-lang"),sTheme=mk("s-theme"),sSnd=mk("s-snd"),sTb=mk("s-tb");
var zsw=$("zsw");if(det&&zsw){zsw.classList.add("sec");det.appendChild(zsw);}
var sShare=mk("s-share",true);
function lab(el,t){var p=el.querySelector(".label");if(!p){p=document.createElement("p");p.className="label";el.insertBefore(p,el.firstChild);}p.textContent=t;}
function labels(){
  var x=X(),sh=window.T&&T.share?(T.share[L()]||T.share.en):"";
  lab(sLang,x.lang);lab(sTheme,x.theme);lab(sSnd,x.sndv);lab(sTb,x.tb);lab(sShare,sh);
  $("gs").textContent=x.gs;buildTb();
}
sLang.appendChild($("lg"));sLang.appendChild($("lgm"));
sTheme.appendChild($("theme"));
sSnd.appendChild($("snd"));sSnd.appendChild($("vib"));
sShare.appendChild($("shr"));

/* real tasbih drawing */
var NS="http://www.w3.org/2000/svg",svg=document.querySelector(".stage svg"),box=document.createElementNS(NS,"g"),rot=0,last=null;
svg.appendChild(box);
svg.addEventListener("click",function(){$("tap").click();});
function build(){
  svg.classList.toggle("ts",!!U.tb);document.body.classList.toggle("tb",!!U.tb);
  if(!U.tb){box.innerHTML="";return;}
  var s='<defs><radialGradient id="tg" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></radialGradient></defs>';
  s+='<circle cx="130" cy="130" r="108" fill="none" stroke="var(--muted)" stroke-width="2"/><g id="tr" style="transform-origin:130px 130px;transition:transform .25s ease;transform:rotate('+rot+'deg)">';
  for(var i=0;i<33;i++){var a=2*Math.PI*i/33,x=(130+108*Math.cos(a)).toFixed(1),y=(130+108*Math.sin(a)).toFixed(1);s+='<circle cx="'+x+'" cy="'+y+'" r="9" fill="'+U.bc+'"/><circle cx="'+x+'" cy="'+y+'" r="9" fill="url(#tg)"/>';}
  s+='</g><circle cx="130" cy="258" r="11" fill="'+U.bc+'"/><circle cx="130" cy="258" r="11" fill="url(#tg)"/><rect x="128" y="269" width="4" height="12" fill="#d6a848"/><circle cx="130" cy="286" r="6" fill="#d6a848"/><path d="M122 292h16l5 26h-26z" fill="#d6a848"/><path d="M124 2h12l-6 11z" fill="var(--ink)" opacity=".7"/>';
  box.innerHTML=s;
}
function onc(){
  var v=num($("count").textContent);
  if(last!==null&&U.tb){if(v>last)rot+=360/33;else if(v<last&&v>0)rot-=360/33;}
  last=v;var r=$("tr");if(r)r.style.transform="rotate("+rot+"deg)";
}
var ob={childList:true,characterData:true,subtree:true};
new MutationObserver(onc).observe($("count"),ob);
function buildTb(){
  var x=X();
  [].slice.call(sTb.children).forEach(function(c,i){if(i>0)c.remove();});
  var ch=document.createElement("div");ch.className="chips";sTb.appendChild(ch);
  [[1,x.on],[0,x.off]].forEach(function(p){var b=document.createElement("button");b.className="chip";b.textContent=x.show+": "+p[1];b.setAttribute("aria-pressed",!!U.tb===!!p[0]);b.onclick=function(){U.tb=p[0];sv();build();buildTb();};ch.appendChild(b);});
  var p2=document.createElement("p");p2.className="label";p2.style.marginTop="12px";p2.textContent=x.col;sTb.appendChild(p2);
  var dots=document.createElement("div");dots.className="dots";sTb.appendChild(dots);
  ["#d6a848","#f0ece0","#e0432a","#3b7fc4","#8b5cc7","#12a89c","#2e7d32","#a9703a"].forEach(function(c){var b=document.createElement("button");b.className="dot";b.style.background=c;b.setAttribute("aria-label",c);b.setAttribute("aria-pressed",U.bc===c);b.onclick=function(){U.bc=c;sv();build();buildTb();};dots.appendChild(b);});
}
labels();build();
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});

/* extra dhikrs, custom dhikr text, hide the old long dhikr */
var EX=[
["سبحان الله العظیم","خدای بزرگ از هر نقصی پاک است"],
["لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ","جز تو معبودی نیست، تو پاکی؛ من از ستمکاران بودم"],
["اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ","خدایا مرا بر یاد و سپاس و نیکویی عبادتت یاری کن"],
["سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ","خدا را از هر نقصی پاک می‌دانم و می‌ستایم؛ خدای بزرگ پاک است"],
["اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي","خدایا تو بخشنده‌ای و بخشش را دوست داری؛ پس مرا ببخش"],
["أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ","از خدای بزرگ که جز او معبودی نیست، زنده‌ی پایدار، آمرزش می‌خواهم و به سویش بازمی‌گردم"],
["لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ","جز خدای یگانه و بی‌شریک معبودی نیست؛ فرمانروایی و ستایش از آنِ اوست و او بر هر چیز تواناست"],
["اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","خدایا از تو هدایت و پرهیزگاری و پاکدامنی و بی‌نیازی می‌خواهم"]
];
var zk=$("zikrs"),zn=$("zname"),zm=$("zmean");
var wrap=document.createElement("div");wrap.id="cinw";wrap.innerHTML='<input id="cin" maxlength="80">';
zk.parentNode.insertAdjacentElement("afterend",wrap);
var inp=$("cin");
function customOn(){try{return JSON.parse(localStorage.getItem("zekr-counter-v1")).zikr===Z.length-1;}catch(e){return false;}}
function cKey(){var c=window.T&&T.custom;return c?(c[L()]||c.en):"";}
function findC(){return [].slice.call(zk.children).filter(function(c){return !c.dataset.x&&(c.dataset.k||c.textContent.replace(/[★☆]/g,"").trim())===cKey();})[0];}
function setText(){
  var on=customOn();
  wrap.style.display=on?"block":"none";
  if(on){
    inp.placeholder=X().ph;
    if(document.activeElement!==inp)inp.value=U.cx<0?U.ct:"";
    if(U.ct&&zn.textContent!==U.ct)zn.textContent=U.ct;
    var mean=(L()==="fa"&&U.cx>=0&&EX[U.cx]&&EX[U.cx][0]===U.ct)?EX[U.cx][1]:"";
    if(zm.textContent!==mean)zm.textContent=mean;
  }
}
function ex(){
  var c=findC(),on=customOn();
  [].slice.call(zk.children).forEach(function(ch){
    var k=(ch.dataset.k||"");
    if(!ch.dataset.x&&k.indexOf("وحده")>-1)ch.style.display="none";
  });
  if(!zk.querySelector("[data-x]")){
    EX.forEach(function(e,i){
      var b=document.createElement("button");b.className="chip";b.dataset.x=i;b.textContent=e[0];
      b.onclick=function(){U.cx=i;U.ct=e[0];sv();var cc=findC();if(cc&&!customOn()){cc.click();}else{setText();ex();}};
      if(c)zk.insertBefore(b,c);else zk.appendChild(b);
    });
  }
  [].slice.call(zk.querySelectorAll("[data-x]")).forEach(function(b){b.setAttribute("aria-pressed",on&&U.cx===+b.dataset.x);});
  if(c)c.setAttribute("aria-pressed",on&&U.cx<0);
  setText();
}
inp.addEventListener("input",function(){U.ct=inp.value;U.cx=-1;sv();setText();ex();});
new MutationObserver(ex).observe(zk,{childList:true});
new MutationObserver(setText).observe(zn,ob);
ex();

/* voice counting lives in its own file */
var sc=document.createElement("script");sc.src="voice2.js";document.body.appendChild(sc);
})();
