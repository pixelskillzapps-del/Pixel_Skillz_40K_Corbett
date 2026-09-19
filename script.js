const loader=document.querySelector('.preloader');window.addEventListener('load',()=>{setTimeout(()=>loader.style.opacity='0',800);setTimeout(()=>loader.remove(),1500)});
const bar=document.querySelector('.scrollbar i');addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;if(h>0)bar.style.height=(scrollY/h*100)+'%'});
const dot=document.querySelector('.mouse-dot');addEventListener('pointermove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'});
const tiltEls=document.querySelectorAll('[data-tilt]');tiltEls.forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1100px) rotateY(${x*7}deg) rotateX(${-y*5}deg) translateY(-4px)`}));tiltEls.forEach(el=>el.addEventListener('pointerleave',()=>el.style.transform=''));
const reveals=document.querySelectorAll('.reveal');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(x=>io.observe(x));
const tiger=document.querySelector('.hero-tiger');let tx=0,ty=0,rx=0,ry=0;addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*5;ty=(e.clientY/innerHeight-.5)*3});function anim(){rx+=(tx-rx)*.035;ry+=(ty-ry)*.035;if(tiger)tiger.style.transform=`perspective(1400px) rotateY(${rx}deg) rotateX(${-ry}deg)`;requestAnimationFrame(anim)}anim();
if(window.THREE){const mount=document.querySelector('#webgl'),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,100);camera.position.z=13;const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);mount.appendChild(renderer.domElement);const pos=[];for(let i=0;i<850;i++)pos.push((Math.random()-.5)*30,(Math.random()-.5)*17,-Math.random()*25);const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));const mat=new THREE.PointsMaterial({color:0xa9d45b,size:.018,transparent:true,opacity:.28});const pts=new THREE.Points(geo,mat);scene.add(pts);const rings=[];[6,7,8].forEach((r,i)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,.005,8,180),new THREE.MeshBasicMaterial({color:0xa9d45b,transparent:true,opacity:.08}));m.rotation.x=1.1+i*.15;m.rotation.y=.25;scene.add(m);rings.push(m)});function loop(){requestAnimationFrame(loop);pts.rotation.y+=.00012;rings.forEach((r,i)=>r.rotation.z+=.00025*(i+1));renderer.render(scene,camera)}loop();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)})}

// Hero V4 cinematic depth: the tiger, lettering and grid subtly follow the pointer.
(()=>{
  const root=document.querySelector('.hero-v4');
  if(!root) return;
  const creature=root.querySelector('.hero-creature');
  const words=[...root.querySelectorAll('.hero-word')];
  let mx=0,my=0,cx=0,cy=0;
  addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
  function frame(){
    cx+=(mx-cx)*.035; cy+=(my-cy)*.035;
    if(creature) creature.style.transform=`perspective(1400px) rotateY(${cx*7}deg) rotateX(${-cy*4}deg)`;
    words.forEach((w,i)=>w.style.transform=`translate3d(${cx*(i%2?18:-14)}px,${cy*(i%2?-12:16)}px,0)`);
    requestAnimationFrame(frame);
  }
  frame();
})();
