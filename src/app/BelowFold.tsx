import { useEffect } from 'react'
import { About } from '../components/sections/About'
import { Certifications } from '../components/sections/Certifications'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Expertise } from '../components/sections/Expertise'
import { Projects } from '../components/sections/Projects'

export default function BelowFold() {
  // If the visitor followed an anchor before this chunk arrived, honour it now.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <About />
      <Experience />
      <Expertise />
      <Certifications />
      <Projects />
      <Contact />
    </>
  )
}
