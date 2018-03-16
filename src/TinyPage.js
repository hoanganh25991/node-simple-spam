import puppeteer from "puppeteer"

const openDefaultPage = async browser => await browser.newPage()

const config = {
  timeout: 30000,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
}

let browser = null
let firstRun = true
let browserPromise = null
const initBrowser = mergedOption => {
  if (!firstRun && browserPromise) return browserPromise
  firstRun = false
  return (browserPromise = puppeteer.launch(mergedOption))
}

/**
 * Create tiny page
 * @param option
 * @returns {Promise.<*>}
 * @constructor
 */
export const TinyPage = async (option = {}) => {
  const mergedOption = { ...config, ...option }
  if (!browser) browser = await initBrowser(mergedOption)
  return await browser.newPage()
}

TinyPage.closeBrowser = async () => {
  if (browser) await browser.close()
  browser = null
}

export default TinyPage
