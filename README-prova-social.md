# Blocos de prova social

Dois blocos já estão prontos dentro do `index.html`, logo depois da seção
`#ViajeComATerra`, mas **comentados**. Eles não aparecem no site enquanto os
arquivos não existirem. É de propósito: bloco vazio é pior do que bloco nenhum.

---

## 1. Prints de WhatsApp e Instagram

**Arquivos que precisam existir em `public/`:**

- `print-cliente-1.webp`
- `print-cliente-2.webp`
- `print-cliente-3.webp`

**Como preparar cada print**

1. Tire o print no celular.
2. **Apague ou borre antes de salvar:** número de telefone, foto de perfil de
   quem você não pediu autorização, nome de hotel com número de reserva,
   endereço completo, código de voo e qualquer valor em dinheiro.
3. Converta para WebP mantendo a proporção do celular (algo perto de 600x900).
   Do próprio projeto:

   ```bash
   node -e "require('sharp')('print.png').resize({width:600,withoutEnlargement:true}).webp({quality:82}).toFile('public/print-cliente-1.webp')"
   ```

**Como ligar o bloco**

No `index.html`, procure por `BLOCOS OPCIONAIS DE PROVA SOCIAL`. Logo abaixo há
um `<!--` e, no fim do bloco `<section class="prints">`, um `-->`. Apague essas
duas linhas.

**Antes de publicar:** troque o `alt` de cada imagem. O texto que está lá
(`Descreva aqui o que a mensagem diz`) é um lembrete, não um alt. Quem usa
leitor de tela não vê o print, então o alt precisa dizer o que a mensagem diz,
por exemplo: `Mensagem de cliente agradecendo o suporte com a troca de voo`.

---

## 2. Vídeo curto de cliente

**Arquivos que precisam existir em `public/`:**

- `video-cliente.mp4`
- `video-cliente-poster.webp` (a imagem que aparece antes de dar play)

**Como preparar**

- Até 40 segundos. Vídeo longo ninguém assiste.
- Vertical, do jeito que saiu do celular.
- O `poster` é obrigatório: sem ele o navegador baixa parte do vídeo só para
  mostrar o primeiro quadro, e isso pesa no carregamento da página.
- O `preload="none"` já está no código. Não tire: é ele que faz o vídeo só
  baixar quando alguém clica em play.

**Como ligar o bloco**

Mesma coisa: apague o `<!--` e o `-->` que cercam a `<section class="video-cliente">`.

**Antes de publicar:** troque `Nome do cliente, destino, mês e ano` pela
legenda de verdade.

---

## 3. Autorização

Todo print, foto e vídeo de cliente precisa de autorização dele antes de ir pro
site. Uma mensagem no WhatsApp perguntando e a resposta dizendo que pode, já
serve. Guarde a conversa.

---

## 4. Depoimento numa página de destino

Existe uma classe pronta, `.depoimento-do-destino`, para colocar o depoimento de quem já
foi àquele lugar dentro da página do destino. O exemplo está em `paris.html`.

Para repetir em outra página, cole isto antes da seção de contato e troque os
dados:

```html
<section class="depoimento-do-destino">
    <div class="container">
        <blockquote>
            <p>"Texto do depoimento, palavra por palavra, sem corte no meio."</p>
            <footer>
                <img width="800" height="800" loading="lazy" decoding="async"
                     src="nome-do-arquivo.webp" alt="Nome, cliente da Terra Venture">
                <span class="depoimento-do-destino-quem">
                    <strong>Nome do cliente</strong>
                    <span>Destino</span>
                </span>
            </footer>
        </blockquote>
    </div>
</section>
```

**Quem já tem depoimento para qual destino:**

| Destino | Depoimentos disponíveis |
|---|---|
| Paris e Londres | Michele e Daniel (já está em `paris.html`) |
| Itália | Zoraia Joazeiro e Márcia Reis |
| Bonito, MS | Joice e Rui |
| Rio de Janeiro | Gabriel Dilly |
| Buenos Aires | Júlia e Manuela |

Itália, Bonito, Rio de Janeiro e Buenos Aires ainda não têm página própria no
site. Quando tiverem, é só colar o bloco.

Sobre a Zoraia: ela divide sobrenome com o Nicholas, então o depoimento dela
não entra na faixa de prova da home nem como destaque. Numa página de destino,
com o nome completo à vista, isso é decisão sua.
