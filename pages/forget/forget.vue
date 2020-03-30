<template>
	<view>
		<uniStatusBar />
		<!-- 自定义头部 -->
		<view class="flex-column a-center j-center container">
			<view class="header"><text class="text-white font-weight" style="font-size: 36rpx;">非道路移动源排放监管(车主版)</text></view>

			<view class="list">
				<view class="list-call">
					<text class="iconfont icon-shouji mine-text-color "></text>
					<input class="biaoti" type="number" v-model="phoneno" maxlength="11" placeholder="请输入手机号" />
				</view>
				<view class="list-call">
					<text class="iconfont icon-mima mine-text-color "></text>
					<input class="biaoti" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" :password="!showPassword" />
					<image class="img" :src="showPassword ? '/static/images/op.png' : '/static/images/cl.png'" @tap="showPassword = !showPassword"></image>
				</view>
				<view class="list-call">
					<text class="iconfont icon-zuoxixingming mine-text-color "></text>
					<input class="biaoti" type="number" v-model="code" maxlength="4" placeholder="验证码" />
					<view class="yzm" :class="{ yzms: second > 0 }" @tap="getcode">{{ verificaCode }}</view>
				</view>
			</view>
			<view class="dlbutton" hover-class="dlbutton-hover"><text>修改密码</text></view>
		</view>
	</view>
</template>

<script>
var tha, js;
import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar';
export default {
	data() {
		return {
			phoneno: '',
			second: 0,
			code: '',
			showPassword: false,
			password: ''
		};
	},
	components: {
		uniStatusBar
	},
	onLoad() {
		tha = this;
	},
	computed: {
		verificaCode() {
			if (this.second == 0) {
				return '获取验证码';
			} else {
				if (this.second < 10) {
					return '重新获取0' + this.second;
				} else {
					return '重新获取' + this.second;
				}
			}
		}
	},
	methods: {
		display() {
			this.showPassword = !this.showPassword;
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
