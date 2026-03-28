import { useState, useEffect, useRef } from "react";

const P = { p:"#f97316", pl:"#fdba74", pd:"#ea580c", ac:"#fed7aa", bg:"#fffaf5", bgd:"#fff3e0", cb:"#fde0b0", tx:"#4a2800", tm:"#b07040", tl:"#d4a070", ch:"#e09040", yes:"#22c55e", no:"#ef4444", yesD:"#16a34a", noD:"#dc2626" };

const A_Q=["Do you often have difficulty paying attention to details, or do you often make careless mistakes in your work or other activities?","Do you often find it difficult to sustain your attention on a task?","Do you often seem not to listen when spoken to directly?","Do you often have difficulty following through on instructions and finishing your domestic tasks or professional obligations?","Do you often find it difficult to organize tasks or activities?","Do you often avoid tasks that require sustained mental effort?","Do you often lose things necessary for your work or activities?","Are you easily distracted by external stimuli?","Do you have frequent forgetfulness in daily life?"];
const A_AD=[["Makes careless mistakes","Works slowly to avoid mistakes","Does not read instructions carefully","Difficulty working meticulously","Needs too much time to complete complex tasks","Easily bogged down by details","Works too quickly and thus makes mistakes"],["Unable to sustain attention on tasks for long periods","Easily distracted by own thoughts or associations","Difficulty following a movie to the end, or reading a book","Quickly bored by things","Asks questions about topics already discussed"],["Daydreamer or preoccupied","Difficulty concentrating during a conversation","Afterwards, cannot remember what a conversation was about","Often changes the subject in a conversation","Other people say your mind is elsewhere"],["Does several tasks at once without finishing them","Difficulty finishing tasks once the novelty has worn off","Needs to set a deadline to finish tasks","Difficulty completing administrative tasks","Difficulty following instructions in a manual"],["Difficulty planning daily life activities","Home or workspace is messy","Plans too many tasks or inefficient planning","Regularly plans to do several things at the same time","Arrives late","Unable to use a planner effectively","Rigid out of necessity to stick to the schedule","Poor sense of time","Makes lists without using them","Needs someone else to structure things"],["Does the easiest or most enjoyable things first","Postpones boring or difficult tasks","Postpones things until past the deadline","Avoids monotonous tasks, such as administrative tasks","Does not like reading because of the mental effort","Avoids tasks that require a lot of concentration"],["Misplaces wallet, keys, or planner","Forgets things when leaving a place","Loses work documents","Spends a lot of time looking for things","Panics if people have moved things around","Puts things in the wrong place","Loses notes, lists, or phone numbers"],["Difficulty ignoring external stimuli","Difficulty resuming tasks after being distracted","Easily distracted by noises or events","Easily distracted by a conversation between other people","Difficulty filtering and/or selecting information"],["Forgets appointments or obligations","Forgets keys, planner, etc.","Needs frequent reminders about appointments","Goes back to retrieve forgotten things","Uses rigid schedules to make sure nothing is forgotten","Does not keep planner up to date and/or forgets to check planner"]];
const A_CH=[["Careless mistakes during schoolwork","Mistakes because did not read questions correctly","Did not answer questions because did not read them correctly","Did not answer questions on the back of an exam","Others pointed out that the work was not tidy","Did not check answers in schoolwork","Needed too much time to complete detailed tasks"],["Difficulty sustaining attention during schoolwork","Difficulty sustaining attention on a game","Easily distracted","Difficulty concentrating","Needed a structured environment to avoid being distracted","Quickly bored by activities"],["Cannot remember what parents/teachers said","Daydreamer or preoccupied","Only listens with eye contact or when tone is raised","Often needs to be called upon","Questions need to be repeated"],["Difficulty following instructions","In difficulty when tasks involve several successive steps","Does not finish things","Does not complete homework or does not turn it in","Needs a structured environment to finish tasks"],["Difficulty being ready on time","Room or desk is messy","Difficulty playing alone","Difficulty planning tasks or homework","Does things in a confused manner","Arrives late","Poor sense of time","Difficulty keeping busy alone"],["Avoids homework or aversion to homework","Reads few books or does not like reading because of mental effort","Avoids tasks that require a lot of concentration","Dislikes school subjects that require a lot of concentration","Postpones boring or difficult tasks"],["Loses planner, pens, gym equipment, or other things","Misplaces toys, clothes, or homework","Spends a lot of time looking for things","Panics if people have moved things around","Parents and/or teachers point out that things have been lost"],["In class, often looks outside","Easily distracted by noises or events","Difficulty resuming tasks after being distracted"],["Forgets appointments or instructions","Often needs to be reminded of things","Stops along the way because forgot what to do","Forgets to bring school supplies","Forgets things at school or at friends' houses"]];
const HI_Q=["Do you often fidget with your hands or feet, or squirm in your seat?","Do you often get up in situations where you are supposed to remain seated?","Do you often feel restless?","Do you often find it difficult to enjoy a moment of relaxation?","Are you often 'on the go' or as if 'driven by a motor'?","Do you often talk too much?","Do you often blurt out the answer to a question that has not yet been fully asked?","Do you often find it difficult to wait your turn?","Do you often interrupt others or intrude?"];
const HI_AD=[["Difficulty sitting still","Fidgets with legs","Taps with a pen or plays with an object","Twirls hair or bites nails","Able to control restlessness but it causes stress"],["Avoids meetings, lectures, religious ceremonies, etc.","Prefers walking rather than sitting","Never sits still for long, constantly moving","Stressed by the obligation to stay seated","Finds an excuse to be able to walk around"],["Feels restless or nervous inside","Constantly feels the need to do something","Finds it difficult to relax"],["Talks when it is not appropriate","Quickly draws attention in public","Noisy in all types of situations","Difficulty doing activities quietly","Difficulty speaking softly"],["Always busy doing something","Overflowing with energy, always on the move","Pushes beyond own limits","Finds it hard to let go, excessively insistent"],["Talks so much that people find it tiring","Known for talking incessantly","Finds it difficult to stop talking","Tendency to talk too much","Does not give others the chance to speak in a conversation","Needs a lot of words to say something"],["Says what comes to mind","Says things without thinking","Gives answers before people have finished speaking","Finishes other people's sentences","Lacks tact"],["Difficulty waiting in a queue, wants to cut in line","Difficulty waiting patiently in traffic","Difficulty waiting for one's turn in conversations","Impatient","Quickly starts or ends relationships or jobs due to impatience"],["Quick to interfere with others","Interrupts others","Disturbs without being asked","Others point out intrusiveness","Difficulty respecting others' boundaries","Has an opinion on everything and gives it immediately"]];
const HI_CH=[["Parents often say 'sit still'","Fidgets with legs","Taps with a pen or plays with an object","Twirls hair or bites nails","Unable to sit in a relaxed manner","Able to control restlessness but it caused stress"],["Often gets up during meals or in class","Finds it very difficult to stay seated in class or during meals","Often told to stay seated","Finds an excuse to be able to walk around"],["Always running","Climbs on furniture or jumps on armchairs","Climbs trees","Feels restless inside"],["Makes noise while playing or in class","Unable to watch TV or a movie quietly","Often asked to calm down or be quieter","Quickly draws attention in public"],["Constantly busy","Noticed for activity in class or at home","Overflowing with energy","Always on the go, wound up like a spring"],["Known as a 'chatterbox'","Children or teachers often ask for silence","School reports often mention chattering","Punished for talking too much","Disturbs other students' schoolwork by talking too much","Does not let others speak in a conversation"],["Says things without thinking","Wants to be the first to answer questions in class","Gives the first answer that comes to mind","Interrupts others before sentences are finished","Verbally hurtful (lacks tact)"],["Difficulty waiting for one's turn in sports or games","Difficulty waiting for one's turn in class","Always the first to speak or act","Quickly impatient","Crosses the road without looking"],["Intrudes on other children's games","Interrupts others' conversations","Reacts to everything","Unable to wait"]];

const mkItems=(qs,ads,chs)=>qs.map((q,i)=>({id:qs===A_Q?`A${i+1}`:`HI${i+1}`,question:q,adult:ads[i],child:chs[i]}));
const INAT=mkItems(A_Q,A_AD,A_CH), HYPER=mkItems(HI_Q,HI_AD,HI_CH);

const IMP_AD={work:{label:"Work / Education",items:["Has not reached the level of education for the desired job","Works below education level","Quickly tired of a workplace","Succession of several short-term jobs","Difficulty with administrative work/planning","Does not get promotions","Underperforming at work","Quit a job or was fired after a dispute","Sick leave or disability related to symptoms","Impact limited by compensation through high intellectual level","Impact limited by compensation through external structure"]},rel:{label:"Relationships and/or Family",items:["Quickly tired of relationships","Impulsively starts/ends relationships","Partner needs to compensate for symptoms","Relationship problems, many arguments, lack of intimacy","Divorce because of symptoms","Sexual problems because of symptoms","Parenting problems because of symptoms","Domestic and/or administrative difficulties","Financial problems or gambling","Does not dare to start a relationship"]},soc:{label:"Social contacts",items:["Quickly tired of social contacts","Difficulty maintaining social contacts","Conflicts resulting from communication problems","Difficulty initiating social contacts","Low self-assertion","Inattention (forgetting to send a card, to be empathetic, etc.)"]},lei:{label:"Leisure / Hobby",items:["Unable to fully relax during leisure time","Forced to exercise a lot to relax","Injuries from excessive exercise","Unable to finish a book or watch a movie to the end","Tired because always busy","Quickly bored by hobbies","Accidents or license suspension","Sensation seeking and/or excessive risk-taking","Problems with police/justice","Binge eating"]},self:{label:"Self-confidence / Self-image",items:["Self-doubt following negative remarks from others","Negative self-image due to past failures","Fear of failure when starting new things","Excessive reaction to criticism","Perfectionism","Affected by ADHD symptoms"]}};
const IMP_CH={edu:{label:"Education",items:["Education level lower than predicted by IQ","Grade retention due to concentration problems","Incomplete studies / Expelled from school","More years needed to complete studies than necessary","Achieved education level matching IQ but with great difficulty","Difficulty doing homework","Special education because of symptoms","Teacher comments about behavior or concentration","Impact limited by compensation through high intellectual level","Impact limited by compensation through external structure"]},fam:{label:"Family",items:["Frequent arguments with siblings","Frequent punishments or corrections","Little contact with family due to conflicts","Needed parental support for longer than normal"]},soc:{label:"Social contacts",items:["Difficulty maintaining social contacts","Conflicts resulting from communication problems","Difficulty initiating social contacts","Low self-assertion","Few friends","Teased by others","Excluded from the group or not invited to participate in activities","Acts tough"]},lei:{label:"Leisure / Hobby",items:["Unable to relax properly during leisure time","Forced to exercise a lot to relax","Injuries from excessive exercise","Unable to finish a book or watch a movie to the end","Tired because always busy","Quickly bored by hobbies","Sensation seeking and/or excessive risk-taking","Problems with police/justice","Increased number of accidents"]},self:{label:"Self-confidence / Self-image",items:["Self-doubt following negative remarks from others","Negative self-image due to past failures","Fear of failure before starting new things","Excessive reaction to criticism","Perfectionism"]}};

const SK="diva2-queen";
const load=async()=>{try{const r=await window.storage.get(SK);return r?JSON.parse(r.value):null}catch{return null}};
const save=async s=>{try{await window.storage.set(SK,JSON.stringify(s))}catch{}};

/* Floating fruit sparkles */
const Sparkles = () => {
  const sparkles = Array.from({length:8},(_,i)=>i);
  return <>{sparkles.map(i=><div key={i} style={{position:"absolute",fontSize:["🍊","🍋","🍑","🍇","🍓","🍒","🥭","🍍"][i],opacity:0.15+Math.random()*0.15,top:`${10+Math.random()*70}%`,left:`${5+Math.random()*90}%`,animation:`float${i%3} ${3+Math.random()*4}s ease-in-out infinite`,animationDelay:`${i*0.4}s`,pointerEvents:"none",zIndex:0}}>{["🍊","🍋","🍑","🍇","🍓","🍒","🥭","🍍"][i]}</div>)}<style>{`@keyframes float0{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(10deg)}}@keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.15)}}@keyframes float2{0%,100%{transform:translateX(0)}50%{transform:translateX(8px) translateY(-6px)}}`}</style></>;
};

const Chk=({label,checked,onChange})=>(
  <label style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 12px",borderRadius:10,cursor:"pointer",background:checked?"rgba(249,115,22,0.1)":"transparent",fontSize:14,lineHeight:1.5,userSelect:"none",transition:"all 0.2s"}}
    onMouseEnter={e=>{if(!checked)e.currentTarget.style.background="rgba(249,115,22,0.05)"}}
    onMouseLeave={e=>{e.currentTarget.style.background=checked?"rgba(249,115,22,0.1)":"transparent"}}>
    <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,minWidth:20,borderRadius:6,border:checked?`2px solid ${P.p}`:"2px solid #e0c0a0",background:checked?P.p:"#fff",marginTop:1,transition:"all 0.2s",transform:checked?"scale(1.1)":"scale(1)"}}>
      {checked&&<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </span>
    <span style={{color:P.tx}}>{label}</span>
    <input type="checkbox" checked={checked} onChange={onChange} style={{display:"none"}}/>
  </label>
);

const Tog=({value,onChange,label})=>(
  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
    <span style={{fontSize:13,color:P.tm,marginRight:4}}>{label}</span>
    <button onClick={()=>onChange(true)} style={{padding:"5px 18px",borderRadius:20,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:value===true?P.yes:P.bgd,color:value===true?"#fff":P.tm,boxShadow:value===true?"0 2px 8px rgba(34,197,94,0.3)":"none",transition:"all 0.2s",transform:value===true?"scale(1.05)":"scale(1)"}}>Yes ✓</button>
    <button onClick={()=>onChange(false)} style={{padding:"5px 18px",borderRadius:20,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:value===false?P.no:P.bgd,color:value===false?"#fff":P.tm,boxShadow:value===false?"0 2px 8px rgba(239,68,68,0.3)":"none",transition:"all 0.2s",transform:value===false?"scale(1.05)":"scale(1)"}}>No ✗</button>
  </div>
);

const Card=({item,data,onTAd,onTCh,onSAd,onSCh})=>{
  const [open,setOpen]=useState(false);
  const bothYes=data.adultPresent===true&&data.childPresent===true;
  const oneYes=data.adultPresent===true||data.childPresent===true;
  const bothNo=data.adultPresent===false&&data.childPresent===false;
  const bg=bothYes?`linear-gradient(135deg,${P.yes},${P.yesD})`:oneYes?`linear-gradient(135deg,#f59e0b,#d97706)`:bothNo?`linear-gradient(135deg,${P.no},${P.noD})`:`linear-gradient(135deg,${P.ac},${P.bgd})`;
  return (
    <div style={{background:"#fff",borderRadius:16,boxShadow:"0 2px 8px rgba(249,115,22,0.08)",marginBottom:14,overflow:"hidden",border:`1px solid ${P.cb}`,transition:"transform 0.2s",":hover":{transform:"translateY(-1px)"}}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12,flex:1}}>
          <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:34,height:34,minWidth:34,borderRadius:10,background:bg,color:"#fff",fontWeight:700,fontSize:12,fontFamily:"monospace",transition:"all 0.3s",boxShadow:bothYes?"0 2px 8px rgba(34,197,94,0.3)":oneYes?"0 2px 8px rgba(245,158,11,0.3)":""}}>{item.id}</span>
          <span style={{fontSize:14,color:P.tx,lineHeight:1.45,fontWeight:500}}>{item.question}</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{transform:open?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",minWidth:20}}><path d="M5 7.5L10 12.5L15 7.5" stroke={P.tl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open&&<div style={{padding:"0 18px 18px"}}>
        {[["adult","Adulthood",P.p],["child","Childhood (5–12 yrs)",P.ch]].map(([age,lbl,col])=>(
          <div key={age} style={{marginBottom:age==="adult"?16:0,borderTop:age==="child"?`1px solid ${P.ac}`:"none",paddingTop:age==="child"?16:0}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:col,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:col}}/>{lbl}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              {item[age].map((ex,i)=><Chk key={i} label={ex} checked={data[age==="adult"?"adultChecked":"childChecked"][i]||false} onChange={()=>age==="adult"?onTAd(i):onTCh(i)}/>)}
            </div>
            <Tog value={age==="adult"?data.adultPresent:data.childPresent} onChange={age==="adult"?onSAd:onSCh} label="Symptom present:"/>
          </div>
        ))}
      </div>}
    </div>
  );
};

const ImpDom=({domain,checked,onToggle})=>(
  <div style={{marginBottom:16}}>
    <div style={{fontSize:13,fontWeight:700,color:P.tx,marginBottom:6,paddingBottom:4,borderBottom:`1px solid ${P.ac}`}}>{domain.label}</div>
    <div style={{display:"flex",flexDirection:"column",gap:2}}>{domain.items.map((it,i)=><Chk key={i} label={it} checked={checked[i]||false} onChange={()=>onToggle(i)}/>)}</div>
  </div>
);

const Bdg=({value,max,label})=>{
  const pct=max>0?value/max:0;const c=value>=6?P.yes:value>=4?"#f59e0b":P.no;
  return <div style={{textAlign:"center"}}><div style={{width:64,height:64,borderRadius:"50%",border:`4px solid ${c}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px",background:`conic-gradient(${c} ${pct*360}deg, ${P.bgd} 0deg)`,transition:"all 0.3s"}}><div style={{width:48,height:48,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:20,color:c,fontFamily:"monospace"}}>{value}</div></div><div style={{fontSize:11,color:P.tm,fontWeight:600}}>{label}</div><div style={{fontSize:10,color:P.tl}}>/ {max}</div></div>;
};

const mkDef=()=>({inat:INAT.map(it=>({adultChecked:Array(it.adult.length).fill(false),childChecked:Array(it.child.length).fill(false),adultPresent:null,childPresent:null})),hyp:HYPER.map(it=>({adultChecked:Array(it.adult.length).fill(false),childChecked:Array(it.child.length).fill(false),adultPresent:null,childPresent:null})),impAd:Object.fromEntries(Object.keys(IMP_AD).map(k=>[k,Array(IMP_AD[k].items.length).fill(false)])),impCh:Object.fromEntries(Object.keys(IMP_CH).map(k=>[k,Array(IMP_CH[k].items.length).fill(false)])),onset:null,onsetAge:"",crE:null,crEDet:""});

export default function App(){
  const [s,setS]=useState(mkDef());
  const [sec,setSec]=useState(0);
  const [sub,setSub]=useState(0);
  const [ld,setLd]=useState(true);
  const top=useRef(null);

  useEffect(()=>{(async()=>{const d=await load();if(d)setS(d);setLd(false)})()},[]);
  useEffect(()=>{if(!ld)save(s)},[s,ld]);
  useEffect(()=>{top.current?.scrollIntoView({behavior:"smooth"})},[sec,sub]);

  const upSym=(cat,i,f,v)=>setS(p=>{const n={...p};n[cat]=[...p[cat]];n[cat][i]={...p[cat][i],[f]:v};return n});
  const togEx=(cat,i,af,ei)=>setS(p=>{const n={...p};n[cat]=[...p[cat]];const a=[...p[cat][i][af]];a[ei]=!a[ei];n[cat][i]={...p[cat][i],[af]:a};return n});
  const togImp=(age,dom,i)=>setS(p=>{const k=age==="adult"?"impAd":"impCh";const n={...p};n[k]={...p[k]};const a=[...p[k][dom]];a[i]=!a[i];n[k][dom]=a;return n});

  const aA=s.inat.filter(x=>x.adultPresent===true).length;
  const aC=s.inat.filter(x=>x.childPresent===true).length;
  const hA=s.hyp.filter(x=>x.adultPresent===true).length;
  const hC=s.hyp.filter(x=>x.childPresent===true).length;
  const iA=Object.values(s.impAd).filter(a=>a.some(Boolean)).length;
  const iC=Object.values(s.impCh).filter(a=>a.some(Boolean)).length;
  const aCr=aA>=6&&aC>=6,hCr=hA>=6&&hC>=6,iM=iA>=2&&iC>=2;
  const oM=s.onset===true||(s.onset===false&&s.onsetAge!=="");
  const nE=s.crE===false;

  let dg=null;
  if(aCr&&hCr&&iM&&nE) dg={c:"314.01",l:"Combined Type"};
  else if(aCr&&!hCr&&iM&&nE) dg={c:"314.00",l:"Predominantly Inattentive Type"};
  else if(!aCr&&hCr&&iM&&nE) dg={c:"314.01",l:"Predominantly Hyperactive/Impulsive Type"};

  const reset=async()=>{if(confirm("Reset all answers?")){setS(mkDef());setSec(0);setSub(0);try{await window.storage.delete(SK)}catch{}}};

  if(ld) return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:P.bg,fontFamily:"system-ui"}}><div style={{textAlign:"center",color:P.tm}}><div style={{fontSize:40,marginBottom:12,animation:"pulse 1.5s ease-in-out infinite"}}>🍊</div>Loading...<style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}`}</style></div></div>;

  const its=sub===0?INAT:HYPER, cat=sub===0?"inat":"hyp";

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${P.bg},${P.bgd})`,fontFamily:"system-ui",paddingBottom:100}}>
      <div ref={top}/>
      <div style={{background:`linear-gradient(135deg,${P.p} 0%,${P.pl} 45%,${P.ac} 100%)`,padding:"36px 20px 28px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <Sparkles/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:14,opacity:0.9,marginBottom:6,letterSpacing:1}}>🍊 DIVA 2.0 🍊</div>
          <div style={{fontSize:21,fontWeight:800,letterSpacing:-0.3,lineHeight:1.3,maxWidth:500,textShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>English divas are you on the Diva 2 results ? Let's check!</div>
          <div style={{fontSize:10,opacity:0.55,marginTop:10}}>Kooij & Francken, 2010 — DIVA Foundation</div>
          <div style={{display:"flex",gap:10,marginTop:18,flexWrap:"wrap"}}>
            {[{l:"A adult",v:aA},{l:"A child",v:aC},{l:"H/I adult",v:hA},{l:"H/I child",v:hC}].map(({l,v})=>
              <div key={l} style={{background:v>=6?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.15)",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6,backdropFilter:"blur(4px)",transition:"all 0.3s"}}>
                <span style={{fontFamily:"monospace",fontSize:16,fontWeight:800}}>{v}</span><span style={{opacity:0.7,fontSize:10}}>/9</span><span style={{opacity:0.85}}>{l}</span>
                {v>=6&&<span style={{fontSize:10}}>🍓</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{display:"flex",background:"#fff",borderBottom:`1px solid ${P.cb}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
        {["Symptoms","Impairment","Results"].map((l,i)=><button key={i} onClick={()=>{setSec(i);if(i===0)setSub(0)}} style={{flex:1,padding:"14px 8px",background:"none",border:"none",borderBottom:sec===i?`3px solid ${P.p}`:"3px solid transparent",color:sec===i?P.p:P.tl,fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.2s"}}>{l}</button>)}
      </div>

      <div style={{maxWidth:640,margin:"0 auto",padding:"16px 12px"}}>
        {sec===0&&<>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {["🍋 Inattention (A1–A9)","🍑 Hyperactivity-Impulsivity (H/I 1–9)"].map((l,i)=>
              <button key={i} onClick={()=>setSub(i)} style={{flex:1,padding:"10px 8px",borderRadius:12,border:"none",fontSize:12,fontWeight:700,cursor:"pointer",background:sub===i?(i===0?P.p:P.ch):P.bgd,color:sub===i?"#fff":P.tm,boxShadow:sub===i?"0 3px 12px rgba(249,115,22,0.25)":"none",transition:"all 0.2s",transform:sub===i?"scale(1.02)":"scale(1)"}}>{l}</button>
            )}
          </div>
          <div style={{fontSize:12,color:P.tm,marginBottom:14,padding:"10px 14px",background:P.bg,borderRadius:12,lineHeight:1.5,border:`1px solid ${P.ac}`}}>
            🍇 Tap each criterion to expand it. Check the recognized examples, then indicate whether the symptom is present (<strong style={{color:P.yes}}>Yes</strong> / <strong style={{color:P.no}}>No</strong>) for adulthood and childhood.
          </div>
          {its.map((item,idx)=><Card key={item.id} item={item} data={s[cat][idx]} onTAd={ei=>togEx(cat,idx,"adultChecked",ei)} onTCh={ei=>togEx(cat,idx,"childChecked",ei)} onSAd={v=>upSym(cat,idx,"adultPresent",v)} onSCh={v=>upSym(cat,idx,"childPresent",v)}/>)}
        </>}

        {sec===1&&<>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.tx,marginBottom:12}}>🥭 Criterion B — Age of onset</div>
            <div style={{fontSize:13,color:P.tx,marginBottom:12,lineHeight:1.5}}>Have you always had these symptoms? Were some symptoms present before the age of 7?</div>
            <Tog value={s.onset} onChange={v=>setS(p=>({...p,onset:v}))} label="Before age 7:"/>
            {s.onset===false&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:P.tm}}>Age of onset:</span><input type="number" min="0" max="99" value={s.onsetAge} onChange={e=>setS(p=>({...p,onsetAge:e.target.value}))} style={{width:60,padding:"6px 10px",borderRadius:10,border:`1px solid ${P.cb}`,fontSize:14,fontWeight:600,textAlign:"center",color:P.tx,background:P.bg}}/><span style={{fontSize:13,color:P.tm}}>years</span></div>}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.p,marginBottom:4}}>🍊 Criterion C — Impairment in adulthood</div>
            <div style={{fontSize:11,color:iA>=2?P.yes:P.tl,fontWeight:600,marginBottom:14}}>{iA}/5 domains affected (≥ 2 required) {iA>=2?"🍓":""}</div>
            {Object.entries(IMP_AD).map(([k,d])=><ImpDom key={k} domain={d} checked={s.impAd[k]} onToggle={i=>togImp("adult",k,i)}/>)}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.ch,marginBottom:4}}>🍑 Criterion C — Impairment in childhood</div>
            <div style={{fontSize:11,color:iC>=2?P.yes:P.tl,fontWeight:600,marginBottom:14}}>{iC}/5 domains affected (≥ 2 required) {iC>=2?"🍓":""}</div>
            {Object.entries(IMP_CH).map(([k,d])=><ImpDom key={k} domain={d} checked={s.impCh[k]} onToggle={i=>togImp("child",k,i)}/>)}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.tx,marginBottom:12}}>🍒 Criterion E — Differential diagnosis</div>
            <div style={{fontSize:13,color:P.tx,marginBottom:12,lineHeight:1.5}}>Can the symptoms be better explained by the presence of another psychiatric disorder?</div>
            <Tog value={s.crE} onChange={v=>setS(p=>({...p,crE:v}))} label="Better explained:"/>
            {s.crE===true&&<input type="text" placeholder="Specify the disorder..." value={s.crEDet} onChange={e=>setS(p=>({...p,crEDet:e.target.value}))} style={{marginTop:12,width:"100%",padding:"10px 14px",borderRadius:12,border:`1px solid ${P.cb}`,fontSize:13,boxSizing:"border-box",color:P.tx,background:P.bg}}/>}
          </div>
        </>}

        {sec===2&&<>
          <div style={{background:"#fff",borderRadius:16,padding:24,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
            <div style={{fontSize:16,fontWeight:800,color:P.tx,marginBottom:20,textAlign:"center"}}>🍊 Symptom Summary 🍊</div>
            <div style={{display:"flex",justifyContent:"space-around",marginBottom:24}}>
              <Bdg value={aA} max={9} label="A adult"/><Bdg value={aC} max={9} label="A child"/><Bdg value={hA} max={9} label="H/I adult"/><Bdg value={hC} max={9} label="H/I child"/>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{borderBottom:`2px solid ${P.ac}`}}><th style={{textAlign:"left",padding:"8px 6px",color:P.tm}}>Criterion</th><th style={{textAlign:"center",padding:"8px 6px",color:P.p}}>Adult</th><th style={{textAlign:"center",padding:"8px 6px",color:P.ch}}>Child</th></tr></thead>
                <tbody>
                  {INAT.map((it,i)=><tr key={it.id} style={{borderBottom:`1px solid ${P.bgd}`}}><td style={{padding:"7px 6px",fontWeight:600,color:P.tx}}>{it.id}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.inat[i].adultPresent===true?"🍓":s.inat[i].adultPresent===false?"—":"·"}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.inat[i].childPresent===true?"🍓":s.inat[i].childPresent===false?"—":"·"}</td></tr>)}
                  <tr style={{borderBottom:`2px solid ${P.ac}`,background:P.bg}}><td style={{padding:"8px 6px",fontWeight:700,color:P.tx}}>Total A</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:aA>=6?P.yes:P.no}}>{aA}/9</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:aC>=6?P.yes:P.no}}>{aC}/9</td></tr>
                  {HYPER.map((it,i)=><tr key={it.id} style={{borderBottom:`1px solid ${P.bgd}`}}><td style={{padding:"7px 6px",fontWeight:600,color:P.tx}}>{it.id}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.hyp[i].adultPresent===true?"🍓":s.hyp[i].adultPresent===false?"—":"·"}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.hyp[i].childPresent===true?"🍓":s.hyp[i].childPresent===false?"—":"·"}</td></tr>)}
                  <tr style={{background:P.bg}}><td style={{padding:"8px 6px",fontWeight:700,color:P.tx}}>Total H/I</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:hA>=6?P.yes:P.no}}>{hA}/9</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:hC>=6?P.yes:P.no}}>{hC}/9</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{background:"#fff",borderRadius:16,padding:20,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(249,115,22,0.08)"}}>
            <div style={{fontSize:16,fontWeight:800,color:P.tx,marginBottom:16,textAlign:"center"}}>🍋 Scoring Form</div>
            {[{l:"Criterion A: ≥ 6 Inattention (adult)",m:aA>=6},{l:"Criterion A: ≥ 6 Inattention (child)",m:aC>=6},{l:"Criterion A: ≥ 6 H/I (adult)",m:hA>=6},{l:"Criterion A: ≥ 6 H/I (child)",m:hC>=6},{l:"Criterion B: Onset before age 7 or age specified",m:oM},{l:"Criterion C: ≥ 2 domains (adult)",m:iA>=2},{l:"Criterion C: ≥ 2 domains (child)",m:iC>=2},{l:"Criterion E: Not better explained",m:nE}].map(({l,m},i)=>
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<7?`1px solid ${P.bgd}`:"none"}}>
                <span style={{width:24,height:24,minWidth:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:m?P.yes:P.bgd,color:"#fff",fontSize:13,boxShadow:m?"0 2px 6px rgba(34,197,94,0.3)":"none",transition:"all 0.3s"}}>{m?"✓":""}</span>
                <span style={{fontSize:13,color:m?P.tx:P.tl,fontWeight:m?600:400}}>{l}</span>
              </div>
            )}
          </div>

          <div style={{background:dg?`linear-gradient(135deg,${P.p},${P.pd},${P.p})`:"#fff",borderRadius:16,padding:24,marginBottom:16,border:dg?"none":`1px solid ${P.cb}`,boxShadow:dg?"0 4px 20px rgba(249,115,22,0.3)":"0 2px 8px rgba(249,115,22,0.08)",textAlign:"center",position:"relative",overflow:"hidden"}}>
            {dg&&<Sparkles/>}
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:dg?"rgba(255,255,255,0.6)":P.tl,marginBottom:12}}>{dg?"🍍 ":""}ADHD Diagnosis{dg?" 🍍":""}</div>
              {dg?<><div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:8}}>{dg.l}</div><div style={{fontSize:14,color:"rgba(255,255,255,0.7)",fontFamily:"monospace"}}>DSM-IV {dg.c}</div></>
              :<><div style={{fontSize:16,fontWeight:700,color:P.tx,marginBottom:8}}>{(aCr||hCr)&&!iM?"Symptom criteria met — complete impairment section":s.crE===true?"Symptoms better explained by another disorder":"Diagnostic criteria not met"}</div>
                <div style={{fontSize:12,color:P.tm,lineHeight:1.5}}>{!aCr&&!hCr?"The threshold of 6 symptoms is not reached.":!iM?"Complete the Impairment section.":s.crE===null?"Complete criterion E.":""}</div></>}
            </div>
          </div>

          <div style={{padding:"14px 16px",background:P.bg,borderRadius:12,fontSize:11,color:P.tm,lineHeight:1.5,marginBottom:16,border:`1px solid ${P.ac}`}}>
            🍇 This tool is an aid for administering the DIVA 2.0 and does not replace the clinical judgment of a qualified healthcare professional. ADHD diagnosis must be made by a trained clinician.
          </div>
          <button onClick={reset} style={{width:"100%",padding:"14px",borderRadius:14,border:`1px solid ${P.ac}`,background:"#fff",color:P.pd,fontWeight:700,fontSize:14,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=P.bgd} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>🍒 Reset all</button>
        </>}
      </div>
    </div>
  );
}
