(this.webpackJsonpaeroclub=this.webpackJsonpaeroclub||[]).push([[14],{1058:function(e,c,t){"use strict";t.r(c);var s=t(19),l=t(0),i=t(34),a=t(31),n=(t(286),t(14)),r=t(171),d=t.n(r),o=t(1);c.default=function(){var e,c,t=Object(i.i)().shareId,r=(Object(i.i)().projectId,Object(l.useState)(void 0)),j=Object(s.a)(r,2),b=j[0],m=j[1],u=Object(i.g)();return Object(l.useEffect)((function(){d()(document).ready((function(){d()("#collapsebtn").on("click",(function(){"Read More"===d()("#collapsebtn").text()?d()(this).html("Read less"):d()(this).text("Read More")}))})),fetch("".concat(n.b,"/api/share/project/").concat(t),{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("jwtToken"))}}).then((function(e){return 200!==e.status&&u.push("/404"),e.json()})).then((function(e){document.title="".concat(e.title," | ").concat(n.a),console.log(e),m(e)}))}),[]),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(a.default,{time:2}),Object(o.jsxs)("div",{className:"my-5",children:[Object(o.jsxs)("div",{className:"mb-4",children:[Object(o.jsx)("h4",{className:"my-3",style:{marginBottom:"0px",textAlign:"center"},children:null===b||void 0===b?void 0:b.title}),Object(o.jsx)("div",{className:"miniSep",style:{marginBottom:"40px",background:"rgb(204, 67, 67)"}})]}),Object(o.jsxs)("div",{className:"container",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("h3",{className:"my-3 subheaders",children:"Aim"}),Object(o.jsx)("p",{className:"px-5",children:null===b||void 0===b?void 0:b.objective})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h3",{className:"my-3 subheaders",children:"Components and Technologies Used"}),Object(o.jsx)("div",{className:"d-flex px-5 flex-wrap",children:null===b||void 0===b||null===(e=b.compTech)||void 0===e?void 0:e.map((function(e){return Object(o.jsx)("div",{className:"d-inline px-3 py-2 m-1",style:{border:"2px solid #dec3c3",borderRadius:"100px",background:"#fff7f7"},children:e})}))})]}),Object(o.jsxs)("div",{className:"my-5",children:[Object(o.jsx)("h3",{className:"mb-4 subheaders",children:"Overview"}),Object(o.jsx)("p",{className:"px-5 ql-editor",dangerouslySetInnerHTML:{__html:null===b||void 0===b?void 0:b.overview}})]}),Object(o.jsx)("div",{children:Object(o.jsxs)("div",{children:[Object(o.jsx)("h3",{className:"my-3 subheaders",children:"Project By: "}),Object(o.jsx)("ul",{className:"px-5",children:null===b||void 0===b||null===(c=b.members)||void 0===c?void 0:c.map((function(e){return e.accepted?Object(o.jsx)("li",{children:e.user.linkedin_url?Object(o.jsx)("a",{href:e.user.linkedin_url,children:e.user.name}):Object(o.jsx)("span",{children:e.user.name})}):Object(o.jsx)(o.Fragment,{})}))})]})}),(null===b||void 0===b?void 0:b.ytID)?Object(o.jsx)("div",{className:"d-block iframe-container",children:Object(o.jsx)("iframe",{width:"889px",height:"500",src:"https://www.youtube.com/embed/".concat(null===b||void 0===b?void 0:b.ytID),frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,className:"mx-auto d-block responsive-iframe"})}):Object(o.jsx)(o.Fragment,{}),Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"d-flex justify-content-center mt-5",children:(null===b||void 0===b?void 0:b.description)?Object(o.jsx)("button",{className:"btn btn-primary",type:"button","data-toggle":"collapse","data-target":"#collapse11","aria-expanded":"false","aria-controls":"collapse11",id:"collapsebtn",children:"Read More"}):Object(o.jsx)(o.Fragment,{})}),Object(o.jsx)("div",{class:"collapse collapsews",id:"collapse11",children:Object(o.jsxs)("div",{children:[Object(o.jsx)("h3",{className:"my-3 subheaders",children:"Description"}),Object(o.jsx)("p",{className:"px-3 ql-editor",dangerouslySetInnerHTML:{__html:null===b||void 0===b?void 0:b.description}})]})})]})]})]})]})}}}]);
//# sourceMappingURL=14.57ab1756.chunk.js.map