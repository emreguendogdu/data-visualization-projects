import "./Footer.css"
import GitHubIcon from "../../assets/githubicon.svg"
import LinkedInIcon from "../../assets/linkedinicon.svg"
export default function Footer() {
  return (
    <footer>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/osmangund/data-visualization-projects"
      >
        <img src={GitHubIcon} alt="GitHub" className="icon" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://linkedin.com/in/osmangund"
      >
        <img src={LinkedInIcon} alt="LinkedIn" className="icon" />
      </a>
    </footer>
  )
}
