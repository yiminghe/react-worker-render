!function(){"use strict";var e={446:function(e,t,n){var o=n(189),a={};function r(e,t){a[e]=t}function i(e){return a[e]}var s=n(635),p=n.n(s);function u(){}var c,l={supportsMutation:!0,appendInitialChild:u,createInstance:u,createTextInstance:u,finalizeInitialChildren:u,getRootHostContext:u,getChildHostContext:u,now:function(){return Date.now()},getPublicInstance:u,prepareForCommit:u,prepareUpdate:u,resetAfterCommit:u,shouldSetTextContent:function(){return!0},appendChild:u,appendChildToContainer:u,commitTextUpdate:u,commitMount:u,commitUpdate:u,insertBefore:u,insertInContainerBefore:u,removeChild:u,removeChildFromContainer:u,resetTextContent:u,clearContainer:u},d=0;function h(){return c||(c=p()(l)),c}var v=function(e){var t=h().createContainer(++d,!1,!1),n={update:function(e){h().updateContainer(e,t,null,null)},unmount:function(){h().updateContainer(null,t,null)}};return n.update(e),n},m=function(){var e;return(e=h()).batchedUpdates.apply(e,arguments)},f=n(870),C=n(951),g=n(976),I=n(591),x=n(337),y=f.createContext({parent:null,app:null}),S=n(347);function k(e){var t;e.componentContext||(e.componentContext={parent:e,app:(null===(t=e.context)||void 0===t?void 0:t.app)||e});return e.componentContext}var b={classWithContext:function(e){e.contextType=y},updateComponentPath:function(e){var t=e.context.parent,n=t.componentChildIndexMap;n.has(e)?e.componentIndex=n.get(e):(e.componentIndex=++t.componentChildIndex,n.set(e,e.componentIndex),e.componentPath="")},getComponentPath:function(e){if(!e.componentPath){var t=e.context.parent;e.componentPath="".concat(b.getComponentPath(t),"-").concat(e.componentIndex)}return e.componentPath},renderWithComponentContext:function(e,t){return e.componentChildIndex=0,e.componentChildIndexMap.clear(),(0,S.jsx)(y.Provider,{value:k(e),children:t})}},M=b,w=n(228),Z=n(169),P={};function j(e){if(P[e])return P[e];var t=function(e){(0,I.Z)(n,e);var t=(0,x.Z)(n);function n(){return(0,C.Z)(this,n),t.apply(this,arguments)}return(0,g.Z)(n,[{key:"render",value:function(){return this.props.children}}]),n}(f.Component),n=t;return n.displayName=e,P[e]=n,n}Object.assign(P,{Div:j("div"),Link:j("link"),A:j("a")});var _=function(e){(0,I.Z)(n,e);var t=(0,x.Z)(n);function n(){var e;(0,C.Z)(this,n);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).onClick=function(){var t,n;null===(t=(n=e.props).onClick)||void 0===t||t.call(n)},e}return(0,g.Z)(n,[{key:"render",value:function(){return(0,S.jsx)("div",(0,o.Z)((0,o.Z)({},this.props),{},{onClick:this.onClick,children:this.props.children}))}}]),n}(f.Component);function O(e){if(N[e])return N[e];var t=function(t){(0,I.Z)(a,t);var n=(0,x.Z)(a);function a(){return(0,C.Z)(this,a),n.apply(this,arguments)}return(0,g.Z)(a,[{key:"render",value:function(){var t=e;return(0,S.jsx)(t,(0,o.Z)({},this.props))}}]),a}(f.Component),n=t;return n.displayName=e,N[e]=n,n}var N={Div:_};Object.assign(N,{A:O("a"),Link:O("link")});var D=function(e){(0,I.Z)(n,e);var t=(0,x.Z)(n);function n(e){var o;return(0,C.Z)(this,n),(o=t.call(this,e)).onChange=function(e){var t={value:e.target.value,seq:o.state.seq+1};o.setState(t),o.props.onChange(t)},o.state={value:e.value,seq:e.seq},o}return(0,g.Z)(n,[{key:"render",value:function(){return(0,S.jsx)("input",{value:this.state.value,onChange:this.onChange})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.seq===t.seq&&e.value!==t.value?(e.seq,t.seq,e.value,(0,o.Z)((0,o.Z)({},t),{},{value:e.value})):(e.seq,t.seq,{})}}]),n}(f.Component);D.defaultProps={seq:1};var H=r("input",{render:function(){return(0,S.jsx)(D,{value:this.state.value,seq:this.state.seq,onChange:this.getEventHandle("onChange")})}});function U(){}function T(e){for(var t={},n=0,o=Object.keys(e);n<o.length;n++){var a=o[n],r=e[a];"function"===typeof r?a.match(/^on[A-z]/)&&(t[a]=r.handleName+""):t[a]=r}return t}var q=n(2),F=n.n(q),W={};function E(e){if(W[e])return W[e];var t=i(e),n=function(n){(0,I.Z)(r,n);var a=(0,x.Z)(r);function r(n){var o;return(0,C.Z)(this,r),(o=a.call(this,n)).componentIndex=0,o.componentPath="",o.componentChildIndex=0,o.componentChildIndexMap=new Map,o.eventHandles={},o.componentSpec=t,o.componentName=e,o.publicInstance={},o.id="",o.shouldComponentUpdate=F().shouldComponentUpdate,o.getInstanceProps=function(){return o.props},o.callMethod=U,o.getEventHandle=function(e){var t=(0,Z.Z)(o).eventHandles,n=o.context.app;return t[e]||(t[e]=function(){for(var t=arguments.length,a=new Array(t),r=0;r<t;r++)a[r]=arguments[r];var i={componentId:o.id,method:e,args:a};n.postMessage(i)},t.handleName=e),t[e]},o.state={__self:(0,Z.Z)(o),__state:{}},o.publicInstance=Object.create(t),Object.defineProperty(o.publicInstance,"props",{get:o.getInstanceProps}),Object.defineProperty(o.publicInstance,"state",{get:o.getInstanceState}),o}return(0,g.Z)(r,[{key:"setStateState",value:function(e){this.setState((function(t){var n=t.__state;return{__state:(0,o.Z)((0,o.Z)({},n),e)}}))}},{key:"getInstanceState",value:function(){return this.state.__state}},{key:"getContext",value:function(){return this.context}},{key:"componentDidMount",value:function(){var e;null===(e=t.componentDidMount)||void 0===e||e.call(this.publicInstance)}},{key:"componentDidUpdate",value:function(e,n){var o,a=this.publicInstance;null===(o=t.componentDidUpdate)||void 0===o||o.call(a,e,n.__state)}},{key:"componentWillUnmount",value:function(){var e;null===(e=t.componentWillUnmount)||void 0===e||e.call(this.publicInstance),this.getContext().app.removeComponent(this)}},{key:"render",value:function(){var e=t.render.call({nativeComponents:N,props:this.props,state:this.getInstanceState(),getEventHandle:this.getEventHandle,getComponent:E});return M.renderWithComponentContext(this,e)}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=t.__self;M.updateComponentPath(n);var o=n.context.app;if(!n.id){var a=M.getComponentPath(n);if(n.id=o.newComponentsPathIdMap[a],!n.id)throw new Error("Can not find id from path: ".concat(a));return o.addComponent(n),{__state:o.newComponentsIdStateMap[n.id]||{}}}return{}}}]),r}(f.Component);n.contextType=y;var a=n;return a.displayName=e,W[e]=a,a}Object.assign(N,{Input:H||E("input")});var A=n(321),R=function(e){(0,I.Z)(n,e);var t=(0,x.Z)(n);function n(e){var o;return(0,C.Z)(this,n),(o=t.call(this,e)).componentIndex=0,o.componentPath="1",o.componentChildIndex=0,o.componentChildIndexMap=new Map,o.newComponentsPathIdMap={},o.componentNameDefaultPropsMap={},o.newComponentsIdStateMap={},o.pendingIdStateMap={},o.components=new Map,o.componentSpec=null,o.onmessage=function(e){var t=JSON.parse(e.data),n=t.newComponentsIdStateMap,a=t.newComponentsPathIdMap,r=t.pendingIdStateMap,i=t.newComponentNameDefaultPropsMap,s=(0,Z.Z)(o),p=s.components,u=s.componentNameDefaultPropsMap;Object.assign(u,i);for(var c=0,l=Object.keys(i);c<l.length;c++){var d=l[c];E(d).defaultProps=i[d]}o.newComponentsIdStateMap=n,o.newComponentsPathIdMap=a,A.unstable_batchedUpdates((function(){o.state.inited||o.setState({inited:!0});for(var e=0,t=Object.keys(r);e<t.length;e++){var n=t[e],a=r[n];p.get(n).setStateState(a)}}))},o.setStateState=U,o.props.worker.onmessage=o.onmessage,o.state={inited:!1},o}return(0,g.Z)(n,[{key:"postMessage",value:function(e){this.props.worker.postMessage(JSON.stringify(e))}},{key:"addComponent",value:function(e){this.components.set(e.id,e)}},{key:"removeComponent",value:function(e){this.components.delete(e.id)}},{key:"render",value:function(){if(this.state.inited){var e=E(this.props.entry);return M.renderWithComponentContext(this,(0,S.jsx)(e,{}))}return null}}]),n}(f.Component);M.classWithContext(R);var J=r("input",{getInitialState:function(){return{value:this.props.value,seq:1}},onChange:function(e){var t,n;this.setState(e,void 0,!1),null===(t=(n=this.props).onChange)||void 0===t||t.call(n,e.value)},componentDidUpdate:function(e,t){Number.isNaN(this.props.value)&&Number.isNaN(this.state.value)||this.props.value!==this.state.value&&this.setState((0,o.Z)((0,o.Z)({},this.state),{},{value:this.props.value}))},render:function(){return null}}),G={},L=1;function z(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(G[e])return G[e];var n=i(e),a=function(a){(0,I.Z)(i,a);var r=(0,x.Z)(i);function i(a){var s;if((0,C.Z)(this,i),(s=r.call(this,a)).id=void 0,s.componentIndex=0,s.componentPath="",s.componentChildIndex=0,s.componentChildIndexMap=new Map,s.eventHandles=void 0,s.componentSpec=n,s.publicInstance=void 0,s.componentName=e,s.setStateState=function(e,n){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t||(a=!0),s.setState((function(t){var n=t.__state,r={};return r="function"===typeof e?e(n):e,a&&s.getContext().app.setStateState((0,Z.Z)(s),r),{__state:(0,o.Z)((0,o.Z)({},n),r)}}),n)},s.getInstanceProps=function(){return s.props},s.getInstanceState=function(){return s.state.__state},s.getEventHandle=function(e){var t=(0,Z.Z)(s).eventHandles;if(t[e])return t[e];var n=s.publicInstance,o=function(){n[e].apply(n,arguments)};return o.handleName=e,t[e]=o,o},s.id="",s.publicInstance=Object.create(n),s.publicInstance.setState=s.setStateState,Object.defineProperty(s.publicInstance,"props",{get:s.getInstanceProps}),Object.defineProperty(s.publicInstance,"state",{get:s.getInstanceState}),s.eventHandles={},s.state={__self:(0,Z.Z)(s),__state:{}},n.getInitialState){var p=n.getInitialState.call(s.publicInstance);p&&(s.state.__state=p)}return s}return(0,g.Z)(i,[{key:"shouldComponentUpdate",value:function(e,t){return!n.shouldComponentUpdate||n.shouldComponentUpdate.call(this.publicInstance,e,t.__state,void 0)}},{key:"callMethod",value:function(e,t){var n=this.publicInstance;n[e].apply(n,(0,w.Z)(t))}},{key:"getContext",value:function(){return this.context}},{key:"componentDidMount",value:function(){var e;null===(e=n.componentDidMount)||void 0===e||e.call(this.publicInstance)}},{key:"componentDidUpdate",value:function(e,t){var o,a=this.publicInstance;null===(o=n.componentDidUpdate)||void 0===o||o.call(a,e,t.__state)}},{key:"componentWillUnmount",value:function(){var e;null===(e=n.componentWillUnmount)||void 0===e||e.call(this.publicInstance),this.getContext().app.removeComponent(this)}},{key:"render",value:function(){var e=n.render.call({nativeComponents:P,props:this.props,state:this.getInstanceState(),getEventHandle:this.getEventHandle,getComponent:z});return M.renderWithComponentContext(this,e)}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=t.__self;M.updateComponentPath(n);var a=n.context.app;if(n.id||(n.id=++L+"",a.addComponent(n)),n.componentSpec.getDerivedStateFromProps){var r=n.getInstanceState(),i=n.componentSpec.getDerivedStateFromProps(e,r);return{__state:(0,o.Z)((0,o.Z)({},r),i)}}return{}}}]),i}(f.Component);a.contextType=y,a.defaultProps=n.defaultProps;var r=a;return r.displayName=e,G[e]=r,r}Object.assign(P,{Input:J||z("input",!0)});var B=function(e){(0,I.Z)(n,e);var t=(0,x.Z)(n);function n(e){var o;return(0,C.Z)(this,n),(o=t.call(this,e)).componentIndex=0,o.componentPath="1",o.componentChildIndex=0,o.componentChildIndexMap=new Map,o.newComponentsPathIdMap={},o.newComponentsIdStateMap={},o.pendingIdStateMap={},o.newComponentIds=new Set,o.components=new Map,o.scheduled=!1,o.componentNameDefaultPropsMap={},o.onmessage=function(e){var t=JSON.parse(e.data),n=t.componentId,a=t.method,r=t.args,i=o.components.get(n);m((function(){i.callMethod(a,r)}))},o.props.worker.onmessage=o.onmessage,o}return(0,g.Z)(n,[{key:"postMessage",value:function(e){this.props.worker.postMessage(JSON.stringify(e))}},{key:"afterSendToRender",value:function(){this.pendingIdStateMap={},this.newComponentIds.clear(),this.newComponentsPathIdMap={},this.newComponentsIdStateMap={}}},{key:"scheduleSendToRender",value:function(){var e=this;this.scheduled||(this.scheduled=!0,Promise.resolve().then((function(){e.sendToRender(),e.afterSendToRender(),e.scheduled=!1})))}},{key:"componentDidMount",value:function(){this.scheduleSendToRender()}},{key:"sendToRender",value:function(){for(var e=this.components,t=this.pendingIdStateMap,n=this.newComponentsIdStateMap,o=this.newComponentsPathIdMap,a=this.componentNameDefaultPropsMap,r={},s=0,p=Object.keys(t);s<p.length;s++){var u=p[s];e.has(u)||delete t[u]}for(var c=0,l=Array.from(this.newComponentIds);c<l.length;c++){var d=l[c],h=e.get(d),v=h.componentName;n[d]=h.getInstanceState(),o[M.getComponentPath(h)]=d,a[v]||(a[v]=i(v).defaultProps||{},r[v]=a[v])}this.postMessage({newComponentsIdStateMap:T(n),newComponentsPathIdMap:o,pendingIdStateMap:T(t),newComponentNameDefaultPropsMap:T(r)})}},{key:"setStateState",value:function(e,t){if(!this.newComponentIds.has(e.id)){var n=this.pendingIdStateMap,o=n[e.id]||{};Object.assign(o,t),n[e.id]=o,this.scheduleSendToRender()}}},{key:"addComponent",value:function(e){this.components.has(e.id)||this.newComponentIds.add(e.id),this.components.set(e.id,e)}},{key:"removeComponent",value:function(e){this.newComponentIds.delete(e.id),this.components.delete(e.id)}},{key:"render",value:function(){var e=z(this.props.entry);return M.renderWithComponentContext(this,(0,S.jsx)(e,{}))}}]),n}(f.Component);M.classWithContext(B);var K=B;var Q={getInitialState:function(){return{count:1}},onChange:function(e){var t=parseInt(e);"number"!==typeof t||isNaN(t)||this.setState({count:t})},onClick:function(){this.setState({count:this.state.count+1})}};var V={defaultProps:{defaultId:1},getInitialState:function(){return{title:"react-worker-render",now:this.props.defaultId}},shouldComponentUpdate:function(e,t){return t.now!==this.state.now},refresh:function(){this.setState({now:Date.now()})}};r("app",(0,o.Z)((0,o.Z)({},Q),{},{render:function(){var e=this.nativeComponents,t=e.Div,n=e.Input,o=e.Link,a=e.A,r=this.getComponent("title");return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(r,{}),(0,S.jsxs)(t,{children:["set(number):"," ",(0,S.jsx)(n,{onChange:this.getEventHandle("onChange"),value:this.state.count})]}),(0,S.jsxs)(t,{style:{border:"1px solid red",margin:10,padding:10,userSelect:"none"},onClick:this.getEventHandle("onClick"),children:["click to increment: ",this.state.count]}),(0,S.jsx)(o,{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"}),(0,S.jsx)(t,{children:(0,S.jsx)(a,{className:"github-fork-ribbon",href:"https://github.com/yiminghe/react-worker-render","data-ribbon":"Fork me on GitHub",title:"Fork me on GitHub",children:"Fork me on GitHub"})})]})}})),r("title",(0,o.Z)((0,o.Z)({},V),{},{render:function(){var e=this.nativeComponents.Div;return(0,S.jsxs)(e,{style:{border:"1px solid red",padding:10,margin:10,userSelect:"none"},onClick:this.getEventHandle("refresh"),children:[this.state.title,"@",this.state.now]})}})),function(e){var t=e.worker,n=e.entry;v((0,S.jsx)(K,{worker:t,entry:n}))}({worker:self,entry:"app"})}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.m=e,n.x=function(){var e=n.O(void 0,[306],(function(){return n(446)}));return e=n.O(e)},function(){var e=[];n.O=function(t,o,a,r){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],r=e[c][2];for(var s=!0,p=0;p<o.length;p++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[p])}))?o.splice(p--,1):(s=!1,r<i&&(i=r));if(s){e.splice(c--,1);var u=a();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,a,r]}}(),n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))},n.u=function(e){return"static/js/"+e+".d7500dd9.chunk.js"},n.miniCssF=function(e){},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/react-worker-render/",function(){var e={446:1};n.f.i=function(t,o){e[t]||importScripts(n.p+n.u(t))};var t=self.webpackChunkexample=self.webpackChunkexample||[],o=t.push.bind(t);t.push=function(t){var a=t[0],r=t[1],i=t[2];for(var s in r)n.o(r,s)&&(n.m[s]=r[s]);for(i&&i(n);a.length;)e[a.pop()]=1;o(t)}}(),function(){var e=n.x;n.x=function(){return n.e(306).then(e)}}();n.x()}();
//# sourceMappingURL=446.c7bb92cc.chunk.js.map