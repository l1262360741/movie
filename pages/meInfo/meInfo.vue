<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->
			
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<image :src="globalUser.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 昵称 -->
			<view class="item-wapper" @click="modifyNickname">
				<view class="info-words">昵称</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.nickname}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper" @click="modifyBirthday">
				<view class="info-words">生日</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 性别 -->
			<view class="item-wapper" @click="modifySex">
				<view class="info-words">性别</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						
						<view v-if="globalUser.sex == 1">
							男
						</view>
						<view v-else-if="globalUser.sex == 0">
							女
						</view>
						<view v-else>
							未选择
						</view>
						
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="footer-wapper">
			<view class="footer-words" @click="cleanStorage">
				清理缓存
			</view>
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalUser:{}
			}
		},
		onShow() {
			var me = this;
			var globalUser = me.getGlobalUser("globalUser");
			me.globalUser = globalUser;
		},
		methods: {
			operator(){
				var globalUser = me.getGlobalUser("globalUser");
				uni.showActionSheet({
					itemList:["查看我的头像","从相册选择上传"],
					success(res) {
						var index = res.tapIndex;
						if(index == 0){
							var faceArr = [];
							faceArr.push(globalUser.faceImage);
							uni.previewImage({
								urls: faceArr,
								current: faceArr[0]
							})
						}else if(index == 1){
							uni.chooseImage({
							    count: 6, //默认9
							    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
							    sourceType: ['album'], //从相册选择
							    success: function (res) {
									//获得临时路径
							       var tempFilePaths = res.tempFilePaths[0];
								   uni.navigateTo({
								   	//选择图片
								   	url:"../meFace/meFace?tempFilePaths=" + tempFilePaths
								   })
							    }
							});
							
						}
					}
				})
			},
			cleanStorage(){
				uni.clearStorageSync(),
				uni.showToast({
					title:"清理缓存成功",
					mask:false, 
					duration: 1500
				})
			},
			logout(){
				var globalUser = this.getGlobalUser("globalUser");
				var serverUrl = me.serverUrl;
				uni.request({
					url: serverUrl + '/user/logout?userId=' + globalUser.id,
					method: "POST",
					header:{	'content-type':'application/json;chartset=utf-8'},
					data: {
					    qq:'116521920'
					},
					success: (res) => {
						if(res.data.status == 200){
							uni.removeStorage("globalUser");
							uni.switchTab({
								url:"../me/me"
							})
			}
		}
	})
	}
},
}

</script>

<style>
	@import url("meInfo.css");
</style>
