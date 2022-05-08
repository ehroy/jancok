const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { faker } = require("@faker-js/faker");
const moment = require("moment");
const readlineSync = require("readline-sync");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const SMSActivate = require("./lib/sms-activate/index");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const colors = require("./lib/colors");
const md5 = require("md5-nodejs");
const randomUseragent = require("random-useragent");
const delay = require("delay");
var randomize = require("randomatic");
const si = require("systeminformation");
require("dotenv").config();
var uagent = randomUseragent.getRandom(function (ua) {
  return parseFloat(ua.browserVersion) >= 20;
});
const getEmailRandom = (email, domain) =>
  new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
      method: "get",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        const $ = cheerio.load(text);
        const result = [];
        $(".e7m.tt-suggestions")
          .find("div > p")
          .each(function (index, element) {
            result.push($(element).text());
          });
        resolve(result);
      })
      .catch((err) => reject(err));
  });

const fakeName = () => {
  const randomName = faker.name.findName().toLowerCase();
  const random1 = faker.word.adjective().toLowerCase();
  const random2 = faker.word.adverb().toLowerCase();
  const name = random1 + randomName;
  const result = {
    firstName: random1.replace(/\s/g, ""),
    lastName: randomName.replace(/\s/g, ""),
    name: name.replace(/\s/g, ""),
  };
  return result;
};

const randstr = (length) => {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
const randint = (length) => {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const registerUserId = (user, phoneNumber, reffnya) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://app.oneaset.co.id/api/app/user/sms/captcha?phoneNumber=${phoneNumber}&smsBizType=1`,
      {
        method: "GET",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          "user-agent": user,
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Authorization: " ",
          Countryid: "1",
          Languageid: "123",
          Connection: "keep-alive",
          Referer: `https://app.oneaset.co.id/finance/Finance/LandingPage?channel=web_OneAset_activity_financeinvite&referrerCode=${reffnya}&source=outside&ad=Ym09MiZjcD01Jmd1PW51bGwmdWM9MTAmdWU9MCZ1aWQ9MzM4NzM3`,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

const getTokenVeryfLink = (user, nonya, codenya, reffnya) =>
  new Promise((resolve, reject) => {
    fetch("https://app.oneaset.co.id/api/app/user/register", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        "user-agent": user,
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: " ",
        Countryid: "1",
        Languageid: "123",
        Connection: "keep-alive",
        Referer: `https://app.oneaset.co.id/finance/Finance/LandingPage?channel=web_OneAset_activity_financeinvite&referrerCode=${reffnya}&source=outside&ad=Ym09MiZjcD01Jmd1PW51bGwmdWM9MTAmdWU9MCZ1aWQ9MzM4NzM3`,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
      },
      body: `phoneNumber=${nonya}&captcha=${codenya}&channel=web_OneAset_activity_financeinvite&referrerCode=${reffnya}`,
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

const finalRegistration = (uuid, deviceIdd, nonya, codenya) =>
  new Promise((resolve, reject) => {
    fetch("https://app.oneaset.co.id/api/app/user/login", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        versionCode: "12",
        versionName: "1.0.4",
        countryId: "1",
        languageId: "123",
        deviceType: "4",
        uuid: uuid, //1650254610626-421324-0133c5b3-992d-4af9-bc82-e38cb66f5463
        deviceId: deviceIdd, //00000000-79f0-3aac-0000-00006f0e2d4e
        deviceToken:
          "d9ZKqIo9jAYUlbHpdP1HBv:APA91bFlgWZaFDFe73CrWDkRbaP86UmxIh8KwYB4lsMeVpCRbgpWg6JDBigZk6UFmaoQ7y1eouU12KVRGN4yzsmPWFSQlbvzHpmiaSZ1rNfcn3mGzSDVPJjQrr-lIQmxT2Gtv_6NYPgG",
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "app.oneaset.co.id",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.1",
      },
      redirect: "manual",
      body: `phoneNumber=${nonya}&password=${codenya}&passwordType=3&captcha=`,
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

const setPass = (uuid, deviceId, password, accessToken) =>
  new Promise((resolve, reject) => {
    fetch("https://app.oneaset.co.id/api/app/user/setLoginPassword", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Authorization: accessToken,
        versionName: "1.0.4",
        countryId: "1",
        languageId: "123",
        deviceType: "4",
        uuid: uuid, //1650254610626-421324-0133c5b3-992d-4af9-bc82-e38cb66f5463
        deviceId: deviceId, //00000000-79f0-3aac-0000-00006f0e2d4e
        //      = "deviceToken: d9ZKqIo9jAYUlbHpdP1HBv:APA91bFlgWZaFDFe73CrWDkRbaP86UmxIh8KwYB4lsMeVpCRbgpWg6JDBigZk6UFmaoQ7y1eouU12KVRGN4yzsmPWFSQlbvzHpmiaSZ1rNfcn3mGzSDVPJjQrr-lIQmxT2Gtv_6NYPgG";
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "app.oneaset.co.id",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.1",
      },
      body: `password=${password}`,
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
const codeotp = (key, id) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://smshub.org/stubs/handler_api.php?action=getCurrentActivationsDataTables&api_key=${key}&action=getStatus&id=${id}`,
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
const restok = (key, id) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://app.oneaset.co.id/api/app/biz/activity/master/user/task/list?activityId=3`,
      {
        method: "GET",
        headers: {
          Host: "app.oneaset.co.id",
          Connection: "keep-alive",
          Accept: "application/json, text/plain, */*",
          countryId: "1",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTEwMzY3MDAsInN1YiI6IntcInVpZFwiOjY4NDY1MH0iLCJleHAiOjE2NTE2NDE1MDB9.g-aaNrFoUGdlYDE6vPP5roXgWL9Iip8GJZUeeJXMUw8",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; SM-G9880 Build/RP1A.2007201.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36",
          languageId: "123",
          "X-Requested-With": "com.finance.oneaset",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer:
            "https://app.oneaset.co.id/finance/Finance/ArticleReadInvitation",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          Cookie:
            "sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221806975097b8a6-0643ea5e40c1484-48483111-409920-1806975097c79e%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTgwNjk3NTA5N2I4YTYtMDY0M2VhNWU0MGMxNDg0LTQ4NDgzMTExLTQwOTkyMC0xODA2OTc1MDk3Yzc5ZSJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%2C%22%24device_id%22%3A%221806975097b8a6-0643ea5e40c1484-48483111-409920-1806975097c79e%22%7D; languageCode=in; token=eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTEwMzY3MDAsInN1YiI6IntcInVpZFwiOjY4NDY1MH0iLCJleHAiOjE2NTE2NDE1MDB9.g-aaNrFoUGdlYDE6vPP5roXgWL9Iip8GJZUeeJXMUw8",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
const licensi = (mac) =>
  new Promise((resolve, reject) => {
    fetch(`https://licensi.herokuapp.com/?key=` + mac, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

function multiproses(otpProviderChoices, refferal, piro) {
  (async () => {
    const emel = fs.readFileSync("mac.txt", "utf8").split("\r\n");
    const deviceasli = emel[0];
    const device = await si.uuid();
    if (device["macs"][0] == deviceasli) {
      // console.log(device["macs"][0]);

      let i = 0;
      if (otpProviderChoices == "1" || otpProviderChoices == "2") {
        try {
          const APIKEY =
            otpProviderChoices == "1"
              ? process.env.SMSHUBS_API_KEY
              : process.env.SMS_ACTIVATE_TOKEN;
          const sms = new SMSActivate(
            APIKEY,
            otpProviderChoices == "1" ? "smshub" : "smsactivate"
          );
          const balance = await sms.getBalance();
          console.log(
            `[ ${moment().format("HH:mm:ss")} ] `,
            colors.FgGreen,
            `Saldo Akun ${otpProviderChoices} ${balance} ₽`,
            colors.Reset
          );
          // console.clear();
          console.log(
            `[ ${moment().format("HH:mm:ss")} ] `,
            colors.FgYellow,
            `PC VALID`,
            colors.Reset
          );
          let validasiotp;
          do {
            const cekstock = await restok();
            const validasi = cekstock["data"][5]["redEnvelopeVO"]["remainNum"];
            const refre = cekstock["data"][5]["redEnvelopeVO"]["nameId"];
            if (validasi > 2) {
              console.log(
                `[ ${moment().format("HH:mm:ss")} ] `,
                colors.FgGreen,
                `Stock Masih => ${validasi}`,
                colors.Reset
              );
            } else {
              console.log(
                `[ ${moment().format("HH:mm:ss")} ] `,
                colors.FgRed,
                `Stock Kosong Stop Ngeref`,
                colors.Reset
              );
              break;
            }
            if (balance > 1) {
              console.log("");
              const userId = uuidv4();
              const uuidv1 = uuidv4();
              const uuid = `${randint(13)}-${randint(6)}-${uuidv1}`;
              const useragent = uagent;

              const { id, number } = await sms.getNumber("aj", 6);
              await sms.setStatus(id, 1);
              const parsing = number.toString().split("628")[1];
              const fixnumber = `08${parsing}`;
              const phoneNumber = fixnumber;
              let registerUserIdResult = await registerUserId(
                useragent,
                phoneNumber,
                refferal
              );
              // console.log(JSON.stringify(registerUserIdResult));
              if (registerUserIdResult["success"] == true) {
                let otpCode1;
                console.log(
                  `[ ${moment().format("HH:mm:ss")} ] `,
                  colors.FgGreen,
                  `Mencoba mengambil otp dari nomer ${phoneNumber}`,
                  colors.Reset
                );

                console.log(
                  `[ ${moment().format("HH:mm:ss")} ] `,
                  colors.FgYellow,
                  `Menunggu Kode OTP!`,
                  colors.Reset
                );

                myCache.set("dateStartedOtpCode1", moment().format());
                myCache.set(
                  "dateEndOtpCode1",
                  moment(myCache.get("dateStartedOtpCode1"))
                    .add(parseInt(process.env.TIME_DEFAULT_SENDOTP), "seconds")
                    .format()
                );
                let code;
                let ulang = 0;
                let otpCode;
                do {
                  ulang++;
                  await delay(1000);
                  code = await codeotp(APIKEY, id);
                  if (ulang == 10) {
                    await sms.setStatus(id, 8);
                  }
                  // if (
                  //   myCache.get("dateStartedOtpCode1") >
                  //   myCache.get("dateEndOtpCode1")
                  // ) {
                  //   otpCode = await sms.getCode(id);
                  // }
                  // console.log(ulang);
                } while (code == "STATUS_WAIT_CODE");
                validasiotp = code;
                if (code.includes("STATUS_OK")) {
                  const otpCode10 = await codeotp(APIKEY, id);
                  // console.log(otpCode10);
                  if (otpCode10) {
                    const linkVeryfId = otpCode10.toString().split(":")[1];
                    console.log(
                      `[ ${moment().format("HH:mm:ss")} ] `,
                      colors.FgGreen,
                      `Success dapetin OTP Dari ${phoneNumber} => ${linkVeryfId}`,
                      colors.Reset
                    );
                    const resultToken = await getTokenVeryfLink(
                      useragent,
                      phoneNumber,
                      linkVeryfId,
                      refferal
                    );
                    fs.appendFile(
                      `auto.txt`,
                      `${refferal}|${phoneNumber}|${linkVeryfId}\n`,
                      (err) => {
                        if (err) throw err;
                      }
                    );
                    // console.log(JSON.stringify(resultToken));
                    if (resultToken["success"] == false) {
                      const resultTokens = await getTokenVeryfLink(
                        useragent,
                        phoneNumber,
                        linkVeryfId,
                        refferal
                      );
                      // console.log(JSON.stringify(resultToken));
                      const verify2 = linkVeryfId;
                      // console.log(
                      //   `[ ${moment().format("HH:mm:ss")} ] `,
                      //   colors.FgGreen,
                      //   `Success verified token.`,
                      //   colors.Reset
                      // );
                      const resultRegistration = await finalRegistration(
                        uuid,
                        userId,
                        phoneNumber,
                        verify2
                      );
                      // console.log(resultRegistration);
                      if (resultRegistration["success"] == true) {
                        console.log(
                          `[ ${moment().format("HH:mm:ss")} ] `,
                          colors.FgGreen,
                          `Regist Succesfully.`,
                          colors.Reset
                        );
                        const pass = md5("Kaserinas123@");
                        const token = resultRegistration["data"]["accessToken"];
                        const final = await setPass(uuid, userId, pass, token);
                        if (final["success"] == true) {
                          console.log(
                            `[ ${moment().format("HH:mm:ss")} ] `,
                            colors.FgGreen,
                            `success set Password`,
                            colors.Reset
                          );
                        } else {
                          console.log(
                            `[ ${moment().format("HH:mm:ss")} ] `,
                            colors.FgRed,
                            `Gagal Set Password.`,
                            colors.Reset
                          );
                        }
                      } else {
                        // console.log(
                        //   `[ ${moment().format("HH:mm:ss")} ] `,
                        //   colors.FgRed,
                        //   `Gagal Login APK Silakan Lanjutkan Login Manual`,
                        //   colors.Reset
                        // );
                      }
                    } else {
                      console.log(
                        `[ ${moment().format("HH:mm:ss")} ] `,
                        colors.FgRed,
                        `ada masalah saat get token.`,
                        colors.Reset
                      );
                    }
                  }
                } else {
                  console.log(
                    `[ ${moment().format("HH:mm:ss")} ] `,
                    colors.FgRed,
                    `Failed Get OTP Terlalu lama`,
                    colors.Reset
                  );
                  otpCode = await sms.getCode(id);
                  //   continue;
                  // console.log(otpCode);
                }
              } else {
                console.log(
                  `[ ${moment().format("HH:mm:ss")} ] `,
                  colors.FgRed,
                  `failed send otp.`,
                  colors.Reset
                );
                await sms.setStatus(id, 8);
              }
            } else {
              console.log("You don't have enough money");
              //   break;
            }
          } while (validasiotp == "STATUS_CANCEL");
        } catch (error) {
          console.log(
            `[ ${moment().format("HH:mm:ss")} ] `,
            colors.FgRed,
            `${error}`,
            colors.Reset
          );
          // console.clear();
        }
      } else if (otpProviderChoices == "3") {
        try {
          for (let index = 0; index < parseInt(piro); index++) {
            console.log("");
            const userId = uuidv4();
            const uuidv1 = uuidv4();
            const uuid = `${randint(13)}-${randint(6)}-${uuidv1}`;
            const useragent = uagent;
            // console.log(useragent);

            const phoneNumber = readlineSync.question(
              `[ ${moment().format("HH:mm:ss")} ]` + `   Input Number : `
            );
            let registerUserIdResult = await registerUserId(
              useragent,
              phoneNumber,
              refferal
            );
            // console.log(JSON.stringify(registerUserIdResult));
            if (registerUserIdResult["success"] == true) {
              const otpCode1 = readlineSync.question(
                `[ ${moment().format("HH:mm:ss")} ]` + `   Input OTP : `
              );

              if (otpCode1) {
                const linkVeryfId = otpCode1;
                console.log(
                  `[ ${moment().format("HH:mm:ss")} ] `,
                  colors.FgGreen,
                  `Success dapetin Code ${linkVeryfId}`,
                  colors.Reset
                );
                const resultToken = await getTokenVeryfLink(
                  useragent,
                  phoneNumber,
                  linkVeryfId,
                  refferal
                );

                if (resultToken["success"] == false) {
                  const resultTokens = await getTokenVeryfLink(
                    phoneNumber,
                    linkVeryfId,
                    refferal
                  );
                  const verify2 = linkVeryfId;
                  console.log(
                    `[ ${moment().format("HH:mm:ss")} ] `,
                    colors.FgGreen,
                    `Success dapetin OTP Dari ${phoneNumber} => ${linkVeryfId}`,
                    colors.Reset
                  );
                  const resultRegistration = await finalRegistration(
                    uuid,
                    userId,
                    phoneNumber,
                    verify2
                  );
                  fs.appendFile(
                    `manual.txt`,
                    `${phoneNumber}|${linkVeryfId}\n`,
                    (err) => {
                      if (err) throw err;
                    }
                  );
                  if (resultRegistration["success"] == true) {
                    console.log(
                      `[ ${moment().format("HH:mm:ss")} ] `,
                      colors.FgGreen,
                      `Regist Succesfully.`,
                      colors.Reset
                    );
                    const pass = md5("Kaserinas123@");
                    const token = resultRegistration["data"]["accessToken"];
                    const final = await setPass(uuid, userId, pass, token);
                    if (final["success"] == true) {
                      console.log(
                        `[ ${moment().format("HH:mm:ss")} ] `,
                        colors.FgGreen,
                        `success set Password`,
                        colors.Reset
                      );
                    } else {
                      console.log(
                        `[ ${moment().format("HH:mm:ss")} ] `,
                        colors.FgRed,
                        `Gagal Set Password.`,
                        colors.Reset
                      );
                    }
                  } else {
                    // console.log(
                    //   `[ ${moment().format("HH:mm:ss")} ] `,
                    //   colors.FgRed,
                    //   `failed registration.`,
                    //   colors.Reset
                    // );
                  }
                } else {
                  // console.log(
                  //   `[ ${moment().format("HH:mm:ss")} ] `,
                  //   colors.FgRed,
                  //   `ada masalah saat get token.`,
                  //   colors.Reset
                  // );
                }
              }
            } else {
              console.log(
                `[ ${moment().format("HH:mm:ss")} ] `,
                colors.FgRed,
                `failed send otp.`,
                colors.Reset
              );
            }
          }
        } catch (error) {
          console.log(
            `[ ${moment().format("HH:mm:ss")} ] `,
            colors.FgRed,
            `${error}`,
            colors.Reset
          );
        }
      }
    } else {
      console.log(
        `[ ${moment().format("HH:mm:ss")} ] `,
        colors.FgRed,
        `PC TIDAK TERDAFTAR`,
        colors.Reset
      );
    }
  })();
}
(async () => {
  console.log("");
  const otpProvider = ["SMSHUB.org", "SMS-Activate.ru", "Other"];
  for (let index = 0; index < otpProvider.length; index++) {
    console.log(`${index + 1}. ${otpProvider[index]}`);
  }
  console.log("");
  const otpProviderChoices = readlineSync.question("Pilih OTP Provider > ");
  const refferal = readlineSync.question("Masukan refferal  : ");
  const piro = readlineSync.question("Mau berapa reff ? ");
  let cekstock;
  let validasi;
  try {
    do {
      cekstock = await restok();
      validasi = cekstock["data"][5]["redEnvelopeVO"]["remainNum"];
      refre = cekstock["data"][5]["redEnvelopeVO"]["nameId"];
      if (validasi > 1) {
        console.log(
          `[ ${moment().format("HH:mm:ss")} ] `,
          colors.FgGreen,
          `EVENT : ${refre}`,
          colors.Reset
        );
        console.log(
          `[ ${moment().format("HH:mm:ss")} ] `,
          colors.FgGreen,
          `STOK : ${validasi}`,
          colors.Reset
        );
      } else {
        console.log(
          `[ ${moment().format("HH:mm:ss")} ] `,
          colors.FgGreen,
          `EVENT : ${refre}`,
          colors.Reset
        );
        console.log(
          `[ ${moment().format("HH:mm:ss")} ] `,
          colors.FgGreen,
          `STOK : ${validasi}`,
          colors.Reset
        );
      }
      await delay(1000);
    } while (validasi == 0 || validasi == 1 || validasi == 698);
  } catch (error) {}

  for (let index = 0; index < piro; index++) {
    const multithread = multiproses(otpProviderChoices, refferal, piro);
  }
})();
