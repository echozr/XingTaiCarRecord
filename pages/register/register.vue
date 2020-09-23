<template>
	<view>
		<uniStatusBar />
		<!-- 自定义头部 -->
		<view class="flex-column a-center j-center container">
			<view class="header"><text class="text-white font-weight" style="font-size: 36rpx;">邢台市非道路移动源排放监管</text></view>

			<view class="list">
				<view class="list-call">
					<text class="iconfont icon-shouji mine-text-color "></text>
					 <view class="uni-list-cell-db biaoti">
						<picker 
							@change="bindPickerChange" 
							:value="appTypeIndex" 
							:range="appTypeArray"
						>
							<view class="uni-input">{{ appTypeArray[appTypeIndex] }}</view>
						</picker>
					</view>
				</view>
				<view class="list-call">
					<text class="iconfont icon-shouji mine-text-color "></text>
					<input class="biaoti" v-model="register.userId"  placeholder="请输入账号" @blur="phoneblur(register.userId)" />
				</view>
				<view class="list-call">
					<text class="iconfont icon-xingmingyonghumingnicheng mine-text-color "></text>
					<input class="biaoti" v-model="register.chezhuname" maxlength="30" placeholder="请输入姓名" />
				</view>
				<view class="list-call">
					<text class="iconfont icon-mima mine-text-color "></text>
					<input class="biaoti" v-model="register.password" type="password" maxlength="32" placeholder="请输入密码"   />
				</view>
				<view class="list-call">
					<text class="iconfont icon-mima mine-text-color "></text>
					<input class="biaoti" v-model="register.repassword" type="password" maxlength="32" placeholder="确认密码" />
				</view>
			
				<!-- <view class="list-call">
					<text class="iconfont icon-zuoxixingming mine-text-color "></text>
					<input class="biaoti" v-model="register.shenfenzhengcode" maxlength="19" placeholder="身份证号" />
				</view>
				<view class="list-call">
					<text class="iconfont icon-zuoxixingming mine-text-color "></text>
					<input class="biaoti" type="number" v-model="register.checkcode" maxlength="4" placeholder="验证码" />
					<view class="yzm" :class="{ yzms: second > 0 }" @tap="getcode">{{ verificaCode }}</view>
				</view> -->
			</view>
			<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin"><text>注册</text></view>
			<view class="my-3 font-md text-center text-muted">
				已有账号？
				<navigator url="../login/login" class="d-inline-block font-weight">登录</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import $zrHttp from '@/server/request.js';
import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar';
var tha, js;
export default {
	data() {
		return {
			register: {
				appType: '',
				userId: '',
				password: '',
				repassword:'',
				chezhuname: ''
			},
			showPassword: false,
			second: 0,
			license: '',
			isRepeat: true,
			appTypeIndex: 0,
			appTypeArray: ['请选择账号类别', '车主版', '工地版'],
			// 验证规则
			rules: {
				appType: [
					{
						rule: /^[0|1]/,
						msg: '账号类别不能为空'
					}
				],
				userId: [
					{
						rule:/\S/,
						msg: '账号不能为空'
					}
				],
				password: [
					{
						rule: /^.{6,20}$/,
						msg: '密码长度必须大于6位'
					}
				],
				repassword: [
					{
						rule: /^.{6,20}$/,
						msg: '密码长度必须大于6位'
					}
				],
				chezhuname: [
					{
						rule: /\S/,
						msg: '用户名不能为空'
					}
				]
				
			}
		};
	},
	computed: {
		
	},
	onLoad() {
		tha = this;
	},
	components: {
		uniStatusBar
	},
	methods: {
		// 账号类型切换
		bindPickerChange: function(e) {
			this.appTypeIndex = e.target.value
			this.register.appType = this.appTypeIndex - 1
		},
		//验证用户
		phoneblur(userId) {
			//检查用户是否存在
			this.$http
				.post('/CheZhuUser/checkCheZhuPhoneIsExist.do', { userId: userId })
				.then(data => {
					this.isRepeat = true;
					return;
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		// 表单验证
		validate(key) {
			var check = true;
			this.rules[key].forEach(v => {
				// 验证失败
				if (!v.rule.test(this.register[key])) {
					uni.showToast({ title: v.msg, icon: 'none' });
					check = false;
					return false;
				}
			});
			return check;
		},
		bindLogin() {
			//验证手机号是否注册
			if (!this.isRepeat) {
				uni.showToast({ title: '该用户名已经注册！', icon: 'none' });
				return;
			}
			if (!this.validate('appType')) return;     // 验证账号类型
			if (!this.validate('userId')) return;      // 验证用户名
			if (!this.validate('password')) return;    // 验证密码
			if (!this.validate('chezhuname')) return;  // 验证用户名
			if(this.register.password!=this.register.repassword){
				uni.showToast({ title: '两次密码不一致！', icon: 'none' });
				return;
			}
			//注册用户
			uni.showLoading({
				title: '注册中...',
				mask: true
			});
			this.$http
				.post('/CheZhuUser/CheZhuUserZhuCe.do', this.register)
				.then(data => {
					uni.hideLoading();
					console.log(data);
					if(data.msg==="注册成功"){
						uni.showToast({ title: '注册成功！', icon: 'none' });
					}
				})
				.catch(msg => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		getcode() {
			if (this.second > 0) {
				return;
			}
			tha.second = 60;
			js = setInterval(function() {
				tha.second--;
				if (tha.second == 0) {
					clearInterval(js);
				}
			}, 1000);
		}
	}
};
</script>

<style>
	.container{
		background: #FFFFFF;
	}
.header {
	width: 100%;
	height: 346rpx;
	background: url(../../static/images/loginbg.png) no-repeat;
	background-size: 100% 346rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.list {
	display: flex;
	flex-direction: column;
	padding-top: 100rpx;
	padding-left: 100rpx;
	padding-right: 100rpx;
	background: #ffffff;
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
.list-call .uni-list-cell-db.biaoti .uni-input{
	color: grey;
	padding-left: 0;
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
.yzm {
	color: #3fcdeb;
	font-size: 24upx;
	line-height: 64upx;
	padding-left: 10upx;
	padding-right: 10upx;
	width: auto;
	height: 64upx;
	border: 1upx solid #3fcdeb;
	border-radius: 50upx;
}
.yzms {
	color: #999999 !important;
	border: 1upx solid #999999;
}
</style>
