/** A category page for our site */
import React, { Component } from 'react'
import { Titled } from 'react-titled'

import ArticleHeader from 'myComponents/ArticleHeader'
import CMSItemLoader from 'myComponents/CMSItemLoader'
import Menu, { getMenuAnimClass } from 'myComponents/Menu'
import PageLinks from 'myComponents/PageLinks'
import * as StickyBar from 'myComponents/StickyBar'
import WideLogo from 'myComponents/WideLogo'
import { categoryTextsPlural } from 'myUtils/constants'

import './Category.css'

class Category extends Component {
  state = {
    menuOpen: false
  }

  /** Change whether the menu is open or closed */
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render () {
    const { category } = this.props.match.params
    const pageNum = this.props.match.params.pageNum || '1'
    const { menuOpen } = this.state
    const menuAnimClass = getMenuAnimClass(menuOpen)
    const categoryTitle = categoryTextsPlural[category.toUpperCase()]

    return (
      <div className='tng-Category'>
        { /* Tab Title */ }
        <Titled
          title={title =>
            (pageNum !== '1' ? `${pageNum} | ` : '') + `${categoryTitle} | ${title}`
          }
        />

        { /* Sticky Bar */ }
        <StickyBar.Main className={menuAnimClass}>
          <StickyBar.Button img='menu' onClick={this.toggleMenu} alt='toggle menu' />
        </StickyBar.Main>

        { /* Menu */ }
        <Menu open={menuOpen} toggleMenu={this.toggleMenu} />

        { /* Top Logo */ }
        <WideLogo className={menuAnimClass} containerHeight='60px' logoWidth='250px' />

        { /* Category Title */ }
        <div className={`tng-Category-title  ${menuAnimClass}`}>
          {categoryTitle}
        </div>

        {/* Page Articles */}
        <CMSItemLoader
          itemPath={`generated/category/${category}/${pageNum}.json`}
          renderOnData={({ pageArticles, links }) =>
            <div className={`tng-Category-pageArticles ${menuAnimClass}`}>
              {pageArticles.map((article, idx) =>
                <div className='tng-Category-item' key={idx}>
                  <ArticleHeader image={article.mainImage} title={article.title} link={article.urlPath}>
                    <div>
                      <span className='tng-Category-date'>{article.publicationDate}</span>
                    </div>
                  </ArticleHeader>
                  <div className='tng-Category-articleSummary'>{article.summary}</div>
                </div>
              )}
              <PageLinks links={links} />
            </div>
          }
        />
      </div>
    )
  }
}

export default Category