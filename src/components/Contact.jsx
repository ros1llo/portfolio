import { useState } from "react";
import SocialLinks from "./SocialLinks";
import "./Contact.css";

const INITIAL_VALUES = { name: "", email: "", phone: "", reason: "", message: "", botcheck: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Dime tu nombre.";

  if (!values.email.trim()) errors.email = "Necesito un email para responderte.";
  else if (!EMAIL_REGEX.test(values.email)) errors.email = "Este email no parece válido.";

  if (!values.reason) errors.reason = "Elige un motivo.";

  if (values.message.trim().length < 10) errors.message = "Cuéntame un poco más (mínimo 10 caracteres).";

  return errors;
}

function Contact({ contact, social }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Honeypot: si este campo oculto viene relleno, es un bot
    if (values.botcheck) return;

    setStatus("sending");
    const reasonLabel = contact.reasons.find((reason) => reason.id === values.reason)?.label;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `[Portfolio] ${reasonLabel} — ${values.name}`,
          from_name: "Portfolio Álvaro Rosillo",
          name: values.name,
          email: values.email,
          phone: values.phone,
          motivo: reasonLabel,
          message: values.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setValues(INITIAL_VALUES);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="contact-inner">
        <div className="contact-intro">
          <p className="seccion-label">{contact.label}</p>
          <h2 className="contact-title">{contact.title} <em>{contact.titleAccent}</em></h2>
          <p className="contact-text">{contact.text}</p>
          <p className="contact-direct">
            O escríbeme directamente a <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <SocialLinks items={social} className="contact-social" />
        </div>

        {status === "success" ? (
          <div className="contact-success" role="status">
            <p className="contact-success-title">¡Mensaje enviado!</p>
            <p>Gracias por escribirme. Te responderé muy pronto.</p>
            <button type="button" className="btn btn--secundario" onClick={() => setStatus("idle")}>Enviar otro mensaje</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="field">
              <legend className="field-label">Motivo</legend>
              <div className="reason-options">
                {contact.reasons.map((reason) => (
                  <label key={reason.id} className={values.reason === reason.id ? "reason is-selected" : "reason"}>
                    <input type="radio" name="reason" value={reason.id} checked={values.reason === reason.id} onChange={handleChange} />
                    <span>{reason.label}</span>
                  </label>
                ))}
              </div>
              {errors.reason && <p className="field-error">{errors.reason}</p>}
            </fieldset>

            <div className="field-row">
              <div className="field">
                <label className="field-label" htmlFor="name">Nombre</label>
                <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="phone">Teléfono <span className="field-optional">(opcional)</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={handleChange} />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" rows="5" value={values.message} onChange={handleChange} aria-invalid={Boolean(errors.message)}></textarea>
              {errors.message && <p className="field-error">{errors.message}</p>}
            </div>

            <input type="text" name="botcheck" value={values.botcheck} onChange={handleChange} className="honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <button type="submit" className="btn btn--primario contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
            </button>

            {status === "error" && (
              <p className="field-error" role="alert">No se ha podido enviar. Prueba otra vez o escríbeme directamente al email.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;