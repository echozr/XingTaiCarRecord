<template>
	<view>
		<!-- 顶部内容 -->
		<view class="text-muted font-md d-flex flex-row a-center j-center tab_hd">
			<view class="span-5 text-center">工地名称</view>
			<view class="span-5 text-center">建设地点</view>
			<view class="span-5 text-center">环评文号</view>
			<view class="span-5 text-center">建设单位</view>
		</view>
		<view class="tab_warp">
			<view v-if="VehicleList.length>0">
				<view v-for="(item, index) in VehicleList" :key="index" style="background: #ffffff;" class="mx-2 mt-2 mb-1 bg-white rounded d-flex flex-column a-center j-center">
					<view class="d-flex flex-row a-center j-center w-100 py-2 tr_hd">
						<view class="span-5 text-center ellipsis">{{ item.mechanicsTypeName }}</view>
						<view class="span-5 text-center ellipsis">{{ item.carbrand }}</view>
						<view class="span-5 text-center ellipsis">{{ item.cartype }}</view>
						<view class="span-5 text-center ellipsis">{{ item.shenheStateName }}</view>
					</view>
					<view class=" d-flex flex-row a-center w-100 py-2 ">
						<text class="ml-2">进场时间：</text>
						<view>{{item.startTime}}</view>
					</view>
					<view class=" d-flex flex-row a-center w-100 py-2 ">
						<text class="ml-2">进场时间：</text>
						<view>{{item.endTime}}</view>
						<view v-if="item.endTime===''" class=" ml-auto mr-2 border mine-border-color mine-text-color" style="border-radius: 50rpx; padding: 5rpx 30rpx;"
						 @tap="leave(index)"> 出场 </view>
					</view>
				</view>
			</view>
			<view v-else class="mx-2 py-3 mt-2 mb-1 bg-white rounded d-flex flex-column a-center j-center" style="background: #ffffff;">
				<view class="text-light-muted">暂无数据</view>
			</view>
			<view @tap="NewInfo"><text hover-class="mine-bg-hover-color" class="iconfont add">&#xe600;</text></view>
		</view>

	<uni-popup ref="dialogInput" type="dialog" @change="change">
		<uni-popup-dialog mode="content" duration="2000" :before-close="true" title=" 是否进入该工地" @confirm="confirm">
			<view slot="content">
				<view class="d-flex flex-row a-center j-start">
					<text>工地名称：</text>
					<view>石化园区2</view>
				</view>
				<view class="d-flex flex-row a-center j-start">
					<text>建设地址：</text>
					<view>邢台市桥西区XX路12号</view>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
	</view>
</template>
<!-- 提示框 -->

<script>
	import {
		getNow
	} from '../../common/util/util.js'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				show: false,
				VehicleList: [{
					mechanicsTypeName: "石化园区1",
					carbrand: "邢台市城",
					cartype: "HP0101",
					shenheStateName: "中建第二分局",
					startTime: "2020年8月12日 15:20",
					endTime: "2020年8月14日 15:20"
				}],
			}
		},
		onShow() {

		},

		methods: {
			//点击扫码
			NewInfo() {
				const _this = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						const code = res.result
						_this.getGDInfoById(code)

					}
				});
			},
			//获取机械进出场记录
			getJXIntoRecording(id) {
				this.$http.post('/VehicleInfo/selectVehicleList.do', {
					CheZhuPhone: id
				}).then(data => {
					this.VehicleList = data.data;
				}).catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
			},
			// 根基ID 获取工地信息
			getGDInfoById(id) {
				const _this = this
				// this.$http.post('/VehicleInfo/selectVehicleList.do',{
				// 	id:id
				// }).then(data=>{
				// 	const params={
				// 		mechanicsTypeName:"石化园区2",
				// 		carbrand:"邢台市城2",
				// 		cartype:"HP0102",
				// 		shenheStateName:"中建第三分局",
				// 		startTime:getNow(),
				// 		endTime:''
				// 	}
				// 	_this.VehicleList.push(params)

				// }).catch(msg => {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: msg
				// 	});
				// });		
				_this.$refs.dialogInput.open().open()
			
			},
			// 点击出厂
			leave(index) {
				this.VehicleList[index].endTime = getNow()
			},
			close(done) {
				done()
			},
			confirm(done, value) {
				console.log(123214)
				const params = {
					mechanicsTypeName: "石化园区2",
					carbrand: "邢台市城2",
					cartype: "HP0102",
					shenheStateName: "中建第三分局",
					startTime: getNow(),
					endTime: ''
				}
				this.VehicleList.push(params)
				done()
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
		font-size: 120rpx;
		color: rgba(43, 150, 255, 1);
		box-shadow: 0upx 10upx 15upx 0upx rgba(43, 150, 255, 0.47);
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
		background: #fff;
		/* 
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

	.tuct {
		color: #ffc107;
		border: 1px solid #ffc107;
	}

	.tuct-color {
		background: rgba(255, 193, 7, 0.2);
	}
</style>
