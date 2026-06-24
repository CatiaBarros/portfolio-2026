---
title: "Five years of data inside a tooltip"
date: 2026-06-24
description: "How I used HTML to fit the foreign population's evolution since 2021 inside a Datawrapper map's tooltips."
tags: data journalism, Datawrapper, HTML, CSS
---

For anyone doing data, visual or infographic journalism, the tools we already have make life much easier. With a clean Excel file or a CSV, you can put a map or a chart online in maybe under five minutes.

The flip side is that personalising takes work. With public data, it is natural that several newsrooms end up with similar maps: they start from the same file, and the tools, by default, lead to similar results. There is nothing wrong with that. But in this case I felt like going a little further.

This Monday, Statistics Portugal (INE) resumed publishing its population estimates. It had suspended the releases on immigration and foreign resident population in order to validate the [AIMA data](https://expresso.pt/sociedade/2025-10-16-aima-reve-em-baixa-numero-de-estrangeiros-a-viver-em-portugal-sao-1.543.697-50d4eb45), which led to what at Expresso we called the [‘statistical void’](https://expresso.pt/sociedade/2025-12-18-estado-nao-sabe-quantos-sao-e-onde-vivem-os-imigrantes-ine-suspende-estatisticas-e-admite-reavaliar-numeros-b0f222c3): in December 2025, the State did not know for certain how many immigrants there were nor where they lived.

INE's revision was not only about 2025. The institute also revised the 2021 to 2024 figures and, for the foreign population, published 2024 for the first time. The corrections were large, and came almost entirely from the foreign population, which had been undercounted. To give an idea: the total number of residents in 2024 rose from 10.7 to 11.4 million, and the number of foreigners in 2023 went from around 1.05 to 1.35 million. In 2025, the resident population reached 11,424,031, the highest figure on record, more than 800,000 people up on 2021, almost all of it through immigration.

INE's numbers are also different in nature from AIMA's. They are an estimate of residents, cross-referencing tax, social security and school records to work out where people actually live, rather than a count of residence permits.

With so many new numbers, and with what data journalism allows, letting readers see the data wherever they want, I knew it was worth doing the portrait: who they are, where they live and where they come from.

But there was a problem. The data ran from 2021 to 2025, and a choropleth shows a single number, the 2025 one. I felt that years and years of information were going to be left behind, hidden under one flat colour.

And the web has a rare advantage: it lets you tinker underneath what is on show. So that is what I did, a version of the map where hovering over a municipality reveals the evolution since 2021.

![Map of the foreign population by municipality, with the tooltip for Odemira open, showing the evolution since 2021](https://images.impresa.pt/expresso/2026-06-22-pop_estrangeira_retrato-ff8a0742-1/original)

Datawrapper is clear about this in its documentation: it explains how to [change the way data appears in tooltips](https://www.datawrapper.de/academy/i-want-to-change-how-my-data-appears-in-tooltips) and even how to [embed charts inside them](https://www.datawrapper.de/academy/how-to-embed-charts-into-tooltips). That was exactly what I wanted. With HTML, I managed to fit the five years into a tooltip: on one side, the absolute numbers for 2021 and 2025; on the other, a small bar chart with the share of foreigners in the total resident population, year by year.

I set myself two rules. The chart's scale had to be the same across every municipality, so the bars would be comparable from one tooltip to the next. And the colour of each bar had to match the map's legend, instead of a single colour, so that each year's bar said the same thing as the shaded municipality.

The percentages, the height of each bar and the colour of each year were worked out beforehand and added to the file as columns. In the tooltip, it is just a matter of slotting them into place, through placeholders:

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
        <!-- '22, '23, '24 follow the same pattern -->
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

The bar is the trick: a grey track of fixed height, 64px, with a second element inside it whose height and colour come from the file. Pinned to the bottom, it grows upwards, the way a bar should.

In Odemira, the municipality with the highest share of foreign population in the country, the tooltip shows 14,794 foreigners in 2021 and 22,930 in 2025, with the percentage series at 41%, 48%, 52%, 53% and 52%. Note that 2024 (53%) is above 2025 (52%). It is not a clean rise all the way to the end, and that was exactly what I wanted to show: the trajectory, not an arrow pointing up.

In the end, underneath, it is still the same choropleth. What changes is what the reader finds when they get closer: five years of history where, by default, only one number would appear. That is what I wanted to add.

You can read the article and explore the data [here](https://expresso.pt/migracoes/2026-06-22-fim-do-vazio-estatistico-quem-sao-onde-vivem-e-de-onde-vem-os-imigrantes-em-portugal-7fe2b024).
