"use strict";(self.webpackChunkSISAPPRAv2_0=self.webpackChunkSISAPPRAv2_0||[]).push([[696],{91683:function(e,n,r){r.d(n,{Z:function(){return o}});var t=r(72791);function o(e){var n=function(e){var n=(0,t.useRef)(e);return n.current=e,n}(e);(0,t.useEffect)((function(){return function(){return n.current()}}),[])}},90183:function(e,n,r){r.d(n,{Z:function(){return c}});var t=r(70885),o=r(78376),i=r(97357),a=r(72791),l=r(58865),s=function(e,n){var r;return i.Z?null==e?(n||(0,o.Z)()).body:("function"===typeof e&&(e=e()),e&&"current"in e&&(e=e.current),null!=(r=e)&&r.nodeType&&e||null):null};function c(e,n){var r=(0,l.Z)(),o=(0,a.useState)((function(){return s(e,null==r?void 0:r.document)})),i=(0,t.Z)(o,2),c=i[0],u=i[1];if(!c){var f=s(e);f&&u(f)}return(0,a.useEffect)((function(){n&&c&&n(c)}),[n,c]),(0,a.useEffect)((function(){var n=s(e);n!==c&&u(n)}),[e,c]),c}},6755:function(e,n,r){function t(e,n){return e.classList?!!n&&e.classList.contains(n):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+n+" ")}r.d(n,{Z:function(){return t}})},72709:function(e,n,r){var t,o=r(1413),i=r(45987),a=r(4942),l=r(60654),s=r.n(l),c=r(72791),u=r(32834),f=r(71380),p=r(67202),d=r(85007),v=r(80184),Z=["className","children","transitionClasses"],h=(t={},(0,a.Z)(t,u.d0,"show"),(0,a.Z)(t,u.cn,"show"),t),m=c.forwardRef((function(e,n){var r=e.className,t=e.children,a=e.transitionClasses,l=void 0===a?{}:a,u=(0,i.Z)(e,Z),m=(0,c.useCallback)((function(e,n){(0,p.Z)(e),null==u.onEnter||u.onEnter(e,n)}),[u]);return(0,v.jsx)(d.Z,(0,o.Z)((0,o.Z)({ref:n,addEndListener:f.Z},u),{},{onEnter:m,childRef:t.ref,children:function(e,n){return c.cloneElement(t,(0,o.Z)((0,o.Z)({},n),{},{className:s()("fade",r,t.props.className,h[e],l[e])}))}}))}));m.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},m.displayName="Fade",n.Z=m},47798:function(e,n,r){r.d(n,{Z:function(){return W}});var t=r(1413),o=r(45987),i=r(42982),a=r(70885),l=r(53189),s=r(72791),c=r(55746),u=r(91683),f=Math.pow(2,31)-1;function p(e,n,r){var t=r-Date.now();e.current=t<=f?setTimeout(n,t):setTimeout((function(){return p(e,n,r)}),f)}function d(){var e=(0,c.Z)(),n=(0,s.useRef)();return(0,u.Z)((function(){return clearTimeout(n.current)})),(0,s.useMemo)((function(){var r=function(){return clearTimeout(n.current)};return{set:function(t,o){void 0===o&&(o=0),e()&&(r(),o<=f?n.current=setTimeout(t,o):p(n,t,Date.now()+o))},clear:r}}),[])}r(42391);var v=r(80239),Z=r(73201),h=r(60654),m=r.n(h),w=r(54164),g=r(28633),y=r(88582),E=r(92899),b=r(78376),C=r(39007),P=r(76050),x=function(){};var N=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},t=r.disabled,o=r.clickTrigger,i=n||x;(0,P.Z)(e,i,{disabled:t,clickTrigger:o});var a=(0,C.Z)((function(e){27===e.keyCode&&i(e)}));(0,s.useEffect)((function(){if(!t&&null!=e){var n=(0,b.Z)((0,P.f)(e)),r=(n.defaultView||window).event,o=(0,E.Z)(n,"keyup",(function(e){e!==r?a(e):r=void 0}));return function(){o()}}}),[e,t,a])},k=r(90183),O=r(81012),R=r(80184),j=s.forwardRef((function(e,n){var r=e.flip,t=e.offset,o=e.placement,i=e.containerPadding,l=e.popperConfig,c=void 0===l?{}:l,u=e.transition,f=(0,g.Z)(),p=(0,a.Z)(f,2),d=p[0],v=p[1],h=(0,g.Z)(),m=(0,a.Z)(h,2),E=m[0],b=m[1],C=(0,Z.Z)(v,n),P=(0,k.Z)(e.container),x=(0,k.Z)(e.target),j=(0,s.useState)(!e.show),T=(0,a.Z)(j,2),S=T[0],_=T[1],F=(0,y.Z)(x,d,(0,O.ZP)({placement:o,enableEvents:!!e.show,containerPadding:i||5,flip:r,offset:t,arrowElement:E,popperConfig:c}));e.show?S&&_(!1):e.transition||S||_(!0);var A=e.show||u&&!S;if(N(d,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!A)return null;var U=e.children(Object.assign({},F.attributes.popper,{style:F.styles.popper,ref:C}),{popper:F,placement:o,show:!!e.show,arrowProps:Object.assign({},F.attributes.arrow,{style:F.styles.arrow,ref:b})});if(u){var M=e.onExit,B=e.onExiting,D=e.onEnter,H=e.onEntering,z=e.onEntered;U=(0,R.jsx)(u,{in:e.show,appear:!0,onExit:M,onExiting:B,onExited:function(){_(!0),e.onExited&&e.onExited.apply(e,arguments)},onEnter:D,onEntering:H,onEntered:z,children:U})}return P?w.createPortal(U,P):null}));j.displayName="Overlay";var T=j,S=r(49815),_=r(6755),F=r(10162),A=r(66543),U=(0,A.Z)("popover-header"),M=(0,A.Z)("popover-body"),B=r(57860),D=["bsPrefix","placement","className","style","children","body","arrowProps","popper","show"],H=s.forwardRef((function(e,n){var r=e.bsPrefix,i=e.placement,l=e.className,s=e.style,c=e.children,u=e.body,f=e.arrowProps,p=(e.popper,e.show,(0,o.Z)(e,D)),d=(0,F.vE)(r,"popover"),v=(0,F.SC)(),Z=(null==i?void 0:i.split("-"))||[],h=(0,a.Z)(Z,1)[0],w=(0,B.z)(h,v);return(0,R.jsxs)("div",(0,t.Z)((0,t.Z)({ref:n,role:"tooltip",style:s,"x-placement":h,className:m()(l,d,h&&"bs-popover-".concat(w))},p),{},{children:[(0,R.jsx)("div",(0,t.Z)({className:"popover-arrow"},f)),u?(0,R.jsx)(M,{children:c}):c]}))}));H.defaultProps={placement:"right"};var z=Object.assign(H,{Header:U,Body:M,POPPER_OFFSET:[0,8]});var L=r(72709),I=r(37002),V=["children","transition","popperConfig"],$={transition:L.Z,rootClose:!1,show:!1,placement:"top"};var q=s.forwardRef((function(e,n){var r=e.children,i=e.transition,l=e.popperConfig,c=void 0===l?{}:l,u=(0,o.Z)(e,V),f=(0,s.useRef)({}),p=(0,g.Z)(),d=(0,a.Z)(p,2),v=d[0],h=d[1],w=function(e){var n=(0,s.useRef)(null),r=(0,F.vE)(void 0,"popover"),t=(0,s.useMemo)((function(){return{name:"offset",options:{offset:function(){return n.current&&(0,_.Z)(n.current,r)?e||z.POPPER_OFFSET:e||[0,0]}}}}),[e,r]);return[n,[t]]}(u.offset),y=(0,a.Z)(w,2),E=y[0],b=y[1],P=(0,Z.Z)(n,E),x=!0===i?L.Z:i||void 0,N=(0,C.Z)((function(e){h(e),null==c||null==c.onFirstUpdate||c.onFirstUpdate(e)}));return(0,S.Z)((function(){v&&(null==f.current.scheduleUpdate||f.current.scheduleUpdate())}),[v]),(0,R.jsx)(T,(0,t.Z)((0,t.Z)({},u),{},{ref:P,popperConfig:(0,t.Z)((0,t.Z)({},c),{},{modifiers:b.concat(c.modifiers||[]),onFirstUpdate:N}),transition:x,children:function(e,n){var o,a,l=n.arrowProps,c=n.popper,u=n.show;!function(e,n){var r=e.ref,t=n.ref;e.ref=r.__wrapped||(r.__wrapped=function(e){return r((0,I.Z)(e))}),n.ref=t.__wrapped||(t.__wrapped=function(e){return t((0,I.Z)(e))})}(e,l);var p=null==c?void 0:c.placement,d=Object.assign(f.current,{state:null==c?void 0:c.state,scheduleUpdate:null==c?void 0:c.update,placement:p,outOfBoundaries:(null==c||null==(o=c.state)||null==(a=o.modifiersData.hide)?void 0:a.isReferenceHidden)||!1});return"function"===typeof r?r((0,t.Z)((0,t.Z)((0,t.Z)({},e),{},{placement:p,show:u},!i&&u&&{className:"show"}),{},{popper:d,arrowProps:l})):s.cloneElement(r,(0,t.Z)((0,t.Z)({},e),{},{placement:p,arrowProps:l,popper:d,className:m()(r.props.className,!i&&u&&"show"),style:(0,t.Z)((0,t.Z)({},r.props.style),e.style)}))}}))}));q.displayName="Overlay",q.defaultProps=$;var G=q,J=["trigger","overlay","children","popperConfig","show","defaultShow","onToggle","delay","placement","flip"];function K(e,n,r){var t=(0,a.Z)(n,1)[0],o=t.currentTarget,s=t.relatedTarget||t.nativeEvent[r];s&&s===o||(0,l.Z)(o,s)||e.apply(void 0,(0,i.Z)(n))}function Q(e){var n=e.trigger,r=e.overlay,i=e.children,l=e.popperConfig,c=void 0===l?{}:l,u=e.show,f=e.defaultShow,p=void 0!==f&&f,h=e.onToggle,m=e.delay,w=e.placement,g=e.flip,y=void 0===g?w&&-1!==w.indexOf("auto"):g,E=(0,o.Z)(e,J),b=(0,s.useRef)(null),C=(0,Z.Z)(b,i.ref),P=d(),x=(0,s.useRef)(""),N=(0,v.$c)(u,p,h),k=(0,a.Z)(N,2),O=k[0],j=k[1],T=function(e){return e&&"object"===typeof e?e:{show:e,hide:e}}(m),S="function"!==typeof i?s.Children.only(i).props:{},_=S.onFocus,F=S.onBlur,A=S.onClick,U=(0,s.useCallback)((function(){P.clear(),x.current="show",T.show?P.set((function(){"show"===x.current&&j(!0)}),T.show):j(!0)}),[T.show,j,P]),M=(0,s.useCallback)((function(){P.clear(),x.current="hide",T.hide?P.set((function(){"hide"===x.current&&j(!1)}),T.hide):j(!1)}),[T.hide,j,P]),B=(0,s.useCallback)((function(){U(),null==_||_.apply(void 0,arguments)}),[U,_]),D=(0,s.useCallback)((function(){M(),null==F||F.apply(void 0,arguments)}),[M,F]),H=(0,s.useCallback)((function(){j(!O),null==A||A.apply(void 0,arguments)}),[A,j,O]),z=(0,s.useCallback)((function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];K(U,n,"fromElement")}),[U]),L=(0,s.useCallback)((function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];K(M,n,"toElement")}),[M]),V=null==n?[]:[].concat(n),$={ref:function(e){C((0,I.Z)(e))}};return-1!==V.indexOf("click")&&($.onClick=H),-1!==V.indexOf("focus")&&($.onFocus=B,$.onBlur=D),-1!==V.indexOf("hover")&&($.onMouseOver=z,$.onMouseOut=L),(0,R.jsxs)(R.Fragment,{children:["function"===typeof i?i($):(0,s.cloneElement)(i,$),(0,R.jsx)(G,(0,t.Z)((0,t.Z)({},E),{},{show:O,onHide:M,flip:y,placement:w,popperConfig:c,target:b.current,children:r}))]})}Q.defaultProps={defaultShow:!1,trigger:["hover","focus"]};var W=Q},12576:function(e,n,r){var t=r(1413),o=r(70885),i=r(45987),a=r(60654),l=r.n(a),s=r(72791),c=r(10162),u=r(57860),f=r(80184),p=["bsPrefix","placement","className","style","children","arrowProps","popper","show"],d=s.forwardRef((function(e,n){var r=e.bsPrefix,a=e.placement,s=e.className,d=e.style,v=e.children,Z=e.arrowProps,h=(e.popper,e.show,(0,i.Z)(e,p));r=(0,c.vE)(r,"tooltip");var m=(0,c.SC)(),w=(null==a?void 0:a.split("-"))||[],g=(0,o.Z)(w,1)[0],y=(0,u.z)(g,m);return(0,f.jsxs)("div",(0,t.Z)((0,t.Z)({ref:n,style:d,role:"tooltip","x-placement":g,className:l()(s,r,"bs-tooltip-".concat(y))},h),{},{children:[(0,f.jsx)("div",(0,t.Z)({className:"tooltip-arrow"},Z)),(0,f.jsx)("div",{className:"".concat(r,"-inner"),children:v})]}))}));d.defaultProps={placement:"right"},d.displayName="Tooltip",n.Z=d},57860:function(e,n,r){r.d(n,{z:function(){return l}});var t=r(43144),o=r(15671),i=r(60136),a=r(29388);r(72791).Component;function l(e,n){var r=e;return"left"===e?r=n?"end":"start":"right"===e&&(r=n?"start":"end"),r}}}]);
//# sourceMappingURL=696.5b1e0186.chunk.js.map