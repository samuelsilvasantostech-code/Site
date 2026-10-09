/**
 * Conventional Commits: https://www.conventionalcommits.org/pt-br/
 * Exemplos: "feat: adiciona case de BI", "fix(contato): corrige validação do e-mail".
 * @type {import("@commitlint/types").UserConfig}
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Permite assunto em português com nomes próprios (ex.: "n8n", "WhatsApp").
    "subject-case": [0],
  },
};

export default config;
