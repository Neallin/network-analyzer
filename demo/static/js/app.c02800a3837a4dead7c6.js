webpackJsonp([1],{"9T2W":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a=s("hU7x"),o=s.n(a);function r(t){return t.includes("?")?t+="&_t="+(new Date).getTime():t+="?_t="+(new Date).getTime(),t}var i={getLocalDNS:function(t){var e="https://"+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})+".dns-detect.alicdn.com/api/detect/DescribeDNSLookup";return o()(e,{param:"cb",prefix:"jsonp"},t)},getOS:function(){if(navigator.userAgentData&&navigator.userAgentData.platform)return navigator.userAgentData.platform;var t=navigator.userAgent,e=navigator.platform,s=null;return-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(e)?s="Mac OS":-1!==["iPhone","iPad","iPod"].indexOf(e)?s="iOS":-1!==["Win32","Win64","Windows","WinCE"].indexOf(e)?s="Windows":/Android/.test(t)?s="Android":!s&&/Linux/.test(e)&&(s="Linux"),s},loadScript:function(t,e,s){var n=document.createElement("script"),a=performance.now();n.src=t,n.onerror=function(t){s(t)},n.onload=function(){var t=performance.now();e(t-a)},document.body.append(n)},downloadBandwidth:function(t,e,s){var n=void 0,a=void 0,o=void 0,i=new XMLHttpRequest;t=r(t),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?(a=(new Date).getTime(),o=i.responseText.length,e(o/((a-n)/1e3)/1024,"kbps")):s(i))},n=(new Date).getTime(),i.open("GET",t,!0),i.send()},uploadBandwidth:function(t,e,s){!function(t){var e=document.createElement("canvas");e.width=10240,e.height=10240;var s=e.getContext("2d");s.strokeStyle="#090",s.beginPath(),s.rect(0,0,10240,10240),s.stroke(),e.toBlob(function(e){var s=new FileReader;s.onload=function(){t(s.result)},s.readAsBinaryString(e)})}(function(n){var a=void 0,o=void 0,i=void 0,l=new XMLHttpRequest;t=r(t),l.onreadystatechange=function(){4===l.readyState&&(200===l.status?(o=(new Date).getTime(),i=n.length,e(i/((o-a)/1e3)/1024,"kbps")):s(l))},a=(new Date).getTime(),l.open("PUT",t,!0),l.send(n)})}},l="https://tiw.tencentcloudapi.com",c=["https://demo.qcloudtiw.com/web/latest/index.html","https://demo.qcloudtiw.com/web/latest/ind2ex.html?v=2"],u="https://demo.qcloudtiw.com/android/TICDemo.zip",d="https://uploader-1255343111.cos.ap-nanjing.myqcloud.com/test.png",j=s("eMjc"),p=s.n(j),m=s("PJh5"),f=s.n(m),h={name:"Detector",data:function(){return{clipboardAvailable:"undefined"!=typeof ClipboardItem,categories:[{name:"basic",label:"基础信息"},{name:"network",label:"网络信息"},{name:"netspeed",label:"网速信息"}],list:[{name:"useragent",label:"用户代理",category:"basic",result:navigator.userAgent},{name:"system",label:"操作系统",category:"basic",result:i.getOS()},{name:"ip",label:"客户端IP",category:"basic",result:""},{name:"localDNS",label:"localDNS",category:"basic",result:""},{name:"time",label:"客户端时间",category:"basic",result:f()().format("YYYY/MM/DD HH:mm:ss")},{name:"whiteboardAPI",label:"互动白板接口耗时",category:"network",result:""},{name:"CDN",label:"CDN(s)",category:"network",result:""},{name:"uploadNetSpeed",label:"上行带宽",category:"netspeed",result:""},{name:"downloadNetSpeed",label:"下行带宽",category:"netspeed",result:""}]}},mounted:function(){this.detect()},methods:{detect:function(){this.getLocalDNS(),this.whiteBoardAPI(),this.CDN(),this.bandwidth()},setResult:function(t,e){var s=this.list.find(function(e){return e.name===t});s?s.result=e:console.error("key : ["+t+"] not exist")},whiteBoardAPI:function(){var t=this,e=l;i.loadScript(e,function(e){t.setResult("whiteboardAPI",parseInt(e)+"ms")},function(){t.setResult("whiteboardAPI",'<span class="red">请求失败</span>')})},CDN:function(){var t=this,e=c,s=0,n="";e.forEach(function(a){i.loadScript(a,function(o){s++,n+=a+" | "+parseInt(o)+"ms <br />",s===e.length&&t.setResult("CDN",n)},function(){n+=a+' | <span class="red">请求失败</span> <br />',++s===e.length&&t.setResult("CDN",n)})})},getLocalDNS:function(){var t=this;i.getLocalDNS(function(e,s){e?(t.setResult("ip",'<span class="red">请求失败</span>'),t.setResult("localDNS",'<span class="red">请求失败</span>')):(t.setResult("localDNS",s.content.ldns),t.setResult("ip",s.content.localIp))})},bandwidth:function(){var t=this;i.downloadBandwidth(u,function(e,s){console.log("DownloadBandwidth => ",e),t.setResult("downloadNetSpeed",parseInt(e)+" "+s)},function(e){console.error("error",e),t.setResult("downloadNetSpeed",'<span class="red">请求失败</span>')}),i.uploadBandwidth(d,function(e,s){console.log("UploadBandwidth => ",e),t.setResult("uploadNetSpeed",parseInt(e)+" "+s)},function(e){console.error("error",e),t.setResult("uploadNetSpeed",'<span class="red">请求失败</span>')})},capture:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];p()(document.querySelector("#capture")).then(function(s){if(e||"undefined"==typeof ClipboardItem){var n=f()().format("YYYYMMDD_HHmmss"),a=document.createElement("a");a.download="network-anylyzer-"+n+".png",a.href=s.toDataURL(),a.click()}else s.toBlob(function(e){var s=new ClipboardItem({"image/png":e});navigator.clipboard.write([s]),t.$toast.open({type:"info",message:"已经复制到剪切板",position:"top"})})})},copyText:function(t){try{var e=t.target.parentElement.innerText;navigator.clipboard.writeText(e),this.$toast.open({type:"info",message:"已经复制到剪切板",position:"top"})}catch(t){console.error(t),this.$toast.open({type:"info",message:"已经复制到剪切板",position:"top"})}}}},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detector"},[s("div",{attrs:{id:"capture"}},t._l(t.categories,function(e,n){return s("section",{key:n,staticClass:"card"},[s("div",{staticClass:"copy-btn",on:{click:function(e){return t.copyText(e)}}}),t._v(" "),s("div",{staticClass:"title"},[s("h1",[t._v(t._s(e.label))])]),t._v(" "),s("div",{staticClass:"content"},t._l(t.list.filter(function(t){return t.category===e.name}),function(e){return s("div",{key:e.name,staticClass:"detect-item"},[s("div",{staticClass:"item"},[t._v(t._s(e.label))]),t._v(" "),s("div",{staticClass:"result",domProps:{innerHTML:t._s(e.result||"检测中")}})])}),0)])}),0),t._v(" "),s("div",{staticClass:"control"},[t.clipboardAvailable?s("button",{staticClass:"btn capture",on:{click:function(e){return t.capture(!1)}}},[t._v("截图至剪切板")]):t._e(),t._v(" "),s("button",{staticClass:"btn capture",on:{click:function(e){return t.capture(!0)}}},[t._v("截图并下载")])])])},staticRenderFns:[]};var v=s("VU/8")(h,g,!1,function(t){s("fOps")},null,null).exports,b=s("+4za"),w=s.n(b);s("9T2W");n.a.config.productionTip=!1,n.a.use(w.a),new n.a({el:"#app",components:{App:v},template:"<App/>"})},fOps:function(t,e){},uslO:function(t,e,s){var n={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn-bd":"1C9R","./bn-bd.js":"1C9R","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-in":"yJfC","./en-in.js":"yJfC","./en-nz":"dyB6","./en-nz.js":"dyB6","./en-sg":"NYST","./en-sg.js":"NYST","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-mx":"USNP","./es-mx.js":"USNP","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fil":"rMbQ","./fil.js":"rMbQ","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./ga":"U5Iz","./ga.js":"U5Iz","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-deva":"VGQH","./gom-deva.js":"VGQH","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it-ch":"/E8D","./it-ch.js":"/E8D","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ku":"kI9l","./ku.js":"kI9l","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./oc-lnc":"KOFO","./oc-lnc.js":"KOFO","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tk":"+WRH","./tk.js":"+WRH","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-mo":"+WA1","./zh-mo.js":"+WA1","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(t){return s(o(t))}function o(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}a.keys=function(){return Object.keys(n)},a.resolve=o,t.exports=a,a.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.c02800a3837a4dead7c6.js.map