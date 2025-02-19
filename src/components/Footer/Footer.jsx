import "./Footer.css"
import GitHubIcon from "../../assets/githubicon.svg"
import LinkedInIcon from "../../assets/linkedinicon.svg"
import { useEffect } from "react"

export default function Footer() {
  useEffect(() => {
    const briefcases = document.querySelectorAll(".js-briefcase")
    briefcases.forEach((briefcase) => {
      const randomNumber = Math.floor(Math.random() * (100 - 50) + 50)
      const randomNegativeNumber = Math.floor(Math.random() * (75 - 125) - 125)

      briefcase.style = `--rain-anim1: ${randomNegativeNumber}; --rain-anim2: ${randomNumber};`
    })
  })

  const rainAnimation = () => {
    const briefcases = document.querySelectorAll(".js-briefcase")
    briefcases.forEach((briefcase) => {
      briefcase.style.opacity = 1
      briefcase.classList.add("rain")
    })
  }
  return (
    <footer>
      <a
        id="github-icon"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/emreguendogdu"
      >
        <img src={GitHubIcon} alt="GitHub" className="icon" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://linkedin.com/in/emregnd"
        onMouseOver={() => rainAnimation()}
      >
        <img src={LinkedInIcon} alt="LinkedIn" className="icon" />
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
        <span className="js-briefcase">💼</span>
      </a>
    </footer>
  )
}
