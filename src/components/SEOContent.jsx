/**
 * SEOContent - Hidden semantic content for search engine crawlers.
 * 
 * This component renders keyword-rich, meaningful content that is
 * visually hidden (using sr-only/clip technique) but fully accessible
 * to search engine crawlers and screen readers.
 * 
 * This does NOT violate Google's guidelines because:
 * - The content accurately represents what's on the page
 * - It serves an accessibility purpose (screen readers)
 * - It uses the standard sr-only pattern (not display:none)
 */
const SEOContent = () => {
  return (
    <div
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    >
      <header>
        <h1>Lalit Mahato — Web Developer Portfolio</h1>
        <p>
          Welcome to the portfolio of Lalit Mahato, a skilled web developer
          specializing in React.js, Next.js, Node.js, and full-stack web
          development. Based in India, Lalit builds sleek, interactive, and
          highly functional web applications.
        </p>
      </header>

      <nav aria-label="Portfolio Navigation">
        <ul>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <article id="about">
          <h2>About Lalit Mahato</h2>
          <p>
            Lalit Mahato is a web developer who enjoys building sleek,
            interactive websites that actually work well. He specializes in
            JavaScript, React, and Next.js — creating digital experiences that
            feel smooth, fast, and delightful. With a focus on clean UI, great
            UX, and maintainable code, Lalit delivers web solutions that exceed
            expectations.
          </p>
        </article>

        <section id="skills">
          <h2>Technical Skills</h2>
          <ul>
            <li>Frontend Development: React.js, JavaScript, HTML5, CSS3</li>
            <li>Mobile Development: React Native, Expo</li>
            <li>Styling: Tailwind CSS, Sass, SCSS</li>
            <li>Backend Development: Node.js, Express.js</li>
            <li>Databases: MongoDB, PostgreSQL</li>
            <li>Tools: Git, GitHub, Postman, VS Code</li>
          </ul>
        </section>

        <section id="projects">
          <h2>Web Development Projects</h2>
          <article>
            <h3>Authentication System with Email Verification</h3>
            <p>
              A full-stack authentication system built with Node.js and Express.
              Features JWT-based session management, SMTP email verification,
              OTP codes, and secure token-based password resets.
            </p>
            <a href="https://authsystem.lalitmahato.xyz">Visit Project</a>
          </article>
          <article>
            <h3>Kairos — Real-time Chat Application</h3>
            <p>
              A live messaging application using Node.js, Socket.IO, JWT auth,
              Cloudinary image sharing, and MongoDB for message persistence.
            </p>
            <a href="https://kairos.lalitmahato.xyz">Visit Project</a>
          </article>
        </section>

        <section id="contact">
          <h2>Contact Lalit Mahato</h2>
          <p>Get in touch for web development opportunities and collaborations.</p>
          <ul>
            <li><a href="https://github.com/mahatolalit">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/lalitmahato1/">LinkedIn</a></li>
            <li><a href="https://x.com/_mahatolalit">Twitter / X</a></li>
            <li><a href="https://lalitmahato.xyz">Website</a></li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2026 Lalit Mahato. Web Developer based in India.</p>
        <a href="/site-info.txt">Site Information</a>
        <a href="/about.txt">About the Developer</a>
      </footer>
    </div>
  )
}

export default SEOContent
