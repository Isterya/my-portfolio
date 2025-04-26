import { useTranslation } from 'react-i18next';

import './tableOfContents.scss';

type Section = {
  id: string;
  title: string;
};

type TableOfContentsProps = {
  sections: Section[];
};

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  const { t } = useTranslation();

  return (
    <nav className="toc" aria-label="Table of contents">
      <h4>{t('tableOfContents.title')}</h4>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{t(section.title)}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
