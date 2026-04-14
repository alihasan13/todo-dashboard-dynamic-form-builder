import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getStorageItem, setStorageItem } from '../utils/storageUtils';


export function useFormBuilder() {
  const [schema, setSchema] = useState(() =>
    getStorageItem(STORAGE_KEYS.FORM_SCHEMA, [])
  );

  /**
   * For each mutation we use React's functional setState so we always
   * work off the latest state — no stale closure risk.
   * After computing `next`, we persist the resolved array (not a function).
   */
  const addField = useCallback((field) => {
    const newField = {
      id: `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: [],
      ...field,
    };
    setSchema((prev) => {
      const next = [...prev, newField];
      setStorageItem(STORAGE_KEYS.FORM_SCHEMA, next);
      return next;
    });
  }, []);

  const updateField = useCallback((id, updates) => {
    setSchema((prev) => {
      const next = prev.map((f) => (f.id === id ? { ...f, ...updates } : f));
      setStorageItem(STORAGE_KEYS.FORM_SCHEMA, next);
      return next;
    });
  }, []);

  const removeField = useCallback((id) => {
    setSchema((prev) => {
      const next = prev.filter((f) => f.id !== id);
      setStorageItem(STORAGE_KEYS.FORM_SCHEMA, next);
      return next;
    });
  }, []);

  const moveField = useCallback((fromIndex, toIndex) => {
    setSchema((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      setStorageItem(STORAGE_KEYS.FORM_SCHEMA, next);
      return next;
    });
  }, []);

  const clearSchema = useCallback(() => {
    setSchema([]);
    setStorageItem(STORAGE_KEYS.FORM_SCHEMA, []);
  }, []);

  return { schema, addField, updateField, removeField, moveField, clearSchema };
}
