
import { join } from "node:path";
import { cp, readFile, writeFile } from "node:fs/promises";
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const diifDir = rel('../diif-wise/');
const pdfSrc = join(diifDir, 'diif-wise.pdf');
const htmlSrc = join(diifDir, 'diif-wise.html');
const pdfTarget = rel('report.pdf');
const htmlTarget = rel('report.html');
const index = rel('index.html');

await Promise.all([
  cp(pdfSrc, pdfTarget),
  cp(htmlSrc, htmlTarget),
]);

const report = new JSDOM(await readFile(htmlTarget, 'utf8'));
const indexData = await readFile(index, 'utf8');

// Exec Summary
const exec = [...report.window.document.querySelectorAll('h1')].find(h => h.textContent === 'Executive Summary').parentElement.cloneNode(true);
exec.querySelector('h1').remove();
const indexOut = indexData.replace(/<!--EXECUTIVE-->[\s\S]*<!--\/EXECUTIVE-->/, `<!--EXECUTIVE-->${exec.innerHTML}<!--/EXECUTIVE-->`);
await writeFile(index, indexOut, 'utf8');

// Add style to report
//  - link to report CSS
//  - wrap in main
//  - header > p.title to h1
//  - need to copy some images over
//  - hX + 1 & remove ID

function rel(pth) {
  return new URL(pth, import.meta.url).toString().replace(/^file:\/\//, '');
}
