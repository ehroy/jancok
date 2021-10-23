const fetch = require('node-fetch');
const cheerio = require('cheerio');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const puppeteer = require('puppeteer-extra');
const delay = require('delay');
const apikey = 'f3901b89-c518-5cb9-af45-9ee4d724b070'
const date = () => new Date().toLocaleTimeString();
const fs = require('fs-extra');
var figlet = require('figlet');
const randomname = require('node-random-name');
const pass = 'kontol123'
const pin = '112233'
const email = () => new Promise((resolve,reject)=>{
  fetch("https://10minutemail.com",{
    method:"GET",
    
  })
})
const acakserver = () =>{
    let list = [
        'operator-20210910-866-1da02cbb-0294-4aa6-bd37-d2482849a88c',
        'operator-20210909-488-c81ff8b1-5edb-47c7-9f22-8ab3861ce34f',
        'operator-20210910-334-c6c3059b-a14a-4fbe-9e54-3fe5328a7e69'
    ]
    // console.log(list)
    const pilih = list[Math.floor(Math.random() * list.length)];
    return pilih;
}
const getnumber = (server) => new Promise ((resolve, reject)=>{
    
    const params = new URLSearchParams()
    params.append('id_product','product-20210910-834-6c7a72f8-64fd-4203-bc25-4a50604bef53')
    params.append('id_operator',server)

    fetch(`https://wnrstore.com/api/developer/createOrder?secret_key=${apikey}`,{
        method: "POST",
        headers:{
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        },
        body:(params)
    })
    .then(ress =>{
        resolve(ress.json())
    })
    .catch( err=>{
        reject(err)
    })
});
const Message = (phone) => new Promise ((resolve, reject)=>{
    const params = new URLSearchParams()
    params.append('phone_number', phone)

    fetch(`https://wnrstore.com/api/developer/checkNumberStatus?secret_key=${apikey}`,{
        method: "POST",
        headers:{
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        },
        body:(params)
    })
    .then(ress =>{
        resolve(ress.json())
    })
    .catch( err=>{
        reject(err)
    })
});
const Message2 = (phone) => new Promise ((resolve, reject)=>{
  const params = new URLSearchParams()
  params.append('phone_number', phone)

  fetch(`https://wnrstore.com/api/developer/checkNumberStatus?secret_key=${apikey}`,{
      method: "POST",
      headers:{
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      },
      body:(params)
  })
  .then(ress =>{
      resolve(ress.json())
  })
  .catch( err=>{
      reject(err)
  })
});
const ressend = (id) => new Promise ((resolve, reject)=>{
    const params = new URLSearchParams()
    params.append('id', id)

    fetch(`https://wnrstore.com/api/developer/resendOrder?secret_key=${apikey}`,{
        method: "POST",
        headers:{
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        },
        body:(params)
    })
    .then(ress =>{
        resolve(ress.json())
    })
    .catch( err=>{
        reject(err)
    })
});
const cancel = (id) => new Promise ((resolve, reject)=>{
  const params = new URLSearchParams()
  params.append('id', id)

  fetch(`https://wnrstore.com/api/developer/cancelOrder?secret_key=${apikey}`,{
      method: "POST",
      headers:{
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      },
      body:(params)
  })
  .then(ress =>{
      resolve(ress.json())
  })
  .catch( err=>{
      reject(err)
  })
});
const getauth = ()=> new Promise((resolve,reject)=>{
  fetch("https://accounts.bukalapak.com/register",{
    method:"GET",
    headers:{
      'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 7.1.2; G011A Build/N2G48H) 4091202 BLAndroid BLMobile/4091202',
      'Bukalapak-App-Version': '4091202',
      'X-Device-Ad-Id': '8949a4dd-aa33-447b-82ab-2a8723da3c8f'
    }
  })
  .then( async ress=>{
    const $ = cheerio.load(await ress.text())
    const cookie = ress.headers.raw()['set-cookie'];
    const headers = ress.headers.raw()
    const result = {
      headers : headers,
      cookie : cookie,
      authorize : $('meta[name=csrf-token]').attr("content")
    }
    resolve(result)
  })
  .catch(err=>{
    reject(err)
  })
});

const get_regist_sms = (identi, identi1, cookieidenti, browser_id, session, bebe, email, authenticity)=> new Promise((resolve,reject)=>{
  fetch("https://accounts.bukalapak.com/register",{
    method:"POST",
    headers:{
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'bukalapak-identity': `${identi}`,
      'bukalapak-otp-device-id': `${identi1}`,
      'bukalapak-otp-method': 'sms',
      'content-length': '209',
      'content-type': 'application/json',
      'cookie': `${cookieidenti}; ${browser_id}; ${session}; _gcl_au=1.1.1907857496.1629531744; __asc=b259899517b67a928e15dd62ba5; __auc=b259899517b67a928e15dd62ba5; _ga=GA1.2.1602511861.1629531744; _gid=GA1.2.33248540.1629531745; _fbp=fb.1.1629531744982.547853850; cto_bundle=4C8NaF9hakdEdThtZWxkQ3B2UzJlNnU1dDd4bnZjb3pyU3ZMOElrSTd1UGVuTjJDSGlSJTJCcGo2VnJpTEhEOW5NTFBJWmVLSHdzWVU2bkJxZW5iY3ZRMXFYNmZrZUJ2TkZCSlBacGhUVHd6aWZRMGJoRFFDR1JHR0MyUVRLMWFsbE1mJTJGT3U; _gat_UA-12425854-1=1; _ga_R2T40V5QM5=GS1.1.1629531744.1.0.1629531747.57; G_ENABLED_IDPS=google; ${bebe}`,
      'origin': 'https://accounts.bukalapak.com',
      'referer': 'https://accounts.bukalapak.com/register?comeback=https%3A%2F%2Fwww.bukalapak.com%2F&from=nav_header',
      'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    },
    body: JSON.stringify({"access_token":"12n9yzQKGbP7yccftqZPlfa8rTxNAoh_dIoDD6KTMJiX6Q","user":{"phone":email},"authenticity_token":`${authenticity}`})
  })
  .then(res => res.json())
  .then(ress=>{
    resolve(ress)
  })
  .catch(err=>{
    reject(err)
  })
});
const get_regist_Otp_sms = (identi, identi1, kode_otp,cookieidenti, browser_id, session, bebe, email, authenticity)=> new Promise((resolve,reject)=>{
  fetch("https://accounts.bukalapak.com/register",{
    method:"POST",
    headers:{
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'bukalapak-email-token': kode_otp,
      'bukalapak-identity': `${identi}`,
      'bukalapak-otp': kode_otp,
      'bukalapak-otp-device-id': `${identi1}`,
      'bukalapak-otp-method': 'sms',
      'bukalapak-phone-token' : kode_otp,
      'content-length': '209',
      'content-type': 'application/json',
      'cookie': `${cookieidenti}; ${browser_id}; ${session}; _gcl_au=1.1.1907857496.1629531744; __asc=b259899517b67a928e15dd62ba5; __auc=b259899517b67a928e15dd62ba5; _ga=GA1.2.1602511861.1629531744; _gid=GA1.2.33248540.1629531745; _fbp=fb.1.1629531744982.547853850; cto_bundle=4C8NaF9hakdEdThtZWxkQ3B2UzJlNnU1dDd4bnZjb3pyU3ZMOElrSTd1UGVuTjJDSGlSJTJCcGo2VnJpTEhEOW5NTFBJWmVLSHdzWVU2bkJxZW5iY3ZRMXFYNmZrZUJ2TkZCSlBacGhUVHd6aWZRMGJoRFFDR1JHR0MyUVRLMWFsbE1mJTJGT3U; _gat_UA-12425854-1=1; _ga_R2T40V5QM5=GS1.1.1629531744.1.0.1629531747.57; G_ENABLED_IDPS=google; ${bebe}`,
      'origin': 'https://accounts.bukalapak.com',
      'referer': 'https://accounts.bukalapak.com/register?comeback=https%3A%2F%2Fwww.bukalapak.com%2F&from=nav_header',
      'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    },
    body: JSON.stringify({"access_token":"12n9yzQKGbP7yccftqZPlfa8rTxNAoh_dIoDD6KTMJiX6Q","user":{"phone":email},"authenticity_token":`${authenticity}`})
  })
  .then(res => res.json())
  .then(ress=>{
    resolve(ress)
  })
  .catch(err=>{
    reject(err)
  })
});
const get_regist_formdata_sms = (identi, key, cookieidenti, browser_id, session, bebe, email, nama, authenticity)=> new Promise((resolve,reject)=>{
  fetch("https://accounts.bukalapak.com/register",{
    method:"POST",
    headers:{
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'bukalapak-identity': `${identi}`,
      'bukalapak-otp-key': key,
      'content-length': '289',
      'content-type': 'application/json',
      'cookie': `${cookieidenti}; ${browser_id}; ${session}; _gcl_au=1.1.1907857496.1629531744; __asc=b259899517b67a928e15dd62ba5; __auc=b259899517b67a928e15dd62ba5; _ga=GA1.2.1602511861.1629531744; _gid=GA1.2.33248540.1629531745; _fbp=fb.1.1629531744982.547853850; cto_bundle=4C8NaF9hakdEdThtZWxkQ3B2UzJlNnU1dDd4bnZjb3pyU3ZMOElrSTd1UGVuTjJDSGlSJTJCcGo2VnJpTEhEOW5NTFBJWmVLSHdzWVU2bkJxZW5iY3ZRMXFYNmZrZUJ2TkZCSlBacGhUVHd6aWZRMGJoRFFDR1JHR0MyUVRLMWFsbE1mJTJGT3U; _gat_UA-12425854-1=1; _ga_R2T40V5QM5=GS1.1.1629531744.1.0.1629531747.57; G_ENABLED_IDPS=google; ${bebe}`,
      'origin': 'https://accounts.bukalapak.com',
      'referer': 'https://accounts.bukalapak.com/register?comeback=https%3A%2F%2Fwww.bukalapak.com%2F&from=nav_header',
      'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    },
    body: JSON.stringify({"access_token":"12n9yzQKGbP7yccftqZPlfa8rTxNAoh_dIoDD6KTMJiX6Q","user":{"phone":`${email}`,"name":`${nama}`,"password":pass,"password_confirmation":pass},"authenticity_token":`${authenticity}`})
  })
  .then(res => res.json())
  .then(ress=>{
    resolve(ress)
  })
  .catch(err=>{
    reject(err)
  })
});

const getnonaktif = (bearer,identi,identi1) => new Promise((resolve,reject)=>{
  fetch('https://api.bukalapak.com/users/tfa-status', {
    method: 'PUT',
    headers: {
        'authority': 'api.bukalapak.com',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'authorization': `Bearer ${bearer}`,
        'bukalapak-otp': '',
        'bukalapak-device-fingerprint': '1e31429788c5462f145d332c852334ee',
        'bukalapak-otp-device-id': `${identi}`,
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        'content-type': 'application/json',
        'bukalapak-identity': `${identi1}`,
        'origin': 'https://www.bukalapak.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.bukalapak.com/',
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({"state":"inactive"})
  })
  .then(res => res.json())
  .then(ress=>{
    resolve(ress)
  })
  .catch(err=>{
    reject(err)
  })
});

const getnonaktifotp = (bearer,otpnonaktif, identi,identi1) => new Promise((resolve,reject)=>{
  fetch('https://api.bukalapak.com/users/tfa-status', {
    method: 'PUT',
    headers: {
        'authority': 'api.bukalapak.com',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'authorization': `Bearer ${bearer}`,
        'bukalapak-otp': otpnonaktif,
        'bukalapak-device-fingerprint': '1e31429788c5462f145d332c852334ee',
        'bukalapak-otp-device-id': `${identi}`,
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        'content-type': 'application/json',
        'bukalapak-identity': `${identi1}`,
        'origin': 'https://www.bukalapak.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.bukalapak.com/',
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({"state":"inactive"})
  })
  .then(res => res.json())
  .then(ress=>{
    resolve(ress)
  })
  .catch(err=>{
    reject(err)
  })
});


(async()=>{
    console.log(chalk.yellow(
        figlet.textSync('Auto Create Bl x Mbl', {horizontalLayout: 'fitted'})
    ))
    const files = readlineSync.question("[INFO] simpan file ke ?")
    while(true){
    const nomor = readlineSync.question("masukan Phone : ")
   const first_name = randomname({first : true})
   const last_name = randomname({last: true})
   const name = `${first_name} ${last_name}`
   const get_attr =await getauth();
//    console.log(get_attr)
   const identity = get_attr.cookie[0].split(";")[0].split("=")[1]
//    console.log(identity)
   const identity1 = get_attr.cookie[0].split(";")[0].split("=")[1]
   const cookieidentity = get_attr.cookie[0].split(";")[0]
   const browserid = get_attr.cookie[1].split(";")[0]
   const sessionid = get_attr.cookie[2].split(";")[0]
   const bundle = get_attr.cookie[3].split(";")[0]
   const auth = get_attr.authorize
      const register = await get_regist_sms(identity,identity1,cookieidentity,browserid,sessionid,bundle,nomor,auth)
      const mesagge = register.errors[0].message
      console.log(`[INFO] ${mesagge}`)
      const Otp = readlineSync.question("Masukan OTP : ")
      const register_otp = await get_regist_Otp_sms(identity,identity1,Otp,cookieidentity,browserid,sessionid,bundle,nomor,auth)
      const key = register_otp.meta.otp_key
      const register_otp_form = await get_regist_formdata_sms(identity,key,cookieidentity,browserid,sessionid,bundle,nomor,name,auth)
      const mesagge2 = register_otp_form
      const token = register_otp_form.data.authentication.access_token
      fs.appendFileSync(`dataakun.txt`,`nomor => ${nomor}` + ` identity => ${identity}`+` bearer => ${token}`);
      const datas = {
          status : true,
          data :[{
            number : nomor,
            Message : 'Berhasil Mendaftar'
          }]
      }
      console.log(datas)
      let kondisi;
      let ulang= ''
      do {
        kondisi = await getnonaktif(token,identity,identity1)
        ulang = kondisi.meta.wait_time
        console.log(kondisi)
        await delay(1000)
      } while (ulang != 30);
      const tanyaotpnon = readlineSync.question("Masukan OTP : ")
      const nonaktif = await getnonaktifotp(token,tanyaotpnon,identity,identity1)
    //   console.log(nonaktif)
      const pesan = nonaktif.message
      console.log(chalk.green(`[INFO] ${pesan}`))
      fs.appendFileSync(`${files}`,`nomor => ${nomor}` + ` | ${pass}`);
      const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--enable-automation'],
        // executablePath:'C:\\Program Files x86\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: 'a',
        headless:false,
        devtools:false,
        args: [
            '--disable-notifications',
            '--disable-features=site-per-process',
            '--disable-dev-shm-usage'
        ]
        
    })
    const time = {visible:true,timeout:0}
    const page = await browser.newPage();

    await page.setViewport({ width: 350, height: 700});

console.log("[INFO] Mencoba mendaftar dengan nomor "+nomor)  
await page.goto(`https://accounts.bukalapak.com/login?comeback=https%3A%2F%2Fwww.bukalapak.com%2F#&direct=1`,{ waitUntil: 'networkidle2', timeout: 0 })

await page.waitForSelector("#user_identity_textfield",time)
await page.type("#user_identity_textfield",nomor)

await page.waitForSelector("#submit_button")
await page.click("#submit_button")
await page.waitForSelector("#input-password")
await page.type("#input-password",pass)
await page.waitForSelector("#btn-login")
await page.click("#btn-login")
await page.waitForSelector("#vm__white-header-dweb > section > header > div.sigil-header__main-nav-bar > div > div > div:nth-child(1) > div > span:nth-child(2) > div > div:nth-child(1) > a > p",time)
await delay(4000)
console.log(chalk.green("[INFO] Berhasil masuk ke akun"))
try {
  await page.waitForSelector("#dana-bind-fragment > div > section > div > div > span",{timeout:60000})
  await page.evaluate(()=> document.querySelectorAll("#dana-bind-fragment > div > section > div > div > span")[0].click())
  await page.waitForSelector("#app > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2)")
  await page.type("#app > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2)",pin)
  await page.waitForSelector("#app > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4)")
  await page.type("#app > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4)",pin)
  await page.waitForSelector("#vm__white-header-dweb > section > header > div.sigil-header__eyebrow > div > div > div:nth-child(2) > div > div.bl-flex-item.ph-16 > div > span.bl-text.bl-text--body-small.bl-text--subdued.bl-text--semi-bold > a")
  const rp = await page.evaluate(()=> document.querySelectorAll("#vm__white-header-dweb > section > header > div.sigil-header__eyebrow > div > div > div:nth-child(2) > div > div.bl-flex-item.ph-16 > div > span.bl-text.bl-text--body-small.bl-text--subdued.bl-text--semi-bold > a")[0].innerText)
  // await delay(7000)
  console.log((chalk.green(`[INFO] Berhasil aktivasi Dana dengan saldo ${rp}`)))
      } catch (error) {
          console.log('[INFO] GAGAL AKTIVASI DANA !!')
  }
const page2 = await browser.newPage()
await page2.goto(`https://mitra.bukalapak.com/register?from=beranda&phone=${nomor}`)
await page2.waitForSelector("#user_session_username")
await page2.type("#user_session_username",nomor)
await page2.waitForSelector("#user_session_password")
await page2.type("#user_session_password",pass)
await page2.waitForSelector("#button_submit")
await page2.click("#button_submit")
await delay(5000)
await page2.waitForSelector("#submit_button")
await page2.click("#submit_button")
try {
    await page2.waitForSelector("body > div.ab-iam-root.v3.ab-animate-in.ab-animate-out.ab-effect-modal.ab-show > div.ab-in-app-message.ab-background.ab-modal-interactions.ab-modal.ab-centered > div.ab-message-buttons > button:nth-child(2)",{timeout:2000})
    await page2.click("body > div.ab-iam-root.v3.ab-animate-in.ab-animate-out.ab-effect-modal.ab-show > div.ab-in-app-message.ab-background.ab-modal-interactions.ab-modal.ab-centered > div.ab-message-buttons > button:nth-child(2)")
} catch (error) {
    
}
await delay(3000)
await page2.waitForSelector("#card-balance-action_link > p",time)
await page2.reload()
await delay(3000)
await page2.goto("https://mitra.bukalapak.com/lite/mitra/type",{timeout:0})
await page2.waitForSelector("#__layout > div > div.bl-flex-container.c-mitratype > div.bl-flex-container.c-mitratype-types > div:nth-child(2) > div > div:nth-child(1) > label > span")
await page2.click("#__layout > div > div.bl-flex-container.c-mitratype > div.bl-flex-container.c-mitratype-types > div:nth-child(2) > div > div:nth-child(1) > label > span")
await delay(3000)
await page2.waitForSelector("#__layout > div > div.bl-flex-container.c-mitratype > div.c-fixed-footer > div.c-fixed-footer__content.u-shadow--ash-light > button")
await page2.click("#__layout > div > div.bl-flex-container.c-mitratype > div.c-fixed-footer > div.c-fixed-footer__content.u-shadow--ash-light > button")
await page2.waitForSelector("#__layout > div > div.bl-flex-container.c-profile > div.bl-dialog.is-active > div.bl-dialog__box > div.bl-dialog__action > button")
await page2.click("#__layout > div > div.bl-flex-container.c-profile > div.bl-dialog.is-active > div.bl-dialog__box > div.bl-dialog__action > button")
await delay(2000)
await page2.goto("https://mitra.bukalapak.com",{timeout:0})
await delay(2000)
await page2.waitForSelector("#card-balance-action_link > p",time)
await page2.click("#card-balance-action_link > p")
await delay(3000)
await page2.waitForSelector("#__layout > div > div.page > div:nth-child(4) > div > div > button",time)
await page2.click("#__layout > div > div.page > div:nth-child(4) > div > div > button")
await delay(3000)
await page2.waitForSelector("#__layout > div > div.u-bg--sand > div > div.saldo-mitra-dana-tnc--action-confirm.u-pad--4.u-mrgn-top--4.u-bg--white > div:nth-child(1) > label > span",time)
await page2.click("#__layout > div > div.u-bg--sand > div > div.saldo-mitra-dana-tnc--action-confirm.u-pad--4.u-mrgn-top--4.u-bg--white > div:nth-child(1) > label > span")
await delay(3000)
await page2.waitForSelector("#__layout > div > div.u-bg--sand > div > div.saldo-mitra-dana-tnc--action-confirm.u-pad--4.u-mrgn-top--4.u-bg--white > div:nth-child(2) > button")
await page2.click("#__layout > div > div.u-bg--sand > div > div.saldo-mitra-dana-tnc--action-confirm.u-pad--4.u-mrgn-top--4.u-bg--white > div:nth-child(2) > button")
try {
    await page2.waitForSelector("#agenlite-app > div:nth-child(2) > div > div.full-landing-screen > p.full-landing-screen--description.bl-text",10000)
    const saa = await page2.evaluate(()=> document.querySelectorAll("#agenlite-app > div:nth-child(2) > div > div.full-landing-screen > p.full-landing-screen--description.bl-text")[0].innerText)
    console.log("[INFO] "+ saa)
} catch (error) {
    console.log(chalk.red("[INFO] Gagal verifikasi dana karena sudah terdaftar\n"))
    await browser.close()
    await fs.remove('a')
}
// const dada = readlineSync.question("")
await browser.close()
await fs.remove('a')
console.log(' ')
await delay(2000)
    
        }
    
})();