---
title: "My engineer friends were right"
date: 2026-07-07
description: "On winging it, repurposing mechanics, and the criticism my engineer friends always had for me: you have to know how to reuse."
tags: data journalism, newsgames, gamification, Svelte
share_image: "https://catia.pt/posts/amigos-engenheiros-share.png"
---

During secondary school I studied sciences, a choice nudged along by a teacher who saw a future engineer in me. They weren't the years I felt most comfortable in (it didn't help being the only girl in the class, with the sense that everything cost me more just because of that, but that's a story for another day).

I keep good memories from that time and, above all, a group of friends who still show up at any hour. Unlike me, they all went into some kind of engineering and work in tech today. I went into journalism, but I never stopped wanting to bring their world together with mine.

I'm a pandemic graduate. I finished my degree in June 2020, over Zoom, and it was around then that I decided to learn web development, largely because I wasn't even sure journalism was really for me. I bought a twelve-euro course on Udemy and learned to live by the fine art of *desenrascanço*, that very Portuguese skill of making do: hours on Stack Overflow (I'll admit I even miss it) and endless messages to my friends asking how on earth you did this or that.

They never quite got why I gave myself so much trouble. They found it odd, but they soon came round to the fact that I'd got it into my head to go this way and there was no turning back.

And they've always been tireless. They don't mind when I go on about gamification for hours or throw them questions that make no sense, and they still haven't given up on explaining object-oriented programming to me. They tell me I understand more than I think, but there's one criticism that never fails: I don't think like an engineer.

And it's true. An engineer sets out to make their own life easier: if a mechanic works, they make it reusable. I worked the other way round, every project started from scratch and thrown out at the end. When we get together for a coffee back in our hometown, the conversation always lands on "so, how's work?", and a while ago one of them started letting slip a "you're starting to think like an engineer".

And I think they're right, not just about me. We hear so much about productivity, about how AI is going to save us, but before any of that there's a much simpler move within reach of any journalist: to think a little like an engineer. To ask what you can put together now so you're not repeating the same work tomorrow. In journalism this matters even more, because we live plunged in the tide of the news cycle and the world interrupts us at every turn.

These past days have been swept up by that tide. Portugal's statistics office (INE) put an end to the statistical void around [who the country's immigrants are and where they come from](https://expresso.pt/migracoes/2026-06-22-fim-do-vazio-estatistico-quem-sao-onde-vivem-e-de-onde-vem-os-imigrantes-em-portugal-7fe2b024), Venezuela [shook twice in 39 seconds](https://expresso.pt/venezuela/2026-06-25-dois-sismos-em-39-segundos-onde-com-que-forca-e-ha-quanto-tempo-nao-tremia-assim-a-venezuela-2e498f2b), there were [wildfires](https://multimedia.expresso.pt/incendios2025/) and the [rules for accessing the national health service changed](https://expresso.pt/sociedade/saude/2026-07-05-novas-regras-de-acesso-ao-sns-o-que-muda-e-quem-arrisca-perder-o-medico-de-familia--bdf4b551). I wrote about all of it over the last fortnight. And in the middle of the rush, I still managed to launch two newsgames a week apart. One is a [quiz on the history of the football World Cups](https://multimedia.expresso.pt/mundial2026quiz), with a look inspired by Panini stickers and sticker albums. The other tells the [250 years of US independence](https://multimedia.expresso.pt/independenciaeua/) through a timeline of presidents and milestones, and came out on the 4th of July.

![Opening screen of the World Cup quiz: a grid of blue cards showing players from various national teams, styled like a sticker album.](/posts/quiz-mundiais-tribuna.png)
*The World Cup quiz, on Tribuna Expresso, with a look inspired by Panini stickers.*

![Opening screen of the 250-years-of-the-US game: a row of presidential portraits over a timeline running from 1776 to 2026.](/posts/jogo-250-anos-eua.png)
*250 years of US independence, from the presidents to the most defining moments.*

Both come from the same idea, gamifying timelines, something the New York Times does beautifully in its [quiz](https://www.nytimes.com/spotlight/flashback). The mechanic is identical: you get one card at a time, with a clue, and you have to slot it into the right place on the timeline. The logic for dragging, checking and scoring is written once only; from one game to the other, all I swap is the data file, which I put together with colleagues who know far more about World Cups and the United States than I do.

It's the part I like most. An old-fashioned timeline is a list of dates your eyes just slide past. Turned into a game, it puts the reader at the centre of the story: instead of receiving it ready-made, they arrange each event themselves and build the chronology at their own pace. And for anyone who just wants the facts, there's always the option to skip ahead and read it straight through.

The interfaces couldn't be more different, but it's the same machinery telling 250 years of American history or decades of World Cups. A few years ago I'd have built both from start to finish, one by one. This time I built an engine, and for the next playable timeline I won't be starting from scratch. Maybe that's all they were trying to tell me, sitting there at the café table.
