# 🎭 Culturama - Site Promocional (Landing Page)

> **"Sua próxima experiência cultural começa aqui."**  
> *Culturama: Conectando você ao vibrante cenário cultural local e nacional.*

---

## 📖 Visão Geral do Projeto

O **Culturama** é uma startup focada em conectar a população ao vibrante cenário cultural brasileiro através de um mapa interativo de eventos em tempo real.

Este repositório contém a **Landing Page oficial** de aquisição e divulgação da startup, desenvolvida para atender aos objetivos estabelecidos no **Documento de Design de Projeto (PDD)**:

1. **Atrair e Converter Usuários (B2C):** Incentivar o download do aplicativo mobile demonstrando a solução para a informação dispersa e a facilidade de encontrar cultura por perto.
2. **Atrair Parceiros (B2B):** Servir de vitrine e canal de captação de leads para organizadores de eventos, produtores, artistas e marcas patrocinadoras.
3. **Educação de Mercado:** Destacar que 84% dos brasileiros participam de atividades culturais e que o Culturama traz praticidade, segurança e curadoria verificada.

---

## 🎨 Identidade Visual & Paleta de Cores

A interface foi projetada com base nos tokens de design do PDD, criando um contraste sofisticado entre tons escuros nos mockups/mapas, um fundo claro acolhedor e detalhes luminosos em terracota:

| Token / Papel | Cor Hex | Uso na Interface |
| :--- | :--- | :--- |
| **Primária / Destaque (Terracota / Cobre)** | `#C3724B` / `#D98054` | Botões de Call to Action (CTA), marcadores de mapa, ícones de destaque e logotipo. |
| **Fundo Escuro (Dark Slate / Grafite)** | `#1C1F26` / `#23252B` | Mockup do smartphone, simulação do mapa interativo, sidebar de eventos e rodapé. |
| **Fundo Claro (Off-White / Bege)** | `#F6F4EE` | Fundo principal da página e seções de leitura em harmonia com o pitch deck. |
| **Texto Principal Escuro** | `#1E2229` / `#333333` | Títulos principais e descrições sobre fundos claros. |
| **Texto de Alto Contraste** | `#FFFFFF` / `#E0E0E0` | Títulos e descrições sobre o fundo escuro. |
| **Brilho / Neon Sutil** | `rgba(217, 128, 84, 0.45)` | Indicadores de radar ao vivo, pins de eventos ativos e badges de status. |

---

## 🚀 Estrutura e Funcionalidades da Landing Page

A página é uma **Single-Page Application (SPA)** responsiva e de alta conversão contendo:

1. **Header & Navegação Fixa:** Logotipo com ícone de bússola cultural, links de navegação com *scroll spy* e botões rápidos de conversão.
2. **Hero Section (Dobra Principal):**
   - Headline e Sub-headline oficiais do PDD.
   - Botões com design nativo das lojas **App Store** e **Google Play**.
   - Barra de métricas de mercado (84% demanda, 100% verificação, risco zero).
   - **Mockup interativo de Smartphone** com aura luminosa, radar de geolocalização pulsante, pins clicáveis (ex: *Festival de Jazz na Paulista*, *Exposição Imersiva*, *Teatro Aberto*) e card de evento dinâmico.
3. **A Dor vs. A Solução:** Comparativo lado a lado entre os problemas atuais (informação dispersa, tempo perdido, insegurança) e a solução Culturama (mapa ao vivo, rotas multimodais, organizador verificado).
4. **Funcionalidades Principais:** Cards detalhados com as 4 pilares:
   - *Mapa Interativo ao Vivo*
   - *Recomendação por Interesse & Push Notifications*
   - *Rotas até o Evento (Metrô, Carro, A Pé e Bike)*
   - *Curadoria & Verificação por CNPJ/CPF*
5. **Simulação Interativa do Mapa (Explorer):**
   - Filtros por categoria (*Música & Shows*, *Artes Visuais*, *Teatro & Dança*, *Gastronomia*, *Cinema*).
   - Campo de busca em tempo real.
   - Sidebar interativa com detalhes completos do evento selecionado, organizador verificado e tempo de trajeto de metrô/carro.
6. **Área de Parceiros B2B (Organizadores, Artistas e Marcas):**
   - Seletor de abas para produtores e marcas/patrocinadores.
   - Destaque para pagamentos e repasses seguros via **Mercado Pago** e **Stripe**.
   - Formulário de captação de leads com validação em tempo real e feedback por notificação toast.
7. **Validação de Mercado:** Estatísticas que comprovam a demanda do setor cultural.
8. **FAQ Accordion:** Perguntas e respostas frequentes para usuários e produtores.
9. **Banner de Download:** Call to action com simulador de **QR Code** para leitura rápida no celular.
10. **Rodapé Completo:** Links institucionais, redes sociais, termos legais e o manifesto de encerramento: *"Venha construir esse mapa com a gente."*

---

## 💻 Stack Tecnológico

- **HTML5 Semântico:** Estrutura acessível, otimizada para SEO e OpenGraph tags para compartilhamento em redes sociais.
- **CSS3 Moderno:** Flexbox, CSS Grid, Custom Properties (variáveis), animações fluidas e design 100% responsivo (Mobile-First).
- **JavaScript Vanilla (ES6+):** Sem dependências externas pesadas para garantir carregamento ultra-rápido (Core Web Vitals nota máxima).
- **Tipografia:** Google Fonts (*Plus Jakarta Sans*).
- **Controle de Versão:** Git & GitHub.
- **Deploy:** GitHub Pages com certificado SSL nativo gratuito.

---

## 📁 Estrutura de Arquivos

```text
SiteCulturama/
├── index.html              # Estrutura principal da Landing Page
├── css/
│   └── styles.css          # Design system, tokens de cor e layout responsivo
├── js/
│   └── app.js              # Lógica interativa (mapa, mockup, abas B2B, FAQ, formulário)
├── README.md               # Documentação completa do projeto
└── .gitattributes          # Configurações do repositório Git
```

---

## 🛠️ Como Executar Localmente

Como o projeto é estático e otimizado, você pode executá-lo diretamente:

### Opção 1: Abrir diretamente no navegador
Dê um duplo clique no arquivo `index.html` ou abra-o pelo seu navegador preferido (Chrome, Edge, Firefox, Safari).

### Opção 2: Usar um servidor local (Recomendado para testes)
Usando extensão **Live Server** do VS Code ou via terminal:
```bash
# Com Python 3:
python -m http.server 8000

# Ou com Node.js (npx serve):
npx serve .
```
Acesse no seu navegador: `http://localhost:8000`

---

## 🚀 Publicação no GitHub Pages via GitHub Desktop

1. Abra o **GitHub Desktop**.
2. O repositório local `SiteCulturama` já detectará automaticamente todos os arquivos criados.
3. No campo de mensagem do commit, escreva:
   ```text
   feat: implementar landing page completa do Culturama conforme PDD
   ```
4. Clique em **Commit to main** (ou sua branch padrão).
5. Clique em **Push origin** para enviar o código ao GitHub.com.
6. No repositório no **GitHub.com**:
   - Acesse **Settings** > **Pages**.
   - Em **Build and deployment** > **Source**, selecione `Deploy from a branch`.
   - Escolha a branch `main` e a pasta `/ (root)`.
   - Clique em **Save**.
7. Em 1 a 2 minutos seu site estará publicado e acessível publicamente em `https://<seu-usuario>.github.io/SiteCulturama/`.

---

© 2026 Culturama Tecnologia Cultural Ltda. Todos os direitos reservados.
