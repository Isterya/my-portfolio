import './tableOfContents.scss';

type Section = {
  id: string;
  title: string;
};

type TableOfContentsProps = {
  sections: Section[];
};

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  return (
    <nav
      className="toc"
      aria-label="Table of contents"
    >
      <h4>On this page</h4>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
