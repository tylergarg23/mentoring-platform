const WHATSAPP_NUMBER = '51997890845';

export function initializeContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-project-form');

  if (!form || form.dataset.initialized === 'true') {
    return;
  }

  form.dataset.initialized = 'true';

  const errorElement = document.querySelector<HTMLElement>('#contact-form-error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (errorElement) {
      errorElement.hidden = true;
      errorElement.textContent = '';
    }

    const nameInput = form.elements.namedItem('name') as HTMLInputElement | null;

    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;

    const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement | null;

    if (!nameInput || !emailInput || !messageInput) {
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    nameInput.value = name;
    emailInput.value = email;
    messageInput.value = message;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const whatsappMessage = [
      'Hola, me gustaría conversar sobre un proyecto.',
      '',
      '*NUEVA SOLICITUD - TYGAR.DEV*',
      '',
      `*Nombre:* ${name}`,
      `*Correo:* ${email}`,
      '',
      '*Cuéntame un poco:*',
      message,
      '',
      'Quisiera conversar contigo sobre esta idea y conocer los próximos pasos.',
      '',
      '¡Gracias!',
    ].join('\n');

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` + `?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
