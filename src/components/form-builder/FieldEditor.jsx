import { useState, useEffect, useId } from 'react';
import { FIELD_TYPE_OPTIONS } from '../../utils/constants';
import styles from './FieldEditor.module.css';

const TYPES_WITH_OPTIONS = ['select', 'radio'];

/**
 * Inline editor panel for defining a single form field's properties.
 */
function FieldEditor({ field, onUpdate, onRemove, index }) {
  const uid = useId();
  const [optionInput, setOptionInput]   = useState('');
  const needsOptions = TYPES_WITH_OPTIONS.includes(field.type);

  // Reset option input when field type changes away from options-types
  useEffect(() => {
    if (!needsOptions) setOptionInput('');
  }, [needsOptions]);

  const addOption = () => {
    const trimmed = optionInput.trim();
    if (!trimmed || field.options.includes(trimmed)) return;
    onUpdate(field.id, { options: [...field.options, trimmed] });
    setOptionInput('');
  };

  const removeOption = (opt) =>
    onUpdate(field.id, { options: field.options.filter((o) => o !== opt) });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addOption(); }
  };

  return (
    <div className={styles.editor} aria-label={`Field editor ${index + 1}`}>
      {/* Field number */}
      <div className={styles.editorHeader}>
        <span className={styles.fieldNum}>Field {index + 1}</span>
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(field.id)}
          aria-label={`Remove field ${index + 1}`}
          type="button"
        >
          ✕
        </button>
      </div>

      <div className={styles.row}>
        {/* Label */}
        <div className={styles.group}>
          <label htmlFor={`${uid}-label`} className={styles.label}>
            Label <span aria-hidden="true" className={styles.required}>*</span>
          </label>
          <input
            id={`${uid}-label`}
            type="text"
            className={styles.input}
            placeholder="e.g. Full Name"
            value={field.label}
            onChange={(e) => onUpdate(field.id, { label: e.target.value })}
            required
          />
        </div>

        {/* Type */}
        <div className={styles.group}>
          <label htmlFor={`${uid}-type`} className={styles.label}>
            Input Type <span aria-hidden="true" className={styles.required}>*</span>
          </label>
          <div className={styles.selectWrap}>
            <select
              id={`${uid}-type`}
              className={styles.select}
              value={field.type}
              onChange={(e) => onUpdate(field.id, { type: e.target.value, options: [] })}
            >
              {FIELD_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className={styles.chevron} aria-hidden="true">▾</span>
          </div>
        </div>
      </div>

      {/* Placeholder */}
      {!['checkbox', 'radio', 'select', 'date'].includes(field.type) && (
        <div className={styles.group}>
          <label htmlFor={`${uid}-placeholder`} className={styles.label}>
            Placeholder
          </label>
          <input
            id={`${uid}-placeholder`}
            type="text"
            className={styles.input}
            placeholder="e.g. Enter your name…"
            value={field.placeholder}
            onChange={(e) => onUpdate(field.id, { placeholder: e.target.value })}
          />
        </div>
      )}

      {/* Required toggle */}
      <div className={styles.checkRow}>
        <input
          id={`${uid}-required`}
          type="checkbox"
          className={styles.checkbox}
          checked={field.required}
          onChange={(e) => onUpdate(field.id, { required: e.target.checked })}
        />
        <label htmlFor={`${uid}-required`} className={styles.checkLabel}>
          Required field
        </label>
      </div>

      {/* Options (select / radio) */}
      {needsOptions && (
        <div className={styles.optionsSection}>
          <p className={styles.label}>Options</p>
          {field.options.length > 0 && (
            <ul className={styles.optionList} role="list">
              {field.options.map((opt) => (
                <li key={opt} className={styles.optionItem}>
                  <span className={styles.optionDot} aria-hidden="true">◉</span>
                  {opt}
                  <button
                    className={styles.optionRemove}
                    onClick={() => removeOption(opt)}
                    aria-label={`Remove option "${opt}"`}
                    type="button"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.optionInputRow}>
            <input
              type="text"
              className={styles.input}
              placeholder="Add option…"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="New option value"
            />
            <button
              className={styles.addOptBtn}
              onClick={addOption}
              type="button"
              disabled={!optionInput.trim()}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FieldEditor;
