document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
        const response = await fetch('https://formspree.io/f/xwpkkdqg', {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            this.reset();  // Limpiar el formulario
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});
