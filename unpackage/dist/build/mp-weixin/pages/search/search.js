(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"0333":function(t,a,e){"use strict";var i=e("07a1"),o=e.n(i);o.a},"07a1":function(t,a,e){},"18ec":function(t,a,e){"use strict";e.r(a);var i=e("5145"),o=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);a["default"]=o.a},5145:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{movieList:[],keywords:"",page:1,totalPages:1}},onLoad:function(){var a=this,e=this.serverUrl;t.showLoading({mask:!0,title:"请稍后"}),t.showNavigationBarLoading(),t.request({url:e+"/search/list?keywords=&page=&pageSize=",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{qq:"116521920"},success:function(t){if(200==t.data.status){var e=t.data.data.rows;a.movieList=e}},complete:function(){t.stopPullDownRefresh(),t.hideLoading(),t.hideNavigationBarLoading()}})},onReachBottom:function(){var t=this.page+1,a=this.keywords,e=this.totalPages;t>e||this.pagedMovieList(a,t,15)},methods:{showTrailer:function(a){var e=a.currentTarget.dataset.trailerid;t.navigateTo({url:"../movie/movie?trailerId="+e})},pagedMovieList:function(a,e,i){var o=this,n=this.serverUrl;t.showLoading({mask:!0,title:"请稍后"}),t.showNavigationBarLoading(),t.request({url:n+"/search/list?keywords="+a+"&page="+e+"&pageSize="+i,method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{qq:"116521920"},success:function(t){if(200==t.data.status){var a=t.data.data.rows;o.movieList=o.movieList.concat(a),o.totalPages=t.data.data.total,o.page=e}},complete:function(){t.stopPullDownRefresh(),t.hideLoading(),t.hideNavigationBarLoading()}})},searchMe:function(t){var a=t.detail.value;this.keywords=a,this.movieList=[],this.pagedMovieList(a,1,15)}}};a.default=e}).call(this,e("543d")["default"])},"823b":function(t,a,e){"use strict";e.r(a);var i=e("e460"),o=e("18ec");for(var n in o)"default"!==n&&function(t){e.d(a,t,function(){return o[t]})}(n);e("0333");var r=e("2877"),s=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,null,null);a["default"]=s.exports},e460:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return o})}},[["1454","common/runtime","common/vendor"]]]);