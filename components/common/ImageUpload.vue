<template>
	<view>
		<view class="uni-uploader__files">
			<view v-if="imgurl != '' || dataImgUrl != ''" class="uni-uploader__file">
				<image class="uni-uploader__img" :src="imgurl || dataImgUrl" :data-src="imgurl || dataImgUrl" @tap.stop="previewImage"></image>
				<view class="deleteWarp" v-show="!showDelet"><view @tap="deleteImg" :data-id="fjid || dataUploadID">
				<view class="iconfont font-weight" style="color: red;">&#xe613;</view>
				</view></view>
			</view>
			<view v-show="imgurl === '' && dataImgUrl === ''" class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage"></view></view>
		</view>
	</view>
</template>

<script>
import permision from '@/common/util/permission.js';
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
export default {
	props: {
		dataUploadID: {
			type: String,
			default: ''
		},
		showDelet: {
			type: Boolean,
			default: false
		},
		imageUploadUrl: {
			type: String,
			default: ''
		},
		UploadType: {
			type: String,
			default: ''
		},
		dataImgUrl: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			fjid: '',
			imgurl: '',
			title: 'choose/previewImage',
			sourceTypeIndex: 2,
			sizeTypeIndex: 2,
			countIndex: 0,
			count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
	},
	methods: {
		chooseImage: async function() {
			let self=this
			// #ifdef APP-PLUS
			// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			if (this.sourceTypeIndex !== 2) {
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
			}
			// #endif
			if (this.imgurl != '') {
				this.imgurl = '';
			}
			uni.chooseImage({
				sourceType: ['camera', 'album'],
				sizeType: ['compressed', 'original'],
				count: 1,
				success: res => {
					this.imgurl = res.tempFiles[0].path;
					const tempFilePaths = res.tempFilePaths;
					uni.getStorage({
						key: 'userId',
						success: function(res) {
							console.log(res)
							uni.uploadFile({
								url: self.imageUploadUrl,
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									currentUserId: res.data
								},
								success: uploadFileRes => {
									var attch = JSON.parse(uploadFileRes.data);
									const attachId = attch.data.attachId;
									self.fjid = attachId;
									self.$emit('success', { type: self.UploadType, id: attachId });
								}
							});
						}
					});
				},
				fail: err => {
					// #ifdef APP-PLUS
					if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
						this.checkPermission(err.code);
					}
					// #endif
					// #ifdef MP
					uni.getSetting({
						success: res => {
							let authStatus = false;
							switch (this.sourceTypeIndex) {
								case 0:
									authStatus = res.authSetting['scope.camera'];
									break;
								case 1:
									authStatus = res.authSetting['scope.album'];
									break;
								case 2:
									authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
									break;
								default:
									break;
							}
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
					// #endif
				}
			});
		},
		/* isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '已经有9张图片了,是否清空现有图片？',
					success: e => {
						if (e.confirm) {
							this.imgurl = '';
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		}, */
		deleteImg: function(e) {
			const attachId = e.currentTarget.dataset.id;
			this.imgurl = '';
			this.dataImgUrl = '';
			this.$emit('deleteImage', { type: this.UploadType, id: attachId });
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			var imgdata = [];
			if (this.imgurl != '') {
				return imgdata.push(this.imgurl);
			} else {
				imgdata.push(this.dataImgUrl);
			}
			uni.previewImage({
				current: current,
				urls: imgdata
			});
		},
		async checkPermission(code) {
			let type = code ? code - 1 : this.sourceTypeIndex;
			let status = permision.isIOS
				? await permision.requestIOS(sourceType[type][0])
				: await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' : 'android.permission.READ_EXTERNAL_STORAGE');

			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: '没有开启权限',
					confirmText: '设置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				});
			}

			return status;
		}
	}
};
</script>

<style>
.cell-pd {
	padding: 22upx 30upx;
}

.list-pd {
	margin-top: 50upx;
}
.uni-uploader__file {
	position: relative;
}
.deleteWarp {
	width: calc(100% - 10rpx);
	height: 50rpx;
	background: #9e9e9e5e;
	position: absolute;
	top: 0;
	left: 0;
	text-align: right;
	padding-right: 10rpx;
}
</style>
