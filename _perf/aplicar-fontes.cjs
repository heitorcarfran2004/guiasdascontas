// Troca o Google Fonts pelas mesmas fontes servidas do próprio site (assets/fonts/, de _perf/fontes.cjs)
// e põe as fontes reserva com as medidas da fonte final (o texto não muda de tamanho quando ela chega).
//   node _perf/aplicar-fontes.cjs index.html promo.html upsell.html dows.html
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const faces = fs.readFileSync(path.join(__dirname, 'fontes.css'), 'utf8').trim();
// medidas tiradas no Chrome (canvas) comparando cada fonte com a reserva: largura média e ascendente/descendente
const reserva = [
  '@font-face{font-family:"Inter Reserva";font-weight:400 500;src:local("Arial"),local("ArialMT");size-adjust:105%;ascent-override:92%;descent-override:23%;line-gap-override:0%}',
  '@font-face{font-family:"Inter Reserva";font-weight:600 800;src:local("Arial Bold"),local("Arial-BoldMT");size-adjust:103%;ascent-override:94%;descent-override:23.4%;line-gap-override:0%}',
  '@font-face{font-family:"Playfair Reserva";font-weight:600 700;src:local("Georgia Bold"),local("Georgia-Bold");size-adjust:88.2%;ascent-override:122.6%;descent-override:28.4%;line-gap-override:0%}',
].join('\n');
const bloco = `<!-- fontes servidas pelo próprio site (os mesmos arquivos do Google Fonts): sem as 2 conexões externas -->
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/playfair-display-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/inter-latin.woff2" crossorigin>
<style>
${faces}
/* reserva com as medidas da fonte final: o texto não pula quando ela chega (CLS) */
${reserva}
</style>`;
for (const f of process.argv.slice(2)) {
  const arq = path.join(RAIZ, f);
  let h = fs.readFileSync(arq, 'utf8');
  const ini = h.indexOf('<link rel="preconnect" href="https://fonts.googleapis.com">');
  if (ini < 0) { console.log(f, 'já aplicado ou sem Google Fonts'); continue; }
  // começa no comentário da linha de cima, se houver ("fonte não bloqueante")
  const antes = h.lastIndexOf('\n', ini - 2);
  const linhaAntes = h.slice(antes + 1, ini);
  const comeco = /^<!--.*fonte.*-->\s*$/.test(linhaAntes.trim()) ? antes + 1 : ini;
  let fim = h.lastIndexOf('fonts.googleapis.com');
  fim = h.indexOf('\n', fim);
  h = h.slice(0, comeco) + bloco + h.slice(fim);
  h = h.replace(/--sans:"Inter",/g, '--sans:"Inter","Inter Reserva",').replace(/--serif:"Playfair Display",/g, '--serif:"Playfair Display","Playfair Reserva",');
  fs.writeFileSync(arq, h);
  console.log(f, 'ok');
}
