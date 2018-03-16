import Oxios from "axios"

const axios = Oxios.create({timeout: 10000})
const _ = console.log
const threshold = 1000
const site = "http://hahuyetapcao.com/"

let count = 0
let wait = Promise.resolve()

const call = async () => {
  _("[count]", count)

  try{
    await axios.get(site)
    _("[call] success")
  }catch(err){
    _("[call] fail")
  }finally {
    count--
  }
}

const loop = () => {
  do{
    count++
    const waitCall = call()
    wait = wait.then(() => waitCall)
  }while(count < threshold)
  loop()
}


(async() => {
  loop()
  await wait
})()