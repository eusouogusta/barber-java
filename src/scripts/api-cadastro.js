// Função para realizar cadastro
async function register(name, email, password) {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }
  
      const data = await response.json();
      console.log('Cadastro bem-sucedido:', data);
      // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Erro:', error);
    }
  }
  
  // Chame a função quando o formulário for enviado
  document.querySelector('.formulario').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Verificar se as senhas correspondem
    if (password !== confirmPassword) {
      alert('As senhas não correspondem!');
      return;
    }
  
    register(name, email, password);
  });
  