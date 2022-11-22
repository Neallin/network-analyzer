# network-detector

> 网络问题检测

### [Demo](https://neallin.github.io/network-analyzer/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```



## 代码说明

修改 src/config.js 的配置，修改成业务方的CDN资源。
```javascript
export default {
  // 白板接口地址
  WhiteBoardApi: 'https://tiw.tencentcloudapi.com',

  // 腾讯云CDN地址
  QcloudCDN: 'https://demo.qcloudtiw.com/web/latest/index.html',

  // 下载 - 用于下行带宽测速
  DownloadBandwidth: 'https://demo.qcloudtiw.com/android/TICDemo.zip',

  // 上传接口 - 用于上行带宽测速
  // 如何部署上传接口：https://docs.qq.com/doc/DS1RpQXhIZGhVc3hy
  UploadBandwidth: 'https://uploader-1255343111.cos.ap-nanjing.myqcloud.com/test.png'
}
```

#### 上传接口可以自行实现，也可以参考这里的指引使用COS提供的上传服务。
https://docs.qq.com/doc/DS1RpQXhIZGhVc3hy
