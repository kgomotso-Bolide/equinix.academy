  /* ---- Hero neural-network canvas ---- */
  (function(){
    const cv=document.getElementById('neural');if(!cv)return;
    const ctx=cv.getContext('2d');let w,h,nodes,raf;
    const COLORS=['#c7c4c9','#c7c4c9','#c7c4c9','#b9b6bb','#e91c24','#6c4ba6']; // mostly grey, rare orange/green
    function size(){const r=cv.parentElement.getBoundingClientRect();w=cv.width=r.width;h=cv.height=r.height;build();}
    function build(){
      const n=Math.min(46,Math.round(w*h/26000));
      nodes=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,c:COLORS[Math.floor(Math.random()*COLORS.length)]}));
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      for(let i=0;i<nodes.length;i++){
        const a=nodes[i];a.x+=a.vx;a.y+=a.vy;
        if(a.x<0||a.x>w)a.vx*=-1;if(a.y<0||a.y>h)a.vy*=-1;
        for(let j=i+1;j<nodes.length;j++){
          const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
          if(d<130){ctx.strokeStyle='rgba(120,120,130,'+(1-d/130)*.28+')';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
        }
      }
      nodes.forEach(a=>{ctx.fillStyle=a.c;ctx.globalAlpha=.7;ctx.beginPath();ctx.arc(a.x,a.y,2.2,0,7);ctx.fill();ctx.globalAlpha=1;});
      raf=requestAnimationFrame(draw);
    }
    const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    size();window.addEventListener('resize',size);
    if(reduce){draw();cancelAnimationFrame(raf);}else draw();
  })();

