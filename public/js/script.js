
'use strict';

/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
const menuButton = document.querySelector('#menu-icon');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    body.classList.toggle('sidebar-open');
  });
}

/**
 * Validate and send the contact form with EmailJS.
 */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const fields = Array.from(contactForm.querySelectorAll('input, textarea'));
  const nameField = contactForm.querySelector('#name');
  const nameCount = contactForm.querySelector('#name-count');
  const subjectField = contactForm.querySelector('#subject');
  const subjectCount = contactForm.querySelector('#subject-count');
  const messageField = contactForm.querySelector('#message');
  const messageCount = contactForm.querySelector('#message-count');
  const submitButton = contactForm.querySelector('.contact-submit');
  const formStatus = contactForm.querySelector('.form-status');
  const maxNameChars = Number(nameField.dataset.maxChars);
  const maxSubjectChars = Number(subjectField.dataset.maxChars);
  const maxChars = Number(messageField.dataset.maxChars);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailJsConfig = {
    publicKey: contactForm.dataset.emailjsPublicKey,
    serviceId: contactForm.dataset.emailjsServiceId,
    templateId: contactForm.dataset.emailjsTemplateId,
  };

  const setFieldError = (field, message) => {
    const error = document.querySelector(`#${field.id}-error`);

    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', Boolean(message).toString());

    if (error) {
      error.textContent = message;
    }
  };

  const validateField = (field) => {
    const value = field.value.trim();

    if (!value) {
      setFieldError(field, 'This field is required.');
      return false;
    }

    if (field.type === 'email' && !emailPattern.test(value)) {
      setFieldError(field, 'Please enter an email like test@test.com.');
      return false;
    }

    if (field === nameField && field.value.length > maxNameChars) {
      setFieldError(field, `Name must be ${maxNameChars} characters or fewer.`);
      return false;
    }

    if (field === subjectField && field.value.length > maxSubjectChars) {
      setFieldError(field, `Subject must be ${maxSubjectChars} characters or fewer.`);
      return false;
    }

    if (field === messageField && field.value.length > maxChars) {
      setFieldError(field, `Message must be ${maxChars} characters or fewer.`);
      return false;
    }

    setFieldError(field, '');
    return true;
  };

  const enforceMaxLength = (field, limit) => {
    if (field.value.length > limit) {
      field.value = field.value.slice(0, limit);
    }
  };

  const updateCharCount = (field, counter, limit) => {
    const charCount = field.value.length;

    counter.textContent = `${charCount} / ${limit}`;
    counter.classList.toggle('is-over-limit', charCount > limit);
  };

  const setFormStatus = (message, type = '') => {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`.trim();
  };

  const hasEmailJsConfig = () => {
    return Object.values(emailJsConfig).every((value) => {
      return value && !value.startsWith('YOUR_');
    });
  };

  let submitAttempted = false;

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field === nameField) {
        enforceMaxLength(nameField, maxNameChars);
        updateCharCount(nameField, nameCount, maxNameChars);
      }

      if (field === subjectField) {
        enforceMaxLength(subjectField, maxSubjectChars);
        updateCharCount(subjectField, subjectCount, maxSubjectChars);
      }

      if (field === messageField) {
        enforceMaxLength(messageField, maxChars);
        updateCharCount(messageField, messageCount, maxChars);
      }

      if (submitAttempted) {
        validateField(field);
      }
    });
  });

  updateCharCount(nameField, nameCount, maxNameChars);
  updateCharCount(subjectField, subjectCount, maxSubjectChars);
  updateCharCount(messageField, messageCount, maxChars);

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitAttempted = true;
    const isValid = fields.map((field) => validateField(field)).every(Boolean);

    updateCharCount(nameField, nameCount, maxNameChars);
    updateCharCount(subjectField, subjectCount, maxSubjectChars);
    updateCharCount(messageField, messageCount, maxChars);

    if (!isValid) {
      fields.find((field) => field.classList.contains('is-invalid')).focus();
      setFormStatus('Please fix the highlighted fields before sending.', 'is-error');
      return;
    }

    if (!window.emailjs || !hasEmailJsConfig()) {
      setFormStatus('EmailJS is not configured yet. Add your public key, service ID, and template ID.', 'is-error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    setFormStatus('');

    try {
      await window.emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        contactForm,
        { publicKey: emailJsConfig.publicKey },
      );

      contactForm.reset();
      updateCharCount(nameField, nameCount, maxNameChars);
      updateCharCount(subjectField, subjectCount, maxSubjectChars);
      updateCharCount(messageField, messageCount, maxChars);
      setFormStatus('Thanks! Your message has been sent.', 'is-success');
    } catch (error) {
      setFormStatus('Something went wrong. Please try again in a moment.', 'is-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send message';
    }
  });
}
