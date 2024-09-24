
import styled from 'styled-components';

export const InvContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  .card-container {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    width: 250px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    
    &:hover {
      transform: scale(1.05);
    }

    h1 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }
`;
