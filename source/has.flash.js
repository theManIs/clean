//has.flash.js

window.checkIfFlashEnabled = function() { 
   var isFlashEnabled = false; 
   // Проверка для всех браузеров, кроме IE 
   if (typeof(navigator.plugins)!="undefined" 
       && typeof(navigator.plugins["Shockwave Flash"])=="object" 
   ) { 
      isFlashEnabled = true; 
   } else if (typeof  window.ActiveXObject !=  "undefined") { 
      // Проверка для IE 
      try { 
         if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) { 
            isFlashEnabled = true; 
         } 
      } catch(e) {}; 
   }; 
   return isFlashEnabled; 
} 