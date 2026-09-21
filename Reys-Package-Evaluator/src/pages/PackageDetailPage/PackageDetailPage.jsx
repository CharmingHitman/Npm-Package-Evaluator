import { Link, useParams } from "react-router";
import './packageDetailPage.css'
import { PackageDetailHeader } from "./PackageDetailHeader";
import {PackageDetailGrid} from './PackageDetailGrid'
import { getPackageDetails } from '../../../public/npmRegistry';
import { useEffect, useState } from "react";


export function PackageDetailPage() {
  const {packageName} = useParams();
  const [npmPackage, setNpmPackage] = useState(null);
  console.log(packageName)
  useEffect(() => {
    async function fetchPackageDetail() {
    const data = await getPackageDetails(packageName);
    setNpmPackage(data);
    console.log(data);
  }
    fetchPackageDetail();
  },[packageName])

  if (!npmPackage) return <div>Loading...</div>;

  return (
    <div className="Page">
      <Link className='back-button' to={'/search/'}>&lt; Back to Search</Link>
      <PackageDetailHeader npmPackage={npmPackage} />
      <PackageDetailGrid npmPackage={npmPackage} />
    </div>
  );
}