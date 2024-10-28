// Função para buscar informações da barbearia
async function buscarInformacoes() {
  try {
    const response = await fetch('http://localhost:8080/informacoes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar informações');
    }

    const data = await response.json();
    console.log('Informações da barbearia:', data);

    // Atualiza a página com as informações recebidas
    document.querySelector('.about p').textContent = data.descricao; // Atualiza descrição

    // Adiciona serviços à lista
    const servicosList = document.getElementById('servicosList');
    data.servicos.forEach(servico => {
      const li = document.createElement('li');
      li.textContent = `${servico.nome}: ${servico.descricao}`;
      servicosList.appendChild(li);
    });

  } catch (error) {
    console.error('Erro:', error);
  }
}

// Chame a função ao carregar a página
document.addEventListener('DOMContentLoaded', buscarInformacoes);
