<template>
  <div class="detector">
    <div id="capture">
      <section v-for="(category, index) in categories" :key="index" class="card" >
        <div class="title">
          <h1>{{ category.label }}</h1>
        </div>
        <div class="content">
          <div v-for="item in list.filter( item => { return item.category === category.name })" :key="item.name" class="detect-item">
            <div class="item">{{ item.label }}</div>
            <div v-html="item.result || '检测中'" class="result"></div>
          </div>
        </div>
      </section>
    </div>
    <div class="control">
      <button v-if="clipable" class="btn capture" @click="capture(false)">截图至剪切板</button>
      <button class="btn capture" @click="capture(true)">截图并下载</button>
    </div>
  </div>
</template>
<script>
import utils from './utils'
import Config from './config'
import html2canvas from 'html2canvas'
import moment from 'moment'
export default {
  name: 'Detector',
  data () {
    return {
      clipable: typeof ClipboardItem !== 'undefined',
      categories: [
        {
          name: 'basic',
          label: '基础信息'
        },
        {
          name: 'network',
          label: '网络信息'
        },
        {
          name: 'netspeed',
          label: '网速信息'
        }
      ],
      list: [
        {
          name: 'useragent',
          label: '用户代理',
          category: 'basic',
          result: navigator.userAgent
        },
        {
          name: 'system',
          label: '操作系统',
          category: 'basic',
          result: utils.getOS()
        },
        {
          name: 'ip',
          label: '客户端IP',
          category: 'basic',
          result: ''
        },
        {
          name: 'localDNS',
          label: 'localDNS',
          category: 'basic',
          result: ''
        },
        {
          name: 'time',
          label: '客户端时间',
          category: 'basic',
          result: moment().format('YYYY/MM/DD HH:mm:ss')
        },
        {
          name: 'whiteboardAPI',
          label: '互动白板接口耗时',
          category: 'network',
          result: ''
        },
        {
          name: 'qcloudCDN',
          label: '腾讯云CDN',
          category: 'network',
          result: ''
        },
        {
          name: 'uploadNetSpeed',
          label: '上行带宽',
          category: 'netspeed',
          result: ''
        },
        {
          name: 'downloadNetSpeed',
          label: '下行带宽',
          category: 'netspeed',
          result: ''
        }
      ]
    }
  },
  mounted () {
    this.detect()
  },
  methods: {
    detect () {
      this.getLocalDNS()

      this.whiteBoardAPI()

      this.qcloudCDN()

      this.bandwidth()
    },

    setResult (key, val) {
      const item = this.list.find(item => item.name === key)
      if (item) {
        item.result = val
      } else {
        console.error(`key : [${key}] not exist`)
      }
    },

    whiteBoardAPI () {
      const url = Config.WhiteBoardApi
      utils.loadScript(url, (time) => {
        this.setResult('whiteboardAPI', `${parseInt(time)}ms`)
      }, () => {
        this.setResult('whiteboardAPI', '<span class="red">请求失败</span>')
      })
    },

    qcloudCDN () {
      const url = Config.QcloudCDN
      utils.loadScript(url, (time) => {
        this.setResult('qcloudCDN', `${parseInt(time)}ms`)
      }, () => {
        this.setResult('qcloudCDN', '<span class="red">请求失败</span>')
      })
    },

    getLocalDNS () {
      utils.getLocalDNS((err, data) => {
        if (err) {
          this.setResult('ip', '<span class="red">请求失败</span>')
          this.setResult('localDNS', '<span class="red">请求失败</span>')
        } else {
          this.setResult('localDNS', data.content.ldns)
          this.setResult('ip', data.content.localIp)
        }
      })
    },

    bandwidth () {
      utils.downloadBandwidth(Config.DownloadBandwidth, (speed, unit) => {
        console.log('DownloadBandwidth => ', speed)
        this.setResult('downloadNetSpeed', `${parseInt(speed)} ${unit}`)
      }, (err) => {
        console.error('error', err)
      })

      utils.uploadBandwidth(Config.UploadBandwidth, (speed, unit) => {
        console.log('UploadBandwidth => ', speed)
        this.setResult('uploadNetSpeed', `${parseInt(speed)} ${unit}`)
      }, (err) => {
        console.error('error', err)
      })
    },

    capture (download = false) {
      html2canvas(document.querySelector('#capture')).then((canvas) => {
        // document.body.appendChild(canvas)
        if (download || typeof ClipboardItem === 'undefined') {
          const now = moment().format('YYYYMMDD_HHmmss')
          const link = document.createElement('a')
          link.download = `network-anylyzer-${now}.png`
          link.href = canvas.toDataURL()
          link.click()
        } else {
          canvas.toBlob((blob) => {
            const item = new ClipboardItem({ 'image/png': blob })
            navigator.clipboard.write([item])
            this.$toast.open({
              type: 'info',
              message: '已经复制到剪切板',
              position: 'top'
            })
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
  width: 80%;
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  overflow: hidden;
  font-family: 'Microsoft YaHei UI Light';
}
.title {
  background: rgba(42, 38, 94, 1);
  color: #fff;
  padding: 0 30px;
  display: flex;
  align-items: center;
}
.title h1 {
  font-size: 16px;
}
.content {
  flex: 1;
  border: 1px solid rgba(42, 38, 94, 0.4);
  border-left: 0;
  font-size: 13px;
  padding: 20px 0;
}
.detect-item{
  display: flex;
  color: rgba(42, 38, 94, 1);
  padding: 5px 20px;
}
.item {
  word-break: keep-all;
  padding-right: 10px;
  font-weight: bold;
  min-width: 80px;
}
.result {

}
.red {
  color: red;
}

#capture {
  padding: 20px;
}

.control {
  text-align: center;
}
.btn {
  opacity: .85;
  background: rgba(42, 38, 94, 1);
  color: #fff;
  padding: 10px 20px;
  border: 0;
}

.btn:hover{
  opacity: 0.9;
}
.btn:active{
  opacity: 1;
}

@media only screen and (max-width: 600px) {
  .card {
    flex-direction: column;
    width: 100%;
  }
  .detect-item {
    flex-direction: column;
  }
  .detect-item .item {
    padding-bottom: 5px;
  }
  .content {
    border-left: 1px solid rgba(42, 38, 94, 0.4);
    padding: 10px 0;
  }
}
</style>
