# Textos novos para o Heitor revisar

Tudo o que está na página e **não veio do Doc** "LP Guias de Conta".
O resto da página é o texto do Doc, palavra por palavra (`COPY.md`).
Só mudei quebra de linha, maiúsculas onde o Doc já usava, e troquei os emojis por ícones dourados de traço (é só visual).

## 1. Barra do topo (não existe no Doc)
- OFERTA DE LANÇAMENTO
- 100 projetos + 4 bônus por R$ 17,90

## 2. Botões
O Doc só tem um botão, no rodapé ("QUERO ACESSAR TUDO!"). Usei **o mesmo texto** nos outros 4 botões
(hero, depois do carrossel, oferta e rodapé). Nenhuma palavra nova.

## 3. Card duplo (PDF e app)
"PDF ilustrado / Para baixar, consultar e imprimir." e "Aplicativo / Para acessar os projetos direto pelo celular."
**vieram da imagem de exemplo do Doc** (image1), não do texto. Confirme se quer manter.

## 4. Oferta
- Tag: A OFERTA
- Título: Tudo em um só acesso, para sempre
- Subtítulo: Pagamento único. Sem mensalidade.
- Fita do card: OFERTA DE LANÇAMENTO
- Nome do plano: Coleção Completa · 100 Guias de Contas
- Preço: R$ 19,90 (da ficha OFERTA.md) · "pagamento único · acesso imediato"
- O que inclui:
  - 100 projetos ilustrados: 48 de orixás, 39 de linhas e entidades e 13 de técnicas
  - 200 páginas com materiais, quantidades, esquema das contas e as 8 etapas da montagem
  - Acesso pelo aplicativo e em PDF para imprimir
  - Acesso vitalício
  - + 4 BÔNUS INCLUSOS (os 4 títulos do Doc)
- Selos: Compra segura · 7 dias de garantia · Acesso imediato

**O que eu NÃO coloquei, de propósito** (a LP da miçanga tem, mas seria inventar):
- preço "de R$ X" riscado e "economize R$ X";
- valor de cada bônus ("R$ 47 grátis");
- cronômetro de 10 minutos que reinicia a cada visita.
Se você quiser algum desses, me diga o valor e eu coloco.

## 5. Garantia
- Título: Garantia de 7 dias
- Texto: Acesse o material, escolha uma guia e comece a montar. Se em até 7 dias você achar que não é para você,
  é só pedir o reembolso e devolvemos 100% do valor. Sem perguntas e sem burocracia.

## 6. FAQ (tag "DÚVIDAS", título "Perguntas frequentes")
1. **Preciso ter experiência para fazer?** Não. Cada projeto mostra a guia pronta, a lista de materiais com a quantidade
   de cada conta, o esquema da sequência e as 8 etapas ilustradas da montagem. A maioria dos modelos é de nível iniciante,
   feita com enfiamento simples. Os de nível intermediário, como fios paralelos, búzios e terminal com fecho, ficam para
   quando você pegar o jeito.
   *(conferido no `producao/conteudo.cjs`: os modelos são Iniciante ou Intermediário)*
2. **Que material eu preciso comprar?** O básico é fio de nylon, as contas nas cores do modelo, uma tesoura, um isqueiro
   para selar a ponta do fio e uma régua ou fita métrica. Cada projeto lista o que aquele modelo pede, com o tamanho e a
   quantidade de cada conta. O Bônus 01 traz uma lista de compras para começar.
3. **Serve para Umbanda e para Candomblé?** Os projetos trazem referências da Umbanda e do Candomblé, e cada página diz de
   qual tradição aquele modelo vem. Os 13 projetos de técnicas não seguem uma linha específica: eles ensinam padrões de
   montagem que você pode aplicar às cores que quiser.
   *(conferido no `modelos-calculados.json`: Umbanda e Candomblé Ketu; as 16 técnicas são "técnica"; em 26/10, com os 100 modelos, passaram a 13)*
4. **As cores da minha casa são diferentes. E agora?** É normal. As cores, a quantidade de contas e o fundamento de cada
   guia mudam conforme a casa, a nação e a linhagem. Use os projetos como referência de montagem e siga sempre a orientação
   do seu zelador ou da sua zeladora. Para mudar as cores, é só manter o esquema e trocar as contas.
5. **Como recebo o material?** É tudo digital. Assim que o pagamento é aprovado, você recebe no e-mail o acesso ao
   aplicativo e aos PDFs. Nada é enviado pelo correio.
   *(depende do cadastro na Wiapy e do app de membros, que ainda não existem: confirmar quando estiverem prontos)*
6. **Consigo acessar pelo celular?** Sim. No aplicativo você consulta os projetos direto pelo celular, e os PDFs abrem em
   qualquer celular, tablet ou computador. Se preferir, imprima as páginas para acompanhar a montagem na mesa.
7. **Posso vender as guias que eu fizer?** Pode. As guias que você confeccionar são suas, e o Bônus 03 mostra como calcular
   os custos, definir preços e organizar encomendas. O que não é permitido é revender ou compartilhar os arquivos do material.
8. **E se eu não gostar?** Você tem 7 dias de garantia. Se não ficar satisfeito, peça o reembolso e devolvemos o valor integral.

## 7. Rodapé
- Acrescentei a linha "Contato: TROCAR@email.com" (a garantia manda pedir reembolso, então precisa de um contato).
- Os links "TERMOS DE USO" e "POLÍTICA DE PRIVACIDADE" ainda não levam a lugar nenhum (`#TROCAR-TERMOS`, `#TROCAR-PRIVACIDADE`).

## 8. Textos alternativos das imagens (alt)
Descrições curtas de cada imagem para leitor de tela e SEO ("Página 1 do Modelo 09, Guia de Oxum dourada" etc.).
Não aparecem na tela.

## Números (26/10, produto de 100)
100 projetos = 48 de orixás (18 orixás) + 39 de linhas e entidades + 13 de técnicas e variações; 200 páginas ilustradas.
A versão da LP com os números de 60 ficou em `_geracao/index-antes-100.html`.
