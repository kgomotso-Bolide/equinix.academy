  /* ---- AI in Action: typewriter demo ---- */
  (function(){
    const chat=document.getElementById('aiChat'),tabs=document.getElementById('aiTabs');if(!chat||!tabs)return;
    const SCENES=[
      {u:"Draft a friendly email to a client letting them know their order ships Friday and apologising for the earlier delay.",
       b:"<b>Subject: Your order ships Friday</b><br><br>Hi Thandi,<br><br>Good news — your order is packed and will ship this <b>Friday</b>. Apologies for the earlier delay; thank you for your patience. You'll receive tracking the moment it's on the way.<br><br>Warm regards,<br>The Team"},
      {u:"Summarise this 12-page quarterly report into 3 key points for our leadership meeting.",
       b:"Here are the 3 headlines from the report:<br><br>• <b>Revenue up 18%</b> QoQ, led by the new online channel.<br>• <b>Support costs down 22%</b> after automating routine queries.<br>• <b>Risk:</b> one supplier now accounts for 40% of stock — worth diversifying."},
      {u:"I have 5,000 rows of sales data. Which regions are underperforming and why?",
       b:"Analysis complete:<br><br>• <b>Western Cape & Gauteng</b> are on target.<br>• <b>Eastern Cape is 31% below forecast</b> — driven by two months of stock-outs.<br>• Recommended action: rebalance inventory and review the regional delivery lead time."},
      {u:"Plan a 6-week project to roll out AI training across a 40-person team.",
       b:"Here's a phased plan:<br><br>• <b>Wk 1–2:</b> Skills assessment + AI fundamentals for all staff.<br>• <b>Wk 3–4:</b> Role-based tool training (sales, ops, admin).<br>• <b>Wk 5:</b> Hands-on projects on real workflows.<br>• <b>Wk 6:</b> Review, measure time saved, set team standards."}
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

