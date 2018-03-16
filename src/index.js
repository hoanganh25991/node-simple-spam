import Oxios from "axios"
import cpr from "child_process"
import {TinyPage} from "./TinyPage";

const axios = Oxios.create({timeout: 10000})
const _ = console.log
const threshold = 10
const site = "http://hahuyetapcao.com/"

let count = 0
let wait = Promise.resolve()

const call = async () => {
  _("[count]", count)

  try{
    // await axios.get(site)
    // const wget = `aria2c -d /dev -o null --allow-overwrite=true --file-allocation=none --max-connection-per-server=4 ${site}`
    // await new Promise((resolve, reject) => {
    //   cpr.exec(wget, err => {
    //     if(err) return reject()
    //     resolve()
    //   })
    // })
    const page = await TinyPage()
    await page.goto(site)
    await page.screenshot({path: "example.png"})
    _("[call] success")
  }catch(err){
    _("[call] fail")
  }finally {
    count--
    setTimeout(loop, 300)
  }
}

const loop = () => {
  while(count < threshold){
    count++
    const waitCall = call()
    wait = wait.then(() => waitCall)
  }
}

(async() => {
  loop()
  await wait
  await TinyPage.closeBrowser()
})()