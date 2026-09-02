import './Header.css'
import caseOpenLogo from '../assets/package-detective-case-open-stamp.svg';
import Logo from '../assets/Reys-package-evaluator-logo.png';

export function Header() {
  return (
    <div className='header-container'>
      <h1 className="header">
        <img className='header-logo' src={Logo} />
        Reys npm package evaluator — case file no ● R32 
      </h1>
      <img className='case-open-logo' src={caseOpenLogo} />
    </div>
  )
}