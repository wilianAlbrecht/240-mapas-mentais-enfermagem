# Direção visual — prévia da página

## Revisão solicitada pelo usuário em 09/10/2026

Esta revisão substitui as escolhas visuais abaixo: fundo principal branco, superfícies secundárias cinza quase branco `#f8f9fc`, faixa de cabeçalho marinho `#19233f` com o nome do produto, pergunta do hero numa faixa vermelha `#cd2344` com texto branco em caixa alta. A segunda parte da headline destaca `240` em roxo. CTAs roxos `#6730a0`, ícones de benefício verde-água. A capa nova `capa-enfermagem.svg` usa fundo branco, tipografia marinho, lombada roxa e ramificações inspiradas nas cores dos PDFs. Páginas reais continuam ao fundo da composição; o celular e a terceira folha foram retirados do hero para reduzir densidade.

A galeria agora é manual, com deslize, setas e teclado. O mecanismo usa duas colunas no celular. As situações do público viraram linhas compactas; o FAQ tem divisórias simples. Textos foram encurtados para leitura móvel. As alterações estão em `src/refresh.css`, carregado depois do CSS do starter para preservar a estrutura da página.

## Modo e dials

- **Modo:** página nova construída a partir do starter oficial 50 Lições/Enem. Os elementos editoriais de Enem foram removidos da página e preservados em `referencias-template-originais/` para consulta.
- **Dials:** variação 4, movimento 3, densidade 5. O carrossel da galeria se move lentamente e pausa com interação ou preferência por movimento reduzido.
- **Arquitetura preservada:** hero centralizado, dor em seis chips, galeria horizontal, quatro cards do mecanismo, pitch, público, card de benefícios, oferta estreita e FAQ.

## Identidade proposta

Os mapas reais usam fundo claro com títulos em marinho e roxo, além de ramos magenta, amarelo, azul e verde-água. A página reduz a quantidade de cores por componente para preservar leitura e usa as cores vivas como acentos. A marca criada em `public/assets/logo.svg` representa um núcleo com ramificações e um check. É vetorial e editável. A capa de rascunho em `public/assets/capa-rascunho.svg` não substitui a capa final do produto.

| Papel | Cor | Uso |
|---|---|---|
| Marinho | `#101a40` | títulos, estrutura, oferta, rodapé |
| Roxo | `#5a2191` | marca, detalhes de composição |
| Verde-água | `#078b86` | família única de CTAs e checks |
| Amarelo | `#f7bd13` | atenção e pequenos destaques |
| Magenta | `#ee0b69` | detalhe da capa, sem competir com CTA |
| Fundo | `#fcfaf6` / `#faf3e8` | alternância de leitura |

Tipografia: Fira Sans Condensed 800 para títulos e Fira Sans 400/700 para corpo, ambas hospedadas localmente. Raios: controles 12 px, cards 16 px, composição destacada 22 px. Bordas suaves antes de sombra; sombra profunda reservada ao conjunto de páginas e ao card da oferta. Sem textura de fundo decorativa; as próprias páginas têm a energia visual da identidade.

## Hierarquia e comportamento

- O hero mantém badge com o nome oficial, a headline e subheadline literais do usuário, composição de páginas reais com capa provisória, três bullets e CTA para `#previas`.
- As miniaturas da galeria abrem as versões WebP completas. Os PNGs originais permanecem em `public/assets/originais/`.
- CTA intermediário leva a `#oferta`. O único CTA externo será o do card de preço, quando checkout, preço, garantia e coleção estiverem prontos. No momento ele está desativado.
- A oferta não mostra contagem regressiva ou tarja diária porque o prazo informado não está configurado para uma venda efetiva da coleção incompleta.
- Não há fotos de pessoas, depoimentos, selos de aprovação ou telas simuladas.

## Encaixes definidos antes das composições

Ver `05-inventario-de-mockups.md`. Páginas e capa usam `object-fit: contain`. A galeria usa proporção nativa 1054:1492. A variante móvel é composta em CSS, com redução e rearranjo das mesmas páginas reais; não há recorte fotográfico.
