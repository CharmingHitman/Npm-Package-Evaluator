import './PackageDetailGrid.css';
import { isOsiApproved } from '../../../public/npmRegistry';

export function PackageDetailGrid({ npmPackage }) {




  return (
    <div className="package-grid-container">
      <div className="grid-card">
        <div className="grid-card-title">Bundle size</div>
        <div className="grid-card-content-1">
          <div>{npmPackage.size.kb}kB</div>
          <div>15MB</div>
        </div>
        <div className="size-bar-container">
          <div
            className="size-bar"
            style={{ width: `${Math.min(npmPackage.size.kb / 15360, 1) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="grid-card">
        <div className="grid-card-title">Security</div>

        <div className="grid-card-content-2">
          {npmPackage.vulns.length > 0 ? (
            <>
              <span className="cross">&#x2716;</span>{" "}
              {npmPackage.vulns.length === 1
                ? "1 known vulnerability"
                : `${npmPackage.vulns.length} known vulnerabilities`}
            </>
          ) : (
            <>
              <span className="check">&#x2714;</span> no known vulnerabilities
            </>
          )}
        </div>


        <div className="grid-card-content-2">
          {npmPackage.license && isOsiApproved(npmPackage.license) ? (
            <>
              <span className="check">&#x2714;</span> {npmPackage.license} licensed &middot; OSI approved
            </>
          ) : npmPackage.license === "UNLICENSED" ? (
            <>
              <span className="cross">&#x2716;</span> proprietary &mdash; no rights granted
            </>
          ) : npmPackage.license ? (
            <>
              <span className="cross">&#x2716;</span> {npmPackage.license} &mdash; not OSI approved
            </>
          ) : (
            <>
              <span className="cross">&#x2716;</span> not licensed
            </>
          )}
        </div>
        
        <div className="grid-card-content-2">
          {npmPackage.provenance ? (
            <>
              <span className="check">&#x2714;</span> build provenance verified
            </>
          ) : (
            <>
              <span className="cross">&#x2716;</span> no build provenance
            </>
          )}
        </div>

        <div className="grid-card-content-2">
          {npmPackage.trustedPublisher ? (
            <>
              <span className="check">&#x2714;</span> published via trusted publisher
            </>
          ) : (
            <>
              <span className="cross">&#x2716;</span> not a trusted publisher
            </>
          )}
        </div>

        <div className="grid-card-content-2">
          {npmPackage.deprecated ? (
            <>
              <span className="cross">&#x2716;</span> deprecated
            </>
          ) : (
            <>
              <span className="check">&#x2714;</span> not deprecated
            </>
          )}
        </div>

        <div className="grid-card-content-2">
          {npmPackage.installScripts ? (
            <>
              <span className="cross">&#x2716;</span> runs install scripts
            </>
          ) : (
            <>
              <span className="check">&#x2714;</span> no install scripts
            </>
          )}
        </div>

      </div>
      <div className="grid-card">
        <div className="grid-card-title">Activity</div>
        <div className="grid-card-content-2"><span className='check'>&#x2714;</span> no known vulnerabilities</div>
        <div className="grid-card-content-2"><span className='check'>&#x2714;</span> {npmPackage.license} licensed</div>
      </div>
    </div>
  )
}