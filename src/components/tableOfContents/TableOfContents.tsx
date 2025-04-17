import './tableOfContents.scss';

const sections = [
  { id: 'who', title: 'Who I Am' },
  { id: 'data', title: 'What Personal Data I Collect' },
  { id: 'usage', title: 'How I Use Your Data' },
  { id: 'cookies', title: 'Cookies and Analytics' },
  { id: 'sharing', title: 'Data Sharing' },
  { id: 'legal', title: 'Legal Basis (GDPR)' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'security', title: 'Security' },
  { id: 'children', title: 'Children’s Privacy' },
  { id: 'links', title: 'Links to Other Sites' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact' },
];

const TableOfContents = () => {
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
