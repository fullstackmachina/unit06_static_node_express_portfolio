
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
  const maxNameWords = Number(nameField.dataset.maxWords);
  const maxSubjectWords = Number(subjectField.dataset.maxWords);
  const maxWords = Number(messageField.dataset.maxWords);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailJsConfig = {
    publicKey: contactForm.dataset.emailjsPublicKey,
    serviceId: contactForm.dataset.emailjsServiceId,
    templateId: contactForm.dataset.emailjsTemplateId,
  };

  const countWords = (value) => {
    const words = value.trim().match(/\S+/g);
    return words ? words.length : 0;
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

    if (field === nameField && countWords(field.value) > maxNameWords) {
      setFieldError(field, `Please keep your name to ${maxNameWords} words or fewer.`);
      return false;
    }

    if (field === subjectField && countWords(field.value) > maxSubjectWords) {
      setFieldError(field, `Please keep your subject to ${maxSubjectWords} words or fewer.`);
      return false;
    }

    if (field === messageField && countWords(field.value) > maxWords) {
      setFieldError(field, `Please keep your message to ${maxWords} words or fewer.`);
      return false;
    }

    setFieldError(field, '');
    return true;
  };

  const updateWordCount = (field, counter, limit) => {
    const wordCount = countWords(field.value);

    counter.textContent = `${wordCount} / ${limit} words`;
    counter.classList.toggle('is-over-limit', wordCount > limit);
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

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      validateField(field);

      if (field === nameField) {
        updateWordCount(nameField, nameCount, maxNameWords);
      }

      if (field === subjectField) {
        updateWordCount(subjectField, subjectCount, maxSubjectWords);
      }

      if (field === messageField) {
        updateWordCount(messageField, messageCount, maxWords);
      }
    });
  });

  updateWordCount(nameField, nameCount, maxNameWords);
  updateWordCount(subjectField, subjectCount, maxSubjectWords);
  updateWordCount(messageField, messageCount, maxWords);

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isValid = fields.every((field) => validateField(field));

    updateWordCount(nameField, nameCount, maxNameWords);
    updateWordCount(subjectField, subjectCount, maxSubjectWords);
    updateWordCount(messageField, messageCount, maxWords);

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
      updateWordCount(nameField, nameCount, maxNameWords);
      updateWordCount(subjectField, subjectCount, maxSubjectWords);
      updateWordCount(messageField, messageCount, maxWords);
      setFormStatus('Thanks! Your message has been sent.', 'is-success');
    } catch (error) {
      setFormStatus('Something went wrong. Please try again in a moment.', 'is-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send message';
    }
  });
}
