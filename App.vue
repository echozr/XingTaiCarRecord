<script>
	export default {
		onLaunch: function() {
			const version = 102;
			uni.getSystemInfo({
				success: res => {
					//检测当前平台，如果是安卓则启动安卓更新
					if (res.platform == 'android') {
						this.AndroidCheckUpdate(version);
					 }
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			/**
			 * 安卓应用的检测更新实现
			 */
			AndroidCheckUpdate: function(version) {
				debugger
				var _this = this;
				this.$http
					.post('/AppReplaceController/selectFenJuList.do', {
						versionNumber: version
					})
					.then(resMz => {
						var server_version = resMz.data.versionNumber;
						var currTimeStamp = resMz.data.timeStamp;
						uni.setStorage({
							key: 'DownLoadUrl',
							data: resMz.data.url,
							success: function() {
								console.log('DownLoadUrl-success');
							}
						});
						// 判断缓存时间
						uni.getStorage({
							key: 'tip_version_update_time',
							success: function(res) {
								var lastTimeStamp = res.data;
								//定义提醒的时间间隔，避免烦人的一直提示，一个小时：3600；一天：86400
								var tipTimeLength = 3600;
								if (lastTimeStamp + tipTimeLength > currTimeStamp) {
									//避免多次提醒，不要更新
									console.log('避免多次提醒，不要更新');
								} else {
									//重新设置时间戳
									_this.setStorageForAppVersion(currTimeStamp);
									//进行版本型号的比对 以及下载更新请求
									_this.checkVersionToLoadUpdate(server_version, version);
								}
							},
							fail: function(res) {
								_this.setStorageForAppVersion(currTimeStamp);
								//进行版本型号的比对 以及下载更新请求
								_this.checkVersionToLoadUpdate(server_version, version);
							}
						});
					})
					.catch(msg => {
						uni.showToast({
							icon: 'none',
							title: msg
						});
					});
			},
			/**
			 * //设置应用版本号对应的缓存信息
			 * @param {Object} currTimeStamp 当前获取的时间戳
			 */
			setStorageForAppVersion: function(currTimeStamp) {
				uni.setStorage({
					key: 'tip_version_update_time',
					data: currTimeStamp
				});
			},
			/**
			 * 进行版本型号的比对 以及下载更新请求
			 * @param {Object} server_version 服务器最新 应用版本号
			 * @param {Object} curr_version 当前应用版本号
			 */
			checkVersionToLoadUpdate: function(server_version, curr_version) {
				if (server_version > curr_version) {
					//TODO 此处判断是否为 WIFI连接状态
					if (plus.networkinfo.getCurrentType() != 3) {
						uni.showToast({
							title: '有新的版本发布，检测到您目前非Wifi连接，程序已停止自动更新，将在您连接WIFI之后重新检测更新',
							mask: true,
							duration: 5000,
							icon: 'none'
						});
						return;
					} else {
						uni.navigateTo({
							url: '/pages/uploadPage/uploadPage',
						});
					}
				}
			}
		}
	}
</script>

<style>
	/* 公用样式库 */
	@import './common/css/uni.css';
	@import './common/css/animate.css';
	@import './common/css/iconfont.css';
	@import './common/css/zr-mine-ui.css';
	@import './common/css/common.css';
</style>
