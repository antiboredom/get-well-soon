const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function render(page, filename, _options = {}) {
  const defaults = {
    width: 18,
    height: 24,
    margin: 0.5,
    lineHeight: 1,
    columns: 3,
    minFontSize: 11,
  };

  const options = { ...defaults, ..._options };

  const htmlFile = path.resolve(filename);

  const content = fs.readFileSync(htmlFile, "utf8");

  const css = `<style>
    body {
      box-sizing: border-box;
      line-height: ${options.lineHeight};
      font-size: ${options.minFontSize * 2}pt;
      columns: ${options.columns};
      column-fill: auto;
      column-gap: ${options.margin}in;
      width: ${options.width}in;
      height: ${options.height}in;
      margin: 0;
      padding: ${options.margin}in;
    }

    p {
      margin: 0;
      padding: 0;
      margin: 2px;
    }

    @page {
      margin: 0.0in;
      margin: ${options.margin}in;
      size: ${options.width}in ${options.height}in;
    }
  </style>`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        ${css}
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;

  await page.goto(`data:text/html,${html}`, { waitUntil: "networkidle0" });

  await page.evaluate((options) => {
    function isOverflown(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }

    function setPage(pages=1) {
      document.body.style.height = `${options.height * pages + options.margin*(pages)*2}in`;

      let fontSize = options.minFontSize * 2;
      document.body.style.fontSize = fontSize + "pt";

      while (isOverflown(document.body)) {
        fontSize -= 0.1;
        document.body.style.fontSize = fontSize + "pt";
      }

      if (fontSize < options.minFontSize) {
        setPage(pages + 1);
      } else {
        // document.body.style.height = "auto";
        document.body.style.padding = "0";
      }
    }

    setPage(1);

  }, options);

  const outname = `${path.basename(filename)}.${options.width}_${
    options.height
  }.pdf`;

  await page.pdf({
    path: outname,
    preferCSSPageSize: true,
  });
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const options = {
    width: 20,
    height: 28,
    margin: 0.5,
    lineHeight: 1,
    columns: 3,
    minFontSize: 10,
  };
  await render(page, "../docs/sorts/all my.html", options);

  await browser.close();
}

main();
