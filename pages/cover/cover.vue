<template>
	<view class="black">
		<image 
			class="cover"
			:src="cover" 
			mode="widthFix"
			@longpress="opeartor"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover:""
			}
		},
		onLoad(params) {
			var cover = params.cover;
			this.cover = cover;
			
			uni.setNavigationBarColor({
				frontColor:"#ffffff", 
				backgroundColor:"#000000"
			});
		},
	
		methods: {
			opeartor(){
				var me = this;
				uni.showActionSheet({
					itemList:["保存图片"],
					success:function(res){
						if(res.tapIndex == 0){
							// console.log("下载图片")
							uni.showLoading({
								title:"图片保存中..."
							})
							uni.downloadFile({
								url: me.cover,
								success:function(result){
									var tempFilePath = result.tempFilePath;
									console.log(tempFilePath);
									
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: function(){
											uni.showToast({
												title:"保存图片成功",
												duration: 2000
											})
										},
										complete: function(){
											uni.hideLoading()
										}
									})
								}
								
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.black{
		background-color: #000000;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
	}
	.cover{
		display: flex;
		
		align-self: center;
	}
</style>
