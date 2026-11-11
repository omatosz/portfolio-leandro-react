# Portfólio de Leandro Matos

Site pessoal em português e inglês, com apresentação, projetos (Veryon em destaque),
trajetória e contato. No ar em https://portfolio-leandro-react.vercel.app

## Rodar na sua máquina

Precisa do Node 20 ou mais novo. No terminal, dentro desta pasta:

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## Onde mexer

| O que | Onde |
|---|---|
| Textos dos dois idiomas | `src/i18n/content.js` |
| Cores e fontes | `src/index.css`, no bloco `@theme` |
| Efeito de letras falhando | `src/components/Glitch.jsx` |
| Foto do topo | `src/assets/leandro-retrato.jpg` (recorte 4:5) |
| Ícones da faixa embaixo da foto | `src/data/tecnologias.js` |
| Marca do cabeçalho (chapéu de palha) | `src/assets/chapeu-de-palha.png` (PNG transparente) |
| Formulário de contato (EmailJS) | `src/components/Contact.jsx` |

Os textos têm as mesmas chaves em `pt` e `en`. Ao mudar um, mude o outro também.

## Publicar

A Vercel publica sozinha a cada push na `main`. Antes de subir, `npm run build`
confirma que o site compila.

## Tecnologias

React 19, Vite, Tailwind CSS 4, Motion para as animações e fontes servidas pelo
próprio site (Anybody, Archivo e IBM Plex Mono).
