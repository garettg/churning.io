(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{696:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Home}});var n=r(7294),a=r(5720),o=r(155),l=r(9274),c=r(70),i=r(7106),s=r(2010),u=r(270),m=r(4922);function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _slicedToArray(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var o=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(r=a.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,n=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw n}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _arrayLikeToArray(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var components_Options=function(){var e=(0,u.A)(),t=e.options,r=e.setOptions,o=_slicedToArray((0,n.useState)(!1),2),l=o[0],d=o[1],h=_slicedToArray((0,n.useState)(!1),2),p=h[0],f=h[1],y=(0,s.F)(),g=(y.theme,y.setTheme);if((0,n.useEffect)(function(){return d(!0)},[]),!l)return null;var handleClose=function(){localStorage.setItem(c.D.id+"-options",(0,m.nN)(t)),f(!1)},handleChange=function(e,t){r(function(r){return _objectSpread(_objectSpread({},r),{},_defineProperty({},e,t))}),"darkMode"===e&&(t?g("dark"):g("light")),(0,m._H)("options",{option:e,enabled:t?"Yes":"No"})},b=[{id:"dark-mode",label:"Dark Mode",name:"darkMode",checked:t.darkMode},{id:"old-reddit",label:"Old Reddit",name:"oldReddit",checked:t.oldReddit},{id:"show-date",label:"Show Date",name:"showDate",checked:t.showDate},{id:"show-suggestions",label:"Show Suggestions",name:"showSuggestions",checked:t.showSuggestions}].map(function(e,t){return n.createElement(a.Zh,{color:"blue",key:t,id:e.id,name:e.name,label:e.label,checked:e.checked,onChange:function(t){return handleChange(e.name,t)}})});return n.createElement(n.Fragment,null,n.createElement(a.zx,{color:"blue",size:"sm",title:"".concat(c.D.name," Options"),"aria-label":"".concat(c.D.name," Options"),"aria-haspopup":!0,onClick:function(){return f(function(e){return!e})}},n.createElement(i.AXL,{className:"h-5 w-5"})),n.createElement(a.u_,{show:p,"aria-labelledby":"options-modal",onClose:handleClose,size:"sm"},n.createElement(a.u_.Header,{id:"options-modal"},c.D.name," Options"),n.createElement(a.u_.Body,null,n.createElement("form",{className:""},n.createElement("div",{className:"flex flex-col gap-4"},b))),n.createElement(a.u_.Footer,null,n.createElement(a.zx,{color:"blue","aria-label":"Close",onClick:handleClose,fullSized:!0},"OK"))))},d=r(286),h=r(3855),p=r(4184),f=r.n(p),y=r(8053);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function SearchForm_slicedToArray(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var o=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(r=a.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,n=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw n}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return SearchForm_arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return SearchForm_arrayLikeToArray(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function SearchForm_arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function SearchForm_ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function SearchForm_objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?SearchForm_ownKeys(Object(r),!0).forEach(function(t){SearchForm_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):SearchForm_ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function SearchForm_defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _regeneratorRuntime(){_regeneratorRuntime=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",l=n.toStringTag||"@@toStringTag";function define(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{define({},"")}catch(e){define=function(e,t,r){return e[t]=r}}function wrap(e,t,r,n){var a,o=Object.create((t&&t.prototype instanceof Generator?t:Generator).prototype),l=new Context(n||[]);return o._invoke=(a="suspendedStart",function(t,n){if("executing"===a)throw Error("Generator is already running");if("completed"===a){if("throw"===t)throw n;return doneResult()}for(l.method=t,l.arg=n;;){var o=l.delegate;if(o){var i=function maybeInvokeDelegate(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,maybeInvokeDelegate(e,t),"throw"===t.method))return c;t.method="throw",t.arg=TypeError("The iterator does not provide a 'throw' method")}return c}var n=tryCatch(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,c;var a=n.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,c):a:(t.method="throw",t.arg=TypeError("iterator result is not an object"),t.delegate=null,c)}(o,l);if(i){if(i===c)continue;return i}}if("next"===l.method)l.sent=l._sent=l.arg;else if("throw"===l.method){if("suspendedStart"===a)throw a="completed",l.arg;l.dispatchException(l.arg)}else"return"===l.method&&l.abrupt("return",l.arg);a="executing";var s=tryCatch(e,r,l);if("normal"===s.type){if(a=l.done?"completed":"suspendedYield",s.arg===c)continue;return{value:s.arg,done:l.done}}"throw"===s.type&&(a="completed",l.method="throw",l.arg=s.arg)}}),o}function tryCatch(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=wrap;var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var i={};define(i,a,function(){return this});var s=Object.getPrototypeOf,u=s&&s(s(values([])));u&&u!==t&&r.call(u,a)&&(i=u);var m=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(i);function defineIteratorMethods(e){["next","throw","return"].forEach(function(t){define(e,t,function(e){return this._invoke(t,e)})})}function AsyncIterator(e,t){var n;this._invoke=function(a,o){function callInvokeWithMethodAndArg(){return new t(function(n,l){!function invoke(n,a,o,l){var c=tryCatch(e[n],e,a);if("throw"!==c.type){var i=c.arg,s=i.value;return s&&"object"==_typeof(s)&&r.call(s,"__await")?t.resolve(s.__await).then(function(e){invoke("next",e,o,l)},function(e){invoke("throw",e,o,l)}):t.resolve(s).then(function(e){i.value=e,o(i)},function(e){return invoke("throw",e,o,l)})}l(c.arg)}(a,o,n,l)})}return n=n?n.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}}function pushTryEntry(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function resetTryEntry(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Context(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(pushTryEntry,this),this.reset(!0)}function values(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,next=function next(){for(;++n<e.length;)if(r.call(e,n))return next.value=e[n],next.done=!1,next;return next.value=void 0,next.done=!0,next};return next.next=next}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,define(m,"constructor",GeneratorFunctionPrototype),define(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===GeneratorFunction||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,GeneratorFunctionPrototype):(e.__proto__=GeneratorFunctionPrototype,define(e,l,"GeneratorFunction")),e.prototype=Object.create(m),e},e.awrap=function(e){return{__await:e}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,o,function(){return this}),e.AsyncIterator=AsyncIterator,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var l=new AsyncIterator(wrap(t,r,n,a),o);return e.isGeneratorFunction(r)?l:l.next().then(function(e){return e.done?e.value:l.next()})},defineIteratorMethods(m),define(m,l,"Generator"),define(m,a,function(){return this}),define(m,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function next(){for(;t.length;){var r=t.pop();if(r in e)return next.value=r,next.done=!1,next}return next.done=!0,next}},e.values=values,Context.prototype={constructor:Context,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function handle(r,n){return o.type="throw",o.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],o=a.completion;if("root"===a.tryLoc)return handle("end");if(a.tryLoc<=this.prev){var l=r.call(a,"catchLoc"),c=r.call(a,"finallyLoc");if(l&&c){if(this.prev<a.catchLoc)return handle(a.catchLoc,!0);if(this.prev<a.finallyLoc)return handle(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return handle(a.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return handle(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=e,l.arg=t,o?(this.method="next",this.next=o.finallyLoc,c):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),c},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),c}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;resetTryEntry(r)}return a}}throw Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:values(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),c}},e}function asyncGeneratorStep(e,t,r,n,a,o,l){try{var c=e[o](l),i=c.value}catch(e){r(e);return}c.done?t(i):Promise.resolve(i).then(n,a)}var components_SearchForm=function(){var e,t,r=(0,u.A)(),o=r.query,l=r.author,i=r.selectionRange,s=r.sort,m=r.time,p=r.subreddit,g=r.search,b=r.setState,v=r.searching,E=(e=_regeneratorRuntime().mark(function _callee(e){return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),g(!0);case 2:case"end":return t.stop()}},_callee)}),t=function(){var t=this,r=arguments;return new Promise(function(n,a){var o=e.apply(t,r);function _next(e){asyncGeneratorStep(o,n,a,_next,_throw,"next",e)}function _throw(e){asyncGeneratorStep(o,n,a,_next,_throw,"throw",e)}_next(void 0)})},function(e){return t.apply(this,arguments)}),handleChange=function(e){b(function(t){return SearchForm_objectSpread(SearchForm_objectSpread({},t),{},SearchForm_defineProperty({},e.target.name,e.target.value))})},handleRangeChange=function(e){b(function(t){return SearchForm_objectSpread(SearchForm_objectSpread({},t),{},{selectionRange:e.selection})})},w=Object.entries(y.vf).map(function(e,t){var r=SearchForm_slicedToArray(e,2),a=r[0],o=r[1];return n.createElement("option",{value:a,key:t},o)}),x=Object.entries(c.D.subreddits).map(function(e,t){var r=SearchForm_slicedToArray(e,2),a=r[0];return r[1],n.createElement("option",{value:a,key:t},a)}),_="Search";v&&(_=n.createElement(n.Fragment,null,n.createElement("span",{className:"mr-3"},n.createElement(a.$j,{size:"sm",light:!0})),"Searching ..."));var N=o.length<3&&""===l;return n.createElement("form",{onSubmit:E,className:"flex flex-col gap-3 lg:gap-4 mt-3 md:mt-4",role:"search","aria-label":"Search Form"},n.createElement("div",null,n.createElement("div",{className:"lg:mb-1"},n.createElement(a.__,{htmlFor:"query",value:"Search"})),n.createElement(a.oi,{id:"query",name:"query",type:"search",value:o,onChange:handleChange})),n.createElement("div",null,n.createElement("div",{className:"lg:mb-1"},n.createElement(a.__,{htmlFor:"author",value:"Author"})),n.createElement(a.oi,{id:"author",name:"author",type:"search",value:l,onChange:handleChange})),n.createElement("div",{className:"grid grid-cols-12 gap-4"},n.createElement("div",{className:"col-span-5"},n.createElement("div",{className:"lg:mb-1"},n.createElement(a.__,{htmlFor:"sort",value:"Sort By"})),n.createElement(a.Ph,{id:"sort",name:"sort",value:s,onChange:handleChange},n.createElement("option",{value:"desc"},"Newest"),n.createElement("option",{value:"asc"},"Oldest"))),n.createElement("div",{className:"col-span-7"},n.createElement("div",{className:"lg:mb-1"},n.createElement(a.__,{htmlFor:"subreddit",value:"Subreddit"})),n.createElement(a.Ph,{id:"subreddit",name:"subreddit",value:p,onChange:handleChange},x))),n.createElement("div",null,n.createElement("div",{className:"lg:mb-1"},n.createElement(a.__,{htmlFor:"time",value:"Time Range"})),n.createElement(a.Ph,{id:"time",name:"time",value:m,onChange:handleChange},w,n.createElement("option",{value:"all"},"All"),n.createElement("option",{value:""},"Custom"))),n.createElement("div",{className:f()("custom-date-range",{hidden:""!==m})},n.createElement(a.__,{htmlFor:"date-range",value:"Custom Time Range",className:"sr-only"}),n.createElement(d.C0,{id:"date-range",editableDateInputs:!1,onChange:function(e){return handleRangeChange(e)},moveRangeOnFirstSelection:!1,minDate:(0,h.Z)("".concat(c.D.subreddits[p],"T00:00:00")),maxDate:new Date,ranges:[i],rangeColors:["#1B5DE7","#3ecf8e","#fed14c"]})),n.createElement("div",{className:"mt-4"},n.createElement(a.zx,{color:"blue",disabled:N,"aria-disabled":N,"aria-label":"Search",type:"submit",fullSized:!0},_)))},g=r(5697),b=r.n(g),v=r(2298),E=r(1811),w=r(7246),x=r(6324),_=r(3990),components_Help=function(){return n.createElement("table",{className:"table-auto text-sm mx-auto"},n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",{className:"px-4 py-2 text-left"},"Field"),n.createElement("th",{className:"px-4 py-2 text-left"},"Options"))),n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",{className:"border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700"},"Search"),n.createElement("td",{className:"border px-4 py-2 align-top border-gray-200 dark:border-gray-700"},n.createElement("dl",null,n.createElement("dt",{className:"font-bold"},"General Advice"),n.createElement("dd",{className:"pl-4"},n.createElement("p",null,"Search queries should be at least 3 characters long. Common language words could be ignored. Acronyms of 3 letters or more are more likely to produce results, 2 letter acronyms will most likely be filtered out. Variations and pluralizations of words will be found."),n.createElement("p",{className:"italic"},'Example: "save" can return results that contain "saving"'),n.createElement("p",{className:"italic"},'Example: "bank bonus" can return results that contain "bank", "banks", "bonus", or "bonuses"')),n.createElement("dt",{className:"mt-2 font-bold"},"Multiple terms"),n.createElement("dd",{className:"pl-4"},n.createElement("p",null,'Using words separated using a space should be an "AND" search (includes both words)'),n.createElement("p",{className:"italic"},"Example: chase sapphire"),n.createElement("p",null,'Using words separated with an "OR" should find either'),n.createElement("p",{className:"italic"},"Example: chase or amex")),n.createElement("dt",{className:"mt-2 font-bold"},"Negation"),n.createElement("dd",{className:"pl-4"},n.createElement("p",null,'To find comments that match one word but not another word, use a "-" before the word you wish to exclude.'),n.createElement("p",{className:"italic"},"Example: chase -sapphire")),n.createElement("dt",{className:"mt-2 font-bold"},"Exact Phrase"),n.createElement("dd",{className:"pl-4"},n.createElement("p",null,"If you wanted to find an exact phrase, you can put the phrase in quotation marks."),n.createElement("p",{className:"italic"},'Example: "amex gold"'))))),n.createElement("tr",null,n.createElement("td",{className:"border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700"},"Author"),n.createElement("td",{className:"border px-4 py-2 align-top border-gray-200 dark:border-gray-700"},n.createElement("p",null,"This parameter will restrict the search to specific Reddit authors."))),n.createElement("tr",null,n.createElement("td",{className:"border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700"},"Sort By"),n.createElement("td",{className:"border px-4 py-2 align-top border-gray-200 dark:border-gray-700"},n.createElement("p",null,"Select a sort order by date, options are newest and oldest."))),n.createElement("tr",null,n.createElement("td",{className:"border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700"},"Subreddit"),n.createElement("td",{className:"border px-4 py-2 align-top border-gray-200 dark:border-gray-700"},n.createElement("p",null,"Select a subreddit to search of multiple options."))),n.createElement("tr",null,n.createElement("td",{className:"border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700"},"Time Range"),n.createElement("td",{className:"border px-4 py-2 align-top border-gray-200 dark:border-gray-700"},n.createElement("p",null,"Select a time range from the dropdown. Options include:"),n.createElement("ul",{className:"list-inside list-disc px-4 my-3"},n.createElement("li",null,"1 day"),n.createElement("li",null,"1 week"),n.createElement("li",null,"1 month"),n.createElement("li",null,"3 months"),n.createElement("li",null,"6 months"),n.createElement("li",null,"1 year"),n.createElement("li",null,"2 years"),n.createElement("li",null,"All"),n.createElement("li",null,"Custom")),n.createElement("p",null,"Custom allows a date range to be selected via calendar widget.")))))},N=r(5434),components_Reset=function(){var e=(0,u.A)().reset;return n.createElement(a.zx,{color:"blue",size:"xs","aria-label":"Reset Search",title:"Reset Search",onClick:e},n.createElement(N.la_,{className:"md:mr-2 h-4 w-4"}),n.createElement("span",{className:"hidden md:inline"},"Reset"))},k=r(4855),S=r(6501),O=r(6893),j=r(7803),C=r(3894),A=r(9119),F=r(9013),P=r(7499),D=r.n(P),T=["selectionRange"],components_Share=function(){var e=(0,u.A)(),t=e.shareUrl,r=e.totalCount;return n.createElement(n.Fragment,null,n.createElement(k.CopyToClipboard,{text:t,onCopy:function(){S.ZP.custom(function(e){return n.createElement("div",{className:f()([D().notificationWrapper,e.visible?"top-0":"-top-96"])},n.createElement("div",{className:D().iconWrapper},n.createElement(O.A8q,null)),n.createElement("div",{className:D().contentWrapper},n.createElement("h1",null,"Share Link Copied"),n.createElement("p",null,"You may now paste the link where needed.")),n.createElement("div",{className:D().closeIcon,onClick:function(){return S.ZP.dismiss(e.id)}},n.createElement(N.lTq,null)))},{id:"share-notification",position:"top-center"});var e=t.split("#")[1],a=(0,m.Lj)(e);(0,m.jW)("share",{category:"Share",label:"share",value:a.query,nonInteraction:!0}),a.selectionRange;var o=function(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}(a,T),l=Object.assign({},o,{time:""!==o.time?"all"!==o.time?o.time:(0,j.default)((0,C.default)(new Date),(0,A.default)((0,F.Z)((0,h.Z)(c.D.subreddits[o.subreddit]))))+1:(0,j.default)((0,C.default)(a.selectionRange.endDate),(0,A.default)(a.selectionRange.startDate))+1,keywords:a.query.replace(y.cW," ").trim().replace(/\s+/g,",").toLowerCase(),resultCount:r});(0,m._H)("share",l)}},n.createElement(a.zx,{color:"blue",size:"xs","aria-label":"Share Search Results",title:"Share Search Results"},n.createElement(O.A8q,{className:"md:mr-2 h-4 w-4"}),n.createElement("span",{className:"hidden md:inline"},"Share"))),n.createElement(S.x7,null))},I=r(7516),components_Error=function(){var e=(0,u.A)().options,t=n.createElement("div",{className:"mt-4 text-red-700 dark:text-red-800"},n.createElement("p",{className:"text-base"},"There is probably an issue with ",n.createElement("a",{href:"https://search.pullpush.io/",className:"underline",target:"_blank"},"pullpush.io")," which is where the results come from. Things you can try:"),n.createElement("ul",{className:"list-inside list-disc px-4 my-3 leading-loose text-sm"},n.createElement("li",null,"Try going to ",n.createElement("a",{href:"https://search.pullpush.io/",className:"underline",target:"_blank"},"pullpush.io"),". If it does not load, then ",c.D.name," will not work."),n.createElement("li",null,"If ",n.createElement("a",{href:"https://search.pullpush.io/",className:"underline",target:"_blank"},"pullpush.io")," loads, try searching. If it does not return results for any type of search, then ",c.D.name," will not work."),n.createElement("li",null,"If everything on ",n.createElement("a",{href:"https://search.pullpush.io/",className:"underline",target:"_blank"},"pullpush.io")," is working normally, then feel free to ",n.createElement("a",{href:"https://".concat(e.oldReddit?"old":"www",".reddit.com/message/compose/?to=").concat(c.D.author,"&subject=").concat(c.D.name.replace(/\s+/g,"+"),"+Error"),target:"_blank",className:"underline"},"report")," the issue.")));return n.createElement("div",{className:"p-12 w-full"},n.createElement(a.bZ,{color:"failure",icon:I.tJu,additionalContent:t},n.createElement("h2",{className:"text-2xl font-medium text-red-700 dark:text-red-800"},"An Error Has Occurred")))},R=r(9583),Suggestion=function(e){var t=(0,u.A)(),r=t.options,o=t.totalCount,_onClick=function(e,t){(0,m.jW)("suggestion",{category:"Suggestion",label:e,value:t,nonInteraction:!0}),(0,m._H)("suggestion",{suggest:e,query:t,keywords:t.replace(y.cW," ").trim().replace(/\s+/g,",").toLowerCase(),resultCount:o})};if(e.query&&r.showSuggestions){var c=y.Db.filter(function(t){return(0,m.vW)(e.query,t.matches)});if(c.length){var i,s=c.map(function(t,r){var o="Looking for ".concat(t.name," information? Here is a resource that might help.");t.hasOwnProperty("comments")&&""!==t.comments.trim()&&(o=t.comments);var c="teal";t.hasOwnProperty("color")&&""!==t.color.trim()&&(c=t.color);var i=R.uYZ;t.hasOwnProperty("icon")&&t.icon&&(i=t.icon);var s=n.createElement(n.Fragment,null,n.createElement("div",{className:"mt-1 mb-3 text-sm"},o),n.createElement("div",{className:"flex flex-wrap items-center gap-2"},n.createElement(a.zx,{href:t.link,onClick:function(){return _onClick(t.name,e.query)},target:"_blank",color:c,size:"xs",pill:!0},n.createElement(l.Rbo,{className:"-ml-0.5 mr-2 h-4 w-4"})," View more")));return n.createElement(a.bZ,{key:r,color:c,withBorderAccent:!0,icon:i,additionalContent:s,className:"shadow-md"},n.createElement("h3",{className:"text-lg font-medium leading-tight"},t.name))});switch(s.length){case 2:case 4:i=2;break;case 3:i=3;break;default:i=1}return n.createElement("div",{className:"gap-4 grid grid-cols-1 xl:grid-cols-".concat(i)},s)}}return null};Suggestion.propTypes={query:b().string.isRequired};var L=r(3854),components_Announce=function(){var e=c.D.announce;return e.enable?n.createElement(a.bZ,{color:e.color,icon:L.frK,className:"mb-4"},e.message):null};function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var ResultItem=function(e){var t,r,o=(0,u.A)().options,handleAuthorClick=function(t,r,n){(0,m.jW)("author",{category:"Author",label:"author",value:r.author,nonInteraction:!0}),(0,m._H)("author",{username:r.author,resultNumber:e.resultNumber,thread:y.TN[r.thread].name,link:"https://reddit.com".concat(n)})},handleResultClick=function(t,r,n){(0,m.jW)("result",{category:"Result",label:"thread",value:r.thread,nonInteraction:!0}),(0,m.jW)("result",{category:"Result",label:"author",value:r.author,nonInteraction:!0}),(0,m._H)("result",{author:r.author,resultNumber:e.resultNumber,thread:y.TN[r.thread].name,link:"https://reddit.com".concat(n)})},l="https://".concat(o.oldReddit?"old":"www",".reddit.com");t=e.permalink?e.permalink:"/comments/".concat(e.link_id.split("_")[1],"/_/").concat(e.id,"/");var c="".concat(l).concat(t,"?context=1");e.thread&&(r=n.createElement(a.Ct,{icon:_.FXG,color:y.TN[e.thread].color,size:"xs",className:"pr-1.5"},n.createElement("span",{className:"sr-only"},"Comment Thread:"),y.TN[e.thread].name));var s=(0,v.default)(new Date(1e3*e.created_utc),"M/d/yy h:mm aaa"),d=n.createElement(n.Fragment,null,n.createElement("span",{className:"inline md:hidden"},(0,E.Z)(new Date(1e3*e.created_utc),{addSuffix:!1})),n.createElement("span",{className:"hidden md:inline"},(0,E.Z)(new Date(1e3*e.created_utc),{addSuffix:!0})));o.showDate&&(d=s);var h=n.createElement(a.Ct,{icon:i.cxc,color:"success",size:"xs",className:"pr-1.5"},n.createElement("span",{className:"sr-only"},"Subreddit:")," ",e.subreddit),p=n.createElement(a.Ct,{icon:_.U9o,color:"warning",size:"xs",className:"pr-1.5",title:s},n.createElement("span",{className:"sr-only"},"Comment Posted:")," ",d),f=n.createElement(a.qE,{size:"xs",img:"https://www.redditstatic.com/avatars/defaults/v2/avatar_default_".concat(Math.floor(8*Math.random()),".png")});return n.createElement(a.Zb,null,n.createElement("div",{className:"flex flex-wrap items-center justify-between -mx-2 md:mx-0"},n.createElement("div",{className:"flex flex-wrap items-center gap-3"},f,n.createElement("a",{href:"".concat(l,"/user/").concat(e.author),onClick:function(r){return handleAuthorClick(r,e,t)},className:"font-semibold text-base md:text-lg ".concat(y.WI),target:"_blank"},n.createElement("span",{className:"sr-only"},"Comment Author:")," ",e.author)),r),n.createElement("div",{className:"-mx-2 md:mx-0"},n.createElement("a",{href:c,onClick:function(r){return handleResultClick(r,e,t)},className:"block text-sm leading-snug reddit-comment text-ellipsis overflow-hidden",target:"_blank"},n.createElement(w.U,{disallowedElements:["a"],remarkPlugins:[x.Z],unwrapDisallowed:!0},e.body.replace(y.vI,"\n\n>")))),n.createElement("div",{className:"flex flex-wrap justify-".concat(h?"between":"end"," items-center -mx-2 md:mx-0")},h,p))};ResultItem.propTypes={author:b().string.isRequired,body:b().string.isRequired,created_utc:b().number.isRequired,link_id:b().string,id:b().string,permalink:b().string,thread:b().string,subreddit:b().string,resultNumber:b().number};var components_Results=function(){var e,t=(0,u.A)(),r=t.comments,o=t.allData,l=t.filteredCount,i=t.totalCount,s=t.searching,m=t.options,d=t.searched,h=t.error,p=t.query;return h?n.createElement(components_Error,null):s?n.createElement("div",{className:"p-8 w-full"},n.createElement("div",{className:"flex flex-col text-center"},n.createElement(a.$j,{"aria-label":"Searching...",size:"xl"}))):d?(0===o.length&&0===r.length?e=n.createElement("div",{className:"p-8 w-full"},n.createElement(a.Zb,null,n.createElement("div",{className:"font-semibold text-lg text-center"},"No Results Found"))):0!==r.length&&(e=[r.map(function(e,t){return n.createElement(ResultItem,_extends({key:t},e,{resultNumber:t+1}))}),n.createElement("div",{key:9999,className:"font-semibold text-center my-4"},"End of Results")]),n.createElement(n.Fragment,null,n.createElement("div",{id:"results-top-bar",className:"flex justify-between items-center px-4 py-3 border-b border-t lg:border-t-0 border-gray-200 dark:border-gray-700 bg-blue-100 dark:bg-slate-800"},n.createElement("div",{id:"results-title","aria-live":"polite","aria-atomic":"true",className:"font-semibold text-lg text-gray-700 dark:text-gray-50"},"Showing ",l<i?"".concat(l," of "):"",i," result",1===i?"":"s"),n.createElement("div",{className:"flex flex-wrap items-center gap-3 md:gap-4"},n.createElement(components_Share,null),n.createElement(components_Reset,null))),n.createElement("main",{id:"results-list",role:"region","aria-label":"Search Results",className:"flex-1 overflow-y-scroll py-4 px-2 md:px-6 lg:px-10 xl:px-12 space-y-6"},n.createElement(Suggestion,{query:p}),n.createElement("div",{className:"flex flex-col gap-4"},e)),n.createElement("div",{id:"results-footer",className:"flex justify-between items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center text-xs bg-blue-100 dark:bg-slate-800"},n.createElement("div",null,"Maintained by ",n.createElement("a",{href:"https://".concat(m.oldReddit?"old":"www",".reddit.com/user/").concat(c.D.author),target:"_blank",className:y.WI},c.D.author)),n.createElement("div",null,n.createElement("a",{href:"https://".concat(m.oldReddit?"old":"www",".reddit.com/message/compose/?to=").concat(c.D.author,"&subject=").concat(c.D.name.replace(/\s+/g,"+")),target:"_blank",className:y.WI},"PM with comments, suggestions, issues"))))):n.createElement("div",{className:"md:pt-6 px-4 md:px-6 lg:px-8 pb-6 w-full"},n.createElement(components_Announce,null),n.createElement(components_Help,null))};function Facets_arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function Facets_ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function Facets_objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Facets_ownKeys(Object(r),!0).forEach(function(t){var n;n=r[t],t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Facets_ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var components_Facets=function(){var e,t=(0,u.A)(),r=t.threadFilters,o=t.setThreadFilters,l=t.searching,c=t.allData;if(l)return n.createElement("div",{className:"mt-8 md:mt-0 lg:mt-8 md:w-1/2 lg:w-full md:pl-4 lg:pl-0"},n.createElement("div",{className:"hidden md:flex flex-col text-center "},n.createElement(a.$j,{"aria-label":"Searching...",size:"md"})));if(!r||Object.keys(r).length<=1||void 0===c)return null;var handleChange=function(e){r[e.target.name]=e.target.checked,o(Facets_objectSpread({},r)),(0,m.jW)("filter",{category:"Filter",label:e.target.checked?"Show":"Hide",value:e.target.name,nonInteraction:!0}),(0,m._H)("filter",{thread:y.TN[e.target.name].name,action:e.target.checked?"Show":"Hide"})},handleOnly=function(e){for(var t in r)r[t]=t===e;o(Facets_objectSpread({},r)),(0,m.jW)("filter",{category:"Filter",label:"Only",value:e,nonInteraction:!0}),(0,m._H)("filter",{thread:y.TN[e].name,action:"Only"})};Object.values(r).every(function(e){return e})||(e=n.createElement("button",{className:"text-sm ".concat(y.WI),onClick:function(){for(var e in r)r[e]=!0;o(Facets_objectSpread({},r)),(0,m.jW)("filter",{category:"Filter",label:"All",value:"All",nonInteraction:!0}),(0,m._H)("filter",{thread:"All",action:"All"})}},"Select All"));var i=Object.entries(r),s=i.map(function(e,t){var r,o=function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var o=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(r=a.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,n=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw n}}return o}}(e,2)||function(e,t){if(e){if("string"==typeof e)return Facets_arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Facets_arrayLikeToArray(e,t)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),l=o[0],c=o[1],s=l.replace(/\s/g,"-").toLowerCase();switch(t){case 0:r="rounded-t-lg border-b border-gray-200 dark:border-gray-600";break;case i.length-1:r="rounded-b-lg";break;default:r="border-b border-gray-200 dark:border-gray-600"}return n.createElement("li",{className:"flex items-center flex-wrap gap-4 facet py-2 px-4 w-full ".concat(r),key:t},n.createElement(a.XZ,{id:s,name:l,checked:c,onChange:handleChange}),n.createElement(a.__,{htmlFor:s,className:"cursor-pointer"},y.TN.hasOwnProperty(l)?y.TN[l].name:"None"),n.createElement("button",{className:"text-xs ".concat(y.WI),"aria-label":"show only ".concat(l," thread results"),onClick:function(){return handleOnly(l)}},"only"))});return n.createElement("div",{role:"region","aria-label":"Search Result Filters",className:"mt-8 md:mt-0 lg:mt-8 md:w-1/2 lg:w-full md:pl-4 lg:pl-0"},n.createElement("div",{className:"mb-1 flex justify-between items-center"},n.createElement(a.__,{htmlFor:"threads-filter"},"Threads Filter"),e),n.createElement("ul",{id:"threads-filter",className:"text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},s))};function Home(){return(c.D.enableCustomEvents&&(0,n.useEffect)(function(){(0,m.vS)()},[]),c.D.disableSearch)?n.createElement("div",{className:"container mx-auto text-gray-700 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 dark:text-gray-100 p-4 md:p-8 lg:p-12"},n.createElement("div",{className:""},n.createElement(a.bZ,{color:"warning",icon:o.SZZ,additionalContent:n.createElement(n.Fragment,null,n.createElement("div",{className:"mb-4 text-sm"},n.createElement("p",null,'Due to Pushshift being cut off from the Reddit API, they have shut off their own API. The only communication at this point from Pushshift is "Check back in the next few weeks for updates."'),n.createElement("p",{className:"mt-2"},"So until further notice, Churning Search is unavailable. Once Pushshift determines/announces their path forward, it will be decided how Churning Search will proceed. All announcements regarding Churning Search will be posted in the Daily Discussion thread and here."),n.createElement("p",{className:"mt-2"},n.createElement("strong",{className:"font-medium"},"Search Help:")," ",n.createElement("a",{className:"underline underline-offset-3",href:"https://www.google.com/search?q=site%3Areddit.com%2Fr%2Fchurning+intitle%3A%22question+thread%22"},"Try a google search including the following:")),n.createElement("div",{className:"mt-4 text-center"},n.createElement("code",null,'site:reddit.com/r/churning intitle:"question thread"'))),n.createElement("div",{className:"flex flex-wrap items-center gap-2"},n.createElement(a.zx,{color:"warning",href:"https://reddit.com/r/churning/comments/13lpwno/daily_discussion_thread_may_19_2023/jkvb7fs/?context=3",target:"_blank",size:"xs",pill:!0},n.createElement(l.Rbo,{className:"-ml-0.5 mr-2 h-4 w-4"})," More info"))),rounded:!0},n.createElement("h4",{className:"text-lg md:text-xl lg:text-2xl font-medium font-mono tracking-tighter"},"Churning Search Unavailable")))):n.createElement("div",{className:"lg:h-screen lg:min-h-screen lg:h-screen-ios lg:min-h-screen-ios lg:flex text-gray-700 dark:text-gray-100"},n.createElement("div",{id:"search-form-panel",className:"md:flex lg:block lg:w-2/5 xl:w-1/3 2xl:w-1/4 p-4 overflow-y-scroll bg-blue-200 dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 shadow-lg"},n.createElement("div",{className:"md:w-1/2 lg:w-full md:pr-4 lg:pr-0"},n.createElement("div",{className:"flex items-center justify-between"},n.createElement("h1",{className:"text-2xl text-gray-700 dark:text-gray-100 font-mono tracking-tighter"},c.D.name),n.createElement(components_Options,null)),n.createElement(components_SearchForm,null)),n.createElement(components_Facets,null)),n.createElement("div",{id:"results-panel",className:"mt-8 lg:mt-0 flex flex-1 flex-col bg-white dark:bg-slate-900 overflow-y-scroll"},n.createElement(components_Results,null)))}},5557:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(696)}])},7499:function(e){e.exports={notificationWrapper:"Share_notificationWrapper__kF_8m",iconWrapper:"Share_iconWrapper__YfKlP",contentWrapper:"Share_contentWrapper__qFQqs",closeIcon:"Share_closeIcon__p6fFV"}}},function(e){e.O(0,[907,228,260,609,827,874,679,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);
//# sourceMappingURL=index-5c06fe8cf335f1be.js.map