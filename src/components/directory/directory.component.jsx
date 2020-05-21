import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectDirectorySection } from '../../redux/directory/directory.selector'
import MenuItem from '../menu-item/menu-item.component'

import './directory.styles.scss'

const Directory  = ({sections}) => 
        (
            <div className='directory-menu'>
                {
                   sections.map(({id, ...otherSectionprops }) => (
                       <MenuItem key={id} {...otherSectionprops}/>
                   ))
                }
            </div>

        )
  
const mapStateToProps = createStructuredSelector(
{
  sections : selectDirectorySection
}
)


export default connect(mapStateToProps)(Directory);