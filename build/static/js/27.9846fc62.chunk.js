"use strict";(self.webpackChunkSISAPPRAv2_0=self.webpackChunkSISAPPRAv2_0||[]).push([[27],{63027:function(e,a,s){s.d(a,{Z:function(){return le}});var i=s(1413),r=s(45987),l=s(71707),o=s.n(l),t=s(52007),n=s.n(t),c=s(72791),d=s(80184),f=["as","className","type","tooltip"],v={type:n().string,tooltip:n().bool,as:n().elementType},m=c.forwardRef((function(e,a){var s=e.as,l=void 0===s?"div":s,t=e.className,n=e.type,c=void 0===n?"valid":n,v=e.tooltip,m=void 0!==v&&v,u=(0,r.Z)(e,f);return(0,d.jsx)(l,(0,i.Z)((0,i.Z)({},u),{},{ref:a,className:o()(t,"".concat(c,"-").concat(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=v;var u=m,p=c.createContext({}),b=s(10162),x=["id","bsPrefix","className","type","isValid","isInvalid","as"],N=c.forwardRef((function(e,a){var s=e.id,l=e.bsPrefix,t=e.className,n=e.type,f=void 0===n?"checkbox":n,v=e.isValid,m=void 0!==v&&v,u=e.isInvalid,N=void 0!==u&&u,h=e.as,y=void 0===h?"input":h,Z=(0,r.Z)(e,x),P=(0,c.useContext)(p).controlId;return l=(0,b.vE)(l,"form-check-input"),(0,d.jsx)(y,(0,i.Z)((0,i.Z)({},Z),{},{ref:a,type:f,id:s||P,className:o()(t,l,m&&"is-valid",N&&"is-invalid")}))}));N.displayName="FormCheckInput";var h=N,y=["bsPrefix","className","htmlFor"],Z=c.forwardRef((function(e,a){var s=e.bsPrefix,l=e.className,t=e.htmlFor,n=(0,r.Z)(e,y),f=(0,c.useContext)(p).controlId;return s=(0,b.vE)(s,"form-check-label"),(0,d.jsx)("label",(0,i.Z)((0,i.Z)({},n),{},{ref:a,htmlFor:t||f,className:o()(l,s)}))}));Z.displayName="FormCheckLabel";var P=Z;var I=["id","bsPrefix","bsSwitchPrefix","inline","reverse","disabled","isValid","isInvalid","feedbackTooltip","feedback","feedbackType","className","style","title","type","label","children","as"],j=c.forwardRef((function(e,a){var s=e.id,l=e.bsPrefix,t=e.bsSwitchPrefix,n=e.inline,f=void 0!==n&&n,v=e.reverse,m=void 0!==v&&v,x=e.disabled,N=void 0!==x&&x,y=e.isValid,Z=void 0!==y&&y,j=e.isInvalid,w=void 0!==j&&j,F=e.feedbackTooltip,k=void 0!==F&&F,C=e.feedback,R=e.feedbackType,g=e.className,S=e.style,E=e.title,z=void 0===E?"":E,T=e.type,V=void 0===T?"checkbox":T,L=e.label,O=e.children,A=e.as,G=void 0===A?"input":A,H=(0,r.Z)(e,I);l=(0,b.vE)(l,"form-check"),t=(0,b.vE)(t,"form-switch");var _=(0,c.useContext)(p).controlId,M=(0,c.useMemo)((function(){return{controlId:s||_}}),[_,s]),q=!O&&null!=L&&!1!==L||function(e,a){return c.Children.toArray(e).some((function(e){return c.isValidElement(e)&&e.type===a}))}(O,P),B=(0,d.jsx)(h,(0,i.Z)((0,i.Z)({},H),{},{type:"switch"===V?"checkbox":V,ref:a,isValid:Z,isInvalid:w,disabled:N,as:G}));return(0,d.jsx)(p.Provider,{value:M,children:(0,d.jsx)("div",{style:S,className:o()(g,q&&l,f&&"".concat(l,"-inline"),m&&"".concat(l,"-reverse"),"switch"===V&&t),children:O||(0,d.jsxs)(d.Fragment,{children:[B,q&&(0,d.jsx)(P,{title:z,children:L}),C&&(0,d.jsx)(u,{type:R,tooltip:k,children:C})]})})})}));j.displayName="FormCheck";var w=Object.assign(j,{Input:h,Label:P}),F=s(4942),k=(s(42391),["bsPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","as"]),C=c.forwardRef((function(e,a){var s,l,t=e.bsPrefix,n=e.type,f=e.size,v=e.htmlSize,m=e.id,u=e.className,x=e.isValid,N=void 0!==x&&x,h=e.isInvalid,y=void 0!==h&&h,Z=e.plaintext,P=e.readOnly,I=e.as,j=void 0===I?"input":I,w=(0,r.Z)(e,k),C=(0,c.useContext)(p).controlId;(t=(0,b.vE)(t,"form-control"),Z)?s=(0,F.Z)({},"".concat(t,"-plaintext"),!0):(l={},(0,F.Z)(l,t,!0),(0,F.Z)(l,"".concat(t,"-").concat(f),f),s=l);return(0,d.jsx)(j,(0,i.Z)((0,i.Z)({},w),{},{type:n,size:v,ref:a,readOnly:P,id:m||C,className:o()(u,s,N&&"is-valid",y&&"is-invalid","color"===n&&"".concat(t,"-color"))}))}));C.displayName="FormControl";var R=Object.assign(C,{Feedback:u}),g=(0,s(66543).Z)("form-floating"),S=["controlId","as"],E=c.forwardRef((function(e,a){var s=e.controlId,l=e.as,o=void 0===l?"div":l,t=(0,r.Z)(e,S),n=(0,c.useMemo)((function(){return{controlId:s}}),[s]);return(0,d.jsx)(p.Provider,{value:n,children:(0,d.jsx)(o,(0,i.Z)((0,i.Z)({},t),{},{ref:a}))})}));E.displayName="FormGroup";var z=E,T=s(29439),V=["as","bsPrefix","className"],L=["className"];var O=c.forwardRef((function(e,a){var s=function(e){var a=e.as,s=e.bsPrefix,l=e.className,t=(0,r.Z)(e,V);s=(0,b.vE)(s,"col");var n=(0,b.pi)(),c=(0,b.zG)(),d=[],f=[];return n.forEach((function(e){var a,i,r,l=t[e];delete t[e],"object"===typeof l&&null!=l?(a=l.span,i=l.offset,r=l.order):a=l;var o=e!==c?"-".concat(e):"";a&&d.push(!0===a?"".concat(s).concat(o):"".concat(s).concat(o,"-").concat(a)),null!=r&&f.push("order".concat(o,"-").concat(r)),null!=i&&f.push("offset".concat(o,"-").concat(i))})),[(0,i.Z)((0,i.Z)({},t),{},{className:o().apply(void 0,[l].concat(d,f))}),{as:a,bsPrefix:s,spans:d}]}(e),l=(0,T.Z)(s,2),t=l[0],n=t.className,c=(0,r.Z)(t,L),f=l[1],v=f.as,m=void 0===v?"div":v,u=f.bsPrefix,p=f.spans;return(0,d.jsx)(m,(0,i.Z)((0,i.Z)({},c),{},{ref:a,className:o()(n,!p.length&&u)}))}));O.displayName="Col";var A=O,G=["as","bsPrefix","column","visuallyHidden","className","htmlFor"],H=c.forwardRef((function(e,a){var s=e.as,l=void 0===s?"label":s,t=e.bsPrefix,n=e.column,f=e.visuallyHidden,v=e.className,m=e.htmlFor,u=(0,r.Z)(e,G),x=(0,c.useContext)(p).controlId;t=(0,b.vE)(t,"form-label");var N="col-form-label";"string"===typeof n&&(N="".concat(N," ").concat(N,"-").concat(n));var h=o()(v,t,f&&"visually-hidden",n&&N);return m=m||x,n?(0,d.jsx)(A,(0,i.Z)({ref:a,as:"label",className:h,htmlFor:m},u)):(0,d.jsx)(l,(0,i.Z)({ref:a,className:h,htmlFor:m},u))}));H.displayName="FormLabel",H.defaultProps={column:!1,visuallyHidden:!1};var _=H,M=["bsPrefix","className","id"],q=c.forwardRef((function(e,a){var s=e.bsPrefix,l=e.className,t=e.id,n=(0,r.Z)(e,M),f=(0,c.useContext)(p).controlId;return s=(0,b.vE)(s,"form-range"),(0,d.jsx)("input",(0,i.Z)((0,i.Z)({},n),{},{type:"range",ref:a,className:o()(l,s),id:t||f}))}));q.displayName="FormRange";var B=q,D=["bsPrefix","size","htmlSize","className","isValid","isInvalid","id"],J=c.forwardRef((function(e,a){var s=e.bsPrefix,l=e.size,t=e.htmlSize,n=e.className,f=e.isValid,v=void 0!==f&&f,m=e.isInvalid,u=void 0!==m&&m,x=e.id,N=(0,r.Z)(e,D),h=(0,c.useContext)(p).controlId;return s=(0,b.vE)(s,"form-select"),(0,d.jsx)("select",(0,i.Z)((0,i.Z)({},N),{},{size:t,ref:a,className:o()(n,s,l&&"".concat(s,"-").concat(l),v&&"is-valid",u&&"is-invalid"),id:x||h}))}));J.displayName="FormSelect";var K=J,Q=["bsPrefix","className","as","muted"],U=c.forwardRef((function(e,a){var s=e.bsPrefix,l=e.className,t=e.as,n=void 0===t?"small":t,c=e.muted,f=(0,r.Z)(e,Q);return s=(0,b.vE)(s,"form-text"),(0,d.jsx)(n,(0,i.Z)((0,i.Z)({},f),{},{ref:a,className:o()(l,s,c&&"text-muted")}))}));U.displayName="FormText";var W=U,X=c.forwardRef((function(e,a){return(0,d.jsx)(w,(0,i.Z)((0,i.Z)({},e),{},{ref:a,type:"switch"}))}));X.displayName="Switch";var Y=Object.assign(X,{Input:w.Input,Label:w.Label}),$=["bsPrefix","className","children","controlId","label"],ee=c.forwardRef((function(e,a){var s=e.bsPrefix,l=e.className,t=e.children,n=e.controlId,c=e.label,f=(0,r.Z)(e,$);return s=(0,b.vE)(s,"form-floating"),(0,d.jsxs)(z,(0,i.Z)((0,i.Z)({ref:a,className:o()(l,s),controlId:n},f),{},{children:[t,(0,d.jsx)("label",{htmlFor:n,children:c})]}))}));ee.displayName="FloatingLabel";var ae=ee,se=["className","validated","as"],ie={_ref:n().any,validated:n().bool,as:n().elementType},re=c.forwardRef((function(e,a){var s=e.className,l=e.validated,t=e.as,n=void 0===t?"form":t,c=(0,r.Z)(e,se);return(0,d.jsx)(n,(0,i.Z)((0,i.Z)({},c),{},{ref:a,className:o()(s,l&&"was-validated")}))}));re.displayName="Form",re.propTypes=ie;var le=Object.assign(re,{Group:z,Control:R,Floating:g,Check:w,Switch:Y,Label:_,Text:W,Range:B,Select:K,FloatingLabel:ae})}}]);
//# sourceMappingURL=27.9846fc62.chunk.js.map