import './PackageAnalysisGrid.css'
import bundleSizeLogo from '../../assets/package-detective-icon-bundle-size.svg?react';
import dependenciesLogo from '../../assets/package-detective-icon-dependencies.svg?react';
import securityLogo from '../../assets/package-detective-icon-security.svg?react';
import activityLogo from '../../assets/package-detective-icon-activity.svg?react';

export function PackageAnalysisGrid() {
  return (
    <div className="carousel-container">
      <div className="group">
        <div className="analysis-card">
          <img src={bundleSizeLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Bundle Size</div>
          <div className="analysis-card-description">42.1 kB</div>
        </div>
        <div className="analysis-card">
          <img src={dependenciesLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Dependencies</div>
          <div className="analysis-card-description">6 direct</div>
        </div>
        <div className="analysis-card">
          <img src={securityLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Security</div>
          <div className="analysis-card-description">Clean</div>
        </div>
        <div className="analysis-card">
          <img src={activityLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Activity</div>
          <div className="analysis-card-description">Recently updated</div>
        </div>
      </div>

      <div className="group" aria-hidden="true">
        <div className="analysis-card">
          <img src={bundleSizeLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Bundle Size</div>
          <div className="analysis-card-description">42.1 kB</div>
        </div>
        <div className="analysis-card">
          <img src={dependenciesLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Dependencies</div>
          <div className="analysis-card-description">6 direct</div>
        </div>
        <div className="analysis-card">
          <img src={securityLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Security</div>
          <div className="analysis-card-description">Clean</div>
        </div>
        <div className="analysis-card">
          <img src={activityLogo} className="analysis-card-logo" />
          <div className="analysis-card-title">Activity</div>
          <div className="analysis-card-description">Recently updated</div>
        </div>
      </div>
    </div>
  )
}
