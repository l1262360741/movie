(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cover/cover"],{2353:function(t,n,o){"use strict";var e=o("46e2"),c=o.n(e);c.a},"46e2":function(t,n,o){},"68d7":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{cover:""}},onLoad:function(n){var o=n.cover;this.cover=o,t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#000000"})},methods:{opeartor:function(){var n=this;t.showActionSheet({itemList:["保存图片"],success:function(o){0==o.tapIndex&&(t.showLoading({title:"图片保存中..."}),t.downloadFile({url:n.cover,success:function(n){var o=n.tempFilePath;console.log(o),t.saveImageToPhotosAlbum({filePath:o,success:function(){t.showToast({title:"保存图片成功",duration:2e3})},complete:function(){t.hideLoading()}})}}))}})}}};n.default=o}).call(this,o("543d")["default"])},8844:function(t,n,o){"use strict";o.r(n);var e=o("68d7"),c=o.n(e);for(var r in e)"default"!==r&&function(t){o.d(n,t,function(){return e[t]})}(r);n["default"]=c.a},c96a:function(t,n,o){"use strict";o.r(n);var e=o("d5b5"),c=o("8844");for(var r in c)"default"!==r&&function(t){o.d(n,t,function(){return c[t]})}(r);o("2353");var u=o("2877"),a=Object(u["a"])(c["default"],e["a"],e["b"],!1,null,null,null);n["default"]=a.exports},d5b5:function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},c=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return c})}},[["40c8","common/runtime","common/vendor"]]]);