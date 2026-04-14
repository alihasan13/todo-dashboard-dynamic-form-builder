import ErrorBoundary from '../components/common/ErrorBoundary/ErrorBoundary';
import FormBuilder from '../components/form-builder/FormBuilder';
import styles from './FormBuilderPage.module.css';

function FormBuilderPage() {
  return (
    <ErrorBoundary>
      <div className={styles.page}>
        <FormBuilder />
      </div>
    </ErrorBoundary>
  );
}

export default FormBuilderPage;
