import React from 'react'
import styled from 'styled-components'

import { cssFontH1, colorBlue } from 'common/styles/style-base'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Title = styled.div`
  ${cssFontH1}
  color: ${colorBlue};
  margin-bottom: 2rem;
`
const InnerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 2rem 0 ;
`

export default ({ title, children }) => {
  return (
    <Container>
      { title && <Title>{title}</Title> }
      <InnerContainer>
        { children }
      </InnerContainer>
    </Container>
  )
}
