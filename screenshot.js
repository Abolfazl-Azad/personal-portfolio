const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const targetUrl = 'file://' + path.resolve('d:/Desktop/mysite/index.html');
const outDir = path.resolve('d:/Desktop/mysite/qa-screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 375, height: 667 },
  { width: 360, height: 740 }
];

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new"
  });
  
  const page = await browser.newPage();
  
  for (const vp of viewports) {
    console.log(`Capturing Home at ${vp.width}x${vp.height}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    
    // Give some time for CSS animations to settle
    await new Promise(r => setTimeout(r, 1000));
    
    await page.screenshot({
      path: path.join(outDir, `home-${vp.width}.png`),
      fullPage: true
    });
  }
  
  await browser.close();
  console.log('Done!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
