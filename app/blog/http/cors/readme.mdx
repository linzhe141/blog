# CORS[跨域资源共享] & OPTIONS

### CORS[跨域资源共享]

是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其他源（域、协议或端口）
`浏览器限制脚本内发起的跨源 HTTP 请求`，一般来说就考虑js引起的跨域，当然其他情况也会发生cors

> 比如`Web 字体（CSS 中通过 @font-face 使用跨源字体资源）`来源于MDN

如果在a源下访问b源，如果这两者的协议、`域名(包括子域名)`、端口有任何一个不一样，那么浏览器就认为这是跨域请求，如果后端有处理，则可以cors

比如这样：我在`https:goole.com`的控制台中，通过fetch访问`fetch('https://myaccount.google.com')`他的子域名，这同样是一个cors请求，并且`https://myaccount.google.com`不允许cors

![Image](https://github.com/user-attachments/assets/2b62109e-5bf0-457a-a0d2-4c92fd352f34)

### OPTIONS

CORS 预检请求用于检查服务器是否支持 CORS 协议，并且是否允许使用特定的方法和标头。当进行cors访问时，浏览器会对一些`非简单请求`自动发送一个options请求

它一般是用了以下几个 HTTP 请求标头的 OPTIONS 请求：Access-Control-Request-Method 和 Access-Control-Request-Headers，以及可选的 Origin 标头。

![Image](https://github.com/user-attachments/assets/9cf57bd4-24da-4a9f-9ed0-5b2acf39078e)

当options的响应头反馈能够继续的时候，真正的请求才会成功的响应，既允许cors，当然这个请求本身还得支持cors

```js
app.options('/{*any}', (req, res) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
  const allowedHeaders = ['Content-Type', 'Authorization', 'fx']
  res.header('Access-Control-Allow-Headers', /* allowedHeaders.join(',') */ '*')
  const origin = req.headers.origin // 发起请求的源{协议+域名+端口}

  // 判断请求的 Origin 是否在允许的列表中
  res.header('Access-Control-Allow-Origin', '*')

  // 设置允许的请求方法
  res.header('Access-Control-Allow-Methods', allowedMethods.join(','))
  // 允许浏览器缓存 OPTIONS 请求的响应, 这不同于http缓存（强缓存和协商缓存）
  // 当过期前，浏览器都不会自动发送options请求了
  res.header('Access-Control-Max-Age', 0)
  return res.sendStatus(200)
})

// 即使对options的响应头进行了设置，那么还是得对真正的请求也进行cors设置
// 但如果只对真正的请求进行了cors设置，没有对options进行设置，这么也会导致发生跨域错误
app.put('/foo', cors(), (req, res) => {
  res.send('Hello World!')
})``
```

### 反向代理

这也是一种方案用于解决cors，本质是通过服务器去访问领一个源的请求，从而避免了cors，因为cors只在浏览器才会发生，如果是服务器去访问另一个服务器的请求是能够正常访问的，不存在cors

```js filename=vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```
