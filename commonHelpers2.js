import"./assets/modulepreload-polyfill-ec808ebb.js";import{i}from"./assets/vendor-651d7991.js";const n=document.querySelector(".form");n.addEventListener("submit",a);function r(e,t){return new Promise((s,o)=>{setTimeout(()=>{t==="fulfilled"?s(e):o(e)},e)})}function a(e){e.preventDefault();const{delay:t,state:s}=e.target.elements,o=Number(t.value);r(o,s.value).then(m=>{i.show({message:`✅ Fulfilled promise in ${m}ms`})}).catch(m=>{i.show({message:`❌ Rejected promise in ${m}ms`})})}
//# sourceMappingURL=commonHelpers2.js.map