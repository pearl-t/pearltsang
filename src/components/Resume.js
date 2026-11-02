import { useState } from 'react';
import './Resume.css';

const sheet = {
  headings: ['Company', 'Title', 'Years'],
  rows: [
    ['Attentive', 'Software Engineer, Data', 'Apr 2024 - Present'],
    ['Loup.ai', 'Software Engineer', 'Oct 2021 - Nov 2023'],
    ['Twitch', 'Data Engineer', 'Jan 2020 - Oct 2021'],
    ['Wish', 'Data Engineer', 'Jun 2018 - Nov 2019'],
  ],
};

export default function Resume({ unlocked, onUnlock, onCancel }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  if (!unlocked) return (
    <div className="resume-lock-screen">
      <form className="resume-password-dialog" aria-labelledby="resume-password-title" onSubmit={event => {
        event.preventDefault();
        if (password === 'password') {
          setPassword('');
          setError(false);
          onUnlock();
        } else {
          setError(true);
          setPassword('');
        }
      }}>
        <h2 id="resume-password-title">Password</h2>
        <div className="resume-password-body">
          <span className="resume-lock-icon" aria-hidden="true">🔑</span>
          <div><p>Resume.xls is password protected.</p><p>Enter the password to open this workbook.</p></div>
          <label htmlFor="resume-password">Password:</label>
          <input autoFocus id="resume-password" type="password" value={password} onChange={event => { setPassword(event.target.value); setError(false); }} autoComplete="off" aria-invalid={error} aria-describedby={error ? 'resume-password-error' : undefined} />
          {error && <p className="resume-password-error" id="resume-password-error" role="alert">That password is incorrect. Try again.</p>}
          <div className="resume-password-actions"><button type="submit">OK</button><button type="button" onClick={onCancel}>Cancel</button></div>
        </div>
      </form>
    </div>
  );
  const activeSheet = 'Experience';
  return (
    <div className="resume-workbook">
      <div className="resume-toolbar" aria-hidden="true"><span className="resume-font">Arial</span><span>10 ▾</span><b>B</b><i>I</i><u>U</u><span className="resume-tool-divider" /><span>≡</span><span>▦</span><span>Σ</span><span className="resume-zoom">100%</span></div>
      <div className="resume-formula"><span>A1</span><span aria-hidden="true">ƒx</span><div>Pearl’s résumé · {activeSheet}</div></div>
      <div className="resume-sheet-scroll" role="tabpanel" id="resume-sheet" aria-labelledby={`sheet-${activeSheet}`} tabIndex="0">
        <table className="resume-grid" aria-label={`${activeSheet} résumé worksheet`}>
          <colgroup><col className="resume-row-number" /><col /><col /><col className="resume-years" /></colgroup>
          <thead><tr><th aria-label="Row number" />{['A', 'B', 'C'].map(letter => <th key={letter} scope="col">{letter}</th>)}</tr></thead>
          <tbody>
            <tr className="resume-sheet-title"><th scope="row">1</th><td colSpan="3">Pearl’s résumé · {activeSheet}</td></tr>
            <tr className="resume-column-labels"><th scope="row">2</th>{sheet.headings.map(heading => <th key={heading} scope="col">{heading}</th>)}</tr>
            {sheet.rows.map((row, index) => <tr key={row[0]}><th scope="row">{index + 3}</th>{row.map((text, cell) => <td key={cell}>{text}</td>)}</tr>)}
            {Array.from({ length: 8 }, (_, index) => <tr key={index}><th scope="row">{index + sheet.rows.length + 3}</th>{[0, 1, 2].map(cell => <td key={cell} />)}</tr>)}
          </tbody>
        </table>
      </div>
      <div className="resume-sheet-tabs" role="tablist" aria-label="Résumé worksheets">
        <button type="button" role="tab" id="sheet-Experience" aria-controls="resume-sheet" aria-selected="true">Experience</button>
      </div>
    </div>
  );
}
