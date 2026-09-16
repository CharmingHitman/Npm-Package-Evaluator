import './PackageDetailGrid.css'

export function PackageDetailGrid({npmPackage}) {
  return(
    <div className="package-grid-container">
      <div className="grid-card">
        <div className="grid-card-title">Bundle size</div>
        <div className="grid-card-content">{npmPackage.size.kb}kB</div>
      </div>
    </div>
  )
}