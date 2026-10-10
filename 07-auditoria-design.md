# Auditoria da prévia local

Data: 09/10/2026. **Estado: prévia funcional em React, com revisão visual local realizada.**

## Revisão visual posterior solicitada pelo usuário

- Fundo branco aplicado, com superfícies cinza muito claro para alternância. Faixa de nome no cabeçalho; antiga pílula removida. Pergunta em faixa vermelha com texto branco, caixa alta; segunda linha da headline com 240 mapas.
- Capa redesenhada em SVG editorial, com lombada roxa e páginas reais atrás. Textos e cards encurtados; galeria sem movimento automático e mecanismo em duas colunas no celular.
- Layout inspecionado em 320, 390, 768 e 1280 px após a revisão. Em todas as larguras, `scrollWidth` igual a `clientWidth`, sem rolagem lateral.
- A nova instrução de headline substitui a anterior. Os placeholders comerciais agora têm rótulos legíveis; checkout continua desativado.
- Galeria manual conferida com setas; a primeira navegação do hero continua levando a `#previas`. Cards do mecanismo e pitch inspecionados no celular. Console sem erros. `npm run build` passou após a revisão, mantendo apenas avisos não fatais de `use client` do pacote de ícones.

## Arquitetura e copy

- O starter oficial foi usado como base. Sequência ativa: hero, dor, galeria, mecanismo, pitch, público, produto, oferta, garantia/segurança, FAQ e rodapé.
- Condicionais omitidos com justificativa em `03-copy-completa.md`: urgência, antes/depois, demonstração de uso, bônus, prova social, passos pós-compra e fecho emocional.
- Headline e subheadline aparecem literalmente como escritas pelo usuário em `src/content.js` e no hero. A grafia e as alegações foram preservadas por instrução expressa e precisam de revisão antes de divulgação.
- Nenhum conteúdo de ENEM, preço de exemplo, desconto, depoimento ou bônus fictício permanece em `src/` e `index.html`.
- Badge do hero usa o nome visto nos mapas: `MAPA DA APROVAÇÃO EM ENFERMAGEM`.

## Sistema visual

- Modo: página nova no template oficial. Dials: variação 4, movimento 3, densidade 5.
- Cores: marinho `#101a40`, roxo `#5a2191`, verde-água `#078b86`, amarelo `#f7bd13`, magenta `#ee0b69` e fundos quentes. CTAs usam uma cor única.
- Tipografia local Fira Sans Condensed / Fira Sans. Três raios principais: 12, 16 e 22 px.
- Logo vetorial original em `public/assets/logo.svg`; capa vetorial em `public/assets/capa-rascunho.svg`, marcada como rascunho.
- Galeria, pitch e coleção usam páginas reais. Miniaturas WebP têm link para versão de maior resolução. PNGs originais foram preservados.
- Os ativos ENEM copiados com o starter foram movidos para `referencias-template-originais/` e não fazem parte da build pública.

## Interação, responsividade e acessibilidade

- Hero → `#previas`; demais CTAs → `#oferta`; checkout externo existe somente como campo comercial e está desativado nesta prévia.
- Galeria tem botões laterais, swipe/scroll, pausa ao interagir e alternativa para `prefers-reduced-motion`. Itens duplicados do loop estão `aria-hidden` e `inert`.
- FAQ usa `details`/`summary`; links de imagens completas usam `target=_blank` com `rel=noopener noreferrer`.
- Imagens possuem dimensões, `alt`, `object-fit: contain` e lazy loading fora do hero. Fontes críticas e capa são pré-carregadas.
- Breakpoints do starter em 800 e 560 px preservados e ajustados para composições reais.
- Meta `noindex, nofollow` e `robots.txt` com `Disallow: /` porque a oferta está em rascunho.
- Revisão visual realizada no navegador do Codex em 320, 390, 768 e 1280 px. A composição do hero e a galeria foram ajustadas após observar excesso horizontal e cards altos. Ao final, `scrollWidth` ficou igual a `clientWidth` no celular de 320 px; 390, 768 e 1280 px também não apresentaram excesso horizontal.
- Botão do hero confirmado em `#previas`; botão intermediário confirmado em `#oferta`. A resposta sobre os 240 mapas abriu no FAQ. O botão de checkout permaneceu desativado. Console sem mensagens de erro.
- **Pendente:** varredura completa por teclado/foco e contraste medido. A inspeção visual de cada imagem no tamanho final continua necessária após a capa definitiva e os mapas restantes.

## Build e arquivos

- `npm install` concluído; `package-lock.json` gerado. O `pnpm-lock.yaml` antigo foi guardado junto das referências do template.
- `npm run build` passou em 09/10/2026 com Vite 8.3.4. Houve avisos não fatais da diretiva `use client` de `lucide-react`.
- Referências estáticas de `/assets/` verificadas no diretório público; as seis páginas da galeria têm derivados completos correspondentes.
- **Pendente:** Lighthouse de produção (Performance, Acessibilidade, Boas Práticas, SEO, LCP, CLS, peso transferido). Os valores não foram medidos nesta prévia.

## Portão factual antes de uso comercial

1. Concluir os 200 mapas pendentes, validar tecnicamente e verificar atualização normativa antes de anunciar os 240 como entregáveis imediatos.
2. Revisar a headline literal do usuário, especialmente `que enfermagem`, e sustentar ou editar `atualizados` e `gabaritar`.
3. Confirmar preço, garantia, checkout, entrega, bônus e dados legais. O briefing anterior da coleção de 200 mapas não foi aplicado a esta versão.
4. Configurar prazo comercial absoluto antes de exibir a oferta que expira hoje; nenhum contador reiniciável foi criado.
5. Substituir a capa de rascunho pela capa final aprovada.
6. Repetir QA visual após integrar a capa e a coleção finais, além de medir Lighthouse antes de publicar.
