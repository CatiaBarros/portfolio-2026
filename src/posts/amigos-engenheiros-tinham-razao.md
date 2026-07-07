---
title: "Os meus amigos engenheiros tinham razão"
title_en: "My engineer friends were right"
date: 2026-07-07
description: "Sobre desenrascar, reaproveitar mecânicas e a crítica que os meus amigos engenheiros sempre me fizeram: é preciso saber reutilizar."
description_en: "On winging it, repurposing mechanics, and the criticism my engineer friends always had for me: you have to know how to reuse."
tags: jornalismo de dados, newsgames, gamificação, Svelte
share_image: "https://catia.pt/posts/amigos-engenheiros-share.png"
---

Durante o secundário estudei ciências, uma escolha influenciada por um professor que via em mim uma futura engenheira. Não foram os anos em que me senti mais confortável (não ajudava ser a única rapariga da turma, com a sensação de que tudo me custava mais só por isso, mas esse é assunto para outro dia).

Guardo boas memórias dessa altura e, sobretudo, um grupo de amigos que ainda hoje aparecem a qualquer hora. Ao contrário de mim, todos eles enveredaram por alguma engenharia e trabalham em informática. Eu fui pelo jornalismo, mas nunca deixei de querer juntar o mundo deles ao meu.

Sou finalista da pandemia. Acabei a licenciatura em junho de 2020, por Zoom, e foi por essa altura que decidi aprender desenvolvimento web, muito por nem ter a certeza de que o jornalismo era mesmo para mim. Comprei um curso de doze euros na Udemy e aprendi a viver na arte do desenrascanço: horas de Stack Overflow (confesso que até tenho saudades) e mensagens intermináveis aos meus amigos a perguntar como raio se fazia isto ou aquilo.

Eles nunca perceberam bem por que é que eu me dava a tanto trabalho. Achavam estranho, mas depressa se renderam à ideia de que eu tinha metido na cabeça seguir por ali e não havia volta a dar.

E foram sempre incansáveis. Não se chateiam quando lhes falo de gamificação durante horas ou lhes atiro dúvidas sem pés nem cabeça, e ainda não desistiram de me explicar o que é a programação orientada a objetos. Dizem-me que percebo mais do que julgo, mas há uma crítica que nunca falha: eu não penso como um engenheiro.

E é verdade. Um engenheiro trata de facilitar a própria vida: se uma mecânica funciona, torna-a reutilizável. Eu funcionava ao contrário, cada projeto começado do zero e deitado ao lixo no fim. Quando nos juntamos para um café lá na nossa terra natal, a conversa cai sempre no «então, e o trabalho?», e há uns tempos começou a escapar-lhes um «estás a começar a pensar como uma engenheira».

E acho que têm razão, não só sobre mim. Fala-se tanto de produtividade, de como a IA nos vai salvar a vida, mas antes disso há um gesto bem mais simples ao alcance de qualquer jornalista: pensar um bocadinho como engenheiro. Perguntar o que se pode montar agora para não andar a repetir o mesmo trabalho amanhã. No jornalismo isto faz ainda mais sentido, porque vivemos mergulhados na maré da atualidade e o mundo interrompe-nos a toda a hora.

Estes dias têm sido tomados por essa maré. O INE pôs fim ao vazio estatístico sobre [quem são e de onde vêm os imigrantes em Portugal](https://expresso.pt/migracoes/2026-06-22-fim-do-vazio-estatistico-quem-sao-onde-vivem-e-de-onde-vem-os-imigrantes-em-portugal-7fe2b024), a Venezuela [tremeu duas vezes em 39 segundos](https://expresso.pt/venezuela/2026-06-25-dois-sismos-em-39-segundos-onde-com-que-forca-e-ha-quanto-tempo-nao-tremia-assim-a-venezuela-2e498f2b), houve [incêndios](https://multimedia.expresso.pt/incendios2025/) e mudaram as [regras de acesso ao SNS](https://expresso.pt/sociedade/saude/2026-07-05-novas-regras-de-acesso-ao-sns-o-que-muda-e-quem-arrisca-perder-o-medico-de-familia--bdf4b551). Escrevi sobre tudo isto nos últimos quinze dias. E, no meio da correria, ainda lancei dois newsgames com uma semana de intervalo. Um é um [quiz sobre os Mundiais de futebol](https://multimedia.expresso.pt/mundial2026quiz), com estética de cromos à Panini. O outro conta os [250 anos da independência dos EUA](https://multimedia.expresso.pt/independenciaeua/) numa timeline de presidentes e marcos, e saiu a 4 de julho.

![Ecrã inicial do quiz dos Mundiais: uma grelha de cartas azuis com jogadores de várias seleções, ao estilo de caderneta de cromos.](/posts/quiz-mundiais-tribuna.png)
*O quiz dos Mundiais, no Tribuna Expresso, com cada seleção transformada em cromo.*

![Ecrã inicial do jogo dos 250 anos dos EUA: uma fila de retratos de presidentes sobre uma linha do tempo que vai de 1776 a 2026.](/posts/jogo-250-anos-eua.png)
*Os 250 anos da independência dos EUA, dos presidentes aos momentos mais marcantes.*

Os dois nascem da mesma ideia, gamificar timelines, uma coisa que o New York Times faz lindamente no seu [quiz](https://www.nytimes.com/spotlight/flashback). A mecânica é idêntica: recebes uma carta de cada vez, com uma pista, e tens de a encaixar no sítio certo da linha do tempo. A lógica de arrastar, validar e pontuar está escrita uma única vez; de um jogo para o outro, só troco o ficheiro de dados, que preparei com colegas que sabem muito mais de Mundiais e dos Estados Unidos do que eu.

É essa a parte de que mais gosto. Uma timeline à moda antiga é uma lista de datas por onde os olhos passam sem parar. Transformada em jogo, coloca quem lê no centro da história: em vez de a receber pronta, é a própria pessoa que arruma cada acontecimento no seu lugar e vai construindo a cronologia a seu ritmo. E, para quem só quer informar-se, fica sempre a porta aberta para passar tudo à frente e ler de seguida.

As interfaces não podiam ser mais diferentes, mas é a mesma engrenagem a contar 250 anos de história americana ou décadas de Mundiais. Há uns anos teria feito os dois do princípio ao fim, um a um. Desta vez fiz um motor, e para a próxima timeline jogável já não parto do zero. Se calhar era só isto que eles andavam a tentar dizer-me, ali sentados à mesa do café.
