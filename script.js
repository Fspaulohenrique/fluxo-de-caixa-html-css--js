// Array para armazenar os lançamentos
let lancamentos = [];

// Função para adicionar lançamentos
function adicionarLacamento(lancamentos) {
  // Pega os valores do formulário
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  // Cria um objeto com os valores
  const lancamento = {
    descricao,
    valor,
    tipo,
  };

  // Adiciona o objeto ao array de lançamentos
  lancamentos.push(lancamento);

  // Limpa o formulário
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("tipo").selectedIndex = 0;

  // Chama a função para atualizar a tabela e o saldo total
  atualizarTabela(lancamentos);
}

// Função para atualizar a tabela de lançamentos e o saldo total
function atualizarTabela(lancamentos) {
  // Pega a tabela e o elemento de saldo total
  const tabela = document.getElementById("registro");
  const saldoTotal = document.getElementById("saldo");

  // Limpa a tabela
  tabela.innerHTML = "";

  // Variáveis para calcular o saldo total
  let saldo = 0;
  let receitas = 0;
  let despesas = 0;

  // Loop pelos lançamentos
  for (let i = 0; i < lancamentos.length; i++) {
    // Cria uma nova linha na tabela
    const linha = document.createElement("tr");

    // Adiciona as células com os valores do lançamento
    const descricaoCelula = document.createElement("td");
    descricaoCelula.textContent = lancamentos[i].descricao;
    linha.appendChild(descricaoCelula);

    const valorCelula = document.createElement("td");
    valorCelula.textContent = "R$ " + lancamentos[i].valor.toFixed(2);
    linha.appendChild(valorCelula);

    const tipoCelula = document.createElement("td");
    tipoCelula.textContent = lancamentos[i].tipo;
    linha.appendChild(tipoCelula);

    // Adiciona a linha à tabela
    tabela.appendChild(linha);

    // Atualiza as variáveis de saldo total
    if (lancamentos[i].tipo === "receita") {
      receitas += lancamentos[i].valor;
      saldo += lancamentos[i].valor;
    } else {
      despesas += lancamentos[i].valor;
      saldo -= lancamentos[i].valor;
    }
  }

  // Atualiza o elemento de saldo total com o valor atualizado
  saldoTotal.textContent = "R$ " + saldo.toFixed(2);

  // Se o saldo total for negativo, adiciona uma classe para mudar a cor do texto
  if (saldo < 0) {
    saldoTotal.classList.add("negativo");
  } else {
    saldoTotal.classList.remove("negativo");
  }
}
