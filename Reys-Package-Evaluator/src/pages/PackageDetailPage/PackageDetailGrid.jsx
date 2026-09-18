import './PackageDetailGrid.css'

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
          {npmPackage.license ? (
            <>
              <span className="check">&#x2714;</span> {npmPackage.license} licensed · OSI approved
            </>
          ) : (
            <>
              <span className="cross">&#x2716;</span> Not licensed
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