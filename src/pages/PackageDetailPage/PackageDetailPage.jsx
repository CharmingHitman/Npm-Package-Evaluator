import { Link, useParams, useNavigate } from "react-router";
import '../PackageDetailPage/PackageDetailPage.css';
import { PackageDetailHeader } from "./PackageDetailHeader";
import { PackageDetailGrid } from './PackageDetailGrid'
import { getPackageDetails } from '../../../public/npmRegistry';
import { useEffect, useState } from "react";
import { getCommitActivity, parseGitHubRepo, getRepoStats } from "../../../public/github";
import { fromPackageParam } from "../../components/utils";


export function PackageDetailPage() {
  const packageName = fromPackageParam(useParams().packageName);
  const [npmPackage, setNpmPackage] = useState(null);
  const [commitWeeks, setCommitWeeks] = useState([]);
  const [repoStats, setRepoStats] = useState(null);
  const [hasRepo, setHasRepo] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchPackageDetail() {
      const data = await getPackageDetails(packageName);
      setNpmPackage(data);

      const repo = parseGitHubRepo(data.links.repository);
      setHasRepo(Boolean(repo));
      if (!repo) return;

      getCommitActivity(repo.owner, repo.repo)
        .then(setCommitWeeks)
        .catch(() => setCommitWeeks([]));

      getRepoStats(repo.owner, repo.repo)
        .then(setRepoStats)
        .catch(() => setRepoStats(null));
    }
    fetchPackageDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageName])

  if (!npmPackage) return <div>Loading...</div>;


  return (
    <div className="Page">
      <Link className='back-button' onClick={() => navigate(-1)}>&lt; Back to Search</Link>
      <PackageDetailHeader npmPackage={npmPackage} />
      <PackageDetailGrid npmPackage={npmPackage} commitWeeks={commitWeeks} hasRepo={hasRepo} repoStats={repoStats} />
    </div>
  );
}