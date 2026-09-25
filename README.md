# Marcos Silveira — Portfólio Profissional de Dados & Business Intelligence

Site profissional e portfólio executivo especializado em soluções analíticas para o **Setor Público** (auditoria contínua, governança, controle interno, transparência LAI) e **Setor Privado** (DRE dinâmico, margens por canal, KPIs C-Level e automações serverless).

---

## 🚀 Como Publicar no GitHub Pages sem Erro de Certificado HTTPS

Se você estava enfrentando problemas com o certificado HTTPS no GitHub, siga este checklist definitivo:

### 1. Configuração Automática via GitHub Actions (Recomendado)
Este repositório já conta com o arquivo `.github/workflows/deploy.yml` configurado com as permissões oficiais do GitHub Pages (`id-token: write`, `pages: write`).

1. Acesse o seu repositório no GitHub.
2. Vá na aba **Settings** (Configurações do Repositório).
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, altere de *"Deploy from a branch"* para:
   👉 **GitHub Actions**
5. Faça um `git push` na branch principal (`main` ou `master`).
6. O GitHub irá rodar a action automaticamente e gerar o certificado SSL (HTTPS) Let's Encrypt sem nenhum erro!

---

### 2. Se Você Usa Domínio Personalizado (ex: `marcossilveira.com.br`)
O erro clássico *"Enforce HTTPS is unavailable for your site because your domain is not properly configured with DNS records"* ocorre quando a emissão do certificado Let's Encrypt falha pela propagação do DNS.

**Como corrigir:**
1. No seu provedor de domínio (Registro.br, GoDaddy, Cloudflare, etc.), configure os seguintes apontamentos:
   - **Registros Tipo A** (apontando para os 4 IPs oficiais do GitHub):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Registro CNAME**:
     - Host: `www` apontando para `<seu-usuario>.github.io`
2. No GitHub (`Settings` > `Pages` > `Custom domain`):
   - Remova o domínio temporariamente e salve.
   - Digite o domínio novamente e clique em **Save**.
   - O GitHub fará a verificação DNS (*DNS check*). Assim que ficar verde, marque a caixa **Enforce HTTPS**.
   - *Nota*: A autoridade certificadora (Let's Encrypt) pode levar de 15 minutos até algumas horas para validar o certificado SSL na primeira vez.

---

### 3. Melhorias Aplicadas no Código
- **`vite.config.ts`**: Configurado com `base: './'` para garantir que os arquivos JavaScript e CSS sejam carregados com caminhos relativos em qualquer subdiretório do GitHub Pages (`https://usuario.github.io/repositorio/`), evitando erros 404 e tela em branco.
- **`public/.nojekyll`**: Adicionado para que o motor Jekyll do GitHub não bloqueie pastas e arquivos com underline.
- **`public/404.html`**: Adicionado para suportar navegação SPA sem erro 404 em recarregamento de página.
- **Privacidade**: E-mail pessoal removido do código e substituído por canais seguros (LinkedIn Oficial e WhatsApp com formulário estruturado).

---

## 🛠️ Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Gerar build de produção para o GitHub Pages
npm run build
```
