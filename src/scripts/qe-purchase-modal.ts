import { services } from '../data/services';

// Número de WhatsApp de contacto (Perú)
const WHATSAPP_NUMBER = '51997890843';

export function initializeQePurchaseModal(): void {
  const modal = document.querySelector<HTMLDialogElement>('#qe-purchase-modal');

  if (!modal || modal.dataset.initialized === 'true') {
    return;
  }

  modal.dataset.initialized = 'true';

  const serviceName = modal.querySelector<HTMLElement>('#qe-service-name');

  const serviceDescription = modal.querySelector<HTMLElement>('#qe-service-description');

  const hourlyPrice = modal.querySelector<HTMLElement>('#qe-hourly-price');

  const hoursInput = modal.querySelector<HTMLInputElement>('#qe-hours');

  const hoursSummary = modal.querySelector<HTMLElement>('#qe-hours-summary');

  const totalPrice = modal.querySelector<HTMLElement>('#qe-total-price');

  const decreaseButton = modal.querySelector<HTMLButtonElement>('#qe-hours-decrease');

  const increaseButton = modal.querySelector<HTMLButtonElement>('#qe-hours-increase');

  const closeButton = modal.querySelector<HTMLButtonElement>('#qe-modal-close');

  const emailInput = modal.querySelector<HTMLInputElement>('#qe-customer-email');

  const phoneInput = modal.querySelector<HTMLInputElement>('#qe-customer-phone');

  const emailError = modal.querySelector<HTMLElement>('#qe-email-error');

  const continueButton = modal.querySelector<HTMLButtonElement>('#qe-continue-payment');

  let selectedServiceId: string | null = null;
  let selectedServiceName = '';
  let selectedPrice = 0;

  // Formato monetario en soles
  const formatPrice = (price: number): string => `S/ ${price.toLocaleString('en-US')}`;

  // Mantener las horas entre 1 y 40
  const normalizeHours = (value: number): number => {
    if (!Number.isFinite(value)) return 1;

    return Math.min(40, Math.max(1, Math.trunc(value)));
  };

  // Actualizar resumen de compra
  const updateTotal = (): void => {
    if (!hoursInput || !hoursSummary || !totalPrice) {
      return;
    }

    const hours = normalizeHours(Number(hoursInput.value));

    hoursInput.value = String(hours);

    hoursSummary.textContent = `${hours} ${hours === 1 ? 'hora' : 'horas'}`;

    totalPrice.textContent = formatPrice(selectedPrice * hours);

    if (decreaseButton) {
      decreaseButton.disabled = hours <= 1;
    }

    if (increaseButton) {
      increaseButton.disabled = hours >= 40;
    }
  };

  // Validar correo obligatorio
  const validateCustomerEmail = (): boolean => {
    if (!emailInput) return false;

    const email = emailInput.value.trim();
    emailInput.value = email;

    const isValid = email.length > 0 && emailInput.validity.valid;

    emailInput.setAttribute('aria-invalid', String(!isValid));

    if (emailError) {
      emailError.hidden = isValid;
    }

    return isValid;
  };

  // Abrir modal según el servicio seleccionado
  const openModal = (serviceId: string): void => {
    const service = services.find((item) => item.id === serviceId && item.category === 'qe');

    if (!service) return;

    selectedServiceId = service.id;
    selectedServiceName = service.name;
    selectedPrice = service.price;

    if (serviceName) {
      serviceName.textContent = service.name;
    }

    if (serviceDescription) {
      serviceDescription.textContent = service.description;
    }

    if (hourlyPrice) {
      hourlyPrice.textContent = formatPrice(service.price);
    }

    if (hoursInput) {
      hoursInput.value = '1';
    }

    if (emailInput) {
      emailInput.value = '';
      emailInput.removeAttribute('aria-invalid');
    }

    if (phoneInput) {
      phoneInput.value = '';
    }

    if (emailError) {
      emailError.hidden = true;
    }

    updateTotal();

    if (!modal.open) {
      modal.showModal();
    }
  };

  // Construir el mensaje de WhatsApp
  const buildWhatsAppMessage = (): string => {
    const hours = normalizeHours(Number(hoursInput?.value ?? 1));

    const total = selectedPrice * hours;
    const email = emailInput?.value.trim() ?? '';
    const phone = phoneInput?.value.trim() ?? '';

    const message = [
      'Hola, me gustaría adquirir una capacitación en Quality Engineering.',
      '',
      '*DETALLE DE MI SOLICITUD*',
      '',
      `*Servicio:* ${selectedServiceName}`,
      `*Cantidad de horas:* ${hours}`,
      `*Precio por hora:* ${formatPrice(selectedPrice)}`,
      `*Monto total:* ${formatPrice(total)}`,
      '',
      '*DATOS DE CONTACTO*',
      '',
      `*Correo:* ${email}`,
      `*Teléfono:* ${phone || 'No proporcionado'}`,
      '',
      'Quisiera coordinar la disponibilidad, los horarios y el pago mediante Yape.',
      '',
      '¡Gracias!',
    ];

    return message.join('\n');
  };

  // Continuar por WhatsApp
  const continueWithWhatsApp = (): void => {
    if (!selectedServiceId || !hoursInput) {
      return;
    }

    // El correo es obligatorio
    if (!validateCustomerEmail()) {
      emailInput?.focus();
      return;
    }

    updateTotal();

    const message = buildWhatsAppMessage();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}` + `?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Eventos de las tarjetas QE
  document.querySelectorAll<HTMLButtonElement>('[data-qe-service]').forEach((button) => {
    button.addEventListener('click', () => {
      const serviceId = button.dataset.qeService;

      if (serviceId) {
        openModal(serviceId);
      }
    });
  });

  // Validación de correo
  emailInput?.addEventListener('blur', validateCustomerEmail);

  emailInput?.addEventListener('input', () => {
    if (emailInput.getAttribute('aria-invalid') === 'true') {
      validateCustomerEmail();
    }
  });

  // Control de horas
  hoursInput?.addEventListener('input', updateTotal);
  hoursInput?.addEventListener('change', updateTotal);

  decreaseButton?.addEventListener('click', () => {
    if (!hoursInput) return;

    hoursInput.value = String(normalizeHours(Number(hoursInput.value) - 1));

    updateTotal();
  });

  increaseButton?.addEventListener('click', () => {
    if (!hoursInput) return;

    hoursInput.value = String(normalizeHours(Number(hoursInput.value) + 1));

    updateTotal();
  });

  // Redirección a WhatsApp
  continueButton?.addEventListener('click', () => {
    continueWithWhatsApp();
  });

  // Cerrar modal
  closeButton?.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}
