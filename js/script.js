// Seleção de Elementos
const generatePasswordButton = document.querySelector("#generate-password-button");
const generatedPasswordElement = document.querySelector("#generated-password");
const passwordText = document.querySelector("#password-text");
const copyPasswordButton = document.querySelector("#copy-password");
const showPasswordOptions = document.querySelector("#show-password-options");
const passwordOptions = document.querySelector("#password-options");
const accountForm = document.querySelector("#account-form");

// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%^&*+-";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = () => {
  const passwordLengthInput = parseInt(document.querySelector("#password-length").value) || 10;
  const passwordLength = Math.max(4, Math.min(50, passwordLengthInput)); // Limitar entre 4 e 50
  const includeUppercase = document.querySelector("#uppercase").checked;
  const includeLowercase = document.querySelector("#lowercase").checked;
  const includeNumbers = document.querySelector("#numbers").checked;
  const includeSymbols = document.querySelector("#symbols").checked;

  // Verificar se pelo menos uma opção está selecionada
  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert("Selecione pelo menos uma opção para gerar a senha!");
    return;
  }

  const generators = [];
  if (includeUppercase) generators.push(getLetterUpperCase);
  if (includeLowercase) generators.push(getLetterLowerCase);
  if (includeNumbers) generators.push(getNumber);
  if (includeSymbols) generators.push(getSymbol);

  // Garantir pelo menos um caractere de cada tipo selecionado
  let password = "";
  if (includeUppercase) password += getLetterUpperCase();
  if (includeLowercase) password += getLetterLowerCase();
  if (includeNumbers) password += getNumber();
  if (includeSymbols) password += getSymbol();

  // Preencher o restante da senha
  for (let i = password.length; i < passwordLength; i++) {
    const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
    password += randomGenerator();
  }

  // Embaralhar a senha para evitar padrões previsíveis
  password = password.split("").sort(() => Math.random() - 0.5).join("");

  passwordText.textContent = password;
  generatedPasswordElement.style.display = "block";
  document.querySelector("#password").value = password;
  document.querySelector("#confirm-password").value = ""; // Limpar confirmação
};

// Eventos
generatePasswordButton.addEventListener("click", generatePassword);

copyPasswordButton.addEventListener("click", () => {
  const password = passwordText.textContent;
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      alert("Senha copiada para a área de transferência!");
    }).catch(() => {
      alert("Falha ao copiar a senha. Tente novamente.");
    });
  }
});

showPasswordOptions.addEventListener("click", (e) => {
  e.preventDefault();
  passwordOptions.style.display = passwordOptions.style.display === "none" ? "block" : "none";
});

accountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;
  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  alert("Conta criada com sucesso!");
  // Adicionar lógica para enviar dados do formulário
});