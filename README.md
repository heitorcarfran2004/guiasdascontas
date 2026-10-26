# Funil: 100 Projetos de Guias de Contas

Página de vendas do entregável em `entregaveis/60-guias-de-contas`.
Copy: Google Doc do Heitor "LP Guias de Conta" (cópia em `COPY.md`). Textos que eu escrevi: `TEXTOS-NOVOS.md`.
Design modelado da LP da miçanga (`funis/brincos-micanga`), com a paleta do entregável V3:
verde-escuro #1F3A2C, dourado #C6A15B, creme #F8F5EC. Títulos em Playfair Display, texto em Inter.

    node servidor.cjs     # http://localhost:4310
    node conferir.cjs     # imagens que faltam, ids, TROCAR

## Antes de subir: o que falta

| | onde | estado |
|---|---|---|
| Checkout (Wiapy) | `window.CHECKOUT` no topo do `<head>` | `TROCAR-CHECKOUT-COMPLETO` |
| UTMify | comentário `TROCAR-UTMIFY` no `<head>` | colar o script desta oferta |
| Pixel da Meta | `window.PIXEL_META_ID` no `<head>` | `TROCAR-PIXEL-META` (só carrega quando preenchido) |
| Depoimentos | `#deps-trilho` | nenhum: a seção fica escondida |
| Termos, privacidade, e-mail | rodapé | `TROCAR` |
| Back redirect | `window.LINK_SAIDA` | ligado: `promo.html` (R$ 9,90, checkout https://pay.wiapy.com/pSTsOBtu_xr, repassa as UTMs). A promo tem os próprios `TROCAR-UTMIFY` e `PIXEL_META_ID` |
| Os 4 bônus | entrega | precisam existir antes de vender (fila do `entregador`) |

### Checkout
Plano único de R$ 17,90 (100 projetos + 4 bônus + PDF + app + vitalício). Troque **só** a linha
`window.CHECKOUT = '...'`. Os botões de compra (`.ir-checkout`: o do card da oferta e o do rodapé) leem
dali ao carregar. Enquanto for TROCAR, o clique mostra um aviso em vez de abrir página quebrada.
Os outros botões (`.ir-oferta`) só rolam até a oferta, sem mexer no histórico.

O seletor do back redirect procura `a[href*="pay.wiapy.com"]`. Se o gateway mudar, troque o domínio lá também.

### Pixel e UTMify
Mesmos ganchos da LP da miçanga: o script da UTMify no `<head>` (lá é um loader ofuscado que carrega
`cdn.utmify.com.br/scripts/utms/latest.js`). O bloco do pixel da Meta já dispara `PageView` e, no clique de
compra, `InitiateCheckout`. Se a UTMify desta oferta já cuidar do pixel, deixe o `PIXEL_META_ID` como está.

### Depoimentos (não inventar)
A seção "Veja o que estão dizendo!" só aparece quando houver pelo menos um print real.
1. Salve os prints em `assets/depoimentos/dep-01.webp`, `dep-02.webp`... (largura ~560 px; ex.:
   `ffmpeg -i print.png -vf scale=560:-2 -c:v libwebp -quality 80 dep-01.webp`).
2. Dentro de `<div class="dep-trilho" id="deps-trilho">`, troque cada comentário `[depoimento real aqui]` por:

        <figure class="dep-slide"><img src="assets/depoimentos/dep-01.webp" width="560" height="1059"
          loading="lazy" decoding="async" alt="Conversa de uma cliente mostrando a guia que fez com o material"></figure>

   (`width`/`height` = o tamanho real do arquivo.)
3. Pronto: o script mostra a seção, cria as bolinhas e roda o carrossel em leque (para 4,2 s em cada).

Para ver a estrutura antes de ter os prints: `http://localhost:4310/?previa=1` (3 cartões de exemplo).

## Imagens

| arquivo | de onde vem |
|---|---|
| `assets/hero-*.webp` | mockup só com páginas REAIS (tablet M01-p1, celular M09-p1, impressas M01-p2 e M40-p1), montado em HTML: `_geracao/mockups/hero.html` |
| `assets/paginas/*.webp` (+ `-sm`) | 10 páginas reais: M01-p1, M09-p1, M01-p2, M03-p1, M11-p1, M20-p1, M25-p1, M40-p1, M27-p2, M56-p1 |
| `assets/guias/g1..g6.webp` | recorte da foto da guia pronta das páginas M01, M09, M20, M25, M40, M56 |
| `assets/bonus/b1..b4.webp` | capas em HTML na identidade (`_geracao/mockups/bonus.html?n=1..4`), com a foto de uma guia real no medalhão |

Para refazer um mockup: `node _geracao/render.cjs "_geracao/mockups/bonus.html?n=1" 1360 766 saida.png`
(renderiza pelo Chrome da porta 9222 com fundo transparente) e converter com ffmpeg para webp.

**Fotos do ChatGPT (não usadas ainda).** Em 22/10 mandei 2 pedidos (mãos montando a guia; 4 guias prontas
sobre linho), conversas em `_geracao/conversas.txt`. No meio da geração o ChatGPT do Chrome foi deslogado
(outra pessoa trocando de conta), então não deu para colher. Se quiser usar: logar na conta de antes e rodar
`TODAS=1 node scripts/colher-carrossel.cjs funis/guias-de-contas/_geracao/conversas.txt funis/guias-de-contas/_geracao/geradas maos:1 guias:1`.

## Comportamento (igual à miçanga)
- Carrossel de páginas desliza sozinho (~27 px/s), arrastável; as 10 imagens aparecem DUAS vezes no HTML
  (a segunda leva é a emenda do loop): **trocar imagem = trocar nas duas levas**. `scroll-snap` desligado.
- Só a imagem do hero é carregada de início (preload com `imagesrcset`); todo o resto é `loading="lazy"`.
  Ao mudar uma largura no CSS, mude o `sizes` da imagem junto.
- Fonte não bloqueante (`media="print"` → `all`).
- A Playfair usa algarismos "antigos" por padrão (o 60 parece "6o"): os títulos têm `lnum` ligado. Não tire.
- `vercel.json` com cache de 7 dias nos assets e `cleanUrls`. `.vercelignore` deixa `_geracao/` e os .md de fora.

## Conferido em 22/10/2026
Celular 390 px e desktop 1440 px por captura via CDP (`_geracao/prints/`): sem rolagem horizontal,
nenhuma imagem quebrada, nenhum id duplicado. Peso inicial ~110 KB (HTML + hero de 460 px).

**Não publicado na Vercel.** Publicar só com ok do Heitor (`npx vercel deploy --prod` dentro desta pasta).
