<template>
	<view>
		<!-- 顶部内容 -->
		<view class="text-muted font-md d-flex flex-row a-center j-center tab_hd">
			<!-- 	<view class="span-4 text-center">车主姓名</view> -->
			<view class="span-5 text-center">机械类型</view>
			<view class="span-5 text-center">机械品牌</view>
			<view class="span-5 text-center">机械型号</view>
			<view class="span-5 text-center">提交状态</view>
		</view>
		<view class="tab_warp">
			<view v-if="showItem">
				<view v-for="(item, index) in VehicleList" :key="index" style="background: #ffffff;" class="mx-2 mt-2 mb-1 bg-white rounded d-flex flex-column a-center j-center">
					<view class="d-flex flex-row a-center j-center w-100 py-2 tr_hd">
						<!-- 	<view class="span-4 text-center ellipsis">{{ item.carCode }}</view> -->
						<view class="span-5 text-center ellipsis">{{ item.mechanicsTypeName }}</view>
						<view class="span-5 text-center ellipsis">{{ item.carbrand }}</view>
						<view class="span-5 text-center ellipsis">{{ item.cartype }}</view>
						<view class="span-5 text-center ellipsis" :style="{ color: setColot(item.shenheStateName) }">{{ item.shenheStateName }}</view>
					</view>
					<view class=" d-flex flex-row a-center w-100 py-2  j-end">
						<view
							v-show="setShow(item.shenheStateName)"
							class="mr-2 border mine-border-color mine-text-color ml-auto"
							hover-class="mine-bg-hover-color"
							style="border-radius: 50rpx; padding: 5rpx 30rpx;"
							@tap="togglePopup(item.vehicleInfoId)"
						>
							信息采集卡
						</view>
						<view
							v-show="!setShow(item.shenheStateName)"
							class=" mr-2 border  mine-text-color "
							hover-class="mine-bg-hover-color"
							style="border-radius: 50rpx; padding: 5rpx 30rpx; color: red; border-color: red;"
							@tap="deleteInfo(item.vehicleInfoId)"
						>
							删除
						</view>
						<view
							class=" mr-2 border mine-border-color mine-text-color "
							hover-class="mine-bg-hover-color"
							style="border-radius: 50rpx; padding: 5rpx 30rpx;"
							@tap="showInfo(item)"
						>
							查看
						</view>
					</view>
				</view>
			</view>
			<view v-else class="mx-2 py-3 mt-2 mb-1 bg-white rounded d-flex flex-column a-center j-center" style="background: #ffffff;">
				<view class="text-light-muted">暂无数据</view>
			</view>
			<view class="add" hover-class="mine-bg-hover-color" @tap="NewInfo"><text class="iconfont icon-tianjiajiahaowubiankuang"></text></view>
		</view>

		<uni-popup ref="image" :custom="true" :mask-click="true">
			<view class="uni-image">
				<view class="uni-image-close" @click="cancel('image')"><uni-icon type="clear" color="#fff" size="10" /></view>
				<view class="img-warp">
					<image mode="widthFix" :src="srcImg1"></image>
					<image mode="widthFix" :src="srcImg2"></image>
					<view class="carCodeImg"><image :src="carCodeImg"></image></view>
					<view class="carCodeNum">{{ carCodeNumber }}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action';
export default {
	components: {
		uniPopup,
		uniSwipeAction
	},
	data() {
		return {
			userId:"",
			index: 0,
			type: 'image',
			VehicleList: [],
			srcImg1: '../../static/images/xxcjk_zm1.png',
			srcImg2: '../../static/images/xxcjk_fm1.png',
			showItem: true,
			carCodeImg: '',
			carCodeNumber: '',
			options: [
				{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	onShow() {
		const self = this;
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				self.userId=res.data
				self.getVehicleList(res.data);
			},
			fail: function() {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		});
	},
	/*退出*/
	onNavigationBarButtonTap() {
		this.$http
			.post('/CheZhuUser/logout.do')
			.then(data => {
				uni.navigateTo({
					url: '../login/login'
				});
			})
			.catch(msg => {
				uni.showToast({
					icon: 'none',
					title: msg
				});
			});
	},
	methods: {
		setColot(item) {
			var text = '';
			/* 填报中，待审核，退回，制卡中，已制卡、审核中 */
			switch (item) {
				case '填报中':
					text = '#f39734';
					break;
				case '待审核':
					text = '#f89509';
					break;
				case '退回':
					text = '#fa614a';
					break;
				case '制卡中':
					text = '#32ba9f';
					break;
				case '已制卡':
					text = '#32ba9f';
					break;
				case '审核中':
					text = ' #69b5fa';
					break;
				default:
					break;
			}
			return text;
		},
		setShow(item) {
			/* 填报中，待审核，退回，制卡中，已制卡、审核中 */
			switch (item) {
				case '填报中':
					this.infoCard = false;
					break;
				case '待审核':
					this.infoCard = false;
					break;
				case '退回重填':
					this.infoCard = false;
					break;
				case '制卡中':
					this.infoCard = true;
					break;
				case '已制卡':
					this.infoCard = true;
					break;
				case '审核中':
					this.infoCard = false;
					break;
				default:
					break;
			}
			return this.infoCard;
		},
		//点击新增
		NewInfo() {
			uni.navigateTo({
				url: '../infoAdd/infoAdd'
			});
		},
		//点击查看
		showInfo(e) {
			uni.setStorage({
				key: 'vehicleId',
				data: e,
				success: function() {
					uni.navigateTo({
						url: '../infoLook/infoLook'
					});
				}
			});
		},
		//获取列表信息
		getVehicleList(chezhuPhone) {
			if (chezhuPhone != '') {
				this.$http
					.post('/VehicleInfo/selectVehicleList.do', { CheZhuPhone: chezhuPhone })
					.then(data => {
						this.VehicleList = data.data;
						if (this.VehicleList.length > 0) {
							this.showItem = true;
						} else {
							this.showItem = false;
						}
					})
					.catch(msg => {
						uni.showToast({
							icon: 'none',
							title: msg
						});
					});
			}
		},
		//点击删除
		deleteInfo(vehicleId) {
			var self = this;
			uni.showModal({
				title: '提示',
				content: '确定要删除该数据！',
				success: function(res) {
					if (res.confirm) {
						self.$http
							.post('/VehicleInfo/deleteVehicleInfoByVehicleId.do', { vehicleId })
							.then(data => {
								uni.showToast({
									icon: 'none',
									title: '删除成功'
								});
								self.getVehicleList(self.userId);
							})
							.catch(msg => {
								uni.showToast({
									icon: 'none',
									title: msg
								});
							});
					} else if (res.cancel) {
					}
				}
			});
		},
		togglePopup(vehicleId) {
			var self = this;
			this.$http
				.post('/VehicleInfo/ShengChengErWeiMa.do', { vehicleId })
				.then(data => {
					var info = data.data;
					var hbCode = info.huanBaoXuHao;
					if (hbCode != '') {
						self.carCodeImg = info.erWeiMafile;
						self.carCodeNumber = hbCode;
						if (/^[1-3]/.test(hbCode)) {
							self.srcImg1 = '../../static/images/xxcjk_zm1.png';
							self.srcImg2 = '../../static/images/xxcjk_fm1.png';
						} else if (/^[4-6]/.test(hbCode)) {
							self.srcImg1 = '../../static/images/xxcjk_zm2.png';
							self.srcImg2 = '../../static/images/xxcjk_fm2.png';
						} else if (/^[D]/.test(hbCode)) {
							self.srcImg1 = '../../static/images/xxcjk_zm3.png';
							self.srcImg2 = '../../static/images/xxcjk_fm3.png';
						} else if (/^[X]/.test(hbCode)) {
							self.srcImg1 = '../../static/images/xxcjk_zm4.png';
							self.srcImg2 = '../../static/images/xxcjk_fm4.png';
						}
						this.$refs['image'].open();
					} else {
						uni.showToast({
							icon: 'none',
							title: '暂未生成信息采集卡'
						});
					}
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		cancel(type) {
			this.$refs['image'].close();
		}
	}
};
</script>

<style>
page {
	background: #e6edf5;
	position: fixed;
}
.tab_hd {
	background: #ffffff;
	padding: 25rpx 20rpx;
	box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(0, 0, 0, 0.1);
	color: #333333;
}

.tab_warp {
	position: absolute;
	top: 90rpx;
	left: 0;
	right: 0;
	bottom: 200rpx;
	overflow-y: auto;
}
.tr_hd {
	border-bottom: 1rpx dashed #d6d6d6;
}
.add {
	width: 110rpx;
	height: 110rpx;
	background: rgba(43, 150, 255, 1);
	box-shadow: 0upx 12upx 13upx 0upx rgba(43, 150, 255, 0.47);
	border-radius: 50%;
	position: fixed;
	bottom: 30rpx;
	left: 50%;
	right: 50%;
	margin-left: -55rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.add text {
	font-size: 60rpx;
	font-weight: bold;
	color: #fff;
}
/* 插屏广告 */
.uni-image {
	position: relative;
	width: 680rpx;
	height: 900rpx;
	height: rpx;
}

.uni-image .img-warp {
	width: 600rpx;
	height: 820rpx;
	background: #fff; /* 
	border-radius: 10px; */
	padding: 40rpx;
}
.uni-image .carCodeImg {
	width: 200rpx;
	height: 200rpx;
	position: absolute;
	background: #ffffff;
	top: 120rpx;
	left: 50%;
	margin-left: -100rpx;
}
.uni-image .carCodeImg image {
	width: 180rpx;
	height: 180rpx;
	margin: 10rpx;
}
.uni-image .carCodeNum {
	font-size: 50rpx;
	color: #1d1d1d;
	position: absolute;
	text-align: center;
	left: 0;
	top: 330rpx;
	width: 100%;
}

.uni-image-close {
	position: absolute;
	right: -30px;
	top: -30px;
	z-index: 2;
}
</style>
