import { useLanguage } from '../context/LanguageContext';

export default function SectionHeading({ tag, title, titleHighlight, center = false }) {
  const { t } = useLanguage();
  const highlight = titleHighlight ? t(titleHighlight) : '';

  return (
    <>
      <p className={`section-tag${center ? ' center' : ''}`}>{t(tag)}</p>
      <h2 className={`section-title${center ? ' center' : ''}`}>
        {t(title)}
        {highlight ? (
          <>
            {' '}
            <span>{highlight}</span>
          </>
        ) : null}
      </h2>
    </>
  );
}
