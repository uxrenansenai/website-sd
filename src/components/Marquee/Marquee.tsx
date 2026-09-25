import styles from './Marquee.module.css';

const topics = [
  'TECNOLOGIA',
  'INOVAÇÃO',
  'INDÚSTRIA',
  'IMPACTO',
  'EXPERIÊNCIAS',
  'DADOS',
  'INTELIGÊNCIA',
  'SOLUÇÕES',
  'FUTURO',
  'DIGITAL',
];

function Sequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.sequence} aria-hidden={hidden || undefined}>
      {topics.map((topic, index) => (
        <span className={styles.item} key={`${topic}-${index}`}>
          <span>{topic}</span>
          <span className={styles.separator} aria-hidden="true">*</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className={styles.marquee} aria-label="Tecnologia e inovação">
      <div className={styles.viewport}>
        <div className={styles.track}>
          <Sequence />
          <Sequence hidden />
        </div>
      </div>
    </section>
  );
}
