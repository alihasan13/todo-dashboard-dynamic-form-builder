import styles from './TodoCard.module.css';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';


function TodoCard({ todo, userName }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '40px' });

  return (
    <article
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
      aria-label={`Todo: ${todo.title}`}
    >
      <div className={styles.header}>
        <span
          className={`${styles.badge} ${todo.completed ? styles.badgeCompleted : styles.badgePending}`}
          aria-label={`Status: ${todo.completed ? 'Completed' : 'Pending'}`}
        >
          <span className={styles.badgeDot} aria-hidden="true" />
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
        <span className={styles.todoId} aria-label={`Todo ID ${todo.id}`}>#{todo.id}</span>
      </div>

      <p className={styles.title}>{todo.title}</p>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <span className={styles.avatar} aria-hidden="true">
            {userName ? userName.charAt(0).toUpperCase() : '?'}
          </span>
          <span className={styles.userName}>{userName || 'Unknown User'}</span>
        </div>
      </div>
    </article>
  );
}

export default TodoCard;
