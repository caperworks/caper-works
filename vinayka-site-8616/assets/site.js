(function(){
  var WA='919509757411';
  function wa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}

  // mobile menu
  var hd=document.querySelector('header'),bg=document.querySelector('.burger');
  if(bg)bg.addEventListener('click',function(){var o=hd.classList.toggle('open');bg.setAttribute('aria-expanded',o)});

  // fade-in on scroll (scroll-based so content is never left hidden)
  var fades=[].slice.call(document.querySelectorAll('.fade'));
  function reveal(){
    var h=window.innerHeight*.92;
    fades=fades.filter(function(el){
      if(el.getBoundingClientRect().top<h){el.classList.add('in');return false}
      return true;
    });
    if(!fades.length){window.removeEventListener('scroll',reveal);window.removeEventListener('resize',reveal)}
  }
  window.addEventListener('scroll',reveal,{passive:true});window.addEventListener('resize',reveal);
  reveal();setTimeout(reveal,300);

  // hide images that fail to load (keeps the teal gradient)
  document.querySelectorAll('.ph img').forEach(function(im){im.addEventListener('error',function(){im.style.display='none'})});

  // enquiry form -> WhatsApp
  var f=document.getElementById('f');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var g=function(id){var x=document.getElementById(id);return x?x.value:''};
    var t="Hello, I'm "+g('n')+". I'm interested in: "+g('c')+"."+(g('b')?" Budget: "+g('b')+".":"")+(g('m')?" "+g('m'):"");
    window.open(wa(t),'_blank','noopener');
  });

  // collections: filter + product modal
  var chips=document.querySelectorAll('.chip'),prods=document.querySelectorAll('.prod[data-cat]'),cnt=document.getElementById('count');
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('on')});c.classList.add('on');
    var k=c.dataset.f,n=0;
    prods.forEach(function(p){var show=k==='all'||p.dataset.cat===k;p.classList.toggle('hide',!show);if(show)n++});
    if(cnt)cnt.textContent=n+' piece'+(n===1?'':'s');
  })});
  var modal=document.getElementById('modal');
  if(modal){
    var mi=modal.querySelector('.ph img'),mt=modal.querySelector('h3'),mc=modal.querySelector('.kicker'),md=modal.querySelector('.desc'),ma=modal.querySelector('.btn');
    function close(){modal.classList.remove('open');document.body.style.overflow=''}
    prods.forEach(function(p){p.addEventListener('click',function(){
      var name=p.dataset.name;
      mi.src=p.dataset.big;mi.alt=name;mt.textContent=name;mc.textContent=p.dataset.cat;md.textContent=p.dataset.desc;
      ma.href=wa("Hello, I'd like details and price for: "+name+" ("+p.dataset.cat+").");
      modal.classList.add('open');document.body.style.overflow='hidden';
    })});
    modal.addEventListener('click',function(e){if(e.target===modal||e.target.classList.contains('mclose'))close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
})();
