  /* ---- AI in Action: typewriter demo ---- */
  (function(){
    const chat=document.getElementById('aiChat'),tabs=document.getElementById('aiTabs');if(!chat||!tabs)return;
    const SCENES=[
      {u:"Draft a reply to a customer asking why their cross-connect order is still open — the fibre was pulled but the patch is waiting on a change window.",
       b:"<b>Subject: Cross-connect XC-40221 — scheduled for Thursday</b><br><br>Hi Nomsa,<br><br>Your cross-connect between cage 4B and the meet-me room is <b>physically installed</b> — the fibre run and testing were completed on Tuesday.<br><br>What's outstanding is the patch into your cabinet, which needs a <b>change window</b> on your side. The next available slot is <b>Thursday 02:00–04:00 SAST</b>; reply to confirm and we'll have an engineer on site.<br><br>Kind regards,<br>Equinix Customer Support"},
      {u:"Summarise this month's facility report into 3 points for the ops meeting.",
       b:"Three things worth raising:<br><br>• <b>PUE down to 1.38</b> from 1.44, following the chiller setpoint change in hall 2.<br>• <b>Three cabinets in hall 3 above 85% of rated power</b> — worth a capacity conversation with those customers before the next deployment.<br>• <b>Two CRAC units short-cycling</b> overnight; both are inside the maintenance window, so schedule rather than escalate."},
      {u:"Here's 5,000 rows of half-hourly branch-circuit data. Which racks look wrong?",
       b:"Three anomalies stand out:<br><br>• <b>11 cabinets drawing zero on the B feed</b> for 20+ days — single-corded kit, so no redundancy if the A feed drops.<br>• <b>Cabinet 3-D-14 spikes to 9.2 kW at 02:00 nightly</b> — a batch job, not a fault, but it is over the design envelope.<br>• <b>Hall 4's total is 7% above</b> the sum of its branch circuits — check the metering calibration before you re-plan capacity."},
      {u:"Plan a 6-week build-out for 480 cabinets in a new hall.",
       b:"Here's a phased plan:<br><br>• <b>Wk 1:</b> Floor survey + asset register; confirm power feeds, containment routes and access windows.<br>• <b>Wk 2–4:</b> Two teams, 40 cabinets a day, each metered and registered to DCIM same-day.<br>• <b>Wk 5:</b> Structured cabling, labelling and meet-me-room patching; first customer walkthroughs.<br>• <b>Wk 6:</b> Commission power and cooling, reconcile DCIM against the floor, hand over to operations."}
    ];
    let active=-1,timer=null;
    const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    function clearTimers(){if(timer){clearTimeout(timer);timer=null;}}
    function typeHTML(el,html,done){
      // tokens are either HTML tags (injected whole) or text runs (typed char-by-char)
      const tokens=html.match(/<[^>]+>|[^<]+/g)||[];
      const caret='<span class="ai-caret"></span>';
      let ti=0,ci=0,built='';
      (function step(){
        if(ti>=tokens.length){el.innerHTML=html;done&&done();return;}
        const tk=tokens[ti];
        if(tk[0]==='<'){built+=tk;ti++;ci=0;el.innerHTML=built+caret;timer=setTimeout(step,12);return;}
        ci++;
        el.innerHTML=built+tk.slice(0,ci)+caret;
        if(ci>=tk.length){built+=tk;ti++;ci=0;}
        timer=setTimeout(step,tk.length>40?7:16);
      })();
    }
    function run(i){
      if(i===active)return;active=i;clearTimers();chat.innerHTML='';
      [...tabs.children].forEach((b,bi)=>b.classList.toggle('active',bi===i));
      const sc=SCENES[i];
      const u=document.createElement('div');u.className='ai-msg user';
      u.innerHTML='<div class="av">You</div><div class="bubble">'+sc.u+'</div>';
      chat.appendChild(u);
      timer=setTimeout(()=>{
        const b=document.createElement('div');b.className='ai-msg bot';
        b.innerHTML='<div class="av">AI</div><div class="bubble"></div>';
        chat.appendChild(b);
        typeHTML(b.querySelector('.bubble'),sc.b);
      },450);
    }
    tabs.addEventListener('click',e=>{const t=e.target.closest('.ai-tab');if(t)run(+t.dataset.i);});
    // start when section scrolls into view
    new IntersectionObserver((es,ob)=>es.forEach(e=>{if(e.isIntersecting){run(0);ob.disconnect();}}),{threshold:.35}).observe(chat);
  })();

  /* ---- Animated stat counters ---- */
  (function(){
    const nums=[...document.querySelectorAll('.ai-stats .num')];if(!nums.length)return;
    const obs=new IntersectionObserver((es,ob)=>es.forEach(e=>{
      if(!e.isIntersecting)return;ob.unobserve(e.target);
      const el=e.target,txt=el.dataset.txt;
      if(txt){el.textContent=txt;return;}
      const to=+el.dataset.to,suf=el.dataset.suf||'';let s=null;
      (function tick(t){if(!s)s=t;const p=Math.min((t-s)/1100,1);el.textContent=Math.round(p*to)+suf;if(p<1)requestAnimationFrame(tick);})(performance.now());
    }),{threshold:.6});
    nums.forEach(n=>obs.observe(n));
  })();

