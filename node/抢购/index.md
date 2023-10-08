```js
const dayjs = require("dayjs");
const { By } = require("selenium-webdriver");
const selenium = require("selenium-webdriver");

const driver = new selenium.Builder().forBrowser("chrome").build();

// 最大化浏览器
// driver.manage().window().maximize();

driver.get("https://www.vmall.com/product/10086970184614.html");

// 类似于python中time的sleep函数
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
};

// 登录
const login = async () => {
  console.log("尝试登录");
  const loginText = driver.findElement(By.linkText("请登录"));
  if (loginText) loginText.click();
  //   console.log("请在20秒内完成扫码");
  await sleep(60);
  console.log("开始抢购");
  buy("2023-10-08 18:08:00");
};

// 秒杀
const buy = async (buyTime) => {
  while (true) {
    const now = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    if (now === buyTime) {
      if (driver.findElement(By.linkText("立即下单")))
        driver.findElement(By.linkText("立即下单")).click();
      await sleep(3);
      submit();
      break;
    }
  }
};

// 提交订单
const submit = async () => {
  if (driver.findElement(By.linkText("提交订单")))
    driver.findElement(By.linkText("提交订单")).click();
  console.log("抢购时间：", dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  await sleep(1000);
};

login();

```