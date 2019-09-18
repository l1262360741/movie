<template>
	
		<view class="page page-fill">
			
			<view class="pending-wapper">
				<image id="face" :src="tempFace" class="pending-face" mode="scaleToFill"></image>
			</view>
			
			<view class="notice">
				<view class="notice-words">
					* 请从相册中选择等比宽高的图片噢~
				</view>
			</view>
			
			<view class="footer-opertor">
				<view class="opertor-words" @click="changePendingFace">
					重新选择
				</view>
				<view class="opertor-words" @click="upload">
					确认上传
				</view>
			</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFace:""
			}
		},
		onLoad(params) {
			var tempFilePaths = params.tempFilePaths;
			this.tempFace = tempFilePaths
		},
		methods: {
			changePendingFace(){
				var me = this;
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						//获得临时路径
				       var tempFilePaths = res.tempFilePaths[0];
						me.tempFace = tempFilePaths;
				    }
				});
			},
			upload(){
					var me = this;
					var globalUser = me.getGlobalUser("globalUser");
					
					uni.showLoading({
						mask: true,
						title:"上传中，请稍后"
						
					});
					var serverUrl = me.serverUrl;
					uni.uploadFile({
						url: me.serverUrl + "/user/uploadFace?userId=" +  globalUser.id,
						filePath: me.tempFace,
						name: "file",
						success(res) {
							var resData = res.data;
							console.log(resData)
							
						},
						complete() {
							uni.hideLoading();
						}
					})
			}
		}
	}
</script>

<style>
	@import url("meFace.css");
</style>
