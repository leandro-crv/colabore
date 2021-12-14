import styled from 'styled-components'

export const DivFooter = styled.div`
  background: var(--second-color);
  width: 100vw;
  height: 3rem;
  color: var(--text-color2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  
    .titulo {
    background: linear-gradient(45deg, #659f68, #32669d, #32669d, #659f68);
    background-size: 200% 200%;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    animation: textGradient 4s backwards infinite;
  }

  @keyframes textGradient {
    0% {
      background-position: 0% 0%;
    }

    15% {
      background-position: 25% 25%;
    }

    30% {
      background-position: 50% 50%;
    }

    45% {
      background-position: 100% 100%;
    }

    60% {
      background-position: 50% 50%;
    }

    75% {
      background-position: 25% 25%;
    }

    100% {
      background-position: 0% 0%;
    }
  }
`