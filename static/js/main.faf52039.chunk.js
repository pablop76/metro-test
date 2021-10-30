(this["webpackJsonpquiz-metro"]=this["webpackJsonpquiz-metro"]||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var s=n(1),r=n.n(s),c=n(7),i=n.n(c),a=(n(14),n(6)),o=n.n(a),l=n(8),d=n(9),u=n(2),x=n(0),j=function(e){return Object(x.jsx)("h2",{className:"text-3xl p-5 md:text-4xl md:p-10 text-center",children:"Test okresowy dla maszynist\xf3w metra"})},m=function(e){return Object(x.jsxs)("div",{className:"m-5",children:[Object(x.jsx)("label",{htmlFor:"counter",className:"text-xl",children:"Z ilu pyta\u0144 chcesz si\u0119 sprawdzi\u0107?"}),Object(x.jsx)("input",{className:"block text-center rounded-3xl text-2xl text-black mt-3 m-auto",type:"number",id:"counter",value:e.maxQuestions,onChange:e.handleChangeLimit,min:"0",max:e.currentTest.length})]})},b=function(e){var t=e.answers,n=e.corectAnswer,s=e.nextQuestion;return Object(x.jsx)("div",{className:"relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80",children:Object(x.jsxs)("div",{className:"mt-3 text-center",children:[Object(x.jsx)("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500",children:Object(x.jsx)("svg",{className:"h-8 w-8 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})}),Object(x.jsx)("h3",{className:"text-xl leading-6 font-medium text-gray-900 m-5",children:"B\u0142\u0105d!"}),Object(x.jsxs)("div",{className:"mt-2 px-7 py-3",children:[Object(x.jsxs)("p",{className:" text-white text-xl",children:["Prawid\u0142owa odpowied\u017a to ",n+1]}),Object(x.jsx)("p",{className:" text-green-400 text-xl font-bold",children:t[n]})]}),Object(x.jsx)("div",{className:"items-center px-4 py-3",children:Object(x.jsx)("button",{onClick:s,id:"ok-btn",className:"px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300",children:"Nast\u0119pne"})})]})})},h=function(e){var t=e.nextQuestion;return Object(x.jsx)("div",{className:"relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80",children:Object(x.jsxs)("div",{className:"mt-3 text-center",children:[Object(x.jsx)("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white",children:Object(x.jsxs)("svg",{className:"h-8 w-8 text-green-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:["  ",Object(x.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),"  ",Object(x.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),Object(x.jsx)("h3",{className:"text-xl leading-6 font-medium text-white m-5",children:"OK"}),Object(x.jsx)("div",{className:"mt-2 px-7 py-3",children:Object(x.jsx)("p",{className:" text-white text-xl",children:"Prawid\u0142owa odpowied\u017a."})}),Object(x.jsx)("div",{className:"items-center px-4 py-3",children:Object(x.jsx)("button",{onClick:t,id:"ok-btn",className:"px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300",children:"Nast\u0119pne"})})]})})},f=function(e){var t=e.correctAnswers,n=e.inCorrectAnswers,s=e.maxQuestions,r=e.colorSend;return Object(x.jsx)("div",{className:"relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80",children:Object(x.jsxs)("div",{className:"mt-3 text-center",children:[Object(x.jsx)("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white",children:Math.round(t/s*100)>=75?Object(x.jsx)("svg",{className:"h-8 w-8 text-green-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"})}):Object(x.jsx)("svg",{className:"h-8 w-8 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"})})}),Object(x.jsx)("h3",{className:"text-xl leading-6 font-medium text-white m-5",children:Math.round(t/s*100)>=75?"Zaliczone!!!":"Obla\u0142e\u015b :("}),Object(x.jsx)("div",{className:"mt-2 px-7 py-3",children:Object(x.jsxs)("div",{className:" text-white text-xl",children:[Object(x.jsxs)("div",{className:"flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5",children:["odpowiedzi ",t+n," / ",s]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-3xl bg-white rounded-full max-w-xs mx-auto m-5",children:[Object(x.jsxs)("span",{style:{color:"green"},children:[t,":"]}),Object(x.jsx)("span",{style:{color:"red"},children:n})]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-4xl ".concat(r," text-white rounded-full max-w-xs mx-auto m-5"),children:[Math.round(t/s*100),"%"]})]})})]})})},p=function(e){return Object(x.jsx)("button",{className:"rounded-full flex items-center justify-center bg-gray-700 text-white font-bold p-2 m-5",onClick:e.handleClickAudio,children:e.audio?Object(x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"})}):Object(x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z",clipRule:"evenodd"}),Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"})]})})},w=function(e){return Object(x.jsx)("button",{className:"rounded-full m-5 bg-gray-700 p-2",onClick:e.refreshPage,children:Object(x.jsxs)("svg",{className:"h-6 w-6 text-white",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:["  ",Object(x.jsx)("polyline",{points:"23 4 23 10 17 10"}),"  ",Object(x.jsx)("polyline",{points:"1 20 1 14 7 14"}),"  ",Object(x.jsx)("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]})})},O=function(e){var t,n,s,r,c=e.currentTest,i=e.currentQuestion,a=e.isDisabled,o=e.answerChange;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:"p-8 text-2xl text-center bg-yellow-500 text-gray-800 rounded-full max-w-xl mx-auto m-5 font-bold",children:[null===(t=c[i])||void 0===t?void 0:t.question,(null===(n=c[i])||void 0===n?void 0:n.image)?Object(x.jsx)("img",{src:"./".concat(null===(s=c[i])||void 0===s?void 0:s.image),alt:"",className:"mx-auto"}):""]}),e.children,Object(x.jsx)("div",{className:"container max-w-md p-3 mx-auto",children:null===(r=c[i])||void 0===r?void 0:r.content.map((function(e,t){return Object(x.jsxs)("button",{className:"flex cursor-pointer m-5 answer items-center justify-center rounded-full bg-blue-500",onClick:function(e){return o(t,e)},disabled:a,children:[Object(x.jsx)("div",{className:"rounded-full h-10 w-10 flex items-center justify-center bg-gray-700 text-white font-bold p-4",children:t+1}),Object(x.jsx)("div",{className:"py-2 px-4 text-white font-semibold text-left",children:e})]},t)}))})]})},v=(n(17),n.p+"static/media/oklaski.a169772f.mp3"),g=n.p+"static/media/smiech.474fb074.mp3";var N=function(){var e=Object(s.useState)([]),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(s.useState)(0),i=Object(u.a)(c,2),a=i[0],N=i[1],y=Object(s.useState)(0),k=Object(u.a)(y,2),L=k[0],C=k[1],M=Object(s.useState)(!1),S=Object(u.a)(M,2),A=S[0],z=S[1],B=Object(s.useState)(!1),Q=Object(u.a)(B,2),q=Q[0],T=Q[1],W=Object(s.useState)(0),F=Object(u.a)(W,2),P=F[0],H=F[1],D=Object(s.useState)(0),V=Object(u.a)(D,2),E=V[0],I=V[1],J=Object(s.useState)(!1),Z=Object(u.a)(J,2),K=Z[0],R=Z[1],G=Object(s.useState)(!1),U=Object(u.a)(G,2),X=U[0],Y=U[1],$=Object(s.useState)(!1),_=Object(u.a)($,2),ee=_[0],te=_[1],ne=function(e,t){var n=Object(d.a)(e),s=[];if(n.length>=t){for(var r=0;r<t;r++){var c=Math.floor(Math.random()*n.length);s.push(n[c]),n.splice(c,1)}return s}alert("Nie ma tyle pyta\u0144 w puli")},se=new Audio(v),re=new Audio(g),ce=function(){var e,t;if(a+1===L)return R(!1),Y(!1),void z(!0);N(a+1),null===(e=document.querySelector(".wrong"))||void 0===e||e.classList.remove("wrong"),null===(t=document.querySelector(".current"))||void 0===t||t.classList.remove("current"),R(!1),Y(!1),te(!1)},ie=Math.round(P/L*100)>=67?"bg-green-700":"bg-red-600";return Object(s.useEffect)((function(){var e=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./questions.json");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,s=ne(n.questions,n.questions.length),r(s),C(n.questions.length);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(x.jsxs)("div",{className:"bg-container container mx-auto min-h-screen pb-5",children:[Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-white flex-wrap bg-overlay-top",children:[Object(x.jsx)(m,{handleChangeLimit:function(e){var t=e.target,n=t.value,s=t.min,r=t.max;0!==(n=Math.max(Number(s),Math.min(Number(r),Number(n))))?C(n):C("")},maxQuestions:L,currentTest:n}),Object(x.jsx)(j,{}),Object(x.jsx)(p,{handleClickAudio:function(){T(!q)},audio:q}),Object(x.jsx)(w,{refreshPage:function(){window.location.reload(!1)}})]}),Object(x.jsxs)(O,{currentTest:n,currentQuestion:a,answerChange:function(e,t){if(!(a>=L+1)){te(!0);var s=t.currentTarget;e===n[a].correct?(q&&se.play(),H(P+1),s.classList.add("current"),Y(!0)):(q&&re.play(),s.classList.add("wrong"),R(!0),E+P<L&&I(E+1))}},isDisabled:ee,children:[K?Object(x.jsx)(b,{answers:n[a].content,corectAnswer:n[a].correct,nextQuestion:ce}):"",X?Object(x.jsx)(h,{nextQuestion:ce}):"",A?Object(x.jsx)(f,{correctAnswers:P,inCorrectAnswers:E,maxQuestions:L,colorSend:ie}):"",";"]}),Object(x.jsxs)("div",{className:"flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5",children:["odpowiedzi ",P+E," / ",L]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-3xl bg-white rounded-full max-w-xs mx-auto m-5",children:[Object(x.jsxs)("span",{style:{color:"green"},children:[P,":"]}),Object(x.jsx)("span",{style:{color:"red"},children:E})]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-4xl ".concat(ie," text-white rounded-full max-w-xs mx-auto m-5"),children:[L?Math.round(P/L*100):"","%"]})]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,s=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),s(e),r(e),c(e),i(e)}))};i.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(N,{})}),document.getElementById("root")),y()}},[[18,1,2]]]);
//# sourceMappingURL=main.faf52039.chunk.js.map