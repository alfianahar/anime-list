import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import animeData from './api/api';

const Heading = styled('h1')`
  background-color: ${props => props.bg};
  color: ${props => props.fg};
  display: flex; 
  justify-content: center;
`;

const CoverImg = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  
`

function App() {

  const [animes, setAnimes] = useState([])

  useEffect(() => {
    animeData().then((response) => setAnimes(response.media))
  }, []);

  return (
    <div css={css({ padding: 10 })}>
      <Heading bg="#008f68" fg="#fae042">
        Banner
      </Heading>
      <ul>
        {animes.map((anime) => (
          <CoverImg>
            <img src={anime.coverImage.medium} key={anime.id} alt={anime.id} />
          </CoverImg>
        ))}
      </ul>
    </div>
  );
}

export default App;