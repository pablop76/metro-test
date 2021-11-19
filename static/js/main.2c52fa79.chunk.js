(this["webpackJsonpquiz-metro"]=this["webpackJsonpquiz-metro"]||[]).push([[0],{15:function(e,t,s){},18:function(e,t,s){},19:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),a=s(9),r=s.n(a),l=(s(15),s(8)),i=s.n(l),o=s(10),d=s(6),j=s(2),x=s(0),u=function(e){return Object(x.jsx)("header",{className:"text-center",children:Object(x.jsx)("h2",{className:"text-3xl p-5 md:text-4xl md:p-10 text-center",children:"Test okresowy dla maszynist\xf3w metra"})})},m=function(e){var t=e.maxQuestions,s=e.handleChangeLimit;return Object(x.jsxs)("div",{className:"m-5",children:[Object(x.jsx)("label",{htmlFor:"counter",className:"text-yellow-400 text-xl",children:"Ustaw ilo\u015b\u0107 pyta\u0144 z puli:"}),Object(x.jsx)("input",{className:"block text-center rounded-3xl text-2xl text-black mt-3 m-auto",type:"number",id:"counter",value:t,onChange:s,min:"0",max:e.currentTest.length}),e.children]})},h=function(e){var t=e.answers,s=e.corectAnswer,n=e.nextQuestion;return Object(x.jsx)("div",{className:"danger fixed left-1/2 top-1/2 p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-90",style:{transform:"translate(-50%,-50%)"},children:Object(x.jsxs)("div",{className:"mt-3 text-center",children:[Object(x.jsx)("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white animateBounce",children:Object(x.jsx)("svg",{className:"h-8 w-8 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"})})}),Object(x.jsxs)("div",{className:"mt-2 px-7 py-3",children:[Object(x.jsxs)("p",{className:" text-white text-xl",children:["Odp. prawid\u0142owa nr. ",s+1]}),Object(x.jsx)("p",{className:" text-green-400 text-xl font-bold",children:t[s]})]}),Object(x.jsx)("div",{className:"items-center px-4 py-3",children:Object(x.jsx)("button",{onClick:n,id:"ok-btn",className:"px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300",children:"Nast\u0119pne"})})]})})},b=s(5),O=s.n(b),f=function(e){var t=e.nextQuestion;return Object(x.jsxs)("div",{className:"fixed left-1/2 top-1/2 p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-90 overflow-hidden",style:{transform:"translate(-50%,-50%)"},children:[Object(x.jsx)(O.a,{width:300,height:200}),Object(x.jsxs)("div",{className:"mt-3 text-center",children:[Object(x.jsx)("div",{className:"relative mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white animateBounce",children:Object(x.jsx)("svg",{className:"h-8 w-8 text-green-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"})})}),Object(x.jsx)("div",{className:"items-center px-4 py-3 my-5",children:Object(x.jsx)("button",{onClick:t,id:"ok-btn",className:"px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300",children:"Nast\u0119pne"})})]})]})},p=function(e){var t=e.correctAnswers,s=e.inCorrectAnswers,n=e.maxQuestions,c=e.colorSend;return Object(x.jsxs)("div",{className:"fixed left-1/2 top-1/2 p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80 overflow-hidden",style:{transform:"translate(-50%,-50%)"},children:[Object(x.jsxs)("div",{className:"mt-3 text-center",children:[Math.round(t/n*100)>=75?Object(x.jsx)(O.a,{width:"300"}):"",Object(x.jsx)("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white",children:Math.round(t/n*100)>=75?Object(x.jsx)("svg",{className:"h-8 w-8 text-green-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"})}):Object(x.jsx)("svg",{className:"h-8 w-8 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"})})}),Object(x.jsx)("h3",{className:"text-xl leading-6 font-medium text-white m-5",children:Math.round(t/n*100)>=75?"Zaliczone!!!":"Obla\u0142e\u015b :("}),Object(x.jsx)("div",{className:"mt-2 px-7 py-3",children:Object(x.jsxs)("div",{className:" text-white text-xl",children:[Object(x.jsxs)("div",{className:"flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5",children:[t+s," / ",n]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-3xl bg-white rounded-full max-w-xs mx-auto m-5",children:[Object(x.jsxs)("span",{style:{color:"green"},children:[t,":"]}),Object(x.jsx)("span",{style:{color:"red"},children:s})]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-4xl ".concat(c," text-white rounded-full max-w-xs mx-auto m-5"),children:[Math.round(t/n*100),"%"]})]})})]}),Object(x.jsx)("div",{className:"flex flex-col",children:e.children})]})},w=function(e){return Object(x.jsx)("button",{className:"rounded-full flex items-center justify-center bg-gray-700 text-white font-bold p-2 m-5",onClick:e.handleClickAudio,children:e.audio?Object(x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"})}):Object(x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z",clipRule:"evenodd"}),Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"})]})})},v=function(e){return Object(x.jsx)("button",{className:"rounded-full m-5 bg-gray-700 p-2 w-10 mx-auto",onClick:e.refreshPage,children:Object(x.jsxs)("svg",{className:"h-6 w-6 text-white",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:["  ",Object(x.jsx)("polyline",{points:"23 4 23 10 17 10"}),"  ",Object(x.jsx)("polyline",{points:"1 20 1 14 7 14"}),"  ",Object(x.jsx)("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]})})},g=function(e){var t,s,n,c,a=e.currentTest,r=e.currentQuestion,l=e.isDisabled,i=e.answerChange;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:"p-5 text-2xl text-center bg-yellow-500 text-gray-800 rounded-3xl max-w-xl mx-auto m-5 font-bold",children:[null===(t=a[r])||void 0===t?void 0:t.question,Object(x.jsx)("div",{className:"my-5",children:(null===(s=a[r])||void 0===s?void 0:s.image)?Object(x.jsx)("img",{src:"./".concat(null===(n=a[r])||void 0===n?void 0:n.image),alt:"",className:"mx-auto"}):""})]}),e.children,Object(x.jsx)("div",{className:"container max-w-md p-3 mx-auto",children:null===(c=a[r])||void 0===c?void 0:c.content.map((function(e,t){return Object(x.jsxs)("button",{className:"flex cursor-pointer m-5 answer items-center justify-left rounded-3xl bg-blue-800 mx-auto w-full",onClick:function(e){return i(t,e)},disabled:l,children:[Object(x.jsx)("div",{className:"rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white p-4",children:t+1}),Object(x.jsx)("div",{className:"py-2 px-4 text-white text-left",children:e})]},t)}))})]})},N=function(e){var t=e.handleTest,s=e.test,n=e.questionslimit;return Object(x.jsxs)("form",{className:"mt-4",children:[Object(x.jsx)("span",{className:"text-yellow-400 text-xl",children:"Wyb\xf3r zakresu pyta\u0144:"}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsxs)("label",{className:"inline-flex items-center",children:[Object(x.jsx)("input",{type:"radio",className:"form-radio",name:"choiceTest",value:"all",checked:"all"===s,onChange:t}),Object(x.jsxs)("span",{className:"ml-2",children:["Wszystko (",n[0],")"]})]}),Object(x.jsxs)("label",{className:"inline-flex items-center ml-3",children:[Object(x.jsx)("input",{type:"radio",className:"form-radio",name:"choiceTest",value:"inspiro",checked:"inspiro"===s,onChange:t}),Object(x.jsxs)("span",{className:"ml-2",children:["Inspiro (",n[1],")"]})]}),Object(x.jsxs)("label",{className:"inline-flex items-center ml-3",children:[Object(x.jsx)("input",{type:"radio",className:"form-radio",name:"choiceTest",value:"sygnalizacja",checked:"sygnalizacja"===s,onChange:t}),Object(x.jsxs)("span",{className:"ml-2",children:["Sygnalizacja (",n[2],")"]})]})]})]})},y=function(){return Object(x.jsxs)("footer",{className:"text-center text-white mt-8 text-opacity-20",children:["\xa9 pablop76 2021 ",Object(x.jsx)("a",{href:"mailto:pawelpoltoraczyk@gmail.com",children:"e-mail"}),Object(x.jsx)("p",{className:"block text-xs",children:"Test mo\u017ce zawiera\u0107 b\u0142\u0119dne odpowiedzi."})]})},k=function(e){var t=e.wrongAnswers.map((function(e,t){return Object(x.jsxs)("li",{className:"m-3 text-left",children:[Object(x.jsx)("h3",{className:"text-xl",children:e.question}),e.image?Object(x.jsx)("img",{src:e.image,alt:"",className:"mx-auto"}):"",Object(x.jsx)("p",{className:"text-green-300 text-xl m-2",children:e.content[e.correct]})]},"wrongAnswer".concat(t))}));return Object(x.jsxs)("div",{className:"text-white w-88 m-auto bg-blue-800 text-center p-5 w-96",children:[t?Object(x.jsx)("h2",{className:"text-2xl text-red-600 p-4",children:"B\u0142\u0119dne odpowiedzi"}):"",Object(x.jsx)("ol",{children:t})]})},L=(s(18),s.p+"static/media/oklaski.a169772f.mp3"),C=s.p+"static/media/smiech.474fb074.mp3";var M=function(){var e=Object(n.useState)([]),t=Object(j.a)(e,2),s=t[0],c=t[1],a=Object(n.useState)(0),r=Object(j.a)(a,2),l=r[0],b=r[1],O=Object(n.useState)(0),M=Object(j.a)(O,2),S=M[0],A=M[1],z=Object(n.useState)(!1),B=Object(j.a)(z,2),T=B[0],W=B[1],Q=Object(n.useState)(!1),q=Object(j.a)(Q,2),H=q[0],F=q[1],P=Object(n.useState)(0),V=Object(j.a)(P,2),I=V[0],D=V[1],E=Object(n.useState)(0),J=Object(j.a)(E,2),R=J[0],U=J[1],Z=Object(n.useState)([]),G=Object(j.a)(Z,2),K=G[0],X=G[1],Y=Object(n.useState)(!1),$=Object(j.a)(Y,2),_=$[0],ee=$[1],te=Object(n.useState)(!1),se=Object(j.a)(te,2),ne=se[0],ce=se[1],ae=Object(n.useState)(!1),re=Object(j.a)(ae,2),le=re[0],ie=re[1],oe=Object(n.useState)("all"),de=Object(j.a)(oe,2),je=de[0],xe=de[1],ue=Object(n.useState)(0),me=Object(j.a)(ue,2),he=me[0],be=me[1],Oe=Object(n.useState)(0),fe=Object(j.a)(Oe,2),pe=fe[0],we=fe[1],ve=Object(n.useState)(0),ge=Object(j.a)(ve,2),Ne=ge[0],ye=ge[1],ke=Object(n.useState)([]),Le=Object(j.a)(ke,2),Ce=Le[0],Me=Le[1],Se=Object(n.useState)(!1),Ae=Object(j.a)(Se,2),ze=Ae[0],Be=Ae[1],Te=new Audio(L),We=new Audio(C),Qe=function(){var e,t;if(l+1===S)return ee(!1),ce(!1),void W(!0);b(l+1),null===(e=document.querySelector(".wrong"))||void 0===e||e.classList.remove("wrong"),null===(t=document.querySelector(".current"))||void 0===t||t.classList.remove("current"),ee(!1),ce(!1),ie(!1)},qe=function(){window.location.reload(!1)},He=Math.round(I/S*100)>=75?"bg-green-700":"bg-red-600";return Object(n.useEffect)((function(){var e=function(e,t,s){t=function(e,t){var s=Object(d.a)(e),n=[];if(s.length>=t){for(var c=0;c<t;c++){var a=Math.floor(Math.random()*s.length);n.push(s[a]),s.splice(a,1)}return n}alert("Nie ma tyle pyta\u0144 w puli")}(e[s],e[s].length),c(t),A(e[s].length),D(0),U(0)},t=function(){var t=Object(o.a)(i.a.mark((function t(s){var n,c,a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("./questions.json");case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,be(c.all.length),we(c.inspiro.length),ye(c.sygnalizacja.length),a=[],t.t0=s,t.next="inspiro"===t.t0?13:"sygnalizacja"===t.t0?15:17;break;case 13:case 15:return e(c,a,s),t.abrupt("break",18);case 17:e(c,a,s);case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();t(je)}),[je]),Object(x.jsxs)("div",{className:"bg-container container mx-auto min-h-screen pb-5 flex flex-col content-center justify-center",children:[Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-white flex-wrap bg-overlay-top flex-grow",children:[Object(x.jsx)("div",{className:"flex-1 text-center",children:Object(x.jsx)(m,{handleChangeLimit:function(e){var t=e.target,s=t.value,n=t.min,c=t.max;0!==(s=Math.max(Number(n),Math.min(Number(c),Number(s))))?A(s):A("")},maxQuestions:S,currentTest:s,children:Object(x.jsx)(N,{handleTest:function(e){xe(e.target.value)},test:je,questionslimit:[he,pe,Ne]})})}),Object(x.jsx)("div",{className:"flex-initial",children:Object(x.jsx)(u,{})}),Object(x.jsxs)("div",{className:"flex flex-1 m-auto justify-center",children:[Object(x.jsx)(w,{handleClickAudio:function(){F(!H)},audio:H}),Object(x.jsx)(v,{refreshPage:qe})]})]}),ze?Object(x.jsx)(k,{wrongAnswers:Ce}):Object(x.jsxs)(g,{currentTest:s,currentQuestion:l,answerChange:function(e,t){if(!(l>=S+1)){ie(!0);var n=t.currentTarget;e===s[l].correct?(H&&Te.play(),D(I+1),n.classList.add("current"),ce(!0)):(H&&We.play(),n.classList.add("wrong"),ee(!0),R+I<S&&(U(R+1),X([].concat(Object(d.a)(K),[s[l]]))),Me([].concat(Object(d.a)(Ce),[s[l]])))}},isDisabled:le,children:[_?Object(x.jsx)(h,{answers:s[l].content,corectAnswer:s[l].correct,nextQuestion:Qe}):"",ne?Object(x.jsx)(f,{nextQuestion:Qe}):"",T?Object(x.jsxs)(p,{correctAnswers:I,inCorrectAnswers:R,maxQuestions:S,colorSend:He,children:[Object(x.jsx)(v,{refreshPage:qe}),Object(x.jsx)("button",{className:"bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded",onClick:function(){Be(!0),W(!1)},children:"Poka\u017c moje b\u0142\u0119dy"})]}):"",";"]}),Object(x.jsxs)("div",{className:"flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5",children:["odpowiedzi ",I+R," / ",S]}),Object(x.jsxs)("div",{className:"flex items-center justify-center text-3xl bg-white rounded-full w-32 m-5 mx-auto",children:[Object(x.jsxs)("span",{style:{color:"green",display:"flex",alignItems:"center"},children:[Object(x.jsx)("svg",{className:"h-8 w-8 text-green-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"})}),I,":"]}),Object(x.jsxs)("span",{style:{color:"red",display:"flex",alignItems:"center"},children:[R,Object(x.jsx)("svg",{className:"h-8 w-8 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"})})]})]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-4xl ".concat(He," text-white rounded-full w-32 m-5 mx-auto"),children:[S?Math.round(I/S*100):"","%"]}),Object(x.jsx)(y,{})]})},S=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,20)).then((function(t){var s=t.getCLS,n=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;s(e),n(e),c(e),a(e),r(e)}))};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(M,{})}),document.getElementById("root")),S()}},[[19,1,2]]]);
//# sourceMappingURL=main.2c52fa79.chunk.js.map