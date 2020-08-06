<template>
	<view>
		<uniStatusBar />
		<!-- 自定义头部 -->
		<view class="flex-column a-center j-center container">
			<view class="header"><text class="text-white font-weight" style="font-size: 36rpx; color:#ffffff;">邢台市非道路移动源排放监管</text></view>
			<view class="list">
				<view class="list-call">
					<text class="iconfont icon-shouji mine-text-color "></text>
					<input
						class="biaoti"
						placeholder-class="text-light-muted"
						v-model="user.userId"
						placeholder="请输入账号"
						@focus="focus('userId')"
						@blur="blur('userId')"
						:class="focusClass.userId ? 'input-border-color' : ''"
					/>
				</view>
				<view class="list-call">
					<text class="iconfont icon-mima mine-text-color "></text>
					<input
						class="biaoti"
						v-model="user.password"
						maxlength="32"
						placeholder="请输入密码"
						placeholder-class="text-light-muted"
						:password="!showPassword"
						:class="focusClass.password ? 'input-border-color' : ''"
						@focus="focus('password')"
						@blur="blur('password')"
					/>
					<image class="img" :src="showPassword ? '/static/images/op.png' : '/static/images/cl.png'" @tap="showPassword = !showPassword"></image>
				</view>
				<view class="lost-call">
					<checkbox-group @tap="changeInfo">
						<label>
							<checkbox :value="checkV"  :checked="isChecked" />
							记住密码
						</label>
					</checkbox-group>
				</view>
			</view>

			<view class="dlbutton" hover-class="dlbutton-hover" @tap="submit()"><text>登录</text></view>

			<view class="xieyi">
				<!-- <text @tap="forget">忘记密码</text>
				<text>|</text> -->
				<text @tap="register">注册账户</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar';
export default {
	data() {
		return {
			focusClass: {
				password: false,
				userId: false
			},
			showPassword: false,
			isChecked: false,
			checkV: 'false',
			user: {
				userId: '',
				password: ''
			},
			// 验证规则
			rules: {
				userId: [
					{
						rule: /\S/,
						msg: '用户名不能为空'
					}
				],
				password: [
					{
						rule: /^.{6,20}$/,
						msg: '密码长度必须大于6位'
					}
				]
			}
		};
	},
	components: {
		uniStatusBar
	},
	mounted() {
		this.getInfo()
	},
	methods: {
		//注册
		register() {
			uni.navigateTo({
				url: '../register/register'
			});
		},
		//忘记密码
		forget() {
			uni.navigateTo({
				url: '../forget/forget'
			});
		},
		focus(key) {
			this.focusClass[key] = true;
		},
		blur(key) {
			this.focusClass[key] = false;
		},
		// 表单验证
		validate(key) {
			var check = true;
			this.rules[key].forEach(v => {
				// 验证失败
				if (!v.rule.test(this.user[key])) {
					uni.showToast({ title: v.msg, icon: 'none' });
					check = false;
					return false;
				}
			});
			return check;
		},
		// 提交表单
		submit() {
			if (this.isChecked != '') {
				this.setInof();
			}
			uni.hideLoading();
			uni.hideKeyboard();
			if (!this.validate('userId')) return; // 验证用户名
			if (!this.validate('password')) return; // 验证密码
			uni.showLoading({
				title: '登录中...',
				mask: true
			});
			this.$http
				.post('/CheZhuUser/CheZhulogin.do', this.user)
				.then(data => {
					uni.hideLoading();
					uni.setStorage({
						key: 'info',
						data: data.data
					});
					//跳转首页
					uni.setStorage({
						key: 'userId',
						data: data.data.userId,
						success() {
							uni.reLaunch({
								url: '../index/index'
							});
						}
					});
				})
				.catch(msg => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		// 存储用户信息
		setInof() {
			if (this.user.userId != '' && this.user.password != '') {
				const loginInof = { user: this.user.userId, paw: this.user.password, isChecked: this.isChecked };
				uni.setStorage('LI');
				uni.setStorage({
					key: 'LI',
					data: JSON.stringify(loginInof),
					success: function() {
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '账号密码不能为空'
				});
			}
		},
		// 读取用户信息
		getInfo() {
			let _this=this
			uni.getStorage({
				key: 'LI',
				success: function(res) {
					console.log(res)
		      const loginInfo=JSON.parse(res.data)
					_this.user.userId = loginInfo.user
					_this.user.password=loginInfo.paw
					_this.isChecked=loginInfo.isChecked
				}
			});
		},
		// 清除缓存
		clearInfo() {
			uni.clearStorage();
		},
		// 改变信息
		changeInfo(e) {
			const isChecked = e.detail.value;
			if (isChecked == false) {
				this.clearInfo();
			} else {
				this.setInof();
				this.getInfo();
				this.isChecked=true
				this.checkV=isChecked
			}
		}
	}
};
</script>

<style>
.header {
	width: 100%;
	height: 346rpx;
	background: url(../../static/images/loginbg.png) no-repeat;
	background-size: 100% 346rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.header text {
}

/* .header {
	width: 161rpx;
	height: 161rpx;
	background: rgba(63, 205, 235, 1);
	box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
	border-radius: 50%;
	margin-top: 30rpx;
	margin-left: auto;
	margin-right: auto;
}
.header image {
	width: 161rpx;
	height: 161rpx;
	border-radius: 50%;
} */
.list {
	display: flex;
	flex-direction: column;
	padding-top: 100rpx;
	padding-left: 100rpx;
	padding-right: 100rpx;
}
.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 90rpx;
	color: #333333;
	border-bottom: 1rpx solid rgba(230, 230, 230, 1);
	margin-bottom: 20rpx;
	position: relative;
}
.list-call .iconfont {
	font-size: 32rpx;
}
.list-call .biaoti {
	flex: 1;
	text-align: left;
	font-size: 30rpx;
	margin-left: 16rpx;
	color: #666666;
}
.list-call .img {
	width: 40rpx;
	height: 40rpx;
}
.dlbutton {
	color: #ffffff;
	font-size: 34rpx;
	width: 470rpx;
	height: 100rpx;
	background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
	box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
	border-radius: 50rpx;
	line-height: 100rpx;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	margin-top: 100rpx;
}
.dlbutton-hover {
	background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
}
.xieyi {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 30rpx;
	margin-top: 80rpx;
	color: #3fcdeb;
	text-align: center;
	height: 40rpx;
	line-height: 40rpx;
}
.xieyi text {
	font-size: 28rpx;
	margin-left: 15rpx;
	margin-right: 15rpx;
}
</style>
