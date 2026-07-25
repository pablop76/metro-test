const Footer = () => {
  const data = new Date();
  return (
    <footer className="app-footer">
      <p className="footer-note">* Test może zawierać błędne odpowiedzi.</p>
      <div className="footer-meta">
        <div className="footer-copyright">© pablop76 2021–{data.getFullYear()}</div>
        <div className="footer-links-row">
          <a href="mailto:pawelpoltoraczyk@gmail.com" className="inline-flex items-center footer-link-pill">
            @kontakt
          </a>
          <a href="https://web-service.com.pl/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 footer-link-pill">
            <svg className="inline-block h-4 w-4" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="3.6" y1="9" x2="20.4" y2="9" />
              <line x1="3.6" y1="15" x2="20.4" y2="15" />
              <path d="M11.5 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3a17 17 0 0 1 0 18" />
            </svg>
            web-service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
