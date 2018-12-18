/** The home page of our site */
import React from 'react'
import { Titled } from 'react-titled'

import ArticleHeader from 'myComponents/ArticleHeader'
import CMSItemLoader from 'myComponents/CMSItemLoader'
import MenuWrapper from 'myComponents/MenuWrapper'
import PageLinks from 'myComponents/PageLinks'
import WideLogo from 'myComponents/WideLogo'
import { categoryBy } from 'myUtils/constants'

import './Home.css'

/**
 * Render all content wrapped by menus/navigation.
 * navSlideClass is a CSS that will make content slide when the mobile nav slides in.
 */
const Home = ({ navSlideClass, match }) => {
  const pageNum = match.params.pageNum || '1'

  return (
    <div className={`tng-Home ${navSlideClass}`}>
      { /* Tab Title */ }
      {pageNum !== '1' &&
        <Titled title={title => `page ${pageNum} | ${title}`} />
      }

      { /* Top Logo */ }
      <WideLogo className='u-mobileOnly' containerHeight='75px' logoWidth='300px' />

      {/* Page Articles */}
      <CMSItemLoader
        itemPath={`generated/home/${pageNum}.json`}
        renderOnData={({ pageArticles, links }) =>
          <div className='tng-Home-pageArticles'>
            {pageArticles.map((article, idx) =>
              <div className='tng-Home-item' key={idx}>
                <ArticleHeader image={article.mainImage} title={article.title} link={article.urlPath}>
                  <div>
                    <a
                      className='tng-Home-category'
                      href={`/category/${categoryBy('key', article.category).path}`}>
                      {categoryBy('key', article.category).name}
                    </a>
                    <span className='tng-Home-date'>/ {article.publicationDate}</span>
                  </div>
                </ArticleHeader>
                <div className='tng-Home-articleSummary'>{article.summary}</div>
              </div>
            )}
            <PageLinks links={links} />
          </div>
        }
      />
    </div>
  )
}

/** A wrapper around page content with the menus/navigation */
const HomeWrapper = (props) => (
  <MenuWrapper render={Home} {...props} />
)

export default HomeWrapper
