import { useId } from 'react';
import styles from './FieldRenderer.module.css';


function FieldRenderer({ field, value, onChange, error }) {
  const uid = useId();
  const inputId = `${uid}-${field.id}`;

  const commonProps = {
    id: inputId,
    name: field.id,
    required: field.required,
    'aria-required': field.required,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${inputId}-error` : undefined,
  };

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            rows={4}
          />
        );

      case 'select':
        return (
          <div className={styles.selectWrap}>
            <select
              {...commonProps}
              className={`${styles.select} ${error ? styles.inputError : ''}`}
              value={value || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
            >
              <option value="">— Select an option —</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className={styles.chevron} aria-hidden="true">▾</span>
          </div>
        );

      case 'checkbox':
        return (
          <div className={styles.checkRow}>
            <input
              {...commonProps}
              type="checkbox"
              className={styles.checkbox}
              checked={!!value}
              onChange={(e) => onChange(field.id, e.target.checked)}
            />
            <label htmlFor={inputId} className={styles.checkLabel}>
              {field.placeholder || 'Yes'}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className={styles.radioGroup} role="radiogroup" aria-labelledby={`${inputId}-label`}>
            {field.options.map((opt) => (
              <label key={opt} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(field.id, opt)}
                  required={field.required}
                  className={styles.radioInput}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            {...commonProps}
            type={field.type}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        );
    }
  };

  return (
    <div className={styles.fieldWrap}>
      {field.type !== 'checkbox' && (
        <label
          htmlFor={field.type === 'radio' ? undefined : inputId}
          id={field.type === 'radio' ? `${inputId}-label` : undefined}
          className={styles.label}
        >
          {field.label}
          {field.required && (
            <span className={styles.required} aria-hidden="true"> *</span>
          )}
        </label>
      )}
      {renderInput()}
      {error && (
        <p id={`${inputId}-error`} className={styles.errorMsg} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FieldRenderer;
