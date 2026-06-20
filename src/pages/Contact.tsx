import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import styles from './Contact.module.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const emailVal = import.meta.env.VITE_APP_EMAIL || 'dillip.tripathy@example.com';

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key in keyof FormState]?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: keyof FormState, value: string): string => {
    if (!value.trim()) {
      return 'This field is required';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    if (name === 'message' && value.trim().length < 10) {
      return 'Message must be at least 10 characters long';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      const error = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    (Object.keys(form) as Array<keyof FormState>).forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) {
        newErrors[field] = err;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) return;

    // Simulate backend submission request
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setTouched({});
    }, 1500);
  };

  const getFieldClass = (name: keyof FormState) => {
    if (!touched[name]) return '';
    return errors[name] ? styles.inputError : styles.inputSuccess;
  };

  return (
    <section className={styles.contact} aria-label="Contact Section">
      <div className="container">
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Get In <span className={styles.titleGradient}>Touch</span>
        </motion.h1>

        <div className={styles.grid}>
          {/* Contact Details Card Grid */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className={styles.infoTitle}>Let's discuss details</h2>
            <p className={styles.infoDesc}>
              Do you have a question, project proposal, or simply want to chat? Send a message and
              I will respond within 24 hours.
            </p>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <Mail size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <h4>Email</h4>
                  <p>{emailVal}</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <h4>Location</h4>
                  <p>San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card Panel */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className={styles.form}
                  noValidate
                >
                  <div className={styles.formGroup}>
                    <label htmlFor="name-input" className={styles.label}>
                      Your Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${getFieldClass('name')}`}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {touched.name && errors.name && (
                      <span id="name-error" className={styles.errorText} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email-input" className={styles.label}>
                      Your Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${getFieldClass('email')}`}
                      placeholder="jane@example.com"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                      <span id="email-error" className={styles.errorText} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message-input" className={styles.label}>
                      Your Message
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.textarea} ${getFieldClass('message')}`}
                      placeholder="How can I help you?"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {touched.message && errors.message && (
                      <span id="message-error" className={styles.errorText} role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <Button type="submit" isLoading={isSubmitting}>
                    Send Message <Send size={16} />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={styles.successOverlay}
                >
                  <div className={styles.successIcon} aria-hidden="true">
                    <Check size={36} />
                  </div>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="secondary">
                    Send another message
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
