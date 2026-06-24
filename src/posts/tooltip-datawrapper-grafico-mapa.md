---
title: "Cinco anos de dados dentro de uma tooltip"
title_en: "Five years of data inside a tooltip"
date: 2026-06-24
description: "Como usei HTML para meter a evolução da população estrangeira desde 2021 dentro das tooltips de um mapa do Datawrapper."
description_en: "Using HTML to fit the foreign population's evolution since 2021 inside a Datawrapper map's tooltips."
tags: jornalismo de dados, Datawrapper, HTML, CSS
---

Para quem faz jornalismo de dados, visual ou infográfico, as ferramentas que já existem facilitam imenso a vida. Com um ficheiro de Excel limpo ou um CSV, é possível pôr um mapa ou um gráfico no ar em talvez menos de cinco minutos.

O reverso é que personalizar dá trabalho. Com dados públicos, é natural que vários jornais cheguem a mapas parecidos: partem do mesmo ficheiro e as ferramentas, por defeito, levam a resultados semelhantes. Não tem nada de mal. Mas, neste caso, apeteceu-me ir um pouco mais além.

Esta segunda-feira, o INE voltou a publicar as estimativas da população. Tinha suspendido as publicações sobre imigração e população estrangeira para validar os [dados da AIMA](https://expresso.pt/sociedade/2025-10-16-aima-reve-em-baixa-numero-de-estrangeiros-a-viver-em-portugal-sao-1.543.697-50d4eb45), e foi assim que se chegou ao que no Expresso chamámos de [‘vazio estatístico’](https://expresso.pt/sociedade/2025-12-18-estado-nao-sabe-quantos-sao-e-onde-vivem-os-imigrantes-ine-suspende-estatisticas-e-admite-reavaliar-numeros-b0f222c3): em dezembro de 2025, o Estado não sabia ao certo quantos eram nem onde viviam os imigrantes.

A revisão do INE não foi só de 2025. O Instituto reviu também os números de 2021 a 2024 e, no caso da população estrangeira, publicou 2024 pela primeira vez. As correções foram grandes, e vieram quase todas da população estrangeira, que estava subavaliada. Para dar uma ideia: o total de residentes em 2024 subiu de 10,7 para 11,4 milhões, e o número de estrangeiros em 2023 passou de cerca de 1,05 para 1,35 milhões. Em 2025, a população residente chegou aos 11.424.031, o valor mais alto de que há registo, com mais de 800 mil pessoas do que em 2021, quase tudo por via da imigração.

Os números do INE são, ainda assim, de natureza diferente dos da AIMA. São uma estimativa de residentes, que cruza registos fiscais, da segurança social e escolares para apurar onde as pessoas vivem, e não uma contagem de títulos de residência.

Com tantos números novos, e com aquilo que o jornalismo de dados permite, deixar o leitor ver os dados onde quer, sabia que valia a pena fazer o retrato: quem são, onde vivem e de onde vêm os imigrantes em Portugal.

Mas havia um problema. Os dados iam de 2021 a 2025, e um coroplético mostra um número só, o de 2025. Sentia que anos e anos de informação iam ficar esquecidos, escondidos atrás de uma cor única.

E a web tem uma vantagem rara: deixa mexer por baixo do que está à vista. Foi o que fiz, uma versão do mapa onde, ao passar o cursor por um concelho, aparece a evolução desde 2021.

![Mapa da população estrangeira por concelho, com a tooltip do concelho de Odemira aberta a mostrar a evolução desde 2021](https://images.impresa.pt/expresso/2026-06-22-pop_estrangeira_retrato-ff8a0742-1/original)

O Datawrapper é claro na documentação sobre isto: explica como [mudar a forma como os dados aparecem nas tooltips](https://www.datawrapper.de/academy/i-want-to-change-how-my-data-appears-in-tooltips) e até como [embeber gráficos dentro delas](https://www.datawrapper.de/academy/how-to-embed-charts-into-tooltips). Era exatamente o que eu queria. Com HTML, consegui condensar os cinco anos numa tooltip: de um lado, os números absolutos de 2021 e 2025; do outro, um pequeno gráfico de barras com a percentagem de estrangeiros no total de residentes, ano a ano.

Impus duas regras. A escala do gráfico tinha de ser igual em todos os concelhos, para que as barras fossem comparáveis de tooltip para tooltip. E a cor de cada barra tinha de coincidir com a legenda do mapa, em vez de uma cor única, para que a barra de cada ano dissesse a mesma coisa que o concelho pintado.

As percentagens, a altura de cada barra e a cor de cada ano foram calculadas antes e juntas ao ficheiro como colunas. Na tooltip, é só encaixá-las no sítio, através de placeholders:

```html
{{ UPPER(nome) }} <hr>
<div style="font-family:inherit;width:max-content;max-width:340px;padding:0px 0px">
  <div style="font-size:11px;color:#888;margin:2px 0 2px">População estrangeira</div>
  <div style="display:flex;gap:4px;align-items:flex-start">
    <div style="flex:0 0 auto">
      <div style="font-size:11px;color:#888;line-height:1.1">em 2021</div>
      <div style="font-size:13px;color:#888;margin-bottom:8px">{{ FORMAT(valor_2021, "0,0") }}</div>
      <div style="font-size:11px;color:#015782;line-height:1.1">em 2025</div>
      <div style="font-size:22px;font-weight:bold;color:#015782;line-height:1.1">{{ FORMAT(valor_2025, "0,0") }}</div>
   </div>
    <div style="flex:0 0 auto;border-left:1px solid #e5e5e5;padding-left:6px">
      <div style="font-size:10px;color:#888;margin-bottom:6px;white-space:nowrap">% do total de residentes</div>
      <div style="display:flex;align-items:flex-end;gap:6px">
        <div style="display:flex;flex-direction:column;align-items:center;width:18px">
          <span style="font-size:9px;color:#888;line-height:1;margin-bottom:2px">{{ FORMAT(percentagem_2021, "0%") }}</span>
          <div style="width:12px;height:64px;background:#eef1f3;display:flex;align-items:flex-end">
            <div style="width:100%;height:{{ altura_2021 }}px;background:{{ cor_2021 }}"></div>
          </div>
          <span style="font-size:9px;color:#888;margin-top:3px">'21</span>
        </div>
        <!-- '22, '23, '24 seguem o mesmo padrão -->
        <div style="display:flex;flex-direction:column;align-items:center;width:18px">
          <span style="font-size:9px;font-weight:bold;color:#015782;line-height:1;margin-bottom:2px">{{ FORMAT(percentagem_2025, "0%") }}</span>
          <div style="width:12px;height:64px;background:#eef1f3;display:flex;align-items:flex-end">
            <div style="width:100%;height:{{ altura_2025 }}px;background:{{ cor_2025 }}"></div>
          </div>
          <span style="font-size:9px;color:#015782;font-weight:bold;margin-top:3px">'25</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

A barra é o truque: um carril cinzento de altura fixa, 64px, e lá dentro um segundo elemento cuja altura e cor vêm do ficheiro. Encostado ao fundo, cresce de baixo para cima, como uma barra deve crescer.

Em Odemira, o concelho com maior peso de população estrangeira do país, a tooltip mostra 14 794 estrangeiros em 2021 e 22 930 em 2025, com a série de percentagens em 41%, 48%, 52%, 53% e 52%. Reparem que 2024 (53%) está acima de 2025 (52%). Não é uma subida limpa até ao fim, e era isso que eu queria mostrar: a trajetória, e não uma seta a apontar para cima.

No fim, por baixo, continua a ser o mesmo coroplético. O que muda é o que o leitor encontra quando se aproxima: cinco anos de história onde, por defeito, só apareceria um número. Foi isso que quis acrescentar.

Podes ler o artigo e explorar os dados [aqui](https://expresso.pt/migracoes/2026-06-22-fim-do-vazio-estatistico-quem-sao-onde-vivem-e-de-onde-vem-os-imigrantes-em-portugal-7fe2b024).
