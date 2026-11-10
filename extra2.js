(function(){
function $(i){return document.getElementById(i);}
function L(){return document.documentElement.lang;}
var TX={
fa:{lang:"زبان",look:"ظاهر، صدا و لرزش",beads:"تسبیح (دانه‌ها)",shape:"شکل دانه",color:"رنگ دانه",share:"اشتراک‌گذاری آمار",ph:"ذکر دلخواهت را بنویس…",shapes:{o:"خاموش",c:"دایره",t:"مثلث",s:"مربع"}},
en:{lang:"Language",look:"Look, sound & vibration",beads:"Tasbih beads",shape:"Bead shape",color:"Bead color",share:"Share stats",ph:"Write your own dhikr…",shapes:{o:"Off",c:"Circle",t:"Triangle",s:"Square"}},
ar:{lang:"اللغة",look:"المظهر والصوت والاهتزاز",beads:"حبات المسبحة",shape:"شكل الحبة",color:"لون الحبة",share:"مشاركة الإحصاءات",ph:"اكتب ذكرك…",shapes:{o:"متوقف",c:"دائرة",t:"مثلث",s:"مربع"}}
};
function X(){return TX[L()]||TX.en;}
var FK="zekr-ui2",U={sh:"c",bc:"#d6a848",ct:"",cx:-1};
try{var u0=JSON.parse(localStorage.getItem(FK));if(u0)for(var k0 in u0)U[k0]=u0[k0];}catch(e){}
function sv(){try{localStorage.setItem(FK,JSON.stringify(U));}catch(e){}}
function num(s){return parseInt(String(s).replace(/[\u06F0-\u06F9]/g,function(d){return d.charCodeAt(0)-1776;}).replace(/[\u0660-\u0669]/g,function(d){return d.charCodeAt(0)-1632;}),10);}

/* no silent audio unless the external-keys button is on */
var _p=HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play=function(){if(this.loop&&$("hw")&&$("hw").getAttribute("aria-pressed")!=="true"){return Promise.resolve();}return _p.apply(this,arguments);};

var cs=document.createElement("style");
cs.textContent="svg.bd .track,svg.bd .bar{display:none}.stage svg{cursor:pointer}#s-lang .btn,#s-look .btn,#s-share .btn{display:block;width:100%;margin:8px 0}#cin{width:100%;font:inherit;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:var(--ink)}#cinw{display:none}.dots{flex-wrap:wrap}";
document.head.appendChild(cs);

/* undo + reset to the top row */
var row=document.querySelector(".top .row");
if(row){row.insertBefore($("undo"),row.firstChild);row.insertBefore($("reset"),$("undo").nextSibling);}

/* reset only clears the number in the circle */
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

/* settings sections: language, look/sound/vibration, beads, share */
var det=document.querySelector("details.set"),first=det?det.querySelector(".sec"):null;
function mk(id,atEnd){var d=document.createElement("div");d.className="sec";d.id=id;if(det){if(atEnd)det.appendChild(d);else det.insertBefore(d,first||null);}return d;}
var sLang=mk("s-lang"),sLook=mk("s-look"),sBead=mk("s-bead"),sShare=mk("s-share",true);
function lab(el,t){var p=el.querySelector(".label");if(!p){p=document.createElement("p");p.className="label";el.insertBefore(p,el.firstChild);}p.textContent=t;}
function labels(){var x=X();lab(sLang,x.lang);lab(sLook,x.look);lab(sBead,x.beads);lab(sShare,x.share);buildBeads();}
labels();
sLang.appendChild($("lg"));sLang.appendChild($("lgm"));
sLook.appendChild($("theme"));sLook.appendChild($("snd"));sLook.appendChild($("vib"));
sShare.appendChild($("shr"));
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});

/* tasbih beads */
var NS="http://www.w3.org/2000/svg",svg=document.querySelector(".stage svg"),g=document.createElementNS(NS,"g");
svg.appendChild(g);
svg.addEventListener("click",function(){$("tap").click();});
function draw(){
  while(g.firstChild)g.removeChild(g.firstChild);
  if(U.sh==="o"){svg.classList.remove("bd");return;}
  svg.classList.add("bd");
  var cnt=num($("count").textContent),m=$("of").textContent.match(/[\d\u06F0-\u06F9\u0660-\u0669]+/),goal=m?num(m[0]):33,N=33,lit=goal>0?Math.floor(cnt/goal*N):0;
  for(var i=0;i<N;i++){
    var a=2*Math.PI*i/N,x=130+120*Math.cos(a),y=130+120*Math.sin(a),e;
    if(U.sh==="t"){e=document.createElementNS(NS,"polygon");e.setAttribute("points","-8,7 8,7 0,-9");}
    else if(U.sh==="s"){e=document.createElementNS(NS,"rect");e.setAttribute("x",-7);e.setAttribute("y",-7);e.setAttribute("width",14);e.setAttribute("height",14);}
    else{e=document.createElementNS(NS,"circle");e.setAttribute("r",8);}
    e.setAttribute("transform","translate("+x+","+y+") rotate("+(a*180/Math.PI+90)+")");
    e.setAttribute("fill",i<lit?U.bc:"var(--ring)");
    g.appendChild(e);
  }
}
function buildBeads(){
  var x=X();
  [].slice.call(sBead.children).forEach(function(c,i){if(i>0)c.remove();});
  var p=document.createElement("p");p.className="label";p.textContent=x.shape;sBead.appendChild(p);
  var ch=document.createElement("div");ch.className="chips";ch.style.flexWrap="wrap";sBead.appendChild(ch);
  ["o","c","t","s"].forEach(function(k){var b=document.createElement("button");b.className="chip";b.textContent=x.shapes[k];b.setAttribute("aria-pressed",U.sh===k);b.onclick=function(){U.sh=k;sv();draw();buildBeads();};ch.appendChild(b);});
  var p2=document.createElement("p");p2.className="label";p2.style.marginTop="12px";p2.textContent=x.color;sBead.appendChild(p2);
  var dots=document.createElement("div");dots.className="dots";sBead.appendChild(dots);
  ["#d6a848","#f0ece0","#e0432a","#3b7fc4","#8b5cc7","#12a89c","#2e7d32","#a9703a"].forEach(function(c){var b=document.createElement("button");b.className="dot";b.style.background=c;b.setAttribute("aria-label",c);b.setAttribute("aria-pressed",U.bc===c);b.onclick=function(){U.bc=c;sv();draw();buildBeads();};dots.appendChild(b);});
}
var ob={childList:true,characterData:true,subtree:true};
new MutationObserver(draw).observe($("count"),ob);new MutationObserver(draw).observe($("of"),ob);
draw();

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
      var b=document.createElement("button");b.className="chip";b.dataset.x=i;b.dataset.k=e[0];b.textContent=e[0];
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
})();
