(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('universe');
  const ctx = canvas.getContext('2d');
  let w=0,h=0,dpr=Math.min(devicePixelRatio||1,2),mx=0,my=0;
  const pts=[];
  function resize(){w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);if(!pts.length){for(let i=0;i<120;i++)pts.push({x:Math.random()*w,y:Math.random()*h,z:Math.random(),r:Math.random()*1.4+.2,v:Math.random()*.11+.02})}}
  addEventListener('resize',resize);resize();addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
  function universe(){ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(mx||w*.65,my||h*.35,0,mx||w*.65,my||h*.35,Math.max(w,h)*.72);g.addColorStop(0,'rgba(112,82,218,.11)');g.addColorStop(.4,'rgba(28,43,73,.05)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);for(const p of pts){p.y-=p.v;if(p.y<-5)p.y=h+5;const dx=(mx-p.x)*.00025*(p.z+.2);const dy=(my-p.y)*.00018*(p.z+.2);ctx.beginPath();ctx.arc(p.x+dx,p.y+dy,p.r*(p.z+.45),0,Math.PI*2);ctx.fillStyle=`rgba(181,195,255,${.18+p.z*.45})`;ctx.fill()}if(!reduced)requestAnimationFrame(universe)} universe();

  const reveals=[...document.querySelectorAll('.reveal')];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.14});
  reveals.forEach(el=>io.observe(el));

  const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');
  if(cursor&&dot){addEventListener('pointermove',e=>{cursor.style.left=dot.style.left=e.clientX+'px';cursor.style.top=dot.style.top=e.clientY+'px'});document.querySelectorAll('a,button,.room-card').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('link-hover'));el.addEventListener('mouseleave',()=>document.body.classList.remove('link-hover'))})}

  document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});

  const nodes=[...document.querySelectorAll('.memory-map .node')];
  nodes.forEach(n=>n.addEventListener('click',()=>{nodes.forEach(x=>x.classList.remove('active'));n.classList.add('active');const title=document.querySelector('.map-card strong'),p=document.querySelector('.map-card p');title.textContent=n.textContent.trim().replace(/^\d+/, '');p.textContent=['9 windows • 4 AI sessions • 2 unresolved decisions','14 windows • 6 AI sessions • 3 unresolved decisions','11 sources • 28 captures • 1 strong lead','8 reminders • 5 forms • 2 deadlines','43 actions • 0 task checkboxes • real progress'][nodes.indexOf(n)]}));

  const seal=document.getElementById('sealButton'),consoleEl=document.getElementById('rescueConsole');
  seal.addEventListener('click',()=>{consoleEl.classList.toggle('sealed');const sealed=consoleEl.classList.contains('sealed');document.querySelector('.pressure-value').textContent=sealed?'18%':'72%';seal.innerHTML=sealed?'Restore workspace <span>↙</span>':'Seal memory <span>↗</span>'});

  const river=document.getElementById('river'),rctx=river.getContext('2d');let rw=0,rh=0,t=0;
  function rresize(){const r=river.getBoundingClientRect();rw=r.width;rh=r.height;river.width=rw*dpr;river.height=rh*dpr;rctx.setTransform(dpr,0,0,dpr,0,0)}addEventListener('resize',rresize);rresize();
  function riverDraw(){rctx.clearRect(0,0,rw,rh);const tracks=[{y:.36,a:42,c:'122,101,255',lw:4},{y:.52,a:58,c:'73,160,255',lw:3},{y:.67,a:36,c:'76,222,202',lw:2}];tracks.forEach((tr,j)=>{rctx.beginPath();for(let x=-20;x<rw+20;x+=4){const y=rh*tr.y+Math.sin(x*.012+t*.012+j)*tr.a+Math.sin(x*.026-t*.018)*tr.a*.28;if(x===-20)rctx.moveTo(x,y);else rctx.lineTo(x,y)}const grad=rctx.createLinearGradient(0,0,rw,0);grad.addColorStop(0,`rgba(${tr.c},0)`);grad.addColorStop(.18,`rgba(${tr.c},.55)`);grad.addColorStop(.72,`rgba(${tr.c},.75)`);grad.addColorStop(1,`rgba(${tr.c},0)`);rctx.strokeStyle=grad;rctx.lineWidth=tr.lw;rctx.shadowBlur=22;rctx.shadowColor=`rgba(${tr.c},.55)`;rctx.stroke();rctx.shadowBlur=0});for(let i=0;i<28;i++){const x=(i/27)*rw,y=rh*.52+Math.sin(x*.012+t*.012+1)*58+Math.sin(x*.026-t*.018)*16;rctx.beginPath();rctx.arc(x,y,i%7===0?4:1.5,0,Math.PI*2);rctx.fillStyle=i%7===0?'rgba(255,255,255,.9)':'rgba(170,190,255,.55)';rctx.fill()}t++;if(!reduced)requestAnimationFrame(riverDraw)}riverDraw();
})();
