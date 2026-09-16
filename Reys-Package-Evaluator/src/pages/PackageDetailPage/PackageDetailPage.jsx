import { Link, useParams } from "react-router";
import './packageDetailPage.css'
import { PackageDetailHeader } from "./PackageDetailHeader";
import {PackageDetailGrid} from './PackageDetailGrid'


export function PackageDetailPage({ searchResults}) {
  const {arrayNumber} = useParams();
  const npmPackage = searchResults[arrayNumber];
  console.log(npmPackage)
  return (
    <div className="Page" >
      <Link className='back-button' to={'/search/'}>&lt; Back to Search</Link>
      <PackageDetailHeader npmPackage={npmPackage} />
      <PackageDetailGrid npmPackage={npmPackage}/>
    </div>
  )
}