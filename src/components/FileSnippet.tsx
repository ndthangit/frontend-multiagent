interface FileSnippetProps {
  fileName: string;
  summary: string[];
}

export default function FileSnippet({ fileName, summary }: FileSnippetProps) {
  return (
    <div className="file-snippet">
      <div className="snippet-header">
        <span className="snippet-icon">💾</span>
        <h4>{fileName}</h4>
      </div>
      <div className="file-summary">
        <h5>Key Objectives:</h5>
        <ul>
          {summary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
