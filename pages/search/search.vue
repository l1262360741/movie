<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input 
				type="text" 
				value="" 
				placeholder="搜索预告" 
				maxlength="10" 
				class="search-text" 
				confirm-type="search"
				@confirm="searchMe"
				/>
		</view>
		
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="movie in movieList" >

				<image 	
					:src="movie.cover" 
					class="poster"
					:data-trailerId="movie.id"
					@click="showTrailer"
						></image>
			
			</view>
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movieList:[],
				keywords:"", //搜索的关键字
				page: 1, //当前页数
				totalPages: 1 ,//总页数
			}
		},
		onLoad() {
			var serverUrl = this.serverUrl;
			uni.showLoading({
				mask: true,
				title: "请稍后"
			});
			uni.showNavigationBarLoading()
			uni.request({
				url: serverUrl + '/search/list?keywords=&page=&pageSize=', //仅为示例，并非真实接口地址。
				method:"POST",
				header:{	'content-type':'application/x-www-form-urlencoded'	},
				data: {
				    qq:'116521920'
				},
				
				success: (res) => {
					if(res.data.status == 200){
						
						var movieList = res.data.data.rows;
						this.movieList = movieList
						
					}
				},
				complete: () => {
					uni.stopPullDownRefresh();
					uni.hideLoading();
					uni.hideNavigationBarLoading()
					
				}
			})
		
		},
		onReachBottom() {
			var page = this.page + 1;
			var keywords = this.keywords;
			var totalPages = this.totalPages;
			//如果当前需要分页的分页数和总页数相等，就不分页
			if(page > totalPages){
				return;
			}
			
			this.pagedMovieList(keywords,page,15)
		},
		methods: {
			showTrailer(e){
				var trailerId = e.currentTarget.dataset.trailerid;
				uni.navigateTo({
					url:"../movie/movie?trailerId=" + trailerId
				})
			},
			pagedMovieList(keywords,page,pageSize){
				var serverUrl = this.serverUrl;
				uni.showLoading({
					mask: true,
					title: "请稍后"
				});
				uni.showNavigationBarLoading()
				uni.request({
					url: serverUrl + '/search/list?keywords=' + keywords + '&page=' + page + '&pageSize=' + pageSize , //仅为示例，并非真实接口地址。
					method:"POST",
					header:{	'content-type':'application/x-www-form-urlencoded'	},
					data: {
					    qq:'116521920'
					},
					
					success: (res) => {
						if(res.data.status == 200){
							
							var tempList = res.data.data.rows;
							this.movieList = this.movieList.concat(tempList);
							this.totalPages = res.data.data.total; //获取总页数
							this.page = page; //覆盖当前页面里的page
							
							
						}
					},
					complete: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						uni.hideNavigationBarLoading()
						
					}
				})
			},
			searchMe(e){

				var value = e.detail.value;
				this.keywords = value;
				this.movieList = [];
				this.pagedMovieList(value, 1, 15)
			}
		},
		
	}
</script>

<style>
	@import url("search.css");
</style>
