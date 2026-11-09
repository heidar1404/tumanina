(function(){
function $(i){return document.getElementById(i);}
var T={
fa:{ts:"تسبیح و صدا",skin:"پوسته‌ی تسبیح",snd:"صدای دانه",sk:{def:"پیش‌فرض",wood:"چوبی",shah:"شاه‌مقصود",amber:"کهربا",fir:"فیروزه",min:"مینیمال"},bs:{off:"خاموش",wood:"چوب",shah:"شاه‌مقصود",amber:"کهربا",fir:"فیروزه",min:"مینیمال"}},
en:{ts:"Tasbih & sound",skin:"Tasbih skin",snd:"Bead sound",sk:{def:"Default",wood:"Wood",shah:"Shah Maqsud",amber:"Amber",fir:"Turquoise",min:"Minimal"},bs:{off:"Off",wood:"Wood",shah:"Shah Maqsud",amber:"Amber",fir:"Turquoise",min:"Minimal"}},
ar:{ts:"المسبحة والصوت",skin:"شكل المسبحة",snd:"صوت الحبة",sk:{def:"افتراضي",wood:"خشب",shah:"شاه مقصود",amber:"كهرمان",fir:"فيروز",min:"بسيط"},bs:{off:"متوقف",wood:"خشب",shah:"شاه مقصود",amber:"كهرمان",fir:"فيروز",min:"بسيط"}}
};
function X(){return T[document.documentElement.lang]||T.en;}
var FK="zekr-ui",U={sk:"def",bs:"off",fav:[]};
try{var u0=JSON.parse(localStorage.getItem(FK));if(u0)for(var k0 in u0)U[k0]=u0[k0];}catch(e){}
function sv(){try{localStorage.setItem(FK,JSON.stringify(U));}catch(e){}}
var SK={wood:["#c98f52","#7a4a22","#fff6e8","#8b5a2b","#e6d5bf"],shah:["#4a5aa8","#0d1230","#e8ecff","#4a5ad0","#cfd3ee"],amber:["#f7c85a","#c4771a","#3a2200","#e0932a","#f3dfb4"],fir:["#62dccc","#0c8f86","#052b28","#12a89c","#c6eee9"],min:["transparent","transparent","var(--ink)","var(--ink)","var(--line)"]};
var c="";
for(var n in SK){var a=SK[n];c+="body.sk-"+n+":not(.one) #tap{background:radial-gradient(circle at 35% 30%,"+a[0]+","+a[1]+");color:"+a[2]+"}body.sk-"+n+" #of{color:inherit;opacity:.7}body.sk-"+n+" .bar{stroke:"+a[3]+"}body.sk-"+n+" .track{stroke:"+a[4]+"}";}
c+="body.sk-min:not(.one) #tap{box-shadow:0 0 0 2px var(--ink)}#spm .btn{display:block;width:100%;margin-bottom:10px;text-align:start;padding:14px 16px}#skc,#bsc{flex-wrap:wrap}.st{margin-inline-end:6px;color:var(--muted)}.st.on{color:#d6a848}#fss{position:absolute;top:calc(14px + env(safe-area-inset-top,0px));right:14px;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:1.2rem;opacity:.7}";
var cs=document.createElement("style");cs.textContent=c;document.head.appendChild(cs);
function applySk(){document.body.className=document.body.className.replace(/\s*sk-\w+/g,"");if(U.sk!=="def")document.body.classList.add("sk-"+U.sk);}
applySk();

/* bead sounds */
var AC=null,last=null;
function num(s){return parseInt(String(s).replace(/[\u06F0-\u06F9]/g,function(d){return d.charCodeAt(0)-1776;}).replace(/[\u0660-\u0669]/g,function(d){return d.charCodeAt(0)-1632;}),10);}
function beep(t){
  if(t==="off")return;
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    var n=AC.currentTime,g=AC.createGain();g.connect(AC.destination);
    if(t==="wood"){
      var len=Math.floor(AC.sampleRate*.05),b=AC.createBuffer(1,len,AC.sampleRate),d=b.getChannelData(0);
      for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);
      var s=AC.createBufferSource(),f=AC.createBiquadFilter();f.type="bandpass";f.frequency.value=1100;f.Q.value=6;
      s.buffer=b;s.connect(f);f.connect(g);g.gain.setValueAtTime(.6,n);s.start(n);return;
    }
    var P={shah:[520,"sine",.1,.18],amber:[2100,"sine",.16,.12],fir:[1500,"triangle",.1,.14],min:[700,"sine",.035,.08]}[t],o=AC.createOscillator();
    o.type=P[1];o.frequency.value=P[0];o.connect(g);g.gain.setValueAtTime(P[3],n);g.gain.exponentialRampToValueAtTime(.0001,n+P[2]);o.start(n);o.stop(n+P[2]+.02);
  }catch(e){}
}
new MutationObserver(function(){var v=num($("count").textContent);if(last!==null&&v>last&&U.bs!=="off")beep(U.bs);last=v;}).observe($("count"),{childList:true,characterData:true,subtree:true});
last=num($("count").textContent);

/* settings page with sub-pages */
var det=document.querySelector("details.set");
if(det&&$("spb")&&$("gs")){
  var ts=document.createElement("div");ts.className="sec";det.appendChild(ts);
  function fill(id,o,cur,fn){var el=$(id);for(var k in o){(function(k){var b=document.createElement("button");b.className="chip";b.textContent=o[k];b.setAttribute("aria-pressed",k===cur);b.onclick=function(){fn(k);};el.appendChild(b);})(k);}}
  function buildTs(){
    var x=X();
    ts.innerHTML='<p class="label">'+x.ts+'</p><p class="label">'+x.skin+'</p><div class="chips" id="skc"></div><p class="label" style="margin-top:12px">'+x.snd+'</p><div class="chips" id="bsc"></div>';
    fill("skc",x.sk,U.sk,function(k){U.sk=k;sv();applySk();buildTs();});
    fill("bsc",x.bs,U.bs,function(k){U.bs=k;sv();beep(k);buildTs();});
  }
  var menu=document.createElement("div");menu.id="spm";det.insertBefore(menu,$("sph").nextSibling);
  var secs=[],cur=-1;
  function showMenu(){
    buildTs();
    secs=[].slice.call(det.querySelectorAll(".sec"));
    secs.forEach(function(s){s.style.display="none";});
    menu.innerHTML="";menu.style.display="block";cur=-1;
    var sm=det.querySelector("summary");$("spt").textContent=sm?sm.textContent:"";
    secs.forEach(function(s,i){var l=s.querySelector(".label"),b=document.createElement("button");b.className="btn";b.textContent=l?l.textContent:"";b.onclick=function(){showSec(i);};menu.appendChild(b);});
  }
  function showSec(i){
    secs.forEach(function(s,j){s.style.display=j===i?"":"none";});
    menu.style.display="none";cur=i;
    var l=secs[i].querySelector(".label");$("spt").textContent=l?l.textContent:"";det.scrollTop=0;
  }
  var op=$("gs").onclick;$("gs").onclick=function(){if(op)op();showMenu();};
  var bk=$("spb").onclick;$("spb").onclick=function(){if(cur>=0){showMenu();}else if(bk){bk();}};
}

/* favorite dhikrs + hide one chip */
var zk=$("zikrs"),zo=null;
function deco(){
  if(zo)zo.disconnect();
  var cs2=[].slice.call(zk.children);
  cs2.forEach(function(ch){
    if(!ch.dataset.k){
      var key=ch.textContent.trim();ch.dataset.k=key;
      if(key==="صلوات")ch.style.display="none";
      var st=document.createElement("span");st.className="st";st.textContent="☆";
      st.onclick=function(e){e.stopPropagation();var i=U.fav.indexOf(key);if(i<0)U.fav.push(key);else U.fav.splice(i,1);sv();deco();};
      ch.insertBefore(st,ch.firstChild);
    }
    var f=U.fav.indexOf(ch.dataset.k)>-1,s2=ch.querySelector(".st");
    if(s2){s2.textContent=f?"★":"☆";s2.className="st"+(f?" on":"");}
  });
  var fav=cs2.filter(function(ch){return U.fav.indexOf(ch.dataset.k)>-1;}),rest=cs2.filter(function(ch){return U.fav.indexOf(ch.dataset.k)<0;});
  fav.concat(rest).forEach(function(ch){zk.appendChild(ch);});
  if(zo)zo.observe(zk,{childList:true});
}
zo=new MutationObserver(deco);deco();

/* sound toggle inside full-screen mode */
var fso=$("fso");
if(fso){
  var fss=document.createElement("button");fss.id="fss";fso.appendChild(fss);
  function sOn(){try{return JSON.parse(localStorage.getItem("zekr-counter-v1")).snd!==false;}catch(e){return true;}}
  function us(){fss.textContent=sOn()?"🔊":"🔇";}
  fss.addEventListener("click",function(e){e.stopPropagation();$("snd").click();setTimeout(us,150);});
  us();new MutationObserver(us).observe(fso,{attributes:true,attributeFilter:["class"]});
}
})();
