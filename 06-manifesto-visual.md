# Manifesto visual e proveniência

**Revisão atual:** a capa anterior foi substituída na página por `public/assets/capa-enfermagem.svg`, desenho vetorial editorial de fundo branco, marinho e roxo com ramificações magenta, teal e amarelo. O hero e a oferta usam a nova capa num livro composto em CSS, com duas páginas reais atrás. O celular foi retirado. Os encaixes atuais do hero são 580×350 px no desktop, 100%×278 px no celular e 245 px de altura em telas menores que 350 px. A galeria agora é manual. As páginas reais não foram alteradas.

O template preservado em `referencias-template-originais/` fornece referência de composição; o conteúdo de cada mapa vem da pasta `imagens/` do produto. As cópias PNG em `public/assets/originais/` e os WebP derivados mantêm os pixels originais, exceto compressão e redução de miniatura. Nenhuma página interna foi regenerada.

| ID | Encaixe | Conteúdo real | Referência estrutural da skill | Saída | Método | Estado |
|---|---|---|---|---|---|---|
| IMG-01 | Hero, 570×360 / móvel 285 px alto | `SUS-01`, `FUN-01`, `SUS-06`, `FUN-05` | `ProductComposition`, `hero-capa-principal.webp`, `hero-mapa-*.webp` | composição CSS + `capa-rascunho.svg` | páginas reais, capa vetorial editável | integrado, capa final pendente |
| IMG-02 | Galeria, página 1054:1492 | `SUS-01`, `SUS-04`, `SUS-06`, `SUS-20`, `FUN-01`, `FUN-05` | `gallery-card`, páginas da galeria oficial | `*-thumb.webp` e `*.webp` | derivação direta com Pillow | integrado |
| IMG-03 | Pitch, 494×410 / móvel 300 px alto | `SUS-04`, `FUN-05` | `mid-pitch-media`, `mockup-midpitch-v3.png` | composição de duas páginas | CSS, sem alterar páginas | integrado |
| IMG-04 | Coleção, 760×420 / móvel 300 px alto | `SUS-20`, `FUN-01`, `SUS-01` | `receive-media`, `mockup-receive-v2.png` | leque de páginas | CSS, sem alterar páginas | integrado |
| IMG-05 | Oferta, 464×270 / móvel 235 px alto | mesmos mapas reais do hero | `plan-mockup` do template | composição compacta | CSS, sem alterar páginas | integrado |
| IMG-06 | Logo | nome e linguagem gráfica presentes em `SUS-01.png` | badge do hero e tipografia do starter | `logo.svg` | desenho vetorial original | integrado, sujeito à revisão de marca |
| IMG-07 | Capa | nome do produto e mapa real como linguagem visual | capa central do `ProductComposition` | `capa-rascunho.svg` | desenho vetorial original | rascunho; substituir pela capa final |

**Prompts de geração de imagem:** não aplicáveis aos ativos acima. As composições são feitas em CSS e os mapas são páginas reais. O gerador disponível não permite confirmar a seleção Image 2.5 High; essa limitação foi comunicada ao usuário antes de construir as composições. Comparador, cenas de uso e bônus permanecem omitidos por falta de arquivos próprios adequados.
