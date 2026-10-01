const $=s=>document.querySelector(s);const KEY="zaino_v1";
let S=JSON.parse(localStorage.getItem(KEY)||'{"checks":{},"weights":[],"urges":0}');let sel=1;
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
const isDone=d=>PLAN.habits.every((_,i)=>S.checks[d+"-"+i]);
function stats(){let n=0;for(let d=1;d<=40;d++){if(isDone(d))n++;}
 let cur=0;for(let d=40;d>=1;d--){if(isDone(d)){cur=0;let k=d;while(k>=1&&isDone(k)){cur++;k--}break}}
 $("#sDay").textContent=n;$("#sStreak").textContent=cur;$("#sUrge").textContent=S.urges;
 const w=S.weights;$("#sKg").textContent=w.length>1?(w[0].kg-w[w.length-1].kg).toFixed(1):"-";}
function grid(){$("#days").innerHTML="";PLAN.days.forEach(x=>{const b=document.createElement("button");
 b.className="day"+(isDone(x.day)?" done":"")+(x.day===sel?" sel":"");b.textContent=x.day;b.onclick=()=>{sel=x.day;render()};$("#days").appendChild(b)})}
function panel(){const x=PLAN.days[sel-1];const ph=PLAN.phases.find(p=>p.name===x.phase);
 $("#panel").innerHTML=`<h3>Day ${x.day} - ${x.phase}</h3><p class="muted">${ph.goal}<br>${ph.kcal_note}</p>
 <p><b>Workout:</b> ${x.workout} - ${x.detail}</p><p><b>Mind task:</b> ${x.mind}</p>`+
 PLAN.habits.map((h,i)=>`<label><input type="checkbox" data-k="${x.day}-${i}" ${S.checks[x.day+"-"+i]?"checked":""}>${h}</label>`).join("");
 document.querySelectorAll("#panel input").forEach(c=>c.onchange=()=>{S.checks[c.dataset.k]=c.checked;save();render()})}
function phases(){$("#phases").innerHTML=PLAN.phases.map(p=>`<div class="card tilt"><h3>${p.name}</h3><small>Days ${p.days[0]}-${p.days[1]}</small><p>${p.goal}</p><p class="muted">${p.kcal_note}</p></div>`).join("");
 $("#meals").innerHTML=PLAN.meals.map(m=>`<div class="card tilt"><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join("")}
function chart(){const c=$("#chart"),g=c.getContext("2d");g.clearRect(0,0,c.width,c.height);const w=S.weights;
 g.strokeStyle="#7ff0c855";for(let i=0;i<5;i++){g.beginPath();g.moveTo(40,20+i*50);g.lineTo(880,20+i*50);g.stroke()}
 if(w.length<1){g.fillStyle="#9fc9c0";g.font="18px sans-serif";g.fillText("Log your weight to see the chart",320,130);return}
 const v=w.map(x=>x.kg),mx=Math.max(...v)+1,mn=Math.min(...v)-1;
 const X=i=>40+(w.length===1?0:i*840/(w.length-1)),Y=k=>220-(k-mn)/(mx-mn)*200;
 g.strokeStyle="#7ff0c8";g.lineWidth=4;g.beginPath();w.forEach((p,i)=>i?g.lineTo(X(i),Y(p.kg)):g.moveTo(X(i),Y(p.kg)));g.stroke();
 g.fillStyle="#2f80ed";w.forEach((p,i)=>{g.beginPath();g.arc(X(i),Y(p.kg),6,0,7);g.fill()});
 g.fillStyle="#e9fff8";g.font="14px sans-serif";g.fillText(mx.toFixed(1)+" kg",2,25);g.fillText(mn.toFixed(1)+" kg",2,225)}
function render(){grid();panel();stats();chart()}
$("#wBtn").onclick=()=>{const k=parseFloat($("#wIn").value);if(!k)return;S.weights.push({t:Date.now(),kg:k});save();$("#wIn").value="";render()};
$("#wReset").onclick=()=>{if(confirm("Delete all ZAINO data on this device?")){localStorage.removeItem(KEY);S={checks:{},weights:[],urges:0};render()}};
$("#uBtn").onclick=()=>{S.urges++;save();stats();alert("Well done. Urges pass. Drink water and move.")};
$("#cBtn").onclick=()=>{const h=+$("#cH").value,w=+$("#cW").value,a=+$("#cA").value,f=+$("#cAct").value;if(!h||!w||!a){$("#cOut").textContent="Fill height, weight and age.";return}
 const bmr=10*w+6.25*h-5*a+5,tdee=Math.round(bmr*f),tgt=Math.max(Math.round(tdee-500),1500),bmi=(w/((h/100)**2)).toFixed(1);
 $("#cOut").innerHTML=`BMI ${bmi}. Estimated maintenance <b>${tdee}</b> kcal/day. Gentle target <b>${tgt}</b> kcal/day (never below 1500 without a doctor). Protein about ${Math.round(w*1.6*0.95)} g/day.`};
let br=null;$("#bBtn").onclick=()=>{const o=$("#orb");if(br){clearInterval(br);br=null;o.textContent="Ready";o.style.transform="scale(1)";$("#bBtn").textContent="Start box breathing";return}
 $("#bBtn").textContent="Stop";const ph=[["Breathe in",1.35],["Hold",1.35],["Breathe out",1],["Hold",1]];let i=0;
 const step=()=>{o.textContent=ph[i][0];o.style.transform=`scale(${ph[i][1]})`;i=(i+1)%4};step();br=setInterval(step,4000)};
document.addEventListener("mousemove",e=>document.querySelectorAll(".tilt").forEach(t=>{const r=t.getBoundingClientRect();
 if(e.clientY<r.top-80||e.clientY>r.bottom+80)return;const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 t.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg)`}));
const bg=$("#bg"),b=bg.getContext("2d");let P=[];function rs(){bg.width=innerWidth;bg.height=innerHeight}rs();addEventListener("resize",rs);
for(let i=0;i<45;i++)P.push({x:Math.random()*2e3,y:Math.random()*2e3,z:Math.random()*3+.5,c:Math.random()>.5?"127,240,200":"47,128,237"});
(function loop(){b.clearRect(0,0,bg.width,bg.height);P.forEach(p=>{p.y-=.2*p.z;if(p.y<-20){p.y=bg.height+20;p.x=Math.random()*bg.width}
 b.fillStyle=`rgba(${p.c},${.15+p.z*.08})`;b.beginPath();b.arc(p.x%bg.width,p.y,p.z*5,0,7);b.fill()});requestAnimationFrame(loop)})();
phases();render();
