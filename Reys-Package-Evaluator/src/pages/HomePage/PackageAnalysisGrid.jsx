import './PackageAnalysisGrid.css'

export function PackageAnalysisGrid() {
  return (
    <div className="carousel-container">
      <div className="group">
        <div className="analysis-card">
          <div className="analysis-card-title">Bundle Size</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Dependencies</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Security</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Activity</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Alternatives</div>
        </div>
      </div>
      <div className="group" aria-hidden="true">
        <div className="analysis-card">
          <div className="analysis-card-title">Bundle Size</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Dependencies</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Security</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Activity</div>
        </div>
        <div className="analysis-card">
          <div className="analysis-card-title">Alternatives</div>
        </div>
      </div>
    </div>
  )
}