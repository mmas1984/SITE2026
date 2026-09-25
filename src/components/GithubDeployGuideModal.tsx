import React, { useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Globe, Terminal, ArrowRight, AlertCircle } from 'lucide-react';

interface GithubDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubDeployGuideModal: React.FC<GithubDeployGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Guia de Resolução: Publicação no GitHub & Certificado HTTPS
              </h3>
              <p className="text-[11px] text-slate-400">
                Soluções já aplicadas no código e configuração no painel do GitHub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
            aria-label="Fechar guia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-xs sm:text-sm text-slate-300">
          
          {/* Status Box */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            <h4 className="font-bold flex items-center gap-2 text-white mb-2 text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>O que já foi corrigido no código para você:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 ml-5 list-disc">
              <li><strong>Caminhos relativos (`base: './'`)</strong>: configurado no `vite.config.ts` para que JS e CSS nunca deem erro 404 ao carregar sobre HTTPS.</li>
              <li><strong>Arquivo `.nojekyll`</strong>: adicionado na pasta `/public` para o GitHub Pages não ignorar arquivos estáticos.</li>
              <li><strong>Arquivo `404.html`</strong>: adicionado para evitar telas em branco em recarregamentos.</li>
              <li><strong>GitHub Actions Workflow (`deploy.yml`)</strong>: criado na pasta `.github/workflows/` para publicação automatizada com certificado SSL oficial.</li>
              <li><strong>Privacidade</strong>: seu e-mail pessoal foi removido completamente do código público.</li>
            </ul>
          </div>

          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              Passo 1 — No GitHub (Painel do Repositório)
            </div>
            <h4 className="text-sm font-bold text-white">Ativar o Deploy via GitHub Actions</h4>
            <ol className="list-decimal ml-5 space-y-1 text-slate-300 text-xs leading-relaxed">
              <li>Abra o repositório no GitHub pelo navegador.</li>
              <li>Clique na aba superior <strong>Settings</strong> (Configurações).</li>
              <li>No menu à esquerda, clique em <strong>Pages</strong>.</li>
              <li>No campo <strong>Source</strong>, selecione <strong>GitHub Actions</strong> (ao invés de <em>Deploy from a branch</em>).</li>
              <li>Pronto! Quando você fizer o próximo <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">git push</code>, o deploy roda sozinho e o certificado SSL é provisionado automaticamente pela nuvem do GitHub.</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              Passo 2 — Se você usa Domínio Próprio (ex: marcossilveira.com.br)
            </div>
            <h4 className="text-sm font-bold text-white">Por que o erro de certificado HTTPS ocorre em domínios personalizados?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O erro <em>"Enforce HTTPS is unavailable"</em> acontece quando a autoridade Let's Encrypt ainda não conseguiu verificar o DNS. Para resolver:
            </p>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
              <div className="text-amber-300 font-semibold mb-1">Apontamentos DNS necessários no seu provedor (Registro.br / Cloudflare):</div>
              <div>• 4 Registros Tipo A apontando para:</div>
              <div className="text-slate-400 pl-4">185.199.108.153</div>
              <div className="text-slate-400 pl-4">185.199.109.153</div>
              <div className="text-slate-400 pl-4">185.199.110.153</div>
              <div className="text-slate-400 pl-4">185.199.111.153</div>
              <div>• 1 Registro CNAME: <span className="text-emerald-400">www</span> apontando para <span className="text-emerald-400">&lt;seu-usuario&gt;.github.io</span></div>
            </div>
            <div className="text-xs text-slate-400 pt-1">
              Após configurar o DNS, vá em <strong>Settings &gt; Pages</strong>, remova e adicione o domínio novamente, clique em <strong>Save</strong> e marque <strong>Enforce HTTPS</strong> após a checagem ficar verde.
            </div>
          </div>

          {/* Step 3: Commands */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              Passo 3 — Comandos no seu Terminal
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-amber-200 space-y-1">
              <div>git add .</div>
              <div>git commit -m "fix: atualizacao base vite, deploy github pages e privacidade"</div>
              <div>git push origin main</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Documentação completa salva também no arquivo <strong>README.md</strong>.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
          >
            Entendido, fechar guia
          </button>
        </div>
      </div>
    </div>
  );
};
