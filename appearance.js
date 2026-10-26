(()=>{
 const key='sunnora-color-theme';
 const root=document.documentElement;
 const system=window.matchMedia('(prefers-color-scheme: dark)');
 let selected;
 try { selected=localStorage.getItem(key); } catch {}
 let explicit=selected==='light'||selected==='dark';
 function apply(theme,remember=false){
  root.dataset.appearance=theme;
  root.style.colorScheme=theme;
  document.querySelectorAll('[data-choose-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.chooseTheme===theme)));
  if(remember){explicit=true;try{localStorage.setItem(key,theme);}catch{}}
 }
 apply(explicit?selected:(system.matches?'dark':'light'));
 document.addEventListener('DOMContentLoaded',()=>{
  apply(root.dataset.appearance);
  document.querySelectorAll('[data-choose-theme]').forEach(button=>button.addEventListener('click',()=>apply(button.dataset.chooseTheme,true)));
 });
 system.addEventListener('change',event=>{if(!explicit)apply(event.matches?'dark':'light');});
 window.addEventListener('storage',event=>{if(event.key===key&&(event.newValue==='light'||event.newValue==='dark')){explicit=true;apply(event.newValue);}});
})();