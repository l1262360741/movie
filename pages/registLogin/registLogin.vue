<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input type="text" value="" class="input" name="username" placeholder="请输入用户名"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input type="text" class="input" password="true" name="password" placeholder="请输入密码">
			</view>
			<button type="primary"	form-type="submit" style="margin-top: 60upx; width: 90%">注册/登录</button>
		</form>
		<view class="third-wapper">
					
					<view class="third-line">
						<view class="single-line">
							<view class="line"></view>
						</view>
						
						<view class="third-words">第三方账号登录</view>
						
						<view class="single-line">
							<view class="line"></view>
						</view>
					</view>
					
					<view class="third-icos-wapper">
						<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
						<!-- #ifdef APP-PLUS -->
							<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
							<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
							<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
							<button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
							</button>
						<!-- #endif -->
					</view>
				</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}	
		},
		methods: {
			appOAuthLogin(e) {
				var me = this;
				// 获取用户的登录类型
				var logintype = e.currentTarget.dataset.logintype;
				
				// 授权登录
				uni.login({
					provider: logintype,
					success(loginRes) {
						
						// 授权登录成功以后，获取用户的信息
						uni.getUserInfo({
							provider: logintype,
							success(info) {
								// console.log(JSON.stringify(info));
								
								var userInfo = info.userInfo;
								var face = "";
								var nickname = "";
								var openIdOrUid = "";
								if (logintype == "weixin") {
									face = userInfo.avatarUrl;
									nickname = userInfo.nickName;
									openIdOrUid = userInfo.openId;
								} else if (logintype == "qq") {
									openIdOrUid = userInfo.openId;
									nickname = userInfo.nickname;
									face = userInfo.figureurl_qq_2;
								} else if (logintype == "sinaweibo") {
									openIdOrUid = userInfo.id;
									nickname = userInfo.nickname;
									face = userInfo.avatar_large;
								}
								
								// 调用开发者后台，执行一键注册或登录
								uni.request({
									url: me.serverUrl + "/appUnionLogin/" + logintype,
									header:{	'content-type':'application/x-www-form-urlencoded'	},
									data: {
										"openIdOrUid": openIdOrUid,
										"nickname": nickname,
										"face": face,
										qq:'116521920'
										
									},
									method: "POST",
									success(result) {
										if (result.data.status == 200) {
											var userInfo = result.data.data;
											// 保存用户信息到全局的缓存中
											uni.setStorageSync("globalUser", userInfo);
											// 切换页面跳转，使用tab切换的api
											uni.switchTab({
												url: "../me/me"
											});
										}
									}
								})
								
							}
						})
						
					}
				});
			},
			//实现微信登录
			wxLogin(e){
				var me = this;
				//通过微信开放能力 获得微信用户基本信息
				var userInfo = e.detail.userInfo; 
				uni.login({
				  provider: 'weixin',
				  success(loginResult){
					  console.log(loginResult);
					  var code = loginResult.code;
					  // 设置登录到哪个
					  var loginTowhichMP = 1;
					  uni.request({
					  	url: me.serverUrl + "/mpWXLogin/" + code,
						header:{	'content-type':'application/json'	},
						data:{
							"avatarUrl": userInfo.avatarUrl,
							"nickName": userInfo.nickName,
							"whichMP": loginTowhichMP,
							// qq:'116521920'
						},
						method:"POST",
						
						success(userResult) {
							// console.log(userResult)
							var userInfo = userResult.data.data;
							uni.setStorageSync("globalUser", userInfo);
							uni.switchTab({
								url:"../me/me"
							})
						}
					  })
					  
					  
					  
				  }
				});
			},
			formSubmit(e){
				var me = this;
				// debugger
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				
				var serverUrl = me.serverUrl;
				uni.request({
					url: serverUrl + '/user/registOrLogin',
					data:{
						"username": username,
						"password": password,
					},
					method: "POST",
					header:{	'content-type':'application/json'},
					data: {
					    qq:'116521920'
					},
					success: (res) => {
						if(res.data.status == 200){
							var userInfo = res.data.data;
							
							console.log(userInfo)
							uni.setStorageSync("globalUser",userInfo);
							
							uni.switchTab({
								url:"../me/me"
							})
							
						}else if(res.data.status == 500){
							uni.showToast({
								title: 'res.data.msg',
								duration: 1500,
								image: "../../static/icos/error.png"
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("registLogin.css");
</style>
