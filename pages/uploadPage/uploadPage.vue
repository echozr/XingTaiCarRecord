<template>
	<view v-if="visible" class="mark ">
		<view class="view position-relative">
			<text class="title border-bottom pb-1 border-light-secondary" style="width: 100%;">{{ title }}</text>
			<view class="tip">新版更新内容</view>
			<scroll-view class="scroll" scroll-y v-if="contents.length">
				<view class="item" v-for="(item, index) in contents" :key="index">{{ item }}</view>
			</scroll-view>
			<view v-if="!downloading" class="d-flex flex-row border-top position-absolute bottom-0 border-light-secondary" style="width: 100%; height: 100rpx;">
				<view class="btns border-right border-light-secondary"><view class="sure font-weight" @click="onCancelClick()">稍后进行</view></view>
				<view class="btns" @click="onSureClick()">
					<text class="iconfont font-weight">&#xe63a;</text>
					<view class="sure font-weight">立即更新</view>
				</view>
			</view>
			<cmd-progress v-else class="progress" type="circle" stroke-color="#09a0f7" :percent="progress" :text="text">
			</cmd-progress>
		</view>
	</view>
</template>

<script>
import cmdProgress from '../../components/cmd-progress/cmd-progress.vue';
export default {
	components: {
		cmdProgress
	},
	data() {
		return {
			visible: true,
			progress: 0,
			downloading: false,
			success: true,
			url: '',
			title: '版本更新',
			contents: ['1.新增记住密码功能'],
			text:''
		};
	},
	onShow() {
		var self=this
		uni.getStorage({
			key: 'DownLoadUrl',
			success: function(res) {
				self.url=res.data
			}
		});
	},
	methods: {
		hide() {
			setTimeout(() => {
				this.visible = false;
			}, 100);
		},
		onCancelClick() {
			uni.navigateTo({
				url: '../login/login',
			});
		},
		onSureClick() {
			var self=this;
			self.downloading=true;
			//设置 最新版本apk的下载链接
			var downloadApkUrl = self.url;
			var appname = '邢台市非道路移动源排放监管';
			self.text='开始下载！'
			//NotificationUtil.setNotification(appname, '开始下载! ');
			var dtask = plus.downloader.createDownload(downloadApkUrl); // POST请求提交数据
			dtask.start();
			dtask.addEventListener('statechanged', async function(task, status) {
				switch (task.state) {
					case undefined: //下载任务未开始
					case 0: //下载任务开始调度
					case 1: //下载任务开始请求
					case 2:
						break; //下载任务请求已经接收
					case 3: // 已接收到数据
					    self.text='下载中!'
					    self.progress=Math.round((task.downloadedSize / task.totalSize) * 100)
						break;
					case 4: // 下载完成
						self.text='下载完成!'
						self.progress=100
						plus.runtime.install(
							plus.io.convertLocalFileSystemURL(task.filename),{force: true},() => {
								uni.showToast({
									icon: 'none',
									title: '安装成功！'
								});
							},
							e => {
								uni.showToast({
									icon: 'none',
									title: '安装失败！'
								});
								uni.navigateTo({
									url: '../login/login',
								});
							}
						);
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: '下载失败，退出请重试！'
						});
						uni.navigateTo({
							url: '../login/login',
						});
						break;
				}
			});
		}
	}
};
</script>

<style>
.mark {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.view {
	width: 80vw;
	height: 70vw;
	background-color: white;
	border-radius: 15rpx;
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: center;
}

.title {
	margin-top: 20rpx;
	color: #09a0f7;
	font-weight: bold;
	font-size: 38rpx;
	text-align: center;
}

.tip {
	margin-top: 20rpx;
	margin-left: 30rpx;
	align-self: flex-start;
	font-size: 32rpx;
	font-weight: 600;
	color: black;
}

.scroll {
	width: 100%;
	height: 100rpx;
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.item {
	margin-left: 50rpx;
	text-align: left;
	font-size: 30rpx;
}

.btns {
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	font-weight: bold;
}

.iconfont {
	font-size: 60rpx;
	margin-right: 10rpx;
	color: #09a0f7;
}

.sure {
	padding: 10rpx 0;
	text-align: center;
	color: #09a0f7;
	font-size: 30rpx;
	font-weight: 500;
}

.progress {
	margin-bottom: 40rpx;
}
</style>
