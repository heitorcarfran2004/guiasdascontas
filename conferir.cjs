// Conferência da LP das Guias de Contas: imagens que faltam, ids duplicados,
// ids que os scripts procuram, ícones sem desenho e marcações TROCAR que não podem subir.
//   node conferir.cjs
const fs = require('fs');
const path = require('path');
process.chdir(__dirname);
const h = fs.readFileSync('index.html', 'utf8');
const semComentarios = h.replace(/<!--[\s\S]*?-->/g, '');

const refs = new Set();
for (const m of semComentarios.matchAll(/(?:src|srcset|href|imagesrcset)="([^"]+)"/g))
  m[1].split(',').forEach(p => { const u = p.trim().split(' ')[0]; if (u.startsWith('assets/')) refs.add(u); });
const falta = [...refs].filter(r => !fs.existsSync(r));
console.log('imagens referenciadas:', refs.size, '| faltando:', falta.length ? falta : 'nenhuma');

const ids = {};
for (const m of h.matchAll(/id="([^"]+)"/g)) ids[m[1]] = (ids[m[1]] || 0) + 1;
const dup = Object.entries(ids).filter(([, v]) => v > 1);
console.log('ids duplicados:', dup.length ? dup : 'nenhum');
const precisa = ['paginas', 'depoimentos', 'deps', 'deps-trilho', 'deps-dots', 'oferta'];
const sem = precisa.filter(i => !ids[i]);
console.log('ids que os scripts usam e sumiram:', sem.length ? sem : 'nenhum');

const usos = [...new Set([...h.matchAll(/href="#(i-[a-z]+)"/g)].map(m => m[1]))];
const sym = [...h.matchAll(/symbol id="(i-[a-z]+)"/g)].map(m => m[1]);
const semIco = usos.filter(u => !sym.includes(u));
console.log('ícones sem desenho:', semIco.length ? semIco : 'nenhum');

const reais = trilhoReal();
console.log('depoimentos reais no carrossel:', reais, reais ? '' : '(seção escondida até ter print)');
function trilhoReal() {
  const t = semComentarios.match(/id="deps-trilho">([\s\S]*?)<\/div>/);
  return t ? (t[1].match(/class="dep-slide"/g) || []).length : 0;
}

console.log('\nAinda com TROCAR (não subir assim):');
semComentarios.split(/\r?\n/).forEach((l, i) => {
  if (/TROCAR/.test(l)) console.log('  linha ' + (i + 1) + ': ' + l.trim().slice(0, 110));
});
