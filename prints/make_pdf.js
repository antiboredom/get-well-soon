const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

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

	await page.goto(`data:text/html,${html}`, { waitUntil: "networkidle0", timeout: 0 });

	await page.evaluate((options) => {
		function isOverflown(element) {
			return (
				element.scrollHeight > element.clientHeight ||
				element.scrollWidth > element.clientWidth
			);
		}

		function setPage(pages = 1) {
			document.body.style.height = `${options.height * pages + options.margin * (pages) * 2}in`;

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

	const outname = `renders/${path.basename(filename)}_${options.width}x${options.height}_${options.margin}margin_${options.columns}cols_${options.minFontSize}font.pdf`;

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
		height: 128,
		margin: 0.5,
		lineHeight: 1,
		columns: 2,
		minFontSize: 6,
	};
	await render(page, "../docs/sorts/all my.html", options);

	// const options = {
	// 	width: 24,
	// 	height: 128,
	// 	margin: 0.5,
	// 	lineHeight: 1,
	// 	columns: 3,
	// 	minFontSize: 6,
	// };
	// await render(page, "everything.html", options);

	await browser.close();
}

main();
