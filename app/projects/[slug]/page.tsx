import { getAllAchievements, getComingSoonProjects } from '../projectsData'
import ProjectDetailClient from './ProjectDetailClient'

// Generate static params for all projects
export async function generateStaticParams() {
  const t = (key: string) => key // Dummy function for static generation
  const achievements = getAllAchievements(t)
  const comingSoon = getComingSoonProjects(t)
  const allProjects = [...achievements, ...comingSoon]
  return allProjects.map((project) => ({
    slug: (project as any).slug || project.id.toString(),
  }))
}

export default function ProjectDetailPage() {
  return <ProjectDetailClient />
}
