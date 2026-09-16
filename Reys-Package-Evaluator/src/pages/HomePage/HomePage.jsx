import { Header } from "../../components/Header"
import { PackageAnalysisGrid } from "./PackageAnalysisGrid"
import { TitleAndSearch } from "./TitleAndSearch"

export function HomePage({loadSearch}) {
  return (
    <>  
      <Header /> <br />
      <TitleAndSearch loadSearch={loadSearch} />
      <PackageAnalysisGrid />
    </>
  )
}