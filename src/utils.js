import jsonp from 'jsonp'
function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getLocalDNS (cb) {
  const uuid = guid()
  const url = `https://${uuid}.dns-detect.alicdn.com/api/detect/DescribeDNSLookup`
  return jsonp(url, {
    param: 'cb',
    prefix: 'jsonp'
  }, cb)
}

function loadScript (src, succ, fail) {
  const script = document.createElement('script')
  const startTime = performance.now()
  script.src = src
  script.onerror = function (err) {
    fail(err)
  }
  script.onload = function () {
    const endTime = performance.now()
    succ(endTime - startTime)
  }
  document.body.append(script)
}

function getOS () {
  if (navigator.userAgentData && navigator.userAgentData.platform) {
    return navigator.userAgentData.platform
  }
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

function addRandom (url) {
  if (url.includes('?')) {
    url += '&_t=' + (new Date()).getTime()
  } else {
    url += '?_t=' + (new Date()).getTime()
  }
  return url
}

function downloadBandwidth (url, success, fail) {
  let startTime, endTime, fileSize
  const xhr = new XMLHttpRequest()
  url = addRandom(url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        endTime = (new Date()).getTime()
        fileSize = xhr.responseText.length
        // Calculate the connection-speed
        const speed = fileSize / ((endTime - startTime) / 1000) / 1024
        const unit = 'kbps'
        success(speed, unit)
      } else {
        fail(xhr)
      }
    }
  }
  startTime = (new Date()).getTime()

  // All set, let's hit it!
  xhr.open('GET', url, true)
  xhr.send()
}

function createTestFile (callback) {
  const canvas = document.createElement('canvas')
  const height = 10240
  const width = 10240
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#090'
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  ctx.stroke()

  canvas.toBlob((blob) => {
    const reader = new FileReader()

    reader.onload = () => {
      callback(reader.result)
    }
    reader.readAsBinaryString(blob)
  })
}

function uploadBandwidth (url, success, fail) {
  createTestFile((content) => {
    let startTime, endTime, fileSize
    const xhr = new XMLHttpRequest()
    url = addRandom(url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          endTime = (new Date()).getTime()
          fileSize = content.length
          // Calculate the connection-speed
          const speed = fileSize / ((endTime - startTime) / 1000) / 1024
          const unit = 'kbps'
          success(speed, unit)
        } else {
          fail(xhr)
        }
      }
    }
    startTime = (new Date()).getTime()
    xhr.open('PUT', url, true)
    xhr.send(content)
  })
}

export default {
  getLocalDNS,
  getOS,
  loadScript,
  downloadBandwidth,
  uploadBandwidth
}
