// Coloca os prints de depoimento na LP das Guias de Contas.
//   node depoimentos.cjs ["C:\Users\thorz\Downloads\Guia de Contas\Depoimentos"]
// Lê os prints (png/jpg/jpeg/webp) da pasta, em ordem de nome, converte para assets/depoimentos/dep-NN.webp
// (560 px de largura) e reescreve o conteúdo de #deps-trilho no index.html. A seção aparece sozinha
// quando há pelo menos um print. Rodar de novo substitui a lista inteira pelos prints da pasta.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const PASTA = process.argv[2] || 'C:\\Users\\thorz\\Downloads\\Guia de Contas\\Depoimentos';
const RAIZ = __dirname;
const DEST = path.join(RAIZ, 'assets', 'depoimentos');
const prints = fs.readdirSync(PASTA).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));
if (!prints.length) { console.log('Nenhum print em', PASTA); process.exit(1); }

fs.mkdirSync(DEST, { recursive: true });
for (const f of fs.readdirSync(DEST)) if (/^dep-\d+\.webp$/.test(f)) fs.unlinkSync(path.join(DEST, f));

const blocos = prints.map((f, i) => {
  const nome = `dep-${String(i + 1).padStart(2, '0')}.webp`;
  const saida = path.join(DEST, nome);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(PASTA, f), '-vf', 'scale=560:-2', '-c:v', 'libwebp', '-quality', '82', saida]);
  const [w, h] = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', saida]).toString().trim().split(',');
  console.log(`${nome}  <-  ${f}  (${w}x${h})`);
  return `      <figure class="dep-slide"><img src="assets/depoimentos/${nome}?v=${Date.now().toString(36)}" width="${w}" height="${h}" loading="lazy" decoding="async" alt="Conversa de uma cliente sobre as Guias de Contas"></figure>`;
});

const arq = path.join(RAIZ, 'index.html');
let html = fs.readFileSync(arq, 'utf8');
const ini = html.indexOf('<div class="dep-trilho" id="deps-trilho">');
if (ini < 0) throw new Error('não achei #deps-trilho');
const abre = html.indexOf('>', ini) + 1;
const fecha = html.indexOf('</div>', abre);
html = html.slice(0, abre) + '\n' + blocos.join('\n') + '\n    ' + html.slice(fecha);
fs.writeFileSync(arq, html);
console.log(`${prints.length} depoimento(s) no index.html`);
