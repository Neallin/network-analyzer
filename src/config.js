export default {
  // 白板接口地址
  WhiteBoardApi: 'https://tiw.tencentcloudapi.com',

  // CDN地址，支持多个
  CDN: [
    'https://demo.qcloudtiw.com/web/latest/index.html',
    'https://demo.qcloudtiw.com/web/latest/ind2ex.html?v=2'
  ],

  // 下载 - 用于下行带宽测速
  DownloadBandwidth: 'https://demo.qcloudtiw.com/android/TICDemo.zip',

  // 上传接口 - 用于上行带宽测速
  // 如何部署上传接口：https://docs.qq.com/doc/DS1RpQXhIZGhVc3hy
  UploadBandwidth: 'https://uploader-1255343111.cos.ap-nanjing.myqcloud.com/test.png'
}
