# Instruções para Instalar Dependências do Projeto

Se você está vendo este arquivo, é porque o repositório Git inclui um arquivo `.gitignore` que exclui a pasta `node_modules` do controle de versão. Para instalar as dependências do projeto, siga estas etapas:

1. **Navegue até o Diretório do Projeto:**

   No terminal, use o comando `cd` para entrar no diretório do seu projeto:

   ```bash
   cd front
   ```

2. **Instale as Dependências com npm:**

   Execute o seguinte comando para instalar todas as dependências listadas no arquivo `package.json`, incluindo aquelas que estão no `.gitignore`:

   ```bash
   npm install
   ```

   O npm lerá o arquivo `package.json` e instalará as dependências no diretório `node_modules`.

   **Nota:** Como a pasta `node_modules` está no `.gitignore`, ela não será versionada no seu repositório Git, mas será criada localmente no seu sistema quando você executar `npm install`.

3. **Pronto para Usar:**

   Após a conclusão do comando `npm install`, você estará pronto para trabalhar no seu projeto com todas as dependências instaladas e prontas para uso.

4. **Execute o mesmo para o Backend**

   Será necessário repetir o processo no backend. Para isso, retorne para a pasta principal e vá para a pasta `back`:

    ```bash
   cd ../back
   ```

   Agora, instale as dependências:

    ```bash
   npm install
   ```

Lembre-se de executar `npm install` sempre que você clonar o repositório em um novo ambiente ou quando o arquivo `package.json` for atualizado com novas dependências.