import React from 'react';

import { HomePageContainer }  from './homepage.styles'

import Directory from '../../components/directory/directory.component'
import { throwError } from 'rxjs';

const HomePage = () => {
    return (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
)
}

export default HomePage;