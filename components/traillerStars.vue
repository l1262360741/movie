<template name="traillerStars">
	<view>
		<view class="movie-score-wrapper">
			<!-- <image src="../../static/icos/star-yellow.png" class="star-ico"></image>
			<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
			<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
			<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
			<image src="../../static/icos/star-gray.png" class="star-ico"></image>
			<view class="movie-score">
				9.0
			</view> -->
			<image  v-for="yellow in yellowScore"
					src="/static/icos/star-yellow.png" 
					class="star-ico"></image>
			<image  v-for="grey in greyScore"
					src="/static/icos/star-gray.png" 
					class="star-ico"></image>
			<view class="movie-score" v-if="showNum == 1">
				{{innerScore}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"traillerStars",
		data() {
			return {
				yellowScore: 0,
				greyScore: 5,
			};
		},
		props:{
			innerScore: 0, //定义外部传入分数
			showNum: 0, //是否需要显示具体分数 ：1 显示 2 不显示
			
		},
		//生命周期 ，组件创建完成后被调用
		created() {
			var tempScore = 0;
			if(this.innerScore != null && this.innerScore != undefined && this.innerScore != ''){
				tempScore = this.innerScore
			}
			var yellowScore = parseInt(tempScore / 2);
			var greyScore = 5 - yellowScore;
			
			this.yellowScore = yellowScore;
			this.greyScore = greyScore;
		}
	}
</script>

<style>
	.movie-score-wrapper{
		display: flex;
		flex-direction: row;
		
	}
	.star-ico{
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
		
	}
	.movie-score{
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
	}

</style>
