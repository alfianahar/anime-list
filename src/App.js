/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Heading = styled('h1')`
  background-color: ${props => props.bg};
  color: ${props => props.fg};
  display: flex; 
  justify-content: center;
`;

const CoverImg = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

function App() {
  return (
    <div css={css`background: #ddd;`}>
      <div css={css({ padding: 10 })}>
        <Heading bg="#008f68" fg="#fae042">
          Banner
        </Heading>
        <CoverImg>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </CoverImg>
      </div>
    </div>
  );
}

export default App;