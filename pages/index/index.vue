<template>
	
	<view class="page">
		<!-- //轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="carousel in carouselList">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + carousel.movieId">
				<image :src="carousel.image"
						class="carousel"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- //热门超英 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" class="page-block hot">
			
			<view class="single-poster" v-for="superhero in hotsuperheroList">
				<view class="poster-wrapper">
					<navigator :url="'../movie/movie?trailerId=' + superhero.id">
					<image :src="superhero.cover" class="poster"></image>
					<view class="movie-name">
						{{superhero.name}}
					</view>
					</navigator>
					<trailler-stars :innerScore="superhero.score" showNum="1"></trailler-stars>
				</view>
				
				
			</view>
			
		</scroll-view>
		<!-- //热门预告 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		
		<view class="hot-movies page-block">
			<video 
				:id="trailer.id"
				:data-playingindex="trailer.id"
				@play="meIsPLay"
				v-for="trailer in hotTrailerList"
				:src="trailer.trailer" 
				:poster="trailer.poster"
				controls
				class="hot-movie-single"></video>
		</view>
		<!-- 猜你喜欢 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		<view class="page-block guess-u-like" v-for="(like,gIndex) in likeList">
			<view class="single-like-movie">
				<navigator :url="'../movie/movie?trailerId=' + like.id">
					<image :src="like.cover" class="like-movie"></image>
				</navigator>
				<view class="movie-desc">
					<view class="movie-title">
						{{like.name}}
					</view>
					<trailler-stars :innerScore="like.score" showNum="0"></trailler-stars>
				
					<view class="movie-info">
						{{like.basicInfo}}
					</view>
					<view class="movie-info">
						{{like.releaseDate}}
					</view>
				</view>
				<view class="movie-oper" :data-gIndex="gIndex" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationDataArr[gIndex]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import common from "../../common/common.js";
	//VM 协调者 调度器
	import traillerStars from "../../components/traillerStars.vue"
	export default {
		//Model 所有的数据
		data() {
			return {
				carouselList: [],
				hotsuperheroList: [],
				hotTrailerList:[],
				likeList:[],
				animationData:{
					
				},
				animationDataArr:[
					{},{},{},{},{},
				],
			
			}
		},
		onPullDownRefresh(){
			this.refresh();
		},
		onUnload() {
			//页面卸载的时候  清除动画数据
			this.animationData = {};
			animationDataArr: [
				{},{},{},{},{},
			]
		},
		onHide() {
			if(this.videoContext){
				this.videoContext.pause()
			}
		},
		onLoad() {
			
			
			//在页面创建的时候 创建一个临时动画对象
			this.animation = uni.createAnimation();
			//end
			
			// var serverUrl = common.serverUrl;
			//通过挂载到main.js 获取服务器地址作为全局变量
			var serverUrl = this.serverUrl;
			//请求轮播图数据
			uni.request({
			    url: serverUrl + '/index/carousel/list', //仅为示例，并非真实接口地址。
				method:"POST",
				header:{	'content-type':'application/x-www-form-urlencoded'	},
			    data: {
			        qq:'116521920'
			    },
			   
			    success: (res) => {
			        console.log(res.data);
					
					//获取真实数据之前 判断状态是否为200
					if(res.data.status == 200){
						var carouselList = res.data.data;
						this.carouselList = carouselList
					}
					
					
			       
			    }
			});
			//查询热门超英
			uni.request({
			    url: serverUrl + '/index/movie/hot?type=superhero', //仅为示例，并非真实接口地址。
				method:"POST",
				header:{	'content-type':'application/x-www-form-urlencoded'	},
			    data: {
			        qq:'116521920'
			    },
			   
			    success: (res) => {
			        // console.log(res.data);
					
					if(res.data.status == 200){
						var hotsuperheroList = res.data.data;
						this.hotsuperheroList = hotsuperheroList;
						
					}
					
				}
			});
			
			
				//查询热门预告
				
				uni.request({
					url: serverUrl + '/index/movie/hot?type=trailer',
					method: "POST",
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						qq:'116521920'
					},
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.status == 200) {
							var hotTrailerList = res.data.data;
							this.hotTrailerList = hotTrailerList;
						}
				
					}
				});
			
			
			this.refresh();
		},
		methods: {
			//播放一个视频的时候需要暂停其他视频
			meIsPLay(e){
				var me = this;
				var trailerId = "";
				
				if(e){
					
					trailerId = e.currentTarget.dataset.playingindex;
					me.videoContext = uni.createVideoContext(trailerId);
				}
				var hotTrailerList = me.hotTrailerList;
				for(var i=0;i<hotTrailerList.length;i++){
					var tempId = hotTrailerList[i].id;
					if(tempId != trailerId){
						uni.createVideoContext(tempId).pause();
					}
				}
			},
			refresh(){
				uni.showLoading({
					mask: true
				});
				uni.showNavigationBarLoading()
				
				var serverUrl = this.serverUrl;
				uni.request({
				    url: serverUrl + '/index/guessULike', //仅为示例，并非真实接口地址。
					method:"POST",
					header:{	'content-type':'application/x-www-form-urlencoded'	},
				    data: {
				        qq:'116521920'
				    },
				   
				    success: (res) => {
				        console.log(res.data);
						
						//获取真实数据之前 判断状态是否为200
						if(res.data.status == 200){
							var likeList = res.data.data;
							this.likeList = likeList
						}
				    },
					complete: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						uni.hideNavigationBarLoading()
					}
				});
			
			},
			//实现点赞动画效果
			praiseMe(e){
				var gIndex = e.currentTarget.dataset.gindex;
				
				//构建动画数据 并且通过step表示这组动画完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				});
				//导出动画数据到view组件，实现组件的动画效果
				// this.animationData = this.animation.export();
				this.animationData = this.animation;
				this.animationDataArr[gIndex] = this.animationData.export();
				//还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					});
					this.animationData = this.a 	nimation;
					this.animationDataArr[gIndex] = this.animationData.export();
				}.bind(this), 500);
			}
		},
		components:{
			traillerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
