import axios from 'axios'

export default function ajax(url, data = {}, type = "get") {
    // const request = new XMLHttpRequest()
    // request.open(type,url,true)
    // request.onreadystatechange = function () {
    //     if (xhr.readyState == 4) {
    //         let status = xhr.status
    //         if ((status >= 200 && status < 300) || status == 304) {
    //             options.success && options.success(xhr.responseText, xhr.responseXML)
    //         } else {
    //             options.error && options.error(status)
    //         }
    //     }
    // }
    // request.send()
    //算了，传参太几把麻烦了，，，淦，用了axios还不是去拼串
    return new Promise(function (resolve,reject) {
        type = type.toLowerCase()
        let promise = null
        if (type === "get") {
            let dataStr = ""
            Object.keys(data).forEach(key => {
                dataStr += key + "=" + data[key] + "&"
            })
            if (dataStr != "") {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"))
                url = url + "?" + dataStr
            }
            promise = axios.get(url)
        } else if (type === "post") {
            promise = axios.post(url,data)
        } else {
            new Error("type error")
        }
        promise.then(function (response) {
            //成功的回调
            resolve(response.data)  
        }).catch(function (error) {
            //失败的回调
            reject(error)
        })
    })
}