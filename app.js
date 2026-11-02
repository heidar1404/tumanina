(function(){
var TARGETS=[33,99,100,0],KEY="zekr-counter-v1",CIRC=753.98;
function today(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
var S={zikr:0,target:33,custom:50,count:0,rounds:0,total:0,day:today(),vib:true,snd:true,one:false,hist:{},theme:"",lang:"fa",color:"green",rem:{on:false,m:"05:00",n:"20:00"},rd:{},dg:0,zs:{}};
try{var r=localStorage.getItem(KEY);if(r){var o=JSON.parse(r);for(var k in o){if(k in S)S[k]=o[k];}}}catch(e){}
if(S.day!==today()){S.day=today();S.total=0;S.rounds=0;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
var $=function(i){return document.getElementById(i)};
function t(k){return (T[k]||{})[S.lang]||(T[k]||{}).en||k;}
function fa(n){n=String(n);var d=DIG[S.lang];return d?n.replace(/\d/g,function(x){return d[x]}):n;}
function goal(){return S.target===0?S.custom:S.target;}
function isDark(){var a=document.documentElement.getAttribute("data-theme");if(a)return a==="dark";return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches;}
function buzz(p){if(S.vib&&navigator.vibrate){try{navigator.vibrate(p);}catch(e){}}}
var AC;
function snd(x){if(!S.snd)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();var n=AC.currentTime,f=x?[523,659]:[392];f.forEach(function(h,i){var o=AC.createOscillator(),g=AC.createGain(),s=n+i*.14;o.type="sine";o.frequency.value=h;g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(x?.12:.06,s+.02);g.gain.exponentialRampToValueAtTime(.0001,s+(x?.5:.12));o.connect(g);g.connect(AC.destination);o.start(s);o.stop(s+.55);});}catch(e){}}
var msgT;
function say(m){$("msg").textContent=m;clearTimeout(msgT);msgT=setTimeout(function(){$("msg").textContent="";},2500);}
function onoff(v){return t(v?"on":"off");}

function chips(){
  var z=$("zikrs");z.innerHTML="";
  Z.forEach(function(x,i){var b=document.createElement("button");b.className="chip";b.textContent=i===Z.length-1?t("custom"):x;b.setAttribute("aria-pressed",S.zikr===i);b.onclick=function(){S.zikr=i;save();chips();render();};z.appendChild(b);});
  var g=$("targets");g.innerHTML="";
  TARGETS.forEach(function(x){var b=document.createElement("button");b.className="chip";b.textContent=x===0?t("custom"):fa(x);b.setAttribute("aria-pressed",S.target===x);b.onclick=function(){S.target=x;if(S.count>=goal())S.count=0;save();chips();render();};g.appendChild(b);});
  if(S.target===0){var i=document.createElement("input");i.type="number";i.min="1";i.max="100000";i.inputMode="numeric";i.value=S.custom;i.onchange=function(){var v=parseInt(i.value,10);if(v>0){S.custom=v;if(S.count>=v)S.count=0;save();render();}};g.appendChild(i);}
  var d=$("dots");d.innerHTML="";
  [["green","#0f6b5c"],["blue","#3b7fc4"],["purple","#8b5cc7"],["brown","#a9703a"]].forEach(function(c){var b=document.createElement("button");b.className="dot";b.style.background=c[1];b.setAttribute("aria-label",c[0]);b.setAttribute("aria-pressed",S.color===c[0]);b.onclick=function(){S.color=c[0];save();chips();render();};d.appendChild(b);});
  var l=$("langs");l.innerHTML="";
  [["fa","فارسی"],["en","English"],["tr","Türkçe"],["id","Indonesia"],["fr","Français"],["ur","اردو"],["ru","Русский"],["ar","العربية"]].forEach(function(c){var b=document.createElement("button");b.className="chip";b.textContent=c[1];b.setAttribute("aria-pressed",S.lang===c[0]);b.onclick=function(){S.lang=c[0];$("lgm").style.display="none";save();chips();render();};l.appendChild(b);});
}
function stats(){
  var m=0,k;for(k in S.hist){if(S.hist[k]>m)m=S.hist[k];}
  var st=0,i=0;if(!(S.hist[S.day]>0))i=1;
  for(;;i++){var d=new Date(Date.now()-i*864e5),key=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();if(S.hist[key]>0)st++;else break;}
  $("best").textContent=fa(m);$("streak").textContent=fa(st);
}
function week(){
  var D=WD[S.lang],b=$("bars"),a=[],m=1,s=0;b.innerHTML="";
  for(var i=6;i>=0;i--){var d=new Date(Date.now()-i*864e5),k=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),v=S.hist[k]||0;a.push([D[d.getDay()],v]);if(v>m)m=v;s+=v;}
  a.forEach(function(x,j){var c=document.createElement("div");c.className="col";c.innerHTML="<span>"+(x[1]?fa(x[1]):"")+'</span><i class="'+(j===6?"t":"")+'" style="height:'+Math.max(4,Math.round(x[1]/m*64))+'px"></i><span>'+x[0]+"</span>";b.appendChild(c);});
  $("wsum").textContent=fa(s);
}
function zsl(){var a=[],k,l=$("zsl");l.innerHTML="";for(k in S.zs){if(S.zs[k]>0)a.push([+k,S.zs[k]]);}a.sort(function(x,y){return y[1]-x[1]});$("zsw").style.display=a.length?"block":"none";a.forEach(function(x){var r=document.createElement("div");r.className="zr";r.innerHTML="<span></span><b></b>";r.firstChild.textContent=x[0]===Z.length-1?t("custom"):Z[x[0]];r.lastChild.textContent=fa(x[1]);l.appendChild(r);});}
function dgoal(){var g=S.dg||0,w=$("dgw"),h=S.hist[S.day]||0;w.style.display=g>0?"block":"none";$("dgi").value=g;if(g>0){$("dgt").textContent=fa(h)+" / "+fa(g);$("dgb").style.width=Math.min(100,h/g*100)+"%";}}
function render(){
  var H=document.documentElement,rtl=["fa","ar","ur"].indexOf(S.lang)>-1;
  H.lang=S.lang;H.dir=rtl?"rtl":"ltr";
  if(S.color==="green")H.removeAttribute("data-c");else H.setAttribute("data-c",S.color);
  if(S.theme)H.setAttribute("data-theme",S.theme);
  document.body.classList.toggle("one",S.one);
  document.title=t("title");
  document.querySelectorAll("[data-k]").forEach(function(e){e.textContent=t(e.dataset.k);});
  $("theme").textContent=t(isDark()?"light":"dark");
  $("lg").textContent="🌐 "+({fa:"فارسی",en:"English",ar:"العربية",tr:"Türkçe",id:"Indonesia",fr:"Français",ur:"اردو",ru:"Русский"})[S.lang];
  $("zname").textContent=S.zikr===Z.length-1?"":Z[S.zikr];
  $("zmean").textContent=(MEAN[S.lang]||[])[S.zikr]||"";
  $("count").textContent=fa(S.count);$("big").textContent=fa(S.count);
  $("of").textContent=t("of")+" "+fa(goal());
  $("tap").setAttribute("data-hint",t("hint"));
  $("bar").style.strokeDashoffset=CIRC*(1-Math.min(S.count/goal(),1));
  $("rounds").textContent=fa(S.rounds);$("total").textContent=fa(S.total);
  if(!$("reset").dataset.sure)$("reset").textContent=t("reset");
  $("one").textContent=t("one")+": "+onoff(S.one);
  $("snd").textContent=t("snd")+": "+onoff(S.snd);
  $("vib").textContent=t("vib")+": "+onoff(S.vib);
  $("remon").textContent=t("remind")+": "+onoff(S.rem.on);$("remon").setAttribute("aria-pressed",S.rem.on);
  $("tm").value=S.rem.m;$("tn").value=S.rem.n;
  stats();week();dgoal();zsl();chips();
}
$("tap").onclick=function(){
  S.count++;S.total++;S.hist[S.day]=(S.hist[S.day]||0)+1;S.zs[S.zikr]=(S.zs[S.zikr]||0)+1;
  if(S.dg>0&&S.hist[S.day]===S.dg){buzz([100,50,100]);say(t("dgdone"));}
  ["m","n"].forEach(function(p){if(nowMin()>=toMin(S.rem[p]))S.rd[p]=S.day;});
  $("remb").style.display="none";
  if(S.count>=goal()){
    S.rounds++;buzz([60,40,60,40,120]);snd(1);say(t("done"));
    var shown=goal();S.count=0;save();
    $("count").textContent=fa(shown);$("big").textContent=fa(shown);$("bar").style.strokeDashoffset=0;
    $("rounds").textContent=fa(S.rounds);$("total").textContent=fa(S.total);
    setTimeout(render,260);return;
  }
  buzz(12);snd(0);save();render();
};
$("undo").onclick=function(){if(S.count>0){S.count--;if(S.total>0)S.total--;if(S.hist[S.day]>0)S.hist[S.day]--;if(S.zs[S.zikr]>0)S.zs[S.zikr]--;save();render();}};
$("reset").onclick=function(){
  var b=$("reset");
  if(b.dataset.sure){S.count=0;S.rounds=0;S.total=0;S.hist[S.day]=0;b.dataset.sure="";save();render();}
  else{b.dataset.sure="1";b.textContent=t("sure");setTimeout(function(){b.dataset.sure="";b.textContent=t("reset");},3000);}
};
$("vib").onclick=function(){S.vib=!S.vib;save();render();};
$("shr").onclick=function(){
  var w=0,i;for(i=0;i<7;i++){var d=new Date(Date.now()-i*864e5);w+=S.hist[d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()]||0;}
  var x="📿 "+t("title")+"\n"+t("today")+": "+fa(S.hist[S.day]||0)+"\n"+t("week")+": "+fa(w)+"\n"+t("best")+": "+$("best").textContent+"\n"+t("streak")+": "+$("streak").textContent;
  function cp(){try{navigator.clipboard.writeText(x).then(function(){say(t("copied"));});}catch(e){}}
  try{if(navigator.share){navigator.share({text:x}).catch(function(e){if(e&&e.name!=="AbortError")cp();});}else cp();}catch(e){cp();}
};
$("dgi").onchange=function(){var v=parseInt(this.value,10);S.dg=v>0?v:0;save();render();};
$("snd").onclick=function(){S.snd=!S.snd;save();render();};
$("one").onclick=function(){S.one=!S.one;save();render();};
$("theme").onclick=function(){S.theme=isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",S.theme);save();render();};

/* touch lock */
var HT;
$("lk").onclick=function(){$("lock").style.display="flex";};
$("lg").onclick=function(){var m=$("lgm");m.style.display=m.style.display==="none"?"block":"none";};
$("unl").onpointerdown=function(){HT=setTimeout(function(){$("lock").style.display="none";},2000);};
["onpointerup","onpointerleave","onpointercancel"].forEach(function(ev){$("unl")[ev]=function(){clearTimeout(HT);};});
$("unl").oncontextmenu=function(e){e.preventDefault();};

/* reminders */
function toMin(s){var p=(s||"0:0").split(":");return (+p[0])*60+(+p[1]);}
function nowMin(){var d=new Date();return d.getHours()*60+d.getMinutes();}
function checkRem(){
  if(!S.rem.on)return;
  var due=null;
  ["m","n"].forEach(function(p){if(S.rd[p]!==S.day&&nowMin()>=toMin(S.rem[p]))due=p;});
  if(due){
    var txt=t(due==="m"?"rm":"rn");$("remt").textContent=txt;$("remb").style.display="flex";$("remb").dataset.p=due;
    if(S.rd["x"+due]!==S.day){S.rd["x"+due]=S.day;save();try{if(window.Notification&&Notification.permission==="granted")new Notification(txt);}catch(e){}}
  }else $("remb").style.display="none";
}
$("remx").onclick=function(){S.rd[$("remb").dataset.p]=S.day;save();$("remb").style.display="none";};
$("remon").onclick=function(){S.rem.on=!S.rem.on;if(S.rem.on){try{if(window.Notification&&Notification.permission==="default")Notification.requestPermission();}catch(e){}}save();render();checkRem();};
$("tm").onchange=function(){S.rem.m=this.value||"05:00";S.rd.m="";S.rd.xm="";save();checkRem();};
$("tn").onchange=function(){S.rem.n=this.value||"20:00";S.rd.n="";S.rd.xn="";save();checkRem();};
setInterval(checkRem,30000);
document.addEventListener("visibilitychange",function(){if(!document.hidden)checkRem();});

/* backup */
$("cp").onclick=function(){
  var b=$("bk");b.value=JSON.stringify(S);b.select();
  try{navigator.clipboard.writeText(b.value).then(function(){$("bm").textContent=t("copied");},function(){$("bm").textContent="";});}catch(e){}
};
$("rs").onclick=function(){
  try{var o=JSON.parse($("bk").value);if(!o||typeof o!=="object"||typeof o.hist!=="object")throw 0;
    for(var k in o){if(k in S)S[k]=o[k];}save();render();$("bm").textContent=t("restored");}
  catch(e){$("bm").textContent=t("bad");}
};

render();checkRem();
})();
  
