import ErrorBoundary from '../components/common/ErrorBoundary/ErrorBoundary';
import FormPreview from '../components/form-builder/FormPreview';
import styles from './FormPreviewPage.module.css';

function FormPreviewPage() {
  return (
    <ErrorBoundary>
      <div className={styles.page}>
        <FormPreview />
      </div>
    </ErrorBoundary>
  );
}

export default FormPreviewPage;
