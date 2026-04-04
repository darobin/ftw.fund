
import { join } from "node:path";
import { cp, readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises";
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const diifDir = rel('../diif-wise/');
const pdfSrc = join(diifDir, 'diif-wise.pdf');
const htmlSrc = join(diifDir, 'diif-wise.html');
const pdfTarget = rel('report.pdf');
const htmlTarget = rel('report.html');
const index = rel('index.html');
const imgDir = rel('img');
const imgSrc = join(diifDir, '.nemik/img');

// Copy stuff
await rm(imgDir, { recursive: true, force: true });
await mkdir(imgDir, { recursive: true });
const images = await readdir(imgSrc);
await Promise.all([
  cp(pdfSrc, pdfTarget),
  cp(htmlSrc, htmlTarget),
].concat(images.map(img => cp(join(imgSrc, img), join(imgDir, img)))));

const report = new JSDOM(await readFile(htmlTarget, 'utf8'));
const { window: { document: doc } } = report;
const indexData = await readFile(index, 'utf8');

// Exec Summary
const exec = [...doc.querySelectorAll('h1')].find(h => h.textContent === 'Executive Summary').parentElement.cloneNode(true);
exec.querySelector('h1').remove();
const indexOut = indexData.replace(/<!--EXECUTIVE-->[\s\S]*<!--\/EXECUTIVE-->/, `<!--EXECUTIVE-->${exec.innerHTML}<!--/EXECUTIVE-->`);
await writeFile(index, indexOut, 'utf8');

const link = doc.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', 'report.css');
doc.head.append(link);

const main = doc.createElement('main');
main.append(...doc.body.childNodes);
doc.body.append(main);

const h1 = doc.createElement('h1');
h1.append(...doc.querySelector('header > p.title').childNodes);
doc.querySelector('header').prepend(h1);

[...doc.querySelectorAll('img')].forEach(img => {
  img.setAttribute('src', img.getAttribute('src').replace(/^\.nemik\//, ''));
});

[...doc.querySelectorAll('h1, h2, h3, h4, h5')].forEach(h => {
  const lvl = parseInt(h.localName.replace(/^h/, ''), 10) + 1;
  const upped = doc.createElement(`h${lvl}`);
  upped.append(...h.childNodes);
  h.replaceWith(upped);
});

await writeFile(htmlTarget, report.serialize(), 'utf8');

function rel(pth) {
  return new URL(pth, import.meta.url).toString().replace(/^file:\/\//, '');
}
