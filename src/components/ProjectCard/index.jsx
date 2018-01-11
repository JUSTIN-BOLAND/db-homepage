import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Link from "gatsby-link"
import { Col } from "react-flexbox-grid"

import ButtonTo from "../ButtonTo"

import styles from "./index.module.css"

const ProjectCard = ({ project, headingLevel, index }) => {
  const projectData = project.node.frontmatter
  const Heading = `h${headingLevel}`

  return (
    <Col xs={12} md={6} lg={4} className={index === 2 ? `${styles.root} ${styles.third}` : styles.root}>
      <Link to={projectData.path}>
        <Img sizes={projectData.thumb.childImageSharp.sizes} />
      </Link>
      <Heading><Link to={projectData.path}>{projectData.title}</Link></Heading>
      <p>{projectData.excerpt}</p>
      <ButtonTo to={projectData.path}>Project Details</ButtonTo>
    </Col>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  headingLevel: PropTypes.oneOf([2, 3, 4, 5, 6]),
  index: PropTypes.number,
}

ProjectCard.defaultProps = {
  headingLevel: 2,
  index: 0,
}

export default ProjectCard
