const Footer = () => {
    return (
        <footer className="text-center text-white mt-8 text-opacity-20" >
            <p className="block text-xs">* Test może zawierać błędne odpowiedzi.</p>
            <p className="block"> &copy; pablop76 2021 <a href="mailto:pawelpoltoraczyk@gmail.com" className="block">@kontakt</a></p>
            <a href="https://web-service.com.pl/" target="_blank" rel="noreferrer"><svg className="inline-block mx-auto h-4 w-4 text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" /><line x1="3.6" y1="9" x2="20.4" y2="9" /><line x1="3.6" y1="15" x2="20.4" y2="15" /><path d="M11.5 3a17 17 0 0 0 0 18" />  <path d="M12.5 3a17 17 0 0 1 0 18" /></svg>web-service</a>
        </footer>
    );
}

export default Footer;