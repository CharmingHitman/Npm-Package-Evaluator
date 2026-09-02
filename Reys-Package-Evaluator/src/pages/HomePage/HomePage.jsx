import { Header } from "../../components/Header"
import { PackageAnalysisGrid } from "./PackageAnalysisGrid"
import { TitleAndSearch } from "./TitleAndSearch"

export function HomePage() {
  return (
    <>  
      <Header /> <br />
      <TitleAndSearch />
      <PackageAnalysisGrid />
    </>
  )
}