import './PackageDetailGrid.css';
import { isOsiApproved } from '../../../public/npmRegistry';
import { timeAgo } from '../../../public/github'


export function PackageDetailGrid({ npmPackage, commitWeeks, hasRepo, repoStats }) {
  const depNames = Object.keys(npmPackage.dependencies);
  const maxShown = 11;
  const extra = depNames.length - maxShown;

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

        {!hasRepo ? (
          <div className="grid-card-content-2">no GitHub repository linked</div>
        ) : (
          <>
            <div className="grid-card-content-2">
              {commitWeeks.length > 0 ? (
                <CommitAreaChart weeks={commitWeeks} />
              ) : (
                <span className="activity-empty">no commit activity available</span>
              )}
            </div>

            {repoStats && (
              <>
                <div className="grid-card-content-2">
                  &#9733; {repoStats.stars.toLocaleString()} &middot; &#9282; {repoStats.forks.toLocaleString()}
                </div>

                <div className="grid-card-content-2">
                  &#9888; {repoStats.openIssues.toLocaleString()} open issues
                </div>

                <div className="grid-card-content-2">
                  last commit {timeAgo(repoStats.lastPush)}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="grid-card">
        <div className="grid-card-title">Dependencies</div>

        <div className="grid-card-content-2">
          {depNames.length === 0 ? (
            <>
              <span className="check">&#x2714;</span> no dependencies
            </>
          ) : (
            `${depNames.length} direct ${depNames.length === 1 ? "dependency" : "dependencies"}`
          )}
        </div> <br />

        {depNames.length > 0 && (
          <div className="grid-card-content-2 dependency-grid">
            {depNames.slice(0, maxShown).map((dep) => (
              <span key={dep} className="dependency-chip">{dep}</span>
            ))}
            {extra > 0 && (
              <span className="dependency-chip dependency-chip-more">+{extra} more</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
};

function CommitAreaChart({ weeks }) {
  const recent = weeks.slice(-20); // last 20 weeks
  const max = Math.max(...recent, 1); // avoid divide-by-zero

  const width = 200;
  const height = 60;
  const padding = 4;
  const chartHeight = height - padding * 2;
  const stepX = width / (recent.length - 1);

  // build point coordinates
  const points = recent.map((count, i) => {
    const x = i * stepX;
    const y = padding + chartHeight - (count / max) * chartHeight;
    return { x, y };
  });

  // build a smooth path using simple curve smoothing between points
  const linePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const midX = (prev.x + point.x) / 2;
    return `${acc} Q ${prev.x},${prev.y} ${midX},${(prev.y + point.y) / 2} T ${point.x},${point.y}`;
  }, '');

  // closed path for the fill under the line
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="commit-area-chart">
      <div className="commit-area-chart-labels">
        <span className="commit-area-chart-max">{max}</span>
        <span className="commit-area-chart-min">0</span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <path d={areaPath} className="commit-area-fill" />
        <path d={linePath} className="commit-area-line" fill="none" />
      </svg>
    </div>
  );
}