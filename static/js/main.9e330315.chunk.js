(this["webpackJsonpquiz-metro"]=this["webpackJsonpquiz-metro"]||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),r=n(7),i=n.n(r),a=(n(14),n(6)),o=n.n(a),l=n(8),u=n(9),d=n(2),x=n(0),j=function(e){return Object(x.jsx)("h2",{className:"text-3xl p-5 md:text-4xl md:p-10 text-center",children:"Test okresowy dla maszynist\xf3w metra"})},b=function(e){return Object(x.jsxs)("div",{className:"m-5",children:[Object(x.jsx)("label",{htmlFor:"counter",className:"text-xl",children:"Z ilu pyta\u0144 chcesz si\u0119 sprawdzi\u0107?"}),Object(x.jsx)("input",{className:"block text-center rounded-3xl text-2xl text-black mt-3 m-auto",type:"number",id:"counter",value:e.maxQuestions,onChange:e.handleChangeLimit,min:"0",max:e.currentTest.length})]})},m=function(e){var t=e.answers,n=e.corectAnswer;return Object(x.jsx)("div",{class:"relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80",children:Object(x.jsxs)("div",{class:"mt-3 text-center",children:[Object(x.jsx)("div",{class:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500",children:Object(x.jsx)("svg",{class:"h-8 w-8 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})})}),Object(x.jsx)("h3",{class:"text-xl leading-6 font-medium text-gray-900 m-5",children:"B\u0142\u0105d!"}),Object(x.jsxs)("div",{class:"mt-2 px-7 py-3",children:[Object(x.jsxs)("p",{class:" text-white text-xl",children:["Prawid\u0142owa odpowied\u017a to ",n+1]}),Object(x.jsx)("p",{class:" text-green-400 text-xl font-bold",children:t[n]})]})]})})},h=function(e){return Object(x.jsx)("button",{className:"rounded-full flex items-center justify-center bg-gray-700 text-white font-bold p-2 m-5",onClick:e.handleClickAudio,children:e.audio?Object(x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"})}):Object(x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z",clipRule:"evenodd"}),Object(x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"})]})})},f=function(e){return Object(x.jsx)("button",{className:"rounded-full m-5 bg-gray-700 p-2",onClick:e.refreshPage,children:Object(x.jsxs)("svg",{className:"h-6 w-6 text-white",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:["  ",Object(x.jsx)("polyline",{points:"23 4 23 10 17 10"}),"  ",Object(x.jsx)("polyline",{points:"1 20 1 14 7 14"}),"  ",Object(x.jsx)("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]})})},p=function(e){var t,n,s,c,r=e.currentTest,i=e.currentQuestion,a=e.isDisabled;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:"p-8 text-2xl text-center bg-yellow-500 text-gray-800 rounded-full max-w-xl mx-auto m-5 font-bold",children:[null===(t=r[i])||void 0===t?void 0:t.question,(null===(n=r[i])||void 0===n?void 0:n.image)?Object(x.jsx)("img",{src:"./".concat(null===(s=r[i])||void 0===s?void 0:s.image),alt:"",className:"mx-auto"}):""]}),e.children,Object(x.jsx)("div",{className:"container max-w-md p-3 mx-auto",children:null===(c=r[i])||void 0===c?void 0:c.content.map((function(t,n){return Object(x.jsx)("button",{className:"flex cursor-pointer m-5",onClick:function(t){return e.answerChange(n,t)},disabled:a,children:Object(x.jsxs)("div",{className:"flex items-center justify-center rounded-full bg-blue-500 p-5",children:[Object(x.jsx)("div",{className:"rounded-full h-10 w-10 flex items-center justify-center bg-gray-700 text-white font-bold p-4",children:n+1}),Object(x.jsx)("div",{className:"py-2 px-4 text-white font-semibold text-left",children:t})]})},n)}))})]})},O=(n(17),n.p+"static/media/oklaski.a169772f.mp3"),w=n.p+"static/media/smiech.474fb074.mp3";var v=function(){var e=Object(s.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(s.useState)(0),i=Object(d.a)(r,2),a=i[0],v=i[1],g=Object(s.useState)(0),k=Object(d.a)(g,2),y=k[0],N=k[1],C=Object(s.useState)(!1),L=Object(d.a)(C,2),M=L[0],S=L[1],T=Object(s.useState)(0),z=Object(d.a)(T,2),q=z[0],A=z[1],B=Object(s.useState)(0),F=Object(d.a)(B,2),P=F[0],Q=F[1],W=Object(s.useState)(!1),D=Object(d.a)(W,2),E=D[0],H=D[1],I=Object(s.useState)(!1),J=Object(d.a)(I,2),R=J[0],Z=J[1],G=function(e,t){var n=Object(u.a)(e),s=[];if(n.length>=t){for(var c=0;c<t;c++){var r=Math.floor(Math.random()*n.length);s.push(n[r]),n.splice(r,1)}return s}alert("Nie ma tyle pyta\u0144 w puli")},K=new Audio(O),U=new Audio(w),V=Math.round(q/y*100)>=60?"current":"wrong";return Object(s.useEffect)((function(){var e=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./questions.json");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,s=G(n.questions,n.questions.length),c(s),N(n.questions.length);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(x.jsxs)("div",{className:"bg-container container mx-auto min-h-screen pb-5",children:[Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-white flex-wrap bg-overlay-top",children:[Object(x.jsx)(b,{handleChangeLimit:function(e){var t=e.target,n=t.value,s=t.min,c=t.max;0!==(n=Math.max(Number(s),Math.min(Number(c),Number(n))))?N(n):N("")},maxQuestions:y,currentTest:n}),Object(x.jsx)(j,{}),Object(x.jsx)(h,{handleClickAudio:function(){S(!M)},audio:M}),Object(x.jsx)(f,{refreshPage:function(){window.location.reload(!1)}})]}),Object(x.jsx)(p,{currentTest:n,currentQuestion:a,answerChange:function(e,t){if(!(a>=y)){Z(!0);var s=t.currentTarget.firstChild;e===n[a].correct?(M&&K.play(),A(q+1),s.classList.add("current")):(M&&U.play(),s.classList.add("wrong"),H(!0),P+q<y&&Q(P+1)),setTimeout((function(){a>=y-1||(v(a+1),s.classList.remove("current","wrong"),H(!1),Z(!1))}),5e3)}},isDisabled:R,children:E?Object(x.jsx)(m,{answers:n[a].content,corectAnswer:n[a].correct}):""}),Object(x.jsxs)("div",{className:"flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5",children:["odpowiedzi ",q+P," / ",y]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-3xl bg-white rounded-full max-w-xs mx-auto m-5",children:[Object(x.jsxs)("span",{style:{color:"green"},children:[q,":"]}),Object(x.jsx)("span",{style:{color:"red"},children:P})]}),Object(x.jsxs)("div",{className:"flex items-baseline justify-center text-4xl ".concat(V," text-white rounded-full max-w-xs mx-auto m-5"),children:[y?Math.round(q/y*100):"","%"]})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),s(e),c(e),r(e),i(e)}))};i.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(v,{})}),document.getElementById("root")),g()}},[[18,1,2]]]);
//# sourceMappingURL=main.9e330315.chunk.js.map