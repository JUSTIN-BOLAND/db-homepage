import React from "react"
import get from "lodash/get"

import { Row, Col } from 'antd'
import PageMeta from "../../components/PageMeta"
import SectionHeader from "../../components/SectionHeader"
import Testimonial from "../../components/TestimonialCard"
import ClientCard from "../../components/ClientCard/index"
import BioCard from "../../components/BioCard/index"

import CadburyLogo from "../../components/svg/clients/cadbury-logo.svg"
import CarneGieHallLogo from "../../components/svg/clients/carnegie-hall-logo.svg"
import DeloitteLogo from "../../components/svg/clients/deloitte-logo.svg"
import HMGovernmentLogo from "../../components/svg/clients/hm-government-logo.svg"
import FordLogo from "../../components/svg/clients/ford-logo.svg"
import QueenElizabethLogo from "../../components/svg/clients/qedjt-logo.svg"
import ScottishGovernmentLogo from "../../components/svg/clients/scottish-government-logo.svg"
import LabourLogo from "../../components/svg/clients/labour-logo.svg"

class About extends React.Component {
  render() {
    const post = this.props.data.page
    const allTestimonials = get(this, `props.data.allTestimonials.edges`)

    const clientsList = post.frontmatter.allClients
    const clients = [
      { title: clientsList[0], logo: CadburyLogo },
      { title: clientsList[1], logo: CarneGieHallLogo },
      { title: clientsList[2], logo: DeloitteLogo },
      { title: clientsList[3], logo: HMGovernmentLogo },
      { title: clientsList[4], logo: FordLogo },
      { title: clientsList[5], logo: QueenElizabethLogo },
      { title: clientsList[6], logo: ScottishGovernmentLogo },
      { title: clientsList[7], logo: LabourLogo },
    ]

    return (
      <section>
        <PageMeta page={post.frontmatter} />
        <SectionHeader
          headingCopy="About"
          type="h1"
          taglineCopy={post.frontmatter.tagline}
        />

        <BioCard avatar={post.frontmatter.avatar.childImageSharp.resolutions} col1={post.html} />

        <SectionHeader
          headingCopy="Testimonails"
          type="h2"
          taglineCopy="What clients say."
        />

        <Row gutter={30} type="flex">
          {allTestimonials.map(testimonial => (
            <Col key={testimonial.node.id} xs={24} sm={12} md={8}>
              <Testimonial post={testimonial} />
            </Col>
          ))}
        </Row>

        <SectionHeader
          headingCopy="Clients"
          type="h2"
          taglineCopy="Brands and organisations I've produced work for."
        />

        <Row gutter={30} type="flex">
          {clients.map(client => (
            <Col key={client.title} xs={24} sm={12} md={6}>
              <ClientCard client={client} />
            </Col>
          ))}
        </Row>

      </section>
    )
  }
}

export default About

export const pageQuery = graphql`
  query AboutPage($path: String!) {

    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        path
        metaTitle
        tagline
        allClients
        avatar {
          childImageSharp {
            resolutions(width: 100, height: 100) {
              ...GatsbyImageSharpResolutions_withWebp_tracedSVG
            }
          }
        }
      }
    }

    allTestimonials: allMarkdownRemark(limit: 6, filter: {frontmatter: {type: {eq: "testimonial"}, draft: {ne: true}}}) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            jobTitle
            thumb {
              childImageSharp {
                resolutions(width: 90, height: 90) {
                  ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                }
              }
            }
            linkedIn
            twitter
          }
        }
      }
    }

    allClients: allMarkdownRemark(limit: 16, filter: {frontmatter: {type: {eq: "clients"}, draft: {ne: true}}}) {
      edges {
        node {
          id
          frontmatter {
            title
            logo
          }
        }
      }
    }

  }
`
