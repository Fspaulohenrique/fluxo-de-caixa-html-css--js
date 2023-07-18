// Array para armazenar os lançamentos
let lancamentos = [];

function adicionarLacamento() {
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
  atualizarTabela();
}

// Função para atualizar a tabela de lançamentos e o saldo total
function atualizarTabela() {
  // Pega a tabela e o elemento de saldo total
  const tabela = document.getElementById("registro");
  const saldoTotal = document.getElementById("saldo");

  // Limpa o conteúdo da tabela, mantendo a linha de cabeçalho
  while (tabela.rows.length > 1) {
    tabela.deleteRow(1);
  }

  // Variáveis para calcular o saldo total
  let saldo = 0;

  // Loop pelos lançamentos
  for (let i = 0; i < lancamentos.length; i++) {
    // Cria uma nova linha na tabela
    const linha = tabela.insertRow();

    // Adiciona as células com os valores do lançamento
    const descricaoCelula = linha.insertCell();
    descricaoCelula.textContent = lancamentos[i].descricao;

    const valorCelula = linha.insertCell();
    valorCelula.textContent = "R$ " + lancamentos[i].valor.toFixed(2);

    const tipoCelula = linha.insertCell();
    tipoCelula.textContent = lancamentos[i].tipo;

    // Atualiza a variável de saldo total
    if (lancamentos[i].tipo === "Receita") {
      saldo += lancamentos[i].valor;
    } else {
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
