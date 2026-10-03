import './PackageDetailHeader.css'

export function PackageDetailHeader({npmPackage}) {
  return(
    <>
      <div className='package-detail-header'>
        <div className='package-header-left-section'>
          <h1 className='package-name'>{npmPackage.name}</h1><h3 className='package-version'>v{npmPackage.version}</h3>
        </div>
        <div className='package-header-right-section'>
          {npmPackage.vulns.length < 1 ? 'Case closed · clean' : 'Case closed · flagged'}
        </div>
      </div>
    </>
  )
}