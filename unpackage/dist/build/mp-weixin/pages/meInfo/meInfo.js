(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meInfo/meInfo"],{"0dab":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},1486:function(e,t,a){},"1af9":function(e,t,a){"use strict";a.r(t);var n=a("83b7"),o=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=o.a},"75ed":function(e,t,a){"use strict";var n=a("1486"),o=a.n(n);o.a},"7f0c":function(e,t,a){"use strict";a.r(t);var n=a("0dab"),o=a("1af9");for(var r in o)"default"!==r&&function(e){a.d(t,e,function(){return o[e]})}(r);a("75ed");var u=a("2877"),s=Object(u["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=s.exports},"83b7":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{globalUser:{}}},onShow:function(){var e=this,t=e.getGlobalUser("globalUser");e.globalUser=t},methods:{operator:function(){var t=me.getGlobalUser("globalUser");e.showActionSheet({itemList:["查看我的头像","从相册选择上传"],success:function(a){var n=a.tapIndex;if(0==n){var o=[];o.push(t.faceImage),e.previewImage({urls:o,current:o[0]})}else 1==n&&e.chooseImage({count:6,sizeType:["compressed"],sourceType:["album"],success:function(t){var a=t.tempFilePaths[0];e.navigateTo({url:"../meFace/meFace?tempFilePaths="+a})}})}})},cleanStorage:function(){e.clearStorageSync(),e.showToast({title:"清理缓存成功",mask:!1,duration:1500})},logout:function(){var t=this.getGlobalUser("globalUser"),a=me.serverUrl;e.request({url:a+"/user/logout?userId="+t.id,method:"POST",header:{"content-type":"application/json;chartset=utf-8"},data:{qq:"116521920"},success:function(t){200==t.data.status&&(e.removeStorage("globalUser"),e.switchTab({url:"../me/me"}))}})}}};t.default=a}).call(this,a("543d")["default"])}},[["36a5","common/runtime","common/vendor"]]]);