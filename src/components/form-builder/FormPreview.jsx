import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageItem } from '../../utils/storageUtils';
import { STORAGE_KEYS } from '../../utils/constants';
import FieldRenderer from './FieldRenderer';
import EmptyState from '../common/EmptyState/EmptyState';
import styles from './FormPreview.module.css';


function FormPreview() {
  const navigate = useNavigate();
  const schema = getStorageItem(STORAGE_KEYS.FORM_SCHEMA, []);

  const [formData, setFormData]     = useState({});
  const [errors,   setErrors]       = useState({});
  const [submitted, setSubmitted]   = useState(false);

  const handleChange = useCallback((fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    // Clear error on change
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  const validate = () => {
    const newErrors = {};
    schema.forEach((field) => {
      if (field.required) {
        const val = formData[field.id];
        const isEmpty =
          val === undefined ||
          val === null ||
          val === '' ||
          val === false;
        if (isEmpty) {
          newErrors[field.id] = `${field.label || 'This field'} is required.`;
        }
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorId = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorId)?.focus();
      return;
    }

    // Build labelled output
    const output = {};
    schema.forEach((field) => {
      output[field.label || field.id] = formData[field.id] ?? '';
    });

    console.log('📋 Form Submitted:', output);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
    setSubmitted(false);
  };

  if (schema.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No form defined yet"
        description="Go to the Form Builder to create your form fields first."
        action={
          <button
            className={styles.buildBtn}
            onClick={() => navigate('/form-builder')}
            type="button"
          >
            Go to Form Builder
          </button>
        }
      />
    );
  }

  if (submitted) {
    return (
      <div className={styles.successWrapper} role="status" aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h2 className={styles.successTitle}>Form Submitted!</h2>
        <p className={styles.successMsg}>
          Your data has been logged to the console. Open DevTools to inspect it.
        </p>
        <div className={styles.successActions}>
          <button className={styles.resetBtn} onClick={handleReset} type="button">
            Submit Another Response
          </button>
          <button
            className={styles.buildBtn}
            onClick={() => navigate('/form-builder')}
            type="button"
          >
            Edit Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Form Preview</h1>
          <p className={styles.subtitle}>
            Fill in the form below and submit — data will be logged to the console.
          </p>
        </div>
        <button
          className={styles.editBtn}
          onClick={() => navigate('/form-builder')}
          type="button"
        >
          ← Edit Form
        </button>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-label="Dynamic preview form"
        noValidate
      >
        <div className={styles.fieldGrid}>
          {schema.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={formData[field.id]}
              onChange={handleChange}
              error={errors[field.id]}
            />
          ))}
        </div>

        {Object.keys(errors).length > 0 && (
          <p className={styles.formError} role="alert" aria-live="assertive">
            ⚠ Please fill in all required fields before submitting.
          </p>
        )}

        <div className={styles.formActions}>
          <button
            className={styles.clearBtn}
            type="button"
            onClick={handleReset}
          >
            Clear
          </button>
          <button className={styles.submitBtn} type="submit">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPreview;
