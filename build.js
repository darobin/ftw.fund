
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
const indexOut = indexData.replace(/<!--EXECUTIVE-->.*<!--\/EXECUTIVE-->/, `<!--EXECUTIVE-->${exec.innerHTML}<!--/EXECUTIVE-->`);
await writeFile(index, indexOut, 'utf8');

// - add style to copied HTML (maybe other cleanup?)
// - put the Exec Summary in the index.html

function rel(pth) {
  return new URL(pth, import.meta.url).toString().replace(/^file:\/\//, '');
}
