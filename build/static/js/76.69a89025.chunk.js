"use strict";(self.webpackChunkSISAPPRAv2_0=self.webpackChunkSISAPPRAv2_0||[]).push([[76],{6076:function(e,t,a){a.r(t),a.d(t,{default:function(){return he}});var s=a(16871),r=a(81732),n=a(70885),i=a(72791),l=a(24216),o=a(1413),c=a(91933),d=a(74569),u=a.n(d),m="https://preview.keenthemes.com/theme-api/api",p="".concat(m,"/user"),x="".concat(m,"/users/query"),h=function(e){return u().put(p,e).then((function(e){return e.data})).then((function(e){return e.data}))},f=function(e){return u().post("".concat(p,"/").concat(e.id),e).then((function(e){return e.data})).then((function(e){return e.data}))},v=a(80184),b=(0,i.createContext)(l.vv),j=function(e){var t=e.children,a=(0,i.useState)(l.vv.state),s=(0,n.Z)(a,2),r=s[0],c=s[1];return(0,v.jsx)(b.Provider,{value:{state:r,updateState:function(e){var t=(0,o.Z)((0,o.Z)({},r),e);c(t)}},children:t})},g=function(){return(0,i.useContext)(b)},N=(0,l.gl)(l.B2),k=function(e){var t=e.children,a=g().state,s=(0,i.useState)((0,l.gJ)(a)),r=(0,n.Z)(s,2),o=r[0],d=r[1],m=(0,i.useMemo)((function(){return(0,l.gJ)(a)}),[a]);(0,i.useEffect)((function(){o!==m&&d(m)}),[m]);var p=(0,c.useQuery)("".concat(l.vb.USERS_LIST,"-").concat(o),(function(){return function(e){return u().get("".concat(x,"?").concat(e)).then((function(e){return e.data}))}(o)}),{cacheTime:0,keepPreviousData:!0,refetchOnWindowFocus:!1}),h=p.isFetching,f=p.refetch,b=p.data;return(0,v.jsx)(N.Provider,{value:{isLoading:h,refetch:f,response:b,query:o},children:t})},y=function(){return(0,i.useContext)(N)},w=function(){var e=y().response;return e&&(null===e||void 0===e?void 0:e.data)||[]},_=function(){return y().isLoading},S=(0,i.createContext)(l.px),Z=function(e){var t=e.children,a=(0,i.useState)(l.px.selected),s=(0,n.Z)(a,2),r=s[0],o=s[1],c=(0,i.useState)(l.px.itemIdForUpdate),d=(0,n.Z)(c,2),u=d[0],m=d[1],p=y().isLoading,x=w(),h=(0,i.useMemo)((function(){return(0,l.Qx)(p,x)}),[p,x]),f=(0,i.useMemo)((function(){return(0,l.HX)(x,r)}),[x,r]);return(0,v.jsx)(S.Provider,{value:{selected:r,itemIdForUpdate:u,setItemIdForUpdate:m,disabled:h,isAllSelected:f,onSelect:function(e){(0,l.G8)(e,r,o)},onSelectAll:function(){(0,l.ir)(f,o,x)},clearSelected:function(){o([])}},children:t})},P=function(){return(0,i.useContext)(S)},F=a(96492),A=function(){var e=g().updateState,t=y().isLoading,a=(0,i.useState)(),s=(0,n.Z)(a,2),r=s[0],c=s[1],d=(0,i.useState)(),u=(0,n.Z)(d,2),m=u[0],p=u[1];(0,i.useEffect)((function(){F.Mn.reinitialization()}),[]);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("button",{disabled:t,type:"button",className:"btn btn-light-primary me-3","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end",children:[(0,v.jsx)(l.D8,{path:"/media/icons/duotune/general/gen031.svg",className:"svg-icon-2"}),"Filter"]}),(0,v.jsxs)("div",{className:"menu menu-sub menu-sub-dropdown w-300px w-md-325px","data-kt-menu":"true",children:[(0,v.jsx)("div",{className:"px-7 py-5",children:(0,v.jsx)("div",{className:"fs-5 text-dark fw-bolder",children:"Filter Options"})}),(0,v.jsx)("div",{className:"separator border-gray-200"}),(0,v.jsxs)("div",{className:"px-7 py-5","data-kt-user-table-filter":"form",children:[(0,v.jsxs)("div",{className:"mb-10",children:[(0,v.jsx)("label",{className:"form-label fs-6 fw-bold",children:"Role:"}),(0,v.jsxs)("select",{className:"form-select form-select-solid fw-bolder","data-kt-select2":"true","data-placeholder":"Select option","data-allow-clear":"true","data-kt-user-table-filter":"role","data-hide-search":"true",onChange:function(e){return c(e.target.value)},value:r,children:[(0,v.jsx)("option",{value:""}),(0,v.jsx)("option",{value:"Administrator",children:"Administrator"}),(0,v.jsx)("option",{value:"Analyst",children:"Analyst"}),(0,v.jsx)("option",{value:"Developer",children:"Developer"}),(0,v.jsx)("option",{value:"Support",children:"Support"}),(0,v.jsx)("option",{value:"Trial",children:"Trial"})]})]}),(0,v.jsxs)("div",{className:"mb-10",children:[(0,v.jsx)("label",{className:"form-label fs-6 fw-bold",children:"Last login:"}),(0,v.jsxs)("select",{className:"form-select form-select-solid fw-bolder","data-kt-select2":"true","data-placeholder":"Select option","data-allow-clear":"true","data-kt-user-table-filter":"two-step","data-hide-search":"true",onChange:function(e){return p(e.target.value)},value:m,children:[(0,v.jsx)("option",{value:""}),(0,v.jsx)("option",{value:"Yesterday",children:"Yesterday"}),(0,v.jsx)("option",{value:"20 mins ago",children:"20 mins ago"}),(0,v.jsx)("option",{value:"5 hours ago",children:"5 hours ago"}),(0,v.jsx)("option",{value:"2 days ago",children:"2 days ago"})]})]}),(0,v.jsxs)("div",{className:"d-flex justify-content-end",children:[(0,v.jsx)("button",{type:"button",disabled:t,onClick:function(){e((0,o.Z)({filter:{role:r,last_login:m}},l.Xw))},className:"btn btn-light btn-active-light-primary fw-bold me-2 px-6","data-kt-menu-dismiss":"true","data-kt-user-table-filter":"reset",children:"Reset"}),(0,v.jsx)("button",{disabled:t,type:"button",onClick:function(){e((0,o.Z)({filter:void 0},l.Xw))},className:"btn btn-primary fw-bold px-6","data-kt-menu-dismiss":"true","data-kt-user-table-filter":"filter",children:"Apply"})]})]})]})]})},C=function(){var e=P().setItemIdForUpdate;return(0,v.jsxs)("div",{className:"d-flex justify-content-end","data-kt-user-table-toolbar":"base",children:[(0,v.jsx)(A,{}),(0,v.jsxs)("button",{type:"button",className:"btn btn-light-primary me-3",children:[(0,v.jsx)(l.D8,{path:"/media/icons/duotune/arrows/arr078.svg",className:"svg-icon-2"}),"Export"]}),(0,v.jsxs)("button",{type:"button",className:"btn btn-primary",onClick:function(){e(null)},children:[(0,v.jsx)(l.D8,{path:"/media/icons/duotune/arrows/arr075.svg",className:"svg-icon-2"}),"Add User"]})]})},I=a(15861),U=a(64687),E=a.n(U),M=function(){var e=P(),t=e.selected,a=e.clearSelected,s=(0,c.useQueryClient)(),r=y().query,n=(0,c.useMutation)((function(){return function(e){var t=e.map((function(e){return u().delete("".concat(p,"/").concat(e))}));return u().all(t).then((function(){}))}(t)}),{onSuccess:function(){s.invalidateQueries(["".concat(l.vb.USERS_LIST,"-").concat(r)]),a()}});return(0,v.jsxs)("div",{className:"d-flex justify-content-end align-items-center",children:[(0,v.jsxs)("div",{className:"fw-bolder me-5",children:[(0,v.jsx)("span",{className:"me-2",children:t.length})," Selected"]}),(0,v.jsx)("button",{type:"button",className:"btn btn-danger",onClick:(0,I.Z)(E().mark((function e(){return E().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.mutateAsync();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),children:"Delete Selected"})]})},T=function(){var e=g().updateState,t=(0,i.useState)(""),a=(0,n.Z)(t,2),s=a[0],r=a[1],c=(0,l.Nr)(s,150);return(0,i.useEffect)((function(){void 0!==c&&void 0!==s&&e((0,o.Z)({search:c},l.Xw))}),[c]),(0,v.jsx)("div",{className:"card-title",children:(0,v.jsxs)("div",{className:"d-flex align-items-center position-relative my-1",children:[(0,v.jsx)(l.D8,{path:"/media/icons/duotune/general/gen021.svg",className:"svg-icon-1 position-absolute ms-6"}),(0,v.jsx)("input",{type:"text","data-kt-user-table-filter":"search",className:"form-control form-control-solid w-250px ps-14",placeholder:"Search user",value:s,onChange:function(e){return r(e.target.value)}})]})})},D=function(){var e=P().selected;return(0,v.jsxs)("div",{className:"card-header border-0 pt-6",children:[(0,v.jsx)(T,{}),(0,v.jsx)("div",{className:"card-toolbar",children:e.length>0?(0,v.jsx)(M,{}):(0,v.jsx)(C,{})})]})},L=a(71358),H=function(e){var t=e.column;return(0,v.jsx)(v.Fragment,{children:t.Header&&"string"===typeof t.Header?(0,v.jsx)("th",(0,o.Z)((0,o.Z)({},t.getHeaderProps()),{},{children:t.render("Header")})):t.render("Header")})},R=a(28182),q=function(e){var t=e.row;return(0,v.jsx)("tr",(0,o.Z)((0,o.Z)({},t.getRowProps()),{},{children:t.cells.map((function(e){return(0,v.jsx)("td",(0,o.Z)((0,o.Z)({},e.getCellProps()),{},{className:(0,R.Z)({"text-end min-w-100px":"actions"===e.column.id}),children:e.render("Cell")}))}))}))},B=function(e){var t,a,s,r=e.user;return(0,v.jsxs)("div",{className:"d-flex align-items-center",children:[(0,v.jsx)("div",{className:"symbol symbol-circle symbol-50px overflow-hidden me-3",children:(0,v.jsx)("a",{href:"#",children:r.avatar?(0,v.jsx)("div",{className:"symbol-label",children:(0,v.jsx)("img",{src:(0,l.BY)("/media/".concat(r.avatar)),alt:r.name,className:"w-100"})}):(0,v.jsx)("div",{className:(0,R.Z)("symbol-label fs-3","bg-light-".concat(null===(t=r.initials)||void 0===t?void 0:t.state),"text-".concat(null===(a=r.initials)||void 0===a?void 0:a.state)),children:null===(s=r.initials)||void 0===s?void 0:s.label})})}),(0,v.jsxs)("div",{className:"d-flex flex-column",children:[(0,v.jsx)("a",{href:"#",className:"text-gray-800 text-hover-primary mb-1",children:r.name}),(0,v.jsx)("span",{children:r.email})]})]})},O=function(e){var t=e.last_login;return(0,v.jsx)("div",{className:"badge badge-light fw-bolder",children:t})},X=function(e){var t=e.two_steps;return(0,v.jsxs)(v.Fragment,{children:[" ",t&&(0,v.jsx)("div",{className:"badge badge-light-success fw-bolder",children:"Enabled"})]})},Q=function(e){var t=e.id,a=P().setItemIdForUpdate,s=y().query,r=(0,c.useQueryClient)();(0,i.useEffect)((function(){F.Mn.reinitialization()}),[]);var n=(0,c.useMutation)((function(){return e=t,u().delete("".concat(p,"/").concat(e)).then((function(){}));var e}),{onSuccess:function(){r.invalidateQueries(["".concat(l.vb.USERS_LIST,"-").concat(s)])}});return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("a",{href:"#",className:"btn btn-light btn-active-light-primary btn-sm","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end",children:["Actions",(0,v.jsx)(l.D8,{path:"/media/icons/duotune/arrows/arr072.svg",className:"svg-icon-5 m-0"})]}),(0,v.jsxs)("div",{className:"menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4","data-kt-menu":"true",children:[(0,v.jsx)("div",{className:"menu-item px-3",children:(0,v.jsx)("a",{className:"menu-link px-3",onClick:function(){a(t)},children:"Edit"})}),(0,v.jsx)("div",{className:"menu-item px-3",children:(0,v.jsx)("a",{className:"menu-link px-3","data-kt-users-table-filter":"delete_row",onClick:(0,I.Z)(E().mark((function e(){return E().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.mutateAsync();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),children:"Delete"})})]})]})},W=function(e){var t=e.id,a=P(),s=a.selected,r=a.onSelect,n=(0,i.useMemo)((function(){return s.includes(t)}),[t,s]);return(0,v.jsx)("div",{className:"form-check form-check-custom form-check-solid",children:(0,v.jsx)("input",{className:"form-check-input",type:"checkbox","data-kt-check":n,"data-kt-check-target":"#kt_table_users .form-check-input",checked:n,onChange:function(){return r(t)}})})},Y=function(e){var t=e.className,a=e.title,s=e.tableProps,r=s.column.id,n=g(),c=n.state,d=n.updateState,u=(0,i.useMemo)((function(){return c.sort&&c.sort===r}),[c,r]),m=(0,i.useMemo)((function(){return c.order}),[c]);return(0,v.jsx)("th",(0,o.Z)((0,o.Z)({},s.column.getHeaderProps()),{},{className:(0,R.Z)(t,u&&void 0!==m&&"table-sort-".concat(m)),style:{cursor:"pointer"},onClick:function(){if("actions"!==r&&"selection"!==r)if(u){if(u&&void 0!==m){if("asc"===m)return void d((0,o.Z)({sort:r,order:"desc"},l.Xw));d((0,o.Z)({sort:void 0,order:void 0},l.Xw))}}else d((0,o.Z)({sort:r,order:"asc"},l.Xw))},children:a}))},V=function(e){var t=e.tableProps,a=P(),s=a.isAllSelected,r=a.onSelectAll;return(0,v.jsx)("th",(0,o.Z)((0,o.Z)({},t.column.getHeaderProps()),{},{className:"w-10px pe-2",children:(0,v.jsx)("div",{className:"form-check form-check-sm form-check-custom form-check-solid me-3",children:(0,v.jsx)("input",{className:"form-check-input",type:"checkbox","data-kt-check":s,"data-kt-check-target":"#kt_table_users .form-check-input",checked:s,onChange:r})})}))},J=[{Header:function(e){return(0,v.jsx)(V,{tableProps:e})},id:"selection",Cell:function(e){var t=Object.assign({},e);return(0,v.jsx)(W,{id:t.data[t.row.index].id})}},{Header:function(e){return(0,v.jsx)(Y,{tableProps:e,title:"Name",className:"min-w-125px"})},id:"name",Cell:function(e){var t=Object.assign({},e);return(0,v.jsx)(B,{user:t.data[t.row.index]})}},{Header:function(e){return(0,v.jsx)(Y,{tableProps:e,title:"Role",className:"min-w-125px"})},accessor:"role"},{Header:function(e){return(0,v.jsx)(Y,{tableProps:e,title:"Last login",className:"min-w-125px"})},id:"last_login",Cell:function(e){var t=Object.assign({},e);return(0,v.jsx)(O,{last_login:t.data[t.row.index].last_login})}},{Header:function(e){return(0,v.jsx)(Y,{tableProps:e,title:"Two steps",className:"min-w-125px"})},id:"two_steps",Cell:function(e){var t=Object.assign({},e);return(0,v.jsx)(X,{two_steps:t.data[t.row.index].two_steps})}},{Header:function(e){return(0,v.jsx)(Y,{tableProps:e,title:"Joined day",className:"min-w-125px"})},accessor:"joined_day"},{Header:function(e){return(0,v.jsx)(Y,{tableProps:e,title:"Actions",className:"text-end min-w-100px"})},id:"actions",Cell:function(e){var t=Object.assign({},e);return(0,v.jsx)(Q,{id:t.data[t.row.index].id})}}],z=function(){return(0,v.jsx)("div",{style:(0,o.Z)((0,o.Z)({},{borderRadius:"0.475rem",boxShadow:"0 0 50px 0 rgb(82 63 105 / 15%)",backgroundColor:"#fff",color:"#7e8299",fontWeight:"500",margin:"0",width:"auto",padding:"1rem 2rem",top:"calc(50% - 2rem)",left:"calc(50% - 4rem)"}),{},{position:"absolute",textAlign:"center"}),children:"Processing..."})},G=function(e){return"&laquo; Previous"===e?"Previous":"Next &raquo;"===e?"Next":e},K=function(){var e,t=function(){var e=(0,o.Z)({links:[]},l.Xw),t=y().response;return t&&t.payload&&t.payload.pagination?t.payload.pagination:e}(),a=_(),s=g().updateState;return(0,v.jsxs)("div",{className:"row",children:[(0,v.jsx)("div",{className:"col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"}),(0,v.jsx)("div",{className:"col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end",children:(0,v.jsx)("div",{id:"kt_table_users_paginate",children:(0,v.jsx)("ul",{className:"pagination",children:null===(e=t.links)||void 0===e?void 0:e.map((function(e){return(0,o.Z)((0,o.Z)({},e),{},{label:G(e.label)})})).map((function(e){return(0,v.jsx)("li",{className:(0,R.Z)("page-item",{active:t.page===e.page,disabled:a,previous:"Previous"===e.label,next:"Next"===e.label}),children:(0,v.jsx)("a",{className:(0,R.Z)("page-link",{"page-text":"Previous"===e.label||"Next"===e.label,"me-5":"Previous"===e.label}),onClick:function(){var r;(r=e.page)&&!a&&t.page!==r&&s({page:r,items_per_page:t.items_per_page||10})},style:{cursor:"pointer"},children:G(e.label)})},e.label)}))})})})]})},$=function(){var e=w(),t=_(),a=(0,i.useMemo)((function(){return e}),[e]),s=(0,i.useMemo)((function(){return J}),[]),r=(0,L.useTable)({columns:s,data:a}),n=r.getTableProps,c=r.getTableBodyProps,d=r.headers,u=r.rows,m=r.prepareRow;return(0,v.jsxs)(l.mN,{className:"py-4",children:[(0,v.jsx)("div",{className:"table-responsive",children:(0,v.jsxs)("table",(0,o.Z)((0,o.Z)({id:"kt_table_users",className:"table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"},n()),{},{children:[(0,v.jsx)("thead",{children:(0,v.jsx)("tr",{className:"text-start text-muted fw-bolder fs-7 text-uppercase gs-0",children:d.map((function(e){return(0,v.jsx)(H,{column:e},e.id)}))})}),(0,v.jsx)("tbody",(0,o.Z)((0,o.Z)({className:"text-gray-600 fw-bold"},c()),{},{children:u.length>0?u.map((function(e,t){return m(e),(0,v.jsx)(q,{row:e},"row-".concat(t,"-").concat(e.id))})):(0,v.jsx)("tr",{children:(0,v.jsx)("td",{colSpan:7,children:(0,v.jsx)("div",{className:"d-flex text-center w-100 align-content-center justify-content-center",children:"No matching records found"})})})}))]}))}),(0,v.jsx)(K,{}),t&&(0,v.jsx)(z,{})]})},ee=function(){var e=P().setItemIdForUpdate;return(0,v.jsxs)("div",{className:"modal-header",children:[(0,v.jsx)("h2",{className:"fw-bolder",children:"Add User"}),(0,v.jsx)("div",{className:"btn btn-icon btn-sm btn-active-icon-primary","data-kt-users-modal-action":"close",onClick:function(){return e(void 0)},style:{cursor:"pointer"},children:(0,v.jsx)(l.D8,{path:"/media/icons/duotune/arrows/arr061.svg",className:"svg-icon-1"})})]})},te=a(76863),ae=a(26864),se="avatars/300-6.jpg",re="Art Director",ne="Administrator",ie="",le="",oe=te.Ry().shape({email:te.Z_().email("Wrong email format").min(3,"Minimum 3 symbols").max(50,"Maximum 50 symbols").required("Email is required"),name:te.Z_().min(3,"Minimum 3 symbols").max(50,"Maximum 50 symbols").required("Name is required")}),ce=function(e){var t=e.user,a=e.isUserLoading,s=P().setItemIdForUpdate,r=y().refetch,c=(0,i.useState)((0,o.Z)((0,o.Z)({},t),{},{avatar:t.avatar||se,role:t.role||ne,position:t.position||re,name:t.name||ie,email:t.email||le})),d=(0,n.Z)(c,1)[0],u=function(e){e&&r(),s(void 0)},m=(0,l.BY)("/media/svg/avatars/blank.svg"),p=(0,l.BY)("/media/".concat(d.avatar)),x=(0,ae.TA)({initialValues:d,validationSchema:oe,onSubmit:function(){var e=(0,I.Z)(E().mark((function e(t,a){var s;return E().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((s=a.setSubmitting)(!0),e.prev=2,!(0,l.UE)(t.id)){e.next=8;break}return e.next=6,f(t);case 6:e.next=10;break;case 8:return e.next=10,h(t);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),console.error(e.t0);case 15:return e.prev=15,s(!0),u(!0),e.finish(15);case 19:case"end":return e.stop()}}),e,null,[[2,12,15,19]])})));return function(t,a){return e.apply(this,arguments)}}()});return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("form",{id:"kt_modal_add_user_form",className:"form",onSubmit:x.handleSubmit,noValidate:!0,children:[(0,v.jsxs)("div",{className:"d-flex flex-column scroll-y me-n7 pe-7",id:"kt_modal_add_user_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_add_user_header","data-kt-scroll-wrappers":"#kt_modal_add_user_scroll","data-kt-scroll-offset":"300px",children:[(0,v.jsxs)("div",{className:"fv-row mb-7",children:[(0,v.jsx)("label",{className:"d-block fw-bold fs-6 mb-5",children:"Avatar"}),(0,v.jsx)("div",{className:"image-input image-input-outline","data-kt-image-input":"true",style:{backgroundImage:"url('".concat(m,"')")},children:(0,v.jsx)("div",{className:"image-input-wrapper w-125px h-125px",style:{backgroundImage:"url('".concat(p,"')")}})})]}),(0,v.jsxs)("div",{className:"fv-row mb-7",children:[(0,v.jsx)("label",{className:"required fw-bold fs-6 mb-2",children:"Full Name"}),(0,v.jsx)("input",(0,o.Z)((0,o.Z)({placeholder:"Full name"},x.getFieldProps("name")),{},{type:"text",name:"name",className:(0,R.Z)("form-control form-control-solid mb-3 mb-lg-0",{"is-invalid":x.touched.name&&x.errors.name},{"is-valid":x.touched.name&&!x.errors.name}),autoComplete:"off",disabled:x.isSubmitting||a})),x.touched.name&&x.errors.name&&(0,v.jsx)("div",{className:"fv-plugins-message-container",children:(0,v.jsx)("div",{className:"fv-help-block",children:(0,v.jsx)("span",{role:"alert",children:x.errors.name})})})]}),(0,v.jsxs)("div",{className:"fv-row mb-7",children:[(0,v.jsx)("label",{className:"required fw-bold fs-6 mb-2",children:"Email"}),(0,v.jsx)("input",(0,o.Z)((0,o.Z)({placeholder:"Email"},x.getFieldProps("email")),{},{className:(0,R.Z)("form-control form-control-solid mb-3 mb-lg-0",{"is-invalid":x.touched.email&&x.errors.email},{"is-valid":x.touched.email&&!x.errors.email}),type:"email",name:"email",autoComplete:"off",disabled:x.isSubmitting||a})),x.touched.email&&x.errors.email&&(0,v.jsx)("div",{className:"fv-plugins-message-container",children:(0,v.jsx)("span",{role:"alert",children:x.errors.email})})]}),(0,v.jsxs)("div",{className:"mb-7",children:[(0,v.jsx)("label",{className:"required fw-bold fs-6 mb-5",children:"Role"}),(0,v.jsx)("div",{className:"d-flex fv-row",children:(0,v.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,v.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},x.getFieldProps("role")),{},{name:"role",type:"radio",value:"Administrator",id:"kt_modal_update_role_option_0",checked:"Administrator"===x.values.role,disabled:x.isSubmitting||a})),(0,v.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_0",children:[(0,v.jsx)("div",{className:"fw-bolder text-gray-800",children:"Administrator"}),(0,v.jsx)("div",{className:"text-gray-600",children:"Best for business owners and company administrators"})]})]})}),(0,v.jsx)("div",{className:"separator separator-dashed my-5"}),(0,v.jsx)("div",{className:"d-flex fv-row",children:(0,v.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,v.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},x.getFieldProps("role")),{},{name:"role",type:"radio",value:"Developer",id:"kt_modal_update_role_option_1",checked:"Developer"===x.values.role,disabled:x.isSubmitting||a})),(0,v.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_1",children:[(0,v.jsx)("div",{className:"fw-bolder text-gray-800",children:"Developer"}),(0,v.jsx)("div",{className:"text-gray-600",children:"Best for developers or people primarily using the API"})]})]})}),(0,v.jsx)("div",{className:"separator separator-dashed my-5"}),(0,v.jsx)("div",{className:"d-flex fv-row",children:(0,v.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,v.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},x.getFieldProps("role")),{},{name:"role",type:"radio",value:"Analyst",id:"kt_modal_update_role_option_2",checked:"Analyst"===x.values.role,disabled:x.isSubmitting||a})),(0,v.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_2",children:[(0,v.jsx)("div",{className:"fw-bolder text-gray-800",children:"Analyst"}),(0,v.jsx)("div",{className:"text-gray-600",children:"Best for people who need full access to analytics data, but don't need to update business settings"})]})]})}),(0,v.jsx)("div",{className:"separator separator-dashed my-5"}),(0,v.jsx)("div",{className:"d-flex fv-row",children:(0,v.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,v.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},x.getFieldProps("role")),{},{name:"role",type:"radio",value:"Support",id:"kt_modal_update_role_option_3",checked:"Support"===x.values.role,disabled:x.isSubmitting||a})),(0,v.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_3",children:[(0,v.jsx)("div",{className:"fw-bolder text-gray-800",children:"Support"}),(0,v.jsx)("div",{className:"text-gray-600",children:"Best for employees who regularly refund payments and respond to disputes"})]})]})}),(0,v.jsx)("div",{className:"separator separator-dashed my-5"}),(0,v.jsx)("div",{className:"d-flex fv-row",children:(0,v.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,v.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},x.getFieldProps("role")),{},{name:"role",type:"radio",id:"kt_modal_update_role_option_4",value:"Trial",checked:"Trial"===x.values.role,disabled:x.isSubmitting||a})),(0,v.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_4",children:[(0,v.jsx)("div",{className:"fw-bolder text-gray-800",children:"Trial"}),(0,v.jsx)("div",{className:"text-gray-600",children:"Best for people who need to preview content data, but don't need to make any updates"})]})]})})]})]}),(0,v.jsxs)("div",{className:"text-center pt-15",children:[(0,v.jsx)("button",{type:"reset",onClick:function(){return u()},className:"btn btn-light me-3","data-kt-users-modal-action":"cancel",disabled:x.isSubmitting||a,children:"Discard"}),(0,v.jsxs)("button",{type:"submit",className:"btn btn-primary","data-kt-users-modal-action":"submit",disabled:a||x.isSubmitting||!x.isValid||!x.touched,children:[(0,v.jsx)("span",{className:"indicator-label",children:"Submit"}),(x.isSubmitting||a)&&(0,v.jsxs)("span",{className:"indicator-progress",children:["Please wait..."," ",(0,v.jsx)("span",{className:"spinner-border spinner-border-sm align-middle ms-2"})]})]})]})]}),(x.isSubmitting||a)&&(0,v.jsx)(z,{})]})},de=function(){var e=P(),t=e.itemIdForUpdate,a=e.setItemIdForUpdate,s=(0,l.UE)(t),r=(0,c.useQuery)("".concat(l.vb.USERS_LIST,"-user-").concat(t),(function(){return e=t,u().get("".concat(p,"/").concat(e)).then((function(e){return e.data})).then((function(e){return e.data}));var e}),{cacheTime:0,enabled:s,onError:function(e){a(void 0),console.error(e)}}),n=r.isLoading,i=r.data,o=r.error;return t?n||o||!i?null:(0,v.jsx)(ce,{isUserLoading:n,user:i}):(0,v.jsx)(ce,{isUserLoading:n,user:{id:void 0}})},ue=function(){return(0,i.useEffect)((function(){return document.body.classList.add("modal-open"),function(){document.body.classList.remove("modal-open")}}),[]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:"modal fade show d-block",id:"kt_modal_add_user",role:"dialog",tabIndex:-1,"aria-modal":"true",children:(0,v.jsx)("div",{className:"modal-dialog modal-dialog-centered mw-650px",children:(0,v.jsxs)("div",{className:"modal-content",children:[(0,v.jsx)(ee,{}),(0,v.jsx)("div",{className:"modal-body scroll-y mx-5 mx-xl-15 my-7",children:(0,v.jsx)(de,{})})]})})}),(0,v.jsx)("div",{className:"modal-backdrop fade show"})]})},me=function(){var e=P().itemIdForUpdate;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(l.O7,{children:[(0,v.jsx)(D,{}),(0,v.jsx)($,{})]}),void 0!==e&&(0,v.jsx)(ue,{})]})},pe=function(){return(0,v.jsx)(j,{children:(0,v.jsx)(k,{children:(0,v.jsx)(Z,{children:(0,v.jsx)(me,{})})})})},xe=[{title:"User Management",path:"/apps/user-management/users",isSeparator:!1,isActive:!1},{title:"",path:"",isSeparator:!0,isActive:!1}],he=function(){return(0,v.jsxs)(s.Z5,{children:[(0,v.jsx)(s.AW,{element:(0,v.jsx)(s.j3,{}),children:(0,v.jsx)(s.AW,{path:"users",element:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(r.V1,{breadcrumbs:xe,children:"Users list"}),(0,v.jsx)(pe,{})]})})}),(0,v.jsx)(s.AW,{index:!0,element:(0,v.jsx)(s.Fg,{to:"/apps/user-management/users"})})]})}}}]);
//# sourceMappingURL=76.69a89025.chunk.js.map