import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Link from "gatsby-link"
import { Col } from "react-flexbox-grid"

import ButtonTo from "../ButtonTo"

import styles from "./index.module.css"

const ProjectCard = ({ project, index }) => {
  const projectData = project.node.frontmatter

  return (
    <Col xs={12} md={6} lg={4} className={index === 2 ? `${styles.root} ${styles.third}` : styles.root}>
      <Link to={projectData.path}>
        <Img sizes={projectData.thumb.childImageSharp.sizes} />
      </Link>
      <h3><Link to={projectData.path}>{projectData.title}</Link></h3>
      <p>{projectData.excerpt}</p>
      <ButtonTo to={projectData.path}>Project Details</ButtonTo>
    </Col>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number,
}

ProjectCard.defaultProps = {
  index: 0,
}

export default ProjectCard
