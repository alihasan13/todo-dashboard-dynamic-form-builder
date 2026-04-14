import { useNavigate } from 'react-router-dom';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import FieldEditor from './FieldEditor';
import EmptyState from '../common/EmptyState/EmptyState';
import styles from './FormBuilder.module.css';


function FormBuilder() {
  const navigate = useNavigate();
  const { schema, addField, updateField, removeField, clearSchema } = useFormBuilder();

  const handlePreview = () => navigate('/form-preview');

  const handleAddField = () => {
    addField({
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: [],
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Form Builder</h1>
          <p className={styles.subtitle}>
            Define your form fields below, then preview and submit.
          </p>
        </div>
        <div className={styles.headerActions}>
          {schema.length > 0 && (
            <>
              <button
                className={styles.clearBtn}
                onClick={clearSchema}
                type="button"
                aria-label="Clear all fields"
              >
                Clear All
              </button>
              <button
                className={styles.previewBtn}
                onClick={handlePreview}
                type="button"
                aria-label="Preview form"
              >
                Preview Form →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Field list */}
      {schema.length === 0 ? (
        <EmptyState
          icon="⚙️"
          title="No fields yet"
          description="Add your first field to start building the form."
          action={
            <button className={styles.addFirstBtn} onClick={handleAddField} type="button">
              + Add First Field
            </button>
          }
        />
      ) : (
        <div className={styles.fieldList} role="list" aria-label="Form fields">
          {schema.map((field, index) => (
            <div key={field.id} role="listitem">
              <FieldEditor
                field={field}
                index={index}
                onUpdate={updateField}
                onRemove={removeField}
              />
            </div>
          ))}
        </div>
      )}

      {/* Add Field */}
      {schema.length > 0 && (
        <button
          className={styles.addBtn}
          onClick={handleAddField}
          type="button"
          aria-label="Add a new field"
        >
          <span aria-hidden="true">+</span> Add Field
        </button>
      )}

      {/* Bottom CTA */}
      {schema.length > 0 && (
        <div className={styles.footer}>
          <p className={styles.footerNote}>
            ✓ Schema auto-saved to browser storage — {schema.length} field
            {schema.length !== 1 ? 's' : ''} defined
          </p>
          <button
            className={styles.previewBtnLg}
            onClick={handlePreview}
            type="button"
          >
            Preview &amp; Submit Form →
          </button>
        </div>
      )}
    </div>
  );
}

export default FormBuilder;
