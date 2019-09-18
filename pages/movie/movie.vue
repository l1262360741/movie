<template>
	<view class="page">
		
		<view class="player">
			<video 
				id="myTrailer"
				:src="trailerInfo.trailer" 
				:poster="trailerInfo.poster"
				class="movie"
				controls></video>
			
		</view>
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover=' + trailerInfo.cover">
			<image 
				:src="trailerInfo.cover" 
				class="cover"></image>
			</navigator>
			
			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>
				
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分 :</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					<view class="score-stars">
						<block v-if="trailerInfo.score >= 0">
							<trailler-stars :innerScore="trailerInfo.score" showNum="0" class="star-img"></trailler-stars>
						</block>
						<view class="prise-counts">
							{{trailerInfo.prisedCounts}}   人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="line-wapper">
			<view class="line">
				
			</view>
		</view>
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wrapper" v-for="(director,staffIndex) in directorArray">
					<image
						:src="director.photo" 
						mode="aspectFill"
						class="single-actor"
						@click="lookStaffs"
						:data-staffIndex="staffIndex"></image>
						<view class="actor-name">{{director.name}}</view>
						<view class="actor-role">{{director.actName}}</view>
				</view>
				<view class="actor-wrapper" v-for="(actor,actorIndex) in actorArray">
					<image
						:src="actor.photo" 
						mode="aspectFill"
						class="single-actor"
						@click="lookStaffs"
						:data-staffIndex="actorIndex + directorArray.length"></image>
						<view class="actor-name">{{actor.name}}</view>
						<view class="actor-role">{{actor.actName}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image 
					v-for="(img, imgIndex) in plotPicsArray"
					:src="img"
					class="plot-image"
					mode="aspectFill"
					@click="lookMe"
					:data-imgIndex="imgIndex">
				</image>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import traillerStars from "../../components/traillerStars.vue"
	export default {
		data() {
			return {
				trailerInfo:{},
				plotPicsArray:[],
				directorArray:[],
				actorArray:[]
			}
		},
		onShareAppMessage(res) {
			var me = this;
			return {
				title: me.trailerInfo.name,
				path:"/pages/movie/movie?trailerId=" + me.trailerInfo.id
			}
		},
		onNavigationBarButtonTap(e){
			var index = e.index;
			
			var trailerInfo = this.trailerInfo;
			var trailerId = trailerInfo.id;
			var trailerName = trailerInfo.name;
			var cover = trailerInfo.cover;
			var poster = trailerInfo.poster;
			
			if(index == 0){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://localhost:8080/#/pages/movie/movie?trailerId=" + trailerId,
				    title: "超英预告: 《 " + trailerName + " 》",
				    summary: "超英预告: 《 " + trailerName + " 》",
				    imageUrl: cover,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    }
				  
				});
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myTrailer');
			
		},
		onHide() {
			// 页面被隐藏的时候，暂停播放	
			this.videoContext.pause();
		},
		// onShow(){
		// 	// if(this.videoContext){
		// 	// 	this.videoContext.play();
		// 		}
		// },
		onLoad(params) {
			
			//通过API修改导航栏属性
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:"#000000"
			});
			
			var trailerId = params.trailerId;
			
			
			var serverUrl = this.serverUrl;
			uni.request({
				url: serverUrl + '/search/trailer/' + trailerId,
				method: "POST",
				header:{	'content-type':'application/x-www-form-urlencoded'	},
				data: {
				    qq:'116521920'
				},
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						var trailerInfo = res.data.data;
						this.trailerInfo = trailerInfo;
						
						// 把剧照的字符串转换为json array
						var plotPicsArray = JSON.parse(trailerInfo.plotPics);
						this.plotPicsArray = plotPicsArray;
						// debugger;
					}
				}
			});
			uni.request({
				url: serverUrl + '/search/staff/' + trailerId + '/1' ,
				method:"POST",
				header:{	'content-type':'application/x-www-form-urlencoded'	},
				data: {
				    qq:'116521920'
				},
				success: (res) => {
					if(res.data.status == 200) {
						this.directorArray = res.data.data;
					}
				}
			});
			uni.request({
				url: serverUrl + '/search/staff/' + trailerId + '/2' ,
				method:"POST",
				header:{	'content-type':'application/x-www-form-urlencoded'	},
				data: {
				    qq:'116521920'
				},
				success: (res) => {
					if(res.data.status == 200) {
						this.actorArray = res.data.data;
						
					}
				}
			})
		},
		methods: {
			lookMe(e){
				var imgIndex = e.currentTarget.dataset.imgindex;
				
				uni.previewImage({
					current: this.plotPicsArray[imgIndex],
					urls: this.plotPicsArray
				})
			},
			lookStaffs(e){
				var me = this;
				var staffIndex = e.currentTarget.dataset.staffindex;
				
				//拼接导演和演员数组
				var directorArray = me.directorArray;
				var actorArray = me.actorArray;
				var newStaffArray = [];
				newStaffArray = newStaffArray.concat(directorArray).concat(actorArray);
				// debugger
				var urls = [];
				for(var i=0; i<newStaffArray.length; i++){
					var tempPhoto = newStaffArray[i].photo;
					urls.push(tempPhoto)
					
				}
				// debugger
				uni.previewImage({
					current: urls[staffIndex],
					urls: urls
				})
				// debugger
			}
			
		},
		components:{
			traillerStars
		}
	}
	
</script>

<style>
	@import url("movie.css");
</style>
