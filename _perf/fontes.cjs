// Baixa as fontes do Google (Playfair Display + Inter, só latin e latin-ext) para assets/fonts/
// e escreve _perf/fontes.css com os @font-face apontando para os arquivos locais.
//   node _perf/fontes.cjs
const fs = require('fs'), path = require('path');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const URL = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap';
const DEST = path.join(__dirname, '../assets/fonts');
(async () => {
  const css = await (await fetch(URL, { headers: { 'user-agent': UA } })).text();
  const blocos = css.split('/* ').slice(1).map((b) => ({ sub: b.slice(0, b.indexOf(' */')), corpo: b.slice(b.indexOf('@font-face')) }))
    .filter((b) => b.sub === 'latin' || b.sub === 'latin-ext');
  fs.mkdirSync(DEST, { recursive: true });
  const nomes = {};
  let out = '';
  for (const b of blocos) {
    const url = /url\(([^)]+)\)/.exec(b.corpo)[1];
    const fam = /font-family: '([^']+)'/.exec(b.corpo)[1].toLowerCase().replace(/ /g, '-');
    const estilo = /font-style: (\w+)/.exec(b.corpo)[1];
    const nome = `${fam}-${estilo === 'italic' ? 'italic-' : ''}${b.sub}.woff2`;
    if (!nomes[url]) {
      nomes[url] = nome;
      fs.writeFileSync(path.join(DEST, nome), Buffer.from(await (await fetch(url)).arrayBuffer()));
    }
    out += b.corpo.replace(url, 'assets/fonts/' + nomes[url]).replace(/\s+/g, ' ').trim() + '\n';
  }
  fs.writeFileSync(path.join(__dirname, 'fontes.css'), out);
  for (const [u, n] of Object.entries(nomes)) console.log(n, fs.statSync(path.join(DEST, n)).size);
})();
